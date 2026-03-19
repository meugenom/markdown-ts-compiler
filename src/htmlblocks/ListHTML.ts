import * as Token from "../Token";
import { TokenType } from "../Types";
import { DomUtilites } from "./DomUtilites";
import * as katex from 'katex';

export class ListHTML {
    private DomUtilites: DomUtilites;
    private token: Token.listToken;
    private htmlOutput: HTMLElement;

    constructor(token: Token.listToken, htmlOutput: HTMLElement) {
        this.token = token;
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites();
    }

    private resolveTokens(text: string): string {
        if (!this.token.tokensMap) return text;
        const tokenRegex = /\$token\.([0-9a-f-]{36})/g;
        return text.replace(tokenRegex, (match) => {
            const t = this.token.tokensMap!.get(match);
            if (!t) return match;
            if (t.type === TokenType.STRONG) {
                return `<strong>${t.value}</strong>`;
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
            if (t.type === TokenType.UNDER_LINE) {
                return `<u>${t.value}</u>`;
            }
            return match;
        });
    }

    private createListItem(item: string): string {
        if (!item) return '';
        const resolved = this.resolveTokens(item);
        if (item.includes("[]")) {
            return `<li class="list-none ml-5 flex items-start gap-2"><input class="form-check-input appearance-none flex-shrink-0 h-4 w-4 border-solid border-gray-200 border-2 rounded-sm disabled:bg-white disabled:border-blue-400 mt-1 bg-no-repeat bg-center bg-contain" type="checkbox" value="" id="flexCheckDisabled" disabled/><label class="form-check-label opacity-100" for="flexCheckDisabled">${resolved.replace("[]", "")}</label></li>`;
        } else if (item.includes("[x]")) {
            return `<li class="list-none ml-5 flex items-start gap-2"><input class="form-check-input appearance-none flex-shrink-0 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 mt-1 bg-no-repeat bg-center bg-contain" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled/><label class="form-check-label opacity-100" for="flexCheckCheckedDisabled">${resolved.replace("[x]", "")}</label></li>`;
        } else if (item.includes("-")) {
            const text = resolved.replace(/^\s*-\s*/, '');
            return `<li class="list-disc ml-5 font-mono text-sm leading-6">${text}</li>`;
        } else {
            return `<li class="list-disc ml-5 font-mono text-sm leading-6">${resolved}</li>`;
        }
    }

    render(): Element | void {
        const value = this.token.value;
        if (!value) return;

        let list = value.split("\n");
        let listBlockNode = this.DomUtilites.createElement("div");
        const title = list.shift();

        if (list && list.length > 0) {
            let listBlock = `<div class="mt-3">
                <p class="font-mono">${title}</p>
                <ul class="mt-1 ml-2 space-y-1">${list.map(item => this.createListItem(item)).join("")}</ul>
            </div>`;
            listBlockNode.innerHTML = listBlock;
        }

        const app = this.htmlOutput;
        app?.lastChild?.appendChild(listBlockNode);
    }
}