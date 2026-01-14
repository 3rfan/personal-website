'use client'

import * as React from 'react'
import { Moon, Sun, Home, User, Briefcase, Mail, BookOpen } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { languages, languageFlags } from '../../i18n/ui'

interface NavigationCardProps {
  currentLang: string
  currentRoute: string
  languagePaths: Record<string, string>
  translations: {
    about: string
    contacts: string
    experience: string
    now: string
    portfolio: string
  }
}

export function NavigationCard({
  currentLang,
  currentRoute,
  languagePaths,
  translations,
}: NavigationCardProps) {
  const [theme, setThemeState] = React.useState<'light' | 'dark' | 'system'>(
    'light',
  )
  const [activeSection, setActiveSection] = React.useState<string>('')

  React.useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as
      | 'light'
      | 'dark'
      | 'system'
      | null
    const initialTheme = savedTheme || 'system'
    setThemeState(initialTheme)

    // Apply initial theme
    const isDark =
      initialTheme === 'dark' ||
      (initialTheme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  }, [])

  React.useEffect(() => {
    // Skip if theme hasn't been initialized yet
    if (theme === 'light' && !localStorage.getItem('theme')) return

    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  }, [theme])

  const onChangeTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const applyTheme = () => {
      setThemeState(newTheme)
      localStorage.setItem('theme', newTheme)
    }

    if (document.startViewTransition) {
      document.startViewTransition(applyTheme)
    } else {
      applyTheme()
    }
  }

  const handleLanguageChange = (newLang: string) => {
    const newPath = languagePaths[newLang] || '/'
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        window.location.href = newPath
      })
    } else {
      window.location.href = newPath
    }
  }

  const scrollToSection = (sectionId: string) => {
    // Find the card element by looking for specific card content
    let targetElement: HTMLElement | null = null
    
    // Map section IDs to their identifying content
    const sectionSelectors: Record<string, string> = {
      about: translations.about,
      contacts: translations.contacts,
      experience: translations.experience,
      now: translations.now,
      portfolio: translations.portfolio,
    }

    // Search for the card with the matching title
    const allCards = document.querySelectorAll('.card-animate')
    allCards.forEach((card) => {
      const titleElement = card.querySelector('h1, h2, h3')
      if (titleElement?.textContent?.includes(sectionSelectors[sectionId])) {
        targetElement = card as HTMLElement
      }
    })

    if (targetElement) {
      // Remove active border from all cards
      allCards.forEach((card) => {
        card.classList.remove('border-primary', 'border-2')
      })

      // Add active border to target card
      targetElement.classList.add('border-primary', 'border-2')
      setActiveSection(sectionId)

      // Scroll to the element on mobile
      if (window.innerWidth < 768) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }

      // Remove the border after 3 seconds
      setTimeout(() => {
        if (targetElement) {
          targetElement.classList.remove('border-primary', 'border-2')
        }
        setActiveSection('')
      }, 3000)
    }
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h6 className="text-sm font-semibold text-muted-foreground">Theme</h6>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="ml-2">
                {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => onChangeTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChangeTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChangeTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Language</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <span className="text-lg leading-none">
                {languageFlags[currentLang as keyof typeof languageFlags]}
              </span>
              <span className="text-sm ml-2">
                {languages[currentLang as keyof typeof languages]}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[140px]">
            {Object.entries(languages).map(([l, label]) => (
              <DropdownMenuItem
                key={l}
                onClick={() => handleLanguageChange(l)}
                className={`flex cursor-pointer items-center gap-2 ${
                  currentLang === l ? 'bg-accent font-semibold' : ''
                }`}
              >
                <span className="text-sm leading-none">
                  {languageFlags[l as keyof typeof languageFlags]}
                </span>
                <span>{label}</span>
                {currentLang === l && <span className="ml-auto text-xs">✓</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Sections</h3>
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="xs"
            className={`justify-start ${activeSection === 'about' ? 'bg-accent' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            <User className="mr-2 h-4 w-4" />
            {translations.about}
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className={`justify-start ${activeSection === 'contacts' ? 'bg-accent' : ''}`}
            onClick={() => scrollToSection('contacts')}
          >
            <Mail className="mr-2 h-4 w-4" />
            {translations.contacts}
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className={`justify-start ${activeSection === 'experience' ? 'bg-accent' : ''}`}
            onClick={() => scrollToSection('experience')}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            {translations.experience}
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className={`justify-start ${activeSection === 'now' ? 'bg-accent' : ''}`}
            onClick={() => scrollToSection('now')}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            {translations.now}
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className={`justify-start ${activeSection === 'portfolio' ? 'bg-accent' : ''}`}
            onClick={() => scrollToSection('portfolio')}
          >
            <Home className="mr-2 h-4 w-4" />
            {translations.portfolio}
          </Button>
        </div>
      </div>
    </div>
  )
}
