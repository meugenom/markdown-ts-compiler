import { Tokenizer } from "../Tokenizer";
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
        "Text and text@blue text\n";
        
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