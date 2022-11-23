# Sequelize MSSQL

## Description

[Sequelize MSSQL](https://github.com/bhaktibuana/sequelize-mssql) is a [NodeJs](https://nodejs.org/en) back-end project that created with the aim of demonstrating how to configure the [Sequelize](https://sequelize.org) library to be implemented on a back-end and using [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) as its database. In addition, in this project, a structured and neat folder structure is arranged with the aim that the code in the project is cleaner and easier to understand for back-end project.

In this project there is an example of fruit data where users can read, add, modify and delete data according to the authority of the user and also this project was created using the [ExpressJs](https://expressjs.com) library.

## What's in this app?

- REST API
- SQL Database
- JSON Web Token
- Authentication and Authorization
- Data Validation
- Password Encryption with SHA-256 Algorithm

## Libraries used

- [ExpressJs](https://expressjs.com)
- [Moment](https://momentjs.com)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Sequelize](https://sequelize.org)
- [Yup](https://github.com/jquense/yup)
- [Jest](https://jestjs.io)

## Requirements

Before do the installation, make sure you already have the minimum required software:

- [NodeJs Version 16.15.1 or later](https://nodejs.org/en)
- [SQL Server 2019 or later](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [SQL Server Management Studio 18 or later](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)
- [Postman](https://www.postman.com/downloads) (for API test)

## Installation

- First, you need to have this source code. You can download, fork, or clone this repository into your local repository.
- In the root project directory run `npm install` or `yarn` on your terminal.

## Restore the database

- In the root project directory, open `./database` and you will see the backup file named `Sequelize.bak`.
- Open your [SQL Server Management Studio](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16) and restore the backup file.

## Environment variable configuration

- In the root project directory, create new file named `.env`.
- You have to add some variables in that `.env` file with the following format:

```env
NODE_ENV=development

# express server variable
PORT=3001 # port number is up to you, 3001 is default for this project

# sql server variable
DB_USER=sa # sa is default user for SQL Server
DB_HOST=localhost # change with your host url or use "localhost" as default
DB_PASSWORD=your_password_here # change with your SQL Server password
DB_NAME=Sequelize # the default database name is "Sequelize"

# jwt variable
JWT_SECRET_KEY=your_secret_key # change with your JWT secret key for example "myS3cR3tK3y!!"
JWT_EXPIRED_TIME=4h # you can change this jwt expired time as you want

```

## Postman collection configuration (for API test)

- In the root project directory, open `./postman` and you will see the postman collection file named `Sequelize MSSQL.postman_collection.json`.
- Open your postman app and import the collection into your workspace.
- Everything you need to test the API is already there!

## Run the app

Congratulation! The installation and configuration is done, you are ready to run the project. Just go to root project directory and run `npm start` or `yarn start` on your terminal.

# API Usage

The use of the API in this project is divided into few grops. Before that, you need to read the authority to use the API.

## Authority

There are 4 layers of authority in this app: Guest, User, Admin, and Super Admin. Each of the layer has its own authority as follows:

### Guest

- Can register as a User
- Can login to get User authority

### User

- Can update its own data (self-update)
- Can change its own password
- Can get list of fruit

### Admin

- Has the authority that User's has
- Can get list of user
- Can get user detail
- Can create fruit data
- Can update fruit data
- Can delete fruit data
- Can restore fruit data

### Super Admin

- Has the authority that User's and Admin's have
- Can update other user's role
- Can delete user data
- Can update user data

## API

### User-Role

<details>
<summary><b>User role list</b></summary>

<p>

`GET` `/api/user-role`

_path params:_ none

_query params:_ none

_body:_ none

_response:_ JSON

```json
{
  "success": true,
  "status": 200,
  "message": "Fetch user role data success",
  "data": [
    {
      "id": "string",
      "roleCode": "string",
      "roleName": "string"
    }
  ]
}
```

</p>
</details>

### Users

### Fruits
