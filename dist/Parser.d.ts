import * as Token from "./Token";
type AST = {
    type: string;
    children?: any[];
};
export declare class Parser {
    tokens: (Token.bagdeToken | Token.captionToken | Token.codeBlockToken | Token.codeInlineToken | Token.colorTextToken | Token.headToken | Token.imageToken | Token.linkToken | Token.listToken | Token.paragraphEndToken | Token.paragraphStartToken | Token.quoteToken | Token.strongTextToken | Token.textToken | Token.underLineToken | Token.unknownTextToken | Token.codeInCodeToken | Token.tableToken | Token.formulaBlockToken | Token.formulaInlineToken)[];
    ast: AST;
    constructor(tokens: any);
    init(): void;
}
export {};
