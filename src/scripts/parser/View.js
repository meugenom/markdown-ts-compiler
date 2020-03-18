'use strict'
import Config from './Config.js'
import { LineRouter } from './LineRouter'
import Language from './Language.js'
import { LocalStorage } from './blocks/LocalStorage'

export class View extends LineRouter {
  constructor (post) {
    super()
    this.Config = Config
    this.post = post
    this.LocalStorage = new LocalStorage()
    // triggers
    this.LocalStorage.set('isCodeBlock', false)
    this.LocalStorage.set('isInfoAboutPost', false)
  }

  render () {
    const lines = this.splitString(this.post, Config.separator.newLine)
    const article = document.querySelector('article')

    lines.forEach(line => {
      if (line.length !== 0) {
        let node = this.parse(line)

        if (node !== undefined) {
          node = Language.parseLang(node)
          article.appendChild(node)
        }
      }
    })
  }
}
