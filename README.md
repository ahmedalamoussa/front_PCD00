# KineIA - Application Utilisateur

Application React pour les utilisateurs de KineIA permettant de réaliser des exercices de stretching et de renforcement musculaire guidés par intelligence artificielle.

## 🎯 Fonctionnalités

### Mode Simple vs Mode Guidé
- **Mode Simple** : Accès libre aux exercices sans suivi par un kinésithérapeute
- **Mode Guidé** : Activé avec un code KINÉ (6 caractères), permet d'envoyer les bilans à votre kinésithérapeute

### Exercices Disponibles

#### 🧘 Stretching (3 exercices)
1. Étirement des ischio-jambiers
2. Étirement du dos et colonne
3. Étirement des quadriceps

#### 💪 Renforcement Musculaire (3 exercices)
1. Squats guidés
2. Pompes adaptées
3. Gainage core

### Fonctionnalités par Exercice
- 🎥 Vidéo YouTube de démonstration intégrée
- 📝 Instructions détaillées étape par étape
- 📹 Analyse IA des mouvements en temps réel (avec accès caméra)
- 📊 Score et feedback personnalisé
- 📤 Envoi du bilan au kinésithérapeute (mode guidé uniquement)

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🏗️ Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── CodeKineInput.js    # Saisie du code KINÉ
│   ├── ExerciseCard.js     # Carte d'exercice sur la page d'accueil
│   ├── VideoPlayer.js      # Lecteur vidéo YouTube
│   └── ScoreDisplay.js     # Affichage des résultats d'analyse
│
├── pages/              # Pages de l'application
│   ├── Home.js            # Page d'accueil
│   └── Exercise.js        # Page d'exercice individuel
│
├── context/            # Gestion d'état global
│   └── UserContext.js     # Contexte utilisateur (mode simple/guidé)
│
├── services/           # Services et logique métier
│   └── aiService.js       # Service d'analyse IA (stub)
│
├── data/              # Données statiques
│   └── exercises.js       # Base de données des exercices
│
├── App.js             # Composant principal avec routing
└── index.js           # Point d'entrée de l'application
```

## 🔧 Configuration

### Code KINÉ
Pour tester le mode guidé, entrez n'importe quel code de 6 caractères sur la page d'accueil.

**Note** : Dans la version de production, ce code sera validé via une API backend.

## 🚀 Fonctionnalités à Venir

### Analyse IA (TODO)
L'analyse IA actuelle est un **stub** qui génère des scores aléatoires pour la démonstration. 

Pour intégrer la vraie IA, il faudra :

1. **Capture et traitement vidéo**
   - Utiliser MediaPipe, TensorFlow.js ou Pose Detection API
   - Extraire les points clés du corps (keypoints)
   - Analyser les angles des articulations

2. **Analyse des mouvements**
   - Comparer avec les mouvements de référence
   - Détecter les erreurs de posture
   - Calculer un score basé sur la technique

3. **API Backend**
   - Envoyer les données au serveur pour analyse
   - Stocker l'historique des exercices
   - Gérer les bilans pour les kinésithérapeutes

### Autres améliorations futures
- [ ] Historique des exercices
- [ ] Graphiques de progression
- [ ] Programmes d'entraînement personnalisés
- [ ] Notifications de rappel
- [ ] Mode hors ligne
- [ ] Support multilingue

## 🎨 Design

L'application utilise un design moderne avec :
- Dégradés colorés pour un aspect attractif
- Composants réactifs et accessibles
- Animations et transitions fluides
- Interface responsive (mobile, tablette, desktop)

## 📝 Notes pour les Développeurs

### Placeholders IA
Les commentaires `TODO` dans le code indiquent où la vraie IA doit être intégrée :

- [aiService.js](src/services/aiService.js) : Analyse des mouvements
- [Exercise.js](src/pages/Exercise.js) : Capture vidéo et traitement
- [UserContext.js](src/context/UserContext.js) : Validation du code KINÉ via API

### Ajout d'Exercices
Pour ajouter de nouveaux exercices, modifiez [exercises.js](src/data/exercises.js) :

```javascript
{
  id: 'unique-id',
  title: 'Titre de l\'exercice',
  description: 'Description courte',
  category: 'stretching' ou 'strengthening',
  difficulty: 'Débutant / Intermédiaire / Avancé',
  duration: '5 min',
  videoId: 'ID_YOUTUBE',
  instructions: ['Étape 1', 'Étape 2', ...]
}
```

## 🔐 Permissions Requises

L'application nécessite l'accès à :
- **Caméra** : Pour l'analyse des mouvements en temps réel
- **LocalStorage** : Pour sauvegarder le code KINÉ et les résultats

## 📄 Licence

Projet académique - KineIA 2026

---

**Créé pour le projet PCD - Partie Utilisateur**
