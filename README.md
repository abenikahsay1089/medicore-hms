# MediCore HMS – Enterprise Smart Hospital Management System

A production-grade Hospital Management System built with Spring Boot 3, React, PostgreSQL, Redis, and RabbitMQ.

## Architecture

```
React Frontend (Vite + MUI + Redux)
        │
Spring Boot API (Java 21)
        │
├── Authentication Module
├── Patient Module
├── Doctor Module (Phase 3)
├── Appointment Module (Phase 4)
├── Medical Records (Phase 5)
├── Prescription Module (Phase 6)
├── Pharmacy Module (Phase 7)
├── Laboratory Module (Phase 8)
├── Billing Module (Phase 9)
├── Notifications (Phase 10)
├── Analytics (Phase 11)
├── Inventory (Phase 12)
├── File Management (Phase 13)
├── Audit Logging (Phase 14)
└── Reporting (Phase 15)
        │
PostgreSQL | Redis | RabbitMQ | AWS S3
```

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Backend | Java 21, Spring Boot 3, Spring Security, JWT, JPA, Flyway |
| Frontend | React 18, TypeScript, Vite, Material UI, Redux Toolkit |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Messaging | RabbitMQ 3 |
| Storage | AWS S3 |
| DevOps | Docker, Docker Compose, GitHub Actions |

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Java 21 (for local backend development)
- Node.js 20+ (for local frontend development)

### Run with Docker

```bash
cp .env.example .env
docker-compose up -d
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8080/api/v1
- **Swagger UI:** http://localhost:8080/api/v1/swagger-ui.html
- **RabbitMQ Management:** http://localhost:15672

### Local Development

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Infrastructure only:**
```bash
docker-compose up -d postgres redis rabbitmq
```

## API Endpoints (Implemented)

### Authentication (Phase 1)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login |
| POST | `/auth/refresh` | Refresh token |
| POST | `/auth/logout` | Logout |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password |
| POST | `/auth/verify-email` | Verify email |

### Patients (Phase 2)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/patients` | Register patient |
| GET | `/patients` | List/search patients |
| GET | `/patients/{id}` | Get patient |
| PUT | `/patients/{id}` | Update patient |
| DELETE | `/patients/{id}` | Delete patient |
| POST | `/patients/{id}/documents` | Upload document |

## User Roles

- **Admin** – Full system access
- **Doctor** – Appointments, EMR, prescriptions, lab results
- **Nurse** – Patient registration, vitals
- **Receptionist** – Patients, appointments, billing
- **Pharmacist** – Medicines, prescriptions, inventory
- **Lab Technician** – Lab requests and results

## Project Structure

```
Hospital/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/medicore/
│   │   ├── config/          # Security, OpenAPI, properties
│   │   ├── controller/      # REST controllers
│   │   ├── domain/          # Entities & enums
│   │   ├── dto/             # Request/response DTOs
│   │   ├── exception/       # Global exception handling
│   │   ├── mapper/          # Entity-DTO mappers
│   │   ├── repository/      # JPA repositories
│   │   ├── security/        # JWT & auth filters
│   │   └── service/         # Business logic
│   └── src/main/resources/
│       ├── application.yml
│       └── db/migration/    # Flyway migrations
├── frontend/                # React SPA
│   └── src/
│       ├── api/             # Axios API clients
│       ├── components/      # Reusable components
│       ├── hooks/           # Custom hooks
│       ├── layouts/         # Page layouts
│       ├── pages/           # Route pages
│       └── store/           # Redux store
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## Development Phases

| Phase | Module | Status |
|-------|--------|--------|
| 1 | Authentication | ✅ Complete |
| 2 | Patient Management | ✅ Complete |
| 3 | Doctor Management | 🔲 Pending |
| 4 | Appointments | 🔲 Pending |
| 5 | Medical Records | 🔲 Pending |
| 6 | Prescriptions | 🔲 Pending |
| 7 | Pharmacy | 🔲 Pending |
| 8 | Laboratory | 🔲 Pending |
| 9 | Billing | 🔲 Pending |
| 10 | SMS Notifications | 🔲 Pending |
| 11 | Dashboard Analytics | 🔲 Pending |
| 12 | Inventory | 🔲 Pending |
| 13 | File Management | 🔲 Pending |
| 14 | Audit Logging | 🔲 Pending |
| 15 | Reporting | 🔲 Pending |

## License

Proprietary – MediCore HMS
