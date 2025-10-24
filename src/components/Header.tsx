import Link from 'next/link';

const tabs = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact Me', href: '#contact' },
];

export default function Header() {
  return (
    <header className="fixed w-full bg-[#171738]/90 backdrop-blur-lg border-b border-white/10 text-white z-50">
      <nav className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 sm:px-8 py-4">
        <Link href="#top" className="text-2xl md:text-3xl font-mono font-semibold tracking-tight transition-transform hover:scale-[1.02]">
          caseyc.dev
        </Link>
        <ul className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10 text-sm sm:text-base md:text-lg font-mono">
          {tabs.map(tab => (
            <li key={tab.href}>
              <a
                href={tab.href}
                className="relative transition-colors duration-200 hover:text-emerald-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-emerald-300 after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
