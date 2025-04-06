/*!
 * EagleJS 0.8.3 (https://github.com/demirkartal/eaglejs)
 * Copyright 2020-2025 Cem Demirkartal
 * Licensed under MIT
 */
class EagleJS extends Array {
  constructor(...items) {
    super();
    this.push(...items);
  }

  static isEventTarget(value) {
    return value instanceof Object && 'addEventListener' in value;
  }

  addClass(...names) {
    this.forEach((item) => {
      if ('classList' in item) {
        item.classList.add(...names);
      }
    });
    return this;
  }

  after(...nodes) {
    let isFirst = true;
    this.slice().reverse().forEach((item) => {
      if ('after' in item) {
        nodes.forEach((node) => {
          if (typeof node === 'string' || isFirst) {
            item.after(node);
          }
          else {
            item.after(node.cloneNode(true));
          }
        });
        isFirst = false;
      }
    });
    return this;
  }

  append(...nodes) {
    let isFirst = true;
    this.slice().reverse().forEach((item) => {
      if ('append' in item) {
        nodes.forEach((node) => {
          if (typeof node === 'string' || isFirst) {
            item.append(node);
          }
          else {
            item.append(node.cloneNode(true));
          }
        });
        isFirst = false;
      }
    });
    return this;
  }

  attr(name, value) {
    if (typeof value !== 'undefined') {
      this.forEach((item) => {
        if ('setAttribute' in item) {
          item.setAttribute(name, value);
        }
      });
      return this;
    }
    let returnValue = null;
    this.some((item) => {
      if ('getAttribute' in item) {
        returnValue = item.getAttribute(name);
        return true;
      }
      return false;
    });
    return returnValue;
  }

  before(...nodes) {
    let isFirst = true;
    this.slice().reverse().forEach((item) => {
      if ('before' in item) {
        nodes.forEach((node) => {
          if (typeof node === 'string' || isFirst) {
            item.before(node);
          }
          else {
            item.before(node.cloneNode(true));
          }
        });
        isFirst = false;
      }
    });
    return this;
  }

  children() {
    const elements = new EagleJS();
    this.forEach((item) => {
      if ('children' in item) {
        elements.push(...item.children);
      }
    });
    return elements;
  }

  clone(deep = false) {
    const elements = new EagleJS();
    this.forEach((item) => {
      if ('cloneNode' in item) {
        elements.push(item.cloneNode(deep));
      }
    });
    return elements;
  }

  closest(selectors) {
    const elements = new EagleJS();
    this.forEach((item) => {
      if ('closest' in item) {
        const closest = item.closest(selectors);
        if (closest !== null) {
          elements.push(closest);
        }
      }
    });
    return elements;
  }

  concat(...items) {
    return new EagleJS(...super.concat(...items).filter((item, index, array) => {
      return EagleJS.isEventTarget(item) && array.indexOf(item) === index;
    }));
  }

  contents() {
    const elements = new EagleJS();
    this.forEach((item) => {
      if ('childNodes' in item) {
        elements.push(...item.childNodes);
      }
    });
    return elements;
  }

  data(key, value) {
    if (typeof key !== 'undefined') {
      const dataKey = key.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
      if (typeof value !== 'undefined') {
        this.forEach((item) => {
          if ('dataset' in item) {
            item.dataset[dataKey] = value;
          }
        });
        return this;
      }
      let returnKeyValue;
      this.some((item) => {
        if ('dataset' in item) {
          returnKeyValue = item.dataset[dataKey];
          return true;
        }
        return false;
      });
      return returnKeyValue;
    }
    let returnValue = {};
    this.some((item) => {
      if ('dataset' in item) {
        returnValue = item.dataset;
        return true;
      }
      return false;
    });
    return returnValue;
  }

  empty() {
    this.forEach((item) => {
      if ('firstChild' in item) {
        while (item.firstChild !== null) {
          item.removeChild(item.firstChild);
        }
      }
    });
    return this;
  }

  filter(predicate, thisArg) {
    return new EagleJS(...super.filter(predicate, thisArg));
  }

  filterWith(selectors, condition = true) {
    return this.filter((item) => {
      return 'matches' in item && item.matches(selectors) === condition;
    });
  }

  hasAttr(name) {
    return this.some((item) => {
      return 'hasAttribute' in item && item.hasAttribute(name);
    });
  }

  hasClass(name) {
    return this.some((item) => {
      return 'classList' in item && item.classList.contains(name);
    });
  }

  html(value) {
    if (typeof value !== 'undefined') {
      this.forEach((item) => {
        if ('innerHTML' in item) {
          item.innerHTML = value;
        }
      });
      return this;
    }
    let returnValue = '';
    this.some((item) => {
      if ('innerHTML' in item) {
        returnValue = item.innerHTML;
        return true;
      }
      return false;
    });
    return returnValue;
  }

  matches(selectors) {
    return this.some((item) => {
      return 'matches' in item && item.matches(selectors);
    });
  }

  next() {
    const elements = new EagleJS();
    this.forEach((item) => {
      if ('nextElementSibling' in item && item.nextElementSibling !== null) {
        elements.push(item.nextElementSibling);
      }
    });
    return elements;
  }

  off(type, listener, options = false) {
    this.forEach((item) => {
      item.removeEventListener(type, listener, options);
    });
    return this;
  }

  on(type, listener, options = false) {
    this.forEach((item) => {
      item.addEventListener(type, listener, options);
    });
    return this;
  }

  parent() {
    const elements = new EagleJS();
    this.forEach((item) => {
      if ('parentNode' in item && item.parentNode !== null) {
        elements.push(item.parentNode);
      }
    });
    return elements;
  }

  prepend(...nodes) {
    let isFirst = true;
    this.slice().reverse().forEach((item) => {
      if ('prepend' in item) {
        nodes.forEach((node) => {
          if (typeof node === 'string' || isFirst) {
            item.prepend(node);
          }
          else {
            item.prepend(node.cloneNode(true));
          }
        });
        isFirst = false;
      }
    });
    return this;
  }

  prev() {
    const elements = new EagleJS();
    this.forEach((item) => {
      if ('previousElementSibling' in item
        && item.previousElementSibling !== null) {
        elements.push(item.previousElementSibling);
      }
    });
    return elements;
  }

  push(...items) {
    return super.push(...items.filter((item) => {
      return EagleJS.isEventTarget(item) && !this.includes(item);
    }));
  }

  querySelector(selectors) {
    const elements = new EagleJS();
    this.forEach((item) => {
      if ('querySelector' in item) {
        const result = item.querySelector(selectors);
        if (result !== null) {
          elements.push(result);
        }
      }
    });
    return elements;
  }

  querySelectorAll(selectors) {
    const elements = new EagleJS();
    this.forEach((item) => {
      if ('querySelectorAll' in item) {
        elements.push(...item.querySelectorAll(selectors));
      }
    });
    return elements;
  }

  ready(listener) {
    this.forEach((item) => {
      if ('readyState' in item) {
        if (item.readyState === 'loading') {
          item.addEventListener('DOMContentLoaded', listener);
        }
        else {
          setTimeout(listener, 0);
        }
      }
    });
    return this;
  }

  remove() {
    this.forEach((item) => {
      if ('remove' in item) {
        item.remove();
      }
    });
    return this;
  }

  removeAttr(...names) {
    this.forEach((item) => {
      if ('removeAttribute' in item) {
        names.forEach((name) => {
          item.removeAttribute(name);
        });
      }
    });
    return this;
  }

  removeClass(...names) {
    this.forEach((item) => {
      if ('classList' in item) {
        item.classList.remove(...names);
      }
    });
    return this;
  }

  replaceWith(...nodes) {
    let isFirst = true;
    this.slice().reverse().forEach((item) => {
      if ('replaceWith' in item) {
        nodes.forEach((node) => {
          if (typeof node === 'string' || isFirst) {
            item.replaceWith(node);
          }
          else {
            item.replaceWith(node.cloneNode(true));
          }
        });
        isFirst = false;
      }
    });
    return this;
  }

  reverse() {
    return super.reverse();
  }

  siblings() {
    const elements = new EagleJS();
    this.forEach((item) => {
      if ('parentNode' in item && item.parentNode !== null) {
        [...item.parentNode.children].forEach((child) => {
          if (child !== item) {
            elements.push(child);
          }
        });
      }
    });
    return elements;
  }

  slice(start, end) {
    return new EagleJS(...super.slice(start, end));
  }

  splice(start, deleteCount, ...items) {
    if (typeof deleteCount == 'undefined') {
      return new EagleJS(...super.splice(start));
    }
    return new EagleJS(...super.splice(start, deleteCount, ...items));
  }

  text(value) {
    if (typeof value !== 'undefined') {
      this.forEach((item) => {
        if ('textContent' in item) {
          item.textContent = value;
        }
      });
      return this;
    }
    let returnValue = null;
    this.some((item) => {
      if ('textContent' in item) {
        returnValue = item.textContent;
        return true;
      }
      return false;
    });
    return returnValue;
  }

  toggleAttr(name, force) {
    this.forEach((item) => {
      if ('toggleAttribute' in item) {
        item.toggleAttribute(name, force);
      }
    });
    return this;
  }

  toggleClass(name, force) {
    this.forEach((item) => {
      if ('classList' in item) {
        item.classList.toggle(name, force);
      }
    });
    return this;
  }

  trigger(event) {
    this.forEach((item) => {
      item.dispatchEvent(event);
    });
    return this;
  }

  unshift(...items) {
    return super.unshift(...items.filter((item) => {
      return EagleJS.isEventTarget(item) && !this.includes(item);
    }));
  }
}
export default EagleJS;
// # sourceMappingURL=EagleJS.mjs.map
