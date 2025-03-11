document.addEventListener('DOMContentLoaded', function() {
    // Element-Referenzen
    const menuBtn = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // Toggle Menu Funktion - NUR durch den Menü-Button
    function toggleMenu() {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Event-Listener NUR für den Menü-Button
    menuBtn.addEventListener('click', toggleMenu);
    
    // Event-Listener für Menü-Links
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Menü schließen
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Smooth Scrolling für Anker-Links
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Scroll zur Zielposition mit Offset für Header
                    const headerHeight = 80; // Anpassen an tatsächliche Header-Höhe
                    const targetPosition = targetElement.getBoundingClientRect().top + 
                                         window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Tastatur-Navigation: ESC-Taste schließt Menü
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});