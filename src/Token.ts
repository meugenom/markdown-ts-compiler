'use strict'

/**
 * basisToken
 * textToken,
 * unknownTextToken
 * captionToken
 * paragraphStartToken
 * paragraphEndToken
 * strongTextToken
 * underLineToken
 * colorTextToken
 * badgeToken
 * quoteToken
 * linkToken
 * imageToken
 * codeInCodeToken
 * codeBlockToken
 * codeInlineToken
 * headToken
 * listToken
 * tableToken
 */


export interface basisToken {
	children?: any,
	value?: string,
	row?: string
}

export interface unknownTextToken extends basisToken {
	type: string,
}

export interface textToken extends basisToken {
	type: string,
}

export interface tableToken extends basisToken {
	type: string,
}

export interface tableRowToken extends basisToken {
	type: string,
}

export interface paragraphStartToken extends basisToken {
	type: string,
}

export interface paragraphEndToken extends basisToken {
	type: string,
}

export interface strongTextToken extends basisToken {
	type: string,
}

export interface underLineToken extends basisToken {
	type: string,
}

export interface unmarkableToken extends basisToken {
	type: string,
}

export interface colorTextToken extends basisToken {
	type: string,
	color: string
}

export interface bagdeToken extends basisToken {
	type: string,
	color: string
}


export interface captionToken extends basisToken {
	type: string,
	date: string,
	title: string,
	template: string,
	thumbnail: string,
	slug: string,
	categories: string,
	tags: string
}



export interface quoteToken extends basisToken {
	type: string,
	quote: string,
	author: string
}

export interface linkToken extends basisToken {
	type: string,
	name: string
	url: string
}

export interface imageToken extends basisToken {
	type: string,
	alt: string
	url: string
}

export interface headToken extends basisToken {
	type: string,
	dept: number
}

export interface codeBlockToken extends basisToken {
	type: string,
	language: string,
	code: string
}

export interface codeInCodeToken extends basisToken {
	type: string,
	language: string,
	code: string
}

export interface codeInlineToken extends basisToken {
	type: string,
}

export interface listToken extends basisToken {
	type: string,
	attribute: string
}
