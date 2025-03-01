# User Registration Endpoint

This document outlines the details of the registration endpoint for users in the application.

## Endpoint

**POST** `/api/auth/register`

## Request Body

To register a new user, the following data must be included in the request body as JSON:

- `fullname`: An object containing:
  - `firstname`: A string representing the user's first name (minimum 3 characters).
  - `lastname`: A string representing the user's last name (minimum 3 characters, optional).
- `email`: A string representing the user's email address (must be unique and at least 5 characters long).
- `password`: A string representing the user's password.

### Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response

The response will include a status code, a token for authentication, and the user's details.

### Success Response

- **Status Code**: `201 Created`
- **Content**:

```json
{
  "token": "jwt.token.here",
  "user": {
    "_id": "user's unique identifier",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "password": "hashedPasswordHere",
    "email": "john.doe@example.com"
  }
}
```

### Error Response

If there are validation errors or missing fields in the request, the response will be:

- **Status Code**: `400 Bad Request`
- **Content**:

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "Field name",
      "location": "body"
    }
  ]
}
```

Ensure that all required fields are correctly filled out to avoid errors during registration.
