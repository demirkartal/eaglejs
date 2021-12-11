/*!
 * EagleJS 0.8.0 (https://github.com/demirkartal/eaglejs)
 * Copyright 2020-2021 Cem Demirkartal
 * Licensed under MIT
 */
/**
 * EagleJS.
 */
class EagleJS extends Array<EventTarget> {
  public static EventTarget: { new(): EventTarget, prototype: EventTarget, };

  /**
   * Return a collection of given items.
   *
   * @example <caption>constructor ()</caption>
   * ```
   * const example = new EagleJS();
   * ```
   * @example <caption>constructor (...items: EventTarget[])</caption>
   * ```
   * const example = new EagleJS(document);
   * ```
   * @param items - Items to add to the collection.
   */
  public constructor (...items: EventTarget[]) {
    super();
    this.push(...items);
  }

  /**
   * Add one or more class names to each `Element` in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).addClass('className');
   * new EagleJS(element).addClass('className', 'className');
   * ```
   * @see Element.classList.add() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add | MDN}.
   * @param names - One or more class names.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws a `SyntaxError` if one of the arguments is the empty string.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws an `InvalidCharacterError` if one of the arguments contains any ASCII whitespace.
   * @returns The current collection.
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
   * ```
   * new EagleJS(element).after('text');
   * new EagleJS(element).after(Node);
   * new EagleJS(element).after('text', Node);
   * new EagleJS(element).after(Node, Node);
   * ```
   * @see ChildNode.after() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after | MDN}.
   * @param nodes - A set of `Node` or `DOMString` objects to insert.
   * @returns The current collection.
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
   * ```
   * new EagleJS(element).append('text');
   * new EagleJS(element).append(Node);
   * new EagleJS(element).append('text', Node);
   * new EagleJS(element).append(Node, Node);
   * ```
   * @see ParentNode.append() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append | MDN}.
   * @param nodes - A set of `Node` or `DOMString` objects to insert.
   * @returns The current collection.
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
   * Get the attribute value of the first `Element` in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).attr('attributeName');
   * ```
   * @see Element.getAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute | MDN}.
   * @param name - The name of the attribute.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws an `InvalidCharacterError` if the specified attribute name contains one or more
   * characters that are not valid in attribute names.
   * @returns The attribute value of the first `Element`.
   */
  public attr (name: string): string | null;

  /**
   * Set the attribute value of each `Element` in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).attr('attributeName', 'value');
   * ```
   * @see Element.setAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute | MDN}.
   * @param name - The name of the attribute.
   * @param value - The value for the attribute.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws an `InvalidCharacterError` if the specified attribute name contains one or more
   * characters that are not valid in attribute names.
   * @returns Returns the current collection.
   */
  public attr (name: string, value: string): this;

  public attr (name: string, value?: string): string | this | null {
    if (typeof value !== 'undefined') {
      this.forEach((item: Element | EventTarget) => {
        if ('setAttribute' in item) {
          item.setAttribute(name, value);
        }
      });
      return this;
    }
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
   * ```
   * new EagleJS(element).before('text');
   * new EagleJS(element).before(Node);
   * new EagleJS(element).before('text', Node);
   * new EagleJS(element).before(Node, Node);
   * ```
   * @see ChildNode.before() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before | MDN}.
   * @param nodes - A set of `Node` or `DOMString` objects to insert.
   * @returns The current collection.
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
   * ```
   * new EagleJS(element).children();
   * new EagleJS(element).children('selectors');
   * ```
   * @see ParentNode.children on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children | MDN}.
   * @param filter - One or more selectors to filter.
   * @returns A new collection of `Element`s.
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
   * ```
   * new EagleJS(element).clone();
   * new EagleJS(element).clone(true);
   * new EagleJS(element).clone(false);
   * ```
   * @see Node.cloneNode() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode | MDN}.
   * @param deep - If `true`, then `Node` and its whole subtree—including text
   * that may be in child `Text` nodes—is also copied.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws a `NotSupportedError` if `Node` is a ShadowRoot.
   * @returns A new collection of `Node`s.
   */
  public clone (deep = false): EagleJS {
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
   * ```
   * new EagleJS(element).closest('selectors');
   * ```
   * @see Element.closest() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest | MDN}.
   * @param selectors - One or more selectors to match.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws a `SyntaxError` if the syntax of the specified `selectors` is not valid.
   * @returns A new collection of `Element`s.
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
   * ```
   * new EagleJS(element).concat(EagleJS, EagleJS, EagleJS);
   * ```
   * @see Array.prototype.concat() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat | MDN}.
   * @param items - Values to concatenate into a new collection.
   * @returns A new collection.
   */
  public override concat (...items: Array<ConcatArray<EventTarget> | EventTarget>): this {
    return super.concat(...items).filter((item, index, array) => {
      return item instanceof EagleJS.EventTarget && array.indexOf(item) === index;
    }) as this;
  }

  /**
   * Get the `childNodes` property of each `Node` in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).contents();
   * ```
   * @see Node.childNodes on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes | MDN}.
   * @returns A new collection of `ChildNode`s.
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
   * Get `dataset` of the first `HTMLElement` or `SVGElement` in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).data();
   * ```
   * @see HTMLOrForeignElement.dataset on {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset | MDN}.
   * @returns The dataset of the first `HTMLElement` or `SVGElement`.
   */
  public data (): DOMStringMap;

  /**
   * Get the data attribute value of first `HTMLElement` or `SVGElement` in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).data('key');
   * ```
   * @see HTMLOrForeignElement.dataset on {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset | MDN}.
   * @param key - The name of the data.
   * @returns Returns the data attribute value of the first `HTMLElement` or `SVGElement`.
   */
  public data (key: string): string | undefined;

  /**
   * Set the data attribute value of each `HTMLElement` and `SVGElement` in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).data('key', 'value');
   * ```
   * @see HTMLOrForeignElement.dataset on {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset | MDN}.
   * @param key - The name of the data.
   * @param value - The new data value.
   * @returns Returns the current collection.
   */
  public data (key: string, value: string): this;

  public data (key?: string, value?: string): DOMStringMap | string | this | undefined {
    if (typeof key !== 'undefined') {
      const dataKey = key.replace(/-([a-z])/g, (_match, letter: string) => letter.toUpperCase());
      if (typeof value !== 'undefined') {
        this.forEach((item: EventTarget | HTMLOrSVGElement) => {
          if ('dataset' in item) {
            item.dataset[dataKey] = value;
          }
        });
        return this;
      }
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
    let returnValue: DOMStringMap = {};
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
   * ```
   * new EagleJS(element).empty();
   * ```
   * @see Node.removeChild() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild | MDN}.
   * @returns The current collection.
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
   * ```
   * new EagleJS(element).filterWith('selectors');
   * ```
   * @see Element.matches() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches | MDN}.
   * @param selectors - A selector to match.
   * @param condition - A condition for test.
   * @returns A new collection with the items that pass the test.
   */
  public filterWith (selectors: string, condition = true): this {
    return this.filter((item: Element | EventTarget) => {
      return 'matches' in item && item.matches(selectors) === condition;
    });
  }

  /**
   * Check if any collection `Element` has the specified attribute.
   *
   * @example
   * ```
   * new EagleJS(element).hasAttr('attributeName');
   * ```
   * @see Element.hasAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute | MDN}
   * @param name - The attribute to search.
   * @returns `true` if any `Element` has the given attribute; otherwise, `false`.
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
   * ```
   * new EagleJS(element).hasClass('className');
   * ```
   * @see Element.classList.contains() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains | MDN}.
   * @param name - The class name to search.
   * @returns `true` if any `Element` has the given class name; otherwise, `false`.
   */
  public hasClass (name: string): boolean {
    return this.some((item: Element | EventTarget) => {
      return 'classList' in item && item.classList.contains(name);
    });
  }

  /**
   * Get the `innerHTML` of first `Element` in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).html();
   * ```
   * @see Element.innerHTML on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML | MDN}.
   * @returns The HTML string of the first `Element`.
   */
  public html (): string;

  /**
   * Set the `innerHTML` of each `Element` in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).html('htmlString');
   * ```
   * @see Element.innerHTML on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML | MDN}.
   * @param value - The html string to set.
   * @returns Returns the current collection.
   */
  public html (value: string): this;

  public html (value?: string): string | this {
    if (typeof value !== 'undefined') {
      this.forEach((item: Element | EventTarget) => {
        if ('innerHTML' in item) {
          item.innerHTML = value;
        }
      });
      return this;
    }
    let returnValue = '';
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
   * ```
   * new EagleJS(element).matches('selectors');
   * ```
   * @see Element.matches() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches | MDN}.
   * @param selectors - One or more selectors to match.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws a `SyntaxError` if the syntax of the specified `selectors` is not valid.
   * @returns `true` if any `Element` matches the given selectors; otherwise, `false`.
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
   * ```
   * new EagleJS(element).next();
   * new EagleJS(element).next('selectors');
   * ```
   * @see NonDocumentTypeChildNode.nextElementSibling on {@link https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling | MDN}.
   * @param filter - One or more selectors to filter.
   * @returns A new collection of `Element`s.
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

  public off (
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean
  ): this;

  public off<K extends keyof GlobalEventHandlersEventMap>(
    type: K,
    listener: (
      this: GlobalEventHandlers,
      event: GlobalEventHandlersEventMap[K]
    ) => unknown,
    options?: EventListenerOptions | boolean): this;

  /**
   * Remove the `EventListener` from each item in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).off('click', handler);
   * ```
   * @see EventTarget.removeEventListener() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener | MDN}.
   * @param type - A string that specifies the type of event for which to remove an event listener.
   * @param listener - The `EventListener` function of the event handler to remove from the event
   * target.
   * @param options - An options object specifies the* characteristics of the event listener.
   * @returns The current collection.
   */
  public off (
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options: EventListenerOptions | boolean = false
  ): this {
    this.forEach((item) => {
      item.removeEventListener(type, listener, options);
    });
    return this;
  }

  public on (
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean
  ): this;

  public on<K extends keyof GlobalEventHandlersEventMap>(
    type: K,
    listener: (
      this: GlobalEventHandlers,
      event: GlobalEventHandlersEventMap[K]
    ) => unknown,
    options?: AddEventListenerOptions | boolean): this;

  /**
   * Attach the `EventListener` to each item in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).on('click', (event) => {
   *   console.log(event.type);
   * });
   * ```
   * @see EventTarget.addEventListener() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener | MDN}.
   * @param type - A case-sensitive string representing the event type to listen for.
   * @param listener - The handler function for the event.
   * @param options - An options object specifies the characteristics of the event listener.
   * @returns The current collection.
   */
  public on (
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options: AddEventListenerOptions | boolean = false
  ): this {
    this.forEach((item) => {
      item.addEventListener(type, listener, options);
    });
    return this;
  }

  /**
   * Get the `parentNode` of each `Node` in the collection, optionally filtered by a selector.
   *
   * @example
   * ```
   * new EagleJS(element).parent();
   * new EagleJS(element).parent('selectors');
   * ```
   * @see Node.parentNode on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode | MDN}.
   * @param filter - One or more selectors to filter.
   * @returns A new collection of `Node`s.
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
   * ```
   * new EagleJS(element).prepend('text');
   * new EagleJS(element).prepend(Node);
   * new EagleJS(element).prepend('text', Node);
   * new EagleJS(element).prepend(Node, Node);
   * ```
   * @see ParentNode.prepend() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend | MDN}.
   * @param nodes - A set of `Node` or `DOMString` objects to insert.
   * @returns The current collection.
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
   * ```
   * new EagleJS(element).prev();
   * new EagleJS(element).prev('selectors');
   * ```
   * @see NonDocumentTypeChildNode.previousElementSibling on {@link https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling | MDN}.
   * @param filter - One or more selectors to filter.
   * @returns A new collection of `Element`s.
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
   * ```
   * new EagleJS(element).push(EventTarget, EventTarget, EventTarget);
   *
   * // Spread and push
   * new EagleJS(element).push(...EagleJS);
   * ```
   * @see Array.prototype.push() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push | MDN}.
   * @param items - Items to add to the end of the collection.
   * @returns The new length.
   */
  public override push (...items: EventTarget[]): number {
    return super.push(...items.filter((item) => {
      return item instanceof EagleJS.EventTarget && !this.includes(item);
    }));
  }

  /**
   * Get the first `Element` descendant of each `ParentNode` in the collection that matches
   * selectors.
   *
   * @example
   * ```
   * new EagleJS(element).querySelector('selector');
   * ```
   * @see ParentNode.querySelector() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelector | MDN}.
   * @param selectors - One or more selectors to match.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws a `SyntaxError` if the syntax of the specified `selectors` is not valid.
   * @returns A new collection of `Element`s.
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
   * ```
   * new EagleJS(element).querySelectorAll('selector');
   * ```
   * @see ParentNode.querySelectorAll() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelectorAll | MDN}.
   * @param selectors - One or more selectors to match.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws a `SyntaxError` if the syntax of the specified `selectors` is not valid.
   * @returns A new collection of `Element`s.
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
   * ```
   * new EagleJS(document).ready(() => {
   *   // Call when DOM is completely loaded
   * });
   * ```
   * @see DOMContentLoaded event on {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event | MDN}.
   * @param listener - The handler function for the event.
   * @returns The current collection.
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
   * ```
   * new EagleJS(element).remove();
   * ```
   * @see ChildNode.remove() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove | MDN}.
   * @returns The current collection.
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
   * ```
   * new EagleJS(element).removeAttr('attributeName');
   * new EagleJS(element).removeAttr('attributeName', 'attributeName');
   * ```
   * @see Element.removeAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute | MDN}.
   * @param names - One or more attribute names.
   * @returns The current collection.
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
   * ```
   * new EagleJS(element).removeClass('className');
   * new EagleJS(element).removeClass('className', 'className');
   * ```
   * @see Element.classList.remove() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove | MDN}.
   * @param names - One or more class names.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws a `SyntaxError` if one of the arguments is the empty string.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws an `InvalidCharacterError` if one of the arguments contains any ASCII whitespace.
   * @returns The current collection.
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
   * ```
   * new EagleJS(element).replaceWith('text');
   * new EagleJS(element).replaceWith(Node);
   * new EagleJS(element).replaceWith('text', Node);
   * new EagleJS(element).replaceWith(Node, Node);
   * ```
   * @see ChildNode.replaceWith() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith | MDN}.
   * @param nodes - A set of `Node` or `DOMString` objects to replace.
   * @returns The current collection.
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
   * ```
   * new EagleJS(element).siblings();
   * new EagleJS(element).siblings('selectors');
   * ```
   * @param filter - One or more selectors to filter.
   * @returns A new collection of `Element`s.
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
   * Get the `textContent` of first `Node` in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).text();
   * ```
   * @see Node.textContent on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent | MDN}.
   * @returns Text of the first `Node`.
   */
  public text (): string | null;

  /**
   * Set the `textContent` of each `Node` in the collection.
   *
   * @example
   * ```
   * new EagleJS(element).text('value');
   * ```
   * @see Node.textContent on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent | MDN}.
   * @param value - The text to set.
   * @returns Returns the current collection.
   */
  public text (value: string): this;

  public text (value?: string): string | this | null {
    if (typeof value !== 'undefined') {
      this.forEach((item: EventTarget | Node) => {
        if ('textContent' in item) {
          item.textContent = value;
        }
      });
      return this;
    }
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
   * ```
   * new EagleJS(element).toggleAttr('attributeName');
   * new EagleJS(element).toggleAttr('attributeName', true);
   * new EagleJS(element).toggleAttr('attributeName', false);
   * ```
   * @see Element.toggleAttribute() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/toggleAttribute | MDN}
   * (Simulated).
   * @param name - The name of the attribute.
   * @param force - A boolean value to determine whether the attribute should be added or removed.
   * @returns The current collection.
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
   * ```
   * new EagleJS(element).toggleClass('className');
   * new EagleJS(element).toggleClass('className', true);
   * new EagleJS(element).toggleClass('className', false);
   * ```
   * @see Element.classList.toggle() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle | MDN}.
   * @param name - The class name to toggle.
   * @param force - A boolean value to determine whether the class should be added or removed.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws a `SyntaxError` if one of the arguments is the empty string.
   * @throws {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException | DOMException}
   * Throws an `InvalidCharacterError` if one of the arguments contains any ASCII whitespace.
   * @returns The current collection.
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
   * ```
   * const event = new CustomEvent('click');
   * new EagleJS(element).trigger(event);
   * ```
   * @see EventTarget.dispatchEvent() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent | MDN}.
   * @param event - The `Event` object to be triggered.
   * @returns The current collection.
   */
  public trigger (event: Event): this {
    this.forEach((item) => {
      item.dispatchEvent(event);
    });
    return this;
  }

  /**
   * Add one or more items to the beginning of the collection.
   *
   * @example
   * ```
   * new EagleJS(element).unshift(EventTarget, EventTarget, EventTarget);
   *
   * // Spread and unshift
   * new EagleJS(element).unshift(...EagleJS);
   * ```
   * @see Array.prototype.unshift() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift | MDN}.
   * @param items - Items to add to the front of the collection.
   * @returns The new length.
   */
  public override unshift (...items: EventTarget[]): number {
    return super.unshift(...items.filter((item) => {
      return item instanceof EagleJS.EventTarget && !this.includes(item);
    }));
  }
}
EagleJS.EventTarget = EventTarget;
export default EagleJS;

interface EagleJS {
  filter(predicate: (value: EventTarget, index: number, array: EventTarget[]) => unknown, thisArg?: unknown): this;
  slice(start?: number, end?: number): this;
}
