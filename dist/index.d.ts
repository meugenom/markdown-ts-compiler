import "./static/styles/style.css";
import 'katex/dist/katex.min.css';
declare function convertMDtoHTML(text: any): any;
declare function convertMDtoAST(text: string): {
    type: string;
    children?: any[];
};
declare function convertMDtoTokens(text: string): (import("./Token").bagdeToken | import("./Token").captionToken | import("./Token").codeBlockToken | import("./Token").codeInlineToken | import("./Token").colorTextToken | import("./Token").headToken | import("./Token").imageToken | import("./Token").linkToken | import("./Token").listToken | import("./Token").paragraphEndToken | import("./Token").paragraphStartToken | import("./Token").quoteToken | import("./Token").strongTextToken | import("./Token").textToken | import("./Token").underLineToken | import("./Token").unknownTextToken | import("./Token").codeInCodeToken | import("./Token").unmarkableToken | import("./Token").tableToken | import("./Token").formulaBlockToken | import("./Token").formulaInlineToken)[];
declare const _default: {
    convertMDtoHTML: typeof convertMDtoHTML;
    convertMDtoAST: typeof convertMDtoAST;
    convertMDtoTokens: typeof convertMDtoTokens;
};
export default _default;
