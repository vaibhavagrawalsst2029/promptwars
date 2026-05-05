import { HiSparkles } from 'react-icons/hi2';

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d18 100%)',
      }}
    >
      {/* Gold shimmer divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), rgba(192,192,192,0.2), rgba(212,175,55,0.4), transparent)' }} />
      
      {/* Subtle background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <HiSparkles style={{ color: '#D4AF37', fontSize: '1.25rem' }} />
              <span style={{ fontFamily: 'Orbitron', fontSize: '1.25rem', fontWeight: 'bold' }}>
                <span style={{ background: 'linear-gradient(135deg, #f0f0f0, #C0C0C0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Resume</span>
                <span style={{ background: 'linear-gradient(135deg, #D4AF37, #f5d060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span>
                <span style={{ background: 'linear-gradient(135deg, #e0e0e0, #a0a0a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginLeft: '4px' }}>AI</span>
              </span>
            </div>
            <p style={{ fontFamily: 'Space Grotesk', color: '#8a8a9a', fontSize: '0.9rem', maxWidth: '300px', textAlign: 'center', md: { textAlign: 'left' } }}>
              Transform your ordinary resume into an extraordinary, AI-powered portfolio instantly.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8" style={{ fontFamily: 'Space Grotesk', fontSize: '0.9rem' }}>
            <a href="#" className="hover:text-[#D4AF37] transition-colors" style={{ color: '#a0a0a0' }}>Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors" style={{ color: '#a0a0a0' }}>Terms of Service</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors" style={{ color: '#a0a0a0' }}>GitHub</a>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontFamily: 'Space Grotesk', color: '#6a6a7a', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} ResumeForge AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2" style={{ fontFamily: 'Space Grotesk', color: '#6a6a7a', fontSize: '0.85rem' }}>
            <span style={{ color: '#D4AF37' }}>✦</span> Built for hackathons
            <span className="mx-2">•</span>
            Powered by Gemini AI
          </div>
        </div>
      </div>
    </footer>
  );
}
