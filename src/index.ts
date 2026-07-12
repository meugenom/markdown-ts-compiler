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

export async function convertMDtoHTML(text: string): Promise<string> {
    const tokenizer = new Tokenizer(text);    
    const renderer = new Render(tokenizer.getAST());    
    return renderer.html();
}

export function convertMDtoAST(text: string) {
    const tokenizer = new Tokenizer(text);
    return tokenizer.getAST();
}

export function convertMDtoTokens(text: string) {
    const tokenizer = new Tokenizer(text);
    return tokenizer.tokens;
}

export default {
    convertMDtoHTML,
    convertMDtoAST,
    convertMDtoTokens
};