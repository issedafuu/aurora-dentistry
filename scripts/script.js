// Preloader
const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 600);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const modalOverlay = document.getElementById('modalOverlay');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalForm = document.getElementById('modalForm');
    const heroModalBtn = document.getElementById('heroModalBtn');

    function openModal() { modalOverlay.classList.add('active'); }
    function closeModal() { modalOverlay.classList.remove('active'); }

    openModalBtn.addEventListener('click', openModal);
    if (heroModalBtn) heroModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    const priceModalOverlay = document.getElementById('priceModalOverlay');
    const priceBtn = document.getElementById('priceBtn');
    const closePriceModalBtn = document.getElementById('closePriceModalBtn');

    function openPriceModal() { priceModalOverlay.classList.add('active'); }
    function closePriceModal() { priceModalOverlay.classList.remove('active'); }

    priceBtn.addEventListener('click', openPriceModal);
    closePriceModalBtn.addEventListener('click', closePriceModal);
    priceModalOverlay.addEventListener('click', (e) => {
        if (e.target === priceModalOverlay) closePriceModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && priceModalOverlay.classList.contains('active')) {
            closePriceModal();
        }
    });

    document.querySelector('.hero__info-container')?.classList.add('animate', 'fadeInLeft');
    document.querySelector('.hero__image-wrapper')?.classList.add('animate', 'fadeInRight');

    document.querySelectorAll('.card').forEach((card, index) => {
        card.classList.add('animate', 'scaleIn', `delay-${(index % 5) + 1}`);
    });

    document.querySelectorAll('.why__text-content').forEach((item, index) => {
        item.classList.add('animate', 'fadeInUp', `delay-${(index % 5) + 1}`);
    });

    document.querySelector('.why__images-container')?.classList.add('animate', 'fadeInLeft');

    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.classList.add('animate', 'scaleIn', `delay-${(index % 5) + 1}`);
    });

    document.querySelectorAll('.footer__col').forEach((col, index) => {
        col.classList.add('animate', 'fadeInUp', `delay-${(index % 3) + 1}`);
    });

    const animatedElements = document.querySelectorAll('.animate');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.2 });

        animatedElements.forEach(el => observer.observe(el));
    }
});

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