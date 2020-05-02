/* eslint semi: "error", no-param-reassign: "error" */
/* eslint-env es6, browser */
/**
 * EagleJS is a jQuery-Like DOM manipulation class for modern browsers
 *
 * @version   0.3.3
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
   * <caption>$(selector: string): EagleJS</caption>
   * $( 'selector' );
   * $( 'htmlString' ); // Create HTML tag
   *
   * @example
   * <caption>$(selector: Node): EagleJS</caption>
   * $( Node );
   *
   * @example
   * <caption>$(selector: Node[]): EagleJS</caption>
   * $( Node[] );
   *
   * @example
   * <caption>$(selector: string, context: string | Node | Node[]): EagleJS
   * </caption>
   * $( 'selector', 'selector' );
   * $( 'selector', Node );
   * $( 'selector', Node[] );
   * $( 'selector', EagleJS );
   *
   * @param  {string|Node|Node[]} [selector]         A selector to match
   * @param  {string|Node|Node[]} [context=document] Node(s) to use as context
   */
  constructor (selector, context = document) {
    let elements = [];
    if (typeof selector === 'string') {
      const stringSelector = EagleJS.normalizeSelector(selector);
      if (/^(<).+(>)$/i.test(stringSelector)) {
        // Create HTML tag
        const doc = document.implementation.createHTMLDocument('');
        doc.body.innerHTML = stringSelector;
        elements = [...doc.body.children];
      } else {
        // Find
        return new EagleJS(context).find(stringSelector);
      }
    } else if (selector) {
      if (selector.length) { // Array or Array-Like Object
        elements = [...new Set(selector)]; // Remove duplicated items
      } else { // Others
        elements = [selector];
      }
    }
    elements = elements.filter((element) => {
      return EagleJS.isElement(element) || EagleJS.isDocument(element);
    });
    super(...elements);
  }

  /**
   * Adds one or more class names to elements of the collection.
   *
   * @example
   * $(element).addClass( 'classname' );
   * $(element).addClass( 'classname classname' );
   *
   * @param  {string} name One or more class names
   * @return {EagleJS} The current collection
   */
  addClass (name) {
    if (typeof name === 'string') {
      const classes = name.match(/\S+/g) || [];
      this.forEach((index, element) => {
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
   * <caption>after(content: string): EagleJS</caption>
   * $(element).after( 'htmlString' ); // Create HTML tag
   *
   * @example
   * <caption>after(content: Node): EagleJS</caption>
   * $(element).after( Node );
   *
   * @example
   * <caption>after(content: Node[]): EagleJS</caption>
   * $(element).after( Node[] );
   * $(element).after( EagleJS );
   *
   * @param  {string|Node|Node[]} content The content to insert
   * @return {EagleJS} The current collection
   */
  after (content) {
    return this.insertElement(content, 'after');
  }

  /**
   * Insert content or element to the end of each element in the collection.
   *
   * @example
   * <caption>append(content: string): EagleJS</caption>
   * $(element).append( 'htmlString' ); // Create HTML tag
   *
   * @example
   * <caption>append(content: Node): EagleJS</caption>
   * $(element).append( Node );
   *
   * @example
   * <caption>append(content: Node[]): EagleJS</caption>
   * $(element).append( Node[] );
   * $(element).append( EagleJS );
   *
   * @param  {string|Node|Node[]} content The content to insert
   * @return {EagleJS} The current collection
   */
  append (content) {
    return this.insertElement(content, 'append');
  }

  /**
   * Insert every element in the collection to the end of the target.
   *
   * @example
   * <caption>appendTo(content: string): EagleJS</caption>
   * $(element).appendTo( 'selector' );
   * $(element).appendTo( 'htmlString' ); // Create HTML tag and insert
   *
   * @example
   * <caption>appendTo(content: Node): EagleJS</caption>
   * $(element).appendTo( Node );
   *
   * @example
   * <caption>appendTo(content: Node[]): EagleJS</caption>
   * $(element).appendTo( Node[] );
   * $(element).appendTo( EagleJS );
   *
   * @param  {string|Node|Node[]} target The target to insert
   * @return {EagleJS} A new collection of clone and original node elements
   */
  appendTo (target) {
    return this.insertElementTo(target, 'append');
  }

  /**
   * Get or set attribute value for elements of the collection.
   *
   * @example
   * <caption>attr(name: string): string</caption>
   * // Returns attribute
   * $(element).attr( 'name' );
   *
   * @example
   * <caption>attr(name: string, value: any): EagleJS</caption>
   * // Sets attribute
   * $(element).attr( 'name', 'string' );
   * $(element).attr( 'name', 100 );
   *
   * @param  {string} name    The name of attribute
   * @param  {*}      [value] The value for attribute
   * @return {string|EagleJS} The current collection or value of
   * attribute
   */
  attr (name, value) {
    if (typeof name !== 'undefined') {
      if (typeof name === 'string') {
        // Set attribute
        if (typeof value !== 'undefined') {
          if (value === null) {
            return this.removeAttr(name);
          }
          this.forEach((index, element) => {
            if (EagleJS.isElement(element)) {
              element.setAttribute(name, String(value));
            }
          });
          return this;
        }
        // Get attribute
        const result = this.find((index, element) => {
          return EagleJS.isElement(element) && element.hasAttribute(name);
        });
        if (result) {
          return result.getAttribute(name);
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
   * <caption>before(content: string): EagleJS</caption>
   * $(element).before( 'htmlString' ); // Create HTML tag
   *
   * @example
   * <caption>before(content: Node): EagleJS</caption>
   * $(element).before( Node );
   *
   * @example
   * <caption>before(content: Node[]): EagleJS</caption>
   * $(element).before( Node[] );
   * $(element).before( EagleJS );
   *
   * @param  {string|Node|Node[]} content The content to insert
   * @return {EagleJS} The current collection
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
   * @param  {string|Node|Node[]|Function} [selector] A selector to filter
   * @return {EagleJS} A new collection
   */
  children (selector) {
    const $elements = new EagleJS();
    this.forEach((index, element) => {
      $elements.push(...element.childNodes);
    });
    if (typeof selector !== 'undefined') {
      return $elements.filter(selector);
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
   * @return {EagleJS} A new collection
   */
  clone (deep = true) {
    return this.map((index, element) => {
      if (EagleJS.isElement(element)) {
        return element.cloneNode(deep);
      }
    });
  }

  /**
   * Get the closest ancestor of elements matching with selector
   *
   * @example
   * $(element).closest( 'selector' );
   *
   * @param  {string} selector A selector to match
   * @return {EagleJS} A new collection
   */
  closest (selector) {
    if (typeof selector === 'string') {
      const stringSelector = EagleJS.normalizeSelector(selector);
      if (stringSelector !== '') {
        return this.map((index, element) => {
          if (EagleJS.isElement(element)) {
            return element.closest(stringSelector);
          }
        });
      }
    }
    return new EagleJS();
  }

  /**
   * Join two or more collections.
   *
   * @example
   * $(element).concat( Node[], Node[], Node[] );
   * $(element).concat( EagleJS, EagleJS, EagleJS );
   *
   * @param  {Node[]} elements Collections to join
   * @return {EagleJS} A new collection
   */
  concat (...elements) {
    return new EagleJS(super.concat(...elements));
  }

  /**
   * Executing a function for each element in the collection.
   *
   * @example
   * $(element).each(function (index, element) {
   *
   * });
   *
   * @param  {Function} callback The handler
   * @return {EagleJS} The current collection
   */
  each (callback) {
    return this.forEach(callback);
  }

  /**
   * Remove all child nodes of the set of matched elements from the DOM.
   *
   * @example
   * $(element).empty();
   *
   * @return {EagleJS} The current collection
   */
  empty () {
    return this.html('');
  }

  /**
   * Get the element at the position specified by index from the collection.
   *
   * @example
   * $(element).eq( 1 ); // Index from beginning
   * $(element).eq( -1 ); // Index from end
   *
   * @param  {number} index The position of element
   * @return {EagleJS} A new collection
   */
  eq (index) {
    return this.slice(index, index + 1);
  }

  /**
   * Check if all elements of the collection pass the given condition.
   *
   * @example
   * $(element).every(function (index, element) {
   *  return this.val == 0;
   * });
   *
   * @param  {Function} callback The handler
   * @return {boolean} True if all elements match the given condition,
   * otherwise false
   */
  every (callback) {
    return super.every((element, index) => {
      return callback.call(element, element, index);
    });
  }

  /**
   * Reduce the elements of the collection with the given filter.
   *
   * @example
   * <caption>filter(selector: string): EagleJS</caption>
   * $(element).filter( 'selector' );
   *
   * @example
   * <caption>filter(selector: Node): EagleJS</caption>
   * $(element).filter( Node );
   *
   * @example
   * <caption>filter(selector: Node[]): EagleJS</caption>
   * $(element).filter( Node[] );
   * $(element).filter( EagleJS );
   *
   * @example
   * <caption>filter(selector: Function): EagleJS</caption>
   * $(element).filter(function (index, element) {
   *  return this.val > 0;
   * });
   *
   * @param  {string|Node|Node[]|Function} selector A selector to filter
   * @return {EagleJS} A new collection
   */
  filter (selector) {
    if (typeof selector === 'string') {
      const stringSelector = EagleJS.normalizeSelector(selector);
      if (stringSelector !== '') {
        return this.filter((index, element) => {
          return EagleJS.isElement(element) && element.matches(stringSelector);
        });
      }
    } else if (typeof selector === 'function') {
      return super.filter((element, index) => {
        return selector.call(element, index, element);
      });
    } else if (typeof selector !== 'undefined') {
      const $selector = new EagleJS(selector);
      return this.filter((index, element) => {
        return $selector.includes(element);
      });
    }
    return new EagleJS();
  }

  /**
   * Returns the matched descendants of elements with the filter.<br>
   * Be aware: If the parameter is a function, the method acts as
   * "Array.prototype.find" function.
   *
   * @example
   * <caption>find(selector: string): EagleJS</caption>
   * $(element).find( 'selector' );
   *
   * @example
   * <caption>find(selector: Function): EagleJS</caption>
   * // See: Array.prototype.find()
   * $(element).find(function (index, element) {
   *  return this.val > 0;
   * });
   *
   * @param  {string|Function} selector A selector to filter
   * @return {EagleJS} A new collection
   */
  find (selector) {
    const $elements = new EagleJS();
    if (typeof selector === 'string') {
      const stringSelector = EagleJS.normalizeSelector(selector);
      if (stringSelector !== '') {
        this.forEach((index, element) => {
          $elements.push(...element.querySelectorAll(stringSelector));
        });
      }
    } else if (typeof selector === 'function') {
      return super.find((element, index) => {
        return selector.call(element, index, element);
      });
    }
    return $elements;
  }

  /**
   * Get the first element of the collection.
   *
   * @example
   * $(element).first();
   *
   * @return {EagleJS} A new collection
   */
  first () {
    return this.slice(0, 1);
  }

  /**
   * Executing a function for each element in the collection.
   *
   * @example
   * $(element).forEach(function (index, element) {
   *
   * });
   *
   * @param  {Function} callback The handler
   * @return {EagleJS} The current collection
   */
  forEach (callback) {
    super.forEach((element, index) => {
      callback.call(element, index, element);
    });
    return this;
  }

  /**
   * Alias to EagleJS.prototype.
   *
   * @example
   * <caption>Adds a new method (plugin) to the library</caption>
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
   * @param  {string} name The class name to search
   * @return {boolean} True if elements have the given class name, otherwise
   * false
   */
  hasClass (name) {
    if (typeof name === 'string') {
      return this.some((index, element) => {
        return EagleJS.isElement(element) && element.classList.contains(name);
      });
    }
    return false;
  }

  /**
   * Get or set the HTML contents of elements of the collection.
   *
   * @example
   * <caption>html(): string</caption>
   * $(element).html();
   *
   * @example
   * <caption>html(value: string): EagleJS</caption>
   * $(element).html( 'htmlString' ); // Create HTML tag
   *
   * @param  {string} [value] The html string to set
   * @return {string|EagleJS} The current collection or html string
   * of element
   */
  html (value) {
    if (typeof value !== 'undefined') {
      return this.forEach((index, element) => {
        element.innerHTML = value;
      });
    }
    return (this.length) ? this[0].innerHTML : undefined;
  }

  /**
   * Insert every element in the collection after the target.
   *
   * @example
   * <caption>insertAfter(content: string): EagleJS</caption>
   * $(element).insertAfter( 'selector' );
   * $(element).insertAfter( 'htmlString' ); // Create HTML tag and insert
   *
   * @example
   * <caption>insertAfter(content: Node): EagleJS</caption>
   * $(element).insertAfter( Node );
   *
   * @example
   * <caption>insertAfter(content: Node[]): EagleJS</caption>
   * $(element).insertAfter( Node[] );
   * $(element).insertAfter( EagleJS );
   *
   * @param  {string|Node|Node[]} target The target to insert
   * @return {EagleJS} A new collection of clone and original node elements
   */
  insertAfter (target) {
    return this.insertElementTo(target, 'after');
  }

  /**
   * Insert every element in the collection before the target.
   *
   * @example
   * <caption>insertBefore(content: string): EagleJS</caption>
   * $(element).insertBefore( 'selector' );
   * $(element).insertBefore( 'htmlString' ); // Create HTML tag and insert
   *
   * @example
   * <caption>insertBefore(content: Node): EagleJS</caption>
   * $(element).insertBefore( Node );
   *
   * @example
   * <caption>insertBefore(content: Node[]): EagleJS</caption>
   * $(element).insertBefore( Node[] );
   * $(element).insertBefore( EagleJS );
   *
   * @param  {string|Node|Node[]} target The target to insert
   * @return {EagleJS} A new collection of clone and original node elements
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
   * @param  {string|Node|Node[]} content               The content to insert
   * @param  {string}             insertMethod          The method to insert<br>
   * ("after": after, "append": end, "before": before, "prepend": beginning)
   * @param  {boolean}            [returnContent=false] If true, returns a new
   * collection of clone and original node elements
   * @return {EagleJS} If the returnContent parameter is true, it returns a new
   * collection of clone and original node elements. Otherwise the current
   * collection
   */
  insertElement (content, insertMethod, returnContent = false) {
    const $content = new EagleJS(content);
    const $elements = new EagleJS();
    this.forEach((index, element) => {
      if (EagleJS.isElement(element) &&
        (insertMethod === 'append' || EagleJS.isElement(element.parentNode))) {
        let $clone;
        if (index === this.length - 1) { // Original to last
          $clone = $content;
        } else {
          $clone = $content.clone();
        }
        if (returnContent) {
          $elements.push(...$clone);
        }
        if (insertMethod === 'after') {
          $clone.forEach((cloneIndex, clone) => {
            element.parentNode.insertBefore(clone, element.nextSibling);
          });
        } else if (insertMethod === 'append') {
          $clone.forEach((cloneIndex, clone) => {
            element.appendChild(clone);
          });
        } else if (insertMethod === 'before') {
          $clone.forEach((cloneIndex, clone) => {
            element.parentNode.insertBefore(clone, element);
          });
        } else if (insertMethod === 'prepend') {
          $clone.forEach((cloneIndex, clone) => {
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
   * @param  {string|Node|Node[]} target       The target to insert
   * @param  {string}             insertMethod The method to insert<br>
   * ("after": after, "append": end, "before": before, "prepend": beginning)
   * @return {EagleJS} A new collection of clone and original node elements
   */
  insertElementTo (target, insertMethod) {
    return new EagleJS(target).insertElement(this, insertMethod, true);
  }

  /**
   * Check any collection elements matches selector
   *
   * @example
   * <caption>is(selector: string): boolean</caption>
   * $(element).is( '.clasname' );
   *
   * @example
   * <caption>is(selector: Node): boolean</caption>
   * $(element).is( Node );
   *
   * @example
   * <caption>is(selector: Node[]): boolean</caption>
   * $(element).is( Node[] );
   * $(element).is( EagleJS );
   *
   * @example
   * <caption>is(selector: Function): boolean</caption>
   * $(element).is(function (index, element) {
   *  return this.val == 0;
   * });
   *
   * @param  {string|Node|Node[]|Function} selector A selector to filter
   * @return {boolean} True if any element matches the given filter, otherwise
   * false
   */
  is (selector) {
    if (typeof selector === 'string') {
      const stringSelector = EagleJS.normalizeSelector(selector);
      if (stringSelector !== '') {
        return this.some((index, element) => {
          return EagleJS.isElement(element) && element.matches(stringSelector);
        });
      }
    } else if (typeof selector === 'function') {
      return this.some(selector);
    } else if (typeof selector !== 'undefined') {
      const $selector = new EagleJS(selector);
      return this.some((index, element) => {
        return $selector.includes(element);
      });
    }
    return false;
  }

  /**
   * Check if the variable is a valid document node.
   *
   * @example
   * $.isDocument( document ); // true
   * $.isDocument( document.querySelector( 'selector' ) ); // false
   *
   * @param  {*} value The value to check
   * @return {boolean} True if variable is a valid document, otherwise false
   */
  static isDocument (value) {
    return Boolean(value && value.nodeType && value.nodeType === 9);
  }

  /**
   * Check if the variable is a valid element node.
   *
   * @example
   * $.isElement( document.querySelector( 'selector' ) ); // true
   * $.isElement( document ); // false
   *
   * @param  {*} value The value to check
   * @return {boolean} True if variable is a valid element, otherwise false
   */
  static isElement (value) {
    return Boolean(value && value.nodeType && value.nodeType === 1);
  }

  /**
   * Get the last element of the collection.
   *
   * @example
   * $(element).last();
   *
   * @return {EagleJS} A new collection
   */
  last () {
    return this.slice(-1);
  }

  /**
   * Generates a new collection with returned elements.
   *
   * @example
   * $(element).map(function (index, element) {
   *
   * });
   *
   * @param  {Function} callback The handler
   * @return {EagleJS} A new collection
   */
  map (callback) {
    return new EagleJS(super.map((element, index) => {
      return callback.call(element, index, element);
    }));
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
   * @param  {string}                      name       Name of property
   * @param  {string|Node|Node[]|Function} [selector] A selector to filter
   * @return {EagleJS} A new collection
   */
  mapProperty (name, selector) {
    const $elements = this.map((index, element) => {
      return element[name];
    });
    if (typeof selector !== 'undefined') {
      return $elements.filter(selector);
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
   * @param  {string}                      name       Name of property
   * @param  {string|Node|Node[]|Function} [selector] A selector to filter
   * @param  {string|Node|Node[]|Function} [until]    A selector to indicate
   * where to stop matching ancestor elements.
   * @return {EagleJS} A new collection
   */
  mapPropertyUntil (name, selector, until) {
    const $elements = new EagleJS();
    const flag = (typeof until !== 'undefined');
    this.forEach((index, element) => {
      let newElement = element;
      while ((newElement = newElement[name])) {
        if (flag && new EagleJS(newElement).is(until)) {
          break;
        }
        $elements.push(newElement);
      }
    });
    if (typeof selector !== 'undefined') {
      return $elements.filter(selector);
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
   * @param  {string|Node|Node[]|Function} [selector] A selector to filter
   * @return {EagleJS} A new collection
   */
  next (selector) {
    return this.mapProperty('nextElementSibling', selector);
  }

  /**
   * Get all following siblings of elements. Optionally filtered by the
   * selector.
   *
   * @example
   * $(element).nextAll();
   * $(element).nextAll( 'selector' ); // For more check filter() method
   *
   * @param  {string|Node|Node[]|Function} [selector] A selector to filter
   * @return {EagleJS} A new collection
   */
  nextAll (selector) {
    return this.mapPropertyUntil('nextElementSibling', selector);
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
   * @param  {string|Node|Node[]|Function} [selector] A selector to indicate
   * where to stop matching ancestor elements.
   * @param  {string|Node|Node[]|Function} [filter]   A selector to filter
   * @return {EagleJS} A new collection
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
   * @param  {*} selector CSS selector to normalize
   * @return {string} Normalized CSS selector
   */
  static normalizeSelector (selector) {
    let stringSelector = '';
    if (typeof selector === 'string') {
      // Trim whitespaces
      stringSelector = selector.trim();
      // Add ":scope" if begins with Child or Adjacent Sibling combinator
      if (/^[>+~]/.test(stringSelector)) {
        stringSelector = ':scope ' + stringSelector;
      }
    }
    return stringSelector;
  }

  /**
   * Remove matched elements from the collection.
   *
   * @example
   * <caption>not(selector: string): EagleJS</caption>
   * $(element).not( '.clasname' );
   *
   * @example
   * <caption>not(selector: Node): EagleJS</caption>
   * $(element).not( Node );
   *
   * @example
   * <caption>not(selector: Node[]): EagleJS</caption>
   * $(element).not( Node[] );
   * $(element).not( EagleJS );
   *
   * @example
   * <caption>not(selector: Function): EagleJS</caption>
   * $(element).not(function (index, element) {
   *  return this.val > 0;
   * });
   *
   * @param  {string|Node|Node[]|Function} selector A selector to filter
   * @return {EagleJS} A new collection
   */
  not (selector) {
    if (typeof selector === 'string') {
      const stringSelector = EagleJS.normalizeSelector(selector);
      if (stringSelector !== '') {
        return this.filter((index, element) => {
          return EagleJS.isElement(element) && !element.matches(stringSelector);
        });
      }
      return new EagleJS();
    } else if (typeof selector === 'function') {
      return super.filter((element, index) => {
        return !selector.call(element, index, element);
      });
    } else if (typeof selector !== 'undefined') {
      const $selector = new EagleJS(selector);
      return this.filter((index, element) => {
        return !$selector.includes(element);
      });
    }
    return this.slice(); // Copy
  }

  /**
   * Remove an event handler from elements of the collection.
   *
   * @example
   * $(element).off( 'click', handler );
   *
   * @param  {string}         events          One or more event names
   * @param  {Function}       handler         The handler funcion for event
   * @param  {boolean|Object} [options=false] Characteristics of event listener
   * @param  {boolean} [options.capture=false] A Boolean that indicates that
   * events of this type will be dispatched to the registered listener before
   * being dispatched to any EventTarget beneath it in the DOM tree
   * @return {EagleJS} The current collection
   */
  off (events, handler, options = false) {
    if (typeof events === 'string' && typeof handler === 'function') {
      const eventNames = events.match(/\S+/g) || [];
      this.forEach((index, element) => {
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
   * @param  {string}         events          One or more event names
   * @param  {Function}       handler         The handler funcion for event
   * @param  {boolean|Object} [options=false] Characteristics of event listener
   * @param  {boolean} [options.capture=false] A Boolean indicating that events
   * of this type will be dispatched to the registered listener before
   * being dispatched to any EventTarget beneath it in the DOM tree.
   * @param  {boolean} [options.once=false]    A Boolean indicating that
   * the listener should be invoked at most once after being added
   * @param  {boolean} [options.passive]       A Boolean which, if true,
   * indicates that the function specified by listener will never call
   * preventDefault()
   * @return {EagleJS} The current collection
   */
  on (events, handler, options = false) {
    if (typeof events === 'string' && typeof handler === 'function') {
      const eventNames = events.match(/\S+/g) || [];
      this.forEach((index, element) => {
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
   * @param  {string}   events  One or more event names
   * @param  {Function} handler The handler funcion for event
   * @return {EagleJS} The current collection
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
   * @param  {string|Node|Node[]|Function} [selector] A selector to filter
   * @return {EagleJS} A new collection
   */
  parent (selector) {
    return this.mapProperty('parentNode', selector);
  }

  /**
   * Get the ancestors of elements. Optionally filtered by the selector.
   *
   * @example
   * $(element).parents();
   * $(element).parents( 'selector' ); // For more check filter() method
   *
   * @param  {string|Node|Node[]|Function} [selector] A selector to filter
   * @return {EagleJS} A new collection
   */
  parents (selector) {
    return this.mapPropertyUntil('parentElement', selector);
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
   * @param  {string|Node|Node[]|Function} [selector] A selector to indicate
   * where to stop matching ancestor elements.
   * @param  {string|Node|Node[]|Function} [filter]   A selector to filter
   * @return {EagleJS} A new collection
   */
  parentsUntil (selector, filter) {
    return this.mapPropertyUntil('parentElement', filter, selector);
  }

  /**
   * Insert content or element to the beginning each element in the collection.
   *
   * @example
   * <caption>prepend(content: string): EagleJS</caption>
   * $(element).prepend( 'htmlString' ); // Create HTML tag
   *
   * @example
   * <caption>prepend(content: Node): EagleJS</caption>
   * $(element).prepend( Node );
   *
   * @example
   * <caption>prepend(content: Node[]): EagleJS</caption>
   * $(element).prepend( Node[] );
   * $(element).prepend( EagleJS );
   *
   * @param  {string|Node|Node[]} content The content to insert
   * @return {EagleJS} The current collection
   */
  prepend (content) {
    return this.insertElement(content, 'prepend');
  }

  /**
   * Insert every element in the collection to the beginning of the target.
   *
   * @example
   * <caption>prependTo(content: string): EagleJS</caption>
   * $(element).prependTo( 'selector' );
   * $(element).prependTo( 'htmlString' ); // Create HTML tag and insert
   *
   * @example
   * <caption>prependTo(content: Node): EagleJS</caption>
   * $(element).prependTo( Node );
   *
   * @example
   * <caption>prependTo(content: Node[]): EagleJS</caption>
   * $(element).prependTo( Node[] );
   * $(element).prependTo( EagleJS );
   *
   * @param  {string|Node|Node[]} target The target to insert
   * @return {EagleJS} A new collection
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
   * @param  {string|Node|Node[]|Function} [selector] A selector to filter
   * @return {EagleJS} A new collection
   */
  prev (selector) {
    return this.mapProperty('previousElementSibling', selector);
  }

  /**
   * Get all preceding siblings of elements. Optionally filtered by the
   * selector.
   *
   * @example
   * $(element).prevAll();
   * $(element).prevAll( 'selector' ); // For more check filter() method
   *
   * @param  {string|Node|Node[]|Function} [selector] A selector to filter
   * @return {EagleJS} A new collection
   */
  prevAll (selector) {
    return this.mapPropertyUntil('previousElementSibling', selector);
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
   * @param  {string|Node|Node[]|Function} [selector] A selector to indicate
   * where to stop matching ancestor elements.
   * @param  {string|Node|Node[]|Function} [filter]   A selector to filter
   * @return {EagleJS} A new collection
   */
  prevUntil (selector, filter) {
    return this.mapPropertyUntil('previousElementSibling', filter, selector);
  }

  /**
   * Adds new elements to the end of the collection.
   *
   * @example
   * $(element).push( Node, Node, Node );
   *
   * // Spread and push
   * $(element).push( ...Node[] );
   *
   * @param  {Node} elements The elements to add
   * @return {EagleJS} The current collection
   */
  push (...elements) {
    super.push(...elements.filter((element) => {
      return (EagleJS.isElement(element) || EagleJS.isDocument(element)) &&
        !this.includes(element);
    }));
    return this;
  }

  /**
   * Specify a function to execute when the DOM is fully loaded.
   *
   * @example
   * $(document).ready(function () {
   *
   * });
   *
   * @param  {Function} handler The handler funcion for event
   * @return {EagleJS} The current collection
   */
  ready (handler) {
    if (this.is(document)) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handler);
      } else {
        handler();
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
   * @return {EagleJS} The current collection
   */
  remove () {
    this.forEach((index, element) => {
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
   * @param  {string} name One or more attribute names
   * @return {EagleJS} The current collection
   */
  removeAttr (name) {
    if (typeof name === 'string') {
      const attributes = name.match(/\S+/g) || [];
      this.forEach((index, element) => {
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
   * @param  {string} name One or more class names
   * @return {EagleJS} The current collection
   */
  removeClass (name) {
    if (typeof name === 'string') {
      const classes = name.match(/\S+/g) || [];
      this.forEach((index, element) => {
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
   * @param  {string|Node|Node[]|Function} [selector] A selector to filter
   * @return {EagleJS} A new collection
   */
  siblings (selector) {
    const $elements = new EagleJS();
    this.forEach((index, element) => {
      const $element = new EagleJS(element);
      $elements.push(...$element.parent().children(selector).not($element));
    });
    return $elements;
  }

  /**
   * Check if any element of the collection passes the given condition.
   *
   * @example
   * $(element).some(function (index, element) {
   *   return this.val == 0;
   * });
   *
   * @param  {Function} callback The handler
   * @return {boolean} True if any element matches the given condition,
   * otherwise false
   */
  some (callback) {
    return super.some((element, index) => {
      return callback.call(element, index, element);
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
   * @param  {*} [value] The text to set
   * @return {string|EagleJS} The current collection or text of element
   */
  text (value) {
    if (typeof value !== 'undefined') {
      this.forEach((index, element) => {
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
   * @param  {string}  name    One or more class names
   * @param  {boolean} [force] A boolean value to determine whether the class
   * should be added or removed
   * @return {EagleJS} The current collection
   */
  toggleClass (name, force) {
    if (typeof name === 'string') {
      const classes = name.match(/\S+/g) || [];
      this.forEach((index, element) => {
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
   * @param  {string} type   One or more event names
   * @param  {Array}  [data] Additional data to pass along to the event handler
   * @return {EagleJS} The current collection
   */
  trigger (type, data) {
    if (typeof type === 'string') {
      const event = new CustomEvent(type, {
        bubbles: true,
        cancelable: true,
        detail: data
      });
      this.forEach((index, element) => {
        element.dispatchEvent(event);
      });
    }
    return this;
  }

  /**
   * Adds new elements to the beginning of the collection.
   *
   * @example
   * $(element).unshift( Node, Node, Node );
   *
   * // Spread and unshift
   * $(element).unshift( ...Node[] );
   *
   * @param  {Node} elements The elements to add
   * @return {EagleJS} The current collection
   */
  unshift (...elements) {
    super.unshift(...elements.filter((element) => {
      return (EagleJS.isElement(element) || EagleJS.isDocument(element)) &&
        !this.includes(element);
    }));
    return this;
  }
}

/**
 * Proxy for EagleJS Class to use without a "new" keyword.
 *
 * @example
 * <caption>Usage (Classic Style)</caption>
 * window.$ = EagleJSProxy;
 *
 * @example
 * <caption>Usage (Ecmascript 6 Module - Default Import)</caption>
 * import $ from "eaglejs.module.js";
 *
 * @example
 * <caption>Usage (Ecmascript 6 Module - Custom Import)</caption>
 * import {EagleJSProxy as $} from "eaglejs.module.js";
 *
 * @type {EagleJS}
 */
const EagleJSProxy = new Proxy(EagleJS, {
  apply: (Target, thisArg, argumentsList) => {
    return new Target(...argumentsList);
  }
});

// Define $
if (typeof $ === 'undefined') {
  window.$ = EagleJSProxy;
}
