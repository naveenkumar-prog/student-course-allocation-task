# 🎓 Student Course Allocation System

A full-stack web application for managing student admissions and course allocation based on **merit, reservation policies, and student preferences**. The system automates the allocation process and provides an AI-powered assistant for querying admission data.

---

## 🚀 Features

### 👨‍🎓 Student Management
- Add, update and delete students
- Store student ID, name, marks, category and application date
- View all registered students

### 📚 Course Management
- Add, update and delete courses
- Configure total seats for each course
- View available courses

### ⭐ Student Preferences
- Students can choose three course preferences
- Update preferences anytime before allocation
- Preferences are stored with priority order

### 🎯 Course Reservations
- Configure reservation seats for:
  - GENERAL
  - OBC
  - SC
  - ST
- Validation prevents reserved seats from exceeding total course seats

### 📊 Seat Allocation
- Merit-based allocation
- Students sorted by:
  1. Marks (Descending)
  2. Application Date (Ascending)
- Allocation considers:
  - Student preferences
  - Reservation category
  - Available seats
- Allocation results stored in database

### 📈 Dashboard
- Total Students
- Total Courses
- Allocated Students
- Pending Students
- Allocation statistics using bar charts

### 🤖 AI Assistant
- Powered by Google Gemini API
- Answers questions using live database data
- Supports queries about:
  - Students
  - Courses
  - Reservations
  - Preferences
  - Allocations

---

# 🛠 Tech Stack

## Frontend

- React 19
- TypeScript
- React Router
- React Query
- React Hook Form
- Tailwind CSS
- Recharts
- Axios

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM

## Database

- PostgreSQL

## AI

- Google Gemini API

---

# 📂 Project Structure

```
student-course-allocation/

├── client/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── api/
│   └── types/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── prisma/
│   ├── config/
│   └── middleware/
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd server
```

Install packages

```bash
npm install
```

Create `.env`

```env
DATABASE_URL=postgresql://username:password@localhost:5432/student_allocation_db

GEMINI_API_KEY=your_api_key
```

Run Prisma

```bash
npx prisma generate
```

```bash
npx prisma migrate dev
```

Start server

```bash
npm run dev
```

---

## Frontend

```bash
cd client
```

Install packages

```bash
npm install
```

Start frontend

```bash
npm run dev
```

Application runs at

```
http://localhost:5173
```

---

# 🗄 Database

Main Tables

- Student
- Course
- StudentPreference
- CourseReservation
- Allocation

Relationships

```
Student
    |
    | 1:N
    |
StudentPreference
    |
    | N:1
    |
Course

Course
    |
    | 1:N
    |
CourseReservation

Student
    |
    | 1:1
    |
Allocation
    |
    | N:1
    |
Course
```

---

# 🔄 Allocation Algorithm

1. Remove previous allocation results.
2. Sort students by marks (highest first).
3. If marks are equal, use application date.
4. Check student's first preference.
5. Verify reservation seat availability.
6. Allocate if seat available.
7. Otherwise check second preference.
8. Otherwise check third preference.
9. Store allocation result.
10. Repeat until all students are processed.

---

# 🤖 AI Assistant

The AI Assistant receives the latest database information and answers user questions based on:

- Students
- Courses
- Preferences
- Reservations
- Allocations

Example Questions

```
How many students are allocated?

Who got Computer Science?

List all courses.

Show reservation details.

Who scored the highest marks?
```

If the requested information does not exist, the assistant responds accordingly.

> **Note:** The AI Assistant uses the **Google Gemini API Free Tier**, which is subject to daily request limits. If the quota is exceeded, AI responses will be temporarily unavailable until the quota resets.

---

# 📊 Dashboard

Dashboard displays:

- Total Students
- Total Courses
- Allocated Students
- Pending Students
- Students Allocated Per Course (Bar Chart)

---

# 📸 Screenshots

Add screenshots here.

- Dashboard
- Students
- Courses
- Preferences
- Reservations
- Allocation
- AI Assistant

---

# 📌 Future Enhancements

- User Authentication
- Role-Based Access Control
- Export Allocation Reports (PDF/Excel)
- Email Notifications
- Advanced Analytics Dashboard
- Bulk Student Import

---

# 👨‍💻 Author

**Naveenkumar R D**

Full Stack Developer

Tech Stack:
React • TypeScript • Node.js • Express.js • PostgreSQL • Prisma • Tailwind CSS

---

# 📄 License

This project was developed as part of a technical assessment and is intended for educational and demonstration purposes.