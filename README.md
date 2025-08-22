# 🛒 Loja API - NestJS

API RESTful desenvolvida em **NestJS** para gerenciar uma loja simples.  
Inclui autenticação, CRUD de usuários, produtos e pedidos, com arquitetura modular e escalável.

---

## 🚀 Tecnologias

### 🔧 Backend
- ⚡ [NestJS](https://nestjs.com/) — Framework Node.js
- 📘 [TypeScript](https://www.typescriptlang.org/) — Tipagem estática  
- 🔗 [TypeORM](https://typeorm.io/) — ORM para Postgres  

### 🐘 Banco de Dados
- 🐘 [PostgreSQL](https://www.postgresql.org/)  

### 🔐 Segurança & Autenticação
- 🔑 [JWT](https://jwt.io/) — Autenticação via tokens  
- 🔒 [bcrypt](https://www.npmjs.com/package/bcrypt) — Criptografia de senhas  

### ✅ Validação & Utilidades
- 🧩 [class-validator](https://github.com/typestack/class-validator) — Validação de DTOs  
- 🔄 [class-transformer](https://github.com/typestack/class-transformer) — Transformação de objetos  
- 🆔 [uuid](https://github.com/uuidjs/uuid) — Geração de IDs únicos  

### ⚡ Performance
- 📦 [cache-manager](https://www.npmjs.com/package/cache-manager) — Cache em memória  
- 🚀 [cache-manager-redis-yet](https://www.npmjs.com/package/cache-manager-redis-yet) — Cache distribuído com Redis  

### 🐳 Infraestrutura
- 🐳 [Docker](https://www.docker.com/) + Docker Compose  

### 🧪 Testes
- 🧪 [Jest](https://jestjs.io/) — Testes unitários e E2E  
- 🔎 [Supertest](https://github.com/visionmedia/supertest) — Testes de integração HTTP  

### 🎨 Qualidade de Código
- 🧹 [ESLint](https://eslint.org/) — Linter  
- 🎨 [Prettier](https://prettier.io/) — Formatação de código  
- ⚡ [SWC](https://swc.rs/) — Compilador rápido para TS  

---

## ⚡ Rotas da API

### 🔑 Autenticação
| Método | Rota                   | Descrição |
|--------|------------------------|-----------|
| POST   | `/autenticacao/login`  | Realiza login |
### 👤 Usuários
| Método | Rota         | Descrição |
|--------|-------------|-----------|
| GET    | `/usuarios`     | Lista todos os usuários |
| POST   | `/usuarios`     | Cria um usuário |
| PUT    | `/usuarios/:id` | Atualiza usuário |
| DELETE | `/usuarios/:id` | Remove usuário |
### 📦 Produtos
| Método | Rota            | Descrição |
|--------|----------------|-----------|
| GET    | `/produtos`     | Lista todos os produtos |
| GET    | `/produtos/:id` | Busca produto por ID |
| POST   | `/produtos`     | Cria produto |
| PUT    | `/produtos/:id` | Atualiza produto |
| DELETE | `/produtos/:id` | Remove produto |
### 📝 Pedidos
| Método | Rota             | Descrição |
|--------|-----------------|-----------|
| GET    | `/pedidos`      | Lista pedidos |
| POST   | `/pedidos`      | Cria pedido |
| PUT    | `/pedidos/:id`  | Atualiza pedido |
| PATCH  | `/pedidos/:id`  | Atualiza parcialmente |

---

# 🛠️ Como Rodar o Projeto

## Instalar dependências
```bash
npm install
````
## Rodar em modo desenvolvimento
```bash
npm run start:dev
````

## Usando Docker
```bash
docker-compose up --build
```

## .env
```bash
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_NAME=db_loja
DB_ADMIN_EMAIL=admin@example.com
SAL_SENHA=<hash_bcrypt_exemplo>
SEGREDO_JWT=jwt_secret_example
```

---

# 🔍 Exemplos de Requisições

## Cria usuário

POST /usuarios
Content-Type: application/json
```bash
{
	"nome": "Padrao",
	"email": "padrao@email.com",
	"senha": "#Abcd123"
}
```
## Loga usuário

POST /autenticacao/login
Content-Type: application/json
```bash
{
	"email": "padrao@email.com",
	"senha": "#Abcd123"
}
```
## Cria produto

POST /produtos
Content-Type: application/json
```bash
{
    "nome": "Figura de ação Marvel Homem Aranha Olympus Homem Aranha E6358 de Hasbro Classic",
    "usuarioId": "ID-DE-USUARIO-LOGADO",
    "valor": 70.00,
    "quantidadeDisponivel": 10,
    "descricao": "Produto novo, bem acabado, alegria para colecionadores",
    "caracteristicas": [
        {
            "nome": "Fabricante",
            "descricao": "Iron Studios"
        },
        {
            "nome": "material",
            "descricao": "Plástico"
        }
    ],
    "imagens": [
        {
            "url": "https://i.imgur.com/dwDZICq.jpg",
            "descricao": "Imagem do Homem Aranha"
        }
    ],
    "categoria": "Colecionáveis"
}
```
## Cria pedido

POST /pedidos/?usuarioId=ID-DE-USUARIO-LOGADO
Content-Type: application/json
```bash
{
    "itensPedido": [
        {
            "produtoId": "ID-DE-PRODUTO-EXISTENTE",
            "quantidade": 1
        }
    ]
}
```

---
Este projeto foi desenvolvido com o objetivo de estudo e prática de desenvolvimento backend utilizando NestJS, TypeORM e PostgreSQL.
Não se trata de uma aplicação pronta para produção, mas sim de um ambiente para experimentar conceitos como arquitetura modular, autenticação, validação de dados, testes e boas práticas de organização de código.

Sinta-se à vontade para usar como referência, adaptar e expandir. 🚀
