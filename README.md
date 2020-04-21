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

## Class Schema

```php
class EagleJS extends Array {
	public constructor ( mixed selector [, mixed selector = document ] )

	/* Members */
	public prototype fn

	/* Methods */
	public addClass ( string name ) : EagleJS
	public after ( mixed content ) : EagleJS
	public append ( mixed content ) : EagleJS
	public attr ( string name [, mixed value ] ) : string|EagleJS
	public before ( mixed content ) : EagleJS
	public children ( [ string selector = "*" ] ) : EagleJS
	public clone ( void ) : EagleJS
	public closest ( string selector ) : EagleJS
	public concat ( Node[] elements... ) : EagleJS
	public each ( function callback ) : EagleJS
	public empty ( void ) : EagleJS
	public eq ( number index ) : EagleJS
	public every ( function callback ) : boolean
	public filter ( mixed selector ) : EagleJS
	public find ( mixed selector ) : EagleJS
	public first ( void ) : EagleJS
	public forEach ( function callback ) : EagleJS
	public hasClass ( string name ) : boolean
	public html ( [ string value ] ) : string|EagleJS
	public is ( mixed selector ) : boolean
	public static isNode ( mixed value ) : boolean
	public last ( void ) : EagleJS
	public map ( function callback ) : EagleJS
	public next ( [ string selector = "*" ] ) : EagleJS
	public nextAll ( [ string selector = "*" ] ) : EagleJS
	public not ( mixed selector ) : EagleJS
	public off ( string events , function handler ) : EagleJS
	public on ( string events , function handler ) : EagleJS
	public parent ( [ string selector = "*" ] ) : EagleJS
	public parents ( [ string selector = "*" ] ) : EagleJS
	public prepend ( mixed content ) : EagleJS
	public prev ( [ string selector = "*" ] ) : EagleJS
	public prevAll ( [ string selector = "*" ] ) : EagleJS
	public push ( Node elements... ) : EagleJS
	public ready ( function handler ) : EagleJS
	public remove ( void ) : EagleJS
	public removeAttr ( string name ) : EagleJS
	public removeClass ( string name ) : EagleJS
	public siblings ( [ string selector = "*" ] ) : EagleJS
	public some ( function callback ) : boolean
	public text ( [ mixed value ] ) : string|EagleJS
	public toggleClass ( string name [, boolean force ] ) : EagleJS
	public trigger ( string type [, array data ] ) : EagleJS
	public unshift ( Node elements... ) : EagleJS
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
