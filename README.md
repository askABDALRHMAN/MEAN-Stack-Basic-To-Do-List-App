# MEAN Stack To-Do List

A small full-stack To-Do List application built with Angular, Express.js, Node.js, and MongoDB. It lets a user add tasks and view the tasks saved in the database.

## Project overview

The Angular frontend sends HTTP requests to an Express REST API. The API uses Mongoose to save and retrieve tasks in MongoDB. The database connection string is configured only on the backend; it is not part of the frontend bundle.

## Main features

- Add a task with non-empty text.
- Display tasks saved in MongoDB.

The project intentionally does not include accounts, editing, deleting, completion status, categories, or other task-management features.

## Technology stack

- MongoDB Atlas or a local MongoDB server
- Mongoose
- Node.js and Express.js
- Angular and TypeScript
- npm

## Project structure

```text
backend/
  src/
    models/
      todo.js
    routes/
      todos.js
  .env.example
  package.json
  package-lock.json
  server.js
frontend/
  src/
    app/
      app.component.ts
      todo.service.ts
    environments/
      environment.ts
    index.html
    main.ts
    styles.css
  angular.json
  package.json
  package-lock.json
  tsconfig.app.json
  tsconfig.json
.gitignore
README.md
```

## Prerequisites

- Node.js 20.19+ or 22.12+ and npm.
- A MongoDB database: MongoDB Atlas is suitable for a hosted database, or use a local MongoDB server for development.
- A terminal and a web browser.

Check the installed tools:

```powershell
node --version
npm --version
```

## Installation

Clone the repository or open the project directory. From the project root, install backend dependencies:

```powershell
cd backend
npm install
```

In a separate terminal, install frontend dependencies:

```powershell
cd frontend
npm install
```

The `package-lock.json` files are included in both application folders to make installs reproducible.

## Backend configuration

Create the backend's local environment file from the safe example. Run this from the project root:

```powershell
Copy-Item backend\.env.example backend\.env
```

The example contains these settings:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/todo-list
PORT=3000
FRONTEND_ORIGIN=http://localhost:4200
```

Update `MONGODB_URI` in `backend/.env` for the database you intend to use. `PORT` defaults to `3000`, and `FRONTEND_ORIGIN` defaults to `http://localhost:4200` if not set.

## MongoDB Atlas configuration

For a new Atlas setup:

1. Create or select an Atlas cluster and a database user in your own Atlas account.
2. In Atlas network access settings, allow the development machine's current IP address. Avoid opening database access to all IP addresses unless you understand and accept the risk.
3. Copy the Atlas connection string and replace the local example value of `MONGODB_URI` in `backend/.env`.
4. Replace any username/password placeholders with your own database user's credentials. URL-encode special characters in credentials when required by the connection-string format.
5. Keep `backend/.env` private. Do not commit or share it; each client or developer must supply their own credentials and network access settings.

MongoDB credentials belong in the backend environment only. Do not put them in `frontend/src/environments/environment.ts` or any other frontend file.

## Run the backend

From the `backend` directory, start the API:

```powershell
npm run dev
```

The `dev` script uses Node's built-in watch mode. For a non-watch start, use:

```powershell
npm start
```

The server connects to MongoDB before listening. If startup fails, check that `MONGODB_URI` is set, the connection string is valid, and Atlas network access permits the connection.

## Run the frontend

In a separate terminal, from the `frontend` directory:

```powershell
npm start
```

The Angular development server uses the API URL `http://localhost:3000/api`, configured in `frontend/src/environments/environment.ts`. If the backend URL changes, update that value and set the backend's `FRONTEND_ORIGIN` to the Angular app's origin.

## Local development URLs

- Angular app: <http://localhost:4200>
- Express API base URL: <http://localhost:3000/api>
- To-do collection endpoint: <http://localhost:3000/api/todos>

## API endpoints

### `GET /api/todos`

Returns the saved tasks as JSON with HTTP `200 OK`.

Example response:

```json
[
  { "text": "Buy groceries" }
]
```

### `POST /api/todos`

Creates a task. Send JSON with a non-empty `text` value:

```json
{ "text": "Buy groceries" }
```

Returns HTTP `201 Created` and the created task. Empty or whitespace-only text returns HTTP `400 Bad Request` with a simple error message.

## Basic usage and verification

1. Start MongoDB or configure an Atlas database, then start the backend and frontend in separate terminals.
2. Open <http://localhost:4200>. The app requests the saved task list from the API.
3. Enter task text and select **Add**. The API saves it in MongoDB and the app reloads the list.
4. To check the API directly, retrieve the list:

   ```powershell
   Invoke-RestMethod http://localhost:3000/api/todos
   ```

5. To add a task through the API:

   ```powershell
   Invoke-RestMethod -Method Post `
     -Uri http://localhost:3000/api/todos `
     -ContentType 'application/json' `
     -Body '{"text":"Verify the to-do API"}'
   ```

## Troubleshooting

- **Backend reports a MongoDB connection error:** Check `backend/.env`, confirm `MONGODB_URI` is correct, and verify MongoDB is reachable. For Atlas, check the database user and IP access list.
- **The browser cannot reach the API:** Confirm the backend is running on port `3000`, check the API URL in `frontend/src/environments/environment.ts`, and ensure `FRONTEND_ORIGIN` matches the frontend origin.
- **Port already in use:** Stop the other local process using the port or set a different backend `PORT`; update the frontend API URL if the backend port changes.
- **Dependencies or Angular CLI are missing:** Run `npm install` from the relevant `backend` or `frontend` directory. Angular CLI is installed as a project dependency; use `npm start` rather than requiring a global CLI installation.
- **Atlas rejects the connection:** Confirm the cluster is available, the database user's credentials are correct, and the current client IP is allowed. Special characters in credentials may need URL encoding.

## Security notes

- `backend/.env` contains private local configuration and is excluded by the root `.gitignore`.
- `backend/.env.example` contains only a local, non-secret MongoDB URI and safe defaults.
- Never commit a real MongoDB URI, username, password, or other credential. If a credential is ever committed or shared, revoke or replace it in the relevant service.
- Atlas users must configure their own database credentials and network access rules.
- The API is intended for local development and has no authentication or authorization. Do not expose it publicly with a production database without adding appropriate protections.

## Project limitations and scope

This is a small development project limited to adding tasks and displaying saved tasks. It does not provide authentication, authorization, editing, deleting, completion tracking, deployment configuration, or a production hosting setup. No public deployment is claimed.

## License

No license has been selected. The project owner should choose and add a license before distributing or reusing the project under specific terms.
