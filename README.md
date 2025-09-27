
# 🏡 Apartment Listing App

A fullstack, secure, and responsive apartment listing web application built with Next.js, PostgreSQL, Prisma, and Docker. 
Users can browse apartments via infinite scrolling, view apartment details, search on apartment using either unit name, unit number or project.

## Demo 🎬
[27.09.2025 12_04.webm](https://github.com/user-attachments/assets/4a0593d7-ebeb-4f51-bd44-f1804d6b769f)


## 📦 Getting Started
### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Setup & Run

1. Clone the repo

```
git clone https://github.com/TheAbzo/Simple-Listing-Apartment.git
cd Simple-Listing-Apartment
```
2. Create .env file in frontend folder that has
```
# Server-side (inside backend/frontend container) 
API_URL=http://backend:4000 
# Client-side (browser) 
NEXT_PUBLIC_API_URL=http://localhost:4000 
PORT=3000
```
3. Create .env file in backend folder that has
```
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/apartments_app_db?schema=public"
PORT=4000
```
4. ⚠️ Make sure to adjust PostgreSQL credentials in the docker-compose.yml and .env files if your password is different from postgres.

5. Run the application with Docker Compose:
```
docker compose up -d --build
```
This will:
- Start the PostgreSQL database
- Build and start the backend
- Run migrations and seed the database
- Build and start the frontend
- Access the app:
-   Frontend: http://localhost:3000
-   Backend API: http://localhost:4000

### Stop the application
```
docker compose down
```

## 🚀 Features
- 🔐 **Secure:** Built with Prisma ORM to protect against SQL injection and other common security flaws.

- 📱 **Responsive:** Optimized UI/UX for desktop, tablet, and mobile views.

- 🔁 **Infinite Scrolling:** Effortless apartment browsing with pagination handled via infinite scrolling.

- 🧪 **Seeded Database:** Randomized seed data to simulate real-world listings.

- 🔍 **Search & Filter Functionality:** Quickly find apartments by unit name, unit number, or associated project.

- 🐳 **Dockerized:** One-command setup using Docker and Docker Compose.

## 🛠️ Stack
| Tech           | Purpose                              |
| -------------- | ------------------------------------ |
| **Next.js**    | Frontend                             |
| **PostgreSQL** | Primary database                     |
| **Prisma**     | Type-safe ORM with schema validation |
| **Docker**     | Containerization of app and services |
| **TypeScript** | Type safety throughout the project   |
| **Express.js** | Minimal, fast Node.js web framework  |


## 📂 Project Structure Overview
```
.
├── Simple Listing Apartment
├── -backend/
│   ├── -prisma/
│   │   ├── -migrations
│   │   ├── -schema.prisma  
│   │   └── -seed.ts
│   ├── src/
│   │   ├── -middlewares/
│   │   │   └── -errorHandler.ts
│   │   ├── -modules/
│   │   │   └── -apartment/
│   │   │       ├── -_tests_/
│   │   │       │   ├── -apartment.routes.test.ts
│   │   │       │   └── -apartment.service.test.ts
│   │   │       ├── -apartment.controller.ts
│   │   │       ├── -apartment.repository.ts
│   │   │       ├── -apartment.routes.ts
│   │   │       ├── -apartment.schema.ts
│   │   │       └── -apartment.service.ts
│   │   ├── -app.ts
│   │   ├── -config.ts
│   │   ├── -prismaClient.ts
│   │   └── -serevr.ts
│   ├── -.env
│   ├── -.eslintrc.json
│   ├── -.prettierrc
│   ├── DockerFile
│   ├── entrypoint.sh #deleted, not there anymore.
│   ├── jest.config.ts
│   ├── package.json
│   └── tsconfig.json
├── -frontend/
│   ├── -public/
│   │   └── -images
│   ├── -src/
│   │   ├── -app/
│   │   │   ├── -[...notFound]/
│   │   │   │   └── -page.tsx
│   │   │   └── -apartments/
│   │   │       ├── -[id]/
│   │   │       │   ├── -page.tsx
│   │   │       │   └── -details.module.scss
│   │   │       ├── -page.tsx
│   │   │       ├── -index.module.scss
│   │   │       ├── -layout.tsx
│   │   │       └── -global.css    
│   │   ├── -components/
│   │   │   ├── -AddApartmentModal/
│   │   │   │   ├── -index.tsx
│   │   │   │   └── -addApartmentModal.module.scss
│   │   │   ├── -ApartmentCard/
│   │   │   │   ├── -index.tsx
│   │   │   │   └── -ApartmentCard.module.scss
│   │   │   ├── -SearchBar/
│   │   │   │   ├── -index.ts
│   │   │   │   └── -searchBar.module.scss
│   │   │   └── -BackComponent.tsx
│   │   ├── -hooks/
│   │   │   └── -useApartments.ts
│   │   ├── -services/
│   │   │   └── -apartment.service.ts
│   │   └── -types/
│   │       └── -apartment.ts
│   ├── -.env
│   ├── -.eslintrc.json
│   ├── -.prettierrc
│   ├── DockerFile
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json  
├── -.gitignore
├── README.md
└── -docker-compose.yml
```

## 🧪 Testing & Validation
- Form validation for creating/adding apartments.
- Backend tested with 2 suites for routes & services.
- ✅ All tests pass in development.
<img width="400" height="145" alt="image" src="https://github.com/user-attachments/assets/22182bad-b6eb-47fa-9473-ece6dd5d4371" />






