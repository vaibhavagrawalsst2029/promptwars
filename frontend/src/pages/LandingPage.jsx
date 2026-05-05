import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroCanvas from '../components/HeroCanvas';
import {
  HiArrowUpTray,
  HiCpuChip,
  HiPaintBrush,
  HiArrowDownTray,
  HiSparkles,
  HiRocketLaunch,
  HiDocumentText,
} from 'react-icons/hi2';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const features = [
  {
    icon: HiArrowUpTray,
    title: 'Upload Resume',
    desc: 'Drop your PDF or DOCX resume and let AI take over.',
    color: '#D4AF37',
  },
  {
    icon: HiCpuChip,
    title: 'AI Parsing',
    desc: 'Gemini AI extracts and structures your resume data intelligently.',
    color: '#00ff88',
  },
  {
    icon: HiPaintBrush,
    title: 'Generate Portfolio',
    desc: 'Instantly build a stunning portfolio with multiple themes.',
    color: '#c084fc',
  },
  {
    icon: HiArrowDownTray,
    title: 'Export Anywhere',
    desc: 'Download as HTML, React code, or shareable JSON.',
    color: '#ff6b6b',
  },
];

const steps = [
  { num: '01', title: 'Upload', desc: 'Drop your resume file', icon: HiDocumentText },
  { num: '02', title: 'AI Magic', desc: 'AI parses & enhances', icon: HiSparkles },
  { num: '03', title: 'Portfolio', desc: 'Preview & export', icon: HiRocketLaunch },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d18 30%, #0a0a0f 60%, #0e0c14 100%)' }}>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Particle Network Background */}
        <HeroCanvas />
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(192,168,55,0.05) 40%, transparent 70%)',
          }}
        />
        {/* Silver accent glow */}
        <div
          className="absolute"
          style={{
            top: '20%', right: '10%', width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192,192,192,0.06) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Bottom gold accent */}
        <div
          className="absolute"
          style={{
            bottom: '10%', left: '20%', width: '500px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-20 w-32 h-32 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15), transparent)' }}
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 left-16 w-48 h-48 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(192,192,192,0.08), transparent)' }}
        />

        <div className="relative z-10 px-6" style={{ maxWidth: '64rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-12"
            style={{
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
            }}
          >
            <HiSparkles style={{ color: '#D4AF37' }} />
            <span style={{ fontFamily: 'Space Grotesk', color: '#D4AF37', fontSize: '0.8rem', fontWeight: 500 }}>
              AI-Powered Portfolio Generator
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl md:text-7xl font-bold mb-10 leading-tight"
            style={{ fontFamily: 'Orbitron' }}
          >
            <span style={{ background: 'linear-gradient(135deg, #f0f0f0, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Turn your resume</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #D4AF37, #f5d060, #D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>into a portfolio</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #C0C0C0, #e8e8e8, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>instantly.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg md:text-xl mb-14 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Space Grotesk', color: '#8a8a9a' }}
          >
            Upload your resume and let AI craft a stunning, professional portfolio website in seconds.
            Choose from multiple themes. Export anywhere.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Link to="/upload" className="btn-primary text-base">
              <HiArrowUpTray />
              Upload Your Resume
            </Link>
            <Link to="/portfolio/demo-portfolio" className="btn-secondary text-base">
              <HiRocketLaunch />
              View Demo
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{ border: '2px solid rgba(212, 175, 55, 0.3)' }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#D4AF37' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Gold shimmer divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), rgba(192,192,192,0.2), rgba(212,175,55,0.3), transparent)' }} />

      {/* ===== FEATURES ===== */}
      <section className="px-8 relative" style={{ paddingTop: '8rem', paddingBottom: '8rem', display: 'flex', justifyContent: 'center', background: 'radial-gradient(ellipse at center top, rgba(212,175,55,0.04) 0%, transparent 60%)' }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '0.4rem 1rem',
                borderRadius: '2rem',
                fontSize: '0.7rem',
                fontFamily: 'Orbitron',
                fontWeight: '700',
                letterSpacing: '0.15em',
                background: 'rgba(212,175,55,0.1)',
                color: '#D4AF37',
                border: '1px solid rgba(212,175,55,0.2)',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              ✨ Features
            </span>
            <h2
              style={{
                fontFamily: 'Orbitron',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: '700',
                marginBottom: '1rem',
              }}
            >
              <span style={{ background: 'linear-gradient(135deg, #e0e0e0, #f0f0f0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Powerful</span>{' '}<span style={{ background: 'linear-gradient(135deg, #D4AF37, #f5d060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Features</span>
            </h2>
            <p style={{ fontFamily: 'Space Grotesk', color: '#8a8a9a', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
              Everything you need to transform your resume into an impressive portfolio.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                style={{
                  borderRadius: '1.25rem',
                  padding: '2.25rem 1.75rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: `linear-gradient(160deg, ${feature.color}08, transparent 60%)`,
                  border: `1px solid ${feature.color}15`,
                  transition: 'all 0.35s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 12px 40px ${feature.color}18, 0 0 60px ${feature.color}08`;
                  e.currentTarget.style.borderColor = `${feature.color}35`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = `${feature.color}15`;
                }}
              >
                <div
                  style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '1rem',
                    background: `${feature.color}12`,
                    border: `1px solid ${feature.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <feature.icon style={{ fontSize: '1.6rem', color: feature.color }} />
                </div>
                <h3
                  style={{
                    fontFamily: 'Orbitron',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: '#f0f0f0',
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontFamily: 'Space Grotesk', color: '#777', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold-silver shimmer divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(192,192,192,0.2), rgba(212,175,55,0.35), rgba(192,192,192,0.2), transparent)' }} />

      {/* ===== HOW IT WORKS ===== */}
      <section
        className="px-8 relative"
        style={{
          background: 'linear-gradient(180deg, rgba(26,26,46,0.5), rgba(15,12,20,0.3), rgba(10,10,15,0.2))',
          paddingTop: '8rem',
          paddingBottom: '8rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Subtle gold radial for section */}
        <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(212,175,55,0.04), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ width: '100%', maxWidth: '1000px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '0.4rem 1rem',
                borderRadius: '2rem',
                fontSize: '0.7rem',
                fontFamily: 'Orbitron',
                fontWeight: '700',
                letterSpacing: '0.15em',
                background: 'rgba(212,175,55,0.1)',
                color: '#D4AF37',
                border: '1px solid rgba(212,175,55,0.2)',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              🚀 Process
            </span>
            <h2
              style={{
                fontFamily: 'Orbitron',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: '700',
                marginBottom: '1rem',
              }}
            >
              <span style={{ background: 'linear-gradient(135deg, #e0e0e0, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>How It</span>{' '}<span style={{ background: 'linear-gradient(135deg, #D4AF37, #f5d060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Works</span>
            </h2>
            <p style={{ fontFamily: 'Space Grotesk', color: '#8a8a9a', lineHeight: 1.6 }}>
              Three simple steps to your professional portfolio.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              position: 'relative',
            }}
          >
            {/* Connector line behind the cards */}
            <div
              style={{
                position: 'absolute',
                top: '3.5rem',
                left: '16%',
                right: '16%',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(212,175,55,0.3), rgba(212,175,55,0.15), rgba(212,175,55,0.3))',
                zIndex: 0,
              }}
            />

            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Step Number Badge */}
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4AF37, #b8972e)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Orbitron',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    color: '#0a0a0f',
                    marginBottom: '1.25rem',
                    boxShadow: '0 0 20px rgba(212,175,55,0.3)',
                  }}
                >
                  {step.num}
                </div>

                {/* Icon Card */}
                <motion.div
                  whileHover={{ scale: 1.08, y: -4 }}
                  style={{
                    width: '5.5rem',
                    height: '5.5rem',
                    borderRadius: '1.25rem',
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04))',
                    border: '1px solid rgba(212,175,55,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    cursor: 'default',
                    transition: 'box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <step.icon style={{ fontSize: '1.75rem', color: '#D4AF37' }} />
                </motion.div>

                <h3
                  style={{
                    fontFamily: 'Orbitron',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: '#f0f0f0',
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'Space Grotesk', color: '#777', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold-silver shimmer divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), rgba(192,192,192,0.2), rgba(212,175,55,0.3), transparent)' }} />

      {/* ===== FINAL CTA ===== */}
      <section className="px-8 relative" style={{ paddingTop: '8rem', paddingBottom: '8rem', display: 'flex', justifyContent: 'center' }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, rgba(192,192,192,0.03) 40%, transparent 70%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
          style={{
            maxWidth: '48rem',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '4rem 3rem',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.04), rgba(192,192,192,0.02), rgba(212,175,55,0.03))',
            border: '1px solid rgba(212,175,55,0.15)',
            boxShadow: '0 0 80px rgba(212,175,55,0.06), inset 0 0 60px rgba(212,175,55,0.02)',
          }}
        >
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: 'Orbitron', marginBottom: '1.5rem', textAlign: 'center' }}
          >
            <span style={{ background: 'linear-gradient(135deg, #e0e0e0, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Ready to</span>{' '}
            <span style={{ background: 'linear-gradient(135deg, #D4AF37, #f5d060, #D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>forge</span>{' '}
            <span style={{ background: 'linear-gradient(135deg, #e0e0e0, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>your portfolio?</span>
          </h2>
          <p style={{ fontFamily: 'Space Grotesk', color: '#999', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6, textAlign: 'center' }}>
            Join the AI revolution. Your next opportunity is one upload away.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link to="/upload" className="btn-primary text-lg px-10 py-4" style={{ boxShadow: '0 4px 24px rgba(212,175,55,0.3)' }}>
              <HiRocketLaunch />
              Get Started Free
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
