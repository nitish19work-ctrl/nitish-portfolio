import { lazy, Suspense } from 'react';
import Navbar from '@components/Navbar';
import Loader from '@components/Loader';
import Hero from '@sections/Hero';
import { useLenis } from '@hooks/useLenis';

const About = lazy(() => import('@sections/About'));
const Skills = lazy(() => import('@sections/Skills'));
const Projects = lazy(() => import('@sections/Projects'));
const Experience = lazy(() => import('@sections/Experience'));
const Contact = lazy(() => import('@sections/Contact'));
const Footer = lazy(() => import('@sections/Footer'));

function App() {
  useLenis();

  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
