import { motion } from 'framer-motion';

export default function PortfolioProjects({ data, theme }) {
  const c = theme.colors;
  const projects = data.projects || [];

  return (
    <section style={{ background: c.bg, padding: '5rem 2rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
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
          Featured <span style={{ color: c.accent }}>Projects</span>
        </motion.h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: `0 0 30px ${c.glow}` }}
              style={{
                background: c.card,
                border: `1px solid ${c.border}`,
                borderRadius: '1.25rem',
                padding: '2.5rem',
                transition: 'all 0.3s',
                flex: '1 1 280px',
                maxWidth: '320px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3
                className="font-bold"
                style={{
                  fontFamily: theme.font.heading,
                  fontSize: '1rem',
                  color: c.accent,
                  marginBottom: '1.25rem',
                }}
              >
                {proj.name}
              </h3>

              <p
                style={{
                  fontFamily: theme.font.body,
                  color: `${c.text}bb`,
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  flex: 1,
                }}
              >
                {proj.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1.25rem' }}>
                {(proj.technologies || []).map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '0.3rem 0.6rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      background: `${c.accent}10`,
                      color: c.accent,
                      fontFamily: theme.font.body,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {proj.link && (
                <a
                  href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                  target="_blank"
                  rel="noreferrer"
                  className="no-underline hover:underline"
                  style={{
                    color: c.accentSecondary,
                    fontFamily: theme.font.body,
                    fontSize: '0.85rem',
                  }}
                >
                  View Project →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
