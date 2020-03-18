'use strict'
import DomUtilites from './DomUtilites'
import { WordRouter } from '../WordRouter'

/**
 * Returns an html list elements
 * @param line as block of the text
 * @return list <ul><li></li></ul>dom element
 */

export class List {
  constructor (line) {
    this.line = line
    this.DomUtilites = new DomUtilites()
    this.WordRouter = new WordRouter()
    this.init()
  }

  init () {
    this.line = this.WordRouter.parseWords(this.line)
  }

  render () {
    const liHtml = this.DomUtilites.createElement('LI')
    liHtml.innerHTML = this.line

    if (this.DomUtilites.getLastNodeName() === 'UL') {
      // adding to existing list
      const ulHtml = this.DomUtilites.getLastNode()
      ulHtml.appendChild(liHtml)
    } else {
      // creating new list
      const ulHtml = this.DomUtilites.createElement('UL')
      ulHtml.appendChild(liHtml)
      return ulHtml
    }
  }
}
