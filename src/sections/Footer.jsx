import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import './Footer.css';

const quickLinks = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/nitish19work-ctrl',
    Icon: FiGithub,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nitishpal-dev',
    Icon: FiLinkedin,
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:nitish19work@gmail.com',
    Icon: FiMail,
  },
];

const footerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const revealVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
};

function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 520);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToSection(event, link) {
    event.preventDefault();

    const target = document.getElementById(link.id);

    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
      window.history.replaceState(null, '', link.href);
      return;
    }

    window.location.hash = link.id;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    window.history.replaceState(null, '', '#home');
    document.getElementById('home')?.focus?.({ preventScroll: true });
  }

  return (
    <>
      <footer className="footer" aria-labelledby="footer-brand">
        <motion.div
          className="footer-divider app-container"
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0.68 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            animate={shouldReduceMotion ? undefined : { x: ['-18%', '118%'] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        <div className="footer__glow footer__glow--one" aria-hidden="true" />
        <div className="footer__glow footer__glow--two" aria-hidden="true" />

        <motion.div
          className="footer__inner app-container glass"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={footerVariants}
        >
          <div className="footer__border" aria-hidden="true" />

          <motion.div className="footer__brand" variants={revealVariants}>
            <a
              className="footer__logo"
              href="#home"
              id="footer-brand"
              onClick={(event) => scrollToSection(event, quickLinks[0])}
            >
              Nitish<span>.</span>
            </a>
            <p>Frontend &amp; MERN Stack Developer passionate about building beautiful web experiences.</p>
          </motion.div>

          <motion.nav className="footer__nav" aria-label="Footer quick links" variants={revealVariants}>
            <h2>Quick Links</h2>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} onClick={(event) => scrollToSection(event, link)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div className="footer__socials" variants={revealVariants}>
            <h2>Social Links</h2>
            <ul>
              {socialLinks.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                  >
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="footer__bottom" variants={revealVariants}>
            <p>Copyright 2026 Nitish Pal</p>
            <p>Built with React, Tailwind CSS and Framer Motion.</p>
          </motion.div>
        </motion.div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            aria-label="Scroll to top"
            className="scroll-top glass"
            type="button"
            onClick={scrollToTop}
            initial={{ y: 18, opacity: 0, scale: 0.88 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.05 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          >
            <FiArrowUp aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default Footer;
