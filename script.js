document.addEventListener('DOMContentLoaded', () => {
    
    // Gestion du Menu Mobile
    const menuBurger = document.querySelector('.menu-burger');
    const liensNav = document.querySelector('.liens-nav');
    const itemsMenu = document.querySelectorAll('.liens-nav li a');

    menuBurger.addEventListener('click', () => {
        liensNav.classList.toggle('active');
        menuBurger.classList.toggle('toggle');
        // Animation de l'icone burger
        if(liensNav.classList.contains('active')) {
            menuBurger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuBurger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    itemsMenu.forEach(lien => {
        lien.addEventListener('click', () => {
            liensNav.classList.remove('active');
            menuBurger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Navbar Effet Verre au scroll 
    const barreNav = document.querySelector('.barre-nav');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            barreNav.style.background = 'rgba(15, 23, 42, 0.95)';
            barreNav.style.padding = '0';
        } else {
            barreNav.style.background = 'rgba(15, 23, 42, 0.85)';
        }
    });

    // Date dynamique 
    document.getElementById('annee').textContent = new Date().getFullYear();

    // Défilement fluide 
    document.querySelectorAll('a[href^="#"]').forEach(ancre => {
        ancre.addEventListener('click', function (e) {
            e.preventDefault();
            const cible = document.querySelector(this.getAttribute('href'));
            if(cible) {
                window.scrollTo({
                    top: cible.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation au défilement (Scroll Reveal)
    const elementsReveled = document.querySelectorAll('.revelation-texte, .revelation-haut, .revelation-gauche, .revelation-droite, .revelation-item');
    
    const observateurReveil = new IntersectionObserver((entrees, observateur) => {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                entree.target.classList.add('active');
                // On arrête d'observer une fois animé
                observateur.unobserve(entree.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    });

    elementsReveled.forEach(el => {
        observateurReveil.observe(el);
    });

    // Animation séquentielle des compétences
    const sectionCompetences = document.querySelector('.competences');
    const tagsCompetence = document.querySelectorAll('.tag-competence');
    
    const observateurCompetences = new IntersectionObserver((entrees) => {
        if(entrees[0].isIntersecting) {
            tagsCompetence.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, index * 100); 
            });
        }
    });
    if(sectionCompetences) observateurCompetences.observe(sectionCompetences);

    // Curseur personnalisé
    const curseurPoint = document.querySelector('.curseur-point');
    const curseurContour = document.querySelector('.curseur-contour');

    if(curseurPoint && curseurContour && window.innerWidth > 768) {
        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            curseurPoint.style.left = `${posX}px`;
            curseurPoint.style.top = `${posY}px`;

            curseurContour.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
        
        // Agrandir curseur sur éléments cliquables
        document.querySelectorAll('a, button, .carte-projet, .tag-competence').forEach(el => {
            el.addEventListener('mouseenter', () => {
                curseurContour.style.transform = 'translate(-50%, -50%) scale(1.5)';
                curseurContour.style.borderColor = 'var(--primaire)';
            });
            el.addEventListener('mouseleave', () => {
                curseurContour.style.transform = 'translate(-50%, -50%) scale(1)';
                curseurContour.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            });
        });
    }
});