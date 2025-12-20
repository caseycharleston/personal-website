export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-28 pb-16 relative overflow-hidden px-4 sm:px-8">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center md:text-left md:items-start">
        <h1 className="text-5xl md:text-7xl xl:text-8xl font-medium font-mono flex flex-wrap items-center justify-center md:justify-start gap-5 leading-tight text-black drop-shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <span className="shrink-0">Casey</span>
        </h1>
      </div>
    </div>
  );
}
