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
 *
 * The output is initialised to the REAL text so the server (and the first
 * client paint) render the final headline — critical for LCP: the largest
 * element paints its content immediately instead of waiting for hydration +
 * the scramble to run, and for CLS: the element reserves its true height from
 * the first frame. The scramble is then a desktop-only enhancement: it never
 * runs on touch devices or under reduced-motion, where it would only add jank
 * and hurt Core Web Vitals for no benefit.
 */
export function useTextScramble(
  text: string,
  { delay = 0, frameInterval = 35, wordStagger = 100, active = true }: Options = {},
) {
  // Real text on the server and first client render (they must match to avoid
  // a hydration mismatch). The effect below may temporarily scramble it.
  const [output, setOutput] = useState<string>(text);
  const rafTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    // Only decode-scramble on precise-pointer devices (desktop) with motion
    // allowed. Mobile keeps the static real text painted at SSR.
    if (!shouldScramble()) {
      setOutput(text);
      return;
    }

    const words = text.split(" ");
    // assign each character a resolve time relative to effect start
    const charPlan: { char: string; resolveAt: number; isSpace: boolean }[] = [];
    words.forEach((word, wi) => {
      const wordStart = wi * wordStagger;
      for (const ch of word) {
        const dur = 200 + Math.random() * 400; // 200–600ms
        charPlan.push({ char: ch, resolveAt: wordStart + dur, isSpace: false });
      }
      if (wi < words.length - 1) {
        charPlan.push({ char: " ", resolveAt: wordStart, isSpace: true });
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

function shouldScramble(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  return !reduced && finePointer;
}
