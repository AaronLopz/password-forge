import { useState, useEffect } from 'react';
import { evaluateStrength } from '../utils/passwordLogic';
import StrengthMeter from './StrengthMeter';

export default function PasswordChecker() {
  const [inputPass, setInputPass] = useState('');
  const [evaluation, setEvaluation] = useState({ score: 0, level: 'weak', color: 'var(--danger)', feedback: [] });

  useEffect(() => {
    if (inputPass) {
      setEvaluation(evaluateStrength(inputPass));
    } else {
      setEvaluation({ score: 0, level: 'weak', color: 'var(--danger)', feedback: [] });
    }
  }, [inputPass]);

  // Lógica de mascota
  let mascotClass = 'mascot-weak';
  
  if (!inputPass || evaluation.level === 'medium') {
    mascotClass = 'mascot-medium';
  } else if (evaluation.level === 'strong') {
    mascotClass = 'mascot-strong';
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div className={`mascot-img ${mascotClass}`}></div>
        <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Evalúa tu propia contraseña</h3>
      </div>
      <input 
        type="text" 
        placeholder="Escribe o pega una contraseña aquí..." 
        value={inputPass}
        onChange={(e) => setInputPass(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: 'rgba(0,0,0,0.2)',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          fontSize: '1rem'
        }}
      />
      {inputPass && (
        <StrengthMeter 
          score={evaluation.score} 
          level={evaluation.level} 
          color={evaluation.color} 
          feedback={evaluation.feedback} 
        />
      )}
    </div>
  );
}
