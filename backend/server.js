require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./src/routes/todos');

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is required. Configure it in backend/.env.');
}

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:4200' }));
app.use(express.json());
app.use('/api/todos', todoRoutes);

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Request body must be valid JSON.' });
  }

  console.error('API request failed:', error.name);
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
});

async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`To-Do API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error(
    'Failed to connect to MongoDB or start the API. Check MONGODB_URI and MongoDB network access.',
    error.name
  );
  process.exitCode = 1;
});
