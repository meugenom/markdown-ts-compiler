'use strict'
import DomUtitlites from './DomUtilites'

/**
 * Returns an html element <h>
 * @param line as block of the text
 * @return dom element for headType <h/> for example <h1> ...<h2>
 */

export class HeadType {
  constructor (line, headType) {
    this.line = line
    this.headType = headType
    this.DomUtitlites = new DomUtitlites()
  }

  render () {
    const html = this.DomUtitlites.createElement(this.headType)
    html.innerHTML = this.line
    return html
  }
}
