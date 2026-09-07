'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function CopyButton({ text, label }: { text: string; label?: string }) {
  const t = useTranslations('home');
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={label ?? t('copy')}
      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
    >
      {copied ? (
        <>
          <Check className="size-3 text-emerald-500" />
          {t('copied')}
        </>
      ) : (
        <>
          <Copy className="size-3" />
          {t('copy')}
        </>
      )}
    </button>
  );
}
