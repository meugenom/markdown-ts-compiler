/**
 * Author: meugenom.com
 * Refactored: 2026
 * Entry point of the application
 *
 * markdown compiler ASCII art:
 *                          	_       _
 *         _ __ ___  ‚ __ _ _ __| | ____| | _____      ___ __
 *        | '_ ` _ \ / _` | '__| |/ / _` |/ _ \ \ /\ / / '_ \
 *        | | | | | | (_| | |  |   < (_| | (_) \ V  V /| | | |
 *        |_| |_| |_|\__,_|_|  |_|\_\__,_|\___/ \_/\_/ |_| |_|
 *
 *                                          _ _
 *                 ___ ___  _ __ ___  _ __ (_) | ___ _ __
 *                / __/ _ \| '_ ` _ \| '_ \| | |/ _ \ '__|
 *               | (_| (_) | | | | | | |_) | | |  __/ |
 *                \___\___/|_| |_| |_| .__/|_|_|\___|_|
 *                                   |_|
 */

import { Tokenizer } from "./Tokenizer";
import { Render } from "./Render";

// Global Styles for the application
import "./static/styles/style.css";
import 'katex/dist/katex.min.css';

// Import example for local demonstration
import example from 'raw-loader!./content/articles/how-to-write-text.md';

/**
 * API to convert markdown string to clean HTML string
 * @param text raw markdown content
 * @returns Promise resolving to HTML string
 */
export async function convertMDtoHTML(text: string): Promise<string> {
    const tokenizer = new Tokenizer(text);    
    const renderer = new Render(tokenizer.getAST());
    return await renderer.html();
}

/**
 * API to convert markdown text to Abstract Syntax Tree (AST)
 * @param text raw markdown content
 */
export function convertMDtoAST(text: string) {
    const tokenizer = new Tokenizer(text);
    return tokenizer.getAST();
}

/**
 * API to convert markdown text to flat tokens array
 * @param text raw markdown content
 */
export function convertMDtoTokens(text: string) {
    const tokenizer = new Tokenizer(text);
    return tokenizer.tokens;
}

// Export as named functions and a default object (for maximum compatibility)
export default {
    convertMDtoHTML,
    convertMDtoAST,
    convertMDtoTokens
};

/**
 * Function to demonstrate the compiler's functionality in the browser (Dev mode)
 */
async function showExample() {
    // Check if we are in a browser environment and the content container exists
    if (typeof window !== 'undefined' && document.getElementById('content') !== null && example !== undefined) {    
        try {
            // Convert the example markdown to HTML
            const htmlString = await convertMDtoHTML(example);
            
            // Insert the HTML string into the content container
            const contentContainer = document.getElementById('content');
            if (contentContainer) {
                contentContainer.innerHTML = htmlString;
            }
        } catch (error) {
            console.error("Failed to render example markdown:", error);
        }
    }
}

// Start the example rendering if we are in a browser environment
if (typeof window !== 'undefined') {
    showExample();
}