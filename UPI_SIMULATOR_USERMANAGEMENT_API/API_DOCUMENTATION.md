# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication (`/auth`)

### JWT Token Payload
The `access_token` contains the following fields:
```json
{
  "id": "60d0fe4f5311236168a109ca",
  "role": "amex",
  "features": ["feature_id_1", "feature_id_2"],
  "name": "John Doe",
  "email": "user@example.com",
  "iat": 1624354383,
  "exp": 1624355283
}
```

### Register User
**Endpoint:** `POST /auth/register`
**Body:**
```json
{
  "role": "amex", // Enum: "amex", "bravo", "mercury"
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "username": "johndoe"
}
```

### Login
**Endpoint:** `POST /auth/login`
**Body:**
```json
{
  "email": "user@example.com", // OR "username": "johndoe"
  "password": "password123"
}
```

### Refresh Token
**Endpoint:** `POST /auth/refresh`
**Body:**
```json
{
  "refresh_token": "uuid-string"
}
```

### Logout
**Endpoint:** `POST /auth/logout`
**Body:**
```json
{
  "refresh_token": "uuid-string"
}
```

---

## Users (`/users`)
*Requires Authentication Header: `Authorization: Bearer <token>`*

### Get All Users
**Endpoint:** `GET /users/all`
**Body:** None

### Update User
**Endpoint:** `PATCH /users/update`
**Body:**
```json
{
  "userId": "mongo_id_string",
  "updates": {
    "name": "New Name",
    "role": "bravo"
    // Any other field to update
  }
}
```

### Delete User
**Endpoint:** `DELETE /users/delete`
**Body:**
```json
{
  "userId": "mongo_id_string"
}
```

---

## Features (`/features`)
*Requires Authentication Header: `Authorization: Bearer <token>`*

### Add Feature
**Endpoint:** `POST /features/add`
**Body:**
```json
{
  "featureId": "unique_feature_id",
  "featureName": "Display Name"
}
```

### Map Feature to User
**Endpoint:** `POST /features/map`
**Body:**
```json
{
  "userId": "mongo_id_string",
  "featureId": "unique_feature_id"
}
```

### Unmap Feature from User
**Endpoint:** `POST /features/unmap`
**Body:**
```json
{
  "userId": "mongo_id_string",
  "featureId": "unique_feature_id"
}
```

---

## Dashboard (`/dashboard`)
*Requires Authentication Header: `Authorization: Bearer <token>`*

### Get Stats
**Endpoint:** `GET /dashboard/`
**Body:** None
**Response:**
```json
{
  "totalUsers": 10,
  "features": 5
}
```
