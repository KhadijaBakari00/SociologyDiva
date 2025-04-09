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
    const glitter = document.createElement('div');
    glitter.className = 'glitter';
    
    // Random properties
    const size = Math.random() * 8 + 4;
    const shapes = ['✦', '✧', '❀', '✿', '♡', '★'];
    const color = `hsl(${Math.random() * 60 + 300}, 100%, ${Math.random() * 30 + 60}%)`;
    
    glitter.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        color: ${color};
        font-size: ${size}px;
        animation-duration: ${Math.random() * 2 + 1}s;
    `;
    
    if (Math.random() > 0.5) {
        glitter.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    } else {
        glitter.style.backgroundColor = color;
        glitter.style.borderRadius = '50%';
    }
    
    document.body.appendChild(glitter);
    
    setTimeout(() => glitter.remove(), 2000);
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
            createShineEffect(e.target);
            setTimeout(() => {
                window.location.href = e.target.href;
            }, 500);
        });
    });
}

function highlightCurrentPage() {
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.classList.toggle('current-page', link.getAttribute('href') === currentPage);
    });
}

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

/* ===== BOTTOM NAVIGATION ===== */
function initBottomNav() {
    createBottomNav();
    setupScrollBehavior();
}

function createBottomNav() {
    if (!document.querySelector('.bottom-nav')) {
        const nav = document.createElement('div');
        nav.className = 'bottom-nav';
        nav.innerHTML = '<div class="quick-links"></div>';
        document.body.appendChild(nav);
    }
    updateBottomLinks();
}

function updateBottomLinks() {
    const pages = [
        { url: 'index.html', name: 'Home' },
        { url: 'socialization.html', name: 'Socialization' },
        { url: 'culture.html', name: 'Culture' },
        { url: 'research-methods.html', name: 'Research Methods' }
    ];
    
    const currentPage = location.pathname.split('/').pop();
    const currentIndex = pages.findIndex(page => page.url === currentPage);
    const linksDiv = document.querySelector('.quick-links');
    
    if (!linksDiv) return;
    
    linksDiv.innerHTML = '';
    
    // Previous link
    if (currentIndex > 0) {
        const prevLink = createNavLink(pages[currentIndex - 1], 'prev');
        linksDiv.appendChild(prevLink);
    }
    
    // Next link
    if (currentIndex < pages.length - 1) {
        const nextLink = createNavLink(pages[currentIndex + 1], 'next');
        linksDiv.appendChild(nextLink);
    }
}

function createNavLink(page, type) {
    const link = document.createElement('a');
    link.href = page.url;
    link.className = `quick-link ${type}`;
    link.textContent = type === 'prev' ? `← ${page.name}` : `${page.name} →`;
    return link;
}

function setupScrollBehavior() {
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        lastScroll = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const bottomNav = document.querySelector('.bottom-nav');
                if (bottomNav) {
                    const shouldHide = lastScroll > 100 && lastScroll > window.lastScrollPosition;
                    bottomNav.classList.toggle('hidden', shouldHide);
                }
                window.lastScrollPosition = lastScroll;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}
