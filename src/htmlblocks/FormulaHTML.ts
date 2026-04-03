"use strict";

import * as katex from "katex";

/**
 * Renders a block-level LaTeX formula using KaTeX
 */
export class FormulaHTML {
  private token: any;

  constructor(token: any) {
    this.token = token;
  }

  renderAsElement(): HTMLElement {
    const OuterNode = document.createElement("div");
    OuterNode.className = "code-block-outer my-5";

    const WrapperNode = document.createElement("div");
    WrapperNode.className =
      "rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden z-10";

    const HeaderNode = document.createElement("div");
    HeaderNode.className =
      "flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700";

    const LabelNode = document.createElement("span");
    LabelNode.className =
      "text-[11px] font-bold uppercase tracking-widest opacity-50";
    LabelNode.textContent = "Formula";
    HeaderNode.appendChild(LabelNode);

    const BodyNode = document.createElement("div");
    BodyNode.className =
      "p-5 overflow-x-auto bg-white dark:bg-gray-900 dark:text-slate-200 text-center";

    try {
      BodyNode.innerHTML = katex.renderToString(this.token.formula, {
        displayMode: true,
        throwOnError: false,
      });
    } catch (e) {
      BodyNode.textContent = this.token.formula;
    }

    WrapperNode.appendChild(HeaderNode);
    WrapperNode.appendChild(BodyNode);
    OuterNode.appendChild(WrapperNode);
    return OuterNode;
  }
}
