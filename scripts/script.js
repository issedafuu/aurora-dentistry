// ========================================
// 1. PRELOADER
// ========================================
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 600);
    }
});

// ========================================
// 2. DOMContentLoaded — основная логика
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // ---------- Мобильное меню ----------
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });

        document.querySelectorAll('.header__nav-list-item a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }

    // ---------- Плавный скролл по якорям ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ---------- Модальное окно "Записаться" ----------
    const modalOverlay = document.getElementById('modalOverlay');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalForm = document.getElementById('modalForm');
    const heroModalBtn = document.getElementById('heroModalBtn');

    function openModal() {
        modalOverlay.classList.add('active');
    }
    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (heroModalBtn) heroModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
            closeModal();
        }
    });

    // ---------- Модальное окно "Стоимость" ----------
    const priceModalOverlay = document.getElementById('priceModalOverlay');
    const priceBtn = document.getElementById('priceBtn');
    const closePriceModalBtn = document.getElementById('closePriceModalBtn');

    function openPriceModal() {
        priceModalOverlay.classList.add('active');
    }
    function closePriceModal() {
        priceModalOverlay.classList.remove('active');
    }

    if (priceBtn) priceBtn.addEventListener('click', openPriceModal);
    if (closePriceModalBtn) closePriceModalBtn.addEventListener('click', closePriceModal);

    if (priceModalOverlay) {
        priceModalOverlay.addEventListener('click', (e) => {
            if (e.target === priceModalOverlay) closePriceModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && priceModalOverlay?.classList.contains('active')) {
            closePriceModal();
        }
    });

    // ---------- Обработка форм ----------
    const footerForm = document.getElementById('footerForm');

    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('modalName').value.trim();
            const phone = document.getElementById('modalPhone').value.trim();

            if (name && phone) {
                showSuccessMessage(`Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`);
                modalForm.reset();
                closeModal();
            } else {
                alert('Пожалуйста, заполните все поля.');
            }
        });
    }

    if (footerForm) {
        footerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('footerName').value.trim();
            const phone = document.getElementById('footerPhone').value.trim();

            if (name && phone) {
                showSuccessMessage(`Спасибо, ${name}! Мы скоро позвоним на ${phone}.`);
                footerForm.reset();
            } else {
                alert('Пожалуйста, заполните все поля.');
            }
        });
    }

    // ---------- Intersection Observer для анимации секций ----------
    const animatedElements = document.querySelectorAll('.animate');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // ---------- Кнопка "Наверх" ----------
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ---------- Параллакс для Hero ----------
    const heroImageWrapper = document.querySelector('.hero__image-wrapper');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking && heroImageWrapper) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                heroImageWrapper.style.transform = `translateY(${scrollY * 0.04}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });

    // ---------- Ripple-эффект на кнопках ----------
    document.querySelectorAll('.btn_def, .btn_light, .footer__btn, .ghost-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const oldRipple = this.querySelector('.ripple');
            if (oldRipple) oldRipple.remove();

            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ========================================
// 3. УТИЛИТА: показ сообщения об успехе
// ========================================
function showSuccessMessage(text) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, var(--primary-blue), #7bb3d9);
        color: white;
        padding: 18px 28px;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(54, 124, 182, 0.3);
        z-index: 1000;
        font-weight: 500;
        text-align: center;
        min-width: 280px;
        animation: fadeInUp 0.4s ease;
        font-family: var(--font-primary);
    `;
    message.textContent = text;
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.transition = 'all 0.4s ease';
        message.style.opacity = '0';
        message.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => message.remove(), 400);
    }, 4000);
}