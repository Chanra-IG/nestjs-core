# Nestjs Core

A core project structure for backend development.

## Table of Contents

- [Installation](#installation)
- [Get Started](#getstarted)
- [Folder Structure](#folderstructure)
- [Feature](#feature)
- [Changelog](#changelog)
- [License](#license)

## Installation

First, Install dependency:

```shell
  # using yarn
  $ yarn install

  # using npm
  $ npm install
```

## Getting Started

Second, Run the development server:

```shell
  # using yarn
  $ yarn dev

  # using npm
  $ npm run dev
```

## Folder Structure

```bash
.
└── src/
  ├── api
  ├── common
  │   ├── classes
  │   ├── constants
  │   ├── decorators
  │   ├── enums
  │   ├── exceptions
  │   ├── functions
  │   ├── guards
  │   ├── helpers
  │   ├── interceptors
  │   ├── middlewares
  │   ├── swagger
  │   ├── transformers
  │   ├── types
  │   ├── utils
  │   ├── validators
  │   └── index.ts
  ├── entities
  ├── i18n
  │   ├── en
  │   └── km
  ├── lib
  │   ├── config
  │   ├── firebase-admin
  │   ├── huawei
  │   ├── i18n
  │   ├── ioredis
  │   ├── jwt
  │   ├── log
  │   ├── payment
  │   ├── plasgate
  │   ├── rate-limiting
  │   ├── typeorm
  │   └── winston-logger
  ├── repositories
  ├── app.module.ts
  └── main.ts
```

## Feature
  - Database - Support TypeORM and Mongoose
  - Config Service
  - Internationalization/Translations (i18n)
  - File uploads - Huawei OBS
  - SMS - Plasgate
  - Mailing - nodemailer
  - Firebase
  - Redis
  - Rate Limiting
  - Winston Logger
  - Tile38
  - Swagger API Documentation

## Changelog

Check out - [changelog](CHANGELOG.md)

## License

