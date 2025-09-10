# tmn.nyc - Personal Website

A modern, responsive personal website for Tim Nance - Senior Engineering Manager with experience at Betterment, The New York Times, WeWork, and Facebook.

## Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Fast Performance**: Optimized build with Vite for lightning-fast development and production builds
- **Type Safety**: Full TypeScript support for better development experience
- **Accessibility**: Built with accessibility best practices in mind
- **Code Quality**: Enforced with ESLint, TypeScript strict mode, and pre-commit hooks
- **Professional Focus**: Showcases platform engineering, team leadership, and mobile development expertise

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Routing**: React Router DOM
- **UI Components**: Headless UI

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tmn.nyc
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and auto-fix issues
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navigation.tsx   # Main navigation component
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── About.tsx       # About page
│   ├── Projects.tsx    # Projects showcase
│   └── Contact.tsx     # Contact information
├── data/               # Static data and content
│   └── content.ts      # Projects and contact data
├── App.tsx             # Main app component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Customization

### Adding New Projects

Edit `src/data/content.ts` to add or modify projects. The current projects showcase:

- **HabitPanda**: iOS habit tracking app with both original and SwiftUI versions
- **Sudoku Puzzle Solver/Generator**: Python-based puzzle solving tool
- **Crossword Puzzle Generator**: PHP-based crossword generation system

```typescript
export const projects: Project[] = [
  {
    name: 'Your Project Name',
    technologies: ['react', 'typescript'],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/username/repo'
      }
    ]
  }
];
```

### Updating Contact Information

Modify the contact links in `src/data/content.ts`:

```typescript
export const contactLinks: ContactLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/username'
  }
];
```

### Styling

The project uses Tailwind CSS for styling. You can:

- Modify `tailwind.config.js` to customize the design system
- Add custom styles in `src/index.css`
- Use Tailwind utility classes throughout components

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## License

MIT License - feel free to use this as a template for your own personal website!
