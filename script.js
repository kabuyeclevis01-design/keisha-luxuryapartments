/* ============================================
   KEISHA LUXURY FURNISHED APARTMENTS
   Main Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1200);
        });

        // Fallback: hide preloader after 3 seconds max
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 3000);
    }

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    if (navbar) {
        window.addEventListener('scroll', handleNavScroll, { passive: true });
        handleNavScroll();
    }

    // --- Active nav link based on URL ---
    function setActiveNav() {
        // Get the current file name from URL path
        let currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            let href = link.getAttribute('href');
            
            // Remove hash for comparison if it exists
            if (href.includes('#')) {
                href = href.split('#')[0];
            }
            
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    setActiveNav();

    // --- Mobile navigation ---
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile nav on link click
        navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Gallery Lightbox ---
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        const galleryItems = document.querySelectorAll('.gallery-item');

        let currentLightboxIndex = 0;
        const galleryImages = [];

        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            galleryImages.push({
                src: img.src,
                alt: img.alt
            });

            item.addEventListener('click', () => {
                currentLightboxIndex = index;
                openLightbox();
            });
        });

        function openLightbox() {
            lightboxImg.src = galleryImages[currentLightboxIndex].src;
            lightboxImg.alt = galleryImages[currentLightboxIndex].alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function prevImage() {
            currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImg.src = galleryImages[currentLightboxIndex].src;
            lightboxImg.alt = galleryImages[currentLightboxIndex].alt;
        }

        function nextImage() {
            currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
            lightboxImg.src = galleryImages[currentLightboxIndex].src;
            lightboxImg.alt = galleryImages[currentLightboxIndex].alt;
        }

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', prevImage);
        lightboxNext.addEventListener('click', nextImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        });
    }

    // --- Smooth scroll for anchor links on the same page ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
