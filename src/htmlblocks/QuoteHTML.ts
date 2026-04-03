"use strict";
/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as code block
 */

import * as Token from "../Token";

export class QuoteHTML {
  private token: Token.quoteToken;

  constructor(token: Token.quoteToken) {
    this.token = token;
  }

  renderAsElement(): HTMLElement {
    
     const element = document.createElement('div');
    
     //numbers of paragraphs
    const paragraphs = this.token.value
      .replace(/^>\s?/gm, "")
      .split("\n")
      
      
    element.innerHTML = paragraphs
      .map(
        (text) => `
    			<p class="mb-4 leading-7 font-mono text-slate-700 dark:text-slate-300 border-l-4 border-blue-400 pl-4">
        			${text}
    			</p>
				`,
      )
      .join("");

    return element;
  }
}
