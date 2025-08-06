# Zwe Htet Naing - Portfolio Website

A modern, responsive portfolio website built with Vue 3, TypeScript, and Tailwind CSS, showcasing professional backend development skills and experience.

## 🚀 Features

- **Modern Tech Stack**: Vue 3 with Composition API, TypeScript, Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Internationalization**: English and Burmese language support
- **Dark/Light Theme**: System preference detection with manual toggle
- **Performance Optimized**: Lazy loading, code splitting, service worker
- **SEO Friendly**: Meta tags, structured data, sitemap
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation
- **Smooth Animations**: Intersection Observer based scroll animations
- **Contact Form**: Functional contact form with validation

## 🛠️ Tech Stack

- **Frontend**: Vue 3, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **Internationalization**: Vue I18n
- **Icons**: Iconify
- **Form Validation**: VeeValidate
- **Build Tool**: Vite
- **Deployment**: Netlify/Vercel ready

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/zwehtetnaing/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## 🏗️ Build

### Development Build
```bash
npm run build
```

### Production Build (with linting and type checking)
```bash
npm run build:prod
```

### Preview Production Build
```bash
npm run preview
```

## 🚀 Deployment

### Netlify
1. Build the project:
```bash
npm run build:prod
```

2. Deploy to Netlify:
```bash
npm run deploy:netlify
```

Or connect your GitHub repository to Netlify for automatic deployments.

### Vercel
1. Build the project:
```bash
npm run build:prod
```

2. Deploy to Vercel:
```bash
npm run deploy:vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Manual Deployment
1. Build the project:
```bash
npm run build:prod
```

2. Upload the `dist` folder to your web server.

## 📁 Project Structure

```
src/
├── assets/          # Static assets (styles, images)
├── components/      # Vue components
│   ├── common/      # Common components (Header, Footer)
│   ├── sections/    # Page sections (Hero, About, etc.)
│   └── ui/          # Reusable UI components
├── composables/     # Vue composables
├── i18n/           # Internationalization files
├── locales/        # Translation files
├── router/         # Vue Router configuration
├── stores/         # Pinia stores
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── views/          # Page components
```

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your primary colors
        },
        secondary: {
          // Your secondary colors
        }
      }
    }
  }
}
```

### Content
Update personal information in `src/utils/constants.ts`:

```typescript
export const PERSONAL_INFO = {
  name: 'Your Name',
  title: 'Your Title',
  // ... other info
}
```

### Translations
Add or modify translations in:
- `src/locales/en.json` (English)
- `src/locales/my.json` (Burmese)

## 📊 Performance

The website is optimized for performance with:
- Lighthouse score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Service Worker for caching and offline support

## 🔧 Development

### Code Quality
- ESLint for code linting
- TypeScript for type safety
- Vue 3 Composition API for better code organization

### Testing
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Lint check (without fixing)
npm run lint:check
```

### Bundle Analysis
```bash
npm run analyze
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Zwe Htet Naing - [contact@zwehtetnaing.dev](mailto:contact@zwehtetnaing.dev)

Project Link: [https://github.com/zwehtetnaing/portfolio-website](https://github.com/zwehtetnaing/portfolio-website)

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Iconify](https://iconify.design/) - Universal icon framework