'use strict'

import * as Token from "../Token";

/**
 * Renders a Markdown blockquote token into a valid HTML string
 */
export class QuoteHTML {
  private token: Token.quoteToken;

  constructor(token: Token.quoteToken) {
    this.token = token;
  }

  public render(): string {
    // Remove the '>' prefix from each line and split the text into separate paragraphs
    const paragraphs = this.token.value
    .replace(/^>\s?/gm, "")
      .split("\n");
      
    // Generate an array of <p> strings and join them into a single monolithic HTML text
    const paragraphsHtml = paragraphs
      .map((text) => `
<p class="mb-4 leading-7 font-mono text-slate-700 dark:text-slate-300 border-l-4 border-blue-400 pl-4">
    ${text}
</p>
      `.trim())
      .join("");

    // Return the final HTML, wrapped in a div (as this was done by the container element in the DOM)
    return `<div>${paragraphsHtml}</div>`;
  }
}