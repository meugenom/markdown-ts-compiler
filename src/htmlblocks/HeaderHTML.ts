'use strict'

import * as Token from "../Token";
import { TokenType } from "../Types";

export class HeaderHTML {

    private token: Token.headToken;

    constructor(token: Token.headToken) {
        this.token = token;
    }

    public getDept(token: Token.headToken): number {
        // Mapping of heading token types to their corresponding depth levels
        const depthMap: Record<string, number> = {
            [TokenType.HEADING_FIRST]: 1,
            [TokenType.HEADING_SECOND]: 2,
            [TokenType.HEADING_THIRD]: 3,
            [TokenType.HEADING_FOURTH]: 4,
            [TokenType.HEADING_FIFTH]: 5,
        };

        // Default to depth 6 if the token type is not found in the map
        return depthMap[token.type] ?? 6;
    }

    public getSizeClass(dept: number): string {
        const sizeMap: string[] = ['text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm', 'text-xs'];
        return sizeMap[(dept - 1)] ?? 'text-base';
    }

    public render(): string {
        const dept = this.getDept(this.token);
        const sizeClass = this.getSizeClass(dept);
        
        // Remove any leading or trailing whitespace from the heading text
        const headingText: string = this.token.value || '';
        
        // Generate anchor ID for anchor links (TOC)
        const headingId = headingText
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

        const classes = `${sizeClass} font-mono font-bold mt-0 mb-3 pr-10 pt-6`;

        // Dynamically substitute the heading level h1-h6
        return `<h${dept} id="${headingId}" class="${classes}">${headingText}</h${dept}>`;
    }
}