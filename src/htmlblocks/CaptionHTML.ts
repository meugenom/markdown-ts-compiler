"use strict";
import * as Token from "../Token";

export class CaptionHTML {
  private token: Token.captionToken;

  constructor(token: Token.captionToken) {
    this.token = token;
  }

  public render(): string {
    const tagsList = this.token.tags ? this.token.tags.toString().split(" ") : [];
    
    const tagsBlock = tagsList
      .filter((tag: string) => tag.length > 0)
      .map((tag: string) => 
        `<a href="/tag/${tag}" class="md-caption-tag">${tag}</a>`
      ).join("");

    let clusterBlock = "";
    const validCluster = this.token.cluster && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(this.token.cluster.trim());
    
    if (validCluster && this.token.order !== "0") {
      clusterBlock = `<div class="md-caption-nav-wrapper">
                        <a href="/article/${this.token.cluster.trim()}" class="md-caption-nav-link">-> Return to Main Article</a>
                      </div>`;
    }

    const rawThumbnail = this.token.thumbnail.trim().replace(/['"]/g, "").replace(/^\.?\//, "");
    const hasThumbnail = rawThumbnail.length > 0 && /\.(png|jpg|jpeg|webp)$/i.test(rawThumbnail);

    const thumbnailBlock = hasThumbnail
      ? `<div class="md-caption-image-wrapper">
           <img src="${rawThumbnail}" class="md-caption-image" alt="${this.token.title}"/>
         </div>`
      : "";

    return `
      <div>
        <div class="md-caption">
            ${thumbnailBlock}
            <div class="md-caption-content">
                <h3 class="md-caption-title">${this.token.title}</h3>
                <time class="md-caption-time">${this.token.date}</time> 
                <div class="md-caption-tags-wrapper">${tagsBlock}</div>              
                ${clusterBlock}
            </div>
        </div>
        <hr/>
      </div>`.trim();
  }
}