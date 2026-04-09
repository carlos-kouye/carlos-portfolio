//  MENU BURGER 
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const liensNav = document.querySelector('.liens-nav');
    if (burger && liensNav) {
        burger.addEventListener('click', () => {
            liensNav.classList.toggle('actif');
            burger.classList.toggle('actif');
        });
        document.querySelectorAll('.liens-nav a').forEach(lien => {
            lien.addEventListener('click', () => {
                liensNav.classList.remove('actif');
                burger.classList.remove('actif');
            });
        });
    }
});

//  LIENS DOUX (SMOOTH SCROLL) & NAVIGATION ACTIVE 
document.querySelectorAll('.liens-nav a[href^="#"]').forEach(ancre => {
    ancre.addEventListener('click', function(e) {
        e.preventDefault();
        const cibleId = this.getAttribute('href');
        if (cibleId === '#') return;
        const elementCible = document.querySelector(cibleId);
        if (elementCible) {
            elementCible.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) navbar.classList.add('visible');
        else navbar.classList.remove('visible');
    }
    const sections = document.querySelectorAll('section[id]');
    const liensNav = document.querySelectorAll('.liens-nav a');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) current = section.getAttribute('id');
    });
    liensNav.forEach(lien => {
        lien.classList.remove('actif');
        const href = lien.getAttribute('href').replace('#', '');
        if (href === current) lien.classList.add('actif');
    });
});

//  CARROUSEL 
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('carrouselWrapper');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const pointsContainer = document.getElementById('pointsCarrousel');
    if (wrapper && btnPrev && btnNext && pointsContainer) {
        const slides = Array.from(wrapper.children);
        const totalSlides = slides.length;
        let indexActuel = 0;
        const creerPoints = () => {
            pointsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const point = document.createElement('div');
                point.classList.add('point');
                if (i === indexActuel) point.classList.add('actif');
                point.addEventListener('click', () => allerAuSlide(i));
                pointsContainer.appendChild(point);
            }
        };
        const mettreAJourPoints = () => {
            const points = pointsContainer.querySelectorAll('.point');
            points.forEach((point, i) => {
                if (i === indexActuel) point.classList.add('actif');
                else point.classList.remove('actif');
            });
        };
        const allerAuSlide = (index) => {
            if (index < 0) index = 0;
            if (index >= totalSlides) index = totalSlides - 1;
            indexActuel = index;
            wrapper.style.transform = `translateX(-${indexActuel * 100}%)`;
            mettreAJourPoints();
        };
        btnPrev.addEventListener('click', () => allerAuSlide(indexActuel - 1));
        btnNext.addEventListener('click', () => allerAuSlide(indexActuel + 1));
        creerPoints();
        allerAuSlide(0);
    }
});

//  OBSERVATEUR D'INTERSECTION (LISTES) 
document.addEventListener('DOMContentLoaded', () => {
    const observateur = new IntersectionObserver((entrees) => {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                entree.target.classList.add('visible');
                observateur.unobserve(entree.target);
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.item-liste').forEach(el => observateur.observe(el));
});

//  ACCORDÉONS FAQ 
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.question-faq').forEach(question => {
        question.addEventListener('click', () => {
            const itemFaq = question.closest('.item-faq');
            if (itemFaq) itemFaq.classList.toggle('actif');
        });
    });
});