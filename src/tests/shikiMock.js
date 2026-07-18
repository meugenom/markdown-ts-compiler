module.exports = {
  createHighlighterCore: jest.fn().mockResolvedValue({
    codeToHtml: (code, options) => 
      `<pre class="shiki leading-6 p-4 text-[13px] overflow-x-auto !bg-transparent"><code>${code}</code></pre>`
  })
};