import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { resumeHref } from '@data/navigation';
import './About.css';

const techChips = ['React', 'JavaScript', 'Node.js', 'MongoDB', 'Tailwind'];

const infoCards = [
  {
    title: 'Education',
    lines: ['BCA', 'TC Business School, Jaipur', 'Expected Graduation: 2027'],
  },
  {
    title: 'Experience',
    lines: ['Frontend Development', 'MERN Projects', 'Responsive Design'],
  },
  {
    title: 'Location',
    lines: ['Bharatpur, Rajasthan', 'Open to Internship'],
  },
];

const stats = [
  { label: 'Projects', value: 10, suffix: '+' },
  { label: 'Technologies', value: 8, suffix: '+' },
  { label: 'Learning', value: 1, suffix: '', display: 'Daily' },
  { label: 'CGPA', value: 8, suffix: '.0' },
];

const reveal = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedStat({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (stat.display) {
      return latest >= 1 ? stat.display : '';
    }

    return `${Math.round(latest)}${stat.suffix}`;
  });

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    if (shouldReduceMotion) {
      count.set(stat.value);
      return undefined;
    }

    const controls = animate(count, stat.value, {
      duration: 1.2,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    });

    return controls.stop;
  }, [count, index, isInView, shouldReduceMotion, stat.value]);

  return (
    <motion.div className="about-stat glass" ref={ref} variants={reveal}>
      <motion.strong>{rounded}</motion.strong>
      <span>{stat.label}</span>
    </motion.div>
  );
}

function About() {
  const shouldReduceMotion = useReducedMotion();

  function scrollToContact(event) {
    event.preventDefault();

    const target = document.getElementById('contact');

    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
      window.history.replaceState(null, '', '#contact');
    }
  }

  return (
    <section className="about section-spacing" id="about" aria-labelledby="about-title">
      <div className="about__glow about__glow--one" aria-hidden="true" />
      <div className="about__glow about__glow--two" aria-hidden="true" />

      <div className="about__inner app-container">
        <motion.div
          className="about__profile"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
        >
          <motion.div
            className="about-card glass"
            animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="about-card__border" aria-hidden="true" />
            <div className="about-card__portrait-wrap">
              <div className="about-card__portrait-glow" aria-hidden="true" />
              <div className="about-card__portrait" aria-label="Nitish Pal profile image placeholder" role="img">
                <span>NP</span>
              </div>
            </div>

            <div className="about-card__status">BCA Student &bull; Jaipur</div>

            {techChips.map((chip, index) => (
              <motion.span
                className={`about-card__chip about-card__chip--${index + 1}`}
                key={chip}
                animate={shouldReduceMotion ? undefined : { y: [0, index % 2 ? 8 : -8, 0] }}
                transition={{
                  duration: 4.6 + index * 0.35,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="about__content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.p className="about__label" variants={reveal}>
            ABOUT ME
          </motion.p>

          <motion.h2 className="about__title" id="about-title" variants={reveal}>
            Passionate Developer Creating Modern Web Experiences
          </motion.h2>

          <motion.p className="about__description" variants={reveal}>
            I&apos;m Nitish Pal, a BCA student specializing in Web Development. I enjoy
            building responsive, scalable and visually appealing applications using React,
            Tailwind CSS, Node.js, Express and MongoDB. I also have experience building
            and deploying full-stack applications using Vercel and Render, while creating
            user experiences that are both beautiful and functional.
          </motion.p>

          <motion.div className="about__cards" variants={reveal}>
            {infoCards.map((card) => (
              <article className="about-info glass" key={card.title}>
                <h3>{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </article>
            ))}
          </motion.div>

          <motion.div className="about__stats" variants={reveal}>
            {stats.map((stat, index) => (
              <AnimatedStat index={index} key={stat.label} stat={stat} />
            ))}
          </motion.div>

          <motion.div className="about__actions" variants={reveal}>
            <a className="btn btn-primary about__button" href={resumeHref} download>
              Download Resume
            </a>
            <a className="btn btn-ghost about__button" href="#contact" onClick={scrollToContact}>
              Let&apos;s Connect
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
