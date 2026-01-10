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

// Enhanced interaction effects
document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to mouse movement
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
    
    // Add smooth reveal animation
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
    
    document.querySelectorAll('.hero-content, .image-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Start the typing animation
type();