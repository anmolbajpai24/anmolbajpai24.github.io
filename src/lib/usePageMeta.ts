import { useEffect } from "react";

let defaultDescription: string | null = null;

/**
 * Sets document.title and meta description for a page. Pages that pass no
 * description get the site default back, so a previous page's description
 * doesn't linger across client-side navigation.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    const tag = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (tag) {
      if (defaultDescription === null) defaultDescription = tag.content;
      tag.content = description ?? defaultDescription;
    }
  }, [title, description]);
}
