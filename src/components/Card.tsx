interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
