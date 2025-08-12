"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const items = [
  {
    word: "developer",
    color: "#60a5fa",
    tooltip: "I mainly dabble in fullstack",
  },
  { word: "longhorn", color: "#bf5700", tooltip: "Hook 'em! 🤘" },
  { word: "gamer", color: "#f87171", tooltip: "I can't wait for silksong" },
  { word: "writer", color: "#000000", tooltip: "Check out my blog!" },
];

const INTERVAL = 6000;

interface AnimatedWordProps {
  className?: string;
  widthCh?: number;
  heightRem?: number;
}

export default function AnimatedWord({
  widthCh,
  heightRem = 4.5,
}: AnimatedWordProps) {
  const [index, setIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
      setShowTooltip(false);
      setTypedText("");
    }, INTERVAL);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setTypedText("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (!showTooltip) return;

    const currentItem = items[index % items.length];
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
  }, [showTooltip, index]);

  const safeIndex = index % items.length;
  const { word, color } = items[safeIndex];

  const maxWordLength = Math.max(...items.map((item) => item.word.length));
  const dynamicWidth = widthCh || maxWordLength + 2;

  return (
    <div className="relative">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-10"
            style={{
              maxWidth: "300px",
            }}
          >
            <span className="font-mono">
              {typedText}
              {showTooltip &&
                typedText.length < items[safeIndex].tooltip.length && (
                  <span className="animate-pulse">|</span>
                )}
            </span>
            {/* Arrow pointing down */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Word */}
      <motion.div
        className={"align-middle overflow-hidden"}
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
            initial={{ y: "100%", opacity: 1 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 1 }}
            transition={{ duration: 0.8, ease: [0, 0, 0.58, 1] }}
            className="flex items-center justify-center whitespace-nowrap text-white font-medium h-full"
            style={{ fontSize: "inherit" }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
