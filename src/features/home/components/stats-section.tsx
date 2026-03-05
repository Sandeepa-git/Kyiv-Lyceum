'use client';

import { useLocale } from "@/contexts/LocaleContext";
import { useSiteContent } from "@/hooks/useSiteContent";

const StatsSection = () => {
    const { t } = useLocale();
    const { content } = useSiteContent();

    return (
        <section className="py-12 md:py-24 bg-blue-600 text-white">
            <div className="container px-4 mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-16">{t('numbers.title')}</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
                    {content.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-5xl font-extrabold mb-2">{stat.value}</div>
                            <div className="text-blue-100 uppercase tracking-widest text-[10px] md:text-sm font-semibold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
