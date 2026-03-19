import * as Token from "../Token";
import "../static/styles/table.css";
export declare class TableHTML {
    private DomUtilites;
    private token;
    private htmlOutput;
    constructor(token: Token.tableToken, htmlOutput: HTMLElement);
    private resolveTokens;
    private createTableHead;
    private createTableBody;
    render(): void;
}
