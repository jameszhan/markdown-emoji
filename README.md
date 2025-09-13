# @james_zhan/markdown-emoji

DOM post-processor to replace `:shortcode:` with emoji characters, with alias support and safe skipping for code and math.

- Supports multiple emoji data formats (code-point objects, direct character map, array form)
- Optional alias map (e.g., `":hankey:"` → `":poop:"`)
- Skips code/pre/kbd/script/style and MathJax output (`.math-block`, `MJX-*`)
- Works with any Markdown renderer; typical flow: Markdown → HTML → DOMPurify → applyEmojiShortcodes
- Ships with default emoji data (code points) and aliases inside the package (`src/data/*.json`), so users don't need to curate data.

## Install

```
pnpm add @james_zhan/markdown-emoji
# or
npm i @james_zhan/markdown-emoji
```

## Usage

```html
<div id="root"></div>
<script type="module">
  import {
    applyEmojiShortcodes,
    normalizeEmojiData,
    normalizeAliases,
    loadDefaultEmojiMap,
    loadDefaultAliasesData
  } from '@james_zhan/markdown-emoji'

  // 1) Obtain HTML (e.g., via marked) and inject to DOM
  const root = document.getElementById('root')
  root.innerHTML = `<p>Hello :smile: \\`code :smile: not replaced\\`</p>`

  // 2) Use packaged defaults (async)
  const emojiMap = await loadDefaultEmojiMap()
  const aliases = normalizeAliases(await loadDefaultAliasesData())

  // 3) Apply replacement on the DOM
  applyEmojiShortcodes(root, { emojiMap, aliases })
</script>
```

### Using shipped JSON files directly

If your toolchain doesn't support JSON import assertions, you can fetch the JSON shipped in the package and normalize it:

```js
import { normalizeEmojiData, normalizeAliases } from '@james_zhan/markdown-emoji'

const emojiResp = await fetch('/node_modules/@james_zhan/markdown-emoji/src/data/emoji-unicodes.json')
const emojiMap = normalizeEmojiData(await emojiResp.json())

const aliasResp = await fetch('/node_modules/@james_zhan/markdown-emoji/src/data/emoji-aliases.json')
const aliases = normalizeAliases(await aliasResp.json())
```

## API

- `normalizeEmojiData(data) => { [shortname]: emoji }`
  - Accepts:
    - `{ ':name:': { unicode: '1f600', unicode_alt?: '...' }, ... }`
    - `{ 'name': '😊', ... }`
    - `[ { shortcode: 'name', emoji: '😊' }, ... ]`
  - Returns a flat map with both keys `':name:'` and `'name'` → `'😊'`.
- `normalizeAliases(data) => { ':alias:': ':canonical:' }`
  - Accepts `{':a:':':b:'}` or `[{ alias: ':a:', to: ':b:' }]`.
- `applyEmojiShortcodes(root, { emojiMap, aliases?, skipMath?, skipSelectors? })`
  - Replaces `:shortcode:` in text nodes under `root`.
  - Skips `code/pre/kbd/script/style`, MathJax output (elements with class `.math-block` and tags starting `MJX-`).
  - `skipSelectors`: additional CSS selectors to skip (elements and their descendants are ignored).

## Notes

- This library intentionally runs after HTML is in the DOM — it will not modify Markdown source; it modifies text nodes only when safe.
- If you need a renderer plugin (e.g., marked), you can wrap `applyEmojiShortcodes` after render, or contribute a small plugin that replaces in the token stream before HTML.

## License

MIT
