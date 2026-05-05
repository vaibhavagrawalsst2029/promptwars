import { motion } from 'framer-motion';

export default function PortfolioEducation({ data, theme }) {
  const c = theme.colors;
  const education = data.education || [];
  const certs = data.certifications || [];

  return (
    <section style={{ background: c.bg, padding: '5rem 2rem', display: 'flex', justifyContent: 'center' }}>
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
          Education & <span style={{ color: c.accent }}>Certifications</span>
        </motion.h2>

        {/* Education Cards — centered */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: certs.length > 0 ? '3.5rem' : '0',
          }}
        >
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: c.card,
                border: `1px solid ${c.border}`,
                borderRadius: '1rem',
                padding: '2.5rem',
                textAlign: 'center',
                flex: education.length === 1 ? '0 1 400px' : '1 1 280px',
                maxWidth: '400px',
              }}
            >
              <h3
                className="font-bold"
                style={{
                  fontFamily: theme.font.heading,
                  fontSize: '0.95rem',
                  color: c.text,
                  marginBottom: '0.75rem',
                }}
              >
                {edu.degree}
              </h3>
              <p
                style={{
                  fontFamily: theme.font.body,
                  color: c.accent,
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                }}
              >
                {edu.institution}
              </p>
              <p
                style={{
                  fontFamily: theme.font.body,
                  color: `${c.text}88`,
                  fontSize: '0.8rem',
                }}
              >
                {edu.year}
                {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        {certs.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            {certs.map((cert, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.625rem',
                  fontSize: '0.875rem',
                  background: `${c.accent}10`,
                  border: `1px solid ${c.accent}30`,
                  color: c.accentSecondary,
                  fontFamily: theme.font.body,
                }}
              >
                🏆 {cert}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
