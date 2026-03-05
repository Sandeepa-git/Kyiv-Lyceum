'use client';

import { useSiteContent } from "@/hooks/useSiteContent";

const ContactMessengersSection = () => {
    const { content } = useSiteContent();

    return (
        <section className="py-24 bg-white" id="contact">
            <div className="container px-4 mx-auto">
                <div className="bg-blue-600 rounded-3xl md:rounded-[3rem] p-8 md:p-12 lg:p-20 text-white relative overflow-hidden mb-12">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                    <div className="relative z-10 flex flex-wrap items-center -mx-4">
                        <div className="w-full lg:w-3/5 px-4 mb-12 lg:mb-0">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center lg:text-left">
                                {content.contact.heading}
                            </h2>
                            <p className="text-blue-100 text-lg md:text-xl mb-10 md:mb-12 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                                {content.contact.description}
                            </p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 justify-center lg:justify-start">
                                <a href={content.contact.telegramUrl} className="flex items-center justify-center px-8 py-4 md:py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20">
                                    <span className="mr-3 text-xl md:text-2xl">📱</span>
                                    Telegram
                                </a>
                                <a href={content.contact.viberUrl} className="flex items-center justify-center px-8 py-4 md:py-5 bg-white/10 text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all">
                                    <span className="mr-3 text-xl md:text-2xl">💬</span>
                                    Viber
                                </a>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/5 px-4">
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 max-w-md mx-auto lg:max-w-none">
                                <h3 className="text-xl font-bold mb-6 text-center lg:text-left">Quick Contact</h3>
                                <div className="space-y-6 text-blue-100">
                                    <div className="flex items-start">
                                        <span className="mr-3 text-lg">📧</span>
                                        <div>
                                            <div className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Email</div>
                                            <a href={`mailto:${content.contact.email}`} className="text-[13px] xs:text-sm md:text-base hover:underline break-all">{content.contact.email}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="mr-3 text-lg">📞</span>
                                        <div>
                                            <div className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Phone</div>
                                            <a href={`tel:${content.contact.phone.replace(/[^+\d]/g, '')}`} className="text-[13px] xs:text-sm md:text-base hover:underline">{content.contact.phone}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="mr-3 text-lg">👤</span>
                                        <div>
                                            <div className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Director</div>
                                            <div className="text-[13px] xs:text-sm md:text-base font-bold">{content.contact.director}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                <span className="text-2xl">📍</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Official Address</h3>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {content.contact.address}
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-2xl flex items-center justify-center mr-4">
                                <span className="text-2xl">🏛️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Legal & Banking Info</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">EDRPOU code</div>
                                <div className="text-base sm:text-lg font-mono font-bold text-gray-800">{content.contact.edrpouCode}</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">IBAN</div>
                                <div className="text-sm sm:text-lg font-mono font-bold text-gray-800 break-all md:break-normal tracking-tighter md:tracking-normal">{content.contact.iban}</div>
                            </div>
                            <div className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-500 uppercase">
                                {content.contact.bank}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactMessengersSection;
