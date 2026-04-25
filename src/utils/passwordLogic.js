// Lógica de generación de contraseñas
const words = ["sol", "luna", "gato", "perro", "azul", "rojo", "mar", "rio", "flor", "arbol", "mesa", "silla", "cielo", "nube", "fuego", "hielo", "zorro", "lobo", "oso", "leon"];

export const generatePassword = (options) => {
  const { mode, length, uppercase, lowercase, numbers, symbols } = options;

  if (mode === 'pin') {
    let pin = '';
    for (let i = 0; i < length; i++) {
      pin += Math.floor(Math.random() * 10);
    }
    return pin;
  }

  if (mode === 'passphrase') {
    let phrase = [];
    const wordCount = Math.max(3, Math.floor(length / 5)); // Aprox 5 chars per word
    for (let i = 0; i < wordCount; i++) {
      phrase.push(words[Math.floor(Math.random() * words.length)]);
    }
    return phrase.join('-');
  }

  if (mode === 'memorable') {
    const word = words[Math.floor(Math.random() * words.length)];
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    const num = Math.floor(Math.random() * 100);
    const syms = '!@#$%^&*';
    const sym = syms[Math.floor(Math.random() * syms.length)];
    return `${capitalizedWord}${sym}${num}`;
  }

  // Modo clásico (Totalmente aleatorio)
  let chars = '';
  if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()_+~|}{[]:;?><,./-=';

  if (chars === '') return '';

  let password = '';
  // Asegurar que al menos un caracter de cada tipo seleccionado se incluya si la longitud lo permite
  if (uppercase) password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
  if (lowercase) password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
  if (numbers) password += '0123456789'[Math.floor(Math.random() * 10)];
  if (symbols) password += '!@#$%^&*()_+~|}{[]:;?><,./-='[Math.floor(Math.random() * 28)];

  while (password.length < length) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  // Shuffle
  return password.split('').sort(() => 0.5 - Math.random()).join('').substring(0, length);
};

// Lógica de evaluación de fuerza
export const evaluateStrength = (password) => {
  let score = 0;
  let feedback = [];

  if (!password) return { score: 0, level: 'weak', feedback: ['Introduce una contraseña.'] };

  if (password.length < 8) {
    feedback.push("Demasiado corta.");
  } else if (password.length >= 12) {
    score += 2;
    feedback.push("Buena longitud.");
  } else {
    score += 1;
  }

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Añade mayúsculas.");

  if (/[a-z]/.test(password)) score += 1;

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push("Añade números.");

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Faltan símbolos.");
  }

  let level = 'weak';
  let color = 'var(--danger)';
  
  if (score >= 5) {
    level = 'strong';
    color = 'var(--success)';
    if (feedback.length === 0) feedback.push("¡Excelente!");
  } else if (score >= 3) {
    level = 'medium';
    color = 'var(--warning)';
    if (feedback.length === 0) feedback.push("Buena, pero mejorable.");
  }

  return { score, level, color, feedback };
};
