// Hero Animation Functions
function animateHero() {
    // Initially hide all slides and content
    textSlides.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(30px)';
    });
    
    heroDescription.style.opacity = '0';
    ctaButton.style.opacity = '0';
    heroImageContainer.style.opacity = '0';
    
    // Animation sequence
    setTimeout(() => {
        // Show first slide
        slide1.classList.add('active');
        slide2.classList.add('active');
        slide3.classList.add('active');
        
        setTimeout(() => {
            // Convert all slides to final state
            textSlides.forEach(slide => {
                slide.classList.add('final-state');
            });
            
            // Show navbar
            navbar.style.opacity = '1';
            navbar.style.transform = 'translateY(0)';
            
            // Show description, button and image
            heroDescription.classList.add('description-visible');
            ctaButton.classList.add('button-visible');
            heroImageContainer.classList.add('image-visible');

            // Disable body no-scroll
            document.body.classList.remove('noscroll');
            
        }, 300); // Wait before showing final state
        
    }, 500); // Initial delay
}

// Parallax effect on mouse move for hero section
function setupHeroParallax() {
    heroSection.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
        
        heroImage.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
}

// Setup scroll indicator
function setupScrollIndicator() {
    scrollIndicator.addEventListener('click', () => {
        const ablaufSection = document.querySelector('#ablauf');
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = ablaufSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
}