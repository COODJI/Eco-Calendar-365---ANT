# Script PowerShell pour intégrer les actions de Mars dans data.js

$marsFile = "c:\Users\willi\Downloads\STITCH\eco-calendar-365\js\mars-actions.js"
$dataFile = "c:\Users\willi\Downloads\STITCH\eco-calendar-365\js\data.js"

# Lire le contenu de mars-actions.js
$marsContent = Get-Content $marsFile -Raw

# Extraire seulement les actions (entre les crochets)
$pattern = '(?s)const MARS_ACTIONS = \[(.*)\];'
if ($marsContent -match $pattern) {
    $actionsOnly = $matches[1].Trim()
    
    # Lire data.js
    $dataContent = Get-Content $dataFile -Raw
    
    # Trouver et remplacer la section Mars
    $oldMarsPattern = '(?s)// ========== MARS - DÉCHETS & RECYCLAGE ==========\s+\{[^}]+id: 60[^}]+\}'
    
    $newMars = "// ========== MARS - DÉCHETS & RECYCLAGE ==========`r`n    " + $actionsOnly
    
    $dataContent = $dataContent -replace $oldMarsPattern, $newMars
    
    # Sauvegarder
    $dataContent | Set-Content $dataFile -NoNewline
    
    Write-Host "✅ Mars intégré avec succès dans data.js !" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur: Impossible de trouver les actions dans mars-actions.js" -ForegroundColor Red
}
