document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    menuToggle.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
    setDateForDatePicker();
});

function setDateForDatePicker(){
    // Elemente für die Schritte
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    // Navigationsbuttons
    const toStep2Button = document.getElementById('toStep2');
    const backToStep1Button = document.getElementById('backToStep1');
    const toStep3Button = document.getElementById('toStep3');
    const backToStep2Button = document.getElementById('backToStep2');
    
    // Progress-Bar und Schritte
    const progressFill = document.getElementById('progressFill');
    const steps = document.querySelectorAll('.step');
    
    // Formularfelder
    const vollerNameInput = document.getElementById('vollername');
    const emailInput = document.getElementById('email');
    const terminZeitSelect = document.getElementById('termin-zeit');
    const selectedDateInput = document.getElementById('selectedDate');
    
    // Zusammenfassungsfelder
    const summaryName = document.getElementById('summaryName');
    const summaryEmail = document.getElementById('summaryEmail');
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');
    
    // Kalender-Elemente
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    
    // Aktuelles Datum für Kalender
    let currentDate = new Date();
    let selectedDate = null;
    
    // Navigation zwischen den Schritten
    toStep2Button.addEventListener('click', function() {
        if (validateStep1()) {
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
            updateProgress(2);
        }
    });
    
    backToStep1Button.addEventListener('click', function() {
        step2.classList.add('hidden');
        step1.classList.remove('hidden');
        updateProgress(1);
    });
    
    toStep3Button.addEventListener('click', function() {
        if (validateStep2()) {
            step2.classList.add('hidden');
            step3.classList.remove('hidden');
            updateSummary();
            updateProgress(3);
        }
    });
    
    backToStep2Button.addEventListener('click', function() {
        step3.classList.add('hidden');
        step2.classList.remove('hidden');
        updateProgress(2);
    });
    
    // Funktion zur Validierung von Schritt 1
    function validateStep1() {
        if (!vollerNameInput.value.trim()) {
            alert('Bitte gib deinen Namen ein.');
            vollerNameInput.focus();
            return false;
        }
        
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            alert('Bitte gib eine gültige E-Mail-Adresse ein.');
            emailInput.focus();
            return false;
        }
        
        return true;
    }
    
    // Funktion zur Validierung von Schritt 2
    function validateStep2() {
        if (!selectedDateInput.value) {
            alert('Bitte wähle ein Datum aus.');
            return false;
        }
        
        if (!terminZeitSelect.value) {
            alert('Bitte wähle eine Uhrzeit aus.');
            terminZeitSelect.focus();
            return false;
        }
        
        return true;
    }
    
    // E-Mail-Validierung
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Progress-Bar aktualisieren
    function updateProgress(step) {
        // Progress-Bar füllen
        progressFill.style.width = `${(step / 3) * 100}%`;
        
        // Schritte aktualisieren
        steps.forEach((stepElement, index) => {
            if (index + 1 < step) {
                stepElement.classList.add('completed');
                stepElement.classList.remove('active');
            } else if (index + 1 === step) {
                stepElement.classList.add('active');
                stepElement.classList.remove('completed');
            } else {
                stepElement.classList.remove('active', 'completed');
            }
        });
    }
    
    // Zusammenfassung aktualisieren
    function updateSummary() {
        summaryName.textContent = vollerNameInput.value;
        summaryEmail.textContent = emailInput.value;
        
        // Datum formatieren
        const dateObj = new Date(selectedDateInput.value);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        summaryDate.textContent = dateObj.toLocaleDateString('de-DE', options);
        
        summaryTime.textContent = terminZeitSelect.value + ' Uhr';
    }
    
    // Kalender initialisieren
    function initCalendar() {
        renderCalendar(currentDate);
        
        // Event-Listener für Monatswechsel
        prevMonthButton.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });
        
        nextMonthButton.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        });
    }
    
    // Kalender rendern
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Monat und Jahr anzeigen
        const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                          'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Tage im Kalender generieren
        calendarDays.innerHTML = '';
        
        // Erster Tag des Monats
        const firstDay = new Date(year, month, 1);
        // Letzter Tag des Monats
        const lastDay = new Date(year, month + 1, 0);
        
        // Tag der Woche des ersten Tags (0 = Sonntag, 1 = Montag, ...)
        let firstDayOfWeek = firstDay.getDay();
        if (firstDayOfWeek === 0) firstDayOfWeek = 7; // Sonntag ist 7 in europäischem Format
        
        // Tage aus dem vorherigen Monat
        const prevMonthDays = firstDayOfWeek - 1;
        const prevMonth = new Date(year, month, 0);
        const prevMonthLastDay = prevMonth.getDate();
        
        for (let i = prevMonthDays; i > 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day', 'other-month', 'disabled');
            dayElement.textContent = prevMonthLastDay - i + 1;
            calendarDays.appendChild(dayElement);
        }
        
        // Tage des aktuellen Monats
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = i;
            
            const currentDateObj = new Date(year, month, i);
            
            // Ist es heute?
            if (isCurrentMonth && i === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            // Ist es der ausgewählte Tag?
            if (selectedDate && 
                selectedDate.getDate() === i && 
                selectedDate.getMonth() === month && 
                selectedDate.getFullYear() === year) {
                dayElement.classList.add('selected');
            }
            
            // Vergangene Tage oder Wochenenden deaktivieren
            const isPastDay = currentDateObj < new Date(today.setHours(0, 0, 0, 0));
            const isWeekend = currentDateObj.getDay() === 0 || currentDateObj.getDay() === 6;
            
            if (isPastDay || isWeekend) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', function() {
                    // Ausgewähltes Datum aktualisieren
                    selectedDate = new Date(year, month, i);
                    selectedDateInput.value = selectedDate.toISOString().split('T')[0];
                    
                    // Klasse für ausgewählten Tag aktualisieren
                    document.querySelectorAll('.calendar-day.selected').forEach(el => {
                        el.classList.remove('selected');
                    });
                    dayElement.classList.add('selected');
                });
            }
            
            calendarDays.appendChild(dayElement);
        }
        
        // Tage aus dem nächsten Monat
        const totalDaysShown = prevMonthDays + lastDay.getDate();
        const nextMonthDays = 42 - totalDaysShown; // 6 Wochen × 7 Tage = 42
        
        for (let i = 1; i <= nextMonthDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day', 'other-month', 'disabled');
            dayElement.textContent = i;
            calendarDays.appendChild(dayElement);
        }
    }
    
    // Formular-Submit-Handler
    document.getElementById('stepForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Überprüfen, ob alle erforderlichen Felder ausgefüllt sind
        if (!vollerNameInput.value.trim() || 
            !emailInput.value.trim() || 
            !selectedDateInput.value || 
            !terminZeitSelect.value ||
            !document.getElementById('datenschutz').checked ||
            !document.getElementById('captcha').checked) {
            
            alert('Bitte fülle alle Pflichtfelder aus und akzeptiere die Bedingungen.');
            return;
        }
        
        // Hier würde normalerweise der AJAX-Request zum Server erfolgen
        
        // Erfolgsanimation
        const submitButton = document.querySelector('.submit-button');
        submitButton.innerHTML = '<i class="fas fa-check"></i> Termin gebucht!';
        submitButton.style.backgroundColor = '#2E8B57';
        
        setTimeout(() => {
            alert('Vielen Dank! Dein Termin wurde erfolgreich gebucht. Wir haben dir eine Bestätigungs-E-Mail gesendet.');
            
            // Formular zurücksetzen und zum ersten Schritt zurückkehren
            this.reset();
            step3.classList.add('hidden');
            step1.classList.remove('hidden');
            updateProgress(1);
            submitButton.innerHTML = 'Termin buchen';
            submitButton.style.backgroundColor = '';
            selectedDate = null;
        }, 1500);
    });
    
    // Kalender initialisieren
    initCalendar();
    
    // Progress-Bar initialisieren
    updateProgress(1);
}