'use client';

import { useLocale } from "@/contexts/LocaleContext";
import Image from "next/image";
import Link from "next/link";

const PlatformSection = () => {
    const { t } = useLocale();

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl md:rounded-[3rem] p-8 md:p-12 lg:p-20 flex flex-wrap items-center">
                    <div className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
                            {t('platform.cta')}
                        </h2>
                        <p className="text-blue-100 text-base md:text-lg mb-10 md:mb-12 max-w-md mx-auto lg:mx-0">
                            Our advanced online learning environment provides students with all the tools they need for a successful education journey.
                        </p>
                        <Link href="https://school-platform.link" className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-2xl hover:bg-yellow-300 transition-all shadow-xl shadow-blue-900/40 w-full sm:w-auto">
                            {t('platform.transition')}
                            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                    <div className="w-full lg:w-1/2 relative px-4 sm:px-0">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 md:border-8 border-white/10 aspect-[4/3] sm:aspect-auto">
                            <Image src="/images/school/students.png" alt="Platform" width={600} height={400} className="object-cover w-full h-full lg:h-auto" />
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 md:w-40 md:h-40 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 md:w-60 md:h-60 bg-yellow-500 rounded-full blur-3xl opacity-30"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformSection;
