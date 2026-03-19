'use strict'
/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as code block
 */


import * as Token from "../Token";
import { DomUtilites } from "./DomUtilites";
import "../static/styles/prism.css"

// import prismjs
import * as Prism from 'prismjs';



export class CodeBlockHTML {
  
	private DomUtilites : any;
	private token: Token.codeBlockToken;
	private htmlOutput: HTMLElement;
	
	constructor(token: Token.codeBlockToken, htmlOutput: HTMLElement) {
		this.token = token;
		this.htmlOutput = htmlOutput;
		this.DomUtilites = new DomUtilites();
	}

  render () : void {

		const lang = this.token.language || 'code';
		const rawCode = this.token.code;

		// Split into lines for line numbers
		const lines = rawCode.trim().split('\n');
		// Remove trailing empty line if present
		if (lines[lines.length - 1].trim() === '') lines.pop();

		// Outer wrapper
		const OuterNode = this.DomUtilites.createElement("div");
		OuterNode.className = "code-block-outer my-5";

		// Wrapper — overflow-hidden to clip header rounded-t corners, body shadow is outside via BodyShadowNode
		const WrapperNode = this.DomUtilites.createElement("div");
		WrapperNode.className = "relative rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden font-mono z-10";

		// Header bar: rounded corners handled by WrapperNode overflow-hidden
		const HeaderNode = this.DomUtilites.createElement("div");
		HeaderNode.className = "flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700";
		HeaderNode.innerHTML = `
			<span class="text-[11px] font-mono font-bold uppercase tracking-widest opacity-50">${lang}</span>
			<button class="code-copy-btn text-[11px] font-mono opacity-50 hover:opacity-100 transition-opacity" title="Copy code">
				copy
			</button>
		`;

		// Line numbers column
		const LineNumsNode = this.DomUtilites.createElement("div");
		LineNumsNode.className = "select-none text-right pr-4 pl-3 py-4 text-[13px] leading-6 text-slate-400 dark:text-slate-600 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex-shrink-0";
		LineNumsNode.innerHTML = lines.map((_: string, i: number) => `<div>${i + 1}</div>`).join('');

		// Pre + code
		const PreNode = this.DomUtilites.createElement("pre");
		PreNode.className = `language-${lang} flex-1 overflow-x-auto m-0 rounded-none py-4 px-4 text-[13px] leading-6`;

		const CodeNode = this.DomUtilites.createElement("code");
		CodeNode.className = `language-${lang}`;
		CodeNode.textContent = lines.join('\n');

		PreNode.appendChild(CodeNode);

		// Code body: line numbers + code side by side
		const BodyNode = this.DomUtilites.createElement("div");
		BodyNode.className = "flex overflow-x-auto";

		BodyNode.appendChild(LineNumsNode);
		BodyNode.appendChild(PreNode);

		WrapperNode.appendChild(HeaderNode);
		WrapperNode.appendChild(BodyNode);
		OuterNode.appendChild(WrapperNode);

		// Highlight after building DOM
		Prism.highlightElement(CodeNode);

		// Copy button handler
		const copyBtn = HeaderNode.querySelector('.code-copy-btn') as HTMLButtonElement;
		if (copyBtn) {
			copyBtn.addEventListener('click', () => {
				navigator.clipboard.writeText(lines.join('\n')).then(() => {
					copyBtn.textContent = 'copied!';
					setTimeout(() => { copyBtn.textContent = 'copy'; }, 2000);
				});
			});
		}

		const app = this.htmlOutput;
		const elemChildren = app?.children;
		if (elemChildren) {
			if (elemChildren.length > 0) {
				app?.lastChild?.appendChild(OuterNode);
			} else {
				app.appendChild(OuterNode);
			}
		}
  }
}