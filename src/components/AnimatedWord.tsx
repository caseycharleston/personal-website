'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const items = [
  {
    word: 'developer',
    color: '#d7e7ff',
    tooltip: 'I prefer fullstack!',
  },
  {
    word: 'longhorn',
    color: '#f5d9b0',
    tooltip: "Hook 'em! 🤘",
  },
  {
    word: 'gamer',
    color: '#f7c9c9',
    tooltip: "I'm now playing Hitman and Hades 2",
  },
  {
    word: 'writer',
    color: '#e6dfcf',
    tooltip: 'Check out my blog!',
  },
];

const INTERVAL = 6000;

interface AnimatedWordProps {
  className?: string;
  widthCh?: number;
  heightRem?: number;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export default function AnimatedWord({
  widthCh,
  heightRem = 4.5,
  currentIndex,
  onIndexChange,
}: AnimatedWordProps) {
  const [index, setIndex] = useState(currentIndex || 0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [typedText, setTypedText] = useState('');

  // Use external index if provided, otherwise use internal cycling
  const activeIndex = currentIndex !== undefined ? currentIndex : index;

  useEffect(() => {
    if (currentIndex === undefined) {
      const t = setInterval(() => {
        const newIndex = (index + 1) % items.length;
        setIndex(newIndex);
        setShowTooltip(false);
        setTypedText('');
        onIndexChange?.(newIndex);
      }, INTERVAL);
      return () => clearInterval(t);
    }
  }, [currentIndex, index, onIndexChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setTypedText('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    if (!showTooltip) return;

    const currentItem = items[activeIndex % items.length];
    const text = currentItem.tooltip;
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [showTooltip, activeIndex]);

  const safeIndex = activeIndex % items.length;
  const { word, color } = items[safeIndex];

  const maxWordLength = Math.max(...items.map(item => item.word.length));
  const dynamicWidth = widthCh || maxWordLength + 2;

  return (
    <div className="relative">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-[#F2F0E5] border border-black/10 text-black text-xs sm:text-sm md:text-base rounded-lg shadow-lg whitespace-nowrap z-10"
          >
            <span className="font-mono">
              {typedText}
              {showTooltip && typedText.length < items[safeIndex].tooltip.length && (
                <span className="animate-pulse">|</span>
              )}
            </span>
            {/* Arrow pointing down */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#F2F0E5]"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Word */}
      <motion.div
        className={'align-middle overflow-hidden relative z-10'}
        style={{
          width: `${dynamicWidth}ch`,
          height: `${heightRem}rem`,
          borderRadius: 9999,
        }}
        animate={{ backgroundColor: color }}
        transition={{
          backgroundColor: { duration: 0.8, ease: [0, 0, 0.58, 1] },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            initial={{ y: '100%', opacity: 1 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 1 }}
            transition={{ duration: 0.8, ease: [0, 0, 0.58, 1] }}
            className="flex items-center justify-center whitespace-nowrap text-black font-medium h-full text-[0.8em]"
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
