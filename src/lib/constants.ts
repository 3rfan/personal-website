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
    link: 'https://www.tudelft.nl/en/',
  }
]

export const EXPERIENCE = [
  {
    id: 'BICT Groep',
    start: '2024',
    link: 'https://www.bictgroep.nl/',
    end: 'Current',
  },
]
