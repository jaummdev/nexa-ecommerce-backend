# 🛒 Nexa E-commerce Backend

Backend do sistema de e-commerce desenvolvido com Node.js, Express e TypeScript. Este projeto foi desenvolvido para estudos e demonstração de habilidades em desenvolvimento backend.

## 📋 Sobre o Projeto

Sistema backend para de e-commerce, incluindo autenticação de usuários, gerenciamento de produtos, categorias, carrinho de compras e pedidos. O projeto implementa uma arquitetura RESTful com autenticação JWT e controle de acesso baseado em roles (ADMIN e CUSTOMER).

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express.js** - Framework web para Node.js
- **Prisma** - ORM moderno para TypeScript
- **PostgreSQL (Prisma Studio)** - Banco de dados relacional
- **JWT (JSON Web Tokens)** - Autenticação e autorização
- **bcrypt** - Hash de senhas
- **CORS** - Controle de acesso entre origens

## ✨ Funcionalidades

### 🔐 Autenticação

- Registro de usuários (CUSTOMER e ADMIN)
- Login com JWT
- Middleware de autenticação
- Controle de acesso baseado em roles

### 📦 Produtos

- Listagem de produtos
- Criação de produtos (ADMIN)
- Atualização de produtos (ADMIN)
- Exclusão de produtos (ADMIN)
- Relação com categorias

### 🏷️ Categorias

- Listagem de categorias
- Criação de categorias (ADMIN)
- Atualização de categorias (ADMIN)
- Exclusão de categorias (ADMIN)

### 🛍️ Carrinho de Compras

- Visualizar carrinho do usuário
- Adicionar itens ao carrinho
- Atualizar itens do carrinho
- Calcular total automaticamente
- Limpar carrinho após criar pedido

### 📋 Pedidos

- Criar pedido a partir do carrinho
- Listar pedidos do usuário
- Atualizar status do pedido
- Deletar pedidos pendentes
- Histórico de pedidos

### 🎨 Banners

- Gerenciamento de banners promocionais

## 📁 Estrutura do Projeto

```
nexa-ecommerce-backend/
├── src/
│   ├── controllers/     # Lógica de negócio
│   │   ├── auth/
│   │   ├── banners/
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── orders/
│   │   └── products/
│   ├── middlewares/      # Middlewares (autenticação)
│   ├── routes/           # Definição de rotas
│   ├── types/            # Tipos TypeScript
│   └── server.ts         # Arquivo principal
├── prisma/
│   ├── migrations/       # Migrações do banco
│   └── schema.prisma     # Schema do Prisma
├── lib/
│   └── prisma.ts         # Cliente Prisma
└── generated/
    └── prisma/           # Prisma Client gerado
```

## 🛠️ Como Executar

### Pré-requisitos

- Node.js (v18 ou superior)
- pnpm (ou npm/yarn)
- PostgreSQL
- Variáveis de ambiente configuradas

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/jaummdev/nexa-ecommerce-backend.git
cd nexa-ecommerce-backend
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET_KEY="sua-chave-secreta-aqui"
```

4. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

5. Gere o Prisma Client:

```bash
npx prisma generate
```

6. Inicie o servidor em modo desenvolvimento:

```bash
pnpm dev
```

O servidor estará rodando em `http://localhost:3333`

## 📡 Endpoints da API

### Autenticação

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login

### Produtos

- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto (ADMIN)
- `PUT /api/products/:id` - Atualizar produto (ADMIN)
- `DELETE /api/products/:id` - Deletar produto (ADMIN)

### Categorias

- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria (ADMIN)
- `PUT /api/categories/:id` - Atualizar categoria (ADMIN)
- `DELETE /api/categories/:id` - Deletar categoria (ADMIN)

### Carrinho

- `GET /api/cart` - Obter carrinho do usuário (CUSTOMER)
- `POST /api/cart` - Adicionar itens ao carrinho (CUSTOMER)
- `PUT /api/cart/:id` - Atualizar carrinho (CUSTOMER)
- `DELETE /api/cart/:id` - Deletar carrinho (CUSTOMER)

### Pedidos

- `GET /api/orders` - Listar pedidos do usuário
- `POST /api/orders` - Criar pedido a partir do carrinho
- `PUT /api/orders/:id` - Atualizar status do pedido
- `DELETE /api/orders/:id` - Deletar pedido pendente

### Banners

- `GET /api/banners` - Listar banners
- `POST /api/banners` - Criar banner (ADMIN)
- `PUT /api/banners/:id` - Atualizar banner (ADMIN)
- `DELETE /api/banners/:id` - Deletar banner (ADMIN)

| OBS: ADMIN pode fazer tudo que o CUSTOMER faz.

## 🔒 Autenticação

A maioria dos endpoints requer autenticação via JWT. Envie o token no header:

```
Authorization: Bearer <seu-token-jwt>
```

## 📊 Modelo de Dados

O banco de dados inclui as seguintes entidades principais:

- **User** - Usuários do sistema (ADMIN e CUSTOMER)
- **Product** - Produtos do e-commerce
- **Category** - Categorias de produtos
- **Cart** - Carrinho de compras do usuário
- **CartItem** - Itens do carrinho
- **Order** - Pedidos realizados
- **OrderItem** - Itens dos pedidos
- **Banner** - Banners promocionais

## 🚀 Deploy

O projeto está configurado para deploy na Vercel. As configurações necessárias estão em `vercel.json`.

## 📝 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor em modo desenvolvimento
- `pnpm build` - Compila o projeto TypeScript
- `pnpm start` - Inicia o servidor em produção
- `npx prisma migrate dev` - Executa migrações do banco
- `npx prisma generate` - Gera o Prisma Client
- `npx prisma studio` - Abre o Prisma Studio para visualizar dados

## 🎯 Objetivos do Projeto

Este projeto foi desenvolvido com o objetivo de:

- Praticar desenvolvimento backend com Node.js e TypeScript
- Implementar autenticação e autorização
- Trabalhar com ORM (Prisma) e PostgreSQL
- Criar uma API RESTful completa
- Aplicar boas práticas de desenvolvimento

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

---

**Made with ❤️ by [João Carlos](https://github.com/jaummdev)**
