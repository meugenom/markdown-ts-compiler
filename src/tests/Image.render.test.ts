'use strict';

import { ImageHTML } from "../htmlblocks/ImageHTML";

describe('ImageHTML Render Tests', () => {

    // Helper to strip multiple spaces and erase formatting layout gaps between tags
    const normalizeHTML = (html: string): string => 
        html.replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim();

    // Test case 1: Full options rendering with a valid url and alt text caption
    it('should correctly render structural elements, fallback classes, and figcaption block when alt text is provided', () => {
        const token = {
            url: './assets/diagram.png',
            alt: 'Architecture Flowchart Diagram'
        };

        const imageHTML = new ImageHTML(token);
        const result = imageHTML.render();
        const normalized = normalizeHTML(result);

        // 1. Verify basic layout wrappers and clean utility classes without overflow/group specs
        expect(result).toContain('<div class="leading-7 font-mono mt-4">');
        expect(result).toContain('<figure class="flex flex-col items-center my-5">');
        
        // 2. Verify image tag contains the clean classic responsive attributes
        expect(result).toContain('class="shadow-md rounded-md max-w-full h-auto w-full sm:w-10/12 border border-gray-200"');

        // 3. Verify that path prefix normalization successfully extracted "./" directly into src
        expect(result).toContain('src="assets/diagram.png"');
        expect(result).toContain('alt="Architecture Flowchart Diagram"');

        // 4. Confirm that the figcaption subtitle block is appended correctly
        expect(normalized).toContain('<figcaption class="mt-2 text-[12px] font-mono text-slate-400 text-center">Architecture Flowchart Diagram</figcaption>');
    });

    // Test case 2: Minimal options rendering without optional alt text captioning
    it('should completely omit the figcaption block and keep alt empty if alt text is missing', () => {
        const token = {
            url: '/cdn/photo.jpeg'
        };

        const imageHTML = new ImageHTML(token);
        const result = imageHTML.render();

        // 1. Verify path prefix normalization handled absolute root slash "/" correctly in src
        expect(result).toContain('src="cdn/photo.jpeg"');
        expect(result).toContain('alt=""');

        // 2. Ensure that the optional caption container is entirely removed from markup output
        expect(result).not.toContain('<figcaption');
    });

    // Test case 3: Edge case scenario when empty token strings are given
    it('should handle missing or empty url safely without crashing the execution context', () => {
        const token = {
            url: '',
            alt: 'Broken Link fallback image description'
        };

        const imageHTML = new ImageHTML(token);
        const result = imageHTML.render();

        // Confirm it fallbacks to an empty string for src instead of producing leaks
        expect(result).toContain('src=""');
        expect(result).toContain('alt="Broken Link fallback image description"');
    });
});