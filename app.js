const express = require('express');

const {notFoundHandler, errorHandler } = require('./middlewares/errorHandler')
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route'));
// Middleware to generate 404 error for undefined routes
app.use(notFoundHandler)

// Error handling middleware
app.use(errorHandler)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
