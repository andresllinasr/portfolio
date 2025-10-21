import { Module } from '../Module';
import template from './customer-logos.hbs';
import content from './content.json';
import { punchWords, fadeInOnScroll, DEFAULT_SCROLL_OPTIONS } from '../../animation-utils';

function animateLogosModule(el: HTMLElement) {
  const headers = el.querySelectorAll<HTMLElement>('h2, h3');
  
  if (!headers.length) return;

  // Character-by-character reveal with color flash
  punchWords(headers, {
    colorFlash: '#9c56fc',
    colorEnd: '#ffffff',
    letterDuration: 0.001,
    fadeDuration: 0.025,
    delayBetween: 0.05,
    start: DEFAULT_SCROLL_OPTIONS.start,
    toggleActions: DEFAULT_SCROLL_OPTIONS.toggleActions,
  });

  // Smooth fade-in with upward motion
  fadeInOnScroll(headers, {
    y: 30,
    duration: 0.6,
  });
}


export async function renderLogos(container: HTMLElement, id: string) {
  const logosModule = new Module('logos', id, container, template, content, {
    onRender: (el) => {
      animateLogosModule(el);
    }
  });

  await logosModule.render();
  return logosModule;
}
