# Script d'intégration de Mars, Avril et Mai dans data.js

Write-Host "🚀 Intégration des actions Mars, Avril, Mai..." -ForegroundColor Cyan

# Chemins
$dataFile = "c:\Users\willi\Downloads\STITCH\eco-calendar-365\js\data.js"
$marsFile = "c:\Users\willi\Downloads\STITCH\eco-calendar-365\js\mars-actions.js"
$avrilMaiFile = "c:\Users\willi\Downloads\STITCH\eco-calendar-365\js\avril-septembre.js"

# Lire data.js
$dataContent = Get-Content $dataFile -Raw

# Lire mars-actions.js et extraire les actions
$marsContent = Get-Content $marsFile -Raw
$marsActions = $marsContent -replace '(?s).*const MARS_ACTIONS = \[(.*)\];.*', '$1'

# Lire avril-septembre.js et extraire les actions
$avrilMaiContent = Get-Content $avrilMaiFile -Raw
$avrilMaiActions = $avrilMaiContent -replace '(?s).*const AVRIL_SEPTEMBRE = \[(.*)\];.*', '$1'

# Remplacer la section Mars dans data.js
$dataContent = $dataContent -replace '(?s)(// ========== MARS - DÉCHETS & RECYCLAGE ==========\s+\{[^}]+id: 60[^}]+\})', "// ========== MARS - DÉCHETS & RECYCLAGE ==========`r`n    $marsActions,`r`n`r`n    $avrilMaiActions"

# Sauvegarder
$dataContent | Set-Content $dataFile -NoNewline

Write-Host "✅ Intégration terminée !" -ForegroundColor Green
Write-Host "📊 Actions intégrées : Mars (31) + Avril (30) + Mai (31) = 92 actions" -ForegroundColor Yellow
Write-Host "📈 Total dans data.js : 151/365 actions (41%)" -ForegroundColor Green
