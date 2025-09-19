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
    <div className="h-screen flex flex-col items-center justify-center pt-16 relative overflow-hidden">
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

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-medium font-mono flex items-center gap-4">
          <span>Casey is a</span>
          <AnimatedWord onIndexChange={handleIndexChange} />
        </h1>
      </div>
    </div>
  );
}
