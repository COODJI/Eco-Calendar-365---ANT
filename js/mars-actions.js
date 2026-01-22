// ========== MARS - DÉCHETS & RECYCLAGE (31 jours) ==========

const MARS_ACTIONS = [
    {
        id: 60,
        day: 1,
        month: 3,
        theme: "waste",
        icon: "♻️",
        title: "Triez correctement vos déchets",
        description: "Apprenez et appliquez les règles de tri de votre commune pour optimiser le recyclage.",
        why: "Un bon tri permet de recycler jusqu'à 70% des déchets ménagers et d'économiser des ressources naturelles.",
        impact: { co2: 200, unit: "kg/an", savings: 0 },
        fact: "Recycler 1 tonne de plastique économise 830L de pétrole. 1 tonne de papier sauve 17 arbres.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Consultez le guide de tri de votre commune",
            "Rincez les emballages avant de les jeter",
            "Séparez les différents matériaux"
        ]
    },
    {
        id: 61,
        day: 2,
        month: 3,
        theme: "waste",
        icon: "🛍️",
        title: "Refusez les sacs plastiques",
        description: "Apportez vos propres sacs réutilisables pour faire vos courses.",
        why: "Un sac plastique met 400 ans à se dégrader. Les Français utilisent 17 milliards de sacs par an.",
        impact: { co2: 50, unit: "kg/an", savings: 10 },
        fact: "Un sac réutilisable remplace 1000 sacs plastiques sur sa durée de vie.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "2 min",
        tips: [
            "Gardez toujours un sac pliable dans votre sac",
            "Utilisez des sacs en tissu ou en toile",
            "Refusez poliment les sacs proposés"
        ]
    },
    {
        id: 62,
        day: 3,
        month: 3,
        theme: "waste",
        icon: "🌾",
        title: "Achetez en vrac",
        description: "Privilégiez les produits en vrac pour réduire les emballages.",
        why: "Les emballages représentent 50% du poids de nos poubelles. Le vrac réduit les déchets de 80%.",
        impact: { co2: 100, unit: "kg/an", savings: 50 },
        fact: "Acheter en vrac permet d'économiser jusqu'à 30% sur le prix des produits.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "moyen",
        duration: "20 min",
        tips: [
            "Apportez vos contenants réutilisables",
            "Commencez par les produits secs (riz, pâtes, céréales)",
            "Pesez vos contenants avant de les remplir"
        ]
    },
    {
        id: 63,
        day: 4,
        month: 3,
        theme: "waste",
        icon: "🥕",
        title: "Compostez vos déchets organiques",
        description: "Installez un composteur pour recycler vos épluchures et déchets de jardin.",
        why: "Les déchets organiques représentent 30% de nos poubelles. Le compost enrichit le sol naturellement.",
        impact: { co2: 150, unit: "kg/an", savings: 30 },
        fact: "1 kg de déchets compostés évite 0,5 kg de CO₂ et produit un engrais naturel gratuit.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "moyen",
        duration: "30 min",
        tips: [
            "Alternez déchets verts et bruns",
            "Aérez régulièrement le compost",
            "Évitez viande, poisson et produits laitiers"
        ]
    },
    {
        id: 64,
        day: 5,
        month: 3,
        theme: "waste",
        icon: "👕",
        title: "Donnez vos vêtements",
        description: "Donnez les vêtements que vous ne portez plus à des associations ou ressourceries.",
        why: "Un Français jette 12 kg de textiles par an. 95% peuvent être réutilisés ou recyclés.",
        impact: { co2: 80, unit: "kg/an", savings: 100 },
        fact: "Produire un jean nécessite 10 000L d'eau. Le donner évite cette consommation.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "1h",
        tips: [
            "Triez vos vêtements 2 fois par an",
            "Lavez-les avant de les donner",
            "Trouvez une borne de collecte près de chez vous"
        ]
    },
    {
        id: 65,
        day: 6,
        month: 3,
        theme: "waste",
        icon: "🔧",
        title: "Réparez au lieu de jeter",
        description: "Réparez vos objets cassés au lieu de les remplacer systématiquement.",
        why: "Réparer prolonge la durée de vie des objets et réduit les déchets de 50%.",
        impact: { co2: 120, unit: "kg/an", savings: 200 },
        fact: "Un smartphone réparé évite l'extraction de 70 kg de matières premières.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "moyen",
        duration: "1h",
        tips: [
            "Consultez des tutoriels en ligne",
            "Visitez un Repair Café",
            "Gardez vos appareils plus de 5 ans"
        ]
    },
    {
        id: 66,
        day: 7,
        month: 3,
        theme: "waste",
        icon: "📱",
        title: "Recyclez vos appareils électroniques",
        description: "Apportez vos vieux téléphones, ordinateurs et appareils en déchetterie.",
        why: "Les DEEE contiennent des métaux précieux recyclables et des substances toxiques à traiter.",
        impact: { co2: 100, unit: "kg/an", savings: 0 },
        fact: "1 tonne de smartphones contient plus d'or qu'1 tonne de minerai aurifère.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "30 min",
        tips: [
            "Effacez vos données personnelles avant",
            "Trouvez un point de collecte Ecosystem",
            "Certains magasins reprennent les anciens appareils"
        ]
    },
    {
        id: 67,
        day: 8,
        month: 3,
        theme: "waste",
        icon: "🥡",
        title: "Utilisez des contenants réutilisables",
        description: "Remplacez le film plastique et l'aluminium par des boîtes réutilisables.",
        why: "Les films plastiques ne sont pas recyclables et génèrent des déchets inutiles.",
        impact: { co2: 40, unit: "kg/an", savings: 30 },
        fact: "Une famille utilise en moyenne 24 rouleaux de film plastique par an.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Investissez dans des boîtes en verre",
            "Utilisez des bee-wraps (tissus à la cire d'abeille)",
            "Couvrez avec une assiette au lieu de film plastique"
        ]
    },
    {
        id: 68,
        day: 9,
        month: 3,
        theme: "waste",
        icon: "🍽️",
        title: "Évitez la vaisselle jetable",
        description: "Bannissez les assiettes, gobelets et couverts jetables, même pour les pique-niques.",
        why: "La vaisselle jetable représente 150 000 tonnes de déchets par an en France.",
        impact: { co2: 60, unit: "kg/an", savings: 40 },
        fact: "Un gobelet en plastique met 500 ans à se dégrader dans la nature.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Investissez dans de la vaisselle réutilisable légère",
            "Gardez des couverts en inox dans votre sac",
            "Utilisez une gourde au lieu de bouteilles plastiques"
        ]
    },
    {
        id: 69,
        day: 10,
        month: 3,
        theme: "waste",
        icon: "📄",
        title: "Recyclez le papier et carton",
        description: "Triez systématiquement papiers, journaux et cartons dans la poubelle jaune.",
        why: "Recycler 1 tonne de papier sauve 17 arbres et économise 20 000L d'eau.",
        impact: { co2: 90, unit: "kg/an", savings: 20 },
        fact: "Le papier recyclé nécessite 3 fois moins d'énergie que le papier neuf.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Enlevez les agrafes et trombones",
            "Aplatissez les cartons",
            "Recyclez aussi les enveloppes à fenêtre"
        ]
    },
    {
        id: 70,
        day: 11,
        month: 3,
        theme: "waste",
        icon: "🍶",
        title: "Privilégiez le verre consigné",
        description: "Achetez des boissons en bouteilles consignées qui seront réutilisées.",
        why: "Une bouteille consignée peut être réutilisée 40 fois, réduisant les déchets de 95%.",
        impact: { co2: 70, unit: "kg/an", savings: 25 },
        fact: "Le système de consigne réduit l'empreinte carbone de 75% par rapport au recyclage.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Cherchez les magasins proposant la consigne",
            "Rapportez vos bouteilles vides",
            "Privilégiez les producteurs locaux"
        ]
    },
    {
        id: 71,
        day: 12,
        month: 3,
        theme: "waste",
        icon: "🧴",
        title: "Fabriquez vos produits ménagers",
        description: "Créez vos produits d'entretien avec vinaigre, bicarbonate et savon noir.",
        why: "Les produits ménagers industriels génèrent des emballages plastiques et contiennent des substances polluantes.",
        impact: { co2: 50, unit: "kg/an", savings: 100 },
        fact: "3 ingrédients suffisent pour nettoyer toute la maison : vinaigre, bicarbonate, savon noir.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "moyen",
        duration: "30 min",
        tips: [
            "Commencez par un nettoyant multi-usage",
            "Conservez dans des bouteilles réutilisées",
            "Trouvez des recettes en ligne"
        ]
    },
    {
        id: 72,
        day: 13,
        month: 3,
        theme: "waste",
        icon: "🥤",
        title: "Utilisez une gourde",
        description: "Remplacez les bouteilles d'eau jetables par une gourde réutilisable.",
        why: "Les Français consomment 9 milliards de bouteilles plastiques par an. Seulement 60% sont recyclées.",
        impact: { co2: 80, unit: "kg/an", savings: 150 },
        fact: "Une gourde remplace 1000 bouteilles plastiques et se rentabilise en 3 mois.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Choisissez une gourde en inox",
            "Gardez-la toujours avec vous",
            "L'eau du robinet est contrôlée et gratuite"
        ]
    },
    {
        id: 73,
        day: 14,
        month: 3,
        theme: "waste",
        icon: "📧",
        title: "Passez aux factures électroniques",
        description: "Optez pour la dématérialisation de vos factures et relevés bancaires.",
        why: "Un foyer reçoit 40 kg de courrier par an. La dématérialisation réduit ce poids de 80%.",
        impact: { co2: 30, unit: "kg/an", savings: 10 },
        fact: "Envoyer un email émet 100 fois moins de CO₂ qu'un courrier papier.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "15 min",
        tips: [
            "Activez les e-factures sur vos comptes en ligne",
            "Désinscrivez-vous des publicités papier",
            "Archivez numériquement vos documents"
        ]
    },
    {
        id: 74,
        day: 15,
        month: 3,
        theme: "waste",
        icon: "🎁",
        title: "Emballez avec du papier recyclé",
        description: "Utilisez du papier journal ou kraft au lieu de papier cadeau plastifié.",
        why: "Le papier cadeau plastifié n'est pas recyclable. 20 000 tonnes sont jetées chaque année.",
        impact: { co2: 20, unit: "kg/an", savings: 15 },
        fact: "Un emballage en tissu réutilisable (furoshiki) peut servir des centaines de fois.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Réutilisez les sacs en papier",
            "Apprenez la technique du furoshiki",
            "Décorez avec des éléments naturels"
        ]
    },
    {
        id: 75,
        day: 16,
        month: 3,
        theme: "waste",
        icon: "🔋",
        title: "Recyclez les piles et batteries",
        description: "Déposez vos piles usagées dans les bornes de collecte en magasin.",
        why: "Une pile jetée dans la nature pollue 1 m³ de terre pendant 50 ans.",
        impact: { co2: 15, unit: "kg/an", savings: 0 },
        fact: "95% des composants d'une pile sont recyclables (zinc, fer, nickel).",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Gardez une boîte pour collecter les piles usagées",
            "Privilégiez les piles rechargeables",
            "Trouvez un point de collecte près de chez vous"
        ]
    },
    {
        id: 76,
        day: 17,
        month: 3,
        theme: "waste",
        icon: "🛒",
        title: "Planifiez vos courses",
        description: "Faites une liste de courses pour éviter le gaspillage alimentaire.",
        why: "Les Français jettent 30 kg de nourriture par an, dont 7 kg encore emballés.",
        impact: { co2: 100, unit: "kg/an", savings: 200 },
        fact: "Le gaspillage alimentaire représente 10% de nos déchets et 3% des émissions de CO₂.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Vérifiez vos placards avant de partir",
            "Faites vos courses après avoir mangé",
            "Respectez les dates de péremption"
        ]
    },
    {
        id: 77,
        day: 18,
        month: 3,
        theme: "waste",
        icon: "🧽",
        title: "Utilisez des éponges lavables",
        description: "Remplacez les éponges jetables par des éponges lavables en machine.",
        why: "Une éponge jetable dure 2 semaines. Une éponge lavable dure 1 an.",
        impact: { co2: 10, unit: "kg/an", savings: 20 },
        fact: "Un foyer utilise 24 éponges par an. Les éponges lavables réduisent ce nombre à 2.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Choisissez des éponges en tissu ou tawashi",
            "Lavez-les en machine à 60°C",
            "Fabriquez vos propres tawashis avec des chutes de tissu"
        ]
    },
    {
        id: 78,
        day: 19,
        month: 3,
        theme: "waste",
        icon: "📚",
        title: "Donnez ou échangez vos livres",
        description: "Participez à des boîtes à livres ou échanges de livres dans votre quartier.",
        why: "Un livre lu une fois puis oublié est un gaspillage. Le partage prolonge sa vie.",
        impact: { co2: 20, unit: "kg/an", savings: 50 },
        fact: "Produire un livre émet 1,3 kg de CO₂. Le partager divise cet impact par le nombre de lecteurs.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "15 min",
        tips: [
            "Installez une boîte à livres dans votre rue",
            "Utilisez des plateformes d'échange",
            "Empruntez à la bibliothèque"
        ]
    },
    {
        id: 79,
        day: 20,
        month: 3,
        theme: "waste",
        icon: "🧻",
        title: "Utilisez du papier toilette recyclé",
        description: "Choisissez du papier toilette fabriqué à partir de papier recyclé.",
        why: "Produire du papier toilette neuf détruit 27 000 arbres par jour dans le monde.",
        impact: { co2: 25, unit: "kg/an", savings: 10 },
        fact: "Le papier toilette recyclé utilise 50% moins d'eau et d'énergie que le papier neuf.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Cherchez le label Écolabel européen",
            "Évitez le papier blanchi au chlore",
            "Considérez les alternatives (douchette)"
        ]
    },
    {
        id: 80,
        day: 21,
        month: 3,
        theme: "waste",
        icon: "🥫",
        title: "Conservez dans des bocaux en verre",
        description: "Réutilisez les bocaux en verre pour stocker vos aliments.",
        why: "Le verre est réutilisable à l'infini et ne libère pas de substances toxiques.",
        impact: { co2: 30, unit: "kg/an", savings: 25 },
        fact: "Un bocal en verre peut être réutilisé des centaines de fois sans perdre ses qualités.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Lavez et stérilisez vos bocaux",
            "Étiquetez avec la date de conservation",
            "Parfait pour les restes et le vrac"
        ]
    },
    {
        id: 81,
        day: 22,
        month: 3,
        theme: "waste",
        icon: "🌿",
        title: "Utilisez des cosmétiques solides",
        description: "Remplacez gels douche et shampoings liquides par des versions solides.",
        why: "Les cosmétiques solides éliminent les emballages plastiques et durent 2 à 3 fois plus longtemps.",
        impact: { co2: 40, unit: "kg/an", savings: 60 },
        fact: "Un shampoing solide équivaut à 2 bouteilles de shampoing liquide.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Commencez par le savon et le shampoing",
            "Conservez-les au sec entre les utilisations",
            "Choisissez des produits bio et locaux"
        ]
    },
    {
        id: 82,
        day: 23,
        month: 3,
        theme: "waste",
        icon: "🎨",
        title: "Réutilisez créativement",
        description: "Transformez vos déchets en objets utiles (DIY, upcycling).",
        why: "L'upcycling donne une seconde vie aux objets et stimule la créativité.",
        impact: { co2: 50, unit: "kg/an", savings: 80 },
        fact: "Transformer un vieux jean en sac évite la production d'un nouveau sac.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "moyen",
        duration: "1h",
        tips: [
            "Cherchez des tutoriels DIY en ligne",
            "Transformez les bocaux en vases ou pots",
            "Utilisez les chutes de tissu pour des tawashis"
        ]
    },
    {
        id: 83,
        day: 24,
        month: 3,
        theme: "waste",
        icon: "🏪",
        title: "Achetez d'occasion",
        description: "Privilégiez les achats de seconde main pour meubles, vêtements et électronique.",
        why: "L'occasion réduit la production de nouveaux objets et leurs impacts environnementaux.",
        impact: { co2: 150, unit: "kg/an", savings: 300 },
        fact: "Acheter un jean d'occasion évite l'émission de 25 kg de CO₂ et la consommation de 10 000L d'eau.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "30 min",
        tips: [
            "Explorez les brocantes et vide-greniers",
            "Utilisez des plateformes comme Leboncoin ou Vinted",
            "Vérifiez l'état avant d'acheter"
        ]
    },
    {
        id: 84,
        day: 25,
        month: 3,
        theme: "waste",
        icon: "🍂",
        title: "Paillez avec vos déchets verts",
        description: "Utilisez feuilles mortes et tontes de gazon comme paillage naturel.",
        why: "Le paillage enrichit le sol, retient l'humidité et évite les déchets verts en déchetterie.",
        impact: { co2: 40, unit: "kg/an", savings: 20 },
        fact: "Le paillage réduit l'arrosage de 50% et élimine les mauvaises herbes naturellement.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "20 min",
        tips: [
            "Étalez une couche de 5-10 cm",
            "Mélangez différents types de déchets verts",
            "Renouvelez 2 fois par an"
        ]
    },
    {
        id: 85,
        day: 26,
        month: 3,
        theme: "waste",
        icon: "🧃",
        title: "Évitez les portions individuelles",
        description: "Achetez en grand format plutôt qu'en portions individuelles suremballées.",
        why: "Les portions individuelles génèrent 5 fois plus d'emballages que les grands formats.",
        impact: { co2: 60, unit: "kg/an", savings: 40 },
        fact: "Un yaourt en pot de 1 kg génère 80% moins de déchets que 8 yaourts individuels.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "10 min",
        tips: [
            "Achetez des grands formats familiaux",
            "Utilisez des contenants réutilisables pour les portions",
            "Faites vos propres yaourts et compotes"
        ]
    },
    {
        id: 86,
        day: 27,
        month: 3,
        theme: "waste",
        icon: "📦",
        title: "Réutilisez vos cartons",
        description: "Gardez et réutilisez les cartons pour déménagement, rangement ou cadeaux.",
        why: "Un carton peut être réutilisé 5 à 10 fois avant d'être recyclé.",
        impact: { co2: 25, unit: "kg/an", savings: 15 },
        fact: "Réutiliser un carton évite la production d'un nouveau carton et économise 70% d'énergie.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Aplatissez et stockez les cartons propres",
            "Proposez-les sur des groupes locaux",
            "Utilisez-les pour le rangement au grenier"
        ]
    },
    {
        id: 87,
        day: 28,
        month: 3,
        theme: "waste",
        icon: "🧺",
        title: "Utilisez des lingettes lavables",
        description: "Remplacez cotons démaquillants et lingettes jetables par des versions lavables.",
        why: "Un coton jetable est utilisé 1 fois. Un coton lavable peut servir 300 fois.",
        impact: { co2: 20, unit: "kg/an", savings: 50 },
        fact: "Une personne utilise 2000 cotons par an. Les lingettes lavables réduisent ce nombre à 10.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "5 min",
        tips: [
            "Achetez ou cousez des lingettes en tissu",
            "Lavez-les avec le linge à 60°C",
            "Gardez-les dans une jolie boîte"
        ]
    },
    {
        id: 88,
        day: 29,
        month: 3,
        theme: "waste",
        icon: "🌍",
        title: "Participez à un clean-up",
        description: "Rejoignez ou organisez une collecte de déchets dans votre quartier.",
        why: "Les déchets sauvages polluent les sols, l'eau et tuent la faune. Chaque geste compte.",
        impact: { co2: 0, unit: "kg/an", savings: 0 },
        fact: "Un mégot de cigarette pollue 500L d'eau et met 12 ans à se dégrader.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "1h",
        tips: [
            "Rejoignez des initiatives locales",
            "Équipez-vous de gants et sacs",
            "Sensibilisez votre entourage"
        ]
    },
    {
        id: 89,
        day: 30,
        month: 3,
        theme: "waste",
        icon: "📊",
        title: "Pesez vos déchets",
        description: "Pesez vos poubelles pendant une semaine pour prendre conscience de vos déchets.",
        why: "Mesurer ses déchets permet de prendre conscience et de réduire de 20 à 30%.",
        impact: { co2: 50, unit: "kg/an", savings: 30 },
        fact: "Un Français produit 580 kg de déchets par an. L'objectif zéro déchet vise moins de 100 kg.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "15 min",
        tips: [
            "Notez le poids chaque jour",
            "Identifiez les principales sources",
            "Fixez-vous des objectifs de réduction"
        ]
    },
    {
        id: 90,
        day: 31,
        month: 3,
        theme: "waste",
        icon: "🎯",
        title: "Bilan du mois : déchets réduits",
        description: "Calculez les déchets évités ce mois-ci et célébrez vos progrès !",
        why: "Mesurer ses progrès motive à continuer et permet d'identifier les actions les plus efficaces.",
        impact: { co2: 0, unit: "kg/an", savings: 0 },
        fact: "En appliquant toutes les actions de mars, vous pouvez réduire vos déchets de 50%.",
        source: "ADEME, 2024",
        sourceUrl: "https://www.ademe.fr",
        difficulty: "facile",
        duration: "15 min",
        tips: [
            "Comparez avec février",
            "Identifiez vos meilleures actions",
            "Partagez vos résultats"
        ]
    }
];

console.log(`${MARS_ACTIONS.length} actions créées pour Mars !`);
