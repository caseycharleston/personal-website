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
    <header className="fixed w-full bg-black text-white z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="#top" className="text-xl font-mono font-medium">
          caseyc.dev
        </Link>
        <ul className="flex space-x-8">
          {tabs.map(tab => (
            <li key={tab.href}>
              <a href={tab.href} className="hover:underline font-mono">
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
