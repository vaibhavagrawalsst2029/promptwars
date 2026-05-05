import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/upload', label: 'Upload' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(10, 10, 15, 0.9)',
        backdropFilter: 'blur(30px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ maxWidth: '90rem', margin: '0 auto', padding: '1.1rem 2.5rem' }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
            style={{
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #D4AF37, #b8972e)',
            }}
          >
            <HiSparkles style={{ fontSize: '1.4rem', color: '#0a0a0f' }} />
          </motion.div>
          <span
            className="font-bold tracking-wider"
            style={{ fontFamily: 'Orbitron', color: '#f0f0f0', fontSize: '1.35rem' }}
          >
            Resume<span style={{ color: '#D4AF37' }}>Forge</span>
            <span className="font-normal" style={{ color: '#C0C0C0', fontSize: '0.8rem', marginLeft: '0.25rem' }}>AI</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center" style={{ gap: '0.5rem' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative no-underline transition-colors duration-300"
                style={{
                  fontFamily: 'Space Grotesk',
                  color: isActive ? '#D4AF37' : '#8a8a9a',
                  padding: '0.6rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? '600' : '500',
                  borderRadius: '0.5rem',
                  background: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#d0d0d0';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#8a8a9a';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
