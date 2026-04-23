import React from 'react';
import CodeKineInput from '../components/CodeKineInput';
import ExerciseCard from '../components/ExerciseCard';
import { exercisesData } from '../data/exercises';
import { useUser } from '../context/UserContext';
import './Home.css';

const Home = () => {
  const { isGuided, guidedPatient } = useUser();

  const assignedExerciseIds = new Set(guidedPatient?.assignedExercises || []);
  const stretchingExercises = isGuided
    ? exercisesData.stretching.filter((exercise) => assignedExerciseIds.has(exercise.id))
    : exercisesData.stretching;
  const strengtheningExercises = isGuided
    ? exercisesData.strengthening.filter((exercise) => assignedExerciseIds.has(exercise.id))
    : exercisesData.strengthening;
  const hasAssignedExercises = stretchingExercises.length > 0 || strengtheningExercises.length > 0;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenue sur KineIA</h1>
          <p className="hero-subtitle">
            Votre assistant intelligent de kinésithérapie
          </p>
          <p className="hero-description">
            KineIA vous accompagne dans vos exercices de rééducation et de renforcement
            musculaire grâce à l'intelligence artificielle. Bénéficiez d'un suivi personnalisé
            et d'analyses en temps réel de vos mouvements pour progresser en toute sécurité.
          </p>
          {isGuided && (
            <div className="guided-badge">
              <span className="badge-icon">✓</span>
              Mode guidé actif
            </div>
          )}
        </div>
      </section>

      {/* Code KINÉ Section */}
      <section className="code-section">
        <CodeKineInput />
      </section>

      {/* Présentation */}
      <section className="info-section">
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">🎥</div>
            <h3>Vidéos de démonstration</h3>
            <p>Visualisez chaque exercice avant de le pratiquer</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🤖</div>
            <h3>Analyse IA en temps réel</h3>
            <p>Recevez un feedback instantané sur votre technique</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📊</div>
            <h3>Suivi de progression</h3>
            <p>Partagez vos résultats avec votre kinésithérapeute</p>
          </div>
        </div>
      </section>

      {/* Section Stretching */}
      <section className="exercises-section">
        <div className="section-header">
          <h2>
            <span className="section-icon">🧘</span>
            Stretching
          </h2>
          <p className="section-description">
            Améliorez votre flexibilité et détendez vos muscles avec nos exercices d'étirement guidés.
          </p>
        </div>
        <div className="exercises-grid">
          {stretchingExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </section>

      {/* Section Renforcement musculaire */}
      <section className="exercises-section">
        <div className="section-header">
          <h2>
            <span className="section-icon">💪</span>
            Renforcement musculaire
          </h2>
          <p className="section-description">
            Développez votre force et tonifiez vos muscles avec nos exercices de renforcement progressifs.
          </p>
        </div>
        <div className="exercises-grid">
          {strengtheningExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </section>

      {isGuided && !hasAssignedExercises && (
        <section className="exercises-section">
          <div className="section-header">
            <p className="section-description">
              Aucun exercice ne vous a encore été assigné. Contactez votre kinésithérapeute.
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2026 KineIA - Votre santé, notre priorité</p>
        <p className="footer-note">
          Cette application ne remplace pas un suivi médical professionnel.
          Consultez toujours votre kinésithérapeute avant de commencer un nouveau programme d'exercices.
        </p>
      </footer>
    </div>
  );
};

export default Home;
