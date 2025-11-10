# Project Conventions

## Project Overview

- This is a Next.js project with Sanity CMS
- Always use British English spellings (colour, behaviour, realise, optimise, centre, licence, defence)
- Follow existing code style and patterns
- Use the existing project structure when suggesting file paths

## Code Style

- TypeScript for all new code
- Functional components with hooks
- Semantic HTML with accessibility practices
- Follow existing ESLint configuration (antfu/eslint-config)

## File Structure

- Components in `/components`
- Pages in `/pages` or `/app`
- Utilities in `/lib`
- Types in `/types`
- Sanity schemas in `/sanity/schemas`

## Naming Conventions

- PascalCase for components
- camelCase for functions/variables
- kebab-case for files/folders

## Sanity CMS

- Schema files in `/sanity/schemas`
- Use `npm run build && npm run deploy` for schema updates
- Project ID: ix9xb2vm
- Dataset: production
