CREATE TABLE store_user (
    id serial primary key,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE(first_name, last_name)
);