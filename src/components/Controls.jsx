export default function Controls({ options, setOptions }) {
  const handleCheckboxChange = (field) => {
    setOptions(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      
      {/* Modo de generación */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label className="text-sm" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          Modo de Generación
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['classic', 'memorable', 'passphrase', 'pin'].map((mode) => (
            <button
              key={mode}
              onClick={() => setOptions(prev => ({ ...prev, mode }))}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '8px',
                border: `1px solid ${options.mode === mode ? 'var(--accent)' : 'var(--border)'}`,
                background: options.mode === mode ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                color: options.mode === mode ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: options.mode === mode ? '600' : '400'
              }}
            >
              {mode === 'classic' && 'Clásica'}
              {mode === 'memorable' && 'Fácil'}
              {mode === 'passphrase' && 'Frase'}
              {mode === 'pin' && 'PIN'}
            </button>
          ))}
        </div>
      </div>

      {/* Longitud */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="flex-between">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Longitud</label>
          <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{options.length}</span>
        </div>
        <input 
          type="range" 
          min="4" 
          max="64" 
          value={options.length} 
          onChange={(e) => setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
        />
      </div>

      {/* Opciones extra solo para modo clásico */}
      {options.mode === 'classic' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <label className="checkbox-group text-sm">
            <input type="checkbox" checked={options.uppercase} onChange={() => handleCheckboxChange('uppercase')} />
            Mayúsculas (A-Z)
          </label>
          <label className="checkbox-group text-sm">
            <input type="checkbox" checked={options.lowercase} onChange={() => handleCheckboxChange('lowercase')} />
            Minúsculas (a-z)
          </label>
          <label className="checkbox-group text-sm">
            <input type="checkbox" checked={options.numbers} onChange={() => handleCheckboxChange('numbers')} />
            Números (0-9)
          </label>
          <label className="checkbox-group text-sm">
            <input type="checkbox" checked={options.symbols} onChange={() => handleCheckboxChange('symbols')} />
            Símbolos (!@#$)
          </label>
        </div>
      )}
    </div>
  );
}
