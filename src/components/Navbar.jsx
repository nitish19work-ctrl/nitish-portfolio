import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { navItems, resumeDownloadName, resumeHref } from '@data/navigation';
import './Navbar.css';

const SCROLLED_THRESHOLD = 24;
const HIDE_THRESHOLD = 120;

function Navbar() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > previousScrollY;

      setIsScrolled(currentScrollY > SCROLLED_THRESHOLD);
      setIsHidden(scrollingDown && currentScrollY > HIDE_THRESHOLD && !isMenuOpen);
      previousScrollY = currentScrollY;
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  function scrollToSection(event, item) {
    event.preventDefault();
    setActiveSection(item.id);
    setIsMenuOpen(false);

    const target = document.getElementById(item.id);

    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
      window.history.replaceState(null, '', item.href);
      return;
    }

    window.location.hash = item.id;
  }

  function handleResumeClick(event) {
    if (!resumeHref) {
      event.preventDefault();
    }
  }

  return (
    <motion.header
      className={`navbar ${isScrolled ? 'navbar--scrolled glass' : ''}`}
      initial={false}
      animate={{ y: isHidden ? '-112%' : 0 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="navbar__inner app-container" aria-label="Primary navigation">
        <a
          className="navbar__logo"
          href="#home"
          onClick={(event) => scrollToSection(event, navItems[0])}
        >
          Nitish<span>.</span>
        </a>

        <div className="navbar__links" aria-label="Desktop navigation">
          {navItems.map((item) => (
            <a
              aria-current={activeSection === item.id ? 'page' : undefined}
              className="navbar__link"
              href={item.href}
              key={item.id}
              onClick={(event) => scrollToSection(event, item)}
            >
              {item.label}
              <span className="navbar__underline" />
            </a>
          ))}
        </div>

        <a
          aria-disabled={!resumeHref}
          className="navbar__resume btn btn-primary"
          href={resumeHref}
          download={resumeDownloadName}
          onClick={handleResumeClick}
        >
          Resume
        </a>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="navbar__toggle"
          type="button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="mobile-nav"
            exit={{ opacity: 0 }}
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              className="mobile-nav__panel"
              exit={{ y: -18, opacity: 0 }}
              initial={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  animate={{ y: 0, opacity: 1 }}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  className="mobile-nav__link"
                  href={item.href}
                  initial={{ y: 18, opacity: 0 }}
                  key={item.id}
                  onClick={(event) => scrollToSection(event, item)}
                  transition={{ delay: 0.04 * index, duration: 0.32 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                animate={{ y: 0, opacity: 1 }}
                aria-disabled={!resumeHref}
                className="mobile-nav__resume btn btn-primary"
                href={resumeHref}
                download={resumeDownloadName}
                initial={{ y: 18, opacity: 0 }}
                onClick={handleResumeClick}
                transition={{ delay: 0.26, duration: 0.32 }}
              >
                Resume
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
