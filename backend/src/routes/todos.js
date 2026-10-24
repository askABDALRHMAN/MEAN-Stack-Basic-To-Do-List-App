const express = require('express');
const Todo = require('../models/todo');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find().select('text -_id');
    return res.status(200).json(todos);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';

  if (!text) {
    return res.status(400).json({ error: 'To-do text is required.' });
  }

  try {
    const todo = await Todo.create({ text });
    return res.status(201).json({ text: todo.text });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
