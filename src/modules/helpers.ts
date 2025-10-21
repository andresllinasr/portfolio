import { getHandlebars } from '../utils/handlebars';

interface HandlebarsHelperOptions {
  fn: (context: unknown) => string;
  inverse: (context: unknown) => string;
}

const logoFileMapping: Record<string, string> = {
  'Node.js': 'nodejs',
  'Next.js': 'nextjs',
  'CI&T': 'ci-and-t',
  'Styled-Components': 'styled-components',
};

function getLogoFileName(displayName: string): string {
  return logoFileMapping[displayName] || displayName.toLowerCase();
}

export async function registerHandlebarsHelpers(): Promise<void> {
  const Handlebars = await getHandlebars();
  
  Handlebars.registerHelper(
    'ifEquals',
    function (this: unknown, ...args: unknown[]) {
      const [arg1, arg2, options] = args as [unknown, unknown, HandlebarsHelperOptions];
      if (arg1 === arg2) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    }
  );

  Handlebars.registerHelper(
    'logoFile',
    function (displayName: unknown) {
      return getLogoFileName(String(displayName));
    }
  );

  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
    green: { bg: 'bg-green-500/20', text: 'text-green-400' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
    yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
    teal: { bg: 'bg-teal-500/20', text: 'text-teal-400' },
  };

  Handlebars.registerHelper(
    'getBgClass',
    function (colorScheme: unknown) {
      const scheme = String(colorScheme);
      return colorMap[scheme]?.bg || 'bg-zinc-500/20';
    }
  );

  Handlebars.registerHelper(
    'getTextClass',
    function (colorScheme: unknown) {
      const scheme = String(colorScheme);
      return colorMap[scheme]?.text || 'text-zinc-400';
    }
  );

  Handlebars.registerHelper(
    'add',
    function (a: unknown, b: unknown) {
      return String(Number(a) + Number(b));
    }
  );
  
}
