export interface NavigationItem {
  name: string;
  href: string;
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
}

export interface Skills {
  technical: string[];
}

export interface TechStackItem {
  name: string;
  icon: string;
  color: string;
  category: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Experience {
  position: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Course {
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  icon: string;
  demoUrl?: string;
  codeUrl?: string;
}

export interface Portfolio {
  name: string;
  title: string;
  summary: string;
  professionalSummary: string;
  contact: Contact;
  skills: Skills;
  techStack: TechStackItem[];
  languages: Language[];
  experience: Experience[];
  courses: Course[];
  projects: Project[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
