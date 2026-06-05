# NestJS Auth API

Backend API for multi-tenant authentication and authorization built with NestJS. It includes features such as JWT authentication with asymmetric encryption implementation from scratch, TypeORM for database management, and PostgreSQL as the database.

## Project setup

```bash
pnpm install
```

## Running the development server

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# debug mode
pnpm run start:debug
```

> VS Code users can also use the provided launch configurations for debugging. Just run the "Debug NestJS API" configuration to start the development server in debug mode.

## Building and running production

```bash
# CI package installation
pnpm install --frozen-lockfile

# build the project
pnpm run build

# start the production server
pnpm run start:prod
```

## Linting & Formatting

Staged files are automatically linted with ESLint and formatted with Prettier on each commit. The commit is aborted if any issues remain unfixed.

For security reasons, scripts are ignored on install. For setting up Husky, run (if you haven't already):

```bash
pnpm prepare
```

## Database users

Create 2 users, one for migrations and one for CRUD operations:

```sql
-- Grant create schema permissions to migrations user
GRANT CREATE ON DATABASE your_database TO migrations_user;

-- Grand CRUD permissions to CRUD user & grant CRUD operations to specific tables
GRANT USAGE ON SCHEMA public TO crud_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE your_table TO crud_user;
```
