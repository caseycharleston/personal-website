export type AccentId = 'green' | 'blue' | 'purple' | 'amber' | 'rose';

export const ACCENTS: { id: AccentId; label: string; swatch: string }[] = [
  { id: 'green', label: 'Green', swatch: '#059669' },
  { id: 'blue', label: 'Blue', swatch: '#2563eb' },
  { id: 'purple', label: 'Purple', swatch: '#9333ea' },
  { id: 'amber', label: 'Amber', swatch: '#b45309' },
  { id: 'rose', label: 'Rose', swatch: '#e11d48' },
];

export const DEFAULT_ACCENT: AccentId = 'amber';
export const STORAGE_THEME = 'theme';
export const STORAGE_ACCENT = 'accent';
