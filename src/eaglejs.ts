/**
 * EagleJS.
 *
 * @version 0.7.1
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
   * let example = new EagleJS();
   *
   * // string
   * example = new EagleJS('selector');
   * example = new EagleJS('htmlString'); // Create HTML tag
   *
   * // EventTarget
   * example = new EagleJS(EventTarget);
   *
   * // EventTarget[]
   * example = new EagleJS(EagleJS);
   *
   * // string + string
   * example = new EagleJS('selector', 'selector');
   *
   * // string + EventTarget
   * example = new EagleJS('selector', EventTarget);
   *
   * // string + EventTarget[]
   * example = new EagleJS('selector', EagleJS);
   *
   * @see DOMParser on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMParser MDN} for
   * htmlString.
   * @param {EventTarget|EventTarget[]|string} [selector] A selector to match.
   * @param {EventTarget|EventTarget[]|string} [context=document] A selector to use as context.
   */
  public constructor (selector?: EventTarget | EventTarget[] | string, context: EventTarget | EventTarget[] | string = document) {
    super();
    if (typeof selector !== 'undefined') {
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
   * Check if the value is an `EventTarget`.
   *
   * @example
   * EagleJS.isEventTarget(element); // true
   * EagleJS.isEventTarget(document); // true
   * EagleJS.isEventTarget(window); // true
   *
   * @see EventTarget on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget MDN}.
   * @param {*} value The value to be checked.
   * @returns {boolean} `true` if the value is an `EventTarget`; otherwise, `false`.
   */
  public static isEventTarget (value: any): value is EventTarget {
    return Boolean(value) && Boolean(value.addEventListener);
  }

  /**
   * Add one or more class names to each `Element` in the collection.
   *
   * @example
   * new EagleJS(element).addClass('className');
   * new EagleJS(element).addClass('className', 'className');
   *
   * @see Element.classList.add() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add MDN}.
   * @param {...string} names One or more class names.
   * @throws {DOMException} Throws a `SyntaxError` if one of the arguments is the empty string.
   * @throws {DOMException} Throws an `InvalidCharacterError` if one of the arguments contains any
   * ASCII whitespace.
   * @returns {this} The current collection.
   */
  public addClass (...names: string[]): this {
    this.forEach((item: Element | EventTarget) => {
      if ('classList' in item) {
        item.classList.add(...names);
      }
    });
    return this;
  }

  /**
   * Insert a set of `Node` or `DOMString` objects after each `ChildNode` in the collection.
   * `DOMString` objects are inserted as equivalent `Text` nodes.
   *
   * @example
   * new EagleJS(element).after('text');
   * new EagleJS(element).after(Node);
   * new EagleJS(element).after('text', Node);
   * new EagleJS(element).after(Node, Node);
   *
   * @see ChildNode.after() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after MDN}.
   * @param {...(Node|string)} nodes A set of `Node` or `DOMString` objects to insert.
   * @returns {this} The current collection.
   */
  public after (...nodes: Array<Node | string>): this {
    let isFirst = true;
    this.slice().reverse().forEach((item: ChildNode | EventTarget) => {
      if ('after' in item) {
        nodes.forEach((node) => {
          if (typeof node === 'string' || isFirst) {
            item.after(node);
          } else {
            item.after(node.cloneNode(true));
          }
        });
        isFirst = false;
      }
    });
    return this;
  }

  /**
   * Insert a set of `Node` or `DOMString` objects after the last child of each `ParentNode` in the
   * collection. `DOMString` objects are inserted as equivalent `Text` nodes.
   *
   * @example
   * new EagleJS(element).append('text');
   * new EagleJS(element).append(Node);
   * new EagleJS(element).append('text', Node);
   * new EagleJS(element).append(Node, Node);
   *
   * @see ParentNode.append() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append MDN}.
   * @param {...(Node|string)} nodes A set of `Node` or `DOMString` objects to insert.
   * @returns {this} The current collection.
   */
  public append (...nodes: Array<Node | string>): this {
    let isFirst = true;
    this.slice().reverse().forEach((item: EventTarget | ParentNode) => {
      if ('append' in item) {
        nodes.forEach((node) => {
          if (typeof node === 'string' || isFirst) {
            item.append(node);
          } else {
            item.append(node.cloneNode(true));
          }
        });
        isFirst = false;
      }
    });
    return this;
  }

  /**
   * Get or set the attribute value of each `Element` in the collection.
   *
   * @example <caption>attr (name: string): string | null</caption>
   * new EagleJS(element).attr('attributeName');
   *
   * @example <caption>attr (name: string, value: string): this</caption>
   * new EagleJS(element).attr('attributeName', 'value');
   *
   * @see Element.getAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute MDN}.
   * @see Element.setAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute MDN}.
   * @param {string} name The name of the attribute.
   * @param {string} [value] The value for the attribute.
   * @throws {DOMException} Throws an `InvalidCharacterError` if the specified attribute name
   * contains one or more characters that are not valid in attribute names.
   * @returns {string|this|null} The attribute value of the first `Element`; Or if the value
   * parameter provided, returns the current collection.
   */
  public attr (name: string, value?: string): string | this | null {
    if (typeof value !== 'undefined') {
      this.forEach((item: Element | EventTarget) => {
        if ('setAttribute' in item) {
          item.setAttribute(name, value);
        }
      });
      return this;
    }
    /** @type {?string} */
    let returnValue: string | null = null;
    this.some((item: Element | EventTarget) => {
      if ('getAttribute' in item) {
        returnValue = item.getAttribute(name);
        return true;
      }
      return false;
    });
    return returnValue;
  }

  /**
   * Insert a set of `Node` or `DOMString` objects before each `ChildNode` in the collection.
   * `DOMString` objects are inserted as equivalent `Text` nodes.
   *
   * @example
   * new EagleJS(element).before('text');
   * new EagleJS(element).before(Node);
   * new EagleJS(element).before('text', Node);
   * new EagleJS(element).before(Node, Node);
   *
   * @see ChildNode.before() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before MDN}.
   * @param {...(Node|string)} nodes A set of `Node` or `DOMString` objects to insert.
   * @returns {this} The current collection.
   */
  public before (...nodes: Array<Node | string>): this {
    let isFirst = true;
    this.slice().reverse().forEach((item: ChildNode | EventTarget) => {
      if ('before' in item) {
        nodes.forEach((node) => {
          if (typeof node === 'string' || isFirst) {
            item.before(node);
          } else {
            item.before(node.cloneNode(true));
          }
        });
        isFirst = false;
      }
    });
    return this;
  }

  /**
   * Get the `children` property of each `ParentNode` in the collection, optionally filtered by a
   * selector.
   *
   * @example
   * new EagleJS(element).children();
   * new EagleJS(element).children('selectors');
   *
   * @see ParentNode.children on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children MDN}.
   * @param {?string} [filter=null] One or more selectors to filter.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  public children (filter: string | null = null): EagleJS {
    const elements = new EagleJS();
    this.forEach((item: EventTarget | ParentNode) => {
      if ('children' in item) {
        elements.push(...item.children);
      }
    });
    if (filter !== null) {
      return elements.filterWith(filter);
    }
    return elements;
  }

  /**
   * Create a clone of each `Node` in the collection.
   *
   * @example
   * new EagleJS(element).clone();
   * new EagleJS(element).clone(true);
   * new EagleJS(element).clone(false);
   *
   * @see Node.cloneNode() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode MDN}.
   * @param {boolean} [deep=false] If `true`, then `Node` and its whole subtree—including text that
   * may be in child `Text` nodes—is also copied.
   * @throws {DOMException} Throws a `NotSupportedError` if `Node` is a ShadowRoot.
   * @returns {EagleJS} A new collection of `Node`s.
   */
  public clone (deep: boolean = false): EagleJS {
    const elements = new EagleJS();
    this.forEach((item: EventTarget | Node) => {
      if ('cloneNode' in item) {
        elements.push(item.cloneNode(deep));
      }
    });
    return elements;
  }

  /**
   * Get the closest ancestor of each `Element` in the collection that matches selectors.
   *
   * @example
   * new EagleJS(element).closest('selectors');
   *
   * @see Element.closest() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest MDN}.
   * @param {string} selectors One or more selectors to match.
   * @throws {DOMException} Throws a `SyntaxError` if the syntax of the specified `selectors` is not
   * valid.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  public closest (selectors: string): EagleJS {
    const elements = new EagleJS();
    this.forEach((item: Element | EventTarget) => {
      if ('closest' in item) {
        const closest = item.closest(selectors);
        if (closest !== null) {
          elements.push(closest);
        }
      }
    });
    return elements;
  }

  /**
   * Merge two or more collections.
   *
   * @example
   * new EagleJS(element).concat(EagleJS, EagleJS, EagleJS);
   *
   * @see Array.prototype.concat() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat MDN}.
   * @param {...(Array<EventTarget>|EventTarget)} items Values to concatenate into a new collection.
   * @returns {this} A new collection.
   */
  public concat (...items: Array<ConcatArray<EventTarget> | EventTarget>): this {
    return super.concat(...items).filter((item, index, array) => {
      return EagleJS.isEventTarget(item) && array.indexOf(item) === index;
    }) as this;
  }

  /**
   * Get the `childNodes` property of each `Node` in the collection.
   *
   * @example
   * new EagleJS(element).contents();
   *
   * @see Node.childNodes on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes MDN}.
   * @returns {EagleJS} A new collection of `ChildNode`s.
   */
  public contents (): EagleJS {
    const elements = new EagleJS();
    this.forEach((item: EventTarget | Node) => {
      if ('childNodes' in item) {
        elements.push(...item.childNodes);
      }
    });
    return elements;
  }

  /**
   * Get or set the data attribute value of each `HTMLElement` and `SVGElement` in the collection.
   *
   * @example <caption>data (): object</caption>
   * new EagleJS(element).data();
   *
   * @example <caption>data (key: string): string | undefined</caption>
   * new EagleJS(element).data('key');
   *
   * @example <caption>data (key: string, value: string): this</caption>
   * new EagleJS(element).data('key', 'value');
   *
   * @see HTMLOrForeignElement.dataset on {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset MDN}.
   * @param {string} [key] The name of the data.
   * @param {string} [value] The new data value.
   * @returns {object|string|this|undefined} The dataset of the first `Element`.
   * If the key parameter provided, returns the value of the first `Element`.
   * If the value parameter provided, returns the current collection.
   */
  public data (key?: string, value?: string): object | string | this | undefined {
    if (typeof key !== 'undefined') {
      const dataKey = key.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
      if (typeof value !== 'undefined') {
        this.forEach((item: EventTarget | HTMLOrSVGElement) => {
          if ('dataset' in item) {
            item.dataset[dataKey] = value;
          }
        });
        return this;
      }
      /** @type {string|undefined} */
      let returnKeyValue: string | undefined;
      this.some((item: EventTarget | HTMLOrSVGElement) => {
        if ('dataset' in item) {
          returnKeyValue = item.dataset[dataKey];
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
   * new EagleJS(element).empty();
   *
   * @see Node.removeChild() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild MDN}.
   * @returns {this} The current collection.
   */
  public empty (): this {
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
   * new EagleJS(element).filterWith('selectors');
   *
   * @see Element.matches() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches MDN}.
   * @param {string} selectors A selector to match.
   * @param {boolean} [condition=true] A condition for test.
   * @returns {this} A new collection with the items that pass the test.
   */
  public filterWith (selectors: string, condition: boolean = true): this {
    return this.filter((item: Element | EventTarget) => {
      return 'matches' in item && item.matches(selectors) === condition;
    });
  }

  /**
   * Check if any collection `Element` has the specified attribute.
   *
   * @example
   * new EagleJS(element).hasAttr('attributeName');
   *
   * @see Element.hasAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute MDN}
   * @param {string} name The attribute to search.
   * @returns {boolean} `true` if any `Element` has the given attribute; otherwise, `false`.
   */
  public hasAttr (name: string): boolean {
    return this.some((item: Element | EventTarget) => {
      return 'hasAttribute' in item && item.hasAttribute(name);
    });
  }

  /**
   * Check if any collection `Element` has the specified class name.
   *
   * @example
   * new EagleJS(element).hasClass('className');
   *
   * @see Element.classList.contains() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains MDN}.
   * @param {string} name The class name to search.
   * @returns {boolean} `true` if any `Element` has the given class name; otherwise, `false`.
   */
  public hasClass (name: string): boolean {
    return this.some((item: Element | EventTarget) => {
      return 'classList' in item && item.classList.contains(name);
    });
  }

  /**
   * Get or set the `innerHTML` of each `Element` in the collection.
   *
   * @example <caption>html (): string</caption>
   * new EagleJS(element).html();
   *
   * @example <caption>html (value: string): this</caption>
   * new EagleJS(element).html('htmlString');
   *
   * @see Element.innerHTML on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML MDN}.
   * @param {string} [value] The html string to set.
   * @returns {string|this} The HTML string of the first `Element`; Or if the value parameter
   * provided, returns the current collection.
   */
  public html (value?: string): string | this {
    if (typeof value !== 'undefined') {
      this.forEach((item: Element | EventTarget) => {
        if ('innerHTML' in item) {
          item.innerHTML = value;
        }
      });
      return this;
    }
    /** @type {string} */
    let returnValue: string = '';
    this.some((item: Element | EventTarget) => {
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
   * new EagleJS(element).matches('selectors');
   *
   * @see Element.matches() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches MDN}.
   * @param {string} selectors One or more selectors to match.
   * @throws {DOMException} Throws a `SyntaxError` if the syntax of the specified `selectors` is not
   * valid.
   * @returns {boolean} `true` if any `Element` matches the given selectors; otherwise, `false`.
   */
  public matches (selectors: string): boolean {
    return this.some((item: Element | EventTarget) => {
      return 'matches' in item && item.matches(selectors);
    });
  }

  /**
   * Get the `nextElementSibling` of each `Node` in the collection, optionally filtered by a
   * selector.
   *
   * @example
   * new EagleJS(element).next();
   * new EagleJS(element).next('selectors');
   *
   * @see NonDocumentTypeChildNode.nextElementSibling on {@link https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling MDN}.
   * @param {?string} [filter=null] One or more selectors to filter.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  public next (filter: string | null = null): EagleJS {
    const elements = new EagleJS();
    this.forEach((item: EventTarget | NonDocumentTypeChildNode) => {
      if ('nextElementSibling' in item && item.nextElementSibling !== null) {
        elements.push(item.nextElementSibling);
      }
    });
    if (filter !== null) {
      return elements.filterWith(filter);
    }
    return elements;
  }

  /**
   * Remove the `EventListener` from each item in the collection.
   *
   * @example
   * new EagleJS(element).off('click', handler);
   *
   * @see EventTarget.removeEventListener() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener MDN}.
   * @param {string} type A string that specifies the type of event for which to remove an event
   * listener.
   * @param {EventListener|EventListenerObject} listener The `EventListener` function of the event
   * handler to remove from the event target.
   * @param {EventListenerOptions|boolean} [options=false] An options object specifies the
   * characteristics of the event listener.
   * @returns {this} The current collection.
   */
  public off (type: string, listener: EventListener | EventListenerObject, options: EventListenerOptions | boolean = false): this {
    this.forEach((item) => {
      item.removeEventListener(type, listener, options);
    });
    return this;
  }

  /**
   * Attach the `EventListener` to each item in the collection.
   *
   * @example
   * new EagleJS(element).on('click', (event) => {
   *   console.log(event.type);
   * });
   *
   * @see EventTarget.addEventListener() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener MDN}.
   * @param {string} type A case-sensitive string representing the event type to listen for.
   * @param {EventListener|EventListenerObject} listener The handler function for the event.
   * @param {AddEventListenerOptions|boolean} [options=false] An options object specifies the
   * characteristics of the event listener.
   * @returns {this} The current collection.
   */
  public on (type: string, listener: EventListener | EventListenerObject, options: AddEventListenerOptions | boolean = false): this {
    this.forEach((item) => {
      item.addEventListener(type, listener, options);
    });
    return this;
  }

  /**
   * Get the `parentNode` of each `Node` in the collection, optionally filtered by a selector.
   *
   * @example
   * new EagleJS(element).parent();
   * new EagleJS(element).parent('selectors');
   *
   * @see Node.parentNode on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode MDN}.
   * @param {?string} [filter=null] One or more selectors to filter.
   * @returns {EagleJS} A new collection of `Node`s.
   */
  public parent (filter: string | null = null): EagleJS {
    const elements = new EagleJS();
    this.forEach((item: EventTarget | Node) => {
      if ('parentNode' in item && item.parentNode !== null) {
        elements.push(item.parentNode);
      }
    });
    if (filter !== null) {
      return elements.filterWith(filter);
    }
    return elements;
  }

  /**
   * Insert a set of `Node` or `DOMString` objects before the first child of each `ParentNode` in
   * the collection. `DOMString` objects are inserted as equivalent `Text` nodes.
   *
   * @example
   * new EagleJS(element).prepend('text');
   * new EagleJS(element).prepend(Node);
   * new EagleJS(element).prepend('text', Node);
   * new EagleJS(element).prepend(Node, Node);
   *
   * @see ParentNode.prepend() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend MDN}.
   * @param {...(Node|string)} nodes A set of `Node` or `DOMString` objects to insert.
   * @returns {this} The current collection.
   */
  public prepend (...nodes: Array<Node | string>): this {
    let isFirst = true;
    this.slice().reverse().forEach((item: EventTarget | ParentNode) => {
      if ('prepend' in item) {
        nodes.forEach((node) => {
          if (typeof node === 'string' || isFirst) {
            item.prepend(node);
          } else {
            item.prepend(node.cloneNode(true));
          }
        });
        isFirst = false;
      }
    });
    return this;
  }

  /**
   * Get the `previousElementSibling` of each `Node` in the collection, optionally filtered by a
   * selector.
   *
   * @example
   * new EagleJS(element).prev();
   * new EagleJS(element).prev('selectors');
   *
   * @see NonDocumentTypeChildNode.previousElementSibling on {@link https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling MDN}.
   * @param {?string} [filter=null] One or more selectors to filter.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  public prev (filter: string | null = null): EagleJS {
    const elements = new EagleJS();
    this.forEach((item: EventTarget | NonDocumentTypeChildNode) => {
      if ('previousElementSibling' in item && item.previousElementSibling !== null) {
        elements.push(item.previousElementSibling);
      }
    });
    if (filter !== null) {
      return elements.filterWith(filter);
    }
    return elements;
  }

  /**
   * Add one or more items to the end of the collection.
   *
   * @example
   * new EagleJS(element).push(EventTarget, EventTarget, EventTarget);
   *
   * // Spread and push
   * new EagleJS(element).push(...EagleJS);
   *
   * @see Array.prototype.push() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push MDN}.
   * @param {...EventTarget} items Items to add to the end of the collection.
   * @returns {number} The new length.
   */
  public push (...items: EventTarget[]): number {
    return super.push(...items.filter((item) => {
      return EagleJS.isEventTarget(item) && !this.includes(item);
    }));
  }

  /**
   * Get the first `Element` descendant of each `ParentNode` in the collection that matches
   * selectors.
   *
   * @example
   * new EagleJS(element).querySelector('selector');
   *
   * @see ParentNode.querySelector() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelector MDN}.
   * @param {string} selectors One or more selectors to match.
   * @throws {DOMException} Throws a `SyntaxError` if the syntax of the specified `selectors` is not
   * valid.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  public querySelector (selectors: string): EagleJS {
    const elements = new EagleJS();
    this.forEach((item: EventTarget | ParentNode) => {
      if ('querySelector' in item) {
        const result = item.querySelector(selectors);
        if (result !== null) {
          elements.push(result);
        }
      }
    });
    return elements;
  }

  /**
   * Get all `Element` descendants of each `ParentNode` in the collection that matches selectors.
   *
   * @example
   * new EagleJS(element).querySelectorAll('selector');
   *
   * @see ParentNode.querySelectorAll() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelectorAll MDN}.
   * @param {string} selectors One or more selectors to match.
   * @throws {DOMException} Throws a `SyntaxError` if the syntax of the specified `selectors` is not
   * valid.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  public querySelectorAll (selectors: string): EagleJS {
    const elements = new EagleJS();
    this.forEach((item: EventTarget | ParentNode) => {
      if ('querySelectorAll' in item) {
        elements.push(...item.querySelectorAll(selectors));
      }
    });
    return elements;
  }

  /**
   * Specify a function to execute when the DOM is completely loaded.
   *
   * @example
   * new EagleJS(document).ready(() => {
   *   // Call when DOM is completely loaded
   * });
   *
   * @see DOMContentLoaded event on {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event MDN}.
   * @param {EventListener} listener The handler function for the event.
   * @returns {this} The current collection.
   */
  public ready (listener: EventListener): this {
    this.forEach((item: Document | EventTarget) => {
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
   * Remove each `ChildNode` of the collection from the DOM.
   *
   * @example
   * new EagleJS(element).remove();
   *
   * @see ChildNode.remove() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove MDN}.
   * @returns {this} The current collection.
   */
  public remove (): this {
    this.forEach((item: ChildNode | EventTarget) => {
      if ('remove' in item) {
        item.remove();
      }
    });
    return this;
  }

  /**
   * Remove one or more attributes from each `Element` in the collection.
   *
   * @example
   * new EagleJS(element).removeAttr('attributeName');
   * new EagleJS(element).removeAttr('attributeName', 'attributeName');
   *
   * @see Element.removeAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute MDN}.
   * @param {...string} names One or more attribute names.
   * @returns {this} The current collection.
   */
  public removeAttr (...names: string[]): this {
    this.forEach((item: Element | EventTarget) => {
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
   * new EagleJS(element).removeClass('className');
   * new EagleJS(element).removeClass('className', 'className');
   *
   * @see Element.classList.remove() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove MDN}.
   * @param {...string} names One or more class names.
   * @throws {DOMException} Throws a `SyntaxError` if one of the arguments is the empty string.
   * @throws {DOMException} Throws an `InvalidCharacterError` if one of the arguments contains any
   * ASCII whitespace.
   * @returns {this} The current collection.
   */
  public removeClass (...names: string[]): this {
    this.forEach((item: Element | EventTarget) => {
      if ('classList' in item) {
        item.classList.remove(...names);
      }
    });
    return this;
  }

  /**
   * Replace each `ChildNode` in the collection with a set of `Node` or `DOMString` objects.
   * `DOMString` objects are inserted as equivalent `Text` nodes.
   *
   * @example
   * new EagleJS(element).replaceWith('text');
   * new EagleJS(element).replaceWith(Node);
   * new EagleJS(element).replaceWith('text', Node);
   * new EagleJS(element).replaceWith(Node, Node);
   *
   * @see ChildNode.replaceWith() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith MDN}.
   * @param {...(Node|string)} nodes A set of `Node` or `DOMString` objects to replace.
   * @returns {this} The current collection.
   */
  public replaceWith (...nodes: Array<Node | string>): this {
    let isFirst = true;
    this.slice().reverse().forEach((item: ChildNode | EventTarget) => {
      if ('replaceWith' in item) {
        nodes.forEach((node) => {
          if (typeof node === 'string' || isFirst) {
            item.replaceWith(node);
          } else {
            item.replaceWith(node.cloneNode(true));
          }
        });
        isFirst = false;
      }
    });
    return this;
  }

  /**
   * Get the siblings of each `Node` in the collection, optionally filtered by a selector.
   *
   * @example
   * new EagleJS(element).siblings();
   * new EagleJS(element).siblings('selectors');
   *
   * @param {?string} [filter=null] One or more selectors to filter.
   * @returns {EagleJS} A new collection of `Element`s.
   */
  public siblings (filter: string | null = null): EagleJS {
    const elements = new EagleJS();
    this.forEach((item: EventTarget | Node) => {
      if ('parentNode' in item && item.parentNode !== null) {
        [...item.parentNode.children].forEach((child) => {
          if (child !== item) {
            elements.push(child);
          }
        });
      }
    });
    if (filter !== null) {
      return elements.filterWith(filter);
    }
    return elements;
  }

  /**
   * Get or set the `textContent` of each `Node` in the collection.
   *
   * @example <caption>text (): string | null</caption>
   * new EagleJS(element).text();
   *
   * @example <caption>text (value: string): this</caption>
   * new EagleJS(element).text('value');
   *
   * @see Node.textContent on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent MDN}.
   * @param {string} [value] The text to set.
   * @returns {string|this|null} Text of the first `Node`; Or if the value parameter provided,
   * returns the current collection.
   */
  public text (value?: string): string | this | null {
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
   * new EagleJS(element).toggleAttr('attributeName');
   * new EagleJS(element).toggleAttr('attributeName', true);
   * new EagleJS(element).toggleAttr('attributeName', false);
   *
   * @see Element.toggleAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/toggleAttribute MDN}
   * (Simulated).
   * @param {string} name The name of the attribute.
   * @param {boolean} [force] A boolean value to determine whether the attribute should be added or
   * removed.
   * @returns {this} The current collection.
   */
  public toggleAttr (name: string, force?: boolean): this {
    this.forEach((item: Element | EventTarget) => {
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
   * new EagleJS(element).toggleClass('className');
   * new EagleJS(element).toggleClass('className', true);
   * new EagleJS(element).toggleClass('className', false);
   *
   * @see Element.classList.toggle() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle MDN}.
   * @param {string} name The class name to toggle.
   * @param {boolean} [force] A boolean value to determine whether the class should be added or
   * removed.
   * @throws {DOMException} Throws a `SyntaxError` if one of the arguments is the empty string.
   * @throws {DOMException} Throws an `InvalidCharacterError` if one of the arguments contains any
   * ASCII whitespace.
   * @returns {this} The current collection.
   */
  public toggleClass (name: string, force?: boolean): this {
    this.forEach((item: Element | EventTarget) => {
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
   * new EagleJS(element).trigger('click');
   * new EagleJS(element).trigger('click', data);
   *
   * @see CustomEvent on {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent MDN}.
   * @see EventTarget.dispatchEvent() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent MDN}.
   * @param {Event|string} event The `Event` object to be triggered or name of the event.
   * @param {?object} [data=null] Additional data to pass along to the event handler.
   * @returns {this} The current collection.
   */
  public trigger (event: Event | string, data: object | null = null): this {
    /** @type {Event} */
    let dispatchEvent: Event;
    if (typeof event === 'string') {
      dispatchEvent = new CustomEvent(event, {
        bubbles: true,
        cancelable: true,
        detail: data
      });
    } else {
      dispatchEvent = event;
    }
    this.forEach((item) => {
      item.dispatchEvent(dispatchEvent);
    });
    return this;
  }

  /**
   * Add one or more items to the beginning of the collection.
   *
   * @example
   * new EagleJS(element).unshift(EventTarget, EventTarget, EventTarget);
   *
   * // Spread and unshift
   * new EagleJS(element).unshift(...EagleJS);
   *
   * @see Array.prototype.unshift() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift MDN}.
   * @param {...EventTarget} items Items to add to the front of the collection.
   * @returns {number} The new length.
   */
  public unshift (...items: EventTarget[]): number {
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
 * $(document).ready(() => {
 *   // Call when DOM is completely loaded
 * });
 *
 * @param {EventTarget|EventTarget[]|string} [selector] A selector to match.
 * @param {EventTarget|EventTarget[]|string} [context=document] A selector to use as context.
 * @returns {EagleJS} A new collection.
 */
const EagleJSProxy = (selector?: EventTarget | EventTarget[] | string, context: EventTarget | EventTarget[] | string = document): EagleJS => {
  return new EagleJS(selector, context);
};
EagleJSProxy.prototype = EagleJS.prototype;

// TypeScript Things
interface EagleJS {
  attr(name: string): string | null
  attr(name: string, value: string): this
  data(): object
  data(key: string): string | undefined
  data(key: string, value: string): this
  html(): string
  html(value: string): this
  on<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, event: GlobalEventHandlersEventMap[K]) => any, options?: AddEventListenerOptions | boolean): this
  text(): string | null
  text(value: string): this

  // Return type fix
  filter(predicate: (value: EventTarget, index: number, array: EventTarget[]) => unknown, thisArg?: any): this
  slice(start?: number, end?: number): this
}
