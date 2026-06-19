'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const items = [
  { word: 'developer', tooltip: 'I <3 fullstack' },
  { word: 'longhorn', tooltip: "Hook 'em! 🤘" },
  { word: 'gamer', tooltip: 'Now playing: Terraria, Overwatch, Slay the Spire 2' },
  { word: 'writer', tooltip: 'Check out my blog!' },
];

const TOOLTIP_DELAY = 2000; // ms after a word appears before its tooltip types
const TYPING_SPEED = 60; // ms per character
const POST_TYPING_DELAY = 3000; // ms to hold a finished tooltip before the next word
const MAX_WORD_LENGTH = Math.max(...items.map(item => item.word.length));

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
  const isControlled = currentIndex !== undefined;

  const [internalIndex, setInternalIndex] = useState(currentIndex ?? 0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [typedText, setTypedText] = useState('');

  const activeIndex = (isControlled ? currentIndex : internalIndex) % items.length;
  const { word, tooltip } = items[activeIndex];
  const isTypingComplete = showTooltip && typedText.length === tooltip.length;

  // Advance to the next word a few seconds after its tooltip finishes typing
  // (only when uncontrolled).
  useEffect(() => {
    if (isControlled || !isTypingComplete) return;

    const timer = setTimeout(() => {
      const next = (internalIndex + 1) % items.length;
      setInternalIndex(next);
      onIndexChange?.(next);
    }, POST_TYPING_DELAY);

    return () => clearTimeout(timer);
  }, [isControlled, isTypingComplete, internalIndex, onIndexChange]);

  // Reveal the tooltip a beat after each word changes.
  useEffect(() => {
    setShowTooltip(false);
    setTypedText('');

    const timer = setTimeout(() => setShowTooltip(true), TOOLTIP_DELAY);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Type the tooltip out one character at a time.
  useEffect(() => {
    if (!showTooltip) return;

    let charIndex = 0;
    const timer = setInterval(() => {
      charIndex += 1;
      setTypedText(tooltip.slice(0, charIndex));
      if (charIndex >= tooltip.length) clearInterval(timer);
    }, TYPING_SPEED);

    return () => clearInterval(timer);
  }, [showTooltip, tooltip]);

  const dynamicWidth = widthCh ?? MAX_WORD_LENGTH + 2;

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
              <span className={isTypingComplete ? 'animate-blink' : ''}>|</span>
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
