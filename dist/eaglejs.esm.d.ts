/** @module eaglejs */
/**
 * EagleJS.
 *
 * @version 0.7.1
 * @copyright 2020-2021 Cem Demirkartal
 * @license MIT
 * @see The {@link https://github.com/demirkartal/eaglejs GitHub} repo
 * @augments Array<EventTarget>
 */
declare class EagleJS extends Array<EventTarget> {
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
  constructor (selector?: EventTarget | EventTarget[] | string, context?: EventTarget | EventTarget[] | string);
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
  static isEventTarget (value: any): value is EventTarget;
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
  addClass (...names: string[]): this;
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
  after (...nodes: Array<Node | string>): this;
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
  append (...nodes: Array<Node | string>): this;
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
  before (...nodes: Array<Node | string>): this;
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
  children (filter?: string | null): EagleJS;
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
  clone (deep?: boolean): EagleJS;
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
  closest (selectors: string): EagleJS;
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
  concat (...items: Array<ConcatArray<EventTarget> | EventTarget>): this;
  /**
   * Get the `childNodes` property of each `Node` in the collection.
   *
   * @example
   * new EagleJS(element).contents();
   *
   * @see Node.childNodes on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes MDN}.
   * @returns {EagleJS} A new collection of `ChildNode`s.
   */
  contents (): EagleJS;
  /**
   * Remove all child nodes of each `Node` in the collection from the DOM.
   *
   * @example
   * new EagleJS(element).empty();
   *
   * @see Node.removeChild() on {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild MDN}.
   * @returns {this} The current collection.
   */
  empty (): this;
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
  filterWith (selectors: string, condition?: boolean): this;
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
  hasAttr (name: string): boolean;
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
  hasClass (name: string): boolean;
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
  matches (selectors: string): boolean;
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
  next (filter?: string | null): EagleJS;
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
  off (type: string, listener: EventListener | EventListenerObject, options?: EventListenerOptions | boolean): this;
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
  parent (filter?: string | null): EagleJS;
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
  prepend (...nodes: Array<Node | string>): this;
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
  prev (filter?: string | null): EagleJS;
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
  push (...items: EventTarget[]): number;
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
  querySelector (selectors: string): EagleJS;
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
  querySelectorAll (selectors: string): EagleJS;
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
  ready (listener: EventListener): this;
  /**
   * Remove each `ChildNode` of the collection from the DOM.
   *
   * @example
   * new EagleJS(element).remove();
   *
   * @see ChildNode.remove() on {@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove MDN}.
   * @returns {this} The current collection.
   */
  remove (): this;
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
  removeAttr (...names: string[]): this;
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
  removeClass (...names: string[]): this;
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
  replaceWith (...nodes: Array<Node | string>): this;
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
  siblings (filter?: string | null): EagleJS;
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
  toggleAttr (name: string, force?: boolean): this;
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
  toggleClass (name: string, force?: boolean): this;
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
  trigger (event: Event | string, data?: object | null): this;
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
  unshift (...items: EventTarget[]): number;
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
declare const EagleJSProxy: {
  (selector?: string | EventTarget | EventTarget[] | undefined, context?: EventTarget | EventTarget[] | string): EagleJS
  prototype: EagleJS
};
export { EagleJS, EagleJSProxy };
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
  filter(predicate: (value: EventTarget, index: number, array: EventTarget[]) => unknown, thisArg?: any): this
  slice(start?: number, end?: number): this
}
