# Code Style Guidelines

## ESLint Configuration

All generated code must strictly adhere to the project's ESLint configuration defined in `eslint.config.mjs`.

#[[file:eslint.config.mjs]]

## Validation Process

After generating any code files, always run ESLint with autofix to ensure compliance:

```bash
npx eslint <files> --fix
```

This automatically corrects style issues to match the project's configuration.

## Technical Standards

All code must follow the technical standards defined in:

#[[file:.kiro/specs/technical-standards.md]]

## Specification Documents

When creating feature specifications for SDD (Specification-Driven Development):

- Place specification documents in `.kiro/specs/<feature-name>/` directory
- Use `requirements.md` for the main specification
- Additional files: `design.md`, `tasks.md`, etc. as needed
- Reference `technical-standards.md` instead of repeating common requirements
- Use British English spelling and terminology
