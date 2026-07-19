"use strict";
import * as katex from "katex";

import { CaptionHTML } from "./htmlblocks/CaptionHTML";
import { HeaderHTML } from "./htmlblocks/HeaderHTML";
import { CodeBlockHTML } from "./htmlblocks/CodeBlockHTML";
import { CodeInlineHTML } from "./htmlblocks/CodeInlineHTML";
import { QuoteHTML } from "./htmlblocks/QuoteHTML";
import { ImageHTML } from "./htmlblocks/ImageHTML";
import { FormulaHTML } from "./htmlblocks/FormulaHTML";
import { BadgeHTML } from "./htmlblocks/BadgeHTML";
import { ColorTextHTML } from "./htmlblocks/ColorTextHTML";
import { TokenType } from "./Types";
import { ASTNode } from "./interfaces/astNode";

export class Render {
  private ast: ASTNode;

  constructor(node: ASTNode) {
    this.ast = node;
  }

  /**
   * Main entry point for rendering the AST into HTML
   */
  public async html(): Promise<string> {
    if (!this.ast || !this.ast.children) {
      return "";
    }
    return await this.renderNodes(this.ast.children);
  }

  /**
   * Recursive function to render AST nodes into HTML
   */
  private async renderNodes(nodes: ASTNode[]): Promise<string> {
    let result = "";

    for (const node of nodes) {
      let chunk = "";

      switch (node.type) {
        // 1. Caption block
        case TokenType.CAPTION: {
          const caption = new CaptionHTML(node.token as any);
          chunk = caption.render();
          break;
        }

        // 2. H1 -> H5 headings (styles from header.css)
        case TokenType.HEADING_FIRST:
        case TokenType.HEADING_SECOND:
        case TokenType.HEADING_THIRD:
        case TokenType.HEADING_FOURTH:
        case TokenType.HEADING_FIFTH: {
          const header = new HeaderHTML(node.token as any);
          const dept = header.getDept(node.token as any);

          const headingText = node.token.value || "";
          const headingId = headingText
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

          const content =
            node.children && node.children.length > 0
              ? await this.renderNodes(node.children)
              : headingText;

          chunk = `<h${dept} id="${headingId}" class="md-heading md-h${dept}">${content}</h${dept}>`;
          break;
        }

        // 3. Codeblocks
        case TokenType.CODE_BLOCK:
        case TokenType.CODE_IN_CODE: {
          const codeBlock = new CodeBlockHTML(node.token as any);
          chunk = await codeBlock.render();
          break;
        }

        // 4. Inline code
        case TokenType.CODE_INLINE: {
          const content =
            node.children && node.children.length > 0
              ? await this.renderNodes(node.children)
              : (node.token.value || "")
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;");

          chunk = `<code class="md-inline-code">${content}</code>`;
          break;
        }

        // 5. Quote block
        case TokenType.QUOTE: {
          if (node.children && node.children.length > 0) {
            chunk = `<p class="md-quote-p">${await this.renderNodes(node.children)}</p>`;
          } else {
            const quote = new QuoteHTML(node.token as any);
            chunk = quote.render();
          }
          break;
        }

        // 6. Large formulas (KaTeX)
        case TokenType.FORMULA_BLOCK: {
          const formula = new FormulaHTML(node.token as any);
          chunk = formula.render();
          if (node.children && node.children.length > 0) {
            chunk += await this.renderNodes(node.children);
          }
          break;
        }

        // 7. Colorful text
        case TokenType.COLOR: {
          const colorText = new ColorTextHTML(node.token as any);

          const childrenHtml =
            node.children && node.children.length > 0
              ? await this.renderNodes(node.children)
              : "";

          chunk = colorText.render(childrenHtml);
          break;
        }

        // 8. Inline formulas (KaTeX)
        case TokenType.FORMULA_INLINE: {
          let text = "";
          try {
            text = katex.renderToString(node.token.formula, {
              displayMode: false,
              throwOnError: false,
            });
          } catch (e) {
            text = ` $${node.token.formula}$`;
          }
          const childrenHtml =
            node.children && node.children.length > 0
              ? await this.renderNodes(node.children)
              : "";
          chunk = `<span>${text} ${childrenHtml}</span>`;
          break;
        }

        // 9. List Block (UL) -> to semantic wrappers in css
        case TokenType.LIST: {
          const titleHtml =
            node.token && node.token.title
              ? `<p class="md-list-title">${node.token.title}</p>`
              : "";
          const ulContent = await this.renderNodes(node.children);
          chunk = `<div class="md-list-outer">${titleHtml}<ul class="md-list-ul">${ulContent}</ul></div>`;
          break;
        }

        // 10. List Item (<li>)
        case TokenType.LIST_ITEM: {
          const itemText = node.token.value.trim();
          let liClass = "md-list-item-disc";

          if (itemText.startsWith("[]")) {
            liClass = "task-list-item md-list-item-task";
          } else if (itemText.startsWith("[x]")) {
            liClass =
              "task-list-item task-list-item-checked md-list-item-task-checked";
          }

          const innerContent =
            node.children && node.children.length > 0
              ? await this.renderNodes(node.children)
              : itemText;

          chunk = `<li class="${liClass}">${innerContent}</li>`;
          break;
        }

        // 11. Table Block
        case TokenType.TABLE: {
          let headRowsHtml = "";
          let bodyRowsHtml = "";

          for (const rowNode of node.children) {
            if (rowNode.type === TokenType.TABLE_HEAD_ROW) {
              let thsHtml = "";
              for (const headNode of rowNode.children) {
                const cellContent = await this.renderNodes(headNode.children);
                thsHtml += `<th class="md-table-th">${cellContent}</th>`;
              }
              headRowsHtml += `<tr>${thsHtml}</tr>`;
            } else if (rowNode.type === TokenType.TABLE_BODY_ROW) {
              let tdsHtml = "";
              for (const bodyNode of rowNode.children) {
                const cellContent = await this.renderNodes(bodyNode.children);
                tdsHtml += `<td class="md-table-td">${cellContent}</td>`;
              }
              bodyRowsHtml += `<tr>${tdsHtml}</tr>`;
            }
          }

          chunk = `<table class="md-table"><thead>${headRowsHtml}</thead><tbody>${bodyRowsHtml}</tbody></table>`;
          break;
        }

        // 12. Badge block
        case TokenType.BADGE: {
          const badge = new BadgeHTML(node.token as any);
          chunk = badge.render();
          if (node.children && node.children.length > 0) {
            chunk += await this.renderNodes(node.children);
          }
          break;
        }

        // 13. Image block
        case TokenType.IMAGE: {
          const img = new ImageHTML(node.token as any);
          chunk = img.render();
          break;
        }

        // 14. Links
        case TokenType.LINK: {
          const linkName = node.token.name ? `${node.token.name} ` : "";
          const content =
            node.children && node.children.length > 0
              ? await this.renderNodes(node.children)
              : linkName;

          chunk = `<a href="${node.token.url}" class="md-link">${content}</a>`;
          break;
        }

        // 15. Bold text
        case TokenType.STRONG: {
          const content =
            node.children && node.children.length > 0
              ? await this.renderNodes(node.children)
              : node.token.value || "";

          chunk = `<strong class="md-strong">${content}</strong>`;
          break;
        }

        // 16. Underlined text
        case TokenType.UNDER_LINE: {
          const content =
            node.children && node.children.length > 0
              ? await this.renderNodes(node.children)
              : node.token.value;

          chunk = `<span><span class="md-underline">${content}</span></span>`;
          break;
        }

        // 17. Unmarkable text (parsing errors)
        case TokenType.UNMARKABLE: {
          if (node.children && node.children.length > 0) {
            chunk = `<div>${await this.renderNodes(node.children)}</div>`;
          } else {
            const lines = node.token.value.split("\n");
            const escapedLines = lines
              .map((line: string) =>
                line
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;"),
              )
              .join("<br/>");
            chunk = `<div class="md-unmarkable">${escapedLines}</div>`;
          }
          break;
        }

        // 18. Regular flat text
        case TokenType.TEXT: {
          chunk = (node.token.value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          break;
        }

        // 19. Default paragraph blocks
        case TokenType.PARAGRAPH:
        default: {
          const pContent =
            node.children && node.children.length > 0
              ? await this.renderNodes(node.children)
              : "";
          chunk = `<p class="md-paragraph">${pContent}</p>`;
          break;
        }
      }

      result += chunk;
    }

    return result;
  }
}
