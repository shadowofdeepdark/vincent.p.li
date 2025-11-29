// ==========================================
// Smooth Scroll & Navigation Highlight
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .hero-buttons a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // Active Navigation Highlight
    // ==========================================

    const sections = document.querySelectorAll('section[id]');
    const navMenuLinks = document.querySelectorAll('.nav-menu a');

    function highlightNavigation() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navMenuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Call on load

    // ==========================================
    // Fade-in Animation on Scroll
    // ==========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const fadeElements = document.querySelectorAll(
        '.research-card, .skill-category, .pub-item, .about-text, .contact-content'
    );

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ==========================================
    // Research Card Interaction
    // ==========================================

    const researchCards = document.querySelectorAll('.research-card');

    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-color)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--border-color)';
        });
    });

    // ==========================================
    // Navbar Background on Scroll
    // ==========================================

    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.boxShadow = 'var(--shadow-md)';
        } else {
            nav.style.boxShadow = 'var(--shadow-sm)';
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // Responsive Navigation (Mobile)
    // ==========================================

    // This could be extended with a hamburger menu for mobile
    // Currently using a simple responsive design that stacks items

    // ==========================================
    // External Links - Open in New Tab
    // ==========================================

    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ==========================================
    // Typing Effect for Hero (Optional Enhancement)
    // ==========================================

    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const originalText = heroDescription.textContent;
        heroDescription.style.opacity = '0';

        setTimeout(() => {
            heroDescription.style.opacity = '1';
            heroDescription.style.transition = 'opacity 0.8s ease-in';
        }, 300);
    }

    // ==========================================
    // Email Obfuscation (Simple Anti-Spam)
    // ==========================================

    // This provides minimal protection against basic email scrapers
    // The email is already visible in HTML, but this could be enhanced

    // ==========================================
    // Performance: Lazy Loading for Future Images
    // ==========================================

    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // ==========================================
    // Accessibility: Focus Management
    // ==========================================

    // Ensure keyboard navigation works smoothly
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // ==========================================
    // Console Message
    // ==========================================

    console.log('%cVincent Peiling Li - Psycholinguistic Researcher', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in collaboration? Email: s2189034@ed.ac.uk', 'color: #64748b; font-size: 12px;');

});

// ==========================================
// Utility Functions
// ==========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
