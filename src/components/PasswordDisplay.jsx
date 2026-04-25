import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function PasswordDisplay({ password }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        padding: '1.25rem',
        borderRadius: '12px',
        fontSize: '1.5rem',
        fontFamily: 'monospace',
        textAlign: 'center',
        wordBreak: 'break-all',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: password ? 'var(--text-primary)' : 'var(--text-secondary)'
      }}>
        {password || 'Tu contraseña aparecerá aquí...'}
      </div>
      
      <button 
        className="btn-icon"
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '50%',
          right: '1rem',
          transform: 'translateY(-50%)',
          color: copied ? 'var(--success)' : 'var(--text-secondary)',
          borderColor: copied ? 'var(--success)' : 'var(--border)'
        }}
        title="Copiar al portapapeles"
      >
        {copied ? <Check size={20} /> : <Copy size={20} />}
      </button>
    </div>
  );
}
