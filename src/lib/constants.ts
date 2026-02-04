import type { Site, Page } from './types'

export const loaderAnimation = [
  '.loader',
  { opacity: [1, 0], pointerEvents: 'none' },
  { easing: 'ease-out' },
]

export const LINKS = {
  github: 'https://github.com/3rfan',
  linkedin: 'https://www.linkedin.com/in/3rfanh/',
  mail: 'mailto:erfan_hosseini1@hotmail.com',
  instagram: 'https://www.instagram.com/caj_ink/',
}

// Global
export const SITE: Site = {
  TITLE: 'Astro Sphere',
  DESCRIPTION:
    'Welcome to Astro Sphere, a portfolio and blog for designers and developers.',
  AUTHOR: 'Mark Horn',
}

// Work Page
export const WORK: Page = {
  TITLE: 'Work',
  DESCRIPTION: 'Places I have worked.',
}

// Projects Page
export const PROJECTS: Page = {
  TITLE: 'Projects',
  DESCRIPTION: 'Recent projects I have worked on.',
}

// Education Page
export const EDUCATION = [
  {
    institution: 'Delft University of Technology',
    degree: 'BSc Computer Science and Engineering',
    specialization: 'AI and Data Specialisation',
    start: '2024',
    end: '2028',
    link: 'https://www.tudelft.nl/en/',
  }
]

export const EXPERIENCE = [
  {
    id: 'bictgroep',
    start: '2025',
    link: 'https://www.bictgroep.nl/',
    end: 'Current',
  },
  {
    id: 'bictgroep2',
    start: '2024',
    link: 'https://www.bictgroep.nl/',
    end: '2025',
  },
]

// Projects
export const PROJECTS_DATA = [
  {
    id: 'project-4',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/3rfan/fpl-ai-recommender',
    liveUrl: '',
    images: [
      '/projects/project-1-screenshot-1.png',
      '/projects/project-1-screenshot-2.png'
    ],
    featured: true,
    startDate: '2025',
    endDate: 'present'
  },
  {
    id: 'project-3',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
    githubUrl: '',
    liveUrl: '',
    images: [
      '/projects/project-2-img-1.png',
      '/projects/project-2-img-2.png'
    ],
    featured: true,
    startDate: '2025',
    endDate: '2026'
  },
  {
    id: 'project-2',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
    githubUrl: '',
    liveUrl: '',
    images: [
      '/projects/project-3-img-1.png',
      '/projects/project-3-img-2.png'
    ],
    featured: false,
    startDate: '2024',
    endDate: '2025'
  },
  {
    id: 'project-1',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
    githubUrl: '',
    liveUrl: '',
    images: [
      '/projects/project-4-img-1.png',
      '/projects/project-4-img-2.png'
    ],
    featured: true,
    startDate: '2024',
    endDate: '2025'
  },
]
