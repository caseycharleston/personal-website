interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}
