'use strict'
import DomUtilites from './DomUtilites'
import { LocalStorage } from './LocalStorage'
/**
 * Returns an html element if line is code block
 * @param line as block of the text
 * @return dom element as code block
 */

export class CodeBlock {
  constructor () {
    this.codeblock = ''
    this.DomUtilites = new DomUtilites()
    this.LocalStorage = new LocalStorage()
  }

  render (line) {
    if (this.LocalStorage.get('isCodeBlock') === 'false') {
      // new row in the block and type of language
      const preHTML = this.DomUtilites.createElement('pre')
      preHTML.className = 'language-' + line.slice(3)
      const codeHTML = this.DomUtilites.createElement('code')
      preHTML.appendChild(codeHTML)
      this.LocalStorage.set('isCodeBlock', true)
      // console.log(preHTML)
      return preHTML
    } else { 
      if (line.substring(0, 3) === '```') {
        // end block
        this.LocalStorage.set('isCodeBlock', false)
      } else {
        // repeat new row in the block
        this.codeblock = this.DomUtilites.getLastNode().lastChild
        line = line + '\n'
        this.codeblock.innerHTML = this.codeblock.innerHTML + line
      }
    }
  }
}
