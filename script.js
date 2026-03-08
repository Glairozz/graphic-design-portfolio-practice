document.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.href;
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = href;
        });
    });
});

const texts = [
    "Fullstack Developer",
    "Aspiring Software Engineer",
    "Creative Problem Solver",
    "Lifelong Learner"
];

let currentText = 0;
let charIndex = 0;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetweenTexts = 1500;

const typedText = document.getElementById('typed-text');

function type() {
    if (charIndex < texts[currentText].length) {
        typedText.textContent += texts[currentText].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(deleteText, delayBetweenTexts);
    }
}

function deleteText() {
    if (charIndex > 0) {
        typedText.textContent = texts[currentText].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteText, deletingSpeed);
    } else {
        currentText = (currentText + 1) % texts.length;
        setTimeout(type, typingSpeed);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.image-container img').forEach((img, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            img.style.transform = `translate(${x}px, ${y}px) scale(1)`;
        });
    });

    // Enhanced scroll animations with Intersection Observer
    const scrollObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }
        });
    }, scrollObserverOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.hero-content, .image-container, .project-item, .certificates, .skill-card, .education-small, .three-column > div');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollObserver.observe(el);
    });

    // Add staggered animation delays
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add active nav highlighting based on scroll position
    const sections = document.querySelectorAll('section, .hero-section, #projects, .three-column');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    });
});

type();