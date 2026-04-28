import Link from 'next/link';

const tabs = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
];

export default function Header() {
  return (
    <header className="fixed w-full bg-[#FEFCF0]/95 backdrop-blur-lg border-b border-black/10 text-black z-50">
      <nav className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 sm:px-8 py-4">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-mono font-semibold tracking-tight transition-transform hover:scale-[1.02] hover:text-emerald-600"
        >
          caseyc.dev
        </Link>
        <ul className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10 font-mono">
          {tabs.map(tab => (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className="relative transition-colors text-2xl duration-200 hover:text-emerald-600"
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
