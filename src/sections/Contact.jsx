import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FiArrowRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiSend,
} from 'react-icons/fi';
import { resumeHref } from '@data/navigation';
import './Contact.css';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/nitish19work-ctrl',
    Icon: FiGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nitishpal-dev',
    Icon: FiLinkedin,
  },
];

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

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

function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [form, setForm] = useState(initialForm);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        left: `${(index * 41) % 100}%`,
        top: `${(index * 37) % 100}%`,
        opacity: 0.16 + (index % 4) * 0.08,
        duration: 5 + (index % 5),
      })),
    [],
  );

  function updateField(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const subject = encodeURIComponent(form.subject || 'Portfolio inquiry');
    const body = encodeURIComponent(
      `Hi Nitish,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`,
    );

    window.location.href = `mailto:nitish19work@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="contact section-spacing" id="contact" aria-labelledby="contact-title">
      <motion.div
        className="contact__mesh"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <div className="contact__glow contact__glow--one" aria-hidden="true" />
      <div className="contact__glow contact__glow--two" aria-hidden="true" />

      <div className="contact__particles" aria-hidden="true">
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            style={{ left: particle.left, top: particle.top, opacity: particle.opacity }}
            animate={shouldReduceMotion ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="contact__inner app-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={containerVariants}
      >
        <div className="contact__header">
          <motion.p className="contact__label" variants={revealVariants}>
            GET IN TOUCH
          </motion.p>
          <motion.h2 className="contact__title" id="contact-title" variants={revealVariants}>
            Let&apos;s Build Something Amazing Together
          </motion.h2>
          <motion.p className="contact__description" variants={revealVariants}>
            I&apos;m currently open to internships, freelance projects and exciting
            collaborations. If you have an idea, opportunity or simply want to connect,
            I&apos;d love to hear from you.
          </motion.p>
        </div>

        <div className="contact__layout">
          <motion.aside className="contact-info glass" variants={revealVariants}>
            <div className="contact-info__border" aria-hidden="true" />
            <div className="contact-info__item">
              <span className="contact-info__icon" aria-hidden="true">
                <FiMail />
              </span>
              <div>
                <p>Email</p>
                <a href="mailto:nitish19work@gmail.com">nitish19work@gmail.com</a>
              </div>
            </div>

            <div className="contact-info__item">
              <span className="contact-info__icon" aria-hidden="true">
                <FiMapPin />
              </span>
              <div>
                <p>Location</p>
                <span>Bharatpur, Rajasthan, India</span>
              </div>
            </div>

            <div className="contact-info__status" aria-label="Availability status">
              <p>Status</p>
              <span>Open to Internships - Freelance - Collaboration</span>
            </div>

            <div className="contact-info__socials">
              <p>Connect</p>
              <div aria-label="Social links">
                {socialLinks.map(({ label, href, Icon }) => (
                  <motion.a
                    aria-label={label}
                    className="contact-info__social"
                    href={href}
                    key={label}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.06 }}
                    whileFocus={shouldReduceMotion ? undefined : { y: -4, scale: 1.06 }}
                  >
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <blockquote>
              &quot;Building beautiful digital experiences, one project at a time.&quot;
            </blockquote>
          </motion.aside>

          <motion.div className="contact__stack" variants={containerVariants}>
            <motion.form
              className="contact-form glass"
              variants={revealVariants}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="contact-form__border" aria-hidden="true" />
              <div className="contact-form__field">
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={updateField}
                  placeholder=" "
                  autoComplete="name"
                  required
                />
                <label htmlFor="contact-name">Full Name</label>
              </div>

              <div className="contact-form__field">
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder=" "
                  autoComplete="email"
                  required
                />
                <label htmlFor="contact-email">Email</label>
              </div>

              <div className="contact-form__field">
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={updateField}
                  placeholder=" "
                  required
                />
                <label htmlFor="contact-subject">Subject</label>
              </div>

              <div className="contact-form__field contact-form__field--message">
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  placeholder=" "
                  rows="6"
                  required
                />
                <label htmlFor="contact-message">Message</label>
              </div>

              <motion.button
                className="contact-form__submit btn btn-primary"
                type="submit"
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                <FiSend aria-hidden="true" />
                Send Message
              </motion.button>
            </motion.form>

            <motion.div className="contact-cta glass" variants={revealVariants}>
              <div className="contact-cta__border" aria-hidden="true" />
              <div>
                <h3>Ready to collaborate?</h3>
                <p>Grab my resume or explore my GitHub to see what I&apos;m building.</p>
              </div>
              <div className="contact-cta__actions">
                <a className="btn btn-primary" href={resumeHref} download>
                  <FiDownload aria-hidden="true" />
                  Download Resume
                </a>
                <a
                  className="btn btn-ghost"
                  href="https://github.com/nitish19work-ctrl"
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub
                  <FiArrowRight aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
