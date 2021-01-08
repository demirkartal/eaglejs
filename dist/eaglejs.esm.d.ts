/** @module eaglejs */
/**
 * EagleJS.
 *
 * @version   0.6.2
 * @copyright 2020-2021 Cem Demirkartal
 * @license   MIT
 * @see       {@link https://github.com/eagleirons/eaglejs GitHub}
 * @augments  Array<DOMItem>
 */
declare class EagleJS extends Array<DOMItem> {
  /**
   * Return a collection of matched items or created nodes by HTML string.
   *
   * @example
   * // string
   * $('selector');
   * $('htmlString'); // Create HTML tag
   *
   * // DOMItem
   * $(DOMItem);
   *
   * // DOMItem[]
   * $(EagleJS);
   *
   * // string + string
   * $('selector', 'selector');
   *
   * // string + DOMItem
   * $('selector', DOMItem);
   *
   * // string + DOMItem[]
   * $('selector', EagleJS);
   *
   * @see DOMParser on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMParser MDN}
   * for htmlString.
   * @param {?(string|DOMItem|DOMItem[])} [selector=null] A selector to match.
   * @param {string|DOMItem|DOMItem[]} [context=document] A selector to use as
   * context.
   */
  constructor (selector?: string | DOMItem | DOMItem[] | null, context?: string | DOMItem | DOMItem[]);
  /**
   * Check if the value is a `DOMItem`.
   *
   * @example
   * EagleJS.isDOMItem(element); // true
   * EagleJS.isDOMItem(document); // true
   * EagleJS.isDOMItem(window); // true
   *
   * @see {@link module:eaglejs~DOMItem DOMItem} type.
   * @param {*} value The value to be checked.
   * @returns {boolean} `true` if the value is a `DOMItem`; otherwise, `false`.
   */
  static isDOMItem (value: any): value is DOMItem;
  /**
   * Add one or more class names to each `Element` in the collection.
   *
   * @example
   * $(element).addClass('className');
   * $(element).addClass('className', 'className');
   *
   * @see Element.classList.add() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add MDN}.
   * @param {...string} names One or more class names.
   * @returns {this} The current collection.
   */
  addClass (...names: string[]): this;
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
   * (Polyfilled).
   * @param {...(string|Node)} nodes A set of `Node` or `DOMString` objects to
   * insert.
   * @returns {this} The current collection.
   */
  after (...nodes: Array<string | Node>): this;
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
   * (Polyfilled).
   * @param {...(string|Node)} nodes A set of `Node` or `DOMString` objects to
   * insert.
   * @returns {this} The current collection.
   */
  append (...nodes: Array<string | Node>): this;
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
   * (Polyfilled).
   * @param {...(string|Node)} nodes A set of `Node` or `DOMString` objects to
   * insert.
   * @returns {this} The current collection.
   */
  before (...nodes: Array<string | Node>): this;
  /**
   * Get the `children` property of each `ParentNode` in the collection,
   * optionally filtered by a selector.
   *
   * @example
   * $(element).children();
   * $(element).children('selector');
   *
   * @see ParentNode.children on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children MDN}.
   * @param {?string} [filter=null] A selector to filter.
   * @returns {EagleJS} A new collection of `Element` objects.
   */
  children (filter?: string | null): EagleJS;
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
   * @returns {EagleJS} A new collection of `Node` objects.
   */
  clone (deep?: boolean): EagleJS;
  /**
   * Get the closest ancestor of each `Element` in the collection matching with
   * the selector.
   *
   * @example
   * $(element).closest('selector');
   *
   * @see Element.closest() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest MDN}.
   * @param {string} selector A selector to match.
   * @returns {EagleJS} A new collection of `Element` objects.
   */
  closest (selector: string): EagleJS;
  /**
   * Merge two or more collections.
   *
   * @example
   * $(element).concat(EagleJS, EagleJS, EagleJS);
   *
   * @see Array.prototype.concat() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat MDN}.
   * @param {...(DOMItem|Array<DOMItem>)} items Values to concatenate into a new
   * array.
   * @returns {EagleJS} A new collection.
   */
  concat (...items: Array<DOMItem | ConcatArray<DOMItem>>): EagleJS;
  /**
   * Get the `childNodes` property of each `Node` in the collection.
   *
   * @example
   * $(element).contents();
   *
   * @see Node.childNodes on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes MDN}.
   * @returns {EagleJS} A new collection of `ChildNode` objects.
   */
  contents (): EagleJS;
  /**
   * Remove all child nodes of each `Node` in the collection from the DOM.
   *
   * @example
   * $(element).empty();
   *
   * @see Node.removeChild() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild MDN}.
   * @returns {this} The current collection.
   */
  empty (): this;
  /**
   * Reduce the collection with the given selector.
   *
   * @example
   * // string
   * $(element).filter('selector');
   *
   * // DOMItem
   * $(element).filter(DOMItem);
   *
   * // DOMItem[]
   * $(element).filter(EagleJS);
   *
   * // Function
   * $(element).filter(function (item, index) {
   *   return item.value > 0;
   * });
   *
   * @see Element.matches() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches MDN}
   * for string parameter.
   * @see Array.prototype.includes() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes MDN}
   * for DOMItem and DOMItem[] parameter.
   * @see Array.prototype.filter() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter MDN}
   * for function parameter.
   * @param {string|DOMItem|DOMItem[]|FilterCallback} selector A selector to
   * match.
   * @param {*} [thisArg] Value to use as `this` when executing `callback`.
   * @returns {this} A new collection with the items that pass the test.
   */
  filter (selector: string | DOMItem | DOMItem[] | FilterCallback, thisArg?: any): this;
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
  hasClass (name: string): boolean;
  /**
   * Check any item in the collection that matches the selector.
   *
   * @example
   * // selector
   * $(element).is('selector');
   *
   * // DOMItem
   * $(element).is(DOMItem);
   *
   * // DOMItem[]
   * $(element).is(EagleJS);
   *
   * @see Element.matches() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches MDN}
   * for string parameter.
   * @see Array.prototype.includes() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes MDN}
   * for DOMItem and DOMItem[] parameter.
   * @param {string|DOMItem|DOMItem[]} selector A selector to match.
   * @returns {boolean} `true` if any item matches the given filter; otherwise,
   * `false`.
   */
  is (selector: string | DOMItem | DOMItem[]): boolean;
  /**
   * Get the `nextElementSibling` of each `Node` in the collection, optionally
   * filtered by a selector.
   *
   * @example
   * $(element).next();
   * $(element).next('selector');
   *
   * @see NonDocumentTypeChildNode.nextElementSibling on {@link https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling MDN}.
   * @param {?string} [filter=null] A selector to filter.
   * @returns {EagleJS} A new collection of `Element` objects.
   */
  next (filter?: string | null): EagleJS;
  /**
   * Remove matched items from the collection.
   *
   * @example
   * // string
   * $(element).not('selector');
   *
   * // DOMItem
   * $(element).not(DOMItem);
   *
   * // DOMItem[]
   * $(element).not(EagleJS);
   *
   * @see Element.matches() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches MDN}
   * for string parameter.
   * @see Array.prototype.includes() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes MDN}
   * for DOMItem and DOMItem[] parameter.
   * @param {string|DOMItem|DOMItem[]} selector A selector to match.
   * @returns {this} A new collection with the items that not pass the test.
   */
  not (selector: string | DOMItem | DOMItem[]): this;
  /**
   * Remove the `EventListener` from each item in the collection.
   *
   * @example
   * $(element).off('click', handler);
   *
   * @see EventTarget.removeEventListener() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener MDN}.
   * @param {string} event A string which specifies the type of event for which
   * to remove an event listener.
   * @param {EventListener|EventListenerObject} listener The `EventListener`
   * function of the event handler to remove from the event target.
   * @param {boolean|EventListenerOptions} [options=false] An options object
   * that specifies characteristics about the event listener.
   * @returns {this} The current collection.
   */
  off (event: string, listener: EventListener | EventListenerObject, options?: boolean | EventListenerOptions): this;
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
   * that specifies characteristics about the event listener.
   * @returns {this} The current collection.
   */
  on (event: string, listener: EventListener | EventListenerObject, options?: boolean | AddEventListenerOptions): this;
  /**
   * Get the `parentNode` of each `Node` in the collection, optionally filtered
   * by a selector.
   *
   * @example
   * $(element).parent();
   * $(element).parent('selector');
   *
   * @see Node.parentNode on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode MDN}.
   * @param {?string} [filter=null] A selector to filter.
   * @returns {EagleJS} A new collection of `Node` objects.
   */
  parent (filter?: string | null): EagleJS;
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
   * (Polyfilled).
   * @param {...(string|Node)} nodes A set of `Node` or `DOMString` objects to
   * insert.
   * @returns {this} The current collection.
   */
  prepend (...nodes: Array<string | Node>): this;
  /**
   * Get the `previousElementSibling` of each `Node` in the collection,
   * optionally filtered by a selector.
   *
   * @example
   * $(element).prev();
   * $(element).prev('selector');
   *
   * @see NonDocumentTypeChildNode.previousElementSibling on {@link https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling MDN}.
   * @param {?string} [filter=null] A selector to filter.
   * @returns {EagleJS} A new collection of `Element` objects.
   */
  prev (filter?: string | null): EagleJS;
  /**
   * Add one or more items to the end of the collection.
   *
   * @example
   * $(element).push(DOMItem, DOMItem, DOMItem);
   *
   * // Spread and push
   * $(element).push(...EagleJS);
   *
   * @see Array.prototype.push() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push MDN}.
   * @param {...DOMItem} items Items to add to the end of the collection.
   * @returns {number} The new length.
   */
  push (...items: DOMItem[]): number;
  /**
   * Get the first `Element` descendant of each `ParentNode` in the collection
   * that matches selectors.
   *
   * @example
   * $(element).querySelector('selector');
   *
   * @see ParentNode.querySelector() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelector MDN}.
   * @param {string} selectors One or more selector to match.
   * @returns {EagleJS} A new collection of `Element` objects.
   */
  querySelector (selectors: string): EagleJS;
  /**
   * Get all `Element` descendants of each `ParentNode` in the collection that
   * matches selectors.
   *
   * @example
   * $(element).querySelectorAll('selector');
   *
   * @see ParentNode.querySelectorAll() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/querySelectorAll MDN}.
   * @param {string} selectors One or more selector to match.
   * @returns {EagleJS} A new collection of `Element` objects.
   */
  querySelectorAll (selectors: string): EagleJS;
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
  ready (listener: EventListener): this;
  /**
   * Remove each `Node` of the collection from the DOM.
   *
   * @example
   * $(element).remove();
   *
   * @see ChildNode.remove() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove MDN}
   * (Polyfilled).
   * @returns {this} The current collection.
   */
  remove (): this;
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
  removeAttr (...names: string[]): this;
  /**
   * Remove one or more class names from each `Element` in the collection.
   *
   * @example
   * $(element).removeClass('className');
   * $(element).removeClass('className', 'className');
   *
   * @see Element.classList.remove() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove MDN}.
   * @param {...string} names One or more class names.
   * @returns {this} The current collection.
   */
  removeClass (...names: string[]): this;
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
   * (Polyfilled).
   * @param {...(string|Node)} nodes A set of `Node` or `DOMString` objects to
   * replace.
   * @returns {this} The current collection.
   */
  replaceWith (...nodes: Array<string | Node>): this;
  /**
   * Get the siblings of each `Node` in the collection, optionally filtered by a
   * selector.
   *
   * @example
   * $(element).siblings();
   * $(element).siblings('selector');
   *
   * @param {?string} [filter=null] A selector to filter.
   * @returns {EagleJS} A new collection of `Element` objects.
   */
  siblings (filter?: string | null): EagleJS;
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
   * @returns {this} The current collection.
   */
  toggleClass (name: string, force?: boolean): this;
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
  trigger (event: string, data?: object | null): this;
  /**
   * Add one or more items to the beginning of the collection.
   *
   * @example
   * $(element).unshift(DOMItem, DOMItem, DOMItem);
   *
   * // Spread and unshift
   * $(element).unshift(...EagleJS);
   *
   * @see Array.prototype.unshift() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift MDN}.
   * @param {...DOMItem} items Items to add to the front of the collection.
   * @returns {number} The new length.
   */
  unshift (...items: DOMItem[]): number;
}
/**
 * DOM items like EventTarget, Node (Element, Text, Document, etc.), and Window.
 *
 * @see EventTarget on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget MDN}.
 * @typedef {EventTarget|Node|Window|Element|Text|CDATASection|
 * ProcessingInstruction|Comment|Document|DocumentType|DocumentFragment|
 * HTMLElement|SVGElement} DOMItem
 */
/**
 * A function to test each item in the collection.
 *
 * @callback FilterCallback
 * @param {DOMItem} element The current element being processed.
 * @param {number} [index] The index of the current element being processed.
 * @param {DOMItem[]} [array] The array `filter` was called upon.
 * @returns {boolean}
 */
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
 * @param {?(string|DOMItem|DOMItem[])} [selector=null] A selector to match.
 * @param {string|DOMItem|DOMItem[]} [context=document] A selector to use as
 * context.
 * @returns {EagleJS} A new collection.
 */
declare const EagleJSProxy: (selector?: string | DOMItem | DOMItem[] | null, context?: string | DOMItem | DOMItem[]) => EagleJS;
export { EagleJS, EagleJSProxy, DOMItem };
declare type DOMItem = EventTarget | Node | Window | Element | Text | CDATASection | ProcessingInstruction | Comment | Document | DocumentType | DocumentFragment | HTMLElement | SVGElement;
declare type FilterCallback = (element: DOMItem, index: number, array: DOMItem[]) => unknown;
interface EagleJS {
  attr(name: string): string | null
  attr(name: string, value: string): this
  data(): object
  data(key: string): string | undefined
  data(key: string, value: string): this
  html(): string
  html(value: string): this
  slice(start?: number, end?: number): this
  text(): string | null
  text(value: string): this
}
