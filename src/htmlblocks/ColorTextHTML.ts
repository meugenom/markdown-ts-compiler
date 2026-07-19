'use strict'

interface ColorTextToken {
    color: string;
    value: string;
}

/**
 * Returns an HTML string for colored text
 * @param token object containing the color and text value
 * @return HTML string with a trailing space inside a span wrapper
 */
export class ColorTextHTML {

    private token: ColorTextToken;
    
    // colortext by colortext.css validation
    private validColors = ['blue', 'gray', 'red', 'green', 'yellow', 'purple', 'pink', 'indigo'];

    constructor(token: ColorTextToken) {
        this.token = token;
    }

    public render(): string {        
        // by default gray
        const color = this.validColors.includes(this.token.color) ? this.token.color : 'gray';

        const escapedValue = this.token.value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        return `<span><a class="md-color-text md-color-text-${color}">${escapedValue}</a> </span>`;
    }
}