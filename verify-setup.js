#!/usr/bin/env node

// Instagram Login Setup Verification Script
const fs = require('fs');
const path = require('path');

console.log('🔍 Instagram Login Setup Verification\n');

// Check required files
const requiredFiles = [
    'index.html',
    'script.js', 
    'styles.css',
    'package.json',
    'netlify.toml',
    'netlify/functions/login.js',
    'netlify/functions/test.js'
];

console.log('📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesExist = false;
    }
});

// Check package.json configuration
console.log('\n📦 Checking package.json...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (!packageJson.type || packageJson.type !== 'module') {
        console.log('✅ No ES modules (correct for Netlify)');
    } else {
        console.log('❌ ES modules detected (may cause issues)');
    }
    
    if (packageJson.devDependencies && packageJson.devDependencies['netlify-cli']) {
        console.log('✅ Netlify CLI in devDependencies');
    } else {
        console.log('❌ Netlify CLI not found in devDependencies');
    }
} catch (error) {
    console.log('❌ Error reading package.json:', error.message);
}

// Check netlify.toml configuration
console.log('\n🌐 Checking netlify.toml...');
try {
    const netlifyToml = fs.readFileSync('netlify.toml', 'utf8');
    
    if (netlifyToml.includes('[[redirects]]')) {
        console.log('✅ Redirects configured');
    } else {
        console.log('❌ No redirects found');
    }
    
    if (netlifyToml.includes('directory = "netlify/functions"')) {
        console.log('✅ Functions directory configured');
    } else {
        console.log('❌ Functions directory not configured');
    }
} catch (error) {
    console.log('❌ Error reading netlify.toml:', error.message);
}

// Check frontend-backend integration
console.log('\n🔗 Checking frontend-backend integration...');
try {
    const scriptJs = fs.readFileSync('script.js', 'utf8');
    const loginJs = fs.readFileSync('netlify/functions/login.js', 'utf8');
    
    if (scriptJs.includes('/api/login')) {
        console.log('✅ Frontend calls /api/login endpoint');
    } else {
        console.log('❌ Frontend does not call /api/login');
    }
    
    if (loginJs.includes('exports.handler')) {
        console.log('✅ Backend uses correct Netlify function format');
    } else {
        console.log('❌ Backend function format incorrect');
    }
    
    if (scriptJs.includes('fetch(')) {
        console.log('✅ Frontend uses fetch for API calls');
    } else {
        console.log('❌ Frontend does not use fetch');
    }
} catch (error) {
    console.log('❌ Error checking integration:', error.message);
}

// Check for conflicting files
console.log('\n🚫 Checking for conflicting files...');
const conflictingFiles = [
    'vercel.json',
    '.vercelignore',
    'public/index.html'
];

let conflictsFound = false;
conflictingFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`❌ Conflicting file found: ${file}`);
        conflictsFound = true;
    }
});

if (!conflictsFound) {
    console.log('✅ No conflicting files found');
}

// Final summary
console.log('\n📊 SUMMARY:');
if (allFilesExist && !conflictsFound) {
    console.log('✅ Setup is READY for deployment!');
    console.log('\n🚀 Next steps:');
    console.log('1. npm install -g netlify-cli');
    console.log('2. netlify login');
    console.log('3. netlify deploy --prod');
    console.log('4. Set environment variables in Netlify dashboard');
} else {
    console.log('❌ Setup has issues that need to be fixed');
}

console.log('\n✨ Verification complete!');
