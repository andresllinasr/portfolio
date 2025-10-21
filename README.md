# 🚀 Portfolio - TypeScript SPA

A performance-focused portfolio built with TypeScript, GSAP animations, and modular architecture. Features smooth scroll interactions, advanced text animations, and optimized loading strategies.

**Live Demo**: [View Portfolio](https://www.andresllinasr.com)

## 🛠️ Tech Stack

**Core**: TypeScript • Webpack 5 • Handlebars • SCSS  
**Styling**: Tailwind CSS v4 • PostCSS • Custom CSS Variables  
**Animation**: GSAP (ScrollTrigger, SplitText, ScrollToPlugin)  
**Tools**: ESLint • Prettier • Lighthouse

## ⚡ Performance Features

- **Code Splitting** - Automatic chunking with Webpack 5
- **Staggered Module Loading** - RequestAnimationFrame scheduling prevents layout thrashing
- **GSAP Timeline Management** - Efficient animation lifecycle
- **Asset Optimization** - Content hashing and tree shaking
- **Hot Module Replacement** - Instant development feedback

## 🏗️ Architecture

**Modular Design** - Each section is a self-contained module with TypeScript class, Handlebars template, JSON content, and animation hooks.

```
src/
├── modules/          # Feature modules (hero, about, stack, etc.)
├── components/       # Reusable UI components  
└── utils/           # Shared utilities
```

**Performance-First Loading** - Modules initialize via `requestAnimationFrame` to prevent layout thrashing:

```typescript
for (const moduleInit of modules) {
  await new Promise(resolve => {
    requestAnimationFrame(async () => {
      await moduleInit();
      resolve(void 0);
    });
  });
}
```

## 🎨 Animation System

**GSAP-Powered Animations** - Centralized system with reusable utilities:

- **Text Effects** - Custom word/character splitting with staggered reveals
- **Scroll Triggers** - Performance-optimized scroll-based animations  
- **Timeline Management** - Coordinated sequences with lifecycle hooks

## 🎯 Key Features

- **TypeScript Strict Mode** - Full type safety
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Accessibility** - Semantic HTML, keyboard navigation, ARIA support
- **Content Separation** - JSON-based content management
- **Error Handling** - Graceful degradation patterns

## 🚀 Getting Started

```bash
# Clone and install
git clone https://github.com/andresllinasr/portfolio.git
cd portfolio && npm install

# Development
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run audit    # Lighthouse performance audit
```

## 🔧 Customization

**Adding Modules**: Create in `src/modules/` with TypeScript class, Handlebars template, and JSON content  
**Styling**: Modify CSS variables in `main.css` or Tailwind theme  
**Animations**: Extend utilities in `animation-utils.ts` or create custom GSAP timelines

---

Built with TypeScript, GSAP, and attention to performance ⚡