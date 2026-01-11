// Base de données des exercices
// TODO: Remplacer par un appel API pour charger les exercices depuis le backend

export const exercisesData = {
  stretching: [
    {
      id: 'stretch-1',
      title: 'Étirement des ischio-jambiers',
      description: 'Améliorez la flexibilité de l\'arrière de vos cuisses avec cet étirement doux et progressif.',
      category: 'stretching',
      difficulty: 'Débutant',
      duration: '5 min',
      videoId: 'qULTwquOuT4', // Exemple d'ID YouTube
      instructions: [
        'Asseyez-vous avec une jambe tendue',
        'Penchez-vous doucement vers l\'avant',
        'Maintenez la position 30 secondes',
        'Répétez de l\'autre côté',
      ],
    },
    {
      id: 'stretch-2',
      title: 'Étirement du dos et colonne',
      description: 'Détendez votre dos et améliorez votre posture avec cet étirement complet de la colonne vertébrale.',
      category: 'stretching',
      difficulty: 'Débutant',
      duration: '6 min',
      videoId: 'qULTwquOuT4', // Exemple d'ID YouTube
      instructions: [
        'Position à quatre pattes',
        'Alternez dos rond et dos creux',
        'Mouvements lents et contrôlés',
        'Respirez profondément',
      ],
    },
    {
      id: 'stretch-3',
      title: 'Étirement des quadriceps',
      description: 'Assouplissez l\'avant de vos cuisses pour améliorer votre mobilité et réduire les tensions.',
      category: 'stretching',
      difficulty: 'Intermédiaire',
      duration: '5 min',
      videoId: 'qULTwquOuT4', // Exemple d'ID YouTube
      instructions: [
        'Debout, prenez votre cheville',
        'Ramenez le talon vers les fesses',
        'Gardez les genoux alignés',
        'Maintenez 30 secondes par jambe',
      ],
    },
  ],
  strengthening: [
    {
      id: 'strength-1',
      title: 'Squats guidés',
      description: 'Renforcez vos jambes et fessiers avec des squats assistés par l\'IA pour une technique parfaite.',
      category: 'strengthening',
      difficulty: 'Débutant',
      duration: '8 min',
      videoId: 'aclHkVaku9U', // Exemple d'ID YouTube
      instructions: [
        'Pieds écartés largeur des épaules',
        'Descendez comme pour vous asseoir',
        'Gardez le dos droit',
        'Remontez en poussant sur les talons',
      ],
    },
    {
      id: 'strength-2',
      title: 'Pompes adaptées',
      description: 'Développez votre force du haut du corps avec des pompes progressives adaptées à votre niveau.',
      category: 'strengthening',
      difficulty: 'Intermédiaire',
      duration: '7 min',
      videoId: 'IODxDxX7oi4', // Exemple d'ID YouTube
      instructions: [
        'Position de planche, mains sous les épaules',
        'Descendez en contrôlant le mouvement',
        'Gardez le corps aligné',
        'Poussez pour remonter',
      ],
    },
    {
      id: 'strength-3',
      title: 'Gainage core',
      description: 'Renforcez votre sangle abdominale et stabilisez votre dos avec des exercices de gainage progressifs.',
      category: 'strengthening',
      difficulty: 'Intermédiaire',
      duration: '6 min',
      videoId: 'pSHjTRCQxIw', // Exemple d'ID YouTube
      instructions: [
        'Position de planche sur les avant-bras',
        'Corps aligné de la tête aux pieds',
        'Contractez les abdominaux',
        'Maintenez 30 à 60 secondes',
      ],
    },
  ],
};

// Fonction pour récupérer tous les exercices
export const getAllExercises = () => {
  return [...exercisesData.stretching, ...exercisesData.strengthening];
};

// Fonction pour récupérer un exercice par ID
export const getExerciseById = (id) => {
  const allExercises = getAllExercises();
  return allExercises.find((exercise) => exercise.id === id);
};

// Fonction pour récupérer les exercices par catégorie
export const getExercisesByCategory = (category) => {
  return exercisesData[category] || [];
};
