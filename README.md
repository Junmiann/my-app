# MapleSense

A full-stack web application for exploring and filtering MapleStory class data.
The application allows users to browse classes, filter by job and origin, and view detailed character information.

---

## Technologies

- TypeScript
- React (Vite)
- PostgreSQL
- REST API
- Tailwind CSS
- Docker Compose

---

## Features

- Browse all available classes  
- Filter classes by job and origin  
- Character detail pages including:
  - Primary and secondary weapon  
  - Difficulty (1–5)  
  - Mobility (1–5)  
  - Range (1–5)  
- UI built with Tailwind CSS  
- Custom REST API for fetching data from PostgreSQL  
- Containerized setup using Docker Compose  

---

## Setup

> Note: The application uses PostgreSQL with predefined schema and seed data.

### 1. Copy environment variables

```bash
cp .env.example .env
```

### 2. Build and start the application
```bash
docker compose up --build
```