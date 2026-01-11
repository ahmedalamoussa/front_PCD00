import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './CodeKineInput.css';

const CodeKineInput = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(true);
  const { validateKineCode, clearKineCode, isGuided, kineCode } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (validateKineCode(code)) {
      setShowInput(false);
      setCode('');
    } else {
      setError('Code invalide. Le code doit contenir 6 caractères.');
    }
  };

  const handleClear = () => {
    clearKineCode();
    setShowInput(true);
    setCode('');
    setError('');
  };

  if (isGuided && !showInput) {
    return (
      <div className="code-kine-container success">
        <div className="code-kine-success">
          <span className="success-icon">✓</span>
          <div className="success-content">
            <h3>Mode guidé activé</h3>
            <p>Code KINÉ: <strong>{kineCode}</strong></p>
            <p className="success-message">
              Vous pouvez maintenant envoyer vos bilans à votre kinésithérapeute.
            </p>
            <button onClick={handleClear} className="change-code-btn">
              Changer de code
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="code-kine-container">
      <div className="code-kine-card">
        <h2>Rejoindre votre kiné</h2>
        <p className="description">
          Entrez le code fourni par votre kinésithérapeute pour activer le mode guidé
          et partager vos résultats.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="CODE-6"
              maxLength={6}
              className={error ? 'error' : ''}
            />
            <button type="submit" disabled={code.length !== 6}>
              Valider
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="info-text">
          Sans code, vous restez en mode simple et pouvez faire les exercices normalement.
        </p>
      </div>
    </div>
  );
};

export default CodeKineInput;
