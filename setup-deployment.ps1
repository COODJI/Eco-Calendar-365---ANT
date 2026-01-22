# Script de préparation pour le déploiement GitHub Pages
# Eco Calendar 365

Write-Host "🌿 Préparation du déploiement Eco Calendar 365..." -ForegroundColor Green
Write-Host ""

# Chemins
$projectRoot = "c:\Users\willi\Downloads\STITCH\eco-calendar-365"
$artifactPath = "C:\Users\willi\.gemini\antigravity\brain\c7e1ebc0-3f6f-4043-a700-bd936640e1d8"
$assetsPath = Join-Path $projectRoot "assets"
$themesPath = Join-Path $assetsPath "themes"
$iconsPath = Join-Path $assetsPath "icons"

# Étape 1: Créer les dossiers
Write-Host "📁 Création des dossiers..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path $assetsPath -Force | Out-Null
New-Item -ItemType Directory -Path $themesPath -Force | Out-Null
New-Item -ItemType Directory -Path $iconsPath -Force | Out-Null
Write-Host "   ✓ Dossiers créés" -ForegroundColor Green
Write-Host ""

# Étape 2: Copier les images thématiques
Write-Host "🖼️  Copie des images thématiques..." -ForegroundColor Cyan
$imageFiles = @(
    "january_winter_forest.webp",
    "february_snowy_landscape.webp",
    "march_spring_awakening.webp",
    "april_cherry_blossoms.webp",
    "may_wildflower_meadow.webp",
    "june_summer_garden.webp",
    "july_beach_sunset.webp",
    "august_golden_wheat.webp",
    "september_autumn_forest.webp",
    "october_fall_leaves.webp",
    "november_misty_morning.webp",
    "december_winter_wonderland.webp"
)

$copiedCount = 0
$missingFiles = @()

foreach ($file in $imageFiles) {
    $sourcePath = Join-Path $artifactPath $file
    $destPath = Join-Path $themesPath $file
    
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        $copiedCount++
        Write-Host "   ✓ $file" -ForegroundColor Green
    }
    else {
        $missingFiles += $file
        Write-Host "   ✗ $file (non trouvé)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "   📊 $copiedCount/12 images copiées" -ForegroundColor Cyan
Write-Host ""

# Étape 3: Vérifier les icônes PWA
Write-Host "🎨 Vérification des icônes PWA..." -ForegroundColor Cyan
$requiredIcons = @(
    "icon-192.png",
    "icon-512.png",
    "apple-touch-icon.png"
)

$iconsExist = $true
foreach ($icon in $requiredIcons) {
    $iconPath = Join-Path $iconsPath $icon
    if (-not (Test-Path $iconPath)) {
        $iconsExist = $false
        Write-Host "   ⚠ $icon manquant" -ForegroundColor Yellow
    }
    else {
        Write-Host "   ✓ $icon présent" -ForegroundColor Green
    }
}

if (-not $iconsExist) {
    Write-Host ""
    Write-Host "   💡 Conseil: Créez des icônes temporaires sur https://favicon.io/favicon-generator/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Résumé
Write-Host "✅ Préparation terminée !" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Vérifiez que les images sont bien dans assets/themes/" -ForegroundColor White
Write-Host "2. (Optionnel) Créez des icônes PWA dans assets/icons/" -ForegroundColor White
Write-Host "3. Exécutez les commandes Git pour déployer:" -ForegroundColor White
Write-Host ""
Write-Host "   cd c:\Users\willi\Downloads\STITCH\eco-calendar-365" -ForegroundColor Gray
Write-Host "   git init" -ForegroundColor Gray
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Initial commit - Eco Calendar 365'" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Créez le dépôt sur GitHub et suivez le guide de déploiement" -ForegroundColor White
Write-Host ""
