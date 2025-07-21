// Phishing Awareness Training - Interactive JavaScript

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    window.scrollTo({ top: 200, behavior: 'smooth' });
                }
            });
        });
    });
    
    // Initialize quiz
    initializeQuiz();
    
    // Add hover effects to email examples
    addEmailInteractivity();
});

// Show phishing warning modal
function showPhishingWarning(event) {
    event.preventDefault();
    const modal = document.getElementById('phishing-modal');
    modal.classList.add('show');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('phishing-modal');
    modal.classList.remove('show');
}

// Show fake website warning
function showFakeWebsite(type) {
    showPhishingWarning(event);
}

// Link preview functionality
function showLinkPreview(element) {
    const preview = document.getElementById('link-preview');
    preview.style.display = 'block';
}

function hideLinkPreview() {
    const preview = document.getElementById('link-preview');
    preview.style.display = 'none';
}

// Email interactivity
function addEmailInteractivity() {
    const emailExamples = document.querySelectorAll('.email-example');
    
    emailExamples.forEach(email => {
        const redFlagsPanel = email.querySelector('.red-flags-panel');
        
        // Initially hide red flags
        redFlagsPanel.style.display = 'none';
        
        // Toggle red flags on click
        email.addEventListener('click', function(e) {
            // Don't toggle if clicking on a link
            if (e.target.classList.contains('phishing-link')) return;
            
            if (redFlagsPanel.style.display === 'none') {
                redFlagsPanel.style.display = 'block';
                redFlagsPanel.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                redFlagsPanel.style.display = 'none';
            }
        });
        
        // Add click instruction
        const instruction = document.createElement('p');
        instruction.className = 'click-instruction';
        instruction.textContent = '👆 Click to reveal red flags';
        instruction.style.cssText = 'text-align: center; color: #6b7280; font-size: 0.9rem; margin-top: 10px;';
        email.appendChild(instruction);
    });
}

// Quiz functionality
const quizQuestions = [
    {
        question: "You receive an email from 'support@goog1e.com' asking you to verify your account. What should you do?",
        options: [
            "Click the link immediately to secure your account",
            "Check the sender's email carefully - 'goog1e' uses a number 1 instead of letter l",
            "Forward it to all your contacts to warn them",
            "Reply with your password to verify it's really you"
        ],
        correct: 1,
        explanation: "Always check the sender's email address carefully. Phishers often use lookalike domains with subtle misspellings like using '1' instead of 'l'."
    },
    {
        question: "An email says you've won $500 but need to 'verify your email' by clicking a link. This is likely:",
        options: [
            "A legitimate prize notification",
            "A phishing attempt - unexpected prizes are a common scam",
            "From your company's rewards program",
            "A test from your IT department"
        ],
        correct: 1,
        explanation: "Unexpected prizes or rewards are a classic phishing tactic. Legitimate companies don't randomly give away money via email."
    },
    {
        question: "What's the safest way to check if a security alert email from your bank is real?",
        options: [
            "Click the link in the email to verify",
            "Reply to the email asking if it's legitimate",
            "Log into your bank account directly through their official website",
            "Call the phone number provided in the email"
        ],
        correct: 2,
        explanation: "Never use links or phone numbers from suspicious emails. Always go directly to the company's official website or use contact information you know is legitimate."
    },
    {
        question: "Which greeting is most likely to appear in a phishing email?",
        options: [
            "Dear John Smith",
            "Hello valued customer",
            "Hi Sarah",
            "Good morning, Dr. Johnson"
        ],
        correct: 1,
        explanation: "Phishing emails often use generic greetings like 'valued customer' or 'dear user' because they don't know your actual name. Legitimate companies usually personalize their emails."
    },
    {
        question: "You notice a website URL is 'http://bankofamerica-secure.net'. What's wrong with it?",
        options: [
            "Nothing, it says 'secure' so it must be safe",
            "It's using HTTP instead of HTTPS",
            "It's not the official Bank of America domain",
            "Both B and C are red flags"
        ],
        correct: 3,
        explanation: "This URL has multiple red flags: it's using HTTP (not secure) and it's not the official domain. Bank of America's real domain is 'bankofamerica.com'."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function initializeQuiz() {
    document.getElementById('total-questions').textContent = quizQuestions.length;
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionContainer = document.getElementById('quiz-question');
    
    questionContainer.innerHTML = `
        <h3>${question.question}</h3>
        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <div class="quiz-option" onclick="selectOption(${index})">
                    ${option}
                </div>
            `).join('')}
        </div>
        <button class="btn-quiz" onclick="checkAnswer()" style="margin-top: 20px;">Submit Answer</button>
    `;
    
    // Update progress
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('progress-fill').style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
    
    // Reset
    selectedOption = null;
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('next-question').style.display = 'none';
}

function selectOption(index) {
    selectedOption = index;
    
    // Update visual selection
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });
}

function checkAnswer() {
    if (selectedOption === null) {
        alert('Please select an answer before submitting.');
        return;
    }
    
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const feedbackDiv = document.getElementById('quiz-feedback');
    
    // Disable further selection
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Hide submit button
    document.querySelector('.btn-quiz').style.display = 'none';
    
    // Show correct/incorrect
    if (selectedOption === question.correct) {
        options[selectedOption].classList.add('correct');
        feedbackDiv.className = 'quiz-feedback correct';
        feedbackDiv.innerHTML = `
            <strong>✅ Correct!</strong>
            <p>${question.explanation}</p>
        `;
        score++;
    } else {
        options[selectedOption].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        feedbackDiv.className = 'quiz-feedback incorrect';
        feedbackDiv.innerHTML = `
            <strong>❌ Incorrect.</strong>
            <p>${question.explanation}</p>
        `;
    }
    
    feedbackDiv.style.display = 'block';
    
    // Show next button or results
    if (currentQuestion < quizQuestions.length - 1) {
        document.getElementById('next-question').style.display = 'inline-block';
    } else {
        showResults();
    }
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function showResults() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const resultsDiv = document.getElementById('quiz-results');
    const finalScore = document.getElementById('final-score');
    const resultsMessage = document.getElementById('results-message');
    
    finalScore.textContent = percentage;
    
    if (percentage >= 80) {
        resultsMessage.innerHTML = `
            <p>🎉 Excellent work! You have a strong understanding of phishing tactics.</p>
            <p>Keep staying vigilant and share this knowledge with others!</p>
        `;
    } else if (percentage >= 60) {
        resultsMessage.innerHTML = `
            <p>👍 Good job! You understand the basics of phishing.</p>
            <p>Review the red flags section to strengthen your knowledge.</p>
        `;
    } else {
        resultsMessage.innerHTML = `
            <p>📚 You're learning! Phishing can be tricky to spot.</p>
            <p>Take some time to review the examples and try again.</p>
        `;
    }
    
    resultsDiv.style.display = 'block';
    document.getElementById('restart-quiz').style.display = 'inline-block';
    document.getElementById('next-question').style.display = 'none';
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('restart-quiz').style.display = 'none';
    loadQuestion();
}

// Add smooth scrolling for all internal links
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.technique-card, .stat-card, .tip-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('phishing-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('phishing-modal');
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// Track user progress
let viewedSections = new Set();

function trackProgress() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            viewedSections.add(section.id);
            updateProgressIndicator();
        }
    });
}

function updateProgressIndicator() {
    const totalSections = document.querySelectorAll('.content-section').length;
    const progress = (viewedSections.size / totalSections) * 100;
    
    // You can add a visual progress indicator here if desired
    console.log(`Training progress: ${Math.round(progress)}%`);
}

// Initialize progress tracking
setInterval(trackProgress, 1000);

// Add print functionality
function printSection(sectionId) {
    const section = document.getElementById(sectionId);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Phishing Awareness Training - ${sectionId}</title>
            <link rel="stylesheet" href="phishing-styles.css">
            <style>
                body { padding: 20px; }
                .content-section { display: block !important; }
            </style>
        </head>
        <body>
            ${section.outerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Add tooltips for red flag indicators
document.querySelectorAll('.red-flag-indicator').forEach(indicator => {
    indicator.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('title') || 'Red flag detected!';
        tooltip.style.cssText = `
            position: absolute;
            background: #1f2937;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.875rem;
            z-index: 1000;
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 5) + 'px';
        
        this.addEventListener('mouseleave', function() {
            tooltip.remove();
        });
    });
});

// Educational mode toggle
let educationalMode = true;

function toggleEducationalMode() {
    educationalMode = !educationalMode;
    const redFlags = document.querySelectorAll('.red-flags-panel, .website-red-flags');
    
    redFlags.forEach(panel => {
        panel.style.display = educationalMode ? 'block' : 'none';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Phishing Awareness Training Tool Loaded');
    console.log('Remember: This is for educational purposes only!');
});