'use strict';

import { ColorTextHTML } from "../htmlblocks/ColorTextHTML";

describe('ColorTextHTML Render Tests', () => {

    // Test case 1: Checking standard formatting with a valid matched color
    it('should correctly render structural wrapper tags with appropriate Tailwind decoration color classes', () => {
        const token = {
            color: 'green',
            value: 'Status OK'
        };

        const colorTextHTML = new ColorTextHTML(token);
        const result = colorTextHTML.render();

        // Validate the entire inner wrapper hierarchy and the crucial trailing space inside span
        expect(result).toBe('<span><a class="underline md:decoration-solid decoration-3 decoration-green-500">Status OK</a> </span>');
    });

    // Test case 2: Verifying fallback logic when an unrecognized color string is passed
    it('should default to gray decoration class if the specified token color configuration is missing', () => {
        const token = {
            color: 'unknown-rainbow-color',
            value: 'Fallback Content'
        };

        const colorTextHTML = new ColorTextHTML(token);
        const result = colorTextHTML.render();

        // Check if the fallback mapper caught the error and assigned decoration-gray-500
        expect(result).toContain('decoration-gray-500');
        expect(result).not.toContain('decoration-unknown-rainbow-color');
    });

    // Test case 3: Confirming character escaping protocols for raw markup values
    it('should safely escape vulnerable HTML entities from raw values to prevent rendering corruption', () => {
        const token = {
            color: 'blue',
            value: 'Ref: & "Link" <Click>'
        };

        const colorTextHTML = new ColorTextHTML(token);
        const result = colorTextHTML.render();

        // Validate safe conversion to character entities
        expect(result).toContain('Ref: &amp; &quot;Link&quot; &lt;Click&gt;');
        expect(result).not.toContain('<Click>');
        expect(result).not.toContain('"Link"');
    });
});