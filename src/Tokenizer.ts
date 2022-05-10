'use strict'

import { Grammar } from "./Grammar"
import { TokensType } from "./Types";
import { IToken } from "./IToken";
import { Caption } from "./Caption"


export class Tokenizer {

	public tokens: IToken[];
	public text: string;
	public words: Array<string>;

	private word_number: number;

	constructor(text : string) {

		this.text = text;
		this.tokens = [];
		this.word_number = 0;
		this.words = [];
		this.init();
	}


	private init = (): void => {

		//add caption
		if(this.text.match(Grammar.BLOCKS.CAPTION)!=null){
			const caption = new Caption(this.text);
			const token: IToken = caption.get();
			this.text = caption.text;	//remove caption from article
			this.tokens.push(token);
		}
		

		//split by space
		this.words = this.text.split(Grammar.BLOCKS.SPACE);

		let out = "";

		/**
		 * LOOPS for multiple line blocks:
		 *  - CODEBLOCK
		 *  - CODE
		 *  - QUOTE
		 */

		this.word_number = 0;

		loop_word: while (this.word_number < this.words.length) {

			out = out + " " + (this.words[this.word_number]);

			//in the end of article
			if (this.word_number == this.words.length - 1) {

				this.tokens.push({
					type: TokensType.UNKNOWN_TEXT,
					value: out
				})
				this.word_number++;
				continue loop_word;
			}

			//CODE_BLOCK

			if (out.match(Grammar.BLOCKS.CODE_BLOCK) != null) {

				const rest: string = out.replace(Grammar.BLOCKS.CODE_BLOCK, "&codeblock&");
				const arr = rest.split("&codeblock&")


				this.tokens.push({
					type: TokensType.UNKNOWN_TEXT,
					value: arr[0],

				})

				this.tokens.push({
					type: TokensType.CODE_BLOCK,
					value: out.match(Grammar.BLOCKS.CODE_BLOCK)[2],
					language: out.match(Grammar.BLOCKS.CODE_BLOCK)[1],

				})

				out = arr[1];
				this.word_number++;
				continue loop_word;
			}


			//CODE
			if (out.match(Grammar.BLOCKS.CODE) != null &&
				out.match(Grammar.BLOCKS.CODE)[2].length > 5 //because value is not less then 5 symbols...its CODEBLOCK
			) {

				const rest: string = out.replace(Grammar.BLOCKS.CODE, "&code&");
				const arr = rest.split("&code&")


				this.tokens.push({
					type: TokensType.UNKNOWN_TEXT,
					value: arr[0],

				})

				this.tokens.push({
					type: TokensType.CODE,
					value: out.match(Grammar.BLOCKS.CODE)[2],
					language: out.match(Grammar.BLOCKS.CODE)[1],
				})

				out = arr[1];
				this.word_number++;
				continue loop_word;
			}

			//QUOTE
			if (out.match(Grammar.BLOCKS.QUOTE) != null) {

				const rest: string = out.replace(Grammar.BLOCKS.QUOTE, "&quote&");
				const arr = rest.split("&quote&")


				this.tokens.push({
					type: TokensType.UNKNOWN_TEXT,
					value: arr[0],

				})

				this.tokens.push({
					type: TokensType.QUOTE,
					value: out.match(Grammar.BLOCKS.QUOTE)[0],
					quote: out.match(Grammar.BLOCKS.QUOTE)[1],
					author: out.match(Grammar.BLOCKS.QUOTE)[2],

				})

				out = arr[1];
				this.word_number++;
				continue loop_word;

			}

			this.word_number++;

		}


		// LOOPS UNKNOWN_TEXT TO DEFINE OTHER TOKENS:

		let itokens: Array<IToken> = [];

		this.tokens.forEach(token => {

			if (token.type == TokensType.UNKNOWN_TEXT) {

				const text = token.value.split("\n")


				text.forEach(stroke => {


					if (stroke != '' && stroke != ' ') {



						/**
						 * Search other tokens:
						 * 
						 * - Image
						 * - Link
						 * - InlineCode
						 *  - Strong
						 * - Unmarkable
						 * - Heading
						 * - Underdash
						 */



						if (stroke.match(Grammar.BLOCKS.IMAGE) != null) {

							itokens.push({
								type: TokensType.PARAGRAPH_START,
								value: ""
							});

							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.IMAGE)[1]
							})
							itokens.push({
								type: TokensType.IMAGE,
								value: stroke.match(Grammar.BLOCKS.IMAGE)[2],
								body: stroke.match(Grammar.BLOCKS.IMAGE)[3]
							})
							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.IMAGE)[4]
							})

							itokens.push({
								type: TokensType.PARAGRAPH_END,
								value: ""
							});

							return;

						}

						if (stroke.match(Grammar.BLOCKS.LINK) != null) {

							itokens.push({
								type: TokensType.PARAGRAPH_START,
								value: ""
							});

							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.LINK)[1]
							})
							itokens.push({
								type: TokensType.LINK,
								value: stroke.match(Grammar.BLOCKS.LINK)[2],
								body: stroke.match(Grammar.BLOCKS.LINK)[3]
							})
							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.LINK)[4]
							})

							itokens.push({
								type: TokensType.PARAGRAPH_END,
								value: ""
							});

							return;

						}

						if (stroke.match(Grammar.BLOCKS.UNDER_DASH) != null) {

							itokens.push({
								type: TokensType.PARAGRAPH_START,
								value: ""
							});

							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.UNDER_DASH)[1]
							})
							itokens.push({
								type: TokensType.UNDER_DASH,
								value: stroke.match(Grammar.BLOCKS.UNDER_DASH)[2]
							})
							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.UNDER_DASH)[3]
							})

							itokens.push({
								type: TokensType.PARAGRAPH_END,
								value: ""
							});


							return;

						}

						if (stroke.match(Grammar.BLOCKS.INLINE_CODE) != null) {

							itokens.push({
								type: TokensType.PARAGRAPH_START,
								value: ""
							});

							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.INLINE_CODE)[1]
							})
							itokens.push({
								type: TokensType.INLINE_CODE,
								value: stroke.match(Grammar.BLOCKS.INLINE_CODE)[2]
							})
							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.INLINE_CODE)[3]
							})

							itokens.push({
								type: TokensType.PARAGRAPH_END,
								value: ""
							});



							return;

						}

						if (stroke.match(Grammar.BLOCKS.STRONG) != null) {

							itokens.push({
								type: TokensType.PARAGRAPH_START,
								value: ""
							});

							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.STRONG)[1]
							})
							itokens.push({
								type: TokensType.STRONG,
								value: stroke.match(Grammar.BLOCKS.STRONG)[2]
							})
							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.STRONG)[3]
							})

							itokens.push({
								type: TokensType.PARAGRAPH_END,
								value: ""
							});

							return;

						}


						if (stroke.match(Grammar.BLOCKS.UNMARKABLE) != null) {

							itokens.push({
								type: TokensType.PARAGRAPH_START,
								value: ""
							});

							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.UNMARKABLE)[1]
							})
							itokens.push({
								type: TokensType.UNMARKABLE,
								value: stroke.match(Grammar.BLOCKS.UNMARKABLE)[2]
							})
							itokens.push({
								type: TokensType.TEXT,
								value: stroke.match(Grammar.BLOCKS.UNMARKABLE)[3]
							})

							itokens.push({
								type: TokensType.PARAGRAPH_END,
								value: ""
							});


							return;

						}

						if (stroke.match(Grammar.BLOCKS.HEADING) != null) {

							const types = [
								TokensType.HEADING_FIRST,
								TokensType.HEADING_SECOND,
								TokensType.HEADING_THIRD,
								TokensType.HEADING_FORTH,
								TokensType.HEADING_FIFTH
							]

							const itype: number = stroke.match(Grammar.BLOCKS.HEADING)[1].length - 1;

							itokens.push({
								type: types[itype],
								value: stroke.match(Grammar.BLOCKS.HEADING)[2]
							})

							return;
						}

						// for other unknown text						
						itokens.push({
							type: TokensType.PARAGRAPH_START,
							value: ""
						});

						itokens.push({
							type: TokensType.TEXT,
							value: stroke
						})

						itokens.push({
							type: TokensType.PARAGRAPH_END,
							value: ""
						})


					}
				})

			} else {

				itokens.push(token);
			}
		})

		this.tokens = itokens;
		
	}
}