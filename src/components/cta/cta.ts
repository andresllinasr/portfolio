import ctaTemplate from './cta.hbs';
import { getHandlebars } from '../../utils/handlebars';

export async function registerCtaPartial(): Promise<void> {
  const Handlebars = await getHandlebars();
  
  Handlebars.registerHelper('eq', (a: unknown, b: unknown) => String(a === b));
  Handlebars.registerPartial('Cta', ctaTemplate);
}
