import { Tokenizer } from "../Tokenizer";
import { Parser } from "../Parser";
import { TokenType } from "../Types";

describe('Tokenizer class tests', () => {
    
    // Test case for finding captions
    test('find Caption', () => {
        
        const text = 
        "---\n" +
        "date: 2019-08-30\n" +
        "title: How to Write Text\n" +
        "template: post\n" +
        "thumbnail: ./thumbnails/writing.png\n" +
        "slug: how-to-write-text\n" +
        "categories: helping to write text\n" +
        "tags: instruction texter writer\n" +
        "---\n";

        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        // Add assertions based on your expectations
        expect(tokenizer.tokens.some(token => token.type === TokenType.CAPTION)).toBe(true);
  });

  // Test case for finding headings dept 1
    test('find Heading dept 1', () => {
            
            const text = 
            " # Heading 1\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.HEADING_FIRST)).toBe(true);
    });

    // Test case for finding headings dept 2
    test('find Heading dept 2', () => {
            
            const text = 
            " ## Heading 2\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.HEADING_SECOND)).toBe(true);
    });

    // Test case for finding headings dept 3
    test('find Heading dept 3', () => {
            
            const text = 
            " ### Heading 3\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.HEADING_THIRD)).toBe(true);
    });

    // Test case for finding headings dept 4
    test('find Heading dept 4', () => {
            
            const text = 
            " #### Heading 4\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.HEADING_FORTH)).toBe(true);
    });

    // Test case for finding headings dept 5
    test('find Heading dept 5', () => {
            
            const text = 
            " ##### Heading 5\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.HEADING_FIFTH)).toBe(true);
    });

    // Test case for finding quotes from begin of line
    test('find Quote from begin of line', () => {
            
            const text = 
            "> Quote\n"+
            "> <cite> - Author\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.QUOTE)).toBe(true);
    });

    // Test case for finding quotes from middle of line
    test('find Quote from middle of line', () => {
            
            const text = 
            "Text\n"+
            "   > Quote\n"+
            "     > <cite> - Author\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.QUOTE)).toBe(true);
    });

    // Test case for finding bold text
    test('find Bold text', () => {
            
            const text = 
            "Text and **bold** text\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.STRONG)).toBe(true);
    });

    // Test case for finding code in code block
    test('find CodeInCode block', () => {
            
            const text = 
            "```javascript\n"+
            "   ```bash"+
            "       npm install\n"+
            "   ```\n"+
            "```\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.CODE_BLOCK)).toBe(true);
    });

    // Test case for finding simple code block
    test('find simple Code block', () => {
            
            const text = 
            "```javascript\n"+
            "   console.log('Hello World!');\n"+
            "```\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.CODE_BLOCK)).toBe(true);
    });

    // Test case for finding links without # in url
    test('find Links without hash symbol', () => {
            
            const text = 
            "Text and [google link](https://www.google.com) text\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.LINK)).toBe(true);
            //test to equal token url and name
            const token : any = tokenizer.tokens.find(token => token.type === TokenType.LINK);            
            if(token){
                const name = token.name;
                const url = token.url;
                expect(url).toBe("https://www.google.com");
                expect(name).toBe("google link");
            }else{
                expect(token).not.toBeUndefined();
            }   
    });

    // Test case for finding links with # in url
    test('find Links with hash symbol', () => {
            
            const text = 
            "Text and [google link](https://www.google.com#test) text\n";
            
            const tokenizer = new Tokenizer(text);
            tokenizer.tokenize();
    
            // Add assertions based on your expectations
            expect(tokenizer.tokens.some(token => token.type === TokenType.LINK)).toBe(true);
            //test to equal token url and name
            const token : any = tokenizer.tokens.find(token => token.type === TokenType.LINK);            
            if(token){
                const name = token.name;
                const url = token.url;
                expect(url).toBe("https://www.google.com#test");
                expect(name).toBe("google link");
            }else{
                expect(token).not.toBeUndefined();
            }   
    });

    // Test case for finding lists with - attributes
    test('find List with - attributes', () => {
            
        const text = 
        "List:\n" +
        "- First item\n" +
        "- Second item\n" +
        "- Third item\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        // Add assertions based on your expectations
        expect(tokenizer.tokens.some(token => token.type === TokenType.LIST)).toBe(true);
    });

    // Test case for finding lists with [] attributes
    test('find List with [] attributes', () => {
            
        const text = 
        "List:\n" +
        "[] First item\n" +
        "[] Second item\n" +
        "[] Third item\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        // Add assertions based on your expectations
        expect(tokenizer.tokens.some(token => token.type === TokenType.LIST)).toBe(true);
    });

    // Test case for finding lists with [x] attributes
    test('find List with [x] attributes', () => {
            
        const text = 
        "List:\n" +
        "[x] First item\n" +
        "[x] Second item\n" +
        "[x] Third item\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        // Add assertions based on your expectations
        expect(tokenizer.tokens.some(token => token.type === TokenType.LIST)).toBe(true);
    });

    // Test case for finding images
    test('find Image', () => {
            
        const text = 
        "![image](https://www.google.com/image.png)\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        // Add assertions based on your expectations
        expect(tokenizer.tokens.some(token => token.type === TokenType.IMAGE)).toBe(true);
    });

    // Test case for finding under line text
    test('find Under line text', () => {
            
        const text = 
        "Text and _under line_ text\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        // Add assertions based on your expectations
        expect(tokenizer.tokens.some(token => token.type === TokenType.UNDER_LINE)).toBe(true);
    });

    // Test case for finding color text
    test('find Color text', () => {
            
        const text = 
        "Text and text.blue text\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        // Add assertions based on your expectations
        expect(tokenizer.tokens.some(token => token.type === TokenType.COLOR)).toBe(true);
    });

    // Test case for finding badge text
    test('find Badge text', () => {
            
        const text = 
        "Text and text|blue text\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        // Add assertions based on your expectations
        expect(tokenizer.tokens.some(token => token.type === TokenType.BADGE)).toBe(true);
    });

    // Test case for finding inline code
    test('find Inline code', () => {
            
        const text = 
        "Text and `inline code` text\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        // Add assertions based on your expectations
        expect(tokenizer.tokens.some(token => token.type === TokenType.CODE_INLINE)).toBe(true);
    });

    // Test case for finding table
    test('find Table', () => {
            
        const text = 
        "| First Header  | Second Header |\n"+
        "| ------------- | ------------- |\n"+
        "| Content Cell  | Content Cell  |\n"+
        "| Content Cell  | Content Cell  |\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        // Add assertions based on your expectations
        expect(tokenizer.tokens.some(token => token.type === TokenType.TABLE)).toBe(true);
    });

    // Test case for finding table with bold text in cells
    test('find Table with bold text in cells', () => {
            
        const text = 
        "| Symbol | Position | Bedeutung |\n"+
        "| **A** | Ankunftsprozess | Verteilung der Zwischenankunftszeiten |\n"+
        "| **B** | Bedienzeit | Verteilung der Bedienzeiten |\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        expect(tokenizer.tokens.some(token => token.type === TokenType.TABLE)).toBe(true);
        const tableToken: any = tokenizer.tokens.find(token => token.type === TokenType.TABLE);
        // table must carry tokensMap so TableHTML can resolve bold refs
        expect(tableToken.tokensMap).toBeDefined();
        // body rows must contain $token. refs (bold was pre-tokenized)
        expect(tableToken.children[1].value).toMatch(/\$token\./);
    });

    // Test case for finding table with inline formula in cells
    test('find Table with inline formula in cells', () => {
            
        const text = 
        "| Symbol | Bedeutung | $c^2$ |\n"+
        "| **D** | Deterministisch | $c^2 = 0$ |\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        expect(tokenizer.tokens.some(token => token.type === TokenType.TABLE)).toBe(true);
        const tableToken: any = tokenizer.tokens.find(token => token.type === TokenType.TABLE);
        expect(tableToken.tokensMap).toBeDefined();
        // header with formula must contain a token ref
        expect(tableToken.children[0].value).toMatch(/\$token\./);
    });

    // Diagnostic: verify resolveTokens works end-to-end
    test('table resolveTokens resolves bold and formula', () => {
        const text = 
        "| Symbol | Bedeutung | $c^2$ |\n"+
        "| **D** | Deterministisch | $c^2 = 0$ |\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        const tableToken: any = tokenizer.tokens.find(token => token.type === TokenType.TABLE);
        expect(tableToken).toBeDefined();
        expect(tableToken.tokensMap).toBeDefined();
        expect(tableToken.tokensMap.size).toBeGreaterThan(0);

        // Verify bold token exists in map
        const hasBold = Array.from(tableToken.tokensMap.values()).some((t: any) => t.type === 'Strong');
        const hasFormula = Array.from(tableToken.tokensMap.values()).some((t: any) => t.type === 'FormulaInline');
        
        expect(hasBold).toBe(true);
        expect(hasFormula).toBe(true);

        // Test resolveTokens simulation: find token refs in cell, look them up
        const headerRow = tableToken.children[0].value;
        const bodyRow = tableToken.children[1].value;
        const tokenRefRegex = /\$token\.([0-9a-f-]{36})/g;
        
        // Check header has formula token ref that resolves
        const headerRefs = headerRow.match(tokenRefRegex);
        expect(headerRefs).not.toBeNull();
        headerRefs!.forEach((ref: string) => {
            const resolved = tableToken.tokensMap.get(ref);
            console.log(`Header ref ${ref} -> type=${resolved?.type}, formula=${resolved?.formula}, value=${resolved?.value}`);
            expect(resolved).toBeDefined();
        });

        // Check body has both bold and formula refs
        const bodyRefs = bodyRow.match(tokenRefRegex);
        expect(bodyRefs).not.toBeNull();
        bodyRefs!.forEach((ref: string) => {
            const resolved = tableToken.tokensMap.get(ref);
            console.log(`Body ref ${ref} -> type=${resolved?.type}, formula=${resolved?.formula}, value=${resolved?.value}`);
            expect(resolved).toBeDefined();
        });
    });

    // End-to-end: Tokenizer → Parser → AST preserves table tokensMap
    test('Parser AST preserves table tokensMap with formula tokens', () => {
        const text = 
        "| Symbol | Bedeutung | $c^2$ |\n"+
        "| **D** | Deterministisch | $c^2 = 0$ |\n";
        
        const tokenizer = new Tokenizer(text);
        const parser = new Parser(tokenizer.tokens);
        
        const astTable: any = parser.ast.children?.find((c: any) => c.type === 'Table');
        expect(astTable).toBeDefined();
        expect(astTable.tokensMap).toBeDefined();
        
        // Verify formula tokens survive into AST
        const formulaTokens = Array.from(astTable.tokensMap.values()).filter((t: any) => t.type === 'FormulaInline');
        console.log('Formula tokens in AST:', formulaTokens.length);
        formulaTokens.forEach((ft: any) => console.log('  formula:', ft.formula));
        expect(formulaTokens.length).toBeGreaterThan(0);
        
        // Verify all token refs in children resolve
        astTable.children.forEach((child: any, i: number) => {
            const refs = child.value?.match(/\$token\.([0-9a-f-]{36})/g);
            if (refs) {
                refs.forEach((ref: string) => {
                    const resolved = astTable.tokensMap.get(ref);
                    console.log(`AST row[${i}] ref ${ref} -> ${resolved?.type}`);
                    expect(resolved).toBeDefined();
                });
            }
        });
    });

    //TODO: Test case 'fiind Unmarkable text' returns error and need to fix
    /*
    // Test case for finding unmarkable text
    test('find Unmarkable text', () => {
            
        const text = 
        " How to use: write caption block like the example below:\n"+
        "<br/>"+
        "\*\n"+    
        "---\n"+
        "date: 2019-08-30\n"+
        "title: How to Write Text\n"+
        "template: post\n"+
        "thumbnail: ./thumbnails/writing.png\n"+
        "slug: how-to-write-text\n"+
        "categories: helping to write text\n"+
        "tags: instruction texter writer\n"+
        "---\n"+
        "\*\n"+
        "<br/>\n"+
        "and write your text below the caption block. \n"+
        "You can use the following syntax to write your text.\n"+
        "<br/>\n";
        
        const tokenizer = new Tokenizer(text);
        tokenizer.tokenize();

        console.log(tokenizer.tokens);

        // Add assertions based on your expectations
        expect(tokenizer.tokens.some(token => token.type === TokenType.UNMARKABLE)).toBe(true);
    });
    */

});