'use client';

import { useState, useEffect } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { isAdminEmail } from '@/lib/firestore';
import { useAdminContent } from '@/hooks/useSiteContent';
import type { SiteContent, NewsItem, TeamMember, StatItem } from '@/lib/firestore';

// ─── Tab types ───────────────────────────────────────────
type Tab = 'hero' | 'about' | 'stats' | 'news' | 'team' | 'partners' | 'platform' | 'contact' | 'footer';

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'hero', label: 'Hero Section', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { key: 'about', label: 'About / History', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { key: 'stats', label: 'Statistics', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { key: 'news', label: 'News & Events', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg> },
    { key: 'team', label: 'Team Members', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
    { key: 'partners', label: 'Partners', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    { key: 'platform', label: 'Platform', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    { key: 'contact', label: 'Contact Info', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> },
    { key: 'footer', label: 'Footer / Social', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> },
];

export default function AdminPage() {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('hero');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const { content, loading, saving, error, saveSuccess, updateContent, save } = useAdminContent();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthLoading(false);
        });
        return unsub;
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    // ─── Auth loading ──────────────────────────────────────
    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-blue-200 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // ─── Login screen ──────────────────────────────────────
    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/25">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Admin Panel</h1>
                    <p className="text-blue-200/70 mb-8">UES Lyceum Content Management</p>
                    <button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Sign in with Google
                    </button>
                    <p className="text-xs text-blue-300/40 mt-6">Only authorized administrators can access this panel.</p>
                </div>
            </div>
        );
    }

    // ─── Not authorized ────────────────────────────────────
    if (!isAdminEmail(user.email)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 flex items-center justify-center p-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-red-500/20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl text-red-500">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
                    <p className="text-red-200/70 mb-2">Your account ({user.email}) is not authorized.</p>
                    <p className="text-red-200/50 text-sm mb-8">Contact the school administrator to request access.</p>
                    <button onClick={handleLogout} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all">
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }

    // ─── Content loading ───────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-blue-200">Loading content...</p>
                </div>
            </div>
        );
    }

    // ─── Helper: field updater ─────────────────────────────
    const updateField = <K extends keyof SiteContent>(
        section: K,
        field: string,
        value: string | number | boolean
    ) => {
        updateContent(prev => ({
            ...prev,
            [section]: { ...(prev[section] as any), [field]: value },
        }));
    };

    // ─── Render tab content ────────────────────────────────
    const renderTabContent = () => {
        switch (activeTab) {
            case 'hero':
                return <HeroEditor content={content} updateField={updateField} />;
            case 'about':
                return <AboutEditor content={content} updateField={updateField} />;
            case 'stats':
                return <StatsEditor content={content} updateContent={updateContent} />;
            case 'news':
                return <NewsEditor content={content} updateContent={updateContent} />;
            case 'team':
                return <TeamEditor content={content} updateContent={updateContent} />;
            case 'partners':
                return <PartnersEditor content={content} updateField={updateField} />;
            case 'platform':
                return <PlatformEditor content={content} updateField={updateField} />;
            case 'contact':
                return <ContactEditor content={content} updateField={updateField} />;
            case 'footer':
                return <FooterEditor content={content} updateField={updateField} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
            {/* Top Bar */}
            <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
                <div className="flex items-center justify-between px-4 md:px-6 h-16">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/25">U</div>
                        <span className="font-bold text-lg hidden sm:inline">UES Admin</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {error && (
                            <span className="text-red-400 text-sm bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                {error}
                            </span>
                        )}
                        {saveSuccess && (
                            <span className="text-emerald-400 text-sm bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 animate-pulse flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Saved!
                            </span>
                        )}
                        <button
                            onClick={save}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                        >
                            {saving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span className="hidden sm:inline">Saving...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 text-current opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                    <span className="hidden sm:inline">Save All</span>
                                </>
                            )}
                        </button>
                        <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-1.5 border border-white/10">
                            {user.photoURL && <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full" />}
                            <span className="text-sm text-blue-200 hidden md:inline">{user.email}</span>
                        </div>
                        <button onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-red-500/30" title="Sign Out">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="hidden lg:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    {sidebarOpen && (
                        <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
                    )}
                    <div className="relative z-10 p-4">
                        <p className="text-[10px] font-bold text-blue-300/50 uppercase tracking-widest mb-4 px-3">Content Sections</p>
                        <nav className="space-y-1">
                            {TABS.map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.key
                                        ? 'bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/10 border border-blue-500/20'
                                        : 'text-white/60 hover:bg-white/5 hover:text-white/90 border border-transparent'
                                        }`}
                                >
                                    <span className="text-lg">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5">
                            <p className="text-xs text-blue-200/60 mb-2 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                Tip
                            </p>
                            <p className="text-xs text-white/40">Edit any section and click <strong className="text-blue-300">Save All</strong> to publish changes to the live website instantly.</p>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold mb-1 flex items-center gap-3">
                                <span className="text-blue-400">{TABS.find(t => t.key === activeTab)?.icon}</span>
                                {TABS.find(t => t.key === activeTab)?.label}
                            </h1>
                            <p className="text-white/40 text-sm">Edit the content below and save changes.</p>
                        </div>
                        {renderTabContent()}
                    </div>
                </main>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>

                        <div className="relative z-10 text-center">
                            <div className="w-16 h-16 bg-red-500/20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-red-400">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Sign Out</h3>
                            <p className="text-white/60 text-sm mb-8">Are you sure you want to log out of the admin panel?</p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors font-medium border border-white/10"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-medium shadow-lg shadow-red-500/25"
                                >
                                    Yes, Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Shared components ─────────────────────────────────────
function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-blue-200/80">{label}</label>
            {children}
        </div>
    );
}

function Input({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
    return (
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
        />
    );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
    return (
        <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
        />
    );
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-5">
            {title && <h3 className="text-lg font-bold text-white/90 border-b border-white/10 pb-3">{title}</h3>}
            {children}
        </div>
    );
}

// ─── Section Editors ───────────────────────────────────────

type UpdateFieldFn = <K extends keyof SiteContent>(section: K, field: string, value: string | number | boolean) => void;

function HeroEditor({ content, updateField }: { content: SiteContent; updateField: UpdateFieldFn }) {
    return (
        <div className="space-y-6">
            <Card title="Hero Badge & Floating Card">
                <FieldGroup label="Badge Text">
                    <Input value={content.hero.badge} onChange={v => updateField('hero', 'badge', v)} placeholder="e.g. Establishing Excellence Since 2024" />
                </FieldGroup>
                <FieldGroup label="Platform URL">
                    <Input value={content.hero.platformUrl} onChange={v => updateField('hero', 'platformUrl', v)} placeholder="https://..." />
                </FieldGroup>
            </Card>
            <Card title="Floating Card (Desktop)">
                <FieldGroup label="Card Title">
                    <Input value={content.hero.floatingCardTitle} onChange={v => updateField('hero', 'floatingCardTitle', v)} />
                </FieldGroup>
                <FieldGroup label="Card Subtitle">
                    <Input value={content.hero.floatingCardSubtitle} onChange={v => updateField('hero', 'floatingCardSubtitle', v)} />
                </FieldGroup>
                <FieldGroup label="Card Description">
                    <Textarea value={content.hero.floatingCardText} onChange={v => updateField('hero', 'floatingCardText', v)} />
                </FieldGroup>
            </Card>
        </div>
    );
}

function AboutEditor({ content, updateField }: { content: SiteContent; updateField: UpdateFieldFn }) {
    return (
        <div className="space-y-6">
            <Card title="About Section Text">
                <FieldGroup label="Badge Label">
                    <Input value={content.about.badge} onChange={v => updateField('about', 'badge', v)} />
                </FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldGroup label="Title">
                        <Input value={content.about.title} onChange={v => updateField('about', 'title', v)} />
                    </FieldGroup>
                    <FieldGroup label="Title Highlight (colored)">
                        <Input value={content.about.titleHighlight} onChange={v => updateField('about', 'titleHighlight', v)} />
                    </FieldGroup>
                </div>
                <FieldGroup label="Paragraph 1">
                    <Textarea value={content.about.paragraph1} onChange={v => updateField('about', 'paragraph1', v)} rows={3} />
                </FieldGroup>
                <FieldGroup label="Paragraph 2">
                    <Textarea value={content.about.paragraph2} onChange={v => updateField('about', 'paragraph2', v)} rows={4} />
                </FieldGroup>
            </Card>
            <Card title="About Section Stats">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldGroup label="Stat 1 Value">
                        <Input value={content.about.stat1Value} onChange={v => updateField('about', 'stat1Value', v)} />
                    </FieldGroup>
                    <FieldGroup label="Stat 1 Label">
                        <Input value={content.about.stat1Label} onChange={v => updateField('about', 'stat1Label', v)} />
                    </FieldGroup>
                    <FieldGroup label="Stat 2 Value">
                        <Input value={content.about.stat2Value} onChange={v => updateField('about', 'stat2Value', v)} />
                    </FieldGroup>
                    <FieldGroup label="Stat 2 Label">
                        <Input value={content.about.stat2Label} onChange={v => updateField('about', 'stat2Label', v)} />
                    </FieldGroup>
                </div>
                <FieldGroup label="Founded Year Text">
                    <Input value={content.about.foundedYear} onChange={v => updateField('about', 'foundedYear', v)} />
                </FieldGroup>
                <FieldGroup label="Image URL">
                    <Input value={content.about.imageUrl} onChange={v => updateField('about', 'imageUrl', v)} placeholder="/Home.jpeg or https://..." />
                </FieldGroup>
            </Card>
        </div>
    );
}

function StatsEditor({ content, updateContent }: { content: SiteContent; updateContent: (fn: (prev: SiteContent) => SiteContent) => void }) {
    const updateStat = (index: number, field: keyof StatItem, value: string) => {
        updateContent(prev => ({
            ...prev,
            stats: prev.stats.map((s, i) => i === index ? { ...s, [field]: value } : s),
        }));
    };

    const addStat = () => {
        updateContent(prev => ({
            ...prev,
            stats: [...prev.stats, { label: 'New Stat', value: '0' }],
        }));
    };

    const removeStat = (index: number) => {
        updateContent(prev => ({
            ...prev,
            stats: prev.stats.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="space-y-4">
            {content.stats.map((stat, index) => (
                <Card key={index}>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FieldGroup label="Value">
                                <Input value={stat.value} onChange={v => updateStat(index, 'value', v)} placeholder="e.g. 500+" />
                            </FieldGroup>
                            <FieldGroup label="Label">
                                <Input value={stat.label} onChange={v => updateStat(index, 'label', v)} placeholder="e.g. Students" />
                            </FieldGroup>
                        </div>
                        <button onClick={() => removeStat(index)} className="mt-7 p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Remove">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </Card>
            ))}
            <button onClick={addStat} className="w-full py-3 border-2 border-dashed border-white/20 hover:border-blue-500/50 text-white/50 hover:text-blue-300 rounded-xl transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Add Statistic
            </button>
        </div>
    );
}

function NewsEditor({ content, updateContent }: { content: SiteContent; updateContent: (fn: (prev: SiteContent) => SiteContent) => void }) {
    const updateNews = (index: number, field: keyof NewsItem, value: string) => {
        updateContent(prev => ({
            ...prev,
            news: prev.news.map((n, i) => i === index ? { ...n, [field]: value } : n),
        }));
    };

    const addNews = () => {
        updateContent(prev => ({
            ...prev,
            news: [...prev.news, { title: 'New Article', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), excerpt: '', image: '/images/school/students.png' }],
        }));
    };

    const removeNews = (index: number) => {
        updateContent(prev => ({
            ...prev,
            news: prev.news.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="space-y-4">
            {content.news.map((item, index) => (
                <Card key={index} title={`Article ${index + 1}`}>
                    <div className="flex justify-end -mt-3">
                        <button onClick={() => removeNews(index)} className="p-2 flex items-center gap-1 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors text-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            Remove
                        </button>
                    </div>
                    <FieldGroup label="Title">
                        <Input value={item.title} onChange={v => updateNews(index, 'title', v)} />
                    </FieldGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldGroup label="Date">
                            <Input value={item.date} onChange={v => updateNews(index, 'date', v)} placeholder="e.g. September 1, 2026" />
                        </FieldGroup>
                        <FieldGroup label="Image URL">
                            <Input value={item.image} onChange={v => updateNews(index, 'image', v)} placeholder="/images/..." />
                        </FieldGroup>
                    </div>
                    <FieldGroup label="Excerpt">
                        <Textarea value={item.excerpt} onChange={v => updateNews(index, 'excerpt', v)} />
                    </FieldGroup>
                </Card>
            ))}
            <button onClick={addNews} className="w-full py-3 border-2 border-dashed border-white/20 hover:border-blue-500/50 text-white/50 hover:text-blue-300 rounded-xl transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Add News Article
            </button>
        </div>
    );
}

function TeamEditor({ content, updateContent }: { content: SiteContent; updateContent: (fn: (prev: SiteContent) => SiteContent) => void }) {
    const updateMember = (index: number, field: keyof TeamMember, value: string) => {
        updateContent(prev => ({
            ...prev,
            team: prev.team.map((m, i) => i === index ? { ...m, [field]: value } : m),
        }));
    };

    const addMember = () => {
        updateContent(prev => ({
            ...prev,
            team: [...prev.team, { name: 'New Member', role: 'Role', image: '/images/school/students.png' }],
        }));
    };

    const removeMember = (index: number) => {
        updateContent(prev => ({
            ...prev,
            team: prev.team.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="space-y-4">
            {content.team.map((member, index) => (
                <Card key={index}>
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/10 overflow-hidden shrink-0">
                            {member.image && <img src={member.image} alt={member.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <FieldGroup label="Name">
                                    <Input value={member.name} onChange={v => updateMember(index, 'name', v)} />
                                </FieldGroup>
                                <FieldGroup label="Role">
                                    <Input value={member.role} onChange={v => updateMember(index, 'role', v)} />
                                </FieldGroup>
                            </div>
                            <FieldGroup label="Image URL">
                                <Input value={member.image} onChange={v => updateMember(index, 'image', v)} placeholder="/images/..." />
                            </FieldGroup>
                        </div>
                        <button onClick={() => removeMember(index)} className="mt-2 p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Remove">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </Card>
            ))}
            <button onClick={addMember} className="w-full py-3 border-2 border-dashed border-white/20 hover:border-blue-500/50 text-white/50 hover:text-blue-300 rounded-xl transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Add Team Member
            </button>
        </div>
    );
}

function PartnersEditor({ content, updateField }: { content: SiteContent; updateField: UpdateFieldFn }) {
    return (
        <Card title="Partners Section">
            <FieldGroup label="Description">
                <Textarea value={content.partners.description} onChange={v => updateField('partners', 'description', v)} />
            </FieldGroup>
            <FieldGroup label="Partners Image URL">
                <Input value={content.partners.imageUrl} onChange={v => updateField('partners', 'imageUrl', v)} placeholder="/images/school/partners.png" />
            </FieldGroup>
        </Card>
    );
}

function PlatformEditor({ content, updateField }: { content: SiteContent; updateField: UpdateFieldFn }) {
    return (
        <Card title="Online Platform Section">
            <FieldGroup label="Description">
                <Textarea value={content.platform.description} onChange={v => updateField('platform', 'description', v)} />
            </FieldGroup>
            <FieldGroup label="Platform URL">
                <Input value={content.platform.platformUrl} onChange={v => updateField('platform', 'platformUrl', v)} placeholder="https://school-platform.link" />
            </FieldGroup>
            <FieldGroup label="Image URL">
                <Input value={content.platform.imageUrl} onChange={v => updateField('platform', 'imageUrl', v)} />
            </FieldGroup>
        </Card>
    );
}

function ContactEditor({ content, updateField }: { content: SiteContent; updateField: UpdateFieldFn }) {
    return (
        <div className="space-y-6">
            <Card title="Contact Header">
                <FieldGroup label="Heading">
                    <Input value={content.contact.heading} onChange={v => updateField('contact', 'heading', v)} />
                </FieldGroup>
                <FieldGroup label="Description">
                    <Textarea value={content.contact.description} onChange={v => updateField('contact', 'description', v)} />
                </FieldGroup>
            </Card>
            <Card title="Contact Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldGroup label="Email">
                        <Input value={content.contact.email} onChange={v => updateField('contact', 'email', v)} />
                    </FieldGroup>
                    <FieldGroup label="Phone">
                        <Input value={content.contact.phone} onChange={v => updateField('contact', 'phone', v)} />
                    </FieldGroup>
                </div>
                <FieldGroup label="Director Name">
                    <Input value={content.contact.director} onChange={v => updateField('contact', 'director', v)} />
                </FieldGroup>
            </Card>
            <Card title="Messenger Links">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldGroup label="Telegram URL">
                        <Input value={content.contact.telegramUrl} onChange={v => updateField('contact', 'telegramUrl', v)} />
                    </FieldGroup>
                    <FieldGroup label="Viber URL">
                        <Input value={content.contact.viberUrl} onChange={v => updateField('contact', 'viberUrl', v)} />
                    </FieldGroup>
                </div>
            </Card>
            <Card title="Address & Legal">
                <FieldGroup label="Address">
                    <Textarea value={content.contact.address} onChange={v => updateField('contact', 'address', v)} />
                </FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FieldGroup label="EDRPOU Code">
                        <Input value={content.contact.edrpouCode} onChange={v => updateField('contact', 'edrpouCode', v)} />
                    </FieldGroup>
                    <FieldGroup label="IBAN">
                        <Input value={content.contact.iban} onChange={v => updateField('contact', 'iban', v)} />
                    </FieldGroup>
                    <FieldGroup label="Bank">
                        <Input value={content.contact.bank} onChange={v => updateField('contact', 'bank', v)} />
                    </FieldGroup>
                </div>
            </Card>
        </div>
    );
}

function FooterEditor({ content, updateField }: { content: SiteContent; updateField: UpdateFieldFn }) {
    return (
        <Card title="Social Media Links">
            <FieldGroup label="Facebook URL">
                <Input value={content.footer.facebookUrl} onChange={v => updateField('footer', 'facebookUrl', v)} placeholder="https://facebook.com/..." />
            </FieldGroup>
            <FieldGroup label="Instagram URL">
                <Input value={content.footer.instagramUrl} onChange={v => updateField('footer', 'instagramUrl', v)} placeholder="https://instagram.com/..." />
            </FieldGroup>
            <FieldGroup label="Telegram URL">
                <Input value={content.footer.telegramUrl} onChange={v => updateField('footer', 'telegramUrl', v)} placeholder="https://t.me/..." />
            </FieldGroup>
        </Card>
    );
}
