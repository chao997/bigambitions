import { BackToTop } from './back-to-top';

// Fixed ambient background layers shared by every page.
export function BackdropFx() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background opacity-80 blur-sm" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/3 blur-[100px]" />
      <div className="absolute inset-0 bg-background/50" />
    </div>
  );
}

export function WikiShell({
  main,
  aside,
}: {
  main: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="relative z-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex gap-8">
          <main className="min-w-0 flex-1">{main}</main>
          {aside}
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
