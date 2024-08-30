# Shopper Backend

Um backend em Node.js usando TypeScript, Express e Sequelize para gerenciar leituras de medidores e integrar com uma API externa para análise de imagens.

## Tecnologias

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Express**: Framework para construção de APIs.
- **Sequelize**: ORM para PostgreSQL.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **Jest**: Framework de testes para garantir a qualidade do código.

## Requisitos

- Node.js >= 16
- Docker e Docker Compose (opcional para ambiente de desenvolvimento)

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

DATABASE_NAME=readings
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_HOST=db
DATABASE_PORT=5432
GOOGLE_API_KEY=


### Configuração do Docker

Para executar o projeto usando Docker, você deve ter o Docker e Docker Compose instalados. O `docker-compose.yml` configura dois serviços: `db` para o PostgreSQL e `backend` para o servidor Node.js.

### Instalação

1. **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```

2. **Instale as dependências:**

    Se não estiver usando Docker:

    ```bash
    npm install
    ```

3. **Execute o Docker Compose (opcional):**

    ```bash
    docker-compose up --build
    ```

    Isso irá configurar e iniciar os serviços do banco de dados e do backend.

### Scripts

- **Desenvolvimento:** `npm run dev` - Inicia o servidor em modo de desenvolvimento com recarga automática.
- **Iniciar:** `npm start` - Inicia o servidor em modo de produção.
- **Testar:** `npm test` - Executa os testes usando Jest.

## Endpoints

POST - http://localhost:3000/api/upload
PATCH - http://localhost:3000/api/confirm
GET - http://localhost:3000/api/list?customer_code=12345&measure_type=WATER