# EagleJS

EagleJS is a jQuery-Like DOM manipulation class for modern browsers

- Powered with EcmaScript 6 and Modern DOM functions
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

| Required Features                                     |  Use by |    Partially Use by    |  Edge  | Firefox | Chrome | Safari | iOS Safari |
|-------------------------------------------------------|:-------:|:----------------------:|:------:|:-------:|:------:|:------:|:----------:|
| EcmaScript 2015 (ES6)                                 | EagleJS |            -           |   15   |    54   |   51   |   10   |     10     |
| EcmaScript 2016 (ES7)<br>- Array.prototype.includes() | EagleJS |            -           |   14   |    43   |   47   |    9   |      9     |
| addEventListener()<br>- options.once parameter        |  one()  | on() options parameter |   16   |    50   |   55   |   10   |     10     |
| **Minimum Required Versions**                         |         |                        | **16** |  **54** | **55** | **10** |   **10**   |

*Source: [MDN Web Docs](https://developer.mozilla.org/), [www.caniuse.com](https://caniuse.com/)*

## Documentation

- You can find documents on [https://eagleframework.github.io/EagleJS/](https://eagleframework.github.io/EagleJS/).
- You can read from javascript file.
- IDE which supports JSDOC can help dynamically by code. Like;
  - Apache NetBeans IDE
  - Visual Studio Code

## Methods avoid adding to this project for better performance

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
