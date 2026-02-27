'use client';

import { useLocale } from "@/contexts/LocaleContext";
import Image from "next/image";

const PartnersSection = () => {
    const { t } = useLocale();

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('nav.partners')}</h2>
                    <p className="text-gray-600">We collaborate with world-class educational centers and public organizations to provide the best opportunities for our students.</p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* In a real app, these would be individual SVGs or images. Using the generated one as a block for now. */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center">
                        <Image src="/images/school/partners.png" alt="Partners" width={800} height={200} className="object-contain max-h-40" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
