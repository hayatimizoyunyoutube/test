const turkishMap: Record<string, string> = {
  ç: 'c', Ç: 'c',
  ğ: 'g', Ğ: 'g',
  ı: 'i', I: 'i', İ: 'i',
  ö: 'o', Ö: 'o',
  ş: 's', Ş: 's',
  ü: 'u', Ü: 'u'
};

export function createSlug(value: string) {
  return value
    .trim()
    .split('')
    .map((char) => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

export function ensureSlug(title: string, slug?: string | null) {
  const cleanSlug = slug?.trim();
  return cleanSlug ? createSlug(cleanSlug) : createSlug(title);
}
