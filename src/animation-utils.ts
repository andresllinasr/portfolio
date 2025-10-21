import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

export const DEFAULT_SCROLL_OPTIONS = {
  start: 'top 80%',
  toggleActions: 'play restart none none',
} as const;

export function splitHeader(headerEl: HTMLElement) {
  const text = headerEl.textContent || '';
  const spans: HTMLElement[] = [];
  
  const fragment = document.createDocumentFragment();
  
  for (const ch of text) {
    if (ch === ' ') {
      fragment.appendChild(document.createTextNode(' '));
    } else {
      const span = document.createElement('span');
      span.textContent = ch;
      span.style.display = 'inline-block';
      span.style.opacity = '0.1';
      fragment.appendChild(span);
      spans.push(span);
    }
  }

  headerEl.textContent = '';
  headerEl.appendChild(fragment);

  return spans;
}

export function typingAnimation(
  header: HTMLHeadingElement,
  opts?: {
    start?: string;
    end?: string;
    scrub?: number | boolean;
    gradientColors?: [string, string];
  }
) {
  const text = header.textContent || '';
  const punctuationMatch = text.match(/[.!?—]/);
  const highlightEndIndex = punctuationMatch ? punctuationMatch.index! : text.length;

  const highlightedText = text.slice(0, highlightEndIndex);
  const remainingText = text.slice(highlightEndIndex);

  header.innerHTML = `<span class="highlight-bg">${highlightedText}</span>${remainingText}`;

  const highlightEl = header.querySelector<HTMLElement>('.highlight-bg');
  if (!highlightEl) return;

  const [color1, color2] = opts?.gradientColors || ['var(--color-main-950)', 'var(--color-main-800)'];

  gsap.set(highlightEl, {
    backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`,
    backgroundRepeat: 'repeat-y',
    backgroundSize: '0% 100%',
    color: 'white',
  });

  gsap.to(highlightEl, {
    backgroundSize: '100% 100%',
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: header,
      start: opts?.start || 'top 70%',
      end: opts?.end || 'top 50%',
      scrub: opts?.scrub ?? 5,
    },
  });
}

export function fadeInOnScroll(
  targets: string | HTMLElement[] | NodeListOf<HTMLElement>,
  opts?: {
    start?: string;
    toggleActions?: string;
    y?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
  }
) {
  const elements: HTMLElement[] =
    typeof targets === 'string'
      ? Array.from(document.querySelectorAll<HTMLElement>(targets))
      : Array.from(targets);

  if (!elements.length) return;

  gsap.set(elements, { 
    autoAlpha: 0, 
    y: opts?.y ?? 30 
  });

  gsap.to(elements, {
    autoAlpha: 1,
    y: 0,
    duration: opts?.duration ?? 0.6,
    ease: opts?.ease ?? 'power2.out',
    stagger: opts?.stagger ?? 0.1,
    scrollTrigger: {
      trigger: elements[0],
      start: opts?.start || DEFAULT_SCROLL_OPTIONS.start,
      toggleActions: opts?.toggleActions || DEFAULT_SCROLL_OPTIONS.toggleActions,
    },
  });
}

export function punchWords(
  targets: string | HTMLElement[] | NodeListOf<HTMLElement>,
  opts?: {
    start?: string;
    toggleActions?: string;
    colorFlash?: string;
    colorEnd?: string;
    letterDuration?: number;
    fadeDuration?: number;
    delayBetween?: number;
  }
) {
  const elements: HTMLElement[] =
    typeof targets === 'string'
      ? Array.from(document.querySelectorAll<HTMLElement>(targets))
      : Array.from(targets);

  elements.forEach((el) => {
    if (!el) return;

    const chars = splitHeader(el);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: opts?.start || 'top 80%',
        toggleActions: opts?.toggleActions || 'play restart none none',
      },
    });

    chars.forEach((char) => {
      tl.to(char, {
        color: opts?.colorFlash || '#9c56fc',
        opacity: 1,
        duration: opts?.letterDuration ?? 0.001,
        ease: 'power2.out',
      }).to(char, {
        delay: opts?.delayBetween ?? 0.05,
        color: opts?.colorEnd || 'revert',
        duration: opts?.fadeDuration ?? 0.025,
        ease: 'power1.in',
      });
    });
  });
}
