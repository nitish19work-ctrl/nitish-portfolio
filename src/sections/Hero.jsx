import { useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { SiJavascript, SiMongodb, SiNodedotjs, SiReact } from 'react-icons/si';
import './Hero.css';

const techIcons = [
  { label: 'React', Icon: SiReact, className: 'hero-visual__icon--react' },
  { label: 'JavaScript', Icon: SiJavascript, className: 'hero-visual__icon--javascript' },
  { label: 'Node.js', Icon: SiNodedotjs, className: 'hero-visual__icon--node' },
  { label: 'MongoDB', Icon: SiMongodb, className: 'hero-visual__icon--mongo' },
];

const codeLines = [
  { token: 'const', text: 'developer = {' },
  { token: 'role', text: "'Frontend + MERN'," },
  { token: 'stack', text: "['React', 'Node', 'MongoDB']," },
  { token: 'focus', text: "'fast, polished experiences'," },
  { token: 'end', text: '};' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.18,
    },
  },
};

const revealVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 22, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 22, mass: 0.5 });
  const visualX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const visualY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);
  const visualRotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const visualRotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 53) % 100}%`,
        size: `${2 + (index % 4)}px`,
        opacity: 0.22 + (index % 5) * 0.08,
        duration: 5 + (index % 6),
      })),
    [],
  );

  function handlePointerMove(event) {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(x);
    pointerY.set(y);
  }

  function scrollToSection(event, id) {
    event.preventDefault();

    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    }
  }

  return (
    <section
      className="hero"
      id="home"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      tabIndex={-1}
    >
      <motion.div
        className="hero__mesh"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                backgroundPosition: ['0% 40%', '100% 60%', '0% 40%'],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      <div className="hero__lights" aria-hidden="true">
        <motion.span
          className="hero__glow hero__glow--primary"
          animate={shouldReduceMotion ? undefined : { x: [0, 28, -18, 0], y: [0, -18, 24, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="hero__glow hero__glow--secondary"
          animate={shouldReduceMotion ? undefined : { x: [0, -24, 18, 0], y: [0, 22, -16, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="hero__particles" aria-hidden="true">
        {particles.map((particle) => (
          <motion.span
            className="hero__particle"
            key={particle.id}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            animate={shouldReduceMotion ? undefined : { y: [0, -18, 0], opacity: [particle.opacity, 0.8, particle.opacity] }}
            transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="hero__inner app-container">
        <motion.div
          className="hero__content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p className="hero__badge glass" variants={revealVariants}>
            Available for Internship
          </motion.p>

          <motion.h1 className="hero__title" id="hero-title" variants={revealVariants}>
            <span>Hi, I&apos;m </span>
            <span className="gradient-text hero__gradient">Nitish Pal</span>
            <span>Frontend &amp; </span>
            <span className="gradient-text hero__gradient">MERN</span>
            <span> Stack Developer</span>
          </motion.h1>

          <motion.p className="hero__description" variants={revealVariants}>
            I build beautiful, fast and scalable web experiences with React, Tailwind and
            Node.js.
          </motion.p>

          <motion.div className="hero__actions" variants={revealVariants}>
            <a className="btn btn-primary hero__button" href="#projects" onClick={(event) => scrollToSection(event, 'projects')}>
              View Projects
            </a>
            <a className="btn btn-ghost hero__button" href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual-wrap"
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="hero-visual"
            style={{
              x: shouldReduceMotion ? 0 : visualX,
              y: shouldReduceMotion ? 0 : visualY,
              rotateX: shouldReduceMotion ? 0 : visualRotateX,
              rotateY: shouldReduceMotion ? 0 : visualRotateY,
            }}
          >
            <motion.div
              className="hero-visual__blob hero-visual__blob--one"
              aria-hidden="true"
              animate={shouldReduceMotion ? undefined : { y: [0, -18, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="hero-visual__blob hero-visual__blob--two"
              aria-hidden="true"
              animate={shouldReduceMotion ? undefined : { y: [0, 16, 0], scale: [1, 0.95, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="hero-visual__code glass"
              animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="hero-visual__code-top">
                <span />
                <span />
                <span />
              </div>
              <pre aria-label="Code sample">
                {codeLines.map((line) => (
                  <code key={line.token}>
                    <span>{line.token}</span> {line.text}
                  </code>
                ))}
              </pre>
            </motion.div>

            <motion.div
              className="hero-visual__laptop"
              animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              aria-label="Developer laptop illustration"
              role="img"
            >
              <div className="hero-visual__screen">
                <div className="hero-visual__screen-grid" />
                <div className="hero-editor" aria-hidden="true">
                  <div className="hero-editor__titlebar">
                    <div className="hero-editor__controls">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="hero-editor__crumb">nitish-portfolio / src</div>
                    <div className="hero-editor__branch">main</div>
                  </div>

                  <div className="hero-editor__body">
                    <aside className="hero-editor__explorer">
                      <p>Explorer</p>
                      <ul>
                        <li className="hero-editor__folder">src</li>
                        <li className="hero-editor__file hero-editor__file--active">App.jsx</li>
                        <li className="hero-editor__file">Hero.jsx</li>
                        <li className="hero-editor__file">Navbar.jsx</li>
                      </ul>
                    </aside>

                    <div className="hero-editor__workspace">
                      <div className="hero-editor__tabs">
                        <span className="hero-editor__tab hero-editor__tab--active">App.jsx</span>
                        <span className="hero-editor__tab">Hero.jsx</span>
                        <span className="hero-editor__tab">Navbar.jsx</span>
                      </div>

                      <pre className="hero-editor__code">
                        <code>
                          <span className="line"><span className="num">01</span><span className="keyword">import</span> <span className="name">Hero</span> <span className="keyword">from</span> <span className="string">&apos;./Hero&apos;</span>;</span>
                          <span className="line"><span className="num">02</span><span className="keyword">import</span> <span className="name">Navbar</span> <span className="keyword">from</span> <span className="string">&apos;./Navbar&apos;</span>;</span>
                          <span className="line"><span className="num">03</span></span>
                          <span className="line"><span className="num">04</span><span className="keyword">function</span> <span className="name">App</span>() {'{'}</span>
                          <span className="line"><span className="num">05</span>  <span className="keyword">return</span> <span className="tag">&lt;main&gt;</span></span>
                          <span className="line"><span className="num">06</span>    <span className="tag">&lt;Navbar</span> <span className="attr">fixed</span> <span className="tag">/&gt;</span></span>
                          <span className="line"><span className="num">07</span>    <span className="tag">&lt;Hero</span> <span className="attr">polished</span> <span className="tag">/&gt;</span></span>
                          <span className="line"><span className="num">08</span>  <span className="tag">&lt;/main&gt;</span>;</span>
                          <span className="line"><span className="num">09</span>{'}'}</span>
                        </code>
                      </pre>

                      <div className="hero-editor__terminal">
                        <div className="hero-editor__terminal-top">
                          <span>Terminal</span>
                          <span className="hero-editor__status">Build successful</span>
                        </div>
                        <p><span>$</span> npm run dev</p>
                        <p className="hero-editor__success">ready in 420ms - local:5173</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-visual__base" />
            </motion.div>

            {techIcons.map(({ label, Icon, className }, index) => (
              <motion.div
                aria-label={label}
                className={`hero-visual__icon ${className}`}
                key={label}
                role="img"
                animate={shouldReduceMotion ? undefined : { y: [0, index % 2 ? 14 : -14, 0], rotate: [0, index % 2 ? -5 : 5, 0] }}
                transition={{ duration: 4.8 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Icon aria-hidden="true" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        className="hero__scroll"
        href="#about"
        onClick={(event) => scrollToSection(event, 'about')}
        aria-label="Scroll to About section"
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span />
      </motion.a>
    </section>
  );
}

export default Hero;
