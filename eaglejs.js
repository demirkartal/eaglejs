/* eslint semi: "error", no-param-reassign: "error" */
/**
 * EagleJS is a jQuery-Like DOM manipulation class for modern browsers
 *
 * @version   0.4.0
 * @copyright 2020 Cem Demirkartal
 * @license   MIT
 * @see       {@link https://github.com/EagleFramework/EagleJS GitHub}
 * @extends   Array
 */
class EagleJS extends Array {
  /**
   * Return a collection of matched elements or created elements by HTML string.
   *
   * @example
   * // CSS Selector and htmlString
   * $( 'selector' );
   * $( 'htmlString' ); // Create HTML tag
   *
   * // DOMNode
   * $( Node );
   *
   * // DOMNodeArray
   * $( Node[] );
   * $( EagleJS );
   *
   * // CSS Selector + CSS Selector
   * $( 'selector', 'selector' );
   *
   * // CSS Selector + DOMNode
   * $( 'selector', Node );
   *
   * // CSS Selector + DOMNodeArray
   * $( 'selector', Node[] );
   * $( 'selector', EagleJS );
   *
   * @param {string|DOMNode|DOMNodeArray} [selector] A selector to match.
   * @param {string|DOMNode|DOMNodeArray} [context=document] Node(s) to use as
   * context.
   */
  constructor (selector, context = document) {
    /** @type {Array} */
    const elements = [];
    if (typeof selector !== 'undefined') {
      /** @type {*} */
      let result;
      // Query with String Selector
      if (typeof selector === 'string') {
        const normalized = EagleJS.normalizeSelector(selector);
        if (/^(<).+(>)$/i.test(normalized)) {
          // Create HTML tag
          const doc = document.implementation.createHTMLDocument('');
          doc.body.innerHTML = normalized;
          result = doc.body.children;
        } else {
          // Find
          return new EagleJS(context).find(normalized);
        }
      } else if (EagleJS.isIterable(selector)) { // Iterable Object
        result = selector;
      } else { // Any
        result = [selector];
      }
      // Convert Iterable Object to Array and Filter
      for (let i = 0; i < result.length; i++) {
        if (EagleJS.isContext(result[i]) && !elements.includes(result[i])) {
          elements.push(result[i]);
        }
      }
    }
    super(...elements);
  }

  /**
   * Adds one or more class names to elements of the collection.
   *
   * @example
   * $(element).addClass( 'classname' );
   * $(element).addClass( 'classname classname' );
   *
   * @param  {string} name One or more class names.
   * @return {EagleJS} The current collection.
   */
  addClass (name) {
    if (typeof name === 'string') {
      const classes = name.match(/\S+/g) || [];
      this.forEach((element) => {
        if (EagleJS.isElement(element)) {
          element.classList.add(...classes);
        }
      });
    }
    return this;
  }

  /**
   * Insert content or element after each element in the collection.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).after( 'selector' );
   * $(element).after( 'htmlString' ); // Create HTML tag
   *
   * // DOMNode
   * $(element).after( Node );
   *
   * // DOMNodeArray
   * $(element).after( Node[] );
   * $(element).after( EagleJS );
   *
   * @param  {string|DOMNode|DOMNodeArray} content The content to insert.
   * @return {EagleJS} The current collection.
   */
  after (content) {
    return this.insertElement(content, 'after');
  }

  /**
   * Insert content or element to the end of each element in the collection.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).append( 'selector' );
   * $(element).append( 'htmlString' ); // Create HTML tag
   *
   * // DOMNode
   * $(element).append( Node );
   *
   * // DOMNodeArray
   * $(element).append( Node[] );
   * $(element).append( EagleJS );
   *
   * @param  {string|DOMNode|DOMNodeArray} content The content to insert.
   * @return {EagleJS} The current collection.
   */
  append (content) {
    return this.insertElement(content, 'append');
  }

  /**
   * Insert every element in the collection to the end of the target.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).appendTo( 'selector' );
   * $(element).appendTo( 'htmlString' ); // Create HTML tag
   *
   * // DOMNode
   * $(element).appendTo( Node );
   *
   * // DOMNodeArray
   * $(element).appendTo( Node[] );
   * $(element).appendTo( EagleJS );
   *
   * @param  {string|DOMNode|DOMNodeArray} target The target to insert.
   * @return {EagleJS} A new collection of clone and original node elements.
   */
  appendTo (target) {
    return this.insertElementTo(target, 'append');
  }

  /**
   * Get or set attribute value for elements of the collection.
   *
   * @example
   * <caption>attr(name: string): string | undefined</caption>
   * // Returns attribute
   * $(element).attr( 'name' );
   *
   * @example
   * <caption>attr(name: string, value: any): EagleJS</caption>
   * // Sets attribute
   * $(element).attr( 'name', 'string' );
   * $(element).attr( 'name', 100 );
   *
   * @param  {string} name    The name of attribute.
   * @param  {*}      [value] The value for attribute.
   * @return {string|undefined|EagleJS} The current collection or value of
   * attribute.
   */
  attr (name, value) {
    if (typeof name !== 'undefined') {
      if (typeof name === 'string') {
        // Set attribute
        if (typeof value !== 'undefined') {
          if (value === null) {
            return this.removeAttr(name);
          }
          this.forEach((element) => {
            if (EagleJS.isElement(element)) {
              element.setAttribute(name, String(value));
            }
          });
          return this;
        }
        // Get attribute
        const $result = this.find((element) => {
          return EagleJS.isElement(element) && element.hasAttribute(name);
        });
        if ($result.length > 0) {
          return $result[0].getAttribute(name);
        }
      }
      return undefined;
    }
    return this;
  }

  /**
   * Insert content or element before each element in the collection.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).before( 'selector' );
   * $(element).before( 'htmlString' ); // Create HTML tag
   *
   * // DOMNode
   * $(element).before( Node );
   *
   * // DOMNodeArray
   * $(element).before( Node[] );
   * $(element).before( EagleJS );
   *
   * @param  {string|DOMNode|DOMNodeArray} content The content to insert.
   * @return {EagleJS} The current collection.
   */
  before (content) {
    return this.insertElement(content, 'before');
  }

  /**
   * Get the children of elements. Optionally filtered by the selector.
   *
   * @example
   * $(element).children();
   * $(element).children( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  children (filter) {
    const $elements = new EagleJS();
    this.forEach((element) => {
      $elements.push(...element.childNodes);
    });
    if (typeof filter !== 'undefined') {
      return $elements.filter(filter);
    }
    return $elements;
  }

  /**
   * Create a deep copy of each element in the collection.
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
    return new EagleJS(this.map((element) => {
      if (EagleJS.isElement(element)) {
        return element.cloneNode(deep);
      }
      return null;
    }));
  }

  /**
   * Get the closest ancestor of elements matching with selector
   *
   * @example
   * $(element).closest( 'selector' );
   *
   * @param  {string} selector A selector to match.
   * @return {EagleJS} A new collection.
   */
  closest (selector) {
    let result = [];
    if (typeof selector === 'string') {
      const normalized = EagleJS.normalizeSelector(selector);
      if (normalized !== '') {
        result = this.map((element) => {
          if (EagleJS.isElement(element)) {
            return element.closest(normalized);
          }
          return null;
        });
      }
    }
    return new EagleJS(result);
  }

  /**
   * Merge two or more collections.
   *
   * @example
   * $(element).concat( Node[], Node[], Node[] );
   * $(element).concat( EagleJS, EagleJS, EagleJS );
   *
   * @param  {...*|Array} items Values to concatenate into a new array.
   * @return {EagleJS} A new collection.
   */
  concat (...items) {
    return new EagleJS(super.concat(...items));
  }

  /**
   * Remove all child nodes of the set of matched elements from the DOM.
   *
   * @example
   * $(element).empty();
   *
   * @return {EagleJS} The current collection.
   */
  empty () {
    this.html('');
    return this; // better return type for IDE
  }

  /**
   * Get the element at the position specified by index from the collection.
   *
   * @example
   * $(element).eq( 1 ); // Index from beginning
   * $(element).eq( -1 ); // Index from end
   *
   * @param  {number} index The position of element.
   * @return {EagleJS} A new collection.
   */
  eq (index) {
    return this.slice(index, index + 1);
  }

  /**
   * Check if all elements of the collection pass the given condition.
   *
   * @example
   * $(element).every(function (element, index) {
   *  return this.val == 0;
   * });
   *
   * @param  {MatchCallback} callback A function to test for each element.
   * @return {boolean} True if all elements match the given condition,
   * otherwise false.
   */
  every (callback) {
    return super.every((element, index, array) => {
      return callback.call(element, element, index, array);
    });
  }

  /**
   * Reduce the elements of the collection with the given filter.
   *
   * @example
   * // CSS Selector
   * $(element).filter( 'selector' );
   *
   * // DOMNode
   * $(element).filter( Node );
   *
   * // DOMNodeArray
   * $(element).filter( Node[] );
   * $(element).filter( EagleJS );
   *
   * // Function
   * $(element).filter(function (element, index) {
   *  return this.val > 0;
   * });
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [selector] A selector
   * to match.
   * @return {EagleJS} A new collection.
   */
  filter (selector) {
    if (typeof selector !== 'undefined') {
      if (typeof selector === 'string') {
        const normalized = EagleJS.normalizeSelector(selector);
        if (normalized !== '') {
          return this.filter((element) => {
            return EagleJS.isElement(element) && element.matches(normalized);
          });
        }
      } else if (typeof selector === 'function') {
        return new EagleJS(super.filter((element, index, array) => {
          return selector.call(element, element, index, array);
        }));
      } else {
        const $selector = new EagleJS(selector);
        return this.filter((element) => {
          return $selector.includes(element);
        });
      }
    }
    return new EagleJS();
  }

  /**
   * Returns the matched descendants of elements with the filter.<br>
   * Be aware: If the parameter is a function, the method acts as
   * "Array.prototype.find" function.
   *
   * @example
   * // CSS Selector
   * $(element).find( 'selector' );
   *
   * // Function (See: Array.prototype.find())
   * $(element).find(function (element, index) {
   *  return this.val > 0;
   * });
   *
   * @param  {string|MatchCallback} selector A selector to match.
   * @return {EagleJS} A new collection.
   */
  find (selector) {
    const $elements = new EagleJS();
    if (typeof selector === 'string') {
      const normalized = EagleJS.normalizeSelector(selector);
      if (normalized !== '') {
        this.forEach((element) => {
          $elements.push(...element.querySelectorAll(normalized));
        });
      }
    } else if (typeof selector === 'function') {
      $elements.push(super.find((element, index, array) => {
        return selector.call(element, element, index, array);
      }));
    }
    return $elements;
  }

  /**
   * Get the first element of the collection.
   *
   * @example
   * $(element).first();
   *
   * @return {EagleJS} A new collection.
   */
  first () {
    return this.slice(0, 1);
  }

  /**
   * Executing a function for each element in the collection.
   *
   * @example
   * $(element).forEach(function (element, index) {
   *
   * });
   *
   * @param  {EachCallback} callback A function to execute on each element.
   * @return {EagleJS} The current collection.
   */
  forEach (callback) {
    super.forEach((element, index, array) => {
      callback.call(element, element, index, array);
    });
    return this;
  }

  /**
   * Alias to EagleJS.prototype.
   *
   * @example
   * // Adds a new method (plugin) to the library
   * $.fn.newPlugin = function () {
   *   return this.each(function () {
   *     // Do something to each element here.
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
   * $(element).hasClass( 'classname' );
   *
   * @param  {string} name The class name to search.
   * @return {boolean} True if elements have the given class name, otherwise
   * false.
   */
  hasClass (name) {
    if (typeof name === 'string') {
      return this.some((element) => {
        return EagleJS.isElement(element) && element.classList.contains(name);
      });
    }
    return false;
  }

  /**
   * Get or set the HTML contents of elements of the collection.
   *
   * @example
   * <caption>html(): string | undefined </caption>
   * $(element).html();
   *
   * @example
   * <caption>html(value: string): EagleJS</caption>
   * $(element).html( 'htmlString' ); // Create HTML tag
   *
   * @param  {string} [value] The html string to set.
   * @return {string|undefined|EagleJS} The current collection or html string
   * of element.
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
    return (this.length) ? this[0].innerHTML : undefined;
  }

  /**
   * Whether the current collection includes a certain value among its entries,
   * returning true or false as appropriate.
   *
   * @param  {*}      value       The value to search for.
   * @param  {number} [fromIndex] The position in the collection at which to
   * begin searching for value.
   * @return {boolean} A Boolean which is true if the value is found (or the
   * part of the collection indicated by the index fromIndex, if specified).
   */
  includes (value, fromIndex) {
    return super.includes(value, fromIndex);
  }

  /**
   * Insert every element in the collection after the target.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).insertAfter( 'selector' );
   * $(element).insertAfter( 'htmlString' ); // Create HTML tag
   *
   * // DOMNode
   * $(element).insertAfter( Node );
   *
   * // DOMNodeArray
   * $(element).insertAfter( Node[] );
   * $(element).insertAfter( EagleJS );
   *
   * @param  {string|DOMNode|DOMNodeArray} target The target to insert.
   * @return {EagleJS} A new collection of clone and original node elements.
   */
  insertAfter (target) {
    return this.insertElementTo(target, 'after');
  }

  /**
   * Insert every element in the collection before the target.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).insertBefore( 'selector' );
   * $(element).insertBefore( 'htmlString' ); // Create HTML tag
   *
   * // DOMNode
   * $(element).insertBefore( Node );
   *
   * // DOMNodeArray
   * $(element).insertBefore( Node[] );
   * $(element).insertBefore( EagleJS );
   *
   * @param  {string|DOMNode|DOMNodeArray} target The target to insert.
   * @return {EagleJS} A new collection of clone and original node elements.
   */
  insertBefore (target) {
    return this.insertElementTo(target, 'before');
  }

  /**
   * Insert content or element to the specified position of each element in the
   * collection.
   *
   * @example
   * $(element).insertElement( content, "after" ); // Inserts after
   * $(element).insertElement( content, "append" ); // Inserts to end
   * $(element).insertElement( content, "before" ); // Inserts before
   * $(element).insertElement( content, "prepend" ); // Inserts to beginning
   *
   * // Return clone and original node elements
   * $(element).insertElement( content, "after", true );
   * $(element).insertElement( content, "append", true );
   * $(element).insertElement( content, "before", true );
   * $(element).insertElement( content, "prepend", true );
   *
   * @protected
   * @param  {string|DOMNode|DOMNodeArray} content The content to insert.
   * @param  {string}                 insertMethod The method to insert.<br>
   * ("after": after, "append": end, "before": before, "prepend": beginning)
   * @param  {boolean} [returnContent=false]       If true, returns a new
   * collection of clone and original node elements.
   * @return {EagleJS} If the returnContent parameter is true, it returns a new
   * collection of clone and original node elements. Otherwise the current
   * collection
   */
  insertElement (content, insertMethod, returnContent = false) {
    const $content = new EagleJS(content);
    const $elements = new EagleJS();
    this.forEach((element, index) => {
      if (EagleJS.isElement(element)) {
        const parent = element.parentNode;
        let $clone;
        if (index === this.length - 1) { // Original to last
          $clone = $content;
        } else {
          $clone = $content.clone();
        }
        if (returnContent) {
          $elements.push(...$clone);
        }
        if (insertMethod === 'after' && EagleJS.isContext(parent)) {
          $clone.forEach((clone) => {
            parent.insertBefore(clone, element.nextSibling);
          });
        } else if (insertMethod === 'append') {
          $clone.forEach((clone) => {
            element.appendChild(clone);
          });
        } else if (insertMethod === 'before' && EagleJS.isContext(parent)) {
          $clone.forEach((clone) => {
            parent.insertBefore(clone, element);
          });
        } else if (insertMethod === 'prepend') {
          $clone.forEach((clone) => {
            element.insertBefore(clone, element.firstChild);
          });
        }
      }
    });
    if (returnContent) {
      return $elements;
    }
    return this;
  }

  /**
   * Insert every element in the collection to the specified position of the
   * target.
   *
   * @example
   * $(element).insertElementTo( target, "after" ); // Inserts after
   * $(element).insertElementTo( target, "append" ); // Inserts to end
   * $(element).insertElementTo( target, "before" ); // Inserts before
   * $(element).insertElementTo( target, "prepend" ); // Inserts to beginning
   *
   * @protected
   * @param  {string|DOMNode|DOMNodeArray} target The target to insert.
   * @param  {string}                insertMethod The method to insert.<br>
   * ("after": after, "append": end, "before": before, "prepend": beginning)
   * @return {EagleJS} A new collection of clone and original node elements.
   */
  insertElementTo (target, insertMethod) {
    return new EagleJS(target).insertElement(this, insertMethod, true);
  }

  /**
   * Check any collection elements matches selector
   *
   * @example
   * // CSS Selector
   * $(element).is( 'selector' );
   *
   * // DOMNode
   * $(element).is( Node );
   *
   * // DOMNodeArray
   * $(element).is( Node[] );
   * $(element).is( EagleJS );
   *
   * // Function
   * $(element).is(function (element, index) {
   *  return this.val == 0;
   * });
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [selector] A selector
   * to match.
   * @return {boolean} True if any element matches the given filter, otherwise
   * false.
   */
  is (selector) {
    if (typeof selector !== 'undefined') {
      if (typeof selector === 'string') {
        const normalized = EagleJS.normalizeSelector(selector);
        if (normalized !== '') {
          return this.some((element) => {
            return EagleJS.isElement(element) && element.matches(normalized);
          });
        }
      } else if (typeof selector === 'function') {
        return this.some(selector);
      } else {
        const $selector = new EagleJS(selector);
        return this.some((element) => {
          return $selector.includes(element);
        });
      }
    }
    return false;
  }

  /**
   * Check if the variable is a context node (Document and Element).
   *
   * @example
   * $.isContext( document ); // true
   * $.isContext( document.querySelector( 'selector' ) ); // true
   *
   * @protected
   * @param  {*} value The value to check.
   * @return {boolean} True if the variable is a context node, otherwise false.
   */
  static isContext (value) {
    Array.isArray(value);
    return EagleJS.isElement(value) || EagleJS.isDocument(value);
  }

  /**
   * Check if the variable is a Document node.
   *
   * @example
   * $.isDocument( document ); // true
   * $.isDocument( document.querySelector( 'selector' ) ); // false
   *
   * @param  {*} value The value to check.
   * @return {boolean} True if the variable is a Document node, otherwise false.
   */
  static isDocument (value) {
    return Boolean(value && value.nodeType && value.nodeType === 9);
  }

  /**
   * Check if the variable is a Element node.
   *
   * @example
   * $.isElement( document.querySelector( 'selector' ) ); // true
   * $.isElement( document ); // false
   *
   * @param  {*} value The value to check.
   * @return {boolean} True if the variable is a Element node, otherwise false.
   */
  static isElement (value) {
    return Boolean(value && value.nodeType && value.nodeType === 1);
  }

  /**
   * Check if the variable is an iterable.
   *
   * @protected
   * @param  {*} value The value to check.
   * @return {boolean} True if the variable is an iterable, otherwise false.
   */
  static isIterable (value) {
    return value !== null && typeof value[Symbol.iterator] === 'function';
  }

  /**
   * Get the last element of the collection.
   *
   * @example
   * $(element).last();
   *
   * @return {EagleJS} A new collection.
   */
  last () {
    return this.slice(-1);
  }

  /**
   * Generates a new array with returned values.
   *
   * @example
   * $(element).map(function (element, index) {
   *   return element.id;
   * });
   *
   * @param  {MapCallback} callback A function that is called for every element
   * of the collection.
   * @return {Array} A new array with each element being the result of the
   * callback function.
   */
  map (callback) {
    return [...super.map((element, index, array) => {
      return callback.call(element, element, index, array);
    })];
  }

  /**
   * Collect the given property of elements. Optionally filtered by the
   * selector.
   *
   * @example
   * // Until node element exists
   * $(element).mapProperty( 'nextElementSibling' );
   * $(element).mapProperty( 'parentNode' );
   * $(element).mapProperty( 'parentElement' );
   * $(element).mapProperty( 'previousElementSibling' );
   *
   * // Until node element exists and filter
   * $(element).mapProperty( 'parentNode', '*');
   *
   * @protected
   * @param  {string} name Name of property.
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  mapProperty (name, filter) {
    const $elements = new EagleJS(this.map((element) => {
      return element[name];
    }));
    if (typeof filter !== 'undefined') {
      return $elements.filter(filter);
    }
    return $elements;
  }

  /**
   * Collect the given property of elements until the given selector.
   * Optionally filtered by the selector.
   *
   * @example
   * // Until node element exists
   * $(element).mapPropertyUntil( 'nextElementSibling' );
   * $(element).mapPropertyUntil( 'parentNode' );
   * $(element).mapPropertyUntil( 'parentElement' );
   * $(element).mapPropertyUntil( 'previousElementSibling' );
   *
   * // Until node element exists and filter
   * $(element).mapPropertyUntil( 'parentNode', '*');
   *
   * // Until property matches to the until selector and filter
   * $(element).mapPropertyUntil( 'parentNode', '*', 'untilSelector' );
   *
   * // Until property matches to the until selector and no filter
   * $(element).mapPropertyUntil( 'parentNode', undefined, 'untilSelector' );
   *
   * @protected
   * @param  {string} name Name of property.
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
   * filter.
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [until]  A selector to
   * indicate where to stop matching ancestor elements.
   * @return {EagleJS} A new collection.
   */
  mapPropertyUntil (name, filter, until) {
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
   * Get the next sibling of elements. Optionally filtered by the selector.
   *
   * @example
   * $(element).next();
   * $(element).next( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  next (filter) {
    return this.mapProperty('nextElementSibling', filter);
  }

  /**
   * Get all following siblings of elements. Optionally filtered by the
   * selector.
   *
   * @example
   * $(element).nextAll();
   * $(element).nextAll( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  nextAll (filter) {
    return this.mapPropertyUntil('nextElementSibling', filter);
  }

  /**
   * Get all following siblings of elements until the given selector. Optionally
   * filtered by the selector.
   *
   * @example
   * $(element).nextUntil();
   *
   * // For more check;
   * // - is() method for 'untilSelctor'
   * // - filter() method for 'filterSelector'
   * $(element).nextUntil( 'untilSelector', 'filterSelector' );
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [selector] A selector
   * to indicate where to stop matching ancestor elements.
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  nextUntil (selector, filter) {
    return this.mapPropertyUntil('nextElementSibling', filter, selector);
  }

  /**
   * Normalizes given CSS selector.<br>
   * Trims and adds ":scope" if begins with Child or Adjacent Sibling
   * combinator.
   *
   * @example
   * $.normalizeSelector( " <div> " ) // returns "<div>"
   * $.normalizeSelector( " > * " ) // returns ":scope > *"
   * $.normalizeSelector( " + * " ) // returns ":scope + *"
   * $.normalizeSelector( " ~ * " ) // returns ":scope ~ *"
   *
   * // The method does not tolerate selector for any possible DOM errors
   * $.normalizeSelector( " > " ) // returns ":scope >" means error
   * $.normalizeSelector( " + " ) // returns ":scope +" means error
   * $.normalizeSelector( " ~ " ) // returns ":scope ~" means error
   *
   * // Any type which is not a string always returns an empty string
   * $.normalizeSelector() // returns ""
   * $.normalizeSelector( 1 ) // returns ""
   * $.normalizeSelector( true ) // returns ""
   * $.normalizeSelector( [] ) // returns ""
   *
   * @param  {*} selector CSS selector to normalize.
   * @return {string} Normalized CSS selector.
   */
  static normalizeSelector (selector) {
    let normalized = '';
    if (typeof selector === 'string') {
      // Trim whitespaces
      normalized = selector.trim();
      // Add ":scope" if begins with Child or Adjacent Sibling combinator
      if (/^[>+~]/.test(normalized)) {
        normalized = ':scope ' + normalized;
      }
    }
    return normalized;
  }

  /**
   * Remove matched elements from the collection.
   *
   * @example
   * // CSS Selector
   * $(element).not( 'selector' );
   *
   * // DOMNode
   * $(element).not( Node );
   *
   * // DOMNodeArray
   * $(element).not( Node[] );
   * $(element).not( EagleJS );
   *
   * // Function
   * $(element).not(function (element, index) {
   *  return this.val > 0;
   * });
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [selector] A selector
   * to match.
   * @return {EagleJS} A new collection.
   */
  not (selector) {
    if (typeof selector !== 'undefined') {
      if (typeof selector === 'string') {
        const normalized = EagleJS.normalizeSelector(selector);
        if (normalized !== '') {
          return this.filter((element) => {
            return EagleJS.isElement(element) && !element.matches(normalized);
          });
        }
      } else if (typeof selector === 'function') {
        return this.filter((element, index, array) => {
          return !selector.call(element, element, index, array);
        });
      } else {
        const $selector = new EagleJS(selector);
        return this.filter((element) => {
          return !$selector.includes(element);
        });
      }
      return new EagleJS();
    }
    return this.slice(); // Copy
  }

  /**
   * Remove an event handler from elements of the collection.
   *
   * @example
   * $(element).off( 'click', handler );
   *
   * @param  {string}        events  One or more event names.
   * @param  {EventListener} handler The handler funcion for event.
   * @param  {boolean|EventListenerOptions} [options=false] Characteristics of
   * event listener.
   * @return {EagleJS} The current collection.
   */
  off (events, handler, options = false) {
    if (typeof events === 'string' && typeof handler === 'function') {
      const eventNames = events.match(/\S+/g) || [];
      this.forEach((element) => {
        eventNames.forEach((event) => {
          element.removeEventListener(event, handler, options);
        });
      });
    }
    return this;
  }

  /**
   * Attach an event handler to elements of the collection.
   *
   * @example
   * $(element).on( 'hover', function(event) {
   *   console.log( $(this).text() );
   * });
   *
   * @param  {string}        events  One or more event names.
   * @param  {EventListener} handler The handler funcion for event.
   * @param  {boolean|AddEventListenerOptions} [options=false] Characteristics
   * of event listener.
   * @return {EagleJS} The current collection.
   */
  on (events, handler, options = false) {
    if (typeof events === 'string' && typeof handler === 'function') {
      const eventNames = events.match(/\S+/g) || [];
      this.forEach((element) => {
        eventNames.forEach((event) => {
          element.addEventListener(event, handler, options);
        });
      });
    }
    return this;
  }

  /**
   * Attach an event handler to elements of the collection. The handler is
   * executed at most once per element per event type.
   *
   * @example
   * $(element).one( 'hover', function(event) {
   *   console.log( $(this).text() );
   * });
   *
   * @param  {string}        events  One or more event names.
   * @param  {EventListener} handler The handler funcion for event.
   * @return {EagleJS} The current collection.
   */
  one (events, handler) {
    return this.on(events, handler, {
      once: true
    });
  }

  /**
   * Get the parent of elements. Optionally filtered by the selector.
   *
   * @example
   * $(element).parent();
   * $(element).parent( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  parent (filter) {
    return this.mapProperty('parentNode', filter);
  }

  /**
   * Get the ancestors of elements. Optionally filtered by the selector.
   *
   * @example
   * $(element).parents();
   * $(element).parents( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  parents (filter) {
    return this.mapPropertyUntil('parentElement', filter);
  }

  /**
   * Get the ancestors of elements until the given selector. Optionally
   * filtered by the selector.
   *
   * @example
   * $(element).parentsUntil();
   *
   * // For more check;
   * // - is() method for 'untilSelctor'
   * // - filter() method for 'filterSelector'
   * $(element).parentsUntil( 'untilSelector', 'filterSelector' );
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [selector] A selector
   * to indicate where to stop matching ancestor elements.
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  parentsUntil (selector, filter) {
    return this.mapPropertyUntil('parentElement', filter, selector);
  }

  /**
   * Insert content or element to the beginning each element in the collection.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).prepend( 'selector' );
   * $(element).prepend( 'htmlString' ); // Create HTML tag
   *
   * // DOMNode
   * $(element).prepend( Node );
   *
   * // DOMNodeArray
   * $(element).prepend( Node[] );
   * $(element).prepend( EagleJS );
   *
   * @param  {string|DOMNode|DOMNodeArray} content The content to insert.
   * @return {EagleJS} The current collection.
   */
  prepend (content) {
    return this.insertElement(content, 'prepend');
  }

  /**
   * Insert every element in the collection to the beginning of the target.
   *
   * @example
   * // CSS Selector and htmlString
   * $(element).prependTo( 'selector' );
   * $(element).prependTo( 'htmlString' ); // Create HTML tag
   *
   * // DOMNode
   * $(element).prependTo( Node );
   *
   * // DOMNodeArray
   * $(element).prependTo( Node[] );
   * $(element).prependTo( EagleJS );
   *
   * @param  {string|DOMNode|DOMNodeArray} target The target to insert.
   * @return {EagleJS} A new collection.
   */
  prependTo (target) {
    return this.insertElementTo(target, 'prepend');
  }

  /**
   * Get the previous sibling of elements. Optionally filtered by the selector.
   *
   * @example
   * $(element).prev();
   * $(element).prev( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  prev (filter) {
    return this.mapProperty('previousElementSibling', filter);
  }

  /**
   * Get all preceding siblings of elements. Optionally filtered by the
   * selector.
   *
   * @example
   * $(element).prevAll();
   * $(element).prevAll( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
   * filter.
   * @return {EagleJS} A new collection.
   */
  prevAll (filter) {
    return this.mapPropertyUntil('previousElementSibling', filter);
  }

  /**
   * Get all preceding siblings of elements until the given selector. Optionally
   * filtered by the selector.
   *
   * @example
   * $(element).prevUntil();
   *
   * // For more check;
   * // - is() method for 'untilSelctor'
   * // - filter() method for 'filterSelector'
   * $(element).prevUntil( 'untilSelector', 'filterSelector' );
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [selector] A selector
   * to indicate where to stop matching ancestor elements.
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter]   A selector
   * to filter.
   * @return {EagleJS} A new collection.
   */
  prevUntil (selector, filter) {
    return this.mapPropertyUntil('previousElementSibling', filter, selector);
  }

  /**
   * Adds new items to the end of the collection.
   *
   * @example
   * $(element).push( Node, Node, Node );
   *
   * // Spread and push
   * $(element).push( ...Node[] );
   * $(element).push( ...EagleJS );
   *
   * @param  {...*} items The elements to add to the end of the collecton.
   * @return {number} The new length.
   */
  push (...items) {
    return super.push(...items.filter((item) => {
      return EagleJS.isContext(item) && !this.includes(item);
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
   * @return {EagleJS} The current collection.
   */
  ready (handler) {
    const $document = this.find((element) => {
      return EagleJS.isDocument(element);
    });
    if ($document.length > 0) {
      if ($document[0].readyState === 'loading') {
        $document.on('DOMContentLoaded', handler);
      } else {
        setTimeout(handler); // Async
      }
    }
    return this;
  }

  /**
   * Remove collection elements from the DOM.
   *
   * @example
   * $(element).remove();
   *
   * @return {EagleJS} The current collection.
   */
  remove () {
    this.forEach((element) => {
      if (EagleJS.isElement(element)) {
        element.remove();
      }
    });
    return this;
  }

  /**
   * Removes one or more attributes from elements of the collection.
   *
   * @example
   * $(element).removeAttr( 'attributeName' );
   *
   * @param  {string} name One or more attribute names.
   * @return {EagleJS} The current collection.
   */
  removeAttr (name) {
    if (typeof name === 'string') {
      const attributes = name.match(/\S+/g) || [];
      this.forEach((element) => {
        if (EagleJS.isElement(element)) {
          attributes.forEach((attrVal) => {
            element.removeAttribute(attrVal);
          });
        }
      });
    }
    return this;
  }

  /**
   * Removes one or more classes from elements of the collection.
   *
   * @example
   * $(element).removeClass( 'classname' );
   * $(element).removeClass( 'classname classname' );
   *
   * @param  {string} name One or more class names.
   * @return {EagleJS} The current collection.
   */
  removeClass (name) {
    if (typeof name === 'string') {
      const classes = name.match(/\S+/g) || [];
      this.forEach((element) => {
        if (EagleJS.isElement(element)) {
          element.classList.remove(...classes);
        }
      });
    }
    return this;
  }

  /**
   * Get the siblings of elements. Optionally filtered by the selector.
   *
   * @example
   * $(element).siblings();
   * $(element).siblings( 'selector' ); // For more check filter() method
   *
   * @param  {string|DOMNode|DOMNodeArray|MatchCallback} [filter] A selector to
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
   * Reduce the collection to a subset specified by a range of indices.
   *
   * @example
   * $(element).slice( 0, 1 );
   *
   * // Create a copy
   * $(element).slice();
   *
   * @param  {number} [begin] Zero-based index at which to begin extraction.
   * @param  {number} [end]   Zero-based index before which to end extraction.
   * @return {EagleJS} A new collection.
   */
  slice (begin, end) {
    return new EagleJS(super.slice(begin, end));
  }

  /**
   * Check if any element of the collection passes the given condition.
   *
   * @example
   * $(element).some(function (element, index) {
   *   return this.val == 0;
   * });
   *
   * @param  {MatchCallback} callback A function to test for each element.
   * @return {boolean} True if any element matches the given condition,
   * otherwise false.
   */
  some (callback) {
    return super.some((element, index, array) => {
      return callback.call(element, element, index, array);
    });
  }

  /**
   * Get or set the text contents of elements of the collection.
   *
   * @example
   * <caption>text(): string</caption>
   * $(element).text();
   *
   * @example
   * <caption>text(value: any): EagleJS</caption>
   * $(element).text( 'string' );
   * $(element).text( 100 );
   * $(element).text( true );
   *
   * @param  {*} [value] The text to set.
   * @return {string|EagleJS} The current collection or text of element.
   */
  text (value) {
    if (typeof value !== 'undefined') {
      this.forEach((element) => {
        if (EagleJS.isElement(element)) {
          element.textContent = String(value);
        }
      });
      return this;
    }
    return (this.length) ? this[0].textContent : '';
  }

  /**
   * Toggle one or more class names for elements of the collection.
   *
   * @example
   * $(element).toggleClass( 'classname' );
   * $(element).toggleClass( 'classname', true ); // Force to add
   * $(element).toggleClass( 'classname', false ); // Force to remove
   *
   * @param  {string}  name    One or more class names.
   * @param  {boolean} [force] A boolean value to determine whether the class
   * should be added or removed.
   * @return {EagleJS} The current collection.
   */
  toggleClass (name, force) {
    if (typeof name === 'string') {
      const classes = name.match(/\S+/g) || [];
      this.forEach((element) => {
        if (EagleJS.isElement(element)) {
          classes.forEach((classVal) => {
            element.classList.toggle(classVal, force);
          });
        }
      });
    }
    return this;
  }

  /**
   * Trigger the specified event on elements of the collection.
   *
   * @example
   * $(element).trigger( 'click' );
   * $(element).trigger( 'click', data );
   *
   * @param  {string}      type        Name of the event.
   * @param  {Object|null} [data=null] Additional data to pass along to the
   * event handler.
   * @return {EagleJS} The current collection.
   */
  trigger (type, data = null) {
    if (typeof type === 'string') {
      const event = new CustomEvent(type, {
        bubbles: true,
        cancelable: true,
        detail: data
      });
      this.forEach((element) => {
        element.dispatchEvent(event);
      });
    }
    return this;
  }

  /**
   * Adds new items to the beginning of the collection.
   *
   * @example
   * $(element).unshift( Node, Node, Node );
   *
   * // Spread and unshift
   * $(element).unshift( ...Node[] );
   * $(element).unshift( ...EagleJS );
   *
   * @param  {...*} items The elements to add to the front of the collecton.
   * @return {number} The new length.
   */
  unshift (...items) {
    return super.unshift(...items.filter((item) => {
      return EagleJS.isContext(item) && !this.includes(item);
    }));
  }
}

/**
 * Characteristics about the event listener.
 *
 * @typedef {Object} AddEventListenerOptions
 * @property  {boolean} [capture] A Boolean indicating that events of this type
 * will be dispatched to the registered listener before being dispatched to any
 * EventTarget beneath it in the DOM tree.
 * @property  {boolean} [once]    A Boolean indicating that the listener should
 * be invoked at most once after being added.
 * @property  {boolean} [passive] A Boolean which, if true, indicates that the
 * function specified by listener will never call preventDefault().
 */

/**
 * The Node object represents a single node in the document tree.
 *
 * @typedef {Document|Element} DOMNode
 */

/**
 * Array of DOM Nodes.
 *
 * @typedef {EagleJS|DOMNode[]|HTMLCollection|NodeList} DOMNodeArray
 */

/**
 * Function to execute on each element.
 *
 * @callback EachCallback
 * @param  {DOMNode} element The current element being processed.
 * @param  {number}  [index] The index of the current element being processed.
 * @param  {Array}   [array] The array function was called upon.
 * @return {void}
 */

/**
 * The handler funcion for event.
 *
 * @callback EventListener
 * @param  {Event} event The current event.
 * @return {void}
 */

/**
 * Characteristics about the event listener.
 *
 * @typedef {Object} EventListenerOptions
 * @property  {boolean} [capture] A Boolean indicating that events of this type
 * will be dispatched to the registered listener before being dispatched to any
 * EventTarget beneath it in the DOM tree.
 */

/**
 * Function to execute on each element.
 *
 * @callback MapCallback
 * @param  {DOMNode} element The current element being processed.
 * @param  {number}  [index] The index of the current element being processed.
 * @param  {Array}   [array] The array function was called upon.
 * @return {*}
 */

/**
 * Function is a predicate, to test each element of the collection.
 *
 * @callback MatchCallback
 * @param  {DOMNode} element The current element being processed.
 * @param  {number}  [index] The index of the current element being processed.
 * @param  {Array}   [array] The array function was called upon.
 * @return {boolean|*}
 */

/**
 * Proxy for EagleJS Class to use without a "new" keyword.
 *
 * @example
 * <caption>Usage (Classic Style)</caption>
 * window.$ = EagleJSProxy;
 *
 * @example
 * <caption>Usage (Ecmascript 6 Module)</caption>
 * // Default Import
 * import $ from "eaglejs.module.js";
 *
 * // Custom Import
 * import {EagleJSProxy as $} from "eaglejs.module.js";
 */
const EagleJSProxy = new Proxy(EagleJS, {
  apply: (Target, _thisArg, argumentsList) => {
    return new Target(...argumentsList);
  }
});

// Define $
window.$ = EagleJSProxy;
