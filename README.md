# Leaky Bucket 

This project demonstrates the implementation of a leaky bucket strategy for rate limiting using Node.js, TypeScript, Koa.js, GraphQL, Relay and MongoDB. 

The focus is on creating an HTTP server with multi-tenancy support and token-based authentication, along with a leaky bucket strategy to manage query tokens.


## Features

- Node.js HTTP server using Koa.js
- Multi-tenancy support with token management per user
- GraphQL mutation for querying a simulated PIX key
- Leaky bucket rate limiting strategy
- Token management with hourly replenishment
- JWT authentication for securing API endpoints
- Integration testing with Jest 
- Postman collection for API testing
- Docker image available and docker-compose do deploy the project


## Leaky Bucket Strategy
The leaky bucket strategy is implemented as follows:

#### Initial Token Count: 
Each user starts with 10 tokens.

#### Request Handling: 
The **auth** route is responsible for generating tokens; the token expires one minute after creation. You have up to one minute to use it.

If you generate 10 tokens within the same minute and do not use any of them during this period, you will not be able to generate new tokens until they expire or you use them for validating a valid PIX key through the **pixkeyValidate** route.

If the PIX key validation returns success, the token count remains unchanged. 

When the PIX key validation returns a Pixkey invalid, the token count decreases by 1. If you exceed the limit of 10 invalid queries within one hour, your bucket will be empty, and you will not be able to generate new tokens and perform PIX key validations until new tokens are available in the bucket again through the refill strategy described below.

#### Hourly Replenishment: 

Every hour, 1 token is added to the user's token count, up to a maximum of 10 tokens.

## Getting Started - Docker-compose

To get started using Docker with this project, follow these steps:

### Prerequisites

- Docker and Docker-compose

### Installation

1. Clone the repository:

    ```bash
    $ git clone https://github.com/rafaelparma/leaky-bucket-graphql-relay.git
    $ cd leaky-bucket-graphql-relay
    ```

2. Run docker-compose command:

    ```bash
    $ docker-compose up -d
    ```

Wait until the Docker containers initialize, and the application will be available for use.



## Getting Started - NodeJS

To get started using NodeJS with this project, follow these steps:

### Prerequisites

- Node.js (>=14.0.0)
- MongoDB (local or remote instance)
- Yarn or npm

### Installation

1. Clone the repository:

    ```bash
    $ git clone https://github.com/rafaelparma/leaky-bucket-graphql-relay.git
    $ cd leaky-bucket-graphql-relay
    ```

2. Install dependencies:

    ```bash
    $ yarn install
    # or
    $ npm install
    ```
3. Set up your MongoDB instance and update the database connection string in .env file.

4. Create a .env file in the root directory with the following variables:
    ```bash
    APP_PORT=4000
    JWT_SECRET=your_jwt_secret
    MONGO_URI=mongodb://localhost:27017/leaky-bucket-graphql-relay   
    ```
5. Run the server:
    ```bash
    $ yarn start
    # or
    $ npm start
    ```

## Testing
Testing is conducted using Jest to validate the leaky bucket strategy.

Run tests with:
```bash
$ yarn test
# or
$ npm test
```

## Postman Collection


A Postman collection is included in the /leaky-bucket-graphql-relay/postman/ directory. 

Import it into Postman to test the API endpoints.

