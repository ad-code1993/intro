import heroData from '@/data/hero.json'
import aboutData from '@/data/about.json'
import projectsData from '@/data/projects.json'
import skillsData from '@/data/skills.json'
import experienceData from '@/data/experience.json'

export const SITE_CONFIG = {
  name: 'Amanuel Demirew',
  title: 'Amanuel Demirew | Full-Stack Engineer & AI Developer',
  description: 'Full-Stack Software Engineer specializing in AI systems, backend architecture, automation, and scalable web applications. Building intelligent software solutions.',
  url: 'https://amanuel.dev',
  ogImage: 'https://amanuel.dev/og-image.jpg',
  twitterHandle: '@amanuel_dev',
  keywords: [
    'Full-Stack Developer',
    'AI Developer',
    'Software Engineer',
    'Python',
    'FastAPI',
    'Next.js',
    'LangChain',
    'Machine Learning',
    'Backend Architecture',
    'AI Systems',
  ],
}

// Generate Organization JSON-LD Schema
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    sameAs: [
      'https://github.com/ad-code1993',
      'https://linkedin.com/in/amanuel-demirew',
      'https://twitter.com/amanuel_dev',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'General',
      email: 'contact@amanuel.dev',
    },
  }
}

// Generate Person JSON-LD Schema
export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: aboutData.bio.name,
    jobTitle: aboutData.bio.title,
    description: aboutData.bio.description1,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/og-image.jpg`,
    email: 'contact@amanuel.dev',
    sameAs: [
      'https://github.com/ad-code1993',
      'https://linkedin.com/in/amanuel-demirew',
      'https://twitter.com/amanuel_dev',
    ],
    knowsAbout: [
      'Python',
      'FastAPI',
      'Next.js',
      'AI Systems',
      'LangChain',
      'Machine Learning',
      'Backend Architecture',
      'Full-Stack Development',
    ],
  }
}

// Generate Project JSON-LD Schema
export function getProjectsSchema() {
  return projectsData.projects.slice(0, 3).map((project) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.description,
    url: project.github,
    codeRepository: project.github,
    programmingLanguage: project.technologies,
    author: {
      '@type': 'Person',
      name: 'Amanuel Demirew',
    },
  }))
}

// Generate BreadcrumbList Schema
export function getBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: `${SITE_CONFIG.url}#about`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Projects',
        item: `${SITE_CONFIG.url}#projects`,
      },
    ],
  }
}

// Extract keywords from data
export function getKeywordsFromData() {
  const skills = skillsData.categories.flatMap((cat) => cat.skills).slice(0, 10)
  const technologies = projectsData.projects.flatMap((p) => p.technologies).slice(0, 5)

  return [
    ...SITE_CONFIG.keywords,
    ...skills,
    ...technologies,
  ].slice(0, 20)
}
