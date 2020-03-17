'use strict'
import DomUtilites from './DomUtilites'
import { LocalStorage } from './LocalStorage'
import Config from '../Config'

/**
 * Returns an html block for head of chapter
 * @param line as block of the text
 * @return dom element for info about article
 */

export class InfoAboutPost {
  constructor () {
    this.LocalStorage = new LocalStorage()
    this.DomUtilites = new DomUtilites()
    this.infoAboutPost = {}
    this.Config = Config

    this.datePattern = this.Config.datePattern
    this.titlePattern = this.Config.titlePattern
    this.templatePattern = this.Config.templatePattern
    this.thumbnailPattern = this.Config.thumbnailPattern
    this.slugPattern = this.Config.slugPattern
    this.tagsPattern = this.Config.tagsPattern
    this.categoriesPattern = this.Config.categoriesPattern

    this.infoAboutPost = {}
  }

  render (line) {
    if (this.LocalStorage.get('isInfoAboutPost') === 'false') {
      this.infoAboutPost = {}
      this.LocalStorage.set('isInfoAboutPost', true)
    } else {
      if (line.substring(0, 3) === '---') {
        // end block
        this.LocalStorage.set('isInfoAboutPost', false)

        const titlePost = this.infoAboutPost.title.slice(2, -1)
        const linkPost = this.infoAboutPost.thumbnail
        const timePost = this.infoAboutPost.date
        const tagsPost = this.infoAboutPost.tags
        const tags = tagsPost.split(' ')
        tags.shift()

        const headerPostView =
          `
            <div class="image-wrapper">
              <img src="${linkPost.slice(2, -1)}"/>    
                </div>                                
                  <div class="flex">
                    <h1>${titlePost}</h1>
                      <div class="post-meta">
                        <time class="date">
                          ${timePost}
                        </time>
                      </div>
                      <div class="tag-container">
                        ${tags.map(
                          tag => `<a href="/tags/${tag}">${tag}</a>`
                        )}
                      </div>
                  </div>
                  <div class="language">
                    <a id="englishSelector">En</a> |
                    <a id="germanSelector">De</a> |
                    <a id="russianSelector">Ru</a>
                  </div>    
                  `

        const headerPostNode = this.DomUtilites.createElement('header')
        headerPostNode.className = 'single-header'
        headerPostNode.innerHTML = headerPostView

        return headerPostNode
      } else {
        if (line.match(this.datePattern)) {
          this.infoAboutPost.date = line.match(this.datePattern)[1]
        }

        if (line.match(this.titlePattern)) {
          this.infoAboutPost.title = line.match(this.titlePattern)[1]
        }

        if (line.match(this.templatePattern)) {
          this.infoAboutPost.template = line.match(this.templatePattern)[1]
        }

        if (line.match(this.thumbnailPattern)) {
          this.infoAboutPost.thumbnail = line.match(this.thumbnailPattern)[1]
        }

        if (line.match(this.slugPattern)) {
          this.infoAboutPost.slug = line.match(this.slugPattern)[1]
        }

        if (line.match(this.categoriesPattern)) {
          this.infoAboutPost.categories = line.match(this.categoriesPattern)[1]
        }

        if (line.match(this.tagsPattern)) {
          this.infoAboutPost.tags = line.match(this.tagsPattern)[1]
        }
      }
    }
  }
}
