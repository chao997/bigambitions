import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function SiteFooter() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-neutral-950 text-neutral-100">
      <div className="border-b border-white/8 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.14),transparent_48%),linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-10 lg:px-16">
          <p className="text-center text-sm font-medium uppercase tracking-[0.16em] text-neutral-100">
            {t('strip')}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-12 pb-6 sm:px-10 sm:pt-14 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <span className="relative inline-flex size-12 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/12 shadow-[0_0_24px_rgba(250,204,21,0.18)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.svg" alt="" className="object-cover" width={48} height={48} />
              </span>
              <div>
                <p className="text-2xl tracking-[0.08em] text-neutral-50">{t('brand')}</p>
              </div>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-neutral-400">{t('brandNote')}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-12">
            <div className="space-y-5">
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-neutral-100">
                {t('quickLinks')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.bigambitionsgame.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-neutral-400 transition-colors hover:text-neutral-100"
                  >
                    Official Site
                  </a>
                </li>
                <li>
                  <a
                    href="https://store.steampowered.com/app/1331550/Big_Ambitions/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-neutral-400 transition-colors hover:text-neutral-100"
                  >
                    Steam Page
                  </a>
                </li>
                <li>
                  <Link href="/price" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    Price Guide
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-neutral-100">
                {t('guides')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/guide" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    Beginner Guide
                  </Link>
                </li>
                <li>
                  <Link href="/best-business" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    Best Business
                  </Link>
                </li>
                <li>
                  <Link href="/cinema-layout" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    Cinema Layout
                  </Link>
                </li>
                <li>
                  <Link href="/factory" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    Factory Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-neutral-100">
                {t('legal')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    {t('privacy')}
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    {t('terms')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-neutral-100">
                {t('community')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://discord.gg/hovgaardgames" target="_blank" rel="noreferrer" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    Official Discord
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@HovgaardGames" target="_blank" rel="noreferrer" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    Official YouTube
                  </a>
                </li>
                <li>
                  <a href="https://www.reddit.com/r/bigambitions/" target="_blank" rel="noreferrer" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    r/bigambitions
                  </a>
                </li>
                <li>
                  <a href="https://steamcommunity.com/app/1331550/workshop/" target="_blank" rel="noreferrer" className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    Steam Workshop
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/8 pt-6">
          <p className="text-center text-xs leading-6 text-neutral-500">{t('disclaimer')}</p>
          <p className="mt-2 text-center text-xs text-neutral-600">
            © {new Date().getFullYear()} Big Ambitions Wiki
          </p>
        </div>
      </div>
    </footer>
  );
}
