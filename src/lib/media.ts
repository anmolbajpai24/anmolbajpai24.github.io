/**
 * Media lookup. Drop images or videos into src/assets/media/ and refer to
 * them by path relative to that folder, e.g. "melee-madness/shop.webp".
 * Missing files return undefined, and <MediaSlot> shows a labelled
 * placeholder instead, so the site builds and looks intentional before
 * every screenshot exists.
 */
const files = import.meta.glob(
  "../assets/media/**/*.{png,jpg,jpeg,webp,gif,avif,mp4,webm}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  byName[path.replace("../assets/media/", "")] = url;
}

export function mediaUrl(name?: string): string | undefined {
  return name ? byName[name] : undefined;
}

export function isVideo(name: string): boolean {
  return /\.(mp4|webm)$/i.test(name);
}
