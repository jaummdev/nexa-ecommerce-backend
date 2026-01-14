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
│   ├── config/           # Configurações (limites, etc)
│   ├── controllers/      # Lógica de negócio
│   │   ├── auth/
│   │   ├── banners/
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── orders/
│   │   └── products/
│   ├── middlewares/       # Middlewares (autenticação)
│   ├── routes/           # Definição de rotas
│   ├── types/            # Tipos TypeScript
│   └── server.ts         # Arquivo principal
├── prisma/
│   ├── migrations/       # Migrações do banco
│   └── schema.prisma     # Schema do Prisma
├── lib/
│   └── prisma.ts         # Cliente Prisma
├── generated/
│   └── prisma/           # Prisma Client gerado
├── Dockerfile            # Configuração Docker para deploy
└── .dockerignore         # Arquivos ignorados no build Docker
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

## 📡 API Documentation

### Base URL

```
http://localhost:3333/api
```

### Autenticação

A maioria dos endpoints requer autenticação via JWT. Envie o token no header:

```
Authorization: Bearer <seu-token-jwt>
```

**Nota:** ADMIN pode fazer tudo que CUSTOMER faz.

---

## 🔐 Autenticação

### POST `/api/auth/register`

Registra um novo usuário no sistema.

**Autenticação:** Não requerida

**Body:**

```json
{
  "email": "user@example.com",
  "password": "senha123",
  "name": "João Silva"
}
```

**Query Parameters (opcional):**

- `?admin=true` - Cria um usuário ADMIN ao invés de CUSTOMER

**Resposta de Sucesso (200):**

```json
{
  "message": "Registration successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "name": "João Silva"
  }
}
```

**Resposta de Erro (400):**

```json
{
  "message": "Email, password, name and phone are required"
}
```

---

### POST `/api/auth/login`

Autentica um usuário e retorna um token JWT.

**Autenticação:** Não requerida

**Body:**

```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "name": "João Silva"
  }
}
```

**Resposta de Erro (401):**

```json
{
  "message": "Invalid credentials"
}
```

---

## 📦 Produtos

### GET `/api/products`

Lista todos os produtos disponíveis.

**Autenticação:** Não requerida

**Resposta de Sucesso (200):**

```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Produto Exemplo",
      "description": "Descrição do produto",
      "price": "99.90",
      "stock": 100,
      "images": ["url1", "url2"],
      "reviewsQuantity": 10,
      "reviewsAvg": "4.5",
      "isActive": true,
      "categoryId": "uuid",
      "category": {
        "id": "uuid",
        "name": "Categoria",
        "slug": "categoria"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET `/api/products/:id`

Obtém um produto específico por ID.

**Autenticação:** Não requerida

**Parâmetros:**

- `id` (string) - ID do produto

**Resposta de Sucesso (200):**

```json
{
  "product": {
    "id": "uuid",
    "name": "Produto Exemplo",
    "description": "Descrição do produto",
    "price": "99.90",
    "stock": 100,
    "images": ["url1", "url2"],
    "reviewsQuantity": 10,
    "reviewsAvg": "4.5",
    "isActive": true,
    "categoryId": "uuid",
    "category": {
      "id": "uuid",
      "name": "Categoria",
      "slug": "categoria"
    }
  }
}
```

**Resposta de Erro (404):**

```json
{
  "message": "Product not found"
}
```

---

### POST `/api/products`

Cria um novo produto.

**Autenticação:** Requerida (ADMIN)

**Limite:** Máximo de 30 produtos no sistema

**Body:**

```json
{
  "name": "Produto Exemplo",
  "description": "Descrição do produto",
  "price": 99.9,
  "stock": 100,
  "images": ["url1", "url2"],
  "reviewsQuantity": 0,
  "reviewsAvg": 0,
  "categoryId": "uuid"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Product created successfully",
  "product": {
    "id": "uuid",
    "name": "Produto Exemplo",
    "description": "Descrição do produto",
    "price": "99.90",
    "stock": 100,
    "images": ["url1", "url2"],
    "reviewsQuantity": 0,
    "reviewsAvg": "0",
    "isActive": true,
    "categoryId": "uuid",
    "category": {
      "id": "uuid",
      "name": "Categoria",
      "slug": "categoria"
    }
  }
}
```

**Resposta de Erro (400):**

```json
{
  "message": "All fields are required to create a product"
}
```

```json
{
  "message": "Maximum limit of 30 products reached"
}
```

---

### PUT `/api/products/:id`

Atualiza um produto existente.

**Autenticação:** Requerida (ADMIN)

**Parâmetros:**

- `id` (string) - ID do produto

**Body:**

```json
{
  "name": "Produto Atualizado",
  "description": "Nova descrição",
  "price": 89.9,
  "stock": 50,
  "images": ["url1", "url2"],
  "reviewsQuantity": 10,
  "reviewsAvg": 4.5,
  "categoryId": "uuid"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Product updated successfully",
  "product": {
    "id": "uuid",
    "name": "Produto Atualizado",
    "description": "Nova descrição",
    "price": "89.90",
    "stock": 50,
    "images": ["url1", "url2"],
    "reviewsQuantity": 10,
    "reviewsAvg": "4.5",
    "categoryId": "uuid",
    "category": {
      "id": "uuid",
      "name": "Categoria",
      "slug": "categoria"
    }
  }
}
```

**Resposta de Erro (404):**

```json
{
  "message": "Product not found to update"
}
```

---

### DELETE `/api/products/:id`

Deleta um produto.

**Autenticação:** Requerida (ADMIN)

**Parâmetros:**

- `id` (string) - ID do produto

**Resposta de Sucesso (200):**

```json
{
  "message": "Product deleted successfully"
}
```

**Resposta de Erro (404):**

```json
{
  "message": "Product not found to delete"
}
```

---

## 🏷️ Categorias

### GET `/api/categories`

Lista todas as categorias disponíveis.

**Autenticação:** Não requerida

**Resposta de Sucesso (200):**

```json
{
  "categories": [
    {
      "id": "uuid",
      "name": "Eletrônicos",
      "slug": "eletronicos",
      "description": "Categoria de eletrônicos",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET `/api/categories/:id`

Obtém uma categoria específica por ID.

**Autenticação:** Não requerida

**Parâmetros:**

- `id` (string) - ID da categoria

**Resposta de Sucesso (200):**

```json
{
  "category": {
    "id": "uuid",
    "name": "Eletrônicos",
    "slug": "eletronicos",
    "description": "Categoria de eletrônicos",
    "isActive": true
  }
}
```

---

### POST `/api/categories`

Cria uma nova categoria.

**Autenticação:** Requerida (ADMIN)

**Limite:** Máximo de 10 categorias no sistema

**Body:**

```json
{
  "name": "Eletrônicos",
  "slug": "eletronicos",
  "description": "Categoria de eletrônicos"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Category created successfully",
  "category": {
    "id": "uuid",
    "name": "Eletrônicos",
    "slug": "eletronicos",
    "description": "Categoria de eletrônicos",
    "isActive": true
  }
}
```

**Resposta de Erro (400):**

```json
{
  "message": "Maximum limit of 10 categories reached"
}
```

---

### PUT `/api/categories/:id`

Atualiza uma categoria existente.

**Autenticação:** Requerida (ADMIN)

**Parâmetros:**

- `id` (string) - ID da categoria

**Body:**

```json
{
  "name": "Eletrônicos Atualizado",
  "slug": "eletronicos-atualizado",
  "description": "Nova descrição"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Category updated successfully",
  "updatedCategory": {
    "id": "uuid",
    "name": "Eletrônicos Atualizado",
    "slug": "eletronicos-atualizado",
    "description": "Nova descrição"
  }
}
```

---

### DELETE `/api/categories/:id`

Deleta uma categoria.

**Autenticação:** Requerida (ADMIN)

**Parâmetros:**

- `id` (string) - ID da categoria

**Resposta de Sucesso (200):**

```json
{
  "message": "Category deleted successfully"
}
```

---

## 🛍️ Carrinho de Compras

### GET `/api/cart`

Obtém o carrinho do usuário autenticado.

**Autenticação:** Requerida (CUSTOMER ou ADMIN)

**Resposta de Sucesso (200):**

```json
{
  "cart": {
    "id": "uuid",
    "userId": "uuid",
    "total": "199.80",
    "items": [
      {
        "id": "uuid",
        "cartId": "uuid",
        "productId": "uuid",
        "quantity": 2,
        "product": {
          "id": "uuid",
          "name": "Produto Exemplo",
          "price": "99.90"
        }
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Resposta de Erro (404):**

```json
{
  "message": "Cart not found"
}
```

---

### POST `/api/cart`

Adiciona itens ao carrinho. Se o produto já existir no carrinho, incrementa a quantidade.

**Autenticação:** Requerida (CUSTOMER ou ADMIN)

**Limite:** Máximo de 10 produtos diferentes no carrinho (não conta quantidade, apenas itens únicos)

**Body:**

```json
{
  "items": [
    {
      "productId": "uuid",
      "quantity": 2
    },
    {
      "productId": "uuid-2",
      "quantity": 1
    }
  ]
}
```

**Resposta de Sucesso (201):**

```json
{
  "message": "Items added to cart successfully",
  "cart": {
    "id": "uuid",
    "userId": "uuid",
    "total": "299.70",
    "items": [
      {
        "id": "uuid",
        "productId": "uuid",
        "quantity": 2,
        "product": {
          "id": "uuid",
          "name": "Produto Exemplo",
          "price": "99.90"
        }
      }
    ]
  }
}
```

**Resposta de Erro (400):**

```json
{
  "message": "Cart can have a maximum of 10 different products"
}
```

```json
{
  "message": "Each item must have productId and quantity (greater than 0)"
}
```

---

### PUT `/api/cart`

Substitui todos os itens do carrinho pelos novos itens fornecidos.

**Autenticação:** Requerida (CUSTOMER ou ADMIN)

**Body:**

```json
{
  "items": [
    {
      "productId": "uuid",
      "quantity": 3
    }
  ]
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Cart updated successfully",
  "cart": {
    "id": "uuid",
    "userId": "uuid",
    "total": "299.70",
    "items": [
      {
        "id": "uuid",
        "productId": "uuid",
        "quantity": 3,
        "product": {
          "id": "uuid",
          "name": "Produto Exemplo",
          "price": "99.90"
        }
      }
    ]
  }
}
```

---

### DELETE `/api/cart`

Limpa o carrinho do usuário (remove todos os itens e zera o total).

**Autenticação:** Requerida (CUSTOMER ou ADMIN)

**Resposta de Sucesso (200):**

```json
{
  "message": "Cart cleared successfully",
  "cart": {
    "id": "uuid",
    "userId": "uuid",
    "total": "0",
    "items": []
  }
}
```

---

### DELETE `/api/cart/items/:id`

Remove um item específico do carrinho.

**Autenticação:** Requerida (CUSTOMER ou ADMIN)

**Parâmetros:**

- `id` (string) - ID do item do carrinho (CartItem)

**Resposta de Sucesso (200):**

```json
{
  "message": "Cart item deleted successfully",
  "cart": {
    "id": "uuid",
    "userId": "uuid",
    "total": "99.90",
    "items": []
  }
}
```

**Resposta de Erro (404):**

```json
{
  "message": "Cart item not found"
}
```

---

## 📋 Pedidos

### GET `/api/orders`

Lista todos os pedidos do usuário autenticado, ordenados por data de criação (mais recentes primeiro).

**Autenticação:** Requerida (CUSTOMER ou ADMIN)

**Resposta de Sucesso (200):**

```json
{
  "orders": [
    {
      "id": "uuid",
      "userId": "uuid",
      "totalAmount": "199.80",
      "status": "PENDING",
      "orderItems": [
        {
          "id": "uuid",
          "orderId": "uuid",
          "productId": "uuid",
          "quantity": 2,
          "unitPrice": "99.90",
          "product": {
            "id": "uuid",
            "name": "Produto Exemplo",
            "price": "99.90"
          }
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET `/api/orders/:id`

Obtém um pedido específico por ID.

**Autenticação:** Requerida (CUSTOMER ou ADMIN)

**Parâmetros:**

- `id` (string) - ID do pedido

**Resposta de Sucesso (200):**

```json
{
  "order": {
    "id": "uuid",
    "userId": "uuid",
    "totalAmount": "199.80",
    "status": "PENDING",
    "orderItems": [
      {
        "id": "uuid",
        "productId": "uuid",
        "quantity": 2,
        "unitPrice": "99.90",
        "product": {
          "id": "uuid",
          "name": "Produto Exemplo"
        }
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### POST `/api/orders`

Cria um novo pedido a partir do carrinho do usuário. Após criar o pedido, o carrinho é limpo automaticamente.

**Autenticação:** Requerida (CUSTOMER ou ADMIN)

**Limite:** Máximo de 5 pedidos por usuário

**Resposta de Sucesso (201):**

```json
{
  "message": "Order created successfully",
  "order": {
    "id": "uuid",
    "userId": "uuid",
    "totalAmount": "199.80",
    "status": "PENDING",
    "orderItems": [
      {
        "id": "uuid",
        "productId": "uuid",
        "quantity": 2,
        "unitPrice": "99.90",
        "product": {
          "id": "uuid",
          "name": "Produto Exemplo"
        }
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Resposta de Erro (400):**

```json
{
  "message": "Cart is empty. Add items to cart before creating an order"
}
```

```json
{
  "message": "Maximum limit of 5 orders per user reached"
}
```

**Resposta de Erro (404):**

```json
{
  "message": "Cart not found"
}
```

---

### PUT `/api/orders/:id`

Atualiza o status de um pedido.

**Autenticação:** Requerida (CUSTOMER ou ADMIN)

**Parâmetros:**

- `id` (string) - ID do pedido

**Body:**

```json
{
  "status": "PAID"
}
```

**Status válidos:** `PENDING`, `PAID`, `SHIPPED`, `CANCELLED`

**Resposta de Sucesso (200):**

```json
{
  "message": "Order updated successfully",
  "order": {
    "id": "uuid",
    "userId": "uuid",
    "totalAmount": "199.80",
    "status": "PAID",
    "orderItems": []
  }
}
```

**Resposta de Erro (400):**

```json
{
  "message": "Invalid status. Must be one of: PENDING, PAID, SHIPPED, CANCELLED"
}
```

---

### DELETE `/api/orders/:id`

Deleta um pedido pendente. Apenas pedidos com status `PENDING` podem ser deletados.

**Autenticação:** Requerida (CUSTOMER ou ADMIN)

**Parâmetros:**

- `id` (string) - ID do pedido

**Resposta de Sucesso (200):**

```json
{
  "message": "Order deleted successfully"
}
```

**Resposta de Erro (400):**

```json
{
  "message": "You can only delete pending orders"
}
```

---

## 🎨 Banners

### GET `/api/banners`

Lista todos os banners disponíveis.

**Autenticação:** Não requerida

**Resposta de Sucesso (200):**

```json
{
  "banners": [
    {
      "id": 1,
      "title": "Banner Promocional",
      "image_url": "https://example.com/banner.jpg",
      "isActive": true
    }
  ]
}
```

---

### POST `/api/banners`

Cria um novo banner promocional.

**Autenticação:** Requerida (ADMIN)

**Limite:** Máximo de 10 banners no sistema

**Body:**

```json
{
  "title": "Banner Promocional",
  "image_url": "https://example.com/banner.jpg"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Banner created successfully",
  "banner": {
    "id": 1,
    "title": "Banner Promocional",
    "image_url": "https://example.com/banner.jpg",
    "isActive": true
  }
}
```

**Resposta de Erro (400):**

```json
{
  "message": "Maximum limit of 10 banners reached"
}
```

---

### PUT `/api/banners/:id`

Atualiza um banner existente.

**Autenticação:** Requerida (ADMIN)

**Parâmetros:**

- `id` (number) - ID do banner

**Body:**

```json
{
  "title": "Banner Atualizado",
  "image_url": "https://example.com/new-banner.jpg"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": "Banner updated successfully",
  "updatedBanner": {
    "id": 1,
    "title": "Banner Atualizado",
    "image_url": "https://example.com/new-banner.jpg",
    "isActive": true
  }
}
```

---

### DELETE `/api/banners/:id`

Deleta um banner.

**Autenticação:** Requerida (ADMIN)

**Parâmetros:**

- `id` (number) - ID do banner

**Resposta de Sucesso (200):**

```json
{
  "message": "Banner deleted successfully"
}
```

---

## ⚙️ Limites do Sistema

O sistema possui limites configurados para garantir performance e organização:

- **Produtos:** Máximo de 30 produtos
- **Banners:** Máximo de 10 banners
- **Categorias:** Máximo de 10 categorias
- **Carrinho:** Máximo de 10 produtos diferentes por usuário (não conta quantidade, apenas itens únicos)
- **Pedidos:** Máximo de 5 pedidos por usuário

Todos os limites são validados antes da criação e retornam mensagens de erro apropriadas quando excedidos.

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

O projeto está configurado para deploy no **Coolify** usando Dockerfile.

### Configuração do Deploy

1. O projeto utiliza **Dockerfile** (não Nixpacks)
2. Configure as variáveis de ambiente no Coolify:

   - `DATABASE_URL` - String de conexão do PostgreSQL
   - `JWT_SECRET_KEY` - Chave secreta para JWT
   - `PORT` - Porta do servidor (opcional, padrão: 3333)

3. **Migrations do Prisma:**
   - Opção 1: Configure o comando de start como `pnpm start:migrate` para rodar migrations automaticamente
   - Opção 2: Execute manualmente após o deploy: `prisma migrate deploy`

O Dockerfile está otimizado com multi-stage build e inclui:

- Node.js 20 Alpine
- pnpm 10.26.2
- Prisma 7.2
- Healthcheck configurado
- Usuário não-root para segurança

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
