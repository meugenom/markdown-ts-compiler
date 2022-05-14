'use strict'

export class Grammar{

	public static BLOCKS = {
		
		HEADING : /(#{1,5})((.*?)+)/,

		CAPTION : /^---\sdate:((.*))\stitle:((.*))\stemplate:((.*))\sthumbnail:((.*))\sslug:((.*))\scategories:((.*))\stags:((.*))\s---/,
		
		SPACE : / /,
		LINE : /\n/,

		COLOR: /((.?)[^\s]+)\.(blue|gray|red|green|yellow|indigo|purple|pink)/,
		BADGE: /((.?)[^\s]+)\@(blue|gray|red|green|yellow|indigo|purple|pink)/,

		LIST : /(\-|\[\]|\[\x\])\s((.*))/,
		
		CODE_BLOCK : /```(bash|javascript)(.*?\s)```/s,
		CODE_IN_CODE : /```(bash|javascript)((\s.*)```)\s*```\s/s,
		INLINE_CODE : /(.*)\`(.*)\`(.*)/,

		QUOTE: />(.*)\s>.<cite>(.*)<\/cite>/,
		
		LINK : /(.*)[^!]\[(.*?)\]\((.*)\)(.*)/,
		IMAGE : /(.*)!\[(.*?)\]\((.*)\)(.*)/,

		UNDER_LINE : /(.*)\_(.*)\_(.*)/,
		UNMARKABLE : /(.*)\\\*(.*)\\\*(.*)/,
		STRONG : /(.*)\*\*(.*)\*\*(.*)/
		
	}
}
