'use strict'

export interface IToken {
	depth?: string
	children: any
	type: string,

	value?: string
	
	row_number?: number,
	word_number?: number,

	date?: string,
	title?: string,
	template?: string,
	thumbnail?: string,
	slug?: string,
	categories?: string,
	tags?: string

	alt? : string,
	url? : string,

	language?: string
	quote?: string,
	author?: string

	name?: string,
	link?: string

	body?: string
	list?: Array<string>
}