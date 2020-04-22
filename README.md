# EagleJS

EagleJS is a new generation jQuery alternative for modern browsers.

- Lightweight (~6,00KB minified)
- Hand-coded with EcmaScript 6 and Modern DOM functions
- Subclass of Array for better collection management
- Supports all CSS selectors
- [JavaScript Standard Style](https://standardjs.com "JavaScript Standard Style") codes
- Documented with [JSDoc](https://jsdoc.app "JSDoc")

## Usage

##### Classic Style

Download script file and include on top of other script which require EagleJS.

```html
<script src="eaglejs.min.js"></script>
```

##### ES6 Module

(Will be added)


## Browser Support

##### Desktop (Last two major versions)
- Chrome
- Edge
- Firefox
- Safari 10.1+

##### Mobil (Latest versions)
- Chrome
- Firefox
- iOS 10.3+

## Class Map

```js
class EagleJS extends Array {
	public constructor(selector: string | Node | Node[], context?: string | Node | Node[]): EagleJS

	/* Members */
	public prototype fn

	/* Methods */
	public addClass(name: string): EagleJS
	public after(content: string | Node | Node[]): EagleJS
	public append(content: string | Node | Node[]): EagleJS
	public attr(name: string, value?: string | number): string | EagleJS
	public before(content: string | Node | Node[]): EagleJS
	public children(selector?: string): EagleJS
	public clone(): EagleJS
	public closest(selector: string): EagleJS
	public concat(...elements: Node[]): EagleJS
	public each(callback: Function): EagleJS
	public empty(): EagleJS
	public eq(index: number): EagleJS
	public every(callback: Function): boolean
	public filter(selector: string | Function): EagleJS
	public find(selector: string | Function): EagleJS
	public first(): EagleJS
	public forEach(callback: Function): EagleJS
	public hasClass(name: string): boolean
	public html(value?: string): string | EagleJS
	public is(selector: string | Function | Node | Node[]): boolean
	public isNode(value: any): boolean
	public last(): EagleJS
	public map(callback: Function): EagleJS
	public next(selector?: string): EagleJS
	public nextAll(selector?: string): EagleJS
	public not(selector: string | Function | Node | Node[]): EagleJS
	public off(events: string, handler: Function): EagleJS
	public on(events: string, handler: Function): EagleJS
	public parent(selector?: string): EagleJS
	public parents(selector?: string): EagleJS
	public prepend(content: string | Node | Node[]): EagleJS
	public prev(selector?: string): EagleJS
	public prevAll(selector?: string): EagleJS
	public push(...elements: Node): EagleJS
	public ready(handler: Function): EagleJS
	public remove(): EagleJS
	public removeAttr(name: string): EagleJS
	public removeClass(name: string): EagleJS
	public siblings(selector?: string): EagleJS
	public some(callback: Function): boolean
	public text(value?: string | number | boolean): string | EagleJS
	public toggleClass(name: string, force?: boolean): EagleJS
	public trigger(type: string, data?: any[]): EagleJS
	public unshift(...elements: Node): EagleJS
}
```

#### Methods avoid adding to this project for better performance

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
- This project is **being maintained by required needs**
