declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module 'react-dom/client';
declare module 'bootstrap';
