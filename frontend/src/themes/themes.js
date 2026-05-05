export const developerTheme = {
  id: 'developer',
  name: 'Developer',
  colors: {
    bg: '#0a0a0f',
    bgSecondary: '#1a1a2e',
    text: '#e0e0e0',
    accent: '#00ff88',
    accentSecondary: '#00ccff',
    card: 'rgba(0, 255, 136, 0.05)',
    cardHover: 'rgba(0, 255, 136, 0.1)',
    glow: 'rgba(0, 255, 136, 0.3)',
    border: 'rgba(0, 255, 136, 0.2)',
    gradient: 'linear-gradient(135deg, #00ff88, #00ccff)',
  },
  font: { heading: 'Orbitron', body: 'Space Grotesk' },
};

export const corporateTheme = {
  id: 'corporate',
  name: 'Corporate',
  colors: {
    bg: '#0f0f0f',
    bgSecondary: '#1c1c1c',
    text: '#e8e8e8',
    accent: '#D4AF37',
    accentSecondary: '#C0C0C0',
    card: 'rgba(212, 175, 55, 0.05)',
    cardHover: 'rgba(212, 175, 55, 0.1)',
    glow: 'rgba(212, 175, 55, 0.25)',
    border: 'rgba(212, 175, 55, 0.2)',
    gradient: 'linear-gradient(135deg, #D4AF37, #C0C0C0)',
  },
  font: { heading: 'Space Grotesk', body: 'Space Grotesk' },
};

export const creativeTheme = {
  id: 'creative',
  name: 'Creative',
  colors: {
    bg: '#0d0d1a',
    bgSecondary: '#1a1a30',
    text: '#f0f0f0',
    accent: '#ff6b6b',
    accentSecondary: '#c084fc',
    card: 'rgba(255, 107, 107, 0.05)',
    cardHover: 'rgba(255, 107, 107, 0.1)',
    glow: 'rgba(255, 107, 107, 0.3)',
    border: 'rgba(255, 107, 107, 0.2)',
    gradient: 'linear-gradient(135deg, #ff6b6b, #c084fc)',
  },
  font: { heading: 'Orbitron', body: 'Space Grotesk' },
};

export const themes = {
  developer: developerTheme,
  corporate: corporateTheme,
  creative: creativeTheme,
};

export const getTheme = (id) => themes[id] || developerTheme;

export default themes;
