/* ==========================================================================
   CV SRI REJEKI BERSAUDARA - JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- 2. Sticky Navbar & Back to Top Button ---
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // --- 3. Active Link Switching on Scroll ---
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 150)) {
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

    // --- 4. Number Counter Animation for Hero Stats ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function startCounterAnimation() {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);

            let currentCount = 0;
            const updateCount = () => {
                currentCount += increment;
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Trigger animation when stats section enters viewport
    const heroStatsSection = document.querySelector('.hero-stats');
    if (heroStatsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                startCounterAnimation();
                animated = true;
            }
        }, { threshold: 0.5 });

        observer.observe(heroStatsSection);
    }

    // --- 5. Form Handling (Demo Submission) ---
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const category = document.getElementById('category').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !phone || !category || !message) {
                alert('Mohon lengkapi semua kolom formulir.');
                return;
            }

            alert(`Terima kasih, ${name}!\n\nPesan dan permintaan penawaran Anda mengenai "${category}" telah berhasil dikirim. Tim CV Sri Rejeki Bersaudara akan segera menghubungi Anda melalui nomor ${phone} atau email.`);

            quoteForm.reset();
        });
    }

});
