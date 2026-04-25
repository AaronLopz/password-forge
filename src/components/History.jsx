import { Trash2 } from 'lucide-react';

export default function History({ history, clearHistory }) {
  if (history.length === 0) return null;

  return (
    <div className="card">
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>📋 Últimas generadas</h3>
        <button 
          onClick={clearHistory}
          className="btn-icon" 
          style={{ padding: '0.25rem' }}
          title="Borrar historial"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {history.map((pass, idx) => (
          <div key={idx} className="flex-between" style={{ 
            background: 'rgba(0,0,0,0.2)', 
            padding: '0.5rem 1rem', 
            borderRadius: '6px',
            fontFamily: 'monospace'
          }}>
            <span style={{ color: 'var(--text-primary)' }}>
               {pass.length > 20 ? pass.substring(0, 20) + '...' : pass}
            </span>
            <button 
              onClick={() => navigator.clipboard.writeText(pass)}
              style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.875rem' }}
            >
              Copiar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
