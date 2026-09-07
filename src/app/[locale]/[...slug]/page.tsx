import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import {
  getRegistry,
  getVisibleRegistry,
  getArticleMeta,
  getCategoryChildren,
  readArticleSource,
  defaultLocale,
} from '@/lib/content';
import { routing } from '@/i18n/routing';
import { WikiShell } from '@/components/wiki-shell';
import { WikiSidebar } from '@/components/wiki-sidebar';
import { Breadcrumb, CategoryGrid } from '@/components/article-bits';
import { renderMdx } from '@/components/mdx-content';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getVisibleRegistry(locale).map((a) => ({ locale, slug: a.slug.split('/') })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const meta = getArticleMeta(slug.join('/'), locale) ?? getArticleMeta(slug.join('/'), defaultLocale);
  if (!meta) return {};
  return { title: meta.title, description: meta.description };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const slugPath = slug.join('/');

  // Fall back to the default-locale article when the current locale has no copy.
  const meta = getArticleMeta(slugPath, locale) ?? getArticleMeta(slugPath, defaultLocale);
  if (!meta) notFound();

  const source = readArticleSource(slugPath, meta.locale);
  if (!source) notFound();

  const content = await renderMdx(source);
  const t = await getTranslations('article');

  // Category overview pages (e.g. /races, /bosses) render a card grid of their children.
  const isCategoryRoot = !slugPath.includes('/');
  const children = isCategoryRoot
    ? getCategoryChildren(meta.category, locale).filter((a) => a.slug.split('/').length > 1)
    : [];

  const breadcrumbItems = [
    ...(isCategoryRoot
      ? [{ label: meta.title }]
      : [
          { label: meta.category.charAt(0).toUpperCase() + meta.category.slice(1), href: `/${meta.category}` },
          { label: meta.title },
        ]),
  ];

  return (
    <WikiShell
      aside={<WikiSidebar locale={locale} activeSlug={slugPath} />}
      main={
        <>
          <Breadcrumb items={breadcrumbItems} />
          <article className="pb-16">
            <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">{meta.title}</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{meta.description}</p>
            {meta.updated ? (
              <p className="mt-3 text-xs text-muted-foreground">
                {t('lastUpdated')} <time dateTime={meta.updated}>{meta.updated}</time>
              </p>
            ) : null}

            <div className="mt-8 mdx-body">{content}</div>

            {children.length > 0 ? (
              <section className="mt-12">
                <h2 className="text-xl font-semibold tracking-tight">{t('inThisCategory')}</h2>
                <CategoryGrid items={children} />
              </section>
            ) : null}

            {!isCategoryRoot ? (
              <div className="mt-12 border-t border-border/50 pt-6">
                <Link
                  href={`/${meta.category}`}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  {meta.category.charAt(0).toUpperCase() + meta.category.slice(1)} {t('guides')}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ) : null}
          </article>
        </>
      }
    />
  );
}
