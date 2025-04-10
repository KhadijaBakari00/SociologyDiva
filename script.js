document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initDecorations();
    initGlitterEffects();
    initAnswerToggles();
    initNavigation();
    initBottomNav();
});

/* ===== DECORATIVE ELEMENTS ===== */
function initDecorations() {
    // Header stars
    for (let i = 0; i < 5; i++) {
        createStar();
    }
    
    // Section flowers
    document.querySelectorAll('.section').forEach(section => {
        if (Math.random() > 0.5) {
            createSectionFlower(section);
        }
    });
    
    // Floating hearts
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 300);
    }
}

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.innerHTML = '✧';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 30 + 10}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    star.style.fontSize = `${Math.random() * 10 + 10}px`;
    document.querySelector('header').appendChild(star);
}

function createSectionFlower(section) {
    const flower = document.createElement('div');
    flower.className = 'section-flower';
    flower.innerHTML = ['❀', '✿', '🌸'][Math.floor(Math.random() * 3)];
    flower.style.color = `hsl(${Math.random() * 60 + 300}, 100%, 70%)`;
    flower.style.right = `${Math.random() * 20 + 5}px`;
    flower.style.bottom = `${Math.random() * 20 + 5}px`;
    section.appendChild(flower);
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '♡';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100 + 100}%`;
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.animationDuration = `${Math.random() * 10 + 5}s`;
    document.body.appendChild(heart);
    
    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 15000);
}

/* ===== GLITTER EFFECTS ===== */
function initGlitterEffects() {
    // Click glitter
    document.addEventListener('click', function(e) {
        createGlitter(e.clientX, e.clientY);
    });
    
    // Initial random glitter
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createGlitter(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 150);
    }
}

function createGlitter(x, y) {
    const colors = ['#ff9ff3', '#ff6b9d', '#feca57', '#fff'];
    const shapes = ['✦', '✧', '❀', '♥', '♡'];
    
    // Create 2 glitter particles at once
    for (let i = 0; i < 2; i++) {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';
        glitter.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        glitter.style.cssText = `
            left: ${x + (Math.random() * 20 - 10)}px;
            top: ${y + (Math.random() * 20 - 10)}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            font-size: ${Math.random() * 12 + 10}px;
            animation-duration: ${Math.random() * 2 + 1}s;
        `;
        document.body.appendChild(glitter);
        setTimeout(() => glitter.remove(), 2000);
    }
}
/* ===== ANSWER TOGGLES ===== */
function initAnswerToggles() {
    document.querySelectorAll('.show-answer').forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isShowing = answer.style.display === 'block';
            
            answer.style.display = isShowing ? 'none' : 'block';
            this.textContent = isShowing ? 'Show Answer ✨' : 'Hide Answer ✨';
            
            if (!isShowing) {
                createGlitter(
                    this.getBoundingClientRect().left + this.offsetWidth/2,
                    this.getBoundingClientRect().top + this.offsetHeight/2
                );
            }
        });
    });
}

/* ===== MAIN NAVIGATION ===== */
function initNavigation() {
    highlightCurrentPage();
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            createDelicateRipple(e.target);
            setTimeout(() => {
                window.location.href = e.target.href;
            }, 400);
        });
    });
}

function createDelicateRipple(element) {
    const ripple = document.createElement('div');
    ripple.className = 'nav-ripple';
    const rect = element.getBoundingClientRect();
    
    ripple.style.cssText = `
        width: ${rect.width}px;
        height: ${rect.height}px;
        left: ${rect.left}px;
        top: ${rect.top}px;
        border-radius: ${parseInt(window.getComputedStyle(element).borderRadius)}px;
    `;
    
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

/* ===== BOTTOM NAVIGATION ===== */
function initBottomNav() {
    createBottomNav();
    setupScrollBehavior();
    addBottomNavHoverEffects();
}

function addBottomNavHoverEffects() {
    document.querySelectorAll('.quick-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            createGlitter(
                link.getBoundingClientRect().left + link.offsetWidth/2,
                link.getBoundingClientRect().top + link.offsetHeight/2
            );
        });
    });
    // Rainbow hover effect for headers
document.querySelectorAll('h1, h2, h3').forEach(heading => {
    heading.addEventListener('mouseenter', () => {
        heading.style.backgroundImage = 'linear-gradient(45deg, #ff9ff3, #ff6b9d, #feca57)';
        heading.style.webkitBackgroundClip = 'text';
        heading.style.color = 'transparent';
    });
    heading.addEventListener('mouseleave', () => {
        heading.style.backgroundImage = '';
        heading.style.color = '';
    });
});
}
