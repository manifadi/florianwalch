// Handle scroll effects
function handleScroll() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Handle navbar
    if (scrollTop > 50) {
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else if (scrollTop === 0 && !textSlides[0].classList.contains('active')) {
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    // Handle section animations on scroll
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    
    if (heroBottom < windowHeight * 0.5) {
        heroSection.classList.add('fade-out');
        ablaufSection.classList.add('fade-in');
    } else {
        heroSection.classList.remove('fade-out');
        ablaufSection.classList.remove('fade-in');
    }
    
    // Parallax effect for text
    parallaxText.forEach(text => {
        const rect = text.getBoundingClientRect();
        const centerPosition = rect.top + rect.height / 2;
        const distanceFromCenter = centerPosition - windowHeight / 2;
        const translateY = distanceFromCenter * -0.1;
        
        text.style.transform = `translateY(${translateY}px)`;
    });
    
    // Prüfe, ob die Ablauf-Sektion aktiviert werden soll
    if (!isScrollLocked) {
        checkAblaufActivation();
    }
}

// Setup scroll event listeners
function setupScrollListeners() {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Add resize event listener
    window.addEventListener('resize', () => {
        // Handle any resize-specific adjustments
        handleScroll();
    });

    // Initial call to set positions
    handleScroll();
}