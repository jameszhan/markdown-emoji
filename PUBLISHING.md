# Publishing @scope/markdown-emoji with pnpm

## Prerequisites
- npm account (https://www.npmjs.com/signup), email verified, 2FA recommended.
- Ensure `package.json` name uses your actual npm scope (your npm username):
  - Current: `@james_zhan/markdown-emoji` (matches your npm username)
- `repository`/`homepage`/`bugs` already point to https://github.com/jameszhan/markdown-emoji

## Steps
1) Login to npm via pnpm (once per machine)
```
pnpm npm login
pnpm npm whoami
```

2) Dry run (optional)
```
cd markdown-emoji
pnpm publish --dry-run
```

3) Publish (scoped packages default to restricted; set public explicitly)
```
cd markdown-emoji
pnpm version patch
pnpm publish --access public
```

4) Install and try in a fresh project
```
pnpm add @james_zhan/markdown-emoji
```

## Versioning
- Bump `version` in `package.json` for subsequent publishes (e.g., 0.1.1 → 0.1.2).

## Notes
- This package ships ESM source. For direct CDN usage (no bundler), you can import from a CDN path, e.g.:
```
<script type="module">
  import { applyEmojiShortcodes } from 'https://unpkg.com/@james_zhan/markdown-emoji@0.1.3/src/index.js'
</script>
```
- If you need CJS compatibility, consider publishing a dual build in a future iteration.
- Default emoji data and aliases are included in `src/data/`. No sync step is required.
