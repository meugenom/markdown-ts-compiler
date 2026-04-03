import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../Types";

describe('Paragraph separation tests', () => {

    /*
    1. Black line creates two separate paragraphs
    2. Single newline creates separate paragraphs
    3. Three paragraphs with blank lines
    */

    test('blank line creates two separate paragraphs', () => {
        
        const text = 'Paragraph one.\n\nParagraph two.\n';
        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST().children;
        
        //console.log('Nodes:', JSON.stringify(nodes.map((n:any) => ({type: n.type, value: n.token?.value}))));
        
        const paragraphs = nodes.filter((n: any) => n.type === TokenType.PARAGRAPH);
        expect(paragraphs).toHaveLength(2);
    });

    test('single newline creates separate paragraphs', () => {
        
        const text = 'Line one.\nLine two.\n';
        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST().children;
        //console.log('Nodes:', JSON.stringify(nodes.map((n:any) => ({type: n.type, value: n.token?.value}))));
        
        const paragraphs = nodes.filter((n: any) => n.type === TokenType.PARAGRAPH);
        expect(paragraphs).toHaveLength(2);
    });

    test('three paragraphs with blank lines', () => {
        
        const text = 'First.\n\nSecond.\n\nThird.\n';
        const tokenizer = new Tokenizer(text);        
        const nodes = tokenizer.getAST().children;
        
        //console.log('Nodes:', JSON.stringify(nodes.map((n:any) => ({type: n.type, value: n.token?.value}))));
        
        const paragraphs = nodes.filter((n: any) => n.type === TokenType.PARAGRAPH);
        expect(paragraphs).toHaveLength(3);
    });
});
