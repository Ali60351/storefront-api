CREATE TABLE product_order (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  status VARCHAR(50) CHECK (status IN ('active', 'complete')) NOT NULL,

  CONSTRAINT fk_product
    FOREIGN KEY (product_id)
    REFERENCES product (id),

  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES store_user (id)
);