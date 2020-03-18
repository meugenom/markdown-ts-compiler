'use strict'
import DomUtitlites from './DomUtilites'

/**
 * Returns an html element for unmarkable text
 * @param line as block of the text
 * @return dom element
 */

export class UnMarkable {
  constructor (line) {
    this.line = line
    this.DomUtitlites = new DomUtitlites()
    this.unmarkableText = ''
    this.init()
  }

  init () {
    this.unmarkableText = this.DomUtitlites.createElement('unmarkable')
    this.line = this.line.slice(2)
  }

  render () {
    this.unmarkableText.innerHTML = `<p>${this.line}</p>`
    return this.unmarkableText
  }
}
