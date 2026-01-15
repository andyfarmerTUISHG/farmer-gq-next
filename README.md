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

- **Leadership Books**: Manage book summaries with chapters, quotes, and ratings. See [Leadership Books Documentation](docs/leadership-books.md) for details.

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
