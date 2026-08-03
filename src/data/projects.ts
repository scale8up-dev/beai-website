import strategicDivorceImg from '../assets/6d628b01b07f53f94a53f2dc1a14257265a2ec50.png';
import jvDirectoryImg from '../assets/e140d4bc1bbaa0732a2f09b308bfac27b77f881f.png';
import castlrImg from '../assets/526716b7215e7e465e441bddff05c46469bc2800.png';
import securRoomImg from '../assets/60a105d9b0ebbed3c0d43cf45ec660a179cd7c94.png';
import prepForIndependenceImg from '../assets/2a4edcceac6e7ba4c47bcd03ca73da2458e2687c.png';
import foreclosurebidAIImg from '../assets/e04d3a6ad333c96c220a47216b8e8e60524d4cd8.png';
import onyxFlowImg from '../assets/onyxflow_new.jpg';
import lifeAppImg from '../assets/LifeApp.png';
import doTheThingImg from '../assets/DTT.png';
import castlrMobileImg from '../assets/castlr.png';
import faceAnalyzerImg from '../assets/faceana.png';
import praxisMediaImg from '../assets/praxis_new.jpg';
import coryAIImg from '../assets/cory_ai.png';
import scalingCoachImg from '../assets/scaling_coach.png';
import primeAgeFitImg from '../assets/primeagefit.jpg';
import astrologyAIImg from '../assets/astrology_ai.jpg';
import clickAIImg from '../assets/clickai.jpg';
import cuerPowerImg from '../assets/cuerpower.png';
import motherAIImg from '../assets/mother-ai.png';

export type ProjectCategory = 'AI Projects' | 'Web Solutions' | 'Mobile Apps';

export type Project = {
  category: ProjectCategory;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  metrics: {
    completion: string;
    duration: string;
    team: string;
  };
  url: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    category: 'Web Solutions',
    title: 'Strategic Divorce Directory',
    description: 'A trusted directory that connects people navigating divorce with the experts and resources they need to move forward.',
    image: strategicDivorceImg,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    metrics: { completion: '100%', duration: '6 weeks', team: '2 people' },
    url: 'https://stage.strategicdivorcedirectory.com/',
    featured: true,
  },
  {
    category: 'Web Solutions',
    title: 'JV Directory',
    description: 'A platform connecting joint venture partners, affiliates, and influencers in the self-improvement industry.',
    image: jvDirectoryImg,
    technologies: ['React', 'Express', 'MongoDB', 'Redis'],
    metrics: { completion: '100%', duration: '8 weeks', team: '3 people' },
    url: 'https://jvdirectory.com/',
    featured: true,
  },
  {
    category: 'Web Solutions',
    title: 'CastlR',
    description: 'Community safety software with instant incident reporting, real-time alerts, and clear documentation workflows.',
    image: castlrImg,
    technologies: ['React Native', 'Firebase', 'Real-time', 'Maps API'],
    metrics: { completion: '100%', duration: '8 weeks', team: '3 people' },
    url: 'https://castlr.com/',
  },
  {
    category: 'AI Projects',
    title: 'Praxis Media',
    description: 'An interactive reading experience with instant answers, deeper insights, and personalized AI guidance.',
    image: praxisMediaImg,
    technologies: ['React', 'AI', 'NLP', 'Node.js'],
    metrics: { completion: '100%', duration: '8 weeks', team: '3 people' },
    url: 'https://praxisaimedia.com/',
    featured: true,
  },
  {
    category: 'AI Projects',
    title: 'CuerPOWER',
    description: 'A fitness, nutrition, supplementation, and accountability experience with a 24/7 AI coach for ambitious women.',
    image: cuerPowerImg,
    technologies: ['AI Coach', 'Fitness', 'Nutrition', 'Accountability'],
    metrics: { completion: '100%', duration: '6 weeks', team: '2 people' },
    url: 'https://cuerpower.app/',
    featured: true,
  },
  {
    category: 'AI Projects',
    title: 'Mother AI',
    description: 'A family-first AI education platform that helps parents understand change, discuss it with confidence, and make grounded choices.',
    image: motherAIImg,
    technologies: ['React', 'AI', 'Education', 'Personalization'],
    metrics: { completion: '100%', duration: '6 weeks', team: '2 people' },
    url: 'https://motherai.businessevolutionai.com/',
    featured: true,
  },
  {
    category: 'AI Projects',
    title: 'SecurRoom AI',
    description: 'AI-powered due diligence, document analysis, and automated redaction for streamlined M&A workflows.',
    image: securRoomImg,
    technologies: ['Python', 'NLP', 'React', 'Automation'],
    metrics: { completion: '100%', duration: '8 weeks', team: '2 people' },
    url: 'https://nexplutus.com/',
  },
  {
    category: 'AI Projects',
    title: 'PrimeAgeFit',
    description: 'Hyper-personalized fitness and wellness plans that adapt to each member’s goals and progress.',
    image: primeAgeFitImg,
    technologies: ['React', 'Node.js', 'AI', 'Fitness'],
    metrics: { completion: '100%', duration: '8 weeks', team: '2 people' },
    url: 'https://primeagefit.com/',
    featured: true,
  },
  {
    category: 'AI Projects',
    title: 'PrepForIndependence AI',
    description: 'AI-powered financial literacy, responsibility, and life-skills programs designed for real-life success.',
    image: prepForIndependenceImg,
    technologies: ['React', 'Python', 'AWS', 'AI'],
    metrics: { completion: '100%', duration: '8 weeks', team: '3 people' },
    url: 'https://www.prepforindependence.ai/',
  },
  {
    category: 'AI Projects',
    title: 'CORY AI Premium Intelligence',
    description: 'An operating environment that turns methodology, decisions, and action into a guided execution system.',
    image: coryAIImg,
    technologies: ['React', 'AI', 'Automation', 'Integrations'],
    metrics: { completion: '100%', duration: '8 weeks', team: '3 people' },
    url: 'https://coryai.io/',
    featured: true,
  },
  {
    category: 'AI Projects',
    title: 'ScalingCoach.ai',
    description: 'A growth OS for coaches to define offers, create conversion assets, and execute a focused 90-day plan.',
    image: scalingCoachImg,
    technologies: ['React', 'AI', 'Growth OS', 'Content Strategy'],
    metrics: { completion: '100%', duration: '8 weeks', team: '3 people' },
    url: 'https://scalingcoach.ai/',
  },
  {
    category: 'AI Projects',
    title: 'Astrology AI',
    description: 'A personalized astrology experience delivered through an elegant, guided AI interface.',
    image: astrologyAIImg,
    technologies: ['React', 'AI', 'Personalization', 'Astrology'],
    metrics: { completion: '100%', duration: '4 weeks', team: '2 people' },
    url: 'https://astrology-ai.businessevolutionai.com/',
  },
  {
    category: 'AI Projects',
    title: 'ClickAI',
    description: 'An AI-powered marketing workspace built to sharpen execution and accelerate campaign decisions.',
    image: clickAIImg,
    technologies: ['React', 'AI', 'Marketing', 'Automation'],
    metrics: { completion: '100%', duration: '4 weeks', team: '2 people' },
    url: 'https://click-ai.businessevolutionai.com/',
  },
  {
    category: 'Mobile Apps',
    title: 'OnyxFlow',
    description: 'Enterprise workflow software for repetitive tasks, fragmented systems, and manual approvals.',
    image: onyxFlowImg,
    technologies: ['React Native', 'Firebase', 'Redux'],
    metrics: { completion: '100%', duration: '8 weeks', team: '3 people' },
    url: 'https://onyxflowai.com/',
  },
  {
    category: 'AI Projects',
    title: 'Foreclosurebid AI',
    description: 'AI-driven property rankings, risk analysis, and market insights for foreclosure opportunities nationwide.',
    image: foreclosurebidAIImg,
    technologies: ['Python', 'AI', 'Real Estate API', 'React'],
    metrics: { completion: '100%', duration: '12 weeks', team: '3 people' },
    url: 'https://foreclosurebidai.com/',
    featured: true,
  },
  {
    category: 'AI Projects',
    title: 'Life App',
    description: 'Personalized guidance, progress tracking, and education for joint and skin health journeys.',
    image: lifeAppImg,
    technologies: ['React', 'AI', 'Health', 'Progress Tracking'],
    metrics: { completion: '100%', duration: '6 weeks', team: '2 people' },
    url: 'https://app.beautyandhealthfromwithin.com/',
  },
  {
    category: 'AI Projects',
    title: 'Do The Thing',
    description: 'Automated daily challenges that keep communities active, motivated, and connected.',
    image: doTheThingImg,
    technologies: ['React', 'AI', 'Community', 'Automation'],
    metrics: { completion: '100%', duration: '6 weeks', team: '2 people' },
    url: 'https://stage.challengeapp.businessevolutionai.com/',
  },
  {
    category: 'Mobile Apps',
    title: 'CastlR Mobile',
    description: 'A mobile community safety experience with incident reporting, alerts, and professional security support.',
    image: castlrMobileImg,
    technologies: ['React Native', 'Firebase', 'Real-time', 'Maps API'],
    metrics: { completion: '100%', duration: '8 weeks', team: '2 people' },
    url: 'https://apps.apple.com/us/app/castlr-community-management/id6757694056',
  },
  {
    category: 'AI Projects',
    title: 'Face Analyzer',
    description: 'AI-driven Western Physiognomy insights for personality, decision-making styles, and rapport building.',
    image: faceAnalyzerImg,
    technologies: ['Python', 'AI', 'Computer Vision', 'React'],
    metrics: { completion: '100%', duration: '4 weeks', team: '2 people' },
    url: 'https://face-analyzer.businessevolutionai.com/',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
