# Portfolio 3D - React + Three.js + GSAP

Portfolio personnel construit avec :
- `React` + `TypeScript` + `Vite`
- `Three.js` via `@react-three/fiber` et `@react-three/drei`
- `GSAP` + `ScrollTrigger`
- `Lenis` pour le smooth scroll
- `Tailwind CSS`

## Pre-requis

- `Node.js` 20+ recommande
- `npm` 10+ recommande

## Lancer le projet en local

1. Installer les dependances :

```bash
npm install
```

2. Demarrer le serveur de developpement :

```bash
npm run dev
```

3. Ouvrir l'URL affichee dans le terminal (en general `http://localhost:5173`).

## Scripts utiles

- `npm run dev` : lance le projet en mode developpement
- `npm run build` : compile le projet pour la production
- `npm run preview` : previsualise le build de production localement
- `npm run lint` : execute ESLint

## Stack 3D et animations

- Les scenes 3D sont dans `src/components/three`
- Les sections de page sont dans `src/components/sections`
- Les hooks d'animation/scroll sont dans `src/hooks`

## Notes

- Un warning de taille de chunk peut apparaitre au build avec les dependances 3D. C'est courant sur ce type de projet et n'empeche pas le lancement.
