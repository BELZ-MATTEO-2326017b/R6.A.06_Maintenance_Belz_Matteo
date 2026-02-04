# UgselWeb - Application de Gestion de Compétitions

Bienvenue sur le dépôt du projet UgselWeb. Ce projet est une application web complète (Monorepo) composée d'un client React et d'un serveur NestJS.

## 🏗 Architecture & Stack Technique

L'application suit une architecture **Client-Serveur** moderne organisée en monorepo :

| Partie | Technologie | Description |
| :--- | :--- | :--- |
| **Client** (`apps/client`) | **React** + **Vite** | Interface utilisateur dynamique, SPA. |
| **Serveur** (`apps/server`) | **NestJS** | API Backend, architecture modulaire (Controllers/Services). |
| **Gestion** | **NPM Workspaces** | Gestion des dépendances partagées et scripts globaux. |

### Structure du Projet

```
ugselweb/
├── apps/
│   ├── client/          # Frontend React/Vite
│   │   ├── src/
│   │   └── ...
│   └── server/          # Backend NestJS
│       ├── src/
│       └── ...
├── node_modules/        # Dépendances partagées
├── package.json         # Scripts globaux (root)
└── README.md            # Documentation
```

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** (v20+ recommandé)
- **NPM**

### Installation
Installez toutes les dépendances du projet (client et serveur) depuis la racine :
```bash
npm install
```

### Lancement en Développement
Pour lancer le serveur et le client simultanément (ou séparément) :

**Lancer tout le projet (recommandé) :**
*Note: Il est conseillé d'utiliser deux terminaux.*

Terminal 1 (Serveur) :
```bash
npm run dev:server
```
Terminal 2 (Client) :
```bash
npm run dev:client
```

Le serveur sera accessible sur `http://localhost:3000` (par défaut) et le client sur `http://localhost:5173`.

## 🛠 Commandes Utiles

Depuis la racine du projet :

- **Tests** : Lancer les tests unitaires (Back & Front si configurés)
  ```bash
  npm run test
  ```
- **Lint** : Vérifier la qualité du code
  ```bash
  npm run lint
  ```

## 🌳 Stratégie Git & Contribution

Nous utilisons un workflow Git structuré pour garantir la stabilité du code.

### Branches
- **`main`** : Code de production stable. Ne jamais commit directement dessus.
- **`test`** : Environnement de recette/staging.
- **`dev`** : Branche d'intégration principale pour les développeurs.
- **`feat/nom-fonctionnalité`** : Branches de travail pour les nouvelles fonctionnalités (issues de `dev`).

### Pull Requests (PR)
1. Créez une branche `feat/...` depuis `dev`.
2. Développez et testez localement.
3. Ouvrez une Pull Request vers `dev`.
4. Une fois validée et mergée dans `dev`, le code partira en validation sur `test` avant le déploiement final sur `main`.

## ✅ Qualité & Bonnes Pratiques

Le projet respecte les standards suivants :
- **Architecture** : Séparation stricte Client/Serveur.
- **SOLID / KISS** : Le backend NestJS favorise l'injection de dépendances et la responsabilité unique.
- **Linting** : ESLint est configuré pour maintenir un code propre.

---
*Projet UgselWeb - Maintenance & Évolution*
