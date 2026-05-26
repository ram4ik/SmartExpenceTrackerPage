// Internationalization (i18n)
let currentLanguage = 'en';

// Detect user's browser language
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0]; // Get primary language code

    // Map language codes to our available translations
    const langMap = {
        'en': 'en',
        'fi': 'fi',
        'sv': 'sv',
        'no': 'no',
        'nb': 'no', // Norwegian Bokmål
        'nn': 'no', // Norwegian Nynorsk
        'da': 'da',
        'nl': 'nl',
        'ru': 'ru',
        'de': 'de',
        'pl': 'pl',
        'cs': 'cs',
        'fr': 'fr',
        'it': 'it',
        'es': 'es',
        'pt': 'pt',
        'tr': 'tr',
        'ar': 'ar',
        'zh': 'zh',
        'ko': 'ko',
        'ja': 'ja',
        'tl': 'tl',
        'hi': 'hi'
    };

    return langMap[langCode] || 'en';
}

// Change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[lang];

        for (const k of keys) {
            value = value[k];
        }

        if (value) {
            // Handle HTML content with <br> or <span>
            if (element.querySelector('.highlight')) {
                const parts = key.split('.');
                if (parts[parts.length - 1] === 'title') {
                    const highlightSpan = element.querySelector('.highlight');
                    const titleText = translations[lang].hero.title;
                    const highlightText = translations[lang].hero.titleHighlight;
                    element.innerHTML = titleText + '<br><span class="highlight" data-i18n="hero.titleHighlight">' + highlightText + '</span>';
                }
            } else {
                element.textContent = value;
            }
        }
    });

    // Update language selector display
    document.getElementById('currentFlag').textContent = translations[lang].flag;
    document.getElementById('currentLang').textContent = translations[lang].name;

    // Update active state in dropdown
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.lang === lang) {
            option.classList.add('active');
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language dropdown
function initLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');

    Object.keys(translations).forEach(langCode => {
        const lang = translations[langCode];
        const option = document.createElement('div');
        option.className = 'language-option';
        option.dataset.lang = langCode;
        option.innerHTML = `
            <span class="flag">${lang.flag}</span>
            <span class="name">${lang.name}</span>
        `;
        option.addEventListener('click', () => {
            changeLanguage(langCode);
            document.getElementById('languageDropdown').classList.remove('show');
            document.getElementById('languageBtn').classList.remove('open');
        });
        dropdown.appendChild(option);
    });
}

// Toggle language dropdown
document.addEventListener('DOMContentLoaded', () => {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');

    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
        languageBtn.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('show');
        languageBtn.classList.remove('open');
    });

    // Initialize dropdown
    initLanguageDropdown();

    // Load preferred language or detect from browser
    const savedLang = localStorage.getItem('preferredLanguage');
    const detectedLang = detectLanguage();
    changeLanguage(savedLang || detectedLang);
});

// Screenshot Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.app-screenshot');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function moveCarousel(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

function currentSlideFunc(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

// Auto-advance carousel
setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 4000);

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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counter animation when hero section is visible
            if (entry.target.classList.contains('hero')) {
                setTimeout(animateCounter, 500);
            }
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe elements for scroll animations (excluding screenshot cards)
    const animatedElements = document.querySelectorAll('.leak-item, .feature-card, .testimonial');
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Observe hero section for counter animation
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        scrollObserver.observe(heroSection);
    }
    
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
    
    // Add click effect to CTA buttons for ripple animation
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