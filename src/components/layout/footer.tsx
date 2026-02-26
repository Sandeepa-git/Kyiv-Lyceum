'use client';

import Link from 'next/link';
import Image from 'next/image';
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

        <div className="pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Kyiv Lyceum "Ukrainian European School". All rights reserved. Registered Educational Institution.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">Telegram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;