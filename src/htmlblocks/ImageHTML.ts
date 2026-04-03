"use strict";

/**
 * Returns an html element <span> for badge
 * @param line as block of the text
 * @return dom element for badge <span> ...</span>
 */

export class ImageHTML {
  private token: any;

  constructor(token: any) {
    this.token = token;
  }

  renderAsElement(): HTMLElement {
    const ImageNode = document.createElement("span");
    ImageNode.className = "block leading-7 font-mono mt-4";

    let text = "";

    const imgSrc = this.token.url.replace(/^\.?\//, "");
    text =
      text +
      `
				<figure class="flex flex-col items-center my-5">
					<img src="${imgSrc}" alt="${this.token.alt}" class="shadow-md rounded-md max-w-full h-auto w-full sm:w-10/12 border border-gray-200">
					${this.token.alt ? `<figcaption class="mt-2 text-[12px] font-mono text-slate-400 text-center">${this.token.alt}</figcaption>` : ""}
				</figure>
				`;

    ImageNode.innerHTML = text;
    return ImageNode;
  }
}
