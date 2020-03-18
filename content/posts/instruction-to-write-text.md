---
date: 2019-08-30
title: 'Instruction to Write Text'
template: post
thumbnail: './thumbnails/writing.png'
slug: instruction-to-write-text
categories: 
tags: instruction texter writer 
---

Этот текст как памятка для написания статей в любом редакторе для [markable parser](https://github.com/eugenemdev/markable-to-html), который помогает преобразовать markable text в удобный вид html. @ru

This text was prepared as instruction to write texts in any editor for [markable parser](https://github.com/eugenemdev/markable-to-html), that helps to convert markable text to more relevant html document. @en

Der Text wurde speziel als Instruktion vorbereitet, den auf jedem Editor möglich schreiben zu können. Und mit Hilfe des Parsers [markable parser](https://github.com/eugenemdev/markable-to-html) kann man den Text zu nutzfreundliches HTML umwandeln. @de

## Formatting Syntax

### About Article
```bash
1  ---
2  date: 2019-08-30
3  title: 'Instruction to Write Text'
4  template: post
5  thumbnail: './thumbnails/writing.png'
6  slug: instruction-to-write-text
7  categories: 
8  tags: instruction texter writer 
9  ---
```

### Headings
```bash
1  # The h1 heading
2  ## The h2 heading
3  ### The h3 heading
4  #### The h4 heading
5  ##### The h5 heading
```

### Styling text
Use `**bold**`
in out: 
**bold**

### Code 
For code visualisation:
```bash
    ```javascript
    let getMin = async (min)=> {
    return `
        minimal value is ${min}
        `
    }
    ```
``` 
and in out:
```javascript
    let getMin = async (min)=> {
    return `
        minimal value is ${min}
        `
    }
```

```bash
    `test` - test option
```
in out: 
`test` - test option

### Lists
```bash
    - select point 1
    - select point 2
```

in out:
- select point 1
- select point 2

### Quoting text

```bash   
    &gt Promise me you’ll always remember: You’re braver than you believe, and stronger than you seem, and smarter than you think.
    &gt &ltcite&gt - A.A.Milne&lt/cite&gt    
```
in out:
> Promise me you’ll always remember: You’re braver than you believe, and stronger than you seem, and smarter than you think.
> <cite> - A.A.Milne</cite>

### Links 
You can create an inline link by wrapping link text in brackets, and then wrapping the URL in parentheses: 

```bash
This site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript#ES2015).
```

in out: 
This site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript#ES2015)

### Underdash line for links
```bash
    _https://google.de_
```
in out:
_https://google.de_

### Ignoring Markdown formatting

You can tell GitHub to ignore (or escape) Markdown formatting by using \ before the Markdown character.

```bash
\* this all text is ### unmarkable
this is \*unmarkable\* text
About \*this >Quote\*
```
in out;
\* this all text is ### unmarkable
this is \*test\* text
About \*this >Quote\*

### Languages
```terminal
    in the end for each paragraph use @en, @de or @ru
    by default @all 
```

### Images
```bash
    ![Github_image](./images/github.png)
```
in out:
![Github_image](./images/github.png)