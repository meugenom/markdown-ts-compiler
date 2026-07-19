'use strict';

import { CaptionHTML } from "../htmlblocks/CaptionHTML";
import { captionToken } from "../Token";

describe('Caption Render Tests', () => {

    // Normalization Function
    const normalizeHTML = (html: string): string => 
        html.replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim();

    test('Caption renders correctly with all blocks', () => {
        
        const token: captionToken = {
            type: '',
            date: '2026-11-07',
            title: 'Test Caption',
            template: 'post',
            thumbnail: './thumbnails/writing.png',
            slug: 'test-caption',
            tags: 'test, caption',
            cluster: 'test-caption',
            order: '1'
        };

        const captionHTML = new CaptionHTML(token);
        const renderedHTML = captionHTML.render();
        
        const expectedHTML = `
            <div>
                <div class="md-caption">
                    <div class="md-caption-image-wrapper">
                        <img src="thumbnails/writing.png" class="md-caption-image" alt="Test Caption"/>
                    </div>
                    <div class="md-caption-content">
                        <h3 class="md-caption-title">Test Caption</h3>
                        <time class="md-caption-time">2026-11-07</time> 
                        <div class="md-caption-tags-wrapper"><a href="/tag/test," class="md-caption-tag">test,</a><a href="/tag/caption" class="md-caption-tag">caption</a></div>              
                        <div class="md-caption-nav-wrapper">
                            <a href="/article/test-caption" class="md-caption-nav-link">-> Return to Main Article</a>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        `;

        expect(normalizeHTML(renderedHTML)).toBe(normalizeHTML(expectedHTML));
    });
});