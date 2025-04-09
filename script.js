document.addEventListener('DOMContentLoaded', function() {
    // Create decorative elements
    createDecorations();
    
    // Glitter effect
    document.addEventListener('click', function(e) {
        createGlitter(e.clientX, e.clientY);
    });
    
    // Create some random glitter on load
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createGlitter(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 100);
    }
    
    // Show answer buttons
    document.querySelectorAll('.show-answer').forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                this.textContent = 'Show Answer ✨';
            } else {
                answer.style.display = 'block';
                this.textContent = 'Hide Answer ✨';
                // Add sparkle effect when answer is shown
                createGlitter(
                    this.getBoundingClientRect().left + this.offsetWidth/2,
                    this.getBoundingClientRect().top + this.offsetHeight/2
                );
            }
        });
    });
    
    // Add floating hearts to sections
    document.querySelectorAll('.section').forEach(section => {
        for (let i = 0; i < 3; i++) {
            createFloatingHeart(section);
        }
    });
});

function createGlitter(x, y) {
    const colors = ['#ff9ff3', '#ff6b9d', '#cd84f1', '#feca57', '#fff'];
    const shapes = ['✦', '✧', '❀', '✿', '♡', '★'];
    const glitter = document.createElement('div');
    glitter.className = 'glitter';
    
    // Random properties
    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    const isShape = Math.random() > 0.5;
    
    // Apply styles
    glitter.style.width = `${size}px`;
    glitter.style.height = `${size}px`;
    glitter.style.color = color;
    glitter.style.fontSize = `${size}px`;
    glitter.style.borderRadius = isShape ? '0' : '50%';
    glitter.style.backgroundColor = isShape ? 'transparent' : color;
    glitter.style.position = 'absolute';
    glitter.style.left = `${x}px`;
    glitter.style.top = `${y}px`;
    glitter.style.animationDuration = `${duration}s`;
    glitter.style.animationDelay = `${delay}s`;
    glitter.style.zIndex = '1000';
    glitter.style.pointerEvents = 'none';
    
    if (isShape) {
        glitter.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    }
    
    // Add to body
    document.body.appendChild(glitter);
    
    // Remove after animation
    setTimeout(() => {
        glitter.remove();
    }, (duration + delay) * 1000);
}

function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '♡';
    
    // Random properties
    const size = Math.random() * 20 + 10;
    const left = Math.random() * 80 + 10;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const color = `hsl(${Math.random() * 60 + 320}, 100%, ${Math.random() * 30 + 60}%)`;
    
    // Apply styles
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${left}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.color = color;
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    
    container.appendChild(heart);
}

// shine shine
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        createShineEffect(e.target);
        setTimeout(() => { window.location.href = e.target.href; }, 500);
    });
});

function createShineEffect(element) {
    const shine = document.createElement('div');
    shine.className = 'shine-effect';
    const rect = element.getBoundingClientRect();
    
    shine.style.cssText = `
        width: ${rect.width}px;
        height: ${rect.height}px;
        left: ${rect.left}px;
        top: ${rect.top}px;
    `;
    
    document.body.appendChild(shine);
    setTimeout(() => shine.remove(), 500);
}

function createDecorations() {
    // Add stars to header
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.innerHTML = '✦';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        document.querySelector('header').appendChild(star);
    }
    
    // Add section decorations
    document.querySelectorAll('.section').forEach((section, index) => {
        if (index % 2 === 0) {
            const flower = document.createElement('div');
            flower.className = 'section-flower';
            flower.innerHTML = '✿';
            flower.style.color = `hsl(${Math.random() * 60 + 300}, 100%, 70%)`;
            section.appendChild(flower);
        }
    });
    // Highlight current page in nav
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.main-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('current-page');
        }
    });
});
    // Auto-highlight current page link
function highlightCurrentPage() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        link.classList.remove('current-page');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('current-page');
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', highlightCurrentPage);
}
