"use strict";

interface ImageToken {
  url: string;
  alt?: string;
}

/**
 * Renders an image markdown token into a valid HTML string with lazy loading support
 * @param token object containing image metadata
 * @return HTML string with figure, loader, and optional caption
 */
export class ImageHTML {
  private token: ImageToken;

  constructor(token: ImageToken) {
    this.token = token;
  }

  public render(): string {
    // Remove path prefix "./" or "/" from the image URL if present    
  let imgSrc = this.token.url ? this.token.url.replace(/^\.?\//, "") : "";
  
  // 2. Ensure the image source is a relative path if it doesn't start with "http" or "data:"
  if (
    imgSrc && 
    !imgSrc.startsWith('http') && 
    !imgSrc.startsWith('data:') &&
    !imgSrc.includes('Invalid') &&
    !imgSrc.includes('Missing')
  ) {
    imgSrc = '/' + imgSrc;
  }

    const altText = this.token.alt || "";
    // Prepare the figcaption block only if alt text is provided    
    const figcaptionBlock = altText
      ? `<figcaption class="mt-2 text-[12px] font-mono text-slate-400 text-center">${altText}</figcaption>`
      : "";

    // Return the monolithic valid HTML string.
    // 1. Added a relative container and a static text-based loader block.
    // 2. Swapped src for an inline transparent SVG placeholder to preserve layout aspect ratios.
    // 3. Stored the actual path in data-src and added animation/opacity classes.
    return `
<div class="leading-7 font-mono mt-4">
    <figure class="relative flex flex-col items-center my-5 overflow-hidden group">                      
        <img 
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'></svg>" 
            data-src="${imgSrc}" 
            alt="${altText}"
            class="lazy opacity-0 transition-opacity duration-500 shadow-md rounded-md max-w-full h-auto w-full sm:w-10/12 border border-gray-200 z-20">        
        ${figcaptionBlock}
    </figure>
</div>
    `.trim();
  }
}