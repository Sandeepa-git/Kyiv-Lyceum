import { db } from './firebase';
import {
    doc,
    getDoc,
    setDoc,
    collection,
    getDocs,
    deleteDoc,
    serverTimestamp,
    onSnapshot,
} from 'firebase/firestore';

// ─── Types ───────────────────────────────────────────────
export interface HeroContent {
    badge: string;
    floatingCardTitle: string;
    floatingCardSubtitle: string;
    floatingCardText: string;
    platformUrl: string;
}

export interface AboutContent {
    badge: string;
    title: string;
    titleHighlight: string;
    paragraph1: string;
    paragraph2: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    foundedYear: string;
    imageUrl: string;
}

export interface StatItem {
    label: string;
    value: string;
}

export interface NewsItem {
    id?: string;
    title: string;
    date: string;
    excerpt: string;
    image: string;
}

export interface TeamMember {
    id?: string;
    name: string;
    role: string;
    image: string;
}

export interface PartnersContent {
    description: string;
    imageUrl: string;
}

export interface PlatformContent {
    description: string;
    platformUrl: string;
    imageUrl: string;
}

export interface ContactContent {
    heading: string;
    description: string;
    email: string;
    phone: string;
    director: string;
    telegramUrl: string;
    viberUrl: string;
    address: string;
    edrpouCode: string;
    iban: string;
    bank: string;
}

export interface FooterContent {
    facebookUrl: string;
    instagramUrl: string;
    telegramUrl: string;
}

export interface SiteContent {
    hero: HeroContent;
    about: AboutContent;
    stats: StatItem[];
    news: NewsItem[];
    team: TeamMember[];
    partners: PartnersContent;
    platform: PlatformContent;
    contact: ContactContent;
    footer: FooterContent;
}

// ─── Default content (matches current hardcoded values) ──
export const defaultContent: SiteContent = {
    hero: {
        badge: 'Establishing Excellence Since 2024',
        floatingCardTitle: 'Kyiv Lyceum',
        floatingCardSubtitle: 'Ukrainian European School',
        floatingCardText: 'Join our community of future leaders and innovators.',
        platformUrl: 'https://school-platform.link',
    },
    about: {
        badge: 'Our Heritage',
        title: 'History of the',
        titleHighlight: 'UES Lyceum',
        paragraph1: 'Founded with a vision to bridge Ukrainian excellence with European educational standards, our lyceum has quickly become a center for innovation and cultural exchange.',
        paragraph2: 'We believe in nurturing global citizens who are proud of their roots while being equipped with the knowledge and skills to thrive anywhere in the world. Our journey began with a small group of visionary educators and has grown into a vibrant community of learners.',
        stat1Value: 'Modern',
        stat1Label: 'Educational Approach',
        stat2Value: 'Global',
        stat2Label: 'Opportunities',
        foundedYear: 'Since 2024',
        imageUrl: '/Home.jpeg',
    },
    stats: [
        { label: 'Founded', value: '2024' },
        { label: 'Students', value: '500+' },
        { label: 'Languages', value: '4' },
        { label: 'Partners', value: '15+' },
    ],
    news: [
        {
            title: 'School Year Opening 2026',
            date: 'September 1, 2026',
            excerpt: 'Welcoming our new students to the Ukrainian European School community.',
            image: '/images/school/students.png',
        },
        {
            title: 'New Partnership with EU Centers',
            date: 'August 15, 2026',
            excerpt: 'Expanding our horizons through international collaboration.',
            image: '/images/school/hero.png',
        },
    ],
    team: [
        { name: 'Anastasia SHKURSKA', role: 'Director', image: '/images/school/students.png' },
        { name: 'Iryna Markova', role: 'Academic Dean', image: '/images/school/students.png' },
        { name: 'Oleksandr Kovalenko', role: 'Head of Innovation', image: '/images/school/students.png' },
    ],
    partners: {
        description: 'We collaborate with world-class educational centers and public organizations to provide the best opportunities for our students.',
        imageUrl: '/images/school/partners.png',
    },
    platform: {
        description: 'Our advanced online learning environment provides students with all the tools they need for a successful education journey.',
        platformUrl: 'https://school-platform.link',
        imageUrl: '/images/school/students.png',
    },
    contact: {
        heading: 'Get in Touch with Our Team',
        description: 'Transition to our instant messengers for direct communication with our administrative team. We are available to answer all your questions.',
        email: 'kyivlyceum.ues@gmail.com',
        phone: '+38(093) 739-49-70',
        director: 'Anastasia SHKURSKA',
        telegramUrl: 'https://t.me/ues_kyiv',
        viberUrl: 'viber://chat?number=380937394970',
        address: '27 Krakivska St., office 128, Kyiv, 02094, Ukraine',
        edrpouCode: '45751613',
        iban: 'UA54 305299 00000 26009016245165',
        bank: 'Private Bank',
    },
    footer: {
        facebookUrl: '#',
        instagramUrl: '#',
        telegramUrl: '#',
    },
};

// ─── Firestore operations ────────────────────────────────
const SITE_COLLECTION = 'siteContent';

export async function getSiteContent(): Promise<SiteContent> {
    try {
        const docRef = doc(db, SITE_COLLECTION, 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as SiteContent;
        }
        return defaultContent;
    } catch (error) {
        console.error('Error fetching site content:', error);
        return defaultContent;
    }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
    try {
        const docRef = doc(db, SITE_COLLECTION, 'main');
        await setDoc(docRef, {
            ...content,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error saving site content:', error);
        throw error;
    }
}

export function subscribeToSiteContent(callback: (content: SiteContent) => void) {
    const docRef = doc(db, SITE_COLLECTION, 'main');
    return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data() as SiteContent);
        } else {
            callback(defaultContent);
        }
    }, (error) => {
        console.error('Error in site content subscription:', error);
    });
}

// Authorized admin emails from environment variables
const getAdminEmails = (): string[] => {
    const emailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
    return emailsStr.split(',').map(email => email.trim().toLowerCase()).filter(email => email !== '');
};

export function isAdminEmail(email: string | null): boolean {
    if (!email) return false;
    const adminEmails = getAdminEmails();
    return adminEmails.includes(email.toLowerCase());
}
