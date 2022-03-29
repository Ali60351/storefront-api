CREATE TABLE product_order (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  order_id INTEGER NOT NULL,

  CONSTRAINT fk_order
    FOREIGN KEY (order_id)
    REFERENCES user_order (id)
);