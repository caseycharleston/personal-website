interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/10 ${className}`}
    >
      {children}
    </div>
  );
}
