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
