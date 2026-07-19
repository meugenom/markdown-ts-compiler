'use strict';

import { describe, expect, it } from '@jest/globals';
import { CodeBlockHTML } from "../htmlblocks/CodeBlockHTML";
import { codeBlockToken } from "../Token";

describe('CodeBlock Render Tests', () => {
    
    // Helper to compress multiple spaces and remove gaps between HTML tags for stable string matching
    const normalizeHTML = (html: string): string => 
        html.replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim();

    // Test case 1: Checking asynchronous rendering functionality with a specified language
    it('should correctly render structural containers, language indicator, and line numbers', async () => {
        const token: codeBlockToken = {
            type: 'CodeBlock',
            language: 'typescript',
            code: 'const value = 100;\nconsole.log(value);'
        };

        const codeBlockHTML = new CodeBlockHTML(token);
                
        const renderedHTML = await codeBlockHTML.render();
        
        expect(renderedHTML).toContain('class="md-code-block-outer"');
        expect(renderedHTML).toContain('class="md-code-block-content"');
        expect(renderedHTML).toContain('class="md-code-block-copy"');
        expect(renderedHTML).toContain('>typescript</span>');
        
        const normalized = normalizeHTML(renderedHTML);
        expect(normalized).toContain('<div>1</div><div>2</div>');
        expect(renderedHTML).toContain('onclick="const pre = this.closest(');
    });

    // Test case 2: Verifying stability of slicing leading newlines
    it('should properly slice away leading newline character if present', async () => {
        const token: codeBlockToken = {
            type: 'CodeBlock',
            language: 'bash',
            code: '\necho "Hello World"'
        };

        const codeBlockHTML = new CodeBlockHTML(token);
        const renderedHTML = await codeBlockHTML.render();
        const normalized = normalizeHTML(renderedHTML);

        expect(normalized).toContain('<div>1</div>');
        expect(normalized).not.toContain('<div>1</div><div>2</div>');
    });
    
    // Test case 3: Checking fallback strategy when language metadata is empty
    it('should default to "text" language when language property is an empty string', async () => {
        const token: codeBlockToken = {
            type: 'CodeBlock',
            language: '', 
            code: 'Plain unformatted log text string'
        };

        const codeBlockHTML = new CodeBlockHTML(token);
        const renderedHTML = await codeBlockHTML.render();

        expect(renderedHTML).toContain('>text</span>');
    });
});