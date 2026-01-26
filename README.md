# GiftLink

![CI](https://github.com/1DeliDolu/fullstack-capstone-project/actions/workflows/main.yml/badge.svg?branch=main)
![Deploy](https://img.shields.io/badge/Deploy-Kubernetes%20%2B%20Code%20Engine-brightgreen)

A full-stack app for sharing and discovering gifts. Users can register, log in, browse gifts, filter search results, and update their profile name.

## Features
- Gift list and details page
- Filtered search (name, category, condition, age)
- JWT-based auth (register / login)
- Profile name update
- MongoDB seeding (auto-inserts gifts.json if collection is empty)

## Tech Stack
- Frontend: React 18, React Router, Bootstrap (CRA)
- Backend: Node.js, Express, MongoDB, JWT, bcryptjs, express-validator, Pino
- CI/CD: GitHub Actions (lint + client build)
- Deployment: Docker, Kubernetes manifests, IBM Code Engine, static server (giftwebsite), optional sentiment service

## Project Structure
- `giftlink-frontend/` React client
- `giftlink-backend/` Express API
- `giftwebsite/` Static server for production build
- `.github/workflows/main.yml` GitHub Actions workflow (lint + build)
- `deploymongo.yml` MongoDB Kubernetes deployment/service
- `giftlink-backend/deployment.yml` API Kubernetes deployment/service
- `sentiment/` Simple sentiment service (optional)
- `_docs/` Project docs

## Requirements
- Node.js 18+
- npm
- MongoDB 6+ (or Docker for MongoDB)
- Optional for containerized deployment: Docker, kubectl, IBM Cloud CLI (Code Engine)

## Environment Configuration
Create `.env` files where needed. Example values below.

### Backend (`giftlink-backend/.env`)
```dotenv
MONGO_URL=mongodb://127.0.0.1:27017
JWT_SECRET=change-me
```

### Backend (Kubernetes) (`giftlink-backend/.env`)
```dotenv
MONGO_URL=mongodb://mongodb-service:27017
JWT_SECRET=change-me
```

### Frontend (`giftlink-frontend/.env`)
```dotenv
REACT_APP_BACKEND_URL=http://127.0.0.1:3060
```

### MongoDB (Docker) (`giftlink-backend/.env`)
Used by `giftlink-backend/docker-compose.yml`:
```dotenv
MONGO_USERNAME=admin
MONGO_PASSWORD=secret
MONGO_HOST=127.0.0.1
MONGO_PORT=27017
MONGO_URL=mongodb://admin:secret@127.0.0.1:27017/?authSource=admin
```

### Optional Sentiment Service (`sentiment/.env`)
```dotenv
PORT=3000
```

## CI/CD (GitHub Actions)
Workflow: `.github/workflows/main.yml`
- Triggers on push and pull request to `main` or `master`
- `lint_js` job runs JSHint on key backend files
- `client_build` job installs deps and builds the React client

If JSHint reports ES6+ syntax errors, add `/*jshint esversion: 8 */` at the top of the flagged file.

## Containerization and Deployment
### Kubernetes (MongoDB + API)
- `deploymongo.yml` deploys MongoDB and exposes `mongodb-service` (NodePort 30007 by default).
- `giftlink-backend/Dockerfile` builds the API image (port 3060).
- `giftlink-backend/deployment.yml` deploys the API and exposes `gift-app-service` (port 80 -> 3060).
- Set `MONGO_URL=mongodb://mongodb-service:27017` in the backend `.env` when running in Kubernetes.
- In the lab, images are pushed to IBM Cloud Container Registry and referenced by the Kubernetes deployments.

### Frontend build + static server
- `giftlink-frontend` uses `postbuild` to copy `build/` into `giftwebsite/`.
- `giftwebsite/` serves the production build with Express on port 9000.
- `giftwebsite/Dockerfile` containerizes the static server for registry/IBM Code Engine deployment.

## Setup and Run

### 1) MongoDB
With Docker:
```bash
docker compose -f giftlink-backend/docker-compose.yml up -d
```

Local MongoDB:
```dotenv
MONGO_URL=mongodb://127.0.0.1:27017
```

### 2) Backend (API)
```bash
cd giftlink-backend
npm install
npm run dev
```
Default port: `3060`

### 3) Frontend
```bash
cd giftlink-frontend
npm install
npm start
```
Default port: `3000`

### 4) Production Build and Static Server
```bash
cd giftlink-frontend
npm run build
```
`postbuild` copies output to `giftwebsite/build`.
```bash
cd giftwebsite
npm install
node index.js
```
Default port: `9000`

### 5) (Optional) Sentiment Service
```bash
cd sentiment
npm install
node index.js
```
Default port: `3000` (set `PORT` to change).

## API Summary

### Auth
- `POST /api/auth/register`
  - body: `{ firstName, lastName, email, password }`
- `POST /api/auth/login`
  - body: `{ email, password }`
- `PUT /api/auth/update`
  - headers: `Email: <user@email>`
  - body: `{ name }`

### Gifts
- `GET /api/gifts` All gifts
- `GET /api/gifts/:id` Single gift
- `POST /api/gifts` Add new gift

### Search
- `GET /api/search?name=&category=&condition=&age_years=`

### Sentiment (optional)
- `POST /sentiment?sentence=...`

## Notes
- On backend startup, `giftlink-backend/util/import-mongo/gifts.json` is inserted if the collection is empty.
- The frontend reads the API base URL from `giftlink-frontend/src/config.js`.

## License
Licensed under the terms in `LICENSE`.
