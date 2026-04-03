import { Tokenizer } from "../Tokenizer";
import { TokenType } from "../Types";

describe('Lists Tests', () => {
    
    /*
    Test cases:
    1. List with all  parameters  
    2. List with emoji in <li> and <ul> containers 
    3. List with [], [x] - lists in <li> and <ul> containers
    4. List with extra whitespace in <li> and <ul> containers
    5. List with Windows-style line endings in <li> and <ul> containers 
    6. List with missing <ul> fields 

    - For each test case, we will check the type of the token and the values of the parameters.
    - Error Handling must be defined but don't break other tests suites and AST Logic
    */
   
    // Test case for finding lists
    test('List with all parameters', () => {
        
        const text = 
        'List 1:\n' +
        '\t- the formula $a^2 + b^2 = c^2$\n' +
        '\t- the \`code inline\` test\n' +
        '\t- _the underdashed text_ test\n';
        

        const tokenizer = new Tokenizer(text);
        const nodes = tokenizer.getAST();
        const listNode = nodes.children[0];

        expect(listNode.type).toBe(TokenType.LIST);
        const listItems = listNode.children;
        expect(listItems.length).toBe(3);

        // Check first list item
        const firstItem = listItems[0];
        expect(firstItem.type).toBe(TokenType.LIST_ITEM);
        
        //console.log(`First list item children: ${JSON.stringify(firstItem.children)}`);
        
        expect(firstItem.children[0].type).toBe(TokenType.TEXT);
        expect(firstItem.children[0].token.value).toBe('the formula ');
        expect(firstItem.children[1].type).toBe(TokenType.FORMULA_INLINE);
        expect(firstItem.children[1].token.formula).toBe('a^2 + b^2 = c^2');

        // Check second list item
        const secondItem = listItems[1];
        //console.log(`Second list item children: ${JSON.stringify(secondItem.children)}`);
        expect(secondItem.type).toBe(TokenType.LIST_ITEM);
        expect(secondItem.children[0].type).toBe(TokenType.TEXT);
        expect(secondItem.children[0].token.value).toBe('the ');
        expect(secondItem.children[1].type).toBe(TokenType.CODE_INLINE);
        expect(secondItem.children[1].token.value).toBe('code inline');

        
        // Check third list item
        const thirdItem = listItems[2];
        expect(thirdItem.type).toBe(TokenType.LIST_ITEM);
        expect(thirdItem.children[0].type).toBe(TokenType.UNDER_LINE);
        expect(thirdItem.children[0].token.value).toBe('the underdashed text');
        expect(thirdItem.children[1].type).toBe(TokenType.TEXT);
        expect(thirdItem.children[1].token.value).toBe(' test');
        
        });

        // List with emoji in <li> and <ul> containers
        test('List with emoji in <li> and <ul> containers', () => {
            const text = 
            'List 😊:\n' +
            '\t- _the underdashed text_ test 🤩\n';

            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();
            const listNode = nodes.children[0];

            expect(listNode.type).toBe(TokenType.LIST);            
            const listItems = listNode.children;
            expect(listItems.length).toBe(1);

            // Check first list item
            const firstItem = listItems[0];
            expect(firstItem.type).toBe(TokenType.LIST_ITEM);

            expect(firstItem.children[0].type).toBe(TokenType.UNDER_LINE);
            expect(firstItem.children[0].token.value).toBe('the underdashed text');
            expect(firstItem.children[1].type).toBe(TokenType.TEXT);
            expect(firstItem.children[1].token.value).toBe(' test 🤩')
            
        });

        // List with [], [x] - lists in <li> and <ul> containers
        test('List with [], [x] - lists in <li> and <ul> containers', () => {
            const text = 
            'List TODO:\n' +
            '\t[] the task 1\n' +
            '\t[x] the task 2\n' +
            '\t- the task 3\n';
            
            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();

            // List Header
            const listHeader = nodes.children[0];

            // console with formatting
            //console.log(JSON.stringify(listHeader, null, 2));

            expect(listHeader.type).toBe(TokenType.LIST);
            expect (listHeader.token.title).toBe('List TODO');

            const listItems = listHeader.children;

            console.log(JSON.stringify(listItems, null, 2));
            
            expect(listItems[0].type).toBe(TokenType.LIST_ITEM);
            expect(listItems[0].token.value).toBe('[] the task 1');
            expect(listItems[0].children[0].token.type).toBe(TokenType.TEXT);
            expect(listItems[0].children[0].token.value).toBe('the task 1');

            expect(listItems[1].type).toBe(TokenType.LIST_ITEM);
            expect(listItems[1].token.value).toBe('[x] the task 2');
            expect(listItems[1].children[0].token.type).toBe(TokenType.TEXT);
            expect(listItems[1].children[0].token.value).toBe('the task 2');

            expect(listItems[2].type).toBe(TokenType.LIST_ITEM);
            expect(listItems[2].token.value).toBe('- the task 3');
            expect(listItems[2].children[0].token.type).toBe(TokenType.TEXT);
            expect(listItems[2].children[0].token.value).toBe('the task 3');
            
        });


        // List with extra whitespace in <li> and <ul> containers
        test('List with extra whitespace in <li> and <ul> containers', () => {
            const text = 
            'List with whitespace :  \n' +
            '\t-    the task 1   \n';
            
            
            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();
            
            const listHeader = nodes.children[0];
            expect(listHeader.type).toBe(TokenType.LIST);
            expect(listHeader.token.title).toBe('List with whitespace ');
            
            const listItems = listHeader.children;
            expect(listItems[0].type).toBe(TokenType.LIST_ITEM);
            expect(listItems[0].token.value).toBe('-    the task 1');
            expect(listItems[0].children[0].token.type).toBe(TokenType.TEXT);
            expect(listItems[0].children[0].token.value).toBe('the task 1');

        });

        // List with Windows-style line endings in <li> and <ul> containers 
        test('List with Windows-style line endings in <li> and <ul> containers', () => {
            const text = 
            'List with Windows-style line endings:\r\n' +
            '\t- the task 1\r\n';

            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();
            
            const listHeader = nodes.children[0];

            expect(listHeader.type).toBe(TokenType.LIST);
            expect(listHeader.token.title).toBe('List with Windows-style line endings');

            const listItems = listHeader.children;
            expect(listItems[0].type).toBe(TokenType.LIST_ITEM);
            expect(listItems[0].token.value).toBe('- the task 1');
            expect(listItems[0].children[0].token.type).toBe(TokenType.TEXT);
            expect(listItems[0].children[0].token.value).toBe('the task 1');

        });


        // List with missing <ul> fields
        test('List with missing <ul> fields', () => {
            const text = 
            'List with missing <ul> fields:\n';

            const tokenizer = new Tokenizer(text);
            const nodes = tokenizer.getAST();

            const listHeader = nodes.children[0];
            expect(listHeader.type).toBe(TokenType.PARAGRAPH);

            console.log(JSON.stringify(listHeader, null, 2));   
            expect(listHeader.children[0].token.type).toBe(TokenType.TEXT);
            expect(listHeader.children[0].raw).toBe('List with missing <ul> fields:\n');
            expect(listHeader.children.length).toBe(1); // Only one child, no list items
        });

    });