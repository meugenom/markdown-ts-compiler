/**
 * Author: meugenom.com
 * Date: 19.03.2023
 * Refactored: 19.03.2023 
 */

import { Grammar } from "./Grammar"
import { captionToken } from "./Token";
import { TokenType } from "./Types";

export class Caption {

	public text: string;

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
			date: date as string,
			title: title as string,
			template: template as string,
			thumbnail: thumbnail as string,
			slug: slug as string,
			categories: categories as string,
			tags: tags as string,
		};
		
		//remove caption from text
		this.text = this.text.replace(Grammar.BLOCKS.CAPTION, "");

		return token;

	}

}