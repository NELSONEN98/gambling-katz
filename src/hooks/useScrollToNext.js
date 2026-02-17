import { useEffect, useRef } from "react";

export default function useScrollToNext(onNext, threshold = 40) {
    const scrollAccumulator = useRef(0);
    const cooldown = useRef(false);
    const lastTouchY = useRef(0);
    const resetTimer = useRef(null);

    useEffect(() => {
        const isIgnoringElement = (target) => {
            return !!target.closest(".image__carousel, .no-scroll-nav");
        };

        const handleScroll = (deltaY, target) => {
            if (cooldown.current || isIgnoringElement(target)) return;

            if (deltaY > 0) {
                scrollAccumulator.current += deltaY;

                if (resetTimer.current) clearTimeout(resetTimer.current);
                resetTimer.current = setTimeout(() => {
                    scrollAccumulator.current = 0;
                }, 200);

                if (scrollAccumulator.current >= threshold) {
                    onNext();
                    cooldown.current = true;
                    scrollAccumulator.current = 0;
                    setTimeout(() => {
                        cooldown.current = false;
                    }, 1500);
                }
            } else {
                scrollAccumulator.current = 0;
            }
        };

        const handleWheel = (e) => {
            handleScroll(e.deltaY, e.target);
        };

        const handleTouchStart = (e) => {
            lastTouchY.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            const currentTouchY = e.touches[0].clientY;
            const deltaY = lastTouchY.current - currentTouchY;
            if (deltaY > 5) {
                // Small threshold to detect intent
                handleScroll(deltaY, e.target);
            }
            lastTouchY.current = currentTouchY;
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            if (resetTimer.current) clearTimeout(resetTimer.current);
        };
    }, [onNext, threshold]);
}
