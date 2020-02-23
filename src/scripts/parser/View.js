'use strict'
import Config from './Config.js'
import { Line } from './Line.js'
import Language from './Language.js'

export class View extends Line {
  constructor (post) {
    super()
    this.Config = Config
    this.post = post
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
