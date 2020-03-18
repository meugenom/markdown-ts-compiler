'use strict'
import Config from './Config.js'
import { WordRouter } from './WordRouter'
import { Paragraph } from './blocks/Paragraph'
import { Blockquote } from './blocks/Blockquote'
import { HeadType } from './blocks/HeadType'
import { UnMarkable } from './blocks/UnMarkable'
import { List } from './blocks/List'
import { CodeBlock } from './blocks/CodeBlock'
import { LocalStorage } from './blocks/LocalStorage'
import { InfoAboutPost } from './blocks/InfoAboutPost'

export class LineRouter extends WordRouter {
  constructor () {
    super()
    this.Config = Config
    this.output = ''
    this.arrayOfStrings = []
    this.infoAboutPostTrigger = super.infoAboutPostTrigger
    this.LocalStorage = new LocalStorage()
    this.InfoAboutPost = new InfoAboutPost()
  }

  parse (line) {
    const arrayOfWords = line.split(this.Config.separator.newSpace)

    if (this.LocalStorage.get('isCodeBlock') === 'true') {
      return new CodeBlock().render(line)
    } else if (this.LocalStorage.get('isInfoAboutPost') === 'true') {
      return this.InfoAboutPost.render(line)
    } else {
      return arrayOfWords[0] === '#####'
        ? new HeadType(line.slice(5), 'h5').render()
        : arrayOfWords[0] === '####'
          ? new HeadType(line.slice(4), 'h4').render()
          : arrayOfWords[0] === '###'
            ? new HeadType(line.slice(3), 'h3').render()
            : arrayOfWords[0] === '##'
              ? new HeadType(line.slice(2), 'h2').render()
              : arrayOfWords[0] === '#'
                ? new HeadType(line.slice(1), 'h1').render()
                : arrayOfWords[0].substring(0, 3) === '---'
                  ? this.InfoAboutPost.render(line)
                  : arrayOfWords[0] === '-'
                    ? new List(line.slice(1)).render()
                    : arrayOfWords[0] === '>'
                      ? new Blockquote(line.slice(1)).render()
                      : arrayOfWords[0].substring(0, 3) === '```'
                        ? new CodeBlock().render(line)
                        : arrayOfWords[0].substring(0, 2) === '\\*'
                          ? new UnMarkable(line).render()
                          : new Paragraph(line).render() // false variant
    }
  }

  splitString (stringToSplit, separator) {
    this.arrayOfStrings = stringToSplit.split(separator)
    return this.arrayOfStrings
  }

  ltrim (line) {
    if (line == null) return line
    return line.replace(/^\s+/g, '')
  }
}
