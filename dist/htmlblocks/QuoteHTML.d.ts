import * as Token from "../Token";
import "../static/styles/quote.css";
export declare class QuoteHTML {
    private DomUtilites;
    private token;
    private htmlOutput;
    constructor(token: Token.quoteToken, htmlOutput: HTMLElement);
    render(): void;
}
