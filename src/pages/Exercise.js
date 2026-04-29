import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExerciseById } from '../data/exercises';
import { useUser } from '../context/UserContext';
import VideoPlayer from '../components/VideoPlayer';
import ScoreDisplay from '../components/ScoreDisplay';
import ExerciseSession from '../components/ExerciseSession';
import './Exercise.css';

const Exercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isGuided, guidedPatient, saveExerciseResult, sendReportToKine } = useUser();
  
  const [exercise, setExercise] = useState(null);
  const [selectedMode, setSelectedMode] = useState('STRENGTH');
  const [modeInitialized, setModeInitialized] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [sendingReport, setSendingReport] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [lastSavedScore, setLastSavedScore] = useState(null);

  useEffect(() => {
    if (isGuided && guidedPatient) {
      const isAssigned = (guidedPatient.assignedExercises || []).includes(id);
      if (!isAssigned) {
        alert('Cet exercice ne fait pas partie de votre programme assigné.');
        navigate('/exercises');
        return;
      }
    }

    const foundExercise = getExerciseById(id);
    if (foundExercise) {
      setExercise(foundExercise);
      const defaultMode = foundExercise.category === 'stretching' ? 'STRETCHING' : 'STRENGTH';
      setSelectedMode(defaultMode);
      setSessionStarted(false);
      setAnalysisResult(null);
      setModeInitialized(false);
      setLastSavedScore(null);
    } else {
      navigate('/');
    }
  }, [id, isGuided, guidedPatient, navigate]);

  const handleLiveResult = (normalizedResult) => {
    setAnalysisResult(normalizedResult);

    const scoreKey = normalizedResult
      ? `${normalizedResult.score ?? ''}-${normalizedResult.status ?? ''}-${normalizedResult.angle ?? ''}`
      : null;

    if (scoreKey && scoreKey !== lastSavedScore) {
      setLastSavedScore(scoreKey);
      saveExerciseResult(exercise.id, normalizedResult);
    }
  };

  const handleStartSession = () => {
    console.log("🚀 Bouton cliqué !");
  
    setModeInitialized(true);
    setSessionStarted(true);
  };

  const handleSendReport = async () => {
    if (!analysisResult) {
      alert('Veuillez d\'abord effectuer l\'exercice et obtenir un score.');
      return;
    }

    setSendingReport(true);
    try {
      await sendReportToKine(exercise.id);
      setReportSent(true);
      setTimeout(() => setReportSent(false), 3000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du bilan:', error);
      alert('Erreur lors de l\'envoi du bilan.');
    } finally {
      setSendingReport(false);
    }
  };

  if (!exercise) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="exercise-container">
      {/* Header */}
      <div className="exercise-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Retour
        </button>
        <div className="exercise-title-section">
          <h1>{exercise.title}</h1>
          <span className="category-badge">{exercise.category === 'stretching' ? '🧘 Stretching' : '💪 Renforcement'}</span>
        </div>
      </div>

      {/* Description */}
      <div className="exercise-description-section">
        <p className="description">{exercise.description}</p>
        <div className="exercise-meta">
          <span className="meta-item">⏱ {exercise.duration}</span>
          <span className="meta-item">📊 {exercise.difficulty}</span>
        </div>
      </div>

      {/* Vidéo de démonstration */}
      <div className="video-section">
        <VideoPlayer 
          videoId={exercise.videoId} 
          title={`Démonstration : ${exercise.title}`} 
        />
      </div>

      {/* Instructions */}
      <div className="instructions-section">
        <h2>Instructions</h2>
        <ol className="instructions-list">
          {exercise.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      <div className="analysis-section">
        <h2>Analyse IA de vos mouvements</h2>
        <p className="analysis-description">
          Choisissez le mode puis cliquez sur "Ouvrir la webcam" pour demarrer l'analyse IA.
        </p>

        <div className="action-buttons" style={{ marginBottom: '16px' }}>
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            disabled={modeInitialized}
            className="secondary-btn"
            style={{ marginRight: '12px' }}
          >
            <option value="STRENGTH">Renforcement</option>
            <option value="STRETCHING">Etirement</option>
          </select>
          <button
            type="button"
            onClick={handleStartSession}
            className="primary-btn"
          >
            Ouvrir la webcam
          </button>
        </div>

        {sessionStarted ? (
          <ExerciseSession
            initialMode={selectedMode}
            onResult={handleLiveResult}
            onClose={() => {
              setSessionStarted(false);
              setModeInitialized(false);
            }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', color: '#888', fontSize: '0.9rem' }}>
            📹 Initialise le mode, puis clique sur "Ouvrir la webcam"
          </div>
        )}
      </div>

      {/* Affichage du score */}
      {analysisResult && (
        <>
          <ScoreDisplay result={analysisResult} />
          
          {/* Bouton d'envoi au kiné */}
          {isGuided && (
            <div className="send-report-section">
              <button 
                onClick={handleSendReport}
                disabled={sendingReport || reportSent}
                className={`send-report-btn ${reportSent ? 'sent' : ''}`}
              >
                {reportSent ? (
                  <>
                    <span className="check-icon">✓</span>
                    Bilan envoyé !
                  </>
                ) : sendingReport ? (
                  <>
                    <span className="spinner"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <span className="icon">📤</span>
                    Envoyer le bilan à votre kiné
                  </>
                )}
              </button>
            </div>
          )}
          
          {!isGuided && analysisResult && (
            <div className="guided-mode-info">
              <p>
                💡 Entrez un code KINÉ sur la page d'accueil pour pouvoir envoyer vos bilans 
                à votre kinésithérapeute.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Exercise;
