'use strict';

import { CodeInlineHTML } from "../htmlblocks/CodeInlineHTML";

describe('CodeInlineHTML Render Tests', () => {

    // Test case 1: Verifying standard code string formatting and Tailwind styles
    it('should wrap the inline code value in a code tag with proper styling classes', () => {
        const token = {
            value: 'const total = 42;'
        };

        const codeInlineHTML = new CodeInlineHTML(token);
        const result = codeInlineHTML.render();

        // Check if the expected container tag and utility classes are present
        expect(result).toContain('<code class="inline-block py-1 px-2 bg-gray-300 dark:bg-gray-500 dark:text-slate-200 text-sm font-mono font-medium rounded">');
        expect(result).toContain('const total = 42;</code>');
    });

    // Test case 2: Confirming HTML special characters are safely escaped to prevent XSS
    it('should safely escape unsafe HTML characters like <, >, &, ", and \'', () => {
        const token = {
            value: `if (value < 10 && type === 'admin')`
        };

        const codeInlineHTML = new CodeInlineHTML(token);
        const result = codeInlineHTML.render();

        // Validate that vulnerable symbols are correctly turned into safe HTML entities
        expect(result).toContain('if (value &lt; 10 &amp;&amp; type === &#039;admin&#039;)');
        
        // Double check that raw unsafe characters do not leak into the output
        expect(result).not.toContain('< 10');
        expect(result).not.toContain('&&');
        expect(result).not.toContain("'admin'");
    });
});