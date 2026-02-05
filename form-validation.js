/**
 * Eagle Portfolio - Form Validation
 * Handles client-side validation for contact form
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('inquiryForm');
    
    if (!contactForm) return;
    
    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const consentCheckbox = document.getElementById('consent');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const consentError = document.getElementById('consentError');
    
    // Validation patterns
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
    consentCheckbox.addEventListener('change', validateConsent);
    
    // Form submission validation
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        if (!validateName()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateMessage()) isValid = false;
        if (!validateConsent()) isValid = false;
        
        if (!isValid) {
            e.preventDefault();
            const formStatus = document.getElementById('formStatus');
            formStatus.textContent = 'Please fix the errors above before submitting.';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
            
            // Hide status after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
    
    // Validation functions
    function validateName() {
        const value = nameInput.value.trim();
        if (value === '') {
            showError(nameError, 'Name is required');
            return false;
        } else if (value.length < 2) {
            showError(nameError, 'Name must be at least 2 characters');
            return false;
        } else {
            hideError(nameError);
            return true;
        }
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        if (value === '') {
            showError(emailError, 'Email is required');
            return false;
        } else if (!emailPattern.test(value)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        } else {
            hideError(emailError);
            return true;
        }
    }
    
    function validateMessage() {
        const value = messageInput.value.trim();
        if (value === '') {
            showError(messageError, 'Message is required');
            return false;
        } else if (value.length < 10) {
            showError(messageError, 'Message must be at least 10 characters');
            return false;
        } else {
            hideError(messageError);
            return true;
        }
    }
    
    function validateConsent() {
        if (!consentCheckbox.checked) {
            showError(consentError, 'You must agree to the privacy policy to submit');
            return false;
        } else {
            hideError(consentError);
            return true;
        }
    }
    
    // Helper functions
    function showError(element, message) {
        element.textContent = message;
        element.style.opacity = '1';
        element.style.height = 'auto';
        
        // Find the parent form group and add error class
        const parent = element.closest('.form-group');
        if (parent) {
            parent.style.marginBottom = '10px';
        }
    }
    
    function hideError(element) {
        element.textContent = '';
        element.style.opacity = '0';
        element.style.height = '0';
        
        // Find the parent form group and remove error class
        const parent = element.closest('.form-group');
        if (parent) {
            parent.style.marginBottom = '25px';
        }
    }
    
    // Auto-hide errors when user starts typing
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() !== '') hideError(nameError);
    });
    
    emailInput.addEventListener('input', () => {
        if (emailPattern.test(emailInput.value.trim())) hideError(emailError);
    });
    
    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim().length >= 10) hideError(messageError);
    });
    
    consentCheckbox.addEventListener('change', () => {
        if (consentCheckbox.checked) hideError(consentError);
    });
});