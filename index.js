const express = require('express');
const app = express();
const cors = require('cors');
// Start DB connection
require('./src/config/db');
// Parse JSON bodies first
app.use(express.json());

// Import routes
const usersRoute = require('./src/routes/users.route');
const authRoute = require('./src/routes/auth.route');
const customerRoutes = require('./src/routes/customerRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const ordersRoutes = require ('./src/routes/ordersRoutes');

// CORS
app.use(cors({
  origin: "http://localhost:5173"
}));

// Use routes with proper base paths
app.use('/api/v1', usersRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/orders', ordersRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running at port ${port}`);
});
