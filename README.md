# eCommerce API

Welcome to the eCommerce API documentation. This API provides functionalities for managing users, products, reviews, and authentication. Below are the main features and endpoints available:

## Authentication

### SignUp

Create a new user account.

- **Endpoint:** `/signup`
- **Method:** `POST`
- **Request Body:** JSON
  ```json
  {
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "password123"
  }
#### Response: Newly created user details with an authentication token.

  
### LogIn

Authenticate and log in a user.


- **Endpoint:** `/login`
- **Method:** `POST`
- **Request Body:** JSON
  ```json
  {
  "email": "user@example.com",
  "password": "password123"
}
#### Response: User details with an authentication token.


