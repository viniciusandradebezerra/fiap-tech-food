# FIAP challenge food

> FIAP pós Software Architecture - Tech Challenge projeto de um Restaurante `gofood`

Tabela de Contexto
- [FIAP challenge food](#fiap-challenge-food)
  - [Arquitetura do projeto](#arquitetura-do-projeto)
  - [Stack](#stack)
  - [Para Desenvolver](#para-desenvolver)
  - [Para Testar a aplicação usando Docker/Docker Compose](#para-testar-a-aplicação-usando-dockerdocker-compose)
    - [Como testar usando o `curl`](#como-testar-usando-o-curl)
    - [Pode ser testado o fluxo completo usando a collection insomnia](#pode-ser-testado-o-fluxo-completo-usando-a-collection-insomnia)
  - [Referencias importantes](#referencias-importantes)

---

## Arquitetura do projeto

- `src\core`: Este é o diretório principal onde toda a lógica central do aplicativo reside. Ele é dividido em três subdiretórios principais:
  - `application`: Este diretório contém a camada de aplicação, onde a lógica de negócios é implementada. Ele contém serviços, interfaces e enums relacionados às operações de alto nível do aplicativo.
    - `services`: Este diretório geralmente contém classes ou módulos que implementam a lógica de negócios específica do aplicativo. Eles interagem com os repositórios de domínio para buscar ou persistir dados e realizam operações de alto nível para atender aos requisitos do sistema.
    - `interfaces`: Aqui são definidas as interfaces que descrevem contratos entre diferentes partes do sistema. Isso ajuda a garantir que as diferentes camadas e módulos possam se comunicar de forma eficaz e flexível, promovendo a coesão e a baixa dependência entre os componentes.
    - `enums`:  Este diretório contém enums ou tipos enumerados que representam conjuntos fixos de valores que são usados em várias partes do aplicativo. Eles são úteis para representar estados, tipos ou opções pré-definidas de forma mais legível e segura.
  - `domain`: Aqui é onde os modelos de domínio e as regras de negócios são definidos. As entidades do domínio, que representam os conceitos fundamentais do negócio, são colocadas neste diretório.
    - `entities`: Aqui estão as entidades de domínio que representam os conceitos centrais e fundamentais do negócio. Elas encapsulam dados e comportamentos relacionados a esses conceitos e formam a base do modelo de domínio do aplicativo.
  - `infrastructure`: Esta camada contém todos os detalhes de implementação, como acesso a banco de dados, serviços externos e interfaces de usuário. Ele é dividido em subdiretórios para diferentes tipos de infraestrutura, como banco de dados e HTTP.
    - `db`: Este diretório normalmente contém classes ou módulos responsáveis pela interação com o banco de dados. Isso inclui a implementação de repositórios, mapeamento objeto-relacional (ORM), configuração de conexão com o banco de dados, migrações de esquema, etc.
    - `http`: Aqui estão os componentes relacionados à comunicação HTTP, como controladores, middlewares e rotas. Eles lidam com requisições HTTP vindas de clientes externos (como navegadores da web ou aplicativos móveis) e encaminham essas solicitações para os serviços apropriados na camada de aplicação.

## Stack

- [x] [NestJS ][0] - É um framework para construção de aplicativos Node.js escaláveis, eficientes e de fácil manutenção. Ele utiliza TypeScript e é baseado no conceito de módulos, controladores, provedores de serviços e injeção de dependências para facilitar o desenvolvimento de aplicativos back-end robustos.
- [x] [Domain-Driven Design] - Domain-Driven Design é uma abordagem para desenvolvimento de software que se concentra na modelagem do domínio do problema. Ela promove uma colaboração intensa entre desenvolvedores e especialistas do domínio, resultando em um modelo de domínio claro e uma arquitetura de software que reflete fielmente os conceitos do domínio.
- [x] [Clean Architecture] - É um estilo de arquitetura de software que enfatiza a separação de preocupações e a independência de detalhes de implementação. Ele propõe uma estrutura em camadas, onde a lógica de negócios central é isolada do código de infraestrutura, permitindo uma fácil manutenção, teste e evolução do sistema.
- [x] [sqlite3][3] - É um sistema de gerenciamento de banco de dados SQL embutido, de alta confiabilidade e autônomo. Ele é amplamente utilizado em aplicativos que requerem um banco de dados leve e simples de implantar, como aplicativos móveis e aplicativos da web de pequeno a médio porte.
- [x] [TypeORM][4] - É uma biblioteca ORM (Object-Relational Mapping) para TypeScript e JavaScript que simplifica a interação com bancos de dados relacionais. Ele suporta várias plataformas de banco de dados e fornece uma API fácil de usar para realizar operações CRUD (Create, Read, Update, Delete) e criar consultas complexas de forma programática.

## Para Desenvolver

Dependencias

- [Node Instalation](https://nodejs.org/en/download/current)

> Certifique-se de ter o Node 18.18.0 ou superior

```bash
node -v
```

- Clonar o repostório

- Entrar na pasta e rodar o comando para baixar as dependências:

```bash
npm install
```

Para Rodar o projeto em development

```bash
npm run start:dev
```

## Para Testar a aplicação usando Docker/Docker Compose

```shell
docker-compose up -d

curl --request GET --url http://localhost:3000/health --header 'User-Agent: insomnia/2023.5.8'

## resposta esperada
{
	"status": "ok",
	"info": {
		"nestjs-docs": {
			"status": "up"
		}
	},
	"error": {},
	"details": {
		"nestjs-docs": {
			"status": "up"
		}
	}
}
```

## Para Testar a aplicação usando Minikube ( Kubernetes ) - local



> Quando a app subir será inserido dados necessários para testar a criação de pedidos 

| Atentente ID  | Cliente CPF | Produto ID        |
|---------------|-------------|-------------------|
| 1             | 15204180001 | 1 (Big Lanche)    |
|               |             | 6 (Coca-Cola)     |
|               |             | 22 (Batata Frita) |

> - Para verificar a **lista de produtos** pode ser usado a API: `http://localhost:3000/products`
> - Para verificar a **lista de clientes** pode ser usado a API: `http://localhost:3000/customers`
> - Para verificar a **lista de Atendentes** pode ser usado a API: `http://localhost:3000/attendants`

### Como testar usando o `curl`

[Veja o documento](./docs/entregavel-how-to-test-challenge.md)

### Pode ser testado o fluxo completo usando a collection insomnia

[Collection de Teste que pode ser importada no Insomnia ou Postman](./docs/insomnia_collection_test.json)

## Referencias importantes

- [Documento PDF entegável de como testar a API](./docs/entregavel-how-to-test-challenge.pdf)
- [Documentação DDD Miro](https://miro.com/app/board/uXjVN8Gnn2s=/?share_link_id=585190179998)
- [Tech Challenge - Entregáveis fase 2](./docs/entregaveis-fase-2.md)
- [Como Testar usando `curl`](./docs/como-testar.md)
- [Collection de Teste que pode ser importada no Insomnia ou Postman](./docs/insomnia_collection_test.json)

[0]: https://nestjs.com/
[3]: https://www.npmjs.com/package/sqlite3
[4]: https://typeorm.io/

