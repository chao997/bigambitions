import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="text-7xl text-foreground">404</p>
      <p className="mt-4 text-muted-foreground">
        This page could not be found in New York. Try the wiki navigation instead.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary/60"
      >
        Back to Home
      </Link>
    </div>
  );
}
