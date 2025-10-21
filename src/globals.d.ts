declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const value: Record<string,unknown>;
  export default value;
}

declare module '*.hbs' {
  const template: string;
  export default template;
}