import * as Token from "../Token";
export declare class HeaderHTML {
    private DomUtilites;
    private token;
    private htmlOutput;
    constructor(token: Token.headToken, htmlOutput: HTMLElement);
    render(): void;
}
