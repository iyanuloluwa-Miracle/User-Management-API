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

* `201 Created:` User registration successful. Returns the generated JWT.
* `400 Bad Request:` Invalid request body.
* `500 Internal Server Error:` Server encountered an error.

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

* `200 OK:` User login successful. Returns the generated JWT.
* `401 Unauthorized:` Invalid email or password.
* `404 Not Found:` User with the provided email not found.
* `500 Internal Server Error:` Server encountered an error.


## Get User by ID

```
GET /users/:id
```

Retrieve user information by ID.

### Request Parameters:

* id (number): User ID
  
#### Response: 


* `200 OK:` User found. Returns the user data.
* `401 Unauthorized:` Invalid or missing JWT.
* `404 Not Found:` User with the provided ID not found.
* `500 Internal Server Error:` Server encountered an error.

## Update User

```  
PUT /users/:id
 ```

Update user information by ID.

### Request Parameters:

* `id`(number): User ID

#### Request Body

```json
{
  "username": "updated_user123",
  "email": "updated_user123@example.com"
}
```

#### Response: 


* `200 OK:` User found. Returns the user data.
* `401 Unauthorized:` Invalid or missing JWT.
* `404 Not Found:` User with the provided ID not found.
* `500 Internal Server Error:` Server encountered an error.



## Delete User

```
DELETE /users/:id
```

Delete a user by ID.

### Request Parameters:

* `id`(number): User ID

#### Response: 


* `200 OK:` User found. Returns the user data.
* `401 Unauthorized:` Invalid or missing JWT.
* `404 Not Found:` User with the provided ID not found.
* `500 Internal Server Error:` Server encountered an error.

## Conclusion

The User Management API provides endpoints for user registration, login, retrieval, update, and deletion. All protected endpoints require authentication using JWT. Please make sure to include the JWT in the Authorization header for authorized requests.