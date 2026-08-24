// ==========================================================================
// CV SRI REJEKI BERSAUDARA - JAVASCRIPT
// Fungsi Interaktif & Pengiriman Formulir ke WhatsApp
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Menu Navigasi Mobile (Hamburger Toggle)
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Tutup menu saat tautan diklik
        document.querySelectorAll('.nav-link').forEach(link => {
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

    // 2. Efek Scroll Navbar & Tombol Back to Top
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }

        highlightNavOnScroll();
    });

    // 3. Highlight Otomatis Menu Navigasi Sesuai Posisi Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navItem = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navItem) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            }
        });
    }

    // 4. Animasi Angka Statistik (Hero Section Counter)
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function startCounters() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const heroPosition = heroSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (heroPosition < screenPosition && !animated) {
            statNumbers.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const speed = 200;

                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = Math.ceil(target / speed);

                    if (count < target) {
                        counter.innerText = count + inc > target ? target : count + inc;
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
            });
            animated = true;
        }
    }

    window.addEventListener('scroll', startCounters);
    startCounters();

    // 5. Integrasi Formulir Minta Penawaran Langsung ke WhatsApp
    const quoteForm = document.getElementById('quoteForm');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const category = document.getElementById('category').value;
            const message = document.getElementById('message').value.trim();

            // Nomor Tujuan WhatsApp (CV Sri Rejeki Bersaudara)
            const targetPhone = "6281234567890"; 

            // Format Pesan WhatsApp
            const waMessage = `Halo CV Sri Rejeki Bersaudara, saya ingin mengajukan penawaran/informasi:%0A%0A` +
                              `*Nama / Instansi:* ${encodeURIComponent(name)}%0A` +
                              `*Email:* ${encodeURIComponent(email)}%0A` +
                              `*No. WA:* ${encodeURIComponent(phone)}%0A` +
                              `*Kategori Layanan:* ${encodeURIComponent(category)}%0A` +
                              `*Rincian Kebutuhan:*%0A${encodeURIComponent(message)}`;

            // Direct ke WhatsApp Web/App
            const waUrl = `https://wa.me/${targetPhone}?text=${waMessage}`;
            window.open(waUrl, '_blank');

            // Reset Formulir
            quoteForm.reset();
        });
    }
});
