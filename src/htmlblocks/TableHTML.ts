import * as Token from "../Token";
import { TokenType } from "../Types";
import { DomUtilites } from "./DomUtilites";
import * as katex from 'katex';
import "../static/styles/table.css";

export class TableHTML {
    private DomUtilites: DomUtilites;
    private token: Token.tableToken;
    private htmlOutput: HTMLElement;

    constructor(token: Token.tableToken, htmlOutput: HTMLElement) {
        this.token = token;		
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites();
    }

    private resolveTokens(text: string): string {
        const map = this.token.tokensMap;
        if (!map) return text;
        return text.replace(/\$token\.([0-9a-f-]{36})/g, (match) => {
            const t = map.get(match);
            if (!t) return match;
            if (t.type === TokenType.STRONG) {
                return `<strong>${t.value}</strong>`;
            }
            if (t.type === TokenType.UNDER_LINE) {
                return `<u>${t.value}</u>`;
            }
            if (t.type === TokenType.CODE_INLINE) {
                return `<code class="inline-block py-1 px-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium rounded">${t.value.substring(1, t.value.length - 1)}</code>`;
            }
            if (t.type === TokenType.FORMULA_INLINE) {
                try {
                    return katex.renderToString(t.formula, { displayMode: false, throwOnError: false });
                } catch (e) {
                    return `$${t.formula}$`;
                }
            }
            return match;
        });
    }

    private createTableHead(headArray: string[]): string {
        let cells = '';
        headArray.forEach(head => {
            cells += `<th class="px-4 py-2 text-left text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r last:border-r-0 border-gray-200 dark:border-gray-700">${this.resolveTokens(head.trim())}</th>`;
        });
        return `<thead class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"><tr>${cells}</tr></thead>`;
    }

    private createTableBody(bodyArray: string[]): string {
        let cells = '';
        bodyArray.forEach(body => {
            cells += `<td class="px-4 py-2 text-[13px] font-mono text-slate-700 dark:text-slate-300 border-r last:border-r-0 border-gray-100 dark:border-gray-700 selection:bg-blue-100 selection:text-blue-900">${this.resolveTokens(body.trim())}</td>`;
        });
        return `<tr class="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors duration-100">${cells}</tr>`;
    }

    render(): void {
        const children = this.token.children;
        let thead = '';
        let tbodyRows = '';

        for (let i = 0; i < children.length; i++) {
            let rowArray = children[i].value.split("|");
            rowArray.pop();
            rowArray.shift();

            if (i === 0) {
                thead = this.createTableHead(rowArray);
            } else if (children[i].value.replace(/[\|\-\:\s]/g, '').length > 0) {
                // skip separator rows (---|---|---)
                tbodyRows += this.createTableBody(rowArray);
            }
        }

        // Outer wrapper — drop shadows (same as code block)
        const OuterNode = this.DomUtilites.createElement("div");
        OuterNode.className = "code-block-outer my-5";

        // Inner wrapper
        const WrapperNode = this.DomUtilites.createElement("div");
        WrapperNode.className = "relative rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden font-mono z-10";

        // Header bar
        const HeaderNode = this.DomUtilites.createElement("div");
        HeaderNode.className = "flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700";
        HeaderNode.innerHTML = `<span class="text-[11px] font-mono font-bold uppercase tracking-widest opacity-50">Table</span>`;

        // Scrollable container for horizontal overflow on small screens
        const scrollContainer = this.DomUtilites.createElement("div");
        scrollContainer.className = "overflow-x-auto";

        // Table
        const tableNode = this.DomUtilites.createElement("table");
        tableNode.className = "w-full text-sm text-left";
        tableNode.innerHTML = `${thead}<tbody>${tbodyRows}</tbody>`;

        scrollContainer.appendChild(tableNode);
        WrapperNode.appendChild(HeaderNode);
        WrapperNode.appendChild(scrollContainer);
        OuterNode.appendChild(WrapperNode);

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