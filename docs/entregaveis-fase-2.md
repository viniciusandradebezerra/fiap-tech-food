# Tech Challenge - Entregáveis fase 2

## Entregável 1

- [x] Alterar/Criar as APIs:
    - [x] a. Checkout Pedido que deverá receber os produtos solicitados e retornar a identificação do pedido.
    - [x] b. Consultar status pagamento pedido, que informa se o pagamento foi aprovado ou não.
    - [x] c. Webhook para receber confirmação de pagamento aprovado ou recusado.
    - [x] d. A lista de pedidos deverá retorná-los com suas descrições, ordenados com a seguinte regra:
        i. Pronto > Em Preparação > Recebido;
        ii. Pedidos mais antigos primeiro e mais novos depois;
        iii. Pedidos com status Finalizado não devem aparecer na lista.
    - [x] e. Atualizar o status do pedido.

## Entregável 2

- [x] Criar uma arquitetura em Kubernetes que atenda os seguintes requisitos:
    - [x] a. Os requisitos funcionais descritos nos itens anteriores (item problema).
    - [x] b. Escalabilidade com aumento e diminuição de Pods conforme demanda.
    - [x] c. Os arquivos manifestos (yaml) precisam estar no Github junto com a nova versão do código.

## Entregável 3

- [] Entrega da seguinte documentação no ReadMe:
    - [] a. Desenho da arquitetura pensado por você, pessoa arquiteta de software, contemplando:
        i. Os requisitos do negócio (problema).
        ii. Os requisitos de infraestrutura:
             1. Você pode utilizar o MiniKube, Docker Kubernetes, AKS, EKS, GKE ou qualquer nuvem que você desenhe.
    - [x] b. Collection com todas as APIs desenvolvidas com exemplo de requisição (que não seja vazia):
        i. Link do Swagger no projeto ou link para download da collection do Postman (JSON).
    - [x] c. Guia completo com todas as instruções para execução do projeto e a ordem de execução das APIs, 
    - [] d. Link para vídeo demonstrando a arquitetura desenvolvida na nuvem ou localmente:
        i. O vídeo deve ser postado no Youtube ou Vimeo.
        ii. Não esqueça de deixá-lo público ou não listado
