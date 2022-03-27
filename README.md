# Storefront API

## API Endpoints

By default server is running of `http://localhost:3000`.

| Endpoint                   | Purpose              | Authentication Required | Body                                                                   |
| -------------------------- | -------------------- | ----------------------- | ---------------------------------------------------------------------- |
| GET `/api/user`            | Index Users          | `True`                  |                                                                        |
| GET `/api/user/:id`        | Show User            | `True`                  |                                                                        |
| POST `/api/user/auth`      | Authenticate User    | `False`                 | `{ "first_name": "john", "last_name": "doe", "password": "12345678" }`   |
| POST `/api/user`           | Create User          | `False`                 | `{ "first_name": "john", "last_name": "doe", "password": "12345678" }`   |
| POST `/api/product`        | Create Product       | `True`                  | `{ "name": "football", "price": 150 }`                                 |
| GET `/api/product`         | Index Products       | `False`                 |                                                                        |
| GET `/api/product/:id`     | Show Product         | `False`                 |                                                                        |
| POST `/api/product-order/` | Create Product Order | `True`                  | `{ "user_id": 1, "product_id": 1, "quantity": 1, "status": "active" }` |
| GET `/api/cart/`           | Fetch Cart           | `True`                  |                                                                        |

### Authorization

Authorization is done via the `Authorization` header.

```md
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJqb2huIiwibGFzdG5hbWUiOiJkb2UiLCJwYXNzd29yZCI6IiQyYiQxMCRaRWFCZjFhbFQuZnRNU0tnY1BrZ1guZ2xJVVZTbGdVdmMxWWlmYjVjYk85ZjhOVXRZLms1dSJ9LCJ0eXBlIjoiVVNFUl9BVVRIIiwiaWF0IjoxNjQ4MzEzNjE0fQ.0Ynzn1jEbIt_i_9UdD1Pz59UZau0NlUfm0DWBXOR_P4
```

## Environment Setup

### Development

Filename: `.env.development`

```env
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

BCRYPT_PASSWORD=this-is-my-salt
SALT_ROUNDS=10

JWT_SECRET=jwt-secret-password-123
```

### Testing

Filename: `.env.test`

```env
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

BCRYPT_PASSWORD=this-is-my-salt
SALT_ROUNDS=10

JWT_SECRET=jwt-secret-password-123
```
