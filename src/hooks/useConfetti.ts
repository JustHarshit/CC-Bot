"use client";

import { useCallback } from "react";

export function useConfetti() {
  const fireConfetti = useCallback(async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      const duration = 2000;
      const end = Date.now() + duration;

      const colors = ["#f97316", "#a855f7", "#fb923c", "#c4b5fd", "#fed7aa"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch (e) {
      console.error("Confetti failed:", e);
    }
  }, []);

  return { fireConfetti };
}
