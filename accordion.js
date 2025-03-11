/**
 * Akkordeon-Funktionalität
 * Diese Datei enthält Funktionen zum Steuern von aufklappbaren Akkordeon-Elementen
 */

// Funktion zum Umschalten des Akkordeon-Zustands
function toggleAccordion(event) {
    // Das Akkordeon-Element, auf das geklickt wurde
    const accordionHeader = event.currentTarget;
    // Das zugehörige Content-Element finden (Annahme: es ist das nächste Geschwisterelement)
    const accordionContent = accordionHeader.nextElementSibling;
    // Das übergeordnete Container-Element
    const accordionItem = accordionHeader.parentElement;
    
    // Toggle der 'active' Klasse für das Akkordeon-Item
    accordionItem.classList.toggle('active');
    
    // Wenn das Akkordeon geöffnet ist, maximale Höhe setzen, sonst auf 0
    if (accordionItem.classList.contains('active')) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
        accordionContent.style.maxHeight = "0";
    }
}

// Initialisierung aller Akkordeons auf der Seite
function initAccordions() {
    // Alle Akkordeon-Header auswählen
    const accordionHeaders = document.querySelectorAll('.ablauf-accordion-header');
    
    // Event-Listener für jeden Header hinzufügen
    accordionHeaders.forEach(header => {
        header.addEventListener('click', toggleAccordion);
        
        // Initialen Zustand setzen (alle geschlossen)
        const accordionContent = header.nextElementSibling;
        if (accordionContent) {
            accordionContent.style.maxHeight = "0";
        }
    });
}

// Die Initialisierungsfunktion aufrufen, wenn das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', initAccordions);