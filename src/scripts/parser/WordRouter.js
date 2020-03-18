'use strict'
import Config from './Config.js'

import DomUtilites from './blocks/DomUtilites'
import Utilites from './blocks/Utilites'

export class WordRouter {
  constructor () {
    this.DomUtilites = new DomUtilites()
    this.Config = Config
  }

  parseWords (line) {
    // const arrayOfWords = this.getWords(line)
    const arrayOfWords = new Utilites(line).getWordsArrayFromLine()

    // for one word
    const ImagesPattern = this.Config.ImagesPattern
    const BracketsPattern = this.Config.BracketsPattern
    const BracesPattern = this.Config.BracesPattern
    const UnderDashPattern = this.Config.UnderDashPattern
    const StrongPattern = this.Config.StrongPattern
    const CodePattern = this.Config.CodePattern
    const SearchLinkPattern = this.Config.SearchLinkPattern
    const unMarkablePattern = this.Config.UnMarkablePattern

    // for several words
    const StartCodePattern = this.Config.StartCodePattern
    const EndCodePattern = this.Config.EndCodePattern
    const StartStrongPattern = this.Config.StartCodePattern
    const EndStrongPattern = this.Config.EndStrongPattern
    const StartBracketsPattern = this.Config.StartBracketsPattern
    const EndBracketsPattern = this.Config.EndBracketsPattern
    const StartUnMarkablePattern = this.Config.StartUnMarkablePattern
    const EndUnMarkablePattern = this.Config.EndUnMarkablePattern

    arrayOfWords.forEach((value, key) => {
      // hack
      value = this.removeEndOfCodeWithDot(value)

      if (value.match(unMarkablePattern)) {
        arrayOfWords[key] = `
                    <unmarkable>
                        ${value.slice(2, -2)}
                    </unmarkable>
                `
      } else if (value.match(StartUnMarkablePattern)) {
        arrayOfWords[key] = `
                    <unmarkable>
                        ${value.slice(2)}                    
                `
      } else if (value.match(EndUnMarkablePattern)) {
        arrayOfWords[key] = `                    
                        ${value.slice(0, -2)}                    
                        </unmarkable>
                `
      }

      // for links
      if (value.match(BracketsPattern)) {
        const nameLink = value.match(BracketsPattern)[1]
        const link = value.match(BracesPattern)[1]
        arrayOfWords[key] = `<a href="${link}">${nameLink}</a>`
      } else if (value.match(StartBracketsPattern)) {
        const nameLink = value.slice(1)
        arrayOfWords[key] = '<a href="">' + nameLink
      } else if (value.match(EndBracketsPattern)) {
        const nameLink = value.match(EndBracketsPattern)[1]
        const link = value.match(BracesPattern)[1]
        arrayOfWords[key] = nameLink + '</a>'
        arrayOfWords.forEach((val, i) => {
          if (val.match(SearchLinkPattern)) {
            arrayOfWords[i] = `<a href="${link}">${val.slice(11)}`
          }
        })
      }

      if (value.match(UnderDashPattern)) {
        const link = value.match(UnderDashPattern)[1]
        arrayOfWords[key] = `<a href="${link}">${link}</a>`
      }

      if (value.match(StrongPattern)) {
        const text = value.match(StrongPattern)[1]
        arrayOfWords[key] = `<strong>${text}</strong>`
      } else if (value.match(StartStrongPattern)) {
        const text = value.slice(2, value.length)
        arrayOfWords[key] = `<strong>${text}`
      } else if (value.match(EndStrongPattern)) {
        const text = value.match(EndStrongPattern)[1]
        arrayOfWords[key] = text + '</strong>'
      }

      if (value.match(CodePattern)) {
        const code = value.match(CodePattern)[1]
        arrayOfWords[key] = `<code>${code}</code>`
      } else if (value.match(StartCodePattern)) {
        const code = value.match(StartCodePattern)[1]
        arrayOfWords[key] = `<code>${code}`
      } else if (value.match(EndCodePattern)) {
        const code = value.match(EndCodePattern)[1]
        arrayOfWords[key] = `${code}</code>`
      }

      if (value.match(ImagesPattern)) {
        const alt = value.match(ImagesPattern)[1]
        const src = value.match(BracesPattern)[1]

        arrayOfWords[key] =
          ` <p>
              <a target="_blank" href="">
                <img src="
                  ${src}" alt="
                  ${alt}">
                </img>
            </p>`
      }
    })

    // console.log(arrayOfWords.join(' '))
    return arrayOfWords.join(' ')
  }

  // some problems when use `example`. in the markable text
  removeEndOfCodeWithDot (value) {
    if (value.slice(-1) === '.' && value.slice(-2, -1) === '`') {
      return value.slice(0, -1)
    } else if (value.slice(-1) === '.' && value.slice(-3, -1) === '**') {
      return value.slice(0, -1)
    } else {
      return value
    }
  }
}
