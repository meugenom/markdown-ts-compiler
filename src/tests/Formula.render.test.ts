'use strict';

import { FormulaHTML } from "../htmlblocks/FormulaHTML";
import * as katex from "katex";

describe('FormulaHTML Render Tests', () => {

    // Test case 1: Verifying layout wrappers and standard KaTeX production markup
    it('should correctly embed block-level LaTeX equations inside custom Tailwind layout templates', () => {
        const token = {
            formula: 'a^2 + b^2 = c^2'
        };

        const formulaHTML = new FormulaHTML(token);
        const result = formulaHTML.render();

        // 1. Validate our structural outer component layout classes
        expect(result).toContain('class="md-formula-outer"');
        expect(result).toContain('>Formula</span>');
        expect(result).toContain('class="md-formula-body"');

        // 2. Validate that KaTeX processed the string and injected its mathematical components
        expect(result).toContain('class="katex"');
        expect(result).toContain('class="katex-display"');
        expect(result).toContain('<math'); // MathML block generation confirmation
    });
    
    // Test case 2: Verifying stability of the safety net fallback logic
    it('should trigger the catch handler block and safely escape equation text strings if KaTeX engine throws a critical failure', () => {
        const token = {
            formula: 'x < y && y > z'
        };

        // 1. Explicitly mock console.error to keep the test terminal clean
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // 2. Explicitly mock the external katex engine library to force throw an error exception
        const katexSpy = jest.spyOn(katex, 'renderToString').mockImplementation(() => {
            throw new Error('Simulated internal KaTeX parser panic crash');
        });

        const formulaHTML = new FormulaHTML(token);
        const result = formulaHTML.render();

        // Verify that the layout recovered safely and escaped dangerous markup elements
        expect(result).toContain('x &lt; y &amp;&amp; y &gt; z');
        expect(result).not.toContain('< y');
        expect(result).not.toContain('&&');

        // Always tear down all spies to restore original functionality
        katexSpy.mockRestore();
        consoleSpy.mockRestore();
    });
});