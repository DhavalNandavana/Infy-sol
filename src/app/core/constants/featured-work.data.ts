import { FeaturedWork } from '../models/featured-work.model';

export const FEATURED_WORK_DATA: FeaturedWork[] = [
  {
    id: 1,
    num: '01',
    title: 'Luxe Cosmetics — Complete Brand Overhaul',
    description: 'We reimagined the entire Luxe Cosmetics brand from the ground up, creating a premium visual identity that resonates with their target demographic and stands out in a crowded beauty market.',
    tags: ['Brand Strategy', 'Visual Identity', 'Packaging', 'Guidelines'],
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
  {
    id: 2,
    num: '02',
    title: 'GrowthEngine — Digital Marketing Ecosystem',
    description: 'A comprehensive digital marketing strategy including SEO optimization, content marketing, paid advertising, and social media management that delivered 340% organic traffic growth.',
    tags: ['SEO', 'Content Marketing', 'PPC', 'Analytics'],
    gradient: 'linear-gradient(135deg, #0DCCFA, #351CAC)'
  },
  {
    id: 3,
    num: '03',
    title: 'CloudNine Coffee — Packaging Suite',
    description: 'Premium packaging design for a specialty coffee brand featuring bold color blocking, custom illustrations, and sustainable materials that elevated their shelf presence.',
    tags: ['Packaging Design', 'Illustration', 'Print', 'Sustainability'],
    gradient: 'linear-gradient(135deg, #11998e, #38ef7d)'
  }
];
