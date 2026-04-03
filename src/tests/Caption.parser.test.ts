import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../Types";

describe('Caption Tests', () => {
    
    /*
    Test cases:
    1. Full right caption token
    2. Caption token witj emoji in title
    3. Caption token with extra whitespace
    4. Caption token with Windows-style line endings
    5. Caption token with missing fields
    6. Caption token with incorrect fields formatting

    
    * For each test case, we will check the type of the token and the values of the parameters.

    Error Handling must be defined but don't break other tests suites and AST Logic
    */
    // Test case for finding captions
    test('full right caption token', () => {
        
        const text = 
        "---\n" +
        "date: 2021-08-30\n" +
        "title: 'How to Write Text'\n" +
        "template: post\n" +
        "thumbnail: './thumbnails/writing.png'\n" +
        "slug: how-to-write-text\n" +
        "tags: instruction texter writer\n" +
        "cluster: how-to-write-text\n" +    
        "order: 0\n" +
        "---\n";

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST();
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        
        // testing Caption token about the params
        const captionNode = nodes.children.find(child => child.type === TokenType.CAPTION);

        // type Caption
        expect(captionNode?.type).toBe(TokenType.CAPTION);

        // tokens parameters
        expect(captionNode?.token.date).toEqual("2021-08-30");
        expect(captionNode?.token.title).toEqual("How to Write Text");
        expect(captionNode?.token.template).toEqual("post");
        expect(captionNode?.token.thumbnail).toEqual("./thumbnails/writing.png");
        expect(captionNode?.token.slug).toEqual("how-to-write-text");
        expect(captionNode?.token.tags).toEqual("instruction texter writer");
        expect(captionNode?.token.cluster).toEqual("how-to-write-text");
        expect(captionNode?.token.order).toEqual("0");
        
        });

    test('full caption token with emoji in title', () => {
        
        const text = 
        "---\n" +
        "date: 2021-08-30\n" +
        "title: 'How 🚀 to Write 🚀 Text'\n" +
        "template: post\n" +
        "thumbnail: './thumbnails/writing.png'\n" +
        "slug: how-to-write-text\n" +
        "tags: instruction texter writer\n" +
        "cluster: how-to-write-text\n" +    
        "order: 0\n" +
        "---\n";

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST();
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        
        // testing Caption token about the params
        const captionNode = nodes.children.find(child => child.type === TokenType.CAPTION);

        // type Caption
        expect(captionNode?.type).toBe(TokenType.CAPTION);

        // tokens parameters
        expect(captionNode?.token.date).toEqual("2021-08-30");
        expect(captionNode?.token.title).toEqual("How 🚀 to Write 🚀 Text");
        expect(captionNode?.token.template).toEqual("post");
        expect(captionNode?.token.thumbnail).toEqual("./thumbnails/writing.png");
        expect(captionNode?.token.slug).toEqual("how-to-write-text");
        expect(captionNode?.token.tags).toEqual("instruction texter writer");
        expect(captionNode?.token.cluster).toEqual("how-to-write-text");
        expect(captionNode?.token.order).toEqual("0");
        
    });

    test('caption with extra whitespace', () => {
        const text = 
            "---   \n" +
            "  date:   2021-08-30  \n" +
            "  title:  'Test Test'  \n" +
            "  template:  post  \n" +
            "  thumbnail:  '../images/thumb.png'  \n" +
            "  slug:  test-test  \n" +
            "  tags:  test test \n" +
            "  cluster:  main-test  \n" +
            "  order:  1  \n" +
            "---  \n";
    
        const tokenizer = new Tokenizer(text);
        const node = tokenizer.getAST().children[0];
        
        //console.log(node);

        expect(node.type).toBe(TokenType.CAPTION);
        expect(node.token.date).toBe("2021-08-30");
        expect(node.token.title).toBe("Test Test");
        expect(node.token.template).toBe("post");
        expect(node.token.thumbnail).toBe("../images/thumb.png");
        expect(node.token.slug).toBe("test-test");
        expect(node.token.tags).toBe("test test");
        expect(node.token.cluster).toBe("main-test");
        expect(node.token.order).toBe("1");
    });

    test('caption with Windows-style line endings', () => {
        const text = 
            "---\r\n" +
            "date: 2021-08-30\r\n" +
            "title: 'Test'\r\n" +
            "template: post\r\n" +
            "thumbnail: './thumb.png'\r\n" +
            "slug: test\r\n" +
            "tags: test\r\n" +
            "cluster: main\r\n" +
            "order: 1\r\n" +
            "---\r\n";
    
        const tokenizer = new Tokenizer(text);
        const node = tokenizer.getAST().children[0];
    
        expect(node.type).toBe(TokenType.CAPTION);
        expect(node.token.date).toBe("2021-08-30");
        expect(node.token.title).toBe("Test");
        expect(node.token.template).toBe("post");
        expect(node.token.thumbnail).toBe("./thumb.png");
        expect(node.token.slug).toBe("test");
        expect(node.token.tags).toBe("test");
        expect(node.token.cluster).toBe("main");
        expect(node.token.order).toBe("1");
    });
    
    /*
    * Test case for finding captions with missing fields
    * @Return parameters with missing fields
    */

    test('caption token with missing fields', () => {
        
        const text = 
            "---\n" +
            "date: 2021-08-30\n" +
            "title: 'How to Write Text'\n" +
            "template: post\n" +
            "thumbnail: './thumbnails/writing.png'\n" +                
            "tags: instruction texter writer\n" +
            "cluster: how-to-write-text\n" +                
            "---\n";

        const tokenizer = new Tokenizer(text);
        const ast = tokenizer.getAST();
                
        console.dir(ast.children[0]);
        expect(ast.children[0].token.order).toBe("Missing order");
        expect(ast.children[0].token.slug).toBe("Missing slug");
        
    });

    /**
     * Test case for finding incorrect fields
     * @Return UNMARKABLE_BLOCK with Error message about incorrect fields
     */

    test('caption token with incorrect fields formatting', () => {
        
        const text = 
            "---\n" +
            "date: 2021-0830\n" +
            "title: 'How to Write Text'\n" +
            "template: post\n" +
            "thumbnail: ./thumbnails/writing. png'\n" +
            "slug: how-to-write text-\n" +
            "tags: instruction texter writer\n" +
            "cluster: -how-to-write-text\n" +    
            "order: a\n" +
            "---\n";

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST();
    
        const captionNode = nodes.children[0];
        console.dir(captionNode);

        expect(captionNode.type).toBe(TokenType.CAPTION);
        expect(captionNode.token.date).toBe("Invalid date format");
        expect(captionNode.token.thumbnail).toBe("Invalid thumbnail format");
        expect(captionNode.token.slug).toBe("Invalid slug format");
        expect(captionNode.token.cluster).toBe("Invalid cluster format");
        expect(captionNode.token.order).toBe("Missing order");
        
    });


}); // End of describe block

