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

    constructor(token: ColorTextToken) {
        this.token = token;
    }

    public render(): string {        
        // Base classes for underline and decoration
        const baseClasses = "underline md:decoration-solid decoration-3";

        // Colors Mapping
        const colorMap: Record<string, string> = {
            blue:   "decoration-blue-500",
            gray:   "decoration-gray-500",
            red:    "decoration-red-500",
            green:  "decoration-green-500",
            yellow: "decoration-yellow-500",
            purple: "decoration-purple-500",
            pink:   "decoration-pink-500",
            indigo: "decoration-indigo-500",
        };

        // If the color doesn't match, use gray by default
        const colorClass = colorMap[this.token.color] || colorMap.gray;

        // Escape HTML special characters to prevent XSS and ensure proper rendering
        const escapedValue = this.token.value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        // Return the structure one-to-one as in the DOM version: 
        // tag <a> inside <span> and a trailing space inside the <span> wrapper
        return `<span><a class="${baseClasses} ${colorClass}">${escapedValue}</a> </span>`;
    }
}