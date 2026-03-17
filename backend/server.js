require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const supabase = require('./config/supabase'); // If needed globally
const orderRoutes = require('./routes/orderRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize express app
const app = express();

const startServer = async () => {
  try {
    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/analytics', analyticsRoutes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      const statusCode = res.statusCode ? (res.statusCode === 200 ? 500 : res.statusCode) : 500;
      res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
