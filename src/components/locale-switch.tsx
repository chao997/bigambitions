'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Languages } from 'lucide-react';

const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  fr: 'FR',
  de: 'DE',
  pt: 'PT',
};

export function LocaleSwitch({ className }: { className?: string }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const order = ['en', 'fr', 'de', 'pt'];
  const next = order[(order.indexOf(locale) + 1) % order.length];

  return (
    <button
      type="button"
      aria-label={t('language')}
      onClick={() => router.replace(pathname, { locale: next })}
      className={className}
    >
      <Languages className="size-4" />
      <span className="text-xs font-semibold">{LOCALE_LABELS[next] ?? next.toUpperCase()}</span>
    </button>
  );
}
