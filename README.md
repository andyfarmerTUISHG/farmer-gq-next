# farmer-gq-next

A Next.js portfolio site with Sanity CMS, featuring AI-enhanced development workflow.

## Quick Start for Developers

1. **Clone and install**:

   ```bash
   git clone <repo-url>
   cd farmer-gq-next
   npm install
   ```

2. **Set up environment**:

   ```bash
   cp .env.local.example .env.local
   # Add your Sanity tokens (see LastPass notes)
   ```

3. **Configure AI tools**: Follow [AI Setup Guide](docs/ai-setup.md)

4. **Start developing**:
   ```bash
   npm run dev
   # Use 'q' in terminal for AI assistance
   ```

### AI-Enhanced Development

This project includes pre-configured AI agents with enhanced capabilities:

- **Sanity CMS Integration**: Query, create, and update content directly through AI
- **Next.js Runtime Info**: Get real-time diagnostics, routes, and build information
- **British English**: Consistent spelling and terminology across the project
- **Project Context**: AI understands your codebase structure and conventions

See [MCP Server Setup](docs/mcp-setup.md) for full AI capabilities.

## Project Details

### CMS is Sanity

[Farmer.gq Studio](https://farmer-gq.sanity.studio/) - this supercedes the standalone version used with Gatsby [here](https://github.com/andyfarmerTUISHG/farmer.gq.sanity)

To update Sanity Data Model

- `npm run build`
- `npm run deploy`

### Features

See [Feature Specifications](#feature-specifications) below for detailed documentation.

- **Leadership Books**: Manage book summaries with chapters, quotes, and ratings
- **Films**: Track cinema visits and film reviews with Cineworld Unlimited pass integration
- **Articles**: Blog-style content with Sanity CMS integration
- **Google Analytics**: Privacy-compliant analytics implementation
- **Google Authentication**: Secure access to film management and personal notes _(In Development)_

## Feature Development

### Specification-Driven Development

New features are developed using a structured specification process:

- **Requirements**: Detailed user stories and acceptance criteria in `.kiro/specs/<feature>/requirements.md`
- **Tasks**: Implementation phases and testing criteria in `.kiro/specs/<feature>/tasks.md`
- **Technical Standards**: All features follow standards defined in `.kiro/specs/technical-standards.md`

### Current Features in Development

See [Feature Specifications](#feature-specifications) for complete details.

- **Google Authentication**: OAuth-based access control for films and books
  - Status: Planning complete, implementation starting
  - Spec: [Requirements](.kiro/specs/google-auth/requirements.md) | [Tasks](.kiro/specs/google-auth/tasks.md)
  - Supersedes: Draft mode authentication for films and books

- **Films Feature**: Cinema tracking system with OMDb API integration
  - Status: Core features complete, authentication migration in progress
  - Spec: [Requirements](.kiro/specs/films/requirements.md) | [Tasks](.kiro/specs/films/tasks.md)

### Completed Features

- **Leadership Books**: Full implementation with chapters, ratings, and search
- **Articles**: Blog-style content with Sanity CMS integration
- **Google Analytics**: Privacy-compliant analytics implementation

## Feature Specifications

This project uses Specification-Driven Development (SDD). Each feature has detailed specifications in `.kiro/specs/`.

### Active Specifications

| Feature | Status | Requirements | Tasks | Notes |
|---------|--------|--------------|-------|-------|
| **Google Authentication** | 🚧 In Development | [Requirements](.kiro/specs/google-auth/requirements.md) | [Tasks](.kiro/specs/google-auth/tasks.md) | Replaces draft mode for films & books |
| **Films** | 🚧 In Development | [Requirements](.kiro/specs/films/requirements.md) | [Tasks](.kiro/specs/films/tasks.md) | Cinema tracking with OMDb API |
| **Leadership Books** | ✅ Complete | [Requirements](.kiro/specs/leadership-books/requirements.md) | [Tasks](.kiro/specs/leadership-books/tasks.md) | Book summaries with chapters |
| **Articles** | ✅ Complete | [Requirements](.kiro/specs/articles/requirements.md) | [Tasks](.kiro/specs/articles/tasks.md) | Blog-style content |
| **Google Analytics** | ✅ Complete | [Requirements](.kiro/specs/google-analytics/requirements.md) | [Tasks](.kiro/specs/google-analytics/tasks.md) | Privacy-compliant analytics |

### Technical Standards

All features must follow: [Technical Standards](.kiro/specs/technical-standards.md)

**Key Standards:**
- 80% minimum test coverage for new features
- British English spelling and terminology
- ESLint compliance with project configuration
- TypeScript strict mode
- Next.js App Router patterns

### Superseded Specifications

**Google Authentication supersedes Films specification for authentication:**
- Films specification remains valid for OMDb integration, data structure, and wrapped statistics
- Authentication method changed from Sanity draft mode to Google OAuth
- See [Google Auth Requirements](.kiro/specs/google-auth/requirements.md) for details

### Creating New Specifications

When adding new features:

1. **Create directory**: `.kiro/specs/<feature-name>/`
2. **Create `requirements.md`** with:
   - User stories and acceptance criteria
   - Supersession notice (if replacing existing spec)
   - Status indicator (Active, Draft, etc.)
   - Links to related specifications
3. **Create `tasks.md`** with implementation phases
4. **Reference `technical-standards.md`** for common requirements
5. **Update this README**:
   - Add to specifications table
   - Update supersession relationships
   - Update feature status

### Updating Existing Specifications

**When specifications change:**

1. **If fundamental change** (e.g., new authentication method):
   - Create new specification in separate directory
   - Add supersession notice to new spec
   - Add supersession warning to old spec
   - Update README table with relationships
   - Keep old spec for historical reference

2. **If incremental change** (e.g., new requirement):
   - Update existing specification directly
   - Add "Last Updated" date
   - Document change in version history section
   - Update README if status changes

**Supersession Template:**

New specification:
```markdown
## Supersession Notice

This specification supersedes `<old-spec-path>` for <scope>.

**Superseded**: <what's replaced>
**Replaced With**: <new approach>
**Effective Date**: <date>
**Reason**: <why the change>

**What Remains Valid**: <what's still applicable from old spec>
```

Old specification:
```markdown
## ⚠️ Supersession Notice

**<Scope> requirements superseded by**: [<New Spec>](<path>)

**Still Valid**: ✅ <list what's still valid>
**Superseded**: ❌ <list what's replaced>
**Effective**: <date>

For <scope> implementation, see [<New Spec>](<path>).

---
```

### Specification Status Guide

| Status | Meaning | Action Required |
|--------|---------|-----------------|
| 🚧 In Development | Active work in progress | Implement according to tasks |
| ✅ Complete | Fully implemented | Maintain and update as needed |
| ⚠️ Partially Superseded | Some parts replaced | Check supersession notice |
| 🔄 Fully Superseded | Entirely replaced | Use new specification |
| 📝 Draft | Under review | Do not implement yet |

## Testing

This project uses Vitest for fast, modern testing with 80% minimum coverage requirement.

### Quick Start

```bash
# Run all tests
npm test

# Run tests with UI (recommended for development)
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Watch mode (auto-run on file changes)
npm run test:watch
```

### Feature-Specific Tests

Run tests for specific features:

```bash
npm run test:auth      # Authentication tests
npm run test:films     # Film feature tests
npm run test:books     # Book feature tests
```

### Development Workflow

1. **Start development server**: `npm run dev`
2. **Start test watch mode**: `npm run test:watch:auth` (in separate terminal)
3. **Write test** (it fails - Red)
4. **Implement feature** (test passes - Green)
5. **Refactor** (tests still pass)
6. **Repeat**

Tests auto-run when you save files, giving instant feedback.

### Coverage Requirements

- **New features**: 80% minimum coverage
- **Existing feature changes**: Basic tests for existing code + 80% for new code
- **View coverage**: `npm run test:coverage` then open `coverage/index.html`

### Test Standards

- Tests colocated with source files (`auth-helpers.ts` → `auth-helpers.test.ts`)
- Clear test names: `should return true when email is whitelisted`
- Fast execution: Unit tests complete in <5 seconds
- Tests execute actual source code (no implementation mocking)

## Authentication Setup

This project uses Google OAuth for authentication via [Better Auth](https://www.better-auth.com/). Follow these steps to set up locally:

### 1. Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorised redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Client Secret

### 2. Local Environment Setup

```bash
# Copy example environment file
cp .env.local.example .env.local

# Edit .env.local and add:
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
BETTER_AUTH_SECRET="$(openssl rand -base64 32)"
BETTER_AUTH_URL="http://localhost:3000"
AUTHORIZED_EMAILS="your-email@gmail.com"
```

### 3. Netlify Deployment

Add environment variables in Netlify dashboard:

1. Go to Site settings → Environment variables
2. Add each variable:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (set to your production URL)
   - `AUTHORIZED_EMAILS`
3. Update Google OAuth redirect URI to include production URL
4. Redeploy site

### 4. Testing Authentication

```bash
npm run dev
# Navigate to http://localhost:3000
# Click "Sign In" in header
# Sign in with whitelisted Google account
# Verify avatar appears in header
```

### Troubleshooting

**"Unauthorised" error after sign-in:**
- Verify your email is in `AUTHORIZED_EMAILS`
- Check email matches exactly (case-insensitive)
- Ensure no extra spaces in environment variable

**"Invalid client" error:**
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Check redirect URI matches in Google Console

**Session not persisting:**
- Verify `BETTER_AUTH_SECRET` is set
- Check `BETTER_AUTH_URL` matches your domain

## Recommended VS Code Extensions

There are a few VS Code recommended extensions in the project

- VS Code ESLint extension
- vscode-sanity
- Code Spell Checker

## AI Agent Setup

This project includes pre-configured AI agents for consistent development experience:

- **Q CLI**: Uses `farmergq` agent with British English spellings and project context
- **VS Code**: Configured for British English spell checking and Amazon Q context

See [docs/ai-setup.md](docs/ai-setup.md) for full setup details.

### MCP Servers

For enhanced AI capabilities, configure MCP servers following [docs/mcp-setup.md](docs/mcp-setup.md).
