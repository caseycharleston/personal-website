import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="section-shell flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="mt-3 text-3xl font-mono font-semibold sm:text-4xl">404</h1>
      <p className="mt-4 max-w-xl text-base text-foreground/80">
        The link you followed does not point anywhere on my website. Go back home!
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          className="rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:border-foreground/40"
          href="/"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
