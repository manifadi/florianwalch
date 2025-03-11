/**
 * Akkordeon-Funktionalität - Optimierte Version
 * Einfache, flüssige und zuverlässige Implementierung
 */
document.addEventListener('DOMContentLoaded', () => {
    // Alle Akkordeon-Elemente auswählen
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    // Event-Listener für jedes Akkordeon-Element hinzufügen
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        // Click-Event für den Header
        header.addEventListener('click', () => {
            // Prüfen, ob dieses Akkordeon bereits aktiv ist
            const isActive = item.classList.contains('active');
            
            // Alle anderen Akkordeons schließen
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    // Aktiv-Klasse entfernen
                    otherItem.classList.remove('active');
                    
                    // Inhalt schließen mit Animation
                    const otherContent = otherItem.querySelector('.accordion-content');
                    otherContent.style.height = otherContent.scrollHeight + 'px';
                    
                    // Reflow erzwingen
                    otherContent.getBoundingClientRect();
                    
                    // Animation zum Schließen starten
                    otherContent.style.height = '0';
                }
            });
            
            // Dieses Akkordeon umschalten
            if (isActive) {
                // Wenn aktiv, dann schließen
                closeAccordion(item, content);
            } else {
                // Wenn nicht aktiv, dann öffnen
                openAccordion(item, content);
            }
        });
        
        // Initialisierung: Alle Akkordeons geschlossen
        content.style.height = '0';
    });
    
    // Hilfsfunktion zum Öffnen eines Akkordeons
    function openAccordion(item, content) {
        // Aktiv-Klasse hinzufügen
        item.classList.add('active');
        
        // Höhe messen und setzen
        content.style.height = content.scrollHeight + 'px';
        
        // Nach der Animation auf "auto" setzen für flexible Höhe
        content.addEventListener('transitionend', function setAutoHeight(e) {
            if (e.propertyName === 'height' && item.classList.contains('active')) {
                content.style.height = 'auto';
                content.removeEventListener('transitionend', setAutoHeight);
            }
        });
    }
    
    // Hilfsfunktion zum Schließen eines Akkordeons
    function closeAccordion(item, content) {
        // Aktuelle Höhe setzen, bevor wir die Animation starten
        content.style.height = content.scrollHeight + 'px';
        
        // Reflow erzwingen
        content.getBoundingClientRect();
        
        // Animation zum Schließen starten
        content.style.height = '0';
        
        // Aktiv-Klasse entfernen (kann sofort erfolgen)
        item.classList.remove('active');
    }
    
    // Höhe bei Resize anpassen (mit Debounce für bessere Performance)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const activeItem = document.querySelector('.accordion-item.active');
            if (activeItem) {
                const content = activeItem.querySelector('.accordion-content');
                if (content.style.height !== '0px') {
                    content.style.height = 'auto';
                    const height = content.scrollHeight;
                    content.style.height = height + 'px';
                }
            }
        }, 100);
    });
});