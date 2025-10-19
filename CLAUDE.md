# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Soccer Notebook is a web application for recording and tracking daily soccer goals and reflections. It uses a modern full-stack architecture with separate backend and frontend services.

## Technology Stack

- **Backend**: Kotlin with Spring Boot 3.2.5, targeting JVM 21
- **Frontend**: React 19.1 with TypeScript
- **Database**: PostgreSQL 16
- **API Specification**: OpenAPI 3.0.3 (contract-first approach)
- **Infrastructure**: Docker Compose for orchestration, Nginx as reverse proxy

## Backend Architecture (DDD + Onion Architecture)

The backend follows Domain-Driven Design with Onion Architecture, organized into separate Gradle modules:

```
backend/
├── domain/          # Core business logic, no external dependencies
├── application/     # Use cases and application services
├── infrastructure/  # External adapters (database, web config)
├── presentation/    # REST controllers (generated from OpenAPI)
└── shared/          # Runnable Spring Boot application that wires everything
```

**Dependency Flow**: `shared` → `presentation` → `application` → `domain`
- Domain layer has ZERO framework dependencies (pure Kotlin)
- Application layer uses Spring for DI only
- Infrastructure layer handles database access (Jooq planned)
- Presentation layer contains auto-generated OpenAPI controllers
- Shared module is the executable Spring Boot app that depends on all layers

## Development Commands

### Full Stack Development

```bash
# Start all services (backend, frontend, database, nginx)
docker compose up --build

# Access points:
# - Frontend: http://localhost/
# - Backend API: http://localhost/api/
# - Direct backend: http://localhost:8080/api/
# - Direct frontend: http://localhost:3000/
```

### OpenAPI Workflow

OpenAPI specs are split across multiple files:
- `openapi/paths/` - API endpoint definitions
- `openapi/components/schemas/` - Data model schemas
- `openapi/openapi.yaml` - Bundled output file

```bash
# Bundle split OpenAPI files into single spec
./gradlew bundleOpenApiSpec

# Generate backend Kotlin models from OpenAPI spec
# (bundleOpenApiSpec runs automatically before this)
./gradlew :backend:openApiGenerate
# Output: backend/build/generated/openapi

# Generate frontend TypeScript API client
cd frontend
openapi-generator-cli generate \
  -i ../openapi/openapi.yaml \
  -g typescript-fetch \
  -o src/generated
```

### Backend Development

```bash
# Build all backend modules
./gradlew build

# Build specific module
./gradlew :backend:domain:build
./gradlew :backend:shared:build

# Run backend tests
./gradlew test

# Run tests for specific module
./gradlew :backend:domain:test
./gradlew :backend:application:test

# Run the application locally (requires PostgreSQL running)
./gradlew :backend:shared:bootRun
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm build
```

## Important Architectural Patterns

### OpenAPI-First Development

This project uses contract-first API design:
1. Define/modify API in `openapi/paths/` or `openapi/components/schemas/`
2. Run `./gradlew bundleOpenApiSpec` to merge files
3. Run `./gradlew :backend:openApiGenerate` to generate backend models
4. Implement controllers by extending generated API interfaces
5. Generate frontend client with `openapi-generator-cli`

### Backend Code Generation

The presentation layer uses OpenAPI Generator to create:
- API interfaces (e.g., `NotesApi`, `UsersApi`)
- Request/Response models
- Controllers extend these generated interfaces

Example from `NotesController.kt`:
```kotlin
@RestController
class NotesController : NotesApi {
    override fun notesGet(page: Int, limit: Int): ResponseEntity<List<Note>> {
        // Implementation
    }
}
```

### Module Boundaries

When working on backend code:
- **Domain changes**: Edit `backend/domain/` - no Spring dependencies allowed
- **Business logic**: Edit `backend/application/` - Spring DI only
- **Database access**: Edit `backend/infrastructure/` - Jooq integration expected
- **API controllers**: Edit `backend/presentation/` - implement generated interfaces
- **Configuration**: Edit `backend/shared/src/main/resources/application.yml`

### Configuration

Backend configuration in `backend/shared/src/main/resources/application.yml`:
- Server runs on port 8080 with context path `/api`
- Jackson uses snake_case naming strategy
- Swagger UI available at `/api/swagger-ui.html`
- API docs at `/api/api-docs`

## Current Implementation Status

The project appears to be in early development:
- Controllers exist with dummy data (see `NotesController.kt`)
- Database integration is scaffolded but not fully implemented
- Frontend is scaffolded with React and Material-UI
- No authentication/authorization implemented yet (though OpenAPI spec includes `/login` and `/logout` endpoints)

## Database

PostgreSQL 16 configuration (docker-compose.yml):
- Database: `soccerdb`
- User: `soccer`
- Password: `soccerpass`
- Port: 5432

Migration files are expected in `migration/` directory (currently not fully set up).
