import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  Gamepad2,
  Swords,
  Ticket,
  Play,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { WikiShell } from '@/components/wiki-shell';
import { WikiSidebar } from '@/components/wiki-sidebar';
import { CopyButton } from '@/components/copy-button';
import {
  latestUpdates,
  journeySteps,
  heroChips,
  exploreCards,
  features,
  faqs,
  overviewPoints,
  codes,
} from '@/lib/data';
import { FeatureIcon } from '@/components/feature-icon';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const updates = latestUpdates;
  const steps = journeySteps;
  const chips = heroChips;
  const cards = exploreCards;
  const feats = features;
  const faqList = faqs;
  const points = overviewPoints;
  const activeCode = codes.find((c) => c.status === 'active');

  return (
    <WikiShell
      aside={<WikiSidebar locale={locale} activeSlug="" />}
      main={
        <>
          {/* Hero */}
          <section className="pt-10 pb-6 text-center sm:pt-14 sm:pb-8">
            <div className="relative inline-flex items-start justify-center">
              <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">Big Ambitions</h1>
              <span className="ml-2 -translate-y-1 rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground sm:ml-3 sm:-translate-y-1.5">
                {t('badge')}
              </span>
            </div>

            <div className="mx-auto mt-5 max-w-2xl">
              <a
                href="https://www.youtube.com/watch?v=2jr3gMy59sE"
                target="_blank"
                rel="noreferrer"
                className="group relative block cursor-pointer overflow-hidden rounded-2xl border border-border shadow-lg transition-all duration-200"
              >
                <div className="relative aspect-video w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/trailer-thumb.svg"
                    alt="Big Ambitions 1.0 official cinematic trailer"
                    className="size-full object-cover transition-all duration-200 group-hover:brightness-[0.8]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md transition-transform duration-200 group-hover:scale-105 sm:size-24">
                      <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-transform duration-200 group-hover:scale-110 sm:size-16">
                        <Play className="size-6 fill-white text-white sm:size-7" />
                      </div>
                    </div>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[11px] text-white">
                    YouTube
                  </span>
                </div>
              </a>
            </div>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {t('lede')}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
              {chips.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  <span>{c.emoji}</span>
                  {c.label}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/guide"
                className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary/60 hover:bg-primary/15"
              >
                <Gamepad2 className="size-4" />
                {t('ctaGuide')}
                <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/best-business"
                className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-foreground/30 hover:bg-card/70"
              >
                <Swords className="size-4" />
                {t('ctaBusiness')}
                <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/cinema-layout"
                className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-foreground/30 hover:bg-card/70"
              >
                <Ticket className="size-4" />
                {t('ctaCodes')}
                <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </section>

          {/* Announcements + Journey */}
          <div className="grid gap-0 pb-6 sm:grid-cols-2 sm:gap-6 sm:pb-10">
            <section id="announcements" className="h-full min-w-0">
              <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card/30">
                <div className="border-b border-border/40 px-5 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary/80">
                    {t('latestUpdates')}
                  </p>
                </div>
                <div className="divide-y divide-border/40">
                  {updates.map((u) => (
                    <Link
                      key={u.title}
                      href={u.href}
                      className="group flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-primary/5"
                    >
                      <span
                        className={`mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          u.level === 'major'
                            ? 'bg-primary/15 text-primary'
                            : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {u.level}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 break-words text-sm font-medium leading-snug text-foreground group-hover:text-primary">
                          {u.title}
                        </p>
                        <div className="mt-1 flex items-center justify-end gap-1">
                          <time className="text-[11px] text-muted-foreground/70">{u.date}</time>
                          <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-primary" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-auto flex justify-end border-t border-border/40 px-5 py-2.5">
                  <Link
                    href="/updates"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t('browseAll')}
                    <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              </div>
            </section>

            <section id="journey">
              <div className="h-full rounded-xl border border-border/50 bg-card/30">
                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                        {t('startHere')}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">{t('journeyTitle')}</p>
                    </div>
                  </div>
                  <div className="relative space-y-0">
                    {steps.map((s, i) => (
                      <Link
                        key={s.href + s.title}
                        href={s.href}
                        className="group relative flex gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-primary/5"
                      >
                        <div className="flex flex-col items-center">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-bold text-primary transition-colors group-hover:border-primary/60">
                            {i + 1}
                          </span>
                          {i < steps.length - 1 ? <span className="mt-1 w-px flex-1 bg-border/50" /> : null}
                        </div>
                        <div className="min-w-0 flex-1 pb-1">
                          <p className="text-sm font-medium leading-snug text-foreground group-hover:text-primary">
                            {s.title}
                          </p>
                          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground/80">
                            {s.note}
                          </p>
                        </div>
                        <ArrowUpRight className="mt-0.5 size-3 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Explore cards */}
          <section className="pt-4 pb-12 sm:pt-6 sm:pb-16">
            <h2 className="text-3xl tracking-tight sm:text-4xl">{t('exploreTitle')}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{t('exploreLede')}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <Link
                  key={card.href + card.title}
                  href={card.href}
                  className="group overflow-hidden rounded-2xl border border-border bg-card/60 transition-all hover:border-foreground/20 hover:shadow-md"
                >
                  <div className="relative aspect-[16/9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image}
                      alt=""
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        {card.tag}
                      </span>
                      <h3 className="mt-2 line-clamp-1 text-xl font-semibold text-white">{card.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Game overview */}
          <section id="overview" className="py-12 sm:py-16">
            <h2 className="text-3xl tracking-tight sm:text-4xl">{t('overviewTitle')}</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {points.map((p, i) => (
                <div
                  key={p.title}
                  className={`group relative flex gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-primary/5 ${
                    i === 2 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold leading-tight text-foreground sm:text-base">
                      {p.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section id="features" className="py-12 sm:py-16">
            <h2 className="text-3xl font-normal tracking-tight sm:text-4xl">
              {t('featuresTitle')}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {feats.map((f) => (
                <div
                  key={f.title}
                  className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 transition-all hover:border-foreground/20 hover:shadow-sm"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-muted text-foreground/80 transition-colors group-hover:bg-foreground group-hover:text-background">
                    <FeatureIcon name={f.icon} />
                  </span>
                  <div>
                    <h3 className="font-medium">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-16 sm:py-20">
            <h2 className="text-center text-3xl font-medium tracking-tight sm:text-4xl">
              {t('faqTitle')}
            </h2>
            <div className="mx-auto mt-8 max-w-3xl space-y-2">
              {faqList.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border/60 bg-card/40 px-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-medium text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Closing CTA */}
          <section className="pb-16 sm:pb-20">
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
              {t('ctaTitle')}
            </h2>
            <div className="mt-6 flex justify-center">
              <Link
                href="/beginner-guide"
                className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-all hover:border-primary/60 hover:bg-primary/15"
              >
                {t('ctaButton')}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            {activeCode ? (
              <div className="mx-auto mt-8 flex max-w-md items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3">
                <div className="min-w-0">
                  <p className="font-mono text-sm font-semibold tracking-wide text-foreground">
                    {activeCode.code}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{activeCode.rewards}</p>
                </div>
                <CopyButton text={activeCode.code} />
              </div>
            ) : null}
          </section>
        </>
      }
    />
  );
}
