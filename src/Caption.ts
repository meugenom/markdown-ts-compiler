"string"

import { Grammar } from "./Grammar"
import { TokensType } from "./Types";
import { IToken } from "./IToken";

export class Caption {

	private token: IToken | undefined;
	public text: string;

	constructor(text: string) {
		this.text = text;
	}

	public get(): IToken {

		const caption = this.text.match(Grammar.BLOCKS.CAPTION);

		if(this.text.match(Grammar.BLOCKS.CAPTION) != null) {
		
			this.token = {
				value: caption[0],
				type: TokensType.CAPTION,
				date: caption[2],
				title: caption[4],
				template: caption[6],
				thumbnail: caption[8],
				slug: caption[10],
				categories: caption[12],
				tags: caption[14],
				row_number: 0,
				word_number: 0
			}

			//remove caption from the text
			this.text = this.text.replace(Grammar.BLOCKS.CAPTION, "");

			return this.token;
		}
	}

}