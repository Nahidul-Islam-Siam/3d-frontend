const ALLOWED_ELEMENTS = [
  'p',
  'b',
  'i',
  'u',
  's',
  'strike',
  'del',
  'strong',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'ul',
  'ol',
  'li',
  'a',
  'br',
  'div',
  'span',
  'blockquote',
];

const ALLOWED_ATTRIBUTES = ['href', 'target', 'rel', 'align', 'class'];

type SanitizerTargetElement = Element & {
  setHTML?: (
    html: string,
    options?: {
      sanitizer?: {
        elements?: string[];
        attributes?: string[];
      };
    }
  ) => void;
};

let domPurifyPromise: Promise<typeof import('dompurify')['default']> | undefined;

function loadDOMPurify() {
  domPurifyPromise ??= import('dompurify').then((mod) => mod.default);
  return domPurifyPromise;
}

/**
 * Safely sanitize and inject untrusted HTML into an element.
 * Uses the native Sanitizer API (`setHTML`) where supported and lazy-loads
 * DOMPurify only in browsers that lack native support.
 */
export async function safeSetHTML(el: HTMLElement, html: string): Promise<void> {
  const input = html || '';
  const target = el as SanitizerTargetElement;

  if ('setHTML' in Element.prototype && typeof target.setHTML === 'function') {
    target.setHTML(input, {
      sanitizer: {
        elements: ALLOWED_ELEMENTS,
        attributes: ALLOWED_ATTRIBUTES,
      },
    });
    return;
  }

  const DOMPurify = await loadDOMPurify();
  el.innerHTML = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [...ALLOWED_ELEMENTS, '#text'],
    ALLOWED_ATTR: ALLOWED_ATTRIBUTES,
    ALLOW_ARIA_ATTR: false,
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: false,
  });
}

