// ===================================
// ECO CALENDAR 365 - APPLICATION
// Gestion de l'interactivité et des données
// ===================================

// État de l'application
let appState = {
    currentMonth: new Date().getMonth() + 1,
    currentDay: new Date().getDate(),
    currentYear: new Date().getFullYear(),
    viewMonth: new Date().getMonth() + 1,
    viewYear: new Date().getFullYear(),
    completedActions: [],
    streak: 0,
    totalCO2Saved: 0,
    totalWaterSaved: 0,
    totalMoneySaved: 0,
    totalShares: 0,
    totalXP: 0,
    isDarkMode: false,
    unlockedBadges: []
};

// Données des thèmes saisonniers
const SEASONAL_THEMES = {
    1: { primary: "#1e6091", secondary: "#52b69a", image: "theme_january_winter_cozy" },
    2: { primary: "#2d6a4f", secondary: "#74c69d", image: "theme_february_digital_sobriety" },
    3: { primary: "#386641", secondary: "#bc4749", image: "theme_march_spring_biodiversity" },
    4: { primary: "#40916c", secondary: "#74c69d", image: "theme_april_ecofashion_textile" },
    5: { primary: "#1b4332", secondary: "#52b788", image: "theme_may_transport_mobility" },
    6: { primary: "#e67e22", secondary: "#f1c40f", image: "theme_june_solar_energy" },
    7: { primary: "#023e8a", secondary: "#48cae4", image: "theme_july_ocean_beaches" },
    8: { primary: "#0077b6", secondary: "#90e0ef", image: "theme_august_water_conservation" },
    9: { primary: "#8c5b3e", secondary: "#f4a261", image: "theme_september_waste_reduction" },
    10: { primary: "#a04000", secondary: "#d35400", image: "theme_october_local_food" },
    11: { primary: "#5d4037", secondary: "#8d6e63", image: "theme_november_circular_economy" },
    12: { primary: "#0b3d2e", secondary: "#52b788", image: "theme_december_sustainable_holidays" }
};

// Map des images (chemins réels générés)
const THEME_IMAGES = {
    "theme_january_winter_cozy": "theme_january_winter_cozy_1769026536736.png",
    "theme_february_digital_sobriety": "theme_february_digital_sobriety_1769026553047.png",
    "theme_march_spring_biodiversity": "theme_march_spring_biodiversity_1769026571354.png",
    "theme_april_ecofashion_textile": "theme_april_ecofashion_textile_1769026591347.png",
    "theme_may_transport_mobility": "theme_may_transport_mobility_1769026623618.png",
    "theme_june_solar_energy": "theme_june_solar_energy_1769026640873.png",
    "theme_july_ocean_beaches": "theme_july_ocean_beaches_1769026661800.png",
    "theme_august_water_conservation": "theme_august_water_conservation_1769026677647.png",
    "theme_september_waste_reduction": "theme_september_waste_reduction_1769026710095.png",
    "theme_october_local_food": "theme_october_local_food_1769026725998.png",
    "theme_november_circular_economy": "theme_november_circular_economy_1769026740769.png",
    "theme_december_sustainable_holidays": "theme_december_sustainable_holidays_1769026755716.png"
};

// Artifact Path (à adapter pour le déploiement)
// const ARTIFACT_BASE_URL = "https://raw.githubusercontent.com/username/repo/main/brain/"; // Placeholder, j'utiliserai une logique locale pour la démo
// const LOCAL_ARTIFACT_PATH = "C:/Users/willi/.gemini/antigravity/brain/c7e1ebc0-3f6f-4043-a700-bd936640e1d8/";

// Constantes de progression
const XP_PER_ACTION = 100;
const XP_PER_LEVEL = 1000;

// Charger les données depuis localStorage
function loadState() {
    const saved = localStorage.getItem('ecoCalendar365');
    if (saved) {
        appState = { ...appState, ...JSON.parse(saved) };
    }
}

// Obtenir le niveau actuel
function getCurrentLevel() {
    return Math.floor(appState.totalXP / XP_PER_LEVEL) + 1;
}

// Obtenir l'XP vers le prochain niveau
function getXPInCurrentLevel() {
    return appState.totalXP % XP_PER_LEVEL;
}

// Sauvegarder les données dans localStorage
function saveState() {
    localStorage.setItem('ecoCalendar365', JSON.stringify(appState));
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    loadState();
    initializeApp();
    updateUI();
    generateCalendar();
    checkBadges();
    applyDarkMode();

    // Listener Mode Sombre
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

    // === PWA: Service Worker ===
    let deferredPrompt;

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('✅ Service Worker enregistré:', registration.scope);

                    // Vérifier les mises à jour toutes les heures
                    setInterval(() => {
                        registration.update();
                    }, 60 * 60 * 1000);

                    // Gérer les mises à jour du SW
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // Nouvelle version disponible
                                showUpdateNotification();
                            }
                        });
                    });

                    if (Notification.permission === 'granted') {
                        scheduleDailyNotification(registration);
                    }
                })
                .catch(error => {
                    console.error('❌ Erreur Service Worker:', error);
                });
        });
    }

    // === PWA: Détection d'installation ===
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallButton();
    });

    // Détecter quand l'app est installée
    window.addEventListener('appinstalled', () => {
        console.log('✅ PWA installée !');
        deferredPrompt = null;
        hideInstallButton();
        showNotification('Application installée !', 'success');
    });

    // Demander la permission après 5s pour ne pas brusquer
    setTimeout(() => {
        if (Notification.permission === 'default') {
            setupNotifications();
        }
    }, 5000);

    // Initialiser le graphique
    renderImpactChart();
});

// Initialiser l'application
function initializeApp() {
    // Mettre à jour le thème du mois (basé sur le mois de l'action)
    updateCurrentTheme();

    // Afficher l'action du jour (initialement aujourd'hui)
    const now = new Date();
    appState.currentDay = now.getDate();
    appState.currentMonth = now.getMonth() + 1;
    appState.currentYear = now.getFullYear();

    displayTodayAction();

    // Mettre à jour les statistiques
    updateStats();

    // Générer les badges
    displayBadges();
}

// Mettre à jour le thème du mois actuel
function updateCurrentTheme() {
    const monthKey = Object.keys(THEMES)[appState.viewMonth - 1];
    const theme = THEMES[monthKey];

    document.getElementById('themeBadge').textContent = getMonthName(appState.viewMonth) + ' ' + appState.viewYear;
    document.getElementById('themeTitle').textContent = theme.icon + ' ' + theme.name;
    document.getElementById('themeDescription').textContent = theme.description;

    // Mise à jour saisonnière (Couleurs + Image)
    const seasonal = SEASONAL_THEMES[appState.viewMonth];
    document.documentElement.style.setProperty('--theme-primary', seasonal.primary);
    document.documentElement.style.setProperty('--theme-primary-light', seasonal.secondary);

    // Gradient de fond du Hero (au lieu d'images)
    const hero = document.getElementById('seasonalHero');
    if (hero) {
        // Dégradés magnifiques pour chaque mois
        const gradients = {
            1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Janvier - Violet hivernal
            2: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // Février - Rose glacé
            3: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', // Mars - Pêche printanière
            4: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', // Avril - Rose cerisier
            5: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', // Mai - Lavande fleurie
            6: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', // Juin - Bleu ciel d'été
            7: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)', // Juillet - Doré soleil
            8: 'linear-gradient(135deg, #fab2ff 0%, #1904e5 100%)', // Août - Coucher de soleil
            9: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // Septembre - Automne chaud
            10: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)', // Octobre - Orange automnal
            11: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Novembre - Brume matinale
            12: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'  // Décembre - Hiver magique
        };

        hero.style.backgroundImage = gradients[appState.viewMonth] || gradients[1];
    }

    // Calculer la progression du mois (utilise currentMonth car c'est la progression de l'utilisateur)
    const monthActions = ACTIONS.filter(a => a.month === appState.currentMonth);
    const completedThisMonth = appState.completedActions.filter(id => {
        const action = ACTIONS.find(a => a.id === id);
        return action && action.month === appState.currentMonth;
    });

    const progress = (completedThisMonth.length / monthActions.length) * 100;
    document.getElementById('monthProgress').textContent = `${completedThisMonth.length}/${monthActions.length}`;
    document.getElementById('monthProgressBar').style.width = progress + '%';
}

// Afficher l'action du jour
function displayTodayAction() {
    const today = ACTIONS.find(a =>
        a.month === appState.currentMonth &&
        a.day === appState.currentDay
    );

    if (!today) {
        console.log('Aucune action pour aujourd\'hui');
        return;
    }

    // Mettre à jour le DOM
    document.getElementById('actionIcon').textContent = today.icon;
    document.getElementById('actionTitle').textContent = today.title;
    document.getElementById('actionDescription').textContent = today.description;
    document.getElementById('actionWhy').textContent = today.why;
    document.getElementById('actionFact').textContent = today.fact;
    document.getElementById('actionSource').textContent = 'Source: ' + today.source;
    document.getElementById('actionSource').href = today.sourceUrl;

    document.getElementById('actionDifficulty').textContent = today.difficulty.charAt(0).toUpperCase() + today.difficulty.slice(1);
    document.getElementById('actionTime').textContent = today.duration;

    // Impact
    document.getElementById('impactValue').textContent = `-${today.impact.co2} kg`;
    if (today.impact.savings) {
        document.getElementById('savingsValue').textContent = `~${today.impact.savings}€`;
    }

    // Tips
    const tipsList = document.getElementById('actionTips');
    tipsList.innerHTML = '';
    today.tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });

    // Vérifier si l'action est déjà complétée
    const isCompleted = appState.completedActions.includes(today.id);
    const completeBtn = document.getElementById('completeBtn');
    const actionCard = document.getElementById('actionCard');
    const sectionTitle = document.getElementById('actionSectionTitle');
    const sectionSubtitle = document.getElementById('actionSectionSubtitle');

    // Mettre à jour les titres de section
    if (sectionTitle) {
        sectionTitle.textContent = isCompleted ? '✅ Action réalisée' : '🌱 Action du jour';
    }

    if (sectionSubtitle) {
        const actionDate = new Date(appState.currentYear, appState.currentMonth - 1, appState.currentDay);
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const dateStr = actionDate.toLocaleDateString('fr-FR', options);
        sectionSubtitle.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }

    // Réinitialiser l'état
    if (actionCard) actionCard.classList.remove('completed');

    if (isCompleted) {
        if (actionCard) actionCard.classList.add('completed');
        if (completeBtn) {
            completeBtn.textContent = '✓ Action réalisée';
            completeBtn.classList.add('completed');
            completeBtn.disabled = true;
        }

        // Replier automatiquement si déjà complétée
        const expandable = document.getElementById('actionExpandable');
        const toggleBtn = document.getElementById('toggleActionBtn');
        if (expandable) {
            expandable.classList.add('collapsed');
            if (toggleBtn) toggleBtn.classList.add('active');
        }
    } else {
        // Déplier par défaut si non complétée
        const expandable = document.getElementById('actionExpandable');
        const toggleBtn = document.getElementById('toggleActionBtn');
        if (expandable) {
            expandable.classList.remove('collapsed');
            if (toggleBtn) toggleBtn.classList.remove('active');
        }
        if (completeBtn) {
            completeBtn.textContent = '✓ J\'ai réalisé cette action';
            completeBtn.classList.remove('completed');
            completeBtn.disabled = false;
        }
    }
}

// Compléter une action
function completeAction() {
    const today = ACTIONS.find(a =>
        a.month === appState.currentMonth &&
        a.day === appState.currentDay
    );

    if (!today || appState.completedActions.includes(today.id)) {
        return;
    }

    // Ajouter l'action aux complétées
    appState.completedActions.push(today.id);

    // Mettre à jour les statistiques
    appState.totalCO2Saved += today.impact.co2;
    appState.totalXP += XP_PER_ACTION;

    // Impact eau (si présent dans l'action, sinon estimation par thème)
    if (today.impact.water) {
        appState.totalWaterSaved += today.impact.water;
    } else if (today.theme === 'water') {
        appState.totalWaterSaved += 20; // Estimation par défaut
    }

    if (today.impact.savings) {
        appState.totalMoneySaved += today.impact.savings;
    }

    // Calculer le streak
    updateStreak();

    // Sauvegarder
    saveState();

    // Mettre à jour l'UI
    updateUI();

    // Vérifier les badges
    checkBadges();

    // Animation de célébration
    showCelebration();

    // Mettre à jour le bouton et la carte
    const completeBtn = document.getElementById('completeBtn');
    const actionCard = document.getElementById('actionCard');
    const sectionTitle = document.getElementById('actionSectionTitle');

    if (sectionTitle) sectionTitle.textContent = '✅ Action réalisée';
    if (actionCard) actionCard.classList.add('completed');

    if (completeBtn) {
        completeBtn.textContent = '✓ Action réalisée';
        completeBtn.classList.add('completed');
        completeBtn.disabled = true;
    }

    // Replier après un court délai pour laisser l'utilisateur voir le succès
    setTimeout(() => {
        const expandable = document.getElementById('actionExpandable');
        const toggleBtn = document.getElementById('toggleActionBtn');
        if (expandable) {
            expandable.classList.add('collapsed');
            if (toggleBtn) toggleBtn.classList.add('active');
        }
    }, 1500);
}

// Calculer le streak
function updateStreak() {
    // Trier les actions par date
    const sortedActions = appState.completedActions
        .map(id => ACTIONS.find(a => a.id === id))
        .filter(a => a)
        .sort((a, b) => {
            const dateA = new Date(appState.currentYear, a.month - 1, a.day);
            const dateB = new Date(appState.currentYear, b.month - 1, b.day);
            return dateB - dateA;
        });

    let streak = 0;
    let currentDate = new Date();

    for (let action of sortedActions) {
        const actionDate = new Date(appState.currentYear, action.month - 1, action.day);
        const diffDays = Math.floor((currentDate - actionDate) / (1000 * 60 * 60 * 24));

        if (diffDays === streak) {
            streak++;
            currentDate = actionDate;
        } else {
            break;
        }
    }

    appState.streak = streak;
}

// Mettre à jour toute l'interface
function updateUI() {
    updateCurrentTheme();
    // displayTodayAction() n'est plus appelé ici systématiquement pour éviter de changer l'action quand on navigue dans les mois
    updateStats();
    generateCalendar();
    renderImpactChart();
}

// Mettre à jour les statistiques
function updateStats() {
    document.getElementById('streakDays').textContent = appState.streak;
    document.getElementById('totalCompleted').textContent = appState.completedActions.length;
    document.getElementById('totalImpact').textContent = appState.totalCO2Saved + ' kg';

    // Nouvelles stats pour le dashboard
    const waterElement = document.getElementById('totalWater');
    if (waterElement) waterElement.textContent = appState.totalWaterSaved + ' L';

    const moneyElement = document.getElementById('totalMoney');
    if (moneyElement) moneyElement.textContent = appState.totalMoneySaved + ' €';

    const levelElement = document.getElementById('currentLevel');
    if (levelElement) levelElement.textContent = 'Niveau ' + getCurrentLevel();

    const xpProgressElement = document.getElementById('xpProgressBar');
    if (xpProgressElement) {
        const xpPercent = (getXPInCurrentLevel() / XP_PER_LEVEL) * 100;
        xpProgressElement.style.width = xpPercent + '%';
    }

    const completionRate = Math.round((appState.completedActions.length / ACTIONS.length) * 100);
    document.getElementById('completionRate').textContent = completionRate + '%';

    // Stats globales (simulées)
    document.getElementById('totalUsers').textContent = (12847 + appState.completedActions.length).toLocaleString();
    document.getElementById('totalActions').textContent = (487392 + appState.completedActions.length * 10).toLocaleString();
    document.getElementById('totalCO2').textContent = (2341 + Math.floor(appState.totalCO2Saved / 100)).toLocaleString();
}

// Générer le calendrier
function generateCalendar() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;

    grid.innerHTML = '';

    // Mettre à jour le titre du calendrier
    const currentMonthElement = document.getElementById('currentMonth');
    if (currentMonthElement) {
        currentMonthElement.textContent = getMonthName(appState.viewMonth) + ' ' + appState.viewYear;
    }

    // Cacher/Afficher le bouton "Retour à aujourd'hui"
    const backToToday = document.getElementById('backToToday');
    const now = new Date();
    const isTodayInView = appState.viewMonth === (now.getMonth() + 1) && appState.viewYear === now.getFullYear();
    if (backToToday) {
        backToToday.style.display = isTodayInView ? 'none' : 'block';
    }

    const monthActions = ACTIONS.filter(a => a.month === appState.viewMonth);
    const daysInMonth = new Date(appState.viewYear, appState.viewMonth, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const action = monthActions.find(a => a.day === day);
        if (!action) continue;

        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';

        // Vérifier si complété
        const isCompleted = appState.completedActions.includes(action.id);
        if (isCompleted) {
            dayCard.classList.add('completed');
        }

        // Vérifier si c'est aujourd'hui (réel)
        const realToday = new Date();
        if (day === realToday.getDate() &&
            appState.viewMonth === (realToday.getMonth() + 1) &&
            appState.viewYear === realToday.getFullYear()) {
            dayCard.classList.add('today');
        }

        // Vérifier si verrouillé (jour futur)
        const dayDate = new Date(appState.viewYear, appState.viewMonth - 1, day);
        if (dayDate > realToday) {
            dayCard.classList.add('locked');
        }

        dayCard.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-icon">${action.icon}</div>
            ${isCompleted ? '<div class="day-status">✓</div>' : ''}
        `;

        dayCard.addEventListener('click', () => {
            if (!dayCard.classList.contains('locked')) {
                showActionDetail(action.id);
            }
        });

        grid.appendChild(dayCard);
    }
}


// Afficher le détail d'une action
function showActionDetail(actionId) {
    const action = ACTIONS.find(a => a.id === actionId);
    if (!action) return;

    // Mettre à jour le jour et mois actuels
    appState.currentDay = action.day;
    appState.currentMonth = action.month;
    appState.currentYear = action.year || appState.currentYear;

    // Utiliser displayTodayAction pour mettre à jour l'interface (titres, bouton, etc.)
    displayTodayAction();

    // Scroll vers l'action
    const todayAction = document.getElementById('todayAction');
    if (todayAction) todayAction.scrollIntoView({ behavior: 'smooth' });
}

// Vérifier et débloquer les badges
function checkBadges() {
    BADGES.forEach(badge => {
        if (appState.unlockedBadges.includes(badge.id)) return;

        let unlocked = false;

        switch (badge.requirement.type) {
            case 'total':
                unlocked = appState.completedActions.length >= badge.requirement.value;
                break;
            case 'streak':
                unlocked = appState.streak >= badge.requirement.value;
                break;
            case 'month':
                const monthActions = ACTIONS.filter(a => a.month === appState.currentMonth);
                const completedThisMonth = appState.completedActions.filter(id => {
                    const action = ACTIONS.find(a => a.id === id);
                    return action && action.month === appState.currentMonth;
                });
                unlocked = completedThisMonth.length === monthActions.length;
                break;
            case 'co2':
                unlocked = appState.totalCO2Saved >= badge.requirement.value;
                break;
            case 'water':
                unlocked = appState.totalWaterSaved >= badge.requirement.value;
                break;
            case 'money':
                unlocked = appState.totalMoneySaved >= badge.requirement.value;
                break;
            case 'shares':
                unlocked = appState.totalShares >= badge.requirement.value;
                break;
            case 'theme':
                const themeActions = ACTIONS.filter(a => a.theme === badge.requirement.value);
                const completedTheme = appState.completedActions.filter(id => {
                    const action = ACTIONS.find(a => a.id === id);
                    return action && action.theme === badge.requirement.value;
                });
                unlocked = completedTheme.length >= themeActions.length;
                break;
        }

        if (unlocked) {
            appState.unlockedBadges.push(badge.id);
            showBadgeUnlock(badge);
        }
    });

    saveState();
    displayBadges();
}

// Afficher les badges
function displayBadges() {
    const grid = document.getElementById('badgesGrid');
    grid.innerHTML = '';

    BADGES.forEach(badge => {
        const isUnlocked = appState.unlockedBadges.includes(badge.id);

        const badgeCard = document.createElement('div');
        badgeCard.className = 'badge-card' + (isUnlocked ? '' : ' locked');
        badgeCard.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
        `;

        grid.appendChild(badgeCard);
    });
}

// Afficher une célébration
function showCelebration() {
    // Animation simple (peut être améliorée avec une bibliothèque)
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #2d6a4f, #52b788);
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    `;
    celebration.textContent = '🎉 Bravo ! Action réalisée !';

    document.body.appendChild(celebration);

    setTimeout(() => {
        celebration.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => celebration.remove(), 300);
    }, 2000);
}

// Afficher le déblocage d'un badge
function showBadgeUnlock(badge) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ffd60a, #ffb703);
        color: #2b2d2a;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        text-align: center;
    `;
    notification.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">${badge.icon}</div>
        <div>Badge débloqué !</div>
        <div style="font-size: 1.2rem; margin-top: 0.5rem;">${badge.name}</div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Navigation entre les mois
function previousMonth() {
    if (appState.viewMonth > 1) {
        appState.viewMonth--;
    } else {
        appState.viewMonth = 12;
        appState.viewYear--;
    }

    const grid = document.getElementById('calendarGrid');
    if (grid) {
        grid.classList.remove('slide-left', 'slide-right');
        void grid.offsetWidth; // Trigger reflow
        grid.classList.add('slide-right');
    }

    updateUI();
}

function nextMonth() {
    if (appState.viewMonth < 12) {
        appState.viewMonth++;
    } else {
        appState.viewMonth = 1;
        appState.viewYear++;
    }

    const grid = document.getElementById('calendarGrid');
    if (grid) {
        grid.classList.remove('slide-left', 'slide-right');
        void grid.offsetWidth; // Trigger reflow
        grid.classList.add('slide-left');
    }

    updateUI();
}

// Helper pour le scroll fluide
function smoothScrollToTop() {
    const hero = document.getElementById('seasonalHero');
    if (hero) {
        hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToToday() {
    const now = new Date();
    appState.currentDay = now.getDate();
    appState.currentMonth = now.getMonth() + 1;
    appState.currentYear = now.getFullYear();

    appState.viewMonth = appState.currentMonth;
    appState.viewYear = appState.currentYear;

    displayTodayAction();
    updateUI();

    const hero = document.getElementById('hero');
    if (hero) hero.scrollIntoView({ behavior: 'smooth' });
}

function toggleTodayAction() {
    const expandable = document.getElementById('actionExpandable');
    const toggleBtn = document.getElementById('toggleActionBtn');
    if (expandable) {
        expandable.classList.toggle('collapsed');
        if (toggleBtn) toggleBtn.classList.toggle('active');
    }
}

function shareAction() {
    const today = ACTIONS.find(a =>
        a.month === appState.currentMonth &&
        a.day === appState.currentDay
    );

    if (!today) return;

    const text = `🌱 Aujourd'hui, j'ai réalisé : ${today.title}\n\nImpact : -${today.impact.co2}kg de CO₂\n\nRejoignez-moi sur Eco Calendar 365 !`;

    appState.totalShares++;
    saveState();
    checkBadges();

    if (navigator.share) {
        navigator.share({
            title: 'Eco Calendar 365',
            text: text,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(text);
        alert('Texte copié dans le presse-papier !');
    }
}

function scrollToCalendar() {
    document.getElementById('calendar').scrollIntoView({ behavior: 'smooth' });
}

function showAbout() {
    alert('Eco Calendar 365 - 365 actions pour sauver la planète\n\nBasé sur des données scientifiques validées par l\'ADEME, le GIEC et l\'ONU Environnement.');
}

function showMonthDetails() {
    try {
        const monthKey = Object.keys(THEMES)[appState.viewMonth - 1];
        const theme = THEMES[monthKey];

        // Récupérer toutes les actions du mois
        const monthActions = ACTIONS.filter(a => a.month === appState.viewMonth);

        // Mettre à jour le header de la modale
        document.getElementById('monthModalIcon').textContent = theme.icon;
        document.getElementById('monthModalName').textContent = `${theme.name} - ${getMonthName(appState.viewMonth)} ${appState.viewYear}`;
        document.getElementById('monthModalDescription').textContent = theme.description;
        document.getElementById('monthModalGoal').textContent = `🎯 Objectif : ${theme.goal}`;

        // Générer la liste des actions
        const actionsList = document.getElementById('monthActionsList');
        actionsList.innerHTML = '';

        monthActions.forEach(action => {
            const isCompleted = appState.completedActions.includes(action.id);
            const actionItem = document.createElement('div');
            actionItem.className = `month-action-item ${isCompleted ? 'completed' : ''}`;
            actionItem.innerHTML = `
                <span class="month-action-status">${isCompleted ? '✅' : '⏳'}</span>
                <span class="month-action-day">Jour ${action.day}</span>
                <span class="month-action-icon">${action.icon}</span>
                <span class="month-action-title">${action.title}</span>
            `;

            // Clic sur une action pour l'afficher
            if (!isCompleted) {
                actionItem.addEventListener('click', () => {
                    closeMonthModal();
                    showActionDetail(action.id);
                });
            }

            actionsList.appendChild(actionItem);
        });

        // Calculer et afficher la progression
        const completedCount = monthActions.filter(a => appState.completedActions.includes(a.id)).length;
        const totalCount = monthActions.length;
        const progressPercent = Math.round((completedCount / totalCount) * 100);

        document.getElementById('monthModalProgress').textContent = `${completedCount}/${totalCount}`;
        document.getElementById('monthModalProgressBar').style.width = `${progressPercent}%`;
        document.getElementById('monthModalPercent').textContent = `${progressPercent}%`;

        // Afficher la modale
        const modal = document.getElementById('monthModal');
        modal.classList.add('active');

        // Empêcher le scroll du body
        document.body.style.overflow = 'hidden';

    } catch (error) {
        console.error('Erreur dans showMonthDetails:', error);
        alert('Erreur lors de l\'affichage du programme du mois');
    }
}

function closeMonthModal() {
    const modal = document.getElementById('monthModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Fermer la modale en cliquant sur l'overlay
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('monthModal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeMonthModal();
            }
        });
    }

    // Fermer avec la touche ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMonthModal();
        }
    });
});

function getMonthName(month) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return months[month - 1];
}

// --- Logique Mode Sombre ---
function toggleDarkMode() {
    appState.isDarkMode = !appState.isDarkMode;
    applyDarkMode();
    saveState();
}

function applyDarkMode() {
    const body = document.body;
    const icon = document.querySelector('#darkModeToggle .mode-icon');
    if (!icon) return;

    if (appState.isDarkMode) {
        body.classList.add('dark-mode');
        icon.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        icon.textContent = '🌙';
    }
}

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    .btn-primary.completed {
        background: #52b788;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);
// === FONCTIONS DE PARTAGE & SOCIAL ===

function shareImpact() {
    const totalCO2 = Math.round(appState.totalCO2Saved / 1000);
    const impactText = `Aujourd'hui, j'ai réduit mon impact de ${totalCO2}kg de CO2 grâce à Eco Calendar ! Et vous ? 🌍🌱`;

    document.getElementById('shareTextPreview').textContent = impactText;
    document.getElementById('shareModal').style.display = 'block';

    // Cacher le bouton WebShare si non supporté
    if (!navigator.share) {
        document.getElementById('webShareBtn').style.display = 'none';
    }
}

function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
}

function shareToWhatsApp() {
    const text = document.getElementById('shareTextPreview').textContent;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

function shareToInstagram() {
    const text = document.getElementById('shareTextPreview').textContent;
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Message copié ! Ouvrez Instagram pour le coller en Story.', 'success');
        // On pourrait ajouter un lien vers Instagram ici
    });
}

function useWebShare() {
    const text = document.getElementById('shareTextPreview').textContent;
    if (navigator.share) {
        navigator.share({
            title: 'Mon Impact Eco Calendar',
            text: text,
            url: window.location.href
        }).catch(console.error);
    }
}

// === NOTIFICATIONS ===

function setupNotifications() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            showNotification('Génial ! Vous recevrez un rappel quotidien.', 'success');
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then(reg => scheduleDailyNotification(reg));
            }
        }
    });
}

function scheduleDailyNotification(reg) {
    // Dans une vraie app, on utiliserait Periodic Sync ou un serveur.
    // Ici, on simule en affichant une notification si l'action du jour n'est pas faite.
    const todayAction = ACTIONS.find(a => a.month === appState.currentMonth && a.day === appState.currentDay);
    if (todayAction && !appState.completedActions.includes(todayAction.id)) {
        reg.showNotification('Eco Calendar 365 🔔', {
            body: `Geste du jour : ${todayAction.title}. Prêt à agir pour la planète ?`,
            icon: '/assets/icons/icon-192.png',
            badge: '/assets/icons/icon-192.png',
            tag: 'daily-reminder',
            data: { url: window.location.origin }
        });
    }
}

// Fermer la modale si on clique en dehors
window.onclick = function (event) {
    const modal = document.getElementById('shareModal');
    if (event.target == modal) {
        closeShareModal();
    }
}

// === IMPACT VISUALIZATION & CHARTS ===

function renderImpactChart() {
    const container = document.getElementById('impactChart');
    if (!container) return;

    const daysInMonth = new Date(appState.currentYear, appState.currentMonth, 0).getDate();
    const data = getMonthlyImpactData(daysInMonth);

    const width = container.clientWidth;
    const height = container.clientHeight;
    const padding = 35; // Augmenté pour labels

    const maxImpact = Math.max(...data, 100);

    const points = data.map((val, i) => {
        const x = padding + (i / (daysInMonth - 1)) * (width - 2 * padding);
        const y = height - padding - (val / maxImpact) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' ');

    const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

    // Calcul des équivalences
    const totalCO2 = data[data.length - 1]; // Dernier point du cumul
    const trees = (totalCO2 / 25).toFixed(1);
    const km = (totalCO2 / 0.12).toFixed(0);

    document.getElementById('eqTrees').textContent = trees;
    document.getElementById('eqKm').textContent = `${km} km`;

    container.innerHTML = `
        <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--theme-primary)" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="var(--theme-primary)" stop-opacity="0"/>
                </linearGradient>
            </defs>
            
            <!-- Axes vertical -->
            <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" class="chart-axis" />
            <!-- Axes horizontal -->
            <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="chart-axis" />
            
            <!-- Labels axes -->
            <text x="${padding / 2}" y="${height / 2}" class="chart-label" text-anchor="middle" transform="rotate(-90, ${padding / 2}, ${height / 2})">CO₂ (kg)</text>
            <text x="${width / 2}" y="${height - 5}" class="chart-label" text-anchor="middle">Jours du mois</text>

            <!-- Ligne et Zone -->
            <polygon points="${areaPoints}" class="chart-area" />
            <polyline points="${points}" class="chart-line" />
            
            <!-- Points clés -->
            ${data.map((val, i) => {
        if (val === 0) return '';
        const x = padding + (i / (daysInMonth - 1)) * (width - 2 * padding);
        const y = height - padding - (val / maxImpact) * (height - 2 * padding);
        return `<circle cx="${x}" cy="${y}" r="4" class="chart-point" />`;
    }).join('')}
        </svg>
    `;
}

function getMonthlyImpactData(daysInMonth) {
    const data = new Array(daysInMonth).fill(0);
    let cumulativeImpact = 0;

    for (let day = 1; day <= daysInMonth; day++) {
        const dayActions = appState.completedActions.filter(id => {
            const action = ACTIONS.find(a => a.id === id);
            return action && action.month === appState.currentMonth && action.day <= day;
        });

        // Calcul du cumul jusqu'au jour courant du mois
        cumulativeImpact = 0;
        dayActions.forEach(id => {
            const action = ACTIONS.find(a => a.id === id);
            if (action && action.impact && action.impact.co2) {
                cumulativeImpact += action.impact.co2;
            }
        });

        data[day - 1] = cumulativeImpact;
    }

    return data;
}

// Relancer le rendu si la fenêtre change de taille
window.addEventListener('resize', renderImpactChart);
