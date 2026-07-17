"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

interface Options {
  /** ms before the effect begins */
  delay?: number;
  /** ms between scramble frames */
  frameInterval?: number;
  /** stagger between words (ms) */
  wordStagger?: number;
  /** start scrambling immediately (else waits for `start`) */
  active?: boolean;
}

/**
 * Resolves `text` from random characters, word by word.
 * Each character settles after a random delay (200–600ms).
 */
export function useTextScramble(
  text: string,
  { delay = 0, frameInterval = 35, wordStagger = 100, active = true }: Options = {},
) {
  const [output, setOutput] = useState<string>(() =>
    prefersReducedMotion() ? text : "",
  );
  const rafTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setOutput(text);
      return;
    }

    const words = text.split(" ");
    // assign each character a resolve time relative to effect start
    const charPlan: { char: string; resolveAt: number; isSpace: boolean }[] = [];
    let cursor = 0;
    words.forEach((word, wi) => {
      const wordStart = wi * wordStagger;
      for (const ch of word) {
        const dur = 200 + Math.random() * 400; // 200–600ms
        charPlan.push({ char: ch, resolveAt: wordStart + dur, isSpace: false });
        cursor++;
      }
      if (wi < words.length - 1) {
        charPlan.push({ char: " ", resolveAt: wordStart, isSpace: true });
        cursor++;
      }
    });

    let elapsed = 0;
    const begin = () => {
      rafTimer.current = setInterval(() => {
        elapsed += frameInterval;
        let done = true;
        const next = charPlan
          .map((c) => {
            if (c.isSpace) return " ";
            if (elapsed >= c.resolveAt) return c.char;
            done = false;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setOutput(next);
        if (done && rafTimer.current) {
          clearInterval(rafTimer.current);
          rafTimer.current = null;
          setOutput(text);
        }
      }, frameInterval);
    };

    startTimer.current = setTimeout(begin, delay);

    return () => {
      if (rafTimer.current) clearInterval(rafTimer.current);
      if (startTimer.current) clearTimeout(startTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, active]);

  return output;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
