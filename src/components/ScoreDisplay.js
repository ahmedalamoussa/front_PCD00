import React from 'react';
import './ScoreDisplay.css';

const ScoreDisplay = ({ result }) => {
  if (!result) return null;

  const getScoreClass = (score) => {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    return 'needs-improvement';
  };

  const getScoreEmoji = (score) => {
    if (score >= 90) return '🎉';
    if (score >= 80) return '👍';
    if (score >= 70) return '💪';
    return '📚';
  };

  return (
    <div className={`score-display ${getScoreClass(result.score)}`}>
      <div className="score-header">
        <h3>Résultats de l'analyse</h3>
        <span className="score-emoji">{getScoreEmoji(result.score)}</span>
      </div>

      <div className="score-circle">
        <div className="score-value">{result.score}</div>
        <div className="score-label">/ 100</div>
      </div>

      <div className="feedback-section">
        <h4>Évaluation</h4>
        <p className="feedback-text">{result.feedback}</p>
      </div>

      {result.recommendations && result.recommendations.length > 0 && (
        <div className="recommendations-section">
          <h4>Recommandations</h4>
          <ul className="recommendations-list">
            {result.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="timestamp">
        Analysé le {new Date(result.timestamp).toLocaleString('fr-FR')}
      </div>
    </div>
  );
};

export default ScoreDisplay;
