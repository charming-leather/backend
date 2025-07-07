const express = require('express');
const app = express();
const port = 3000;

// Middleware to read JSON
app.use(express.json());

// Import routes
const customerRoutes = require('./routes/customerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


// Use the routes
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/payments', paymentRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
