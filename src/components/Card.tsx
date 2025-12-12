interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-[#F2F0E5] border border-black/10 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/10 ${className}`}
    >
      {children}
    </div>
  );
}
