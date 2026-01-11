import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExerciseCard.css';

const ExerciseCard = ({ exercise }) => {
  const navigate = useNavigate();

  const handleStartExercise = () => {
    navigate(`/exercise/${exercise.id}`);
  };

  return (
    <div className="exercise-card">
      <div className="exercise-card-header">
        <h3>{exercise.title}</h3>
        <span className="difficulty-badge">{exercise.difficulty || 'Débutant'}</span>
      </div>
      <p className="exercise-description">{exercise.description}</p>
      <div className="exercise-card-footer">
        <div className="exercise-info">
          <span className="duration">⏱ {exercise.duration || '5 min'}</span>
        </div>
        <button onClick={handleStartExercise} className="start-btn">
          Commencer l'exercice
        </button>
      </div>
    </div>
  );
};

export default ExerciseCard;
