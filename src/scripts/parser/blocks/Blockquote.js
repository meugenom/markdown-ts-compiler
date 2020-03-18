'use strict'

import DomUtitlites from './DomUtilites'

/**
 * Returns html code for blockquote
 * @param current line
 * @return html code block
 */

export class Blockquote {
  constructor (line) {
    this.line = line
    this.DomUtitlites = new DomUtitlites()
  }

  isExists () {
    if (this.DomUtitlites.getLastNodeName() === 'BLOCKQUOTE') {
      // we need to add existing quote
      return true
    } else {
      // creating new element blockquote
      return false
    }
  }

  render () {
    if (this.isExists()) {
      const lastQuote = this.DomUtitlites.getLastNode()
      lastQuote.innerHTML = `<p>${lastQuote.innerHTML}</p> ${this.line}`
    } else {
      const blockquote = this.DomUtitlites.createElement('BLOCKQUOTE')
      blockquote.innerHTML = this.line
      return blockquote
    }
  }
}
