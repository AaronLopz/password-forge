import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';
import PasswordDisplay from './components/PasswordDisplay';
import Controls from './components/Controls';
import StrengthMeter from './components/StrengthMeter';
import PasswordChecker from './components/PasswordChecker';
import History from './components/History';
import { generatePassword, evaluateStrength } from './utils/passwordLogic';

function App() {
  const [options, setOptions] = useState({
    mode: 'classic', // classic, memorable, passphrase, pin
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const [password, setPassword] = useState('');
  const [evaluation, setEvaluation] = useState({ score: 0, level: 'weak', color: 'var(--danger)', feedback: [] });
  const [history, setHistory] = useState([]);

  // Cargar historial al inicio
  useEffect(() => {
    const saved = localStorage.getItem('passwordHistory');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const handleGenerate = useCallback(() => {
    const newPass = generatePassword(options);
    setPassword(newPass);
    setEvaluation(evaluateStrength(newPass));
    
    // Guardar en historial
    setHistory(prev => {
      const newHistory = [newPass, ...prev.filter(p => p !== newPass)].slice(0, 5);
      localStorage.setItem('passwordHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, [options]);

  // Generar la primera vez
  useEffect(() => {
    handleGenerate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('passwordHistory');
  };

  return (
    <div className="container animate-fade-in">
      <header className="header">
        <div className="cover-img"></div>
      </header>

      <main>
        {/* Generador Principal */}
        <section className="card">
          <PasswordDisplay password={password} />
          
          <StrengthMeter 
            score={evaluation.score} 
            level={evaluation.level} 
            color={evaluation.color} 
            feedback={evaluation.feedback} 
          />
          
          <Controls options={options} setOptions={setOptions} />
          
          <button className="btn" onClick={handleGenerate}>
            <RefreshCw size={20} />
            Generar Nueva Contraseña
          </button>
        </section>

        {/* Checker independiente */}
        <PasswordChecker />

        {/* Historial */}
        <History history={history} clearHistory={clearHistory} />

        {/* SEO Text / Footer Placeholder para el futuro */}
        <section className="seo-content">
          <h2>¿Por qué usar Password Forge?</h2>
          <p>En el entorno digital actual, usar la misma contraseña para todo es uno de los mayores riesgos de seguridad. Password Forge es una herramienta gratuita que te permite crear claves robustas, indescifrables y, si lo necesitas, fáciles de recordar usando nuestro modo de "Frase de paso".</p>
          <p>Tus contraseñas se generan localmente en tu navegador. <strong>Nunca se envían a ningún servidor</strong>, garantizando privacidad absoluta.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
