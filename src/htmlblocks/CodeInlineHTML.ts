'use strict'

interface CodeInlineToken {
    value: string;
}

/**
 * Returns an HTML string for inline code
 * @param token object containing the code value
 * @return HTML string <code>...</code>
 */
export class CodeInlineHTML {

    private token: CodeInlineToken;

    constructor(token: CodeInlineToken) {
        this.token = token;
    }

    public render(): string {
        // Escape HTML special characters to prevent XSS and ensure proper rendering
        const escapedValue = this.token.value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        // Return the clean HTML string without unnecessary <span> wrapper
        return `<code class="inline-block py-1 px-2 bg-gray-300 dark:bg-gray-500 dark:text-slate-200 text-sm font-mono font-medium rounded">${escapedValue}</code>`;
    }
}