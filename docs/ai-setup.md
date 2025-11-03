# AI Setup Guide

## Quick Start

1. **Install Extensions**: VS Code will prompt for recommended extensions
2. **Configure MCP**: Follow [mcp-setup.md](mcp-setup.md) for enhanced capabilities
3. **Environment**: Copy `.env.local.example` to `.env.local` and fill in values

## Available Prompts

Use `@prompt-name` in chat:

- `@component-creation`: Create React components with project conventions
- `@sanity-schema`: Create/modify Sanity schemas

## Project Rules

All project conventions and AI behaviour guidelines are consolidated in `.amazonq/rules/`:

- `project-conventions.md`: Code style, naming, file structure
- `ai-behaviour.md`: Response style and modification guidelines

These rules are automatically included in all AI interactions for consistent responses.

## VS Code Settings

Workspace settings ensure:

- British English spell checking
- Project-specific dictionary
- Amazon Q workspace indexing enabled
