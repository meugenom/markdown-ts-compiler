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

    // Собираем структуру: переводим тег с текстом Formula в одну строку
    return `
<div class="code-block-outer my-5">
  <div class="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
    
    <!-- Header -->
    <div class="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <span class="text-[11px] font-bold uppercase tracking-widest opacity-50">Formula</span>
    </div>

    <!-- Body -->
    <div class="p-5 overflow-x-auto bg-white dark:bg-gray-900 dark:text-slate-200 text-center">
      ${bodyContent}
    </div>

  </div>
</div>
    `.trim();
  }
}