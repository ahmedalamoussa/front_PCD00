const KINE_PATIENTS_KEY = 'kinePatients';

const readStore = () => {
  try {
    const raw = localStorage.getItem(KINE_PATIENTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error('Erreur lecture kinePatients:', error);
    return {};
  }
};

const writeStore = (store) => {
  localStorage.setItem(KINE_PATIENTS_KEY, JSON.stringify(store));
};

const generatePatientCode = (store) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const existing = new Set(
    Object.values(store)
      .flat()
      .map((patient) => patient.code)
  );

  let code = '';
  do {
    code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  } while (existing.has(code));

  return code;
};

export const getKinePatients = (kineEmail) => {
  const store = readStore();
  return store[kineEmail] || [];
};

export const saveKinePatients = (kineEmail, patients) => {
  const store = readStore();
  store[kineEmail] = patients;
  writeStore(store);
};

export const createPatient = (kineEmail, payload) => {
  const store = readStore();
  const patients = store[kineEmail] || [];

  const patient = {
    id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    code: generatePatientCode(store),
    createdAt: new Date().toISOString(),
    name: payload.name,
    age: payload.age,
    notes: payload.notes || '',
    assignedExercises: payload.assignedExercises,
    exercisesProgress: payload.assignedExercises.map((exerciseId) => ({
      exerciseId,
      status: 'not-started',
      score: null,
      updatedAt: null,
    })),
  };

  store[kineEmail] = [...patients, patient];
  writeStore(store);
  return patient;
};

export const updatePatientProgress = (kineEmail, patientId, exerciseId, status) => {
  const patients = getKinePatients(kineEmail);
  const updatedPatients = patients.map((patient) => {
    if (patient.id !== patientId) {
      return patient;
    }

    const exercisesProgress = patient.exercisesProgress.map((entry) => {
      if (entry.exerciseId !== exerciseId) {
        return entry;
      }

      const isDone = status === 'done';
      const simulatedScore = isDone ? Math.floor(Math.random() * 25) + 75 : null;

      return {
        ...entry,
        status,
        score: isDone ? (entry.score ?? simulatedScore) : null,
        updatedAt: new Date().toISOString(),
      };
    });

    return {
      ...patient,
      exercisesProgress,
    };
  });

  saveKinePatients(kineEmail, updatedPatients);
};

export const getPatientByCode = (code) => {
  if (!code) return null;

  const normalized = code.trim().toUpperCase();
  const store = readStore();

  for (const [kineEmail, patients] of Object.entries(store)) {
    const patient = (patients || []).find((item) => item.code === normalized);
    if (patient) {
      return {
        ...patient,
        kineEmail,
      };
    }
  }

  return null;
};

export const submitPatientReportByCode = (code, exerciseId, result) => {
  const normalized = code ? code.trim().toUpperCase() : '';
  if (!normalized) return false;

  const store = readStore();
  let updated = false;

  Object.keys(store).forEach((kineEmail) => {
    const patients = store[kineEmail] || [];
    store[kineEmail] = patients.map((patient) => {
      if (patient.code !== normalized) {
        return patient;
      }

      const exercisesProgress = patient.exercisesProgress.map((entry) => {
        if (entry.exerciseId !== exerciseId) {
          return entry;
        }

        updated = true;
        return {
          ...entry,
          status: 'done',
          score: typeof result?.score === 'number' ? result.score : entry.score,
          updatedAt: new Date().toISOString(),
        };
      });

      return {
        ...patient,
        exercisesProgress,
      };
    });
  });

  if (updated) {
    writeStore(store);
  }

  return updated;
};

export const exerciseCatalog = [
  { id: 'stretch-1', shortCode: 'CTK', name: 'Cervical Tilt' },
  { id: 'stretch-2', shortCode: 'RTK', name: 'Rotation du tronc' },
  { id: 'stretch-3', shortCode: 'ELK', name: 'Flexion coude/genou' },
  { id: 'strength-1', shortCode: 'BRIDGE', name: 'Bridge' },
  { id: 'strength-3', shortCode: 'LEG-RAISE', name: 'Leg Raise' },
  { id: 'strength-2', shortCode: 'LATERAL-RAISE', name: 'Lateral Raise (jambes)' },
];

// TODO backend: Remplacer le localStorage par des appels API REST Spring Boot
// - GET /api/kine/{email}/patients
// - POST /api/kine/{email}/patients
// - PATCH /api/kine/{email}/patients/{patientId}/progress
