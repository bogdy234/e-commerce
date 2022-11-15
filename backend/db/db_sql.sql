DROP TABLE IF EXISTS deposit;
DROP TABLE IF EXISTS customers_orders;
DROP TABLE IF EXISTS customers_address;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS products_category;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS roles;

CREATE TABLE "customers" (
  "cid" SERIAL PRIMARY KEY,
  "email" varchar(255) UNIQUE NOT NULL,
  "role" int NOT NULL,
  "first_name" varchar(255) NOT NULL,
  "last_name" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "registered_date" timestamp NOT NULL,
  "country" varchar(255) NOT NULL,
  "phone_number" varchar(255) NOT NULL,
  "vat" decimal NOT NULL,
  "active_token" int NOT NULL default 1
);

CREATE TABLE "deposit" (
  "id" SERIAL PRIMARY KEY,
  "user_cid" int UNIQUE NOT NULL,
  "amount" decimal NOT NULL,
  "sync_date" timestamp NOT NULL
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "role_name" varchar(255) NOT NULL
);

ALTER TABLE "customers" ADD FOREIGN KEY ("role") REFERENCES "roles" ("id");

ALTER TABLE "deposit" ADD FOREIGN KEY ("user_cid") REFERENCES "customers" ("cid") ON DELETE CASCADE;

INSERT INTO roles(role_name) VALUES ('ADMIN');
INSERT INTO roles(role_name) VALUES ('BASIC_USER');
