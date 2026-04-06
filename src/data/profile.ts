export const navItems = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Profil', href: '#about' },
  { label: 'Expertises', href: '#skills' },
  { label: 'Univers', href: '#univers' },
  { label: 'Projets', href: '#projects' },
  { label: 'Vision', href: '#vision' },
  { label: 'Contact', href: '#contact' },
]

export const capabilityTracks = [
  {
    title: 'Ingenierie logicielle',
    summary: 'Architecture, fiabilite et qualite de code pour des produits maintenables.',
    items: ['TypeScript', 'Java', 'C#', 'SQL', 'API Design', 'Architecture full-stack'],
  },
  {
    title: 'Produit & interface',
    summary: 'Interfaces claires, parcours utilisateur efficaces et execution frontend rigoureuse.',
    items: ['React', 'React Native', 'UI Components', 'UX thinking', 'Performance web'],
  },
  {
    title: 'Contenu & communication',
    summary: 'Montage video, contenu digital et narration pour valoriser les produits techniques.',
    items: ['Montage video', 'Storytelling', 'Contenu internet', 'Direction creative'],
  },
  {
    title: 'Evenementiel & sport',
    summary: 'Organisation, discipline d execution et capacite a performer en environnement exigeant.',
    items: ['Evenementiel', 'Coordination', 'Sport', 'Rigueur', 'Leadership terrain'],
  },
]

export const lifeDomains = [
  {
    category: 'Sport & Performance',
    title: 'Progresser par la discipline et la mesure.',
    description:
      "Le sport structure mon quotidien: progression continue, analyse des performances et execution reguliere sur le long terme.",
    tags: ['Entrainement', 'Suivi', 'Polyvalence', 'Performance'],
  },
  {
    category: 'Evenementiel / Volley',
    title: 'Coordonner, engager, livrer.',
    description:
      "A travers le club de volley, je developpe l'organisation d'evenements, la coordination d'equipe et la gestion terrain.",
    tags: ['Volley', 'Evenementiel', 'Coordination', 'Leadership'],
  },
  {
    category: 'Creation de contenu',
    title: 'Construire une DA minimaliste et cinematique.',
    description:
      "Je fais evoluer mon Instagram avec une direction artistique epuree: stories a la une pensees comme des mini sequences film.",
    tags: ['Instagram', 'DA minimaliste', 'Storytelling', 'Cinematique'],
    link: 'https://instagram.com/',
  },
]

export const projects = [
  {
    title: 'Application de Suivi de Performance Sportive',
    description:
      'Application iOS premium orientee performance: suivi des PR, gestion du volume, recommandations contextuelles et coaching intelligent avec un niveau de personnalisation eleve.',
    tags: ['iOS', 'SwiftUI', 'SwiftData', 'IA via API', 'Performance'],
    highlights: [
      'IA connectee via cle API (Groq, Google Gemini ou OpenAI) selon le niveau de cout/performance souhaite',
      'Action parser pour appliquer des recommandations entrainement en un tap',
      'Architecture moderne iOS 17 avec Observation, persistance SwiftData et fallback regle metier',
    ],
    repository: 'https://github.com/Axelvrdn/iOS_Sport',
  },
  {
    title: 'Plateforme Web d\'Optimisation Nutritionnelle',
    description:
      'Plateforme full-stack pour reduire la charge mentale alimentaire: planification des repas, logique nutritionnelle et brique logistique courses.',
    tags: ['Spring Boot', 'Java 21', 'PostgreSQL', 'Tailwind', 'Monorepo'],
    highlights: [
      'Backend solide Spring Boot + JPA, structure de domaine claire et base de donnees PostgreSQL',
      'Roadmap produit complete: agenda intelligent, moteur recettes, integrations Open Food Facts',
      'Approche operationnelle avec Docker, extension navigateur et flux Click & Collect',
    ],
    repository: 'https://github.com/Axelvrdn/NutriChef-AI',
  },
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Axelvrdn' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/axel-verdon-90453327b/' },
  { label: 'Email', href: 'mailto:axel.v3rd0n@gmail.com' },
]
