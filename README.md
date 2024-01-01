# EagleJS

[![NPM](https://badgen.net/npm/v/@demirkartal/eaglejs)](https://www.npmjs.com/package/@demirkartal/eaglejs)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@demirkartal/eaglejs/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@demirkartal/eaglejs)
[![Minified](https://badgen.net/bundlephobia/min/@demirkartal/eaglejs)](https://bundlephobia.com/result?p=@demirkartal/eaglejs)
[![Minified+Gzipped](https://badgen.net/bundlephobia/minzip/@demirkartal/eaglejs)](https://bundlephobia.com/result?p=@demirkartal/eaglejs)

EagleJS is a jQuery-Like DOM manipulation library for modern browsers.

- Powered with EcmaScript 7 and Modern DOM functions
- Subclass of Array for better collection management
- Supports CSS3 selectors
- Lightweight: Minified < 5 KB & Minified+Gzipped < 1.5 KB
- Documented with [TypeDoc](https://typedoc.org "TypeDoc")

## Installation

### CDN

[https://www.jsdelivr.com/package/npm/@demirkartal/eaglejs](https://www.jsdelivr.com/package/npm/@demirkartal/eaglejs)

### NPM

```sh
npm install @demirkartal/eaglejs
```

## Usage

### Browser

```js
import EagleJS from 'EagleJS.mjs';

const doc = new EagleJS(document);

doc.ready(() => {
  // Call when DOM is completely loaded
});
```

### Node.js

```js
import { JSDOM } from 'jsdom';
import EagleJS from '@demirkartal/eaglejs';

const jsdom = new JSDOM();

const doc = new EagleJS(jsdom.window.document);

doc.ready(() => {
  // Call when DOM is completely loaded
});
```

## Browser Support

For a detailed view, please check the table on [caniuse.com](https://caniuse.com/mdn-api_element_closest,mdn-api_element_matches,mdn-api_element_toggleattribute,dom-manip-convenience,es6,es6-module,array-includes).

### Desktop (Last two versions)

- Chrome
- Edge
- Firefox
- Safari 12+

### Mobile (Latest versions)

- Chrome
- Firefox
- iOS Safari 12+

## Documentation

- You can find documents on [https://demirkartal.github.io/eaglejs](https://demirkartal.github.io/eaglejs).
