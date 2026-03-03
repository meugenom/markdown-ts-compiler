'use strict'

import * as katex from 'katex';
import { DomUtilites } from './DomUtilites';

/**
 * Renders a block-level LaTeX formula using KaTeX
 */
export class FormulaHTML {

	private token: any;
	private htmlOutput: HTMLElement;
	private DomUtilites: any;

	constructor(token: any, htmlOutput: HTMLElement) {
		this.token = token;
		this.htmlOutput = htmlOutput;
		this.DomUtilites = new DomUtilites();
	}

	render(): void {
		const OuterNode = this.DomUtilites.createElement('div');
		OuterNode.className = 'code-block-outer my-5';

		const WrapperNode = this.DomUtilites.createElement('div');
		WrapperNode.className = 'rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden z-10';

		const HeaderNode = this.DomUtilites.createElement('div');
		HeaderNode.className = 'flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700';

		const LabelNode = this.DomUtilites.createElement('span');
		LabelNode.className = 'text-[11px] font-bold uppercase tracking-widest opacity-50';
		LabelNode.textContent = 'Formula';
		HeaderNode.appendChild(LabelNode);

		const BodyNode = this.DomUtilites.createElement('div');
		BodyNode.className = 'p-5 overflow-x-auto bg-white dark:bg-gray-900 dark:text-slate-200 text-center';

		try {
			BodyNode.innerHTML = katex.renderToString(this.token.formula, {
				displayMode: true,
				throwOnError: false
			});
		} catch (e) {
			BodyNode.textContent = this.token.formula;
		}

		WrapperNode.appendChild(HeaderNode);
		WrapperNode.appendChild(BodyNode);
		OuterNode.appendChild(WrapperNode);
		this.htmlOutput.appendChild(OuterNode);
	}
}
