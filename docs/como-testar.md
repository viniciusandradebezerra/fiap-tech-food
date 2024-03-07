# Como testar a aplicação

## Dados pré cadastrados para testes

### Atendentes

| ID    | Nome      |
|-------|-----------|
| 1     | Miguel    |
| 2     | Sophia0   |
| 3     | Alice     |
| 4     | Pedro     |
| 5     | Manuela   |

### Clientes

| ID    | Nome          | Email                     | CPF           |
|-------|---------------|---------------------------|---------------|
| 1     | Bernardo      | bernardo@gmail.com        | 29381510040   |
| 2     | Laura         | laura@hotmail.com         | 15204180001   |
| 3     | Lucas         | lucas@gmail.com           | 43300921074   |
| 4     | Maria Eduarda | meduarda@uol.com.br       | 85752055016   |
| 5     | Guilherme     | guilherme@microsoft.com	| 17148604001   |

### Categorias de Produtos

| ID    | Nome              |
|-------|-------------------|
| 1     | Sanduíches        |
| 2     | Bebidas Frias     |
| 3     | Bebidas Quentes   |
| 4     | Combos            |
| 5     | Sobremesas        |
| 6     | Acompanhamentos   |
| 7     | Café da Manhã     |

 | ID   | Nome                              | Preço     | Category_id   |
 |------|-----------------------------------|-----------|---------------|
 | 1    | Big Lanche                        | 29.9      | 1             |
 | 2    | X-Burguer                         | 19.9      | 1             |
 | 3    | X-Salada                          | 21.9      | 1             |
 | 4    | X-Bacon                           | 23.9      | 1             |
 | 5    | X-Tudo                            | 27.9      | 1             |
 | 6    | Coca-Cola                         | 5.9       | 2             |
 | 7    | Guaraná                           | 5.9       | 2             |
 | 8    | Fanta                             | 5.9       | 2             |
 | 9    | Suco de Laranja                   | 5.9       | 2             |
 | 10   | Suco de Uva                       | 5.9       | 2             |
 | 11   | Café                              | 3.9       | 3             |
 | 12   | Cappuccino                        | 4.9       | 3             |
 | 13   | Chocolate Quente                  | 4.9       | 3             |
 | 14   | Misto Quente + Fritas             | 9.9       | 4             |
 | 15   | X-Burguer + Fritas + Coca-Cola    | 29.9      | 4             |
 | 16   | X-Salada + Fritas + Coca-Cola     | 31.9      | 4             |
 | 17   | X-Bacon + Fritas + Coca-Cola      | 33.9      | 4             |
 | 18   | X-Tudo + Fritas + Coca-Cola       | 37.9      | 4             |
 | 19   | Sorvete                           | 7.9       | 5             |

## Teste API de Atendentes usando o curl

Criação de um novo Atendente

```shell
curl --request POST \
  --url http://localhost:3000/attendants \
  --header 'Content-Type: application/json' \
  --data '{ "name": "Attendant 1" }'
```

Busca de Atendente por ID

```shell
curl --request GET \
  --url http://localhost:3000/attendants/1 \
```

Lista de Atendentes

```shell
curl --request GET \
  --url http://localhost:3000/attendants
```

Atualização de Atendente

```shell
curl --request PATCH \
  --url http://localhost:3000/attendants/1 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/2023.5.8' \
  --data '{
	"name": "Attendant Updated"
}'
```

Exclusão de Atendente

```shell
curl --request DELETE \
  --url http://localhost:3000/attendants/1
```

## Teste API de Clientes usando o curl

Criação de um novo Cliente

```shell
curl --request POST \
  --url http://localhost:3000/users \
  --header 'Content-Type: application/json' \
  --data '{ "name": "Customer 2", "email": "customer2@test.com", "cpf": "12345678902" }'
```

Busca de Cliente por ID

```shell
curl --request GET \
  --url http://localhost:3000/users/1
```

Busca de Cliente por CPF

```shell
curl --request GET \
  --url http://localhost:3000/users/cpf/15204180001
```

Lista de Clientes

```shell
curl --request GET \
  --url http://localhost:3000/users
```

Atualização de Cliente

```shell
curl --request PATCH \
  --url http://localhost:3000/users/1 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/2023.5.8' \
  --data '{
	"name": "Customer Updated",
	"email": "customer.updated@test.com"
}'
```

Exclusão de Cliente

```shell
curl --request DELETE \
  --url http://localhost:3000/users/1
```

## Teste API de Produtos usando o curl

Criação de novo Produto

```shell
curl --request POST \
  --url http://localhost:3000/products \
  --header 'Content-Type: application/json' \
  --data '{ "name": "Product 2", "price": 55.55, "categoryID": 2 }'
```

Busca de Produto por ID

```shell
curl --request GET \
  --url http://localhost:3000/products/1
```

Lista de Produtos

```shell
curl --request GET \
  --url http://localhost:3000/products
```

Atualização de Produto

```shell
curl --request PATCH \
  --url http://localhost:3000/products/1 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/2023.5.8' \
  --data '{
	"name": "Product updated",
	"price": 10.55,
	"categoryId": 1
}'
```

Exclusão de Produto

```shell
curl --request DELETE \
  --url http://localhost:3000/products/1
```

## Teste API de Orders usando o curl

Iniciando um novo Pedido

```shell
curl --request POST \
  --url http://localhost:3000/orders \
  --header 'Content-Type: application/json' \
  --data '{ "customerCPF": "15204180001", "attendantID": 1 }'
```

> Adicionando Items ao Pedido

Adicionando 1 `X-Burguer`

```shell
curl --request POST \
  --url http://localhost:3000/orders/1/item \
  --header 'Content-Type: application/json' \
  --data '{ "productID": 2, "quantity": 1 }'
```

Adicionando 1 `X-Bacon`

```shell
curl --request POST \
  --url http://localhost:3000/orders/1/item \
  --header 'Content-Type: application/json' \
  --data '{ "productID": 3, "quantity": 1 }'
```

Adicionando 2 `Coca-Cola`

```shell
curl --request POST \
  --url http://localhost:3000/orders/1/item \
  --header 'Content-Type: application/json' \
  --data '{ "productID": 6, "quantity": 1 }'
```

Adicionando 2 `Batata Frita`

```shell
curl --request POST \
  --url http://localhost:3000/orders/1/item \
  --header 'Content-Type: application/json' \
  --data '{ "productID": 22, "quantity": 1 }'
```

Removendo Item

```shell
curl --request DELETE --url http://localhost:3000/orders/1/item/1
```

Confirmando Pedido

```shell
curl --request PATCH --url http://localhost:3000/orders/1/status --header 'Content-Type: application/json' --header 'User-Agent: insomnia/2023.5.8' --data '{ "status": "CONFIRMATION" }'
```

Lista com todos os pedidos
```shell
curl --request GET --url http://localhost:3000/orders/list --header 'Content-Type: application/json' --header 'User-Agent: insomnia/2023.5.8'
}'
```


Pagando Pedido

métodos de pagamento possiveis:

- CREDIT_CARD
- DEBIT_CARD
- MONEY
- PIX

```shell
curl --request POST --url http://localhost:3000/orders/1/payment --header 'Content-Type: application/json' --header 'User-Agent: insomnia/2023.5.8' --data '{ "paymentMethod": "DEBIT_CARD" }'
```

Confirmação de pagamento aprovado ou recusado ( webhook )

```shell
curl --request POST --url http://localhost:3000/payments/1 --header 'Content-Type: application/json' --header 'User-Agent: insomnia/2023.5.8' --data '{ "status": "PAID" }'
}'
```
