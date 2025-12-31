'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaBluesky } from 'react-icons/fa6';
import { HiCheckCircle, HiOutlineClipboard } from 'react-icons/hi';
import { IoIosMail } from 'react-icons/io';

export default function ContactSection() {
  const email = 'caseycharleston@gmail.com';
  const [isCopied, setIsCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy email', error);
    }
  };

  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section id="contact" className="min-h-screen section-shell">
      <h2 className="section-title mb-8">Stay Connected</h2>
      <hr className="mb-8" />
      <div className="space-y-4">
        <Link
          href="https://www.linkedin.com/in/caseycharleston/"
          className="flex items-center gap-3 text-black transition-colors duration-200 hover:text-emerald-600"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin /> linkedin.com/in/caseycharleston
        </Link>
        <Link
          href="https://github.com/caseycharleston"
          className="flex items-center gap-3 text-black transition-colors duration-200 hover:text-emerald-600"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub /> github.com/caseycharleston
        </Link>
        <Link
          href="https://bsky.app/profile/caseycharleston.bsky.social"
          className="flex items-center gap-3 text-black transition-colors duration-200 hover:text-emerald-600"
          target="_blank"
          rel="noreferrer"
        >
          <FaBluesky /> bsky.app/profile/caseycharleston.bsky.social
        </Link>
        <Popover>
          <div
            className="relative inline-flex items-center gap-3 text-black transition-colors duration-200 hover:text-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            role="presentation"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <PopoverButton className="sr-only">Toggle email tooltip</PopoverButton>
            <div
              role="button"
              tabIndex={0}
              className="flex cursor-pointer items-center gap-3"
              onClick={handleCopy}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleCopy();
                }
              }}
              aria-label={`Copy email ${email}`}
            >
              <IoIosMail className="text-xl" /> {email}
            </div>
            <PopoverPanel
              static
              className={`absolute left-full top-1/2 ml-3 -translate-y-1/2 transition-opacity duration-150 ${
                isHovering ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="relative flex items-center gap-2 whitespace-nowrap rounded-md border border-black/10 bg-gray-900 px-3 py-2 text-xs text-white shadow-lg">
                <span className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-gray-900 border-l border-t border-black/10" />
                {isCopied ? (
                  <HiCheckCircle className="text-emerald-400" />
                ) : (
                  <HiOutlineClipboard className="text-white" />
                )}
                <span>{isCopied ? 'Copied!' : 'Click to copy'}</span>
              </div>
            </PopoverPanel>
          </div>
        </Popover>
      </div>
    </section>
  );
}
