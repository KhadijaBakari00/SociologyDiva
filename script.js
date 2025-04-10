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

/* ===== PRINCESS-NAVIGATION ===== */
function initNavigation() {
    highlightCurrentPage();
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            createSparkleTrail(link);
        });
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            createPrincessEffect(e.target);
            setTimeout(() => {
                window.location.href = e.target.href;
            }, 800);
        });
    });
}

function highlightCurrentPage() {
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.main-nav a').forEach(link => {
        // Remove all current classes first
        link.classList.remove('current-page');
        
        // Remove any existing crowns
        const existingCrown = link.querySelector('.nav-crown');
        if (existingCrown) {
            existingCrown.remove();
        }
        
        // Check if this is the current page
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('current-page');
            
            // Add crown to current page link
            const crown = document.createElement('span');
            crown.className = 'nav-crown';
            crown.innerHTML = '👑';
            link.prepend(crown);
            
            // Add sparkle effect to current page
            setInterval(() => {
                createNavSparkle(link);
            }, 1500);
        }
    });
}

function createPrincessEffect(element) {
    // Create magical dust
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createNavSparkle(element, true);
        }, i * 50);
    }
    
    // Create tiara animation
    const tiara = document.createElement('div');
    tiara.className = 'tiara-effect';
    const rect = element.getBoundingClientRect();
    
    tiara.style.cssText = `
        left: ${rect.left + rect.width/2 - 15}px;
        top: ${rect.top - 30}px;
    `;
    
    document.body.appendChild(tiara);
    setTimeout(() => tiara.remove(), 800);
}

function createSparkleTrail(element) {
    let counter = 0;
    const interval = setInterval(() => {
        if (counter++ > 5) {
            clearInterval(interval);
            return;
        }
        createNavSparkle(element);
    }, 100);
}

function createNavSparkle(element, isClick = false) {
    const sparkle = document.createElement('div');
    sparkle.className = 'nav-sparkle';
    
    const shapes = ['✦', '✧', '❀', '♥', '♡', '✨'];
    sparkle.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
    
    const rect = element.getBoundingClientRect();
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;
    
    sparkle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        color: ${isClick ? '#ff9ff3' : '#feca57'};
        font-size: ${Math.random() * 10 + 10}px;
        animation-duration: ${Math.random() * 1 + 0.5}s;
        z-index: 1000;
    `;
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

/* ===== BOTTOM NAVIGATION ===== */
function initBottomNav() {
    createBottomNav();
    setupScrollBehavior();
    setupBottomNavEffects();
}

function setupBottomNavEffects() {
    const bottomNav = document.querySelector('.bottom-nav');
    if (!bottomNav) return;
    
    // Add floating hearts around the nav
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.className = 'nav-heart';
        heart.innerHTML = ['❤', '🧡', '💖', '💗'][Math.floor(Math.random() * 4)];
        heart.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        bottomNav.appendChild(heart);
    }
    
    // Add click effect
    bottomNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            createBubbleEffect(e.target);
        }
    });
}

function createBubbleEffect(element) {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = 'nav-bubble';
            bubble.innerHTML = ['🫧', '💭', '🌸'][Math.floor(Math.random() * 3)];
            
            const rect = element.getBoundingClientRect();
            bubble.style.cssText = `
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top}px;
                font-size: ${Math.random() * 10 + 10}px;
            `;
            
            document.body.appendChild(bubble);
            setTimeout(() => bubble.remove(), 1000);
        }, i * 100);
    }
}

function createBottomNav() {
    if (!document.querySelector('.bottom-nav')) {
        const nav = document.createElement('div');
        nav.className = 'bottom-nav';
        nav.innerHTML = `
            <div class="quick-links-wrapper">
                <div class="quick-links"></div>
                <div class="nav-flower">🌸</div>
            </div>
        `;
        document.body.appendChild(nav);
    }
    updateBottomLinks();
}

function updateBottomLinks() {
    const pages = [
        { url: 'index.html', name: 'Home', emoji: '🏠' },
        { url: 'socialization.html', name: 'Social', emoji: '💬' },
        { url: 'culture.html', name: 'Culture', emoji: '🎨' },
        { url: 'research-methods.html', name: 'Research', emoji: '🔍' }
    ];
    
    const currentPage = location.pathname.split('/').pop();
    const currentIndex = pages.findIndex(page => page.url === currentPage);
    const linksDiv = document.querySelector('.quick-links');
    
    if (!linksDiv) return;
    
    linksDiv.innerHTML = '';
    
    // Always show home link in center
    const homeLink = createNavLink(pages[0], 'home');
    linksDiv.appendChild(homeLink);
    
    // Show previous link if not on first page
    if (currentIndex > 0) {
        const prevLink = createNavLink(pages[currentIndex - 1], 'prev');
        linksDiv.insertBefore(prevLink, homeLink);
    }
    
    // Show next link if not on last page
    if (currentIndex < pages.length - 1 && currentIndex >= 0) {
        const nextLink = createNavLink(pages[currentIndex + 1], 'next');
        linksDiv.appendChild(nextLink);
    }
}

function createNavLink(page, type) {
    const link = document.createElement('a');
    link.href = page.url;
    link.className = `quick-link ${type}`;
    
    if (type === 'home') {
        link.innerHTML = `
            <span class="nav-emoji">${page.emoji}</span>
            <span class="nav-text">${page.name}</span>
        `;
    } else {
        link.innerHTML = `
            <span class="nav-emoji">${page.emoji}</span>
            <span class="nav-text">${type === 'prev' ? page.name : page.name}</span>
            <span class="nav-arrow">${type === 'prev' ? '←' : '→'}</span>
        `;
    }
    
    // Add hover effect
    link.addEventListener('mouseenter', () => {
        createNavSparkle(link);
    });
    
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
