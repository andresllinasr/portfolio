import './styles/main.css';
import './animation-utils';
import { renderHero } from './modules/hero/hero';
import { renderNav } from './components/nav/nav';
import { renderLogos } from './modules/customer-logos/customer-logos';
import { mountTestimonials } from './modules/testimonials/testimonials';
import { renderText } from './modules/big-text/big-text';
import { renderStack } from './modules/stack/stack';
import { renderForm } from './modules/form/form';
import { renderExpertise } from './modules/expertise/expertise';
import { renderLighthouseScores } from './modules/lighthouse-scores/lighthouse-scores';
import { registerHandlebarsHelpers } from './modules/helpers';
import { createBMCBubble } from './components/bmc-bubble/bmc-bubble';
import { renderSectionDivider, SVG_SHAPES } from './components/section-divider/section-divider';
import { logger } from './utils/logger';

async function initializeApp() {
  const app = document.getElementById('app');

  if (!app) {
    throw new Error('App container not found');
  }

  await registerHandlebarsHelpers();

  const main = document.createElement('main');
  main.setAttribute('role', 'main');
  app.appendChild(main);

  const modules = [
    () => renderNav(app),
    () => renderHero(main, 'hero-1'),
    () => renderLogos(main, 'logos-1'),
    () => renderExpertise(main,'expertise-1'),
    () => renderLighthouseScores(main, 'lighthouse-1'),
    () => renderText(main,'text-1'),
    () => renderSectionDivider(main, {
      fromColor: '#09090b',
      toColor: '#18181b',
      svgPath: SVG_SHAPES['diagonal-top']
    }),
    () => mountTestimonials(main, 'testimonials-1'),
    () => renderSectionDivider(main, {
      fromColor: '#09090b',
      toColor: '#18181b',
      svgPath: SVG_SHAPES.diagonal
    }),
    () => renderStack(main, 'stack-1'),
    () => renderSectionDivider(main, {
      fromColor: '#18181b',
      toColor: '#27272a',
      svgPath: SVG_SHAPES['waves-opacity']
    }),
    () => renderForm(main,'form-1')
  ];

  for (const moduleInit of modules) {
    await new Promise(resolve => {
      requestAnimationFrame(async () => {
        await moduleInit();
        resolve(void 0);
      });
    });
  }

  await new Promise(resolve => {
    requestAnimationFrame(async () => {
      await createBMCBubble(document.body, {
        username: 'andresllinasr',
        color: '#BD5FFF',
        targetSection: '#contact'
      });
      resolve(void 0);
    });
  });
}

initializeApp().catch((error) => logger.error('Failed to initialize app', error));
