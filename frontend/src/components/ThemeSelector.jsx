import { motion } from 'framer-motion';
import { themes } from '../themes/themes';
import { HiCheck } from 'react-icons/hi2';

export default function ThemeSelector({ currentTheme, onSelect }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <span
        style={{
          fontFamily: 'Orbitron',
          color: '#D4AF37',
          fontSize: '0.7rem',
          fontWeight: '700',
          letterSpacing: '0.15em',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
        }}
      >
        🎨 Theme
      </span>
      {Object.values(themes).map((t) => {
        const isActive = currentTheme === t.id;
        return (
          <motion.button
            key={t.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(t.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.85rem 1rem',
              borderRadius: '0.75rem',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              background: isActive
                ? `linear-gradient(135deg, ${t.colors.accent}18, ${t.colors.accent}08)`
                : 'rgba(255,255,255,0.03)',
              border: isActive
                ? `1.5px solid ${t.colors.accent}60`
                : '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.25s ease',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                background: t.colors.gradient,
                flexShrink: 0,
                boxShadow: isActive ? `0 0 12px ${t.colors.accent}40` : 'none',
                transition: 'box-shadow 0.3s ease',
              }}
            />
            <span
              style={{
                fontFamily: 'Space Grotesk',
                fontSize: '0.9rem',
                fontWeight: isActive ? '600' : '500',
                color: isActive ? t.colors.accent : '#999',
                flex: 1,
              }}
            >
              {t.name}
            </span>
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  borderRadius: '50%',
                  background: t.colors.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HiCheck style={{ fontSize: '0.7rem', color: '#0a0a0f', strokeWidth: 2 }} />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
