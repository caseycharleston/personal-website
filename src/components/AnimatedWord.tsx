'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const items = [
  {
    word: 'developer',
    tooltip: 'I <3 fullstack',
  },
  {
    word: 'longhorn',
    tooltip: "Hook 'em! 🤘",
  },
  {
    word: 'gamer',
    tooltip: 'Now playing: Baldur\'s Gate 3, Hades 2, Slay the Spire',
  },
  {
    word: 'writer',
    tooltip: 'Check out my blog!',
  },
];

const INTERVAL = 6000; // ms

interface AnimatedWordProps {
  widthCh?: number;
  heightRem?: number;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export default function AnimatedWord({
  widthCh,
  heightRem = 2.4,
  currentIndex,
  onIndexChange,
}: AnimatedWordProps) {
  const [index, setIndex] = useState(currentIndex || 0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [typedText, setTypedText] = useState('');

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
    }, 40);

    return () => clearInterval(typeInterval);
  }, [showTooltip, activeIndex]);

  const safeIndex = activeIndex % items.length;
  const { word } = items[safeIndex];

  const maxWordLength = Math.max(...items.map(item => item.word.length));
  const dynamicWidth = widthCh || maxWordLength + 2;

  return (
    <span className="relative inline-flex align-middle">
      <AnimatePresence>
        {showTooltip && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-[#F2F0E5] border border-black/10 text-black text-xs sm:text-sm md:text-base rounded-lg shadow-lg whitespace-nowrap z-10"
          >
            <span className="font-mono">
              {typedText}
              {showTooltip && typedText.length < items[safeIndex].tooltip.length && (
                <span className="animate-pulse">|</span>
              )}
            </span>
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#F2F0E5]" />
          </motion.span>
        )}
      </AnimatePresence>
      <span
        className="inline-flex align-middle overflow-hidden justify-center text-center bg-[#F2F0E5] border border-black/10 rounded-full px-3"
        style={{ width: `${dynamicWidth}ch`, height: `${heightRem}rem` }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.7, ease: [0, 0, 0.58, 1] }}
            className="flex items-center justify-center whitespace-nowrap font-mono font-semibold text-black"
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
