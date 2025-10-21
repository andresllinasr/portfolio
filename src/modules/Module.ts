import { gsap } from 'gsap/gsap-core';
import { getHandlebars } from '../utils/handlebars';

export class Module {
  protected element: HTMLElement | null = null;
  public timeline: gsap.core.Timeline;

  constructor(
    protected readonly moduleName: string,
    protected readonly id: string,
    protected readonly container: HTMLElement,
    protected readonly template: string,
    protected readonly content: Record<string, unknown>,
    protected readonly hooks?: {
      onInit?: (el: HTMLElement) => void;
      onRender?: (el: HTMLElement, tl: gsap.core.Timeline) => void;
      onDestroy?: () => void;
    }
  ) {
    this.timeline = gsap.timeline({ paused: true });
  }

  public async render(): Promise<void> {
    const Handlebars = await getHandlebars();
    const compiled = Handlebars.compile(this.template);
    const html = compiled(this.content).trim();

    const temp = document.createElement('div');
    temp.innerHTML = html;
    const outerElement = temp.firstElementChild as HTMLElement | null;
    if (!outerElement) return;

    outerElement.id = this.id;
    outerElement.classList.add(`${this.moduleName}-module`);

    this.hooks?.onInit?.(outerElement);

    this.container.appendChild(outerElement);
    this.element = outerElement;

    this.hooks?.onRender?.(outerElement, this.timeline);

    this.timeline.play();
  }

  public destroy(): void {
    this.timeline.kill();
    this.hooks?.onDestroy?.();
    this.element?.remove();
    this.element = null;
  }
}
