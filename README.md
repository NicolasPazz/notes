# 📝 Notes Full Stack App

A full stack web application to manage notes with category assignment and filtering. Built with Spring Boot (Java), React (TypeScript), and Tailwind CSS.

## 📦 Project Structure

```
.
├── backend/        # Spring Boot + JPA (Java 17)
├── frontend/       # React + TypeScript + Vite + Tailwind CSS
├── start.sh        # Shell script to launch everything
└── README.md
```

---

## ✅ Requirements

To run this app you need:

- Java 17
- Node.js 18.17+
- npm 9+
- Maven 3.9+
- Bash (for Linux/macOS) or Git Bash (for Windows)
- One of the following options for persistence:
  - PostgreSQL installed locally
  - Docker (to use PostgreSQL via container)
  - Nothing (uses H2 file-based persistence)

---

## 🚀 Technologies Used

### Backend
- Java 17
- Spring Boot 3.5.0
- Spring Data JPA
- PostgreSQL / H2
- Maven

### Frontend
- React 18
- TypeScript 5
- Vite 6.3.5
- Tailwind CSS 3.4.3
- Axios

---

## 🖥️ Running the App Locally

Use the provided `start.sh` script:

```bash
./start.sh [profile]
```

Where `[profile]` is one of:

- `postgresql`: Prompts for your local DB username and password.
- `docker`: Uses PostgreSQL in a Docker container.
- `h2`: Uses H2 with file-based persistence (no installation required).

Examples:

```bash
./start.sh h2
./start.sh docker
./start.sh postgresql
```

Once running, the app will open in your browser at:

```
http://localhost:5173
```

---

## 🔐 Credentials

> No login is required for this application.

---

## 🌍 Deployment

> https://notes-pi-two.vercel.app/

---

## 📁 Data Persistence

- Data is stored using a relational database (PostgreSQL or H2).
- H2 uses a file-based DB at `./notes-db.mv.db` for persistence across sessions.

---

## 🧪 Notes

- Notes can be created, listed, deleted, and filtered by category.
- Categories are dynamically created on the frontend.
- Notes can be archived (via a toggle in the UI).

---

## ✨ Extra Features

- Switch between active and archived notes.
- Filter notes by category.
- Responsive UI styled with Tailwind CSS.

---

## 🔧 Setup Issues

If you encounter errors:

- Make sure PostgreSQL is running on port `5432`.
- If Docker is used, ensure it is installed and running.