import { getVisibleRegistry } from '@/lib/content';
import { wikiNav } from '@/lib/wiki-nav';
import { codes } from '@/lib/data';
import {
  BookOpen,
  Star,
  Library,
  ShoppingCart,
  Newspaper,
  Target,
  Wrench,
  Users,
  Store,
  Factory,
  Music,
  Gamepad2,
  Ticket,
  ChevronDown,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import type { Locale } from '@/lib/content';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { CopyButton } from './copy-button';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'book-open': BookOpen,
  star: Star,
  library: Library,
  'shopping-cart': ShoppingCart,
  newspaper: Newspaper,
  target: Target,
  wrench: Wrench,
  users: Users,
  store: Store,
  factory: Factory,
  music: Music,
  'gamepad-2': Gamepad2,
  ticket: Ticket,
};

export async function WikiSidebar({ locale, activeSlug }: { locale: Locale; activeSlug?: string }) {
  const registry = getVisibleRegistry(locale);
  const t = await getTranslations('sidebar');
  const activeCodes = codes.filter((c) => c.status === 'active');

  return (
    <aside className="hidden w-[248px] shrink-0 lg:block xl:w-[264px]">
      <div className="no-scrollbar sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pt-4 pb-10 sm:pt-6">
        <nav aria-label="Sidebar navigation" className="space-y-4 text-[13px]">
          <div className="rounded-xl border border-border/40 bg-card/35 px-3 py-3">
            <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/60">
              {t('navTitle')}
            </h3>
            <div className="space-y-1.5">
              {wikiNav.map((cat) => {
                const Icon = ICONS[cat.icon] ?? BookOpen;
                const count = cat.items.filter((i) => registry.some((a) => a.slug === i.slug)).length;
                const single = cat.items.length <= 1;
                const isActive =
                  activeSlug === cat.id || activeSlug?.startsWith(`${cat.id}/`) || false;

                if (single) {
                  return (
                    <Link
                      key={cat.id}
                      href={`/${cat.items[0].slug}`}
                      className={`flex min-h-8 items-center gap-2 rounded-md px-2 py-1 text-[12px] font-medium leading-[1.25rem] transition-colors hover:bg-white/4 hover:text-foreground ${
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary">
                        <Icon className="size-3" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                        {t(cat.labelKey)}
                      </span>
                    </Link>
                  );
                }

                return (
                  <details key={cat.id} className="group rounded-lg" open={isActive}>
                    <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-2 py-2 text-muted-foreground transition-colors marker:hidden hover:bg-white/4 hover:text-foreground [&::-webkit-details-marker]:hidden">
                      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary">
                        <Icon className="size-3" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                        {t(cat.labelKey)}
                      </span>
                      <span className="rounded-full bg-white/6 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/80">
                        {count}
                      </span>
                      <ChevronDown className="size-3.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="mt-1 ml-5 space-y-0.5 border-l border-border/50 pl-4">
                      {cat.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={`/${item.slug}`}
                            className={`flex min-h-8 items-center gap-2 rounded-md px-2 py-1 text-[12px] leading-[1.25rem] transition-colors hover:bg-white/4 hover:text-foreground ${
                              activeSlug === item.slug
                                ? 'font-medium text-foreground'
                                : 'text-muted-foreground/72'
                            }`}
                          >
                            <span className="min-w-0 flex-1 truncate">{t(item.labelKey)}</span>
                            {item.badge ? (
                              <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-primary/75">
                                {item.badge === 'popular' ? t('popular') : t('new')}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                );
              })}
            </div>
          </div>

          {/* Codes snapshot mini-card */}
          <div className="rounded-xl border border-border/40 bg-card/35 px-3 py-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{t('codesTitle')}</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {t('updated')}
              </span>
            </div>
            <div className="mt-2 space-y-2">
              {activeCodes.length === 0 ? (
                <p className="rounded-lg border border-border/50 bg-background/35 px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground/80">
                  {t('noCodes')}
                </p>
              ) : null}
              {activeCodes.slice(0, 2).map((c) => (
                <div key={c.code} className="rounded-lg border border-border/50 bg-background/35 px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[13px] font-semibold tracking-wide text-foreground">
                      {c.code}
                    </span>
                    <CopyButton text={c.code} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground/80">
                    {c.rewards}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/codes"
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border/50 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              {t('codesTitle')}
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}

// Small client island so the sidebar stays a server component.
export function SidebarCopyIcon() {
  return (
    <span className="inline-flex items-center gap-1">
      <Copy className="size-3" />
      <Check className="hidden" />
    </span>
  );
}
