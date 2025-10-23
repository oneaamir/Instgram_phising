#!/bin/bash

# Instagram Login - Netlify Deployment Script

echo "🚀 Deploying Instagram Login to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Login to Netlify (if not already logged in)
echo "🔐 Logging into Netlify..."
netlify login

# Deploy to Netlify
echo "📦 Deploying to Netlify..."
netlify deploy --prod

echo "✅ Deployment complete!"
echo ""
echo "📝 Don't forget to set these environment variables in your Netlify dashboard:"
echo "   MONGODB_URI=mongodb+srv://instagram:Instgram123@cluster0.hi5k3nn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
echo "   MONGODB_DB=instagram"
echo "   MONGODB_COLLECTION=user"
echo ""
echo "🌐 Your app should now be live at your Netlify URL!"
