'use strict'

/**
 * Grammar
 * This is a class that contains all the regular expressions used in the parser.
 * 
 */
export class Grammar {

	public static BLOCKS = {
		
		// badge		
		BADGE: /^\[\[(.*?)::(blue|gray|red|green|yellow|indigo|purple|pink)\]\]/,

		// caption regex getested		
		CAPTION: /\s*---\s*[\s\S]*?---\s*/,		
		// very strong parameters
		//CAPTION_PARAMETER: /^---\s*date:\s*(.*?)\s*title:\s*(.*?)\s*template:\s*(.*?)\s*thumbnail:\s*(.*?)\s*slug:\s*(.*?)\s*tags:\s*(.*?)\s*cluster:\s*(.*?)\s*order:\s*(.*?)\s*---\s*$/m,				
		// not strong parameters
		CAPTION_PARAMETER: /^---\s*(?:date:\s*(.*?)\s*)?(?:title:\s*(.*?)\s*)?(?:template:\s*(.*?)\s*)?(?:thumbnail:\s*(.*?)\s*)?(?:slug:\s*(.*?)\s*)?(?:tags:\s*(.*?)\s*)?(?:cluster:\s*(.*?)\s*)?(?:order:\s*(.*?)\s*)?---\s*$/m,		

		// Find parameter values from no valid caption blocks
		CAPTION_FIND_DATE: /date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/,
		CAPTION_FIND_TITLE: /title:\s*['"]?(.*?)(?:['"]?\s*(?:\n|\r|$))/,
		CAPTION_FIND_TEMPLATE: /template:\s*['"]?(.*?)['"]?(\s|$)/,
		CAPTION_FIND_THUMBNAIL: /thumbnail:\s*['"]?(.*?)['"]?\s*$/m,
		CAPTION_FIND_SLUG: /slug:\s*['"]?(.*?)['"]?\s*$/m,
		CAPTION_FIND_TAGS: /tags:\s*(.*?)\s*$/m,
		CAPTION_FIND_CLUSTER: /cluster:\s*(.*?)\s*$/m,
		CAPTION_FIND_ORDER: /order:\s*(\d+)/,

		// caption parameters for validation
		CAPTION_DATE: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,		
		CAPTION_THUMBNAIL: /^[\.\/a-zA-Z0-9\-_]+\.(png|jpg|jpeg|webp)$/,
		CAPTION_SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
		CAPTION_CLUSTER: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
				
		// code block
		CODE_BLOCK: /^(\`){3}(cpp|c|matlab|octave|python|bash|java|javascript|typescript|swift|text)?([^(\`){3}].*\n){1,2000}\`\`\`/,
		CODE_BLOCK_LANG: /[^\`\`\`](\w+)\n/gs,
		CODE_BLOCK_BODY: /\n([\s\S]+)[^\`\`\`]/gs,

		
		// code in code block		
		CODE_IN_CODE: /^(`{4,})([a-z0-9+]*)[\n\r]([\s\S]*?)\n\1(?![`])/,
		// match [0] - all 
		// match [3] - clear code
		
		// color text inline 
		COLOR: /^\[\[(.*?):(blue|gray|red|green|yellow|indigo|purple|pink)\]\]/,
		
		FORMULA_BLOCK: /^\$\$([\s\S]+?)\$\$/,
		FORMULA_INLINE: /^\$(?!\$)(?!token\.)([^$\n]+?)\$(?!\$)/,

		// heading‚
		HEADING: /^#{1,6}\s+[^\n]*(?:\n|$)/,
		HEADING_LEVEL: /^(#{1,5})/,

		INLINE_CODE: /([^\`\`\`]+)/gs,
		INLINE_CODE_PARAMS: /([^\n]+)/sg,

		// inline code
		INLINE_CODE_BLOCK: /^\`([^\`\n]+)\`/,

		// images
		IMAGE: /^!\[([^)]+)\]\(\S+\)/,
		IMAGE_NAME: /!\[\S.+\]/g,
		IMAGE_URL: /\(\S.+\)/g,

		LINE: /\n/,
		
		// links
		LINK: /^\[([^\]]+)\]\((\S+)\)/,

		// list		
		LIST: /^(?:([^\n]+):)?\s*\n?(\s*(-(?!>)|\[\]|\[x\])\s*[^\n]+(?:\n|$)){1,20}/,
		LIST_ATTRIBUTE: /(-|\[\]|\[x\])/g,
		
		PARAGRAPH: /([^\n]+)/g,

		SPACE: / /,				
		STRONG_TEXT: /^\*\*([\s\S]*?)\*\*/,

		TABLE: /^(\|[^\r\n|][^\r\n]*\|[ \t]*\r?\n?)+/,

		TABLE_CELL: /([^|]+)(?=\|)/g,

		TOKEN: /\$token.(\S{35}[^\s\.\*\`])/g,
		TXT_TOKEN: /[^\$token.\w\b-](\w)+/g,

		UNDER_LINE: /^_([^_]+)_(?!\w)/,
		UNMARKABLE_BLOCK: /^\\\*\s?([\s\S]*?)\\\*/,
		
		// quote		
		QUOTE: /^(>[^\n]*(\n|$))+/,				

	}
}
