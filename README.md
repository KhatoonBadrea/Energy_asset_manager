# Apollo Energy Asset Manager

A fullstack web application for managing and monitoring energy assets. Users can register, log in, create projects, and track tasks within each project — built as a Laravel REST API backend with a React + TypeScript frontend.

Built for the Apollo Green Solutions Fullstack Developer assessment.

---

## Tech Stack

| Layer       | Technology                        |
| ----------- | --------------------------------- |
| Backend     | Laravel 13 (PHP), Laravel Sanctum |
| Frontend    | React 18, TypeScript, Vite        |
| Database    | PostgreSQL                        |
| HTTP Client | Axios                             |
| Routing     | React Router DOM                  |

---

# Features

- User registration, login, and logout using token-based authentication.
- Users can create, view, update, and delete their own projects.
- Users can manage tasks inside each project.
- Task status tracking:
  - `todo`
  - `in_progress`
  - `done`
- Complete ownership isolation:
  - Users can only access their own projects.
  - Users can only manage tasks belonging to their projects.
- Responsive dashboard with instant UI updates without full-page reloads.

---

# Architecture and Design Decisions

## Backend Architecture

The backend follows a **domain-oriented architecture** instead of Laravel's default type-based organization.

Each domain (`Auth`, `Project`, `Task`) contains its related controllers, requests, resources, services, and policies.

Example structure:

```text
app/
├── Enums/
│   └── TaskStatus.php
│
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       ├── Auth/
│   │       ├── Project/
│   │       └── Task/
│   │
│   ├── Requests/
│   │   ├── Auth/
│   │   ├── Project/
│   │   └── Task/
│   │
│   └── Resources/
│       ├── Auth/
│       ├── Project/
│       └── Task/
│
├── Models/
│   ├── User.php
│   ├── Project.php
│   └── Task.php
│
├── Policies/
│   ├── Project/
│   └── Task/
│
├── Services/
│   ├── Auth/
│   ├── Project/
│   └── Task/
│
└── Support/
    └── ServiceResult.php
```

---

## Service Layer Pattern

All business logic is isolated inside dedicated service classes:

- `AuthService`
- `ProjectService`
- `TaskService`

Controllers are responsible only for:

- Receiving HTTP requests.
- Calling services.
- Returning formatted responses.

Benefits:

- Thin controllers.
- Reusable business logic.
- Easier testing and maintenance.
- Clear separation of responsibilities.

---

## ServiceResult Value Object

All services return a unified response object:

```php
ServiceResult
{
    success,
    data,
    message,
    status
}
```

This provides a consistent contract between services and controllers.

---

## Form Requests Validation

Validation logic is separated into dedicated Form Request classes.

Examples:

```
StoreProjectRequest
StoreTaskRequest
LoginRequest
RegisterRequest
```

Benefits:

- Cleaner controllers.
- Reusable validation rules.
- Easier testing.

---

## API Resources

All API responses are transformed using Laravel API Resources.

Example:

```
ProjectResource
TaskResource
UserResource
```

Advantages:

- Prevent exposing database structure directly.
- Avoid leaking sensitive fields.
- Maintain stable API responses.

---

## Authorization Using Policies

Authorization rules are handled using:

```
ProjectPolicy
TaskPolicy
```

Users can only:

- View their own projects.
- Update their own projects.
- Delete their own projects.
- Manage tasks belonging to their projects.

Tasks inherit ownership through:

```
User
 |
 └── Projects
        |
        └── Tasks
```

---

## Task Status Enum

Task status uses a PHP backed enum:

```php
enum TaskStatus:string
{
    case Todo = 'todo';
    case InProgress = 'in_progress';
    case Done = 'done';
}
```

This prevents invalid status values from reaching the database.

The database column remains a normal string, allowing future status changes without database migrations.

---

## Database Relationships

Relationship structure:

```
Users
 |
 └── Projects
        |
        └── Tasks
```

Features:

- One user has many projects.
- One project has many tasks.
- Cascade deletion enabled.

Deleting:

```
User
 ↓
Projects
 ↓
Tasks
```

Foreign keys are indexed for better query performance.

---

## Authentication Choice

Laravel Sanctum was selected instead of Passport because:

- This application is a single first-party SPA.
- OAuth2 complexity is unnecessary.
- Sanctum provides lightweight token authentication.

---

# Frontend Architecture

The React application follows the same domain-oriented approach.

Structure:

```text
src/
├── components/
│   ├── auth/
│   ├── layout/
│   ├── project/
│   └── task/
│
├── context/
│   └── AuthContext.tsx
│
├── pages/
│   ├── LoginPage
│   ├── RegisterPage
│   ├── DashboardPage
│   └── ProjectDetailsPage
│
├── routes/
│   ├── AppRoutes
│   └── ProtectedRoute
│
├── services/
│   ├── api.ts
│   ├── auth/
│   ├── project/
│   └── task/
│
└── types/
```

---

## Axios Configuration

A centralized Axios instance handles:

- API base URL.
- Authentication token injection.
- Unauthorized responses.

Features:

- Automatically attaches Bearer token.
- Automatically logs users out after token expiration.
- Components never communicate with Axios directly.

---

## Authentication State

React Context API is used instead of Redux.

Reason:

The application only needs to manage:

```
Current authenticated user
```

Context API provides:

- Less complexity.
- Smaller dependency footprint.
- Simple global state management.

---

## Frontend Service Layer

Each domain has its own API service:

```
authService
projectService
taskService
```

Components communicate with services instead of directly calling APIs.

---

## TypeScript Integration

Frontend interfaces match backend API Resources.

Example:

```
Backend Resource
        |
        ↓
TypeScript Interface
        |
        ↓
React Components
```

This provides compile-time type safety.

---

# Database Schema

```text
users
├── id (PK)
├── name
├── email
├── password
└── timestamps


projects
├── id (PK)
├── user_id (FK)
├── name
├── description
└── timestamps


tasks
├── id (PK)
├── project_id (FK)
├── title
├── description
├── status
└── timestamps
```

---

# API Endpoints

---

# API Documentation

Complete API documentation is available through Postman:

🔗 [View Postman API Documentation](https://documenter.getpostman.com/view/42627461/2sBY4ToxcS)

The documentation includes:

- Authentication endpoints
- Request parameters
- Request bodies
- Headers
- Example responses
- Available API routes

All protected endpoints require:


---

# Installation Guide

## Requirements

- PHP 8.3+
- Composer
- Node.js 20+
- npm
- PostgreSQL 14+

---

# Backend Setup

Clone repository:

```bash
git clone <repository-url>

cd energy-asset-manager
```

Install dependencies:

```bash
composer install
```

Create environment file:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Configure PostgreSQL:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=energy_asset_manager
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Create database:

```bash
createdb energy_asset_manager
```

Install Sanctum and migrate:

```bash
php artisan install:api

php artisan migrate:fresh --seed
```

Run backend:

```bash
php artisan serve
```

Backend URL:

```
http://localhost:8000/api
```

---

# Frontend Setup

Move to frontend:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Create:

```
.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Run:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# Testing The Application

1. Open:

```
http://localhost:5173/register
```

2. Create an account.

3. Create a project.

4. Add tasks.

5. Update and delete tasks.

---

# Future Improvements

- Password reset functionality.
- Pagination for projects and tasks.
- Automated test suite.
- More advanced filtering and searching.

---

# Author

**Khatoon Badrea**
