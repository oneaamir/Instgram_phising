#!/bin/bash

# Instagram Login - Production Deployment Script
echo "🚀 Starting Instagram Login Deployment..."

# Step 1: Clean up project
echo "📁 Cleaning up project files..."
rm -f server.js
rm -rf node_modules
rm -f package-lock.json

# Step 2: Install production dependencies
echo "📦 Installing production dependencies..."
npm install --production

# Step 3: Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Instagram Login Production Ready"
fi

# Step 4: Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Step 5: Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app is now live on Vercel!"
echo "📊 Check the Vercel dashboard for your live URL and analytics."
