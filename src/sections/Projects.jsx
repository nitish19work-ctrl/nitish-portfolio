import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import taskTrackerImage from '@assets/images/projects/task-tracker.png';
import expenseTrackerImage from '@assets/images/projects/expense-tracker.png';
import beanBrewImage from '@assets/images/projects/bean-brew.png';
import passwordGeneratorImage from '@assets/images/projects/password-generator.png';
import todoAppImage from '@assets/images/projects/todo-app.png';
import './Projects.css';

const filters = ['All', 'Full Stack', 'Frontend'];

const featuredProjects = [
  {
    title: 'Task Tracker',
    category: 'Full Stack',
    description:
      'A modern full-stack task management application with authentication, task organization, intuitive dashboards and responsive user experience.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/nitish19work-ctrl/task-tracker',
    demo: 'https://task-tracker-red-seven-67.vercel.app/login',
    image: taskTrackerImage,
    accent: 'primary',
  },
  {
    title: 'Expense Tracker (MERN)',
    category: 'Full Stack',
    description:
      'A full-stack expense tracking application featuring authentication, dashboards, income and expense management, analytics and responsive UI.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Recharts', 'Tailwind CSS'],
    github: 'https://github.com/nitish19work-ctrl/expense-tracker-mern',
    demo: 'https://expensetrackermern11.netlify.app/login',
    image: expenseTrackerImage,
    accent: 'secondary',
  },
];

const otherProjects = [
  {
    title: 'Bean Brew Coffee',
    category: 'Frontend',
    description:
      'A premium responsive coffee shop landing page with modern UI and smooth interactions.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://nitish19work-ctrl.github.io/bean-brew-coffee-shop-website/',
    image: beanBrewImage,
    accent: 'warm',
  },
  {
    title: 'Password Generator',
    category: 'Frontend',
    description: 'Generate secure passwords with customizable length and character options.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://nitish19work-ctrl.github.io/password-generator/',
    image: passwordGeneratorImage,
    accent: 'primary',
  },
  {
    title: 'Todo App',
    category: 'Frontend',
    description:
      'A clean responsive task management application for organizing daily activities.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://nitish19work-ctrl.github.io/to-do-list-app/',
    image: todoAppImage,
    accent: 'secondary',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
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

function BrowserMockup({ project, compact = false }) {
  return (
    <div
      className={`project-browser project-browser--${project.accent} ${
        compact ? 'project-browser--compact' : ''
      }`}
    >
      <div className="project-browser__bar">
        <span />
        <span />
        <span />
      </div>
      <div className="project-browser__viewport">
        <img
          src={project.image}
          alt={`${project.title} project screenshot`}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

function ProjectActions({ project }) {
  return (
    <div className="project-actions">
      <a
        className="btn btn-primary project-actions__button"
        href={project.demo}
        target="_blank"
        rel="noreferrer"
      >
        <FiExternalLink aria-hidden="true" />
        Live Demo
      </a>
      {project.github ? (
        <a
          className="btn btn-ghost project-actions__button"
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          <FiGithub aria-hidden="true" />
          GitHub
        </a>
      ) : null}
    </div>
  );
}

function TechBadges({ tech }) {
  return (
    <ul className="project-tech" aria-label="Technology stack">
      {tech.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function FeaturedProjectCard({ project }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card project-card--featured glass"
      variants={revealVariants}
      whileHover={shouldReduceMotion ? undefined : { y: -10, scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-card__border" aria-hidden="true" />
      <BrowserMockup project={project} />
      <div className="project-card__content">
        <p className="project-card__type">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <TechBadges tech={project.tech} />
        <ProjectActions project={project} />
      </div>
    </motion.article>
  );
}

function CompactProjectCard({ project }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card project-card--compact glass"
      variants={revealVariants}
      whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.015 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-card__border" aria-hidden="true" />
      <BrowserMockup compact project={project} />
      <div className="project-card__content">
        <p className="project-card__type">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <TechBadges tech={project.tech} />
        <ProjectActions project={project} />
      </div>
    </motion.article>
  );
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  const visibleFeatured = useMemo(
    () =>
      featuredProjects.filter(
        (project) => activeFilter === 'All' || project.category === activeFilter,
      ),
    [activeFilter],
  );

  const visibleOther = useMemo(
    () =>
      otherProjects.filter(
        (project) => activeFilter === 'All' || project.category === activeFilter,
      ),
    [activeFilter],
  );

  const particleStyles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        left: `${(index * 41) % 100}%`,
        top: `${(index * 29) % 100}%`,
        duration: 4.8 + (index % 5),
        opacity: 0.18 + (index % 4) * 0.08,
      })),
    [],
  );

  return (
    <section className="projects section-spacing" id="projects" aria-labelledby="projects-title">
      <motion.div
        className="projects__mesh"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />
      <div className="projects__glow projects__glow--one" aria-hidden="true" />
      <div className="projects__glow projects__glow--two" aria-hidden="true" />

      <div className="projects__particles" aria-hidden="true">
        {particleStyles.map((particle, index) => (
          <motion.span
            key={index}
            style={{ left: particle.left, top: particle.top, opacity: particle.opacity }}
            animate={shouldReduceMotion ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="projects__inner app-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={containerVariants}
      >
        <div className="projects__header">
          <motion.p className="projects__label" variants={revealVariants}>
            FEATURED PROJECTS
          </motion.p>
          <motion.h2 className="projects__title" id="projects-title" variants={revealVariants}>
            Projects That Turn Ideas Into Reality
          </motion.h2>
          <motion.p className="projects__description" variants={revealVariants}>
            A collection of real-world projects demonstrating my frontend development,
            full-stack engineering and modern UI/UX skills.
          </motion.p>
        </div>

        <motion.div className="projects__filters" variants={revealVariants} role="tablist">
          {filters.map((filter) => (
            <button
              aria-selected={activeFilter === filter}
              className="projects__filter"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              role="tab"
              type="button"
            >
              {activeFilter === filter ? (
                <motion.span
                  className="projects__filter-active"
                  layoutId="activeProjectFilter"
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
              <span>{filter}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            animate="visible"
            className="projects__groups"
            exit={{ opacity: 0, y: 18 }}
            initial="hidden"
            key={activeFilter}
            variants={containerVariants}
          >
            {visibleFeatured.length ? (
              <div className="projects__featured-grid">
                {visibleFeatured.map((project) => (
                  <FeaturedProjectCard key={project.title} project={project} />
                ))}
              </div>
            ) : null}

            {visibleOther.length ? (
              <div className="projects__other">
                <motion.h3 variants={revealVariants}>Other Projects</motion.h3>
                <div className="projects__other-grid">
                  {visibleOther.map((project) => (
                    <CompactProjectCard key={project.title} project={project} />
                  ))}
                </div>
              </div>
            ) : null}

            {!visibleFeatured.length && !visibleOther.length ? (
              <motion.p className="projects__empty glass" variants={revealVariants}>
                No projects found for this filter.
              </motion.p>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default Projects;
