'use strict'
import DomUtitlites from './DomUtilites'
import { WordRouter } from '../WordRouter'

/**
 * Returns an html element if line is simple block of the text
 * @param line as block of the text
 * @return dom element for paragraph <p/>
 */

export class Paragraph {
  constructor (line) {
    this.line = line
    this.WordRouter = new WordRouter()
    this.DomUtitlites = new DomUtitlites()
    this.parsedText = ''
    this.init()
  }

  init () {
    this.parsedText = this.WordRouter.parseWords(this.line)
  }

  render () {
    const html = this.DomUtitlites.createElement('p')
    html.innerHTML = this.parsedText
    return html
  }
}
