export type Project = {
  slug: string
  number: string
  year: string
  title: string
  category: string
  thesis: string
  role: string
  stack: string[]
  constraint: string
  outcome: string
  accent: 'aegean' | 'terracotta' | 'bronze'
}

export const projects: Project[] = [
  {
    slug: 'nutriflow', number: '01', year: '2026', title: 'NutriFlow', category: 'Product system',
    thesis: 'Planifier les repas d’un foyer sans transformer la cuisine en tableau de bord.',
    role: 'Architecture produit, front-end et orchestration', stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    constraint: 'Réconcilier personnes, contraintes, budget et courses dans une même boucle de décision.',
    outcome: 'Un système lisible qui aide à décider avant de calculer.', accent: 'aegean',
  },
  {
    slug: 'foodcall', number: '02', year: '2025', title: 'FoodCall', category: 'Collective decision',
    thesis: 'Faire émerger un restaurant quand personne ne veut choisir seul.',
    role: 'Conception full-stack et modèle de vote', stack: ['React', 'PostGIS', 'Redis', 'Docker'],
    constraint: 'Rendre le vote rapide, géolocalisé et explicable pour un groupe réel.',
    outcome: 'Une décision partagée plutôt qu’une liste de restaurants.', accent: 'terracotta',
  },
  {
    slug: 'hermes-workstation', number: '03', year: '2026', title: 'Hermes Workstation', category: 'Local infrastructure',
    thesis: 'Construire une assistance technique privée qui reste opérable.',
    role: 'Infrastructure, agents et interfaces d’outils', stack: ['Linux', 'LLM', 'MCP', 'Vulkan'],
    constraint: 'Connecter mémoire, modèles, outils et surfaces de messagerie sans perdre le contrôle.',
    outcome: 'Un poste de travail IA local pensé comme un système, pas comme une démo.', accent: 'bronze',
  },
]
