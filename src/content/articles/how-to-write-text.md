---
date: 2019-08-30
title: 'How to Write Text'
template: post
thumbnail: './thumbnails/writing.png'
slug: how-to-write-text
categories: helping to write text
tags: instruction texter writer
---

## Formatting syntax

This is a small guide. "How to write markdown text and get HTML document out". See code on my GitHub: [markable parser](https://github.com/meugenom/markable-to-html)

## Caption Block about article

How to use: write caption block like the example below:
<br/>
\*
---
date: 2019-08-30
title: 'Instruction to Write Text'
template: post
thumbnail: './thumbnails/writing.png'
slug: instruction-to-write-text
categories: 
tags: instruction texter writer 
---
\*

## Headings

How to use:
\*
# The h1 heading
## The h2 heading
### The h3 heading
#### The h4 heading
##### The h5 heading
\* 
<br/>
# The h1 heading
## The h2 heading
### The h3 heading
#### The h4 heading
##### The h5 heading

## Styling bold text

How to use: This word is \* **strong** and **unknown for me** \*
in out: This word is **strong** and **unknown for me**.

## Code Block: 

\*		
```bash
  	let getMin = async (min)=> {
		return `
    		minimal value is ${min}
    	`
	}‚
```
\* 

```bash
	let getMin = async (min)=> {
		return `
    		minimal value is ${min}
    		`
	}
```

## Code In Code Block

\*
	```bash
		```javascript
			let getMin = async (min)=> {
				return `
					minimal value is ${min}
					`
			}
		```
	```
\*

```bash
	```javascript
		let getMin = async (min)=> {
			return `
				minimal value is ${min}
				`
		}
	```
```

## Code Inline

\*
    `test is a one of more other options`
\* 

in out:
`test is a one of more other options`

## Lists

\*
	List 1 :
	  - one
	  - two
	  - three and more

	List 2 :
	  [] one
	  [] two
	  [] three and more

	List  simple 3:
	  [x] one
	  [x] two
	  [x] three and more

	List 4 with mixed attributes:
	   - one
	  [] two
	  [x] three and more

\*
<br/>
in out:
<br/>
List 1:
	- one
	- two
	- three and more
<br/>
List 2:
	[] one
	[] two
	[] three and more
<br/>
List 3:
	[x] one
	[x] two
	[x] three and more
<br/>
List 4 with mixed attributes:
	- one
	[] two
	[x] three and more


## Table

\*
| Name | Age | Auto | Town | Pet |
| Bob | 17 | BMW | Baku | Fish |
| John | 52 | Fiat | Berlin | Dog |
| Lisa | 32 | Toyota | Frankfurt | Snake |
| Eugen | 45 | Mazda | Dresden | Cat | 
\*

<br/>

| Name | Age | Auto | Town | Pet |
| Bob | 17 | BMW | Baku | Fish |
| John | 52 | Fiat | Berlin | Dog |
| Lisa | 32 | Toyota | Frankfurt | Snake |
| Eugen | 45 | Mazda | Dresden | Cat |


## Quoting text

\*
    > Quote
    > <cite> - Author </cite>
\* 

in out:

> Example Quote
> <cite> - Albert Rouge </cite>

## Links

You can create an inline link by wrapping link text in brackets, and then wrapping the URL in parentheses:

\*
	This site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript)  and it's an example.
\* 

in out:

This site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript) and it's an example.

[How to define types for process environment](https://meugenom.com/#/article/how-to-define-types-for-process-environment)


## Simple Underline decoration

/* _underdash_ /*

in out:

_underdash_

## Color Underline decoration

\*
	Blue.blue color
	Gray.gray color
	Red.red color
	Green.green color
	Yellow.yellow color
	Indigo.indigo color 
	Purple.purple color
	Pink.pink color
\*

in out:

Lorem.green ipsum.indigo dolor.red sit amet.purple , consectetur.pink adipisicing.yellow elit. 

## Color Badges

\*
	Blue@blue color
	Gray@gray color
	Red@red color
	Green@green color
	Yellow@yellow color
	Indigo@indigo color 
	Purple@purple color
	Pink@pink color
\* 

in out:

Lorem@green ipsum@indigo dolor@red sit amet@purple , consectetur@pink adipisicing@yellow elit.

## Ignoring Markdown formatting

You can ignore (or escape) Markdown formatting:
<br/>
\* this **all*** text is ### unmarkable \*
this is \* unmarkable \* text
About \* this >Quote \*

## Images

\* ![Github_image](./images/github.png) \*

in out:

This is an ![Github image](./images/github.png)
