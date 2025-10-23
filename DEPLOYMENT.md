# 🚀 Deployment Guide

## Quick Start

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel --prod
```

## 📋 Pre-Deployment Checklist

### ✅ Environment Variables Setup

Before deploying, set up these environment variables in Vercel:

1. **MongoDB Atlas**
   - `MONGODB_URI`: Your MongoDB connection string
   - `MONGODB_DB`: Database name (default: instagram_login)
   - `MONGODB_COLLECTION`: Collection name (default: users)

2. **SendGrid Email**
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `ADMIN_EMAIL`: Email to receive notifications
   - `FROM_EMAIL`: Sender email address

### ✅ MongoDB Atlas Setup

1. **Create Account**: Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. **Create Cluster**: Choose free tier
3. **Create Database User**:
   - Username: `instagram_user`
   - Password: Generate strong password
4. **Whitelist IP**: Add `0.0.0.0/0` for Vercel
5. **Get Connection String**: Copy the connection string

### ✅ SendGrid Setup

1. **Create Account**: Go to [SendGrid](https://sendgrid.com/)
2. **Verify Sender**: Verify your email address
3. **Generate API Key**: Create API key with full access
4. **Test Email**: Send test email to verify setup

## 🔧 Vercel Configuration

### Environment Variables in Vercel Dashboard

1. Go to your project in Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB = instagram_login
MONGODB_COLLECTION = users
SENDGRID_API_KEY = SG.your_api_key_here
ADMIN_EMAIL = your_email@example.com
FROM_EMAIL = noreply@yourdomain.com
```

### Domain Configuration

1. **Custom Domain** (Optional):
   - Add your domain in Vercel dashboard
   - Update DNS records as instructed
   - SSL certificate is automatically provisioned

2. **Default Domain**:
   - Vercel provides: `your-project.vercel.app`
   - Use this for testing

## 🧪 Testing

### Local Testing
```bash
# Install dependencies
npm install

# Start development server
vercel dev

# Test at http://localhost:3000
```

### Production Testing
1. Deploy to Vercel
2. Test login form
3. Check MongoDB for stored data
4. Verify email notifications

## 📊 Monitoring

### Vercel Analytics
- View function logs in Vercel dashboard
- Monitor API response times
- Check error rates

### MongoDB Monitoring
- Monitor database performance
- Check storage usage
- View query performance

### Email Monitoring
- Check SendGrid dashboard
- Monitor email delivery rates
- View bounce rates

## 🔒 Security Checklist

### ✅ Production Security
- [ ] Environment variables are secure
- [ ] MongoDB user has minimal permissions
- [ ] SendGrid API key is restricted
- [ ] CORS is properly configured
- [ ] Input validation is enabled
- [ ] Rate limiting is active

### ✅ Data Protection
- [ ] Passwords are hashed with bcrypt
- [ ] No plain text passwords in logs
- [ ] Email notifications don't contain passwords
- [ ] Database connection is encrypted

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check connection string
   - Verify IP whitelist
   - Check database user permissions

2. **Email Not Sending**
   - Verify SendGrid API key
   - Check sender email verification
   - Review SendGrid logs

3. **CORS Errors**
   - Check CORS headers in API functions
   - Verify domain configuration

4. **Build Failures**
   - Check Node.js version compatibility
   - Review package.json dependencies
   - Check Vercel build logs

### Debug Mode

Enable debug logging by adding to environment variables:
```
DEBUG=true
NODE_ENV=development
```

## 📈 Performance Optimization

### Vercel Optimizations
- Use Vercel Edge Functions for better performance
- Enable Vercel Analytics
- Configure caching headers

### Database Optimizations
- Create indexes on frequently queried fields
- Monitor query performance
- Use connection pooling

### Email Optimizations
- Use SendGrid templates
- Implement email queuing
- Monitor delivery rates

## 🔄 Updates and Maintenance

### Regular Updates
- Update dependencies monthly
- Monitor security advisories
- Review and rotate API keys

### Backup Strategy
- MongoDB Atlas provides automatic backups
- Export data regularly
- Keep environment variables secure

## 📞 Support

### Vercel Support
- Documentation: [vercel.com/docs](https://vercel.com/docs)
- Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

### MongoDB Support
- Documentation: [docs.mongodb.com](https://docs.mongodb.com)
- Community: [community.mongodb.com](https://community.mongodb.com)

### SendGrid Support
- Documentation: [docs.sendgrid.com](https://docs.sendgrid.com)
- Support: [support.sendgrid.com](https://support.sendgrid.com)

---

**🎉 Your Instagram login page is now ready for production!**
