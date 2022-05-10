'use strict'
/**
 * Returns functions to work with dom elements in document
 */

export class DomUtilites {

  getLastNode () : ChildNode | null{
    const lastChild = this.getRoot()
    return lastChild.lastChild
  }

  getLastNodeName () {
    const lastChild = this.getRoot()
    return lastChild.lastChild.nodeName
  }

  getRoot () {
    return document.querySelector('app')
  }

  createElement (element : string) {
    return document.createElement(element)
  }
}