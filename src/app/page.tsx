'use client';

import PageContainer from '@/components/layout/page-container';
import SchoolHero from '@/features/home/components/school-hero';
import AboutHistorySection from '@/features/home/components/about-history-section';
import StatsSection from '@/features/home/components/stats-section';
import NewsSection from '@/features/home/components/news-section';
import TeamSection from '@/features/home/components/team-section';
import PartnersSection from '@/features/home/components/partners-section';
import PlatformSection from '@/features/home/components/platform-section';
import ContactMessengersSection from '@/features/home/components/contact-messengers-section';
import { useLocale } from '@/contexts/LocaleContext';

/**
 * Homepage for Kyiv Lyceum "Ukrainian European School"
 * Features localized content, hero section, statistics, news, team, and platform transition.
 */
export default function HomePage() {
  const { t } = useLocale();

  const seoData = {
    description: t('hero.subtitle'),
    keywords: ['school', 'lyceum', 'Kyiv', 'education', 'Ukrainian European School', 'UES']
  };

  return (
    <PageContainer
      title={t('hero.title')}
      seo={seoData}
    >
      <SchoolHero />
      <div id="about"><AboutHistorySection /></div>
      <StatsSection />
      <div id="news"><NewsSection /></div>
      <TeamSection />
      <PartnersSection />
      <div id="students"><PlatformSection /></div>
      <div id="contact"><ContactMessengersSection /></div>
    </PageContainer>
  );
}