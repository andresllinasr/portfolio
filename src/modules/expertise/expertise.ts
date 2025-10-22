import { Module } from '../Module';
import template from './expertise.hbs';
import content from './content.json';

export async function renderExpertise(container: HTMLElement, id: string) {
  const expertiseModule = new Module('expertise', id, container, template, content, {});
  await expertiseModule.render();

  initializeExpandableCards(container);

  return expertiseModule;
}

function initializeExpandableCards(container: HTMLElement) {
  const cards = container.querySelectorAll('button[aria-expanded]');
  cards.forEach(initializeExpandableCard);
}

function initializeExpandableCard(card: Element) {
  const button = card as HTMLButtonElement;
  let isExpanded = false;

  const toggleCardExpansion = () => {
    isExpanded = !isExpanded;
    button.setAttribute('aria-expanded', String(isExpanded));

    const cover = button.querySelector<HTMLElement>('.cover-layer');
    const skills = button.querySelector<HTMLElement>('.skills-container');

    if (cover) cover.style.transform = isExpanded ? 'translateY(-100%)' : 'translateY(0)';
    if (skills) skills.setAttribute('aria-hidden', String(!isExpanded));
  };

  button.addEventListener('click', toggleCardExpansion);

  button.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCardExpansion();
    } else if (e.key === 'Escape' && isExpanded) {
      toggleCardExpansion();
    }
  });
}
