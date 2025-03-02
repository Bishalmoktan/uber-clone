# User Registration Endpoint

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

---

# User Login Endpoint

## Endpoint

**POST** `/api/auth/login`

## Request Body

To log in a user, the following data must be included in the request body as JSON:

- `email`: A string representing the user's email address.
- `password`: A string representing the user's password.

### Example

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response

The response will include a status code, a token for authentication, and the user's details.

### Success Response

- **Status Code**: `200 OK`
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
    "email": "john.doe@example.com"
    "password": "hashedPasswordHere"
  }
}
```

### Error Response

#### Invalid Email or Password

- **Status Code**: `401 Unauthorized`
- **Content**:

```json
{
  "message": "Invalid email or password"
}
```

#### Validation Errors

If there are validation errors (e.g., missing fields, invalid email format), the response will be:

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

Ensure that all required fields are correctly filled out to avoid errors during login.

---

# Logout Endpoint

**GET** `/api/auth/logout`

### Description

This endpoint logs out the current user by clearing the authentication token stored in cookies and blacklisting the current token to prevent further use.

### Response

- **Status Code**: `200 OK`
- **Content**:

```json
{
  "message": "User logged out successfully!"
}
```

---

# User Profile Endpoint

**GET** `/api/users/profile`

### Description

This endpoint retrieves the profile information of the currently authenticated user. It requires the user to be logged in and to have a valid authentication token.

### Headers

- `Authorization`: Bearer token received upon login.

### Response

- **Status Code**: `200 OK`
- **Content**:

```json
{
  "_id": "user's unique identifier",
  "fullname": {
    "firstname": "User's first name",
    "lastname": "User's last name"
  },
  "email": "user@example.com"
  // Other user details may be included here
}
```

### Note

The actual response will include the user's profile information as stored in the database. The example above is a generic representation of what might be included in the response.
