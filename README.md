# Notes

Full stack app to create, edit, archive and delete notes, organize them with categories and filter by category.

**Live demo:** https://notes-pi-two.vercel.app/

## Tech stack

- **Backend:** Java 17, Spring Boot 3, Spring Data JPA, PostgreSQL (H2 for local use and tests)
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Axios

## Structure

```
backend/    Spring Boot REST API (layered: controller → service → repository)
frontend/   React + TypeScript single-page app
start.sh    Starts backend and frontend locally
```

## Run locally

Requirements: Java 17, Node.js 18+, Bash (Git Bash on Windows). Docker or a local PostgreSQL are optional.

```bash
./start.sh h2          # file-based H2 database, nothing to install
./start.sh docker      # PostgreSQL in a Docker container
./start.sh postgresql  # local PostgreSQL (asks for credentials)
```

The app opens at `http://localhost:5173` and the API runs on port 3000.

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `GET` / `POST` | `/api/notes` | List (optionally filtered) / create notes |
| `GET` / `PUT` / `DELETE` | `/api/notes/{id}` | Get / update / delete a note |
| `GET` / `POST` | `/api/categories` | List / create categories |
| `GET` / `PUT` / `DELETE` | `/api/categories/{id}` | Get / update / delete a category |

In production the API only accepts requests coming from the configured frontend origin (`FRONTEND_URL`).

## Tests

```bash
cd backend
./mvnw test
```

The tests run against an in-memory H2 database.
