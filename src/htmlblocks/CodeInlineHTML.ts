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
        // Security by XSS
        const escapedValue = this.token.value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        // Retrun clear HTML
        return `<code class="md-inline-code">${escapedValue}</code>`;
    }
}