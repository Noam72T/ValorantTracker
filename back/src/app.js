const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const apiRoutes = require('./routes/apiRoutes');
const errorHandler = require('./middlerware/errorHandler');
const { apiLimiter } = require('./middlerware/rateLimiter');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Route API
app.use('/api', apiLimiter, apiRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Valorant Tracker API is running' });
});


app.use(errorHandler);

module.exports = app;