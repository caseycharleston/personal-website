'use client';

import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { Menu as MenuIcon } from 'lucide-react';

type Tab = { label: string; href: string };

export default function NavMenu({
  tabs,
  className = '',
}: {
  tabs: Tab[];
  className?: string;
}) {
  return (
    <Menu as="div" className={`relative ${className}`}>
      <Menu.Button
        aria-label="Open navigation menu"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:text-accent"
      >
        <MenuIcon size={20} />
      </Menu.Button>
      <Menu.Items
        modal={false}
        className="absolute right-0 mt-2 flex w-44 flex-col gap-1 rounded-xl border border-border bg-surface p-2 shadow-lg focus:outline-none"
      >
        {tabs.map(tab => (
          <Menu.Item key={tab.href}>
            <Link
              href={tab.href}
              className="block rounded-lg px-4 py-2 font-mono text-lg lnk hover:text-accent data-focus:bg-background data-focus:text-accent"
            >
              {tab.label}
            </Link>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
