# EagleJS

EagleJS is a jQuery-Like DOM manipulation class for modern browsers.

- Powered with EcmaScript 6 and Modern DOM functions
- Subclass of Array for better collection management
- Supports CSS3 selectors
- [JavaScript Standard Style](https://standardjs.com "JavaScript Standard Style") codes
- Documented with [JSDoc](https://jsdoc.app "JSDoc")

## Usage

### Classic Style

Download the script file, and include on top of other scripts that requires EagleJS.

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

For a detailed view, please check the table on [caniuse.com](https://caniuse.com/es6,array-includes,once-event-listener).

### Desktop (Last two versions)

- Chrome
- Edge 16+
- Firefox
- Safari 10.1+

### Mobile (Latest versions)

- Chrome
- Firefox
- iOS Safari 10.3+

### Required features:

- EcmaScript 2015 (ES6)
- EcmaScript 2016 (ES7) partially: Array.prototype.includes()
- EventTarget.addEventListener(): options.once option

## Documentation

- You can find documents on [https://eagleframework.github.io/EagleJS/](https://eagleframework.github.io/EagleJS/).
- You can read from the javascript file.
- IDEs that support JSDoc can help dynamically by code.
