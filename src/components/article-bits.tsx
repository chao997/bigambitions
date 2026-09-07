import { Link } from '@/i18n/navigation';
import { ChevronRight, House } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ArticleMeta } from '@/lib/content';

// Breadcrumb under the header: Home icon > ... > current page.
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 pt-6 text-sm text-muted-foreground sm:pt-8"
    >
      <span className="flex items-center gap-1.5">
        <Link href="/" className="transition-colors hover:text-foreground">
          <House className="size-3.5" />
          <span className="sr-only">Home</span>
        </Link>
      </span>
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight className="size-3.5" />
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// Card grid used by category overview pages; data comes from the registry.
export async function CategoryGrid({ items }: { items: ArticleMeta[] }) {
  const t = await getTranslations('article');
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/${item.slug}`}
          className="group flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-5 transition-all hover:border-foreground/20 hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground group-hover:text-primary">{item.title}</h3>
            {item.badge ? (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                {item.badge === 'popular' ? t('popular') : t('new')}
              </span>
            ) : null}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          <div className="mt-auto flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary">
            <span>{t('readMore')}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

// Simple proportional tier table for tier-list pages.
export function TierTable({ rows }: { rows: { tier: string; entries: string[] }[] }) {
  const tierColor: Record<string, string> = {
    S: 'bg-amber-500/15 text-amber-500 border-amber-500/40',
    A: 'bg-blue-500/15 text-blue-500 border-blue-500/40',
    B: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/40',
    C: 'bg-muted text-muted-foreground border-border',
  };
  return (
    <div className="overflow-hidden rounded-xl border border-border/60">
      {rows.map((row) => (
        <div key={row.tier} className="flex border-b border-border/40 last:border-b-0">
          <div
            className={`flex w-14 shrink-0 items-center justify-center border-r text-xl font-bold ${
              tierColor[row.tier] ?? tierColor.C
            }`}
          >
            {row.tier}
          </div>
          <div className="flex flex-wrap gap-1.5 p-3">
            {row.entries.map((e) => (
              <span
                key={e}
                className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground/90"
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
