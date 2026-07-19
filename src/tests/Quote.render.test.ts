'use strict';

import { QuoteHTML } from "../htmlblocks/QuoteHTML";

describe('QuoteHTML Render Tests', () => {

    // Helper to compress spaces and unify tag joints for stable text assertions
    const normalizeHTML = (html: string): string => 
        html.replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim();

    // Test case 1: Standard single-line blockquote rendering evaluation
    it('should strip the markdown quote token prefix and generate a paragraph inside a div container', () => {
        const token = {
            type: 'Quote',
            value: '> Content of a standard single-line quote.'
        };

        const quoteHTML = new QuoteHTML(token as any);
        const result = quoteHTML.render();

        expect(result.startsWith('<div>')).toBe(true);
        expect(result).toContain('<p class="md-quote-p">');
        expect(result).toContain('Content of a standard single-line quote.');
        expect(result.endsWith('</p></div>')).toBe(true);
    });

    // Test case 2: Multiline blockquote parsing and independent paragraph distribution
    it('should split multi-line markdown inputs into independent styled paragraph elements', () => {
        const token = {
            type: 'Quote',
            value: '> First line of wisdom\n>Second line with tight formatting syntax'
        };

        const quoteHTML = new QuoteHTML(token as any);
        const result = quoteHTML.render();
        const normalized = normalizeHTML(result);

        // Remove spaces
        expect(normalized).toContain('<p class="md-quote-p">First line of wisdom</p>');
        expect(normalized).toContain('<p class="md-quote-p">Second line with tight formatting syntax</p></div>');
        
        // Final check
        expect(normalized).toBe('<div><p class="md-quote-p">First line of wisdom</p><p class="md-quote-p">Second line with tight formatting syntax</p></div>');
    });
});