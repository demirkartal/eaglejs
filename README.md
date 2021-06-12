# EagleJS

[![NPM](https://badgen.net/npm/v/@demirkartal/eaglejs)](https://www.npmjs.com/package/@demirkartal/eaglejs)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@demirkartal/eaglejs/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@demirkartal/eaglejs)
[![DeepScan grade](https://deepscan.io/api/teams/12532/projects/16494/branches/356366/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=12532&pid=16494&bid=356366)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/demirkartal/eaglejs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/demirkartal/eaglejs/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/demirkartal/eaglejs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/demirkartal/eaglejs/context:javascript)
[![Minified](https://badgen.net/bundlephobia/min/@demirkartal/eaglejs)](https://bundlephobia.com/result?p=@demirkartal/eaglejs)
[![Minified+Gzipped](https://badgen.net/bundlephobia/minzip/@demirkartal/eaglejs)](https://bundlephobia.com/result?p=@demirkartal/eaglejs)

EagleJS is a jQuery-Like DOM manipulation library for modern browsers.

- Powered with EcmaScript 7 and Modern DOM functions
- Subclass of Array for better collection management
- Supports CSS3 selectors
- Lightweight: Minified < 6 KB & Minified+Gzipped < 2 KB
- [JavaScript Standard Style](https://standardjs.com "JavaScript Standard Style") codes
- Documented with [JSDoc](https://jsdoc.app "JSDoc")

## Installation

### CDN

[https://www.jsdelivr.com/package/npm/@demirkartal/eaglejs](https://www.jsdelivr.com/package/npm/@demirkartal/eaglejs)

### NPM

```sh
npm install @demirkartal/eaglejs
```

## Usage

### Script tag

Include the script file on top of other scripts that requires EagleJS.

```html
<script src="eaglejs.min.js"></script>
<script>
  const $ = EagleJSProxy;
  $(document).ready(() => {
    // Call when DOM is completely loaded
  });
</script>
```

### ES6 Module

```js
import { EagleJSProxy as $ } from 'eaglejs.esm.js';

$(document).ready(() => {
  // Call when DOM is completely loaded
});
```

## Browser Support

For a detailed view, please check the table on [caniuse.com](https://caniuse.com/mdn-api_element_closest,mdn-api_element_matches,dom-manip-convenience,es6,array-includes).

### Desktop (Last two versions)

- Chrome
- Edge 17+
- Firefox
- Safari 10.1+

### Mobile (Latest versions)

- Chrome
- Firefox
- iOS Safari 10.3+

## Documentation

- You can find documents on [https://demirkartal.github.io/eaglejs](https://demirkartal.github.io/eaglejs).
- You can read from the javascript file.
- IDEs that support JSDoc can help dynamically by code.
