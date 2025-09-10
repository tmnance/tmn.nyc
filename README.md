# tmn.nyc

A modern, responsive personal website built with React, TypeScript, and Vite.

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Routing**: React Router DOM
- **Linting**: ESLint with TypeScript support
- **Git Hooks**: Husky with lint-staged

## Prerequisites

- Node.js (v16 or higher)
- npm

## Getting Started

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

## Available Scripts

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
├── pages/              # Page components
├── data/               # Static data and content
├── App.tsx             # Main app component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Configuration Files

- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration
- `package.json` - Dependencies and scripts

## Customization

### Adding New Projects

Edit `src/data/content.ts` to add or modify projects:

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

The project uses Tailwind CSS for styling:

- Modify `tailwind.config.js` to customize the design system
- Add custom styles in `src/index.css`
- Use Tailwind utility classes throughout components

## Build Process

### Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## Code Quality

### Linting

```bash
npm run lint
```

Runs ESLint to check for code quality issues.

### Auto-fix Linting Issues

```bash
npm run lint:fix
```

Automatically fixes ESLint issues where possible.

### Type Checking

```bash
npm run type-check
```

Runs TypeScript compiler to check for type errors.

### Pre-commit Hooks

The project uses Husky with lint-staged to automatically run linting on staged files before commits.

## Deployment

### GitHub Pages (Automatic)

This repository is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** triggers automatic deployment
2. **Custom domain**: `tmn.nyc` (configured via CNAME file)
3. **GitHub Actions** handles the build and deployment process

### Manual Deployment

The built files in the `dist/` directory can also be deployed to any static hosting service.

## License

MIT License
