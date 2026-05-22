import Header from '@/components/Header';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="section-shell flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="mt-3 text-3xl font-mono font-semibold sm:text-4xl">TIL not found</h1>
        <p className="mt-4 max-w-xl text-base text-black/80">
          I've never learned that! Or at least not yet.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            className="rounded-full border border-black/20 px-5 py-2 text-sm font-medium transition hover:border-black/40"
            href="/til"
          >
            View what I've learned
          </Link>
          <Link
            className="rounded-full border border-black/20 px-5 py-2 text-sm font-medium transition hover:border-black/40"
            href="/"
          >
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
