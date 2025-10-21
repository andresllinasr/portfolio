import template from './bmc-bubble.hbs';
import './bmc-bubble.css';
import { getHandlebars } from '../../utils/handlebars';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface BMCBubbleOptions {
  username: string;
  targetSection?: string;
  color?: string;
}

export class BMCBubble {
  private container: HTMLElement | null = null;
  private scrollTrigger: ScrollTrigger | null = null;
  private isVisible: boolean = false;

  constructor(private options: BMCBubbleOptions) {
    this.options = {
      targetSection: '#contact',
      color: '#BD5FFF',
      ...options,
    };
  }

  public async render(parentContainer: HTMLElement): Promise<void> {
    const Handlebars = await getHandlebars();
    const compiled = Handlebars.compile(template);
    const html = compiled({});

    parentContainer.insertAdjacentHTML('beforeend', html);
    this.container = document.getElementById('bmc-bubble-container');

    if (this.container) {
      this.attachClickHandler();
      this.setupScrollTrigger();
    }
  }

  private attachClickHandler(): void {
    const button = document.getElementById('bmc-custom-button');
    if (button) {
      button.addEventListener('click', () => {
        window.open(`https://www.buymeacoffee.com/${this.options.username}`, '_blank', 'noopener,noreferrer');
      });
    }
  }

  private setupScrollTrigger(): void {
    if (!this.container || !this.options.targetSection) return;

    const targetElement = document.querySelector(this.options.targetSection);
    if (!targetElement) return;

    this.scrollTrigger = ScrollTrigger.create({
      trigger: targetElement,
      start: 'top 90%',
      end: 'bottom 10%',
      onEnter: () => this.showBubble(),
      onLeave: () => this.hideBubble(),
      onEnterBack: () => this.showBubble(),
      onLeaveBack: () => this.hideBubble(),
    });
  }

  private showBubble(): void {
    if (!this.container || this.isVisible) return;
    this.isVisible = true;
    
    gsap.killTweensOf(this.container);
    
    // Bubble entrance with floating
    gsap.timeline()
      .fromTo(this.container, 
        { opacity: 0, scale: 0, rotation: -15 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
      )
      .to(this.container, {
        y: -8, rotation: 2, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1
      }, 0.6);
  }

  private hideBubble(): void {
    if (!this.container || !this.isVisible) return;
    this.isVisible = false;
    
    gsap.killTweensOf(this.container);
    gsap.to(this.container, { 
      opacity: 0, scale: 0, rotation: 25, y: 0, duration: 0.4, ease: 'back.in(1.7)' 
    });
  }

  public destroy(): void {
    this.scrollTrigger?.kill();
    if (this.container) {
      gsap.killTweensOf(this.container);
      this.container.remove();
    }
    this.isVisible = false;
  }
}

export async function createBMCBubble(container: HTMLElement, options: BMCBubbleOptions): Promise<BMCBubble> {
  const bubble = new BMCBubble(options);
  await bubble.render(container);
  return bubble;
}
