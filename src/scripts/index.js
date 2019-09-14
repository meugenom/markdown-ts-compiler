"use strict";
import { View } from "./parser/View.js";
import Language from "./parser/Language.js";

//import markable text to parse 
import text from "../../content/posts/instruction-to-write-text.md";

// Import PrismJS package
import Prism from "prismjs";

let markableToHtml = new View(text);
markableToHtml.render();

// Highlight all matching syntax
Prism.highlightAll();

//set languages
Language.setLanguage();
