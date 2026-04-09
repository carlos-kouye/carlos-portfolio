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

// CARROUSEL (ancienne version - à supprimer si tu ne l'utilises plus)
/* Ce code est conservé pour compatibilité mais la nouvelle section réalisations n'utilise plus le carrousel
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
*/

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
    document.querySelectorAll('.item-liste').forEach(el => observateur.observe(el));
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

// NOUVEAU : BOUTON VOIR PLUS (RÉALISATIONS) (AJOUTÉ) 
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

// NOUVEAU : GESTION DES FLÈCHES (REDIRECTION) (AJOUTÉ) 
document.addEventListener('DOMContentLoaded', function() {
    const liensProjet = document.querySelectorAll('.lien-projet');
    
    liensProjet.forEach(lien => {
        lien.addEventListener('click', function(e) {
            e.preventDefault();
            const projet = this.getAttribute('data-projet');
            // Redirige vers la page du projet
            // Exemple : window.location.href = 'projet-' + projet + '.html';
            console.log('Voir le projet : ' + projet);
            // Tu peux remplacer par une vraie redirection
            // window.location.href = 'projet.html?id=' + projet;
        });
    });
});
// BARRES DE PROGRESSION AU SCROLL 
document.addEventListener('DOMContentLoaded', () => {
    const barres = document.querySelectorAll('.barre-progression .remplissage');

    const observerBarres = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Définir un pourcentage différent selon la carte
                const carte = entry.target.closest('.item-liste');
                let pourcentage = 70; // valeur par défaut

                if (carte) {
                    const numero = carte.querySelector('.numero-liste')?.innerText;
                    const texte = carte.querySelector('.contenu-liste h3')?.innerText;
                    
                    if (numero === '01' || texte?.includes('discute')) pourcentage = 85;
                    if (numero === '02' || texte?.includes('structure')) pourcentage = 75;
                    if (numero === '03' || texte?.includes('crée')) pourcentage = 95;
                    if (numero === '04' || texte?.includes('ajuste')) pourcentage = 100;
                    if (texte?.includes('Résultats')) pourcentage = 90;
                    if (texte?.includes('Polyvalent')) pourcentage = 85;
                    if (texte?.includes('Réactif')) pourcentage = 95;
                    if (texte?.includes('Tarifs')) pourcentage = 80;
                }

                entry.target.style.width = pourcentage + '%';
                observerBarres.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    barres.forEach(barre => observerBarres.observe(barre));
});