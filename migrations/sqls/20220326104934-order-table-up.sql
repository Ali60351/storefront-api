CREATE TABLE user_order (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  status VARCHAR(50) CHECK (status IN ('active', 'complete')) NOT NULL,

  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES store_user (id)
);