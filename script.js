// ==========================================
// Initialize Lucide Icons
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================
    // Smooth Scroll
    // ==========================================

    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#' && href.length > 1) {
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
    // Navigation Shadow on Scroll
    // ==========================================

    const nav = document.querySelector('.nav');

    function updateNavShadow() {
        if (window.scrollY > 20) {
            nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavShadow);
    updateNavShadow();

    // ==========================================
    // Scroll Indicator (Homepage Only)
    // ==========================================

    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('.about');
            if (aboutSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = aboutSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });

        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100 && scrollIndicator) {
                scrollIndicator.style.opacity = '0';
            } else if (scrollIndicator) {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

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
    // Fade-in Animation on Scroll
    // ==========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in
    const fadeElements = document.querySelectorAll(
        '.nav-card, .research-item, .experience-item, .interest-item, .skill-group'
    );

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});
