// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Enhanced page transitions
document.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.href;
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});

// Add hover effect to navigation links
document.querySelectorAll('.main-nav li a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-item, .certificates, .skill-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
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
let typingSpeed = 100; // ms per character
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

// Start the typing animation
type();