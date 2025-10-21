import { Module } from '../Module';
import template from './lighthouse-scores.hbs';
import content from './content.json';
import './lighthouse-scores.css';
import gsap from 'gsap';

function getScoreColor(score: number): string {
  if (score >= 90) return 'var(--lighthouse-green)';
  if (score >= 50) return 'var(--lighthouse-orange)';
  return 'var(--lighthouse-red)';
}

function getLighthouseOffset(score: number): number {
  if (score >= 90) return 100 - (75 + ((score - 90) * 2.5));
  if (score >= 50) return 100 - (25 + ((score - 50) * 1.25));
  return 100 - (score * 0.5);
}

function animateLighthouseGauges(el: HTMLElement) {
  const gauges = el.querySelectorAll('.lighthouse-gauge-arc');
  const percentages = el.querySelectorAll<HTMLElement>('.lighthouse-gauge-percentage');
  const CIRCUMFERENCE = 100;
  const STAGGER_DELAY = 0.25;
  
  gauges.forEach((gauge) => {
    const score = parseInt(gauge.getAttribute('data-score') || '0');
    
    gsap.set(gauge, {
      strokeDasharray: CIRCUMFERENCE,
      strokeDashoffset: CIRCUMFERENCE,
      stroke: getScoreColor(score)
    });
    
    const baseCircle = gauge.previousElementSibling as SVGElement;
    if (baseCircle) {
      gsap.set(baseCircle, {
        stroke: getScoreColor(score),
        opacity: 0.1
      });
    }
  });
  
  percentages.forEach((percentageEl) => {
    percentageEl.textContent = '0';
  });
  
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: el.querySelector('.grid'),
      start: 'top 70%',
      toggleActions: 'play none none none',
    },
  });
  
  gauges.forEach((gauge, index) => {
    const score = parseInt(gauge.getAttribute('data-score') || '0');
    
    timeline.to(gauge, {
      strokeDashoffset: getLighthouseOffset(score),
      duration: 1.5,
      ease: 'power2.out',
    }, index * STAGGER_DELAY);
  });
  
  percentages.forEach((percentageEl, index) => {
    const finalScore = parseInt(percentageEl.getAttribute('data-final-score') || '0');
    const scoreObject = { value: 0 };
    
    timeline.to(scoreObject, {
      value: finalScore,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate() {
        const currentScore = Math.round(scoreObject.value);
        percentageEl.textContent = currentScore.toString();
        
        if (currentScore < finalScore) {
          percentageEl.style.transform = 'scale(1.08)';
          percentageEl.style.color = '#ffffff';
        } else {
          percentageEl.style.transform = 'scale(1)';
          percentageEl.style.color = '';
        }
      },
      onComplete() {
        percentageEl.textContent = finalScore.toString();
        percentageEl.style.transform = 'scale(1)';
        percentageEl.style.color = '';
      }
    }, (index * STAGGER_DELAY) + 0.3);
  });
}

export async function renderLighthouseScores(container: HTMLElement, id: string) {
  const module = new Module('lighthouse-scores', id, container, template, content, {
    onRender: (el) => animateLighthouseGauges(el),
  });

  await module.render();
  return module;
}
