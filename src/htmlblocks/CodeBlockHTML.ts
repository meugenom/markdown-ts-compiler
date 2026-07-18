"use strict";
import * as Token from "../Token";

// We use a cached variable to store the highlighter instance after it's created, so we only go through the async loading process once.
let cachedHighlighter: any = null;
async function getShikiHighlighter() {
  if (cachedHighlighter) return cachedHighlighter;

  // 1. Import Core
  const { createHighlighterCore } = await import("shiki/core");

  // 2. Import Oniguruma Engine
  const { createOnigurumaEngine } = await import("@shikijs/engine-oniguruma");

  // 3. Fixed paths: import strictly from @shikijs/langs and @shikijs/themes
  const [
    langC,
    langCpp,
    langJava,
    langJson,
    langBash,
    langPython,
    langJs,
    langTs,
    langSql,
    langYaml,
    langMarkdown,
    langMatlab,
    langXml,
    langCss,
    themeLight,
    themeDark,
  ] = await Promise.all([
    import("@shikijs/langs/c"),
    import("@shikijs/langs/cpp"),
    import("@shikijs/langs/java"),
    import("@shikijs/langs/json"),
    import("@shikijs/langs/bash"),
    import("@shikijs/langs/python"),
    import("@shikijs/langs/javascript"),
    import("@shikijs/langs/typescript"),
    import("@shikijs/langs/sql"),
    import("@shikijs/langs/yaml"),
    import("@shikijs/langs/markdown"),
    import("@shikijs/langs/matlab"),
    import("@shikijs/langs/xml"),
    import("@shikijs/langs/css"),
    import("@shikijs/themes/github-light"),
    import("@shikijs/themes/github-dark"),
  ]);

  // 4. Initialize the lightweight core instance
  cachedHighlighter = await createHighlighterCore({
    themes: [themeLight.default, themeDark.default],
    langs: [
      langC.default,
      langCpp.default,
      langJava.default,
      langJson.default,
      langBash.default,
      langPython.default,
      langJs.default,
      langTs.default,
      langSql.default,
      langYaml.default,
      langMarkdown.default,
      langMatlab.default,
      langXml.default,
      langCss.default,
    ],
    // Use fetch initialization for WASM to prevent Webpack Production Mode from complaining about export conditions
    engine: createOnigurumaEngine(async () => {
      const { default: wasm } =
        await import("@shikijs/engine-oniguruma/wasm-inlined");
      return wasm;
    }),
  });

  return cachedHighlighter;
}

/**
 * Returns an HTML string for a code block
 * @param token block
 * @return HTML string for the code block
 */

export class CodeBlockHTML {
  private token: Token.codeBlockToken;

  constructor(token: Token.codeBlockToken) {
    this.token = token;
  }

  public async render(): Promise<string> {
    const lang = this.token.language || "text";
    let rawCode = this.token.code;

    // Remove newline at the start
    if (rawCode.startsWith("\n")) {
      rawCode = rawCode.slice(1);
    }

    const lines = rawCode.split("\n");
    if (lines[lines.length - 1] === "") lines.pop();

    // Generate numbers for each line
    const lineNumbersHtml = lines.map((_, i) => `<div>${i + 1}</div>`).join("");

    let codeContainerHtml = "";

    try {
      // Wait Shiki Initialization and get the highlighter instance
      const highlighter = await getShikiHighlighter();
      let shikiHtml = highlighter.codeToHtml(rawCode, {
        lang: lang,
        themes: { light: "github-light", dark: "github-dark" },
      });

      // Modify classes and styles of the Shiki <pre> tag using regular expressions,
      // to reset the hard-coded theme background and add padding
      codeContainerHtml = shikiHtml
        .replace(
          '<pre class="shiki',
          '<pre class="shiki leading-6 p-4 text-[13px] overflow-x-auto !bg-transparent',
        )
        .replace(
          /style="[^"]*background-color:[^";]*;?/,
          'style="background-color:transparent;',
        );
    } catch (err) {
      console.error("Shiki highlighting error, falling back to raw text:", err);
      // Fallback in case Shiki fails or the language is not supported
      const escapedCode = rawCode.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      codeContainerHtml = 
      `<pre class="leading-6 p-4 overflow-x-auto !bg-transparent text-[13px]">
          <code class="leading-6 text-[13px] !bg-transparent">
            ${escapedCode}
          </code>
        </pre>`;
    }

    // Inline JS-script for the Copy Button
    // It finds the adjacent container with code, extracts the plain text (without line numbers) and copies it.
    const copyScript = `
            const pre = this.closest('.relative').querySelector('.code-content-target pre');
            navigator.clipboard.writeText(pre.textContent || pre.innerText).then(() => {
                this.textContent = 'copied!';
                setTimeout(() => { this.textContent = 'copy'; }, 2000);
            });
        `
      .replace(/\s+/g, " ")
      .trim(); // compress into a single line for the attribute

    // Assemble the entire template into one monolithic string
    return `
<div class="code-block-outer my-5">
    <div class="relative rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden font-mono z-10 bg-white dark:bg-[#1e293b]">
        
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <span class="text-[11px] font-mono font-bold uppercase tracking-widest opacity-50 text-slate-700 dark:text-slate-300">${lang}</span>
            <button class="code-copy-btn text-[11px] font-mono opacity-50 hover:opacity-100 transition-opacity text-slate-700 dark:text-slate-300" title="Copy code" onclick="${copyScript}">
                copy
            </button>
        </div>

        <!-- Body -->
        <div class="flex overflow-x-auto">
            <!-- Line Numbers -->
            <div class="select-none text-right leading-6 pr-4 pl-3 py-4 text-[13px] text-slate-400 dark:text-slate-600 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex-shrink-0">
                <div>${lineNumbersHtml}</div>
            </div>
            
            <!-- Code Container -->
            <div class="code-content-target flex-1 min-w-0">
                ${codeContainerHtml}
            </div>
        </div>

    </div>
</div>
        `.trim();
  }
}
