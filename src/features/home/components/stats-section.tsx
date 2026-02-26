'use client';

import { useLocale } from "@/contexts/LocaleContext";

const StatsSection = () => {
    const { t } = useLocale();

    const stats = [
        { label: 'Founded', value: '2024' },
        { label: 'Students', value: '500+' },
        { label: 'Languages', value: '4' },
        { label: 'Partners', value: '15+' }
    ];

    return (
        <section className="py-20 bg-blue-600 text-white">
            <div className="container px-4 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-16">{t('numbers.title')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-5xl font-extrabold mb-2">{stat.value}</div>
                            <div className="text-blue-100 uppercase tracking-widest text-sm font-semibold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
