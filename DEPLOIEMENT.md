# 🚀 Guide de Démarrage Rapide - Déploiement GitHub Pages

## ✅ Ce qui a déjà été fait

- ✓ Correction des chemins d'images dans `app.js`
- ✓ Création du script de préparation `setup-deployment.ps1`

## 📋 Étapes à suivre

### 1️⃣ Exécuter le script de préparation

Ouvrez PowerShell dans le dossier du projet et exécutez :

```powershell
cd c:\Users\willi\Downloads\STITCH\eco-calendar-365
.\setup-deployment.ps1
```

Ce script va :
- Créer les dossiers `assets/icons/` et `assets/themes/`
- Copier automatiquement les 12 images thématiques
- Vérifier la présence des icônes PWA

### 2️⃣ (Optionnel) Créer des icônes PWA temporaires

Si vous voulez des icônes PWA tout de suite :
1. Allez sur https://favicon.io/favicon-generator/
2. Créez une icône simple (fond vert avec "EC" par exemple)
3. Téléchargez et placez dans `assets/icons/` :
   - `icon-192.png`
   - `icon-512.png`
   - `apple-touch-icon.png`

**OU** déployez sans icônes pour l'instant (elles ne sont pas critiques).

### 3️⃣ Initialiser Git et créer le dépôt

```powershell
# Initialiser Git
git init
git add .
git commit -m "Initial commit - Eco Calendar 365"
```

Si c'est votre première fois avec Git :
```powershell
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"
```

### 4️⃣ Créer le dépôt sur GitHub

1. Allez sur https://github.com/new
2. Nom : `eco-calendar-365`
3. Visibilité : **Public**
4. **NE PAS** cocher "Add a README file"
5. Cliquez sur "Create repository"

### 5️⃣ Pousser le code

Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub :

```powershell
git remote add origin https://github.com/VOTRE-USERNAME/eco-calendar-365.git
git branch -M main
git push -u origin main
```

### 6️⃣ Activer GitHub Pages

1. Dans votre dépôt GitHub, cliquez sur **Settings**
2. Dans le menu de gauche, cliquez sur **Pages**
3. Sous "Source", sélectionnez :
   - Branch : `main`
   - Folder : `/ (root)`
4. Cliquez sur **Save**

⏱️ Attendez 1-2 minutes que GitHub construise votre site.

### 7️⃣ Accéder à votre application

Votre application sera disponible à :
```
https://VOTRE-USERNAME.github.io/eco-calendar-365/
```

---

## 🔍 Vérification

Une fois déployé, testez :
- ✅ Navigation entre les mois
- ✅ Changement des thèmes (couleurs et images)
- ✅ Modale "Voir le programme du mois"
- ✅ Cocher/décocher des actions
- ✅ Mode sombre
- ✅ Installation PWA sur mobile

---

## 🆘 Besoin d'aide ?

Consultez le guide complet dans `implementation_plan.md` pour plus de détails et le dépannage.
