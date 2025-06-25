const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const devRoutes = require('./routes/devRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// use logger middleware
app.use(logger);

// Routes
app.use('/api/developers', devRoutes);

// Error handling middleware
app.use(errorHandler);

// Sample route
app.get('/', (req, res) => {
  res.send('DevConnect API running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
