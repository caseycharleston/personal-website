import TagLink from './TagLink';

interface TagListProps {
  tags: string[];
  hrefBase: string;
  className?: string;
}

export default function TagList({ tags, hrefBase, className }: TagListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className={['flex flex-wrap gap-2', className].filter(Boolean).join(' ')}>
      {tags.map(tag => (
        <li key={tag}>
          <TagLink tag={tag} hrefBase={hrefBase} />
        </li>
      ))}
    </ul>
  );
}
