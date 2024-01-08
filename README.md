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


