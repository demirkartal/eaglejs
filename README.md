# EagleJS

EagleJS is a jQuery-Like DOM manipulation class for modern browsers

- Hand-coded with EcmaScript 6 and Modern DOM functions
- Subclass of Array for better collection management
- Supports CSS3 selectors
- [JavaScript Standard Style](https://standardjs.com "JavaScript Standard Style") codes
- Documented with [JSDoc](https://jsdoc.app "JSDoc")

## Usage

### Classic Style

Download script file and include on top of other script which require EagleJS.

```html
<script src="eaglejs.min.js"></script>
<script>
$(document).ready(function () {
  // Call when DOM is loaded
});
</script>
```

### ES6 Module

```js
import $ from "eaglejs.module.js";

$(document).ready(function () {
  // Call when DOM is loaded
});
```

## Browser Support

### Desktop (Last two major versions)
- Chrome
- Edge
- Firefox
- Safari 10.1+

### Mobile (Latest versions)
- Chrome
- Firefox
- iOS Safari 10.3+

### Detailed View on Browser Support
- Minimum required versions do not mean tested versions.
- Partially requirements do not affect the main functions.

| Required Features                                     |    Use by    |            Partially Use by            |  Edge  | Firefox | Chrome | Safari | iOS Safari |
|-------------------------------------------------------|:------------:|:--------------------------------------:|:------:|:-------:|:------:|:------:|:----------:|
| EcmaScript 2015 (ES6)                                 |    EagleJS   |                    -                   |   15   |    54   |   51   |   10   |     10     |
| EcmaScript 2016 (ES7)<br>- Array.prototype.includes() |    EagleJS   |                    -                   |   14   |    43   |   47   |    9   |      9     |
| addEventListener()<br>- options.once parameter        |     one()    |           on() options param           |   16   |    50   |   55   |   10   |     10     |
| querySelectorAll()<br>- :scope selector               |       -      | Selectors starts<br>with “>", "+", "~" | 79 [1] |    32   |   27   |    7   |      7     |
| **Minimum Required Versions**                         |              |                                        | **16** |  **54** | **55** | **10** |   **10**   |

*Source: [MDN Web Docs](https://developer.mozilla.org/), [www.caniuse.com](https://caniuse.com/)*

[1] Polyfill for querySelectorAll() :scope selector 

```html
<script src="https://cdn.jsdelivr.net/npm/element-qsa-scope@1.1.0/index.js"></script>
```

## Documentation

- You can find documents on [https://eagleframework.github.io/EagleJS/](https://eagleframework.github.io/EagleJS/).
- You can read from javascript file.
- IDE which supports JSDOC can help dynamically by code. Like;
  - Apache NetBeans IDE
  - Visual Studio Code

### Class Map

```js
class EagleJS extends Array {
	constructor(selector?: string | Node | Node[], context?: string | Node | Node[]): EagleJS

	/* Members */
	static const prototype fn

	/* Methods Static */
	static isDocument(value: any): boolean
	static isElement(value: any): boolean
	static normalizeSelector(selector: any): string

	/* Methods */
	addClass(name: string): EagleJS
	after(content: string | Node | Node[]): EagleJS
	append(content: string | Node | Node[]): EagleJS
	appendTo(target: string | Node | Node[]): EagleJS
	attr(name: string, value?: any): string | EagleJS
	before(content: string | Node | Node[]): EagleJS
	children(selector?: string | Function | Node | Node[]): EagleJS
	clone(deep?: boolean): EagleJS
	closest(selector: string): EagleJS
	concat(...elements: Node[]): EagleJS
	each(callback: Function): EagleJS
	empty(): EagleJS
	eq(index: number): EagleJS
	every(callback: Function): boolean
	filter(selector: string | Node | Node[] | Function): EagleJS
	find(selector: string | Function): EagleJS
	first(): EagleJS
	forEach(callback: Function): EagleJS
	hasClass(name: string): boolean
	html(value?: string): string | EagleJS
	is(selector: string | Function | Node | Node[]): boolean
	insertAfter(target: string | Node | Node[]): EagleJS
	insertBefore(target: string | Node | Node[]): EagleJS
	protected insertElement(content: string | Node | Node[], insertMethod: string, returnContent?: boolean): EagleJS
	protected insertElementTo(target: string | Node | Node[], insertMethod: string): EagleJS
	last(): EagleJS
	map(callback: Function): EagleJS
	protected mapProperty(name: string, selector?: string | Function | Node | Node[]): EagleJS
	protected mapPropertyUntil(name: string, selector?: string | Function | Node | Node[], until?: string | Function | Node | Node[]): EagleJS
	next(selector?: string | Function | Node | Node[]): EagleJS
	nextAll(selector?: string | Function | Node | Node[]): EagleJS
	nextUntil(selector?: string | Function | Node | Node[], filter?: string | Function | Node | Node[]): EagleJS
	not(selector: string | Function | Node | Node[]): EagleJS
	off(events: string, handler: Function, options?: boolean | Object): EagleJS
	on(events: string, handler: Function, options?: boolean | Object): EagleJS
	one(events: string, handler: Function): EagleJS
	parent(selector?: string | Function | Node | Node[]): EagleJS
	parents(selector?: string | Function | Node | Node[]): EagleJS
	parentsUntil(selector?: string | Function | Node | Node[], filter?: string | Function | Node | Node[]): EagleJS
	prepend(content: string | Node | Node[]): EagleJS
	prependTo(target: string | Node | Node[]): EagleJS
	prev(selector?: string | Function | Node | Node[]): EagleJS
	prevAll(selector?: string | Function | Node | Node[]): EagleJS
	prevUntil(selector?: string | Function | Node | Node[], filter?: string | Function | Node | Node[]): EagleJS
	push(...elements: Node): EagleJS
	ready(handler: Function): EagleJS
	remove(): EagleJS
	removeAttr(name: string): EagleJS
	removeClass(name: string): EagleJS
	siblings(selector?: string | Function | Node | Node[]): EagleJS
	some(callback: Function): boolean
	text(value?: any): string | EagleJS
	toggleClass(name: string, force?: boolean): EagleJS
	trigger(type: string, data?: any[]): EagleJS
	unshift(...elements: Node): EagleJS
}
```

### Methods avoid adding to this project for better performance

- CSS Manipulation
  - Use addClass, toggleClass and removeClass
- Dimensions, Offset and Position
   - Use responsive design
- Effects
   - Use CSS3 animation and transitions
- Live event listeners
  - Use  $(document).on() with event.target

## Be aware
- This project is **still under development**
