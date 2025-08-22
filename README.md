# Vue Portfolio

A modern, responsive portfolio website built with Vue 3, TypeScript, and Tailwind CSS. This project replicates the design from the original demo.html while providing a more maintainable and scalable architecture.

## 🚀 Features

- **Modern Stack**: Vue 3 + TypeScript + Tailwind CSS
- **Responsive Design**: Mobile-first approach with smooth animations
- **JSON-driven Content**: Easy to update portfolio data
- **Component-based Architecture**: Modular and maintainable code
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance Optimized**: Fast loading with Vite
- **Type Safety**: Full TypeScript support

## 📋 Prerequisites

Make sure you have the following installed:
- Node.js (version 16.0 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository or navigate to the project directory:
```bash
cd portfolio/vue-portfolio
```

2. Install dependencies:
```bash
npm install
```

## 🏃‍♂️ Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Vue components
│   ├── Navigation.vue
│   ├── HeroSection.vue
│   ├── TechStack.vue
│   ├── AboutSection.vue
│   ├── ExperienceSection.vue
│   ├── ProjectsSection.vue
│   ├── EducationSection.vue
│   ├── ContactSection.vue
│   └── FooterSection.vue
├── data/               # JSON data files
│   ├── portfolio.json
│   └── navigation.json
├── types/              # TypeScript interfaces
│   └── portfolio.ts
├── assets/             # CSS and static assets
│   └── main.css
├── App.vue             # Main App component
├── main.ts             # Application entry point
└── vite-env.d.ts       # TypeScript declarations
```

## ⚙️ Configuration

### Portfolio Data
Update your portfolio information in `src/data/portfolio.json`:
- Personal information
- Skills and technologies
- Work experience
- Projects
- Education
- Contact details

### Navigation
Modify the navigation menu in `src/data/navigation.json`.

### Styling
Custom styles are defined in `src/assets/main.css`. The project uses:
- Tailwind CSS for utility classes
- Custom CSS classes for animations and specific styling
- CSS variables for consistent theming

## 🎨 Customization

### Colors
The main theme colors are defined in `tailwind.config.js`:
```javascript
colors: {
  'soft-dark': '#334155',
  'soft-gray': '#64748b',
  'soft-light': '#94a3b8',
}
```

### Animations
Custom animations are defined in `src/assets/main.css`:
- Fade-in animations using Intersection Observer
- Hover effects and transitions
- Typing cursor animation

## 🔧 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Font Awesome** - Icon library
- **Inter Font** - Clean, modern typography

## 📱 Browser Support

This project supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

The built files in the `dist` folder can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **AWS S3**: Upload the `dist` folder contents

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, feel free to reach out:
- Email: zwehtet.dev@gmail.com
- Create an issue in this repository

## 🎯 Performance Tips

- Images are lazy-loaded for better performance
- CSS animations use GPU acceleration
- Components are optimized for tree-shaking
- Bundle size is minimized with Vite's optimizations

---
