# Como testar o projeto

> Este documento descreve os passos necessários para testar o projeto 

Entregáveis:
- Miro com a Documentação DDD: https://miro.com/app/board/uXjVN8Gnn2s=/?share_link_id=585190179998
- Repositório GitHub com o código: https://github.com/viniciusandradebezerra/fiap-tech-food

---

- [Como testar o projeto](#como-testar-o-projeto)
  - [Pré requisitos](#pré-requisitos)
  - [Passo 1 - Clonar o repositório GitHub](#passo-1---clonar-o-repositório-github)
  - [Passo 2 - Rodar a aplicação usando Docker e Docker Compose](#passo-2---rodar-a-aplicação-usando-docker-e-docker-compose)
  - [Passo 3 - Testes se a App está Heath](#passo-3---testes-se-a-app-está-heath)
  - [Passo 4 - Testar a API de Pedidos](#passo-4---testar-a-api-de-pedidos)
    - [Exemplo de alguns dados já inseridos para teste:](#exemplo-de-alguns-dados-já-inseridos-para-teste)
    - [A API de pedido segue uma sequencia lógica para iniciar um  pedido e ir até a fase de entrega.](#a-api-de-pedido-segue-uma-sequencia-lógica-para-iniciar-um--pedido-e-ir-até-a-fase-de-entrega)
    - [Teste usando o `curl`](#teste-usando-o-curl)

---

## Pré requisitos

Para rodar os testes será necessário ter instalado as seguintes ferramentas:

- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/linux/)
- Cliente HTTP ([Postman](https://www.postman.com/downloads/) ou [Insomnia](https://insomnia.rest/download) ou [curl](https://curl.se/docs/manpage.html))

## Passo 1 - Clonar o repositório GitHub

```shell
git clone https://github.com/viniciusandradebezerra/fiap-tech-food
```

## Passo 2.0 - Rodar a aplicação usando Docker e Docker Compose

```shell
cd fiap-tech-food
docker-compose up -d
```

## Passo 2.1 - Rodar a aplicação usando Kubernetes (Docker e Minikube) - Windows

```shell
cd fiap-tech-food

minikube start

& minikube -p minikube docker-env --shell powershell | Invoke-Expression

docker build -t fiap-tech-food:latest .

docker images

kubectl apply -f deployment.yaml

kubectl apply -f service.yaml

kubectl apply -f hpa.yaml

kubctl get pods

kubectl get service

minibuke service <nome_service> --url
```

## Passo 3 - Pegar a URL e substituir no insominia ( No vídeo mostra como realizar isso de maneira mais fácil ) 

## Passo 3 - Testes se a App está Heath

> Esse testes pode ser feito pelo navegador mesmo através da url: `http://localhost:3000/health`

ou via terminal usando o curl

```shell
curl --request GET --url http://localhost:3000/health
```

o resultado esperado é:
```json
{"status":"UP"}
```

## Passo 4 - Testar a API de Pedidos

> Este teste pode ser feito usando Postman ou Insomnia, 
> Para isso, existe uma collection na raiz do projeto `Insomnia_collection_test.json` 
> Que pode ser importada tanto no Postman quanto no Insomnia. 
> Caso prefira testar via terminal usando `curl`, vou segue os exemplos  
  
Quando a app subir será inserido dados necessários para testar a criação de pedidos, como, Atendentes, Clientes e Produtos.

### Exemplo de alguns dados já inseridos para teste: 

| Atentente ID  | Cliente CPF | Produto ID        |
|---------------|-------------|-------------------|
| 1             | 15204180001 | 1 (Big Lanche)    |
|               |             | 6 (Coca-Cola)     |
|               |             | 22 (Batata Frita) |

 > - Para verificar a **lista de produtos** pode ser usado a API: `http://localhost:3000/products`
> - Para verificar a **lista de clientes** pode ser usado a API: `http://localhost:3000/users`
> - Para verificar a **lista de Atendentes** pode ser usado a API: `http://localhost:3000/attendants`


### A API de pedido segue uma sequencia lógica para iniciar um  pedido e ir até a fase de entrega.  

1. Iniciando um novo Pedido
2. Adicionando Items ao Pedido
3. Removendo Item (se necessário) 
4. Confirmando Pedido
5. Pagando Pedido
6. Enviando Pedido para preparação
7. Marcando Pedido como Pronto para Entrega
8. Enviando Pedido para Entrega
9. Marcando Pedido como Entregue

### Teste usando o `curl`

> Iniciando um novo Pedido

```shell
curl --request POST --url http://localhost:3000/orders --header 'Content-Type: application/json' --data '{ "customerCPF": "15204180001", "attendantID": 1 }'
```

> Adicionando Items ao Pedido

Adicionando 1 `X-Burguer`

```shell
curl --request POST --url http://localhost:3000/orders/1/item --header 'Content-Type: application/json' --data '{ "productID": 2, "quantity": 1 }'
```

Adicionando 1 `X-Bacon`

```shell
curl --request POST --url http://localhost:3000/orders/1/item --header 'Content-Type: application/json' --data '{ "productID": 3, "quantity": 1 }'
```

Adicionando 2 `Coca-Cola`

```shell
curl --request POST --url http://localhost:3000/orders/1/item --header 'Content-Type: application/json' --data '{ "productID": 6, "quantity": 1 }'
```

Adicionando 2 `Batata Frita`

```shell
curl --request POST --url http://localhost:3000/orders/1/item --header 'Content-Type: application/json' --data '{ "productID": 22, "quantity": 1 }'
```

> Removendo Item

```shell
curl --request DELETE --url http://localhost:3000/orders/1/item/1
```

> Confirmando Pedido

```shell
curl --request PATCH --url http://localhost:3000/orders/1/status --header 'Content-Type: application/json' --header 'User-Agent: insomnia/2023.5.8' --data '{ "status": "CONFIRMATION" }'
```

> Pagando Pedido

métodos de pagamento possíveis:

- CREDIT_CARD
- DEBIT_CARD
- MONEY
- PIX

```shell
curl --request PUT --url http://localhost:3000/orders/1/payment --header 'Content-Type: application/json' --data '{ "paymentMethod": "CREDIT_CARD" }'
```

> Enviando Pedido para preparação

```shell
curl --request PATCH --url http://localhost:3000/orders/1/status --header 'Content-Type: application/json' --header 'User-Agent: insomnia/2023.5.8' --data '{ "status": "IN_PREPARATION" }'
```

> Marcando Pedido como Pronto para Entrega

```shell
curl --request PATCH --url http://localhost:3000/orders/1/status --header 'Content-Type: application/json' --header 'User-Agent: insomnia/2023.5.8' --data '{ "status": "READY_DELIVERY" }'
```

> Enviando Pedido para Entrega

```shell
curl --request PATCH --url http://localhost:3000/orders/1/status --header 'Content-Type: application/json' --header 'User-Agent: insomnia/2023.5.8' --data '{ "status": "SENT_DELIVERY" }'
```

> Marcando Pedido como Entregue

```shell
curl --request PATCH --url http://localhost:3000/orders/1/status --header 'Content-Type: application/json' --header 'User-Agent: insomnia/2023.5.8' --data '{ "status": "DELIVERED" }'
```