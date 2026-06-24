# Handling Transitive Dependency Issues

Transitive dependencies are packages pulled in by your dependencies, not ones you install directly. Issues with them surface in two ways: deprecation warnings during `npm install`, and vulnerability alerts from security tools like Snyk or `npm audit`.

## Deprecation Warnings

These appear during `npm install` and look like:

```
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory
```

Before doing anything, check whether the package is a direct or transitive dependency:

```bash
npm ls glob inflight
```

If it's deep in the tree (pulled in by another package), you cannot fix it directly — you have to wait for that package to update. These warnings are not errors. They don't affect your build or your users. They resolve themselves as you upgrade your direct dependencies.

**Don't act on deprecation warnings alone.**

## Security Vulnerabilities

These are different. Run:

```bash
npm audit
```

If a vulnerability is flagged in a transitive dependency and no fix is available via `npm audit fix`, you can force a specific version using `overrides` in `package.json`:

```json
{
  "overrides": {
    "vulnerable-package": "^2.0.0"
  }
}
```

Then run `npm install` to apply it.

## When to Use Overrides

| Situation | Use overrides? |
|-----------|---------------|
| Deprecation warning only | No — wait for upstream to fix |
| `npm audit` low/moderate severity | Usually no — assess the actual risk |
| `npm audit` high/critical severity | Yes — override if no upstream fix available |
| Snyk alert with a known safe version | Yes — pin to the recommended version |

## Risks of Overrides

Overrides force a version the parent package was not tested against. This can:

- Silently break functionality if there are API differences between versions
- Create a maintenance burden — you now own that compatibility
- Mask the real fix (upgrading the direct dependency that pulls in the vulnerable package)

Always check whether upgrading the direct dependency resolves the issue first:

```bash
npm ls <vulnerable-package>   # shows which package pulls it in
npm install <parent-package>@latest   # try upgrading the parent first
```

Only fall back to overrides if the parent hasn't shipped a fix yet.

## Removing Overrides

Once the parent package ships a fix, remove the override from `package.json` and run `npm install`. Leaving stale overrides in place is a maintenance risk.
