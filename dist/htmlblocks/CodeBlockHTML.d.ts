import * as Token from "../Token";
import "../static/styles/prism.css";
export declare class CodeBlockHTML {
    private DomUtilites;
    private token;
    private htmlOutput;
    constructor(token: Token.codeBlockToken, htmlOutput: HTMLElement);
    render(): void;
}
