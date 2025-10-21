import { Module } from '../Module';
import template from './testimonials.hbs';
import content from './content.json';
import { logger } from '../../utils/logger';

export async function renderTestimonials(container: HTMLElement, id: string) {
  const testimonialsModule = new Module('testimonials', id, container, template, content);

  await testimonialsModule.render();
  return testimonialsModule;
}

export async function mountTestimonials(container: HTMLElement, id: string) {
  if (!container) {
    logger.warn('Testimonials container not provided');
    return;
  }

  return await renderTestimonials(container, id);
}
