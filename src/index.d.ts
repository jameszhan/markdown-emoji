export interface EmojiMap { [key: string]: string }
export interface EmojiAliases { [key: string]: string }

export function normalizeEmojiData(data: any): EmojiMap;
export function normalizeAliases(data: any): EmojiAliases;

export interface ApplyOptions {
  emojiMap: EmojiMap;
  aliases?: EmojiAliases;
  skipMath?: boolean;
  skipSelectors?: string[];
}

export function applyEmojiShortcodes(root: ParentNode, options: ApplyOptions): void;

