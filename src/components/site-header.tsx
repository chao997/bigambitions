'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { LocaleSwitch } from './locale-switch';

const NAV = [
  { href: '/guide', key: 'guide' },
  { href: '/best-business', key: 'business' },
  { href: '/cheats', key: 'cheats' },
  { href: '/mods', key: 'mods' },
  { href: '/roadmap', key: 'roadmap' },
  { href: '/codes', key: 'codes' },
] as const;

export function SiteHeader() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative inline-flex size-9 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/12 shadow-[0_0_24px_rgba(250,204,21,0.18)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="" className="object-cover" width={36} height={36} />
          </span>
          <span className="text-base font-medium tracking-[0.14em] text-foreground sm:text-lg">
            BIG AMBITIONS
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitch className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/40 px-2.5 py-2 text-muted-foreground transition-colors hover:text-foreground" />
          <ThemeToggle className="inline-flex size-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:text-foreground" />
        </div>

        <button type="button" className="p-2 md:hidden" aria-label={t('openMenu')} onClick={() => setOpen((v) => !v)}>
          <Menu className="size-5" />
        </button>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-3 border-t border-border/60 pt-3">
              <LocaleSwitch className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-2.5 py-2 text-muted-foreground" />
              <ThemeToggle className="inline-flex size-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
