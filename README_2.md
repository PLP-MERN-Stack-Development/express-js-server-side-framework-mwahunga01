# Week 2 – Express.js RESTful API

A complete RESTful API for managing products using Express.js with full CRUD operations, middleware, validation, authentication, and error handling.

## Features
- CRUD operations on `/api/products`
- Custom logging middleware
- API key authentication (`x-api-key` header)
- Request body validation
- Custom error classes and global error handler
- Filtering by category, search by name, pagination
- Statistics endpoint
- Clean project structure

## Setup & Running

1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and set your own `API_KEY`
4. Start the server: `npm start`
5. Server runs at `http://localhost:3000`

## API Endpoints

| Method | Endpoint                    | Description                          | Requires Auth |
|--------|-----------------------------|--------------------------------------|----------------|
| GET    | `/`                         | Root – Hello message                 | No             |
| GET    | `/api/products`             | List products (?category, ?search, ?page, ?limit) | No |
| GET    | `/api/products/statistics`  | Product count by category            | No             |
| GET    | `/api/products/:id`         | Get single product                   | No             |
| POST   | `/api/products`             | Create new product                   | Yes            |
| PUT    | `/api/products/:id`         | Update product                       | Yes            |
| DELETE | `/api/products/:id`         | Delete product                       | Yes            |

### Example: Create a product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_actual_key_here" \
  -d '{
    "name": "Wireless Headphones",
    "description": "Noise-cancelling over-ear headphones",
    "price": 249.99,
    "category": "Electronics",
    "inStock": true
  }'
