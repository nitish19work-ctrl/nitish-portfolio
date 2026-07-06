import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import {
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import './Skills.css';

const sphereSkills = [
  { name: 'React', Icon: SiReact, color: '#61dafb' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e' },
  { name: 'HTML5', Icon: SiHtml5, color: '#e34f26' },
  { name: 'CSS3', Icon: FaCss3Alt, color: '#1572b6' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38bdf8' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5fa04e' },
  { name: 'Express.js', Icon: SiExpress, color: '#f8fafc' },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47a248' },
  { name: 'Git', Icon: SiGit, color: '#f05032' },
  { name: 'GitHub', Icon: SiGithub, color: '#f8fafc' },
  { name: 'VS Code', Icon: VscVscode, color: '#007acc' },
];

const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML5', percent: 92 },
      { name: 'CSS3', percent: 88 },
      { name: 'JavaScript', percent: 90 },
      { name: 'React', percent: 85 },
      { name: 'Tailwind CSS', percent: 86 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', percent: 75 },
      { name: 'Express.js', percent: 74 },
      { name: 'REST APIs', percent: 78 },
      { name: 'Authentication', percent: 72 },
    ],
  },
  {
    title: 'Database',
    skills: [{ name: 'MongoDB', percent: 70 }],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', percent: 80 },
      { name: 'GitHub', percent: 82 },
      { name: 'VS Code', percent: 88 },
      { name: 'Postman', percent: 76 },
      { name: 'npm', percent: 80 },
    ],
  },
  {
    title: 'Deployment',
    skills: [
      { name: 'Vercel', percent: 82 },
      { name: 'Render', percent: 76 },
      { name: 'Netlify', percent: 78 },
    ],
  },
];

const learningItems = ['TypeScript', 'Next.js', 'DSA', 'System Design'];

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

function SkillMeter({ skill, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const width = useTransform(progress, (latest) => `${latest}%`);
  const rounded = useTransform(progress, (latest) => `${Math.round(latest)}%`);

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    if (shouldReduceMotion) {
      progress.set(skill.percent);
      return undefined;
    }

    const controls = animate(progress, skill.percent, {
      duration: 1.05,
      delay: index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    });

    return controls.stop;
  }, [index, isInView, progress, shouldReduceMotion, skill.percent]);

  return (
    <div className="skill-meter" ref={ref}>
      <div className="skill-meter__top">
        <span>{skill.name}</span>
        <motion.span>{rounded}</motion.span>
      </div>
      <div
        className="skill-meter__track"
        role="progressbar"
        aria-label={`${skill.name} proficiency`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={skill.percent}
      >
        <motion.span style={{ width }} />
      </div>
    </div>
  );
}

function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSkill, setActiveSkill] = useState('React');

  return (
    <section className="skills section-spacing" id="skills" aria-labelledby="skills-title">
      <motion.div
        className="skills__mesh"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
        }
        transition={{ duration: 17, repeat: Infinity, ease: 'linear' }}
      />
      <div className="skills__glow skills__glow--one" aria-hidden="true" />
      <div className="skills__glow skills__glow--two" aria-hidden="true" />

      <div className="skills__particles" aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => (
          <motion.span
            key={index}
            style={{
              left: `${(index * 47) % 100}%`,
              top: `${(index * 33) % 100}%`,
              opacity: 0.16 + (index % 4) * 0.08,
            }}
            animate={shouldReduceMotion ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 5 + (index % 5), repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="skills__inner app-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={containerVariants}
      >
        <div className="skills__header">
          <motion.p className="skills__label" variants={revealVariants}>
            TECH STACK
          </motion.p>
          <motion.h2 className="skills__title" id="skills-title" variants={revealVariants}>
            Technologies I Work With
          </motion.h2>
          <motion.p className="skills__description" variants={revealVariants}>
            A collection of technologies, tools and frameworks I use to build modern,
            scalable and responsive web applications.
          </motion.p>
        </div>

        <div className="skills__layout">
          <motion.div className="skills-sphere-wrap" variants={revealVariants}>
            <div className="skills-sphere glass" aria-label="Interactive technology sphere">
              <div className="skills-sphere__border" aria-hidden="true" />
              <motion.div
                className="skills-sphere__orbit"
                animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
              >
                {sphereSkills.map(({ name, Icon, color }, index) => {
                  const angle = (360 / sphereSkills.length) * index;

                  return (
                    <motion.button
                      aria-label={name}
                      className="skills-sphere__icon"
                      key={name}
                      onBlur={() => setActiveSkill('React')}
                      onFocus={() => setActiveSkill(name)}
                      onMouseEnter={() => setActiveSkill(name)}
                      style={{
                        '--skill-angle': `${angle}deg`,
                        '--skill-color': color,
                      }}
                      type="button"
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.18 }}
                      whileFocus={shouldReduceMotion ? undefined : { scale: 1.18 }}
                    >
                      <Icon aria-hidden="true" />
                    </motion.button>
                  );
                })}
              </motion.div>

              <div className="skills-sphere__core">
                <span>{activeSkill}</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="skills__cards" variants={containerVariants}>
            {skillGroups.map((group) => (
              <motion.article className="skills-card glass" key={group.title} variants={revealVariants}>
                <div className="skills-card__border" aria-hidden="true" />
                <h3>{group.title}</h3>
                <div className="skills-card__meters">
                  {group.skills.map((skill, index) => (
                    <SkillMeter index={index} key={skill.name} skill={skill} />
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <motion.div className="skills-learning glass" variants={revealVariants}>
          <div className="skills-learning__border" aria-hidden="true" />
          <p>Currently Learning</p>
          <ul>
            {learningItems.map((item, index) => (
              <motion.li
                key={item}
                animate={shouldReduceMotion ? undefined : { y: [0, index % 2 ? 5 : -5, 0] }}
                transition={{
                  duration: 4.4 + index * 0.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Skills;
