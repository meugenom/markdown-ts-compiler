type AST = {
    type: string;
    children?: any[];
};
export declare class View {
    private ast;
    htmlOutput: HTMLElement | null;
    constructor(ast: AST, htmlOutput: HTMLElement | null);
    init(): HTMLElement | null;
}
export {};
