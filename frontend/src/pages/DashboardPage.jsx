import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiEye, HiTrash, HiPlus, HiSparkles, HiStar, HiClock } from 'react-icons/hi2';
import { getAllPortfolios, deletePortfolio } from '../services/api';

export default function DashboardPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const res = await getAllPortfolios();
      setPortfolios(res.data);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    try {
      await deletePortfolio(id);
      setPortfolios(prev => prev.filter(p => p.portfolioId !== id));
    } catch {}
  };

  const themeColors = {
    developer: '#00d4aa',
    corporate: '#D4AF37',
    creative: '#ff6b9d',
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '3.5rem',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'Orbitron',
                fontSize: '2rem',
                fontWeight: '700',
                color: '#f0f0f0',
                marginBottom: '0.5rem',
              }}
            >
              Your <span className="gradient-gold">Portfolios</span>
            </h1>
            <p style={{ fontFamily: 'Space Grotesk', color: '#666', fontSize: '0.95rem' }}>
              Manage your AI-generated portfolios
            </p>
          </div>
          <Link
            to="/upload"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}
          >
            <HiPlus /> New Portfolio
          </Link>
        </motion.div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '7rem 0' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                border: '3px solid transparent',
                borderTopColor: '#D4AF37',
              }}
            />
          </div>
        ) : portfolios.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              borderRadius: '1.5rem',
              padding: '5rem 2rem',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                width: '5rem',
                height: '5rem',
                borderRadius: '1.25rem',
                background: 'rgba(212,175,55,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
              }}
            >
              <HiSparkles style={{ fontSize: '2.5rem', color: '#D4AF37' }} />
            </div>
            <h3 style={{ fontFamily: 'Orbitron', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>
              No portfolios yet
            </h3>
            <p style={{ fontFamily: 'Space Grotesk', color: '#8a8a9a', marginBottom: '2rem', maxWidth: '360px', margin: '0 auto 2rem auto' }}>
              Upload a resume to generate your first stunning portfolio.
            </p>
            <Link to="/upload" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <HiPlus /> Upload Resume
            </Link>
          </motion.div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <AnimatePresence>
              {portfolios.map((p, i) => {
                const accent = themeColors[p.theme] || '#D4AF37';
                return (
                  <motion.div
                    key={p.portfolioId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      borderRadius: '1.25rem',
                      padding: '1.75rem',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${accent}40`;
                      e.currentTarget.style.boxShadow = `0 8px 32px ${accent}12`;
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Card Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div
                        style={{
                          width: '3.25rem',
                          height: '3.25rem',
                          borderRadius: '0.85rem',
                          background: `linear-gradient(135deg, ${accent}, ${accent}88)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Orbitron',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: '#0a0a0f',
                          flexShrink: 0,
                        }}
                      >
                        {(p.name || '?')[0]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontFamily: 'Space Grotesk',
                            fontWeight: '600',
                            fontSize: '1.05rem',
                            color: '#f0f0f0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {p.name || 'Unknown'}
                        </p>
                        <p
                          style={{
                            fontFamily: 'Space Grotesk',
                            fontSize: '0.8rem',
                            color: accent,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {p.role || 'Professional'}
                        </p>
                      </div>
                    </div>

                    {/* Tags Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          padding: '0.3rem 0.65rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.7rem',
                          fontFamily: 'Space Grotesk',
                          fontWeight: '600',
                          background: `${accent}12`,
                          color: accent,
                          border: `1px solid ${accent}25`,
                          textTransform: 'capitalize',
                        }}
                      >
                        {p.theme || 'developer'}
                      </span>
                      {p.overallScore && (
                        <span
                          style={{
                            padding: '0.3rem 0.65rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.7rem',
                            fontFamily: 'Space Grotesk',
                            fontWeight: '600',
                            background: 'rgba(255,200,55,0.1)',
                            color: '#f5c842',
                            border: '1px solid rgba(255,200,55,0.2)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}
                        >
                          <HiStar style={{ fontSize: '0.65rem' }} /> {p.overallScore}/10
                        </span>
                      )}
                    </div>

                    {/* Date */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        marginBottom: '1.25rem',
                        fontFamily: 'Space Grotesk',
                        fontSize: '0.75rem',
                        color: '#555',
                      }}
                    >
                      <HiClock style={{ fontSize: '0.7rem' }} />
                      {new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                      <Link
                        to={`/portfolio/${p.portfolioId}`}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          padding: '0.7rem',
                          borderRadius: '0.75rem',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          fontFamily: 'Space Grotesk',
                          textDecoration: 'none',
                          background: `${accent}12`,
                          color: accent,
                          border: `1px solid ${accent}20`,
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${accent}25`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `${accent}12`;
                        }}
                      >
                        <HiEye /> View Portfolio
                      </Link>
                      <button
                        onClick={() => handleDelete(p.portfolioId)}
                        style={{
                          padding: '0.7rem 0.85rem',
                          borderRadius: '0.75rem',
                          fontSize: '0.85rem',
                          background: 'rgba(239,68,68,0.08)',
                          color: '#ef4444',
                          cursor: 'pointer',
                          border: '1px solid rgba(239,68,68,0.15)',
                          fontFamily: 'Space Grotesk',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
                        }}
                      >
                        <HiTrash />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
