# User-Management-API

The User Management API provides endpoints for managing user data, including user registration, login, retrieval, update, and deletion.

## Base URL

The base URL for all API endpoints is: http://localhost:3000/api


## Authentication

Most of the API endpoints require authentication using JSON Web Tokens (JWT). To authenticate a request, include the JWT in the `Authorization` header as follows:
```
Authorization: Bearer `<token>`
```

Replace `<token>` with a valid JWT obtained through the login or signup process.

## Endpoints

### User Registration

```
POST /signup
```

Register a new user with the provided username, email, and password.

Request Body:


```json
{
  "username": "user123",
  "email": "user123@example.com",
  "password": "password123"
}

```
#### Response

* 201 Created: User registration successful. Returns the generated JWT.
* 400 Bad Request: Invalid request body.
* 500 Internal Server Error: Server encountered an error.

### User Login

```
POST /login
```

Login an existing user with the provided email and password.

Request Body:

```json
{
  
  "email": "user123@example.com",
  "password": "password123"
}
```

#### Response

* 201 Created: User registration successful. Returns the generated JWT.
* 400 Bad Request: Invalid request body.
* 500 Internal Server Error: Server encountered an error.
