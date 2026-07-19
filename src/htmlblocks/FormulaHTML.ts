"use strict";

import * as katex from "katex";

interface FormulaToken {
  formula: string;
}

/**
 * Renders a block-level LaTeX formula using KaTeX as an HTML string
 */
export class FormulaHTML {
  private token: FormulaToken;

  constructor(token: FormulaToken) {
    this.token = token;
  }

  public render(): string {
    let bodyContent = "";

    try {
      bodyContent = katex.renderToString(this.token.formula, {
        displayMode: true,
        throwOnError: false,
      });
    } catch (e) {
      console.error("KaTeX rendering error:", e);
      bodyContent = this.token.formula
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    // clean Structure
    return `
<div class="md-formula-outer">
  <div class="md-formula-container">
    
    <!-- Header -->
    <div class="md-formula-header">
      <span class="md-formula-title">Formula</span>
    </div>

    <!-- Body -->
    <div class="md-formula-body">
      ${bodyContent}
    </div>

  </div>
</div>
    `.trim();
  }
}