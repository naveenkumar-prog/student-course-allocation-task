# Student Course Allocation System

# API Documentation

## Base URL

```
http://localhost:5000/api
```

---

# Authentication

No authentication is required for this assessment.

---

# Students API

## Get All Students

### Request

```
GET /students
```

### Response

```json
[
  {
    "id": 1,
    "studentId": "S001",
    "name": "Rahul",
    "marks": 95,
    "category": "GENERAL",
    "applicationDate": "2026-07-01T10:00:00Z"
  }
]
```

---

## Get Student By ID

```
GET /students/{id}
```

Example

```
GET /students/1
```

---

## Create Student

```
POST /students
```

Request Body

```json
{
  "studentId": "S001",
  "name": "Rahul",
  "marks": 95,
  "category": "GENERAL",
  "applicationDate": "2026-07-01T10:00:00"
}
```

Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Update Student

```
PUT /students/{id}
```

Request Body

```json
{
  "name": "Rahul Kumar",
  "marks": 97
}
```

---

## Delete Student

```
DELETE /students/{id}
```

---

# Courses API

## Get All Courses

```
GET /courses
```

---

## Get Course

```
GET /courses/{id}
```

---

## Create Course

```
POST /courses
```

Request

```json
{
  "courseCode": "CS101",
  "courseName": "Computer Science",
  "totalSeats": 60
}
```

---

## Update Course

```
PUT /courses/{id}
```

Request

```json
{
  "courseName": "Computer Science Engineering",
  "totalSeats": 80
}
```

---

## Delete Course

```
DELETE /courses/{id}
```

---

# Student Preferences API

## Get Student Preferences

```
GET /students/{studentId}/preferences
```

Example

```
GET /students/1/preferences
```

---

## Create Preferences

```
POST /students/{studentId}/preferences
```

Request

```json
{
  "preferences": [
    {
      "courseId": 1,
      "priority": 1
    },
    {
      "courseId": 2,
      "priority": 2
    },
    {
      "courseId": 3,
      "priority": 3
    }
  ]
}
```

---

## Update Preferences

```
PUT /students/{studentId}/preferences
```

Request

```json
{
  "preferences": [
    {
      "courseId": 2,
      "priority": 1
    },
    {
      "courseId": 1,
      "priority": 2
    },
    {
      "courseId": 3,
      "priority": 3
    }
  ]
}
```

---

## Delete Preferences

```
DELETE /students/{studentId}/preferences
```

---

# Course Reservation API

## Get Reservations

```
GET /courses/{courseId}/reservations
```

Example

```
GET /courses/1/reservations
```

---

## Update Reservations

```
PUT /courses/{courseId}/reservations
```

Request

```json
{
  "reservations": [
    {
      "category": "GENERAL",
      "seats": 20
    },
    {
      "category": "OBC",
      "seats": 15
    },
    {
      "category": "SC",
      "seats": 10
    },
    {
      "category": "ST",
      "seats": 5
    }
  ]
}
```

---

# Allocation API

## Run Allocation

```
POST /allocation/process
```

Description

Runs the seat allocation algorithm.

Response

```json
{
  "success": true,
  "message": "Allocation completed successfully"
}
```

---

## Get Allocation Results

```
GET /allocation
```

Response

```json
[
  {
    "student": {
      "name": "Rahul"
    },
    "course": {
      "courseName": "Computer Science"
    },
    "allocatedPriority": 1
  }
]
```

---

# Dashboard API

## Dashboard Statistics

```
GET /dashboard
```

Response

```json
{
  "totalStudents": 100,
  "totalCourses": 5,
  "allocatedStudents": 82,
  "pendingStudents": 18
}
```

---

## Course Allocation Statistics

```
GET /dashboard/course-stats
```

Response

```json
[
  {
    "courseName": "Computer Science",
    "students": 35
  },
  {
    "courseName": "Artificial Intelligence",
    "students": 28
  }
]
```

---

# AI Assistant API

## Ask AI

```
POST /ai/chat
```

Request

```json
{
  "question": "How many students are allocated?"
}
```

Response

```json
{
  "success": true,
  "data": "82 students have been allocated."
}
```

---

# HTTP Status Codes

| Code | Meaning |
|------|----------|
|200|Success|
|201|Created Successfully|
|400|Bad Request|
|404|Resource Not Found|
|500|Internal Server Error|

---

# API Workflow

```
React Frontend

↓

Axios Request

↓

Express Routes

↓

Controller

↓

Service Layer

↓

Prisma ORM

↓

PostgreSQL

↓

JSON Response

↓

React UI
```

---

# Technologies

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Axios
- React Query

---

# Notes

- Responses are returned in JSON format.
- Prisma ORM manages database interactions.
- Business validations are implemented in the service layer.
- Allocation logic is executed through a dedicated allocation endpoint.
- The AI Assistant uses Google Gemini API with live database context.
- The Gemini Free Tier is subject to API request limits.

---