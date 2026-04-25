export default function StrengthMeter({ score, level, color, feedback }) {
  
  const widthPercentage = Math.min((score / 5) * 100, 100);

  return (
    <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
      <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Nivel de seguridad:</span>
        <span style={{ fontWeight: 'bold', color, textTransform: 'uppercase', fontSize: '0.875rem' }}>
          {level === 'weak' && 'Débil'}
          {level === 'medium' && 'Media'}
          {level === 'strong' && 'Fuerte'}
        </span>
      </div>
      
      {/* Barra de progreso */}
      <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
        <div style={{ 
          height: '100%', 
          width: `${widthPercentage}%`, 
          backgroundColor: color,
          transition: 'all 0.3s ease'
        }}></div>
      </div>

      {/* Feedback text */}
      {feedback && feedback.length > 0 && (
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {feedback.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
