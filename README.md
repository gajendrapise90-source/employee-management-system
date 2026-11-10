
# Employee Management System

A full-stack Employee Management System built using React, Node.js, Express, and MySQL.

## Features

- Add new employees
- View employee records
- Edit employee details
- Delete employees with confirmation
- Search by name, department, and role
- Sort employee records
- Dashboard statistics
- Form validation
- Responsive design

## Technology Stack

**Frontend:** React.js, Vite, CSS

**Backend:** Node.js, Express.js

**Database:** MySQL

**API Testing:** Postman

## Employee Fields

- Employee Name
- Department
- Role
- Salary
- Join Date

## Project Setup

### Backend

1. Open the backend folder.
2. Run `npm install`.
3. Configure the `.env` file with your MySQL credentials.
4. Run `node server.js`.

### Frontend

1. Open the frontend folder.
2. Run `npm install`.
3. Run `npm run dev`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/employees | Get all employees |
| POST | /api/employees | Add employee |
| PUT | /api/employees/:id | Update employee |
| DELETE | /api/employees/:id | Delete employee |

## Database

Database name: `employee_management_system`

Table name: `employees`

## Developer

Gajendra Pise
