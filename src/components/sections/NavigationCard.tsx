'use client'

import * as React from 'react'
import { Moon, Sun, User, Briefcase, Mail, FolderKanban, GraduationCap, Code2 } from 'lucide-react'
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
    contacts: string
    about: string
    education: string
    experience: string
    portfolio: string
    techstack: string
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
    const sectionSelectors: Record<string, string> = {
      contacts: translations.contacts,
      about: translations.about,
      education: translations.education,
      experience: translations.experience,
      portfolio: translations.portfolio,
      techstack: translations.techstack,
    }

    const allCards = document.querySelectorAll('.card-animate')
    const allButtons = document.querySelectorAll('a[href] button, a[href] > *')
    
    // Remove active borders from all cards and button glows
    allCards.forEach((card) => {
      card.classList.remove('border-primary', 'border-2')
    })
    allButtons.forEach((btn) => {
      if (btn instanceof HTMLElement) {
        btn.style.boxShadow = ''
      }
    })

    // Special handling for Contact Me - highlight the contact buttons
    if (sectionId === 'contacts') {
      // Find IntroCard and highlight Email and LinkedIn buttons
      const introCard = Array.from(allCards).find((card) => {
        const welcomeText = card.querySelector('h6')
        const text = welcomeText?.textContent?.toLowerCase()
        return text?.includes('welcome') || text?.includes('welkom')
      })

      if (introCard) {
        introCard.classList.add('border-primary', 'border-2')
        
        // Find and highlight LinkedIn and Email buttons with faint glow and jump animation
        const contactLinks = introCard.querySelectorAll('a[href*="linkedin"], a[href*="mailto"], a[href*="@"]')
        contactLinks.forEach((link) => {
          const button = link.querySelector('button')
          if (button) {
            button.style.boxShadow = '0 0 30px hsl(var(--primary) / 0.6)'
            button.style.transition = 'box-shadow 0.3s ease, transform 0.4s ease'
            
            // Jump animation: up, down, up, settle
            button.style.transform = 'translateY(-8px)'
            setTimeout(() => {
              button.style.transform = 'translateY(2px)'
            }, 150)
            setTimeout(() => {
              button.style.transform = 'translateY(-4px)'
            }, 300)
            setTimeout(() => {
              button.style.transform = 'translateY(0)'
            }, 450)
          }
        })

        // Scroll to IntroCard
        introCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setActiveSection(sectionId)

        // Remove highlights after 3 seconds
        setTimeout(() => {
          introCard.classList.remove('border-primary', 'border-2')
          contactLinks.forEach((link) => {
            const button = link.querySelector('button')
            if (button) {
              button.style.boxShadow = ''
              button.style.transform = ''
            }
          })
          setActiveSection('')
        }, 3000)
      }
      return
    }

    // Normal navigation - find and highlight target card
    let targetElement: HTMLElement | null = null
    allCards.forEach((card) => {
      const titleElement = card.querySelector('h1, h2, h3')
      if (titleElement?.textContent?.includes(sectionSelectors[sectionId])) {
        targetElement = card as HTMLElement
      }
    })

    if (targetElement) {
      targetElement.classList.add('border-primary', 'border-2')
      setActiveSection(sectionId)
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })

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
      <div className="hidden md:flex flex-col gap-2">
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

      <div className="hidden md:flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Language</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <span className="text-xs font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
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
                <span className="text-xs font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  {languageFlags[l as keyof typeof languageFlags]}
                </span>
                <span>{label}</span>
                {currentLang === l && <span className="ml-auto text-xs">✓</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Navigation - Vertical */}
      <div className="hidden flex-col gap-2 md:flex">
        <h3 className="text-sm font-semibold text-muted-foreground">Sections</h3>
        <div className="flex flex-col gap-1">
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
            className={`justify-start ${activeSection === 'about' ? 'bg-accent' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            <User className="mr-2 h-4 w-4" />
            {translations.about}
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className={`justify-start ${activeSection === 'education' ? 'bg-accent' : ''}`}
            onClick={() => scrollToSection('education')}
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            {translations.education}
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
            className={`justify-start ${activeSection === 'portfolio' ? 'bg-accent' : ''}`}
            onClick={() => scrollToSection('portfolio')}
          >
            <FolderKanban className="mr-2 h-4 w-4" />
            {translations.portfolio}
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className={`justify-start ${activeSection === 'techstack' ? 'bg-accent' : ''}`}
            onClick={() => scrollToSection('techstack')}
          >
            <Code2 className="mr-2 h-4 w-4" />
            {translations.techstack}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - Horizontal Scrollable with Sticky Controls */}
      <div className="flex gap-2 md:hidden">
        {/* Scrollable Navigation Items */}
        <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
          <Button
            variant={activeSection === 'contacts' ? 'default' : 'outline'}
            size="icon"
            className="shrink-0"
            onClick={() => scrollToSection('contacts')}
            aria-label={translations.contacts}
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            variant={activeSection === 'about' ? 'default' : 'outline'}
            size="icon"
            className="shrink-0"
            onClick={() => scrollToSection('about')}
            aria-label={translations.about}
          >
            <User className="h-4 w-4" />
          </Button>
          <Button
            variant={activeSection === 'education' ? 'default' : 'outline'}
            size="icon"
            className="shrink-0"
            onClick={() => scrollToSection('education')}
            aria-label={translations.education}
          >
            <GraduationCap className="h-4 w-4" />
          </Button>
          <Button
            variant={activeSection === 'experience' ? 'default' : 'outline'}
            size="icon"
            className="shrink-0"
            onClick={() => scrollToSection('experience')}
            aria-label={translations.experience}
          >
            <Briefcase className="h-4 w-4" />
          </Button>
          <Button
            variant={activeSection === 'portfolio' ? 'default' : 'outline'}
            size="icon"
            className="shrink-0"
            onClick={() => scrollToSection('portfolio')}
            aria-label={translations.portfolio}
          >
            <FolderKanban className="h-4 w-4" />
          </Button>
          <Button
            variant={activeSection === 'techstack' ? 'default' : 'outline'}
            size="icon"
            className="shrink-0"
            onClick={() => scrollToSection('techstack')}
            aria-label={translations.techstack}
          >
            <Code2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Sticky Theme & Language Controls */}
        <div className="flex gap-2 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Toggle theme">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Change language">
                <span className="text-xs font-bold">
                  {languageFlags[currentLang as keyof typeof languageFlags]}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px]">
              {Object.entries(languages).map(([l, label]) => (
                <DropdownMenuItem
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={`flex cursor-pointer items-center gap-2 ${
                    currentLang === l ? 'bg-accent font-semibold' : ''
                  }`}
                >
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                    {languageFlags[l as keyof typeof languageFlags]}
                  </span>
                  <span>{label}</span>
                  {currentLang === l && <span className="ml-auto text-xs">✓</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
