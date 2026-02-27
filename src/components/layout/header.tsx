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
                <Image src="/Home.jpeg" alt="UES Logo" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 object-contain mr-2" />
                <span className="text-base xs:text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500">
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
            <div className="flex items-center space-x-2 sm:space-x-4">
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
                className="lg:hidden flex items-center justify-center px-3 h-10 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors mr-1"
                onClick={toggleMobileMenu}
                aria-label="Current language"
              >
                <span className="text-lg mr-1.5">{locales.find(l => l.code === locale)?.flag}</span>
                <span className="text-[10px] uppercase font-bold text-gray-500">{locale}</span>
              </button>

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
          <nav className={`relative ml-auto flex flex-col py-8 px-5 sm:px-8 w-[300px] max-w-[85vw] min-h-full bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Image src="/Home.jpeg" alt="UES Logo" width={32} height={32} className="w-8 h-8 object-contain mr-2" />
                <span className="text-lg font-bold text-blue-600">UES Lyceum</span>
              </div>
              <button onClick={closeMobileMenu} className="p-3 hover:bg-gray-100 rounded-xl transition-colors" aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Language Switcher - Moved to top for better visibility on mobile */}
            <div className="mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100">
              <div className="flex gap-1">
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => { setLocale(loc.code); closeMobileMenu(); }}
                    className={`flex-1 flex flex-col items-center justify-center py-3 px-1 rounded-xl transition-all ${locale === loc.code ? 'bg-white shadow-md text-blue-600 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <span className="text-xl mb-1">{loc.flag}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest">{loc.code}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-2 mb-10">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Main Menu</p>
              {navigationItems.map((item) => (
                <Link
                  key={item.to}
                  className={`flex items-center text-lg font-semibold p-4 rounded-2xl transition-all duration-200 ${isActiveRoute(item.to) ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
                  href={item.to}
                  onClick={closeMobileMenu}
                >
                  <span className="flex-1">{t(item.labelKey)}</span>
                  {isActiveRoute(item.to) && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="ml-2">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>

            <div className="mb-10 px-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contact</p>
              <div className="flex flex-col space-y-6">
                <div className="flex items-start">
                  <span className="mr-3 text-lg">📧</span>
                  <div>
                    <div className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Email</div>
                    <a href="mailto:kyivlyceum.ues@gmail.com" className="text-[13px] xs:text-sm md:text-base hover:underline break-all">kyivlyceum.ues@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-lg">📞</span>
                  <div>
                    <div className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Phone</div>
                    <a href="tel:+380937394970" className="text-[13px] xs:text-sm md:text-base hover:underline">+38(093) 739-49-70</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-lg">👤</span>
                  <div>
                    <div className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Director</div>
                    <div className="text-[13px] xs:text-sm md:text-base font-bold">Anastasia SHKURSKA</div>
                  </div>
                </div>
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