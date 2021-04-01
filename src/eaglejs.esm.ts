/** @module eaglejs */
/**
 * EagleJS.
 *
 * @version 0.7.0
 * @copyright 2020-2021 Cem Demirkartal
 * @license MIT
 * @see The {@link https://github.com/demirkartal/eaglejs GitHub} repo
 * @augments Array<EventTarget>
 */
class EagleJS extends Array<EventTarget> {
  /**
   * Return a collection of matched items or created nodes by HTML string.
   *
   * @example
   * // string
   * $('selector');
   * $('htmlString'); // Create HTML tag
   *
   * // EventTarget
   * $(EventTarget);
   *
   * // EventTarget[]
   * $(EagleJS);
   *
   * // string + string
   * $('selector', 'selector');
   *
   * // string + EventTarget
   * $('selector', EventTarget);
   *
   * // string + EventTarget[]
   * $('selector', EagleJS);
   *
   * @see DOMParser on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMParser MDN}
   * for htmlString.
   * @param {?(string|EventTarget|EventTarget[])} [selector=null] A selector to
   * match.
   * @param {string|EventTarget|EventTarget[]} [context=document] A selector to
   * use as context.
   */
  constructor (selector: string | EventTarget | EventTarget[] | null = null, context: string | EventTarget | EventTarget[] = document) {
    super();
    if (selector !== null) {
      if (typeof selector === 'string') {
        if (/<.+>/.test(selector)) {
          const doc = new DOMParser().parseFromString(selector, 'text/html');
          this.push(...doc.body.childNodes);
        } else {
          return new EagleJS(context).querySelectorAll(selector);
        }
      } else if (Array.isArray(selector)) {
        this.push(...selector);
      } else {
        this.push(selector);
      }
    }
  }

  /**
   * Check if the value is a `EventTarget`.
   *
   * @example
   * EagleJS.isEventTarget(element); // true
   * EagleJS.isEventTarget(document); // true
   * EagleJS.isEventTarget(window); // true
   *
   * @see EventTarget on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget MDN}.
   * @param {*} value The value to be checked.
   * @returns {boolean} `true` if the value is a `EventTarget`; otherwise,
   * `false`.
   */
  static isEventTarget (value: any): value is EventTarget {
    return Boolean(value) && Boolean(value.addEventListener);
  }

  /**
   * Add one or more class names to each `Element` in the collection.
   *
   * @example
   * $(element).addClass('className');
   * $(element).addClass('className', 'className');
   *
   * @see Element.classList.add() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add MDN}.
   * @param {...string} names One or more class names.
   * @throws {DOMException} Throws a `SyntaxError` if one of the arguments is
   * the empty string.
   * @throws {DOMException} Throws an `InvalidCharacterError` if one of the
   * arguments contains any ASCII whitespace.
   * @returns {this} The current collection.
   */
  addClass (...names: string[]): this {
    this.forEach((item: EventTarget | Element) => {
      if ('classList' in item) {
        item.classList.add(...names);
      }
    });
    return this;
  }

  /**
   * Insert a set of `Node` or `DOMString` objects after each `ChildNode` in the
   * collection. `DOMString` objects are inserted as equivalent `Text` nodes.
   *
   * @example
   * $(element).after('text');
   * $(element).after(Node);
   * $(element).after('text', Node);
   * $(element).after(Node, Node);
   *
   * @see ChildNode.after() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after MDN}
   * (Simulated).
   * @param {...(string|Node)} nodes A set of `Node` or `DOMString` objects to
   * insert.
   * @returns {this} The current collection.
   */
  after (...nodes: Array<string | Node>): this {
    /** @type {Node[]} */
    const nodeArray: Node[] = [];
    nodes.forEach((value) => {
      if (typeof value === 'string') {
        nodeArray.push(document.createTextNode(value));
      } else {
        nodeArray.push(value);
      }
    });
    let first = true;
    this.slice().reverse().forEach((item: EventTarget | ChildNode) => {
      if ('parentNode' in item && item.parentNode !== null) { // if ChildNode
        const parent = item.parentNode;
        const next = item.nextSibling;
        nodeArray.forEach((node) => {
          parent.insertBefore(first ? node : node.cloneNode(true), next);
        });
        first = false;
      }
    });
    return this;
  }

  /**
   * Insert a set of `Node` or `DOMString` objects before the first child of
   * each `ParentNode` in the collection. `DOMString` objects are inserted as
   * equivalent `Text` nodes.
   *
   * @example
   * $(element).append('text');
   * $(element).append(Node);
   * $(element).append('text', Node);
   * $(element).append(Node, Node);
   *
   * @see ParentNode.append() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append MDN}
   * (Simulated).
   * @param {...(string|Node)} nodes A set of `Node` or `DOMString` objects to
   * insert.
   * @returns {this} The current collection.
   */
  append (...nodes: Array<string | Node>): this {
    /** @type {Node[]} */
    const nodeArray: Node[] = [];
    nodes.forEach((value) => {
      if (typeof value === 'string') {
        nodeArray.push(document.createTextNode(value));
      } else {
        nodeArray.push(value);
      }
    });
    let first = true;
    this.slice().reverse().forEach((item: EventTarget | Document | DocumentFragment | Element) => {
      if ('querySelector' in item) { // if ParentNode
        nodeArray.forEach((node) => {
          item.appendChild(first ? node : node.cloneNode(true));
        });
        first = false;
      }
    });
    return this;
  }

  /**
   * Get or set the attribute value of each `Element` in the collection.
   *
   * @example <caption>attr (name: string): string | null</caption>
   * $(element).attr('attributeName');
   *
   * @example <caption>attr (name: string, value: string): this</caption>
   * $(element).attr('attributeName', 'value');
   *
   * @see Element.getAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute MDN}.
   * @see Element.setAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute MDN}.
   * @param {string} name The name of the attribute.
   * @param {string} [value] The value for the attribute.
   * @throws {DOMException} Throws an `InvalidCharacterError` if the specified
   * attribute name contains one or more characters that are not valid in
   * attribute names.
   * @returns {string|null|this} The attribute value of the first `Element`; Or
   * if the value parameter provided, returns the current collection.
   */
  attr (name: string, value?: string): string | null | this {
    if (typeof value !== 'undefined') {
      this.forEach((item: EventTarget | Element) => {
        if ('setAttribute' in item) {
          item.setAttribute(name, value);
        }
      });
      return this;
    }
    /** @type {?string} */
    let returnValue: string | null = null;
    this.some((item: EventTarget | Element) => {
      if ('getAttribute' in item) {
        returnValue = item.getAttribute(name);
        return true;
      }
      return false;
    });
    return returnValue;
  }

  /**
   * Insert a set of `Node` or `DOMString` objects before each `ChildNode` in
   * the collection. `DOMString` objects are inserted as equivalent `Text`
   * nodes.
   *
   * @example
   * $(element).before('text');
   * $(element).before(Node);
   * $(element).before('text', Node);
   * $(element).before(Node, Node);
   *
   * @see ChildNode.before() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before MDN}
   * (Simulated).
   * @param {...(string|Node)} nodes A set of `Node` or `DOMString` objects to
   * insert.
   * @returns {this} The current collection.
   */
  before (...nodes: Array<string | Node>): this {
    /** @type {Node[]} */
    const nodeArray: Node[] = [];
    nodes.forEach((value) => {
      if (typeof value === 'string') {
        nodeArray.push(document.createTextNode(value));
      } else {
        nodeArray.push(value);
      }
    });
    let first = true;
    this.slice().reverse().forEach((item: EventTarget | ChildNode) => {
      if ('parentNode' in item && item.parentNode !== null) { // if ChildNode
        const parent = item.parentNode;
        nodeArray.forEach((node) => {
          parent.insertBefore(first ? node : node.cloneNode(true), item);
        });
        first = false;
      }
    });
    return this;
  }

  /**
   * Get the `children` property of each `ParentNode` in the collection,
   * optionally filtered by a selector.
   *
   * @example
   * $(element).children();
   * $(element).children('selectors');
   *
   * @see ParentNode.children on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children MDN}.
   * @param {?string} [filter=null] One or more selectors to filter.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  children (filter: string | null = null): EagleJS {
    const $elements = new EagleJS();
    this.forEach((item: EventTarget | ParentNode) => {
      if ('children' in item) {
        $elements.push(...item.children);
      }
    });
    if (filter !== null) {
      return $elements.filterWith(filter);
    }
    return $elements;
  }

  /**
   * Create a clone of each `Node` in the collection.
   *
   * @example
   * $(element).clone();
   * $(element).clone(true);
   * $(element).clone(false);
   *
   * @see Node.cloneNode() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode MDN}.
   * @param {boolean} [deep=false] If `true`, then `Node` and its whole
   * subtree—including text that may be in child `Text` nodes—is also copied.
   * @throws {DOMException} Throws a `NotSupportedError` if `Node` is a
   * ShadowRoot.
   * @returns {EagleJS} A new collection of `Node`s.
   */
  clone (deep: boolean = false): EagleJS {
    const $elements = new EagleJS();
    this.forEach((item: EventTarget | Node) => {
      if ('cloneNode' in item) {
        $elements.push(item.cloneNode(deep));
      }
    });
    return $elements;
  }

  /**
   * Get the closest ancestor of each `Element` in the collection that matches
   * selectors.
   *
   * @example
   * $(element).closest('selectors');
   *
   * @see Element.closest() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest MDN}.
   * @param {string} selectors One or more selectors to match.
   * @throws {DOMException} Throws a `SyntaxError` if the syntax of the
   * specified `selectors` is not valid.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  closest (selectors: string): EagleJS {
    const $elements = new EagleJS();
    this.forEach((item: EventTarget | Element) => {
      if ('closest' in item) {
        const closest = item.closest(selectors);
        if (closest !== null) {
          $elements.push(closest);
        }
      }
    });
    return $elements;
  }

  /**
   * Merge two or more collections.
   *
   * @example
   * $(element).concat(EagleJS, EagleJS, EagleJS);
   *
   * @see Array.prototype.concat() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat MDN}.
   * @param {...(EventTarget|Array<EventTarget>)} items Values to concatenate
   * into a new collection.
   * @returns {EagleJS} A new collection.
   */
  concat (...items: Array<EventTarget | ConcatArray<EventTarget>>): EagleJS {
    return new EagleJS(super.concat(...items));
  }

  /**
   * Get the `childNodes` property of each `Node` in the collection.
   *
   * @example
   * $(element).contents();
   *
   * @see Node.childNodes on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes MDN}.
   * @returns {EagleJS} A new collection of `ChildNode`s.
   */
  contents (): EagleJS {
    const $elements = new EagleJS();
    this.forEach((item: EventTarget | Node) => {
      if ('childNodes' in item) {
        $elements.push(...item.childNodes);
      }
    });
    return $elements;
  }

  /**
   * Get or set the data attribute value of each `Element` in the collection.
   *
   * @example <caption>data (): object</caption>
   * $(element).data();
   *
   * @example <caption>data (key: string): string | undefined</caption>
   * $(element).data('key');
   *
   * @example <caption>data (key: string, value: string): this</caption>
   * $(element).data('key', 'value');
   *
   * @see HTMLOrForeignElement.dataset on {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset MDN}.
   * @param {string} [key] The name of the data.
   * @param {string} [value] The new data value.
   * @returns {object|string|undefined|this} The dataset of the first `Element`.
   * If the key parameter provided, returns the value of the first `Element`.
   * If the value parameter provided, returns the current collection.
   */
  data (key?: string, value?: string): object | string | undefined | this {
    if (typeof key !== 'undefined') {
      /** @type {string} */
      const camelCaseKey: string = key.replace(/-([a-z])/g, (_match, letter) => {
        return letter.toUpperCase();
      });
      if (typeof value !== 'undefined') {
        this.forEach((item: EventTarget | HTMLOrSVGElement) => {
          if ('dataset' in item) {
            item.dataset[camelCaseKey] = value;
          }
        });
        return this;
      }
      /** @type {string|undefined} */
      let returnKeyValue: string | undefined;
      this.some((item: EventTarget | HTMLOrSVGElement) => {
        if ('dataset' in item) {
          returnKeyValue = item.dataset[camelCaseKey];
          return true;
        }
        return false;
      });
      return returnKeyValue;
    }
    /** @type {object} */
    let returnValue: object = {};
    this.some((item: EventTarget | HTMLOrSVGElement) => {
      if ('dataset' in item) {
        returnValue = item.dataset;
        return true;
      }
      return false;
    });
    return returnValue;
  }

  /**
   * Remove all child nodes of each `Node` in the collection from the DOM.
   *
   * @example
   * $(element).empty();
   *
   * @see Node.removeChild() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild MDN}.
   * @returns {this} The current collection.
   */
  empty (): this {
    this.forEach((item: EventTarget | Node) => {
      if ('firstChild' in item) {
        while (item.firstChild !== null) {
          item.removeChild(item.firstChild);
        }
      }
    });
    return this;
  }

  /**
   * Reduce the collection with the given selector.
   *
   * @example
   * $(element).filterWith('selectors');
   *
   * @see Element.matches() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches MDN}.
   * @param {string} selectors A selector to match.
   * @param {boolean} [condition=true] A condition for test.
   * @returns {this} A new collection with the items that pass the test.
   */
  filterWith (selectors: string, condition: boolean = true): this {
    return this.filter((item: EventTarget | Element) => {
      return 'matches' in item && item.matches(selectors) === condition;
    });
  }

  /**
   * Check if any collection `Element` has the specified attribute.
   *
   * @example
   * $(element).hasAttr('attributeName');
   *
   * @see Element.hasAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute MDN}
   * @param {string} name The attribute to search.
   * @returns {boolean} `true` if any `Element` has the given attribute;
   * otherwise, `false`.
   */
  hasAttr (name: string): boolean {
    return this.some((item: EventTarget | Element) => {
      return 'hasAttribute' in item && item.hasAttribute(name);
    });
  }

  /**
   * Check if any collection `Element` has the specified class name.
   *
   * @example
   * $(element).hasClass('className');
   *
   * @see Element.classList.contains() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains MDN}.
   * @param {string} name The class name to search.
   * @returns {boolean} `true` if any `Element` has the given class name;
   * otherwise, `false`.
   */
  hasClass (name: string): boolean {
    return this.some((item: EventTarget | Element) => {
      return 'classList' in item && item.classList.contains(name);
    });
  }

  /**
   * Get or set the `innerHTML` of each `Element` in the collection.
   *
   * @example <caption>html (): string</caption>
   * $(element).html();
   *
   * @example <caption>html (value: string): this</caption>
   * $(element).html('htmlString');
   *
   * @see Element.innerHTML on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML MDN}.
   * @param {string} [value] The html string to set.
   * @returns {string|this} The HTML string of the first `Element`; Or if the
   * value parameter provided, returns the current collection.
   */
  html (value?: string): string | this {
    if (typeof value !== 'undefined') {
      this.forEach((item: EventTarget | Element) => {
        if ('innerHTML' in item) {
          item.innerHTML = value;
        }
      });
      return this;
    }
    /** @type {string} */
    let returnValue: string = '';
    this.some((item: EventTarget | Element) => {
      if ('innerHTML' in item) {
        returnValue = item.innerHTML;
        return true;
      }
      return false;
    });
    return returnValue;
  }

  /**
   * Check any `Element` in the collection that matches selectors.
   *
   * @example
   * $(element).matches('selectors');
   *
   * @see Element.matches() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches MDN}.
   * @param {string} selectors One or more selectors to match.
   * @throws {DOMException} Throws a `SyntaxError` if the syntax of the
   * specified `selectors` is not valid.
   * @returns {boolean} `true` if any `Element` matches the given selectors;
   * otherwise, `false`.
   */
  matches (selectors: string): boolean {
    return this.some((item: EventTarget | Element) => {
      return 'matches' in item && item.matches(selectors);
    });
  }

  /**
   * Get the `nextElementSibling` of each `Node` in the collection, optionally
   * filtered by a selector.
   *
   * @example
   * $(element).next();
   * $(element).next('selectors');
   *
   * @see NonDocumentTypeChildNode.nextElementSibling on {@link https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling MDN}.
   * @param {?string} [filter=null] One or more selectors to filter.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  next (filter: string | null = null): EagleJS {
    const $elements = new EagleJS();
    this.forEach((item: EventTarget | NonDocumentTypeChildNode) => {
      if ('nextElementSibling' in item && item.nextElementSibling !== null) {
        $elements.push(item.nextElementSibling);
      }
    });
    if (filter !== null) {
      return $elements.filterWith(filter);
    }
    return $elements;
  }

  /**
   * Remove the `EventListener` from each item in the collection.
   *
   * @example
   * $(element).off('click', handler);
   *
   * @see EventTarget.removeEventListener() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener MDN}.
   * @param {string} event A string that specifies the type of event for which
   * to remove an event listener.
   * @param {EventListener|EventListenerObject} listener The `EventListener`
   * function of the event handler to remove from the event target.
   * @param {boolean|EventListenerOptions} [options=false] An options object
   * specifies the characteristics of the event listener.
   * @returns {this} The current collection.
   */
  off (event: string, listener: EventListener | EventListenerObject, options: boolean | EventListenerOptions = false): this {
    this.forEach((item) => {
      item.removeEventListener(event, listener, options);
    });
    return this;
  }

  /**
   * Attach the `EventListener` to each item in the collection.
   *
   * @example
   * $(element).on('click', function (event) {
   *   console.log(event.type);
   * });
   *
   * @see EventTarget.addEventListener() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener MDN}.
   * @param {string} event A case-sensitive string representing the event type
   * to listen for.
   * @param {EventListener|EventListenerObject} listener The handler function
   * for the event.
   * @param {boolean|AddEventListenerOptions} [options=false] An options object
   * specifies the characteristics of the event listener.
   * @returns {this} The current collection.
   */
  on (event: string, listener: EventListener | EventListenerObject, options: boolean | AddEventListenerOptions = false): this {
    this.forEach((item) => {
      item.addEventListener(event, listener, options);
    });
    return this;
  }

  /**
   * Get the `parentNode` of each `Node` in the collection, optionally filtered
   * by a selector.
   *
   * @example
   * $(element).parent();
   * $(element).parent('selectors');
   *
   * @see Node.parentNode on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode MDN}.
   * @param {?string} [filter=null] One or more selectors to filter.
   * @returns {EagleJS} A new collection of `Node`s.
   */
  parent (filter: string | null = null): EagleJS {
    const $elements = new EagleJS();
    this.forEach((item: EventTarget | Node) => {
      if ('parentNode' in item && item.parentNode !== null) {
        $elements.push(item.parentNode);
      }
    });
    if (filter !== null) {
      return $elements.filterWith(filter);
    }
    return $elements;
  }

  /**
   * Insert a set of `Node` or `DOMString` objects after the last child of each
   * `ParentNode` in the collection. `DOMString` objects are inserted as
   * equivalent `Text` nodes.
   *
   * @example
   * $(element).prepend('text');
   * $(element).prepend(Node);
   * $(element).prepend('text', Node);
   * $(element).prepend(Node, Node);
   *
   * @see ParentNode.prepend() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend MDN}
   * (Simulated).
   * @param {...(string|Node)} nodes A set of `Node` or `DOMString` objects to
   * insert.
   * @returns {this} The current collection.
   */
  prepend (...nodes: Array<string | Node>): this {
    /** @type {Node[]} */
    const nodeArray: Node[] = [];
    nodes.forEach((value) => {
      if (typeof value === 'string') {
        nodeArray.push(document.createTextNode(value));
      } else {
        nodeArray.push(value);
      }
    });
    let first = true;
    this.slice().reverse().forEach((item: EventTarget | Document | DocumentFragment | Element) => {
      if ('querySelector' in item) { // if ParentNode
        const firstChild = item.firstChild;
        nodeArray.forEach((node) => {
          item.insertBefore(first ? node : node.cloneNode(true), firstChild);
        });
        first = false;
      }
    });
    return this;
  }

  /**
   * Get the `previousElementSibling` of each `Node` in the collection,
   * optionally filtered by a selector.
   *
   * @example
   * $(element).prev();
   * $(element).prev('selectors');
   *
   * @see NonDocumentTypeChildNode.previousElementSibling on {@link https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling MDN}.
   * @param {?string} [filter=null] One or more selectors to filter.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  prev (filter: string | null = null): EagleJS {
    const $elements = new EagleJS();
    this.forEach((item: EventTarget | NonDocumentTypeChildNode) => {
      if ('previousElementSibling' in item &&
                item.previousElementSibling !== null) {
        $elements.push(item.previousElementSibling);
      }
    });
    if (filter !== null) {
      return $elements.filterWith(filter);
    }
    return $elements;
  }

  /**
   * Add one or more items to the end of the collection.
   *
   * @example
   * $(element).push(EventTarget, EventTarget, EventTarget);
   *
   * // Spread and push
   * $(element).push(...EagleJS);
   *
   * @see Array.prototype.push() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push MDN}.
   * @param {...EventTarget} items Items to add to the end of the collection.
   * @returns {number} The new length.
   */
  push (...items: EventTarget[]): number {
    return super.push(...items.filter((item) => {
      return EagleJS.isEventTarget(item) && !this.includes(item);
    }));
  }

  /**
   * Get the first `Element` descendant of each `ParentNode` in the collection
   * that matches selectors.
   *
   * @example
   * $(element).querySelector('selector');
   *
   * @see ParentNode.querySelector() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelector MDN}.
   * @param {string} selectors One or more selectors to match.
   * @throws {DOMException} Throws a `SyntaxError` if the syntax of the
   * specified `selectors` is not valid.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  querySelector (selectors: string): EagleJS {
    const $elements = new EagleJS();
    this.forEach((item: EventTarget | ParentNode) => {
      if ('querySelector' in item) {
        const result = item.querySelector(selectors);
        if (result !== null) {
          $elements.push(result);
        }
      }
    });
    return $elements;
  }

  /**
   * Get all `Element` descendants of each `ParentNode` in the collection that
   * matches selectors.
   *
   * @example
   * $(element).querySelectorAll('selector');
   *
   * @see ParentNode.querySelectorAll() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelectorAll MDN}.
   * @param {string} selectors One or more selectors to match.
   * @throws {DOMException} Throws a `SyntaxError` if the syntax of the
   * specified `selectors` is not valid.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  querySelectorAll (selectors: string): EagleJS {
    const $elements = new EagleJS();
    this.forEach((item: EventTarget | ParentNode) => {
      if ('querySelectorAll' in item) {
        $elements.push(...item.querySelectorAll(selectors));
      }
    });
    return $elements;
  }

  /**
   * Specify a function to execute when the DOM is completely loaded.
   *
   * @example
   * $(document).ready(function () {
   *   // Call when DOM is completely loaded
   * });
   *
   * @see DOMContentLoaded event on {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event MDN}.
   * @param {EventListener} listener The handler function for the event.
   * @returns {this} The current collection.
   */
  ready (listener: EventListener): this {
    this.forEach((item: EventTarget | Document) => {
      if ('readyState' in item) {
        if (item.readyState === 'loading') {
          item.addEventListener('DOMContentLoaded', listener);
        } else {
          setTimeout(listener); // Async
        }
      }
    });
    return this;
  }

  /**
   * Remove each `Node` of the collection from the DOM.
   *
   * @example
   * $(element).remove();
   *
   * @see ChildNode.remove() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove MDN}
   * (Simulated).
   * @returns {this} The current collection.
   */
  remove (): this {
    this.forEach((item: EventTarget | Node) => {
      if ('parentNode' in item && item.parentNode !== null) { // if ChildNode
        item.parentNode.removeChild(item);
      }
    });
    return this;
  }

  /**
   * Remove one or more attributes from each `Element` in the collection.
   *
   * @example
   * $(element).removeAttr('attributeName');
   * $(element).removeAttr('attributeName', 'attributeName');
   *
   * @see Element.removeAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute MDN}.
   * @param {...string} names One or more attribute names.
   * @returns {this} The current collection.
   */
  removeAttr (...names: string[]): this {
    this.forEach((item: EventTarget | Element) => {
      if ('removeAttribute' in item) {
        names.forEach((name) => {
          item.removeAttribute(name);
        });
      }
    });
    return this;
  }

  /**
   * Remove one or more class names from each `Element` in the collection.
   *
   * @example
   * $(element).removeClass('className');
   * $(element).removeClass('className', 'className');
   *
   * @see Element.classList.remove() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove MDN}.
   * @param {...string} names One or more class names.
   * @throws {DOMException} Throws a `SyntaxError` if one of the arguments is
   * the empty string.
   * @throws {DOMException} Throws an `InvalidCharacterError` if one of the
   * arguments contains any ASCII whitespace.
   * @returns {this} The current collection.
   */
  removeClass (...names: string[]): this {
    this.forEach((item: EventTarget | Element) => {
      if ('classList' in item) {
        item.classList.remove(...names);
      }
    });
    return this;
  }

  /**
   * Replace each `ChildNode` in the collection with a set of `Node` or
   * `DOMString` objects. `DOMString` objects are inserted as equivalent `Text`
   * nodes.
   *
   * @example
   * $(element).replaceWith('text');
   * $(element).replaceWith(Node);
   * $(element).replaceWith('text', Node);
   * $(element).replaceWith(Node, Node);
   *
   * @see ChildNode.replaceWith() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith MDN}
   * (Simulated).
   * @param {...(string|Node)} nodes A set of `Node` or `DOMString` objects to
   * replace.
   * @returns {this} The current collection.
   */
  replaceWith (...nodes: Array<string | Node>): this {
    return this.before(...nodes).remove();
  }

  /**
   * Get the siblings of each `Node` in the collection, optionally filtered by a
   * selector.
   *
   * @example
   * $(element).siblings();
   * $(element).siblings('selectors');
   *
   * @param {?string} [filter=null] One or more selectors to filter.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  siblings (filter: string | null = null): EagleJS {
    const $elements = new EagleJS();
    this.forEach((item: EventTarget | Node) => {
      if ('parentNode' in item && item.parentNode !== null) {
        [...item.parentNode.children].forEach((child) => {
          if (child !== item) {
            $elements.push(child);
          }
        });
      }
    });
    if (filter !== null) {
      return $elements.filterWith(filter);
    }
    return $elements;
  }

  /**
   * Get or set the `textContent` of each `Node` in the collection.
   *
   * @example <caption>text (): string | null</caption>
   * $(element).text();
   *
   * @example <caption>text (value: string): this</caption>
   * $(element).text('value');
   *
   * @see Node.textContent on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent MDN}.
   * @param {string} [value] The text to set.
   * @returns {string|null|this} Text of the first `Node`; Or if the value
   * parameter provided, returns the current collection.
   */
  text (value?: string): string | null | this {
    if (typeof value !== 'undefined') {
      this.forEach((item: EventTarget | Node) => {
        if ('textContent' in item) {
          item.textContent = value;
        }
      });
      return this;
    }
    /** @type {?string} */
    let returnValue: string | null = null;
    this.some((item: EventTarget | Node) => {
      if ('textContent' in item) {
        returnValue = item.textContent;
        return true;
      }
      return false;
    });
    return returnValue;
  }

  /**
   * Toggle the attribute to each `Element` in the collection.
   *
   * @example
   * $(element).toggleAttr('attributeName');
   * $(element).toggleAttr('attributeName', true);
   * $(element).toggleAttr('attributeName', false);
   *
   * @see Element.toggleAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/toggleAttribute MDN}
   * (Simulated).
   * @param {string} name The name of the attribute.
   * @param {boolean} [force] A boolean value to determine whether the attribute
   * should be added or removed.
   * @returns {this} The current collection.
   */
  toggleAttr (name: string, force?: boolean): this {
    this.forEach((item: EventTarget | Element) => {
      if ('setAttribute' in item) {
        if (item.hasAttribute(name)) {
          if (force === true) {
            return;
          }
          item.removeAttribute(name);
        } else {
          if (force === false) {
            return;
          }
          item.setAttribute(name, '');
        }
      }
    });
    return this;
  }

  /**
   * Toggle the class name to each `Element` in the collection.
   *
   * @example
   * $(element).toggleClass('className');
   * $(element).toggleClass('className', true);
   * $(element).toggleClass('className', false);
   *
   * @see Element.classList.toggle() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle MDN}.
   * @param {string} name The class name to toggle.
   * @param {boolean} [force] A boolean value to determine whether the class
   * should be added or removed.
   * @throws {DOMException} Throws a `SyntaxError` if one of the arguments is
   * the empty string.
   * @throws {DOMException} Throws an `InvalidCharacterError` if one of the
   * arguments contains any ASCII whitespace.
   * @returns {this} The current collection.
   */
  toggleClass (name: string, force?: boolean): this {
    this.forEach((item: EventTarget | Element) => {
      if ('classList' in item) {
        item.classList.toggle(name, force);
      }
    });
    return this;
  }

  /**
   * Trigger the specified `Event` on each item in the collection.
   *
   * @example
   * $(element).trigger('click');
   * $(element).trigger('click', data);
   *
   * @see CustomEvent on {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent MDN}.
   * @see EventTarget.dispatchEvent() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent MDN}.
   * @param {string} event The name of the event.
   * @param {?object} [data=null] Additional data to pass along to the event
   * handler.
   * @returns {this} The current collection.
   */
  trigger (event: string, data: object | null = null): this {
    const customEvent = new CustomEvent(event, {
      bubbles: true,
      cancelable: true,
      detail: data
    });
    this.forEach((item) => {
      item.dispatchEvent(customEvent);
    });
    return this;
  }

  /**
   * Add one or more items to the beginning of the collection.
   *
   * @example
   * $(element).unshift(EventTarget, EventTarget, EventTarget);
   *
   * // Spread and unshift
   * $(element).unshift(...EagleJS);
   *
   * @see Array.prototype.unshift() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift MDN}.
   * @param {...EventTarget} items Items to add to the front of the collection.
   * @returns {number} The new length.
   */
  unshift (...items: EventTarget[]): number {
    return super.unshift(...items.filter((item) => {
      return EagleJS.isEventTarget(item) && !this.includes(item);
    }));
  }
}
/**
 * Proxy to use `EagleJS` class without the new keyword.
 *
 * @example <caption>Usage (Ecmascript 6 Module)</caption>
 * import { EagleJSProxy as $ } from 'eaglejs.esm.js';
 *
 * $(document).ready(function () {
 *   // Call when DOM is completely loaded
 * });
 *
 * @param {?(string|EventTarget|EventTarget[])} [selector=null] A selector to
 * match.
 * @param {string|EventTarget|EventTarget[]} [context=document] A selector to
 * use as context.
 * @returns {EagleJS} A new collection.
 */
const EagleJSProxy = (selector: string | EventTarget | EventTarget[] | null = null, context: string | EventTarget | EventTarget[] = document): EagleJS => {
  return new EagleJS(selector, context);
};
EagleJSProxy.prototype = EagleJS.prototype;
// Export
export { EagleJS, EagleJSProxy };

// TypeScript Things
interface EagleJS {
  attr(name: string): string | null
  attr(name: string, value: string): this
  data(): object
  data(key: string): string | undefined
  data(key: string, value: string): this
  html(): string
  html(value: string): this
  on<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this
  text(): string | null
  text(value: string): this

  // Return type fix
  filter(predicate: (value: EventTarget, index: number, array: EventTarget[]) => unknown, thisArg?: any): this
  slice(start?: number, end?: number): this
}
