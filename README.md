# Storefront API

## API Endpoints

By default server is running of `http://localhost:3000`.

| Endpoint                   | Purpose              | Authentication Required | Body                                                                   |
| -------------------------- | -------------------- | ----------------------- | ---------------------------------------------------------------------- |
| GET `/api/user`            | Index Users          | `True`                  |                                                                        |
| GET `/api/user/:id`        | Show User            | `True`                  |                                                                        |
| POST `/api/user/auth`      | Authenticate User    | `False`                 | `{ "first_name": "john", "last_name": "doe", "password": "12345678" }` |
| POST `/api/user`           | Create User          | `False`                 | `{ "first_name": "john", "last_name": "doe", "password": "12345678" }` |
| POST `/api/product`        | Create Product       | `True`                  | `{ "name": "football", "price": 150 }`                                 |
| GET `/api/product`         | Index Products       | `False`                 |                                                                        |
| GET `/api/product/:id`     | Show Product         | `False`                 |                                                                        |
| POST `/api/user-order/`    | Create User Order    | `True`                  | `{ "user_id": 1, "status": "active" }`                                 |
| POST `/api/product-order/` | Create Product Order | `True`                  | `{ "order_id": 1, "product_id": 1, "quantity": 1 }`                    |
| GET `/api/cart/`           | Fetch Cart           | `True`                  |                                                                        |

### Authorization

Authorization is done via the `Authorization` header.

```md
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJqb2huIiwibGFzdG5hbWUiOiJkb2UiLCJwYXNzd29yZCI6IiQyYiQxMCRaRWFCZjFhbFQuZnRNU0tnY1BrZ1guZ2xJVVZTbGdVdmMxWWlmYjVjYk85ZjhOVXRZLms1dSJ9LCJ0eXBlIjoiVVNFUl9BVVRIIiwiaWF0IjoxNjQ4MzEzNjE0fQ.0Ynzn1jEbIt_i_9UdD1Pz59UZau0NlUfm0DWBXOR_P4
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

## Usage

1. Run `nvm use` (Optional)
2. `npm i`
3. `npm run migrate`
4. `npm run start` or `npm run test`

Database should be running of `5432` port and the server will run on `3000`.
Other than postgres all packages are installed via npm.

## Postgres Setup

I personally used the default `postgres` user and password but any combination of user and password can be used.
Just make sure to update the env files accordingly.

```sql
DROP DATABASE storefront;
DROP DATABASE storefront_test;

CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```

After fresh databases are created run `npm run migrate` to run all migrations.

## Database Schema

```sql
-- The user for our store
CREATE TABLE store_user (
    id serial primary key,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE(first_name, last_name)
);

-- The products for our store
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(200)
);

-- The table responsible for linking a order and a user
CREATE TABLE user_order (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  status VARCHAR(50) CHECK (status IN ('active', 'complete')) NOT NULL,

  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES store_user (id)
);

-- Many to many table that contains products included in a order
CREATE TABLE product_order (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,

  CONSTRAINT fk_order
    FOREIGN KEY (order_id)
    REFERENCES user_order (id),

  CONSTRAINT fk_product
    FOREIGN KEY (product_id)
    REFERENCES product (id)
);
```
