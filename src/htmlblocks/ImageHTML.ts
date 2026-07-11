"use strict";

interface ImageToken {
  url: string;
  alt?: string;
}

/**
 * Renders an image markdown token into a valid HTML string
 * @param token object containing image metadata
 * @return HTML string with figure and optional caption
 */
export class ImageHTML {
  private token: ImageToken;

  constructor(token: ImageToken) {
    this.token = token;
  }

  public render(): string {
    // Remove path prefix "./" or "/" from the image URL if present
    const imgSrc = this.token.url ? this.token.url.replace(/^\.?\//, "") : "";
    const altText = this.token.alt || "";

    // Prepare the figcaption block only if alt text is provided
    const figcaptionBlock = altText
      ? `<figcaption class="mt-2 text-[12px] font-mono text-slate-400 text-center">${altText}</figcaption>`
      : "";

    // Return the monolithic valid HTML string.
    // Replaced <span> with <div>, removed the block class (since div is block-level by default)
    return `
<div class="leading-7 font-mono mt-4">
    <figure class="flex flex-col items-center my-5">
        <img src="${imgSrc}" alt="${altText}" class="shadow-md rounded-md max-w-full h-auto w-full sm:w-10/12 border border-gray-200">
        ${figcaptionBlock}
    </figure>
</div>
    `.trim();
  }
}
