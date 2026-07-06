import { motion, useReducedMotion } from 'framer-motion';
import './Experience.css';

const journeyItems = [
  {
    year: '2024',
    title: 'Started BCA',
    subtitle: 'TC Business School, Jaipur',
    details: ['Started learning programming fundamentals and web development.'],
  },
  {
    year: '2024',
    title: 'HTML, CSS and JavaScript',
    details: ['Built responsive websites and strengthened frontend fundamentals.'],
  },
  {
    year: '2025',
    title: 'React & Tailwind CSS',
    details: ['Learned component-based architecture and modern frontend development.'],
  },
  {
    year: '2025',
    title: 'Backend Development',
    details: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Authentication'],
  },
  {
    year: '2026',
    title: 'Built Full Stack Projects',
    details: ['Task Tracker', 'Expense Tracker', 'Portfolio Website'],
  },
  {
    year: '2026',
    title: 'Deployment & Production',
    details: [
      'Deployed React apps on Vercel',
      'Deployed Node.js backends on Render',
      'Managed production environment variables',
      'Optimized production builds',
    ],
  },
  {
    year: 'Present',
    title: 'Open for Internship',
    details: ['Actively building projects', 'Learning MERN and DSA'],
  },
];

const currentFocus = ['React', 'MERN Stack', 'Deployment', 'DSA', 'UI/UX', 'Problem Solving'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const revealVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="experience section-spacing" id="experience" aria-labelledby="experience-title">
      <motion.div
        className="experience__mesh"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <div className="experience__glow experience__glow--one" aria-hidden="true" />
      <div className="experience__glow experience__glow--two" aria-hidden="true" />

      <div className="experience__particles" aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => (
          <motion.span
            key={index}
            style={{
              left: `${(index * 43) % 100}%`,
              top: `${(index * 31) % 100}%`,
              opacity: 0.16 + (index % 4) * 0.08,
            }}
            animate={shouldReduceMotion ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 5 + (index % 5), repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="experience__inner app-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={containerVariants}
      >
        <div className="experience__header">
          <motion.p className="experience__label" variants={revealVariants}>
            EXPERIENCE
          </motion.p>
          <motion.h2 className="experience__title" id="experience-title" variants={revealVariants}>
            My Journey Through Code and Creativity
          </motion.h2>
          <motion.p className="experience__description" variants={revealVariants}>
            A focused path of learning, building and improving through modern web
            development, full-stack projects and consistent practice.
          </motion.p>
        </div>

        <div className="experience__layout">
          <motion.div className="experience-timeline" variants={containerVariants}>
            <motion.div
              className="experience-timeline__line"
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {journeyItems.map((item, index) => (
              <motion.article
                className="experience-item"
                key={`${item.year}-${item.title}`}
                variants={revealVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="experience-item__marker" aria-hidden="true" />
                <div className="experience-card glass">
                  <div className="experience-card__border" aria-hidden="true" />
                  <span className="experience-card__year">{item.year}</span>
                  <h3>{item.title}</h3>
                  {item.subtitle ? <p className="experience-card__subtitle">{item.subtitle}</p> : null}
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.aside
            className="experience-focus glass"
            aria-labelledby="current-focus-title"
            variants={revealVariants}
            animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="experience-focus__border" aria-hidden="true" />
            <p>Current Focus</p>
            <h3 id="current-focus-title">Building stronger foundations every day</h3>
            <ul>
              {currentFocus.map((focus, index) => (
                <motion.li
                  key={focus}
                  animate={shouldReduceMotion ? undefined : { y: [0, index % 2 ? 5 : -5, 0] }}
                  transition={{
                    duration: 4.4 + index * 0.25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {focus}
                </motion.li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
}

export default Experience;
