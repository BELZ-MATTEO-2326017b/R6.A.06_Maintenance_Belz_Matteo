# Ugsel

Application de gestion des compétitions sportives pour l'UGSEL.
Le projet est organisé en monorepo avec une séparation stricte entre le frontend et le backend.

## Architecture & Stack Technique

L'application suit une architecture Client-Serveur.

| Partie | Technologie | Description |
| :--- | :--- | :--- |
| **Client** (`apps/client`) | **React** + **Vite** | Interface utilisateur dynamique (SPA). |
| **Serveur** (`apps/server`) | **NestJS** | API Backend modulaire. |
| **Gestion** | **NPM Workspaces** | Gestion des dépendances partagées. |

### Structure du Projet

```
ugsel/
├── apps/
│   ├── client/          # Frontend React/Vite
│   └── server/          # Backend NestJS
├── node_modules/        # Dépendances partagées
├── package.json         # Scripts globaux
└── README.md            # Documentation
```

## Démarrage Rapide

### Prérequis
- Node.js (v20+ recommandé)
- NPM

### Installation

Installez toutes les dépendances du projet depuis la racine :
```bash
npm install
```

### Lancement en Développement

Pour lancer le serveur et le client simultanément, ouvrez deux terminaux.

Terminal 1 (Serveur) :
```bash
npm run dev:server
```

Terminal 2 (Client) :
```bash
npm run dev:client
```

Le serveur sera accessible sur `http://localhost:3000` et le client sur `http://localhost:5173`.

## Commandes Utiles

Depuis la racine du projet :

- **Tests** : Lancer les tests unitaires
  ```bash
  npm run test
  ```
- **Métriques (Couverture)** : Générer le rapport de couverture de code
  ```bash
  npm run test:cov
  ```
- **Lint** : Vérifier la qualité du code
  ```bash
  npm run lint
  ```

## Base de Données

Le projet utilise **SQLite** pour simplifier le développement et le déploiement local. 

- **Configuration** : `apps/server/prisma/schema.prisma`
- **Fichier de données** : `apps/server/dev.db` (généré automatiquement)

Il n'y a pas de serveur de base de données à installer (comme PostgreSQL ou MySQL), tout est géré via le fichier local.

## Stratégie Git & Contribution

Nous utilisons un workflow Git structuré.

### Branches
- **`main`** : Code de production stable. Ne jamais commit directement dessus.
- **`dev`** : Branche d'intégration principale.
- **`feat/nom-fonctionnalité`** : Branches de travail pour les nouvelles fonctionnalités.

### Procédure
1. Créez une branche `feat/...` depuis `dev`.
2. Développez et testez localement.
3. Ouvrez une Pull Request vers `dev`.

## Qualité & Bonnes Pratiques

Le projet respecte les standards suivants :
- **Architecture** : Séparation stricte Client/Serveur.
- **SOLID / KISS** : Le backend NestJS favorise l'injection de dépendances et la responsabilité unique.
- **Linting** : ESLint est configuré pour maintenir un code propre.
