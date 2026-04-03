import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../Types";

describe('Heading Tests', () => {
    
    /*
    Test cases:
    1. Full right heading token
    2. Heading token with incorrect formatting
    3. Heading token with inline formula
    4. Heading token with inline code 
    5. Heading token with bold word
    6. Heading token with bold text
    7. Heading token with underline word
    8. Heading token with underline text
    */
    
    // Test case for finding headings
    test('full right heading token', () => {
        
        const text = 
        "# Heading 1\n" +
        "## Heading 2\n" +
        "### Heading 3\n" +
        "#### Heading 4\n" +
        "##### Heading 5\n";

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST();
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        
        const headingFirst = nodes.children.find(child => child.type === TokenType.HEADING_FIRST);        
        // Heading #
        expect(headingFirst?.type).toBe(TokenType.HEADING_FIRST);
        expect(headingFirst?.token.value).toEqual("Heading 1");

        const headingSecond = nodes.children.find(child => child.type === TokenType.HEADING_SECOND);        
        // Heading ##
        expect(headingSecond?.type).toBe(TokenType.HEADING_SECOND);
        expect(headingSecond?.token.value).toEqual("Heading 2");

        const headingThird = nodes.children.find(child => child.type === TokenType.HEADING_THIRD);
        // Heading ###
        expect(headingThird?.type).toBe(TokenType.HEADING_THIRD);
        expect(headingThird?.token.value).toEqual("Heading 3");

        const headingFourth = nodes.children.find(child => child.type === TokenType.HEADING_FOURTH);
        // Heading ####
        expect(headingFourth?.type).toBe(TokenType.HEADING_FOURTH);
        expect(headingFourth?.token.value).toEqual("Heading 4");

        const headingFifth = nodes.children.find(child => child.type === TokenType.HEADING_FIFTH);
        // Heading #####
        expect(headingFifth?.type).toBe(TokenType.HEADING_FIFTH);
        expect(headingFifth?.token.value).toEqual("Heading 5");

        }, 0);

    // Test other text in the heading
    test('heading with extra symbols', () => {
        
        const text = "#### 2. Zweiter Schritt - [[AST-Node-Verarbeitung:green]]\n";

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST();
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        console.log("AST Nodes:", nodes.children[0].children);
                
        expect(nodes.children[0].children[0].token.type).toBe(TokenType.TEXT);
        expect(nodes.children[0].children[0].raw).toBe("2. Zweiter Schritt - ");
        expect(nodes.children[0].children[1].token.type).toBe(TokenType.COLOR);
        expect(nodes.children[0].children[1].raw).toBe("[[AST-Node-Verarbeitung:green]]");
        expect(nodes.children[0].children[1].token.value).toBe("AST-Node-Verarbeitung");
        expect(nodes.children[0].children[1].token.color).toBe("green");  
        
        }, 0);

    // Test case incorrect heading formatting
    test('incorrect heading formatting', () => {
        
        const text = "## ## # Heading 4 #\n";

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST();
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        console.log("AST Nodes:", nodes.children[0].children);
                
        expect(nodes.children[0].token.value).toBe("## # Heading 4 #");
        expect(nodes.children[0].children[0].type).toBe(TokenType.TEXT);
        expect(nodes.children[0].children[0].raw).toBe("## # Heading 4 #");
        
        }, 0);

    // Test case inline formula    
    test('formula inline', () => {
        
        const text = "## $a^2 + b^2 = c^2$\n";

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST().children[0].children[0];
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        //console.log("AST Nodes:", nodes.children[0].children[0]);
                
        expect(nodes.type).toBe(TokenType.FORMULA_INLINE);
        expect(nodes.raw).toBe("$a^2 + b^2 = c^2$");
        expect(nodes.token.type).toBe(TokenType.FORMULA_INLINE);
        expect(nodes.token.formula).toBe("a^2 + b^2 = c^2");

    }, 0);

    // Test case CODE INLINE
    test('inline code', () => {
        
        const text = "## `const a = 10;`\n";

        const tokenizer = new Tokenizer(text);
        const node = tokenizer.getAST().children[0].children[0];
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        console.log("AST Nodes:", node);

        expect(node.type).toBe(TokenType.CODE_INLINE);
        expect(node.raw).toBe("`const a = 10;`");
        expect(node.token.type).toBe(TokenType.CODE_INLINE);
        expect(node.token.value).toBe("const a = 10;");

    }, 0);

    // Test Case BOLD WORD as **bold**
    test('bold', () => {
        
        const text = "## **Bold**\n";

        const tokenizer = new Tokenizer(text);
        const node = tokenizer.getAST().children[0].children[0];
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        //console.log("AST Nodes:", node);

        expect(node.type).toBe(TokenType.STRONG);
        expect(node.raw).toBe("Bold");
        expect(node.token.type).toBe(TokenType.STRONG);
        expect(node.token.value).toBe("Bold");

    }, 0);
    
    
    // Test Case BOLD TEXT as **bold text**
    test('bold text', () => {
        
        const text = "## **Bold Text**\n";

        const tokenizer = new Tokenizer(text);
        const node = tokenizer.getAST().children[0].children[0];
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        console.log("AST Nodes:", node);

        expect(node.type).toBe(TokenType.STRONG);
        expect(node.raw).toBe("Bold Text");
        expect(node.token.type).toBe(TokenType.STRONG);
        expect(node.token.value).toBe("Bold Text");

    }, 0);

    // Test Case UNDER_LINE WORD
    test('underline', () => {
        
        const text = "## _Underline_\n";

        const tokenizer = new Tokenizer(text);
        const node = tokenizer.getAST().children[0].children[0];
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        //console.log("AST Nodes:", node);

        expect(node.type).toBe(TokenType.UNDER_LINE);
        expect(node.raw).toBe("Underline");
        expect(node.token.type).toBe(TokenType.UNDER_LINE);
        expect(node.token.value).toBe("Underline");

    }, 0);

    // Test Case UNDER_LINE TEXT
    test('underline text', () => {
        
        const text = "## _Under test line_\n";

        const tokenizer = new Tokenizer(text);
        const node = tokenizer.getAST().children[0].children[0];
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        console.log("AST Nodes:", node);

        expect(node.type).toBe(TokenType.UNDER_LINE);
        expect(node.raw).toBe("Under test line");
        expect(node.token.type).toBe(TokenType.UNDER_LINE);
        expect(node.token.value).toBe("Under test line");

    }, 0);


});
    