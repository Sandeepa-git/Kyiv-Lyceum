'use client';

import { useState, useCallback, memo, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from 'next';
import Image from "next/image";
import { useLocale } from "@/contexts/LocaleContext";

interface NavigationItem {
  to: Route;
  labelKey: string;
}

/**
 * Main navigation header component
 * Provides responsive navigation with mobile menu support
 */
const Header = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Scroll observer to track active section
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const sections = ['about', 'news', 'students', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            return;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if current route is active
  const isActiveRoute = useCallback((path: string) => {
    if (path.startsWith('/#')) {
      return activeSection === path.substring(2);
    }
    return pathname === path && activeSection === '';
  }, [pathname, activeSection]);

  // Navigation items based on user request (simplified to internal anchors)
  const getNavigationRoutes = (): NavigationItem[] => {
    return [
      { to: '/' as Route, labelKey: 'nav.home' },
      { to: '/#about' as Route, labelKey: 'nav.about' },
      { to: '/#news' as Route, labelKey: 'nav.news' },
      { to: '/#students' as Route, labelKey: 'nav.students' },
      { to: '/#contact' as Route, labelKey: 'nav.contacts' },
    ];
  };

  const navigationItems = getNavigationRoutes();

  const locales = [
    { code: 'en', flag: '🇬🇧' },
    { code: 'fr', flag: '🇫🇷' },
    { code: 'lt', flag: '🇱🇹' },
    { code: 'uk', flag: '🇺🇦' }
  ] as const;

  return (
    <header role="banner" className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="relative border-b border-gray-100" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4">
          <div className="relative flex h-20 items-center justify-between">
            {/* Logo */}
            <Link className="inline-block" href="/" aria-label="Ukrainian European School - Home" onClick={() => setActiveSection('')}>
              <div className="flex items-center">
                <Image src="/Home.jpeg" alt="UES Logo" width={40} height={40} className="w-10 h-10 object-contain mr-3" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500">
                  UES Lyceum
                </span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.to}
                  className={`inline-block font-medium transition duration-200 focus:outline-none hover:text-blue-600 relative py-2 ${isActiveRoute(item.to) ? 'text-blue-600' : 'text-gray-600'}`}
                  href={item.to}
                  aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                >
                  {t(item.labelKey)}
                  {isActiveRoute(item.to) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-in fade-in zoom-in duration-300"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Language Switcher & Mobile toggle */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center bg-gray-50 p-1 rounded-lg border border-gray-200">
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => setLocale(loc.code)}
                    className={`px-3 py-1 rounded-md text-sm transition-all ${locale === loc.code ? 'bg-white shadow-sm text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-900 text-xs'}`}
                  >
                    {loc.flag}
                  </button>
                ))}
              </div>

              <Link
                className="hidden md:inline-flex items-center justify-center h-10 px-4 text-center leading-loose text-sm text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg transition duration-200"
                href="https://school-platform.link"
              >
                {t('platform.cta')}
              </Link>

              <button
                className="lg:hidden flex items-center justify-center h-10 w-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300">
                  <path d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} fixed inset-0 z-50 transition-all duration-300 lg:hidden`}
          role="dialog"
          aria-modal="true"
        >
          <div className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closeMobileMenu}></div>
          <nav className={`relative ml-auto flex flex-col py-8 px-6 w-[280px] min-h-full bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center">
                <Image src="/Home.jpeg" alt="UES Logo" width={32} height={32} className="w-8 h-8 object-contain mr-2" />
                <span className="text-lg font-bold text-blue-600">UES Lyceum</span>
              </div>
              <button onClick={closeMobileMenu} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col space-y-4 mb-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.to}
                  className={`text-lg font-medium p-2 rounded-xl transition-all ${isActiveRoute(item.to) ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50'}`}
                  href={item.to}
                  onClick={closeMobileMenu}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>

            <div className="mt-8 border-t pt-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Language</p>
              <div className="flex flex-wrap gap-2">
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => { setLocale(loc.code); closeMobileMenu(); }}
                    className={`flex-1 flex items-center justify-center py-2 px-3 rounded-xl border transition-all ${locale === loc.code ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold' : 'border-gray-100 bg-gray-50 text-gray-500'}`}
                  >
                    <span className="text-sm uppercase">{loc.code}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-8">
              <Link
                className="flex items-center justify-center w-full py-4 text-center text-sm text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-2xl transition duration-200 shadow-lg shadow-blue-200"
                href="https://school-platform.link"
                onClick={closeMobileMenu}
              >
                {t('platform.cta')}
              </Link>
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;