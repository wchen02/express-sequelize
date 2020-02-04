# express-sequelize

![Node.js CI](https://github.com/wchen02/express-sequelize/workflows/Node.js%20CI/badge.svg?branch=master&event=push)

A starter express server with sequelize that features RESTful API generation based on sequelize models.

## Features

- Automatically generate REST APIs for sequelize models
- Provides ability to override generated controllers and APIs

## Getting Started

### 1. Installing

```shell
git clone git@github.com:wchen02/express-sequelize.git
cd express-sequelize
npm install
npm install --only=dev
```

### 2. Choosing a database driver

You'll also have to manually install the driver for your database of choice:

```shell
npm install --save pg pg-hstore # Postgres
npm install --save mysql2
npm install --save mariadb
npm install --save sqlite3
npm install --save tedious # Microsoft SQL Server
```

If you need help with the database setup, please follow this [guide](https://sequelize.org/v5/manual/getting-started.html).

### 3. Setting up a connection

Put your database configuration in the .env

```shell
cp .env.example .env
```

### 4. Running migrations and seeds

```shell
npm run migrate
npm run seed
```

### 5. Starting the server

#### Development

```shell
npm run dev
```

#### Production

```shell
npm run start
```
