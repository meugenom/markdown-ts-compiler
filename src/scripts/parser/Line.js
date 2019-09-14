"use strict";
import Config from "./Config.js";
import { Word } from "./Word.js";

export class Line extends Word {
  constructor() {
    super();
    this.Config = Config;
    this.output = "";
    this.arrayOfStrings = [];
    this.codeBlockTrigger = super.codeBlockTrigger;
    this.infoAboutPostTrigger = super.infoAboutPostTrigger;
  }

  parse(line) {
    let arrayOfWords = line.split(this.Config.separator.newSpace);

    if (this.codeBlockTrigger) {
      return this.setCodeBlock(line);
    } else if (this.infoAboutPostTrigger) {
      return this.setInfoAboutPost(line);
    } else {
      return arrayOfWords[0] === "#####"
        ? this.setHeadLine(line.slice(5), "h5")
        : arrayOfWords[0] === "####"
        ? this.setHeadLine(line.slice(4), "h4")
        : arrayOfWords[0] === "###"
        ? this.setHeadLine(line.slice(3), "h3")
        : arrayOfWords[0] === "##"
        ? this.setHeadLine(line.slice(2), "h2")
        : arrayOfWords[0] === "#"
        ? this.setHeadLine(line.slice(1), "h1")
        : arrayOfWords[0].substring(0, 3) === "---"
        ? this.setInfoAboutPost(line)
        : arrayOfWords[0] === "-"
        ? this.setList(line.slice(1))
        : arrayOfWords[0] === ">"
        ? this.setBlockquote(line.slice(1))
        : arrayOfWords[0].substring(0, 3) === "```"
        ? this.setCodeBlock(line)
        : arrayOfWords[0].substring(0, 2) === "\\*"
        ? this.setUnMarkableText(line)
        : this.setParagraph(line); //false variant
    }
  }

  splitString(stringToSplit, separator) {
    this.arrayOfStrings = stringToSplit.split(separator);
    return this.arrayOfStrings;
  }

  ltrim(line) {
    if (line == null) return line;
    return line.replace(/^\s+/g, "");
  }
}
