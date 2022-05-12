---
date: 2019-08-30
title: 'How to Write Text'
template: post
thumbnail: './thumbnails/writing.png'
slug: how-to-write-text
categories: helping to write text
tags: instruction texter writer
---

### Formatting syntax

This example is a small guide. "How to write markdown text and get HTML document out". See code on my GitHub: [markable parser](https://github.com/meugenom/markable-to-html)

### Caption

How to use: write this block like the example below

```bash
1  ---
2  date: 2019-08-30
3  title: 'Instruction to Write Text'
4  template: post
5  thumbnail: '../thumbnails/writing.png'
6  slug: instruction-to-write-text
7  categories: 
8  tags: instruction texter writer 
9  ---
```

### Headings

How to use:
```bash
1  # The h1 heading
2  ## The h2 heading
3  ### The h3 heading
4  #### The h4 heading
5  ##### The h5 heading
```

### Strong text

How to use: This word is `**strong**`

in out:
This word is **strong**

### Code Block

```bash
	```javascript
    let getMin = async (min)=> {
    return `
        minimal value is ${min}
        `
    }
	```
```
in out:

```javascript
    let getMin = async (min)=> {
    return `
        minimal value is ${min}
        `
    }
```

### Code Inline

```bash
    `test` - test option
```

in out:
`test` - test option

### Lists

```bash
	- select point 1
	[] select point 2
	[x] select point 3
```

in out:

- select point 1
[] select point 2
[x] select point 3

### Quoting text

```bash
    > Quote
    > <cite> - Author </cite>
```

in out:
> Example Quote
> <cite> - Albert Rouge </cite>

### Links

You can create an inline link by wrapping link text in brackets, and then wrapping the URL in parentheses:

```bash
	This site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript#ES2015)  and it's an example.
```

in out:
This site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript#ES2015) and it's an example.

### Underdash word

```bash
    _underdash_
```

in out:

_underdash_

### Ignoring Markdown formatting

You can ignore (or escape) Markdown formatting:

```bash
\* this all text is ### unmarkable\*
this is \*unmarkable\* text
About \*this >Quote\*
```

in out:
\* this all text is ### unmarkable\*
this is \*unmarkable\* text
About \*this >Quote\*

### Images

```bash
    ![Github_image](../images/github.png)
```

in out:

![Github image](../images/github.png)
