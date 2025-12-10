// Particles Animation
function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    createParticles();
    animate();
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const suffix = target >= 100 ? '' : (target === 10 ? '' : '%');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// Initialize counters when visible
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Urgency Banner Management
const urgencyBanner = document.querySelector('.urgency-banner');
if (urgencyBanner) {
    const navbar = document.querySelector('.navbar');
    navbar.classList.add('has-banner');
    
    // Close banner functionality (optional)
    // const closeBanner = document.createElement('button');
    // closeBanner.innerHTML = '×';
    // closeBanner.className = 'close-banner';
    // urgencyBanner.appendChild(closeBanner);
}

// Navigation Scroll Effect
const navbar = document.querySelector('.navbar');
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

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// AOS (Animate On Scroll) Implementation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Clients Carousel Enhancement
const clientsCarousel = document.getElementById('clientsCarousel');
if (clientsCarousel) {
    // Add mouse drag effect
    let isDown = false;
    let startX;
    let scrollLeft;
    
    clientsCarousel.addEventListener('mousedown', (e) => {
        isDown = true;
        clientsCarousel.style.cursor = 'grabbing';
        startX = e.pageX - clientsCarousel.offsetLeft;
        scrollLeft = clientsCarousel.scrollLeft;
    });
    
    clientsCarousel.addEventListener('mouseleave', () => {
        isDown = false;
        clientsCarousel.style.cursor = 'grab';
    });
    
    clientsCarousel.addEventListener('mouseup', () => {
        isDown = false;
        clientsCarousel.style.cursor = 'grab';
    });
    
    clientsCarousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - clientsCarousel.offsetLeft;
        const walk = (x - startX) * 2;
        clientsCarousel.scrollLeft = scrollLeft - walk;
    });
    
    // Add touch support for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    clientsCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - clientsCarousel.offsetLeft;
        touchScrollLeft = clientsCarousel.scrollLeft;
    });
    
    clientsCarousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - clientsCarousel.offsetLeft;
        const walk = (x - touchStartX) * 2;
        clientsCarousel.scrollLeft = touchScrollLeft - walk;
    });
    
    // Add cursor style
    clientsCarousel.style.cursor = 'grab';
}

// Client Logo Hover Effects
const clientLogos = document.querySelectorAll('.client-logo');
clientLogos.forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        // Add glow effect
        this.style.filter = 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.6))';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.filter = 'none';
    });
});

// Portfolio Items Hover Effect
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Contact: Replace native form with Tally embed if present
(() => {
    const el = document.querySelector('.contact-form');
    if (!el) return;

    // If it's already a div (already replaced), do nothing
    if (el.tagName === 'DIV') return;

    // If it's a FORM, replace it with a styled div containing the Tally iframe
    if (el.tagName === 'FORM') {
        const wrapper = document.createElement('div');
        wrapper.className = 'contact-form';
        const iframe = document.createElement('iframe');
        iframe.src = 'https://tally.so/r/xXr485?transparentBackground=1&hideTitle=1';
        iframe.width = '100%';
        iframe.height = '600';
        iframe.frameBorder = '0';
        iframe.marginHeight = '0';
        iframe.marginWidth = '0';
        iframe.title = 'Contact';
        wrapper.appendChild(iframe);
        el.replaceWith(wrapper);
    }
})();

// Cookie Banner
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');
const refuseCookies = document.getElementById('refuseCookies');

// Check if user has already made a choice
const cookieChoice = localStorage.getItem('cookieChoice');

if (!cookieChoice && cookieBanner) {
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 1000);
}

if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'accepted');
        cookieBanner.classList.remove('show');
    });
}

if (refuseCookies) {
    refuseCookies.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'refused');
        cookieBanner.classList.remove('show');
    });
}

// Parallax Effect for Hero Section (désactivé pour plus de fluidité au scroll)
// Si tu veux le réactiver plus tard, remets simplement le listener de scroll.

// Cursor Effect (Optional - adds a custom cursor)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .client-logo');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});

// Add CSS for custom cursor
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #000;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    }
    
    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Text Reveal Animation
const textRevealElements = document.querySelectorAll('.section-title, .section-subtitle');
textRevealElements.forEach(el => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(el);
});

// Enhanced CTA Button Effects
const ctaButtons = document.querySelectorAll('.btn-pulse');
ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Add ripple effect on click
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Lazy Loading for Images (if images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll to Top Button (Optional)
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #000;
    color: #fff;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initParticles();
    initCounters();
});

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initParticles();
        initCounters();
    });
} else {
    initParticles();
    initCounters();
}

// Add CSS for loaded state
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadedStyle);

// Typing Effect for Hero Title (Optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Console message
console.log('%cHachetag - Agence de Communication', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cSite développé avec passion ❤️', 'font-size: 14px; color: #666;');

