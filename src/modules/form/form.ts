import template from './form.hbs';
import content from './content.json';
import { Module } from '../Module';
import { registerCtaPartial } from '../../components/cta/cta';
import { logger } from '../../utils/logger';

function attachFormspreeHandler(form: HTMLFormElement, status: HTMLElement, video?: HTMLVideoElement) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        status.textContent = 'Thanks for your submission!';
        status.classList.replace('text-red-500', 'text-green-500');
        form.reset();

        if (video) {
          video.classList.remove('hidden');
          video.currentTime = 0;

          try {
            await video.play();
          } catch (err) {
            logger.warn('Autoplay blocked. User interaction required.', err);
          }

          const handleEnd = () => {
            video.classList.add('hidden');
            video.removeEventListener('ended', handleEnd);
          };
          video.addEventListener('ended', handleEnd);
        }
      } else {
        const result = await res.json();
        status.textContent =
          result.errors?.map((err: { message: string }) => err.message).join(', ') ||
          'Oops! Something went wrong.';
        status.classList.replace('text-green-500', 'text-red-500');
      }
    } catch (err) {
      logger.error('Form submission failed', err);
      status.textContent = 'Oops! Something went wrong.';
      status.classList.replace('text-green-500', 'text-red-500');
    }
  });
}

export async function renderForm(app: HTMLElement, id: string): Promise<Module> {
  await registerCtaPartial();

  const FormModule = new Module('form', id, app, template, content);
  await FormModule.render();

  const form = app.querySelector<HTMLFormElement>('form');
  const status = app.querySelector<HTMLElement>('#contact-form-status');
  const video = app.querySelector<HTMLVideoElement>('form~video');

  if (form && status) attachFormspreeHandler(form, status, video || undefined);
  else logger.warn('Form or status element not found in container.');

  return FormModule;
}

export async function mountForm(container: HTMLElement, id: string): Promise<Module | void> {
  if (!container) return logger.warn('Form container not provided');
  return await renderForm(container, id);
}
