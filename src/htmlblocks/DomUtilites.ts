'use strict'
/**
 * Returns functions to work with dom elements in document
 */

export class DomUtilites {

  getLastNode () : ChildNode | null{
    const lastChild = this.getRoot()
    return lastChild.lastChild
  }

  getLastNodeName () : string {
    const lastChild = this.getRoot()
    return lastChild.lastChild.nodeName
  }

  getRoot () : any {
    return document.querySelector('article')
  }

  createElement (element : string) : HTMLElement {    
    return document.createElement(element)
  }
}