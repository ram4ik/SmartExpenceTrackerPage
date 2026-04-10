// Animated counter for savings
function animateCounter() {
    const counter = document.querySelector('.counter-number');
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = '$' + Math.floor(current).toLocaleString();
    }, 30);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger counter animation when hero section is visible
            if (entry.target.classList.contains('hero')) {
                setTimeout(animateCounter, 500);
            }
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for animated elements
    const animatedElements = document.querySelectorAll('.leak-item, .feature-card, .testimonial');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Observe hero section for counter animation
    observer.observe(document.querySelector('.hero'));
    
    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add click tracking for App Store buttons
    document.querySelectorAll('a[href*="apps.apple.com"]').forEach(button => {
        button.addEventListener('click', () => {
            // You can add analytics tracking here
            console.log('App Store button clicked');
        });
    });
    
    // Add parallax effect to hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add floating animation to money emojis in phone mockup
    const phoneScreen = document.querySelector('.phone-screen');
    if (phoneScreen) {
        setInterval(() => {
            createFloatingMoney();
        }, 3000);
    }
});

// Create floating money animation
function createFloatingMoney() {
    const phoneScreen = document.querySelector('.phone-screen');
    if (!phoneScreen) return;
    
    const money = document.createElement('div');
    money.textContent = '💰';
    money.style.position = 'absolute';
    money.style.fontSize = '20px';
    money.style.left = Math.random() * 80 + '%';
    money.style.bottom = '0px';
    money.style.opacity = '0.7';
    money.style.pointerEvents = 'none';
    money.style.zIndex = '1';
    money.style.transition = 'all 2s ease-out';
    
    phoneScreen.appendChild(money);
    
    // Animate upward
    setTimeout(() => {
        money.style.bottom = '100%';
        money.style.opacity = '0';
    }, 100);
    
    // Remove element after animation
    setTimeout(() => {
        if (money.parentNode) {
            money.parentNode.removeChild(money);
        }
    }, 2100);
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to leak items
    document.querySelectorAll('.leak-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to CTA buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn-primary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);