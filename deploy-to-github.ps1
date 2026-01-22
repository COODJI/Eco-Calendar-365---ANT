# Script de Deploiement Complet - Eco Calendar 365
# A executer dans PowerShell

Write-Host "Deploiement Eco Calendar 365 sur GitHub Pages" -ForegroundColor Green
Write-Host ""

# Configuration
$projectPath = "c:\Users\willi\Downloads\STITCH\eco-calendar-365"
$artifactPath = "C:\Users\willi\.gemini\antigravity\brain\c7e1ebc0-3f6f-4043-a700-bd936640e1d8"
$githubRepo = "https://github.com/COODJI/Eco-Calendar-365---ANT.git"

# Etape 1: Creer les dossiers
Write-Host "Etape 1/5 : Creation des dossiers..." -ForegroundColor Cyan
Set-Location $projectPath
New-Item -ItemType Directory -Path "assets\themes" -Force | Out-Null
New-Item -ItemType Directory -Path "assets\icons" -Force | Out-Null
Write-Host "   Dossiers crees" -ForegroundColor Green
Write-Host ""

# Etape 2: Copier les images thematiques
Write-Host "Etape 2/5 : Copie des images thematiques..." -ForegroundColor Cyan
$images = @(
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
foreach ($img in $images) {
    $source = Join-Path $artifactPath $img
    $dest = Join-Path $projectPath "assets\themes\$img"
    if (Test-Path $source) {
        Copy-Item -Path $source -Destination $dest -Force
        $copiedCount++
        Write-Host "   OK: $img" -ForegroundColor Green
    }
    else {
        Write-Host "   MANQUANT: $img" -ForegroundColor Yellow
    }
}
Write-Host "   $copiedCount/12 images copiees" -ForegroundColor Cyan
Write-Host ""

# Etape 3: Initialiser Git
Write-Host "Etape 3/5 : Initialisation de Git..." -ForegroundColor Cyan
if (Test-Path ".git") {
    Write-Host "   Git deja initialise" -ForegroundColor Yellow
}
else {
    git init
    Write-Host "   Git initialise" -ForegroundColor Green
}
Write-Host ""

# Etape 4: Ajouter et commiter
Write-Host "Etape 4/5 : Ajout des fichiers..." -ForegroundColor Cyan
git add .
git commit -m "Initial commit - Eco Calendar 365"
Write-Host "   Fichiers ajoutes et commites" -ForegroundColor Green
Write-Host ""

# Etape 5: Pousser vers GitHub
Write-Host "Etape 5/5 : Push vers GitHub..." -ForegroundColor Cyan
try {
    $remoteExists = git remote | Select-String -Pattern "origin"
    
    if ($remoteExists) {
        Write-Host "   Remote origin existe deja, mise a jour..." -ForegroundColor Yellow
        git remote set-url origin $githubRepo
    }
    else {
        git remote add origin $githubRepo
    }
    
    git branch -M main
    git push -u origin main
    Write-Host "   Code pousse sur GitHub" -ForegroundColor Green
}
catch {
    Write-Host "   Erreur lors du push" -ForegroundColor Red
    Write-Host "   Vous devrez peut-etre vous authentifier avec GitHub" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Deploiement termine !" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines etapes :" -ForegroundColor Cyan
Write-Host "1. Allez sur https://github.com/COODJI/Eco-Calendar-365---ANT" -ForegroundColor White
Write-Host "2. Cliquez sur Settings -> Pages" -ForegroundColor White
Write-Host "3. Sous Source, selectionnez :" -ForegroundColor White
Write-Host "   - Branch: main" -ForegroundColor Gray
Write-Host "   - Folder: / (root)" -ForegroundColor Gray
Write-Host "4. Cliquez sur Save" -ForegroundColor White
Write-Host ""
Write-Host "Votre application sera disponible a :" -ForegroundColor Cyan
Write-Host "   https://coodji.github.io/Eco-Calendar-365---ANT/" -ForegroundColor Green
Write-Host ""
Write-Host "Attendez 1-2 minutes apres l activation de GitHub Pages" -ForegroundColor Yellow
Write-Host ""
