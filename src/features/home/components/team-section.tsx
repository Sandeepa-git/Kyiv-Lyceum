'use client';

import { useLocale } from "@/contexts/LocaleContext";
import Image from "next/image";

const TeamSection = () => {
    const { t } = useLocale();

    const members = [
        {
            name: 'Anastasia SHKURSKA',
            role: 'Director',
            image: '/images/school/students.png' // Using students image as placeholder or I should generate a portrait
        },
        {
            name: 'Iryna Markova',
            role: 'Academic Dean',
            image: '/images/school/students.png'
        },
        {
            name: 'Oleksandr Kovalenko',
            role: 'Head of Innovation',
            image: '/images/school/students.png'
        }
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('team.title')}</h2>
                    <p className="text-gray-600">Our dedicated educators and administrators are committed to the success of every student.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {members.map((member, index) => (
                        <div key={index} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow group">
                            <div className="w-36 h-36 md:w-40 md:h-40 mx-auto mb-6 relative overflow-hidden rounded-full border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-105">
                                <Image src={member.image} alt={member.name} fill className="object-cover" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                            <p className="text-sm md:text-base text-blue-600 font-medium mb-6">{member.role}</p>
                            <div className="flex justify-center space-x-4">
                                <span className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer border border-gray-100" aria-label={`LinkedIn - ${member.name}`}>In</span>
                                <span className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer border border-gray-100" aria-label={`Facebook - ${member.name}`}>Fb</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
