import React, { useMemo, useState } from 'react';
import { useKine } from '../context/KineContext';
import './KineDashboard.css';

const defaultPatientForm = {
  name: '',
  age: '',
  notes: '',
  assignedExercises: [],
};

const patientStatusClass = {
  'not-started': 'chip not-started',
  'in-progress': 'chip in-progress',
  done: 'chip done',
};

const KineDashboard = () => {
  const {
    currentKineEmail,
    patients,
    reports,
    summary,
    statusLabelMap,
    exerciseCatalog,
    registerPatient,
    setExerciseStatus,
  } = useKine();

  const [form, setForm] = useState(defaultPatientForm);
  const [createdCode, setCreatedCode] = useState('');
  const [error, setError] = useState('');

  const patientProgress = useMemo(() => {
    return patients.map((patient) => {
      const statuses = patient.exercisesProgress.map((entry) => entry.status);
      if (statuses.length > 0 && statuses.every((value) => value === 'done')) {
        return { ...patient, globalStatus: 'done' };
      }
      if (statuses.every((value) => value === 'not-started')) {
        return { ...patient, globalStatus: 'not-started' };
      }
      return { ...patient, globalStatus: 'in-progress' };
    });
  }, [patients]);

  const toggleExercise = (exerciseId) => {
    setForm((prev) => {
      const exists = prev.assignedExercises.includes(exerciseId);
      return {
        ...prev,
        assignedExercises: exists
          ? prev.assignedExercises.filter((id) => id !== exerciseId)
          : [...prev.assignedExercises, exerciseId],
      };
    });
  };

  const handleCreatePatient = (event) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Le nom du patient est obligatoire.');
      return;
    }
    if (form.assignedExercises.length === 0) {
      setError('Selectionnez au moins un exercice.');
      return;
    }

    const created = registerPatient({
      name: form.name.trim(),
      age: form.age ? Number(form.age) : null,
      notes: form.notes.trim(),
      assignedExercises: form.assignedExercises,
    });

    setCreatedCode(created.code);
    setForm(defaultPatientForm);
  };

  if (!currentKineEmail) {
    return (
      <div className="kine-dashboard-container">
        <h1>Dashboard Kine</h1>
        <p>Connectez-vous en tant que kine pour acceder au dashboard.</p>
      </div>
    );
  }

  return (
    <div className="kine-dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard Kine</h1>
          <p className="subtitle">Kine connecte: {currentKineEmail}</p>
        </div>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <h3>Patients</h3>
          <strong>{summary.totalPatients}</strong>
        </article>
        <article className="summary-card">
          <h3>Exercices termines</h3>
          <strong>{summary.completedExercises}</strong>
        </article>
        <article className="summary-card">
          <h3>Exercices en cours</h3>
          <strong>{summary.inProgressExercises}</strong>
        </article>
        <article className="summary-card">
          <h3>Taux global</h3>
          <strong>{summary.completionRate}%</strong>
        </article>
      </section>

      <section className="panel">
        <h2>Ajouter un patient</h2>
        <form onSubmit={handleCreatePatient} className="patient-form">
          <div className="grid-two">
            <label>
              Nom patient
              <input
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Amine B."
              />
            </label>
            <label>
              Age
              <input
                type="number"
                min="1"
                value={form.age}
                onChange={(e) => setForm((prev) => ({ ...prev, age: e.target.value }))}
                placeholder="Ex: 37"
              />
            </label>
          </div>

          <label>
            Notes
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Informations utiles pour le suivi"
            />
          </label>

          <div className="checkbox-grid">
            {exerciseCatalog.map((exercise) => (
              <label key={exercise.id} className="exercise-checkbox">
                <input
                  type="checkbox"
                  checked={form.assignedExercises.includes(exercise.id)}
                  onChange={() => toggleExercise(exercise.id)}
                />
                <span>{exercise.shortCode} - {exercise.name}</span>
              </label>
            ))}
          </div>

          {error && <p className="error-text">{error}</p>}
          {createdCode && <p className="success-text">Code patient genere: {createdCode}</p>}

          <button type="submit">Generer le code patient</button>
        </form>
      </section>

      <section className="panel">
        <h2>Patients et progression</h2>
        {patientProgress.length === 0 ? (
          <p>Aucun patient pour le moment.</p>
        ) : (
          <div className="patients-table-wrapper">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Code</th>
                  <th>Exercices assignes</th>
                  <th>Statut global</th>
                </tr>
              </thead>
              <tbody>
                {patientProgress.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <strong>{patient.name}</strong>
                      <div className="muted">Age: {patient.age || '-'}</div>
                    </td>
                    <td>{patient.code}</td>
                    <td>
                      <div className="stack-list">
                        {patient.exercisesProgress.map((entry) => {
                          const exercise = exerciseCatalog.find((item) => item.id === entry.exerciseId);
                          return (
                            <div key={entry.exerciseId} className="exercise-row">
                              <span>{exercise ? exercise.shortCode : entry.exerciseId}</span>
                              <select
                                value={entry.status}
                                onChange={(e) => setExerciseStatus(patient.id, entry.exerciseId, e.target.value)}
                              >
                                <option value="not-started">Non commence</option>
                                <option value="in-progress">En cours</option>
                                <option value="done">Termine</option>
                              </select>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td>
                      <span className={patientStatusClass[patient.globalStatus]}>
                        {statusLabelMap[patient.globalStatus]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel">
        <h2>Derniers bilans patients</h2>
        {reports.length === 0 ? (
          <p>Les bilans apparaitront apres creation des patients.</p>
        ) : (
          <div className="report-grid">
            {reports.map((report) => (
              <article key={report.patientId} className="report-card">
                <h3>{report.patientName}</h3>
                <p className="muted">Code: {report.patientCode}</p>
                <p>
                  Statut global: <span className={patientStatusClass[report.status]}>{statusLabelMap[report.status]}</span>
                </p>
                <ul>
                  {report.items.map((item) => (
                    <li key={item.exerciseId}>
                      {item.exerciseName} - {statusLabelMap[item.status]}
                      {item.score !== null ? ` - Score: ${item.score}/100` : ''}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default KineDashboard;
