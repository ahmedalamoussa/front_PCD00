import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

// Hook personnalisé pour utiliser le contexte utilisateur
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé dans un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [kineCode, setKineCode] = useState(null);
  const [isGuided, setIsGuided] = useState(false);
  const [exerciseResults, setExerciseResults] = useState({});

  // Charger les données depuis le localStorage au démarrage
  useEffect(() => {
    const storedCode = localStorage.getItem('kineCode');
    const storedIsGuided = localStorage.getItem('isGuided');
    const storedResults = localStorage.getItem('exerciseResults');

    if (storedCode) setKineCode(storedCode);
    if (storedIsGuided) setIsGuided(storedIsGuided === 'true');
    if (storedResults) setExerciseResults(JSON.parse(storedResults));
  }, []);

  // Fonction pour valider et définir le code KINÉ
  const validateKineCode = (code) => {
    // TODO: Remplacer par une vraie validation API
    // Pour l'instant, on accepte tout code de 6 caractères
    if (code && code.length === 6) {
      setKineCode(code);
      setIsGuided(true);
      localStorage.setItem('kineCode', code);
      localStorage.setItem('isGuided', 'true');
      return true;
    }
    return false;
  };

  // Fonction pour réinitialiser le code KINÉ
  const clearKineCode = () => {
    setKineCode(null);
    setIsGuided(false);
    localStorage.removeItem('kineCode');
    localStorage.removeItem('isGuided');
  };

  // Fonction pour enregistrer les résultats d'un exercice
  const saveExerciseResult = (exerciseId, result) => {
    const updatedResults = {
      ...exerciseResults,
      [exerciseId]: {
        ...result,
        timestamp: new Date().toISOString(),
      },
    };
    setExerciseResults(updatedResults);
    localStorage.setItem('exerciseResults', JSON.stringify(updatedResults));
  };

  // Fonction pour envoyer le bilan au kiné
  const sendReportToKine = async (exerciseId) => {
    if (!isGuided) {
      throw new Error('Vous devez être un utilisateur guidé pour envoyer un bilan');
    }

    // TODO: Intégrer l'API réelle pour envoyer le bilan
    console.log('Envoi du bilan au kiné:', {
      kineCode,
      exerciseId,
      result: exerciseResults[exerciseId],
    });

    // Simulation d'un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Bilan envoyé avec succès' });
      }, 1000);
    });
  };

  const value = {
    kineCode,
    isGuided,
    exerciseResults,
    validateKineCode,
    clearKineCode,
    saveExerciseResult,
    sendReportToKine,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
