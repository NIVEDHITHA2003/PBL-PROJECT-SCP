# API Documentation - Sustainable Campus Planning Tool

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Student"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Student",
  "token": "jwt_token"
}
```

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Student",
  "token": "jwt_token"
}
```

### Get Current User
**GET** `/auth/me`

**Headers:** Authorization required

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Student"
}
```

---

## Resource Endpoints

### Create Resource Entry
**POST** `/resources`

**Headers:** Authorization required

**Request Body:**
```json
{
  "electricityUsage": 450,
  "waterConsumption": 280,
  "wasteGenerated": 35,
  "month": 11,
  "year": 2024
}
```

**Response:**
```json
{
  "_id": "resource_id",
  "userId": "user_id",
  "electricityUsage": 450,
  "waterConsumption": 280,
  "wasteGenerated": 35,
  "month": 11,
  "year": 2024,
  "createdAt": "2024-11-15T10:00:00.000Z"
}
```

### Get All Resources
**GET** `/resources?month=11&year=2024`

**Headers:** Authorization required

**Query Parameters:**
- `month` (optional): Filter by month (1-12)
- `year` (optional): Filter by year

**Response:**
```json
[
  {
    "_id": "resource_id",
    "userId": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Student"
    },
    "electricityUsage": 450,
    "waterConsumption": 280,
    "wasteGenerated": 35,
    "month": 11,
    "year": 2024,
    "createdAt": "2024-11-15T10:00:00.000Z"
  }
]
```

### Update Resource
**PUT** `/resources/:id`

**Headers:** Authorization required

**Request Body:**
```json
{
  "electricityUsage": 400,
  "waterConsumption": 250
}
```

### Delete Resource
**DELETE** `/resources/:id`

**Headers:** Authorization required

**Response:**
```json
{
  "message": "Resource deleted"
}
```

### Get Analytics
**GET** `/resources/analytics`

**Headers:** Authorization required

**Response:**
```json
{
  "totalElectricity": 4500,
  "totalWater": 2800,
  "totalWaste": 350,
  "avgElectricity": 450,
  "avgWater": 280,
  "avgWaste": 35
}
```

---

## Admin Endpoints

### Get All Users
**GET** `/users`

**Headers:** Authorization required (Admin only)

**Response:**
```json
[
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Student",
    "createdAt": "2024-11-01T10:00:00.000Z"
  }
]
```

### Delete User
**DELETE** `/users/:id`

**Headers:** Authorization required (Admin only)

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation Error",
  "errors": ["Email is required"]
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 403 Forbidden
```json
{
  "message": "Role Student is not authorized"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Server Error"
}
```

---

## Testing with Postman

1. Import the collection
2. Set environment variable `baseURL` to `http://localhost:5000/api`
3. Register a user and copy the token
4. Set environment variable `token` to the JWT token
5. Use `{{baseURL}}` and `{{token}}` in requests
