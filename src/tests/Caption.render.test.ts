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
        
        // Expected HTML result updated with the new relative container, lazy-loaded img, and loader
        const expectedHTML = `
            <div>
                <div class="flex flex-col md:flex-row gap-6">
                    <div class="flex-none relative overflow-hidden h-64 w-full max-w-xs rounded-md shadow-md">
                        <div class="imageLoader absolute inset-0 flex flex-col items-center justify-center bg-transparent z-10">
                            <span class="animate-pulse text-[10px] text-slate-400 font-mono">Loading...</span>
                        </div>
                        <img 
                            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'></svg>"
                            data-src="thumbnails/writing.png" 
                            class="lazy opacity-0 transition-opacity duration-500 object-contain w-full h-full z-20"
                            alt="Test Caption"
                        />
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