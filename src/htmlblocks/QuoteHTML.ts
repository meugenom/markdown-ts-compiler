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
    // Remove prefix '>' from every stroke 
    const paragraphs = this.token.value
      .replace(/^>\s?/gm, "")
      .split("\n");
      
    const paragraphsHtml = paragraphs
      .map((text) => `<p class="md-quote-p">${text}</p>`.trim())
      .join("");

    return `<div>${paragraphsHtml}</div>`;
  }
}