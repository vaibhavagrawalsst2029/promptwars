import { motion } from 'framer-motion';
import { HiEnvelope, HiPhone, HiGlobeAlt } from 'react-icons/hi2';

export default function PortfolioContact({ data, theme }) {
  const c = theme.colors;
  const links = [
    data.email && { icon: HiEnvelope, label: data.email, href: `mailto:${data.email}` },
    data.phone && { icon: HiPhone, label: data.phone, href: `tel:${data.phone}` },
    data.linkedin && { icon: HiGlobeAlt, label: 'LinkedIn', href: `https://${data.linkedin}` },
    data.github && { icon: HiGlobeAlt, label: 'GitHub', href: `https://${data.github}` },
  ].filter(Boolean);

  return (
    <section
      style={{
        background: c.bgSecondary,
        padding: '5rem 2rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-bold"
          style={{
            fontFamily: theme.font.heading,
            color: c.text,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: '1rem',
          }}
        >
          Get In <span style={{ color: c.accent }}>Touch</span>
        </motion.h2>

        <p
          style={{
            fontFamily: theme.font.body,
            color: `${c.text}88`,
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}
        >
          Feel free to reach out for collaborations or opportunities.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${c.glow}` }}
              className="flex items-center no-underline"
              style={{
                gap: '0.625rem',
                padding: '0.875rem 1.5rem',
                borderRadius: '0.75rem',
                background: c.card,
                border: `1px solid ${c.border}`,
                color: c.text,
                fontFamily: theme.font.body,
                fontSize: '0.9rem',
                transition: 'all 0.3s',
              }}
            >
              <link.icon style={{ color: c.accent, fontSize: '1.1rem' }} />
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
