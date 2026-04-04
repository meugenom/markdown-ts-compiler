'use strict'
import * as Token from "../Token";
import { codeToHtml } from 'shiki';

export class CodeBlockHTML {
  
    private token: Token.codeBlockToken;
    
    constructor(token: Token.codeBlockToken) {
        this.token = token; 
    }

    renderAsElement() : HTMLElement {
        const lang = this.token.language || 'text';
        let rawCode = this.token.code;

        // Remove newline at the start
        if (rawCode.startsWith('\n')) {
            rawCode = rawCode.slice(1);
        }

        const lines = rawCode.split('\n');
        if (lines[lines.length - 1] === '') lines.pop();        

        // 1. Main containers
        const OuterNode = document.createElement("div");
        OuterNode.className = "code-block-outer my-5";

        const WrapperNode = document.createElement("div");
        WrapperNode.className = "relative rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden font-mono z-10 bg-white dark:bg-[#1e293b]";

        // 2. Header
        const HeaderNode = document.createElement("div");
        HeaderNode.className = "flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700";
        HeaderNode.innerHTML = `
            <span class="text-[11px] font-mono font-bold uppercase tracking-widest opacity-50 text-slate-700 dark:text-slate-300">${lang}</span>
            <button class="code-copy-btn text-[11px] font-mono opacity-50 hover:opacity-100 transition-opacity text-slate-700 dark:text-slate-300" title="Copy code">
                copy
            </button>
        `;

        // 3. Body (Columns for line numbers and code)
        const BodyNode = document.createElement("div");
        BodyNode.className = "flex overflow-x-auto";

        // Line numbers column
        const LineNumsNode = document.createElement("div");
        LineNumsNode.className = "select-none text-right leading-6 pr-4 pl-3 py-4 text-[13px] text-slate-400 dark:text-slate-600 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex-shrink-0";
        LineNumsNode.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');

        // Code container (Shiki will insert its HTML here)
        const CodeContainer = document.createElement("div");
        CodeContainer.className = "flex-1 min-w-0"; 
        
        // While Shiki is loading, show raw text to avoid layout "jump"
        CodeContainer.innerHTML = `<pre class="leading-6 p-4 text-[13px]"><code>${rawCode}</code></pre>`;

        BodyNode.appendChild(LineNumsNode);
        BodyNode.appendChild(CodeContainer);

        WrapperNode.appendChild(HeaderNode);
        WrapperNode.appendChild(BodyNode);
        OuterNode.appendChild(WrapperNode);

        // 4. Shiki highlighting
        codeToHtml(rawCode, { 
            lang, 
            themes: { light: 'github-light', dark: 'min-dark' },           
        }).then(shikiHtml => {
            
            CodeContainer.innerHTML = shikiHtml;
            
            // Replace the entire content of the container with Shiki's result
            const shikiPre = CodeContainer.querySelector('pre');			
    		if (shikiPre) {
				
				// TODO: Hard Code
        		// remove all inline styles from Shiki's <pre> and <code> elements to allow Tailwind classes to work properly
        		// It kills the blue background in light theme, but we need it to be transparent for both themes
        		//shikiPre.removeAttribute('style');				
                shikiPre.style.backgroundColor = 'transparent';

        		// add new classes
        		// Add !bg-transparent, because Tailwind blocks background-color
        		shikiPre.className = "leading-6 p-4 text-[13px] overflow-x-auto !bg-transparent";				

        		// Clean nested <code>
        		const shikiCode = shikiPre.querySelector('code');
				
				// TODO: Hard Code
        		if (shikiCode) {
            		//shikiCode.removeAttribute('style');
                    shikiCode.style.backgroundColor = 'transparent';
            		shikiCode.className ="leading-6 text-[13px] !bg-transparent";
        		}
            }
        }).catch(err => {
            console.error('Shiki error:', err);
        });

        // 5. Copy logic
        const copyBtn = HeaderNode.querySelector('.code-copy-btn') as HTMLButtonElement;
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(lines.join('\n')).then(() => {
                    copyBtn.textContent = 'copied!';
                    setTimeout(() => { copyBtn.textContent = 'copy'; }, 2000);
                });
            });
        }
		
		//console.log(OuterNode);
		
        return OuterNode;
    }
}