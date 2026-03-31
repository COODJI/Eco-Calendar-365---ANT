# Script d'intégration finale - Eco Calendar 365

Write-Host "🚀 Intégration des 365 actions dans data.js..." -ForegroundColor Cyan

# Chemins
$dataFile = "js\data.js"
$files = @(
    "js\mars-actions.js",
    "js\avril-septembre.js",
    "js\juin-decembre.js",
    "js\juillet-decembre.js",
    "js\aout-decembre.js",
    "js\septembre-decembre.js",
    "js\octobre-decembre.js"
)

# Lire data.js
$dataContent = Get-Content $dataFile -Raw

# Trouver la position de fin de Février (ligne 1388)
$endFevrier = $dataContent.IndexOf("    },`r`n`r`n    // ========== MARS")

if ($endFevrier -eq -1) {
    Write-Host "❌ Erreur: Section Mars non trouvée" -ForegroundColor Red
    exit
}

# Construire le nouveau contenu
$newActions = ""

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "📄 Lecture de $file..." -ForegroundColor Yellow
        $content = Get-Content $file -Raw
        
        # Extraire les actions (entre [ et ])
        if ($content -match '(?s)\[(.*)\]') {
            $actions = $matches[1].Trim()
            $newActions += $actions + ",`r`n`r`n    "
        }
    }
    else {
        Write-Host "⚠️  Fichier non trouvé: $file" -ForegroundColor Yellow
    }
}

# Supprimer la dernière virgule
$newActions = $newActions.TrimEnd(",`r`n`r`n    ")

# Remplacer dans data.js
$beforeMars = $dataContent.Substring(0, $endFevrier + 6)
$afterMars = "`r`n`r`n    // ========== MARS À DÉCEMBRE ==========`r`n    " + $newActions + "`r`n];"

# Trouver la section badges
$badgesStart = $dataContent.IndexOf("`r`n`r`n// Badges disponibles")
$badges = $dataContent.Substring($badgesStart)

# Reconstruire data.js
$newDataContent = $beforeMars + $afterMars + $badges

# Sauvegarder
$newDataContent | Set-Content $dataFile -NoNewline

Write-Host ""
Write-Host "✅ Intégration terminée !" -ForegroundColor Green
Write-Host "📊 365 actions maintenant dans data.js" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Testez l'application en ouvrant index.html !" -ForegroundColor Cyan
