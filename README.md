# NexaProductivity

> A comprehensive productivity platform for students and professionals to manage tasks, track study sessions, organize notes, and stay on top of deadlines.

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Design Patterns](#design-patterns)
- [Database Schema](#database-schema)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

NexaProductivity is a modern productivity platform built with clean architecture principles and industry-standard design patterns. It combines task management, note-taking, focus session tracking, and smart notifications into a unified system designed for scalability and maintainability.

### Key Highlights

- Clean Architecture with clear separation of concerns
- Design Patterns: Singleton, Factory, Strategy, Adapter, Template Method, Composite
- SOLID principles adherence
- Real-time analytics and dashboard
- PostgreSQL database with Prisma ORM
- Modern React frontend with Tailwind CSS
- TypeScript throughout for type safety

## Features

### Task Management
- Create and organize tasks with hierarchical structure (parent-child relationships)
- Set priorities (low, medium, high) and track status (pending, in-progress, completed)
- Due date tracking with deadline notifications
- Composite pattern for flexible task trees

### Focus Session Tracking
- Pomodoro-style focus session recording
- Track study time by subject
- Session analytics with total time and subject breakdown
- Weekly study pattern visualization
- Work and break phase support

### Notes System
- Create, read, and update notes with rich content
- Automatic timestamp tracking
- Integration with revision tracking
- Spaced repetition support

### Smart Notifications
- Task deadline reminders
- Custom event reminders
- Configurable notification timing (e.g., "1 day before", "2 hours before")
- Email notification delivery
- Strategy pattern for extensible notification channels

### External Integrations
- Slack workspace integration
- Outlook calendar synchronization
- Adapter pattern for unified integration interface
- Provider-specific configuration storage

### Dashboard & Analytics
- Real-time statistics aggregation
- Study streak calculation
- Upcoming deadline tracking
- Revision topic identification
- Performance metrics and study score

## Architecture

NexaProductivity follows a layered architecture pattern:

```
┌─────────────────────────────────────────┐
│      Presentation Layer (React)         │
│   Components, Pages, State Management   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│     Controller Layer (Express)          │
│        HTTP Request Handlers            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│       Service Layer (Business)          │
│    Business Logic & Orchestration       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    Pattern Layer (Design Patterns)      │
│  Factory, Strategy, Template Method     │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    Data Access Layer (Prisma ORM)       │
│       Database Abstraction              │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    Database Layer (PostgreSQL)          │
│          Supabase Hosted                │
└─────────────────────────────────────────┘
```

For detailed architecture documentation, see [idea.md](idea.md).

## Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5
- **Language**: TypeScript 6
- **ORM**: Prisma 5
- **Database**: PostgreSQL (Supabase)
- **Validation**: TypeScript type system

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 8
- **Language**: TypeScript 6
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **Charts**: D3.js
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**: ESLint, TypeScript

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- PostgreSQL database (Supabase account recommended)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nexaproductivity.git
cd nexaproductivity
```

2. Install dependencies:
```bash
npm run install-all
```

### Environment Setup

#### Backend Configuration

1. Copy the example environment file:
```bash
cd backend
cp .env.example .env
```

2. Update `backend/.env` with your credentials:
```env
DATABASE_URL="postgresql://postgres.xxxxx:xxxxx@aws-x-xx-xxxx-x.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxxx:xxxxx@aws-x-xx-xxxx-x.pooler.supabase.com:5432/postgres"
ENCRYPTION_KEY="your-encryption-key-here"
PORT=4000
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
```

Generate an encryption key:
```bash
openssl rand -hex 32
```

#### Frontend Configuration

1. Copy the example environment file:
```bash
cd frontend
cp .env.example .env
```

2. Update `frontend/.env`:
```env
VITE_API_URL=http://localhost:4000/api
```

For detailed environment setup instructions, see [ENV_SETUP.md](ENV_SETUP.md).

### Database Setup

1. Push the schema to your database:
```bash
cd backend
npx prisma db push
```

2. Seed the database with sample data:
```bash
npm run seed
```

### Running the Application

#### Development Mode

Start both backend and frontend:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- API Health Check: http://localhost:4000/health

#### Production Mode

```bash
# Build frontend
cd frontend
npm run build

# Start backend
cd backend
npm run dev
```

## Project Structure

```
nexaproductivity/
├── backend/
│   ├── prisma/
│   │   ├── migrations/          # Database migrations
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.ts              # Seed data script
│   ├── src/
│   │   ├── controllers/         # HTTP request handlers
│   │   ├── services/            # Business logic
│   │   ├── entities/            # Domain models
│   │   ├── core/                # Core utilities (Factory, Database)
│   │   ├── notifications/       # Notification channels (Strategy)
│   │   ├── integrations/        # External connectors (Adapter)
│   │   ├── workflows/           # Workflow pipelines (Template Method)
│   │   ├── routes/              # API routes
│   │   ├── utils/               # Helper functions
│   │   └── server.ts            # Express server entry point
│   ├── .env.example             # Environment template
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── atoms/           # Basic components
│   │   │   ├── molecules/       # Composite components
│   │   │   ├── organisms/       # Complex components
│   │   │   └── templates/       # Page layouts
│   │   ├── pages/               # Page components
│   │   ├── context/             # State management (Zustand)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API services
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # Utility functions
│   │   ├── App.jsx              # Root component
│   │   └── main.jsx             # Entry point
│   ├── .env.example             # Environment template
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore                   # Git ignore rules
├── package.json                 # Root package file
├── README.md                    # This file
├── ENV_SETUP.md                 # Environment setup guide
├── idea.md                      # Low-level design document
├── classDiagram.md              # Class diagram
├── sequenceDiagram.md           # Sequence diagrams
├── ErDiagram.md                 # Entity relationship diagram
└── useCaseDiagram.md            # Use case diagram
```

## API Documentation

### Base URL
```
http://localhost:4000/api
```

### Endpoints

#### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:userId` - Get all tasks for a user
- `PATCH /api/tasks/:taskId/status` - Update task status

#### Notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/:userId` - Get all notes for a user
- `PATCH /api/notes/:noteId` - Update a note

#### Focus Sessions
- `POST /api/focus-sessions` - Create a focus session
- `GET /api/focus-sessions/:userId` - Get user's focus sessions
- `GET /api/focus-sessions/:userId/stats` - Get session statistics
- `GET /api/focus-sessions/:userId/weekly` - Get weekly session data

#### Notifications
- `POST /api/notifications/reminders` - Create a reminder
- `GET /api/notifications/reminders/:userId` - Get user's reminders
- `DELETE /api/notifications/reminders/:reminderId` - Delete a reminder

#### Integrations
- `POST /api/integrations/connect` - Connect an external service
- `POST /api/integrations/disconnect` - Disconnect a service
- `GET /api/integrations/:userId` - Get user's integrations

#### Dashboard
- `GET /api/dashboard/:userId` - Get dashboard data

#### System
- `GET /health` - Health check endpoint

### Request/Response Examples

#### Create Task
```bash
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-001",
    "title": "Complete project documentation",
    "priority": "high"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "Complete project documentation",
    "status": "pending",
    "priority": "high",
    "userId": "test-user-001",
    "createdAt": "2026-04-22T16:30:00.000Z"
  }
}
```

## Design Patterns

NexaProductivity implements several GoF design patterns:

### Singleton Pattern
- **Class**: `Database`
- **Purpose**: Single database connection instance
- **Location**: `backend/src/core/Database.ts`

### Factory Pattern
- **Class**: `ItemFactory`
- **Purpose**: Centralized object creation for Tasks and Notes
- **Location**: `backend/src/core/ItemFactory.ts`

### Strategy Pattern
- **Classes**: `Channel`, `EmailChannel`, `Notifier`
- **Purpose**: Dynamic notification channel selection
- **Location**: `backend/src/notifications/channels.ts`

### Adapter Pattern
- **Classes**: `Connector`, `SlackConnector`, `OutlookConnector`
- **Purpose**: Unified interface for external services
- **Location**: `backend/src/integrations/connectors.ts`

### Template Method Pattern
- **Classes**: `Pipeline`, `TaskPipeline`, `NotePipeline`
- **Purpose**: Workflow skeleton with customizable steps
- **Location**: `backend/src/workflows/pipeline.ts`

### Composite Pattern
- **Class**: `Task`
- **Purpose**: Hierarchical task structure
- **Location**: `backend/src/entities/Task.ts`

For detailed pattern documentation, see [classDiagram.md](classDiagram.md).

## Database Schema

### Entities

- **User** - User accounts
- **Task** - Tasks with hierarchical support
- **Note** - User notes
- **FocusSession** - Study session records
- **Notification** - Reminders and alerts
- **Integration** - External service connections

### Relationships

- User → Task (1:N)
- User → Note (1:N)
- User → FocusSession (1:N)
- User → Notification (1:N)
- User → Integration (1:N)
- Task → Task (1:N self-referencing)

For detailed schema documentation, see [ErDiagram.md](ErDiagram.md).

## Development

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Code Quality

```bash
# Lint frontend code
cd frontend
npm run lint

# Type check
npx tsc --noEmit
```

### Database Management

```bash
# Create a new migration
cd backend
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

### Adding New Features

1. Create entity models in `backend/src/entities/`
2. Update Prisma schema in `backend/prisma/schema.prisma`
3. Create service in `backend/src/services/`
4. Create controller in `backend/src/controllers/`
5. Add routes in `backend/src/routes/`
6. Create frontend components in `frontend/src/components/`
7. Add API calls in `frontend/src/services/api.ts`

## Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Build the application (if needed)
3. Run database migrations
4. Start the server

### Frontend Deployment

1. Update `VITE_API_URL` in `.env` to production API URL
2. Build the application:
```bash
cd frontend
npm run build
```
3. Deploy the `dist` folder to your hosting platform

### Recommended Platforms

- **Backend**: Railway, Render, Heroku, AWS, DigitalOcean
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Database**: Supabase, Railway, Neon

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Use meaningful variable and function names
- Write comments for complex logic
- Follow the existing code structure
- Add tests for new features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design patterns inspired by Gang of Four
- Architecture based on Clean Architecture principles
- UI components inspired by modern design systems

## Support

For questions, issues, or feature requests:

- Open an issue on GitHub
- Contact: support@nexaproductivity.com
- Documentation: [Wiki](https://github.com/yourusername/nexaproductivity/wiki)

---

Built with by the NexaProductivity Team
