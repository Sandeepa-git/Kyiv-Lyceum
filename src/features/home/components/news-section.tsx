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
        <section className="py-24 bg-white">
            <div className="container px-4 mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">{t('nav.news')}</h2>
                        <p className="text-gray-600 max-w-xl">Stay updated with the latest events and achievements at our lyceum.</p>
                    </div>
                    <Link href="/#news" className="text-blue-600 font-bold hover:underline mb-2">View All News →</Link>
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
