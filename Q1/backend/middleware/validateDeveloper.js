// backend/middleware/validateDeveloper.js

const validateDeveloper = (req, res, next) => {
  const { name, email, skills } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    return res.status(400).json({ message: 'Name must be at least 3 characters long' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!Array.isArray(skills) || skills.length === 0 || skills.some(skill => typeof skill !== 'string')) {
    return res.status(400).json({ message: 'Skills must be a non-empty array of strings' });
  }

  next(); // All validations passed
};

module.exports = validateDeveloper;
