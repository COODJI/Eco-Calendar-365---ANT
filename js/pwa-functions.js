// ===================================
// FONCTIONS PWA
// ===================================

// Afficher le bouton d'installation
function showInstallButton() {
    // Créer le bouton d'installation s'il n'existe pas
    let installBtn = document.getElementById('installBtn');
    if (!installBtn) {
        installBtn = document.createElement('button');
        installBtn.id = 'installBtn';
        installBtn.className = 'btn btn-primary install-btn';
        installBtn.innerHTML = '📱 Installer l\'application';
        installBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 1000;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            animation: slideUp 0.5s ease-out;
        `;
        installBtn.addEventListener('click', installPWA);
        document.body.appendChild(installBtn);
    }
    installBtn.style.display = 'block';
}

// Cacher le bouton d'installation
function hideInstallButton() {
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.style.display = 'none';
    }
}

// Installer la PWA
async function installPWA() {
    if (!deferredPrompt) {
        return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`Installation: ${outcome}`);
    deferredPrompt = null;
    hideInstallButton();
}

// Notification de mise à jour disponible
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #2d6a4f, #52b788);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        max-width: 350px;
    `;

    notification.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 0.5rem;">✨ Mise à jour disponible</div>
        <div style="font-size: 0.9rem; margin-bottom: 1rem; opacity: 0.95;">
            Une nouvelle version de l'application est disponible.
        </div>
        <button onclick="updateApp()" style="
            background: white;
            color: #2d6a4f;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
        ">
            Mettre à jour maintenant
        </button>
    `;

    document.body.appendChild(notification);

    // Supprimer après 10 secondes si pas de clic
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

// Mettre à jour l'application
function updateApp() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(registration => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
            }
        });
    }
}

// Notification générique
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: '#52b788',
        error: '#e63946',
        info: '#2d6a4f',
        warning: '#fb8500'
    };

    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        font-weight: 500;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Détecter le mode offline
window.addEventListener('online', () => {
    showNotification('✅ Connexion rétablie', 'success');
});

window.addEventListener('offline', () => {
    showNotification('📡 Mode hors ligne activé', 'warning');
});
