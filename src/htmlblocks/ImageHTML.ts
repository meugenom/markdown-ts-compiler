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
    // Remove paths prefixes "./" or "/" from URL
    const imgSrc = this.token.url ? this.token.url.replace(/^\.?\//, "") : "";
    const altText = this.token.alt || "";

    // Prepare alt for image
    const figcaptionBlock = altText
      ? `<figcaption class="md-image-caption">${altText}</figcaption>`
      : "";

    // Retunr clean HTML
    return `
    <div class="md-image-outer">
      <figure class="md-image-figure">
        <img src="${imgSrc}" alt="${altText}" class="md-image">
          ${figcaptionBlock}
      </figure>
    </div>
    `.trim();
  }
}