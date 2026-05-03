// ===== Navigation Scroll Effect =====
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

// ===== Active Navigation Link (Auto-detect current page) =====
const navLinks = document.querySelectorAll('.nav-link');

// Get current page filename
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Set active link based on current page
navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    link.classList.remove('active');
    
    // Handle index.html or just "/"
    if ((currentPage === 'index.html' || currentPage === '' || currentPage === '/') && 
        (linkHref === 'index.html' || linkHref === '/')) {
        link.classList.add('active');
    } 
    // Handle other pages
    else if (linkHref === currentPage) {
        link.classList.add('active');
    }
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== Typing Effect (only on index page) =====
const typingText = document.getElementById('typingText');
if (typingText && (currentPage === 'index.html' || currentPage === '' || currentPage === '/')) {
    const texts = ['Chahinez Ayadi', 'Développeuse Web', 'Étudiante en Informatique'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before starting new text
        }
        
        setTimeout(typeText, typingSpeed);
    }

    // Start typing effect
    setTimeout(typeText, 1000);
}

// ===== Scroll Animations =====
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply animation to elements
document.querySelectorAll('.profil-content, .skill-category, .timeline-item, .project-card, .realisation-item, .veille-card, .entreprise-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
    }
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    alert('Merci pour votre message ! Je vous répondrai bientôt.');
    contactForm.reset();
});

// ===== Code Lines Animation Speed (only on index page) =====
if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const codeLines = document.querySelector('.code-lines');
        if (codeLines) {
            codeLines.style.animationDuration = `${20 - (scrolled * 0.01)}s`;
        }
    });
}

// ===== Parallax Effect for Hero (only on index page) =====
if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = `${1 - scrolled / window.innerHeight}`;
        }
    });
}

// ===== Skill Tags Hover Effect =====
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-2px)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ===== Project Cards Tilt Effect =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Console Log Easter Egg =====
console.log('%cBonjour ! 👋', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBienvenue sur le portfolio de Chahinez Ayadi', 'color: #94a3b8; font-size: 14px;');
console.log('%cSite développé avec passion ❤️', 'color: #10b981; font-size: 12px;');

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Theme Toggle (Bonus feature - can be activated later) =====
// Uncomment to add dark/light theme toggle
/*
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '🌙';
themeToggle.className = 'theme-toggle';
themeToggle.style.cssText = 'position: fixed; bottom: 2rem; right: 2rem; width: 50px; height: 50px; border-radius: 50%; background: var(--primary-color); border: none; color: white; cursor: pointer; font-size: 1.5rem; z-index: 1000; box-shadow: 0 4px 15px rgba(0,0,0,0.3);';
document.body.appendChild(themeToggle);
*/

