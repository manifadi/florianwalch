document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });
    
    // Smooth Scrolling für alle internen Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Ziel-ID aus dem href-Attribut extrahieren
            const targetId = this.getAttribute('href');
            
            // Wenn es ein gültiges Ziel gibt
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Smooth Scroll zum Ziel
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Mobile Menü schließen, wenn es geöffnet ist
                    if (mobileMenu.classList.contains('active')) {
                        menuToggle.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        body.classList.remove('no-scroll');
                    }
                }
            }
        });
    });
    
    // CTA-Button Scroll zum Kontaktformular
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});