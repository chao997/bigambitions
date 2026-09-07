import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { routing } from '@/i18n/routing';

export type Locale = string;

export type ArticleMeta = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  category: string; // top-level category id, e.g. "races"
  section?: string; // sub-section within sidebar group
  badge?: 'popular' | 'new';
  updated?: string; // ISO date
  image?: string;
  order?: number;
};

const CONTENT_ROOT = path.join(process.cwd(), 'content');

export const locales = routing.locales as unknown as string[];
export const defaultLocale = routing.defaultLocale as string;

function readMetaFor(locale: Locale): ArticleMeta[] {
  const dir = path.join(CONTENT_ROOT, locale);
  if (!fs.existsSync(dir)) return [];
  const out: ArticleMeta[] = [];
  const walk = (d: string) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name.endsWith('.mdx')) {
        const raw = fs.readFileSync(p, 'utf8');
        const { data } = matter(raw);
        const rel = path.relative(dir, p).replace(/\\/g, '/').replace(/\.mdx$/, '');
        out.push({
          slug: rel,
          locale,
          title: String(data.title ?? rel),
          description: String(data.description ?? ''),
          category: String(data.category ?? rel.split('/')[0]),
          section: data.section ? String(data.section) : undefined,
          badge: data.badge ?? undefined,
          updated: data.updated ? String(data.updated) : undefined,
          image: data.image ? String(data.image) : undefined,
          order: typeof data.order === 'number' ? data.order : undefined,
        });
      }
    }
  };
  walk(dir);
  return out.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

// Registries built once per server process.
const registries = new Map<Locale, ArticleMeta[]>();

export function getRegistry(locale: Locale): ArticleMeta[] {
  let reg = registries.get(locale);
  if (!reg) {
    reg = readMetaFor(locale);
    registries.set(locale, reg);
  }
  return reg;
}

export function getArticleMeta(slug: string, locale: Locale): ArticleMeta | undefined {
  return getRegistry(locale).find((a) => a.slug === slug);
}

// Articles visible in `locale`: localized copies first, EN fallback for the rest.
export function getVisibleRegistry(locale: Locale): ArticleMeta[] {
  if (locale === defaultLocale) return getRegistry(locale);
  const base = getRegistry(defaultLocale);
  const localized = new Map(getRegistry(locale).map((a) => [a.slug, a]));
  return base.map((a) => localized.get(a.slug) ?? a);
}

export function getCategoryChildren(category: string, locale: Locale): ArticleMeta[] {
  return getVisibleRegistry(locale).filter(
    (a) => a.category === category && a.slug !== category && a.slug !== `${category}/index`
  );
}

export function getAdjacentArticles(category: string, slug: string, locale: Locale, limit = 3): ArticleMeta[] {
  return getCategoryChildren(category, locale)
    .filter((a) => a.slug !== slug && a.slug.split('/').length > 1)
    .slice(0, limit);
}

export function readArticleSource(slug: string, locale: Locale): string | null {
  const p = path.join(CONTENT_ROOT, locale, `${slug}.mdx`);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf8');
}

export function existsInLocale(slug: string, locale: Locale): boolean {
  return fs.existsSync(path.join(CONTENT_ROOT, locale, `${slug}.mdx`));
}
