CREATE TABLE store_user (
    id serial primary key,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE(firstName, lastName)
);