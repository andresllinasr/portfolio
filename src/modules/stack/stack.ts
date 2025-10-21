import { Module } from '../Module';
import template from './stack.hbs';
import content from './content.json';
import gsap from 'gsap';

const ROW_GROUPING_TOLERANCE_PX = 5;


function animateStackCategory(category: HTMLHeadingElement) {
  const skillItems = Array.from(category.parentElement!.querySelectorAll<HTMLElement>('.slide-up'));
  const categoryContainer = category.parentElement!;

  const itemPositions = skillItems.map(item => ({
    element: item,
    top: item.getBoundingClientRect().top
  }));

  const rows: HTMLElement[][] = [];
  itemPositions.forEach(({ element, top }) => {
    let row = rows.find((r) => {
      const rowTop = itemPositions.find(pos => pos.element === r[0])?.top ?? 0;
      return Math.abs(rowTop - top) < ROW_GROUPING_TOLERANCE_PX;
    });
    if (!row) {
      row = [];
      rows.push(row);
    }
    row.push(element);
  });

  gsap.set([category, ...skillItems], { autoAlpha: 0, y: 80 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: categoryContainer,
      start: 'center 85%',
      end: 'center 15%',
      toggleActions: 'play pause resume reverse',
    },
  });

  tl.to(category, { autoAlpha: 1, y: 0, ease: 'circ.out', duration: 0.5 });

  rows.forEach((row) => {
    tl.to(
      row,
      { autoAlpha: 1, y: 0, ease: 'circ.out', duration: 0.5, stagger: 0.1 },
      '-=0.2'
    );
  });
}

function animateStackModule(el: HTMLElement) {
  const categories = el.querySelectorAll<HTMLHeadingElement>('h3');
  categories.forEach((category) => animateStackCategory(category));
}

export async function renderStack(container: HTMLElement, id: string) {
  const stackModule = new Module('stack', id, container, template, content, {
    onRender: (el) => {
      animateStackModule(el);
    },
  });

  await stackModule.render();
  return stackModule;
}
