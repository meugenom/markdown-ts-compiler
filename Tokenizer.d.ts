import * as Token from "./Token";
export declare class Tokenizer {
    tokens: (Token.bagdeToken | Token.captionToken | Token.codeBlockToken | Token.codeInlineToken | Token.colorTextToken | Token.headToken | Token.imageToken | Token.linkToken | Token.listToken | Token.paragraphEndToken | Token.paragraphStartToken | Token.quoteToken | Token.strongTextToken | Token.textToken | Token.underLineToken | Token.unknownTextToken | Token.codeInCodeToken | Token.unmarkableToken | Token.tableToken | Token.formulaBlockToken | Token.formulaInlineToken)[];
    text: string;
    private tokensMap;
    constructor(text: string);
    tokenize(): void;
    private findCaption;
    private findUnmarkable;
    private findCodeInCode;
    private findFormulaBlock;
    private findFormulaInline;
    private findCodeBlock;
    findHeadings(): void;
    findQuotes(): void;
    findStrong(): void;
    findLinks(): void;
    findImages(): void;
    findUnderlines(): void;
    findColors(): void;
    findBadges(): void;
    findLists(): void;
    findTables(): void;
    init: () => void;
}
