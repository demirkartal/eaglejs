# EagleJS

EagleJS is a jQuery-Like DOM manipulation library for modern browsers.

- Powered with EcmaScript 6 and Modern DOM functions
- Subclass of Array for better collection management
- Supports CSS3 selectors
- Lightweight: Minified < 6.00 KB & Minified+Gzipped < 2.00 KB
- [JavaScript Standard Style](https://standardjs.com "JavaScript Standard Style") codes
- Documented with [JSDoc](https://jsdoc.app "JSDoc")

## Installation

### CDN

[https://www.jsdelivr.com/package/npm/@eagleirons/eaglejs](https://www.jsdelivr.com/package/npm/@eagleirons/eaglejs)

### NPM

```sh
npm install @eagleirons/eaglejs
```

## Usage

### Script tag

Include the script file on top of other scripts that requires EagleJS.

```html
<script src="eaglejs.min.js"></script>
<script>
  $(document).ready(function () {
    // Call when DOM is completely loaded
  });
</script>
```

### ES6 Module

```js
import { EagleJSProxy as $ } from 'eaglejs.esm.js';

$(document).ready(function () {
  // Call when DOM is completely loaded
});
```

## Browser Support

For a detailed view, please check the table on [caniuse.com](https://caniuse.com/mdn-api_element_closest,mdn-api_element_matches,es6,array-includes).

### Desktop (Last two versions)

- Chrome
- Edge 16+
- Firefox
- Safari 10.1+

### Mobile (Latest versions)

- Chrome
- Firefox
- iOS Safari 10.3+

## Documentation

- You can find documents on [https://eagleirons.github.io/eaglejs/](https://eagleirons.github.io/eaglejs/).
- You can read from the javascript file.
- IDEs that support JSDoc can help dynamically by code.
