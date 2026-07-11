declare module '*.css' {
  const content: Array<[string, string, string, string]> | any;
  export default content;
}

declare module 'raw-loader!*' {
  const content: string;
  export default content;
}