import AnimatedWord from './AnimatedWord';

export default function Hero() {
  return (
    <div className="h-screen flex flex-col items-center justify-center pt-16">
      <h1 className="text-4xl md:text-6xl font-semibold font-mono flex items-center gap-4">
        <span>Casey is a</span>
        <AnimatedWord />
      </h1>
    </div>
  );
}
