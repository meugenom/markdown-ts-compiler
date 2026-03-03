'use strict'

/**
 * Grammar
 * This is a class that contains all the regular expressions used in the parser.
 * 
 */
export class Grammar {

	public static BLOCKS = {

		// heading‚
		HEADING: /[^\S](#{1,6})([^\n\)\/]+)/g,
		HEADING_LEVEL: /(#{1,5})/g,

		// caption
		CAPTION: /^---\sdate:((.*))\stitle:((.*))\stemplate:((.*))\sthumbnail:((.*))\sslug:((.*))\scategories:((.*))\stags:((.*))\s---/,

		SPACE: / /,
		LINE: /\n/,

		// color line 
		COLOR: /((.?)[^\s]+)\.(blue|gray|red|green|yellow|indigo|purple|pink)/g,

		// badge
		BADGE: /((.?)[^\s]+)\|(blue|gray|red|green|yellow|indigo|purple|pink)/g,

		// list		
		LIST: /\S.*:\n(\s*(-|\[\]|\[.\])\s*\S.*){1,20}/g,

		LIST_ATTRIBUTE: /(-|\[\]|\[x\])/g,


		// code block
		CODE_BLOCK: /\`\`\`(python|bash|java|javascript|typescript|swift)([^(\`){3}].*\n){1,200}\`\`\`/g,
		CODE_BLOCK_LANG: /[^\`\`\`](\w+)\n/gs,
		CODE_BLOCK_BODY: /\n([\s\S]+)[^\`\`\`]/gs,

		// code in code block
		CODE_IN_CODE: /\`\`\`(python|bash|java|javascript|typescript|swift)\n([^\`\`\`]+)\`\`\`(python|bash|java|javascript|typescript|swift)\n([^\`\`\`]+)\`\`\`\n\`\`\`\n/g,
		INLINE_CODE: /([^\`\`\`]+)/gs,
		INLINE_CODE_PARAMS: /([^\n]+)/sg,

		// inline code
		INLINE_CODE_BLOCK: /\`(\S).*[^\`]\`/g,

		// quote
		QUOTE: />[^\n].*\n(\s){0,10}> <cite> - [^\n]+/g,
		QUOTE_PARAMS: /[^<>]+/g,

		// links
		LINK: /[^!]\[([^)]\S.+)\]\(https:\/\/\S.+\)/g,
		LINK_NAME: /\[\S.+\]/g,
		LINK_URL: /\(\S.+\)/g,

		// images
		IMAGE: /!\[([^)]+)\]\(\S+\)/g,
		IMAGE_NAME: /!\[\S.+\]/g,
		IMAGE_URL: /\(\S.+\)/g,

		// horizontal line
		UNDER_LINE: /(_{1})([^_.]+)(_{1})/g,

		UNMARKABLE: /\\\*\s[\s\S]+?\\\*/g,

		// bold text
		STRONG: /\*\*([\w|\s]+)\*\*/g,
		STRONG_TEXT: /[^\*]+/g,


		// table
		TABLE: /((\|[\w\d\s]+)+\|)/g,

		FORMULA_BLOCK: /\$\$([\s\S]+?)\$\$/g,
		FORMULA_INLINE: /\$(?!\$)(?!token\.)([^$\n]+?)\$(?!\$)/g,

		PARAGRAPH: /([^\n]+)/g,

		TOKEN: /\$token.(\S{35}[^\s\.\*\`])/g,

		TXT_TOKEN: /[^\$token.\w\b-](\w)+/g,
	}
}
