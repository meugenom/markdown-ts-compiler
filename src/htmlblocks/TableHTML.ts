import * as Token from "../Token";
import { DomUtilites } from "./DomUtilites";

export class TableHTML {
    private DomUtilites: DomUtilites;
    private token: Token.tableToken;
    private htmlOutput: HTMLElement;

    constructor(token: Token.tableToken, htmlOutput: HTMLElement) {
        this.token = token;		
        this.htmlOutput = htmlOutput;
        this.DomUtilites = new DomUtilites();
    }

    private createTableHead(headArray: string[]): string {
        let tableHead = "<thead><tr>";
        headArray.forEach(head => {
            tableHead += `<th class="bg-blue-100 border text-left px-8 py-4">${head}</th>`;
        });
        return tableHead + '</tr></thead>';
    }

    private createTableBody(bodyArray: string[]): string {
        let tableBody = "<tr>";
        bodyArray.forEach(body => {
            tableBody += `<td class="border px-8 py-4">${body}</td>`;
        });
        return tableBody + '</tr>';
    }

    render(): void {
        const children = this.token.children;
        let table = '';
        let tableNode = this.DomUtilites.createElement("table");
        tableNode.className = "shadow-lg bg-white mb-4";

        for (let i = 0; i < children.length; i++) {
            let rowArray = children[i].value.split("|");
            rowArray.pop();
            rowArray.shift();

            if (i == 0) {
                table += this.createTableHead(rowArray);
            } else {
                table += this.createTableBody(rowArray);
            }
        }

        tableNode.innerHTML = `<tbody>${table}</tbody>`;

        const paragraphNode = this.DomUtilites.createElement("p");
        paragraphNode.appendChild(tableNode);

        const app = this.htmlOutput;
        app?.lastChild?.appendChild(paragraphNode);
    }
}