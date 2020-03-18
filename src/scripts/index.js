'use strict'
import { View } from './parser/View.js'
import Language from './parser/Language.js'

// import markable text to parse example
import article from '../../content/posts/instruction-to-write-text.md'

// Import PrismJS package
import Prism from 'prismjs'

/**
 * @param text which we will put to html view
 * @return html view for putted text
 * @method init() uses default and call from ES5: new App().init()
 * @method render(article) puts your's article to the script new App().render(your's article in the text format)
 */

window.App = class App {
  constructor () {
    this.article = article
    this.Prism = Prism
    this.Language = Language
  }

  init () {
    this.View = new View(this.article)
    this.View.render()
    this.Prism.highlightAll()
    this.Language.setLanguage()
  }

  render (article) {
    this.View = new View(article)
    this.View.render()
    this.Prism.highlightAll()
    this.Language.setLanguage()
  }
}
