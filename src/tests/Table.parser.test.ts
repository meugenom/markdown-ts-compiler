import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../Types";

describe('Table Tests', () => {
    
    /*
    Test cases:
    1. Full clear table with all  parameters 5x5
    2. Small Table 2x2
    3. Table 2x2 with emoji in head and body
    4. Table 2x2 with extra whitespace
    5. Table 2x2 with Windows-style line endings
    6. Table 2x2 with missing body fields        
    7. Table 2x2 with missing head fields        
    8. Separator line with incorrect formatting

    
    * For each test case, we will check the type of the token and the values of the parameters.

    Error Handling must be defined but don't break other tests suites and AST Logic
    */
    // Test case for finding tables
    test('full clear table token', () => {
        
        const text = 
        '| Name | **Age** | $a^2 + b^2 = c^2$ | [[Town:yellow]] | $a^2 + b^2 = c^2$ |\n' +
        '|---|---|---|---|---|\n' +
        '| Bob | 17 | BMW | Baku | Fish |\n' +
        '| John | _52_ | **Fiat** | $a^2 + b^2 = c^2$ | Dog |\n' +
        '| **Lisa** | 32 | _Toyota_ | Frankfurt | [[Snake:pink]] |\n' +
        '| Eugen | _45_ | Mazda | **Dresden** | $a^2 + b^2 = c^2$ |';

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST();
        //Waitng the Elements DOM to be created and the tokens to be generated
        
        
        // testing Table token about the params
        const tableNode = nodes.children.find(child => child.type === TokenType.TABLE);
        const head = tableNode?.children[0];        

        console.log(tableNode);
        // the first child is the table head row and other children are body rows
        expect(head?.type).toBe(TokenType.TABLE_HEAD_ROW);
        expect(tableNode?.children[1].type).toBe(TokenType.TABLE_BODY_ROW);
        expect(tableNode?.children[2].type).toBe(TokenType.TABLE_BODY_ROW);
        expect(tableNode?.children[3].type).toBe(TokenType.TABLE_BODY_ROW);
        expect(tableNode?.children[4].type).toBe(TokenType.TABLE_BODY_ROW);
        
        // testing children in the head row        
        //console.log(head);
        const headCells = head?.children;
        expect(headCells?.[0].children[0].type).toBe(TokenType.TEXT);
        expect(headCells?.[0].children[0].token.value).toBe("Name");
        expect(headCells?.[1].children[0].type).toBe(TokenType.STRONG);
        expect(headCells?.[1].children[0].token.value).toBe("Age");
        expect(headCells?.[2].children[0].type).toBe(TokenType.FORMULA_INLINE);
        expect(headCells?.[2].children[0].token.formula).toBe("a^2 + b^2 = c^2");        
        expect(headCells?.[3].children[0].token).toEqual({ value: "Town", color: "yellow", type: TokenType.COLOR });
        expect(headCells?.[4].children[0].type).toBe(TokenType.FORMULA_INLINE);
        expect(headCells?.[4].children[0].token.formula).toBe("a^2 + b^2 = c^2");
        
        // testing children in the body rows
        const body_Row1_Cells = tableNode?.children[1].children;
        expect(body_Row1_Cells?.[0].children[0].type).toBe(TokenType.TEXT);
        expect(body_Row1_Cells?.[0].children[0].token.value).toBe("Bob");
        expect(body_Row1_Cells?.[1].children[0].type).toBe(TokenType.TEXT);
        expect(body_Row1_Cells?.[1].children[0].token.value).toBe("17");
        expect(body_Row1_Cells?.[2].children[0].type).toBe(TokenType.TEXT);
        expect(body_Row1_Cells?.[2].children[0].token.value).toBe("BMW");
        expect(body_Row1_Cells?.[3].children[0].type).toBe(TokenType.TEXT);
        expect(body_Row1_Cells?.[3].children[0].token.value).toBe("Baku");
        expect(body_Row1_Cells?.[4].children[0].type).toBe(TokenType.TEXT);
        expect(body_Row1_Cells?.[4].children[0].token.value).toBe("Fish");
        

        const body_Row4_Cells = tableNode?.children[4].children;
        expect(body_Row4_Cells?.[0].children[0].type).toBe(TokenType.TEXT);
        expect(body_Row4_Cells?.[0].children[0].token.value).toBe("Eugen");
        expect(body_Row4_Cells?.[1].children[0].type).toBe(TokenType.UNDER_LINE);
        expect(body_Row4_Cells?.[1].children[0].token.value).toBe("45");
        expect(body_Row4_Cells?.[2].children[0].type).toBe(TokenType.TEXT);
        expect(body_Row4_Cells?.[2].children[0].token.value).toBe("Mazda");
        expect(body_Row4_Cells?.[3].children[0].type).toBe(TokenType.STRONG);
        expect(body_Row4_Cells?.[3].children[0].token.value).toBe("Dresden");
        expect(body_Row4_Cells?.[4].children[0].type).toBe(TokenType.FORMULA_INLINE);
        expect(body_Row4_Cells?.[4].children[0].token.formula).toBe("a^2 + b^2 = c^2");

        });

        test('small table 2x2', () => {
            const text =
            '| **Name** | _Age_ |\n' +
            '|---|---|\n' +
            '| Bob | `17` |';

            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();
            const tableNode = nodes.children.find(child => child.type === TokenType.TABLE);
            const head = tableNode?.children[0];
            
            expect(head?.type).toBe(TokenType.TABLE_HEAD_ROW);
            expect(tableNode?.children[1].type).toBe(TokenType.TABLE_BODY_ROW);
            
            const headCells = head?.children;
            expect(headCells?.[0].children[0].type).toBe(TokenType.STRONG);
            expect(headCells?.[0].children[0].token.value).toBe("Name");
            expect(headCells?.[1].children[0].type).toBe(TokenType.UNDER_LINE);
            expect(headCells?.[1].children[0].token.value).toBe("Age");

            const body_Row1_Cells = tableNode?.children[1].children;
            expect(body_Row1_Cells?.[0].children[0].type).toBe(TokenType.TEXT);
            expect(body_Row1_Cells?.[0].children[0].token.value).toBe("Bob");
            expect(body_Row1_Cells?.[1].children[0].type).toBe(TokenType.CODE_INLINE);
            expect(body_Row1_Cells?.[1].children[0].token.value).toBe("17");

        });

        //Table 2x2 with emoji in head and body
        test('table with emoji in head and body', () => {
            const text =
            '| **Name** 🚀 | Age 🚀 |\n' +
            '|---|---|\n' +
            '| Bob 🚀 | `17` |';
            
            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();

            const tableNode = nodes.children.find(child => child.type === TokenType.TABLE);
            const head = tableNode?.children[0];

            expect(head?.type).toBe(TokenType.TABLE_HEAD_ROW);
            expect(tableNode?.children[1].type).toBe(TokenType.TABLE_BODY_ROW);

            const headCells = head?.children;
            expect(headCells?.[0].children[0].type).toBe(TokenType.STRONG);
            expect(headCells?.[0].children[0].token.value).toBe("Name");
            expect(headCells?.[0].children[1].type).toBe(TokenType.TEXT);
            expect(headCells?.[0].children[1].token.value).toBe(" 🚀");
            expect(headCells?.[1].children[0].type).toBe(TokenType.TEXT);
            expect(headCells?.[1].children[0].token.value).toBe("Age 🚀");            

            const body_Row1_Cells = tableNode?.children[1].children;
            expect(body_Row1_Cells?.[0].children[0].type).toBe(TokenType.TEXT);
            expect(body_Row1_Cells?.[0].children[0].token.value).toBe("Bob 🚀");            
            expect(body_Row1_Cells?.[1].children[0].type).toBe(TokenType.CODE_INLINE);
            expect(body_Row1_Cells?.[1].children[0].token.value).toBe("17");
            
        });

        // Table 2x2 with extra whitespace
        test('table with extra whitespace', () => {
            const text =
            '|   **Name**   |   Age   |\n' +
            '|---|---|\n' +
            '|   Bob   |   `17`   |';

            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();

            const tableNode = nodes.children.find(child => child.type === TokenType.TABLE);
            const head = tableNode?.children[0];

            expect(head?.type).toBe(TokenType.TABLE_HEAD_ROW);
            expect(tableNode?.children[1].type).toBe(TokenType.TABLE_BODY_ROW);
            
            const headCells = head?.children;
            expect(headCells?.[0].children[0].type).toBe(TokenType.STRONG);
            expect(headCells?.[0].children[0].token.value).toBe("Name");
            expect(headCells?.[1].children[0].type).toBe(TokenType.TEXT);
            expect(headCells?.[1].children[0].token.value).toBe("Age");
        
            const body_Row1_Cells = tableNode?.children[1].children;
            expect(body_Row1_Cells?.[0].children[0].type).toBe(TokenType.TEXT);
            expect(body_Row1_Cells?.[0].children[0].token.value).toBe("Bob");
            expect(body_Row1_Cells?.[1].children[0].type).toBe(TokenType.CODE_INLINE);
            expect(body_Row1_Cells?.[1].children[0].token.value).toBe("17");
            
        });

        // Table 2x2 with Windows-style line endings
        test('table with Windows-style line endings', () => {
            const text =
            '| **Name** | Age |\r\n' +
            '|---|---|\r\n' +
            '| Bob | `17` |\r\n';
            
            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();
            const tableNode = nodes.children.find(child => child.type === TokenType.TABLE);
            const head = tableNode?.children[0];
            
            expect(head?.type).toBe(TokenType.TABLE_HEAD_ROW);
            expect(tableNode?.children[1].type).toBe(TokenType.TABLE_BODY_ROW);
            //console.log(tableNode);
            
            const headCells = head?.children;
            expect(headCells?.[0].children[0].type).toBe(TokenType.STRONG);
            expect(headCells?.[0].children[0].token.value).toBe("Name");
            expect(headCells?.[1].children[0].type).toBe(TokenType.TEXT);
            expect(headCells?.[1].children[0].token.value).toBe("Age");
            
            const body_Row1_Cells = tableNode?.children[1].children;
            expect(body_Row1_Cells?.[0].children[0].type).toBe(TokenType.TEXT);
            expect(body_Row1_Cells?.[0].children[0].token.value).toBe("Bob");
            expect(body_Row1_Cells?.[1].children[0].type).toBe(TokenType.CODE_INLINE);
            expect(body_Row1_Cells?.[1].children[0].token.value).toBe("17");
                        

        });

        // Table 2x2 with missing body fields
        test('table with missing body fields', () => {
            const text =
            '| **Name** | Age |\n' +
            '|---|---|\n' +
            '| Bob |';

            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();
            const tableNode = nodes.children.find(child => child.type === TokenType.TABLE);
            const head = tableNode?.children[0];

            expect(head?.type).toBe(TokenType.TABLE_HEAD_ROW);
            expect(tableNode?.children[1].type).toBe(TokenType.TABLE_BODY_ROW);

            const headCells = head?.children;
            expect(headCells?.[0].children[0].type).toBe(TokenType.STRONG);
            expect(headCells?.[0].children[0].token.value).toBe("Name");
            expect(headCells?.[1].children[0].type).toBe(TokenType.TEXT);
            expect(headCells?.[1].children[0].token.value).toBe("Age");

            const body_Row1_Cells = tableNode?.children[1].children;
            expect(body_Row1_Cells?.[0].children[0].type).toBe(TokenType.TEXT);
            expect(body_Row1_Cells?.[0].children[0].token.value).toBe("Bob");


            
        });   


        // Table 2x2 with missing head fields        
        test('table with missing head fields', () => {
            const text =
            '| **Name** |\n' +
            '|---|\n' +
            '| Bob | `17` |';
            
            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();
            const tableNode = nodes.children.find(child => child.type === TokenType.TABLE);
            const head = tableNode?.children[0];

            expect(head?.type).toBe(TokenType.TABLE_HEAD_ROW);
            expect(tableNode?.children[1].type).toBe(TokenType.TABLE_BODY_ROW);

            const headCells = head?.children;
            expect(headCells?.[0].children[0].type).toBe(TokenType.STRONG);
            expect(headCells?.[0].children[0].token.value).toBe("Name");
            
            const body_Row1_Cells = tableNode?.children[1].children;
            expect(body_Row1_Cells?.[0].children[0].type).toBe(TokenType.TEXT);
            expect(body_Row1_Cells?.[0].children[0].token.value).toBe("Bob");
            expect(body_Row1_Cells?.[1].children[0].type).toBe(TokenType.CODE_INLINE);
            expect(body_Row1_Cells?.[1].children[0].token.value).toBe("17");

        });

        // Separator line with incorrect formatting
        test('separator line with incorrect formatting', () => {
            const text =
            '| **Name** | Age |\n' +
            '|---|\n' +
            '| Bob | `17` |\n';
            
            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();
            const tableNode = nodes.children.find(child => child.type === TokenType.TABLE);
            const head = tableNode?.children[0];
            expect(head?.type).toBe(TokenType.TABLE_HEAD_ROW);
            expect(tableNode?.children[1].type).toBe(TokenType.TABLE_BODY_ROW);
            //console.log(tableNode);
            
            const headCells = head?.children;
            expect(headCells?.[0].children[0].type).toBe(TokenType.STRONG);
            expect(headCells?.[0].children[0].token.value).toBe("Name");
            expect(headCells?.[1].children[0].type).toBe(TokenType.TEXT);
            expect(headCells?.[1].children[0].token.value).toBe("Age");
            
            const body_Row1_Cells = tableNode?.children[1].children;
            expect(body_Row1_Cells?.[0].children[0].type).toBe(TokenType.TEXT);
            expect(body_Row1_Cells?.[0].children[0].token.value).toBe("Bob");
            expect(body_Row1_Cells?.[1].children[0].type).toBe(TokenType.CODE_INLINE);
            expect(body_Row1_Cells?.[1].children[0].token.value).toBe("17");

        });

    }); // End of Table Tests