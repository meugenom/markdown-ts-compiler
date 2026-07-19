'use strict'

import * as Token from "../Token";
import { TokenType } from "../Types";

export class HeaderHTML {

    private token: Token.headToken;

    constructor(token: Token.headToken) {
        this.token = token;
    }

    public getDept(token: Token.headToken): number {
        const depthMap: Record<string, number> = {
            [TokenType.HEADING_FIRST]: 1,
            [TokenType.HEADING_SECOND]: 2,
            [TokenType.HEADING_THIRD]: 3,
            [TokenType.HEADING_FOURTH]: 4,
            [TokenType.HEADING_FIFTH]: 5,
        };

        return depthMap[token.type] ?? 6;
    }

    public render(): string {
        const dept = this.getDept(this.token);
        const headingText: string = this.token.value || '';
        
        // Generation secure ID for Anchors
        const headingId = headingText
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

        // Return clean HTML
        return `<h${dept} id="${headingId}" class="md-heading md-h${dept}">${headingText}</h${dept}>`;
    }
}