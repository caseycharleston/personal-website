import Link from 'next/link';
import AccentPicker from './AccentPicker';
import ThemeToggle from './ThemeToggle';

const tabs = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
];

export default function Header() {
  return (
    <header className="fixed w-full bg-surface/95 backdrop-blur-lg border-b border-border text-foreground z-50">
      <nav className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 sm:px-8 py-4">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-mono font-semibold tracking-tight transition-transform hover:scale-[1.02] hover:text-accent"
        >
          caseyc.dev
        </Link>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10">
          <ul className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10 font-mono">
            {tabs.map(tab => (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className="relative transition-colors text-2xl duration-200 hover:text-accent"
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <AccentPicker />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
