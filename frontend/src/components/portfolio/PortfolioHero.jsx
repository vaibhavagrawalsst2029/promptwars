import { motion } from 'framer-motion';

export default function PortfolioHero({ data, theme }) {
  const c = theme.colors;
  return (
    <section
      className="relative flex items-center justify-center px-8 overflow-hidden"
      style={{ background: c.bg, minHeight: '85vh', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 50%, ${c.glow}, transparent 70%)` }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* Avatar */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 rounded-full mx-auto flex items-center justify-center text-5xl font-bold"
          style={{
            background: c.gradient,
            fontFamily: theme.font.heading,
            color: c.bg,
            marginBottom: '3rem',
          }}
        >
          {data.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </motion.div>

        {/* Name */}
        <h1
          className="font-bold"
          style={{
            fontFamily: theme.font.heading,
            color: c.text,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}
        >
          {data.name}
        </h1>

        {/* Role */}
        <p
          className="font-medium"
          style={{
            fontFamily: theme.font.body,
            color: c.accent,
            fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)',
            marginBottom: '2.5rem',
            letterSpacing: '0.02em',
          }}
        >
          {data.role}
        </p>

        {/* Summary */}
        <p
          className="max-w-2xl mx-auto"
          style={{
            fontFamily: theme.font.body,
            color: `${c.text}aa`,
            fontSize: '1.05rem',
            lineHeight: 1.8,
            marginBottom: '3rem',
          }}
        >
          {data.summary}
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="px-5 py-2.5 rounded-lg text-sm no-underline transition-all duration-300 hover:scale-105"
              style={{
                background: `${c.accent}15`,
                border: `1px solid ${c.accent}40`,
                color: c.accent,
                fontFamily: theme.font.body,
              }}
            >
              ✉ {data.email}
            </a>
          )}
          {data.github && (
            <a
              href={`https://${data.github}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm no-underline transition-all duration-300 hover:scale-105"
              style={{
                background: `${c.accent}15`,
                border: `1px solid ${c.accent}40`,
                color: c.accent,
                fontFamily: theme.font.body,
              }}
            >
              ⚡ GitHub
            </a>
          )}
          {data.linkedin && (
            <a
              href={`https://${data.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm no-underline transition-all duration-300 hover:scale-105"
              style={{
                background: `${c.accent}15`,
                border: `1px solid ${c.accent}40`,
                color: c.accent,
                fontFamily: theme.font.body,
              }}
            >
              🔗 LinkedIn
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
