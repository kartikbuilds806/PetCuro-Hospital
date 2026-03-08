import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attach to a ref to animate an element into view
 * when it enters the viewport.
 * @param {object} options - IntersectionObserver options
 */
export function useScrollReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('revealed');
                    observer.unobserve(el); // only animate once
                }
            },
            { threshold: 0.12, ...options }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}
