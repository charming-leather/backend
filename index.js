const express = require('express')
const app = express()

app.use(express.json())

// Import routes
const usersRoute = require('./src/routes/users.route')
const authRoute = require('./src/routes/auth.route')
const productRoutes = require('./src/routes/products.routes');



// Use routes
app.use('/api/v1/', usersRoute)
app.use('/api/v1/', authRoute)
app.use('/api/v1/', productRoutes);


// Health check test route
app.get('/ping', (req, res) => {
  res.send('✅ Backend is alive');
});



// Start server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`🚀 Server is running at ${port}`)
})

// Start DB connection
require('./src/config/db')
