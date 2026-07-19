"use strict";
import * as Token from "../Token";

let cachedHighlighter: any = null;
async function getShikiHighlighter() {
  if (cachedHighlighter) return cachedHighlighter;

  const { createHighlighterCore } = await import("shiki/core");
  const { createOnigurumaEngine } = await import("@shikijs/engine-oniguruma");

  const [
    langC, langCpp, langJava, langJson, langBash, langPython,
    langJs, langTs, langSql, langYaml, langMarkdown, langMatlab,
    langXml, langCss, themeLight, themeDark,
  ] = await Promise.all([
    import("@shikijs/langs/c"), import("@shikijs/langs/cpp"),
    import("@shikijs/langs/java"), import("@shikijs/langs/json"),
    import("@shikijs/langs/bash"), import("@shikijs/langs/python"),
    import("@shikijs/langs/javascript"), import("@shikijs/langs/typescript"),
    import("@shikijs/langs/sql"), import("@shikijs/langs/yaml"),
    import("@shikijs/langs/markdown"), import("@shikijs/langs/matlab"),
    import("@shikijs/langs/xml"), import("@shikijs/langs/css"),
    import("@shikijs/themes/github-light"), import("@shikijs/themes/github-dark"),
  ]);

  cachedHighlighter = await createHighlighterCore({
    themes: [themeLight.default, themeDark.default],
    langs: [
      langC.default, langCpp.default, langJava.default, langJson.default,
      langBash.default, langPython.default, langJs.default, langTs.default,
      langSql.default, langYaml.default, langMarkdown.default, langMatlab.default,
      langXml.default, langCss.default,
    ],
    engine: createOnigurumaEngine(async () => {
      const { default: wasm } = await import("@shikijs/engine-oniguruma/wasm-inlined");
      return wasm;
    }),
  });

  return cachedHighlighter;
}

export class CodeBlockHTML {
  private token: Token.codeBlockToken;

  constructor(token: Token.codeBlockToken) {
    this.token = token;
  }

  public async render(): Promise<string> {
    const lang = this.token.language || "text";
    let rawCode = this.token.code;

    if (rawCode.startsWith("\n")) {
      rawCode = rawCode.slice(1);
    }

    const lines = rawCode.split("\n");
    if (lines[lines.length - 1] === "") lines.pop();

    const lineNumbersHtml = lines.map((_, i) => `<div>${i + 1}</div>`).join("");
    let codeContainerHtml = "";

    try {
      const highlighter = await getShikiHighlighter();
      let shikiHtml = highlighter.codeToHtml(rawCode, {
        lang: lang,
        themes: { light: "github-light", dark: "github-dark" },
      });

      // Sytles with CSS
      codeContainerHtml = shikiHtml.replace(
        /style="[^"]*background-color:[^";]*;?/,
        'style="background-color:transparent;',
      );
    } catch (err) {
      console.error("Shiki highlighting error, falling back to raw text:", err);
      const escapedCode = rawCode.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      codeContainerHtml = `<pre><code>${escapedCode}</code></pre>`;
    }

    // Refresh searching selectors
    const copyScript = `
            const pre = this.closest('.md-code-block-container').querySelector('.md-code-block-content pre');
            navigator.clipboard.writeText(pre.textContent || pre.innerText).then(() => {
                this.textContent = 'copied!';
                setTimeout(() => { this.textContent = 'copy'; }, 2000);
            });
        `
      .replace(/\s+/g, " ")
      .trim();

    return `
<div class="md-code-block-outer">
    <div class="md-code-block-container">
        
        <!-- Header -->
        <div class="md-code-block-header">
            <span class="md-code-block-lang">${lang}</span>
            <button class="md-code-block-copy" title="Copy code" onclick="${copyScript}">
                copy
            </button>
        </div>

        <!-- Body -->
        <div class="md-code-block-body">
            <!-- Line Numbers -->
            <div class="md-code-block-lines">
                <div>${lineNumbersHtml}</div>
            </div>
            
            <!-- Code Container -->
            <div class="md-code-block-content">
                ${codeContainerHtml}
            </div>
        </div>

    </div>
</div>
        `.trim();
  }
}