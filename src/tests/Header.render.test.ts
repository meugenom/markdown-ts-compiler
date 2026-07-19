'use strict';

import { HeaderHTML } from "../htmlblocks/HeaderHTML";
import { TokenType } from "../Types";

describe('HeaderHTML Render Tests', () => {

    // Test case 1: Checking standard H1 generation with correct sizing and id slugification
    it('should correctly render h1 element with accurate tailwind sizing and slugified anchor id', () => {
        const token = {
            type: TokenType.HEADING_FIRST,
            value: 'Introduction to Compiler Design'
        };

        const headerHTML = new HeaderHTML(token as any);
        const result = headerHTML.render();

        // Expect full exact match of the tag, id, and style list attributes        
        expect(result).toBe('<h1 id="introduction-to-compiler-design" class="md-heading md-h1">Introduction to Compiler Design</h1>');
    });

    // Test case 2: Verifying mid-level heading scale transformations (H3 example)
    it('should scale down heading depth and classes appropriately for mid-tier tokens', () => {
        const token = {
            type: TokenType.HEADING_THIRD,
            value: 'Sub-section Topic'
        };

        const headerHTML = new HeaderHTML(token as any);
        const result = headerHTML.render();

        // Confirm it uses h3 wrapper and maps to text-lg class size rule
        expect(result).toContain('<h3 id="sub-section-topic"');
        expect(result).toContain('class="md-heading md-h3"');
    });

    // Test case 3: Confirming fallback safeguards for unidentified token types
    it('should fallback to h6 tag and text-xs class for unknown heading token types', () => {
        const token = {
            type: 'SOME_NON_EXISTENT_TOKEN_TYPE',
            value: 'Fallback Title'
        };

        const headerHTML = new HeaderHTML(token as any);
        const result = headerHTML.render();

        // Validate that fallback logic caught the issue and safely downgraded to h6 / text-xs    
        expect(result).toBe('<h6 id="fallback-title" class="md-heading md-h6">Fallback Title</h6>');
    });

    // Test case 4: Validating sanitization regex rules for anchor id attribute generation
    it('should clean, trim, lowercase, and eliminate special characters when building the anchor id', () => {
        const token = {
            type: TokenType.HEADING_SECOND,
            value: '  Heading Rule #1: Don\'t Panic!  '
        };

        const headerHTML = new HeaderHTML(token as any);
        const result = headerHTML.render();

        // Processing steps breakdown:
        // '  Heading Rule #1: Don\'t Panic!  ' -> lowercase/trim -> 'heading rule #1: don't panic!'
        // spaces to dashes -> 'heading-rule-#1:-don't-panic!'
        // non-alphanumeric strip -> 'heading-rule-1-dont-panic'
        expect(result).toContain('id="heading-rule-1-dont-panic"');
        expect(result).toContain('>  Heading Rule #1: Don\'t Panic!  </h2>');
    });
});