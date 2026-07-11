'use strict';

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
        
        // Awaiting the asynchronous render execution
        const renderedHTML = await codeBlockHTML.render();

        // Validate top-level layout component wrappers and container classes
        expect(renderedHTML).toContain('class="code-block-outer my-5"');
        expect(renderedHTML).toContain('class="code-content-target flex-1 min-w-0"');
        expect(renderedHTML).toContain('class="code-copy-btn');

        // Validate that the language badge is injected correctly
        expect(renderedHTML).toContain('>typescript</span>');

        // Validate that the line numbers block is rendered sequentially
        const normalized = normalizeHTML(renderedHTML);
        expect(normalized).toContain('<div>1</div><div>2</div>');

        // Validate that the onclick inline script for copy logic is preserved
        expect(renderedHTML).toContain('onclick="const pre = this.closest(');
    });

    // Test case 2: Verifying safety constraints regarding leading newlines within the code blocks
    it('should properly slice away leading newline character if present', async () => {
        const token: codeBlockToken = {
            type: 'CodeBlock',
            language: 'bash',
            code: '\necho "Hello World"'
        };

        const codeBlockHTML = new CodeBlockHTML(token);
        const renderedHTML = await codeBlockHTML.render();
        const normalized = normalizeHTML(renderedHTML);

        // Since the leading newline is stripped, it must calculate exactly one code line
        expect(normalized).toContain('<div>1</div>');
        expect(normalized).not.toContain('<div>1</div><div>2</div>');
    });
    
    // Test case 3: Checking fallback strategy when language metadata is empty
    it('should default to "text" language when language property is an empty string', async () => {
        const token: codeBlockToken = {
            type: 'CodeBlock',
            language: '', // FIX: Added explicit empty string to satisfy strict Token interface
            code: 'Plain unformatted log text string'
        };

        const codeBlockHTML = new CodeBlockHTML(token);
        const renderedHTML = await codeBlockHTML.render();

        // Verify that fallback language logic correctly outputs 'text'
        expect(renderedHTML).toContain('>text</span>');
    });
});