type HandlebarsHelper = (this: unknown, ...args: unknown[]) => string | boolean;

interface HandlebarsStatic {
  compile: (template: string) => (context: Record<string, unknown>) => string;
  registerHelper: (name: string, helper: HandlebarsHelper) => void;
  registerPartial: (name: string, partial: string) => void;
}

// Shared Handlebars instance for lazy loading
let handlebarsInstance: HandlebarsStatic | null = null;

export async function getHandlebars(): Promise<HandlebarsStatic> {
  if (!handlebarsInstance) {
    const Handlebars = await import('handlebars');
    handlebarsInstance = Handlebars.default as HandlebarsStatic;
    
    handlebarsInstance.registerHelper('eq', function(a: unknown, b: unknown) {
      return a === b;
    });
  }
  return handlebarsInstance;
}
