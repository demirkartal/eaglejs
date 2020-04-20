/* eslint semi: "error" */
/* global document, Element, Node, CustomEvent, window */
/* element-qsa-scope v1.1.0 */
try {
  // test for scope support
  document.querySelector(':socpe *');
} catch (error) {
  (function (ElementPrototype) {
    // scope regex
    var scope = /:scope(?![\w-])/gi;

    // polyfill Element#querySelector
    var querySelectorWithScope = polyfill(ElementPrototype.querySelector);
    ElementPrototype.querySelector = function querySelector (selectors) {
      return querySelectorWithScope.apply(this, arguments);
    };

    // polyfill Element#querySelectorAll
    var querySelectorAllWithScope = polyfill(ElementPrototype.querySelectorAll);
    ElementPrototype.querySelectorAll = function querySelectorAll (selectors) {
      return querySelectorAllWithScope.apply(this, arguments);
    };

    // polyfill Element#matches
    if (ElementPrototype.matches) {
      var matchesWithScope = polyfill(ElementPrototype.matches);
      ElementPrototype.matches = function matches (selectors) {
        return matchesWithScope.apply(this, arguments);
      };
    }

    // polyfill Element#closest
    if (ElementPrototype.closest) {
      var closestWithScope = polyfill(ElementPrototype.closest);
      ElementPrototype.closest = function closest (selectors) {
        return closestWithScope.apply(this, arguments);
      };
    }

    function polyfill (qsa) {
      return function (selectors) {
        // whether the selectors contain :scope
        var hasScope = selectors && scope.test(selectors);

        if (hasScope) {
          // fallback attribute
          var attr = 'q' + Math.floor(Math.random() * 9000000) + 1000000;

          // replace :scope with the fallback attribute
          arguments[0] = selectors.replace(scope, '[' + attr + ']');

          // add the fallback attribute
          this.setAttribute(attr, '');

          // results of the qsa
          var elementOrNodeList = qsa.apply(this, arguments);

          // remove the fallback attribute
          this.removeAttribute(attr);

          // return the results of the qsa
          return elementOrNodeList;
        } else {
          // return the results of the qsa
          return qsa.apply(this, arguments);
        }
      };
    }
  })(Element.prototype);
}

/**
 * EagleJS v0.2.0 (https://github.com/EagleFramework/EagleJS)
 * Copyright 2020 Cem Demirkartal
 * Licensed under the MIT License
 *
 * @extends   Array
 */
class EagleJS extends Array {
  /**
   * Return a collection of matched elements or created elements by HTML string
   *
   * @example <b>$ ( string selector ) : EagleJS</b>
   * <br>variable = $( 'selector' );
   * <br>variable = $( 'htmlString' ); // Create HTML tag
   *
   * @example <b>$ ( Node selector ) : EagleJS</b><br>
   * variable = $( Node );
   *
   * @example <b>$ ( Node[] selector ) : EagleJS</b><br>
   * variable = $( Node[] );
   *
   * @example <b>$ ( string selector , mixed content ) : EagleJS</b>
   * <br>variable = $( 'selector', 'selector' );
   * <br>variable = $( 'selector', Node );
   * <br>variable = $( 'selector', Node[] );
   * <br>variable = $( 'selector', EagleJS );
   *
   * @syntax public constructor ( mixed selector [, mixed selector = document ])
   * @param  {string|Node|Node[]} selector           The selector to match
   * @param  {string|Node|Node[]} [context=document] Node(s) to use as context
   */
  constructor (selector, context = document) {
    let elements = [];
    if (typeof selector === 'string') {
      if (/^(<).+(>)$/i.test(selector)) {
        // Create HTML tag
        const doc = document.implementation.createHTMLDocument('');
        doc.body.innerHTML = selector;
        elements = [doc.body.children[0]];
      } else {
        // Find
        return new EagleJS(context).find(selector);
      }
    } else if (selector) {
      if (selector.length) {
        elements = [...new Set(selector)];
      } else {
        elements = [selector];
      }
    }
    elements = elements.filter((element) => {
      return EagleJS.isNode(element);
    });
    super(...elements);
  }

  /**
   * Adds one or more class names to elements of the collection
   *
   * @example <b>addClass ( string name ) : EagleJS</b>
   * <br>$(element).addClass( 'classname' );
   * <br>$(element).addClass( 'classname classname' );
   *
   * @syntax public addClass ( string name ) : EagleJS
   * @param  {string} name One or more class names
   * @return {EagleJS} The current collection
   */
  addClass (name) {
    if (typeof name === 'string') {
      const classes = name.match(/\S+/g) || [];
      this.forEach((index, element) => {
        element.classList.add(...classes);
      });
    }
    return this;
  }

  /**
   * Insert content or element after each element in the collection
   *
   * @example <b>after ( string content ) : EagleJS</b><br>
   * $(element).after( 'htmlString' );
   *
   * @example <b>after ( Node content ) : EagleJS</b><br>
   * $(element).after( Node );
   *
   * @example <b>after ( Node[] content ) : EagleJS</b>
   * <br>$(element).after( Node[] );
   * <br>$(element).after( EagleJS );
   *
   * @syntax public after ( mixed content ) : EagleJS
   * @param  {string|Node|Node[]} content The content to insert
   * @return {EagleJS} The current collection
   */
  after (content) {
    const $content = new EagleJS(content);
    return this.forEach((index, element) => {
      if (element.parentNode) {
        let $clone;
        if (index === this.length - index) {
          $clone = $content;
        } else {
          $clone = $content.clone();
        }
        $clone.forEach((cloneIndex, clone) => {
          element.parentNode.insertBefore(clone, element.nextSibling);
        });
      }
    });
  }

  /**
   * Insert content or element to the end of each element in the collection
   *
   * @example <b>append ( string content ) : EagleJS</b><br>
   * $(element).append( 'htmlString' );
   *
   * @example <b>append ( Node content ) : EagleJS</b><br>
   * $(element).append( Node );
   *
   * @example <b>append ( Node[] content ) : EagleJS</b>
   * <br>$(element).append( Node[] );
   * <br>$(element).append( EagleJS );
   *
   * @syntax public append ( mixed content ) : EagleJS
   * @param  {string|Node|Node[]} content The content to insert
   * @return {EagleJS} The current collection
   */
  append (content) {
    const $content = new EagleJS(content);
    return this.forEach((index, element) => {
      let $clone;
      if (index === this.length - index) {
        $clone = $content;
      } else {
        $clone = $content.clone();
      }
      $clone.forEach((cloneIndex, clone) => {
        return element.appendChild(clone);
      });
    });
  }

  /**
   * Get or set attribute value for elements of the collection
   *
   * @example <b>attr ( string name ) : string</b><br>
   * $(element).attr( 'name' );
   *
   * @example <b>attr ( string name, mixed value ) : EagleJS</b>
   * <br>$(element).attr( 'name', 'string' );
   * <br>$(element).attr( 'name', 100 );
   *
   * @syntax public attr ( string name [, mixed value ] ) : string|EagleJS
   * @param  {string}        name    The name of attribute
   * @param  {string|number} [value] The value for attribute
   * @return {string|EagleJS} The current collection or value of attribute
   */
  attr (name, value) {
    if (typeof name !== 'undefined') {
      if (typeof name === 'string') {
        if (typeof value !== 'undefined') {
          if (value === null) {
            return this.removeAttr(name);
          }
          return this.forEach((index, element) => {
            element.setAttribute(name, value);
          });
        }
        const result = this.find((index, element) => {
          return element.hasAttribute(name);
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
   * Insert content or element before each element in the collection
   *
   * @example <b>before ( string content ) : EagleJS</b><br>
   * $(element).before( 'htmlString' );
   *
   * @example <b>before ( Node content ) : EagleJS</b><br>
   * $(element).before( Node );
   *
   * @example <b>before ( Node[] content ) : EagleJS</b>
   * <br>$(element).before( Node[] );
   * <br>$(element).before( EagleJS );
   *
   * @syntax public before ( mixed content ) : EagleJS
   * @param  {string|Node|Node[]} content The content to insert
   * @return {EagleJS} The current collection
   */
  before (content) {
    const $content = new EagleJS(content);
    return this.forEach((index, element) => {
      if (element.parentNode) {
        let $clone;
        if (index === this.length - index) {
          $clone = $content;
        } else {
          $clone = $content.clone();
        }
        $clone.forEach((cloneIndex, clone) => {
          element.parentNode.insertBefore(clone, element);
        });
      }
    });
  }

  /**
   * Get the children of elements with an optional filter
   *
   * @example <b>children ( [ string selector = "*" } ) : EagleJS</b>
   * <br>$(element).children( );
   * <br>$(element).children( 'selector' );
   *
   * @syntax public children ( [ string selector = "*" ] ) : EagleJS
   * @param  {string} [selector="*"] The selector to filter
   * @return {EagleJS} A new collection
   */
  children (selector = '*') {
    const $elements = new EagleJS();
    this.forEach((index, element) => {
      $elements.push(...element.childNodes);
    });
    return $elements.filter(selector);
  }

  /**
   * Create a deep copy of each element in the collection
   *
   * @example <b>clone ( void ) : EagleJS</b><br>
   * $(element).clone( );
   *
   * @syntax public clone ( void ) : EagleJS
   * @return {EagleJS} A new collection
   */
  clone () {
    return this.map((index, element) => {
      return element.cloneNode(true);
    });
  }

  /**
   * Get the closest ancestor of elements with an optional filter
   *
   * @example <b>closest ( string selector ) : EagleJS</b><br>
   * $(element).closest( 'selector' );
   *
   * @syntax public closest ( string selector ) : EagleJS
   * @param  {string} selector The selector to filter
   * @return {EagleJS} A new collection
   */
  closest (selector) {
    if (typeof selector === 'string') {
      if (selector.trim() !== '') {
        return this.map((index, element) => {
          return element.closest(selector);
        });
      }
    }
    return new EagleJS();
  }

  /**
   * Join two or more collections
   *
   * @example <b>concat ( Node[] elements... ) : EagleJS</b>
   * <br>$(element).concat( Node[] );
   * <br>$(element).concat( EagleJS );
   *
   * @syntax public concat ( Node[] elements... ) : EagleJS
   * @param  {...Node[]} elements Collections to join
   * @return {EagleJS} A new collection
   */
  concat (...elements) {
    return new EagleJS(super.concat(...elements));
  }

  /**
   * Executing a function for each element in the collection
   *
   * @example <b>each ( function callback ) : EagleJS</b><br>
   * $(element).each(function ( index, element ) {
   *
   * });
   *
   * @syntax public each ( function callback ) : EagleJS
   * @param  {function} callback The handler
   * @return {EagleJS} The current collection
   */
  each (callback) {
    return this.forEach(callback);
  }

  /**
   * Remove all child nodes of the set of matched elements from the DOM
   *
   * @example <b>empty ( void ) : EagleJS</b><br>
   * $(element).empty( );
   *
   * @syntax public empty ( void ) : EagleJS
   * @return {EagleJS} The current collection
   */
  empty () {
    return this.html('');
  }

  /**
   * Get the element at the position specified by index from the collection
   *
   * @example <b>eq ( number index ) : EagleJS</b>
   * <br>$(element).eq( 1 ); // Index from begining
   * <br>$(element).eq( -1 ); // Index from end
   *
   * @syntax public eq ( number index ) : EagleJS
   * @param  {number} index The position of element
   * @return {EagleJS} A new collection
   */
  eq (index) {
    return this.slice(index, index + 1);
  }

  /**
   * Check if all elements of the collection pass the given condition
   *
   * @example <b>every ( function callback ) : boolean</b><br>
   * $(element).every(function ( index, element ) {
   *  return this.val == 0;
   * });
   *
   * @syntax public every ( function callback ) : boolean
   * @param  {function} callback The handler
   * @return {boolean} True if all elements match the given condition,
   * otherwise false
   */
  every (callback) {
    return super.every((element, index) => {
      return callback.call(element, element, index);
    });
  }

  /**
   * Reduce the elements of the collection with the given filter
   *
   * @example <b>filter ( string selector ) : EagleJS</b><br>
   * $(element).filter( '.classname' );
   *
   * @example <b>filter ( function selector ) : EagleJS</b><br>
   * $(element).filter(function ( index, element ) {
   *  return this.val > 0;
   * });
   *
   * @syntax public filter ( mixed selector ) : EagleJS
   * @param  {string|function} selector The selector to filter
   * @return {EagleJS} A new collection
   */
  filter (selector) {
    if (typeof selector === 'string') {
      if (selector.trim() !== '') {
        // If * given only, then return a copy
        if (selector === '*') {
          return new EagleJS(this);
        }
        // Filter document to not create any errors
        return this.not(document).filter((index, element) => {
          return element.matches(selector);
        });
      }
    } else if (typeof selector === 'function') {
      return super.filter((element, index) => {
        return selector.call(element, index, element);
      });
    }
    return new EagleJS();
  }

  /**
   * Returns the matched descendants of elements with the filter
   *
   * @example <b>find ( string selector ) : EagleJS</b><br>
   * $(element).find( '.classname' );
   *
   * @example <b>find ( function selector ) : EagleJS</b><br>
   * $(element).find(function ( index, element ) {
   *  return this.val > 0;
   * });
   *
   * @syntax public find ( mixed selector ) : EagleJS
   * @param  {string|function} selector The selector to filter
   * @return {EagleJS} A new collection
   */
  find (selector) {
    const $elements = new EagleJS();
    if (typeof selector === 'string') {
      if (selector.trim() !== '') {
        // Child and Adjacent Sibling combinator hack
        if (/^\s*[>+~]/.test(selector)) {
          return this.find(':scope ' + selector);
        }
        this.forEach((index, element) => {
          $elements.push(...element.querySelectorAll(selector));
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
   * Get the first element of the collection
   *
   * @example <b>first ( void ) : EagleJS</b><br>
   * $(element).first( );
   *
   * @syntax public first ( void ) : EagleJS
   * @return {EagleJS} A new collection
   */
  first () {
    return this.slice(0, 1);
  }

  /**
   * Executing a function for each element in the collection
   *
   * @example <b>forEach ( function callback ) : EagleJS</b><br>
   * $(element).forEach(function ( index, element ) {
   *
   * });
   *
   * @syntax public forEach ( function callback ) : EagleJS
   * @param  {function} callback The handler
   * @return {EagleJS} The current collection
   */
  forEach (callback) {
    super.forEach((element, index) => {
      callback.call(element, index, element);
    });
    return this;
  }

  /**
   * Returns prototype
   *
   * @syntax public static get fn ( void ) : EagleJS.prototype
   * @return {EagleJS.prototype} The prototype of object
   */
  static get fn () {
    return this.prototype;
  }

  /**
   * Check if any collection element has the specified class name
   *
   * @example <b>hasClass ( string name ) : boolean</b><br>
   * $(element).hasClass( 'classname' );
   *
   * @syntax public hasClass ( string name ) : boolean
   * @param  {string} name The class name to search
   * @return {boolean} True if elements have the given class name, otherwise
   * false
   */
  hasClass (name) {
    if (typeof name === 'string') {
      return this.some((index, element) => {
        return element.classList.contains(name);
      });
    }
    return false;
  }

  /**
   * Get or set the HTML contents of elements of the collection
   *
   * @example <b>html ( void ) : string|undefined</b><br>
   * $(element).html( );
   *
   * @example <b>html ( string value ) : EagleJS</b><br>
   * $(element).html( 'htmlString' );
   *
   * @syntax public html ( [ string value ] ) : string|undefined|EagleJS
   * @param  {string} [value] The html string to set
   * @return {string|undefined|EagleJS} The current collection or html string
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
   * Check any collection elements matches selector
   *
   * @example <b>is ( string selector ) : boolean</b><br>
   * $(element).is( '.clasname' );
   *
   * @example <b>is ( Node selector ) : boolean</b><br>
   * $(element).is( Node );
   *
   * @example <b>is ( Node[] selector ) : boolean</b>
   * <br>$(element).is( Node[] );
   * <br>$(element).is( EagleJS );
   *
   * @example <b>is ( function selector ) : boolean</b><br>
   * $(element).is(function ( index, element ) {
   *  return this.val == 0;
   * });
   *
   * @syntax public is ( mixed selector ) : boolean
   * @param  {string|Node|Node[]|function} selector The selector to filter
   * @return {boolean} True if any element matches the given filter, otherwise
   * false
   */
  is (selector) {
    if (typeof selector === 'string') {
      if (selector.trim() !== '') {
        return this.some((index, element) => {
          return element.matches(selector);
        });
      }
    } else if (typeof selector === 'function') {
      return this.some(selector);
    } else {
      const $selector = new EagleJS(selector);
      return this.some((index, element) => {
        return $selector.includes(element);
      });
    }
    return false;
  }

  /**
   * Check if the variable is a valid node element
   *
   * @example <b>isNode ( mixed value ) : boolean</b><br>
   * $(element).isNode( Node );
   *
   * @syntax public static isNode ( mixed value ) : boolean
   * @param  {*} value The value to check
   * @return {boolean} True if variable is a valid element, otherwise false
   */
  static isNode (value) {
    return value &&
      value.nodeType &&
      (value.nodeType === Node.ELEMENT_NODE ||
        value.nodeType === Node.DOCUMENT_NODE);
  }

  /**
   * Get the last element of the collection
   *
   * @example <b>last ( void ) : EagleJS</b><br>
   * $(element).last( );
   *
   * @syntax public last ( void ) : EagleJS
   * @return {EagleJS} A new collection
   */
  last () {
    return this.slice(-1);
  }

  /**
   * Generates a new collection with returned elements
   *
   * @example <b>map ( function callback ) : EagleJS</b><br>
   * $(element).map(function ( index, element ) {
   *
   * });
   *
   * @syntax public map ( function callback ) : EagleJS
   * @param  {function} callback The handler
   * @return {EagleJS} A new collection
   */
  map (callback) {
    return new EagleJS(super.map((element, index) => {
      return callback.call(element, index, element);
    }));
  }

  /**
   * Get the next sibling of elements with an optional filter
   *
   * @example <b>next ( [ string selector = "*" } ) : EagleJS</b>
   * <br>$(element).next( );
   * <br>$(element).next( 'selector' );
   *
   * @syntax public next ( [ string selector = "*" ] ) : EagleJS
   * @param  {string} [selector="*"] The selector to filter
   * @return {EagleJS} A new collection
   */
  next (selector = '*') {
    return this.map((index, element) => {
      return element.nextElementSibling;
    }).filter(selector);
  }

  /**
   * Get all following siblings of elements with an optional filter
   *
   * @example <b>nextAll ( [ string selector = "*" } ) : EagleJS</b>
   * <br>$(element).nextAll( );
   * <br>$(element).nextAll( 'selector' );
   *
   * @syntax public nextAll ( [ string selector = "*" ] ) : EagleJS
   * @param  {string} [selector="*"] The selector to filter
   * @return {EagleJS} A new collection
   */
  nextAll (selector = '*') {
    const $elements = new EagleJS();
    this.forEach((index, element) => {
      let next = new EagleJS(element).next();
      while (next.length === 1) {
        $elements.push(...next);
        next = next.next();
      }
    });
    return $elements.filter(selector);
  }

  /**
   * Remove matched elements from the collection
   *
   * @example <b>not ( string selector ) : EagleJS</b><br>
   * $(element).not( '.clasname' );
   *
   * @example <b>not ( Node selector ) : EagleJS</b><br>
   * $(element).not( Node );
   *
   * @example <b>not ( Node[] selector ) : EagleJS</b>
   * <br>$(element).not( Node[] );
   * <br>$(element).not( EagleJS );
   *
   * @example <b>not ( function selector ) : EagleJS</b><br>
   * $(element).not(function ( index, element ) {
   *  return this.val > 0;
   * });
   *
   * @syntax public not ( mixed selector ) : EagleJS
   * @param  {string|Node|Node[]|function} selector The selector to filter
   * @return {EagleJS} A new collection
   */
  not (selector) {
    if (typeof selector === 'string') {
      if (selector.trim() !== '') {
        return this.filter((index, element) => {
          return !element.matches(selector);
        });
      }
    } else if (typeof selector === 'function') {
      return this.filter(selector);
    } else {
      const $selector = new EagleJS(selector);
      return this.filter((index, element) => {
        return !$selector.includes(element);
      });
    }
    return this.filter('*'); // Copy
  }

  /**
   * Remove an event handler from elements of the collection
   *
   * @example <b>off ( string events , function handler ) : EagleJS</b><br>
   * $(element).off( 'click', handler );
   *
   * @syntax public off ( string events , function handler ) : EagleJS
   * @param  {string}   events  One or more event names
   * @param  {function} handler The current handler of event
   * @return {EagleJS} The current collection
   */
  off (events, handler) {
    if (typeof events === 'string' && typeof handler === 'function') {
      const eventNames = events.match(/\S+/g) || [];
      this.forEach((index, element) => {
        eventNames.forEach((event) => {
          element.removeEventListener(event, handler);
        });
      });
    }
    return this;
  }

  /**
   * Attach an event handler to elements of the collection
   *
   * @example <b>on ( string events , function handler ) : EagleJS</b><br>
   * $(element).on( 'hover', function() {
   *   console.log( $( this ).text() );
   * });
   *
   * @syntax public on ( string events , function handler ) : EagleJS
   * @param  {string}   events  One or more event names
   * @param  {function} handler The handler funcion for event
   * @return {EagleJS} The current collection
   */
  on (events, handler) {
    if (typeof events === 'string' && typeof handler === 'function') {
      const eventNames = events.match(/\S+/g) || [];
      this.forEach((index, element) => {
        eventNames.forEach((event) => {
          element.addEventListener(event, handler, false);
        });
      });
    }
    return this;
  }

  /**
   * Get the parent of elements with an optional filter
   *
   * @example <b>parent ( [ string selector = "*" } ) : EagleJS</b>
   * <br>$(element).parent( );
   * <br>$(element).parent( 'selector' );
   *
   * @syntax public parent ( [ string selector = "*" ] ) : EagleJS
   * @param  {string} [selector="*"] The selector to filter
   * @return {EagleJS} A new collection
   */
  parent (selector = '*') {
    return this.map((index, element) => {
      return element.parentNode;
    }).filter(selector);
  }

  /**
   * Get the ancestors of elements with an optional filter
   *
   * @example <b>parents ( [ string selector = "*" } ) : EagleJS</b>
   * <br>$(element).parents( );
   * <br>$(element).parents( 'selector' );
   *
   * @syntax public parents ( [ string selector = "*" ] ) : EagleJS
   * @param  {string} [selector="*"] The selector to filter
   * @return {EagleJS} A new collection
   */
  parents (selector = '*') {
    const $elements = new EagleJS();
    this.forEach((index, element) => {
      let $parent = new EagleJS(element).parent();
      while ($parent.length === 1) {
        $elements.push(...$parent);
        $parent = $parent.parent();
      }
    });
    return $elements.not(document).filter(selector); // No document
  }

  /**
   * Insert content or element to the beginning each element in the collection
   *
   * @example <b>prepend ( string content ) : EagleJS</b><br>
   * $(element).prepend( 'htmlString' );
   *
   * @example <b>prepend ( Node content ) : EagleJS</b><br>$
   * (element).prepend( Node );
   *
   * @example <b>prepend ( Node[] content ) : EagleJS</b>
   * <br>$(element).prepend( Node[] );
   * <br>$(element).prepend( EagleJS );
   *
   * @syntax public prepend ( mixed content ) : EagleJS
   * @param  {string|Node|Node[]} content The content to insert
   * @return {EagleJS} The current collection
   */
  prepend (content) {
    const $content = new EagleJS(content);
    return this.forEach((index, element) => {
      let $clone;
      if (index === this.length - index) {
        $clone = $content;
      } else {
        $clone = $content.clone();
      }
      $clone.forEach((cloneIndex, clone) => {
        element.insertBefore(clone, element.firstChild);
      });
    });
  }

  /**
   * Get the previous sibling of elements with an optional filter
   *
   * @example <b>prev ( [ string selector = "*" } ) : EagleJS</b>
   * <br>$(element).prev( );
   * <br>$(element).prev( 'selector' );
   *
   * @syntax public prev ( [ string selector = "*" ] ) : EagleJS
   * @param  {string} [selector="*"] The selector to filter
   * @return {EagleJS} A new collection
   */
  prev (selector = '*') {
    return this.map((index, element) => {
      return element.previousElementSibling;
    }).filter(selector);
  }

  /**
   * Get all preceding siblings of elements with an optional filter
   *
   * @example <b>prevAll ( [ string selector = "*" } ) : EagleJS</b>
   * <br>$(element).prevAll( );
   * <br>$(element).prevAll( 'selector' );
   *
   * @syntax public prevAll ( [ string selector = "*" ] ) : EagleJS
   * @param  {string} [selector="*"] The selector to filter
   * @return {EagleJS} A new collection
   */
  prevAll (selector = '*') {
    const $elements = new EagleJS();
    this.forEach((index, element) => {
      let $prev = new EagleJS(element).prev();
      while ($prev.length === 1) {
        $elements.push(...$prev);
        $prev = $prev.prev();
      }
    });
    return $elements.filter(selector);
  }

  /**
   * Adds new elements to the end of the collection
   *
   * @example <b>push ( Node elements... ) : EagleJS</b><br>
   * $(element).push( Node, Node, Node... );
   *
   * @syntax public push ( Node elements... ) : EagleJS
   * @param  {...Node} elements The elements to add
   * @return {EagleJS} The current collection
   */
  push (...elements) {
    let $elements = new EagleJS(elements);
    $elements = $elements.filter((index, element) => {
      return !this.includes(element);
    });
    super.push(...$elements);
    return this;
  }

  /**
   * Specify a function to execute when the DOM is fully loaded
   *
   * @example <b>ready ( function handler ) : EagleJS</b><br>
   * $(element).ready(function ( ) {
   *
   * });
   *
   * @syntax public ready ( function handler ) : EagleJS
   * @param  {function} handler The handler funcion for event
   * @return {EagleJS} The current collection
   */
  ready (handler) {
    return this.on('DOMContentLoaded', handler);
  }

  /**
   * Remove collection elements from the DOM
   *
   * @example <b>remove ( void ) : EagleJS</b><br>
   * $(element).remove( );
   *
   * @syntax public remove ( void ) : EagleJS
   * @return {EagleJS} The current collection
   */
  remove () {
    return this.forEach((index, element) => {
      element.remove();
    });
  }

  /**
   * Removes one or more attributes from elements of the collection
   *
   * @example <b>removeAttr ( string name ) : EagleJS</b><br>
   * $(element).removeAttr( 'attributeName' );
   *
   * @syntax public removeAttr ( string name ) : EagleJS
   * @param  {string} name One or more attribute names
   * @return {EagleJS} The current collection
   */
  removeAttr (name) {
    if (typeof name === 'string') {
      const attributes = name.match(/\S+/g) || [];
      return this.forEach((index, element) => {
        attributes.forEach((attrVal) => {
          element.removeAttribute(attrVal);
        });
      });
    }
    return this;
  }

  /**
   * Removes one or more classes from elements of the collection
   *
   * @example <b>removeClass ( string name ) : EagleJS</b>
   * <br>$(element).removeClass( 'classname' );
   * <br>$(element).removeClass( 'classname classname' );
   *
   * @syntax public removeClass ( string name ) : EagleJS
   * @param  {string} name One or more class names
   * @return {EagleJS} The current collection
   */
  removeClass (name) {
    if (typeof name === 'string') {
      const classes = name.match(/\S+/g) || [];
      this.forEach((index, element) => {
        element.classList.remove(...classes);
      });
    }
    return this;
  }

  /**
   * Get the siblings of elements with an optional filter
   *
   * @example <b>siblings ( [ string selector = "*" } ) : EagleJS</b>
   * <br>$(element).siblings( );
   * <br>$(element).siblings( 'selector' );
   *
   * @syntax public siblings ( [ string selector = "*" ] ) : EagleJS
   * @param  {string} [selector="*"] The selector to filter
   * @return {EagleJS} A new collection
   */
  siblings (selector = '*') {
    const $elements = new EagleJS();
    this.forEach((index, element) => {
      const $element = new EagleJS(element);
      $elements.push(...$element.parent().children(selector).not($element));
    });
    return $elements;
  }

  /**
   * Check if any element of the collection passes the given condition
   *
   * @example <b>some ( function callback ) : boolean</b><br>
   * $(element).some(function ( index, element ) {
   *  return this.val == 0;
   * });
   *
   * @syntax public some ( function callback ) : boolean
   * @param  {function} callback The handler
   * @return {boolean} True if any element matches the given condition,
   * otherwise false
   */
  some (callback) {
    return super.some((element, index) => {
      return callback.call(element, index, element);
    });
  }

  /**
   * Get or set the text contents of elements of the collection
   *
   * @example <b>text ( void ) : string</b><br>
   * $(element).text( );
   *
   * @example <b>text ( mixed value ) : EagleJS</b>
   * <br>$(element).text( 'string' );
   * <br>$(element).text( 100 );
   * <br>$(element).text( true );
   *
   * @syntax public text ( [ mixed value ] ) : string|EagleJS
   * @param  {string|number|boolean} [value] The text to set
   * @return {string|EagleJS} The current collection or text of element
   */
  text (value) {
    if (typeof value !== 'undefined') {
      return this.forEach((index, element) => {
        element.textContent = value;
      });
    }
    return (this.length) ? this[0].textContent : undefined;
  }

  /**
   * Toggle one or more class names for elements of the collection
   *
   * @example <b>toggleClass ( string name [, boolean force ] ) : EagleJS</b>
   * <br>$(element).toggleClass( 'classname' );
   * <br>$(element).toggleClass( 'classname classname' );
   * <br>$(element).toggleClass( 'classname', true );
   * <br>$(element).toggleClass( 'classname', false );
   * <br>$(element).toggleClass( 'classname classname', true );
   * <br>$(element).toggleClass( 'classname classname', false );
   *
   * @syntax public toggleClass ( string name [, boolean force ] ) : EagleJS
   * @param  {string}  name    One or more class names
   * @param  {boolean} [force] A boolean value to determine whether the class
   * should be added or removed
   * @return {EagleJS} The current collection
   */
  toggleClass (name, force) {
    if (typeof name === 'string') {
      const classes = name.match(/\S+/g) || [];
      this.forEach((index, element) => {
        classes.forEach((classVal) => {
          element.classList.toggle(classVal, force);
        });
      });
    }
    return this;
  }

  /**
   * Trigger the specified event on elements of the collection
   *
   * @example <b>trigger ( string type [, array data ] ) : EagleJS</b>
   * <br>$(element).trigger( 'click' );
   * <br>$(element).trigger( 'click', data );
   *
   * @syntax public trigger ( string type [, array data ] ) : EagleJS
   * @param  {string} type   One or more event names
   * @param  {array}  [data] Additional data to pass along to the event handler
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
   * Adds new elements to the beginning of the collection
   *
   * @example <b>unshift ( Node elements... ) : EagleJS</b><br>
   * $(element).unshift( Node, Node, Node... );
   *
   * @syntax public unshift ( Node elements... ) : EagleJS
   * @param  {...Node} elements The elements to add
   * @return {EagleJS} The current collection
   */
  unshift (...elements) {
    let $elements = new EagleJS(elements);
    $elements = $elements.filter((index, element) => {
      return !this.includes(element);
    });
    super.unshift(...$elements);
    return this;
  }
}

/**
 * Proxy for EagleJS Class to use without a "new" keyword.
 * Return a collection of matched elements or created elements by HTML string
 *
 * @example <b>$ ( string selector ) : EagleJS</b>
 * <br>variable = $( 'selector' );
 * <br>variable = $( 'htmlString' ); // Create HTML tag
 *
 * @example <b>$ ( Node selector ) : EagleJS</b><br>
 * variable = $( Node );
 *
 * @example <b>$ ( Node[] selector ) : EagleJS</b><br>
 * variable = $( Node[] );
 *
 * @example <b>$ ( string selector , mixed content ) : EagleJS</b>
 * <br>variable = $( 'selector', 'selector' );
 * <br>variable = $( 'selector', Node );
 * <br>variable = $( 'selector', Node[] );
 * <br>variable = $( 'selector', EagleJS );
 *
 * @syntax EagleJSProxy ( mixed selector [, mixed selector = document ])
 * @param  {string|Node|Node[]} selector           The selector to match
 * @param  {string|Node|Node[]} [context=document] Node(s) to use as context
 * @type   {EagleJS}
 */
const EagleJSProxy = new Proxy(EagleJS, {
  apply: (Target, thisArg, argumentsList) => {
    return new Target(...argumentsList);
  }
});

if (typeof $ === 'undefined') {
  window.$ = EagleJSProxy;
}
