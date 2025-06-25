const express = require('express');
const router = express.Router();
const validateDeveloper = require('../middleware/validateDeveloper');

// Mock in-memory "database"
let developers = [];

// 📥 GET all developers
router.get('/', (req, res) => {
  res.json(developers);
});

// ➕ POST add new developer
router.post('/', validateDeveloper, (req, res) => {
  const { name, email, skills } = req.body;

  const newDeveloper = {
    id: Date.now(),
    name,
    email,
    skills,
  };

  developers.push(newDeveloper);
  res.status(201).json(newDeveloper);
});

// ✏️ PUT update a developer
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = developers.findIndex((dev) => dev.id == id);

  if (index === -1) {
    return res.status(404).json({ message: 'Developer not found' });
  }

  developers[index] = { ...developers[index], ...req.body };
  res.json(developers[index]);
});

// ❌ DELETE a developer
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = developers.length;
  developers = developers.filter((dev) => dev.id != id);

  if (developers.length === initialLength) {
    return res.status(404).json({ message: 'Developer not found' });
  }

  res.json({ message: 'Developer deleted successfully' });
});

module.exports = router;
