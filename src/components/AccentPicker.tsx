'use client';

import { Menu } from '@headlessui/react';
import { ACCENTS } from '@/lib/accents';
import { useTheme } from './ThemeProvider';

export default function AccentPicker() {
  const { accent, setAccent } = useTheme();
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        aria-label="Change accent color"
        className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-accent bg-surface transition-transform hover:scale-105"
      >
        <span className="h-4 w-4 rounded-full bg-accent" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-lg focus:outline-none">
        {ACCENTS.map(a => (
          <Menu.Item key={a.id}>
            <button
              type="button"
              onClick={() => setAccent(a.id)}
              aria-label={a.label}
              className={`h-6 w-6 rounded-full transition-transform hover:scale-110 ${
                accent === a.id
                  ? 'ring-2 ring-foreground ring-offset-2 ring-offset-surface'
                  : ''
              }`}
              style={{ backgroundColor: a.swatch }}
            />
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
