'use client';

import Link from 'next/link';
import { useLocale } from "@/contexts/LocaleContext";

/**
 * Footer component with school information and legal details
 */
function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4 mb-12">
          {/* School Info */}
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-blue-600">UES Lyceum</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm">
              {t('hero.subtitle')}
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p className="font-bold text-gray-700">{t('footer.director')}</p>
              <p>{t('footer.address')}</p>
              <p>{t('footer.code')}</p>
              <p>{t('footer.iban')}</p>
              <p>{t('footer.bank')}</p>
              <div className="flex space-x-4 mt-4">
                <a href="tel:+380937394970" className="text-blue-600 hover:underline">+38(093) 739-49-70</a>
                <a href="mailto:kyivlyceum.ues@gmail.com" className="text-blue-600 hover:underline">kyivlyceum.ues@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-gray-900 mb-4">{t('nav.about')}</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/#about" className="text-gray-500 hover:text-blue-600">{t('nav.about')}</Link></li>
                  <li><Link href="/#news" className="text-gray-500 hover:text-blue-600">{t('nav.news')}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">{t('nav.students')}</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/#students" className="text-gray-500 hover:text-blue-600">{t('nav.students')}</Link></li>
                  <li><Link href="https://school-platform.link" className="text-gray-500 hover:text-blue-600">{t('platform.cta')}</Link></li>
                  <li><Link href="/#contact" className="text-gray-500 hover:text-blue-600">{t('nav.contacts')}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://t.me/ues_kyiv" className="text-gray-500 hover:text-blue-600">Telegram Support</a></li>
                  <li><a href="viber://chat?number=380937394970" className="text-gray-500 hover:text-blue-600">Viber Chat</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400 mb-1">
              © {new Date().getFullYear()} Kyiv Lyceum &quot;Ukrainian European School&quot;. All rights reserved. Registered Educational Institution.
            </p>
            <p className="text-[10px] text-gray-400">
              Developed by <span className="text-gray-500 font-medium">Sandeepa Wimalasiri</span> | Visual Elements by <span className="text-gray-500 font-medium">Nadun Manawadu</span>
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors" aria-label="Telegram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.257.257-.527.257l.184-2.618 4.77-4.312c.207-.184-.045-.286-.32-.103l-5.895 3.713-2.538-.792c-.553-.172-.56-.553.115-.818l9.922-3.824c.46-.172.86.103.729.807z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;