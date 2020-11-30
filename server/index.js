require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/database');
const app = express();

// App setup
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDB();

/**
 * ----------------- ROUTES ------------------------
 */

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
// app.use('/api/products', require('./routes/products'));

/**
 * ----------------- SERVER SETUP ------------------------
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
