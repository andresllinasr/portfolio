import { Module } from '../Module';
import template from './about.hbs';
import content from './content.json';
import gsap from 'gsap';
import { typingAnimation } from '../../animation-utils';

export function animateImpactSteps(line: HTMLElement) {
  const steps = line.textContent?.split(', ') || [];
  
  const fragment = document.createDocumentFragment();
  
  const spans = steps.map((step) => {
    const span = document.createElement('span');
    span.textContent = step;
    span.classList.add(
      'inline-block',
      'opacity-0',
      'mx-3',
      'font-extrabold',
      'tracking-tight'
    );
    fragment.appendChild(span);
    return span;
  });
  
  line.innerHTML = '';
  line.appendChild(fragment);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: line,
      start: 'top 60%',
      toggleActions: 'play none none none',
    },
  });

  tl.fromTo(
    spans,
    {
      y: 20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.2,
    }
  );
}


function animateAboutModule(el: HTMLElement) {
  const header = el.querySelector<HTMLHeadingElement>('h2');
  if (header) typingAnimation(header);

  const approachLine = el.querySelector<HTMLElement>('.animation-tbd');
  if (approachLine) animateImpactSteps(approachLine);
}

export async function renderAbout(container: HTMLElement, id: string) {
  const aboutModule = new Module('about', id, container, template, content, {
    onRender: (el) => {
      animateAboutModule(el);
    },
  });

  await aboutModule.render();
  return aboutModule;
}
