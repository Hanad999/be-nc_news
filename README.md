# nc_news project

[Hosted Version](https://black-hole-bwuf.onrender.com)

## Project Summary

This project is an application programming interface (API) that represents a real-world backend service such as Reddit by allowing programmatic access to application data. It offers endpoints for gaining access to and modifying user, comment, and article data. PostgreSQL is used as the database and Node.js and Express are used in the development of the API. The objective of this project is to develop a dependable backend service that can inform frontend design and serve as an example of how a backend service might operate in the real world.

### 1.Clone the Repository

git clone https://github.com/Hanad999/be-nc_news.git
cd your-repo

### 2.Seeding the Database

**Install Dependencies:**

Make sure you have Node.js and npm installed. Then, run:
`npm install`

**Seeding the Database**

#### 1.Set Up PostgreSQL

Ensure you have PostgreSQL installed and running on your machine.
Create the Databases
Create two databases, one for development and one for testing. Run the following commands in your PostgreSQL shell or any SQL client:
`DROP DATABASE IF EXISTS your_development_database_name;`
`DROP DATABASE IF EXISTS your_test_database_name;`
`CREATE DATABASE your_development_database_name;`
`CREATE DATABASE your_test_database_name;`

#### 2.Seed the Development Database

Run the setup and seeding scripts to create the necessary tables and populate your development database with initial data:
`npm run setup-dbs`
`npm run seed`

#### 3.Running Tests

To run the test suite, use:
`npm test`

## Instruction for the files needed to connect to the databases

In order to connect Successfully you need to add two .env files. These files store the name of your databases , the files
that has you testing database should be called test and the file that has your development database should be called development.

## Instruction for Setting up the environment variables:

1.Create a .env.development file in the root of your project with the following
2.Set your database: PGDATABASE = your development database name
3.Create a .env.test file in the root of your project with the following
4.Set your database: PGDATABASE = your test database name

**Dependencies**
dotenv: ^16.0.0
express: ^4.19.2
jest: ^27.5.1
jest-extended: ^2.0.0
jest-sorted: ^1.0.15
pg: ^8.7.3
supertest: ^7.0.0
pg-format: ^1.0.4

**Dev Dependencies**
husky: ^8.0.2

## Minimum Requirements

Node.js: >=22.2.0
PostgreSQL: >=14.12

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
