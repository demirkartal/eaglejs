/** @module eaglejs */
/**
 * EagleJS.
 *
 * @version   0.5.2
 * @copyright 2020 Cem Demirkartal
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
   * @param {?(string|DOMItem|DOMItem[])} [selector=null] A selector to match.
   * @param {string|DOMItem|DOMItem[]} [context=document] A selector to use as
   * context.
   */
  constructor (selector?: string | DOMItem | DOMItem[] | null, context?: string | DOMItem | DOMItem[]);
  /**
   * Add the class name to each element in the collection.
   *
   * @example
   * $(element).addClass('className');
   * $(element).addClass('className', 'className');
   *
   * @see DOMTokenList.add() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add MDN}.
   * @param {...string} names One or more class names.
   * @returns {this} The current collection.
   */
  addClass (...names: string[]): this;
  /**
   * Insert content after each node in the collection.
   *
   * @example
   * $(element).after('text');
   * $(element).after(Node);
   * $(element).after('text', Node);
   * $(element).after(Node, Node);
   *
   * @see ChildNode.after() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after MDN}.
   * @param {...(string|Node)} content The content to insert.
   * @returns {this} The current collection.
   */
  after (...content: Array<string | Node>): this;
  /**
   * Insert content to the end of each node in the collection.
   *
   * @example
   * $(element).append('text');
   * $(element).append(Node);
   * $(element).append('text', Node);
   * $(element).append(Node, Node);
   *
   * @see ParentNode.append() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append MDN}.
   * @param {...(string|Node)} content The content to insert.
   * @returns {this} The current collection.
   */
  append (...content: Array<string | Node>): this;
  /**
   * Insert content before each node in the collection.
   *
   * @example
   * $(element).before('text');
   * $(element).before(Node);
   * $(element).before('text', Node);
   * $(element).before(Node, Node);
   *
   * @see ChildNode.before() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before MDN}.
   * @param {...(string|Node)} content The content to insert.
   * @returns {this} The current collection.
   */
  before (...content: Array<string | Node>): this;
  /**
   * Get the children of each node in the collection, optionally filtered by a
   * selector.
   *
   * @example
   * $(element).children();
   * $(element).children('selector');
   *
   * @see ParentNode.children on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children MDN}.
   * @param {?(string|DOMItem|DOMItem[]|MatchCallback)} [filter=null] A selector
   * to filter by {@link module:eaglejs~EagleJS#filter filter()} method.
   * @returns {EagleJS} A new collection.
   */
  children (filter?: string | DOMItem | DOMItem[] | MatchCallback | null): EagleJS;
  /**
   * Return duplicates of each node in the collection.
   *
   * @example
   * $(element).clone();
   * $(element).clone(true);
   * $(element).clone(false);
   *
   * @see Node.cloneNode() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode MDN}.
   * @param {boolean} [deep=false] If true, then node and its whole
   * subtree—including text that may be in child Text nodes—is also copied.
   * @returns {EagleJS} A new collection.
   */
  clone (deep?: boolean): EagleJS;
  /**
   * Get the closest ancestor of each element in the collection matching with
   * the selector.
   *
   * @example
   * $(element).closest('selector');
   *
   * @see Element.closest() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest MDN}.
   * @param {string} selector A selector to match.
   * @returns {EagleJS} A new collection.
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
   * Get the children of each node in the collection, including comment and text
   * nodes.
   *
   * @example
   * $(element).contents();
   *
   * @see Node.childNodes on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes MDN}.
   * @returns {EagleJS} A new collection.
   */
  contents (): EagleJS;
  /**
   * Remove the children of each node in the collection from the DOM.
   *
   * @example
   * $(element).empty();
   *
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
   * @param {string|DOMItem|DOMItem[]|MatchCallback} selector A selector to
   * match.
   * @param {*} [thisArg] Value to use as this when executing callback.
   * @returns {this} A new collection.
   */
  filter (selector: string | DOMItem | DOMItem[] | MatchCallback, thisArg?: any): this;
  /**
   * Check if any collection element has the specified class name.
   *
   * @example
   * $(element).hasClass('className');
   *
   * @see DOMTokenList.contains() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains MDN}.
   * @param {string} name The class name to search.
   * @returns {boolean} True if any element has the given class name, otherwise
   * false.
   */
  hasClass (name: string): boolean;
  /**
   * Check any element in the collection that matches the selector.
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
   * // Function
   * $(element).is(function (item, index) {
   *   return item.value === 0;
   * });
   *
   * @see Element.matches() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches MDN}
   * for string parameter.
   * @see Array.prototype.includes() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes MDN}
   * for DOMItem and DOMItem[] parameter.
   * @see Array.prototype.some() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some MDN}
   * for function parameter.
   * @param {string|DOMItem|DOMItem[]|MatchCallback} selector A selector to
   * match.
   * @returns {boolean} True if any element matches the given filter, otherwise
   * false.
   */
  is (selector: string | DOMItem | DOMItem[] | MatchCallback): boolean;
  /**
   * Check if the value implements the ChildNode interface.
   *
   * @example
   * EagleJS.isChildNode(element); // true
   * EagleJS.isChildNode(document); // false
   * EagleJS.isChildNode(window); // false
   *
   * @see ChildNode interface on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode MDN}.
   * @param {*} value The value to be checked.
   * @returns {boolean} True if the value implements the ChildNode interface;
   * otherwise, false.
   */
  static isChildNode (value: any): value is ChildNode;
  /**
   * Check if the value is a Document node.
   *
   * @example
   * EagleJS.isDocument(element); // false
   * EagleJS.isDocument(document); // true
   * EagleJS.isDocument(window); // false
   *
   * @see Document interface on {@link https://developer.mozilla.org/en-US/docs/Web/API/Document MDN}.
   * @param {*} value The value to be checked.
   * @returns {boolean} True if the value is a Document node; otherwise, false.
   */
  static isDocument (value: any): value is Document;
  /**
   * Check if the variable is a DOMItem.
   *
   * @example
   * EagleJS.isDOMItem(element); // true
   * EagleJS.isDOMItem(document); // true
   * EagleJS.isDOMItem(window); // true
   *
   * @see {@link module:eaglejs~DOMItem DOMItem} type.
   * @param {*} value The value to be checked.
   * @returns {boolean} True if the value is a DOMItem; otherwise, false.
   */
  static isDOMItem (value: any): value is DOMItem;
  /**
   * Check if the value is an Element node.
   *
   * @example
   * EagleJS.isElement(element); // true
   * EagleJS.isElement(document); // false
   * EagleJS.isElement(window); // false
   *
   * @see Element interface on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element MDN}.
   * @param {*} value The value to be checked.
   * @returns {boolean} True if the value is an Element node; otherwise, false.
   */
  static isElement (value: any): value is Element;
  /**
   * Check if the value is a Node.
   *
   * @example
   * EagleJS.isNode(element); // true
   * EagleJS.isNode(document); // true
   * EagleJS.isNode(window); // false
   *
   * @see Node interface on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node MDN}.
   * @param {*} value The value to be checked.
   * @returns {boolean} True if the value is a Node; otherwise, false.
   */
  static isNode (value: any): value is Node;
  /**
   * Check if the value implements the ParentNode interface.
   *
   * @example
   * EagleJS.isParentNode(element); // true
   * EagleJS.isParentNode(document); // true
   * EagleJS.isParentNode(window); // false
   *
   * @see ParentNode interface on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode MDN}.
   * @param {*} value The value to be checked.
   * @returns {boolean} True if the value implements the ParentNode interface;
   * otherwise, false.
   */
  static isParentNode (value: any): value is ParentNode;
  /**
   * Get the next sibling of each node in the collection, optionally filtered by
   * a selector.
   *
   * @example
   * $(element).next();
   * $(element).next('selector');
   *
   * @see NonDocumentTypeChildNode.nextElementSibling on {@link https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling MDN}.
   * @param {?(string|DOMItem|DOMItem[]|MatchCallback)} [filter=null] A selector
   * to filter by {@link module:eaglejs~EagleJS#filter filter()} method.
   * @returns {EagleJS} A new collection.
   */
  next (filter?: string | DOMItem | DOMItem[] | MatchCallback | null): EagleJS;
  /**
   * Remove matched elements from the collection.
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
   * // Function
   * $(element).not(function (item, index) {
   *   return item.value > 0;
   * });
   *
   * @see Element.matches() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches MDN}
   * for string parameter.
   * @see Array.prototype.includes() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes MDN}
   * for DOMItem and DOMItem[] parameter.
   * @see Array.prototype.filter() on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter MDN}
   * for function parameter.
   * @param {string|DOMItem|DOMItem[]|MatchCallback} selector A selector to
   * match.
   * @returns {this} A new collection.
   */
  not (selector: string | DOMItem | DOMItem[] | MatchCallback): this;
  /**
   * Remove the event listener from each item in the collection.
   *
   * @example
   * $(element).off('click', handler);
   *
   * @see EventTarget.removeEventListener() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener MDN}.
   * @param {string} event A case-sensitive string representing the event type.
   * @param {EventListener|EventListenerObject} listener The handler function
   * for the event.
   * @param {boolean|EventListenerOptions} [options=false] Characteristics of
   * the event listener.
   * @returns {this} The current collection.
   */
  off (event: string, listener: EventListener | EventListenerObject, options?: boolean | EventListenerOptions): this;
  /**
   * Attach the event listener to each item in the collection.
   *
   * @example
   * $(element).on('click', function (event) {
   *   console.log(event.type);
   * });
   *
   * @see EventTarget.addEventListener() on {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener MDN}.
   * @param {string} event A case-sensitive string representing the event type.
   * @param {EventListener|EventListenerObject} listener The handler function
   * for the event.
   * @param {boolean|AddEventListenerOptions} [options=false] Characteristics of
   * the event listener.
   * @returns {this} The current collection.
   */
  on (event: string, listener: EventListener | EventListenerObject, options?: boolean | AddEventListenerOptions): this;
  /**
   * Attach the event listener to each item in the collection. The event
   * listener is executed at most once per element per event type.
   *
   * @example
   * $(element).one('click', function (event) {
   *   console.log(event.type);
   * });
   *
   * @see {@link module:eaglejs~EagleJS#on EagleJS.prototype.on()} with
   * options.once parameter.
   * @param {string} event A case-sensitive string representing the event type.
   * @param {EventListener|EventListenerObject} listener The handler function
   * for the event.
   * @returns {this} The current collection.
   */
  one (event: string, listener: EventListener | EventListenerObject): this;
  /**
   * Get the parent of each node in the collection, optionally filtered by a
   * selector.
   *
   * @example
   * $(element).parent();
   * $(element).parent('selector');
   *
   * @see Node.parentNode on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode MDN}.
   * @param {?(string|DOMItem|DOMItem[]|MatchCallback)} [filter=null] A selector
   * to filter by {@link module:eaglejs~EagleJS#filter filter()} method.
   * @returns {EagleJS} A new collection.
   */
  parent (filter?: string | DOMItem | DOMItem[] | MatchCallback | null): EagleJS;
  /**
   * Insert content to the beginning of each node in the collection.
   *
   * @example
   * $(element).prepend('text');
   * $(element).prepend(Node);
   * $(element).prepend('text', Node);
   * $(element).prepend(Node, Node);
   *
   * @see ParentNode.prepend() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend MDN}.
   * @param {...(string|Node)} content The content to insert.
   * @returns {this} The current collection.
   */
  prepend (...content: Array<string | Node>): this;
  /**
   * Get the previous sibling of each node in the collection, optionally
   * filtered by a selector.
   *
   * @example
   * $(element).prev();
   * $(element).prev('selector');
   *
   * @see NonDocumentTypeChildNode.previousElementSibling on {@link https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling MDN}.
   * @param {?(string|DOMItem|DOMItem[]|MatchCallback)} [filter=null] A selector
   * to filter by {@link module:eaglejs~EagleJS#filter filter()} method.
   * @returns {EagleJS} A new collection.
   */
  prev (filter?: string | DOMItem | DOMItem[] | MatchCallback | null): EagleJS;
  /**
   * Adds one or more items to the end of the collection.
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
   * Remove nodes of the collection from the DOM.
   *
   * @example
   * $(element).remove();
   *
   * @see ChildNode.remove() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove MDN}.
   * @returns {this} The current collection.
   */
  remove (): this;
  /**
   * Remove the attribute from each element in the collection.
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
   * Remove the class name from each element in the collection.
   *
   * @example
   * $(element).removeClass('className');
   * $(element).removeClass('className', 'className');
   *
   * @see DOMTokenList.remove() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove MDN}.
   * @param {...string} names One or more class names.
   * @returns {this} The current collection.
   */
  removeClass (...names: string[]): this;
  /**
   * Replace each node in the collection with the given content.
   *
   * @example
   * $(element).replaceWith('text');
   * $(element).replaceWith(Node);
   * $(element).replaceWith('text', Node);
   * $(element).replaceWith(Node, Node);
   *
   * @see ChildNode.replaceWith() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith MDN}.
   * @param {...(string|Node)} content The content to replace.
   * @returns {this} The current collection.
   */
  replaceWith (...content: Array<string | Node>): this;
  /**
   * Get the siblings of each node in the collection, optionally filtered by a
   * selector.
   *
   * @example
   * $(element).siblings();
   * $(element).siblings('selector');
   *
   * @param {?(string|DOMItem|DOMItem[]|MatchCallback)} [filter=null] A selector
   * to filter by {@link module:eaglejs~EagleJS#filter filter()} method.
   * @returns {EagleJS} A new collection.
   */
  siblings (filter?: string | DOMItem | DOMItem[] | MatchCallback | null): EagleJS;
  /**
   * Toggle the class name to each element in the collection.
   *
   * @example
   * $(element).toggleClass('className');
   * $(element).toggleClass('className', true);
   * $(element).toggleClass('className', false);
   *
   * @see DOMTokenList.toggle() on {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle MDN}.
   * @param {string} name The class name.
   * @param {?boolean} [force=null] A boolean value to determine whether the
   * class should be added or removed.
   * @returns {this} The current collection.
   */
  toggleClass (name: string, force?: boolean | null): this;
  /**
   * Trigger the specified event on each item in the collection.
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
   * Adds new items to the beginning of the collection.
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
 * @see Node on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node MDN}.
 * @see Window on {@link https://developer.mozilla.org/en-US/docs/Web/API/Window MDN}.
 * @typedef {EventTarget|Node|Window|Element|Text|CDATASection|
 * ProcessingInstruction|Comment|Document|DocumentType|DocumentFragment|
 * HTMLElement|SVGElement} DOMItem
 */
/**
 * A function to test each item in the collection.
 *
 * @callback MatchCallback
 * @param {DOMItem} element The current element being processed.
 * @param {number} [index] The index of the current element being processed.
 * @param {DOMItem[]} [array] The array function was called upon.
 * @returns {boolean}
 */
/**
 * Proxy to use EagleJS Class without the new keyword.
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
export { EagleJS, EagleJSProxy, DOMItem, MatchCallback };
declare type DOMItem = EventTarget | Node | Window | Element | Text | CDATASection | ProcessingInstruction | Comment | Document | DocumentType | DocumentFragment | HTMLElement | SVGElement;
declare type MatchCallback = (element: DOMItem, index: number, array: DOMItem[]) => unknown;
interface EagleJS {
  attr(name: string): string | null
  attr(name: string, value: string): this
  data(): object
  data(key: string): string | undefined
  data(key: string, value: string): this
  find(selector: string): this
  find(selector: MatchCallback, thisArg?: any): DOMItem | undefined
  html(): string
  html(value: string): this
  slice(start?: number, end?: number): this
  text(): string | null
  text(value: string): this
}
