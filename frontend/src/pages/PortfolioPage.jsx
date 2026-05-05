import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiAdjustmentsHorizontal, HiXMark } from 'react-icons/hi2';
import { getPortfolio, updateTheme as updateThemeAPI } from '../services/api';
import { getTheme } from '../themes/themes';
import PortfolioHero from '../components/portfolio/PortfolioHero';
import PortfolioSkills from '../components/portfolio/PortfolioSkills';
import PortfolioProjects from '../components/portfolio/PortfolioProjects';
import PortfolioExperience from '../components/portfolio/PortfolioExperience';
import PortfolioEducation from '../components/portfolio/PortfolioEducation';
import PortfolioContact from '../components/portfolio/PortfolioContact';
import ThemeSelector from '../components/ThemeSelector';
import ScoreCard from '../components/ScoreCard';
import ExportPanel from '../components/ExportPanel';
import PortfolioCanvas from '../components/portfolio/PortfolioCanvas';

export default function PortfolioPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [score, setScore] = useState(null);
  const [themeId, setThemeId] = useState('developer');
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPortfolio(id);
        setData(res.data.enhancedData || res.data.structuredData);
        setScore(res.data.score);
        setThemeId(res.data.theme || 'developer');
      } catch (err) {
        setError('Portfolio not found.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleThemeChange = async (newTheme) => {
    setThemeId(newTheme);
    try { await updateThemeAPI(id, newTheme); } catch {}
  };

  const theme = getTheme(themeId);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 rounded-full" style={{ border: '3px solid transparent', borderTopColor: '#D4AF37' }} />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>{error}</h2>
        <a href="/upload" className="btn-primary mt-4 inline-flex">Upload a Resume</a>
      </div>
    </div>
  );

  return (
    <div className="relative" style={{ background: theme.colors.bg }}>
      {/* Vibrant 3D Particle Background */}
      <PortfolioCanvas theme={theme} />
      
      {/* Control Panel Toggle */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setPanelOpen(!panelOpen)}
        className="fixed top-28 right-6 z-50 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
        {panelOpen ? <HiXMark className="text-xl" /> : <HiAdjustmentsHorizontal className="text-xl" />}
      </motion.button>

      {/* Side Panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-40 overflow-y-auto"
            style={{
              width: '22rem',
              height: '100vh',
              padding: '6rem 1.5rem 2rem 1.5rem',
              background: 'rgba(8,8,12,0.97)',
              borderLeft: '1px solid rgba(212,175,55,0.12)',
              backdropFilter: 'blur(30px)',
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <ThemeSelector currentTheme={themeId} onSelect={handleThemeChange} />
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }} />
              <ScoreCard score={score} />
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }} />
              <ExportPanel data={data} theme={theme} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio Sections */}
      <div className="pt-20">
        <PortfolioHero data={data} theme={theme} />
        <PortfolioSkills data={data} theme={theme} />
        <PortfolioProjects data={data} theme={theme} />
        <PortfolioExperience data={data} theme={theme} />
        <PortfolioEducation data={data} theme={theme} />
        <PortfolioContact data={data} theme={theme} />
      </div>
    </div>
  );
}
