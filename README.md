# TogoTechCensus (TTC) 🇹🇬

TogoTechCensus est une application web moderne qui recense et met en valeur le paysage technologique du Togo. Elle permet d'explorer les projets tech, de visualiser les tendances de l'écosystème et d'accéder à un tableau de bord de gestion pour les contributeurs.

---

## 🚀 Fonctionnalités

- **Exploration de projets** : Parcourez et filtrez les projets tech togolais par catégorie, type et technologies.
- **Page de détails** : Consultez les informations complètes de chaque projet via une URL slugifiée.
- **Tableau de bord admin** : Gérez les projets (soumission, mise à jour, suivi d'activité, statistiques).
- **Authentification** : Connexion et inscription sécurisées avec gestion JWT et token CSRF.
- **Visualisation de données** : Graphiques de croissance et statistiques de l'écosystème.
- **Design responsive** : Interface fluide sur tous les appareils, avec animations GSAP et Motion.
- **WebSocket** : Mises à jour en temps réel via `react-use-websocket`.

---

## 🛠️ Stack Technique

### Frontend
| Technologie | Usage |
|---|---|
| [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Framework principal |
| [Vite 7](https://vitejs.dev/) | Build tool & dev server |
| [React Router DOM v7](https://reactrouter.com/) | Routage client-side |
| [TanStack Query v5](https://tanstack.com/query/latest) | Data fetching & cache |
| [Axios](https://axios-http.com/) | Client HTTP |
| [Bootstrap 5](https://getbootstrap.com/) | Grille & composants de base |
| Vanilla CSS (modules par page) | Styles personnalisés |

### Animations & UI
| Technologie | Usage |
|---|---|
| [GSAP 3](https://gsap.com/) | Animations avancées |
| [Motion (Framer Motion)](https://motion.dev/) | Transitions de composants |
| [Lottie React](https://github.com/gamote/lottie-react) | Animations JSON Lottie |
| [React Bits](https://www.npmjs.com/package/react-bits) | Composants UI enrichis |
| [React DatePicker](https://reactdatepicker.com/) | Sélecteur de dates |

### Données & Utilitaires
| Technologie | Usage |
|---|---|
| [Recharts](https://recharts.org/) | Graphiques & visualisations |
| [JWT Decode](https://github.com/auth0/jwt-decode) | Décodage des tokens JWT |
| [Slugify](https://github.com/simov/slugify) | Génération de slugs pour les URLs |
| [React Use WebSocket](https://github.com/robtaussig/react-use-websocket) | Mises à jour temps réel |

---

## 📦 Installation

### Prérequis

- **Node.js** (LTS recommandé)
- **npm**

### Étapes

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Dany-py/TogoTechCensus-Front.git
   cd TogoTechCensus
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   Créer un fichier `.env` à la racine du projet :
   ```env
   VITE_API_BASE_URL=https://votre-api-url.com
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

### Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur de développement Vite |
| `npm run build` | Compile TypeScript + bundle de production |
| `npm run preview` | Prévisualise le bundle de production |
| `npm run lint` | Analyse statique avec ESLint |

---

## 🗂️ Structure du Projet

```
src/
├── App.tsx                    # Routeur principal (React Router DOM)
├── App.css                    # Styles globaux de l'app
├── index.css                  # Variables CSS & reset global
│
├── pages/                     # Pages de l'application
│   ├── Home.tsx               # Page d'accueil (/)
│   ├── Explore.tsx            # Page d'exploration (/explore)
│   ├── Details.tsx            # Détail d'un projet (/project/:slug)
│   ├── Dashboard.tsx          # Tableau de bord admin (/dashboard)
│   ├── Connection.tsx         # Connexion / Inscription (/signin, /signup)
│   ├── Contact.tsx            # Page de contact (/contact)
│   ├── TS.tsx                 # Conditions d'utilisation (/terms)
│   ├── Privacy.tsx            # Politique de confidentialité (/privacy)
│   └── ErrorPage.tsx          # Page d'erreur (404 / erreurs de route)
│
├── components/                # Composants organisés par fonctionnalité
│   ├── Home/
│   │   ├── Hero.tsx           # Section hero animée
│   │   ├── About.tsx          # Section "À propos"
│   │   ├── Cards.tsx          # Cartes de statistiques
│   │   ├── Projects.tsx       # Liste des projets en vedette
│   │   ├── Navbar.tsx         # Barre de navigation
│   │   ├── Footer.tsx         # Pied de page
│   │   └── Modal.tsx          # Modal générique (Home)
│   │
│   ├── Dashboard/
│   │   ├── Dashboard.tsx      # Vue principale du dashboard
│   │   ├── DashNav.tsx        # Navigation du dashboard
│   │   ├── Workspace.tsx      # Espace de travail (gestion projets)
│   │   ├── Submission.tsx     # Formulaire de soumission de projet
│   │   ├── Update.tsx         # Formulaire de mise à jour
│   │   ├── Project.tsx        # Aperçu d'un projet (dashboard)
│   │   ├── Activity.tsx       # Journal d'activités récentes
│   │   ├── GrowthChart.tsx    # Graphique de croissance (Recharts)
│   │   ├── Categorie.tsx      # Gestion des catégories
│   │   ├── Type.tsx           # Gestion des types de projets
│   │   ├── Margin.tsx         # Indicateurs de marges / KPIs
│   │   └── Modal.tsx          # Modal du dashboard
│   │
│   ├── Explore/
│   │   ├── Categories.tsx     # Filtre par catégorie
│   │   ├── Technologies.tsx   # Filtre par technologies
│   │   └── Type.tsx           # Filtre par type de projet
│   │
│   ├── Details/
│   │   └── DetailNav.tsx      # Navigation de la page détail
│   │
│   ├── Auth/
│   │   ├── Login.tsx          # Formulaire de connexion
│   │   └── Register.tsx       # Formulaire d'inscription
│   │
│   └── ui/                    # Composants UI réutilisables
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── CountUp.tsx        # Compteur animé
│       ├── Date.tsx           # Affichage de dates formatées
│       ├── Link.tsx
│       ├── Spinner.tsx        # Indicateur de chargement
│       └── TextType.tsx       # Effet machine à écrire
│
├── services/                  # Couche communication API
│   ├── auth.service.ts        # Authentification (login / register)
│   ├── csrf.service.ts        # Gestion du token CSRF
│   ├── project.service.ts     # CRUD projets (action dashboard)
│   └── dashboard.loader.service.ts  # Loader de données dashboard
│
├── hooks/
│   └── useDetailInterceptor.ts  # Intercepteur Axios pour les détails projet
│
├── types/                     # Types TypeScript partagés
│   ├── Project.ts
│   ├── Button.ts
│   ├── Card.ts
│   ├── Link.ts
│   ├── Margin.ts
│   ├── Modal.ts
│   └── Title.ts
│
├── utils/
│   └── Title.tsx              # Composant utilitaire pour le titre de page
│
├── styles/                    # Feuilles de style par page/feature
│   ├── Home.css
│   ├── Dashboard.css
│   ├── Activity.css
│   ├── Details.css
│   ├── Connexion.css
│   ├── Privacy.css
│   └── Components.ui.css
│
├── data/
│   └── project.json           # Données statiques de projets (fallback)
│
└── assets/                    # Images, icônes, animations Lottie
```

---

## 🔀 Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Page d'accueil publique |
| `/explore` | Explore | Exploration et filtrage des projets |
| `/project/:slug` | Details | Détail d'un projet (URL slugifiée) |
| `/contact` | Contact | Formulaire de contact |
| `/terms` | TS | Conditions d'utilisation |
| `/privacy` | Privacy | Politique de confidentialité |
| `/signin` | Connection | Formulaire de connexion |
| `/signup` | Connection | Formulaire d'inscription |
| `/dashboard` | Dashboard | Espace admin (projets, stats, activité) |
| `*` | ErrorPage | Page 404 / erreurs |

---

## 📝 Licence

Ce projet est privé. Tous droits réservés.
