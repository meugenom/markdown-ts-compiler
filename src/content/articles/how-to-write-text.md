---
date: 2021-08-30
title: 'How to Write Text'
template: post
thumbnail: './thumbnails/writing.png'
slug: how-to-write-text
tags: instruction texter writer
cluster: content-system-updates
order: 1
---

## Formatting syntax

> This is a small guide. "How to write _markdown text_ and get _HTML document_ out". See code on my GitHub: [markable parser](https://github.com/meugenom/markable-to-html)

How to use: write caption block like the example below:

\*
---
date: 2021-08-30
title: 'Instruction to Write Text'
template: post
thumbnail: './thumbnails/writing.png'
slug: instruction-to-write-text
categories: instruction writer texter
tags: instruction texter writer
cluster: how-to-write-text
order: 0
---
\*

## Headings

How to use:

\*
# The h1 _heading_
## The h2 [[heading:green]]
### The h3 heading $a^2 + b^2 = c^2$
#### The h4 [[heading:yellow]]
##### The h5 [[heading::pink]]
\*

# The h1 _heading_
## The h2 [[heading:green]]
### The h3 heading $a^2 + b^2 = c^2$
#### The h4 [[heading:yellow]]
##### The h5 [[heading::pink]]

## Styling bold text

How to use: This word is \* **strong** and **unknown for me** \*
in out: This word is **strong** and **unknown for me**.

## Formulas Inline

\*
Pythagoras Theorem $a^2 + b^2 = c^2$ in the text
\*

Pythagoras Theorem $a^2 + b^2 = c^2$ in the text


## Formulas in the Block

\*
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}\quad \text{(1.0)}
$$
\*

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}\quad \text{(1.0)}
$$


## Code Block:

\*		
```javascript
  	let getMin = async (min)=> {
		return `
    		minimal value is ${min}
    	`
	}
```
\* 

```javascript
	let getMin = async (min)=> {
		return `
    		minimal value is ${min}
    		`
	}
```

## Code In Code Block

\*
	````bash
		```javascript
			let getMin = async (min)=> {
				return `
					minimal value is ${min}
					`
			}
		```
	````
\*


````bash
	```javascript
		let getMin = async (min)=> {
			return `
				minimal value is ${min}
				`
		}
	```
````

## Code Inline

\*
    `test is a one of more other options`
\* 

in out:
`test is a one of more other options`

## Lists

\*
	List 1 :
	  - the formula $a^2 + b^2 = c^2$
	  - the `code inline`
	  - _the underdashed text_

	List 2 :
	  [] the formula $a^2 + b^2 = c^2$
	  [] the `code inline`
	  [] [[the underdashed text:yellow]]

	List  simple 3:
	  [x] the formula $a^2 + b^2 = c^2$
	  [x] the `code inline`
	  [x] [[the underdashed text:pink]]

	List 4 with mixed attributes:
	   - the formula $a^2 + b^2 = c^2$
	  [] the the `code inline`
	  [x] [[the underdashed text:purple]]

\*

in out:

List 1:
	- the formula $a^2 + b^2 = c^2$
	- the `code inline`
	- _the underdashed text_

List 2:
	[] the formula $a^2 + b^2 = c^2$
	[] the `code inline`
	[] [[the underdashed text:yellow]]

List 3:
	[x] the formula $a^2 + b^2 = c^2$
	[x] the `code inline`
	[x] [[the underdashed text:pink]]

List 4 with mixed attributes:
	- the formula $a^2 + b^2 = c^2$
	[] the `code inline`
	[x] [[the underdashed text:purple]]


## Table

\*
| Name | **Age** | $a^2 + b^2 = c^2$ | [[Town:yellow]] | $a^2 + b^2 = c^2$ |
|---|---|---|---|---|
| Bob | 17 | BMW | Baku | Fish |
| John | _52_ | **Fiat** | $a^2 + b^2 = c^2$ | Dog |
| **Lisa** | 32 | _Toyota_ | Frankfurt | [[Snake:pink]] |
| Eugen | _45_ | Mazda | **Dresden** | $a^2 + b^2 = c^2$ | 
\*


| Name | **Age** | $a^2 + b^2 = c^2$ | [[Town:yellow]] | $a^2 + b^2 = c^2$ |
|---|---|---|---|---|
| Bob | 17 | BMW | Baku | Fish |
| John | _52_ | **Fiat** | $a^2 + b^2 = c^2$ | Dog |
| **Lisa** | 32 | _Toyota_ | Frankfurt | [[Snake:pink]] |
| Eugen | _45_ | Mazda | **Dresden** | $a^2 + b^2 = c^2$ |


## Quoting text

\*
    > This is a
	> quoting text
\* 

in out:

> This is a
> quoting text

## Links

You can create an inline link by wrapping link text in brackets, and then wrapping the URL in parentheses:

\*
	This site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript)  and it's an example.
\* 

in out:

This site was built using [Javascript ES6](https://en.wikipedia.org/wiki/ECMAScript) and it's an example.


## Simple Underline decoration

\* _underdash_ \*

in out:

_underdash_

## Color Underline decoration

\*
	[[Blue:blue]] color
	[[Gray:gray]] color
	[[Red:red]] color
	[[Green:green]] color
	[[Yellow:yellow]] color
	[[Indigo:indigo]] color 
	[[Purple:purple]] color
	[[Pink:pink]] color
\*

in out:

[[Lorem ipsum:green]] [[Lorem ipsum:indigo]] [[dolor:red]] [[sit:purple]] [[amet:pink]] [[consectetur:yellow]] [[adipisicing:blue]] [[elit@test:pink]]

## Color Badges

\*
	[[Blue::blue color]]
	[[Gray::gray color]]
	[[Red::red color]]
	[[Green::green color]]
	[[Yellow::yellow color]]
	[[Indigo::indigo color]]
	[[Purple::purple color]]
	[[Pink::pink color]]
\* 

in out:

[[Lorem ipsum::green]] [[Lorem ipsum::indigo]] [[dolor::red]] [[sit::purple]] [[amet::pink]] [[consectetur::yellow]] [[adipisicing::blue]] [[elit@test:pink]]

## Ignoring Markdown formatting

You can ignore (or escape) Markdown formatting by wrapping a block with a backslash-asterisk on its own line before and after the content.

in out:

\* this **all** text is ### unmarkable \*

## Images

\* ![Github_image](./images/github.png) \*

in out:

This is an 
![Github image](./images/github.png)
