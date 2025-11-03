# AI Behaviour Guidelines

## Response Style

- Write only the minimal code needed to address requirements correctly
- Avoid verbose implementations
- Don't remove user's code including test cases unless explicitly asked
- Don't automatically add tests unless requested
- Ask for confirmation before destructive changes

## Code Modifications

- Don't modify the same file in consecutive steps with small incremental changes
- Make all necessary changes to a file at once
- Only split changes if they're too large for a single edit
- Always preserve existing functionality unless asked to change it

## ESLint Compliance

- Follow the project's ESLint configuration (@antfu/eslint-config)
- Use consistent import ordering and formatting
- Apply proper spacing and indentation
- Use single quotes for strings
- Include trailing commas in multiline structures
- Run `npm run lint` after creating/modifying files to verify compliance

## British English

- Use British spellings consistently: colour, behaviour, realise, optimise, centre, licence, defence
- Apply to all code comments, documentation, and variable names where appropriate
