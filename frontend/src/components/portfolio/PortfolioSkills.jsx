import { motion } from 'framer-motion';

export default function PortfolioSkills({ data, theme }) {
  const c = theme.colors;
  const skills = data.skills || [];

  return (
    <section
      style={{
        background: c.bgSecondary,
        padding: '5rem 2rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '720px', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-bold"
          style={{
            fontFamily: theme.font.heading,
            color: c.text,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: '3rem',
          }}
        >
          Skills & <span style={{ color: c.accent }}>Technologies</span>
        </motion.h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.875rem',
          }}
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${c.glow}` }}
              className="cursor-default font-medium"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                fontSize: '0.9rem',
                background: c.card,
                border: `1px solid ${c.border}`,
                color: c.accent,
                fontFamily: theme.font.body,
                transition: 'all 0.3s',
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
