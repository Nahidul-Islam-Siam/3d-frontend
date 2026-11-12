import { useEffect, useRef } from 'react';
import { safeSetHTML } from '@/lib/utils/sanitizeHtml';

interface SafeHtmlContentProps {
  html: string;
  className?: string;
}

export default function SafeHtmlContent({
  html,
  className = 'rich-text-content',
}: SafeHtmlContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    void safeSetHTML(el, html).catch(() => {
      if (!cancelled && containerRef.current) {
        containerRef.current.textContent = '';
      }
    });

    return () => {
      cancelled = true;
    };
  }, [html]);

  return <div ref={containerRef} className={className} />;
}

