'use strict'
/**
 * Returns functions to work with dom elements in document
 */

export default class DomUtilites {
  constructor () {
    this.document = document
  }

  getLastNode () {
    const lastChild = this.getRoot()
    return lastChild.lastChild
  }

  getLastNodeName () {
    const lastChild = this.getRoot()
    return lastChild.lastChild.nodeName
  }

  getRoot () {
    return this.document.querySelector('article')
  }

  createElement (element) {
    return this.document.createElement(element)
  }
}
