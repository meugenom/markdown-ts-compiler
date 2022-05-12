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
		
		CODE : /```(bash|javascript)(.*?\s)```/s,
		CODE_BLOCK : /```(bash|javascript)((\s.*)```)\s*```\s/s,

		QUOTE: />(.*)\s>.<cite>(.*)<\/cite>/,
		
		LINK : /(.*)[^!]\[(.*?)\]\((.*)\)(.*)/,
		IMAGE : /(.*)!\[(.*?)\]\((.*)\)(.*)/,

		UNDER_DASH : /(.*)\_(.*)\_(.*)/,
		UNMARKABLE : /(.*)\\\*(.*)\\\*(.*)/,
		STRONG : /(.*)\*\*(.*)\*\*(.*)/,
		INLINE_CODE : /(.*)\`(.*)\`(.*)/
	}
}
