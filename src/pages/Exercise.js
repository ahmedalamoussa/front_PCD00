import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExerciseById } from '../data/exercises';
import { useUser } from '../context/UserContext';
import { analyzeMovement, startVideoCapture, stopVideoCapture } from '../services/aiService';
import VideoPlayer from '../components/VideoPlayer';
import ScoreDisplay from '../components/ScoreDisplay';
import './Exercise.css';

const Exercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isGuided, guidedPatient, saveExerciseResult, sendReportToKine } = useUser();
  
  const [exercise, setExercise] = useState(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sendingReport, setSendingReport] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  
  const videoStreamRef = useRef(null);
  const videoPreviewRef = useRef(null);

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
    } else {
      navigate('/');
    }
  }, [id, isGuided, guidedPatient, navigate]);

  // Marquer la vidéo comme visionnée après un certain temps
  const handleVideoLoad = () => {
    // Simuler que l'utilisateur a visionné la vidéo après 3 secondes
    setTimeout(() => {
      setVideoWatched(true);
    }, 3000);
  };

  const handleStartRecording = async () => {
    try {
      // TODO: Intégrer la vraie capture vidéo
      const stream = await startVideoCapture();
      videoStreamRef.current = stream;
      
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
      }
      
      setIsRecording(true);
    } catch (error) {
      console.error('Erreur lors du démarrage de la caméra:', error);
      alert('Impossible d\'accéder à la caméra. Vérifiez les permissions.');
    }
  };

  const handleStopRecording = () => {
    if (videoStreamRef.current) {
      stopVideoCapture(videoStreamRef.current);
      videoStreamRef.current = null;
    }
    setIsRecording(false);
  };

  const handleAnalyze = async () => {
    if (!videoWatched) {
      alert('Veuillez d\'abord visionner la vidéo de démonstration.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // TODO: Passer les vraies données de mouvement à l'analyse
      const result = await analyzeMovement(exercise.id, null);
      setAnalysisResult(result);
      saveExerciseResult(exercise.id, result);
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error);
      alert('Une erreur est survenue lors de l\'analyse.');
    } finally {
      setIsAnalyzing(false);
    }
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
        <div onLoad={handleVideoLoad} style={{ display: 'none' }} />
        {videoWatched && (
          <div className="video-watched-badge">
            ✓ Vidéo visionnée
          </div>
        )}
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

      {/* Zone d'analyse IA */}
      <div className="analysis-section">
        <h2>Analyse IA de vos mouvements</h2>
        <p className="analysis-description">
          {!videoWatched 
            ? 'Visionnez d\'abord la vidéo de démonstration avant de commencer l\'analyse.'
            : 'Cliquez sur "Démarrer l\'analyse" pour commencer. L\'IA analysera vos mouvements en temps réel.'
          }
        </p>

        {/* Prévisualisation caméra */}
        <div className="camera-preview">
          <video 
            ref={videoPreviewRef} 
            autoPlay 
            playsInline
            muted
            className={isRecording ? 'recording' : ''}
          />
          {!isRecording && (
            <div className="camera-placeholder">
              <div className="camera-icon">📹</div>
              <p>La caméra s'activera lors de l'analyse</p>
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="action-buttons">
          {!isRecording ? (
            <button 
              onClick={handleStartRecording}
              disabled={!videoWatched || isAnalyzing}
              className="primary-btn"
            >
              {isAnalyzing ? 'Analyse en cours...' : 'Activer la caméra'}
            </button>
          ) : (
            <>
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="primary-btn analyze-btn"
              >
                {isAnalyzing ? (
                  <>
                    <span className="spinner"></span>
                    Analyse en cours...
                  </>
                ) : (
                  'Démarrer l\'analyse'
                )}
              </button>
              <button 
                onClick={handleStopRecording}
                className="secondary-btn"
              >
                Arrêter la caméra
              </button>
            </>
          )}
        </div>
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
