import { useEffect } from "react";

/**
 * Sets document.title (and meta description when given) for a page.
 * A static SPA has no server-side head management; this is all we need.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      const tag = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );
      if (tag) tag.content = description;
    }
  }, [title, description]);
}
