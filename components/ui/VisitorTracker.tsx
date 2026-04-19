"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
    const pathname = usePathname();
    useRef(false);

    useEffect(() => {
        // Prevent double firing in React 18 strict mode
        // Actually, we want to track every path change, so initialized Ref might only track first load.
        // Better to let it track path changes.

        // We want to track this specific visit.
        const trackVisit = async () => {
            try {
                await fetch('/api/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: pathname,
                        userAgent: navigator.userAgent,
                    }),
                });
            } catch (err) {
                // Silently fail to avoid impacting user experience
                console.error('Tracking failed', err);
            }
        };

        trackVisit();
    }, [pathname]);

    return null;
}
