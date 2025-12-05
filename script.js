// ===================================
// SMOOTH SCROLL NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// STICKY NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===================================
// MODAL FUNCTIONALITY
// ===================================
const modals = {
    founder: document.getElementById('modal-founder'),
    investor: document.getElementById('modal-investor'),
    professional: document.getElementById('modal-professional'),
    student: document.getElementById('modal-student'),
    host: document.getElementById('modal-host')
};

// Open modal
document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', () => {
        const modalType = button.getAttribute('data-modal');
        if (modals[modalType]) {
            modals[modalType].classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
document.querySelectorAll('[data-close]').forEach(button => {
    button.addEventListener('click', () => {
        const modalType = button.getAttribute('data-close');
        if (modals[modalType]) {
            modals[modalType].classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modal when clicking outside
Object.values(modals).forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        Object.values(modals).forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================
const forms = {
    founder: document.getElementById('form-founder'),
    investor: document.getElementById('form-investor'),
    professional: document.getElementById('form-professional'),
    student: document.getElementById('form-student'),
    host: document.getElementById('form-host')
};

Object.entries(forms).forEach(([type, form]) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {
            role: type,
            name: formData.get('name'),
            email: formData.get('email'),
            whatsapp: formData.get('whatsapp'),
            goal: formData.get('goal')
        };

        // Add role-specific field
        if (type === 'founder') {
            data.company = formData.get('company');
        } else if (type === 'investor') {
            data.firm = formData.get('firm');
        } else if (type === 'professional') {
            data.currentRole = formData.get('role');
        } else if (type === 'student') {
            data.school = formData.get('school');
        } else if (type === 'host') {
            data.community = formData.get('community');
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Validate WhatsApp number (basic check)
        if (data.whatsapp.length < 10) {
            showNotification('Please enter a valid WhatsApp number', 'error');
            return;
        }

        // Log to console (in production, send to backend)
        console.log('Waitlist Signup:', data);

        // Show success message
        showNotification('🎉 Success! You\'re on the waitlist. We\'ll be in touch soon!', 'success');

        // Reset form and close modal
        form.reset();
        setTimeout(() => {
            modals[type].classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 2000);

        // In production, you would send this data to your backend:
        // fetch('/api/waitlist', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    });
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #7A3AFF, #FF4ECD)' : 'linear-gradient(135deg, #FF4E4E, #FF1744)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        z-index: 3000;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(`
    .problem-card,
    .solution-step,
    .how-step,
    .role-card,
    .trust-item,
    .roadmap-card
`);

animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===================================
// CHORDY CHARACTER ANIMATION
// ===================================
const chordyCharacter = document.querySelector('.chordy-character');
const speechBubble = document.querySelector('.speech-bubble');

if (chordyCharacter && speechBubble) {
    // Add wave animation on hover
    chordyCharacter.addEventListener('mouseenter', () => {
        chordyCharacter.style.animation = 'floatCharacter 1s ease-in-out';
    });

    // Show speech bubble after page load
    setTimeout(() => {
        speechBubble.style.opacity = '1';
    }, 1500);
}

// ===================================
// DYNAMIC BACKGROUND NODES & INTERACTION
// ===================================
function createAdditionalNodes() {
    const animatedBg = document.querySelector('.animated-bg');
    const nodeCount = 5; // Increased node count

    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.top = `${Math.random() * 100}%`;
        node.style.left = `${Math.random() * 100}%`;
        node.style.animationDelay = `${Math.random() * 10}s`;
        node.style.opacity = Math.random() * 0.5 + 0.3; // Random opacity
        animatedBg.appendChild(node);
    }
}

// Mouse interaction for background
document.addEventListener('mousemove', (e) => {
    const nodes = document.querySelectorAll('.node');
    const lines = document.querySelectorAll('.connection-line');

    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    nodes.forEach((node, index) => {
        const depth = (index % 5) + 1;
        const moveX = (mouseX - 0.5) * depth * 30; // Movement range
        const moveY = (mouseY - 0.5) * depth * 30;

        node.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    lines.forEach((line, index) => {
        const depth = (index % 3) + 1;
        const moveX = (mouseX - 0.5) * depth * 20;
        const moveY = (mouseY - 0.5) * depth * 20;

        // Keep the rotation but add translation
        const rotation = index === 0 ? 45 : index === 1 ? -30 : 15;
        line.style.transform = `rotate(${rotation}deg) translate(${moveX}px, ${moveY}px)`;
    });
});

// Create additional nodes on load
window.addEventListener('load', createAdditionalNodes);

// ===================================
// ROLE CARD INTERACTIONS
// ===================================
const roleCards = document.querySelectorAll('.role-card');

roleCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add subtle scale effect
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations can be added here
    });
});

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
// Trap focus in modal
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trap to all modals
Object.values(modals).forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (modal.classList.contains('active')) {
            trapFocus(modal);
        }
    });
});

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c👋 Welcome to Chordy.ai!', 'color: #7A3AFF; font-size: 24px; font-weight: bold;');
console.log('%cBuilding meaningful connections with AI', 'color: #FF4ECD; font-size: 14px;');
console.log('%cInterested in our tech? We\'re hiring! Email: careers@chordy.ai', 'color: #289BFF; font-size: 12px;');

// ===================================
// ANALYTICS PLACEHOLDER
// ===================================
// Track page views and interactions
function trackEvent(eventName, eventData = {}) {
    console.log('Event:', eventName, eventData);

    // In production, send to analytics service:
    // gtag('event', eventName, eventData);
    // or
    // analytics.track(eventName, eventData);
}

// Track waitlist button clicks
document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', () => {
        const role = button.getAttribute('data-modal');
        trackEvent('waitlist_button_click', { role });
    });
});

// Track form submissions
Object.entries(forms).forEach(([type, form]) => {
    form.addEventListener('submit', () => {
        trackEvent('waitlist_form_submit', { role: type });
    });
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercentage > maxScroll) {
        maxScroll = Math.floor(scrollPercentage / 25) * 25; // Track in 25% increments
        if (maxScroll > 0) {
            trackEvent('scroll_depth', { percentage: maxScroll });
        }
    }
});
