import { Module } from '../Module';
import template from './hero.hbs';
import content from './content.json';
import { registerCtaPartial } from '../../components/cta/cta';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { logger } from '../../utils/logger';

const ANIMATION_OVERLAP_OFFSET = '-=0.5';
const VIDEO_DELAY_OFFSET = '+=0.2';

function heroAnimation(element: HTMLElement, _tl: gsap.core.Timeline) {
  const contactBtn = element.querySelector<HTMLButtonElement>('button');
  contactBtn?.addEventListener('click', () => {
    gsap.to(window, { scrollTo: '#contact', duration: 0.7 });
  });

  const splitEl = element.querySelector<HTMLElement>('.gsap-split');
  const maskEl = element.querySelector<HTMLElement>('.gsap-mask');
  const ctaContainer = element.querySelector<HTMLElement>('.hero-cta-container');
  const ctaButtons = element.querySelectorAll<HTMLButtonElement>('.hero-cta-container button');
  const scrollHintVideo = element.querySelector<HTMLVideoElement>('.scroll-hint');

  const masterTl = gsap.timeline({ delay: 0.3 });

  if (splitEl) {
    const text = splitEl.textContent || '';
    const words = text.trim().split(/\s+/);
    
    splitEl.innerHTML = '';
    const wordElements: HTMLElement[] = [];
    
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(50px)';
      
      splitEl.appendChild(span);
      wordElements.push(span);
      
      if (index < words.length - 1) {
        splitEl.appendChild(document.createTextNode(' '));
      }
    });

    gsap.set(splitEl, { opacity: 1 });

    masterTl.to(wordElements, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.4,
      ease: 'power2.out'
    });
  }

  document.fonts.ready.then(() => {
    if (maskEl) {
      gsap.set(maskEl, { opacity: 1 });
      
      const maskSplit = SplitText.create(maskEl, { type: 'chars, words', mask: 'chars' });

      masterTl.from(
        maskSplit.chars,
        {
          duration: 0.8,
          yPercent: 'random([-120, 120])',
          xPercent: 'random([-80, 80])',
          rotation: 'random([-30, 30])',
          opacity: 0,
          textShadow: '0px 0px 30px rgba(255,255,255,0.8)',
          stagger: { from: 'random', amount: 0.5 },
          ease: 'power3.out',
          clearProps: 'textShadow',
          onComplete: () => {
            maskSplit.revert();
            maskEl.removeAttribute('aria-hidden');
          }
        },
        ANIMATION_OVERLAP_OFFSET
      );
    }

    if (ctaContainer && ctaButtons.length > 0) {
      gsap.set(ctaButtons, { opacity: 0, y: 25, scale: 0.9 });
      
      masterTl.to(ctaContainer, {
        opacity: 1,
        duration: 0.1
      }, '>')
      .to(ctaButtons, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.15,
        ease: 'back.out(1.2)'
      }, '<0.05');
    }

    if (scrollHintVideo) {
      gsap.set(scrollHintVideo, { opacity: 1 });
      
      masterTl.from(scrollHintVideo, { 
        opacity: 0, 
        duration: 0.3
      }, VIDEO_DELAY_OFFSET)
      .add(() => {
        scrollHintVideo.play();
      }, '<');
    }
  });
}

function setupDownloadButton(element: HTMLElement) {
  const downloadBtn = element.querySelector<HTMLButtonElement>('button[data-download="cv"]');
  if (!downloadBtn) {
    logger.warn('Download button not found');
    return;
  }

  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href =
      'https://docs.google.com/document/d/186GIckhs1BwJoFqwPKfxI6XqIU0kM4GKLoTfwVVBgV4/export?format=pdf';
    link.download = 'MyCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function fixHeroHeightOnLoad(section: HTMLElement) {
  const initialHeight = window.innerHeight;
  section.style.height = `${initialHeight}px`;
}


export async function renderHero(app: HTMLElement, id: string): Promise<Module | void> {
  if (!app) {
    logger.warn('App container not provided');
    return;
  }

  await registerCtaPartial();

  const heroModule = new Module('hero', id, app, template, content, {
    onInit: (el) => {
      fixHeroHeightOnLoad(el);
      setupDownloadButton(el);
    },
    onRender: (el, tl) => {
      heroAnimation(el, tl);
    },
  });
  await heroModule.render();
  return heroModule;
}
