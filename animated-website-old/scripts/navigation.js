// Toggle mobile menu
function setupMobileMenu() {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Animate hamburger icon
        hamburger.classList.toggle('active');
        if (hamburger.classList.contains('active')) {
            hamburger.querySelector('span:first-child').style.transform = 'rotate(45deg) translate(5px, 8px)';
            hamburger.querySelector('span:last-child').style.transform = 'rotate(-45deg) translate(5px, -8px)';
        } else {
            hamburger.querySelector('span:first-child').style.transform = 'none';
            hamburger.querySelector('span:last-child').style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            hamburger.classList.remove('active');
            hamburger.querySelector('span:first-child').style.transform = 'none';
            hamburger.querySelector('span:last-child').style.transform = 'none';
        });
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}