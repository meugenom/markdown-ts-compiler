import * as Token from "../Token";
export declare class CaptionHTML {
    private DomUtilites;
    private token;
    private htmlOutput;
    constructor(token: Token.captionToken, htmlOutput: HTMLElement);
    render(): void;
}
