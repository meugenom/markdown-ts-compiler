/**
 * Author: meugenom.com
 * Date: 19.03.2023
 * Refactored: 19.03.2023 
 */

export enum TokenType {
	BADGE = "Badge", // A badge for displaying extra information
	CAPTION = "Caption", // A caption for an image or video
	CODE_BLOCK = "CodeBlock", // A block of code
	CODE_IN_CODE = "CodeInCode", // A code snippet inside a code block
	CODE_INLINE = "CodeInline", // An inline code snippet
	COLOR = "Color", // A color value
	DOCUMENT = "Document", // A document containing various elements
	HEADING = "Heading", // A heading element
	HEADING_FIRST = "HeadingFirst", // A first-level heading element
	HEADING_SECOND = "HeadingSecond", // A second-level heading element
	HEADING_THIRD = "HeadingThird", // A third-level heading element
	HEADING_FORTH = "HeadingForth", // A fourth-level heading element
	HEADING_FIFTH = "HeadingFifth", // A fifth-level heading element
	IMAGE = "Image", // An image element
	LINK = "Link", // A hyperlink element
	LIST = "List", // A list element
	PARAGRAPH = "Paragraph", // A paragraph element
	PARAGRAPH_START = "ParagraphStart", // The start of a paragraph element
	PARAGRAPH_END = "ParagraphEnd", // The end of a paragraph element
	QUOTE = "Quote", // A blockquote element
	STRONG = "Strong", // A strong or bold text element
	TABLE = "Table", // A table element
	TABLE_ROW = "TableRow", // A table row element
	TEXT = "Text", // A plain text element
	UNDER_LINE = "UnderLine", // An underlined text element
	UNKNOWN_TEXT = "UnknownText", // An unknown or unrecognized text element
	UNMARKABLE = "Unmarkable", // An element that should not be marked up
	FORMULA_BLOCK = "FormulaBlock", // A block-level LaTeX formula
	FORMULA_INLINE = "FormulaInline", // An inline LaTeX formula
  }  