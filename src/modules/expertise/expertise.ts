import { Module } from '../Module';
import template from './expertise.hbs';
import content from './content.json';

export async function renderExpertise(container: HTMLElement, id: string) {
  const expertiseModule = new Module('expertise', id, container, template, content, {});
  await expertiseModule.render();
  setupExpertiseInteractions(container);
  return expertiseModule;
}

function setupExpertiseInteractions(container: HTMLElement) {
  const cards = container.querySelectorAll('button[aria-expanded]');
  
  cards.forEach((card) => {
    let isExpanded = false;
    
    const toggleCard = () => {
      isExpanded = !isExpanded;
      card.setAttribute('aria-expanded', isExpanded.toString());
      
      const coverLayer = card.querySelector('.cover-layer') as HTMLElement;
      const skillsContainer = card.querySelector('.skills-container') as HTMLElement;
      
      if (isExpanded) {
        if (coverLayer) coverLayer.style.transform = 'translateY(-100%)';
        skillsContainer?.setAttribute('aria-hidden', 'false');
      } else {
        if (coverLayer) coverLayer.style.transform = 'translateY(0)';
        skillsContainer?.setAttribute('aria-hidden', 'true');
      }
    };
    
    card.addEventListener('click', () => {
      toggleCard();
    });
    
    card.addEventListener('keydown', (e) => {
      const ke = e as KeyboardEvent;
      if (ke.key === 'Enter' || ke.key === ' ') {
        ke.preventDefault();
        toggleCard();
      } else if (ke.key === 'Escape' && isExpanded) {
        toggleCard();
      }
    });
  });
}
