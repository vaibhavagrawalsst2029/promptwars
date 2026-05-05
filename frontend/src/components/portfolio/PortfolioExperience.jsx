import { motion } from 'framer-motion';

export default function PortfolioExperience({ data, theme }) {
  const c = theme.colors;
  const experience = data.experience || [];

  return (
    <section style={{ background: c.bgSecondary, padding: '5rem 2rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-bold"
          style={{
            fontFamily: theme.font.heading,
            color: c.text,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: '3.5rem',
          }}
        >
          Work <span style={{ color: c.accent }}>Experience</span>
        </motion.h2>

        {/* Centered timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center timeline line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: `${c.accent}25`,
              transform: 'translateX(-50%)',
            }}
          />

          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{
                position: 'relative',
                marginBottom: i < experience.length - 1 ? '2.5rem' : '0',
              }}
            >
              {/* Center dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '2rem',
                  width: '0.75rem',
                  height: '0.75rem',
                  borderRadius: '50%',
                  background: c.accent,
                  transform: 'translateX(-50%)',
                  boxShadow: `0 0 12px ${c.glow}`,
                  zIndex: 2,
                }}
              />

              {/* Card */}
              <div
                style={{
                  background: c.card,
                  border: `1px solid ${c.border}`,
                  borderRadius: '1rem',
                  padding: '2.5rem',
                  textAlign: 'center',
                }}
              >
                <h3
                  className="font-bold"
                  style={{
                    fontFamily: theme.font.heading,
                    fontSize: '1.05rem',
                    color: c.text,
                    marginBottom: '0.75rem',
                  }}
                >
                  {exp.role}
                </h3>

                <p
                  style={{
                    fontFamily: theme.font.body,
                    color: c.accent,
                    fontSize: '0.9rem',
                    marginBottom: '1.75rem',
                  }}
                >
                  {exp.company} • {exp.duration}
                </p>

                <div style={{ textAlign: 'left', maxWidth: '560px', margin: '0 auto' }}>
                  {(exp.highlights || []).map((h, j) => (
                    <div
                      key={j}
                      style={{
                        display: 'flex',
                        fontFamily: theme.font.body,
                        color: `${c.text}bb`,
                        fontSize: '0.9rem',
                        lineHeight: 1.7,
                        gap: '0.75rem',
                        marginBottom: j < exp.highlights.length - 1 ? '0.75rem' : '0',
                      }}
                    >
                      <span style={{ color: c.accent, flexShrink: 0, marginTop: '2px' }}>▸</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
