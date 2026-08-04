# Insurance Management Platform

A full-stack Insurance Management Platform built as an internship evaluation project. Supports customer, policy, premium, and claim management with role-based access control, document handling, and an analytics dashboard.

## 🔗 Live Links

- **Frontend (Vercel):** https://insurance-management-platform-delta.vercel.app
- **Backend API (Render):** https://insurance-backend-avrs.onrender.com
- **API Docs (Swagger):** https://insurance-backend-avrs.onrender.com/swagger-ui/index.html
- **GitHub Repo:** https://github.com/sakshitmath/insurance-management-platform

> ⚠️ Note: The backend is hosted on Render's free tier, which spins down after inactivity. The first request after idle time may take 30–60 seconds to respond.

## 🛠 Tech Stack

**Backend:** Java 21, Spring Boot, Spring Security, JWT (jjwt), Spring Data JPA (Hibernate), PostgreSQL, Maven, Swagger/OpenAPI

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios, Chart.js

**Deployment:** Render (backend), Vercel (frontend)

## ✨ Features

- **Authentication & Authorization** — JWT-based login/register with role-based access (ADMIN, AGENT, CUSTOMER)
- **Customer Management** — Register, view, edit, search, and delete customers; unified customer history view
- **Policy Management** — Create, renew, and cancel insurance policies linked to customers
- **Premium Tracking** — Record and view premium payments per policy
- **Claim Management** — Submit claims, approve/reject workflow (role-restricted)
- **Document Management** — Upload and download customer documents
- **Reports Dashboard** — Visual analytics (policies by status, claims by status, total premium collected) using Chart.js
- **Pagination & Search** — Efficient listing for customers, policies, and claims
- **API Documentation** — Full Swagger/OpenAPI docs for all endpoints

## 📁 Project Structure

```
insurance-management-platform/
├── backend/          # Spring Boot REST API
│   └── src/main/java/com/insurance/backend/
│       ├── entity/       # JPA entities
│       ├── repository/   # Spring Data repositories
│       ├── dto/           # Request/response DTOs
│       ├── security/     # JWT + Spring Security config
│       ├── service/      # Business logic
│       ├── controller/   # REST controllers
│       └── exception/    # Global exception handling
└── frontend/          # React + Vite SPA
    └── src/
        ├── pages/        # Route-level components
        ├── layouts/      # Shared layout (sidebar navigation)
        ├── services/     # Axios API service modules
        └── context/      # Auth context (JWT/role state)
```

## 🔐 User Roles

| Role | Permissions |
|---|---|
| **ADMIN** | Full access — manage customers, policies, claims; delete customers |
| **AGENT** | Manage customers, policies; approve/reject claims |
| **CUSTOMER** | View own data, submit claims |

## 🚀 Running Locally

### Backend
```bash
cd backend
# Set environment variables: DB_USERNAME, DB_PASSWORD, JWT_SECRET
mvn spring-boot:run
```
Runs on `http://localhost:8081`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

## 📚 API Overview

| Module | Base Path |
|---|---|
| Auth | `/api/auth` |
| Customers | `/api/customers` |
| Policies | `/api/policies` |
| Premiums | `/api/premiums` |
| Claims | `/api/claims` |
| Documents | `/api/documents` |
| Reports | `/api/reports` |

Full interactive documentation available via Swagger UI (link above).
Screenshots of few:
Dashboard-<img width="1917" height="925" alt="image" src="https://github.com/user-attachments/assets/f9720b49-4ade-4271-9b86-cacff671f021" />
customer-<img width="1918" height="912" alt="image" src="https://github.com/user-attachments/assets/a88ef676-a2b7-44aa-bc20-b7b6d81662ad" />
claims-<img width="1917" height="866" alt="image" src="https://github.com/user-attachments/assets/20d2bf53-89ea-4d29-a959-f006e45cf170" />



## 👤 Author

**Sakshi Torgalmath**
GitHub: [@sakshitmath](https://github.com/sakshitmath)
