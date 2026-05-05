import { motion } from 'framer-motion';

function MetricRing({ value, max = 10, size = 56, color, label }) {
  const pct = (value / max) * 100;
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.75rem',
        borderRadius: '0.75rem',
        background: `${color}08`,
        border: `1px solid ${color}18`,
      }}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="4"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Orbitron',
            fontSize: '0.85rem',
            fontWeight: '700',
            color,
          }}
        >
          {value}
        </span>
      </div>
      <span
        style={{
          fontFamily: 'Space Grotesk',
          fontSize: '0.6rem',
          color: '#777',
          textAlign: 'center',
          lineHeight: 1.2,
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function ScoreCard({ score }) {
  if (!score) return null;

  const metrics = [
    { label: 'Recruiter\nAppeal', value: score.recruiterAppeal, color: '#D4AF37' },
    { label: 'Content\nStrength', value: score.contentStrength, color: '#00ff88' },
    { label: 'Complete-\nness', value: score.completeness, color: '#00ccff' },
    { label: 'Technical\nDepth', value: score.technicalDepth, color: '#c084fc' },
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
        📊 Score
      </span>

      {/* Overall Score */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '1rem',
          background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04))',
          border: '1px solid rgba(212,175,55,0.25)',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.15rem' }}>
          <span
            style={{
              fontFamily: 'Orbitron',
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#D4AF37',
              lineHeight: 1,
            }}
          >
            {score.overallScore}
          </span>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#666' }}>/10</span>
        </div>
        <p style={{ fontFamily: 'Space Grotesk', color: '#888', fontSize: '0.75rem', marginTop: '0.35rem' }}>
          Overall Score
        </p>
      </div>

      {/* Metric Rings */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
        }}
      >
        {metrics.map((m) => (
          <MetricRing key={m.label} value={m.value} color={m.color} label={m.label} />
        ))}
      </div>

      {/* Suggestions */}
      {score.suggestions && score.suggestions.length > 0 && (
        <div
          style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p
            style={{
              fontFamily: 'Space Grotesk',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#d0d0d0',
              marginBottom: '0.65rem',
            }}
          >
            💡 Suggestions
          </p>
          {score.suggestions.slice(0, 3).map((s, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'Space Grotesk',
                fontSize: '0.75rem',
                color: '#8a8a9a',
                lineHeight: 1.5,
                marginBottom: i < 2 ? '0.5rem' : 0,
                paddingLeft: '0.75rem',
                borderLeft: '2px solid rgba(212,175,55,0.3)',
              }}
            >
              {s}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
