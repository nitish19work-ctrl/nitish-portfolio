export const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const resumeModules = import.meta.glob('../assets/resume/resume.pdf', {
  eager: true,
  import: 'default',
  query: '?url',
});

const resumeAsset = resumeModules['../assets/resume/resume.pdf'];

// TODO: Add src/assets/resume/resume.pdf so resume buttons download the actual PDF.
export const resumeHref = typeof resumeAsset === 'string' ? resumeAsset : undefined;
export const resumeDownloadName = 'Nitish_Pal_Resume.pdf';
