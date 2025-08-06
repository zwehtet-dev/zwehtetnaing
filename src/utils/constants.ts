import type { 
  PersonalInfo, 
  Skills, 
  Project, 
  Experience, 
  Education, 
  NavigationLink, 
  ThemeConfig 
} from '@/types'

// Personal Information
export const PERSONAL_INFO: PersonalInfo = {
  name: 'Zwe Htet Naing',
  title: 'Junior Backend Developer',
  tagline: 'Crafting clean, scalable, and secure backend solutions',
  contact: {
    phone: '+959258431631',
    email: 'zwehtet.dev@gmail.com',
    location: 'Mandalay, Myanmar'
  },
  summary: "I'm a motivated and detail-oriented Junior Backend Developer with proven experience in building dynamic web applications and secure backend systems. My expertise lies in Laravel, MySQL, and API development, where I focus on performance, scalability, and clean architecture. I am passionate about backend logic, real-time interaction, and working collaboratively in a modern development environment."
}

// Skills Data
export const SKILLS: Skills = {
  technical: [
    { name: 'PHP', level: 85, icon: 'logos:php' },
    { name: 'Laravel', level: 90, icon: 'logos:laravel' },
    { name: 'RESTful APIs', level: 88, icon: 'mdi:api' },
    { name: 'MySQL', level: 82, icon: 'logos:mysql' },
    { name: 'Firebase', level: 75, icon: 'logos:firebase' },
    { name: 'HTML', level: 90, icon: 'logos:html-5' },
    { name: 'CSS', level: 85, icon: 'logos:css-3' },
    { name: 'JavaScript', level: 80, icon: 'logos:javascript' },
    { name: 'Tailwind CSS', level: 88, icon: 'logos:tailwindcss-icon' },
    { name: 'Bootstrap', level: 85, icon: 'logos:bootstrap' },
    { name: 'jQuery', level: 78, icon: 'logos:jquery' },
    { name: 'Git', level: 85, icon: 'logos:git-icon' },
    { name: 'GitHub', level: 85, icon: 'logos:github-icon' },
    { name: 'Linux', level: 75, icon: 'logos:linux-tux' }
  ],
  soft: [
    { name: 'Team Collaboration', description: 'Working effectively with cross-functional teams' },
    { name: 'Problem Solving', description: 'Analytical thinking and creative solution development' },
    { name: 'Critical Thinking', description: 'Evaluating complex problems and making informed decisions' },
    { name: 'Adaptability', description: 'Quickly learning new technologies and adapting to changes' }
  ],
  languages: [
    { name: 'Burmese', level: 'Fluent', flag: '🇲🇲' },
    { name: 'English', level: 'Basic', flag: '🇺🇸' }
  ]
}

// Projects Data
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Real-Time Dynamic Website',
    role: 'Backend Developer',
    technologies: ['Laravel', 'Livewire', 'Alpine.js', 'MySQL', 'Redis'],
    description: 'Developed a comprehensive real-time web application featuring dynamic components, live updates, and seamless user interactions. Built with Laravel backend and modern frontend technologies.',
    features: [
      'Real-time components with Livewire for instant updates',
      'Dynamic frontend behavior using Alpine.js',
      'Optimized database queries and caching with Redis',
      'Interactive user interface with smooth animations',
      'WebSocket integration for live notifications',
      'Responsive design for all device types',
      'Advanced form validation and error handling',
      'User authentication and authorization system'
    ],
    links: {
      demo: '#',
      github: '#'
    },
    image: '/images/project1.jpg',
    category: 'web',
    status: 'completed'
  },
  {
    id: 2,
    title: 'RESTful API Development',
    role: 'API Engineer',
    technologies: ['Laravel', 'MySQL', 'JWT', 'Swagger', 'PHPUnit'],
    description: 'Designed and implemented a comprehensive RESTful API system with advanced security features, comprehensive documentation, and robust testing suite.',
    features: [
      'Scalable API architecture with clean code principles',
      'JWT-based authentication and authorization',
      'Comprehensive security implementation (CORS, rate limiting)',
      'Advanced error handling and validation',
      'API documentation with Swagger/OpenAPI',
      'Automated testing with PHPUnit',
      'Database optimization and query performance',
      'Version control and backward compatibility'
    ],
    links: {
      demo: '#',
      github: '#'
    },
    image: '/images/project2.jpg',
    category: 'api',
    status: 'completed'
  },
  {
    id: 3,
    title: 'E-Commerce Backend System',
    role: 'Full-Stack Developer',
    technologies: ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'Docker'],
    description: 'Built a complete e-commerce backend system with payment integration, inventory management, and admin dashboard. Features modern architecture and scalable design.',
    features: [
      'Complete product catalog management',
      'Shopping cart and checkout system',
      'Stripe payment gateway integration',
      'Order management and tracking',
      'Inventory management with low-stock alerts',
      'Admin dashboard with analytics',
      'Email notifications and order confirmations',
      'Multi-language and multi-currency support'
    ],
    links: {
      demo: '#',
      github: '#'
    },
    image: '/images/project3.jpg',
    category: 'web',
    status: 'in-progress'
  },
  {
    id: 4,
    title: 'Task Management API',
    role: 'Backend Developer',
    technologies: ['Laravel', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    description: 'Developed a robust task management API with team collaboration features, real-time updates, and comprehensive project tracking capabilities.',
    features: [
      'Project and task management system',
      'Team collaboration and permissions',
      'Real-time notifications and updates',
      'File upload and attachment handling',
      'Advanced search and filtering',
      'Time tracking and reporting',
      'Integration with third-party services',
      'Scalable cloud deployment on AWS'
    ],
    links: {
      demo: '#',
      github: '#'
    },
    image: '/images/project4.jpg',
    category: 'api',
    status: 'completed'
  },
  {
    id: 5,
    title: 'Content Management System',
    role: 'Lead Developer',
    technologies: ['Laravel', 'Tailwind CSS', 'MySQL', 'Elasticsearch'],
    description: 'Created a flexible content management system with advanced publishing workflows, SEO optimization, and powerful search capabilities.',
    features: [
      'Flexible content modeling and publishing',
      'Advanced WYSIWYG editor with media management',
      'SEO optimization and meta tag management',
      'Full-text search with Elasticsearch',
      'User roles and permission system',
      'Content scheduling and workflow',
      'Multi-site management capabilities',
      'Performance optimization and caching'
    ],
    links: {
      demo: '#',
      github: '#'
    },
    image: '/images/project5.jpg',
    category: 'web',
    status: 'completed'
  }
]

// Experience Data
export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    company: 'New Way Myanmar',
    position: 'Junior Backend Developer',
    duration: '2024 - Present',
    description: 'Working as a Junior Backend Developer at New Way Myanmar, focusing on building scalable web applications and robust API systems using modern PHP frameworks and best practices.',
    responsibilities: [
      'Built full-featured dynamic web applications with Laravel and Livewire',
      'Implemented robust APIs and improved performance through optimization',
      'Worked in real-world production environments with modern technology stacks',
      'Collaborated with frontend developers to integrate backend services',
      'Participated in code reviews and maintained high code quality standards',
      'Contributed to database design and optimization for better performance'
    ],
    achievements: [
      'Successfully delivered 5+ web applications within tight deadlines',
      'Improved API response times by 40% through optimization techniques',
      'Mentored junior developers and contributed to team knowledge sharing'
    ],
    technologies: [
      'Laravel',
      'PHP',
      'MySQL',
      'Livewire',
      'Alpine.js',
      'Git',
      'Linux',
      'Redis',
      'Docker'
    ],
    logo: '/images/newway-logo.png'
  }
]

// Education Data
export const EDUCATION: Education[] = [
  {
    id: 1,
    institution: 'Data Land Technology',
    course: 'Advanced Web Technology',
    duration: '2024 - Present',
    location: 'Mandalay',
    status: 'In Progress'
  },
  {
    id: 2,
    institution: 'Data Land Technology',
    course: 'Web Development Foundation',
    duration: '2023 - 2024',
    location: 'Mandalay',
    status: 'Completed'
  },
  {
    id: 3,
    institution: 'Study Right Now',
    course: 'Java Standard Edition',
    duration: '2023 - 2024',
    location: 'Mandalay',
    status: 'Completed'
  }
]

// Navigation Links
export const NAVIGATION_LINKS: NavigationLink[] = [
  { name: 'Home', href: '#hero', key: 'nav.home' },
  { name: 'About', href: '#about', key: 'nav.about' },
  { name: 'Skills', href: '#skills', key: 'nav.skills' },
  { name: 'Projects', href: '#projects', key: 'nav.projects' },
  { name: 'Experience', href: '#experience', key: 'nav.experience' },
  { name: 'Contact', href: '#contact', key: 'nav.contact' }
]

// Theme Configuration
export const THEME_CONFIG: ThemeConfig = {
  light: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: {
      primary: '#0f172a',
      secondary: '#475569'
    }
  },
  dark: {
    primary: '#3b82f6',
    secondary: '#94a3b8',
    accent: '#fbbf24',
    background: '#0f172a',
    surface: '#1e293b',
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1'
    }
  }
}