'use client';

import { useLocale } from "@/contexts/LocaleContext";
import Link from "next/link";
import Image from "next/image";

const NewsSection = () => {
    const { t } = useLocale();

    const news = [
        {
            title: 'School Year Opening 2026',
            date: 'September 1, 2026',
            excerpt: 'Welcoming our new students to the Ukrainian European School community.',
            image: '/images/school/students.png'
        },
        {
            title: 'New Partnership with EU Centers',
            date: 'August 15, 2026',
            excerpt: 'Expanding our horizons through international collaboration.',
            image: '/images/school/hero.png'
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('nav.news')}</h2>
                        <p className="text-gray-600 max-w-xl">Stay updated with the latest events and achievements at our lyceum.</p>
                    </div>
                    <Link href="/#news" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                        View All News
                        <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {news.map((item, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="relative h-64 mb-6 overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl">
                                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">{item.date}</div>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                            <p className="text-gray-600 mb-4">{item.excerpt}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
