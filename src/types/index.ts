// Personal Information Types
export interface ContactInfo {
  phone: string
  email: string
  location: string
}

export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  contact: ContactInfo
  summary: string
}

// Skills Types
export interface TechnicalSkill {
  name: string
  level: number
  icon: string
}

export interface SoftSkill {
  name: string
  description: string
}

export interface Language {
  name: string
  level: string
  flag: string
}

export interface Skills {
  technical: TechnicalSkill[]
  soft: SoftSkill[]
  languages: Language[]
}

// Project Types
export interface ProjectLinks {
  demo?: string
  github?: string
}

export interface Project {
  id: number
  title: string
  role: string
  technologies: string[]
  description: string
  features: string[]
  links: ProjectLinks
  image: string
  category?: 'web' | 'api' | 'mobile'
  status?: 'completed' | 'in-progress' | 'planned'
}

// Experience Types
export interface Experience {
  id: number
  company: string
  position: string
  duration: string
  description?: string
  responsibilities: string[]
  achievements?: string[]
  technologies?: string[]
  logo: string
}

// Education Types
export interface Education {
  id: number
  institution: string
  course: string
  duration: string
  location: string
  status: 'Completed' | 'In Progress'
}

// Navigation Types
export interface NavigationLink {
  name: string
  href: string
  key: string
}

// Theme Types
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: {
    primary: string
    secondary: string
  }
}

export interface ThemeConfig {
  light: ThemeColors
  dark: ThemeColors
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface FormValidation {
  isValid: boolean
  errors: Record<string, string>
}

// Animation Types
export interface AnimationOptions {
  duration?: number
  delay?: number
  easing?: string
  threshold?: number
}

// Store Types
export interface ThemeState {
  isDark: boolean
  systemPreference: 'light' | 'dark'
}

export interface LanguageState {
  currentLanguage: 'en' | 'my'
  availableLanguages: string[]
}

export interface UIState {
  isMenuOpen: boolean
  isLoading: boolean
  scrollY: number
}