/*!
 * EagleJS 0.9.0 (https://github.com/demirkartal/eaglejs)
 * Copyright 2020-2026 Cem Demirkartal
 * Licensed under MIT
 */
class EagleJS extends Array {
  constructor(...items) {
    super();
    this.push(...items);
  }

  static isEventTarget(value) {
    return (value !== null && typeof value === 'object' && 'addEventListener' in value);
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
    this.slice()
      .reverse()
      .forEach((item) => {
        if ('after' in item) {
          const processedNodes = isFirst
            ? nodes
            : nodes.map(n => (typeof n === 'string' ? n : n.cloneNode(true)));
          item.after(...processedNodes);
          isFirst = false;
        }
      });
    return this;
  }

  append(...nodes) {
    let isFirst = true;
    this.slice()
      .reverse()
      .forEach((item) => {
        if ('append' in item) {
          const processedNodes = isFirst
            ? nodes
            : nodes.map(n => (typeof n === 'string' ? n : n.cloneNode(true)));
          item.append(...processedNodes);
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
    const firstMatch = this.find(item => 'getAttribute' in item);
    return firstMatch?.getAttribute(name) ?? null;
  }

  before(...nodes) {
    let isFirst = true;
    this.slice()
      .reverse()
      .forEach((item) => {
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
    return new EagleJS(...this.flatMap(item => 'children' in item ? [...item.children] : []));
  }

  clone(deep = false) {
    return new EagleJS(...this.flatMap((item) => {
      if ('cloneNode' in item) {
        return [item.cloneNode(deep)];
      }
      return [];
    }));
  }

  closest(selectors) {
    return new EagleJS(...this.flatMap((item) => {
      const result = 'closest' in item ? item.closest(selectors) : null;
      return result ? [result] : [];
    }));
  }

  concat(...items) {
    return new EagleJS(...super.concat(...items).filter((item, index, array) => {
      return EagleJS.isEventTarget(item) && array.indexOf(item) === index;
    }));
  }

  contents() {
    return new EagleJS(...this.flatMap(item => 'childNodes' in item ? [...item.childNodes] : []));
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
      const firstMatch = this.find(item => 'dataset' in item);
      return firstMatch?.dataset[dataKey];
    }
    const firstMatch = this.find(item => 'dataset' in item);
    return firstMatch?.dataset ?? {};
  }

  empty() {
    this.forEach((item) => {
      if ('firstChild' in item) {
        while (item.firstChild) {
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
    return this.filter(item => 'matches' in item
      ? item.matches(selectors) === condition
      : !condition);
  }

  hasAttr(name) {
    return this.some(item => 'hasAttribute' in item && item.hasAttribute(name));
  }

  hasClass(name) {
    return this.some(item => 'classList' in item && item.classList.contains(name));
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
    const firstMatch = this.find(item => 'innerHTML' in item);
    return firstMatch?.innerHTML ?? '';
  }

  matches(selectors) {
    return this.some(item => 'matches' in item && item.matches(selectors));
  }

  next() {
    return new EagleJS(...this.flatMap((item) => {
      const next = 'nextElementSibling' in item
        ? item.nextElementSibling
        : null;
      return next ? [next] : [];
    }));
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
    return new EagleJS(...this.flatMap((item) => {
      const parent = 'parentNode' in item ? item.parentNode : null;
      return parent && EagleJS.isEventTarget(parent) ? [parent] : [];
    }));
  }

  prepend(...nodes) {
    let isFirst = true;
    this.slice()
      .reverse()
      .forEach((item) => {
        if ('prepend' in item) {
          const processedNodes = isFirst
            ? nodes
            : nodes.map(n => (typeof n === 'string' ? n : n.cloneNode(true)));
          item.prepend(...processedNodes);
          isFirst = false;
        }
      });
    return this;
  }

  prev() {
    return new EagleJS(...this.flatMap((item) => {
      const prev = 'previousElementSibling' in item
        ? item.previousElementSibling
        : null;
      return prev ? [prev] : [];
    }));
  }

  push(...items) {
    const filtered = items.filter(item => EagleJS.isEventTarget(item) && !this.includes(item));
    return super.push(...filtered);
  }

  querySelector(selectors) {
    return new EagleJS(...this.flatMap((item) => {
      const result = 'querySelector' in item && typeof item.querySelector === 'function'
        ? item.querySelector(selectors)
        : null;
      return result ? [result] : [];
    }));
  }

  querySelectorAll(selectors) {
    return new EagleJS(...this.flatMap(item => 'querySelectorAll' in item
      ? [...item.querySelectorAll(selectors)]
      : []));
  }

  ready(listener) {
    this.forEach((item) => {
      if ('readyState' in item) {
        if (item.readyState === 'loading') {
          item.addEventListener('DOMContentLoaded', listener);
        }
        else {
          queueMicrotask(() => {
            const event = new Event('DOMContentLoaded');
            if (typeof listener === 'function') {
              listener.call(item, event);
            }
            else if (typeof listener.handleEvent === 'function') {
              listener.handleEvent(event);
            }
          });
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
    this.slice()
      .reverse()
      .forEach((item) => {
        if ('replaceWith' in item) {
          const processedNodes = isFirst
            ? nodes
            : nodes.map(n => (typeof n === 'string' ? n : n.cloneNode(true)));
          item.replaceWith(...processedNodes);
          isFirst = false;
        }
      });
    return this;
  }

  reverse() {
    return super.reverse();
  }

  siblings() {
    return new EagleJS(...this.flatMap((item) => {
      const parent = 'parentNode' in item ? item.parentNode : null;
      if (parent && 'children' in parent) {
        return [...parent.children].filter(child => child !== item);
      }
      return [];
    }));
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
    const firstMatch = this.find(item => 'textContent' in item);
    return firstMatch?.textContent ?? null;
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
    const filtered = items.filter(item => EagleJS.isEventTarget(item) && !this.includes(item));
    return super.unshift(...filtered);
  }
}
export default EagleJS;
// # sourceMappingURL=EagleJS.mjs.map
