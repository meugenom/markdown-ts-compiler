"use strict";
import * as Token from "../Token";

/**
 * Returns an HTML string for a caption block
 * @param token block
 * @return HTML string for the caption block
 */

export class CaptionHTML {
  private token: Token.captionToken;

  constructor(token: Token.captionToken) {
    this.token = token;
  }

  public render(): string {
    // Block for tags
    const tagsList = this.token.tags
      ? this.token.tags.toString().split(" ")
      : [];
    const tagsBlock = tagsList
      .filter((tag: string) => tag.length > 0)
      .map((tag: string) =>
        `
                <a navigateLinkTo="/tag/${tag}" href="/tag/${tag}" class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-orange-400 hover:bg-orange-600 last:mr-0 mr-1">
                    ${tag}
                </a>
            `.trim(),
      )
      .join("");

    // 2. Block for cluster navigation (if applicable)
    let clusterBlock = "";
    const validCluster =
      this.token.cluster &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(this.token.cluster.trim());
    if (validCluster) {
      const cluster = this.token.cluster.trim();
      clusterBlock = `
                <a navigateLinkTo="/article/${cluster}" href="/article/${cluster}" class="text-xs font-semibold inline-block py-1 px-2 rounded text-white bg-gray-400 hover:bg-gray-600 uppercase last:mr-0 mr-1">
                    -> Return to Main Article 
                </a>
            `.trim();
    }

    // 3. Block for thumbnail (if applicable)
    const rawThumbnail = this.token.thumbnail
      .trim()
      .replace(/['"]/g, "")
      .replace(/^\.?\//, "");
    const hasThumbnail =
      rawThumbnail.length > 0 && /\.(png|jpg|jpeg|webp)$/i.test(rawThumbnail);

    const thumbnailBlock = hasThumbnail
      ? `<div class="flex-none">
                <img src="${rawThumbnail}" class="float-left object-contain h-64 w-full max-w-xs" alt="${this.token.title}"/>
               </div>`
      : "";

    // 4. Check if the cluster section should be displayed based on the order and valid cluster
    const clusterSection =
      this.token.order !== "0" && validCluster
        ? `<div class="mt-2 py-1">${clusterBlock}</div>`
        : "";

    // 5. Final caption block assembly
    const captionBlock = `
<div class="flex flex-col md:flex-row gap-6">
    ${thumbnailBlock}
    <div class="flex-auto justify-start">
        <h3 class="text-3xl font-sans font-semibold leading-tight mt-0 mb-2">
            ${this.token.title}
        </h3>
        <time class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400 last:mr-0 mr-1">
            ${this.token.date}
        </time> 
        <div class="tag-container mt-3 py-1">
            ${tagsBlock}
        </div>              
        ${clusterSection}
    </div>
</div>
<hr/>
        `.trim();

    // Return the final caption block wrapped in a div
    return `<div>${captionBlock}</div>`;
  }
}
