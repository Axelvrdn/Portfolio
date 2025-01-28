// Initialisation des icônes Lucide
lucide.createIcons();

// Gestion du menu mobile
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Gestion de la navigation active
const sections = document.querySelectorAll('section');
const navLinksDesktop = document.querySelector('.nav-links').querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinksDesktop.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Gestion des jauges de compétences
const skillGauges = document.querySelectorAll('.skill-gauge');

skillGauges.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const level = parseInt(canvas.dataset.skill);
    
    // Configuration du canvas
    canvas.width = 200;
    canvas.height = 200;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Fonction de dessin de la jauge
    function drawGauge() {
        // Cercle de fond
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 10;
        ctx.stroke();

        // Arc de niveau
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (2 * Math.PI * level) / 100;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 10;
        ctx.stroke();

        // Texte du pourcentage
        ctx.font = 'bold 24px system-ui, sans-serif';
        ctx.fillStyle = '#1f2937';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${level}%`, centerX, centerY);
    }

    // Animation de la jauge
    let currentLevel = 0;
    const animationDuration = 1000; // 1 seconde
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        currentLevel = level * progress;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGauge();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    // Observer pour démarrer l'animation quand la jauge est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(animate);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(canvas);
});