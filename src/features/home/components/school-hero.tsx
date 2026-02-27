'use client';

import { useLocale } from "@/contexts/LocaleContext";
import Image from "next/image";
import Link from "next/link";

const SchoolHero = () => {
    const { t } = useLocale();

    return (
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center pt-16 md:pt-24 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/Home.jpeg"
                    alt="Kyiv Lyceum"
                    fill
                    className="object-cover opacity-40 brightness-75 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/80 to-transparent"></div>
            </div>

            <div className="container px-4 mx-auto relative z-10 py-12 md:py-20">
                <div className="max-w-4xl">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-8 md:mb-10 animate-fade-in">
                        <div className="shadow-sm rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-white shrink-0 mx-auto md:mx-0">
                            <Image src="/Home.jpeg" alt="UES Logo" width={100} height={100} className="w-16 h-16 md:w-28 md:h-28 object-contain bg-white p-2" />
                        </div>
                        <div className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-full text-[10px] md:text-sm font-bold animate-fade-in text-center md:text-left">
                            Establishing Excellence Since 2024
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 md:mb-8 leading-[1.2] md:leading-tight text-center md:text-left">
                        {t('hero.title')}
                    </h1>
                    <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl leading-relaxed text-center md:text-left">
                        {t('hero.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link href="https://school-platform.link" className="px-8 py-4 bg-blue-600 text-white text-center font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
                            {t('platform.cta')}
                        </Link>
                        <Link href="/#about" className="px-8 py-4 bg-white text-gray-900 text-center border border-gray-200 font-bold rounded-2xl hover:bg-gray-50 transition-all">
                            {t('nav.about')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Card */}
            <div className="hidden lg:block absolute right-[10%] bottom-[10%] w-80 p-6 bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-2xl animate-bounce-slow">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">Kyiv Lyceum</div>
                        <div className="text-xs text-gray-500 font-medium">Ukrainian European School</div>
                    </div>
                </div>
                <p className="text-sm text-gray-600">Join our community of future leaders and innovators.</p>
            </div>
        </section>
    );
};

export default SchoolHero;
