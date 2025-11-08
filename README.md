# Library_new

This repository contains a Vite + React frontend and a minimal Express backend scaffold for a library management application.

Quick status
- Frontend: `frontend/` (Vite, React, Tailwind)
- Backend: `backend/` (Express scaffold with auth endpoints)

Local development (frontend)

1. Open a terminal in `frontend/` and install deps:

```powershell
cd frontend
npm install
npm run dev
```

Local development (backend)

1. Open a terminal in `backend/` and install deps:

```powershell
cd backend
npm install
npm run dev
```

Notes
- The backend is a minimal scaffold that stores users in `backend/data/users.json` (file-based) and is intended for local development/testing only. Passwords are hashed with bcrypt and authentication issues return JWT tokens.
- The frontend currently uses a local-storage-based mock auth (`src/context/AuthContext.jsx`). You can switch it to call the backend auth endpoints by updating the AuthContext to use the API token.
- Do not commit secrets. Use `.env` files excluded by `.gitignore`.
# Library_new
This is my first devops project 
