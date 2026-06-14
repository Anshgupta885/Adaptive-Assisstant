require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./src/models/connection');
const authRoutes = require('./src/routes/authroutes');

// Connect to Database
connectDB();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Adaptive Accessibility Assistant API');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;