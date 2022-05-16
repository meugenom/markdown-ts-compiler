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
	- list disc
	[] list unchecked disable
	[x] list checked disable
```

in out:

 - list disc
[] list unchecked disable
[x] list checked disable

### Table

```bash
| Name | Age | Auto | Town | Pet |
| Bob | 17 | BMW | Baku | Fish |
| John | 52 | Fiat | Berlin | Dog |
| Lisa | 32 | Toyota | Frankfurt | Snake |
| Eugen | 45 | Mazda | Dresden | Cat |
```


| Name | Age | Auto | Town | Pet |
| Bob | 17 | BMW | Baku | Fish |
| John | 52 | Fiat | Berlin | Dog |
| Lisa | 32 | Toyota | Frankfurt | Snake |
| Eugen | 45 | Mazda | Dresden | Cat |


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

### Simple Underline decoration

```bash
    _underdash_
```

in out:

_underdash_

### Color Underline decoration

```bash
	Blue.blue color
	Gray.gray color
	Red.red color
	Green.green color
	Yellow.yellow color
	Indigo.indigo color 
	Purple.purple color
	Pink.pink color
```
in out:

Blue.blue color
Gray.gray color
Red.red color
Green.green color
Yellow.yellow color
Indigo.indigo color 
Purple.purple color
Pink.pink color

### Color Badges

```bash
	Blue@blue color
	Gray@gray color
	Red@red color
	Green@green color
	Yellow@yellow color
	Indigo@indigo color 
	Purple@purple color
	Pink@pink color
```
in out:

Blue@blue color
Gray@gray color
Red@red color
Green@green color
Yellow@yellow color
Indigo@indigo color 
Purple@purple color
Pink@pink color

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
    ![Github_image](./images/github.png)
```

in out:

![Github image](./images/github.png)
