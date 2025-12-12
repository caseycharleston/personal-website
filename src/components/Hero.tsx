'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedWord from './AnimatedWord';

const backgroundImages = [
  '/backgrounds/developer-bg.svg',
  '/backgrounds/longhorn-bg.svg',
  '/backgrounds/gamer-bg.svg',
  '/backgrounds/writer-bg.svg',
];

export default function Hero() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const handleIndexChange = (index: number) => {
    setCurrentBgIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-28 pb-16 relative overflow-hidden px-4 sm:px-8">
      {backgroundImages.map((bgImage, index) => (
        <motion.div
          key={index}
          initial={{ opacity: index === 0 ? 1 : 0 }}
          animate={{
            opacity: index === currentBgIndex ? 1 : 0,
            zIndex: index === currentBgIndex ? 1 : 0,
          }}
          transition={{ duration: 2, ease: [0, 0, 0.58, 1] }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[#FEFCF0]/75 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center md:text-left md:items-start">
        <h1 className="text-5xl md:text-7xl xl:text-8xl font-medium font-mono flex flex-wrap items-center justify-center md:justify-start gap-5 leading-tight text-black drop-shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <span className="shrink-0">Casey is a</span>
          <AnimatedWord heightRem={5.8} onIndexChange={handleIndexChange} />
        </h1>
      </div>
    </div>
  );
}
