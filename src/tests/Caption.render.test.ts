'use strict';

import { CaptionHTML } from "../htmlblocks/CaptionHTML";
import { captionToken } from "../Token";

describe('Caption Render Tests', () => {

    // Normalization function to remove whitespace differences for comparison
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
        
        // Expected HTML result matched exactly with the pure clean relative paths
        const expectedHTML = `
            <div>
                <div class="flex flex-col md:flex-row gap-6">
                    <div class="flex-none relative overflow-hidden h-64 w-full max-w-xs rounded-md shadow-md">
                        <img src="thumbnails/writing.png" class="float-left object-contain h-64 w-full max-w-xs" alt="Test Caption"/>
                    </div>
                    <div class="flex-auto justify-start">
                        <h3 class="text-3xl font-sans font-semibold leading-tight mt-0 mb-2">
                            Test Caption
                        </h3>
                        <time class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 last:mr-0 mr-1">
                            2026-11-07
                        </time> 
                        <div class="tag-container mt-3 py-1">
                            <a navigateLinkTo="/tag/test," href="/tag/test," class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-orange-400 hover:bg-orange-600 last:mr-0 mr-1">
                                test,
                            </a>
                            <a navigateLinkTo="/tag/caption" href="/tag/caption" class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-orange-400 hover:bg-orange-600 last:mr-0 mr-1">
                                caption
                            </a>
                        </div>              
                        <div class="mt-2 py-1">
                            <a navigateLinkTo="/article/test-caption" href="/article/test-caption" class="text-xs font-semibold inline-block py-1 px-2 rounded text-white bg-gray-400 hover:bg-gray-600 uppercase last:mr-0 mr-1">
                                -> Return to Main Article 
                            </a>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        `;

        // Compare the normalized strings
        expect(normalizeHTML(renderedHTML)).toBe(normalizeHTML(expectedHTML));
    });
});