"string"
import { Grammar } from "./Grammar"
import {captionToken} from "./Token";
import { TokenType } from "./Types";

export class Caption {

	public text: string;

	constructor(text: string) {
		this.text = text;
	}

	public get(): captionToken {

		const caption = this.text.match(Grammar.BLOCKS.CAPTION);

			const token = {} as captionToken;

			token.type = TokenType.CAPTION
			token.row = caption[0];
			token.date = caption[1];
			token.title =  caption[3];
			token.template =  caption[5];
			token.thumbnail =  caption[7];
			token.slug =  caption[9];
			token.categories = caption[11];
			token.tags =  caption[13];

			//remove caption from the text
			this.text = this.text.replace(Grammar.BLOCKS.CAPTION, "");

			return token;
		
	}

}