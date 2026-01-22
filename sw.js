// ===================================
// ECO CALENDAR 365 - SERVICE WORKER
// PWA avec mode offline complet
// ===================================

const CACHE_VERSION = 'v2';
const CACHE_NAME = `eco-calendar-${CACHE_VERSION}`;
const OFFLINE_PAGE = '/offline.html';

// Ressources à mettre en cache immédiatement
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/styles/main.css',
    '/styles/month-modal.css',
    '/js/app.js',
    '/js/data.js',
    '/manifest.json'
];

// Ressources à mettre en cache au fur et à mesure
const RUNTIME_CACHE = 'eco-calendar-runtime';

// ===================================
// INSTALLATION
// ===================================
self.addEventListener('install', (event) => {
    console.log('[SW] Installation...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Mise en cache des ressources');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// ===================================
// ACTIVATION
// ===================================
self.addEventListener('activate', (event) => {
    console.log('[SW] Activation...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name.startsWith('eco-calendar-') && name !== CACHE_NAME && name !== RUNTIME_CACHE)
                        .map((name) => {
                            console.log('[SW] Suppression ancien cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// ===================================
// FETCH - Stratégies de cache
// ===================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignorer les requêtes non-HTTP
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Stratégie selon le type de ressource
    if (request.method === 'GET') {
        // HTML : Network First (données fraîches)
        if (request.headers.get('accept').includes('text/html')) {
            event.respondWith(networkFirstStrategy(request));
        }
        // CSS, JS : Cache First (performance)
        else if (request.url.match(/\.(css|js)$/)) {
            event.respondWith(cacheFirstStrategy(request));
        }
        // Images : Cache First avec fallback
        else if (request.url.match(/\.(png|jpg|jpeg|svg|gif|webp)$/)) {
            event.respondWith(cacheFirstStrategy(request));
        }
        // Fonts : Cache First
        else if (request.url.match(/\.(woff|woff2|ttf|eot)$/)) {
            event.respondWith(cacheFirstStrategy(request));
        }
        // Autres : Network First
        else {
            event.respondWith(networkFirstStrategy(request));
        }
    }
});

// ===================================
// STRATÉGIE: Network First
// ===================================
async function networkFirstStrategy(request) {
    try {
        const networkResponse = await fetch(request);

        // Mettre en cache si succès
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        // Fallback sur le cache
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        // Si HTML et pas de cache, afficher page offline
        if (request.headers.get('accept').includes('text/html')) {
            return caches.match(OFFLINE_PAGE);
        }

        throw error;
    }
}

// ===================================
// STRATÉGIE: Cache First
// ===================================
async function cacheFirstStrategy(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);

        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('[SW] Erreur fetch:', error);
        throw error;
    }
}

// ===================================
// BACKGROUND SYNC
// ===================================
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync:', event.tag);

    if (event.tag === 'sync-completed-actions') {
        event.waitUntil(syncCompletedActions());
    }
});

async function syncCompletedActions() {
    // Récupérer les actions en attente de synchronisation
    // Cette fonction sera appelée quand la connexion revient
    console.log('[SW] Synchronisation des actions complétées');

    // TODO: Implémenter la logique de sync avec un backend si nécessaire
    return Promise.resolve();
}

// ===================================
// NOTIFICATIONS
// ===================================
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data?.url || '/')
    );
});

// Notification push (pour future implémentation)
self.addEventListener('push', (event) => {
    const data = event.data?.json() || {};

    const options = {
        body: data.body || 'Nouvelle action écologique disponible !',
        icon: '/assets/icons/icon-192.png',
        badge: '/assets/icons/icon-192.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Eco Calendar 365', options)
    );
});

// ===================================
// MESSAGES
// ===================================
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((name) => caches.delete(name))
                );
            })
        );
    }
});

console.log('[SW] Service Worker chargé');
