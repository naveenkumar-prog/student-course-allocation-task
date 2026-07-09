# Database Schema

## Overview

The Student Course Allocation System uses **PostgreSQL** as its relational database and **Prisma ORM** for database access and schema management.

The schema is normalized to minimize data redundancy and maintain referential integrity. It consists of five primary entities:

- Student
- Course
- StudentPreference
- CourseReservation
- Allocation

---

# Entity Relationship Diagram

```text
                    Student
                       │
                 1      │      N
                       ▼
              StudentPreference
                       ▲
                 N      │      1
                       │
                    Course
                       │
                 1      │      N
                       ▼
             CourseReservation

Student
   │
   │ 1
   ▼
Allocation
   ▲
   │ N
Course
```

---

# Tables

## Student

Stores information about applicants.

| Column | Type | Description |
|---------|------|-------------|
| id | Integer | Primary Key |
| studentId | String | Unique Student Identifier |
| name | String | Student Name |
| marks | Integer | Marks obtained |
| category | Enum | GENERAL / OBC / SC / ST |
| applicationDate | DateTime | Admission application date |

Primary Key

```
id
```

Unique

```
studentId
```

---

## Course

Stores available courses.

| Column | Type | Description |
|---------|------|-------------|
| id | Integer | Primary Key |
| courseCode | String | Course Code |
| courseName | String | Course Name |
| totalSeats | Integer | Total seats available |

Primary Key

```
id
```

Unique

```
courseCode
```

---

## StudentPreference

Stores the priority order of course selections made by students.

| Column | Type | Description |
|---------|------|-------------|
| id | Integer | Primary Key |
| studentId | Integer | FK → Student |
| courseId | Integer | FK → Course |
| priority | Integer | 1 / 2 / 3 |

Relationships

```
Student
     1
     |
     |
     N
StudentPreference
     N
     |
     |
     1
Course
```

Unique Constraint

```
(studentId, priority)
```

This ensures a student cannot have two Priority 1 entries.

---

## CourseReservation

Stores reservation seat distribution for each course.

| Column | Type | Description |
|---------|------|-------------|
| id | Integer | Primary Key |
| courseId | Integer | FK → Course |
| category | Enum | GENERAL / OBC / SC / ST |
| seats | Integer | Reserved Seats |

Relationship

```
Course

1

N

CourseReservation
```

Business Rule

```
Sum of reservation seats
<=
Course.totalSeats
```

---

## Allocation

Stores final seat allocation.

| Column | Type | Description |
|---------|------|-------------|
| id | Integer | Primary Key |
| studentId | Integer | FK → Student |
| courseId | Integer | FK → Course |
| allocatedPriority | Integer | Priority Allocated |
| allocatedAt | DateTime | Allocation Timestamp |

Relationship

```
Student

1

1

Allocation

N

1

Course
```

---

# Constraints

## Student

- Student ID must be unique.

---

## Course

- Course Code must be unique.

---

## StudentPreference

- One priority per student.
- Valid course reference.
- Valid student reference.

---

## CourseReservation

- Reservation seats cannot exceed total course seats.

---

## Allocation

- Allocation generated only through allocation algorithm.

---

# Allocation Flow

```text
Students

↓

Sorted by Marks

↓

Check Priority 1

↓

Seat Available?

↓

YES → Allocate

↓

NO

↓

Priority 2

↓

Priority 3

↓

Not Allocated
```

---

# Database Design Decisions

The schema follows normalization principles.

Reasons:

- Avoid duplicate student data
- Separate preferences from allocation results
- Maintain reservation information independently
- Support re-running the allocation algorithm
- Maintain referential integrity using foreign keys

---

# Technologies

- PostgreSQL
- Prisma ORM
