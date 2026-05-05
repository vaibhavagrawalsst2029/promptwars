import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCodeBracket, HiDocumentText, HiClipboard, HiCheck } from 'react-icons/hi2';
import { saveAs } from 'file-saver';

export default function ExportPanel({ data, theme }) {
  const [copied, setCopied] = useState(false);

  const exportHTML = () => {
    const html = generateHTML(data, theme);
    const blob = new Blob([html], { type: 'text/html' });
    saveAs(blob, `${(data.name || 'portfolio').replace(/\s+/g, '_')}_portfolio.html`);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, `${(data.name || 'portfolio').replace(/\s+/g, '_')}_data.json`);
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttons = [
    {
      label: 'Download HTML',
      icon: HiDocumentText,
      color: '#D4AF37',
      onClick: exportHTML,
    },
    {
      label: 'Download JSON',
      icon: HiCodeBracket,
      color: '#00ff88',
      onClick: exportJSON,
    },
    {
      label: copied ? 'Copied!' : 'Copy JSON',
      icon: copied ? HiCheck : HiClipboard,
      color: copied ? '#22c55e' : '#c084fc',
      onClick: copyJSON,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <span
        style={{
          fontFamily: 'Orbitron',
          color: '#D4AF37',
          fontSize: '0.7rem',
          fontWeight: '700',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        📦 Export
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {buttons.map((btn) => (
          <motion.button
            key={btn.label}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={btn.onClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.85rem 1rem',
              borderRadius: '0.75rem',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              background: `linear-gradient(135deg, ${btn.color}08, transparent)`,
              border: `1px solid ${btn.color}20`,
              color: '#e0e0e0',
              fontFamily: 'Space Grotesk',
              fontSize: '0.85rem',
              fontWeight: '500',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${btn.color}50`;
              e.currentTarget.style.boxShadow = `0 4px 16px ${btn.color}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${btn.color}20`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '0.5rem',
                background: `${btn.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <btn.icon style={{ fontSize: '1rem', color: btn.color }} />
            </div>
            {btn.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function generateHTML(data, theme) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${data.name || 'Portfolio'}</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Space+Grotesk:wght@400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Space Grotesk',sans-serif;background:#0a0a0f;color:#e0e0e0}
h1,h2,h3{font-family:'Orbitron',sans-serif}
.hero{min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem}
.hero h1{font-size:3rem;margin-bottom:.5rem}
.hero .role{font-size:1.3rem;color:#D4AF37;margin-bottom:1rem}
.hero p{max-width:600px;margin:0 auto;color:#aaa;line-height:1.6}
section{padding:4rem 2rem;max-width:900px;margin:0 auto}
.section-title{font-size:1.5rem;margin-bottom:2rem;text-align:center}
.section-title span{color:#D4AF37}
.skills{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem}
.skill{padding:.5rem 1rem;border-radius:.5rem;background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.2);color:#D4AF37;font-size:.85rem}
.card{padding:1.5rem;border-radius:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);margin-bottom:1rem}
.card h3{color:#D4AF37;margin-bottom:.5rem;font-size:1rem}
.card p{color:#aaa;font-size:.9rem;line-height:1.5}
.tags{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem}
.tag{padding:.2rem .5rem;border-radius:.25rem;background:rgba(212,175,55,0.08);color:#D4AF37;font-size:.75rem}
</style>
</head>
<body>
<div class="hero">
<div>
<h1>${data.name || ''}</h1>
<p class="role">${data.role || ''}</p>
<p>${data.summary || ''}</p>
</div>
</div>
<section>
<h2 class="section-title">Skills & <span>Technologies</span></h2>
<div class="skills">${(data.skills||[]).map(s=>`<span class="skill">${s}</span>`).join('')}</div>
</section>
<section>
<h2 class="section-title">Featured <span>Projects</span></h2>
${(data.projects||[]).map(p=>`<div class="card"><h3>${p.name}</h3><p>${p.description}</p><div class="tags">${(p.technologies||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div></div>`).join('')}
</section>
<section>
<h2 class="section-title">Work <span>Experience</span></h2>
${(data.experience||[]).map(e=>`<div class="card"><h3>${e.role}</h3><p style="color:#D4AF37;font-size:.85rem;margin-bottom:.5rem">${e.company} • ${e.duration}</p>${(e.highlights||[]).map(h=>`<p>▸ ${h}</p>`).join('')}</div>`).join('')}
</section>
</body>
</html>`;
}
