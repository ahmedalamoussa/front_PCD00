export const exercisesData = {
  stretching: [
    {
      id: 'stretch-1',
      title: 'Cervical Tilt (CTK)',
      description: 'Inclinaison contrôlée de la tête pour améliorer la mobilité cervicale.',
      category: 'stretching',
      difficulty: 'Débutant',
      duration: '2 min',
      videoId: 'QatBdq1IMAw',
      instructions: [
        'Tenez-vous droit face à la caméra',
        'Inclinez la tête vers la droite',
        'Revenez au centre',
        'Répétez à gauche',
      ],
    },
    {
      id: 'stretch-2',
      title: 'Rotation du tronc (RTK)',
      description: 'Exercice de rotation pour améliorer la mobilité du haut du corps.',
      category: 'stretching',
      difficulty: 'Débutant',
      duration: '2 min',
      videoId: '11BOevmHPHM',
      instructions: [
        'Gardez les pieds fixes',
        'Tournez le tronc à droite',
        'Revenez lentement',
        'Répétez à gauche',
      ],
    },
    {
      id: 'stretch-3',
      title: 'Flexion coude/genou (ELK)',
      description: 'Exercice de flexion pour améliorer la mobilité articulaire.',
      category: 'stretching',
      difficulty: 'Intermédiaire',
      duration: '2 min',
      videoId: 'scRvAX03phY',
      instructions: [
        'Positionnez-vous face à la caméra',
        'Pliez le coude ou le genou',
        'Contrôlez le mouvement',
        'Revenez en position initiale',
      ],
    },
  ],

  strengthening: [
    {
      id: 'strength-1',
      title: 'Bridge',
      description: 'Renforce les hanches, les fessiers et le bas du dos.',
      category: 'strengthening',
      difficulty: 'Débutant',
      duration: '8 min',
      videoId: 'wPM8icPu6H8',
      instructions: [
        'Allongez-vous sur le dos',
        'Pliez les genoux, pieds au sol',
        'Soulevez les hanches',
        'Maintenez puis redescendez lentement',
      ],
    },
    {
  id: 'strength-2',
  title: 'Lateral Raise (Jambes)',
  description: 'Exercice de contrôle et d’élévation latérale des jambes pour améliorer la stabilité et l’équilibre.',
  category: 'strengthening',
  difficulty: 'Intermédiaire',
  duration: '7 min',
  videoId: 'q2bnescnSWg',
  instructions: [
    'Tenez-vous debout bien stable',
    'Levez une jambe sur le côté lentement',
    'Gardez le corps droit sans inclinaison',
    'Redescendez sous contrôle',
  ],
},
    {
      id: 'strength-3',
      title: 'Leg Raise',
      description: 'Renforce les abdominaux et les jambes.',
      category: 'strengthening',
      difficulty: 'Intermédiaire',
      duration: '6 min',
      videoId: 'JB2oyawG9KI',
      instructions: [
        'Allongez-vous sur le dos',
        'Gardez les jambes droites',
        'Levez les jambes',
        'Redescendez sans toucher le sol',
      ],
    },
  ],
};

// 🔹 GET ALL
export const getAllExercises = () => {
  return [...exercisesData.stretching, ...exercisesData.strengthening];
};

// 🔹 GET BY ID
export const getExerciseById = (id) => {
  return getAllExercises().find((exercise) => exercise.id === id);
};

// 🔹 GET BY CATEGORY
export const getExercisesByCategory = (category) => {
  return exercisesData[category] || [];
};