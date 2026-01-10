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

// Start the typing animation
type();