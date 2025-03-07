// ============================================
// ABLAUF-ANIMATION FUNKTIONEN
// ============================================

// Variablen für die Steuerung
let stepPanels;
let verticalStepDots;
let currentStep = 1;
const totalSteps = 3;
const animationDuration = 800; // Animation duration in ms

// Diese Funktion wird aufgerufen, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Initialisiere die DOM-Elemente
    const ablaufSection = document.querySelector('.ablauf-section');
    stepPanels = document.querySelectorAll('.step-panel');
    verticalStepDots = document.querySelectorAll('.vertical-step-dot');
    
    // Initialisiere die Schrittanzeige
    initStepsDisplay();
    
    // Richte die Scroll-Steuerung ein
    setupAblaufScrollControl();
});

// Diese Funktion initialisiert die Anzeige der Schritte
function initStepsDisplay() {
    // Verstecke alle Schritt-Panels außer dem ersten
    stepPanels.forEach((panel, index) => {
        if (index === 0) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
    
    // Aktiviere den ersten Schritt
    activateStep(1);
}

// Diese Funktion aktualisiert die visuellen Elemente der Schrittanzeige
function activateStep(stepNumber) {
    // Alle Punkte in der Schrittanzeige werden aktualisiert
    verticalStepDots.forEach(dot => {
        const dotNumber = parseInt(dot.getAttribute('data-step'));
        dot.classList.remove('active');
        
        // Frühere Schritte werden als "abgeschlossen" markiert
        if (dotNumber < stepNumber) {
            dot.classList.add('completed');
        } 
        // Der aktuelle Schritt wird als "aktiv" markiert
        else if (dotNumber === stepNumber) {
            dot.classList.add('active');
        } 
        // Spätere Schritte werden als "noch nicht abgeschlossen" markiert
        else {
            dot.classList.remove('completed');
        }
    });
    
    // Die Fortschrittslinie wird entsprechend dem aktuellen Schritt aktualisiert
    const progressPercent = ((stepNumber - 1) / (verticalStepDots.length - 1)) * 100;
    document.querySelector('.vertical-step-line').style.setProperty('--progress', `${progressPercent}%`);
}

// Diese Funktion wechselt von einem Schritt zum anderen mit Animation
function changeStep(newStep) {
    // Prüfung: Ist der neue Schritt gültig und anders als der aktuelle?
    if (newStep < 1 || newStep > totalSteps || newStep === currentStep) return;
    
    // Die aktuell sichtbare Schritt-Anzeige und die nächste werden ausgewählt
    const currentPanel = document.querySelector(`.step-panel[data-step="${currentStep}"]`);
    const nextPanel = document.querySelector(`.step-panel[data-step="${newStep}"]`);
    
    // Die Richtung bestimmt, ob der nächste Schritt von unten oder oben eingeblendet wird
    const direction = newStep > currentStep ? 'up' : 'down';
    
    // Der aktive Punkt in der Schrittanzeige wird aktualisiert
    activateStep(newStep);
    
    // Animation des aktuellen Panels
    currentPanel.classList.remove('active');
    currentPanel.classList.add(direction === 'up' ? 'slide-up-out' : 'slide-down-out');
    
    // Das neue Panel wird eingeblendet
    nextPanel.classList.add('active');
    nextPanel.classList.add(direction === 'up' ? 'slide-up-in' : 'slide-down-in');
    
    // Der aktuelle Schritt wird aktualisiert
    currentStep = newStep;
    
    // Animations-Klassen entfernen nach Abschluss der Animation
    setTimeout(() => {
        currentPanel.classList.remove('slide-up-out', 'slide-down-out');
        nextPanel.classList.remove('slide-up-in', 'slide-down-in');
    }, animationDuration);
    
    console.log(`Schritt geändert zu: ${currentStep}`);
}

// Verwende Intersection Observer, um die Schritte beim Scrollen zu steuern
function setupAblaufScrollControl() {
    // Erstelle Waypoints für jeden Schritt
    const stepWaypoints = [];
    
    // Erstelle für jeden Schritt einen Wegpunkt-Element
    for (let i = 1; i <= totalSteps; i++) {
        const waypoint = document.createElement('div');
        waypoint.className = 'step-waypoint';
        waypoint.dataset.step = i;
        waypoint.style.position = 'absolute';
        waypoint.style.height = '33.33%'; // Jeder Wegpunkt nimmt ein Drittel der Höhe ein
        waypoint.style.width = '100%';
        waypoint.style.top = `${(i-1) * 33.33}%`;
        waypoint.style.left = '0';
        waypoint.style.pointerEvents = 'none'; // Unsichtbar für Interaktionen
        waypoint.style.zIndex = '-1'; // Hinter allem
        
        // Füge den Wegpunkt zum Ablauf-Scroll-Wrapper hinzu
        const scrollWrapper = document.querySelector('.ablauf-scroll-wrapper');
        scrollWrapper.appendChild(waypoint);
        stepWaypoints.push(waypoint);
    }
    
    // Erstelle einen Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const step = parseInt(entry.target.dataset.step);
                if (step !== currentStep) {
                    changeStep(step);
                }
            }
        });
    }, {
        root: null, // Viewport als Root
        rootMargin: '-40% 0px', // Trigger in der Mitte des Viewports
        threshold: 0.5 // Trigger, wenn 50% sichtbar
    });
    
    // Beobachte alle Wegpunkte
    stepWaypoints.forEach(waypoint => {
        observer.observe(waypoint);
    });
    
    // Füge Klick-Event-Listener für die Schritt-Punkte hinzu
    verticalStepDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const step = parseInt(dot.dataset.step);
            changeStep(step);
            
            // Scrolle zum entsprechenden Wegpunkt
            const waypoint = stepWaypoints[step - 1];
            waypoint.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
}