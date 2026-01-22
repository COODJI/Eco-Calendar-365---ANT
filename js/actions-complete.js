// ===================================
// ECO CALENDAR 365 - ACTIONS COMPLÈTES
// Fichier contenant toutes les 365 actions
// À intégrer dans data.js
// ===================================

// Ce fichier contient les actions pour FÉVRIER à DÉCEMBRE
// Les actions de JANVIER sont déjà dans data.js

const ADDITIONAL_ACTIONS = [
    // ========== FÉVRIER - EAU & RESSOURCES (28 jours) ==========
    {
        id: 32,
        day: 1,
        month: 2,
        theme: "water",
        icon: "🚿",
        title: "Réduisez votre douche de 2 minutes",
        description: "Limitez vos douches à 5 minutes maximum en utilisant un minuteur ou une playlist.",
        why: "Une douche de 5 minutes consomme 60L d'eau contre 150L pour un bain. Réduire de 2 minutes économise 20L par douche.",
        impact: { co2: 150, unit: "kg/an", water: 7300, savings: 80 },
        fact: "Les Français consomment en moyenne 150L d'eau par jour. La douche représente 20% de cette consommation.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Installez un pommeau économe (-50% d'eau)",
            "Coupez l'eau pendant le savonnage",
            "Utilisez une playlist de 5 minutes"
        ]
    },
    {
        id: 33,
        day: 2,
        month: 2,
        theme: "water",
        icon: "🚰",
        title: "Fermez le robinet en vous brossant les dents",
        description: "Coupez l'eau pendant le brossage des dents et ne l'ouvrez que pour rincer.",
        why: "Laisser couler l'eau pendant 2 minutes gaspille 12 litres. Fermer le robinet économise 4380L par an.",
        impact: { co2: 50, unit: "kg/an", water: 4380, savings: 20 },
        fact: "Un robinet ouvert débite 12 litres par minute. 2 brossages par jour = 24L gaspillés quotidiennement.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "2 min",
        tips: [
            "Utilisez un gobelet pour rincer",
            "Mouillez la brosse puis fermez",
            "Enseignez ce geste aux enfants"
        ]
    },
    {
        id: 34,
        day: 3,
        month: 2,
        theme: "water",
        icon: "🔧",
        title: "Réparez les fuites d'eau",
        description: "Vérifiez et réparez toutes les fuites de robinets, chasses d'eau et tuyaux.",
        why: "Un robinet qui goutte perd 120L par jour, soit 44 000L par an. Une chasse d'eau qui fuit peut perdre 600L par jour.",
        impact: { co2: 100, unit: "kg/an", water: 44000, savings: 150 },
        fact: "20% de l'eau potable est perdue à cause de fuites dans les habitations françaises.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "moyen",
        duration: "30 min",
        tips: [
            "Testez avec du colorant alimentaire dans la cuvette",
            "Changez les joints usés",
            "Appelez un plombier si nécessaire"
        ]
    },
    {
        id: 35,
        day: 4,
        month: 2,
        theme: "water",
        icon: "🚽",
        title: "Installez une chasse d'eau double",
        description: "Équipez vos toilettes d'un mécanisme à double chasse (3L/6L) ou placez une bouteille dans le réservoir.",
        why: "Une chasse d'eau classique utilise 9 à 12L. Une double chasse économise 50% d'eau, soit 15 000L par an.",
        impact: { co2: 80, unit: "kg/an", water: 15000, savings: 60 },
        fact: "Les toilettes représentent 20% de la consommation d'eau d'un foyer, soit 30L par personne et par jour.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "moyen",
        duration: "1h",
        tips: [
            "Choisissez un mécanisme certifié",
            "Ou placez une bouteille de 1,5L dans le réservoir",
            "Vérifiez l'étanchéité après installation"
        ]
    },
    {
        id: 36,
        day: 5,
        month: 2,
        theme: "water",
        icon: "💧",
        title: "Récupérez l'eau de pluie",
        description: "Installez un récupérateur d'eau de pluie pour arroser le jardin et laver la voiture.",
        why: "Un toit de 100m² collecte 60 000L d'eau par an. Cette eau gratuite peut remplacer l'eau potable pour de nombreux usages.",
        impact: { co2: 120, unit: "kg/an", water: 30000, savings: 100 },
        fact: "1mm de pluie sur 1m² = 1 litre d'eau récupérable. La France reçoit en moyenne 600mm de pluie par an.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "difficile",
        duration: "2h",
        tips: [
            "Commencez avec une cuve de 300L",
            "Installez un filtre pour les feuilles",
            "Utilisez pour le jardin, pas pour boire"
        ]
    },
    {
        id: 37,
        day: 6,
        month: 2,
        theme: "water",
        icon: "🍽️",
        title: "Remplissez complètement le lave-vaisselle",
        description: "Ne lancez le lave-vaisselle que lorsqu'il est plein et utilisez le mode éco.",
        why: "Un lave-vaisselle plein consomme moins d'eau que la vaisselle à la main (12L vs 40L). Le mode éco économise 30% d'eau et d'énergie.",
        impact: { co2: 90, unit: "kg/an", water: 10000, savings: 40 },
        fact: "Un lave-vaisselle moderne consomme 12L par cycle contre 40L pour un lavage à la main.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Grattez les assiettes sans rincer",
            "Utilisez le programme éco (50°C)",
            "Entretenez les filtres régulièrement"
        ]
    },
    {
        id: 38,
        day: 7,
        month: 2,
        theme: "water",
        icon: "🥬",
        title: "Lavez les légumes dans un bac",
        description: "Utilisez un bac ou une bassine pour laver les légumes au lieu de l'eau courante.",
        why: "Laver les légumes sous l'eau courante gaspille 10 à 15L. Un bac utilise seulement 3L et permet de réutiliser l'eau.",
        impact: { co2: 30, unit: "kg/an", water: 4000, savings: 15 },
        fact: "L'eau de lavage des légumes peut servir à arroser les plantes (sans produit chimique).",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "2 min",
        tips: [
            "Utilisez une bassine dédiée",
            "Changez l'eau entre différents légumes",
            "Réutilisez l'eau pour les plantes"
        ]
    },
    {
        id: 39,
        day: 8,
        month: 2,
        theme: "water",
        icon: "🚿",
        title: "Installez des mousseurs sur les robinets",
        description: "Équipez tous vos robinets de mousseurs (aérateurs) pour réduire le débit sans perte de confort.",
        why: "Un mousseur réduit le débit de 50% (de 12L/min à 6L/min) en mélangeant l'eau avec de l'air.",
        impact: { co2: 70, unit: "kg/an", water: 20000, savings: 80 },
        fact: "Un mousseur coûte 5€ et se rentabilise en 2 mois grâce aux économies d'eau et d'énergie.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Choisissez un débit de 6L/min",
            "Installez sur tous les robinets",
            "Nettoyez-les tous les 6 mois"
        ]
    },
    {
        id: 40,
        day: 9,
        month: 2,
        theme: "water",
        icon: "🧺",
        title: "Lavez le linge à pleine charge",
        description: "Ne lancez la machine à laver que lorsqu'elle est pleine et utilisez le programme adapté.",
        why: "Une machine à moitié pleine consomme autant d'eau qu'une machine pleine. Attendre économise 50% d'eau.",
        impact: { co2: 60, unit: "kg/an", water: 8000, savings: 30 },
        fact: "Une machine moderne consomme 50L par cycle. Diviser par 2 le nombre de lessives économise 2000L par an.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Remplissez à 80% maximum",
            "Triez par couleur et température",
            "Utilisez le programme adapté au linge"
        ]
    },
    {
        id: 41,
        day: 10,
        month: 2,
        theme: "water",
        icon: "🌱",
        title: "Arrosez le jardin le soir",
        description: "Arrosez vos plantes tôt le matin ou tard le soir pour limiter l'évaporation.",
        why: "Arroser en plein soleil fait évaporer 60% de l'eau avant qu'elle n'atteigne les racines.",
        impact: { co2: 40, unit: "kg/an", water: 5000, savings: 20 },
        fact: "Arroser le soir économise jusqu'à 60% d'eau par rapport à un arrosage en milieu de journée.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "15 min",
        tips: [
            "Arrosez entre 20h et 8h",
            "Paillez le sol pour retenir l'humidité",
            "Arrosez au pied des plantes, pas les feuilles"
        ]
    },
    {
        id: 42,
        day: 11,
        month: 2,
        theme: "water",
        icon: "🚗",
        title: "Lavez la voiture avec un seau",
        description: "Utilisez 2 seaux (un pour laver, un pour rincer) au lieu du jet d'eau.",
        why: "Un lavage au jet consomme 200L d'eau. Avec des seaux, 20L suffisent, soit 90% d'économie.",
        impact: { co2: 50, unit: "kg/an", water: 9000, savings: 35 },
        fact: "Laver sa voiture 4 fois par an au jet = 800L. Avec des seaux = 80L.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "30 min",
        tips: [
            "Utilisez des produits biodégradables",
            "Lavez sur une surface perméable",
            "Ou utilisez une station de lavage (recyclage d'eau)"
        ]
    },
    {
        id: 43,
        day: 12,
        month: 2,
        theme: "water",
        icon: "🍝",
        title: "Réutilisez l'eau de cuisson",
        description: "Conservez l'eau de cuisson des pâtes, riz ou légumes pour arroser les plantes (une fois refroidie).",
        why: "L'eau de cuisson contient des nutriments bénéfiques pour les plantes. La réutiliser évite le gaspillage.",
        impact: { co2: 20, unit: "kg/an", water: 2000, savings: 10 },
        fact: "L'eau de cuisson des pâtes, riche en amidon, peut aussi servir à nettoyer la vaisselle.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "2 min",
        tips: [
            "Laissez refroidir complètement",
            "N'utilisez pas d'eau salée pour les plantes",
            "Conservez dans une bouteille"
        ]
    },
    {
        id: 44,
        day: 13,
        month: 2,
        theme: "water",
        icon: "❄️",
        title: "Dégivrez avec de l'eau froide",
        description: "Pour dégivrer les aliments, utilisez de l'eau froide au lieu de l'eau chaude.",
        why: "L'eau chaude consomme de l'énergie inutilement. L'eau froide dégivre efficacement en quelques minutes.",
        impact: { co2: 25, unit: "kg/an", water: 1000, savings: 10 },
        fact: "Dégivrer à l'eau chaude gaspille de l'énergie et peut altérer la qualité des aliments.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Planifiez et sortez les aliments la veille",
            "Utilisez de l'eau froide en cas d'urgence",
            "Ne dégivrez jamais au micro-ondes"
        ]
    },
    {
        id: 45,
        day: 14,
        month: 2,
        theme: "water",
        icon: "🌊",
        title: "Préférez la douche au bain",
        description: "Remplacez systématiquement les bains par des douches courtes.",
        why: "Un bain consomme 150 à 200L d'eau contre 60L pour une douche de 5 minutes.",
        impact: { co2: 100, unit: "kg/an", water: 14000, savings: 60 },
        fact: "Prendre une douche au lieu d'un bain 2 fois par semaine économise 14 000L par an.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Gardez les bains pour les occasions spéciales",
            "Limitez les douches à 5 minutes",
            "Installez un pommeau économe"
        ]
    },
    {
        id: 46,
        day: 15,
        month: 2,
        theme: "water",
        icon: "🧽",
        title: "Nettoyez sans eau quand c'est possible",
        description: "Utilisez un balai ou un aspirateur au lieu de laver à grande eau.",
        why: "Nettoyer à sec économise l'eau et est souvent plus efficace pour la poussière.",
        impact: { co2: 15, unit: "kg/an", water: 1500, savings: 5 },
        fact: "Un nettoyage à l'eau consomme 10 à 20L. Le balayage est gratuit et écologique.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Balayez avant de laver",
            "Utilisez un chiffon microfibre humide",
            "Lavez seulement quand nécessaire"
        ]
    },
    {
        id: 47,
        day: 16,
        month: 2,
        theme: "water",
        icon: "🏊",
        title: "Couvrez la piscine",
        description: "Si vous avez une piscine, couvrez-la systématiquement pour limiter l'évaporation.",
        why: "Une piscine non couverte perd 1000L par semaine en été à cause de l'évaporation.",
        impact: { co2: 80, unit: "kg/an", water: 25000, savings: 100 },
        fact: "Une bâche de piscine réduit l'évaporation de 90% et maintient la température de l'eau.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Couvrez chaque soir",
            "Utilisez une bâche à bulles",
            "Vérifiez le niveau d'eau régulièrement"
        ]
    },
    {
        id: 48,
        day: 17,
        month: 2,
        theme: "water",
        icon: "🌿",
        title: "Choisissez des plantes résistantes à la sécheresse",
        description: "Privilégiez les plantes locales et méditerranéennes qui nécessitent peu d'arrosage.",
        why: "Les plantes adaptées au climat local consomment 70% moins d'eau que les plantes exotiques.",
        impact: { co2: 35, unit: "kg/an", water: 8000, savings: 30 },
        fact: "Un jardin méditerranéen consomme 3 fois moins d'eau qu'une pelouse anglaise.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "moyen",
        duration: "1h",
        tips: [
            "Choisissez lavande, romarin, olivier",
            "Paillez le sol pour retenir l'humidité",
            "Groupez les plantes par besoin en eau"
        ]
    },
    {
        id: 49,
        day: 18,
        month: 2,
        theme: "water",
        icon: "💦",
        title: "Installez un système de goutte-à-goutte",
        description: "Pour le potager et les plantes, installez un arrosage goutte-à-goutte automatique.",
        why: "Le goutte-à-goutte économise 50% d'eau par rapport à l'arrosage classique en ciblant les racines.",
        impact: { co2: 60, unit: "kg/an", water: 12000, savings: 50 },
        fact: "Un système goutte-à-goutte bien réglé apporte l'eau exactement où elle est nécessaire, sans gaspillage.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "moyen",
        duration: "2h",
        tips: [
            "Installez un programmateur",
            "Vérifiez les goutteurs régulièrement",
            "Arrosez tôt le matin"
        ]
    },
    {
        id: 50,
        day: 19,
        month: 2,
        theme: "water",
        icon: "🧊",
        title: "Utilisez des glaçons pour arroser",
        description: "Réutilisez les glaçons restants ou l'eau du seau à glace pour arroser les plantes.",
        why: "Chaque goutte compte. L'eau froide des glaçons est parfaite pour les plantes d'intérieur.",
        impact: { co2: 5, unit: "kg/an", water: 500, savings: 2 },
        fact: "Les glaçons fondent lentement, permettant une absorption optimale par les racines.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "1 min",
        tips: [
            "Laissez fondre à température ambiante",
            "Parfait pour les plantes d'intérieur",
            "Évitez pour les plantes sensibles au froid"
        ]
    },
    {
        id: 51,
        day: 20,
        month: 2,
        theme: "water",
        icon: "🚰",
        title: "Installez un limiteur de débit sur la douche",
        description: "Ajoutez un régulateur de débit qui limite à 8L/min sans perte de confort.",
        why: "Un pommeau classique débite 15L/min. Un limiteur à 8L/min économise 50% d'eau.",
        impact: { co2: 90, unit: "kg/an", water: 18000, savings: 75 },
        fact: "Un limiteur de débit coûte 15€ et se rentabilise en 3 mois.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Choisissez un modèle certifié",
            "Installez sur toutes les douches",
            "Nettoyez régulièrement"
        ]
    },
    {
        id: 52,
        day: 21,
        month: 2,
        theme: "water",
        icon: "🌧️",
        title: "Collectez l'eau froide de la douche",
        description: "Récupérez l'eau froide qui coule en attendant l'eau chaude pour arroser les plantes.",
        why: "En moyenne, 5L d'eau froide sont gaspillés avant l'arrivée de l'eau chaude.",
        impact: { co2: 25, unit: "kg/an", water: 1800, savings: 10 },
        fact: "Placer un seau dans la douche permet de récupérer 5L à chaque douche, soit 1800L par an.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "2 min",
        tips: [
            "Gardez un seau dans la douche",
            "Utilisez pour les plantes ou les toilettes",
            "Isolez les tuyaux pour réduire l'attente"
        ]
    },
    {
        id: 53,
        day: 22,
        month: 2,
        theme: "water",
        icon: "🧴",
        title: "Utilisez des produits concentrés",
        description: "Choisissez des produits ménagers et cosmétiques concentrés qui nécessitent moins d'eau pour le rinçage.",
        why: "Les produits concentrés réduisent la quantité d'eau nécessaire au rinçage de 30%.",
        impact: { co2: 20, unit: "kg/an", water: 2000, savings: 10 },
        fact: "Un shampoing concentré dure 2 fois plus longtemps et nécessite moins de rinçage.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Lisez les étiquettes",
            "Dosez correctement",
            "Privilégiez les recharges"
        ]
    },
    {
        id: 54,
        day: 23,
        month: 2,
        theme: "water",
        icon: "🏠",
        title: "Vérifiez votre compteur d'eau",
        description: "Relevez votre compteur le soir et le matin pour détecter les fuites nocturnes.",
        why: "Une fuite invisible peut gaspiller des centaines de litres par jour sans qu'on s'en aperçoive.",
        impact: { co2: 50, unit: "kg/an", water: 10000, savings: 40 },
        fact: "Si le compteur tourne la nuit alors que tout est fermé, vous avez une fuite.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Relevez avant de dormir",
            "Relevez au réveil",
            "Comparez les chiffres"
        ]
    },
    {
        id: 55,
        day: 24,
        month: 2,
        theme: "water",
        icon: "🍷",
        title: "Réutilisez l'eau de la carafe",
        description: "Versez l'eau restante de la carafe dans les plantes au lieu de la jeter.",
        why: "Chaque litre compte. L'eau de la carafe est parfaite pour les plantes.",
        impact: { co2: 5, unit: "kg/an", water: 365, savings: 2 },
        fact: "Une carafe d'1L par jour = 365L par an économisés.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "1 min",
        tips: [
            "Gardez une bouteille pour collecter",
            "Arrosez le soir",
            "Évitez l'eau trop vieille"
        ]
    },
    {
        id: 56,
        day: 25,
        month: 2,
        theme: "water",
        icon: "🧹",
        title: "Utilisez un balai-éponge humide",
        description: "Pour nettoyer le sol, utilisez un balai-éponge bien essoré au lieu d'un seau d'eau.",
        why: "Un balai-éponge utilise 10 fois moins d'eau qu'un lavage classique au seau.",
        impact: { co2: 15, unit: "kg/an", water: 1500, savings: 5 },
        fact: "Nettoyer avec un balai-éponge humide consomme 1L contre 10L avec un seau.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "15 min",
        tips: [
            "Essorez bien le balai",
            "Utilisez de l'eau tiède",
            "Changez l'eau seulement si nécessaire"
        ]
    },
    {
        id: 57,
        day: 26,
        month: 2,
        theme: "water",
        icon: "🌊",
        title: "Sensibilisez votre entourage",
        description: "Partagez vos astuces d'économie d'eau avec votre famille, amis et voisins.",
        why: "L'impact collectif est bien plus important. Si 10 personnes économisent 10 000L, c'est 100 000L sauvés.",
        impact: { co2: 0, unit: "kg/an", water: 0, savings: 0 },
        fact: "La sensibilisation multiplie l'impact par le nombre de personnes touchées.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "30 min",
        tips: [
            "Partagez cet outil",
            "Organisez un défi familial",
            "Montrez l'exemple"
        ]
    },
    {
        id: 58,
        day: 27,
        month: 2,
        theme: "water",
        icon: "📊",
        title: "Suivez votre consommation d'eau",
        description: "Relevez votre compteur chaque semaine et notez votre consommation pour identifier les progrès.",
        why: "Mesurer sa consommation permet de prendre conscience et de réduire de 10 à 15%.",
        impact: { co2: 40, unit: "kg/an", water: 8000, savings: 30 },
        fact: "Les foyers qui suivent leur consommation réduisent leur facture de 15% en moyenne.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Créez un tableau de suivi",
            "Comparez mois par mois",
            "Fixez-vous des objectifs"
        ]
    },
    {
        id: 59,
        day: 28,
        month: 2,
        theme: "water",
        icon: "🎯",
        title: "Bilan du mois : eau économisée",
        description: "Calculez l'eau économisée ce mois-ci et célébrez vos progrès !",
        why: "Mesurer ses progrès motive à continuer et permet d'identifier les actions les plus efficaces.",
        impact: { co2: 0, unit: "kg/an", water: 0, savings: 0 },
        fact: "En appliquant toutes les actions de février, vous pouvez économiser plus de 50 000L par an.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "15 min",
        tips: [
            "Comparez avec janvier",
            "Identifiez vos meilleures actions",
            "Partagez vos résultats"
        ]
    }
];

// Pour intégrer ces actions dans data.js :
// 1. Ouvrez data.js
// 2. Remplacez la ligne "id: 32" (action de février) par toutes les actions ci-dessus
// 3. Continuez avec mars, avril, etc.

console.log(`${ADDITIONAL_ACTIONS.length} actions supplémentaires créées pour février !`);
