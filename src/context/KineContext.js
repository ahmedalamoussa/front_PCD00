import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import {
  createPatient,
  exerciseCatalog,
  getKinePatients,
  updatePatientProgress,
} from '../services/kineService';

const KineContext = createContext();

const statusLabelMap = {
  'not-started': 'Non commence',
  'in-progress': 'En cours',
  done: 'Termine',
};

const computePatientStatus = (patient) => {
  const statuses = patient.exercisesProgress.map((item) => item.status);
  if (statuses.length === 0) return 'not-started';
  if (statuses.every((value) => value === 'done')) return 'done';
  if (statuses.every((value) => value === 'not-started')) return 'not-started';
  return 'in-progress';
};

const toPatientReport = (patient) => ({
  patientId: patient.id,
  patientName: patient.name,
  patientCode: patient.code,
  status: computePatientStatus(patient),
  items: patient.exercisesProgress.map((entry) => {
    const exercise = exerciseCatalog.find((item) => item.id === entry.exerciseId);
    return {
      exerciseId: entry.exerciseId,
      exerciseName: exercise ? `${exercise.shortCode} - ${exercise.name}` : entry.exerciseId,
      status: entry.status,
      score: entry.score,
      updatedAt: entry.updatedAt,
    };
  }),
});

export const KineProvider = ({ children }) => {
  const [currentKineEmail, setCurrentKineEmail] = useState(localStorage.getItem('activeKineEmail') || '');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (!currentKineEmail) {
      setPatients([]);
      return;
    }
    setPatients(getKinePatients(currentKineEmail));
  }, [currentKineEmail]);

  const registerPatient = (payload) => {
    if (!currentKineEmail) {
      throw new Error('Aucun kine connecte');
    }

    const newPatient = createPatient(currentKineEmail, payload);
    setPatients((prev) => [...prev, newPatient]);
    return newPatient;
  };

  const setExerciseStatus = (patientId, exerciseId, status) => {
    if (!currentKineEmail) return;

    updatePatientProgress(currentKineEmail, patientId, exerciseId, status);
    setPatients(getKinePatients(currentKineEmail));
  };

  const reports = useMemo(() => patients.map(toPatientReport), [patients]);

  const summary = useMemo(() => {
    const totalPatients = patients.length;
    const totalExercises = patients.reduce((acc, patient) => acc + patient.exercisesProgress.length, 0);
    const completedExercises = patients.reduce(
      (acc, patient) => acc + patient.exercisesProgress.filter((item) => item.status === 'done').length,
      0
    );
    const inProgressExercises = patients.reduce(
      (acc, patient) => acc + patient.exercisesProgress.filter((item) => item.status === 'in-progress').length,
      0
    );

    return {
      totalPatients,
      totalExercises,
      completedExercises,
      inProgressExercises,
      completionRate: totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0,
    };
  }, [patients]);

  const activateKineSession = (email) => {
    localStorage.setItem('activeKineEmail', email);
    setCurrentKineEmail(email);
  };

  const clearKineSession = () => {
    localStorage.removeItem('activeKineEmail');
    setCurrentKineEmail('');
    setPatients([]);
  };

  const value = {
    currentKineEmail,
    patients,
    reports,
    summary,
    statusLabelMap,
    exerciseCatalog,
    registerPatient,
    setExerciseStatus,
    activateKineSession,
    clearKineSession,
  };

  return <KineContext.Provider value={value}>{children}</KineContext.Provider>;
};

export const useKine = () => {
  const context = useContext(KineContext);
  if (!context) {
    throw new Error('useKine doit etre utilise dans KineProvider');
  }
  return context;
};
