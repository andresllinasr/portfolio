import template from './nav.hbs';
import content from './content.json';
import { getHandlebars } from '../../utils/handlebars';

export async function renderNav(container: HTMLElement): Promise<void> {
  const Handlebars = await getHandlebars();
  const compiled = Handlebars.compile(template);
  const html = compiled(content);
  container.insertAdjacentHTML('beforeend', html);
}
