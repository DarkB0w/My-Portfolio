// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'auto',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect (Glassmorphism adjustments)
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        navbar.style.background = 'rgba(27, 29, 30, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(154, 132, 95, 0.22)';
        navbar.style.padding = '0.5rem 0'; // Shrink slighty
    } else {
        navbar.style.background = 'rgba(27, 29, 30, 0.92)';
        navbar.style.borderBottom = '1px solid rgba(154, 132, 95, 0.14)';
        navbar.style.padding = '1rem 0';
    }
});

// Active section highlighter
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Lightbox for Gallery (Simple)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function () {
        const img = this.querySelector('img');
        if (img) {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
                backdrop-filter: blur(5px);
                animation: fadeIn 0.3s ease;
            `;

            const imgClone = img.cloneNode();
            imgClone.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 12px 0 12px 0;
            `;

            overlay.appendChild(imgClone);
            document.body.appendChild(overlay);

            overlay.addEventListener('click', () => {
                overlay.remove();
            });
        }
    });
});

// Intro Animation trigger
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }
});

// Language Toggle
let currentLang = localStorage.getItem('language') || 'tr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Check if it's an input placeholder or text content
            if (element.placeholder) {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Update Toggle Button Text
    const langToggleBtn = document.querySelector('.lang-text');
    // Note: In new HTML, the button content might be direct text, so logic might need adjustment if class structure changed.
    // Based on previous HTML, it was a span. In translations.js nav.langToggle is 'TR' or 'EN'.

    // HTML lang attribute
    document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});

const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'tr' ? 'en' : 'tr';
        setLanguage(newLang);
    });
}
