import React, { createContext, useState, useContext, useEffect } from 'react';
import { getPatientByCode, submitPatientReportByCode } from '../services/kineService';

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
  const [guidedPatient, setGuidedPatient] = useState(null);
  const [exerciseResults, setExerciseResults] = useState({});

  // Charger les données depuis le localStorage au démarrage
  useEffect(() => {
    const storedResults = localStorage.getItem('exerciseResults');

    // Le mode guidé ne doit pas être réactivé automatiquement.
    // Le patient doit ressaisir le code à chaque nouvelle session d'app.
    localStorage.removeItem('kineCode');
    localStorage.removeItem('isGuided');

    if (storedResults) setExerciseResults(JSON.parse(storedResults));
  }, []);

  // Fonction pour valider et définir le code KINÉ
  const validateKineCode = (code) => {
    const normalizedCode = code ? code.trim().toUpperCase() : '';
    const patient = getPatientByCode(normalizedCode);

    if (patient) {
      setKineCode(normalizedCode);
      setGuidedPatient(patient);
      setIsGuided(true);
      return true;
    }
    return false;
  };

  // Fonction pour réinitialiser le code KINÉ
  const clearKineCode = () => {
    setKineCode(null);
    setIsGuided(false);
    setGuidedPatient(null);
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

    const synced = submitPatientReportByCode(kineCode, exerciseId, exerciseResults[exerciseId]);

    // TODO: Intégrer l'API réelle pour envoyer le bilan
    console.log('Envoi du bilan au kiné:', {
      kineCode,
      exerciseId,
      result: exerciseResults[exerciseId],
      synced,
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
    guidedPatient,
    exerciseResults,
    validateKineCode,
    clearKineCode,
    saveExerciseResult,
    sendReportToKine,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
