# Docker container for Webhook-API

## Requirements
- [Docker](https://docs.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/). It is not a necessity, but it's a lot easier to deploy/run.
- [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) database when running in db MODE. This is already set up in with docker-compose.

## How to run
* Clone the repo
* open the terminal in the repository's folder
* move into the _image/_ folder
* run the following command:
```
docker-compose up webhook-api-prod
```
* Send a Post request to : http://localhost:9876/api/webhooks with a url and a token
* Test that the webhook is being called by sending a Post request to : http://localhost:9876/api/webhooks/test

## How to run Tests

### Unit Tests
```
docker-compose up webhook-api-unit-tests
```

### Integration Tests
```
docker-compose up webhook-api-integration-tests
```

## Docker-Compose Services
* webhook-api-prod
* webhook-api-dev
* webhook-api-unit-tests
* webhook-api-integration-tests
* db

## Environment Variables
* NODE_ENV: How node should run. If running tests, it will not start the express server.
* STORAGE_MODE: How storage should be handled. Supports in memory or db dependency.

## How to set up the PostgreSQL database
**NOTE: This only needs to be setup if running a custom database.**

The schema for the database is available at _init.sql_ . 

The credentials and sql server information need to be specified as environment variables to the Webhook-API docker container.

```
SQL_USER: "postgres" # Database user
SQL_PASSWORD: "supersecurepassword" # Database password
SQL_DATABASE: "webhook" # Database name
SQL_HOST: db # Database hostname
SQL_PORT: 5432 # Database port
```

## API
This contains information about all the available endpoints

## Endpoints
    - /api : **GET method**
    - /api/webhooks : **POST method**
    - /api/webhooks/test : **POST method**

### /api

- Response format
```
{
"status": "running"
}
```

### /api/webhooks
- Content type: _application/json_
- Post data body format:
```
    {
        "url":"http://www.url.example.com", 
        "token": "stringExample"
    }
```

- Response format
```
200 OK
```

### /api/webhooks/test

- Content type: _application/json_
- Post data body format:
```
    {
        "payload":[ "any" , 
                    { "valid": "JSON" }
                  ]
    }
```

- Response format
```
200 OK
```


