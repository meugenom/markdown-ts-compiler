/**
 * Author: meugenom.com
 * Date: 19.03.2023
 * Refactored: 19.03.2023 
 */

import { Grammar } from "./Grammar"
import { captionToken } from "./Token";
import { TokenType } from "./Types";

export class Caption {

	private text: string;

	constructor(text: string) {
		this.text = text;
	}

	public get(): captionToken {

		const match = this.text.match(Grammar.BLOCKS.CAPTION);
		if (!match) {
			throw new Error("Invalid caption format");
		}

		const [
			, // Ignore the first element
			row,
			date,
			title,
			,
			template,
			,
			thumbnail,
			,
			slug,
			,
			categories,
			,
			tags,
		] = match;

		const token: captionToken = {
			type: TokenType.CAPTION,
			row,
			date,
			title,
			template,
			thumbnail,
			slug,
			categories,
			tags,
		};

		//remove caption from the text
		this.text = this.text.replace(Grammar.BLOCKS.CAPTION, "");

		return token;

	}

}