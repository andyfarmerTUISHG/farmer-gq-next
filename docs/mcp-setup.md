# MCP Server Setup

For enhanced AI capabilities with Sanity CMS, Next.js runtime info, and browser automation.

## Prerequisites

1. **Install recommended extensions**: VS Code will prompt to install when you open the project
2. **Set up environment**: Copy `.env.local.example` to `.env.local` and get Sanity tokens from LastPass notes
3. **Install project MCP servers**:
   ```bash
   npm install --save-dev @sanity/mcp-server next-devtools-mcp@latest
   ```

## VS Code / Amazon Q Configuration

Add to your `.vscode/settings.json` (merge with existing settings):

```json
{
  "amazonQ.mcpServers": {
    "sanity": {
      "command": "npx",
      "args": ["@sanity/mcp-server"],
      "env": {
        "SANITY_PROJECT_ID": "ix9xb2vm",
        "SANITY_DATASET": "production",
        "SANITY_API_TOKEN": "paste-your-read-token-here"
      }
    },
    "nextjs": {
      "command": "npx",
      "args": ["next-devtools-mcp"]
    }
  }
}
```

## Getting Your Sanity Token

1. Copy `SANITY_API_READ_TOKEN` value from your `.env.local` file
2. Paste it into the `SANITY_API_TOKEN` field above
3. Restart VS Code

## Q CLI Configuration

The project has the `farmergq` agent configured as default in `.amazonq/config.json`, so you can simply use:

```bash
q
```

This opens an interactive chat session with the project agent automatically.

## Verify Setup

**VS Code Amazon Q:**

1. Open VS Code in this project
2. Click the Amazon Q icon in the sidebar
3. In the chat, type: `List my Sanity documents`
4. ✅ **Success**: Should show project documents
5. ❌ **Failed**: Check your `.vscode/settings.json` and restart VS Code

**Q CLI:**

1. Open terminal in project root
2. Run: `q`
3. Type: `What Sanity documents do we have?`
4. ✅ **Success**: Should show project documents and mention MCP servers
5. ❌ **Failed**: Check your `.env.local` file has correct tokens

## Code Quality Verification

After AI generates code, always run:

```bash
npm run lint
```

The AI is configured to follow ESLint rules, but verification ensures compliance.

## Troubleshooting

### MCP Servers Not Working

**Symptoms**: AI doesn't show Sanity documents, no MCP server responses

**Solutions**:

- Restart VS Code after configuration changes
- Check `.env.local` has actual token values (not "your-read-token-here" placeholders)
- Verify extensions are installed (VS Code will show notifications in bottom-right)
- Check VS Code Output panel (View → Output → Amazon Q) for MCP errors

### Q CLI Not Working

**Symptoms**: `q` command not found, or farmergq agent not loading

**Solutions**:

- Run `q --version` to check if Q CLI is installed
- Ensure you're in the project directory (where `.amazonq/config.json` exists)
- Try `q --agent farmergq` explicitly
- Check `.amazonq/config.json` exists and has correct agent name

### Sanity Connection Issues

**Symptoms**: "Authentication failed" or "Project not found" errors

**Solutions**:

- Verify tokens in LastPass notes are current and copied correctly
- Test token at https://manage.sanity.io (should show project access)
- Confirm project ID is "ix9xb2vm" in both `.env.local` and VS Code settings
- Check token permissions (read vs write token usage)

### VS Code Extensions Missing

**Symptoms**: No extension recommendations, Amazon Q not available

**Solutions**:

- Open Command Palette (Cmd/Ctrl+Shift+P)
- Run "Extensions: Show Recommended Extensions"
- Install any missing extensions from the list
- Restart VS Code after installing extensions

### Environment File Issues

**Symptoms**: Variables not loading, "undefined" values

**Solutions**:

- Ensure file is named `.env.local` (not `.env.local.txt`)
- Check file is in project root (same level as `package.json`)
- Verify no spaces around `=` in variable assignments
- Restart development server after environment changes

### General Debug Steps

1. **Check file locations**:

   ```
   ✅ .env.local (project root)
   ✅ .vscode/settings.json
   ✅ .amazonq/config.json
   ✅ .amazonq/cli-agents/farmergq.json
   ```

2. **Verify installations**:

   ```bash
   npm list @sanity/mcp-server next-devtools-mcp
   ```

3. **Test components individually**:
   - Sanity Studio: https://farmer-gq.sanity.studio/
   - VS Code Amazon Q: Check sidebar icon
   - Q CLI: Run `q --help`

4. **Reset if needed**:
   ```bash
   # Reinstall MCP servers
   npm uninstall @sanity/mcp-server next-devtools-mcp
   npm install --save-dev @sanity/mcp-server next-devtools-mcp@latest
   ```
