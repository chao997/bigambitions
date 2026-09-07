import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { TierTable } from './article-bits';
import { CopyButton } from './copy-button';
import { Link } from '@/i18n/navigation';
import { codes } from '@/lib/data';
import type { Locale } from '@/lib/content';

type MdxFrontmatter = {
  title?: string;
  category?: string;
};

// Custom components exposed to every MDX article.
const components = {
  a: ({
    href,
    children,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }) => {
    if (!href) return <a {...rest}>{children}</a>;
    if (href.startsWith('/') && !href.startsWith('//')) {
      return (
        <Link href={href} className="text-primary underline underline-offset-4 hover:text-primary/80">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {children}
        <ExternalLink className="size-3" />
      </a>
    );
  },
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="text-primary underline underline-offset-4 hover:text-primary/80">
      {children}
    </Link>
  ),
  // Callout box: <Callout tone="info|warn|tip" title="...">body</Callout>
  Callout: ({
    tone = 'info',
    title,
    children,
  }: {
    tone?: 'info' | 'warn' | 'tip';
    title?: string;
    children: React.ReactNode;
  }) => {
    const tones: Record<string, string> = {
      info: 'border-l-4 border-purple-500 bg-purple-500/10',
      warn: 'border-l-4 border-red-500 bg-red-500/10',
      tip: 'border-l-4 border-emerald-500 bg-emerald-500/10',
    };
    return (
      <div className={`mt-6 rounded-lg p-4 ${tones[tone] ?? tones.info}`}>
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className={`text-sm leading-relaxed text-muted-foreground ${title ? 'mt-1' : ''}`}>
          {children}
        </div>
      </div>
    );
  },
  TierTable,
  Figure: ({
    src,
    title,
    note,
  }: {
    src: string;
    title: string;
    note?: string;
  }) => (
    <div className="my-8 overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-col sm:flex-row">
        <div className="relative shrink-0 sm:w-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={title} className="h-48 w-full object-cover sm:h-full" />
          <span className="absolute right-2 bottom-2 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white/80">
            Fan art
          </span>
        </div>
        <div className="flex flex-col justify-center gap-2 p-4 sm:p-5">
          <h3 className="text-base leading-tight font-semibold">{title}</h3>
          {note ? <p className="text-sm leading-relaxed text-muted-foreground">{note}</p> : null}
        </div>
      </div>
    </div>
  ),
  KeyBind: ({ children }: { children: React.ReactNode }) => (
    <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[12px] font-semibold text-foreground">
      {children}
    </kbd>
  ),
  // Full code table, localized by locale prop: <CodeList locale="en" />
  CodeList: ({ locale = 'en' }: { locale?: Locale }) => {
    const list = codes;
    return (
      <div className="space-y-3">
        {list.map((c) => (
          <div
            key={c.code}
            className={`rounded-xl border px-4 py-3 ${
              c.status === 'active'
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : 'border-border/60 bg-card/40 opacity-75'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-base font-bold tracking-wider text-foreground">
                  {c.code}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    c.status === 'active'
                      ? 'bg-emerald-500/15 text-emerald-500'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {c.status}
                </span>
              </div>
              {c.status === 'active' ? <CopyButton text={c.code} /> : null}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.rewards}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground/70">Added {c.added}</p>
          </div>
        ))}
      </div>
    );
  },
};

export async function renderMdx(source: string) {
  const { content } = await compileMDX<MdxFrontmatter>({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });
  return content;
}

export function RelatedLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
    >
      {children}
      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
    </Link>
  );
}
