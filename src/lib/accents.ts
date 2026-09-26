export type AccentId = 'green' | 'blue' | 'purple' | 'amber' | 'rose';

export const ACCENTS: { id: AccentId; label: string }[] = [
  { id: 'green', label: 'Green' },
  { id: 'blue', label: 'Blue' },
  { id: 'purple', label: 'Purple' },
  { id: 'amber', label: 'Amber' },
  { id: 'rose', label: 'Rose' },
];

export const DEFAULT_ACCENT: AccentId = 'amber';
export const STORAGE_THEME = 'theme';
export const STORAGE_ACCENT = 'accent';
