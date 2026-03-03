import * as Token from "../Token";
import { DomUtilites } from "./DomUtilites";

export class ListHTML {
    private DomUtilites: DomUtilites;
    private token: Token.listToken;
    private htmlOutput: HTMLElement;

    constructor(token: Token.listToken, htmlOutput: HTMLElement) {
        this.token = token;
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites();
    }

    private createListItem(item: string): string {
        if (!item) return '';
        if (item.includes("[]")) {
            return `<li class="clearfix list-none ml-5">
                    
                    <input class="form-check-input appearance-none h-4 w-4 border-solid border-gray-200 border-solid border-2 rounded-sm disabled:bg-white disabled:border-blue-400 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2" type="checkbox" value="" id="flexCheckDisabled" disabled/>					
                    <label class="form-check-label inline-block opacity-100" for="flexCheckDisabled">${item.replace("[]", "")}</label>
                    
            </li>`;
        } else if (item.includes("[x]")) {
            return `<li class="list-none ml-5">                
                <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-400 checked:border-blue-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled/>
                <label class="form-check-label inline-block opacity-100" for="flexCheckCheckedDisabled">${item.replace("[x]", "")}</label>
            </li>`;
        } else if (item.includes("-")) {
            return `<li class="list-none ml-5">${item}</li>`;
        } else {
            return `<li class="list-none ml-5">${item}</li>`;
        }
    }

    render(): Element | void {
        const value = this.token.value;
        if (!value) return;

        let list = value.split("\n");
        let listBlockNode = this.DomUtilites.createElement("div");
        const title = list.shift();

        if (list && list.length > 0) {
            let listBlock = `<div class="mt-2">
                <p>${title}</p>
                <div class="form-check">${list.map(this.createListItem).join("")}</div>
            </div>`;
            listBlockNode.innerHTML = listBlock;
        }

        const app = this.htmlOutput;
        app?.lastChild?.appendChild(listBlockNode);
    }
}