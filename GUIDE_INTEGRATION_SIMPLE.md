# 🚀 GUIDE D'INTÉGRATION SIMPLE

Le script automatique ne peut pas s'exécuter. Voici comment intégrer manuellement en **5 minutes** :

## Méthode Simple (Recommandée)

### Étape 1 : Ouvrir le terminal PowerShell
1. Appuyez sur `Windows + X`
2. Choisissez "Windows PowerShell"
3. Tapez :
```powershell
cd "c:\Users\willi\Downloads\STITCH\eco-calendar-365"
.\integrer-tout.ps1
```

Si ça ne marche pas, passez à l'étape 2.

---

## Méthode Manuelle (5 minutes)

### Étape 2 : Copier-coller dans data.js

1. **Ouvrir** `js/data.js` dans votre éditeur
2. **Aller à la ligne 1415** (après l'action Mars unique)
3. **Supprimer** les lignes 1415-1417 :
```javascript
    }

    // ... (Actions pour les autres mois à compléter)
```

4. **Coller** ce texte à la place :
```javascript
    },
    
    // COPIER ICI LE CONTENU DE CHAQUE FICHIER
```

5. **Ouvrir chaque fichier** et copier **UNIQUEMENT** le contenu entre `[` et `]` :
   - `mars-actions.js` → copier lignes 4 à 654
   - `avril-septembre.js` → copier lignes 4 à 61
   - `juin-decembre.js` → copier lignes 3 à 30
   - `juillet-decembre.js` → copier lignes 3 à 31
   - `aout-decembre.js` → copier lignes 3 à 31
   - `septembre-decembre.js` → copier lignes 3 à 30
   - `octobre-decembre.js` → copier lignes 3 à 92

6. **Sauvegarder** data.js

7. **Ouvrir** `index.html` dans le navigateur

---

## ✅ C'est tout !

Votre calendrier écologique avec **365 actions** est maintenant fonctionnel !

**Besoin d'aide ?** Les fichiers sont tous prêts dans le dossier `js/`.
