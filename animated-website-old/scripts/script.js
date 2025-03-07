// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu ul li a');
const heroSection = document.querySelector('.hero');
const ablaufSection = document.querySelector('.ablauf-section');
const parallaxText = document.querySelectorAll('.parallax-text');
const stepPanels = document.querySelectorAll('.step-panel');
const verticalStepDots = document.querySelectorAll('.vertical-step-dot');

// Hero Animation Elements
const textSlides = document.querySelectorAll('.text-slide');
const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const slide3 = document.getElementById('slide3');
const heroDescription = document.querySelector('.hero-description');
const ctaButton = document.querySelector('.cta-button');
const heroImageContainer = document.querySelector('.hero-image');
const heroImage = document.querySelector('.hero-image img');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Scroll Control Variables
let isScrolling = false;
let currentStep = 1;
const totalSteps = 3;
const animationDuration = 800; // Animation duration in ms

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize HERO SECTION
    animateHero();
    setupHeroParallax();
    setupScrollIndicator();

    // Initialize navigation
    setupMobileMenu();
    setupSmoothScrolling();

    /* Initialize steps display
    initStepsDisplay();
    
    // Setup Ablauf scroll control
    setupAblaufScrollControl();
    
    // Setup scroll listeners
    setupScrollListeners(); */
});