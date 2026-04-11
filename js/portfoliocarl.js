// MENU BURGER 
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

// LIENS DOUX (SMOOTH SCROLL) & NAVIGATION ACTIVE 
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

// OBSERVATEUR D'INTERSECTION (TIMELINE)
document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.querySelector('.timeline-processus');
    if (timeline) {
        const observerTimeline = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timeline.style.setProperty('--timeline-height', '100%');
                    observerTimeline.unobserve(timeline);
                }
            });
        }, { threshold: 0.3 });
        observerTimeline.observe(timeline);
    }
});

// ANIMATION DE LA LIGNE DE TIMELINE
document.addEventListener('DOMContentLoaded', () => {
    const timelineLine = document.querySelector('.timeline-processus');
    if (timelineLine) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timelineLine.style.setProperty('--timeline-height', '100%');
                    observer.unobserve(timelineLine);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(timelineLine);
    }
});

// AJOUT DE LA PROPRIÉTÉ CSS POUR LA TIMELINE
const style = document.createElement('style');
style.textContent = `
    .timeline-processus::before {
        height: var(--timeline-height, 0%);
    }
`;
document.head.appendChild(style);

// OBSERVATEUR D'INTERSECTION (LISTES) 
document.addEventListener('DOMContentLoaded', () => {
    const observateur = new IntersectionObserver((entrees) => {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                entree.target.classList.add('visible');
                observateur.unobserve(entree.target);
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.item-liste, .carte-pourquoi').forEach(el => observateur.observe(el));
});

// ACCORDÉONS FAQ 
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.question-faq').forEach(question => {
        question.addEventListener('click', () => {
            const itemFaq = question.closest('.item-faq');
            if (itemFaq) itemFaq.classList.toggle('actif');
        });
    });
});

// BOUTON VOIR PLUS (RÉALISATIONS)
document.addEventListener('DOMContentLoaded', function() {
    const btnVoirPlus = document.getElementById('btnVoirPlus');
    const grilleProjetsPlus = document.getElementById('grilleProjetsPlus');
    
    if (btnVoirPlus && grilleProjetsPlus) {
        btnVoirPlus.addEventListener('click', function() {
            if (grilleProjetsPlus.style.display === 'none' || grilleProjetsPlus.style.display === '') {
                grilleProjetsPlus.style.display = 'grid';
                btnVoirPlus.textContent = 'Voir moins';
                btnVoirPlus.style.background = '#7850ff';
                btnVoirPlus.style.color = 'white';
            } else {
                grilleProjetsPlus.style.display = 'none';
                btnVoirPlus.textContent = 'Voir plus';
                btnVoirPlus.style.background = 'transparent';
                btnVoirPlus.style.color = '#7850ff';
            }
        });
    }
});

// GESTION DES FLÈCHES (REDIRECTION)
document.addEventListener('DOMContentLoaded', function() {
    const liensProjet = document.querySelectorAll('.lien-projet');
    
    liensProjet.forEach(lien => {
        lien.addEventListener('click', function(e) {
            e.preventDefault();
            const projet = this.getAttribute('data-projet');
            console.log('Voir le projet : ' + projet);
        });
    });
});

// BARRES DE PROGRESSION AU SCROLL (COMPÉTENCES)
document.addEventListener('DOMContentLoaded', () => {
    const barres = document.querySelectorAll('.progression');
    const observerBarres = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.transition = 'width 1s ease-out';
                observerBarres.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    barres.forEach(barre => observerBarres.observe(barre));
});