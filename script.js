/* ============================================================
   PORTFOLIO – SCRIPT.JS
   Navigation, search, dark mode, particles, scroll reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ─── DOM Elements ───
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const welcomeScreen = document.getElementById('welcome-screen');
    const enterPortfolioBtn = document.getElementById('enter-portfolio');
    const portfolioShell = document.getElementById('portfolio-shell');
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollIndicator = document.querySelector('.hero__scroll-indicator');

    // ========================================
    // WELCOME SCREEN
    // ========================================
    if (welcomeScreen) {
        let welcomeFrame = null;
        let pointerX = window.innerWidth / 2;
        let pointerY = window.innerHeight / 2;

        const updateWelcomeCursor = () => {
            welcomeScreen.style.setProperty('--welcome-x', `${pointerX}px`);
            welcomeScreen.style.setProperty('--welcome-y', `${pointerY}px`);
            welcomeFrame = null;
        };

        welcomeScreen.addEventListener('mousemove', (e) => {
            pointerX = e.clientX;
            pointerY = e.clientY;

            if (!welcomeFrame) {
                welcomeFrame = window.requestAnimationFrame(updateWelcomeCursor);
            }
        });

        welcomeScreen.addEventListener('mouseleave', () => {
            pointerX = window.innerWidth / 2;
            pointerY = window.innerHeight / 2;

            if (!welcomeFrame) {
                welcomeFrame = window.requestAnimationFrame(updateWelcomeCursor);
            }
        });
    }

    function openPortfolio() {
        document.body.classList.remove('welcome-active');
        document.body.classList.add('welcome-exit');
        document.body.classList.add('portfolio-entering');

        if (portfolioShell) {
            window.requestAnimationFrame(() => {
                portfolioShell.classList.add('portfolio-shell--visible');
            });
        }

        if (welcomeScreen) {
            welcomeScreen.setAttribute('aria-hidden', 'true');
            window.setTimeout(() => {
                welcomeScreen.remove();
                document.body.classList.remove('welcome-exit');
                document.body.classList.remove('portfolio-entering');
            }, 520);
        }
    }

    if (enterPortfolioBtn) {
        enterPortfolioBtn.addEventListener('click', openPortfolio);
    }

    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    function onScroll() {
        if (!header) return;
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    onScroll();

    // ========================================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (link) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    }

    highlightNav();

    // ========================================
    // SCROLL INDICATOR FADE (50% of hero)
    // ========================================
    function handleScrollIndicator() {
        if (!scrollIndicator) return;
        const heroSection = document.getElementById('home');
        if (!heroSection) return;
        const heroHeight = heroSection.offsetHeight;
        const scrollRatio = window.scrollY / (heroHeight * 0.5);
        const opacity = Math.max(0, 1 - scrollRatio);
        scrollIndicator.style.opacity = opacity;
    }

    handleScrollIndicator();

    // ========================================
    // FLOATING PARTICLES (Hero Background)
    // ========================================
    const heroSection = document.getElementById('home');
    const particleContainer = document.getElementById('particles');

    function createParticles() {
        if (!particleContainer) return;

        particleContainer.innerHTML = '';
        const count = window.innerWidth < 768 ? 12 : 24;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero__particle');

            const size = Math.random() * 7 + 1.5;
            const depth = Math.random() * 0.9 + 0.35;
            const drift = (Math.random() * 80 - 40).toFixed(2);
            const duration = (Math.random() * 10 + 8).toFixed(2);
            const delay = (Math.random() * 10).toFixed(2);

            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.5 + 0.08;
            particle.style.setProperty('--depth', depth.toFixed(2));
            particle.style.setProperty('--drift', `${drift}px`);
            particle.style.setProperty('--float-duration', `${duration}s`);
            particle.style.animationDelay = `${delay}s`;

            particleContainer.appendChild(particle);
        }
    }

    createParticles();

    let resizeTimer;
    window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(createParticles, 180);
    });

    if (heroSection && supportsHover && !prefersReducedMotion) {
        let heroFrame = null;
        let heroPointerX = 0;
        let heroPointerY = 0;

        const updateHeroMotion = () => {
            heroSection.style.setProperty('--hero-tilt-x', `${(heroPointerY * -3).toFixed(2)}deg`);
            heroSection.style.setProperty('--hero-tilt-y', `${(heroPointerX * 4).toFixed(2)}deg`);
            heroSection.style.setProperty('--hero-shift-x', `${(heroPointerX * 14).toFixed(2)}px`);
            heroSection.style.setProperty('--hero-shift-y', `${(heroPointerY * 10).toFixed(2)}px`);
            heroFrame = null;
        };

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            heroPointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            heroPointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

            if (!heroFrame) {
                heroFrame = window.requestAnimationFrame(updateHeroMotion);
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            heroSection.style.setProperty('--hero-tilt-x', '0deg');
            heroSection.style.setProperty('--hero-tilt-y', '0deg');
            heroSection.style.setProperty('--hero-shift-x', '0px');
            heroSection.style.setProperty('--hero-shift-y', '0px');
            if (heroFrame) {
                window.cancelAnimationFrame(heroFrame);
                heroFrame = null;
            }
        });
    }

    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    function addRevealClasses() {
        const revealTargets = [
            '.about__image-wrapper',
            '.about__content',
            '.contact__info',
            '.contact__form',
        ];
        revealTargets.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.classList.add('reveal');
        });

        const childRevealTargets = [
            '.skills__grid',
            '.experience__grid',
            '.projects__grid',
            '.services__grid',
        ];
        childRevealTargets.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.classList.add('reveal-children');
        });
    }

    addRevealClasses();

    const revealElements = document.querySelectorAll('.reveal, .reveal-children');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.08,
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // SEARCH FUNCTIONALITY
    // ========================================
    const searchTrigger = document.getElementById('search-trigger');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchBackdrop = document.getElementById('search-backdrop');

    function buildSearchIndex() {
        const index = [];
        const searchableSections = document.querySelectorAll('section[id]');
        searchableSections.forEach(section => {
            const id = section.getAttribute('id');
            const heading = section.querySelector('.section__title, .hero__name');
            const headingText = heading ? heading.textContent.trim() : '';

            const textEls = section.querySelectorAll(
                'h3, .skill-card__title, .project-card__title, .service-card__title, ' +
                '.experience__title, .hero__subtitle, .hero__intro, .about__text, ' +
                '.project-card__tag, .project-card__desc, .service-card__desc, .experience__desc'
            );
            textEls.forEach(el => {
                const text = el.textContent.trim();
                if (text.length > 2) {
                    index.push({ text, sectionId: id, sectionName: headingText || id });
                }
            });

            if (headingText && headingText.length > 1) {
                index.push({ text: headingText, sectionId: id, sectionName: headingText });
            }
        });
        return index;
    }

    const searchIndex = buildSearchIndex();

    function openSearch() {
        searchModal.classList.add('open');
        searchInput.value = '';
        searchResults.innerHTML = '';
        setTimeout(() => searchInput.focus(), 100);
    }

    function closeSearch() {
        searchModal.classList.remove('open');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }

    function performSearch(query) {
        if (!query || query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const q = query.toLowerCase();
        const matches = [];
        const seen = new Set();

        searchIndex.forEach(item => {
            if (item.text.toLowerCase().includes(q)) {
                const key = item.sectionId + '|' + item.text.substring(0, 40);
                if (!seen.has(key)) {
                    seen.add(key);
                    matches.push(item);
                }
            }
        });

        if (matches.length === 0) {
            searchResults.innerHTML = `<div class="search-modal__empty">No results found for "${query}"</div>`;
            return;
        }

        const limited = matches.slice(0, 8);
        searchResults.innerHTML = limited.map(m => {
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            const highlighted = m.text.replace(regex, '<mark>$1</mark>');
            return `
                <div class="search-result" data-target="${m.sectionId}">
                    <i class="fa-solid fa-arrow-right"></i>
                    <span class="search-result__text">${highlighted}</span>
                </div>
            `;
        }).join('');

        searchResults.querySelectorAll('.search-result').forEach(el => {
            el.addEventListener('click', () => {
                const targetId = el.getAttribute('data-target');
                closeSearch();
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    if (searchTrigger) {
        searchTrigger.addEventListener('click', openSearch);
    }

    if (searchBackdrop) {
        searchBackdrop.addEventListener('click', closeSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('open')) {
            closeSearch();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchModal.classList.contains('open')) {
                closeSearch();
            } else {
                openSearch();
            }
        }
    });

    // ========================================
    // PROJECT MODAL
    // ========================================
    const projectModal = document.getElementById('project-modal');
    const modalImage = document.getElementById('project-modal-image');
    const modalTag = document.getElementById('project-modal-tag');
    const modalTitle = document.getElementById('project-modal-title');
    const modalDesc = document.getElementById('project-modal-desc');
    const modalDuration = document.getElementById('project-modal-duration');
    const modalTech = document.getElementById('project-modal-tech');
    const modalFeatures = document.getElementById('project-modal-features');
    const modalGithub = document.getElementById('project-modal-github');
    const projectCards = document.querySelectorAll('.project-card');
    const placeholderImage = 'project-placeholder.svg';

    function openProjectModal(card) {
        if (!projectModal) return;
        const title = card.dataset.title || card.querySelector('.project-card__title')?.textContent.trim() || '';
        const tag = card.dataset.tag || card.querySelector('.project-card__tag')?.textContent.trim() || '';
        const duration = card.dataset.duration || 'Not specified';
        const tech = card.dataset.tech || 'Not specified';
        const description = card.dataset.description || card.querySelector('.project-card__desc')?.textContent.trim() || '';
        const features = (card.dataset.features || '').split('|').map(s => s.trim()).filter(Boolean);
        const github = card.dataset.github || '';
        const image = card.dataset.image || placeholderImage;

        if (modalImage) {
            modalImage.style.backgroundImage = `url('${image}')`;
        }
        if (modalTag) modalTag.textContent = tag;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = description;
        if (modalDuration) modalDuration.textContent = duration;
        if (modalTech) modalTech.textContent = tech;
        if (modalFeatures) {
            modalFeatures.innerHTML = features.map(item => `<li>${item}</li>`).join('');
        }
        if (modalGithub) {
            if (github) {
                modalGithub.href = github;
                modalGithub.hidden = false;
            } else {
                modalGithub.href = '#';
                modalGithub.hidden = true;
            }
        }

        projectModal.classList.add('open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    projectCards.forEach(card => {
        card.style.setProperty('--pointer-x', '50%');
        card.style.setProperty('--pointer-y', '50%');
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
        if (!supportsHover || prefersReducedMotion) {
            card.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (link && link.href && link.href !== '#') {
                    e.stopPropagation();
                    return;
                }
                if (link) e.preventDefault();
                openProjectModal(card);
            });
            return;
        }
        let cardFrame = null;
        let pointerX = 50;
        let pointerY = 50;

        const updateCardTilt = () => {
            const rotateY = ((pointerX - 50) / 50) * 4;
            const rotateX = ((50 - pointerY) / 50) * 4;

            card.style.setProperty('--pointer-x', `${pointerX}%`);
            card.style.setProperty('--pointer-y', `${pointerY}%`);
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
            cardFrame = null;
        };

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            pointerX = (x / rect.width) * 100;
            pointerY = (y / rect.height) * 100;

            if (!cardFrame) {
                cardFrame = window.requestAnimationFrame(updateCardTilt);
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--pointer-x', '50%');
            card.style.setProperty('--pointer-y', '50%');
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
            if (cardFrame) {
                window.cancelAnimationFrame(cardFrame);
                cardFrame = null;
            }
        });

        card.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.href !== '#') {
                e.stopPropagation();
                return;
            }
            if (link) e.preventDefault();
            openProjectModal(card);
        });
    });

    let scrollTicking = false;
    const handleScrollWork = () => {
        onScroll();
        highlightNav();
        handleScrollIndicator();
        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (scrollTicking) return;
        scrollTicking = true;
        window.requestAnimationFrame(handleScrollWork);
    }, { passive: true });

    if (projectModal) {
        projectModal.querySelectorAll('[data-modal-close]').forEach(el => {
            el.addEventListener('click', closeProjectModal);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
            closeProjectModal();
        }
    });

    // ========================================
    // DARK MODE — GLASS SWEEP TRANSITION
    // ========================================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const themeIcon = document.getElementById('theme-icon');
    let isAnimating = false;

    // Restore saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    function toggleDarkMode() {
        if (isAnimating) return;
        isAnimating = true;

        const isDark = document.body.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        const overlay = document.createElement('div');
        overlay.className = 'theme-snapshot';
        overlay.style.background = newTheme === 'dark'
            ? 'linear-gradient(180deg, rgba(8, 19, 12, 0.86), rgba(10, 21, 13, 0.94))'
            : 'linear-gradient(180deg, rgba(244, 251, 245, 0.92), rgba(255, 255, 255, 0.98))';

        document.body.appendChild(overlay);
        window.requestAnimationFrame(() => {
            overlay.classList.add('theme-snapshot--visible');
        });

        setTimeout(() => {
            document.body.classList.toggle('dark');
            document.body.classList.add('theme-switching');
            localStorage.setItem('theme', newTheme);

            if (newTheme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }

            overlay.classList.add('theme-snapshot--exit');

            setTimeout(() => {
                overlay.remove();
                document.body.classList.remove('theme-switching');
                isAnimating = false;
            }, 320);
        }, 160);
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // ========================================
    // CONTACT FORM (EmailJS integration)
    // ========================================
    const contactForm = document.getElementById('contact-form');

    // ─── EmailJS Setup ───
    // To make the contact form send emails:
    // 1. Go to https://www.emailjs.com/ and create a free account
    // 2. Add an email service (e.g. Gmail) — get SERVICE_ID
    // 3. Create a template with {{from_name}}, {{from_email}}, {{message}} — get TEMPLATE_ID
    // 4. Account > API Keys — get PUBLIC_KEY
    // 5. Replace the three placeholders below:

    const EMAILJS_PUBLIC_KEY = 'VUpmd8w4_9AWlbM66';
    const EMAILJS_SERVICE_ID = 'service_so4thzi';
    const EMAILJS_TEMPLATE_ID = 'template_azgu6jl';

    const emailjsConfigured = EMAILJS_PUBLIC_KEY !== 'VUpmd8w4_9AWlbM66';
    if (emailjsConfigured && window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameVal = document.getElementById('name').value.trim();
            const emailVal = document.getElementById('email').value.trim();
            const messageVal = document.getElementById('message').value.trim();

            if (!nameVal || !emailVal || !messageVal) return;

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            if (emailjsConfigured && window.emailjs) {
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;

                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                    from_name: nameVal,
                    from_email: emailVal,
                    message: messageVal,
                }).then(() => {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
                    btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.background = '';
                        btn.disabled = false;
                        contactForm.reset();
                    }, 2500);
                }).catch((err) => {
                    console.error('EmailJS error:', err);
                    btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Error';
                    btn.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 2500);
                });
            } else {
                const subject = encodeURIComponent(`Portfolio Contact from ${nameVal}`);
                const body = encodeURIComponent(
                    `Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`
                );
                window.open(`mailto:?subject=${subject}&body=${body}`, '_self');

                btn.innerHTML = '<i class="fa-solid fa-check"></i> Opening Mail...';
                btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 2500);
            }
        });
    }
});
