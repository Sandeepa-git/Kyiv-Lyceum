/**
 * Application configuration
 * Simple template config following bulletproof-react principles
 */
export const appConfig = {
  name: 'Ukrainian European School',
  description: 'Kyiv Lyceum "Ukrainian European School" - Excellence in education.',
  version: '1.0.0',

  // Social media links
  social: {
    facebook: 'https://facebook.com/ues.kyiv',
    instagram: 'https://instagram.com/ues.kyiv',
    telegram: 'https://t.me/ues_kyiv',
  },

  // Contact information
  contact: {
    email: 'kyivlyceum.ues@gmail.com',
    phone: '+38(093) 739-49-70',
    address: '27 Krakivska St., office 128, Kyiv, 02094, Ukraine',
  },

  // Navigation items
  navigation: {
    main: [
      { name: 'About', href: '/about' },
      { name: 'For Students', href: '/students' },
      { name: 'News', href: '/news' },
      { name: 'Contacts', href: '/contact' },
    ],
    auth: [
      { name: 'Online Platform', href: 'https://school-platform.link' },
    ],
  },

  // Branding
  branding: {
    logo: '/images/brand.svg',
    logoAlt: 'Ukrainian European School logo',
    favicon: '/favicon.ico',
  },
};

export default appConfig;