# Development Guide

This guide will help you customize and extend your Vue.js portfolio application.

## 🎯 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**: http://localhost:3000

## 📝 Customizing Your Portfolio

### 1. Personal Information

Edit `src/data/portfolio.json` to update your personal information:

```json
{
  "name": "Your Name",
  "title": "Your Professional Title",
  "summary": "Brief summary about yourself",
  "professionalSummary": "Detailed professional summary",
  "contact": {
    "email": "your@email.com",
    "phone": "+1234567890",
    "location": "Your City, Country"
  }
}
```

### 2. Skills and Technologies

Update the `techStack` array in `portfolio.json`:

```json
{
  "name": "Technology Name",
  "icon": "fab fa-icon-name",
  "color": "#HEX_COLOR",
  "category": "Framework/Language/Tool"
}
```

**Finding Icons**: Use Font Awesome icons from https://fontawesome.com/icons

### 3. Work Experience

Add your work experience in the `experience` array:

```json
{
  "position": "Job Title",
  "company": "Company Name",
  "period": "2023 - Present",
  "responsibilities": [
    "Achievement or responsibility 1",
    "Achievement or responsibility 2"
  ]
}
```

### 4. Projects

Update the `projects` array:

```json
{
  "title": "Project Name",
  "description": "Project description",
  "technologies": ["Tech1", "Tech2"],
  "icon": "fas fa-icon",
  "demoUrl": "https://demo.com",
  "codeUrl": "https://github.com/username/repo"
}
```

### 5. Education/Courses

Modify the `courses` array:

```json
{
  "title": "Course/Degree Title",
  "institution": "Institution Name",
  "period": "2023 - 2024",
  "description": "Course description"
}
```

## 🎨 Styling Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  'soft-dark': '#334155',    // Main dark text
  'soft-gray': '#64748b',    // Secondary text
  'soft-light': '#94a3b8',   // Light text
}
```

### Custom CSS

Add custom styles in `src/assets/main.css`:

```css
/* Custom gradient */
.my-gradient {
  background: linear-gradient(135deg, #your-color1, #your-color2);
}

/* Custom animation */
@keyframes myAnimation {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## 🛠️ Adding New Sections

### 1. Create Component

Create a new component in `src/components/`:

```vue
<template>
  <section id="my-section" class="section-padding">
    <div class="max-w-6xl mx-auto px-8">
      <div class="content-spacing">
        <h2 class="section-title">My New Section</h2>
        <p class="section-subtitle">Section description</p>
      </div>
      
      <!-- Your content here -->
    </div>
  </section>
</template>

<script setup lang="ts">
// Component logic
</script>
```

### 2. Import in App.vue

```vue
<script setup lang="ts">
import MyNewSection from '@/components/MyNewSection.vue'
</script>

<template>
  <div id="app">
    <!-- Other sections -->
    <MyNewSection />
  </div>
</template>
```

### 3. Add to Navigation

Update `src/data/navigation.json`:

```json
[
  {
    "name": "My Section",
    "href": "#my-section"
  }
]
```

## 🔧 Advanced Customization

### TypeScript Interfaces

Add new types in `src/types/portfolio.ts`:

```typescript
export interface NewDataType {
  id: string
  name: string
  value: number
}
```

### Animation Effects

Add new animations in `src/assets/main.css`:

```css
.slide-in {
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.slide-in.active {
  transform: translateX(0);
}
```

### Responsive Design

Use Tailwind's responsive classes:

```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Content adapts to screen size -->
</div>
```

## 📱 Mobile Optimization

### Responsive Images

```vue
<img
  class="w-full h-auto"
  src="image.jpg"
  alt="Description"
  loading="lazy"
/>
```

### Touch-friendly Buttons

```vue
<button class="min-h-[44px] min-w-[44px] p-3">
  Touch-friendly button
</button>
```

## 🚀 Performance Tips

### Lazy Loading

```vue
<img loading="lazy" src="image.jpg" alt="Description" />
```

### Code Splitting

```typescript
// Lazy load components
const MyComponent = defineAsyncComponent(() => import('./MyComponent.vue'))
```

### Bundle Analysis

```bash
npm run build -- --analyze
```

## 🧪 Testing

### Component Testing

```bash
# Add testing dependencies
npm install -D @vue/test-utils vitest jsdom
```

### Type Checking

```bash
npm run type-check
```

## 📦 Building for Production

### Development Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Environment Variables

Create `.env` files:

```bash
# .env.development
VITE_API_URL=http://localhost:3000

# .env.production
VITE_API_URL=https://api.yourdomain.com
```

## 🚀 Deployment

### Static Hosting (Recommended)

1. **Netlify**: Drag `dist` folder to Netlify
2. **Vercel**: Connect GitHub repository
3. **GitHub Pages**: Use GitHub Actions

### Build Command

```json
{
  "scripts": {
    "build": "vue-tsc && vite build"
  }
}
```

## 🐛 Common Issues

### TypeScript Errors

```bash
# Check types
npm run type-check

# Fix auto-fixable issues
npm run type-check -- --fix
```

### Build Errors

```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Styling Issues

1. Check Tailwind classes are correct
2. Verify CSS imports in `main.ts`
3. Check browser developer tools

## 📚 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Guide](https://vitejs.dev/)
- [Font Awesome Icons](https://fontawesome.com/)

## 🤝 Best Practices

### Code Organization

```
src/
├── components/     # Reusable UI components
├── data/          # JSON data files
├── types/         # TypeScript interfaces
├── assets/        # Static assets
└── utils/         # Helper functions
```

### Naming Conventions

- **Components**: PascalCase (`MyComponent.vue`)
- **Files**: kebab-case (`my-file.ts`)
- **CSS Classes**: kebab-case (`.my-class`)
- **Variables**: camelCase (`myVariable`)

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-section
git add .
git commit -m "Add new portfolio section"
git push origin feature/new-section
```

## 💡 Tips

1. **Use TypeScript**: Leverage type checking for better code quality
2. **Mobile First**: Design for mobile, then desktop
3. **Performance**: Optimize images and lazy load content
4. **Accessibility**: Use semantic HTML and ARIA labels
5. **SEO**: Add proper meta tags and structured data

Happy coding! 🎉