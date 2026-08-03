export function sanitizeHashtag(tag: string): string {
  if (!tag) return "";
  // Strip starting #, spaces, commas, dashes, periods and special characters
  const clean = tag
    .replace(/^#+/, "")
    .replace(/[^\w]/g, "")
    .trim();
  return clean ? `#${clean}` : "";
}

export function sanitizeHashtagList(tags: string[] = []): string[] {
  if (!Array.isArray(tags)) return [];
  const set = new Set<string>();
  for (const raw of tags) {
    const formatted = sanitizeHashtag(raw);
    if (formatted && formatted.length > 1) {
      set.add(formatted);
    }
  }
  return Array.from(set);
}
