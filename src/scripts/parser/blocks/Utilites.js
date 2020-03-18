'use strict'
import Config from '../Config'

export default class Utilites {
  constructor (line) {
    this.line = line
    this.Config = Config
  }

  getWordsArrayFromLine () {
    return this.line.split(this.Config.separator.newSpace)
  }
}
