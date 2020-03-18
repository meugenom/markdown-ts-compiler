'use strict'
/**
 * Returns key from localStorage
 * @param key, value
 * @return value by key from localStorage
 */

export class LocalStorage {
  constructor () {
    this.LocalStorage = localStorage
  }

  set (key, value) {
    this.LocalStorage.setItem(key, value)
  }

  get (key) {
    return this.LocalStorage.getItem(key)
  }
}
