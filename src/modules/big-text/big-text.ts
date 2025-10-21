import { Module } from '../Module';
import template from './big-text.hbs';
import content from './content.json';
import { typingAnimation } from '../../animation-utils';

function animateTextModule(el: HTMLElement) {
  const header = el.querySelector<HTMLHeadingElement>('h2');
  if (!header) return;
  typingAnimation(header);
}

export async function renderText(container: HTMLElement, id: string) {
  const textModule = new Module('text', id, container, template, content, {
    onRender: (el) => {
      animateTextModule(el);
    },
  });

  await textModule.render();
  return textModule;
}
