'use client';

import { useLocale } from "@/contexts/LocaleContext";

const ContactMessengersSection = () => {
    const { t } = useLocale();

    return (
        <section className="py-24 bg-white" id="contact">
            <div className="container px-4 mx-auto">
                <div className="bg-blue-600 rounded-3xl md:rounded-[3rem] p-8 md:p-12 lg:p-20 text-white relative overflow-hidden mb-12">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                    <div className="relative z-10 flex flex-wrap items-center -mx-4">
                        <div className="w-full lg:w-3/5 px-4 mb-12 lg:mb-0">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center lg:text-left">
                                Get in Touch with Our Team
                            </h2>
                            <p className="text-blue-100 text-lg md:text-xl mb-10 md:mb-12 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                                Transition to our instant messengers for direct communication with our administrative team. We are available to answer all your questions.
                            </p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 justify-center lg:justify-start">
                                <a href="https://t.me/ues_kyiv" className="flex items-center justify-center px-8 py-4 md:py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20">
                                    <span className="mr-3 text-xl md:text-2xl">📱</span>
                                    Telegram
                                </a>
                                <a href="viber://chat?number=380937394970" className="flex items-center justify-center px-8 py-4 md:py-5 bg-white/10 text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all">
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
                                        <span className="mr-4 text-lg md:text-xl">📧</span>
                                        <div>
                                            <div className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Email</div>
                                            <a href="mailto:kyivlyceum.ues@gmail.com" className="text-sm md:text-base hover:underline">kyivlyceum.ues@gmail.com</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="mr-4 text-lg md:text-xl">📞</span>
                                        <div>
                                            <div className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Phone</div>
                                            <a href="tel:+380937394970" className="text-sm md:text-base hover:underline">+38(093) 739-49-70</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="mr-4 text-lg md:text-xl">👤</span>
                                        <div>
                                            <div className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Director</div>
                                            <div className="text-sm md:text-base font-bold">Anastasia SHKURSKA</div>
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
                            27 Krakivska St., office 128,<br />
                            Kyiv, 02094, Ukraine
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
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">EDRPOU code</div>
                                <div className="text-lg font-mono font-bold text-gray-800">45751613</div>
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">IBAN</div>
                                <div className="text-lg font-mono font-bold text-gray-800 break-all md:break-normal">UA54 305299 00000 26009016245165</div>
                            </div>
                            <div className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-500 uppercase">
                                Private Bank
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactMessengersSection;
