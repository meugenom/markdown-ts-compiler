"use strict";
import Config from "./Config.js";

export class Word {
  constructor() {
    this.codeBlockTrigger = false;
    this.infoAboutPostTrigger = false;
    this.infoAboutPost = {};
    this.Config = Config;
    this.datePattern = this.Config.datePattern;
    this.titlePattern = this.Config.titlePattern;
    this.templatePattern = this.Config.templatePattern;
    this.thumbnailPattern = this.Config.thumbnailPattern;
    this.slugPattern = this.Config.slugPattern;
    this.tagsPattern = this.Config.tagsPattern;
    this.categoriesPattern = this.Config.categoriesPattern;
  }

  setParagraph(line) {
    if (line != "") {
      let html = this.createElement("p");
      line = this.parseWords(line);

      html.innerHTML = line;
      return html;
    }
  }

  setHeadLine(line, headline) {
    let html = this.createElement(headline);
    html.innerHTML = line;
    return html;
  }

  setCodeBlock(line) {
    if (!this.codeBlockTrigger) {
      //new row in the block and type of language
      let preHTML = this.createElement("pre");
      preHTML.className = "language-" + line.slice(3);
      let codeHTML = this.createElement("code");
      preHTML.appendChild(codeHTML);
      this.codeBlockTrigger = true;

      return preHTML;
    } else {
      if (line.substring(0, 3) === "```") {
        //end block
        this.codeBlockTrigger = false;
      } else {
        //repeat new row in the block
        let codeblock = this.getLastNode().lastChild;
        line = line + "\n";
        codeblock.innerHTML = codeblock.innerHTML + line;
      }
    }
  }

  setUnMarkableText(line) {
    let unMarkableText = this.createElement("unmarkable");
    line = line.slice(2);
    unMarkableText.innerHTML = `<p>${line}</p>`;
    return unMarkableText;
  }

  setInfoAboutPost(line) {
    if (!this.infoAboutPostTrigger) {
      this.infoAboutPostTrigger = true;
      this.infoAboutPost = {};
    } else {
      if (line.substring(0, 3) === "---") {
        //end block
        this.infoAboutPostTrigger = false;

        let titlePost = this.infoAboutPost.title.slice(2, -1);
        let linkPost = this.infoAboutPost.thumbnail;
        let timePost = this.infoAboutPost.date;
        let tagsPost = this.infoAboutPost.tags;
        let tags = tagsPost.split(" ");
        tags.shift();

        let headerPostView = 
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
                `;

        let headerPostNode = this.createElement("header");
        headerPostNode.className = "single-header";
        headerPostNode.innerHTML = headerPostView;

        return headerPostNode;
      } else {
        if (line.match(this.datePattern)) {
          this.infoAboutPost.date = line.match(this.datePattern)[1];
        }

        if (line.match(this.titlePattern)) {
          this.infoAboutPost.title = line.match(this.titlePattern)[1];
        }

        if (line.match(this.templatePattern)) {
          this.infoAboutPost.template = line.match(this.templatePattern)[1];
        }

        if (line.match(this.thumbnailPattern)) {
          this.infoAboutPost.thumbnail = line.match(this.thumbnailPattern)[1];
        }

        if (line.match(this.slugPattern)) {
          this.infoAboutPost.slug = line.match(this.slugPattern)[1];
        }

        if (line.match(this.categoriesPattern)) {
          this.infoAboutPost.categories = line.match(this.categoriesPattern)[1];
        }

        if (line.match(this.tagsPattern)) {
          this.infoAboutPost.tags = line.match(this.tagsPattern)[1];
        }
      }
    }
  }

  setBlockquote(line) {
    if (this.getLastNodeName() == "BLOCKQUOTE") {
      //adding to existing quote
      let lastQuote = this.getLastNode();
      lastQuote.innerHTML = `<p>${lastQuote.innerHTML}</p> ${line}`;
    } else {
      //creating new list
      let blockquote = this.createElement("BLOCKQUOTE");
      blockquote.innerHTML = line;
      return blockquote;
    }
  }

  setList(line) {
    line = this.parseWords(line);

    let li_html = this.createElement("LI");
    li_html.innerHTML = line;

    if (this.getLastNodeName() == "UL") {
      //adding to existing list
      let ul_html = this.getLastNode();
      ul_html.appendChild(li_html);
    } else {
      //creating new list
      let ul_html = this.createElement("UL");
      ul_html.appendChild(li_html);
      return ul_html;
    }
  }

  parseWords(line) {
    let arrayOfWords = this.getWords(line);

    //for one word
    const ImagesPattern = this.Config.ImagesPattern;
    const BracketsPattern = this.Config.BracketsPattern;
    const BracesPattern = this.Config.BracesPattern;
    const UnderDashPattern = this.Config.UnderDashPattern;
    const StrongPattern = this.Config.StrongPattern;
    const CodePattern = this.Config.CodePattern;
    const SearchLinkPattern = this.Config.SearchLinkPattern;
    const unMarkablePattern = this.Config.UnMarkablePattern;

    //for several words
    const StartCodePattern = this.Config.StartCodePattern;
    const EndCodePattern = this.Config.EndCodePattern;
    const StartStrongPattern = this.Config.StartCodePattern;
    const EndStrongPattern = this.Config.EndStrongPattern;
    const StartBracketsPattern = this.Config.StartBracketsPattern;
    const EndBracketsPattern = this.Config.EndBracketsPattern;
    const StartUnMarkablePattern = this.Config.StartUnMarkablePattern;
    const EndUnMarkablePattern = this.Config.EndUnMarkablePattern;

    arrayOfWords.forEach((value, key) => {
      //hack
      value = this.removeEndOfCodeWithDot(value);

      if (value.match(unMarkablePattern)) {
        arrayOfWords[key] = `
                    <unmarkable>
                        ${value.slice(2, -2)}
                    </unmarkable>
                `;
      } else if (value.match(StartUnMarkablePattern)) {
        arrayOfWords[key] = `
                    <unmarkable>
                        ${value.slice(2)}                    
                `;
      } else if (value.match(EndUnMarkablePattern)) {
        arrayOfWords[key] = `                    
                        ${value.slice(0, -2)}                    
                        </unmarkable>
                `;
      }

      // for links
      if (value.match(BracketsPattern)) {
        let nameLink = value.match(BracketsPattern)[1];
        let link = value.match(BracesPattern)[1];
        arrayOfWords[key] = `<a href="${link}">${nameLink}</a>`;
      } else if (value.match(StartBracketsPattern)) {
        let nameLink = value.slice(1);
        arrayOfWords[key] = '<a href="">' + nameLink;
      } else if (value.match(EndBracketsPattern)) {
        let nameLink = value.match(EndBracketsPattern)[1];
        let link = value.match(BracesPattern)[1];
        arrayOfWords[key] = nameLink + "</a>";
        arrayOfWords.forEach((val, i) => {
          if (val.match(SearchLinkPattern)) {
            arrayOfWords[i] = `<a href="${link}">${val.slice(11)}`;
          }
        });
      }

      if (value.match(UnderDashPattern)) {
        let link = value.match(UnderDashPattern)[1];
        arrayOfWords[key] = `<a href="${link}">${link}</a>`;
      }

      if (value.match(StrongPattern)) {
        let text = value.match(StrongPattern)[1];
        arrayOfWords[key] = `<strong>${text}</strong>`;
      } else if (value.match(StartStrongPattern)) {
        let text = value.slice(2, value.length);
        arrayOfWords[key] = `<strong>${text}`;
      } else if (value.match(EndStrongPattern)) {
        let text = value.match(EndStrongPattern)[1];
        arrayOfWords[key] = text + `</strong>`;
      }

      if (value.match(CodePattern)) {
        let code = value.match(CodePattern)[1];
        arrayOfWords[key] = `<code>${code}</code>`;
      } else if (value.match(StartCodePattern)) {
        let code = value.match(StartCodePattern)[1];
        arrayOfWords[key] = `<code>${code}`;
      } else if (value.match(EndCodePattern)) {
        let code = value.match(EndCodePattern)[1];
        arrayOfWords[key] = `${code}</code>`;
      }

      if (value.match(ImagesPattern)) {
        let alt = value.match(ImagesPattern)[1];
        let src = value.match(BracesPattern)[1];
        
        arrayOfWords[key] =
          ` <p>
              <a target="_blank" href="">
                <img src="
                  ${src}" alt="
                  ${alt}">
                </img>
            </p>`;
      }
    });

    //console.log(arrayOfWords.join(' '))
    return arrayOfWords.join(" ");
  }

  getWords(line) {
    return line.split(this.Config.separator.newSpace);
  }

  getLastNode() {
    let lastChild = this.getRoot();
    return lastChild.lastChild;
  }

  getLastNodeName() {
    let lastChild = this.getRoot();
    return lastChild.lastChild.nodeName;
  }

  getRoot() {
    return document.querySelector("article");
  }

  createElement(element) {
    return document.createElement(element);
  }

  //some problems when use `example`. in the markable text
  removeEndOfCodeWithDot(value) {
    if (value.slice(-1) === "." && value.slice(-2, -1) === "`") {
      return value.slice(0, -1);
    } else if (value.slice(-1) === "." && value.slice(-3, -1) === "**") {
      return value.slice(0, -1);
    } else {
      return value;
    }
  }
}