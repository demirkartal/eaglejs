/* eslint semi: "error", no-param-reassign: "error" */
/**
 * EagleJS is a jQuery-Like DOM manipulation class for modern browsers.
 *
 * @version   0.4.3
 * @copyright 2020 Cem Demirkartal
 * @license   MIT
 * @see       {@link https://github.com/EagleFramework/EagleJS GitHub}
 * @extends   Array<DOMItem>
 */
class EagleJS extends Array {
  /**
   * Return a collection of matched items or created nodes by HTML string.
   *
   * @example
   * // CSS Selector and htmlString
   * $( 'selector' );
   * $( 'htmlString' ); // Create HTML tag
   *
   * // DOMItem
   * $( DOMItem );
   *
   * // DOMItemArray
   * $( DOMItem[] );
   * $( EagleJS );
   *
   * // CSS Selector + CSS Selector
   * $( 'selector', 'selector' );
   *
   * // CSS Selector + DOMItem
   * $( 'selector', DOMItem );
   *
   * // CSS Selector + DOMItemArray
   * $( 'selector', DOMItem[] );
   * $( 'selector', EagleJS );
   *
   * // EventListener
   * $(function () {
   *
   * });
   *
   * @param {string|DOMItem|DOMItemArray|EventListener|null} [selector]
   * A selector to match.
   * @param {string|DOMItem|DOMItemArray} [context=document] Node(s) to use as
   * context.
   */
  constructor (selector, context = document) {
    super();
    if (typeof selector !== 'undefined') {
      if (typeof selector === 'string') {
        if (/^\s*<.+>\s*$/.test(selector)) {
          // Create HTML tag
          const doc = context.implementation.createHTMLDocument('');
          return new EagleJS('body', doc).html(selector).children();
        }
        // Find
        return new EagleJS(context).find(selector);
      }
      if (typeof selector === 'function') {
        new EagleJS(context).ready(selector);
      } else if (typeof selector[Symbol.iterator] === 'function') {
        this.push(...selector);
      } else {
        this.push(selector);
      }
    }
  }

  /**
   * Add the class name to each element of the collection.
   *
   * @example
   * $(element).addClass( 'className' );
   * $(element).addClass( 'className', className' );
   *
   * @param  {string[]} names One or more class names.
   * @return {this} The current collection.
   */
  addClass (...names) {
    this.forEach((element) => {
      if (EagleJS.isElement(element)) {
        element.classList.add(...names);
      }
    });
    return this;
  }

  /**
   * Insert content after each node of the collection.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).after( 'selector' );
   * $(element).after( 'htmlString' ); // Create HTML tag
   *
   * // DOMItem
   * $(element).after( DOMItem );
   *
   * // DOMItemArray
   * $(element).after( DOMItem[] );
   * $(element).after( EagleJS );
   *
   * @param  {string|DOMItem|DOMItemArray} content The content to insert.
   * @return {this} The current collection.
   */
  after (content) {
    let $content = new EagleJS(content);
    let flag = true;
    this.slice().reverse().forEach((element) => {
      if (EagleJS.isChildNode(element) && element.parentNode) {
        if (!flag) {
          $content = $content.clone();
        } else {
          flag = false;
        }
        $content.forEach((clone) => {
          element.parentNode.insertBefore(clone, element.nextSibling);
        });
      }
    });
    return this;
  }

  /**
   * Insert content to the end of each node in the collection.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).append( 'selector' );
   * $(element).append( 'htmlString' ); // Create HTML tag
   *
   * // DOMItem
   * $(element).append( DOMItem );
   *
   * // DOMItemArray
   * $(element).append( DOMItem[] );
   * $(element).append( EagleJS );
   *
   * @param  {string|DOMItem|DOMItemArray} content The content to insert.
   * @return {this} The current collection.
   */
  append (content) {
    let $content = new EagleJS(content);
    let flag = true;
    this.slice().reverse().forEach((element) => {
      if (EagleJS.isParentNode(element)) {
        if (!flag) {
          $content = $content.clone();
        } else {
          flag = false;
        }
        $content.forEach((clone) => {
          element.appendChild(clone);
        });
      }
    });
    return this;
  }

  /**
   * Insert every item of the collection to the end of the target.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).appendTo( 'selector' );
   * $(element).appendTo( 'htmlString' ); // Create HTML tag
   *
   * // DOMItem
   * $(element).appendTo( DOMItem );
   *
   * // DOMItemArray
   * $(element).appendTo( DOMItem[] );
   * $(element).appendTo( EagleJS );
   *
   * @param  {string|DOMItem|DOMItemArray} target The target to insert.
   * @return {EagleJS} Return a new collection of original and clone nodes.
   */
  appendTo (target) {
    const $elements = new EagleJS();
    /** @type {EagleJS} */
    let $content = this;
    let flag = true;
    new EagleJS(target).reverse().forEach((element) => {
      if (EagleJS.isParentNode(element)) {
        if (!flag) {
          $content = $content.clone();
        } else {
          flag = false;
        }
        $elements.push(...$content);
        $content.forEach((clone) => {
          element.appendChild(clone);
        });
      }
    });
    return $elements;
  }

  /**
   * Get or set attribute value for elements of the collection.
   *
   * @example
   * <caption>attr (name: string): string | null</caption>
   * $(element).attr( 'attributeName' );
   *
   * @example
   * <caption>attr (name: string, value: any): this</caption>
   * $(element).attr( 'attributeName', 'value' );
   *
   * @param  {string} name    The name of attribute.
   * @param  {string} [value] The value for attribute.
   * @return {string|null|this} The attribute value of the first element; or the
   * current collection if the value parameter provided.
   */
  attr (name, value) {
    if (typeof value !== 'undefined') {
      if (value === null) {
        return this.removeAttr(name);
      }
      this.forEach((element) => {
        if (EagleJS.isElement(element)) {
          element.setAttribute(name, value);
        }
      });
      return this;
    }
    /** @type {string|null} */
    let returnValue = null;
    this.some((element) => {
      if (EagleJS.isElement(element) && element.hasAttribute(name)) {
        returnValue = element.getAttribute(name);
        return true;
      }
      return false;
    });
    return returnValue;
  }

  /**
   * Insert content before each node of the collection.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).before( 'selector' );
   * $(element).before( 'htmlString' ); // Create HTML tag
   *
   * // DOMItem
   * $(element).before( DOMItem );
   *
   * // DOMItemArray
   * $(element).before( DOMItem[] );
   * $(element).before( EagleJS );
   *
   * @param  {string|DOMItem|DOMItemArray} content The content to insert.
   * @return {this} The current collection.
   */
  before (content) {
    let $content = new EagleJS(content);
    let flag = true;
    this.slice().reverse().forEach((element) => {
      if (EagleJS.isChildNode(element) && element.parentNode) {
        if (!flag) {
          $content = $content.clone();
        } else {
          flag = false;
        }
        $content.forEach((clone) => {
          element.parentNode.insertBefore(clone, element);
        });
      }
    });
    return this;
  }

  /**
   * Get the children of each node in the collection, optionally filtered by a
   * selector.
   *
   * @example
   * $(element).children();
   * $(element).children( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  children (filter) {
    const $elements = new EagleJS();
    this.forEach((element) => {
      if (EagleJS.isParentNode(element)) {
        $elements.push(...element.children);
      }
    });
    if (typeof filter !== 'undefined') {
      return $elements.filter(filter);
    }
    return $elements;
  }

  /**
   * Create a deep copy of each node in the collection.
   *
   * @example
   * $(element).clone();
   * $(element).clone( true );
   * $(element).clone( false );
   *
   * @param  {boolean} [deep=true] If true, then node and its whole
   * subtree—including text that may be in child Text nodes—is also copied.
   * @return {EagleJS} A new collection.
   */
  clone (deep = true) {
    const $elements = new EagleJS();
    this.forEach((element) => {
      if (EagleJS.isNode(element)) {
        $elements.push(element.cloneNode(deep));
      }
    });
    return $elements;
  }

  /**
   * Get the closest ancestor of elements matching with the selector.
   *
   * @example
   * $(element).closest( 'selector' );
   *
   * @param  {string} selector A selector to match.
   * @return {EagleJS} A new collection.
   */
  closest (selector) {
    const $elements = new EagleJS();
    this.forEach((element) => {
      if (EagleJS.isElement(element)) {
        const closest = element.closest(selector);
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
   * $(element).concat( DOMItem[], DOMItem[], DOMItem[] );
   * $(element).concat( EagleJS, EagleJS, EagleJS );
   *
   * @param  {...DOMItem[]} items Values to concatenate into a new array.
   * @return {EagleJS} A new collection.
   */
  concat (...items) {
    return new EagleJS(super.concat(...items));
  }

  /**
   * Get the children of each node in the collection, including comment and text
   * nodes.
   *
   * @example
   * $(element).contents();
   *
   * @return {EagleJS} A new collection.
   */
  contents () {
    const $elements = new EagleJS();
    this.forEach((element) => {
      if (EagleJS.isNode(element)) {
        $elements.push(...element.childNodes);
      }
    });
    return $elements;
  }

  /**
   * Remove the children of each node in the collection from the DOM.
   *
   * @example
   * $(element).empty();
   *
   * @return {this} The current collection.
   */
  empty () {
    return this.html('');
  }

  /**
   * Reduce the elements of the collection with the given filter.
   *
   * @example
   * // CSS Selector
   * $(element).filter( 'selector' );
   *
   * // DOMItem
   * $(element).filter( DOMItem );
   *
   * // DOMItemArray
   * $(element).filter( DOMItem[] );
   * $(element).filter( EagleJS );
   *
   * // Function
   * $(element).filter(function (element, index) {
   *  return element.val > 0;
   * });
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [selector] A selector
   * to match.
   * @param  {*} [thisArg] Value to use as this when executing callback.
   * @return {EagleJS} A new collection.
   */
  filter (selector, thisArg) {
    if (typeof selector !== 'undefined') {
      if (typeof selector === 'string') {
        return this.filter((element) => {
          return EagleJS.isElement(element) && element.matches(selector);
        });
      }
      if (typeof selector === 'function') {
        return super.filter(selector, thisArg); // Type fix
      }
      const $selector = new EagleJS(selector);
      return this.filter((element) => {
        return $selector.includes(element);
      });
    }
    return new EagleJS();
  }

  /**
   * Get the descendants of each node in the collection, filtered by a
   * selector.<br>
   * Be aware: If the parameter is a function, the method functions as the
   * Array.prototype.find.
   *
   * @example
   * <caption>find (selector: string): EagleJS</caption>
   * $(element).find( 'selector' );
   *
   * @example
   * <caption>find (selector: MatchCallback, thisArg?: any): DOMItem |
   * undefined</caption>
   * $(element).find(function (element, index) {
   *  return element.val > 0;
   * });
   *
   * @param  {string|MatchCallback} selector A selector to match.
   * @param  {*} [thisArg] Value to use as this when executing callback.
   * @return {EagleJS|DOMItem|undefined} A new collection; or a DOMItem if the
   * parameter is a function.
   */
  find (selector, thisArg) {
    const $elements = new EagleJS();
    if (typeof selector === 'string') {
      this.forEach((element) => {
        if (EagleJS.isParentNode(element)) {
          $elements.push(...element.querySelectorAll(selector));
        }
      });
    } else if (typeof selector === 'function') {
      return super.find(selector, thisArg);
    }
    return $elements;
  }

  /**
   * Alias to EagleJS.prototype.
   *
   * @example
   * // Adds a new method to the library
   * $.fn.newPlugin = function () {
   *   return this.each(function () {
   *     // Do something to each item
   *   });
   * };
   *
   * @constant
   * @type {EagleJS.prototype}
   */
  static get fn () {
    return this.prototype;
  }

  /**
   * Check if any collection element has the specified class name.
   *
   * @example
   * $(element).hasClass( 'className' );
   *
   * @param  {string} name The class name to search.
   * @return {boolean} True if any element has the given class name, otherwise
   * false.
   */
  hasClass (name) {
    return this.some((element) => {
      return EagleJS.isElement(element) && element.classList.contains(name);
    });
  }

  /**
   * Get or set the HTML contents of elements in the collection.
   *
   * @example
   * <caption>html (): string</caption>
   * $(element).html();
   *
   * @example
   * <caption>html (value: string): this</caption>
   * $(element).html( 'htmlString' ); // Create HTML tag
   *
   * @param  {string} [value] The html string to set.
   * @return {string|this} The HTML string of the first element; or the current
   * collection if the value parameter provided.
   */
  html (value) {
    if (typeof value !== 'undefined') {
      this.forEach((element) => {
        if (EagleJS.isElement(element)) {
          element.innerHTML = value;
        }
      });
      return this;
    }
    /** @type {string} */
    let returnValue = '';
    this.some((element) => {
      if (EagleJS.isElement(element)) {
        returnValue = element.innerHTML;
        return true;
      }
      return false;
    });
    return returnValue;
  }

  /**
   * Insert every item of the collection after the target.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).insertAfter( 'selector' );
   * $(element).insertAfter( 'htmlString' ); // Create HTML tag
   *
   * // DOMItem
   * $(element).insertAfter( DOMItem );
   *
   * // DOMItemArray
   * $(element).insertAfter( DOMItem[] );
   * $(element).insertAfter( EagleJS );
   *
   * @param  {string|DOMItem|DOMItemArray} target The target to insert.
   * @return {EagleJS} Return a new collection of original and clone nodes.
   */
  insertAfter (target) {
    const $elements = new EagleJS();
    /** @type {EagleJS} */
    let $content = this;
    let flag = true;
    new EagleJS(target).reverse().forEach((element) => {
      if (EagleJS.isChildNode(element) && element.parentNode) {
        if (!flag) {
          $content = $content.clone();
        } else {
          flag = false;
        }
        $elements.push(...$content);
        $content.forEach((clone) => {
          element.parentNode.insertBefore(clone, element.nextSibling);
        });
      }
    });
    return $elements;
  }

  /**
   * Insert every item of the collection before the target.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).insertBefore( 'selector' );
   * $(element).insertBefore( 'htmlString' ); // Create HTML tag
   *
   * // DOMItem
   * $(element).insertBefore( DOMItem );
   *
   * // DOMItemArray
   * $(element).insertBefore( DOMItem[] );
   * $(element).insertBefore( EagleJS );
   *
   * @param  {string|DOMItem|DOMItemArray} target The target to insert.
   * @return {EagleJS} Return a new collection of original and clone nodes.
   */
  insertBefore (target) {
    const $elements = new EagleJS();
    /** @type {EagleJS} */
    let $content = this;
    let flag = true;
    new EagleJS(target).reverse().forEach((element) => {
      if (EagleJS.isChildNode(element) && element.parentNode) {
        if (!flag) {
          $content = $content.clone();
        } else {
          flag = false;
        }
        $elements.push(...$content);
        $content.forEach((clone) => {
          element.parentNode.insertBefore(clone, element);
        });
      }
    });
    return $elements;
  }

  /**
   * Check any element of the collection that matches the selector.
   *
   * @example
   * // CSS Selector
   * $(element).is( 'selector' );
   *
   * // DOMItem
   * $(element).is( DOMItem );
   *
   * // DOMItemArray
   * $(element).is( DOMItem[] );
   * $(element).is( EagleJS );
   *
   * // Function
   * $(element).is(function (element, index) {
   *  return element.val == 0;
   * });
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [selector] A selector
   * to match.
   * @return {boolean} True if any element matches the given filter, otherwise
   * false.
   */
  is (selector) {
    if (typeof selector !== 'undefined') {
      if (typeof selector === 'string') {
        return this.some((element) => {
          return EagleJS.isElement(element) && element.matches(selector);
        });
      }
      if (typeof selector === 'function') {
        return this.some(selector);
      }
      const $selector = new EagleJS(selector);
      return this.some((element) => {
        return $selector.includes(element);
      });
    }
    return false;
  }

  /**
   * Check if the variable implements the ChildNode interface.
   *
   * @param  {*} value The value to check.
   * @return {boolean}
   */
  static isChildNode (value) {
    return this.isNode(value) && [1, 3, 4, 7, 8, 10].includes(value.nodeType);
  }

  /**
   * Check if the variable is a Document node.
   *
   * @param  {*} value The value to check.
   * @return {boolean}
   */
  static isDocument (value) {
    return this.isNode(value) && value.nodeType === 9;
  }

  /**
   * Check if the variable is a DOMItem.
   *
   * @param  {*} value The value to check.
   * @return {boolean}
   */
  static isDOMItem (value) {
    return this.isNode(value) || this.isWindow(value);
  }

  /**
   * Check if the variable is an Element node.
   *
   * @param  {*} value The value to check.
   * @return {boolean}
   */
  static isElement (value) {
    return this.isNode(value) && value.nodeType === 1;
  }

  /**
   * Check if the variable is a Node.
   *
   * @param  {*} value The value to check.
   * @return {boolean}
   */
  static isNode (value) {
    return Boolean(value && value.nodeType);
  }

  /**
   * Check if the variable implements the ParentNode interface.
   *
   * @param  {*} value The value to check.
   * @return {boolean}
   */
  static isParentNode (value) {
    return this.isNode(value) && [1, 9, 11].includes(value.nodeType);
  }

  /**
   * Check if the variable is a window object.
   *
   * @param  {*} value The value to check.
   * @return {boolean}
   */
  static isWindow (value) {
    return Boolean(value && value === value.window);
  }

  /**
   * Collect the given property of items, optionally filtered by a selector.
   *
   * @example
   * $(element).mapProp( 'nextElementSibling' );
   * $(element).mapProp( 'parentNode' );
   * $(element).mapProp( 'parentElement' );
   * $(element).mapProp( 'previousElementSibling' );
   *
   * // Collect and filter
   * $(element).mapProp( 'parentNode', 'selector');
   *
   * @protected
   * @param  {string} name Name of property.
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  mapProp (name, filter) {
    const $elements = new EagleJS();
    this.forEach((element) => {
      $elements.push(element[name]);
    });
    if (typeof filter !== 'undefined') {
      return $elements.filter(filter);
    }
    return $elements;
  }

  /**
   * Collect the given property of items until the given selector, optionally
   * filtered by a selector.
   *
   * @example
   * // Until node element exists
   * $(element).mapPropUntil( 'nextElementSibling' );
   * $(element).mapPropUntil( 'parentNode' );
   * $(element).mapPropUntil( 'parentElement' );
   * $(element).mapPropUntil( 'previousElementSibling' );
   *
   * // Until node element exists and filter
   * $(element).mapPropUntil( 'parentNode', '*');
   *
   * // Until property matches to the until selector and filter
   * $(element).mapPropUntil( 'parentNode', '*', 'untilSelector' );
   *
   * // Until property matches to the until selector and no filter
   * $(element).mapPropUntil( 'parentNode', undefined, 'untilSelector' );
   *
   * @protected
   * @param  {string} name Name of property.
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [until]  A selector to
   * indicate where to stop matching ancestor elements.
   * @return {EagleJS} A new collection.
   */
  mapPropUntil (name, filter, until) {
    const $elements = new EagleJS();
    const flag = (typeof until !== 'undefined');
    this.forEach((element) => {
      let newElement = element;
      while ((newElement = newElement[name])) {
        if (flag && new EagleJS(newElement).is(until)) {
          break;
        }
        $elements.push(newElement);
      }
    });
    if (typeof filter !== 'undefined') {
      return $elements.filter(filter);
    }
    return $elements;
  }

  /**
   * Get the next sibling of nodes, optionally filtered by a selector.
   *
   * @example
   * $(element).next();
   * $(element).next( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  next (filter) {
    return this.mapProp('nextElementSibling', filter);
  }

  /**
   * Get all the following siblings of nodes, optionally filtered by a selector.
   *
   * @example
   * $(element).nextAll();
   * $(element).nextAll( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  nextAll (filter) {
    return this.mapPropUntil('nextElementSibling', filter);
  }

  /**
   * Get all the following siblings of nodes until the given selector,
   * optionally filtered by a selector.
   *
   * @example
   * $(element).nextUntil();
   *
   * // For more check;
   * // - is() method for 'untilSelctor'
   * // - filter() method for 'filterSelector'
   * $(element).nextUntil( 'untilSelector', 'filterSelector' );
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [selector] A selector
   * to indicate where to stop matching ancestor elements.
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  nextUntil (selector, filter) {
    return this.mapPropUntil('nextElementSibling', filter, selector);
  }

  /**
   * Remove matched elements from the collection.
   *
   * @example
   * // CSS Selector
   * $(element).not( 'selector' );
   *
   * // DOMItem
   * $(element).not( DOMItem );
   *
   * // DOMItemArray
   * $(element).not( DOMItem[] );
   * $(element).not( EagleJS );
   *
   * // Function
   * $(element).not(function (element, index) {
   *  return element.val > 0;
   * });
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [selector] A selector
   * to match.
   * @return {EagleJS} A new collection.
   */
  not (selector) {
    if (typeof selector !== 'undefined') {
      if (typeof selector === 'string') {
        return this.filter((element) => {
          return EagleJS.isElement(element) && !element.matches(selector);
        });
      }
      if (typeof selector === 'function') {
        return this.filter((element, index, array) => {
          return !selector(element, index, array);
        });
      }
      const $selector = new EagleJS(selector);
      return this.filter((element) => {
        return !$selector.includes(element);
      });
    }
    return this.slice(); // Copy
  }

  /**
   * Remove the event listener from each item of the collection.
   *
   * @example
   * $(element).off( 'click', handler );
   *
   * @param  {string} events One or more event names.
   * @param  {EventListener|EventListenerObject} handler The handler funcion for
   * event.
   * @param  {boolean|EventListenerOptions} [options=false] Characteristics of
   * event listener.
   * @return {this} The current collection.
   */
  off (events, handler, options = false) {
    const eventNames = events.match(/\S+/g) || [];
    this.forEach((element) => {
      eventNames.forEach((event) => {
        element.removeEventListener(event, handler, options);
      });
    });
    return this;
  }

  /**
   * Attach the event listener to each item of the collection.
   *
   * @example
   * $(element).on( 'hover', function(event) {
   *   console.log( $(this).text() );
   * });
   *
   * @param  {string} events One or more event names.
   * @param  {EventListener|EventListenerObject} handler The handler funcion for
   * event.
   * @param  {boolean|AddEventListenerOptions} [options=false] Characteristics
   * of event listener.
   * @return {this} The current collection.
   */
  on (events, handler, options = false) {
    const eventNames = events.match(/\S+/g) || [];
    this.forEach((element) => {
      eventNames.forEach((event) => {
        element.addEventListener(event, handler, options);
      });
    });
    return this;
  }

  /**
   * Attach the event listener to each item of the collection. The event
   * listener is executed at most once per element per event type.
   *
   * @example
   * $(element).one( 'hover', function(event) {
   *   console.log( $(this).text() );
   * });
   *
   * @param  {string} events One or more event names.
   * @param  {EventListener|EventListenerObject} handler The handler funcion for
   * event.
   * @return {this} The current collection.
   */
  one (events, handler) {
    return this.on(events, handler, {
      once: true
    });
  }

  /**
   * Get the parent of nodes, optionally filtered by a selector.
   *
   * @example
   * $(element).parent();
   * $(element).parent( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  parent (filter) {
    return this.mapProp('parentNode', filter);
  }

  /**
   * Get the ancestors of nodes, optionally filtered by a selector.
   *
   * @example
   * $(element).parents();
   * $(element).parents( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  parents (filter) {
    return this.mapPropUntil('parentElement', filter);
  }

  /**
   * Get the ancestors of nodes until the given selector, optionally filtered
   * by a selector.
   *
   * @example
   * $(element).parentsUntil();
   *
   * // For more check;
   * // - is() method for 'untilSelctor'
   * // - filter() method for 'filterSelector'
   * $(element).parentsUntil( 'untilSelector', 'filterSelector' );
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [selector] A selector
   * to indicate where to stop matching ancestor elements.
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  parentsUntil (selector, filter) {
    return this.mapPropUntil('parentElement', filter, selector);
  }

  /**
   * Insert content to the beginning of each node in the collection.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).prepend( 'selector' );
   * $(element).prepend( 'htmlString' ); // Create HTML tag
   *
   * // DOMItem
   * $(element).prepend( DOMItem );
   *
   * // DOMItemArray
   * $(element).prepend( DOMItem[] );
   * $(element).prepend( EagleJS );
   *
   * @param  {string|DOMItem|DOMItemArray} content The content to insert.
   * @return {this} The current collection.
   */
  prepend (content) {
    let $content = new EagleJS(content);
    let flag = true;
    this.slice().reverse().forEach((element) => {
      if (EagleJS.isParentNode(element)) {
        if (!flag) {
          $content = $content.clone();
        } else {
          flag = false;
        }
        $content.forEach((clone) => {
          element.insertBefore(clone, element.firstChild);
        });
      }
    });
    return this;
  }

  /**
   * Insert every item of the collection to the beginning of the target.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).prependTo( 'selector' );
   * $(element).prependTo( 'htmlString' ); // Create HTML tag
   *
   * // DOMItem
   * $(element).prependTo( DOMItem );
   *
   * // DOMItemArray
   * $(element).prependTo( DOMItem[] );
   * $(element).prependTo( EagleJS );
   *
   * @param  {string|DOMItem|DOMItemArray} target The target to insert.
   * @return {EagleJS} Return a new collection of original and clone nodes.
   */
  prependTo (target) {
    const $elements = new EagleJS();
    /** @type {EagleJS} */
    let $content = this;
    let flag = true;
    new EagleJS(target).reverse().forEach((element) => {
      if (EagleJS.isParentNode(element)) {
        if (!flag) {
          $content = $content.clone();
        } else {
          flag = false;
        }
        $elements.push(...$content);
        $content.forEach((clone) => {
          element.insertBefore(clone, element.firstChild);
        });
      }
    });
    return $elements;
  }

  /**
   * Get the previous sibling of nodes, optionally filtered by a selector.
   *
   * @example
   * $(element).prev();
   * $(element).prev( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  prev (filter) {
    return this.mapProp('previousElementSibling', filter);
  }

  /**
   * Get all preceding siblings of nodes, optionally filtered by a selector.
   *
   * @example
   * $(element).prevAll();
   * $(element).prevAll( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  prevAll (filter) {
    return this.mapPropUntil('previousElementSibling', filter);
  }

  /**
   * Get all preceding siblings of nodes until the given selector, optionally
   * filtered by a selector.
   *
   * @example
   * $(element).prevUntil();
   *
   * // For more check;
   * // - is() method for 'untilSelctor'
   * // - filter() method for 'filterSelector'
   * $(element).prevUntil( 'untilSelector', 'filterSelector' );
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [selector] A selector
   * to indicate where to stop matching ancestor elements.
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter]   A selector
   * to filter.
   * @return {EagleJS} A new collection.
   */
  prevUntil (selector, filter) {
    return this.mapPropUntil('previousElementSibling', filter, selector);
  }

  /**
   * Get or set the property value for items of the collection.
   *
   * @example
   * <caption>prop (name: string): any</caption>
   * $(element).prop( 'propertyName' );
   *
   * @example
   * <caption>prop (name: string, value: any): this</caption>
   * $(element).prop( 'propertyName', 'value' );
   *
   * @param  {string} name    The name of property.
   * @param  {*}      [value] The value for property.
   * @return {*|this} The property value of the first item; or the current
   * collection if the value parameter provided.
   */
  prop (name, value) {
    if (typeof value !== 'undefined') {
      this.forEach((element) => {
        element[name] = value;
      });
      return this;
    }
    /** @type {*} */
    let returnValue;
    this.some((element) => {
      if (name in element) {
        returnValue = element[name];
      }
      return false;
    });
    return returnValue;
  }

  /**
   * Adds one or more items to the end of the collection.
   *
   * @example
   * $(element).push( DOMItem, DOMItem, DOMItem );
   *
   * // Spread and push
   * $(element).push( ...DOMItem[] );
   * $(element).push( ...EagleJS );
   *
   * @param  {...DOMItem} items Items to add to the end of the collection.
   * @return {number} The new length.
   */
  push (...items) {
    return super.push(...items.filter((item) => {
      return EagleJS.isDOMItem(item) && !this.includes(item);
    }));
  }

  /**
   * Specify a function to execute when the DOM is fully loaded.
   *
   * @example
   * $(document).ready(function () {
   *
   * });
   *
   * @param  {EventListener} handler The handler funcion for event.
   * @return {this} The current collection.
   */
  ready (handler) {
    this.forEach((element) => {
      if (EagleJS.isDocument(element)) {
        if (element.readyState === 'loading') {
          new EagleJS(element).on('DOMContentLoaded', handler);
        } else {
          setTimeout(handler); // Async
        }
      }
    });
    return this;
  }

  /**
   * Remove nodes of the collection from the DOM.
   *
   * @example
   * $(element).remove();
   *
   * @return {this} The current collection.
   */
  remove () {
    this.forEach((element) => {
      if (EagleJS.isChildNode(element)) {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    });
    return this;
  }

  /**
   * Remove the attribute from each element of the collection.
   *
   * @example
   * $(element).removeAttr( 'attributeName' );
   * $(element).removeAttr( 'attributeName', 'attributeName' );
   *
   * @param  {string[]} names One or more attribute names.
   * @return {this} The current collection.
   */
  removeAttr (...names) {
    this.forEach((element) => {
      if (EagleJS.isElement(element)) {
        names.forEach((name) => {
          element.removeAttribute(name);
        });
      }
    });
    return this;
  }

  /**
   * Remove the class name from each element of the collection.
   *
   * @example
   * $(element).removeClass( 'className' );
   * $(element).removeClass( 'className', className' );
   *
   * @param  {string[]} names One or more class names.
   * @return {this} The current collection.
   */
  removeClass (...names) {
    this.forEach((element) => {
      if (EagleJS.isElement(element)) {
        element.classList.remove(...names);
      }
    });
    return this;
  }

  /**
   * Remove the property from each item of the collection.
   *
   * @example
   * $(element).removeProp( 'propertyName' );
   * $(element).removeProp( 'propertyName', 'propertyName' );
   *
   * @param  {string} name The name of property.
   * @return {this} The current collection.
   */
  removeProp (name) {
    this.forEach((element) => {
      delete element[name];
    });
    return this;
  }

  /**
   * Replace the given target with each item of the collection.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).replaceAll( 'selector' );
   * $(element).replaceAll( 'htmlString' ); // Create HTML tag
   *
   * // DOMItem
   * $(element).replaceAll( DOMItem );
   *
   * // DOMItemArray
   * $(element).replaceAll( DOMItem[] );
   * $(element).replaceAll( EagleJS );
   *
   * @param  {string|DOMItem|DOMItemArray} target The target to replace.
   * @return {EagleJS} A new collection.
   */
  replaceAll (target) {
    const $target = new EagleJS(target);
    const $content = this.insertBefore($target);
    $target.remove();
    return $content;
  }

  /**
   * Replace each node of the collection with the given content.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).replaceWith( 'selector' );
   * $(element).replaceWith( 'htmlString' ); // Create HTML tag
   *
   * // DOMItem
   * $(element).replaceWith( DOMItem );
   *
   * // DOMItemArray
   * $(element).replaceWith( DOMItem[] );
   * $(element).replaceWith( EagleJS );
   *
   * @param  {string|DOMItem|DOMItemArray} content The content to insert.
   * @return {this} The current collection.
   */
  replaceWith (content) {
    return this.before(content).remove();
  }

  /**
   * Get the siblings of nodes, optionally filtered by a selector.
   *
   * @example
   * $(element).siblings();
   * $(element).siblings( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMItem|DOMItemArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  siblings (filter) {
    const $elements = new EagleJS();
    this.forEach((element) => {
      const $element = new EagleJS(element);
      $elements.push(...$element.parent().children(filter).not($element));
    });
    return $elements;
  }

  /**
   * Get or set the text contents of nodes in the collection.
   *
   * @example
   * <caption>text (): string | null</caption>
   * $(element).text();
   *
   * @example
   * <caption>text (value: any): this</caption>
   * $(element).text( 'value' );
   *
   * @param  {string} [value] The text to set.
   * @return {string|null|this} Text of the first node; or the current
   * collection if the value parameter provided.
   */
  text (value) {
    if (typeof value !== 'undefined') {
      this.forEach((element) => {
        if (EagleJS.isNode(element)) {
          element.textContent = value;
        }
      });
      return this;
    }
    /** @type {string|null} */
    let returnValue = null;
    this.some((element) => {
      if (EagleJS.isNode(element)) {
        returnValue = element.textContent;
        return true;
      }
      return false;
    });
    return returnValue;
  }

  /**
   * Toggle the class name to each element of the collection.
   *
   * @example
   * $(element).toggleClass( 'className' );
   * $(element).toggleClass( 'className', true ); // Force to add
   * $(element).toggleClass( 'className', false ); // Force to remove
   *
   * @param  {string}  names   One or more class names.
   * @param  {boolean} [force] A boolean value to determine whether the class
   * should be added or removed.
   * @return {this} The current collection.
   */
  toggleClass (names, force) {
    const namesArray = names.match(/\S+/g) || [];
    this.forEach((element) => {
      if (EagleJS.isElement(element)) {
        namesArray.forEach((name) => {
          element.classList.toggle(name, force);
        });
      }
    });
    return this;
  }

  /**
   * Trigger the specified event on each item of the collection.
   *
   * @example
   * $(element).trigger( 'click' );
   * $(element).trigger( 'click', data );
   *
   * @param  {string}      type        Name of the event.
   * @param  {object|null} [data=null] Additional data to pass along to the
   * event handler.
   * @return {this} The current collection.
   */
  trigger (type, data = null) {
    const event = new CustomEvent(type, {
      bubbles: true,
      cancelable: true,
      detail: data
    });
    this.forEach((element) => {
      element.dispatchEvent(event);
    });
    return this;
  }

  /**
   * Adds new items to the beginning of the collection.
   *
   * @example
   * $(element).unshift( DOMItem, DOMItem, DOMItem );
   *
   * // Spread and unshift
   * $(element).unshift( ...DOMItem[] );
   * $(element).unshift( ...EagleJS );
   *
   * @param  {...DOMItem} items Items to add to the front of the collection.
   * @return {number} The new length.
   */
  unshift (...items) {
    return super.unshift(...items.filter((item) => {
      return EagleJS.isDOMItem(item) && !this.includes(item);
    }));
  }
}

/**
 * DOM items like EventTarget, Node, and Window.
 *
 * @typedef {EventTarget|Node|Window} DOMItem
 */

/**
 * An array of DOM items.
 *
 * @typedef {EagleJS|DOMItem[]|HTMLCollection|NodeList} DOMItemArray
 */

/**
 * A function to test each item of the collection.
 *
 * @callback MatchCallback
 * @param  {DOMItem} element The current element being processed.
 * @param  {number}  [index] The index of the current element being processed.
 * @param  {EagleJS} [array] The array function was called upon.
 * @return {boolean|*}
 */

/**
 * Proxy to use EagleJS Class without the new keyword.
 *
 * @example
 * <caption>Usage (Classic Style)</caption>
 * window.$ = EagleJSProxy;
 *
 * @example
 * <caption>Usage (Ecmascript 6 Module)</caption>
 * // Default Import
 * import $ from 'eaglejs.module.js';
 *
 * // Custom Import
 * import {EagleJSProxy as $} from 'eaglejs.module.js';
 */
const EagleJSProxy = new Proxy(EagleJS, {
  apply: (Target, _thisArg, argumentsList) => {
    return new Target(...argumentsList);
  }
});

// Define $
window.$ = EagleJSProxy;
