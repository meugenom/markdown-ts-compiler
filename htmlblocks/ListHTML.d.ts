import * as Token from "../Token";
export declare class ListHTML {
    private DomUtilites;
    private token;
    private htmlOutput;
    constructor(token: Token.listToken, htmlOutput: HTMLElement);
    private createListItem;
    render(): Element | void;
}
