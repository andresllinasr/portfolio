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
      
      const coverLayer = card.querySelector('.absolute.inset-0.z-10') as HTMLElement;
      const skillsContainer = card.querySelector('.skills-container') as HTMLElement;
      
      if (isExpanded) {
        coverLayer?.style.setProperty('transform', 'translateY(-100%)');
        skillsContainer?.setAttribute('aria-hidden', 'false');
      } else {
        coverLayer?.style.setProperty('transform', 'translateY(0)');
        skillsContainer?.setAttribute('aria-hidden', 'true');
      }
    };
    
    card.addEventListener('click', (e) => {
      e.preventDefault();
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
