'use client';

import Image from "next/image";

const AboutHistorySection = () => {

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap items-center -mx-4">
                    <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                        <div className="relative max-w-lg mx-auto lg:max-w-none">
                            <div className="relative z-10 rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto">
                                <Image src="/Home.jpeg" alt="School History" width={600} height={500} className="object-cover w-full h-full lg:h-[500px]" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-28 h-28 md:w-40 md:h-40 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-bold text-sm md:text-xl p-4 md:p-8 text-center shadow-lg">
                                Since 2024
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4 lg:pl-16">
                        <div className="flex flex-col items-center lg:items-start">
                            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs md:text-sm font-bold mb-6 uppercase tracking-widest">
                                Our Heritage
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight text-center lg:text-left">
                                History of the <span className="text-blue-600">UES Lyceum</span>
                            </h2>
                            <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed text-center lg:text-left">
                                <p>
                                    Founded with a vision to bridge Ukrainian excellence with European educational standards, our lyceum has quickly become a center for innovation and cultural exchange.
                                </p>
                                <p>
                                    We believe in nurturing global citizens who are proud of their roots while being equipped with the knowledge and skills to thrive anywhere in the world. Our journey began with a small group of visionary educators and has grown into a vibrant community of learners.
                                </p>
                                <div className="pt-8 grid grid-cols-2 gap-4 md:gap-8 max-w-md mx-auto lg:mx-0">
                                    <div className="bg-gray-50 p-4 md:p-0 md:bg-transparent rounded-2xl md:rounded-none">
                                        <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">Modern</div>
                                        <div className="text-[10px] md:text-sm font-bold text-gray-500 uppercase tracking-wider">Educational Approach</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 md:p-0 md:bg-transparent rounded-2xl md:rounded-none">
                                        <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">Global</div>
                                        <div className="text-[10px] md:text-sm font-bold text-gray-500 uppercase tracking-wider">Opportunities</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHistorySection;
