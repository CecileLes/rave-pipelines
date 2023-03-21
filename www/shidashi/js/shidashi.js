var RAVEPipeline;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/clipboard/dist/clipboard.js":
/*!**************************************************!*\
  !*** ./node_modules/clipboard/dist/clipboard.js ***!
  \**************************************************/
/***/ (function(module) {

/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 686:
/***/ (function(__unused_webpack_module, __webpack_exports__, __nested_webpack_require_623__) {

"use strict";

// EXPORTS
__nested_webpack_require_623__.d(__webpack_exports__, {
  "default": function() { return /* binding */ clipboard; }
});

// EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
var tiny_emitter = __nested_webpack_require_623__(279);
var tiny_emitter_default = /*#__PURE__*/__nested_webpack_require_623__.n(tiny_emitter);
// EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js
var listen = __nested_webpack_require_623__(370);
var listen_default = /*#__PURE__*/__nested_webpack_require_623__.n(listen);
// EXTERNAL MODULE: ./node_modules/select/src/select.js
var src_select = __nested_webpack_require_623__(817);
var select_default = /*#__PURE__*/__nested_webpack_require_623__.n(src_select);
;// CONCATENATED MODULE: ./src/common/command.js
/**
 * Executes a given operation type.
 * @param {String} type
 * @return {Boolean}
 */
function command(type) {
  try {
    return document.execCommand(type);
  } catch (err) {
    return false;
  }
}
;// CONCATENATED MODULE: ./src/actions/cut.js


/**
 * Cut action wrapper.
 * @param {String|HTMLElement} target
 * @return {String}
 */

var ClipboardActionCut = function ClipboardActionCut(target) {
  var selectedText = select_default()(target);
  command('cut');
  return selectedText;
};

/* harmony default export */ var actions_cut = (ClipboardActionCut);
;// CONCATENATED MODULE: ./src/common/create-fake-element.js
/**
 * Creates a fake textarea element with a value.
 * @param {String} value
 * @return {HTMLElement}
 */
function createFakeElement(value) {
  var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  var fakeElement = document.createElement('textarea'); // Prevent zooming on iOS

  fakeElement.style.fontSize = '12pt'; // Reset box model

  fakeElement.style.border = '0';
  fakeElement.style.padding = '0';
  fakeElement.style.margin = '0'; // Move element out of screen horizontally

  fakeElement.style.position = 'absolute';
  fakeElement.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

  var yPosition = window.pageYOffset || document.documentElement.scrollTop;
  fakeElement.style.top = "".concat(yPosition, "px");
  fakeElement.setAttribute('readonly', '');
  fakeElement.value = value;
  return fakeElement;
}
;// CONCATENATED MODULE: ./src/actions/copy.js



/**
 * Create fake copy action wrapper using a fake element.
 * @param {String} target
 * @param {Object} options
 * @return {String}
 */

var fakeCopyAction = function fakeCopyAction(value, options) {
  var fakeElement = createFakeElement(value);
  options.container.appendChild(fakeElement);
  var selectedText = select_default()(fakeElement);
  command('copy');
  fakeElement.remove();
  return selectedText;
};
/**
 * Copy action wrapper.
 * @param {String|HTMLElement} target
 * @param {Object} options
 * @return {String}
 */


var ClipboardActionCopy = function ClipboardActionCopy(target) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    container: document.body
  };
  var selectedText = '';

  if (typeof target === 'string') {
    selectedText = fakeCopyAction(target, options);
  } else if (target instanceof HTMLInputElement && !['text', 'search', 'url', 'tel', 'password'].includes(target === null || target === void 0 ? void 0 : target.type)) {
    // If input type doesn't support `setSelectionRange`. Simulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    selectedText = fakeCopyAction(target.value, options);
  } else {
    selectedText = select_default()(target);
    command('copy');
  }

  return selectedText;
};

/* harmony default export */ var actions_copy = (ClipboardActionCopy);
;// CONCATENATED MODULE: ./src/actions/default.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



/**
 * Inner function which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 * @param {Object} options
 */

var ClipboardActionDefault = function ClipboardActionDefault() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // Defines base properties passed from constructor.
  var _options$action = options.action,
      action = _options$action === void 0 ? 'copy' : _options$action,
      container = options.container,
      target = options.target,
      text = options.text; // Sets the `action` to be performed which can be either 'copy' or 'cut'.

  if (action !== 'copy' && action !== 'cut') {
    throw new Error('Invalid "action" value, use either "copy" or "cut"');
  } // Sets the `target` property using an element that will be have its content copied.


  if (target !== undefined) {
    if (target && _typeof(target) === 'object' && target.nodeType === 1) {
      if (action === 'copy' && target.hasAttribute('disabled')) {
        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
      }

      if (action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
      }
    } else {
      throw new Error('Invalid "target" value, use a valid Element');
    }
  } // Define selection strategy based on `text` property.


  if (text) {
    return actions_copy(text, {
      container: container
    });
  } // Defines which selection strategy based on `target` property.


  if (target) {
    return action === 'cut' ? actions_cut(target) : actions_copy(target, {
      container: container
    });
  }
};

/* harmony default export */ var actions_default = (ClipboardActionDefault);
;// CONCATENATED MODULE: ./src/clipboard.js
function clipboard_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { clipboard_typeof = function _typeof(obj) { return typeof obj; }; } else { clipboard_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return clipboard_typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */

function getAttributeValue(suffix, element) {
  var attribute = "data-clipboard-".concat(suffix);

  if (!element.hasAttribute(attribute)) {
    return;
  }

  return element.getAttribute(attribute);
}
/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */


var Clipboard = /*#__PURE__*/function (_Emitter) {
  _inherits(Clipboard, _Emitter);

  var _super = _createSuper(Clipboard);

  /**
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
   * @param {Object} options
   */
  function Clipboard(trigger, options) {
    var _this;

    _classCallCheck(this, Clipboard);

    _this = _super.call(this);

    _this.resolveOptions(options);

    _this.listenClick(trigger);

    return _this;
  }
  /**
   * Defines if attributes would be resolved using internal setter functions
   * or custom functions that were passed in the constructor.
   * @param {Object} options
   */


  _createClass(Clipboard, [{
    key: "resolveOptions",
    value: function resolveOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
      this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
      this.text = typeof options.text === 'function' ? options.text : this.defaultText;
      this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
    }
    /**
     * Adds a click event listener to the passed trigger.
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     */

  }, {
    key: "listenClick",
    value: function listenClick(trigger) {
      var _this2 = this;

      this.listener = listen_default()(trigger, 'click', function (e) {
        return _this2.onClick(e);
      });
    }
    /**
     * Defines a new `ClipboardAction` on each click event.
     * @param {Event} e
     */

  }, {
    key: "onClick",
    value: function onClick(e) {
      var trigger = e.delegateTarget || e.currentTarget;
      var action = this.action(trigger) || 'copy';
      var text = actions_default({
        action: action,
        container: this.container,
        target: this.target(trigger),
        text: this.text(trigger)
      }); // Fires an event based on the copy operation result.

      this.emit(text ? 'success' : 'error', {
        action: action,
        text: text,
        trigger: trigger,
        clearSelection: function clearSelection() {
          if (trigger) {
            trigger.focus();
          }

          window.getSelection().removeAllRanges();
        }
      });
    }
    /**
     * Default `action` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultAction",
    value: function defaultAction(trigger) {
      return getAttributeValue('action', trigger);
    }
    /**
     * Default `target` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultTarget",
    value: function defaultTarget(trigger) {
      var selector = getAttributeValue('target', trigger);

      if (selector) {
        return document.querySelector(selector);
      }
    }
    /**
     * Allow fire programmatically a copy action
     * @param {String|HTMLElement} target
     * @param {Object} options
     * @returns Text copied.
     */

  }, {
    key: "defaultText",

    /**
     * Default `text` lookup function.
     * @param {Element} trigger
     */
    value: function defaultText(trigger) {
      return getAttributeValue('text', trigger);
    }
    /**
     * Destroy lifecycle.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.listener.destroy();
    }
  }], [{
    key: "copy",
    value: function copy(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        container: document.body
      };
      return actions_copy(target, options);
    }
    /**
     * Allow fire programmatically a cut action
     * @param {String|HTMLElement} target
     * @returns Text cutted.
     */

  }, {
    key: "cut",
    value: function cut(target) {
      return actions_cut(target);
    }
    /**
     * Returns the support of the given action, or all actions if no action is
     * given.
     * @param {String} [action]
     */

  }, {
    key: "isSupported",
    value: function isSupported() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
      var actions = typeof action === 'string' ? [action] : action;
      var support = !!document.queryCommandSupported;
      actions.forEach(function (action) {
        support = support && !!document.queryCommandSupported(action);
      });
      return support;
    }
  }]);

  return Clipboard;
}((tiny_emitter_default()));

/* harmony default export */ var clipboard = (Clipboard);

/***/ }),

/***/ 828:
/***/ (function(module) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),

/***/ 438:
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_15749__) {

var closest = __nested_webpack_require_15749__(828);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),

/***/ 879:
/***/ (function(__unused_webpack_module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),

/***/ 370:
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_19113__) {

var is = __nested_webpack_require_19113__(879);
var delegate = __nested_webpack_require_19113__(438);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),

/***/ 817:
/***/ (function(module) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),

/***/ 279:
/***/ (function(module) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;
module.exports.TinyEmitter = E;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_24495__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_24495__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nested_webpack_require_24495__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__nested_webpack_require_24495__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_24495__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_24495__.o(definition, key) && !__nested_webpack_require_24495__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_24495__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_24495__(686);
/******/ })()
.default;
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/OverlayScrollbars.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/OverlayScrollbars.css ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB3aWR0aD0iMTAiICAgaGVpZ2h0PSIxMCIgICB2ZXJzaW9uPSIxLjEiPiAgPGcgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwNDIuMzYyMikiICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eTowLjQ5NDExNzY1O2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDcuNDI0MjE4NywxMDQyLjM2MjIgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjYgLTEuMzEwMTU2MiwxLjMxMDIgMCwwLjI5OSAwLjEwNDM0MTksMC41NzEgMC4yNzI5NDkyLDAuNzkxNSAwLjIwOTEwMjQsMC4xNDEzIDAuNDY1NjIwNiwwLjIxODQgMC43MzY5NjI5LDAuMjE4NCAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NiAxLjMxMDE1NjMsLTEuMzEwMiAwLC0wLjI3MTMgLTAuMDc3MDkzLC0wLjUyNzggLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0MSwtMC4xNjg2IC0wLjQ5MjU0NDMsLTAuMjcyOSAtMC43OTE1NTI4LC0wLjI3MjkgeiBtIDAsMy4wODQzIGMgLTAuNzIzNTc5MiwwIC0xLjMxMDE1NjIsMC41ODY2IC0xLjMxMDE1NjIsMS4zMTAyIDAsMC4yOTkgMC4xMDQzNDE5LDAuNTcxIDAuMjcyOTQ5MiwwLjc5MTUgMC4yMDkxMDI0LDAuMTQxMyAwLjQ2NTYyMDYsMC4yMTg0IDAuNzM2OTYyOSwwLjIxODQgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjYgMS4zMTAxNTYzLC0xLjMxMDIgMCwtMC4yNzEzIC0wLjA3NzA5MywtMC41Mjc4IC0wLjIxODM1OTQsLTAuNzM2OSAtMC4yMjA0OTQxLC0wLjE2ODYgLTAuNDkyNTQ0MywtMC4yNzMgLTAuNzkxNTUyOCwtMC4yNzMgeiBtIC0zLjA4NDMyNjEsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NiAtMS4zMTAxNTYzLDEuMzEwMiAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MSAwLjI3Mjk0OTIsMC43OTE1IDAuMjA5MTAyNCwwLjE0MTMgMC40NjU2MjA3LDAuMjE4NCAwLjczNjk2MjksMC4yMTg0IDAuNzIzNTc5MywwIDEuMzEwMTU2MywtMC41ODY2IDEuMzEwMTU2MywtMS4zMTAyIDAsLTAuMjcxMyAtMC4wNzcwOTMsLTAuNTI3OCAtMC4yMTgzNTk0LC0wLjczNjkgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzMgLTAuNzkxNTUyNywtMC4yNzMgeiBtIC0zLjAyOTczNjQsMy4wMjk4IEMgMC41ODY1NzY5MywxMDQ4LjQ3NjMgMCwxMDQ5LjA2MjggMCwxMDQ5Ljc4NjQgYyAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyMiwwLjc5MTYgMC4yMDkxMDIyOSwwLjE0MTIgMC40NjU2MjA2NSwwLjIxODMgMC43MzY5NjI4OCwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHogbSAzLjAyOTczNjQsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NSAtMS4zMTAxNTYzLDEuMzEwMSAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyLDAuNzkxNiAwLjIwOTEwMjQsMC4xNDEyIDAuNDY1NjIwNywwLjIxODMgMC43MzY5NjI5LDAuMjE4MyAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NSAxLjMxMDE1NjMsLTEuMzEwMSAwLC0wLjI3MTQgLTAuMDc3MDkzLC0wLjUyNzkgLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzI5IC0wLjc5MTU1MjcsLTAuMjcyOSB6IG0gMy4wODQzMjYxLDAgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjUgLTEuMzEwMTU2MiwxLjMxMDEgMCwwLjI5OSAwLjEwNDM0MTksMC41NzExIDAuMjcyOTQ5MiwwLjc5MTYgMC4yMDkxMDI0LDAuMTQxMiAwLjQ2NTYyMDYsMC4yMTgzIDAuNzM2OTYyOSwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHoiLz4gIDwvZz4gIDxnICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDguMjE1NzcxNSwwLjI3Mjk0OTIyIGMgMC4xNDEyNjY3LDAuMjA5MTAyMjkgMC4yMTgzNTk0LDAuNDY1NjIwNjUgMC4yMTgzNTk0LDAuNzM2OTYyODggMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDc2IC0wLjIwNTUxNzYsLTAuNzk3Nzk2NTkgLTAuNTE4NjAzNSwtMS4wMzcyMDY5OCB6IG0gMCwzLjA4NDMyNjE4IGMgMC4xNDEyNjY3LDAuMjA5MTAyMyAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MiAtMS4zMTAxNTYzLDEuMzEwMTU2MiAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTkzIDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAtMy4wODQzMjYyLDAgYyAwLjE0MTI2NjcsMC4yMDkxMDIzIDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYyIC0xLjMxMDE1NjMsMS4zMTAxNTYyIC0wLjI3MTM0MjIsMCAtMC41Mjc4NjA1LC0wLjA3NzA5MyAtMC43MzY5NjI5LC0wLjIxODM1OTMgMC4yMzk0MTA0LDAuMzEzMDg1OSAwLjYxMjYzNjMsMC41MTg2MDM1IDEuMDM3MjA3MSwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYyLC0wLjU4NjU3NyAxLjMxMDE1NjIsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NSwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogTSAyLjEwMTcwOSw2LjM4NzAxMTcgYyAwLjE0MTI2NjcsMC4yMDkxMDI0IDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYzIC0xLjMxMDE1NjMsMS4zMTAxNTYzIC0wLjI3MTM0MjIzLDAgLTAuNTI3ODYwNTksLTAuMDc3MDkzIC0wLjczNjk2Mjg4LC0wLjIxODM1OTQgMC4yMzk0MTAzOSwwLjMxMzA4NTkgMC42MTI2MzYyMiwwLjUxODYwMzUgMS4wMzcyMDY5OCwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAzLjAyOTczNjMsMCBjIDAuMTQxMjY2NywwLjIwOTEwMjQgMC4yMTgzNTk0LDAuNDY1NjIwNiAwLjIxODM1OTQsMC43MzY5NjI5IDAsMC43MjM1NzkzIC0wLjU4NjU3NywxLjMxMDE1NjMgLTEuMzEwMTU2MywxLjMxMDE1NjMgLTAuMjcxMzQyMiwwIC0wLjUyNzg2MDUsLTAuMDc3MDkzIC0wLjczNjk2MjksLTAuMjE4MzU5NCAwLjIzOTQxMDQsMC4zMTMwODU5IDAuNjEyNjM2MywwLjUxODYwMzUgMS4wMzcyMDcxLDAuNTE4NjAzNSAwLjcyMzU3OTMsMCAxLjMxMDE1NjIsLTAuNTg2NTc3IDEuMzEwMTU2MiwtMS4zMTAxNTYzIDAsLTAuNDI0NTcwOCAtMC4yMDU1MTc1LC0wLjc5Nzc5NjYgLTAuNTE4NjAzNSwtMS4wMzcyMDcgeiBtIDMuMDg0MzI2MiwwIGMgMC4xNDEyNjY3LDAuMjA5MTAyNCAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHoiIC8+ICA8L2c+PC9zdmc+ */ "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB3aWR0aD0iMTAiICAgaGVpZ2h0PSIxMCIgICB2ZXJzaW9uPSIxLjEiPiAgPGcgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwNDIuMzYyMikiICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eTowLjQ5NDExNzY1O2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDcuNDI0MjE4NywxMDQyLjM2MjIgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjYgLTEuMzEwMTU2MiwxLjMxMDIgMCwwLjI5OSAwLjEwNDM0MTksMC41NzEgMC4yNzI5NDkyLDAuNzkxNSAwLjIwOTEwMjQsMC4xNDEzIDAuNDY1NjIwNiwwLjIxODQgMC43MzY5NjI5LDAuMjE4NCAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NiAxLjMxMDE1NjMsLTEuMzEwMiAwLC0wLjI3MTMgLTAuMDc3MDkzLC0wLjUyNzggLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0MSwtMC4xNjg2IC0wLjQ5MjU0NDMsLTAuMjcyOSAtMC43OTE1NTI4LC0wLjI3MjkgeiBtIDAsMy4wODQzIGMgLTAuNzIzNTc5MiwwIC0xLjMxMDE1NjIsMC41ODY2IC0xLjMxMDE1NjIsMS4zMTAyIDAsMC4yOTkgMC4xMDQzNDE5LDAuNTcxIDAuMjcyOTQ5MiwwLjc5MTUgMC4yMDkxMDI0LDAuMTQxMyAwLjQ2NTYyMDYsMC4yMTg0IDAuNzM2OTYyOSwwLjIxODQgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjYgMS4zMTAxNTYzLC0xLjMxMDIgMCwtMC4yNzEzIC0wLjA3NzA5MywtMC41Mjc4IC0wLjIxODM1OTQsLTAuNzM2OSAtMC4yMjA0OTQxLC0wLjE2ODYgLTAuNDkyNTQ0MywtMC4yNzMgLTAuNzkxNTUyOCwtMC4yNzMgeiBtIC0zLjA4NDMyNjEsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NiAtMS4zMTAxNTYzLDEuMzEwMiAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MSAwLjI3Mjk0OTIsMC43OTE1IDAuMjA5MTAyNCwwLjE0MTMgMC40NjU2MjA3LDAuMjE4NCAwLjczNjk2MjksMC4yMTg0IDAuNzIzNTc5MywwIDEuMzEwMTU2MywtMC41ODY2IDEuMzEwMTU2MywtMS4zMTAyIDAsLTAuMjcxMyAtMC4wNzcwOTMsLTAuNTI3OCAtMC4yMTgzNTk0LC0wLjczNjkgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzMgLTAuNzkxNTUyNywtMC4yNzMgeiBtIC0zLjAyOTczNjQsMy4wMjk4IEMgMC41ODY1NzY5MywxMDQ4LjQ3NjMgMCwxMDQ5LjA2MjggMCwxMDQ5Ljc4NjQgYyAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyMiwwLjc5MTYgMC4yMDkxMDIyOSwwLjE0MTIgMC40NjU2MjA2NSwwLjIxODMgMC43MzY5NjI4OCwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHogbSAzLjAyOTczNjQsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NSAtMS4zMTAxNTYzLDEuMzEwMSAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyLDAuNzkxNiAwLjIwOTEwMjQsMC4xNDEyIDAuNDY1NjIwNywwLjIxODMgMC43MzY5NjI5LDAuMjE4MyAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NSAxLjMxMDE1NjMsLTEuMzEwMSAwLC0wLjI3MTQgLTAuMDc3MDkzLC0wLjUyNzkgLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzI5IC0wLjc5MTU1MjcsLTAuMjcyOSB6IG0gMy4wODQzMjYxLDAgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjUgLTEuMzEwMTU2MiwxLjMxMDEgMCwwLjI5OSAwLjEwNDM0MTksMC41NzExIDAuMjcyOTQ5MiwwLjc5MTYgMC4yMDkxMDI0LDAuMTQxMiAwLjQ2NTYyMDYsMC4yMTgzIDAuNzM2OTYyOSwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHoiLz4gIDwvZz4gIDxnICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDguMjE1NzcxNSwwLjI3Mjk0OTIyIGMgMC4xNDEyNjY3LDAuMjA5MTAyMjkgMC4yMTgzNTk0LDAuNDY1NjIwNjUgMC4yMTgzNTk0LDAuNzM2OTYyODggMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDc2IC0wLjIwNTUxNzYsLTAuNzk3Nzk2NTkgLTAuNTE4NjAzNSwtMS4wMzcyMDY5OCB6IG0gMCwzLjA4NDMyNjE4IGMgMC4xNDEyNjY3LDAuMjA5MTAyMyAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MiAtMS4zMTAxNTYzLDEuMzEwMTU2MiAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTkzIDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAtMy4wODQzMjYyLDAgYyAwLjE0MTI2NjcsMC4yMDkxMDIzIDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYyIC0xLjMxMDE1NjMsMS4zMTAxNTYyIC0wLjI3MTM0MjIsMCAtMC41Mjc4NjA1LC0wLjA3NzA5MyAtMC43MzY5NjI5LC0wLjIxODM1OTMgMC4yMzk0MTA0LDAuMzEzMDg1OSAwLjYxMjYzNjMsMC41MTg2MDM1IDEuMDM3MjA3MSwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYyLC0wLjU4NjU3NyAxLjMxMDE1NjIsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NSwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogTSAyLjEwMTcwOSw2LjM4NzAxMTcgYyAwLjE0MTI2NjcsMC4yMDkxMDI0IDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYzIC0xLjMxMDE1NjMsMS4zMTAxNTYzIC0wLjI3MTM0MjIzLDAgLTAuNTI3ODYwNTksLTAuMDc3MDkzIC0wLjczNjk2Mjg4LC0wLjIxODM1OTQgMC4yMzk0MTAzOSwwLjMxMzA4NTkgMC42MTI2MzYyMiwwLjUxODYwMzUgMS4wMzcyMDY5OCwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAzLjAyOTczNjMsMCBjIDAuMTQxMjY2NywwLjIwOTEwMjQgMC4yMTgzNTk0LDAuNDY1NjIwNiAwLjIxODM1OTQsMC43MzY5NjI5IDAsMC43MjM1NzkzIC0wLjU4NjU3NywxLjMxMDE1NjMgLTEuMzEwMTU2MywxLjMxMDE1NjMgLTAuMjcxMzQyMiwwIC0wLjUyNzg2MDUsLTAuMDc3MDkzIC0wLjczNjk2MjksLTAuMjE4MzU5NCAwLjIzOTQxMDQsMC4zMTMwODU5IDAuNjEyNjM2MywwLjUxODYwMzUgMS4wMzcyMDcxLDAuNTE4NjAzNSAwLjcyMzU3OTMsMCAxLjMxMDE1NjIsLTAuNTg2NTc3IDEuMzEwMTU2MiwtMS4zMTAxNTYzIDAsLTAuNDI0NTcwOCAtMC4yMDU1MTc1LC0wLjc5Nzc5NjYgLTAuNTE4NjAzNSwtMS4wMzcyMDcgeiBtIDMuMDg0MzI2MiwwIGMgMC4xNDEyNjY3LDAuMjA5MTAyNCAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHoiIC8+ICA8L2c+PC9zdmc+"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*!\r\n * OverlayScrollbars\r\n * https://github.com/KingSora/OverlayScrollbars\r\n *\r\n * Version: 1.13.0\r\n *\r\n * Copyright KingSora | Rene Haas.\r\n * https://github.com/KingSora\r\n *\r\n * Released under the MIT license.\r\n * Date: 02.08.2020\r\n */\r\n\r\n/*\r\nOVERLAY SCROLLBARS CORE:\r\n*/\r\n\r\nhtml.os-html,\r\nhtml.os-html > .os-host {\r\n    display: block;\r\n    overflow: hidden;\r\n    box-sizing: border-box;\r\n    height: 100% !important;\r\n    width: 100% !important;\r\n    min-width: 100% !important;\r\n    min-height: 100% !important;\r\n    margin: 0 !important;\r\n    position: absolute !important; /* could be position: fixed; but it causes issues on iOS (-webkit-overflow-scrolling: touch) */\r\n}\r\nhtml.os-html > .os-host > .os-padding {\r\n    position: absolute; /* could be position: fixed; but it causes issues on iOS (-webkit-overflow-scrolling: touch) */\r\n}\r\nbody.os-dragging,\r\nbody.os-dragging * {\r\n    cursor: default;\r\n}\r\n.os-host,\r\n.os-host-textarea {\r\n    position: relative;\r\n    overflow: visible !important;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    -ms-flex-wrap: nowrap;\r\n        flex-wrap: nowrap;\r\n    -webkit-box-pack: start;\r\n        -ms-flex-pack: start;\r\n            justify-content: flex-start;\r\n    -ms-flex-line-pack: start;\r\n        align-content: flex-start;\r\n    -webkit-box-align: start;\r\n        -ms-flex-align: start;\r\n                -ms-grid-row-align: flex-start;\r\n            align-items: flex-start;\r\n}\r\n.os-host-flexbox {\r\n    overflow: hidden !important;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n}\r\n.os-host-flexbox > .os-size-auto-observer {\r\n    height: inherit !important;\r\n}\r\n.os-host-flexbox > .os-content-glue {\r\n    -webkit-box-flex: 1;\r\n        -ms-flex-positive: 1;\r\n            flex-grow: 1;\r\n    -ms-flex-negative: 0;\r\n        flex-shrink: 0;\r\n}\r\n.os-host-flexbox > .os-size-auto-observer,\r\n.os-host-flexbox > .os-content-glue {\r\n    min-height: 0;\r\n    min-width: 0;\r\n    -webkit-box-flex: 0;\r\n        -ms-flex-positive: 0;\r\n            flex-grow: 0;\r\n    -ms-flex-negative: 1;\r\n        flex-shrink: 1;\r\n    -ms-flex-preferred-size: auto;\r\n        flex-basis: auto;\r\n}\r\n#os-dummy-scrollbar-size {\r\n    position: fixed;\r\n    opacity: 0;\r\n    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';\r\n    visibility: hidden;\r\n    overflow: scroll;\r\n    height: 500px;\r\n    width: 500px;\r\n}\r\n#os-dummy-scrollbar-size > div {\r\n    width: 200%;\r\n    height: 200%;\r\n    margin: 10px 0;\r\n}\r\n/* fix restricted measuring */\r\n#os-dummy-scrollbar-size:before,\r\n#os-dummy-scrollbar-size:after,\r\n.os-content:before,\r\n.os-content:after {\r\n    content: '';\r\n    display: table;\r\n    width: 0.01px;\r\n    height: 0.01px;\r\n    line-height: 0;\r\n    font-size: 0;\r\n    flex-grow: 0;\r\n    flex-shrink: 0;\r\n    visibility: hidden;\r\n}\r\n#os-dummy-scrollbar-size,\r\n.os-viewport {\r\n    -ms-overflow-style: scrollbar !important;\r\n}\r\n.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size,\r\n.os-viewport-native-scrollbars-invisible.os-viewport {\r\n    scrollbar-width: none !important;\r\n}\r\n.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar,\r\n.os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar,\r\n.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar-corner,\r\n.os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar-corner {\r\n    display: none !important;\r\n    width: 0px !important;\r\n    height: 0px !important;\r\n    visibility: hidden !important;\r\n    background: transparent !important;\r\n}\r\n.os-content-glue {\r\n    box-sizing: inherit;\r\n    max-height: 100%;\r\n    max-width: 100%;\r\n    width: 100%;\r\n    pointer-events: none;\r\n}\r\n.os-padding {\r\n    box-sizing: inherit;\r\n    direction: inherit;\r\n    position: absolute;\r\n    overflow: visible;\r\n    padding: 0;\r\n    margin: 0;\r\n    left: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n    right: 0;\r\n    width: auto !important;\r\n    height: auto !important;\r\n\tz-index: 0;\r\n}\r\n.os-host-overflow > .os-padding {\r\n    overflow: hidden;\r\n}\r\n.os-viewport {\r\n    direction: inherit !important;\r\n    box-sizing: inherit !important;\r\n    resize: none !important;\r\n    outline: none !important;\r\n    position: absolute;\r\n    overflow: hidden;\r\n    top: 0;\r\n    left: 0;\r\n    bottom: 0;\r\n    right: 0;\r\n    padding: 0;\r\n    margin: 0;\r\n    -webkit-overflow-scrolling: touch;\r\n}\r\n.os-content-arrange {\r\n    position: absolute;\r\n    z-index: -1;\r\n    min-height: 1px;\r\n    min-width: 1px;\r\n    pointer-events: none;\r\n}\r\n.os-content {\r\n    direction: inherit;\r\n    box-sizing: border-box !important;\r\n    position: relative;\r\n    display: block;\r\n    height: 100%;\r\n    width: 100%;\r\n    height: 100%;\r\n    width: 100%;\r\n    visibility: visible;\r\n}\r\n.os-content > .os-textarea {\r\n    box-sizing: border-box !important;\r\n    direction: inherit !important;\r\n    background: transparent !important;\r\n    outline: 0px none transparent !important;\r\n    overflow: hidden !important;\r\n    position: absolute !important;\r\n    display: block !important;\r\n    top: 0 !important;\r\n    left: 0 !important;\r\n    margin: 0 !important;\r\n    border-radius: 0px !important;\r\n    float: none !important;\r\n    -webkit-filter: none !important;\r\n            filter: none !important;\r\n    border: none !important;\r\n    resize: none !important;\r\n    -webkit-transform: none !important;\r\n            transform: none !important;\r\n    max-width: none !important;\r\n    max-height: none !important;\r\n    box-shadow: none !important;\r\n    -webkit-perspective: none !important;\r\n            perspective: none !important;\r\n    opacity: 1 !important;\r\n    z-index: 1 !important;\r\n    clip: auto !important;\r\n    vertical-align: baseline !important;\r\n    padding: 0px;\r\n}\r\n.os-host-rtl > .os-padding > .os-viewport > .os-content > .os-textarea {\r\n    right: 0 !important;\r\n}\r\n.os-content > .os-textarea-cover {\r\n    z-index: -1;\r\n    pointer-events: none;\r\n}\r\n.os-content > .os-textarea[wrap='off'] {\r\n    white-space: pre !important;\r\n    margin: 0px !important;\r\n}\r\n.os-text-inherit {\r\n    font-family: inherit;\r\n    font-size: inherit;\r\n    font-weight: inherit;\r\n    font-style: inherit;\r\n    font-variant: inherit;\r\n    text-transform: inherit;\r\n    text-decoration: inherit;\r\n    text-indent: inherit;\r\n    text-align: inherit;\r\n    text-shadow: inherit;\r\n    text-overflow: inherit;\r\n    letter-spacing: inherit;\r\n    word-spacing: inherit;\r\n    line-height: inherit;\r\n    unicode-bidi: inherit;\r\n    direction: inherit;\r\n    color: inherit;\r\n    cursor: text;\r\n}\r\n.os-resize-observer,\r\n.os-resize-observer-host {\r\n    box-sizing: inherit;\r\n    display: block;\r\n    visibility: hidden;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    height: 100%;\r\n    width: 100%;\r\n    overflow: hidden;\r\n    pointer-events: none;\r\n    z-index: -1;\r\n}\r\n.os-resize-observer-host {\r\n    padding: inherit;\r\n    border: inherit;\r\n    border-color: transparent;\r\n    border-style: solid;\r\n    box-sizing: border-box;\r\n}\r\n.os-resize-observer-host.observed {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: flex-start;\r\n    align-items: flex-start;\r\n}\r\n.os-resize-observer-host > .os-resize-observer,\r\n.os-resize-observer-host.observed > .os-resize-observer {\r\n    height: 200%;\r\n    width: 200%;\r\n    padding: inherit;\r\n    border: inherit;\r\n    margin: 0;\r\n    display: block;\r\n    box-sizing: content-box;\r\n}\r\n.os-resize-observer-host.observed > .os-resize-observer,\r\n.os-resize-observer-host.observed > .os-resize-observer:before {\r\n    display: flex;\r\n    position: relative;\r\n    flex-grow: 1;\r\n    flex-shrink: 0;\r\n    flex-basis: auto;\r\n    box-sizing: border-box;\r\n}\r\n.os-resize-observer-host.observed > .os-resize-observer:before {\r\n    content: '';\r\n    box-sizing: content-box;\r\n    padding: inherit;\r\n    border: inherit;\r\n    margin: 0;\r\n}\r\n.os-size-auto-observer {\r\n    box-sizing: inherit !important;\r\n    height: 100%;\r\n    width: inherit;\r\n    max-width: 1px;\r\n    position: relative;\r\n    float: left;\r\n    max-height: 1px;\r\n    overflow: hidden;\r\n    z-index: -1;\r\n    padding: 0;\r\n    margin: 0;\r\n    pointer-events: none;\r\n    -webkit-box-flex: inherit;\r\n        -ms-flex-positive: inherit;\r\n            flex-grow: inherit;\r\n    -ms-flex-negative: 0;\r\n        flex-shrink: 0;\r\n    -ms-flex-preferred-size: 0;\r\n        flex-basis: 0;\r\n}\r\n.os-size-auto-observer > .os-resize-observer {\r\n    width: 1000%;\r\n    height: 1000%;\r\n    min-height: 1px;\r\n    min-width: 1px;\r\n}\r\n.os-resize-observer-item {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    overflow: hidden;\r\n    z-index: -1;\r\n    opacity: 0;\r\n    direction: ltr !important;\r\n    -webkit-box-flex: 0 !important;\r\n    -ms-flex: none !important;\r\n    flex: none !important;\r\n}\r\n.os-resize-observer-item-final {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    -webkit-transition: none !important;\r\n    transition: none !important;\r\n    -webkit-box-flex: 0 !important;\r\n    -ms-flex: none !important;\r\n    flex: none !important;\r\n}\r\n.os-resize-observer {\r\n    -webkit-animation-duration: 0.001s;\r\n    animation-duration: 0.001s;\r\n    -webkit-animation-name: os-resize-observer-dummy-animation;\r\n    animation-name: os-resize-observer-dummy-animation;\r\n}\r\nobject.os-resize-observer {\r\n    box-sizing: border-box !important;\r\n}\r\n@-webkit-keyframes os-resize-observer-dummy-animation {\r\n    from {\r\n        z-index: 0;\r\n    }\r\n    to {\r\n        z-index: -1;\r\n    }\r\n}\r\n@keyframes os-resize-observer-dummy-animation {\r\n    from {\r\n        z-index: 0;\r\n    }\r\n    to {\r\n        z-index: -1;\r\n    }\r\n}\r\n\r\n/*\r\nCUSTOM SCROLLBARS AND CORNER CORE:\r\n*/\r\n\r\n.os-host-transition > .os-scrollbar,\r\n.os-host-transition > .os-scrollbar-corner {\r\n    -webkit-transition: opacity 0.3s, visibility 0.3s, top 0.3s, right 0.3s, bottom 0.3s, left 0.3s;\r\n    transition: opacity 0.3s, visibility 0.3s, top 0.3s, right 0.3s, bottom 0.3s, left 0.3s;\r\n}\r\nhtml.os-html > .os-host > .os-scrollbar {\r\n    position: absolute; /* could be position: fixed; but it causes issues on iOS (-webkit-overflow-scrolling: touch) */\r\n    z-index: 999999; /* highest z-index of the page */\r\n}\r\n.os-scrollbar,\r\n.os-scrollbar-corner {\r\n    position: absolute;\r\n    opacity: 1;\r\n    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';\r\n    z-index: 1;\r\n}\r\n.os-scrollbar-corner {\r\n    bottom: 0;\r\n    right: 0;\r\n}\r\n.os-scrollbar {\r\n    pointer-events: none;\r\n}\r\n.os-scrollbar-track {\r\n    pointer-events: auto;\r\n    position: relative;\r\n    height: 100%;\r\n    width: 100%;\r\n    padding: 0 !important;\r\n    border: none !important;\r\n}\r\n.os-scrollbar-handle {\r\n    pointer-events: auto;\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n.os-scrollbar-handle-off,\r\n.os-scrollbar-track-off {\r\n    pointer-events: none;\r\n}\r\n.os-scrollbar.os-scrollbar-unusable,\r\n.os-scrollbar.os-scrollbar-unusable * {\r\n    pointer-events: none !important;\r\n}\r\n.os-scrollbar.os-scrollbar-unusable .os-scrollbar-handle {\r\n    opacity: 0 !important;\r\n}\r\n.os-scrollbar-horizontal {\r\n    bottom: 0;\r\n    left: 0;\r\n}\r\n.os-scrollbar-vertical {\r\n    top: 0;\r\n    right: 0;\r\n}\r\n.os-host-rtl > .os-scrollbar-horizontal {\r\n    right: 0;\r\n}\r\n.os-host-rtl > .os-scrollbar-vertical {\r\n    right: auto;\r\n    left: 0;\r\n}\r\n.os-host-rtl > .os-scrollbar-corner {\r\n    right: auto;\r\n    left: 0;\r\n}\r\n.os-scrollbar-auto-hidden,\r\n.os-padding + .os-scrollbar-corner,\r\n.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden > .os-scrollbar-corner,\r\n.os-host-scrollbar-horizontal-hidden > .os-scrollbar-horizontal,\r\n.os-host-resize-disabled.os-host-scrollbar-vertical-hidden > .os-scrollbar-corner,\r\n.os-host-scrollbar-vertical-hidden > .os-scrollbar-vertical,\r\n.os-scrollbar-horizontal.os-scrollbar-auto-hidden + .os-scrollbar-vertical + .os-scrollbar-corner,\r\n.os-scrollbar-horizontal + .os-scrollbar-vertical.os-scrollbar-auto-hidden + .os-scrollbar-corner,\r\n.os-scrollbar-horizontal.os-scrollbar-auto-hidden + .os-scrollbar-vertical.os-scrollbar-auto-hidden + .os-scrollbar-corner {\r\n    opacity: 0;\r\n    visibility: hidden;\r\n    pointer-events: none;\r\n}\r\n.os-scrollbar-corner-resize-both {\r\n    cursor: nwse-resize;\r\n}\r\n.os-host-rtl > .os-scrollbar-corner-resize-both {\r\n    cursor: nesw-resize;\r\n}\r\n.os-scrollbar-corner-resize-horizontal {\r\n    cursor: ew-resize;\r\n}\r\n.os-scrollbar-corner-resize-vertical {\r\n    cursor: ns-resize;\r\n}\r\n.os-dragging .os-scrollbar-corner.os-scrollbar-corner-resize {\r\n    cursor: default;\r\n}\r\n.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden > .os-scrollbar-vertical {\r\n    top: 0;\r\n    bottom: 0;\r\n}\r\n.os-host-resize-disabled.os-host-scrollbar-vertical-hidden > .os-scrollbar-horizontal,\r\n.os-host-rtl.os-host-resize-disabled.os-host-scrollbar-vertical-hidden > .os-scrollbar-horizontal {\r\n    right: 0;\r\n    left: 0;\r\n}\r\n.os-scrollbar:hover,\r\n.os-scrollbar-corner.os-scrollbar-corner-resize {\r\n    opacity: 1 !important;\r\n    visibility: visible !important;\r\n}\r\n.os-scrollbar-corner.os-scrollbar-corner-resize {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n    background-repeat: no-repeat;\r\n    background-position: 100% 100%;\r\n    pointer-events: auto !important;\r\n}\r\n.os-host-rtl > .os-scrollbar-corner.os-scrollbar-corner-resize {\r\n    -webkit-transform: scale(-1, 1);\r\n    transform: scale(-1, 1);\r\n}\r\n.os-host-overflow {\r\n    overflow: hidden !important;\r\n}\r\n.os-host-overflow-x {\r\n}\r\n.os-host-overflow-y {\r\n}\r\n\r\n/*\r\nTHEMES:\r\n*/\r\n\r\n/* NONE THEME: */\r\n.os-theme-none > .os-scrollbar-horizontal,\r\n.os-theme-none > .os-scrollbar-vertical,\r\n.os-theme-none > .os-scrollbar-corner {\r\n    display: none !important;\r\n}\r\n.os-theme-none > .os-scrollbar-corner-resize {\r\n    display: block !important;\r\n    min-width: 10px;\r\n    min-height: 10px;\r\n}\r\n/* DARK & LIGHT THEME: */\r\n.os-theme-dark > .os-scrollbar-horizontal,\r\n.os-theme-light > .os-scrollbar-horizontal {\r\n    right: 10px;\r\n    height: 10px;\r\n}\r\n.os-theme-dark > .os-scrollbar-vertical,\r\n.os-theme-light > .os-scrollbar-vertical {\r\n    bottom: 10px;\r\n    width: 10px;\r\n}\r\n.os-theme-dark.os-host-rtl > .os-scrollbar-horizontal,\r\n.os-theme-light.os-host-rtl > .os-scrollbar-horizontal {\r\n    left: 10px;\r\n    right: 0;\r\n}\r\n.os-theme-dark > .os-scrollbar-corner,\r\n.os-theme-light > .os-scrollbar-corner {\r\n    height: 10px;\r\n    width: 10px;\r\n}\r\n.os-theme-dark > .os-scrollbar-corner,\r\n.os-theme-light > .os-scrollbar-corner {\r\n    background-color: transparent;\r\n}\r\n.os-theme-dark > .os-scrollbar,\r\n.os-theme-light > .os-scrollbar {\r\n    padding: 2px;\r\n    box-sizing: border-box;\r\n    background: transparent;\r\n}\r\n.os-theme-dark > .os-scrollbar.os-scrollbar-unusable,\r\n.os-theme-light > .os-scrollbar.os-scrollbar-unusable {\r\n    background: transparent;\r\n}\r\n.os-theme-dark > .os-scrollbar > .os-scrollbar-track,\r\n.os-theme-light > .os-scrollbar > .os-scrollbar-track {\r\n    background: transparent;\r\n}\r\n.os-theme-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle,\r\n.os-theme-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {\r\n    min-width: 30px;\r\n}\r\n.os-theme-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle,\r\n.os-theme-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {\r\n    min-height: 30px;\r\n}\r\n.os-theme-dark.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle,\r\n.os-theme-light.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {\r\n    -webkit-transition: background-color 0.3s;\r\n    transition: background-color 0.3s;\r\n}\r\n.os-theme-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle,\r\n.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle,\r\n.os-theme-dark > .os-scrollbar > .os-scrollbar-track,\r\n.os-theme-light > .os-scrollbar > .os-scrollbar-track {\r\n    border-radius: 10px;\r\n}\r\n.os-theme-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: rgba(0, 0, 0, 0.4);\r\n}\r\n.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: rgba(255, 255, 255, 0.4);\r\n}\r\n.os-theme-dark > .os-scrollbar:hover > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: rgba(0, 0, 0, .55);\r\n}\r\n.os-theme-light > .os-scrollbar:hover > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: rgba(255, 255, 255, .55);\r\n}\r\n.os-theme-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active {\r\n    background: rgba(0, 0, 0, .7);\r\n}\r\n.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active {\r\n    background: rgba(255, 255, 255, .7);\r\n}\r\n.os-theme-dark > .os-scrollbar-horizontal .os-scrollbar-handle:before,\r\n.os-theme-dark > .os-scrollbar-vertical .os-scrollbar-handle:before,\r\n.os-theme-light > .os-scrollbar-horizontal .os-scrollbar-handle:before,\r\n.os-theme-light > .os-scrollbar-vertical .os-scrollbar-handle:before {\r\n    content: '';\r\n    position: absolute;\r\n    left: 0;\r\n    right: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n    display: block;\r\n}\r\n.os-theme-dark.os-host-scrollbar-horizontal-hidden > .os-scrollbar-horizontal .os-scrollbar-handle:before,\r\n.os-theme-dark.os-host-scrollbar-vertical-hidden > .os-scrollbar-vertical .os-scrollbar-handle:before,\r\n.os-theme-light.os-host-scrollbar-horizontal-hidden > .os-scrollbar-horizontal .os-scrollbar-handle:before,\r\n.os-theme-light.os-host-scrollbar-vertical-hidden > .os-scrollbar-vertical .os-scrollbar-handle:before {\r\n    display: none;\r\n}\r\n.os-theme-dark > .os-scrollbar-horizontal .os-scrollbar-handle:before,\r\n.os-theme-light > .os-scrollbar-horizontal .os-scrollbar-handle:before {\r\n    top: -6px;\r\n    bottom: -2px;\r\n}\r\n.os-theme-dark > .os-scrollbar-vertical .os-scrollbar-handle:before,\r\n.os-theme-light > .os-scrollbar-vertical .os-scrollbar-handle:before {\r\n    left: -6px;\r\n    right: -2px;\r\n}\r\n.os-host-rtl.os-theme-dark > .os-scrollbar-vertical .os-scrollbar-handle:before,\r\n.os-host-rtl.os-theme-light > .os-scrollbar-vertical .os-scrollbar-handle:before {\r\n    right: -6px;\r\n    left: -2px;\r\n}\r\n\r\n\r\n/*\r\nos-theme-round-light\r\n*/\r\n\r\n.os-theme-round-light > .os-scrollbar {\r\n    padding: 0;\r\n}\r\n.os-theme-round-light > .os-scrollbar-horizontal {\r\n    right: 20px;\r\n    height: 20px;\r\n}\r\n.os-theme-round-light > .os-scrollbar-vertical {\r\n    bottom: 20px;\r\n    width: 20px;\r\n}\r\n.os-theme-round-light.os-host-rtl > .os-scrollbar-horizontal {\r\n    left: 20px;\r\n    right: 0;\r\n}\r\n.os-theme-round-light > .os-scrollbar-corner {\r\n    height: 20px;\r\n    width: 20px;\r\n    background-color: transparent;\r\n}\r\n.os-theme-round-light > .os-scrollbar > .os-scrollbar-track {\r\n    background: transparent;\r\n}\r\n.os-theme-round-light > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-round-light > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(255, 255, 255, 0.15);\r\n}\r\n.os-theme-round-light > .os-scrollbar-horizontal > .os-scrollbar-track:before {\r\n    left: 3px;\r\n    right: 3px;\r\n    height: 2px;\r\n    top: 50%;\r\n    margin-top: -1px;\r\n}\r\n.os-theme-round-light > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    top: 3px;\r\n    bottom: 3px;\r\n    width: 2px;\r\n    left: 50%;\r\n    margin-left: -1px;\r\n}\r\n.os-theme-round-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: transparent;\r\n}\r\n.os-theme-round-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: #fff;\r\n    border-radius: 100%;\r\n    top: 3px;\r\n    bottom: 3px;\r\n    left: 3px;\r\n    right: 3px;\r\n    transform: scale(1);\r\n}\r\n.os-theme-round-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-round-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    transform: scale(1.3);\r\n}\r\n.os-theme-round-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {\r\n    height: 100%;\r\n    min-width: 20px;\r\n    max-width: 20px;\r\n}\r\n.os-theme-round-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {\r\n    width: 100%;\r\n    min-height: 20px;\r\n    max-height: 20px;\r\n}\r\n.os-theme-round-light.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: transform 0.3s;\r\n}\r\n\r\n/*\r\nos-theme-round-dark\r\n*/\r\n\r\n.os-theme-round-dark > .os-scrollbar {\r\n    padding: 0;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-horizontal {\r\n    right: 20px;\r\n    height: 20px;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-vertical {\r\n    bottom: 20px;\r\n    width: 20px;\r\n}\r\n.os-theme-round-dark.os-host-rtl > .os-scrollbar-horizontal {\r\n    left: 20px;\r\n    right: 0;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-corner {\r\n    height: 20px;\r\n    width: 20px;\r\n    background-color: transparent;\r\n}\r\n.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track {\r\n    background: transparent;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-round-dark > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(0, 0, 0, 0.15);\r\n}\r\n.os-theme-round-dark > .os-scrollbar-horizontal > .os-scrollbar-track:before {\r\n    left: 3px;\r\n    right: 3px;\r\n    height: 2px;\r\n    top: 50%;\r\n    margin-top: -1px;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    top: 3px;\r\n    bottom: 3px;\r\n    width: 2px;\r\n    left: 50%;\r\n    margin-left: -1px;\r\n}\r\n.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: transparent;\r\n}\r\n.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: #000;\r\n    border-radius: 100%;\r\n    top: 3px;\r\n    bottom: 3px;\r\n    left: 3px;\r\n    right: 3px;\r\n    transform: scale(1);\r\n}\r\n.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    transform: scale(1.3);\r\n}\r\n.os-theme-round-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {\r\n    height: 100%;\r\n    min-width: 20px;\r\n    max-width: 20px;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {\r\n    width: 100%;\r\n    min-height: 20px;\r\n    max-height: 20px;\r\n}\r\n.os-theme-round-dark.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: transform 0.3s;\r\n}\r\n\r\n/*\r\nos-theme-thin-dark\r\n*/\r\n\r\n.os-theme-thin-dark > .os-scrollbar-horizontal {\r\n    right: 14px;\r\n    height: 14px;\r\n    padding: 0px 6px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-vertical {\r\n    bottom: 14px;\r\n    width: 14px;\r\n    padding: 6px 0px;\r\n}\r\n.os-theme-thin-dark.os-host-rtl > .os-scrollbar-horizontal {\r\n    left: 14px;\r\n    right: 0;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-corner {\r\n    height: 14px;\r\n    width: 14px;\r\n    background-color: transparent;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar > .os-scrollbar-track {\r\n    background: transparent;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(0, 0, 0, 0.15);\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    left: 0;\r\n    right: 0;\r\n    height: 2px;\r\n    top: 50%;\r\n    margin-top: -1px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track:before,\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    top: 0;\r\n    bottom: 0;\r\n    width: 2px;\r\n    left: 50%;\r\n    margin-left: -1px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(0, 0, 0, 0.5);\r\n    border-radius: 10px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    height: 4px;\r\n    margin-top: -2px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    width: 4px;\r\n    margin-left: -2px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:hover:before {\r\n    background: rgba(0, 0, 0, 0.7);\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle.active:before,\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    background: #000;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {\r\n    height: 100%;\r\n    min-width: 30px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {\r\n    width: 100%;\r\n    min-height: 30px;\r\n}\r\n.os-theme-thin-dark.os-host-transition > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: height 0.3s, margin-top 0.3s, background 0.2s;\r\n}\r\n.os-theme-thin-dark.os-host-transition > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: width 0.3s, margin-left 0.3s, background 0.2s;\r\n}\r\n\r\n/*\r\nos-theme-thin-light\r\n*/\r\n\r\n.os-theme-thin-light > .os-scrollbar-horizontal {\r\n    right: 14px;\r\n    height: 14px;\r\n    padding: 0px 6px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-vertical {\r\n    bottom: 14px;\r\n    width: 14px;\r\n    padding: 6px 0px;\r\n}\r\n.os-theme-thin-light.os-host-rtl > .os-scrollbar-horizontal {\r\n    left: 14px;\r\n    right: 0;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-corner {\r\n    height: 14px;\r\n    width: 14px;\r\n    background-color: transparent;\r\n}\r\n.os-theme-thin-light > .os-scrollbar > .os-scrollbar-track {\r\n    background: transparent;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(255, 255, 255, 0.15);\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    left: 0;\r\n    right: 0;\r\n    height: 2px;\r\n    top: 50%;\r\n    margin-top: -1px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track:before,\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    top: 0;\r\n    bottom: 0;\r\n    width: 2px;\r\n    left: 50%;\r\n    margin-left: -1px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(255, 255, 255, 0.5);\r\n    border-radius: 10px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    height: 4px;\r\n    margin-top: -2px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    width: 4px;\r\n    margin-left: -2px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:hover:before {\r\n    background: rgba(255, 255, 255, 0.7);\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle.active:before,\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    background: #fff;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {\r\n    height: 100%;\r\n    min-width: 30px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {\r\n    width: 100%;\r\n    min-height: 30px;\r\n}\r\n.os-theme-thin-light.os-host-transition > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: height 0.3s, margin-top 0.3s, background 0.2s;\r\n}\r\n.os-theme-thin-light.os-host-transition > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: width 0.3s, margin-left 0.3s, background 0.2s;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/OverlayScrollbars.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;EAWE;;AAEF;;CAEC;;AAED;;IAEI,cAAc;IACd,gBAAgB;IAChB,sBAAsB;IACtB,uBAAuB;IACvB,sBAAsB;IACtB,0BAA0B;IAC1B,2BAA2B;IAC3B,oBAAoB;IACpB,6BAA6B,EAAE,8FAA8F;AACjI;AACA;IACI,kBAAkB,EAAE,8FAA8F;AACtH;AACA;;IAEI,eAAe;AACnB;AACA;;IAEI,kBAAkB;IAClB,4BAA4B;IAC5B,4BAA4B;IAC5B,6BAA6B;QACzB,0BAA0B;YACtB,sBAAsB;IAC9B,qBAAqB;QACjB,iBAAiB;IACrB,uBAAuB;QACnB,oBAAoB;YAChB,2BAA2B;IACnC,yBAAyB;QACrB,yBAAyB;IAC7B,wBAAwB;QACpB,qBAAqB;gBACb,8BAA8B;YAClC,uBAAuB;AACnC;AACA;IACI,2BAA2B;IAC3B,oBAAoB;IACpB,oBAAoB;IACpB,aAAa;AACjB;AACA;IACI,0BAA0B;AAC9B;AACA;IACI,mBAAmB;QACf,oBAAoB;YAChB,YAAY;IACpB,oBAAoB;QAChB,cAAc;AACtB;AACA;;IAEI,aAAa;IACb,YAAY;IACZ,mBAAmB;QACf,oBAAoB;YAChB,YAAY;IACpB,oBAAoB;QAChB,cAAc;IAClB,6BAA6B;QACzB,gBAAgB;AACxB;AACA;IACI,eAAe;IACf,UAAU;IACV,gEAAgE;IAChE,kBAAkB;IAClB,gBAAgB;IAChB,aAAa;IACb,YAAY;AAChB;AACA;IACI,WAAW;IACX,YAAY;IACZ,cAAc;AAClB;AACA,6BAA6B;AAC7B;;;;IAII,WAAW;IACX,cAAc;IACd,aAAa;IACb,cAAc;IACd,cAAc;IACd,YAAY;IACZ,YAAY;IACZ,cAAc;IACd,kBAAkB;AACtB;AACA;;IAEI,wCAAwC;AAC5C;AACA;;IAEI,gCAAgC;AACpC;AACA;;;;IAII,wBAAwB;IACxB,qBAAqB;IACrB,sBAAsB;IACtB,6BAA6B;IAC7B,kCAAkC;AACtC;AACA;IACI,mBAAmB;IACnB,gBAAgB;IAChB,eAAe;IACf,WAAW;IACX,oBAAoB;AACxB;AACA;IACI,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;IAClB,iBAAiB;IACjB,UAAU;IACV,SAAS;IACT,OAAO;IACP,MAAM;IACN,SAAS;IACT,QAAQ;IACR,sBAAsB;IACtB,uBAAuB;CAC1B,UAAU;AACX;AACA;IACI,gBAAgB;AACpB;AACA;IACI,6BAA6B;IAC7B,8BAA8B;IAC9B,uBAAuB;IACvB,wBAAwB;IACxB,kBAAkB;IAClB,gBAAgB;IAChB,MAAM;IACN,OAAO;IACP,SAAS;IACT,QAAQ;IACR,UAAU;IACV,SAAS;IACT,iCAAiC;AACrC;AACA;IACI,kBAAkB;IAClB,WAAW;IACX,eAAe;IACf,cAAc;IACd,oBAAoB;AACxB;AACA;IACI,kBAAkB;IAClB,iCAAiC;IACjC,kBAAkB;IAClB,cAAc;IACd,YAAY;IACZ,WAAW;IACX,YAAY;IACZ,WAAW;IACX,mBAAmB;AACvB;AACA;IACI,iCAAiC;IACjC,6BAA6B;IAC7B,kCAAkC;IAClC,wCAAwC;IACxC,2BAA2B;IAC3B,6BAA6B;IAC7B,yBAAyB;IACzB,iBAAiB;IACjB,kBAAkB;IAClB,oBAAoB;IACpB,6BAA6B;IAC7B,sBAAsB;IACtB,+BAA+B;YACvB,uBAAuB;IAC/B,uBAAuB;IACvB,uBAAuB;IACvB,kCAAkC;YAC1B,0BAA0B;IAClC,0BAA0B;IAC1B,2BAA2B;IAC3B,2BAA2B;IAC3B,oCAAoC;YAC5B,4BAA4B;IACpC,qBAAqB;IACrB,qBAAqB;IACrB,qBAAqB;IACrB,mCAAmC;IACnC,YAAY;AAChB;AACA;IACI,mBAAmB;AACvB;AACA;IACI,WAAW;IACX,oBAAoB;AACxB;AACA;IACI,2BAA2B;IAC3B,sBAAsB;AAC1B;AACA;IACI,oBAAoB;IACpB,kBAAkB;IAClB,oBAAoB;IACpB,mBAAmB;IACnB,qBAAqB;IACrB,uBAAuB;IACvB,wBAAwB;IACxB,oBAAoB;IACpB,mBAAmB;IACnB,oBAAoB;IACpB,sBAAsB;IACtB,uBAAuB;IACvB,qBAAqB;IACrB,oBAAoB;IACpB,qBAAqB;IACrB,kBAAkB;IAClB,cAAc;IACd,YAAY;AAChB;AACA;;IAEI,mBAAmB;IACnB,cAAc;IACd,kBAAkB;IAClB,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,YAAY;IACZ,WAAW;IACX,gBAAgB;IAChB,oBAAoB;IACpB,WAAW;AACf;AACA;IACI,gBAAgB;IAChB,eAAe;IACf,yBAAyB;IACzB,mBAAmB;IACnB,sBAAsB;AAC1B;AACA;IACI,aAAa;IACb,sBAAsB;IACtB,2BAA2B;IAC3B,uBAAuB;AAC3B;AACA;;IAEI,YAAY;IACZ,WAAW;IACX,gBAAgB;IAChB,eAAe;IACf,SAAS;IACT,cAAc;IACd,uBAAuB;AAC3B;AACA;;IAEI,aAAa;IACb,kBAAkB;IAClB,YAAY;IACZ,cAAc;IACd,gBAAgB;IAChB,sBAAsB;AAC1B;AACA;IACI,WAAW;IACX,uBAAuB;IACvB,gBAAgB;IAChB,eAAe;IACf,SAAS;AACb;AACA;IACI,8BAA8B;IAC9B,YAAY;IACZ,cAAc;IACd,cAAc;IACd,kBAAkB;IAClB,WAAW;IACX,eAAe;IACf,gBAAgB;IAChB,WAAW;IACX,UAAU;IACV,SAAS;IACT,oBAAoB;IACpB,yBAAyB;QACrB,0BAA0B;YACtB,kBAAkB;IAC1B,oBAAoB;QAChB,cAAc;IAClB,0BAA0B;QACtB,aAAa;AACrB;AACA;IACI,YAAY;IACZ,aAAa;IACb,eAAe;IACf,cAAc;AAClB;AACA;IACI,kBAAkB;IAClB,MAAM;IACN,QAAQ;IACR,SAAS;IACT,OAAO;IACP,gBAAgB;IAChB,WAAW;IACX,UAAU;IACV,yBAAyB;IACzB,8BAA8B;IAC9B,yBAAyB;IACzB,qBAAqB;AACzB;AACA;IACI,kBAAkB;IAClB,OAAO;IACP,MAAM;IACN,mCAAmC;IACnC,2BAA2B;IAC3B,8BAA8B;IAC9B,yBAAyB;IACzB,qBAAqB;AACzB;AACA;IACI,kCAAkC;IAClC,0BAA0B;IAC1B,0DAA0D;IAC1D,kDAAkD;AACtD;AACA;IACI,iCAAiC;AACrC;AACA;IACI;QACI,UAAU;IACd;IACA;QACI,WAAW;IACf;AACJ;AACA;IACI;QACI,UAAU;IACd;IACA;QACI,WAAW;IACf;AACJ;;AAEA;;CAEC;;AAED;;IAEI,+FAA+F;IAC/F,uFAAuF;AAC3F;AACA;IACI,kBAAkB,EAAE,8FAA8F;IAClH,eAAe,EAAE,gCAAgC;AACrD;AACA;;IAEI,kBAAkB;IAClB,UAAU;IACV,kEAAkE;IAClE,UAAU;AACd;AACA;IACI,SAAS;IACT,QAAQ;AACZ;AACA;IACI,oBAAoB;AACxB;AACA;IACI,oBAAoB;IACpB,kBAAkB;IAClB,YAAY;IACZ,WAAW;IACX,qBAAqB;IACrB,uBAAuB;AAC3B;AACA;IACI,oBAAoB;IACpB,kBAAkB;IAClB,WAAW;IACX,YAAY;AAChB;AACA;;IAEI,oBAAoB;AACxB;AACA;;IAEI,+BAA+B;AACnC;AACA;IACI,qBAAqB;AACzB;AACA;IACI,SAAS;IACT,OAAO;AACX;AACA;IACI,MAAM;IACN,QAAQ;AACZ;AACA;IACI,QAAQ;AACZ;AACA;IACI,WAAW;IACX,OAAO;AACX;AACA;IACI,WAAW;IACX,OAAO;AACX;AACA;;;;;;;;;IASI,UAAU;IACV,kBAAkB;IAClB,oBAAoB;AACxB;AACA;IACI,mBAAmB;AACvB;AACA;IACI,mBAAmB;AACvB;AACA;IACI,iBAAiB;AACrB;AACA;IACI,iBAAiB;AACrB;AACA;IACI,eAAe;AACnB;AACA;IACI,MAAM;IACN,SAAS;AACb;AACA;;IAEI,QAAQ;IACR,OAAO;AACX;AACA;;IAEI,qBAAqB;IACrB,8BAA8B;AAClC;AACA;IACI,yDAAqpM;IACrpM,4BAA4B;IAC5B,8BAA8B;IAC9B,+BAA+B;AACnC;AACA;IACI,+BAA+B;IAC/B,uBAAuB;AAC3B;AACA;IACI,2BAA2B;AAC/B;AACA;AACA;AACA;AACA;;AAEA;;CAEC;;AAED,gBAAgB;AAChB;;;IAGI,wBAAwB;AAC5B;AACA;IACI,yBAAyB;IACzB,eAAe;IACf,gBAAgB;AACpB;AACA,wBAAwB;AACxB;;IAEI,WAAW;IACX,YAAY;AAChB;AACA;;IAEI,YAAY;IACZ,WAAW;AACf;AACA;;IAEI,UAAU;IACV,QAAQ;AACZ;AACA;;IAEI,YAAY;IACZ,WAAW;AACf;AACA;;IAEI,6BAA6B;AACjC;AACA;;IAEI,YAAY;IACZ,sBAAsB;IACtB,uBAAuB;AAC3B;AACA;;IAEI,uBAAuB;AAC3B;AACA;;IAEI,uBAAuB;AAC3B;AACA;;IAEI,eAAe;AACnB;AACA;;IAEI,gBAAgB;AACpB;AACA;;IAEI,yCAAyC;IACzC,iCAAiC;AACrC;AACA;;;;IAII,mBAAmB;AACvB;AACA;IACI,8BAA8B;AAClC;AACA;IACI,oCAAoC;AACxC;AACA;IACI,8BAA8B;AAClC;AACA;IACI,oCAAoC;AACxC;AACA;IACI,6BAA6B;AACjC;AACA;IACI,mCAAmC;AACvC;AACA;;;;IAII,WAAW;IACX,kBAAkB;IAClB,OAAO;IACP,QAAQ;IACR,MAAM;IACN,SAAS;IACT,cAAc;AAClB;AACA;;;;IAII,aAAa;AACjB;AACA;;IAEI,SAAS;IACT,YAAY;AAChB;AACA;;IAEI,UAAU;IACV,WAAW;AACf;AACA;;IAEI,WAAW;IACX,UAAU;AACd;;;AAGA;;CAEC;;AAED;IACI,UAAU;AACd;AACA;IACI,WAAW;IACX,YAAY;AAChB;AACA;IACI,YAAY;IACZ,WAAW;AACf;AACA;IACI,UAAU;IACV,QAAQ;AACZ;AACA;IACI,YAAY;IACZ,WAAW;IACX,6BAA6B;AACjC;AACA;IACI,uBAAuB;AAC3B;AACA;;IAEI,WAAW;IACX,cAAc;IACd,kBAAkB;IAClB,qCAAqC;AACzC;AACA;IACI,SAAS;IACT,UAAU;IACV,WAAW;IACX,QAAQ;IACR,gBAAgB;AACpB;AACA;IACI,QAAQ;IACR,WAAW;IACX,UAAU;IACV,SAAS;IACT,iBAAiB;AACrB;AACA;IACI,uBAAuB;AAC3B;AACA;IACI,WAAW;IACX,cAAc;IACd,kBAAkB;IAClB,gBAAgB;IAChB,mBAAmB;IACnB,QAAQ;IACR,WAAW;IACX,SAAS;IACT,UAAU;IACV,mBAAmB;AACvB;AACA;;IAEI,qBAAqB;AACzB;AACA;IACI,YAAY;IACZ,eAAe;IACf,eAAe;AACnB;AACA;IACI,WAAW;IACX,gBAAgB;IAChB,gBAAgB;AACpB;AACA;IACI,0BAA0B;AAC9B;;AAEA;;CAEC;;AAED;IACI,UAAU;AACd;AACA;IACI,WAAW;IACX,YAAY;AAChB;AACA;IACI,YAAY;IACZ,WAAW;AACf;AACA;IACI,UAAU;IACV,QAAQ;AACZ;AACA;IACI,YAAY;IACZ,WAAW;IACX,6BAA6B;AACjC;AACA;IACI,uBAAuB;AAC3B;AACA;;IAEI,WAAW;IACX,cAAc;IACd,kBAAkB;IAClB,+BAA+B;AACnC;AACA;IACI,SAAS;IACT,UAAU;IACV,WAAW;IACX,QAAQ;IACR,gBAAgB;AACpB;AACA;IACI,QAAQ;IACR,WAAW;IACX,UAAU;IACV,SAAS;IACT,iBAAiB;AACrB;AACA;IACI,uBAAuB;AAC3B;AACA;IACI,WAAW;IACX,cAAc;IACd,kBAAkB;IAClB,gBAAgB;IAChB,mBAAmB;IACnB,QAAQ;IACR,WAAW;IACX,SAAS;IACT,UAAU;IACV,mBAAmB;AACvB;AACA;;IAEI,qBAAqB;AACzB;AACA;IACI,YAAY;IACZ,eAAe;IACf,eAAe;AACnB;AACA;IACI,WAAW;IACX,gBAAgB;IAChB,gBAAgB;AACpB;AACA;IACI,0BAA0B;AAC9B;;AAEA;;CAEC;;AAED;IACI,WAAW;IACX,YAAY;IACZ,gBAAgB;AACpB;AACA;IACI,YAAY;IACZ,WAAW;IACX,gBAAgB;AACpB;AACA;IACI,UAAU;IACV,QAAQ;AACZ;AACA;IACI,YAAY;IACZ,WAAW;IACX,6BAA6B;AACjC;AACA;IACI,uBAAuB;AAC3B;AACA;;IAEI,WAAW;IACX,cAAc;IACd,kBAAkB;IAClB,+BAA+B;AACnC;AACA;;IAEI,OAAO;IACP,QAAQ;IACR,WAAW;IACX,QAAQ;IACR,gBAAgB;AACpB;AACA;;IAEI,MAAM;IACN,SAAS;IACT,UAAU;IACV,SAAS;IACT,iBAAiB;AACrB;AACA;IACI,WAAW;IACX,cAAc;IACd,kBAAkB;IAClB,8BAA8B;IAC9B,mBAAmB;AACvB;AACA;;IAEI,WAAW;IACX,gBAAgB;AACpB;AACA;;IAEI,UAAU;IACV,iBAAiB;AACrB;AACA;;IAEI,8BAA8B;AAClC;AACA;;IAEI,gBAAgB;AACpB;AACA;IACI,YAAY;IACZ,eAAe;AACnB;AACA;IACI,WAAW;IACX,gBAAgB;AACpB;AACA;IACI,yDAAyD;AAC7D;AACA;IACI,yDAAyD;AAC7D;;AAEA;;CAEC;;AAED;IACI,WAAW;IACX,YAAY;IACZ,gBAAgB;AACpB;AACA;IACI,YAAY;IACZ,WAAW;IACX,gBAAgB;AACpB;AACA;IACI,UAAU;IACV,QAAQ;AACZ;AACA;IACI,YAAY;IACZ,WAAW;IACX,6BAA6B;AACjC;AACA;IACI,uBAAuB;AAC3B;AACA;;IAEI,WAAW;IACX,cAAc;IACd,kBAAkB;IAClB,qCAAqC;AACzC;AACA;;IAEI,OAAO;IACP,QAAQ;IACR,WAAW;IACX,QAAQ;IACR,gBAAgB;AACpB;AACA;;IAEI,MAAM;IACN,SAAS;IACT,UAAU;IACV,SAAS;IACT,iBAAiB;AACrB;AACA;IACI,WAAW;IACX,cAAc;IACd,kBAAkB;IAClB,oCAAoC;IACpC,mBAAmB;AACvB;AACA;;IAEI,WAAW;IACX,gBAAgB;AACpB;AACA;;IAEI,UAAU;IACV,iBAAiB;AACrB;AACA;;IAEI,oCAAoC;AACxC;AACA;;IAEI,gBAAgB;AACpB;AACA;IACI,YAAY;IACZ,eAAe;AACnB;AACA;IACI,WAAW;IACX,gBAAgB;AACpB;AACA;IACI,yDAAyD;AAC7D;AACA;IACI,yDAAyD;AAC7D","sourcesContent":["/*!\r\n * OverlayScrollbars\r\n * https://github.com/KingSora/OverlayScrollbars\r\n *\r\n * Version: 1.13.0\r\n *\r\n * Copyright KingSora | Rene Haas.\r\n * https://github.com/KingSora\r\n *\r\n * Released under the MIT license.\r\n * Date: 02.08.2020\r\n */\r\n\r\n/*\r\nOVERLAY SCROLLBARS CORE:\r\n*/\r\n\r\nhtml.os-html,\r\nhtml.os-html > .os-host {\r\n    display: block;\r\n    overflow: hidden;\r\n    box-sizing: border-box;\r\n    height: 100% !important;\r\n    width: 100% !important;\r\n    min-width: 100% !important;\r\n    min-height: 100% !important;\r\n    margin: 0 !important;\r\n    position: absolute !important; /* could be position: fixed; but it causes issues on iOS (-webkit-overflow-scrolling: touch) */\r\n}\r\nhtml.os-html > .os-host > .os-padding {\r\n    position: absolute; /* could be position: fixed; but it causes issues on iOS (-webkit-overflow-scrolling: touch) */\r\n}\r\nbody.os-dragging,\r\nbody.os-dragging * {\r\n    cursor: default;\r\n}\r\n.os-host,\r\n.os-host-textarea {\r\n    position: relative;\r\n    overflow: visible !important;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    -ms-flex-wrap: nowrap;\r\n        flex-wrap: nowrap;\r\n    -webkit-box-pack: start;\r\n        -ms-flex-pack: start;\r\n            justify-content: flex-start;\r\n    -ms-flex-line-pack: start;\r\n        align-content: flex-start;\r\n    -webkit-box-align: start;\r\n        -ms-flex-align: start;\r\n                -ms-grid-row-align: flex-start;\r\n            align-items: flex-start;\r\n}\r\n.os-host-flexbox {\r\n    overflow: hidden !important;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n}\r\n.os-host-flexbox > .os-size-auto-observer {\r\n    height: inherit !important;\r\n}\r\n.os-host-flexbox > .os-content-glue {\r\n    -webkit-box-flex: 1;\r\n        -ms-flex-positive: 1;\r\n            flex-grow: 1;\r\n    -ms-flex-negative: 0;\r\n        flex-shrink: 0;\r\n}\r\n.os-host-flexbox > .os-size-auto-observer,\r\n.os-host-flexbox > .os-content-glue {\r\n    min-height: 0;\r\n    min-width: 0;\r\n    -webkit-box-flex: 0;\r\n        -ms-flex-positive: 0;\r\n            flex-grow: 0;\r\n    -ms-flex-negative: 1;\r\n        flex-shrink: 1;\r\n    -ms-flex-preferred-size: auto;\r\n        flex-basis: auto;\r\n}\r\n#os-dummy-scrollbar-size {\r\n    position: fixed;\r\n    opacity: 0;\r\n    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';\r\n    visibility: hidden;\r\n    overflow: scroll;\r\n    height: 500px;\r\n    width: 500px;\r\n}\r\n#os-dummy-scrollbar-size > div {\r\n    width: 200%;\r\n    height: 200%;\r\n    margin: 10px 0;\r\n}\r\n/* fix restricted measuring */\r\n#os-dummy-scrollbar-size:before,\r\n#os-dummy-scrollbar-size:after,\r\n.os-content:before,\r\n.os-content:after {\r\n    content: '';\r\n    display: table;\r\n    width: 0.01px;\r\n    height: 0.01px;\r\n    line-height: 0;\r\n    font-size: 0;\r\n    flex-grow: 0;\r\n    flex-shrink: 0;\r\n    visibility: hidden;\r\n}\r\n#os-dummy-scrollbar-size,\r\n.os-viewport {\r\n    -ms-overflow-style: scrollbar !important;\r\n}\r\n.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size,\r\n.os-viewport-native-scrollbars-invisible.os-viewport {\r\n    scrollbar-width: none !important;\r\n}\r\n.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar,\r\n.os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar,\r\n.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar-corner,\r\n.os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar-corner {\r\n    display: none !important;\r\n    width: 0px !important;\r\n    height: 0px !important;\r\n    visibility: hidden !important;\r\n    background: transparent !important;\r\n}\r\n.os-content-glue {\r\n    box-sizing: inherit;\r\n    max-height: 100%;\r\n    max-width: 100%;\r\n    width: 100%;\r\n    pointer-events: none;\r\n}\r\n.os-padding {\r\n    box-sizing: inherit;\r\n    direction: inherit;\r\n    position: absolute;\r\n    overflow: visible;\r\n    padding: 0;\r\n    margin: 0;\r\n    left: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n    right: 0;\r\n    width: auto !important;\r\n    height: auto !important;\r\n\tz-index: 0;\r\n}\r\n.os-host-overflow > .os-padding {\r\n    overflow: hidden;\r\n}\r\n.os-viewport {\r\n    direction: inherit !important;\r\n    box-sizing: inherit !important;\r\n    resize: none !important;\r\n    outline: none !important;\r\n    position: absolute;\r\n    overflow: hidden;\r\n    top: 0;\r\n    left: 0;\r\n    bottom: 0;\r\n    right: 0;\r\n    padding: 0;\r\n    margin: 0;\r\n    -webkit-overflow-scrolling: touch;\r\n}\r\n.os-content-arrange {\r\n    position: absolute;\r\n    z-index: -1;\r\n    min-height: 1px;\r\n    min-width: 1px;\r\n    pointer-events: none;\r\n}\r\n.os-content {\r\n    direction: inherit;\r\n    box-sizing: border-box !important;\r\n    position: relative;\r\n    display: block;\r\n    height: 100%;\r\n    width: 100%;\r\n    height: 100%;\r\n    width: 100%;\r\n    visibility: visible;\r\n}\r\n.os-content > .os-textarea {\r\n    box-sizing: border-box !important;\r\n    direction: inherit !important;\r\n    background: transparent !important;\r\n    outline: 0px none transparent !important;\r\n    overflow: hidden !important;\r\n    position: absolute !important;\r\n    display: block !important;\r\n    top: 0 !important;\r\n    left: 0 !important;\r\n    margin: 0 !important;\r\n    border-radius: 0px !important;\r\n    float: none !important;\r\n    -webkit-filter: none !important;\r\n            filter: none !important;\r\n    border: none !important;\r\n    resize: none !important;\r\n    -webkit-transform: none !important;\r\n            transform: none !important;\r\n    max-width: none !important;\r\n    max-height: none !important;\r\n    box-shadow: none !important;\r\n    -webkit-perspective: none !important;\r\n            perspective: none !important;\r\n    opacity: 1 !important;\r\n    z-index: 1 !important;\r\n    clip: auto !important;\r\n    vertical-align: baseline !important;\r\n    padding: 0px;\r\n}\r\n.os-host-rtl > .os-padding > .os-viewport > .os-content > .os-textarea {\r\n    right: 0 !important;\r\n}\r\n.os-content > .os-textarea-cover {\r\n    z-index: -1;\r\n    pointer-events: none;\r\n}\r\n.os-content > .os-textarea[wrap='off'] {\r\n    white-space: pre !important;\r\n    margin: 0px !important;\r\n}\r\n.os-text-inherit {\r\n    font-family: inherit;\r\n    font-size: inherit;\r\n    font-weight: inherit;\r\n    font-style: inherit;\r\n    font-variant: inherit;\r\n    text-transform: inherit;\r\n    text-decoration: inherit;\r\n    text-indent: inherit;\r\n    text-align: inherit;\r\n    text-shadow: inherit;\r\n    text-overflow: inherit;\r\n    letter-spacing: inherit;\r\n    word-spacing: inherit;\r\n    line-height: inherit;\r\n    unicode-bidi: inherit;\r\n    direction: inherit;\r\n    color: inherit;\r\n    cursor: text;\r\n}\r\n.os-resize-observer,\r\n.os-resize-observer-host {\r\n    box-sizing: inherit;\r\n    display: block;\r\n    visibility: hidden;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    height: 100%;\r\n    width: 100%;\r\n    overflow: hidden;\r\n    pointer-events: none;\r\n    z-index: -1;\r\n}\r\n.os-resize-observer-host {\r\n    padding: inherit;\r\n    border: inherit;\r\n    border-color: transparent;\r\n    border-style: solid;\r\n    box-sizing: border-box;\r\n}\r\n.os-resize-observer-host.observed {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: flex-start;\r\n    align-items: flex-start;\r\n}\r\n.os-resize-observer-host > .os-resize-observer,\r\n.os-resize-observer-host.observed > .os-resize-observer {\r\n    height: 200%;\r\n    width: 200%;\r\n    padding: inherit;\r\n    border: inherit;\r\n    margin: 0;\r\n    display: block;\r\n    box-sizing: content-box;\r\n}\r\n.os-resize-observer-host.observed > .os-resize-observer,\r\n.os-resize-observer-host.observed > .os-resize-observer:before {\r\n    display: flex;\r\n    position: relative;\r\n    flex-grow: 1;\r\n    flex-shrink: 0;\r\n    flex-basis: auto;\r\n    box-sizing: border-box;\r\n}\r\n.os-resize-observer-host.observed > .os-resize-observer:before {\r\n    content: '';\r\n    box-sizing: content-box;\r\n    padding: inherit;\r\n    border: inherit;\r\n    margin: 0;\r\n}\r\n.os-size-auto-observer {\r\n    box-sizing: inherit !important;\r\n    height: 100%;\r\n    width: inherit;\r\n    max-width: 1px;\r\n    position: relative;\r\n    float: left;\r\n    max-height: 1px;\r\n    overflow: hidden;\r\n    z-index: -1;\r\n    padding: 0;\r\n    margin: 0;\r\n    pointer-events: none;\r\n    -webkit-box-flex: inherit;\r\n        -ms-flex-positive: inherit;\r\n            flex-grow: inherit;\r\n    -ms-flex-negative: 0;\r\n        flex-shrink: 0;\r\n    -ms-flex-preferred-size: 0;\r\n        flex-basis: 0;\r\n}\r\n.os-size-auto-observer > .os-resize-observer {\r\n    width: 1000%;\r\n    height: 1000%;\r\n    min-height: 1px;\r\n    min-width: 1px;\r\n}\r\n.os-resize-observer-item {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    overflow: hidden;\r\n    z-index: -1;\r\n    opacity: 0;\r\n    direction: ltr !important;\r\n    -webkit-box-flex: 0 !important;\r\n    -ms-flex: none !important;\r\n    flex: none !important;\r\n}\r\n.os-resize-observer-item-final {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    -webkit-transition: none !important;\r\n    transition: none !important;\r\n    -webkit-box-flex: 0 !important;\r\n    -ms-flex: none !important;\r\n    flex: none !important;\r\n}\r\n.os-resize-observer {\r\n    -webkit-animation-duration: 0.001s;\r\n    animation-duration: 0.001s;\r\n    -webkit-animation-name: os-resize-observer-dummy-animation;\r\n    animation-name: os-resize-observer-dummy-animation;\r\n}\r\nobject.os-resize-observer {\r\n    box-sizing: border-box !important;\r\n}\r\n@-webkit-keyframes os-resize-observer-dummy-animation {\r\n    from {\r\n        z-index: 0;\r\n    }\r\n    to {\r\n        z-index: -1;\r\n    }\r\n}\r\n@keyframes os-resize-observer-dummy-animation {\r\n    from {\r\n        z-index: 0;\r\n    }\r\n    to {\r\n        z-index: -1;\r\n    }\r\n}\r\n\r\n/*\r\nCUSTOM SCROLLBARS AND CORNER CORE:\r\n*/\r\n\r\n.os-host-transition > .os-scrollbar,\r\n.os-host-transition > .os-scrollbar-corner {\r\n    -webkit-transition: opacity 0.3s, visibility 0.3s, top 0.3s, right 0.3s, bottom 0.3s, left 0.3s;\r\n    transition: opacity 0.3s, visibility 0.3s, top 0.3s, right 0.3s, bottom 0.3s, left 0.3s;\r\n}\r\nhtml.os-html > .os-host > .os-scrollbar {\r\n    position: absolute; /* could be position: fixed; but it causes issues on iOS (-webkit-overflow-scrolling: touch) */\r\n    z-index: 999999; /* highest z-index of the page */\r\n}\r\n.os-scrollbar,\r\n.os-scrollbar-corner {\r\n    position: absolute;\r\n    opacity: 1;\r\n    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';\r\n    z-index: 1;\r\n}\r\n.os-scrollbar-corner {\r\n    bottom: 0;\r\n    right: 0;\r\n}\r\n.os-scrollbar {\r\n    pointer-events: none;\r\n}\r\n.os-scrollbar-track {\r\n    pointer-events: auto;\r\n    position: relative;\r\n    height: 100%;\r\n    width: 100%;\r\n    padding: 0 !important;\r\n    border: none !important;\r\n}\r\n.os-scrollbar-handle {\r\n    pointer-events: auto;\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n.os-scrollbar-handle-off,\r\n.os-scrollbar-track-off {\r\n    pointer-events: none;\r\n}\r\n.os-scrollbar.os-scrollbar-unusable,\r\n.os-scrollbar.os-scrollbar-unusable * {\r\n    pointer-events: none !important;\r\n}\r\n.os-scrollbar.os-scrollbar-unusable .os-scrollbar-handle {\r\n    opacity: 0 !important;\r\n}\r\n.os-scrollbar-horizontal {\r\n    bottom: 0;\r\n    left: 0;\r\n}\r\n.os-scrollbar-vertical {\r\n    top: 0;\r\n    right: 0;\r\n}\r\n.os-host-rtl > .os-scrollbar-horizontal {\r\n    right: 0;\r\n}\r\n.os-host-rtl > .os-scrollbar-vertical {\r\n    right: auto;\r\n    left: 0;\r\n}\r\n.os-host-rtl > .os-scrollbar-corner {\r\n    right: auto;\r\n    left: 0;\r\n}\r\n.os-scrollbar-auto-hidden,\r\n.os-padding + .os-scrollbar-corner,\r\n.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden > .os-scrollbar-corner,\r\n.os-host-scrollbar-horizontal-hidden > .os-scrollbar-horizontal,\r\n.os-host-resize-disabled.os-host-scrollbar-vertical-hidden > .os-scrollbar-corner,\r\n.os-host-scrollbar-vertical-hidden > .os-scrollbar-vertical,\r\n.os-scrollbar-horizontal.os-scrollbar-auto-hidden + .os-scrollbar-vertical + .os-scrollbar-corner,\r\n.os-scrollbar-horizontal + .os-scrollbar-vertical.os-scrollbar-auto-hidden + .os-scrollbar-corner,\r\n.os-scrollbar-horizontal.os-scrollbar-auto-hidden + .os-scrollbar-vertical.os-scrollbar-auto-hidden + .os-scrollbar-corner {\r\n    opacity: 0;\r\n    visibility: hidden;\r\n    pointer-events: none;\r\n}\r\n.os-scrollbar-corner-resize-both {\r\n    cursor: nwse-resize;\r\n}\r\n.os-host-rtl > .os-scrollbar-corner-resize-both {\r\n    cursor: nesw-resize;\r\n}\r\n.os-scrollbar-corner-resize-horizontal {\r\n    cursor: ew-resize;\r\n}\r\n.os-scrollbar-corner-resize-vertical {\r\n    cursor: ns-resize;\r\n}\r\n.os-dragging .os-scrollbar-corner.os-scrollbar-corner-resize {\r\n    cursor: default;\r\n}\r\n.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden > .os-scrollbar-vertical {\r\n    top: 0;\r\n    bottom: 0;\r\n}\r\n.os-host-resize-disabled.os-host-scrollbar-vertical-hidden > .os-scrollbar-horizontal,\r\n.os-host-rtl.os-host-resize-disabled.os-host-scrollbar-vertical-hidden > .os-scrollbar-horizontal {\r\n    right: 0;\r\n    left: 0;\r\n}\r\n.os-scrollbar:hover,\r\n.os-scrollbar-corner.os-scrollbar-corner-resize {\r\n    opacity: 1 !important;\r\n    visibility: visible !important;\r\n}\r\n.os-scrollbar-corner.os-scrollbar-corner-resize {\r\n    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB3aWR0aD0iMTAiICAgaGVpZ2h0PSIxMCIgICB2ZXJzaW9uPSIxLjEiPiAgPGcgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwNDIuMzYyMikiICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eTowLjQ5NDExNzY1O2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDcuNDI0MjE4NywxMDQyLjM2MjIgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjYgLTEuMzEwMTU2MiwxLjMxMDIgMCwwLjI5OSAwLjEwNDM0MTksMC41NzEgMC4yNzI5NDkyLDAuNzkxNSAwLjIwOTEwMjQsMC4xNDEzIDAuNDY1NjIwNiwwLjIxODQgMC43MzY5NjI5LDAuMjE4NCAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NiAxLjMxMDE1NjMsLTEuMzEwMiAwLC0wLjI3MTMgLTAuMDc3MDkzLC0wLjUyNzggLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0MSwtMC4xNjg2IC0wLjQ5MjU0NDMsLTAuMjcyOSAtMC43OTE1NTI4LC0wLjI3MjkgeiBtIDAsMy4wODQzIGMgLTAuNzIzNTc5MiwwIC0xLjMxMDE1NjIsMC41ODY2IC0xLjMxMDE1NjIsMS4zMTAyIDAsMC4yOTkgMC4xMDQzNDE5LDAuNTcxIDAuMjcyOTQ5MiwwLjc5MTUgMC4yMDkxMDI0LDAuMTQxMyAwLjQ2NTYyMDYsMC4yMTg0IDAuNzM2OTYyOSwwLjIxODQgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjYgMS4zMTAxNTYzLC0xLjMxMDIgMCwtMC4yNzEzIC0wLjA3NzA5MywtMC41Mjc4IC0wLjIxODM1OTQsLTAuNzM2OSAtMC4yMjA0OTQxLC0wLjE2ODYgLTAuNDkyNTQ0MywtMC4yNzMgLTAuNzkxNTUyOCwtMC4yNzMgeiBtIC0zLjA4NDMyNjEsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NiAtMS4zMTAxNTYzLDEuMzEwMiAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MSAwLjI3Mjk0OTIsMC43OTE1IDAuMjA5MTAyNCwwLjE0MTMgMC40NjU2MjA3LDAuMjE4NCAwLjczNjk2MjksMC4yMTg0IDAuNzIzNTc5MywwIDEuMzEwMTU2MywtMC41ODY2IDEuMzEwMTU2MywtMS4zMTAyIDAsLTAuMjcxMyAtMC4wNzcwOTMsLTAuNTI3OCAtMC4yMTgzNTk0LC0wLjczNjkgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzMgLTAuNzkxNTUyNywtMC4yNzMgeiBtIC0zLjAyOTczNjQsMy4wMjk4IEMgMC41ODY1NzY5MywxMDQ4LjQ3NjMgMCwxMDQ5LjA2MjggMCwxMDQ5Ljc4NjQgYyAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyMiwwLjc5MTYgMC4yMDkxMDIyOSwwLjE0MTIgMC40NjU2MjA2NSwwLjIxODMgMC43MzY5NjI4OCwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHogbSAzLjAyOTczNjQsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NSAtMS4zMTAxNTYzLDEuMzEwMSAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyLDAuNzkxNiAwLjIwOTEwMjQsMC4xNDEyIDAuNDY1NjIwNywwLjIxODMgMC43MzY5NjI5LDAuMjE4MyAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NSAxLjMxMDE1NjMsLTEuMzEwMSAwLC0wLjI3MTQgLTAuMDc3MDkzLC0wLjUyNzkgLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzI5IC0wLjc5MTU1MjcsLTAuMjcyOSB6IG0gMy4wODQzMjYxLDAgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjUgLTEuMzEwMTU2MiwxLjMxMDEgMCwwLjI5OSAwLjEwNDM0MTksMC41NzExIDAuMjcyOTQ5MiwwLjc5MTYgMC4yMDkxMDI0LDAuMTQxMiAwLjQ2NTYyMDYsMC4yMTgzIDAuNzM2OTYyOSwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHoiLz4gIDwvZz4gIDxnICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDguMjE1NzcxNSwwLjI3Mjk0OTIyIGMgMC4xNDEyNjY3LDAuMjA5MTAyMjkgMC4yMTgzNTk0LDAuNDY1NjIwNjUgMC4yMTgzNTk0LDAuNzM2OTYyODggMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDc2IC0wLjIwNTUxNzYsLTAuNzk3Nzk2NTkgLTAuNTE4NjAzNSwtMS4wMzcyMDY5OCB6IG0gMCwzLjA4NDMyNjE4IGMgMC4xNDEyNjY3LDAuMjA5MTAyMyAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MiAtMS4zMTAxNTYzLDEuMzEwMTU2MiAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTkzIDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAtMy4wODQzMjYyLDAgYyAwLjE0MTI2NjcsMC4yMDkxMDIzIDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYyIC0xLjMxMDE1NjMsMS4zMTAxNTYyIC0wLjI3MTM0MjIsMCAtMC41Mjc4NjA1LC0wLjA3NzA5MyAtMC43MzY5NjI5LC0wLjIxODM1OTMgMC4yMzk0MTA0LDAuMzEzMDg1OSAwLjYxMjYzNjMsMC41MTg2MDM1IDEuMDM3MjA3MSwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYyLC0wLjU4NjU3NyAxLjMxMDE1NjIsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NSwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogTSAyLjEwMTcwOSw2LjM4NzAxMTcgYyAwLjE0MTI2NjcsMC4yMDkxMDI0IDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYzIC0xLjMxMDE1NjMsMS4zMTAxNTYzIC0wLjI3MTM0MjIzLDAgLTAuNTI3ODYwNTksLTAuMDc3MDkzIC0wLjczNjk2Mjg4LC0wLjIxODM1OTQgMC4yMzk0MTAzOSwwLjMxMzA4NTkgMC42MTI2MzYyMiwwLjUxODYwMzUgMS4wMzcyMDY5OCwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAzLjAyOTczNjMsMCBjIDAuMTQxMjY2NywwLjIwOTEwMjQgMC4yMTgzNTk0LDAuNDY1NjIwNiAwLjIxODM1OTQsMC43MzY5NjI5IDAsMC43MjM1NzkzIC0wLjU4NjU3NywxLjMxMDE1NjMgLTEuMzEwMTU2MywxLjMxMDE1NjMgLTAuMjcxMzQyMiwwIC0wLjUyNzg2MDUsLTAuMDc3MDkzIC0wLjczNjk2MjksLTAuMjE4MzU5NCAwLjIzOTQxMDQsMC4zMTMwODU5IDAuNjEyNjM2MywwLjUxODYwMzUgMS4wMzcyMDcxLDAuNTE4NjAzNSAwLjcyMzU3OTMsMCAxLjMxMDE1NjIsLTAuNTg2NTc3IDEuMzEwMTU2MiwtMS4zMTAxNTYzIDAsLTAuNDI0NTcwOCAtMC4yMDU1MTc1LC0wLjc5Nzc5NjYgLTAuNTE4NjAzNSwtMS4wMzcyMDcgeiBtIDMuMDg0MzI2MiwwIGMgMC4xNDEyNjY3LDAuMjA5MTAyNCAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHoiIC8+ICA8L2c+PC9zdmc+);\r\n    background-repeat: no-repeat;\r\n    background-position: 100% 100%;\r\n    pointer-events: auto !important;\r\n}\r\n.os-host-rtl > .os-scrollbar-corner.os-scrollbar-corner-resize {\r\n    -webkit-transform: scale(-1, 1);\r\n    transform: scale(-1, 1);\r\n}\r\n.os-host-overflow {\r\n    overflow: hidden !important;\r\n}\r\n.os-host-overflow-x {\r\n}\r\n.os-host-overflow-y {\r\n}\r\n\r\n/*\r\nTHEMES:\r\n*/\r\n\r\n/* NONE THEME: */\r\n.os-theme-none > .os-scrollbar-horizontal,\r\n.os-theme-none > .os-scrollbar-vertical,\r\n.os-theme-none > .os-scrollbar-corner {\r\n    display: none !important;\r\n}\r\n.os-theme-none > .os-scrollbar-corner-resize {\r\n    display: block !important;\r\n    min-width: 10px;\r\n    min-height: 10px;\r\n}\r\n/* DARK & LIGHT THEME: */\r\n.os-theme-dark > .os-scrollbar-horizontal,\r\n.os-theme-light > .os-scrollbar-horizontal {\r\n    right: 10px;\r\n    height: 10px;\r\n}\r\n.os-theme-dark > .os-scrollbar-vertical,\r\n.os-theme-light > .os-scrollbar-vertical {\r\n    bottom: 10px;\r\n    width: 10px;\r\n}\r\n.os-theme-dark.os-host-rtl > .os-scrollbar-horizontal,\r\n.os-theme-light.os-host-rtl > .os-scrollbar-horizontal {\r\n    left: 10px;\r\n    right: 0;\r\n}\r\n.os-theme-dark > .os-scrollbar-corner,\r\n.os-theme-light > .os-scrollbar-corner {\r\n    height: 10px;\r\n    width: 10px;\r\n}\r\n.os-theme-dark > .os-scrollbar-corner,\r\n.os-theme-light > .os-scrollbar-corner {\r\n    background-color: transparent;\r\n}\r\n.os-theme-dark > .os-scrollbar,\r\n.os-theme-light > .os-scrollbar {\r\n    padding: 2px;\r\n    box-sizing: border-box;\r\n    background: transparent;\r\n}\r\n.os-theme-dark > .os-scrollbar.os-scrollbar-unusable,\r\n.os-theme-light > .os-scrollbar.os-scrollbar-unusable {\r\n    background: transparent;\r\n}\r\n.os-theme-dark > .os-scrollbar > .os-scrollbar-track,\r\n.os-theme-light > .os-scrollbar > .os-scrollbar-track {\r\n    background: transparent;\r\n}\r\n.os-theme-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle,\r\n.os-theme-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {\r\n    min-width: 30px;\r\n}\r\n.os-theme-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle,\r\n.os-theme-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {\r\n    min-height: 30px;\r\n}\r\n.os-theme-dark.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle,\r\n.os-theme-light.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {\r\n    -webkit-transition: background-color 0.3s;\r\n    transition: background-color 0.3s;\r\n}\r\n.os-theme-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle,\r\n.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle,\r\n.os-theme-dark > .os-scrollbar > .os-scrollbar-track,\r\n.os-theme-light > .os-scrollbar > .os-scrollbar-track {\r\n    border-radius: 10px;\r\n}\r\n.os-theme-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: rgba(0, 0, 0, 0.4);\r\n}\r\n.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: rgba(255, 255, 255, 0.4);\r\n}\r\n.os-theme-dark > .os-scrollbar:hover > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: rgba(0, 0, 0, .55);\r\n}\r\n.os-theme-light > .os-scrollbar:hover > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: rgba(255, 255, 255, .55);\r\n}\r\n.os-theme-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active {\r\n    background: rgba(0, 0, 0, .7);\r\n}\r\n.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active {\r\n    background: rgba(255, 255, 255, .7);\r\n}\r\n.os-theme-dark > .os-scrollbar-horizontal .os-scrollbar-handle:before,\r\n.os-theme-dark > .os-scrollbar-vertical .os-scrollbar-handle:before,\r\n.os-theme-light > .os-scrollbar-horizontal .os-scrollbar-handle:before,\r\n.os-theme-light > .os-scrollbar-vertical .os-scrollbar-handle:before {\r\n    content: '';\r\n    position: absolute;\r\n    left: 0;\r\n    right: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n    display: block;\r\n}\r\n.os-theme-dark.os-host-scrollbar-horizontal-hidden > .os-scrollbar-horizontal .os-scrollbar-handle:before,\r\n.os-theme-dark.os-host-scrollbar-vertical-hidden > .os-scrollbar-vertical .os-scrollbar-handle:before,\r\n.os-theme-light.os-host-scrollbar-horizontal-hidden > .os-scrollbar-horizontal .os-scrollbar-handle:before,\r\n.os-theme-light.os-host-scrollbar-vertical-hidden > .os-scrollbar-vertical .os-scrollbar-handle:before {\r\n    display: none;\r\n}\r\n.os-theme-dark > .os-scrollbar-horizontal .os-scrollbar-handle:before,\r\n.os-theme-light > .os-scrollbar-horizontal .os-scrollbar-handle:before {\r\n    top: -6px;\r\n    bottom: -2px;\r\n}\r\n.os-theme-dark > .os-scrollbar-vertical .os-scrollbar-handle:before,\r\n.os-theme-light > .os-scrollbar-vertical .os-scrollbar-handle:before {\r\n    left: -6px;\r\n    right: -2px;\r\n}\r\n.os-host-rtl.os-theme-dark > .os-scrollbar-vertical .os-scrollbar-handle:before,\r\n.os-host-rtl.os-theme-light > .os-scrollbar-vertical .os-scrollbar-handle:before {\r\n    right: -6px;\r\n    left: -2px;\r\n}\r\n\r\n\r\n/*\r\nos-theme-round-light\r\n*/\r\n\r\n.os-theme-round-light > .os-scrollbar {\r\n    padding: 0;\r\n}\r\n.os-theme-round-light > .os-scrollbar-horizontal {\r\n    right: 20px;\r\n    height: 20px;\r\n}\r\n.os-theme-round-light > .os-scrollbar-vertical {\r\n    bottom: 20px;\r\n    width: 20px;\r\n}\r\n.os-theme-round-light.os-host-rtl > .os-scrollbar-horizontal {\r\n    left: 20px;\r\n    right: 0;\r\n}\r\n.os-theme-round-light > .os-scrollbar-corner {\r\n    height: 20px;\r\n    width: 20px;\r\n    background-color: transparent;\r\n}\r\n.os-theme-round-light > .os-scrollbar > .os-scrollbar-track {\r\n    background: transparent;\r\n}\r\n.os-theme-round-light > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-round-light > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(255, 255, 255, 0.15);\r\n}\r\n.os-theme-round-light > .os-scrollbar-horizontal > .os-scrollbar-track:before {\r\n    left: 3px;\r\n    right: 3px;\r\n    height: 2px;\r\n    top: 50%;\r\n    margin-top: -1px;\r\n}\r\n.os-theme-round-light > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    top: 3px;\r\n    bottom: 3px;\r\n    width: 2px;\r\n    left: 50%;\r\n    margin-left: -1px;\r\n}\r\n.os-theme-round-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: transparent;\r\n}\r\n.os-theme-round-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: #fff;\r\n    border-radius: 100%;\r\n    top: 3px;\r\n    bottom: 3px;\r\n    left: 3px;\r\n    right: 3px;\r\n    transform: scale(1);\r\n}\r\n.os-theme-round-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-round-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    transform: scale(1.3);\r\n}\r\n.os-theme-round-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {\r\n    height: 100%;\r\n    min-width: 20px;\r\n    max-width: 20px;\r\n}\r\n.os-theme-round-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {\r\n    width: 100%;\r\n    min-height: 20px;\r\n    max-height: 20px;\r\n}\r\n.os-theme-round-light.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: transform 0.3s;\r\n}\r\n\r\n/*\r\nos-theme-round-dark\r\n*/\r\n\r\n.os-theme-round-dark > .os-scrollbar {\r\n    padding: 0;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-horizontal {\r\n    right: 20px;\r\n    height: 20px;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-vertical {\r\n    bottom: 20px;\r\n    width: 20px;\r\n}\r\n.os-theme-round-dark.os-host-rtl > .os-scrollbar-horizontal {\r\n    left: 20px;\r\n    right: 0;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-corner {\r\n    height: 20px;\r\n    width: 20px;\r\n    background-color: transparent;\r\n}\r\n.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track {\r\n    background: transparent;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-round-dark > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(0, 0, 0, 0.15);\r\n}\r\n.os-theme-round-dark > .os-scrollbar-horizontal > .os-scrollbar-track:before {\r\n    left: 3px;\r\n    right: 3px;\r\n    height: 2px;\r\n    top: 50%;\r\n    margin-top: -1px;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    top: 3px;\r\n    bottom: 3px;\r\n    width: 2px;\r\n    left: 50%;\r\n    margin-left: -1px;\r\n}\r\n.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {\r\n    background: transparent;\r\n}\r\n.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: #000;\r\n    border-radius: 100%;\r\n    top: 3px;\r\n    bottom: 3px;\r\n    left: 3px;\r\n    right: 3px;\r\n    transform: scale(1);\r\n}\r\n.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-round-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    transform: scale(1.3);\r\n}\r\n.os-theme-round-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {\r\n    height: 100%;\r\n    min-width: 20px;\r\n    max-width: 20px;\r\n}\r\n.os-theme-round-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {\r\n    width: 100%;\r\n    min-height: 20px;\r\n    max-height: 20px;\r\n}\r\n.os-theme-round-dark.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: transform 0.3s;\r\n}\r\n\r\n/*\r\nos-theme-thin-dark\r\n*/\r\n\r\n.os-theme-thin-dark > .os-scrollbar-horizontal {\r\n    right: 14px;\r\n    height: 14px;\r\n    padding: 0px 6px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-vertical {\r\n    bottom: 14px;\r\n    width: 14px;\r\n    padding: 6px 0px;\r\n}\r\n.os-theme-thin-dark.os-host-rtl > .os-scrollbar-horizontal {\r\n    left: 14px;\r\n    right: 0;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-corner {\r\n    height: 14px;\r\n    width: 14px;\r\n    background-color: transparent;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar > .os-scrollbar-track {\r\n    background: transparent;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(0, 0, 0, 0.15);\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    left: 0;\r\n    right: 0;\r\n    height: 2px;\r\n    top: 50%;\r\n    margin-top: -1px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track:before,\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    top: 0;\r\n    bottom: 0;\r\n    width: 2px;\r\n    left: 50%;\r\n    margin-left: -1px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(0, 0, 0, 0.5);\r\n    border-radius: 10px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    height: 4px;\r\n    margin-top: -2px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    width: 4px;\r\n    margin-left: -2px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:hover:before {\r\n    background: rgba(0, 0, 0, 0.7);\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle.active:before,\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    background: #000;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {\r\n    height: 100%;\r\n    min-width: 30px;\r\n}\r\n.os-theme-thin-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {\r\n    width: 100%;\r\n    min-height: 30px;\r\n}\r\n.os-theme-thin-dark.os-host-transition > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: height 0.3s, margin-top 0.3s, background 0.2s;\r\n}\r\n.os-theme-thin-dark.os-host-transition > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: width 0.3s, margin-left 0.3s, background 0.2s;\r\n}\r\n\r\n/*\r\nos-theme-thin-light\r\n*/\r\n\r\n.os-theme-thin-light > .os-scrollbar-horizontal {\r\n    right: 14px;\r\n    height: 14px;\r\n    padding: 0px 6px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-vertical {\r\n    bottom: 14px;\r\n    width: 14px;\r\n    padding: 6px 0px;\r\n}\r\n.os-theme-thin-light.os-host-rtl > .os-scrollbar-horizontal {\r\n    left: 14px;\r\n    right: 0;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-corner {\r\n    height: 14px;\r\n    width: 14px;\r\n    background-color: transparent;\r\n}\r\n.os-theme-thin-light > .os-scrollbar > .os-scrollbar-track {\r\n    background: transparent;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(255, 255, 255, 0.15);\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track:before,\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    left: 0;\r\n    right: 0;\r\n    height: 2px;\r\n    top: 50%;\r\n    margin-top: -1px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track:before,\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    top: 0;\r\n    bottom: 0;\r\n    width: 2px;\r\n    left: 50%;\r\n    margin-left: -1px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    content: '';\r\n    display: block;\r\n    position: absolute;\r\n    background: rgba(255, 255, 255, 0.5);\r\n    border-radius: 10px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    height: 4px;\r\n    margin-top: -2px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    width: 4px;\r\n    margin-left: -2px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:hover:before,\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:hover:before {\r\n    background: rgba(255, 255, 255, 0.7);\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle.active:before,\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle.active:before {\r\n    background: #fff;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {\r\n    height: 100%;\r\n    min-width: 30px;\r\n}\r\n.os-theme-thin-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {\r\n    width: 100%;\r\n    min-height: 30px;\r\n}\r\n.os-theme-thin-light.os-host-transition > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: height 0.3s, margin-top 0.3s, background 0.2s;\r\n}\r\n.os-theme-thin-light.os-host-transition > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle:before {\r\n    transition: width 0.3s, margin-left 0.3s, background 0.2s;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/scss/shidashi.scss":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/scss/shidashi.scss ***!
  \*****************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/OverlayScrollbars.css":
/*!***************************************!*\
  !*** ./src/css/OverlayScrollbars.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_OverlayScrollbars_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./OverlayScrollbars.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/OverlayScrollbars.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_OverlayScrollbars_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_OverlayScrollbars_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_OverlayScrollbars_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_OverlayScrollbars_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/scss/shidashi.scss":
/*!********************************!*\
  !*** ./src/scss/shidashi.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_shidashi_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/sass-loader/dist/cjs.js!./shidashi.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/scss/shidashi.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_shidashi_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_shidashi_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_shidashi_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_shidashi_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/js/AdminLTE/AdminLTE.js":
/*!*************************************!*\
  !*** ./src/js/AdminLTE/AdminLTE.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardRefresh": () => (/* reexport safe */ _CardRefresh__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "CardWidget": () => (/* reexport safe */ _CardWidget__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "ControlSidebar": () => (/* reexport safe */ _ControlSidebar__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "DirectChat": () => (/* reexport safe */ _DirectChat__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Dropdown": () => (/* reexport safe */ _Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "ExpandableTable": () => (/* reexport safe */ _ExpandableTable__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "Fullscreen": () => (/* reexport safe */ _Fullscreen__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "IFrame": () => (/* reexport safe */ _IFrame__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "Layout": () => (/* reexport safe */ _Layout__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "NavbarSearch": () => (/* reexport safe */ _NavbarSearch__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   "PushMenu": () => (/* reexport safe */ _PushMenu__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "SidebarSearch": () => (/* reexport safe */ _SidebarSearch__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "Toasts": () => (/* reexport safe */ _Toasts__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   "TodoList": () => (/* reexport safe */ _TodoList__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "Treeview": () => (/* reexport safe */ _Treeview__WEBPACK_IMPORTED_MODULE_14__["default"])
/* harmony export */ });
/* harmony import */ var _CardRefresh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardRefresh */ "./src/js/AdminLTE/CardRefresh.js");
/* harmony import */ var _CardWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardWidget */ "./src/js/AdminLTE/CardWidget.js");
/* harmony import */ var _ControlSidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ControlSidebar */ "./src/js/AdminLTE/ControlSidebar.js");
/* harmony import */ var _DirectChat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DirectChat */ "./src/js/AdminLTE/DirectChat.js");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Dropdown */ "./src/js/AdminLTE/Dropdown.js");
/* harmony import */ var _ExpandableTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ExpandableTable */ "./src/js/AdminLTE/ExpandableTable.js");
/* harmony import */ var _Fullscreen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Fullscreen */ "./src/js/AdminLTE/Fullscreen.js");
/* harmony import */ var _IFrame__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./IFrame */ "./src/js/AdminLTE/IFrame.js");
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Layout */ "./src/js/AdminLTE/Layout.js");
/* harmony import */ var _PushMenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PushMenu */ "./src/js/AdminLTE/PushMenu.js");
/* harmony import */ var _SidebarSearch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SidebarSearch */ "./src/js/AdminLTE/SidebarSearch.js");
/* harmony import */ var _NavbarSearch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./NavbarSearch */ "./src/js/AdminLTE/NavbarSearch.js");
/* harmony import */ var _Toasts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Toasts */ "./src/js/AdminLTE/Toasts.js");
/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./TodoList */ "./src/js/AdminLTE/TodoList.js");
/* harmony import */ var _Treeview__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Treeview */ "./src/js/AdminLTE/Treeview.js");



















/***/ }),

/***/ "./src/js/AdminLTE/CardRefresh.js":
/*!****************************************!*\
  !*** ./src/js/AdminLTE/CardRefresh.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE CardRefresh.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'CardRefresh'
const DATA_KEY = 'lte.cardrefresh'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const EVENT_LOADED = `loaded${EVENT_KEY}`
const EVENT_OVERLAY_ADDED = `overlay.added${EVENT_KEY}`
const EVENT_OVERLAY_REMOVED = `overlay.removed${EVENT_KEY}`

const CLASS_NAME_CARD = 'card'

const SELECTOR_CARD = `.${CLASS_NAME_CARD}`
const SELECTOR_DATA_REFRESH = '[data-card-widget="card-refresh"]'

const Default = {
  source: '',
  sourceSelector: '',
  params: {},
  trigger: SELECTOR_DATA_REFRESH,
  content: '.card-body',
  loadInContent: true,
  loadOnInit: true,
  loadErrorTemplate: true,
  responseType: '',
  overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
  errorTemplate: '<span class="text-danger"></span>',
  onLoadStart() {},
  onLoadDone(response) {
    return response
  },
  onLoadFail(_jqXHR, _textStatus, _errorThrown) {}
}

class CardRefresh {
  constructor(element, settings) {
    this._element = element
    this._parent = element.parents(SELECTOR_CARD).first()
    this._settings = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, settings)
    this._overlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._settings.overlayTemplate)

    if (element.hasClass(CLASS_NAME_CARD)) {
      this._parent = element
    }

    if (this._settings.source === '') {
      throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.')
    }
  }

  load() {
    this._addOverlay()
    this._settings.onLoadStart.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this))

    jquery__WEBPACK_IMPORTED_MODULE_0___default().get(this._settings.source, this._settings.params, response => {
      if (this._settings.loadInContent) {
        if (this._settings.sourceSelector !== '') {
          response = jquery__WEBPACK_IMPORTED_MODULE_0___default()(response).find(this._settings.sourceSelector).html()
        }

        this._parent.find(this._settings.content).html(response)
      }

      this._settings.onLoadDone.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), response)
      this._removeOverlay()
    }, this._settings.responseType !== '' && this._settings.responseType)
    .fail((jqXHR, textStatus, errorThrown) => {
      this._removeOverlay()

      if (this._settings.loadErrorTemplate) {
        const msg = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._settings.errorTemplate).text(errorThrown)
        this._parent.find(this._settings.content).empty().append(msg)
      }

      this._settings.onLoadFail.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), jqXHR, textStatus, errorThrown)
    })

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_LOADED))
  }

  _addOverlay() {
    this._parent.append(this._overlay)
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_OVERLAY_ADDED))
  }

  _removeOverlay() {
    this._parent.find(this._overlay).remove()
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_OVERLAY_REMOVED))
  }

  // Private

  _init() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find(this._settings.trigger).on('click', () => {
      this.load()
    })

    if (this._settings.loadOnInit) {
      this.load()
    }
  }

  // Static

  static _jQueryInterface(config) {
    let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)
    const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data())

    if (!data) {
      data = new CardRefresh(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), _options)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, typeof config === 'string' ? data : config)
    }

    if (typeof config === 'string' && /load/.test(config)) {
      data[config]()
    } else {
      data._init(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this))
    }
  }
}

/**
 * Data API
 * ====================================================
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_DATA_REFRESH, function (event) {
  if (event) {
    event.preventDefault()
  }

  CardRefresh._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'load')
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_REFRESH).each(function () {
    CardRefresh._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = CardRefresh._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = CardRefresh
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return CardRefresh._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardRefresh);


/***/ }),

/***/ "./src/js/AdminLTE/CardWidget.js":
/*!***************************************!*\
  !*** ./src/js/AdminLTE/CardWidget.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE CardWidget.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'CardWidget'
const DATA_KEY = 'lte.cardwidget'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`
const EVENT_MAXIMIZED = `maximized${EVENT_KEY}`
const EVENT_MINIMIZED = `minimized${EVENT_KEY}`
const EVENT_REMOVED = `removed${EVENT_KEY}`

const CLASS_NAME_CARD = 'card'
const CLASS_NAME_COLLAPSED = 'collapsed-card'
const CLASS_NAME_COLLAPSING = 'collapsing-card'
const CLASS_NAME_EXPANDING = 'expanding-card'
const CLASS_NAME_WAS_COLLAPSED = 'was-collapsed'
const CLASS_NAME_MAXIMIZED = 'maximized-card'

const SELECTOR_DATA_REMOVE = '[data-card-widget="remove"]'
const SELECTOR_DATA_COLLAPSE = '[data-card-widget="collapse"]'
const SELECTOR_DATA_MAXIMIZE = '[data-card-widget="maximize"]'
const SELECTOR_CARD = `.${CLASS_NAME_CARD}`
const SELECTOR_CARD_HEADER = '.card-header'
const SELECTOR_CARD_BODY = '.card-body'
const SELECTOR_CARD_FOOTER = '.card-footer'

const Default = {
  animationSpeed: 'normal',
  collapseTrigger: SELECTOR_DATA_COLLAPSE,
  removeTrigger: SELECTOR_DATA_REMOVE,
  maximizeTrigger: SELECTOR_DATA_MAXIMIZE,
  collapseIcon: 'fa-minus',
  expandIcon: 'fa-plus',
  maximizeIcon: 'fa-expand',
  minimizeIcon: 'fa-compress'
}

class CardWidget {
  constructor(element, settings) {
    this._element = element
    this._parent = element.parents(SELECTOR_CARD).first()

    if (element.hasClass(CLASS_NAME_CARD)) {
      this._parent = element
    }

    this._settings = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, settings)
  }

  collapse() {
    this._parent.addClass(CLASS_NAME_COLLAPSING).children(`${SELECTOR_CARD_BODY}, ${SELECTOR_CARD_FOOTER}`)
      .slideUp(this._settings.animationSpeed, () => {
        this._parent.addClass(CLASS_NAME_COLLAPSED).removeClass(CLASS_NAME_COLLAPSING)
      })

    this._parent.find(`> ${SELECTOR_CARD_HEADER} ${this._settings.collapseTrigger} .${this._settings.collapseIcon}`)
      .addClass(this._settings.expandIcon)
      .removeClass(this._settings.collapseIcon)

    this._element.trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_COLLAPSED), this._parent)
  }

  expand() {
    this._parent.addClass(CLASS_NAME_EXPANDING).children(`${SELECTOR_CARD_BODY}, ${SELECTOR_CARD_FOOTER}`)
      .slideDown(this._settings.animationSpeed, () => {
        this._parent.removeClass(CLASS_NAME_COLLAPSED).removeClass(CLASS_NAME_EXPANDING)
      })

    this._parent.find(`> ${SELECTOR_CARD_HEADER} ${this._settings.collapseTrigger} .${this._settings.expandIcon}`)
      .addClass(this._settings.collapseIcon)
      .removeClass(this._settings.expandIcon)

    this._element.trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_EXPANDED), this._parent)
  }

  remove() {
    this._parent.slideUp()
    this._element.trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_REMOVED), this._parent)
  }

  toggle() {
    if (this._parent.hasClass(CLASS_NAME_COLLAPSED)) {
      this.expand()
      return
    }

    this.collapse()
  }

  maximize() {
    this._parent.find(`${this._settings.maximizeTrigger} .${this._settings.maximizeIcon}`)
      .addClass(this._settings.minimizeIcon)
      .removeClass(this._settings.maximizeIcon)
    this._parent.css({
      height: this._parent.height(),
      width: this._parent.width(),
      transition: 'all .15s'
    }).delay(150).queue(function () {
      const $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)

      $element.addClass(CLASS_NAME_MAXIMIZED)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').addClass(CLASS_NAME_MAXIMIZED)
      if ($element.hasClass(CLASS_NAME_COLLAPSED)) {
        $element.addClass(CLASS_NAME_WAS_COLLAPSED)
      }

      $element.dequeue()
    })

    this._element.trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_MAXIMIZED), this._parent)
  }

  minimize() {
    this._parent.find(`${this._settings.maximizeTrigger} .${this._settings.minimizeIcon}`)
      .addClass(this._settings.maximizeIcon)
      .removeClass(this._settings.minimizeIcon)
    this._parent.css('cssText', `height: ${this._parent[0].style.height} !important; width: ${this._parent[0].style.width} !important; transition: all .15s;`
    ).delay(10).queue(function () {
      const $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)

      $element.removeClass(CLASS_NAME_MAXIMIZED)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').removeClass(CLASS_NAME_MAXIMIZED)
      $element.css({
        height: 'inherit',
        width: 'inherit'
      })
      if ($element.hasClass(CLASS_NAME_WAS_COLLAPSED)) {
        $element.removeClass(CLASS_NAME_WAS_COLLAPSED)
      }

      $element.dequeue()
    })

    this._element.trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_MINIMIZED), this._parent)
  }

  toggleMaximize() {
    if (this._parent.hasClass(CLASS_NAME_MAXIMIZED)) {
      this.minimize()
      return
    }

    this.maximize()
  }

  // Private

  _init(card) {
    this._parent = card

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find(this._settings.collapseTrigger).click(() => {
      this.toggle()
    })

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find(this._settings.maximizeTrigger).click(() => {
      this.toggleMaximize()
    })

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find(this._settings.removeTrigger).click(() => {
      this.remove()
    })
  }

  // Static

  static _jQueryInterface(config) {
    let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)
    const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data())

    if (!data) {
      data = new CardWidget(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), _options)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, typeof config === 'string' ? data : config)
    }

    if (typeof config === 'string' && /collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/.test(config)) {
      data[config]()
    } else if (typeof config === 'object') {
      data._init(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this))
    }
  }
}

/**
 * Data API
 * ====================================================
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_DATA_COLLAPSE, function (event) {
  if (event) {
    event.preventDefault()
  }

  CardWidget._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'toggle')
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_DATA_REMOVE, function (event) {
  if (event) {
    event.preventDefault()
  }

  CardWidget._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'remove')
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_DATA_MAXIMIZE, function (event) {
  if (event) {
    event.preventDefault()
  }

  CardWidget._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'toggleMaximize')
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = CardWidget._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = CardWidget
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return CardWidget._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardWidget);


/***/ }),

/***/ "./src/js/AdminLTE/ControlSidebar.js":
/*!*******************************************!*\
  !*** ./src/js/AdminLTE/ControlSidebar.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE ControlSidebar.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'ControlSidebar'
const DATA_KEY = 'lte.controlsidebar'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`
const EVENT_COLLAPSED_DONE = `collapsed-done${EVENT_KEY}`
const EVENT_EXPANDED = `expanded${EVENT_KEY}`

const SELECTOR_CONTROL_SIDEBAR = '.control-sidebar'
const SELECTOR_CONTROL_SIDEBAR_CONTENT = '.control-sidebar-content'
const SELECTOR_DATA_TOGGLE = '[data-widget="control-sidebar"]'
const SELECTOR_HEADER = '.main-header'
const SELECTOR_FOOTER = '.main-footer'

const CLASS_NAME_CONTROL_SIDEBAR_ANIMATE = 'control-sidebar-animate'
const CLASS_NAME_CONTROL_SIDEBAR_OPEN = 'control-sidebar-open'
const CLASS_NAME_CONTROL_SIDEBAR_SLIDE = 'control-sidebar-slide-open'
const CLASS_NAME_LAYOUT_FIXED = 'layout-fixed'
const CLASS_NAME_NAVBAR_FIXED = 'layout-navbar-fixed'
const CLASS_NAME_NAVBAR_SM_FIXED = 'layout-sm-navbar-fixed'
const CLASS_NAME_NAVBAR_MD_FIXED = 'layout-md-navbar-fixed'
const CLASS_NAME_NAVBAR_LG_FIXED = 'layout-lg-navbar-fixed'
const CLASS_NAME_NAVBAR_XL_FIXED = 'layout-xl-navbar-fixed'
const CLASS_NAME_FOOTER_FIXED = 'layout-footer-fixed'
const CLASS_NAME_FOOTER_SM_FIXED = 'layout-sm-footer-fixed'
const CLASS_NAME_FOOTER_MD_FIXED = 'layout-md-footer-fixed'
const CLASS_NAME_FOOTER_LG_FIXED = 'layout-lg-footer-fixed'
const CLASS_NAME_FOOTER_XL_FIXED = 'layout-xl-footer-fixed'

const Default = {
  controlsidebarSlide: true,
  scrollbarTheme: 'os-theme-light',
  scrollbarAutoHide: 'l',
  target: SELECTOR_CONTROL_SIDEBAR,
  animationSpeed: 300
}

/**
 * Class Definition
 * ====================================================
 */

class ControlSidebar {
  constructor(element, config) {
    this._element = element
    this._config = config
  }

  // Public

  collapse() {
    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
    const $html = jquery__WEBPACK_IMPORTED_MODULE_0___default()('html')

    // Show the control sidebar
    if (this._config.controlsidebarSlide) {
      $html.addClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
      $body.removeClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTROL_SIDEBAR).hide()
        $html.removeClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).dequeue()
      })
    } else {
      $body.removeClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN)
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_COLLAPSED))

    setTimeout(() => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_COLLAPSED_DONE))
    }, this._config.animationSpeed)
  }

  show(toggle = false) {
    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
    const $html = jquery__WEBPACK_IMPORTED_MODULE_0___default()('html')

    if (toggle) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTROL_SIDEBAR).hide()
    }

    // Collapse the control sidebar
    if (this._config.controlsidebarSlide) {
      $html.addClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._config.target).show().delay(10).queue(function () {
        $body.addClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
          $html.removeClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE)
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).dequeue()
        })
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).dequeue()
      })
    } else {
      $body.addClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN)
    }

    this._fixHeight()
    this._fixScrollHeight()

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_EXPANDED))
  }

  toggle() {
    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
    const { target } = this._config

    const notVisible = !jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).is(':visible')
    const shouldClose = ($body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) ||
      $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE))
    const shouldToggle = notVisible && ($body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) ||
      $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE))

    if (notVisible || shouldToggle) {
      // Open the control sidebar
      this.show(notVisible)
    } else if (shouldClose) {
      // Close the control sidebar
      this.collapse()
    }
  }

  // Private

  _init() {
    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
    const shouldNotHideAll = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) ||
        $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE)

    if (shouldNotHideAll) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTROL_SIDEBAR).not(this._config.target).hide()
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._config.target).css('display', 'block')
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTROL_SIDEBAR).hide()
    }

    this._fixHeight()
    this._fixScrollHeight()

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).resize(() => {
      this._fixHeight()
      this._fixScrollHeight()
    })

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scroll(() => {
      const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
      const shouldFixHeight = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) ||
          $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE)

      if (shouldFixHeight) {
        this._fixScrollHeight()
      }
    })
  }

  _isNavbarFixed() {
    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
    return (
      $body.hasClass(CLASS_NAME_NAVBAR_FIXED) ||
        $body.hasClass(CLASS_NAME_NAVBAR_SM_FIXED) ||
        $body.hasClass(CLASS_NAME_NAVBAR_MD_FIXED) ||
        $body.hasClass(CLASS_NAME_NAVBAR_LG_FIXED) ||
        $body.hasClass(CLASS_NAME_NAVBAR_XL_FIXED)
    )
  }

  _isFooterFixed() {
    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
    return (
      $body.hasClass(CLASS_NAME_FOOTER_FIXED) ||
        $body.hasClass(CLASS_NAME_FOOTER_SM_FIXED) ||
        $body.hasClass(CLASS_NAME_FOOTER_MD_FIXED) ||
        $body.hasClass(CLASS_NAME_FOOTER_LG_FIXED) ||
        $body.hasClass(CLASS_NAME_FOOTER_XL_FIXED)
    )
  }

  _fixScrollHeight() {
    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
    const $controlSidebar = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._config.target)

    if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
      return
    }

    const heights = {
      scroll: jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height(),
      window: jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height(),
      header: jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_HEADER).outerHeight(),
      footer: jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_FOOTER).outerHeight()
    }
    const positions = {
      bottom: Math.abs((heights.window + jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop()) - heights.scroll),
      top: jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop()
    }

    const navbarFixed = this._isNavbarFixed() && jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_HEADER).css('position') === 'fixed'

    const footerFixed = this._isFooterFixed() && jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_FOOTER).css('position') === 'fixed'

    const $controlsidebarContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${this._config.target}, ${this._config.target} ${SELECTOR_CONTROL_SIDEBAR_CONTENT}`)

    if (positions.top === 0 && positions.bottom === 0) {
      $controlSidebar.css({
        bottom: heights.footer,
        top: heights.header
      })
      $controlsidebarContent.css('height', heights.window - (heights.header + heights.footer))
    } else if (positions.bottom <= heights.footer) {
      if (footerFixed === false) {
        const top = heights.header - positions.top
        $controlSidebar.css('bottom', heights.footer - positions.bottom).css('top', top >= 0 ? top : 0)
        $controlsidebarContent.css('height', heights.window - (heights.footer - positions.bottom))
      } else {
        $controlSidebar.css('bottom', heights.footer)
      }
    } else if (positions.top <= heights.header) {
      if (navbarFixed === false) {
        $controlSidebar.css('top', heights.header - positions.top)
        $controlsidebarContent.css('height', heights.window - (heights.header - positions.top))
      } else {
        $controlSidebar.css('top', heights.header)
      }
    } else if (navbarFixed === false) {
      $controlSidebar.css('top', 0)
      $controlsidebarContent.css('height', heights.window)
    } else {
      $controlSidebar.css('top', heights.header)
    }

    if (footerFixed && navbarFixed) {
      $controlsidebarContent.css('height', '100%')
      $controlSidebar.css('height', '')
    } else if (footerFixed || navbarFixed) {
      $controlsidebarContent.css('height', '100%')
      $controlsidebarContent.css('height', '')
    }
  }

  _fixHeight() {
    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
    const $controlSidebar = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${this._config.target} ${SELECTOR_CONTROL_SIDEBAR_CONTENT}`)

    if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
      $controlSidebar.attr('style', '')
      return
    }

    const heights = {
      window: jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height(),
      header: jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_HEADER).outerHeight(),
      footer: jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_FOOTER).outerHeight()
    }

    let sidebarHeight = heights.window - heights.header

    if (this._isFooterFixed() && jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_FOOTER).css('position') === 'fixed') {
      sidebarHeight = heights.window - heights.header - heights.footer
    }

    $controlSidebar.css('height', sidebarHeight)

    if (typeof (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn.overlayScrollbars) !== 'undefined') {
      $controlSidebar.overlayScrollbars({
        className: this._config.scrollbarTheme,
        sizeAutoCapable: true,
        scrollbars: {
          autoHide: this._config.scrollbarAutoHide,
          clickScrolling: true
        }
      })
    }
  }

  // Static

  static _jQueryInterface(operation) {
    return this.each(function () {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)
      const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data())

      if (!data) {
        data = new ControlSidebar(this, _options)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, data)
      }

      if (data[operation] === 'undefined') {
        throw new Error(`${operation} is not a function`)
      }

      data[operation]()
    })
  }
}

/**
 *
 * Data Api implementation
 * ====================================================
 */
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_DATA_TOGGLE, function (event) {
  event.preventDefault()

  ControlSidebar._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'toggle')
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(() => {
  ControlSidebar._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_TOGGLE), '_init')
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = ControlSidebar._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = ControlSidebar
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return ControlSidebar._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ControlSidebar);


/***/ }),

/***/ "./src/js/AdminLTE/DirectChat.js":
/*!***************************************!*\
  !*** ./src/js/AdminLTE/DirectChat.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE DirectChat.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'DirectChat'
const DATA_KEY = 'lte.directchat'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const EVENT_TOGGLED = `toggled${EVENT_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-widget="chat-pane-toggle"]'
const SELECTOR_DIRECT_CHAT = '.direct-chat'

const CLASS_NAME_DIRECT_CHAT_OPEN = 'direct-chat-contacts-open'

/**
 * Class Definition
 * ====================================================
 */

class DirectChat {
  constructor(element) {
    this._element = element
  }

  toggle() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).parents(SELECTOR_DIRECT_CHAT).first().toggleClass(CLASS_NAME_DIRECT_CHAT_OPEN)
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_TOGGLED))
  }

  // Static

  static _jQueryInterface(config) {
    return this.each(function () {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)

      if (!data) {
        data = new DirectChat(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this))
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, data)
      }

      data[config]()
    })
  }
}

/**
 *
 * Data Api implementation
 * ====================================================
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_DATA_TOGGLE, function (event) {
  if (event) {
    event.preventDefault()
  }

  DirectChat._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'toggle')
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = DirectChat._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = DirectChat
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return DirectChat._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DirectChat);


/***/ }),

/***/ "./src/js/AdminLTE/Dropdown.js":
/*!*************************************!*\
  !*** ./src/js/AdminLTE/Dropdown.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE Dropdown.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'Dropdown'
const DATA_KEY = 'lte.dropdown'
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const SELECTOR_NAVBAR = '.navbar'
const SELECTOR_DROPDOWN_MENU = '.dropdown-menu'
const SELECTOR_DROPDOWN_MENU_ACTIVE = '.dropdown-menu.show'
const SELECTOR_DROPDOWN_TOGGLE = '[data-toggle="dropdown"]'

const CLASS_NAME_DROPDOWN_RIGHT = 'dropdown-menu-right'
const CLASS_NAME_DROPDOWN_SUBMENU = 'dropdown-submenu'

// TODO: this is unused; should be removed along with the extend?
const Default = {}

/**
 * Class Definition
 * ====================================================
 */

class Dropdown {
  constructor(element, config) {
    this._config = config
    this._element = element
  }

  // Public

  toggleSubmenu() {
    this._element.siblings().show().toggleClass('show')

    if (!this._element.next().hasClass('show')) {
      this._element.parents(SELECTOR_DROPDOWN_MENU).first().find('.show').removeClass('show').hide()
    }

    this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', () => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.dropdown-submenu .show').removeClass('show').hide()
    })
  }

  fixPosition() {
    const $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DROPDOWN_MENU_ACTIVE)

    if ($element.length === 0) {
      return
    }

    if ($element.hasClass(CLASS_NAME_DROPDOWN_RIGHT)) {
      $element.css({
        left: 'inherit',
        right: 0
      })
    } else {
      $element.css({
        left: 0,
        right: 'inherit'
      })
    }

    const offset = $element.offset()
    const width = $element.width()
    const visiblePart = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width() - offset.left

    if (offset.left < 0) {
      $element.css({
        left: 'inherit',
        right: offset.left - 5
      })
    } else if (visiblePart < width) {
      $element.css({
        left: 'inherit',
        right: 0
      })
    }
  }

  // Static

  static _jQueryInterface(config) {
    return this.each(function () {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)
      const _config = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data())

      if (!data) {
        data = new Dropdown(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), _config)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, data)
      }

      if (config === 'toggleSubmenu' || config === 'fixPosition') {
        data[config]()
      }
    })
  }
}

/**
 * Data API
 * ====================================================
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_DROPDOWN_MENU} ${SELECTOR_DROPDOWN_TOGGLE}`).on('click', function (event) {
  event.preventDefault()
  event.stopPropagation()

  Dropdown._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'toggleSubmenu')
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_NAVBAR} ${SELECTOR_DROPDOWN_TOGGLE}`).on('click', event => {
  event.preventDefault()

  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).parent().hasClass(CLASS_NAME_DROPDOWN_SUBMENU)) {
    return
  }

  setTimeout(function () {
    Dropdown._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'fixPosition')
  }, 1)
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = Dropdown._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = Dropdown
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return Dropdown._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dropdown);


/***/ }),

/***/ "./src/js/AdminLTE/ExpandableTable.js":
/*!********************************************!*\
  !*** ./src/js/AdminLTE/ExpandableTable.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE ExpandableTable.js
 * License MIT
 * --------------------------------------------
 */



/**
  * Constants
  * ====================================================
  */

const NAME = 'ExpandableTable'
const DATA_KEY = 'lte.expandableTable'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`

const SELECTOR_TABLE = '.expandable-table'
const SELECTOR_EXPANDABLE_BODY = '.expandable-body'
const SELECTOR_DATA_TOGGLE = '[data-widget="expandable-table"]'
const SELECTOR_ARIA_ATTR = 'aria-expanded'

/**
  * Class Definition
  * ====================================================
  */
class ExpandableTable {
  constructor(element, options) {
    this._options = options
    this._element = element
  }

  // Public

  init() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_TOGGLE).each((_, $header) => {
      const $type = jquery__WEBPACK_IMPORTED_MODULE_0___default()($header).attr(SELECTOR_ARIA_ATTR)
      const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()($header).next(SELECTOR_EXPANDABLE_BODY).children().first().children()
      if ($type === 'true') {
        $body.show()
      } else if ($type === 'false') {
        $body.hide()
        $body.parent().parent().addClass('d-none')
      }
    })
  }

  toggleRow() {
    let $element = this._element

    if ($element[0].nodeName !== 'TR') {
      $element = $element.parent()
      if ($element[0].nodeName !== 'TR') {
        $element = $element.parent()
      }
    }

    const time = 500
    const $type = $element.attr(SELECTOR_ARIA_ATTR)
    const $body = $element.next(SELECTOR_EXPANDABLE_BODY).children().first().children()

    $body.stop()
    if ($type === 'true') {
      $body.slideUp(time, () => {
        $element.next(SELECTOR_EXPANDABLE_BODY).addClass('d-none')
      })
      $element.attr(SELECTOR_ARIA_ATTR, 'false')
      $element.trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_COLLAPSED))
    } else if ($type === 'false') {
      $element.next(SELECTOR_EXPANDABLE_BODY).removeClass('d-none')
      $body.slideDown(time)
      $element.attr(SELECTOR_ARIA_ATTR, 'true')
      $element.trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_EXPANDED))
    }
  }

  // Static

  static _jQueryInterface(operation) {
    return this.each(function () {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)

      if (!data) {
        data = new ExpandableTable(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this))
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, data)
      }

      if (typeof operation === 'string' && /init|toggleRow/.test(operation)) {
        data[operation]()
      }
    })
  }
}

/**
  * Data API
  * ====================================================
  */
jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TABLE).ready(function () {
  ExpandableTable._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'init')
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_DATA_TOGGLE, function () {
  ExpandableTable._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'toggleRow')
})

/**
  * jQuery API
  * ====================================================
  */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = ExpandableTable._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = ExpandableTable
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return ExpandableTable._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExpandableTable);


/***/ }),

/***/ "./src/js/AdminLTE/Fullscreen.js":
/*!***************************************!*\
  !*** ./src/js/AdminLTE/Fullscreen.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE Fullscreen.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'Fullscreen'
const DATA_KEY = 'lte.fullscreen'
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const SELECTOR_DATA_WIDGET = '[data-widget="fullscreen"]'
const SELECTOR_ICON = `${SELECTOR_DATA_WIDGET} i`

const EVENT_FULLSCREEN_CHANGE = 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange'

const Default = {
  minimizeIcon: 'fa-compress-arrows-alt',
  maximizeIcon: 'fa-expand-arrows-alt'
}

/**
 * Class Definition
 * ====================================================
 */

class Fullscreen {
  constructor(_element, _options) {
    this.element = _element
    this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, _options)
  }

  // Public

  toggle() {
    if (document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement) {
      this.windowed()
    } else {
      this.fullscreen()
    }
  }

  toggleIcon() {
    if (document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_ICON).removeClass(this.options.maximizeIcon).addClass(this.options.minimizeIcon)
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_ICON).removeClass(this.options.minimizeIcon).addClass(this.options.maximizeIcon)
    }
  }

  fullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    }
  }

  windowed() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }

  // Static

  static _jQueryInterface(config) {
    let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)

    if (!data) {
      data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data()
    }

    const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, typeof config === 'object' ? config : data)
    const plugin = new Fullscreen(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), _options)

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, typeof config === 'object' ? config : data)

    if (typeof config === 'string' && /toggle|toggleIcon|fullscreen|windowed/.test(config)) {
      plugin[config]()
    } else {
      plugin.init()
    }
  }
}

/**
  * Data API
  * ====================================================
  */
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_DATA_WIDGET, function () {
  Fullscreen._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'toggle')
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on(EVENT_FULLSCREEN_CHANGE, () => {
  Fullscreen._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_WIDGET), 'toggleIcon')
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = Fullscreen._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = Fullscreen
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return Fullscreen._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Fullscreen);


/***/ }),

/***/ "./src/js/AdminLTE/IFrame.js":
/*!***********************************!*\
  !*** ./src/js/AdminLTE/IFrame.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE IFrame.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'IFrame'
const DATA_KEY = 'lte.iframe'
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const SELECTOR_DATA_TOGGLE = '[data-widget="iframe"]'
const SELECTOR_DATA_TOGGLE_CLOSE = '[data-widget="iframe-close"]'
const SELECTOR_DATA_TOGGLE_SCROLL_LEFT = '[data-widget="iframe-scrollleft"]'
const SELECTOR_DATA_TOGGLE_SCROLL_RIGHT = '[data-widget="iframe-scrollright"]'
const SELECTOR_DATA_TOGGLE_FULLSCREEN = '[data-widget="iframe-fullscreen"]'
const SELECTOR_CONTENT_WRAPPER = '.content-wrapper'
const SELECTOR_CONTENT_IFRAME = `${SELECTOR_CONTENT_WRAPPER} iframe`
const SELECTOR_TAB_NAV = `${SELECTOR_CONTENT_WRAPPER}.iframe-mode .nav`
const SELECTOR_TAB_NAVBAR_NAV = `${SELECTOR_CONTENT_WRAPPER}.iframe-mode .navbar-nav`
const SELECTOR_TAB_NAVBAR_NAV_ITEM = `${SELECTOR_TAB_NAVBAR_NAV} .nav-item`
const SELECTOR_TAB_NAVBAR_NAV_LINK = `${SELECTOR_TAB_NAVBAR_NAV} .nav-link`
const SELECTOR_TAB_CONTENT = `${SELECTOR_CONTENT_WRAPPER}.iframe-mode .tab-content`
const SELECTOR_TAB_EMPTY = `${SELECTOR_TAB_CONTENT} .tab-empty`
const SELECTOR_TAB_LOADING = `${SELECTOR_TAB_CONTENT} .tab-loading`
const SELECTOR_TAB_PANE = `${SELECTOR_TAB_CONTENT} .tab-pane`
const SELECTOR_SIDEBAR_MENU_ITEM = '.main-sidebar .nav-item > a.nav-link'
const SELECTOR_SIDEBAR_SEARCH_ITEM = '.sidebar-search-results .list-group-item'
const SELECTOR_HEADER_MENU_ITEM = '.main-header .nav-item a.nav-link'
const SELECTOR_HEADER_DROPDOWN_ITEM = '.main-header a.dropdown-item'
const CLASS_NAME_IFRAME_MODE = 'iframe-mode'
const CLASS_NAME_FULLSCREEN_MODE = 'iframe-mode-fullscreen'

const Default = {
  onTabClick(item) {
    return item
  },
  onTabChanged(item) {
    return item
  },
  onTabCreated(item) {
    return item
  },
  autoIframeMode: true,
  autoItemActive: true,
  autoShowNewTab: true,
  autoDarkMode: false,
  allowDuplicates: false,
  allowReload: true,
  loadingScreen: true,
  useNavbarItems: true,
  scrollOffset: 40,
  scrollBehaviorSwap: false,
  iconMaximize: 'fa-expand',
  iconMinimize: 'fa-compress'
}

/**
 * Class Definition
 * ====================================================
 */

class IFrame {
  constructor(element, config) {
    this._config = config
    this._element = element
    this._init()

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).data("adminLTEIframeHandler", this);
  }

  // Public

  onTabClick(item) {
    this._config.onTabClick(item)
  }

  onTabChanged(item) {
    this._config.onTabChanged(item)
  }

  onTabCreated(item) {
    this._config.onTabCreated(item)
  }

  createTab(title, link, uniqueName, autoOpen) {
    let tabId = `panel-${uniqueName}`
    let navId = `tab-${uniqueName}`

    if (this._config.allowDuplicates) {
      tabId += `-${Math.floor(Math.random() * 1000)}`
      navId += `-${Math.floor(Math.random() * 1000)}`
    }

    const newNavItem = `<li class="nav-item" role="presentation"><a href="#" class="btn-iframe-close" data-widget="iframe-close" data-type="only-this"><i class="fas fa-times"></i></a><a class="nav-link" data-toggle="row" id="${navId}" href="#${tabId}" role="tab" aria-controls="${tabId}" aria-selected="false">${title}</a></li>`
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_NAVBAR_NAV).append(unescape(escape(newNavItem)))

    const newTabItem = `<div class="tab-pane fade" id="${tabId}" role="tabpanel" aria-labelledby="${navId}"><iframe src="${link}"></iframe></div>`
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_CONTENT).append(unescape(escape(newTabItem)))

    if (autoOpen) {
      if (this._config.loadingScreen) {
        const $loadingScreen = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_LOADING)
        $loadingScreen.fadeIn()
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${tabId} iframe`).ready(() => {
          if (typeof this._config.loadingScreen === 'number') {
            this.switchTab(`#${navId}`)
            setTimeout(() => {
              $loadingScreen.fadeOut()
            }, this._config.loadingScreen)
          } else {
            this.switchTab(`#${navId}`)
            $loadingScreen.fadeOut()
          }
        })
      } else {
        this.switchTab(`#${navId}`)
      }
    }

    this.onTabCreated(jquery__WEBPACK_IMPORTED_MODULE_0___default()(`#${navId}`))
  }

  openTabSidebar(item, autoOpen = this._config.autoShowNewTab) {
    let $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item).clone()
    if ($item.attr('href') === undefined) {
      $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item).parent('a').clone()
    }

    $item.find('.right, .search-path').remove()
    let title = $item.find('p').text()
    if (title === '') {
      title = $item.text()
    }

    const link = $item.attr('href')
    if (link === '#' || link === '' || link === undefined) {
      return
    }

    const uniqueName = unescape(link).replace('./', '').replace(/["#&'./:=?[\]]/gi, '-').replace(/(--)/gi, '')
    const navId = `tab-${uniqueName}`

    if (!this._config.allowDuplicates && jquery__WEBPACK_IMPORTED_MODULE_0___default()(`#${navId}`).length > 0) {
      return this.switchTab(`#${navId}`, this._config.allowReload)
    }

    if ((!this._config.allowDuplicates && jquery__WEBPACK_IMPORTED_MODULE_0___default()(`#${navId}`).length === 0) || this._config.allowDuplicates) {
      this.createTab(title, link, uniqueName, autoOpen)
    }
  }

  switchTab(item, reload = false) {
    const $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item)
    const tabId = $item.attr('href')

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_EMPTY).hide()

    if (reload) {
      const $loadingScreen = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_LOADING)
      if (this._config.loadingScreen) {
        $loadingScreen.show(0, () => {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${tabId} iframe`).attr('src', jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${tabId} iframe`).attr('src')).ready(() => {
            if (this._config.loadingScreen) {
              if (typeof this._config.loadingScreen === 'number') {
                setTimeout(() => {
                  $loadingScreen.fadeOut()
                }, this._config.loadingScreen)
              } else {
                $loadingScreen.fadeOut()
              }
            }
          })
        })
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${tabId} iframe`).attr('src', jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${tabId} iframe`).attr('src'))
      }
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_TAB_NAVBAR_NAV} .active`).tab('dispose').removeClass('active')

    this._fixHeight()

    $item.tab('show')
    $item.parents('li').addClass('active')
    this.onTabChanged($item)

    if (this._config.autoItemActive) {
      this._setItemActive(jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${tabId} iframe`).attr('src'))
    }
  }

  removeActiveTab(type, element) {
    if (type == 'all') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_NAVBAR_NAV_ITEM).remove()
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_PANE).remove()
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_EMPTY).show()
    } else if (type == 'all-other') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_TAB_NAVBAR_NAV_ITEM}:not(.active)`).remove()
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_TAB_PANE}:not(.active)`).remove()
    } else if (type == 'only-this') {
      const $navClose = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element)
      const $navItem = $navClose.parent('.nav-item')
      const $navItemParent = $navItem.parent()
      const navItemIndex = $navItem.index()
      const tabId = $navClose.siblings('.nav-link').attr('aria-controls')
      $navItem.remove()
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`#${tabId}`).remove()
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_CONTENT).children().length == jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).length) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_EMPTY).show()
      } else {
        const prevNavItemIndex = navItemIndex - 1
        this.switchTab($navItemParent.children().eq(prevNavItemIndex).find('a.nav-link'))
      }
    } else {
      const $navItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_TAB_NAVBAR_NAV_ITEM}.active`)
      const $navItemParent = $navItem.parent()
      const navItemIndex = $navItem.index()
      $navItem.remove()
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_TAB_PANE}.active`).remove()
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_CONTENT).children().length == jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).length) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_EMPTY).show()
      } else {
        const prevNavItemIndex = navItemIndex - 1
        this.switchTab($navItemParent.children().eq(prevNavItemIndex).find('a.nav-link'))
      }
    }
  }

  toggleFullscreen() {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').hasClass(CLASS_NAME_FULLSCREEN_MODE)) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_DATA_TOGGLE_FULLSCREEN} i`).removeClass(this._config.iconMinimize).addClass(this._config.iconMaximize)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').removeClass(CLASS_NAME_FULLSCREEN_MODE)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).height('100%')
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTENT_WRAPPER).height('100%')
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTENT_IFRAME).height('100%')
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_DATA_TOGGLE_FULLSCREEN} i`).removeClass(this._config.iconMaximize).addClass(this._config.iconMinimize)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').addClass(CLASS_NAME_FULLSCREEN_MODE)
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).trigger('resize')
    this._fixHeight(true)
  }

  // Private

  _init() {
    const usingDefTab = (jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_CONTENT).children().length > 2)

    this._setupListeners()
    this._fixHeight(true)

    if (usingDefTab) {
      const $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_TAB_PANE}`).first()
      // eslint-disable-next-line no-console
      console.log($el)
      const uniqueName = $el.attr('id').replace('panel-', '')
      const navId = `#tab-${uniqueName}`

      this.switchTab(navId, true)
    }
  }

  _initFrameElement() {
    if (window.frameElement && this._config.autoIframeMode) {
      const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
      $body.addClass(CLASS_NAME_IFRAME_MODE)

      if (this._config.autoDarkMode) {
        $body.addClass('dark-mode')
      }
    }
  }

  _navScroll(offset) {
    const leftPos = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_NAVBAR_NAV).scrollLeft()
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_NAVBAR_NAV).animate({ scrollLeft: (leftPos + offset) }, 250, 'linear')
  }

  _setupListeners() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize', () => {
      setTimeout(() => {
        this._fixHeight()
      }, 1)
    })
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTENT_WRAPPER).hasClass(CLASS_NAME_IFRAME_MODE)) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', `${SELECTOR_SIDEBAR_MENU_ITEM}, ${SELECTOR_SIDEBAR_SEARCH_ITEM}`, e => {
        e.preventDefault()
        this.openTabSidebar(e.target)
      })
      if (this._config.useNavbarItems) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', `${SELECTOR_HEADER_MENU_ITEM}, ${SELECTOR_HEADER_DROPDOWN_ITEM}`, e => {
          e.preventDefault()
          this.openTabSidebar(e.target)
        })
      }
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_TAB_NAVBAR_NAV_LINK, e => {
      e.preventDefault()
      this.onTabClick(e.target)
      this.switchTab(e.target)
    })
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_TAB_NAVBAR_NAV_LINK, e => {
      e.preventDefault()
      this.onTabClick(e.target)
      this.switchTab(e.target)
    })
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_DATA_TOGGLE_CLOSE, e => {
      e.preventDefault()
      let { target } = e

      if (target.nodeName == 'I') {
        target = e.target.offsetParent
      }

      this.removeActiveTab(target.attributes['data-type'] ? target.attributes['data-type'].nodeValue : null, target)
    })
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_DATA_TOGGLE_FULLSCREEN, e => {
      e.preventDefault()
      this.toggleFullscreen()
    })
    let mousedown = false
    let mousedownInterval = null
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mousedown', SELECTOR_DATA_TOGGLE_SCROLL_LEFT, e => {
      e.preventDefault()
      clearInterval(mousedownInterval)

      let { scrollOffset } = this._config

      if (!this._config.scrollBehaviorSwap) {
        scrollOffset = -scrollOffset
      }

      mousedown = true
      this._navScroll(scrollOffset)

      mousedownInterval = setInterval(() => {
        this._navScroll(scrollOffset)
      }, 250)
    })
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mousedown', SELECTOR_DATA_TOGGLE_SCROLL_RIGHT, e => {
      e.preventDefault()
      clearInterval(mousedownInterval)

      let { scrollOffset } = this._config

      if (this._config.scrollBehaviorSwap) {
        scrollOffset = -scrollOffset
      }

      mousedown = true
      this._navScroll(scrollOffset)

      mousedownInterval = setInterval(() => {
        this._navScroll(scrollOffset)
      }, 250)
    })
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseup', () => {
      if (mousedown) {
        mousedown = false
        clearInterval(mousedownInterval)
        mousedownInterval = null
      }
    })
  }

  _setItemActive(href) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_SIDEBAR_MENU_ITEM}, ${SELECTOR_HEADER_DROPDOWN_ITEM}`).removeClass('active')
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_HEADER_MENU_ITEM).parent().removeClass('active')

    const $headerMenuItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_HEADER_MENU_ITEM}[href$="${href}"]`)
    const $headerDropdownItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_HEADER_DROPDOWN_ITEM}[href$="${href}"]`)
    const $sidebarMenuItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_SIDEBAR_MENU_ITEM}[href$="${href}"]`)

    $headerMenuItem.each((i, e) => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).parent().addClass('active')
    })
    $headerDropdownItem.each((i, e) => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).addClass('active')
    })
    $sidebarMenuItem.each((i, e) => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).addClass('active')
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).parents('.nav-treeview').prevAll('.nav-link').addClass('active')
    })
  }

  _fixHeight(tabEmpty = false) {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').hasClass(CLASS_NAME_FULLSCREEN_MODE)) {
      const windowHeight = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()
      const navbarHeight = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_NAV).outerHeight()
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}, ${SELECTOR_CONTENT_IFRAME}`).height(windowHeight - navbarHeight)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTENT_WRAPPER).height(windowHeight)
    } else {
      const contentWrapperHeight = parseFloat(jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTENT_WRAPPER).css('height'))
      const navbarHeight = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TAB_NAV).outerHeight()
      if (tabEmpty == true) {
        setTimeout(() => {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).height(contentWrapperHeight - navbarHeight)
        }, 50)
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTENT_IFRAME).height(contentWrapperHeight - navbarHeight)
      }
    }
  }

  // Static

  static _jQueryInterface(config) {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_TOGGLE).length > 0) {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)

      if (!data) {
        data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data()
      }

      const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, typeof config === 'object' ? config : data)
      localStorage.setItem('AdminLTE:IFrame:Options', JSON.stringify(_options))

      const plugin = new IFrame(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), _options)

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, typeof config === 'object' ? config : data)

      if (typeof config === 'string' && /createTab|openTabSidebar|switchTab|removeActiveTab/.test(config)) {
        plugin[config]()
      }
    } else {
      new IFrame(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), JSON.parse(localStorage.getItem('AdminLTE:IFrame:Options')))._initFrameElement()
    }
  }
}

/**
 * Data API
 * ====================================================
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('load', () => {
  IFrame._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_TOGGLE))
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = IFrame._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = IFrame
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return IFrame._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IFrame);


/***/ }),

/***/ "./src/js/AdminLTE/Layout.js":
/*!***********************************!*\
  !*** ./src/js/AdminLTE/Layout.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE Layout.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'Layout'
const DATA_KEY = 'lte.layout'
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const SELECTOR_HEADER = '.main-header'
const SELECTOR_MAIN_SIDEBAR = '.main-sidebar'
const SELECTOR_SIDEBAR = '.main-sidebar .sidebar'
const SELECTOR_CONTENT = '.content-wrapper'
const SELECTOR_CONTROL_SIDEBAR_CONTENT = '.control-sidebar-content'
const SELECTOR_CONTROL_SIDEBAR_BTN = '[data-widget="control-sidebar"]'
const SELECTOR_FOOTER = '.main-footer'
const SELECTOR_PUSHMENU_BTN = '[data-widget="pushmenu"]'
const SELECTOR_LOGIN_BOX = '.login-box'
const SELECTOR_REGISTER_BOX = '.register-box'
const SELECTOR_PRELOADER = '.preloader'

const CLASS_NAME_SIDEBAR_COLLAPSED = 'sidebar-collapse'
const CLASS_NAME_SIDEBAR_FOCUSED = 'sidebar-focused'
const CLASS_NAME_LAYOUT_FIXED = 'layout-fixed'
const CLASS_NAME_CONTROL_SIDEBAR_SLIDE_OPEN = 'control-sidebar-slide-open'
const CLASS_NAME_CONTROL_SIDEBAR_OPEN = 'control-sidebar-open'
const CLASS_NAME_IFRAME_MODE = 'iframe-mode'

const Default = {
  scrollbarTheme: 'os-theme-light',
  scrollbarAutoHide: 'l',
  panelAutoHeight: true,
  panelAutoHeightMode: 'min-height',
  preloadDuration: 200,
  loginRegisterAutoHeight: true
}

/**
 * Class Definition
 * ====================================================
 */

class Layout {
  constructor(element, config) {
    this._config = config
    this._element = element
  }

  // Public

  fixLayoutHeight(extra = null) {
    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
    let controlSidebar = 0

    if ($body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE_OPEN) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || extra === 'control_sidebar') {
      controlSidebar = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTROL_SIDEBAR_CONTENT).outerHeight()
    }

    const heights = {
      window: jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height(),
      header: jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_HEADER).length > 0 ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_HEADER).outerHeight() : 0,
      footer: jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_FOOTER).length > 0 ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_FOOTER).outerHeight() : 0,
      sidebar: jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SIDEBAR).length > 0 ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SIDEBAR).height() : 0,
      controlSidebar
    }

    const max = this._max(heights)
    let offset = this._config.panelAutoHeight

    if (offset === true) {
      offset = 0
    }

    const $contentSelector = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTENT)

    if (offset !== false) {
      if (max === heights.controlSidebar) {
        $contentSelector.css(this._config.panelAutoHeightMode, (max + offset))
      } else if (max === heights.window) {
        $contentSelector.css(this._config.panelAutoHeightMode, (max + offset) - heights.header - heights.footer)
      } else {
        $contentSelector.css(this._config.panelAutoHeightMode, (max + offset) - heights.header)
      }

      if (this._isFooterFixed()) {
        $contentSelector.css(this._config.panelAutoHeightMode, parseFloat($contentSelector.css(this._config.panelAutoHeightMode)) + heights.footer)
      }
    }

    if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
      return
    }

    if (typeof (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn.overlayScrollbars) !== 'undefined') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SIDEBAR).overlayScrollbars({
        className: this._config.scrollbarTheme,
        sizeAutoCapable: true,
        scrollbars: {
          autoHide: this._config.scrollbarAutoHide,
          clickScrolling: true
        }
      })
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SIDEBAR).css('overflow-y', 'auto')
    }
  }

  fixLoginRegisterHeight() {
    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
    const $selector = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_LOGIN_BOX}, ${SELECTOR_REGISTER_BOX}`)

    if ($body.hasClass(CLASS_NAME_IFRAME_MODE)) {
      $body.css('height', '100%')
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.wrapper').css('height', '100%')
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').css('height', '100%')
    } else if ($selector.length === 0) {
      $body.css('height', 'auto')
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').css('height', 'auto')
    } else {
      const boxHeight = $selector.height()

      if ($body.css(this._config.panelAutoHeightMode) !== boxHeight) {
        $body.css(this._config.panelAutoHeightMode, boxHeight)
      }
    }
  }

  // Private

  _init() {
    // Activate layout height watcher
    this.fixLayoutHeight()

    if (this._config.loginRegisterAutoHeight === true) {
      this.fixLoginRegisterHeight()
    } else if (this._config.loginRegisterAutoHeight === parseInt(this._config.loginRegisterAutoHeight, 10)) {
      setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight)
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SIDEBAR)
      .on('collapsed.lte.treeview expanded.lte.treeview', () => {
        this.fixLayoutHeight()
      })

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_MAIN_SIDEBAR)
      .on('mouseenter mouseleave', () => {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').hasClass(CLASS_NAME_SIDEBAR_COLLAPSED)) {
          this.fixLayoutHeight()
        }
      })

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_PUSHMENU_BTN)
      .on('collapsed.lte.pushmenu shown.lte.pushmenu', () => {
        setTimeout(() => {
          this.fixLayoutHeight()
        }, 300)
      })

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_CONTROL_SIDEBAR_BTN)
      .on('collapsed.lte.controlsidebar', () => {
        this.fixLayoutHeight()
      })
      .on('expanded.lte.controlsidebar', () => {
        this.fixLayoutHeight('control_sidebar')
      })

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).resize(() => {
      this.fixLayoutHeight()
    })

    setTimeout(() => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('body.hold-transition').removeClass('hold-transition')
    }, 50)

    setTimeout(() => {
      const $preloader = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_PRELOADER)
      if ($preloader) {
        $preloader.css('height', 0)
        setTimeout(() => {
          $preloader.children().hide()
        }, 200)
      }
    }, this._config.preloadDuration)
  }

  _max(numbers) {
    // Calculate the maximum number in a list
    let max = 0

    Object.keys(numbers).forEach(key => {
      if (numbers[key] > max) {
        max = numbers[key]
      }
    })

    return max
  }

  _isFooterFixed() {
    return jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_FOOTER).css('position') === 'fixed'
  }

  // Static

  static _jQueryInterface(config = '') {
    return this.each(function () {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)
      const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data())

      if (!data) {
        data = new Layout(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), _options)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, data)
      }

      if (config === 'init' || config === '') {
        data._init()
      } else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {
        data[config]()
      }
    })
  }
}

/**
 * Data API
 * ====================================================
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('load', () => {
  Layout._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()('body'))
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_SIDEBAR} a`)
  .on('focusin', () => {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_MAIN_SIDEBAR).addClass(CLASS_NAME_SIDEBAR_FOCUSED)
  })
  .on('focusout', () => {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_MAIN_SIDEBAR).removeClass(CLASS_NAME_SIDEBAR_FOCUSED)
  })

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = Layout._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = Layout
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return Layout._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);


/***/ }),

/***/ "./src/js/AdminLTE/NavbarSearch.js":
/*!*****************************************!*\
  !*** ./src/js/AdminLTE/NavbarSearch.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE NavbarSearch.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'NavbarSearch'
const DATA_KEY = 'lte.navbar-search'
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const SELECTOR_TOGGLE_BUTTON = '[data-widget="navbar-search"]'
const SELECTOR_SEARCH_BLOCK = '.navbar-search-block'
const SELECTOR_SEARCH_INPUT = '.form-control'

const CLASS_NAME_OPEN = 'navbar-search-open'

const Default = {
  resetOnClose: true,
  target: SELECTOR_SEARCH_BLOCK
}

/**
 * Class Definition
 * ====================================================
 */

class NavbarSearch {
  constructor(_element, _options) {
    this._element = _element
    this._config = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, _options)
  }

  // Public

  open() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._config.target).css('display', 'flex').hide().fadeIn().addClass(CLASS_NAME_OPEN)
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${this._config.target} ${SELECTOR_SEARCH_INPUT}`).focus()
  }

  close() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._config.target).fadeOut().removeClass(CLASS_NAME_OPEN)

    if (this._config.resetOnClose) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${this._config.target} ${SELECTOR_SEARCH_INPUT}`).val('')
    }
  }

  toggle() {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._config.target).hasClass(CLASS_NAME_OPEN)) {
      this.close()
    } else {
      this.open()
    }
  }

  // Static

  static _jQueryInterface(options) {
    return this.each(function () {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)
      const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data())

      if (!data) {
        data = new NavbarSearch(this, _options)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, data)
      }

      if (!/toggle|close|open/.test(options)) {
        throw new Error(`Undefined method ${options}`)
      }

      data[options]()
    })
  }
}

/**
 * Data API
 * ====================================================
 */
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_TOGGLE_BUTTON, event => {
  event.preventDefault()

  let button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget)

  if (button.data('widget') !== 'navbar-search') {
    button = button.closest(SELECTOR_TOGGLE_BUTTON)
  }

  NavbarSearch._jQueryInterface.call(button, 'toggle')
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = NavbarSearch._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = NavbarSearch
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return NavbarSearch._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavbarSearch);


/***/ }),

/***/ "./src/js/AdminLTE/PushMenu.js":
/*!*************************************!*\
  !*** ./src/js/AdminLTE/PushMenu.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE PushMenu.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'PushMenu'
const DATA_KEY = 'lte.pushmenu'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`
const EVENT_COLLAPSED_DONE = `collapsed-done${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`

const SELECTOR_TOGGLE_BUTTON = '[data-widget="pushmenu"]'
const SELECTOR_BODY = 'body'
const SELECTOR_OVERLAY = '#sidebar-overlay'
const SELECTOR_WRAPPER = '.wrapper'

const CLASS_NAME_COLLAPSED = 'sidebar-collapse'
const CLASS_NAME_OPEN = 'sidebar-open'
const CLASS_NAME_IS_OPENING = 'sidebar-is-opening'
const CLASS_NAME_CLOSED = 'sidebar-closed'

const Default = {
  autoCollapseSize: 992,
  enableRemember: false,
  noTransitionAfterReload: true,
  animationSpeed: 300
}

/**
 * Class Definition
 * ====================================================
 */

class PushMenu {
  constructor(element, options) {
    this._element = element
    this._options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, options)

    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_OVERLAY).length === 0) {
      this._addOverlay()
    }

    this._init()
  }

  // Public

  expand() {
    const $bodySelector = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_BODY)

    if (this._options.autoCollapseSize && jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width() <= this._options.autoCollapseSize) {
      $bodySelector.addClass(CLASS_NAME_OPEN)
    }

    $bodySelector.addClass(CLASS_NAME_IS_OPENING).removeClass(`${CLASS_NAME_COLLAPSED} ${CLASS_NAME_CLOSED}`).delay(50).queue(function () {
      $bodySelector.removeClass(CLASS_NAME_IS_OPENING)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).dequeue()
    })

    if (this._options.enableRemember) {
      localStorage.setItem(`remember${EVENT_KEY}`, CLASS_NAME_OPEN)
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_SHOWN))
  }

  collapse() {
    const $bodySelector = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_BODY)

    if (this._options.autoCollapseSize && jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width() <= this._options.autoCollapseSize) {
      $bodySelector.removeClass(CLASS_NAME_OPEN).addClass(CLASS_NAME_CLOSED)
    }

    $bodySelector.addClass(CLASS_NAME_COLLAPSED)

    if (this._options.enableRemember) {
      localStorage.setItem(`remember${EVENT_KEY}`, CLASS_NAME_COLLAPSED)
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_COLLAPSED))

    setTimeout(() => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_COLLAPSED_DONE))
    }, this._options.animationSpeed)
  }

  toggle() {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_BODY).hasClass(CLASS_NAME_COLLAPSED)) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  autoCollapse(resize = false) {
    if (!this._options.autoCollapseSize) {
      return
    }

    const $bodySelector = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_BODY)

    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width() <= this._options.autoCollapseSize) {
      if (!$bodySelector.hasClass(CLASS_NAME_OPEN)) {
        this.collapse()
      }
    } else if (resize === true) {
      if ($bodySelector.hasClass(CLASS_NAME_OPEN)) {
        $bodySelector.removeClass(CLASS_NAME_OPEN)
      } else if ($bodySelector.hasClass(CLASS_NAME_CLOSED)) {
        this.expand()
      }
    }
  }

  remember() {
    if (!this._options.enableRemember) {
      return
    }

    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')
    const toggleState = localStorage.getItem(`remember${EVENT_KEY}`)

    if (toggleState === CLASS_NAME_COLLAPSED) {
      if (this._options.noTransitionAfterReload) {
        $body.addClass('hold-transition').addClass(CLASS_NAME_COLLAPSED).delay(50).queue(function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('hold-transition')
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).dequeue()
        })
      } else {
        $body.addClass(CLASS_NAME_COLLAPSED)
      }
    } else if (this._options.noTransitionAfterReload) {
      $body.addClass('hold-transition').removeClass(CLASS_NAME_COLLAPSED).delay(50).queue(function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('hold-transition')
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).dequeue()
      })
    } else {
      $body.removeClass(CLASS_NAME_COLLAPSED)
    }
  }

  // Private

  _init() {
    this.remember()
    this.autoCollapse()

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).resize(() => {
      this.autoCollapse(true)
    })
  }

  _addOverlay() {
    const overlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div />', {
      id: 'sidebar-overlay'
    })

    overlay.on('click', () => {
      this.collapse()
    })

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_WRAPPER).append(overlay)
  }

  // Static

  static _jQueryInterface(operation) {
    return this.each(function () {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)
      const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data())

      if (!data) {
        data = new PushMenu(this, _options)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, data)
      }

      if (typeof operation === 'string' && /collapse|expand|toggle/.test(operation)) {
        data[operation]()
      }
    })
  }
}

/**
 * Data API
 * ====================================================
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_TOGGLE_BUTTON, event => {
  event.preventDefault()

  let button = event.currentTarget

  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(button).data('widget') !== 'pushmenu') {
    button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(button).closest(SELECTOR_TOGGLE_BUTTON)
  }

  PushMenu._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(button), 'toggle')
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('load', () => {
  PushMenu._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_TOGGLE_BUTTON))
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = PushMenu._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = PushMenu
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return PushMenu._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PushMenu);


/***/ }),

/***/ "./src/js/AdminLTE/SidebarSearch.js":
/*!******************************************!*\
  !*** ./src/js/AdminLTE/SidebarSearch.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE SidebarSearch.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'SidebarSearch'
const DATA_KEY = 'lte.sidebar-search'
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const CLASS_NAME_OPEN = 'sidebar-search-open'
const CLASS_NAME_ICON_SEARCH = 'fa-search'
const CLASS_NAME_ICON_CLOSE = 'fa-times'
const CLASS_NAME_HEADER = 'nav-header'
const CLASS_NAME_SEARCH_RESULTS = 'sidebar-search-results'
const CLASS_NAME_LIST_GROUP = 'list-group'

const SELECTOR_DATA_WIDGET = '[data-widget="sidebar-search"]'
const SELECTOR_SIDEBAR = '.main-sidebar .nav-sidebar'
const SELECTOR_NAV_LINK = '.nav-link'
const SELECTOR_NAV_TREEVIEW = '.nav-treeview'
const SELECTOR_SEARCH_INPUT = `${SELECTOR_DATA_WIDGET} .form-control`
const SELECTOR_SEARCH_BUTTON = `${SELECTOR_DATA_WIDGET} .btn`
const SELECTOR_SEARCH_ICON = `${SELECTOR_SEARCH_BUTTON} i`
const SELECTOR_SEARCH_LIST_GROUP = `.${CLASS_NAME_LIST_GROUP}`
const SELECTOR_SEARCH_RESULTS = `.${CLASS_NAME_SEARCH_RESULTS}`
const SELECTOR_SEARCH_RESULTS_GROUP = `${SELECTOR_SEARCH_RESULTS} .${CLASS_NAME_LIST_GROUP}`

const Default = {
  arrowSign: '->',
  minLength: 3,
  maxResults: 7,
  highlightName: true,
  highlightPath: false,
  highlightClass: 'text-light',
  notFoundText: 'No element found!'
}

const SearchItems = []

/**
 * Class Definition
 * ====================================================
 */

class SidebarSearch {
  constructor(_element, _options) {
    this.element = _element
    this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, _options)
    this.items = []
  }

  // Public

  init() {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_WIDGET).length === 0) {
      return
    }

    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_WIDGET).next(SELECTOR_SEARCH_RESULTS).length === 0) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_WIDGET).after(
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div />', { class: CLASS_NAME_SEARCH_RESULTS })
      )
    }

    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_RESULTS).children(SELECTOR_SEARCH_LIST_GROUP).length === 0) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_RESULTS).append(
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div />', { class: CLASS_NAME_LIST_GROUP })
      )
    }

    this._addNotFound()

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SIDEBAR).children().each((i, child) => {
      this._parseItem(child)
    })
  }

  search() {
    const searchValue = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_INPUT).val().toLowerCase()
    if (searchValue.length < this.options.minLength) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_RESULTS_GROUP).empty()
      this._addNotFound()
      this.close()
      return
    }

    const searchResults = SearchItems.filter(item => (item.name).toLowerCase().includes(searchValue))
    const endResults = jquery__WEBPACK_IMPORTED_MODULE_0___default()(searchResults.slice(0, this.options.maxResults))
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_RESULTS_GROUP).empty()

    if (endResults.length === 0) {
      this._addNotFound()
    } else {
      endResults.each((i, result) => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_RESULTS_GROUP).append(this._renderItem(escape(result.name), encodeURI(result.link), result.path))
      })
    }

    this.open()
  }

  open() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_WIDGET).parent().addClass(CLASS_NAME_OPEN)
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_ICON).removeClass(CLASS_NAME_ICON_SEARCH).addClass(CLASS_NAME_ICON_CLOSE)
  }

  close() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_WIDGET).parent().removeClass(CLASS_NAME_OPEN)
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_ICON).removeClass(CLASS_NAME_ICON_CLOSE).addClass(CLASS_NAME_ICON_SEARCH)
  }

  toggle() {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_WIDGET).parent().hasClass(CLASS_NAME_OPEN)) {
      this.close()
    } else {
      this.open()
    }
  }

  // Private

  _parseItem(item, path = []) {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(item).hasClass(CLASS_NAME_HEADER)) {
      return
    }

    const itemObject = {}
    const navLink = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item).clone().find(`> ${SELECTOR_NAV_LINK}`)
    const navTreeview = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item).clone().find(`> ${SELECTOR_NAV_TREEVIEW}`)

    const link = navLink.attr('href')
    const name = navLink.find('p').children().remove().end().text()

    itemObject.name = this._trimText(name)
    itemObject.link = link
    itemObject.path = path

    if (navTreeview.length === 0) {
      SearchItems.push(itemObject)
    } else {
      const newPath = itemObject.path.concat([itemObject.name])
      navTreeview.children().each((i, child) => {
        this._parseItem(child, newPath)
      })
    }
  }

  _trimText(text) {
    return (0,jquery__WEBPACK_IMPORTED_MODULE_0__.trim)(text.replace(/(\r\n|\n|\r)/gm, ' '))
  }

  _renderItem(name, link, path) {
    path = path.join(` ${this.options.arrowSign} `)
    name = unescape(name)
    link = decodeURI(link)

    if (this.options.highlightName || this.options.highlightPath) {
      const searchValue = jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_INPUT).val().toLowerCase()
      const regExp = new RegExp(searchValue, 'gi')

      if (this.options.highlightName) {
        name = name.replace(
          regExp,
          str => {
            return `<strong class="${this.options.highlightClass}">${str}</strong>`
          }
        )
      }

      if (this.options.highlightPath) {
        path = path.replace(
          regExp,
          str => {
            return `<strong class="${this.options.highlightClass}">${str}</strong>`
          }
        )
      }
    }

    const groupItemElement = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a/>', {
      href: decodeURIComponent(link),
      class: 'list-group-item'
    })
    const searchTitleElement = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>', {
      class: 'search-title'
    }).html(name)
    const searchPathElement = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>', {
      class: 'search-path'
    }).html(path)

    groupItemElement.append(searchTitleElement).append(searchPathElement)

    return groupItemElement
  }

  _addNotFound() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_RESULTS_GROUP).append(this._renderItem(this.options.notFoundText, '#', []))
  }

  // Static

  static _jQueryInterface(config) {
    let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)

    if (!data) {
      data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data()
    }

    const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, typeof config === 'object' ? config : data)
    const plugin = new SidebarSearch(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), _options)

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, typeof config === 'object' ? config : data)

    if (typeof config === 'string' && /init|toggle|close|open|search/.test(config)) {
      plugin[config]()
    } else {
      plugin.init()
    }
  }
}

/**
 * Data API
 * ====================================================
 */
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', SELECTOR_SEARCH_BUTTON, event => {
  event.preventDefault()

  SidebarSearch._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_WIDGET), 'toggle')
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keyup', SELECTOR_SEARCH_INPUT, event => {
  if (event.keyCode == 38) {
    event.preventDefault()
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_RESULTS_GROUP).children().last().focus()
    return
  }

  if (event.keyCode == 40) {
    event.preventDefault()
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_SEARCH_RESULTS_GROUP).children().first().focus()
    return
  }

  setTimeout(() => {
    SidebarSearch._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_WIDGET), 'search')
  }, 100)
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keydown', SELECTOR_SEARCH_RESULTS_GROUP, event => {
  const $focused = jquery__WEBPACK_IMPORTED_MODULE_0___default()(':focus')

  if (event.keyCode == 38) {
    event.preventDefault()

    if ($focused.is(':first-child')) {
      $focused.siblings().last().focus()
    } else {
      $focused.prev().focus()
    }
  }

  if (event.keyCode == 40) {
    event.preventDefault()

    if ($focused.is(':last-child')) {
      $focused.siblings().first().focus()
    } else {
      $focused.next().focus()
    }
  }
})

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('load', () => {
  SidebarSearch._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_WIDGET), 'init')
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = SidebarSearch._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = SidebarSearch
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return SidebarSearch._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarSearch);


/***/ }),

/***/ "./src/js/AdminLTE/Toasts.js":
/*!***********************************!*\
  !*** ./src/js/AdminLTE/Toasts.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE Toasts.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'Toasts'
const DATA_KEY = 'lte.toasts'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const EVENT_INIT = `init${EVENT_KEY}`
const EVENT_CREATED = `created${EVENT_KEY}`
const EVENT_REMOVED = `removed${EVENT_KEY}`

const SELECTOR_CONTAINER_TOP_RIGHT = '#toastsContainerTopRight'
const SELECTOR_CONTAINER_TOP_LEFT = '#toastsContainerTopLeft'
const SELECTOR_CONTAINER_BOTTOM_RIGHT = '#toastsContainerBottomRight'
const SELECTOR_CONTAINER_BOTTOM_LEFT = '#toastsContainerBottomLeft'

const CLASS_NAME_TOP_RIGHT = 'toasts-top-right'
const CLASS_NAME_TOP_LEFT = 'toasts-top-left'
const CLASS_NAME_BOTTOM_RIGHT = 'toasts-bottom-right'
const CLASS_NAME_BOTTOM_LEFT = 'toasts-bottom-left'

const POSITION_TOP_RIGHT = 'topRight'
const POSITION_TOP_LEFT = 'topLeft'
const POSITION_BOTTOM_RIGHT = 'bottomRight'
const POSITION_BOTTOM_LEFT = 'bottomLeft'

const Default = {
  position: POSITION_TOP_RIGHT,
  fixed: true,
  autohide: false,
  autoremove: true,
  delay: 1000,
  fade: true,
  icon: null,
  image: null,
  imageAlt: null,
  imageHeight: '25px',
  title: null,
  subtitle: null,
  close: true,
  body: null,
  class: null
}

/**
 * Class Definition
 * ====================================================
 */
class Toasts {
  constructor(element, config) {
    this._config = config
    this._prepareContainer()

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_INIT))
  }

  // Public

  create() {
    const toast = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>')

    toast.data('autohide', this._config.autohide)
    toast.data('animation', this._config.fade)

    if (this._config.class) {
      toast.addClass(this._config.class)
    }

    if (this._config.delay && this._config.delay != 500) {
      toast.data('delay', this._config.delay)
    }

    const toastHeader = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="toast-header">')

    if (this._config.image != null) {
      const toastImage = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt)

      if (this._config.imageHeight != null) {
        toastImage.height(this._config.imageHeight).width('auto')
      }

      toastHeader.append(toastImage)
    }

    if (this._config.icon != null) {
      toastHeader.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<i />').addClass('mr-2').addClass(this._config.icon))
    }

    if (this._config.title != null) {
      toastHeader.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<strong />').addClass('mr-auto').html(this._config.title))
    }

    if (this._config.subtitle != null) {
      toastHeader.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<small />').html(this._config.subtitle))
    }

    if (this._config.close == true) {
      const toastClose = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<button data-dismiss="toast" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden="true">&times;</span>')

      if (this._config.title == null) {
        toastClose.toggleClass('ml-2 ml-auto')
      }

      toastHeader.append(toastClose)
    }

    toast.append(toastHeader)

    if (this._config.body != null) {
      toast.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="toast-body" />').html(this._config.body))
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._getContainerId()).prepend(toast)

    const $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')

    $body.trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_CREATED))
    toast.toast('show')

    if (this._config.autoremove) {
      toast.on('hidden.bs.toast', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).delay(200).remove()
        $body.trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_REMOVED))
      })
    }
  }

  // Static

  _getContainerId() {
    if (this._config.position == POSITION_TOP_RIGHT) {
      return SELECTOR_CONTAINER_TOP_RIGHT
    }

    if (this._config.position == POSITION_TOP_LEFT) {
      return SELECTOR_CONTAINER_TOP_LEFT
    }

    if (this._config.position == POSITION_BOTTOM_RIGHT) {
      return SELECTOR_CONTAINER_BOTTOM_RIGHT
    }

    if (this._config.position == POSITION_BOTTOM_LEFT) {
      return SELECTOR_CONTAINER_BOTTOM_LEFT
    }
  }

  _prepareContainer() {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._getContainerId()).length === 0) {
      const container = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div />').attr('id', this._getContainerId().replace('#', ''))
      if (this._config.position == POSITION_TOP_RIGHT) {
        container.addClass(CLASS_NAME_TOP_RIGHT)
      } else if (this._config.position == POSITION_TOP_LEFT) {
        container.addClass(CLASS_NAME_TOP_LEFT)
      } else if (this._config.position == POSITION_BOTTOM_RIGHT) {
        container.addClass(CLASS_NAME_BOTTOM_RIGHT)
      } else if (this._config.position == POSITION_BOTTOM_LEFT) {
        container.addClass(CLASS_NAME_BOTTOM_LEFT)
      }

      jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').append(container)
    }

    if (this._config.fixed) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._getContainerId()).addClass('fixed')
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._getContainerId()).removeClass('fixed')
    }
  }

  // Static

  static _jQueryInterface(option, config) {
    return this.each(function () {
      const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, config)
      const toast = new Toasts(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), _options)

      if (option === 'create') {
        toast[option]()
      }
    })
  }
}

/**
 * jQuery API
 * ====================================================
 */

(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = Toasts._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = Toasts
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return Toasts._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toasts);


/***/ }),

/***/ "./src/js/AdminLTE/TodoList.js":
/*!*************************************!*\
  !*** ./src/js/AdminLTE/TodoList.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE TodoList.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'TodoList'
const DATA_KEY = 'lte.todolist'
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const SELECTOR_DATA_TOGGLE = '[data-widget="todo-list"]'
const CLASS_NAME_TODO_LIST_DONE = 'done'

const Default = {
  onCheck(item) {
    return item
  },
  onUnCheck(item) {
    return item
  }
}

/**
 * Class Definition
 * ====================================================
 */

class TodoList {
  constructor(element, config) {
    this._config = config
    this._element = element

    this._init()
  }

  // Public

  toggle(item) {
    item.parents('li').toggleClass(CLASS_NAME_TODO_LIST_DONE)
    if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(item).prop('checked')) {
      this.unCheck(jquery__WEBPACK_IMPORTED_MODULE_0___default()(item))
      return
    }

    this.check(item)
  }

  check(item) {
    this._config.onCheck.call(item)
  }

  unCheck(item) {
    this._config.onUnCheck.call(item)
  }

  // Private

  _init() {
    const $toggleSelector = this._element

    $toggleSelector.find('input:checkbox:checked').parents('li').toggleClass(CLASS_NAME_TODO_LIST_DONE)
    $toggleSelector.on('change', 'input:checkbox', event => {
      this.toggle(jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target))
    })
  }

  // Static

  static _jQueryInterface(config) {
    return this.each(function () {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)

      if (!data) {
        data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data()
      }

      const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, typeof config === 'object' ? config : data)
      const plugin = new TodoList(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), _options)

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, typeof config === 'object' ? config : data)

      if (config === 'init') {
        plugin[config]()
      }
    })
  }
}

/**
 * Data API
 * ====================================================
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('load', () => {
  TodoList._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_TOGGLE))
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = TodoList._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = TodoList
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return TodoList._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoList);


/***/ }),

/***/ "./src/js/AdminLTE/Treeview.js":
/*!*************************************!*\
  !*** ./src/js/AdminLTE/Treeview.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------
 * AdminLTE Treeview.js
 * License MIT
 * --------------------------------------------
 */



/**
 * Constants
 * ====================================================
 */

const NAME = 'Treeview'
const DATA_KEY = 'lte.treeview'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME]

const EVENT_EXPANDED = `expanded${EVENT_KEY}`
const EVENT_COLLAPSED = `collapsed${EVENT_KEY}`
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`

const SELECTOR_LI = '.nav-item'
const SELECTOR_LINK = '.nav-link'
const SELECTOR_TREEVIEW_MENU = '.nav-treeview'
const SELECTOR_OPEN = '.menu-open'
const SELECTOR_DATA_WIDGET = '[data-widget="treeview"]'

const CLASS_NAME_OPEN = 'menu-open'
const CLASS_NAME_IS_OPENING = 'menu-is-opening'
const CLASS_NAME_SIDEBAR_COLLAPSED = 'sidebar-collapse'

const Default = {
  trigger: `${SELECTOR_DATA_WIDGET} ${SELECTOR_LINK}`,
  animationSpeed: 300,
  accordion: true,
  expandSidebar: false,
  sidebarButtonSelector: '[data-widget="pushmenu"]'
}

/**
 * Class Definition
 * ====================================================
 */
class Treeview {
  constructor(element, config) {
    this._config = config
    this._element = element
  }

  // Public

  init() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(`${SELECTOR_LI}${SELECTOR_OPEN} ${SELECTOR_TREEVIEW_MENU}${SELECTOR_OPEN}`).css('display', 'block')
    this._setupListeners()
  }

  expand(treeviewMenu, parentLi) {
    const expandedEvent = jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_EXPANDED)

    if (this._config.accordion) {
      const openMenuLi = parentLi.siblings(SELECTOR_OPEN).first()
      const openTreeview = openMenuLi.find(SELECTOR_TREEVIEW_MENU).first()
      this.collapse(openTreeview, openMenuLi)
    }

    parentLi.addClass(CLASS_NAME_IS_OPENING)
    treeviewMenu.stop().slideDown(this._config.animationSpeed, () => {
      parentLi.addClass(CLASS_NAME_OPEN)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(expandedEvent)
    })

    if (this._config.expandSidebar) {
      this._expandSidebar()
    }
  }

  collapse(treeviewMenu, parentLi) {
    const collapsedEvent = jquery__WEBPACK_IMPORTED_MODULE_0___default().Event(EVENT_COLLAPSED)

    parentLi.removeClass(`${CLASS_NAME_IS_OPENING} ${CLASS_NAME_OPEN}`)
    treeviewMenu.stop().slideUp(this._config.animationSpeed, () => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(collapsedEvent)
      treeviewMenu.find(`${SELECTOR_OPEN} > ${SELECTOR_TREEVIEW_MENU}`).slideUp()
      treeviewMenu.find(SELECTOR_OPEN).removeClass(`${CLASS_NAME_IS_OPENING} ${CLASS_NAME_OPEN}`)
    })
  }

  toggle(event) {
    const $relativeTarget = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget)
    const $parent = $relativeTarget.parent()

    let treeviewMenu = $parent.find(`> ${SELECTOR_TREEVIEW_MENU}`)

    if (!treeviewMenu.is(SELECTOR_TREEVIEW_MENU)) {
      if (!$parent.is(SELECTOR_LI)) {
        treeviewMenu = $parent.parent().find(`> ${SELECTOR_TREEVIEW_MENU}`)
      }

      if (!treeviewMenu.is(SELECTOR_TREEVIEW_MENU)) {
        return
      }
    }

    event.preventDefault()

    const parentLi = $relativeTarget.parents(SELECTOR_LI).first()
    const isOpen = parentLi.hasClass(CLASS_NAME_OPEN)

    if (isOpen) {
      this.collapse(jquery__WEBPACK_IMPORTED_MODULE_0___default()(treeviewMenu), parentLi)
    } else {
      this.expand(jquery__WEBPACK_IMPORTED_MODULE_0___default()(treeviewMenu), parentLi)
    }
  }

  // Private

  _setupListeners() {
    const elementId = this._element.attr('id') !== undefined ? `#${this._element.attr('id')}` : ''
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', `${elementId}${this._config.trigger}`, event => {
      this.toggle(event)
    })
  }

  _expandSidebar() {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').hasClass(CLASS_NAME_SIDEBAR_COLLAPSED)) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._config.sidebarButtonSelector).PushMenu('expand')
    }
  }

  // Static

  static _jQueryInterface(config) {
    return this.each(function () {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)
      const _options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Default, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data())

      if (!data) {
        data = new Treeview(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), _options)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, data)
      }

      if (config === 'init') {
        data[config]()
      }
    })
  }
}

/**
 * Data API
 * ====================================================
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on(EVENT_LOAD_DATA_API, () => {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(SELECTOR_DATA_WIDGET).each(function () {
    Treeview._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'init')
  })
})

/**
 * jQuery API
 * ====================================================
 */

;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = Treeview._jQueryInterface
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].Constructor = Treeview
;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME].noConflict = function () {
  ;(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn)[NAME] = JQUERY_NO_CONFLICT
  return Treeview._jQueryInterface
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Treeview);


/***/ }),

/***/ "./src/js/class-shidashi.js":
/*!**********************************!*\
  !*** ./src/js/class-shidashi.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shidashi": () => (/* binding */ Shidashi)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scrollbars_min_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scrollbars.min.js */ "./src/js/scrollbars.min.js");
/* harmony import */ var _scrollbars_min_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scrollbars_min_js__WEBPACK_IMPORTED_MODULE_1__);

// import 'overlayscrollbars/js/jquery.overlayScrollbars.js';


const default_scroll_opt = {
  autoUpdate           : null,
  autoUpdateInterval   : 330,
  sizeAutoCapable      : true,
  scrollbars : {
    visibility       : "auto",
    autoHide         : "move",
    autoHideDelay    : 800,
    dragScrolling    : true,
    clickScrolling   : true,
    touchSupport     : true,
  },
  textarea : {
    dynWidth       : false,
    dynHeight      : true,
    inheritedAttrs : ["style", "class"]
  }
};

class Shidashi {

  constructor (Shiny){
    this._keep_alive = true;
    this._moduleId = undefined;
    this._raveId = undefined;
    this._active_module = undefined;
    this._shiny_inactive = false;
    this._shiny_callstacks = [];
    this._shiny = Shiny;
    this.shiny_connected = false;
    this.$window = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window);
    this.$document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
    this.$body = jquery__WEBPACK_IMPORTED_MODULE_0___default()("body");
    this.$aside = jquery__WEBPACK_IMPORTED_MODULE_0___default()("aside");
    this.$navIfarme = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".navbar-nav-iframe");
    this.$iframeWrapper = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".content-wrapper.iframe-mode");

    this._dummy = document.createElement("div");
    this._dummy2 = document.createElement("div");
    this._dummyLink = document.createElement("a");
    this._dummyLink.setAttribute("target", "_blank");

//shidashi.$body.append("aaaaa")
    this._localStorage = window.localStorage;
    this._sessionStorage = window.sessionStorage;
    this._keyPrefix = "shidashi-session-";
    this._keyNotification = "shidashi-session";
    this._keyTheme = "shidashi-theme";
    this._listeners = {};
    this._storageDuration = 1000 * 60 * 60 * 24; // 1000 days
    this.sessionData = {};
    this._bodyClasses = [];
    this.variableBodyClasses = ["scroller-not-top", "navbar-hidden"];
    this.scroller = this.makeFancyScroll(
      "body:not(.overflow-hidden)",
      {
        overflowBehavior : {
            x : "hidden",
            y : "scroll"
        },
        callbacks : {
          onScroll : () => {
            this._mainScrollCallback(this.scroller);
          },
        },
      }
    );
  }

  _mainScrollCallback(scrollers) {
    // FIXME: Hide navbar when scrolled down to show more space. It's tricky
    return;
    let isTop, param;
    if(Array.isArray(scrollers)) {
      isTop = scrollers
        .map((scroller, ii) => {
          param = scroller.scroll();
          return(param.position.y);
        })
        .filter(v => {
          return(v == 0);
        })
        .length;
    } else {
      param = scrollers.scroll();
      isTop = param.position.y == 0;
    }

    if(isTop) {
      this.notifyParent(
        "removeClass", [
          "body",
          "scroller-not-top"
        ]
      );
      this.removeClass("body", "scroller-not-top");
    } else {
      this.notifyParent(
        "addClass", [
          "body",
          "scroller-not-top"
        ]
      );
      this.addClass("body", "scroller-not-top");
    }
  }

  openURL(url, target = "_blank") {
    this._dummyLink.setAttribute("target", target);
    this._dummyLink.setAttribute("href", url);
    this._dummyLink.click();
  }

  openIFrameTab(url, title, more = {}, target = "_blank") {
    if( !this.$body.hasClass("parent-frame") ) {
      if( window.parent === window ) {
        this.openURL( url, target );
      } else {
        this.notifyParent("openIFrameTab", [url, title, target, more]);
      }
      return;
    }
    const adminLTEIFrame = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.content-wrapper').data('adminLTEIframeHandler');
    if( !adminLTEIFrame ) {
      return;
    }
    const $title = document.createElement("p");
    $title.innerText = title;

    const $link = document.createElement("a");
    $link.setAttribute("href", url);
    $link.setAttribute("target", target);
    $link.setAttribute("title", title);
    for(let k in more) {
      $link.setAttribute(k, more[k]);
    }
    $link.appendChild( $title );
    adminLTEIFrame.openTabSidebar($link);
  }

  launchStandaloneViewer(outputId) {
    const url = `/?output_id=${ outputId }&rave_id=${ this._raveId }&module=standalone_viewer`;
    this.openURL(url);
  }

  ensureShiny(then){
    if(!this._shiny){
      this._shiny = window.Shiny;
    }
    if( typeof(then) === "function" ){
      this._shiny_callstacks.push(then);
    }
    if(document.readyState && document.readyState === "complete" &&
      this._shiny && this.shiny_connected) {

      while(this._shiny_callstacks.length) {
        const f = this._shiny_callstacks.shift();
        try{
          f(this._shiny);
        }catch(e){
          console.warn(e);
        }
      }
    } else {
      console.debug(`Shiny is not connected, defering request... ($(this._shiny_callstacks.length))`);
    }
  }

  // localStorage to save input data
  fromLocalStorage(key, defaultIfNotFound, ignoreDuration = false){
    try {
      const item = JSON.parse(this._localStorage.getItem(key));
      item.last_saved = new Date(item.last_saved);
      item._key = key;
      if( !ignoreDuration ){
        const now = new Date();
        if((now - item.last_saved) > this._storageDuration) {
          // item expired
          console.debug("Removing expired key: " + key);
          this._localStorage.removeItem(key);
        } else {
          return(item);
        }
      } else {
        return(item);
      }
    } catch (e) {
      console.debug("Removing corrupted key: " + key);
      this._localStorage.removeItem(key);
    }
    if(defaultIfNotFound === true){
      return({
        inputs : {},
        last_saved: new Date(),
        last_edit: this._private_id,
        inputs_changed: [],
        _key: key
      });
    } else {
      return (defaultIfNotFound);
    }

  }

  async cleanLocalStorage(maxEntries = 100) {
    // Clean the localStorage
    const items = [];
    for(let key in this._localStorage){
      if(key.startsWith(this._keyPrefix)){
        const item = this.fromLocalStorage(key);
        if(maxEntries && item){
          items.push( item );
        }
      }
    }

    if(items.length && items.length > maxEntries){
      items.sort((v1, v2) => { return(v1.last_saved > v2.last_saved); });
      items.splice(items.length - maxEntries);
      items.forEach((item) => {
        this._localStorage.removeItem(item._key);
      });
    }
  }

  _setSharedId(shared_id) {
    if(typeof(this._shared_id) !== "string" && typeof(shared_id) === "string"){
      this._shared_id = shared_id;
      this._storage_key = this._keyPrefix + this._shared_id;
    }
    return this._storage_key;
  }
  _setPrivateId(private_id) {
    if(typeof(this._private_id) !== "string"){
      if(typeof(private_id) === "string"){
        this._private_id = private_id;
      } else {
        this._private_id = Math.random().toString(16).substr(2, 8);
      }
    }
    return this._private_id;
  }

  broadcastSessionData(shared_id, private_id){
    const storage_key = this._setSharedId(shared_id);
    if(!storage_key){ return; }
    const private_id_ = this._setPrivateId(private_id);

    const keys_changed = Object.keys(this.sessionData);
    if(!keys_changed.length){
      return;
    }

    const now = new Date();

    // load up from localStorage
    const stored = this.fromLocalStorage(storage_key, true, true);
    stored.last_saved = now;
    stored.last_edit = private_id_;
    stored.inputs_changed = keys_changed;
    for(let k in this.sessionData){
      stored.inputs[k] = this.sessionData[k];
    }
    this._localStorage.setItem(storage_key, JSON.stringify(stored));
    this._localStorage.setItem(this._keyNotification, JSON.stringify({
      "storage_key" : storage_key,
      "private_id": private_id_,
      "last_saved": now
    }));

  }
  broadcastEvent(type, message = {}) {
    const event = new CustomEvent("shidashi-event-" + type, {
      "detail": message
    });
    this._dummy.dispatchEvent(event);
    // also send to shiny
    this.ensureShiny((shiny) => {
      if(typeof(shiny.setInputValue) !== "function"){ return; }
      shiny.setInputValue("@shidashi_event@", {
        type: type,
        message: message,
        shared_id: this._shared_id,
        private_id: this._private_id
      });
    });
  }
  registerListener(type, callback, replace = true) {
    const event_str = "shidashi-event-" + type;
    if(replace){
      const old_function = this._listeners[type];
      if(typeof(old_function) === "function"){
        this._dummy.removeEventListener(event_str, old_function);
      }
    }
    if(typeof(callback) === "function"){
      const cb_ = (evt) => {
        return(callback(evt.detail));
      };
      this._dummy.addEventListener(event_str, cb_);
      this._listeners[type] = cb_;
    }
  }

  _col2Hex(color){
    let col = color.trim();
    if(col.length < 4){ return("#000000"); }
    if(col[0] === "#"){
      if(col.length === 7){ return(col); }
      col = "#"+col[1]+col[1]+col[2]+col[2]+col[3]+col[3];
      return(col);
    }
    let parts = col.match(/rgb[a]{0,1}\((\d+),\s*(\d+),\s*(\d+)[\),]/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
      parts[i] = parseInt(parts[i]).toString(16);
      if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    col = '#' + parts.join('');
    return(col);
  }
  _reportTheme(mode){
    if(typeof(mode) !== "string"){
      const isDark = this.isDarkMode();
      mode = isDark ? "dark": "light";
    }
    const $card_body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".card, .info-box");
    let bgcolor = this._col2Hex(this.$body.css("background-color"));
    if($card_body.length){
      bgcolor = this._col2Hex(jquery__WEBPACK_IMPORTED_MODULE_0___default()($card_body[0]).css("background-color"));
    } else if (mode === "dark"){
      bgcolor = "#343a40";
    }
    this.broadcastEvent("theme.changed", {
      mode: mode,
      background: bgcolor,
      foreground: this._col2Hex(this.$body.css("color"))
    });
  }

  notifyIframes(method, args){
    if(this.$iframeWrapper.length){
      const $iframes = this.$iframeWrapper.find("iframe");
      $iframes.each((_, iframe) => {
        try {
          if(iframe.contentWindow.shidashi){
            iframe.contentWindow.shidashi[method](...args);
          }
        } catch (e) {}
      });
    }
  }

  notifyParent(method, args) {
    if(window.parent && window.parent !== window) {
      if( window.parent.shidashi ) {
        window.parent.shidashi[method](...args);
      }
    }
  }

  // status

  // theme-mode
  asLightMode(){
    this.$body.removeClass("dark-mode");
    //this.$aside.removeClass("sidebar-dark-primary")
    //  .addClass("sidebar-light-primary");
    this.$navIfarme.removeClass("navbar-dark")
      .addClass("navbar-light");
    if(this.$iframeWrapper.length){
      this._sessionStorage.setItem(
        this._keyTheme, "light"
      );
      const $iframes = this.$iframeWrapper.find("iframe");
      $iframes.each((_, iframe) => {
        if(iframe.contentWindow.shidashi){
          iframe.contentWindow.shidashi.asLightMode();
        }
      });
    }
    this._reportTheme("light");
  }

  asDarkMode(){

    this.$body.addClass("dark-mode");
    //this.$aside.removeClass("sidebar-light-primary")
    //  .addClass("sidebar-dark-primary");
    this.$navIfarme.removeClass("navbar-light")
      .addClass("navbar-dark");
    if(this.$iframeWrapper.length){
      this._sessionStorage.setItem(
        this._keyTheme, "dark"
      );
      const $iframes = this.$iframeWrapper.find("iframe");
      $iframes.each((_, iframe) => {
        if(iframe.contentWindow.shidashi){
          iframe.contentWindow.shidashi.asDarkMode();
        }
      });
    }
    this._reportTheme("dark");
  }

  resumeStatus(parentShidashi) {
    if(!parentShidashi) {
      return;
    }
    if(parentShidashi._active_module !== this._moduleId){
      return;
    }

    console.debug(`Resuming status - ${ this._moduleId }`);
    // body classes
    this.variableBodyClasses.forEach((cls) => {
      if( this._bodyClasses.contains(cls) ) {
        parentShidashi.addClass("body", cls);
      } else {
        parentShidashi.removeClass("body", cls);
      }
    });

  }

  // Trigger actions
  click(selector) {
    if(!selector || selector === ''){ return; }
    const el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector);
    if(!el.length){ return; }
    el.click();
  }

  triggerResize(timeout) {
    if( timeout ){
      setTimeout(() => {
        this.triggerResize();
      }, timeout);
    } else {
      this.$window.trigger("resize");
      this._shiny.unbindAll(this._dummy2);
    }

  }

  // tabset
  tabsetAdd(inputId, title, body, active = true){
    let el = document.getElementById(inputId);
    let elbody = document.getElementById(inputId + "Content");
    if(!el){ return("Cannot find tabset with given settings."); }
    if(!elbody){ return("Cannot find tabset with given settings."); }

    el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);

    // check if title existed
    const existing_items = el.children(".nav-item.nav-tab-header");
    if(existing_items.length){
      const existing_title = existing_items.children(".nav-link")
        .toArray()
        .map((v) => {return(v.innerText);});
      if(existing_title.includes(title)){
        return("A tab with title '" + title + "' already exists.");
      }
    }

    // this._shiny.unbindAll(el);

    const tabId = Math.random().toString(16).substr(2, 8);

    // Create header
    const header_item = document.createElement("li");
    header_item.className = "nav-item nav-tab-header";
    const header_a = document.createElement("a");
    header_a.className = "nav-link";
    header_a.setAttribute("href", `#${ inputId }-${tabId}`);
    header_a.setAttribute("id", `${ inputId }-${tabId}-tab`);
    header_a.setAttribute("data-toggle", "pill");
    header_a.setAttribute("role", "tab");
    header_a.setAttribute("aria-controls", `${ inputId }-${tabId}`);
    header_a.setAttribute("aria-selected", "false");
    header_a.innerText = title;

    header_item.appendChild(header_a);

    // add to header

    if(existing_items.length > 0){
      existing_items.last().after(header_item);
    }

    // body
    const body_el = document.createElement("div");
    body_el.className = "tab-pane fade";
    body_el.setAttribute("id", `${ inputId }-${tabId}`);
    body_el.setAttribute("role", "tabpanel");
    body_el.setAttribute("tab-index", tabId);
    body_el.setAttribute("aria-labelledby", `${ inputId }-${tabId}-tab`);
    body_el.innerHTML = body;
    elbody.appendChild(body_el);


    this.ensureShiny((shiny) => {
      shiny.bindAll(jquery__WEBPACK_IMPORTED_MODULE_0___default()(elbody));
    });

    if(active){
      return(this.tabsetActivate(inputId, title));
    }

    return(true);

  }

  tabsetRemove(inputId, title) {
    let el = document.getElementById(inputId);
    let elbody = document.getElementById(inputId + "Content");
    if(!el){ return("Cannot find tabset with given settings."); }
    if(!elbody){ return("Cannot find tabset with given settings."); }

    el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);

    // check if title existed
    const existing_items = el.children(".nav-item.nav-tab-header");
    if(!existing_items.length) {
      return("Tab with title '" + title + "' cannot be found.");
    }
    el = existing_items.children(".nav-link");
    let activate = false;
    let remove_idx = 0;
    const existing_title = el.toArray()
      .map((v, i) => {
        if(v.innerText === title) {
          // remove this tab
          remove_idx = i;
          const rem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el[i]);
          const tabid = rem.attr("aria-controls");
          const tab = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + tabid);
          const is_active = rem.attr("aria-selected");
          this.ensureShiny((shiny) => {
            shiny.unbindAll(tab);
          });
          rem.parent().remove();
          tab.remove();
          if(is_active === "true"){
            activate = true;
          }
        }
        return(v.innerText);
      });
    if(!existing_title.includes(title)){
      return("A tab with title '" + title + "' cannot be found.");
    }
    if(activate && existing_items.length > 1){
      let active_tab;
      if(remove_idx - 1 >= 0){
        active_tab = existing_items[remove_idx - 1];
      } else {
        active_tab = existing_items[remove_idx + 1];
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(active_tab).children("a.nav-link").click();
    }
    return(true);
  }

  tabsetActivate(inputId, title) {
    let el = document.getElementById(inputId);
    let elbody = document.getElementById(inputId + "Content");
    if(!el){ return("Cannot find tabset with given settings."); }
    if(!elbody){ return("Cannot find tabset with given settings."); }

    el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
    const existing_items = el.children(".nav-item.nav-tab-header");
    if(!existing_items.length) {
      return("Tab with title '" + title + "' cannot be found.");
    }

    let activated = false;
    existing_items.each((_, item) => {
      const link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item).children(".nav-link");
      if(link.text() === title){
        link.click();
        activated = true;
      } else {
        link.removeClass("active");
        link.attr("aria-selected", "false");
      }
    });

    if(!activated){
      return("Tab with title '" + title + "' cannot be found.");
    }
    return(true);
  }

  // card, card2, cardset...
  card(args){
    // method: expand, minimize, maximize, ...
    if( !args.method ){ return; }
    if( args.inputId ){
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(".card#" + args.inputId).CardWidget(args.method);
    } else if (args.title){
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.card[data-title='${args.title}']`).CardWidget(args.method);
    } else if (args.selector) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.card${args.selector}`).CardWidget(args.method);
    }

  }

  toggleCard2(selector){
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector).DirectChat("toggle");
  }

  flipBox(inputId){
    let el = document.getElementById(inputId);
    if(el && el.classList.contains("flip-box")) {
      if( el.classList.contains("active") ){
        el.classList.remove("active");
      } else {
        el.classList.add("active");
      }
    }
  }

  // html css operations
  addClass(selector, cls){
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector).addClass(cls);
    if( selector.startsWith("body") ) {
      this._bodyClasses = this.$body[0].classList;
    }
  }
  removeClass(selector, cls){
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector).removeClass(cls);
    if( selector.startsWith("body") ) {
      this._bodyClasses = this.$body[0].classList;
    }
  }

  setInnerHtml(selector, content) {
    const $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector);
    if(!$el.length) { return; }

    if( this._shiny ) {
      this._shiny.unbindAll($el);
    }

    $el.html(content);

    if( this._shiny ) {
      this._shiny.bindAll($el);
    }
  }

  // notification
  createNotification(options) {
    // see https://adminlte.io/docs/3.1//javascript/toasts.html
    this.$document.Toasts('create', options);
  }

  clearNotification(selector) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector || ".toast").toast("hide");
  }

  // set progressOutput
  setProgress(inputId, value, max = 100, description = null){
    if(typeof(value) !== "number" || isNaN(value)){ return; }
    const el = document.getElementById(inputId);
    if(!el){ return; }

    let v = parseInt(value / max * 100);
    if(v < 0){ v = 0; }
    if(v > 100){ v = 100; }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find(".progress-bar").css("width", `${v}%`);
    if(typeof(description) === "string"){
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(el)
        .find(".progress-description.progress-message")
        .text(description);
    }
  }

  // theme-mode
  isDarkMode() {
    return(this.$body.hasClass("dark-mode"));
  }

  // scroller
  makeFancyScroll(selector, options = {}) {
    // https://kingsora.github.io/OverlayScrollbars/#!documentation/options
    const dark_mode = this.isDarkMode();

    const className = options.className || (dark_mode ? "os-theme-thin-light" : "os-theme-thin-dark");

    options.className = className;

    const elems = document.querySelectorAll(selector);
    const instance = jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector)
      .overlayScrollbars(jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(default_scroll_opt, options))
      .overlayScrollbars();

    return(instance);
  }

  scrollTop(duration = 200) {
    if(this.scroller){
      this.scroller.scroll({ y : "0%" }, duration);
    }
  }

  // utils, shiny, ...
  async matchSelector(el, selector, next, strict = false) {
    const $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
    const $els = jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector);

    if(!$el.length || !$els.length){ return; }

    const el_ = $el[0];

    const els = $els.toArray();
    let item;
    for( let i in els ){
      item = els[i];
      if(item === el_ || (!strict && item.contains(el_))){
        if(typeof(next) === "function"){
          return(next(item));
        } else {
          return(true);
        }
      }
    }
    return;
  }

  shinyHandler(action, callback) {
    if(!this._shiny){
      if( window.Shiny ){
        this._shiny = window.Shiny;
      } else {
        console.error("Cannot find window.Shiny object. Is R-shiny running?");
        return false;
      }
    }
    this._shiny.addCustomMessageHandler("shidashi." + action, callback);
  }
  shinySetInput(inputId, value, add_timestamp = true, children = false) {
    this.ensureShiny((shiny) => {
      if( add_timestamp ){
        value.timestamp = new Date();
      }
      value._active_module = this._active_module;
      value.parent_frame = this.$body.hasClass("parent-frame");
      shiny.setInputValue(inputId, value);

      console.debug(`[${this._private_id}] shiny input [${inputId}] <- ${ JSON.stringify(value) }`);

      if(children){

        if(this.$iframeWrapper.length){
          const $iframes = this.$iframeWrapper.find("iframe");

          const f = (shidashi) => {
            shidashi.ensureShiny((shiny) => {
              if( shiny.shinyapp.$socket ) {
                shiny.setInputValue(inputId, value);
              }
            });
          };

          $iframes.each((_, iframe) => {
            // maybe restricted due to CORS
            try {
              /* code */
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(iframe.contentDocument).ready(() => {
                if(iframe.contentWindow.shidashi){
                  f(iframe.contentWindow.shidashi);
                }
              });
            } catch (e) {}
          });
        }

      }

    });
  }

  shinyResetOutput(outputId, message = ""){
    const el = document.getElementById(outputId);
    if(el && el.parentElement){
      this.ensureShiny(() => {
        const $pa_el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el.parentElement);
        Object.keys(this._shiny.outputBindings.bindingNames).forEach((key) => {
          const binding = shidashi._shiny.outputBindings.bindingNames[key].binding;
          if(binding && typeof binding === "function") {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(binding.find($pa_el)).each((_, el2) => {
              if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(el2)[0].id === el.id){

                binding.renderError(el, {
                  message: message,
                  type: "shiny-output-error-shiny.silent.error shiny-output-error-validation"
                });

              }
            });
          }

        });
      });
    }

  }

  // Finalize function when document is ready
  _finalize_initialization(){
    if(this._initialized){ return; }
    this._initialized = true;
    const _this = this;

    // set theme first
    const theme = this._sessionStorage.getItem(this._keyTheme);
    if( theme === "light" ){
      this.asLightMode();
    } else if( theme === "dark"){
      this.asDarkMode();
    }

    // scroll-top widget
    const gotop_el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".back-to-top,.ravedash-back-to-top");
    const gotop_btn = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".back-to-top .btn-go-top,.ravedash-back-to-top .btn-go-top");
    const root_btn = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".back-to-top .dropdown-toggle,.ravedash-back-to-top .dropdown-toggle");
    const menu = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".back-to-top .dropdown-menu,.ravedash-back-to-top .dropdown-menu");
    const anchors = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".shidashi-anchor");

    // Scroll-top widgets
    anchors.each((_, item) => {
      const $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item);
      let item_id = $item.attr("id");
      if( typeof(item_id) !== "string" ){
        item_id = $item.text().replace(/[^a-zA-Z0-9_-]/gi, '-').replace(/(--)/gi, '');
        item_id = "shidashi-anchor-id-" + item_id;
        $item.attr("id", item_id);
      }
      const el = document.createElement("a");
      el.className = "dropdown-item";
      el.href = "#" + item_id;
      if(item.textContent) {
        el.innerText = item.textContent.trim();
      } else {
        el.innerText = item.innerText.trim();
      }
      menu.append( el );
    });
    root_btn.mouseenter(() => {
      if(root_btn.attr("aria-expanded") === "false"){
        root_btn.dropdown("toggle");
        menu.addClass("show");
        root_btn.attr("aria-expanded", "true");
      }
    });
    gotop_el.mouseleave(() => {
      if(root_btn.attr("aria-expanded") === "true"){
        root_btn.dropdown("toggle");
        menu.removeClass("show");
        root_btn.attr("aria-expanded", "false");
      }
    });

    gotop_btn.click(() => { this.scrollTop() });

    // --------------- Triggers resize -------------------------
    this.$document.on('expanded.lte.cardwidget', (evt) => {

      if(evt.target){
        const card = jquery__WEBPACK_IMPORTED_MODULE_0___default()(evt.target).parents(".card.start-collapsed");

        if(card.length > 0){

          setTimeout(() => {
            this.ensureShiny(() => { this._shiny.unbindAll(card); });
            card.removeClass("start-collapsed");
            this.ensureShiny(() => { this._shiny.bindAll(card); });
          }, 200);

        }
      }
      this.triggerResize(50);

    });
    this.$document.on('maximized.lte.cardwidget', () => {
      this.$body.addClass("card-expanded");
      this.triggerResize(50);
    });
    this.$document.on('minimized.lte.cardwidget', () => {
      this.$body.removeClass("card-expanded");
      this.triggerResize(50);
    });
    this.$document.on("loaded.lte.cardrefresh", () => {
      this.triggerResize(50);
    });

    this.$body.on("show.bs.tab", (evt) => {
      if(evt.type !== "show") { return; }
      const el = evt.target;
      const pa = el.parentNode.closest('.card-tabs [role="tablist"]');

      if(!pa || !pa.id) { return; }
      const tabname = el.innerText;

      this.ensureShiny(() => {
        this._shiny.setInputValue(pa.id, tabname);
      });
    })
    // --------------- Notification system -----------
    this.$body.on('show.bs.toast', (evt)=>{
      this.ensureShiny(() => {
        this._shiny.bindAll(jquery__WEBPACK_IMPORTED_MODULE_0___default()(evt.target));
      });
    });
    this.$body.on('hide.bs.toast', (evt)=>{
      this.ensureShiny(() => {
        this._shiny.unbindAll(jquery__WEBPACK_IMPORTED_MODULE_0___default()(evt.target));
      });
    });

    // --------------- Fancy scroll ---------------
    this.makeFancyScroll(".fancy-scroll-y:not(.overflow-hidden,.screen-height), .overflow-y-auto", {
        overflowBehavior : {
            x : "hidden",
            y : "scroll"
        }
      });

    const screenScrollers = this.makeFancyScroll(".screen-height.overflow-y-scroll", {
      overflowBehavior : {
          x : "hidden",
          y : "scroll"
      },
      callbacks : {
        onScroll : () => {
          this._mainScrollCallback(screenScrollers);
        },
      },
    });


    this.makeFancyScroll(".resize-vertical", {
        resize: "vertical",
        overflowBehavior : {
            x : "hidden",
            y : "scroll"
        },
        callbacks : {
          onHostSizeChanged : () => {
            this.triggerResize( 200 );
          }
        }
      });
    this.makeFancyScroll(".fancy-scroll-x", {
        overflowBehavior : {
          x : "scroll",
          y : "hidden"
        }
      });
    this.makeFancyScroll(".fancy-scroll, .overflow-auto", {
        overflowBehavior : {
          x : "scroll",
          y : "scroll"
        }
      });

    // register listener
    window.addEventListener('storage', (evt) => {
        if(evt.key !== this._keyNotification){ return; }

        const storage_key = this._storage_key;
        const private_id = this._private_id;

        if(!storage_key || !private_id){ return; }

        // When local storage changes
        try {
          const item = JSON.parse(this._localStorage.getItem(this._keyNotification));
          const last_saved = new Date(item.last_saved);
          if(new Date() - last_saved < this._storageDuration){
            if(item.storage_key === storage_key) {
              if(private_id !== item.private_id){
                this.ensureShiny((shiny) => {
                  shiny.onInputChange("@shidashi@", this._localStorage.getItem(storage_key));
                });
              }
            }
          }
        } catch (e) {}
      });

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".theme-switch-wrapper .theme-switch input[type='checkbox']")
      .change((_) => {
        if(this.isDarkMode()){
          this.asLightMode();
        } else {
          this.asDarkMode();
        }
      });

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".shidashi-button").click(function(_){
      let el = this;
      let action = el.getAttribute('shidashi-action');
      if(typeof action === "string"){
        action = JSON.parse(action);
        if( typeof action.method === "string" &&
            typeof _this[action.method] === "function" ){
          _this[action.method].apply(_this, action.args);
        }
      }
    });

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.rave-button').click(function(evt){
      let el = this;
      let action = el.getAttribute("rave-action");
      if(typeof action === "string"){
        try {
          action = JSON.parse(action);

          if( typeof action.type !== "string" ) {
            console.warn("Cannot parse RAVE-action: " + action);
            return;
          }
          // check if body has parent-frame class
          _this.shinySetInput("@rave_action@", {
            type: action.type,
            details: action,
            element_class: evt.target.className
          }, true, true);

        } catch (e) {
          console.warn("Cannot parse RAVE-action: " + action);
        }
      }
    });

    this.$document.on("click", (evt) => {

      this.matchSelector(
        evt.target,
        '.card-tools .btn-tool[data-card-widget="refresh"]',
        () => {
          this.triggerResize(50);
        }
      );

      this.matchSelector(
        evt.target,
        '.ravedash-output-widget[data-type="standalone"]',
        (el) => {
          let outputId = el.getAttribute("data-target");
          if( outputId.startsWith(this._moduleId + "-") ) {
            outputId = outputId.replace(this._moduleId + "-", "");
          }
          this.launchStandaloneViewer(outputId);
        }
      );

      this.matchSelector(
        evt.target,
        '.card-tools .btn-tool[data-card-widget="flip"]',
        (el) => {
          const $card = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).parents(".card");
          if(!$card.length){ return; }
          jquery__WEBPACK_IMPORTED_MODULE_0___default()($card[0]).find(".card-body .flip-box").toggleClass("active");
        }
      );

      this.matchSelector(
        evt.target,
        '.toggle-advance-options',
        (el) => {
          const $card = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).parents(".card");
          if(!$card.length){ return; }
          jquery__WEBPACK_IMPORTED_MODULE_0___default()($card[0]).find(".rave-optional").toggleClass("soft-hidden");
        }
      );

    });

    this.$document.on("dblclick", (evt) => {

      this.matchSelector(
        evt.target,
        '.flip-box',
        (item) => {
          const $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(item);
          const action = $el.attr("data-toggle");
          if(action === "click"){
            $el.toggleClass("active");
          } else if (action === "click-front"){
            $el.addClass("active");
          }
        }
      );

    });

    this.$document.on("keydown", (evt) => {
      if(evt.key === "Enter" && (evt.ctrlKey || evt.metaKey)) {
        evt.preventDefault();
        this.shinySetInput("@rave_action@", {
          type: "run_analysis"
        }, true, true);
      }
    });

  }

  _register_shiny() {
    if(!this._shiny){
      if( window.Shiny ){
        this._shiny = window.Shiny;
      } else {
        console.error("Cannot find window.Shiny object. Is R-shiny running?");
        return false;
      }
    }
    if(this._shiny_registered) { return; }
    this._shiny_registered = true;

    this.shinyHandler("set_current_module", (params) => {
      this._moduleId = params.module_id;
      this._raveId = params.rave_id;
    });

    this.shinyHandler("click", (params) => {
      this.click(params.selector);
    });
    this.shinyHandler("box_flip", (params) => {
      this.flipBox(params.inputId);
    });

    this.shinyHandler("card_tabset_insert", (params) => {
      const added = this.tabsetAdd( params.inputId, params.title,
                                    params.body, params.active );
      if(params.notify_on_failure === true && added !== true){
        this.createNotification({
          "autohide": true,
          "delay" : 2000,
          "title" : "Cannot create new tab",
          "body"  : added,
          "class" : "bg-warning"
        });
      }
    });
    this.shinyHandler("card_tabset_remove", (params) => {
      const removed = this.tabsetRemove( params.inputId, params.title );
      if(params.notify_on_failure === true && removed !== true){
        this.createNotification({
          "autohide": true,
          "delay" : 2000,
          "title" : "Cannot remove tab " + params.title,
          "body"  : removed,
          "class" : "bg-warning"
        });
      }
    });
    this.shinyHandler("card_tabset_activate", (params) => {
      const activated = this.tabsetActivate( params.inputId, params.title );
      if(params.notify_on_failure === true && activated !== true){
        this.createNotification({
          "autohide": true,
          "delay" : 2000,
          "title" : "Cannot activate tab " + params.title,
          "body"  : activated,
          "class" : "bg-warning"
        });
      }
    });

    this.shinyHandler("cardwidget", (params) => {
      this.card(params);
    });
    this.shinyHandler("card2widget", (params) => {
      this.toggleCard2(params.selector);
    });

    this.shinyHandler("add_class", (params) => {
      this.addClass(params.selector, params.class);
    });
    this.shinyHandler("remove_class", (params) => {
      this.removeClass(params.selector, params.class);
    });
    this.shinyHandler("set_html", (params) => {
      this.setInnerHtml(params.selector, params.content);
    });

    this.shinyHandler("show_notification", (params) => {
      this.createNotification(params);
    });
    this.shinyHandler("clear_notification", (params) => {
      this.clearNotification(params.selector);
    });

    this.shinyHandler("set_progress", (params) => {
      this.setProgress(params.outputId, params.value,
        params.max || 100, params.description);
    });

    this.shinyHandler("make_scroll_fancy", (params) => {
      if(!params.selector || params.selector === ''){ return; }
      this.makeFancyScroll(
        params.selector,
        params.options || {}
      );
    });

    this.shinyHandler("cache_session_input", (params) => {
      this.sessionData = params.inputs;
      this.broadcastSessionData(params.shared_id, params.private_id);
    });

    this.shinyHandler("get_theme", (_) => {
      this._reportTheme();
    });

    this.shinyHandler("reset_output", (params) => {
      this.shinyResetOutput(params.outputId, params.message || "");
    });

    this.shinyHandler("hide_header", (params) => {
      this.addClass("body", "navbar-hidden");
      this.notifyParent("addClass", [
        "body", "navbar-hidden"
      ])
    });
    this.shinyHandler("show_header", (params) => {
      this.removeClass("body", "navbar-hidden");
      this.notifyParent("removeClass", [
        "body", "navbar-hidden"
      ])
    });

    this.shinyHandler("shutdown_session", (params) => {
      console.log("Shutting down RAVE...")
      window.close();
    });

    this.shinyHandler("open_url", (params) => {
      if(
        params && typeof params === "object" &&
        typeof params.url === "string" ) {

        const target = params.target || "_blank";
        this.openURL(params.url, "_blank");
      }

    });

    this.shinyHandler("open_iframe_tab", (params) => {
      if(
        params && typeof params === "object" &&
        typeof params.url === "string" ) {

        const title = params.title || "Untitled";
        const target = params.target || "_blank";
        const more = params.more || {};
        this.openIFrameTab(params.url, title, target, more);
      }

    });





    // keep alive
    /*let alive_counter = 0;
    const keep_alive = () => {
      if( this._keep_alive ) {
        alive_counter++;
        this._shiny.setInputValue(".__shidashi_keep_alive_signal__.", alive_counter);
      }
      // send signal to R session every other 25 seconds
      setTimeout(keep_alive, 25000);
    };
    keep_alive();
    */

  }
}





/***/ }),

/***/ "./src/js/import-highlightjs.js":
/*!**************************************!*\
  !*** ./src/js/import-highlightjs.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerHighlightJS": () => (/* binding */ registerHighlightJS)
/* harmony export */ });
/* harmony import */ var highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! highlight.js/lib/core */ "./node_modules/highlight.js/es/core.js");
/* harmony import */ var highlight_js_lib_languages_matlab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highlight.js/lib/languages/matlab */ "./node_modules/highlight.js/es/languages/matlab.js");
/* harmony import */ var highlight_js_lib_languages_python__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highlight.js/lib/languages/python */ "./node_modules/highlight.js/es/languages/python.js");
/* harmony import */ var highlight_js_lib_languages_yaml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! highlight.js/lib/languages/yaml */ "./node_modules/highlight.js/es/languages/yaml.js");
/* harmony import */ var highlight_js_lib_languages_r__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! highlight.js/lib/languages/r */ "./node_modules/highlight.js/es/languages/r.js");
/* harmony import */ var highlight_js_lib_languages_markdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! highlight.js/lib/languages/markdown */ "./node_modules/highlight.js/es/languages/markdown.js");







// import 'highlight.js/styles/github.css';


function registerHighlightJS () {
  highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_0__["default"].registerLanguage('python', highlight_js_lib_languages_python__WEBPACK_IMPORTED_MODULE_2__["default"]);
  highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_0__["default"].registerLanguage('py', highlight_js_lib_languages_python__WEBPACK_IMPORTED_MODULE_2__["default"]);
  highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_0__["default"].registerLanguage('matlab', highlight_js_lib_languages_matlab__WEBPACK_IMPORTED_MODULE_1__["default"]);
  highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_0__["default"].registerLanguage('r', highlight_js_lib_languages_r__WEBPACK_IMPORTED_MODULE_4__["default"]);
  highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_0__["default"].registerLanguage('yaml', highlight_js_lib_languages_yaml__WEBPACK_IMPORTED_MODULE_3__["default"]);
  highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_0__["default"].registerLanguage('markdown', highlight_js_lib_languages_markdown__WEBPACK_IMPORTED_MODULE_5__["default"]);
  highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_0__["default"].registerLanguage('md', highlight_js_lib_languages_markdown__WEBPACK_IMPORTED_MODULE_5__["default"]);

  highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_0__["default"].initHighlightingOnLoad();
  if (document.readyState && document.readyState === "complete") {
    window.setTimeout(function() { highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_0__["default"].initHighlighting(); }, 0);
  }
}





/***/ }),

/***/ "./src/js/scrollbars.min.js":
/*!**********************************!*\
  !*** ./src/js/scrollbars.min.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.13.0
 *
 * Copyright KingSora | Rene Haas.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 02.08.2020
 */
!function(t,r){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(n){return r(t,t.document,undefined,n)}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0}("undefined"!=typeof window?window:this,function(vi,di,hi,n){"use strict";var o,l,f,a,pi="object",bi="function",yi="array",mi="string",gi="boolean",wi="number",t="null",xi={c:"class",s:"style",i:"id",l:"length",p:"prototype",ti:"tabindex",oH:"offsetHeight",cH:"clientHeight",sH:"scrollHeight",oW:"offsetWidth",cW:"clientWidth",sW:"scrollWidth",hOP:"hasOwnProperty",bCR:"getBoundingClientRect"},_i=(o={},l={},{e:f=["-webkit-","-moz-","-o-","-ms-"],o:a=["WebKit","Moz","O","MS"],u:function(n){var t=l[n];if(l[xi.hOP](n))return t;for(var r,e,i,o=c(n),a=di.createElement("div")[xi.s],u=0;u<f.length;u++)for(i=f[u].replace(/-/g,""),r=[n,f[u]+n,i+o,c(i)+o],e=0;e<r[xi.l];e++)if(a[r[e]]!==hi){t=r[e];break}return l[n]=t},v:function(n,t,r){var e=n+" "+t,i=l[e];if(l[xi.hOP](e))return i;for(var o,a=di.createElement("div")[xi.s],u=t.split(" "),f=r||"",c=0,s=-1;c<u[xi.l];c++)for(;s<_i.e[xi.l];s++)if(o=s<0?u[c]:_i.e[s]+u[c],a.cssText=n+":"+o+f,a[xi.l]){i=o;break}return l[e]=i},d:function(n,t,r){var e=0,i=o[n];if(!o[xi.hOP](n)){for(i=vi[n];e<a[xi.l];e++)i=i||vi[(t?a[e]:a[e].toLowerCase())+c(n)];o[n]=i}return i||r}});function c(n){return n.charAt(0).toUpperCase()+n.slice(1)}var Si={wW:e(r,0,!0),wH:e(r,0),mO:e(_i.d,0,"MutationObserver",!0),rO:e(_i.d,0,"ResizeObserver",!0),rAF:e(_i.d,0,"requestAnimationFrame",!1,function(n){return vi.setTimeout(n,1e3/60)}),cAF:e(_i.d,0,"cancelAnimationFrame",!1,function(n){return vi.clearTimeout(n)}),now:function(){return Date.now&&Date.now()||(new Date).getTime()},stpP:function(n){n.stopPropagation?n.stopPropagation():n.cancelBubble=!0},prvD:function(n){n.preventDefault&&n.cancelable?n.preventDefault():n.returnValue=!1},page:function(n){var t=((n=n.originalEvent||n).target||n.srcElement||di).ownerDocument||di,r=t.documentElement,e=t.body;if(n.touches===hi)return!n.pageX&&n.clientX&&null!=n.clientX?{x:n.clientX+(r&&r.scrollLeft||e&&e.scrollLeft||0)-(r&&r.clientLeft||e&&e.clientLeft||0),y:n.clientY+(r&&r.scrollTop||e&&e.scrollTop||0)-(r&&r.clientTop||e&&e.clientTop||0)}:{x:n.pageX,y:n.pageY};var i=n.touches[0];return{x:i.pageX,y:i.pageY}},mBtn:function(n){var t=n.button;return n.which||t===hi?n.which:1&t?1:2&t?3:4&t?2:0},inA:function(n,t){for(var r=0;r<t[xi.l];r++)try{if(t[r]===n)return r}catch(e){}return-1},isA:function(n){var t=Array.isArray;return t?t(n):this.type(n)==yi},type:function(n){return n===hi||null===n?n+"":Object[xi.p].toString.call(n).replace(/^\[object (.+)\]$/,"$1").toLowerCase()},bind:e};function r(n){return n?vi.innerWidth||di.documentElement[xi.cW]||di.body[xi.cW]:vi.innerHeight||di.documentElement[xi.cH]||di.body[xi.cH]}function e(n,t){if(typeof n!=bi)throw"Can't bind function!";var r=xi.p,e=Array[r].slice.call(arguments,2),i=function(){},o=function(){return n.apply(this instanceof i?this:t,e.concat(Array[r].slice.call(arguments)))};return n[r]&&(i[r]=n[r]),o[r]=new i,o}var i,u,zi,s,v,L,N,d,h,p,b,y,m,g,Ti,Oi=Math,ki=n,Ci=(n.easing,n),Ai=(i=[],u="__overlayScrollbars__",function(n,t){var r=arguments[xi.l];if(r<1)return i;if(t)n[u]=t,i.push(n);else{var e=Si.inA(n,i);if(-1<e){if(!(1<r))return i[e][u];delete n[u],i.splice(e,1)}}}),w=(g=[],L=Si.type,y={className:["os-theme-dark",[t,mi]],resize:["none","n:none b:both h:horizontal v:vertical"],sizeAutoCapable:d=[!0,gi],clipAlways:d,normalizeRTL:d,paddingAbsolute:h=[!(N=[gi,wi,mi,yi,pi,bi,t]),gi],autoUpdate:[null,[t,gi]],autoUpdateInterval:[33,wi],updateOnLoad:[["img"],[mi,yi,t]],nativeScrollbarsOverlaid:{showNativeScrollbars:h,initialize:d},overflowBehavior:{x:["scroll",b="v-h:visible-hidden v-s:visible-scroll s:scroll h:hidden"],y:["scroll",b]},scrollbars:{visibility:["auto","v:visible h:hidden a:auto"],autoHide:["never","n:never s:scroll l:leave m:move"],autoHideDelay:[800,wi],dragScrolling:d,clickScrolling:h,touchSupport:d,snapHandle:h},textarea:{dynWidth:h,dynHeight:h,inheritedAttrs:[["style","class"],[mi,yi,t]]},callbacks:{onInitialized:p=[null,[t,bi]],onInitializationWithdrawn:p,onDestroyed:p,onScrollStart:p,onScroll:p,onScrollStop:p,onOverflowChanged:p,onOverflowAmountChanged:p,onDirectionChanged:p,onContentSizeChanged:p,onHostSizeChanged:p,onUpdated:p}},Ti={m:(m=function(i){var o=function(n){var t,r,e;for(t in n)n[xi.hOP](t)&&(r=n[t],(e=L(r))==yi?n[t]=r[i?1:0]:e==pi&&(n[t]=o(r)));return n};return o(Ci.extend(!0,{},y))})(),g:m(!0),_:function(n,t,C,r){var e={},i={},o=Ci.extend(!0,{},n),A=Ci.inArray,H=Ci.isEmptyObject,R=function(n,t,r,e,i,o){for(var a in t)if(t[xi.hOP](a)&&n[xi.hOP](a)){var u,f,c,s,l,v,d,h,p=!1,b=!1,y=t[a],m=L(y),g=m==pi,w=Si.isA(y)?y:[y],x=r[a],_=n[a],S=L(_),z=o?o+".":"",T='The option "'+z+a+"\" wasn't set, because",O=[],k=[];if(x=x===hi?{}:x,g&&S==pi)e[a]={},i[a]={},R(_,y,x,e[a],i[a],z+a),Ci.each([n,e,i],function(n,t){H(t[a])&&delete t[a]});else if(!g){for(v=0;v<w[xi.l];v++)if(l=w[v],c=(m=L(l))==mi&&-1===A(l,N))for(O.push(mi),u=l.split(" "),k=k.concat(u),d=0;d<u[xi.l];d++){for(s=(f=u[d].split(":"))[0],h=0;h<f[xi.l];h++)if(_===f[h]){p=!0;break}if(p)break}else if(O.push(l),S===l){p=!0;break}p?((b=_!==x)&&(e[a]=_),(c?A(x,f)<0:b)&&(i[a]=c?s:_)):C&&console.warn(T+" it doesn't accept the type [ "+S.toUpperCase()+' ] with the value of "'+_+'".\r\nAccepted types are: [ '+O.join(", ").toUpperCase()+" ]."+(0<k[length]?"\r\nValid strings are: [ "+k.join(", ").split(":").join(", ")+" ].":"")),delete n[a]}}};return R(o,t,r||{},e,i),!H(o)&&C&&console.warn("The following options are discarded due to invalidity:\r\n"+vi.JSON.stringify(o,null,2)),{S:e,z:i}}},(zi=vi.OverlayScrollbars=function(n,r,e){if(0===arguments[xi.l])return this;var i,t,o=[],a=Ci.isPlainObject(r);return n?(n=n[xi.l]!=hi?n:[n[0]||n],x(),0<n[xi.l]&&(a?Ci.each(n,function(n,t){(i=t)!==hi&&o.push(z(i,r,e,s,v))}):Ci.each(n,function(n,t){i=Ai(t),("!"===r&&zi.valid(i)||Si.type(r)==bi&&r(t,i)||r===hi)&&o.push(i)}),t=1===o[xi.l]?o[0]:o),t):a||!r?t:o}).globals=function(){x();var n=Ci.extend(!0,{},s);return delete n.msie,n},zi.defaultOptions=function(n){x();var t=s.defaultOptions;if(n===hi)return Ci.extend(!0,{},t);s.defaultOptions=Ci.extend(!0,{},t,Ti._(n,Ti.g,!0,t).S)},zi.valid=function(n){return n instanceof zi&&!n.getState().destroyed},zi.extension=function(n,t,r){var e=Si.type(n)==mi,i=arguments[xi.l],o=0;if(i<1||!e)return Ci.extend(!0,{length:g[xi.l]},g);if(e)if(Si.type(t)==bi)g.push({name:n,extensionFactory:t,defaultOptions:r});else for(;o<g[xi.l];o++)if(g[o].name===n){if(!(1<i))return Ci.extend(!0,{},g[o]);g.splice(o,1)}},zi);function x(){s=s||new _(Ti.m),v=v||new S(s)}function _(n){var _=this,i="overflow",S=Ci("body"),z=Ci('<div id="os-dummy-scrollbar-size"><div></div></div>'),o=z[0],e=Ci(z.children("div").eq(0));S.append(z),z.hide().show();var t,r,a,u,f,c,s,l,v,d=T(o),h={x:0===d.x,y:0===d.y},p=(r=vi.navigator.userAgent,u="substring",f=r[a="indexOf"]("MSIE "),c=r[a]("Trident/"),s=r[a]("Edge/"),l=r[a]("rv:"),v=parseInt,0<f?t=v(r[u](f+5,r[a](".",f)),10):0<c?t=v(r[u](l+3,r[a](".",l)),10):0<s&&(t=v(r[u](s+5,r[a](".",s)),10)),t);function T(n){return{x:n[xi.oH]-n[xi.cH],y:n[xi.oW]-n[xi.cW]}}Ci.extend(_,{defaultOptions:n,msie:p,autoUpdateLoop:!1,autoUpdateRecommended:!Si.mO(),nativeScrollbarSize:d,nativeScrollbarIsOverlaid:h,nativeScrollbarStyling:function(){var n=!1;z.addClass("os-viewport-native-scrollbars-invisible");try{n="none"===z.css("scrollbar-width")&&(9<p||!p)||"none"===vi.getComputedStyle(o,"::-webkit-scrollbar").getPropertyValue("display")}catch(t){}return n}(),overlayScrollbarDummySize:{x:30,y:30},cssCalc:_i.v("width","calc","(1px)")||null,restrictedMeasuring:function(){z.css(i,"hidden");var n=o[xi.sW],t=o[xi.sH];z.css(i,"visible");var r=o[xi.sW],e=o[xi.sH];return n-r!=0||t-e!=0}(),rtlScrollBehavior:function(){z.css({"overflow-y":"hidden","overflow-x":"scroll",direction:"rtl"}).scrollLeft(0);var n=z.offset(),t=e.offset();z.scrollLeft(-999);var r=e.offset();return{i:n.left===t.left,n:t.left!==r.left}}(),supportTransform:!!_i.u("transform"),supportTransition:!!_i.u("transition"),supportPassiveEvents:function(){var n=!1;try{vi.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){n=!0}}))}catch(t){}return n}(),supportResizeObserver:!!Si.rO(),supportMutationObserver:!!Si.mO()}),z.removeAttr(xi.s).remove(),function(){if(!h.x||!h.y){var y=Oi.abs,m=Si.wW(),g=Si.wH(),w=x();Ci(vi).on("resize",function(){if(0<Ai().length){var n=Si.wW(),t=Si.wH(),r=n-m,e=t-g;if(0==r&&0==e)return;var i,o=Oi.round(n/(m/100)),a=Oi.round(t/(g/100)),u=y(r),f=y(e),c=y(o),s=y(a),l=x(),v=2<u&&2<f,d=!function b(n,t){var r=y(n),e=y(t);return r!==e&&r+1!==e&&r-1!==e}(c,s),h=v&&d&&(l!==w&&0<w),p=_.nativeScrollbarSize;h&&(S.append(z),i=_.nativeScrollbarSize=T(z[0]),z.remove(),p.x===i.x&&p.y===i.y||Ci.each(Ai(),function(){Ai(this)&&Ai(this).update("zoom")})),m=n,g=t,w=l}})}function x(){var n=vi.screen.deviceXDPI||0,t=vi.screen.logicalXDPI||1;return vi.devicePixelRatio||n/t}}()}function S(r){var c,e=Ci.inArray,s=Si.now,l="autoUpdate",v=xi.l,d=[],h=[],p=!1,b=33,y=s(),m=function(){if(0<d[v]&&p){c=Si.rAF()(function(){m()});var n,t,r,e,i,o,a=s(),u=a-y;if(b<u){y=a-u%b,n=33;for(var f=0;f<d[v];f++)(t=d[f])!==hi&&(e=(r=t.options())[l],i=Oi.max(1,r.autoUpdateInterval),o=s(),(!0===e||null===e)&&o-h[f]>i&&(t.update("auto"),h[f]=new Date(o+=i)),n=Oi.max(1,Oi.min(n,i)));b=n}}else b=33};this.add=function(n){-1===e(n,d)&&(d.push(n),h.push(s()),0<d[v]&&!p&&(p=!0,r.autoUpdateLoop=p,m()))},this.remove=function(n){var t=e(n,d);-1<t&&(h.splice(t,1),d.splice(t,1),0===d[v]&&p&&(p=!1,r.autoUpdateLoop=p,c!==hi&&(Si.cAF()(c),c=-1)))}}function z(r,n,t,xt,_t){var cn=Si.type,sn=Ci.inArray,d=Ci.each,St=new zi,e=Ci[xi.p];if(dt(r)){if(Ai(r)){var i=Ai(r);return i.options(n),i}var zt,Tt,Ot,kt,I,Ct,At,Ht,j,ln,g,A,h,Rt,Lt,Nt,Wt,w,p,Dt,Mt,Et,It,jt,Ft,Pt,Ut,Vt,$t,o,a,qt,Bt,Xt,u,F,c,P,Yt,Kt,Gt,Jt,Qt,Zt,nr,tr,rr,er,ir,f,s,l,v,b,y,x,H,or,ar,ur,R,fr,cr,sr,lr,vr,dr,hr,pr,br,yr,mr,gr,wr,xr,_r,L,Sr,zr,Tr,Or,kr,Cr,Ar,Hr,m,_,Rr,Lr,Nr,Wr,Dr,Mr,Er,Ir,jr,Fr,Pr,Ur,Vr,$r,S,z,T,O,qr,Br,k,C,Xr,Yr,Kr,Gr,Jr,U,V,Qr,Zr,ne,te,re={},vn={},dn={},ee={},ie={},N="-hidden",oe="margin-",ae="padding-",ue="border-",fe="top",ce="right",se="bottom",le="left",ve="min-",de="max-",he="width",pe="height",be="float",ye="",me="auto",hn="sync",ge="scroll",we="100%",pn="x",bn="y",W=".",xe=" ",D="scrollbar",M="-horizontal",E="-vertical",_e=ge+"Left",Se=ge+"Top",$="mousedown touchstart",q="mouseup touchend touchcancel",B="mousemove touchmove",X="mouseenter",Y="mouseleave",K="keydown",G="keyup",J="selectstart",Q="transitionend webkitTransitionEnd oTransitionEnd",Z="__overlayScrollbarsRO__",nn="os-",tn="os-html",rn="os-host",en=rn+"-foreign",on=rn+"-textarea",an=rn+"-"+D+M+N,un=rn+"-"+D+E+N,fn=rn+"-transition",ze=rn+"-rtl",Te=rn+"-resize-disabled",Oe=rn+"-scrolling",ke=rn+"-overflow",Ce=(ke=rn+"-overflow")+"-x",Ae=ke+"-y",yn="os-textarea",mn=yn+"-cover",gn="os-padding",wn="os-viewport",He=wn+"-native-scrollbars-invisible",xn=wn+"-native-scrollbars-overlaid",_n="os-content",Re="os-content-arrange",Le="os-content-glue",Ne="os-size-auto-observer",Sn="os-resize-observer",zn="os-resize-observer-item",Tn=zn+"-final",On="os-text-inherit",kn=nn+D,Cn=kn+"-track",An=Cn+"-off",Hn=kn+"-handle",Rn=Hn+"-off",Ln=kn+"-unusable",Nn=kn+"-"+me+N,Wn=kn+"-corner",We=Wn+"-resize",De=We+"-both",Me=We+M,Ee=We+E,Dn=kn+M,Mn=kn+E,En="os-dragging",Ie="os-theme-none",In=[He,xn,An,Rn,Ln,Nn,We,De,Me,Ee,En].join(xe),jn=[],Fn=[xi.ti],Pn={},je={},Fe=42,Un="load",Vn=[],$n={},qn=["wrap","cols","rows"],Bn=[xi.i,xi.c,xi.s,"open"].concat(Fn),Xn=[];return St.sleep=function(){$t=!0},St.update=function(n){var t,r,e,i,o;if(!Lt)return cn(n)==mi?n===me?(t=function a(){if(!$t&&!qr){var r,e,i,o=[],n=[{T:Kt,O:Bn.concat(":visible")},{T:Nt?Yt:hi,O:qn}];return d(n,function(n,t){(r=t.T)&&d(t.O,function(n,t){e=":"===t.charAt(0)?r.is(t):r.attr(t),i=$n[t],ui(e,i)&&o.push(t),$n[t]=e})}),it(o),0<o[xi.l]}}(),r=function f(){if($t)return!1;var n,t,r,e,i=oi(),o=Nt&&br&&!jr?Yt.val().length:0,a=!qr&&br&&!Nt,u={};return a&&(n=nr.css(be),u[be]=Vt?ce:le,u[he]=me,nr.css(u)),e={w:i[xi.sW]+o,h:i[xi.sH]+o},a&&(u[be]=n,u[he]=we,nr.css(u)),t=qe(),r=ui(e,m),m=e,r||t}(),(e=t||r)&&Xe({k:r,C:Rt?hi:qt})):n===hn?qr?(i=T(S.takeRecords()),o=O(z.takeRecords())):i=St.update(me):"zoom"===n&&Xe({A:!0,k:!0}):(n=$t||n,$t=!1,St.update(hn)&&!n||Xe({H:n})),Ye(),e||i||o},St.options=function(n,t){var r,e={};if(Ci.isEmptyObject(n)||!Ci.isPlainObject(n)){if(cn(n)!=mi)return a;if(!(1<arguments.length))return bt(a,n);!function f(n,t,r){for(var e=t.split(W),i=e.length,o=0,a={},u=a;o<i;o++)a=a[e[o]]=o+1<i?{}:r;Ci.extend(n,u,!0)}(e,n,t),r=ot(e)}else r=ot(n);Ci.isEmptyObject(r)||Xe({C:r})},St.destroy=function(){if(!Lt){for(var n in _t.remove(St),Ve(),Pe(Jt),Pe(Gt),Pn)St.removeExt(n);for(;0<Xn[xi.l];)Xn.pop()();$e(!0),rr&&mt(rr),tr&&mt(tr),Mt&&mt(Gt),ft(!0),st(!0),at(!0);for(var t=0;t<Vn[xi.l];t++)Ci(Vn[t]).off(Un,rt);Vn=hi,$t=Lt=!0,Ai(r,0),ti("onDestroyed")}},St.scroll=function(n,t,r,e){if(0===arguments.length||n===hi){var i=Mr&&Vt&&Ot.i,o=Mr&&Vt&&Ot.n,a=vn.R,u=vn.L,f=vn.N;return u=i?1-u:u,a=i?f-a:a,f*=o?-1:1,{position:{x:a*=o?-1:1,y:dn.R},ratio:{x:u,y:dn.L},max:{x:f,y:dn.N},handleOffset:{x:vn.W,y:dn.W},handleLength:{x:vn.D,y:dn.D},handleLengthRatio:{x:vn.M,y:dn.M},trackLength:{x:vn.I,y:dn.I},snappedHandleOffset:{x:vn.j,y:dn.j},isRTL:Vt,isRTLNormalized:Mr}}St.update(hn);var c,s,l,v,d,m,g,h,p,w=Mr,b=[pn,le,"l"],y=[bn,fe,"t"],x=["+=","-=","*=","/="],_=cn(t)==pi,S=_?t.complete:e,z={},T={},O="begin",k="nearest",C="never",A="ifneeded",H=xi.l,R=[pn,bn,"xy","yx"],L=[O,"end","center",k],N=["always",C,A],W=n[xi.hOP]("el"),D=W?n.el:n,M=!!(D instanceof Ci||ki)&&D instanceof ki,E=!M&&dt(D),I=function(){s&&Qe(!0),l&&Qe(!1)},j=cn(S)!=bi?hi:function(){I(),S()};function F(n,t){for(c=0;c<t[H];c++)if(n===t[c])return 1}function P(n,t){var r=n?b:y;if(t=cn(t)==mi||cn(t)==wi?[t,t]:t,Si.isA(t))return n?t[0]:t[1];if(cn(t)==pi)for(c=0;c<r[H];c++)if(r[c]in t)return t[r[c]]}function U(n,t){var r,e,i,o,a=cn(t)==mi,u=n?vn:dn,f=u.R,c=u.N,s=Vt&&n,l=s&&Ot.n&&!w,v="replace",d=eval;if((e=a?(2<t[H]&&(o=t.substr(0,2),-1<sn(o,x)&&(r=o)),t=(t=r?t.substr(2):t)[v](/min/g,0)[v](/</g,0)[v](/max/g,(l?"-":ye)+we)[v](/>/g,(l?"-":ye)+we)[v](/px/g,ye)[v](/%/g," * "+c*(s&&Ot.n?-1:1)/100)[v](/vw/g," * "+ee.w)[v](/vh/g," * "+ee.h),ii(isNaN(t)?ii(d(t),!0).toFixed():t)):t)!==hi&&!isNaN(e)&&cn(e)==wi){var h=w&&s,p=f*(h&&Ot.n?-1:1),b=h&&Ot.i,y=h&&Ot.n;switch(p=b?c-p:p,r){case"+=":i=p+e;break;case"-=":i=p-e;break;case"*=":i=p*e;break;case"/=":i=p/e;break;default:i=e}i=b?c-i:i,i*=y?-1:1,i=s&&Ot.n?Oi.min(0,Oi.max(c,i)):Oi.max(0,Oi.min(c,i))}return i===f?hi:i}function V(n,t,r,e){var i,o,a=[r,r],u=cn(n);if(u==t)n=[n,n];else if(u==yi){if(2<(i=n[H])||i<1)n=a;else for(1===i&&(n[1]=r),c=0;c<i;c++)if(o=n[c],cn(o)!=t||!F(o,e)){n=a;break}}else n=u==pi?[n[pn]||r,n[bn]||r]:a;return{x:n[0],y:n[1]}}function $(n){var t,r,e=[],i=[fe,ce,se,le];for(c=0;c<n[H]&&c!==i[H];c++)t=n[c],(r=cn(t))==gi?e.push(t?ii(p.css(oe+i[c])):0):e.push(r==wi?t:0);return e}if(M||E){var q,B=W?n.margin:0,X=W?n.axis:0,Y=W?n.scroll:0,K=W?n.block:0,G=[0,0,0,0],J=cn(B);if(0<(p=M?D:Ci(D))[H]){B=J==wi||J==gi?$([B,B,B,B]):J==yi?2===(q=B[H])?$([B[0],B[1],B[0],B[1]]):4<=q?$(B):G:J==pi?$([B[fe],B[ce],B[se],B[le]]):G,d=F(X,R)?X:"xy",m=V(Y,mi,"always",N),g=V(K,mi,O,L),h=B;var Q=vn.R,Z=dn.R,nn=Qt.offset(),tn=p.offset(),rn={x:m.x==C||d==bn,y:m.y==C||d==pn};tn[fe]-=h[0],tn[le]-=h[3];var en={x:Oi.round(tn[le]-nn[le]+Q),y:Oi.round(tn[fe]-nn[fe]+Z)};if(Vt&&(Ot.n||Ot.i||(en.x=Oi.round(nn[le]-tn[le]+Q)),Ot.n&&w&&(en.x*=-1),Ot.i&&w&&(en.x=Oi.round(nn[le]-tn[le]+(vn.N-Q)))),g.x!=O||g.y!=O||m.x==A||m.y==A||Vt){var on=p[0],an=ln?on[xi.bCR]():{width:on[xi.oW],height:on[xi.oH]},un={w:an[he]+h[3]+h[1],h:an[pe]+h[0]+h[2]},fn=function(n){var t=ni(n),r=t.F,e=t.P,i=t.U,o=g[i]==(n&&Vt?O:"end"),a="center"==g[i],u=g[i]==k,f=m[i]==C,c=m[i]==A,s=ee[r],l=nn[e],v=un[r],d=tn[e],h=a?2:1,p=d+v/2,b=l+s/2,y=v<=s&&l<=d&&d+v<=l+s;f?rn[i]=!0:rn[i]||((u||c)&&(rn[i]=c&&y,o=v<s?b<p:p<b),en[i]-=o||a?(s/h-v/h)*(n&&Vt&&w?-1:1):0)};fn(!0),fn(!1)}rn.y&&delete en.y,rn.x&&delete en.x,n=en}}z[_e]=U(!0,P(!0,n)),z[Se]=U(!1,P(!1,n)),s=z[_e]!==hi,l=z[Se]!==hi,(s||l)&&(0<t||_)?_?(t.complete=j,Zt.animate(z,t)):(v={duration:t,complete:j},Si.isA(r)||Ci.isPlainObject(r)?(T[_e]=r[0]||r.x,T[Se]=r[1]||r.y,v.specialEasing=T):v.easing=r,Zt.animate(z,v)):(s&&Zt[_e](z[_e]),l&&Zt[Se](z[Se]),I())},St.scrollStop=function(n,t,r){return Zt.stop(n,t,r),St},St.getElements=function(n){var t={target:or,host:ar,padding:fr,viewport:cr,content:sr,scrollbarHorizontal:{scrollbar:f[0],track:s[0],handle:l[0]},scrollbarVertical:{scrollbar:v[0],track:b[0],handle:y[0]},scrollbarCorner:ir[0]};return cn(n)==mi?bt(t,n):t},St.getState=function(n){function t(n){if(!Ci.isPlainObject(n))return n;var r=fi({},n),t=function(n,t){r[xi.hOP](n)&&(r[t]=r[n],delete r[n])};return t("w",he),t("h",pe),delete r.c,r}var r={destroyed:!!t(Lt),sleeping:!!t($t),autoUpdate:t(!qr),widthAuto:t(br),heightAuto:t(yr),padding:t(gr),overflowAmount:t(kr),hideOverflow:t(pr),hasOverflow:t(hr),contentScrollSize:t(vr),viewportSize:t(ee),hostSize:t(lr),documentMixed:t(w)};return cn(n)==mi?bt(r,n):r},St.ext=function(n){var t,r="added removed on contract".split(" "),e=0;if(cn(n)==mi){if(Pn[xi.hOP](n))for(t=fi({},Pn[n]);e<r.length;e++)delete t[r[e]]}else for(e in t={},Pn)t[e]=fi({},St.ext(e));return t},St.addExt=function(n,t){var r,e,i,o,a=zi.extension(n),u=!0;if(a){if(Pn[xi.hOP](n))return St.ext(n);if((r=a.extensionFactory.call(St,fi({},a.defaultOptions),Ci,Si))&&(i=r.contract,cn(i)==bi&&(o=i(vi),u=cn(o)==gi?o:u),u))return e=(Pn[n]=r).added,cn(e)==bi&&e(t),St.ext(n)}else console.warn('A extension with the name "'+n+"\" isn't registered.")},St.removeExt=function(n){var t,r=Pn[n];return!!r&&(delete Pn[n],t=r.removed,cn(t)==bi&&t(),!0)},zi.valid(function wt(n,t,r){var e,i;return o=xt.defaultOptions,Ct=xt.nativeScrollbarStyling,Ht=fi({},xt.nativeScrollbarSize),zt=fi({},xt.nativeScrollbarIsOverlaid),Tt=fi({},xt.overlayScrollbarDummySize),Ot=fi({},xt.rtlScrollBehavior),ot(fi({},o,t)),At=xt.cssCalc,I=xt.msie,kt=xt.autoUpdateRecommended,j=xt.supportTransition,ln=xt.supportTransform,g=xt.supportPassiveEvents,A=xt.supportResizeObserver,h=xt.supportMutationObserver,xt.restrictedMeasuring,F=Ci(n.ownerDocument),H=F[0],u=Ci(H.defaultView||H.parentWindow),x=u[0],c=gt(F,"html"),P=gt(c,"body"),Yt=Ci(n),or=Yt[0],Nt=Yt.is("textarea"),Wt=Yt.is("body"),w=H!==di,p=Nt?Yt.hasClass(yn)&&Yt.parent().hasClass(_n):Yt.hasClass(rn)&&Yt.children(W+gn)[xi.l],zt.x&&zt.y&&!qt.nativeScrollbarsOverlaid.initialize?(ti("onInitializationWithdrawn"),p&&(at(!0),ft(!0),st(!0)),$t=Lt=!0):(Wt&&((e={}).l=Oi.max(Yt[_e](),c[_e](),u[_e]()),e.t=Oi.max(Yt[Se](),c[Se](),u[Se]()),i=function(){Zt.removeAttr(xi.ti),Yn(Zt,$,i,!0,!0)}),at(),ft(),st(),ut(),ct(!0),ct(!1),function s(){var r,t=x.top!==x,e={},i={},o={};function a(n){if(f(n)){var t=c(n),r={};(ne||Zr)&&(r[he]=i.w+(t.x-e.x)*o.x),(te||Zr)&&(r[pe]=i.h+(t.y-e.y)*o.y),Kt.css(r),Si.stpP(n)}else u(n)}function u(n){var t=n!==hi;Yn(F,[J,B,q],[tt,a,u],!0),si(P,En),ir.releaseCapture&&ir.releaseCapture(),t&&(r&&Ue(),St.update(me)),r=!1}function f(n){var t=(n.originalEvent||n).touches!==hi;return!$t&&!Lt&&(1===Si.mBtn(n)||t)}function c(n){return I&&t?{x:n.screenX,y:n.screenY}:Si.page(n)}Kn(ir,$,function(n){f(n)&&!Qr&&(qr&&(r=!0,Ve()),e=c(n),i.w=ar[xi.oW]-(Dt?0:Et),i.h=ar[xi.oH]-(Dt?0:It),o=vt(),Yn(F,[J,B,q],[tt,a,u]),ci(P,En),ir.setCapture&&ir.setCapture(),Si.prvD(n),Si.stpP(n))})}(),Gn(),Pe(Jt,Jn),Wt&&(Zt[_e](e.l)[Se](e.t),di.activeElement==n&&cr.focus&&(Zt.attr(xi.ti,"-1"),cr.focus(),Yn(Zt,$,i,!1,!0))),St.update(me),Rt=!0,ti("onInitialized"),d(jn,function(n,t){ti(t.n,t.a)}),jn=[],cn(r)==mi&&(r=[r]),Si.isA(r)?d(r,function(n,t){St.addExt(t)}):Ci.isPlainObject(r)&&d(r,function(n,t){St.addExt(n,t)}),setTimeout(function(){j&&!Lt&&ci(Kt,fn)},333)),St}(r,n,t))&&Ai(r,St),St}function Yn(n,t,r,e,i){var o=Si.isA(t)&&Si.isA(r),a=e?"removeEventListener":"addEventListener",u=e?"off":"on",f=!o&&t.split(xe),c=0,s=Ci.isPlainObject(i),l=g&&(s?i.V:i)||!1,v=s&&(i.$||!1),d=g?{passive:l,capture:v}:v;if(o)for(;c<t[xi.l];c++)Yn(n,t[c],r[c],e,i);else for(;c<f[xi.l];c++)g?n[0][a](f[c],r,d):n[u](f[c],r)}function Kn(n,t,r,e){Yn(n,t,r,!1,e),Xn.push(Si.bind(Yn,0,n,t,r,!0,e))}function Pe(n,t){if(n){var r=Si.rO(),e="animationstart mozAnimationStart webkitAnimationStart MSAnimationStart",i="childNodes",o=3333333,a=function(){n[Se](o)[_e](Vt?Ot.n?-o:Ot.i?0:o:o),t()};if(t){if(A)((k=n.addClass("observed").append(ai(Sn)).contents()[0])[Z]=new r(a)).observe(k);else if(9<I||!kt){n.prepend(ai(Sn,ai({c:zn,dir:"ltr"},ai(zn,ai(Tn))+ai(zn,ai({c:Tn,style:"width: 200%; height: 200%"})))));var u,f,c,s,l=n[0][i][0][i][0],v=Ci(l[i][1]),d=Ci(l[i][0]),h=Ci(d[0][i][0]),p=l[xi.oW],b=l[xi.oH],y=xt.nativeScrollbarSize,m=function(){d[_e](o)[Se](o),v[_e](o)[Se](o)},g=function(){f=0,u&&(p=c,b=s,a())},w=function(n){return c=l[xi.oW],s=l[xi.oH],u=c!=p||s!=b,n&&u&&!f?(Si.cAF()(f),f=Si.rAF()(g)):n||g(),m(),n&&(Si.prvD(n),Si.stpP(n)),!1},x={},_={};ri(_,ye,[-2*(y.y+1),-2*y.x,-2*y.y,-2*(y.x+1)]),Ci(l).css(_),d.on(ge,w),v.on(ge,w),n.on(e,function(){w(!1)}),x[he]=o,x[pe]=o,h.css(x),m()}else{var S=H.attachEvent,z=I!==hi;if(S)n.prepend(ai(Sn)),gt(n,W+Sn)[0].attachEvent("onresize",a);else{var T=H.createElement(pi);T.setAttribute(xi.ti,"-1"),T.setAttribute(xi.c,Sn),T.onload=function(){var n=this.contentDocument.defaultView;n.addEventListener("resize",a),n.document.documentElement.style.display="none"},T.type="text/html",z&&n.prepend(T),T.data="about:blank",z||n.prepend(T),n.on(e,a)}}if(n[0]===R){var O=function(){var n=Kt.css("direction"),t={},r=0,e=!1;return n!==L&&(r="ltr"===n?(t[le]=0,t[ce]=me,o):(t[le]=me,t[ce]=0,Ot.n?-o:Ot.i?0:o),Jt.children().eq(0).css(t),Jt[_e](r)[Se](o),L=n,e=!0),e};O(),Kn(n,ge,function(n){return O()&&Xe(),Si.prvD(n),Si.stpP(n),!1})}}else if(A){var k,C=(k=n.contents()[0])[Z];C&&(C.disconnect(),delete k[Z])}else mt(n.children(W+Sn).eq(0))}}function Gn(){if(h){var o,a,u,f,c,s,r,e,i,l,n=Si.mO(),v=Si.now();O=function(n){var t=!1;return Rt&&!$t&&(d(n,function(){return!(t=function o(n){var t=n.attributeName,r=n.target,e=n.type,i="closest";if(r===sr)return null===t;if("attributes"===e&&(t===xi.c||t===xi.s)&&!Nt){if(t===xi.c&&Ci(r).hasClass(rn))return et(n.oldValue,r.className);if(typeof r[i]!=bi)return!0;if(null!==r[i](W+Sn)||null!==r[i](W+kn)||null!==r[i](W+Wn))return!1}return!0}(this))}),t&&(e=Si.now(),i=yr||br,l=function(){Lt||(v=e,Nt&&Be(),i?Xe():St.update(me))},clearTimeout(r),11<e-v||!i?l():r=setTimeout(l,11))),t},S=new n(T=function(n){var t,r=!1,e=!1,i=[];return Rt&&!$t&&(d(n,function(){o=(t=this).target,a=t.attributeName,u=a===xi.c,f=t.oldValue,c=o.className,p&&u&&!e&&-1<f.indexOf(en)&&c.indexOf(en)<0&&(s=lt(!0),ar.className=c.split(xe).concat(f.split(xe).filter(function(n){return n.match(s)})).join(xe),r=e=!0),r=r||(u?et(f,c):a!==xi.s||f!==o[xi.s].cssText),i.push(a)}),it(i),r&&St.update(e||me)),r}),z=new n(O)}}function Ue(){h&&!qr&&(S.observe(ar,{attributes:!0,attributeOldValue:!0,attributeFilter:Bn}),z.observe(Nt?or:sr,{attributes:!0,attributeOldValue:!0,subtree:!Nt,childList:!Nt,characterData:!Nt,attributeFilter:Nt?qn:Bn}),qr=!0)}function Ve(){h&&qr&&(S.disconnect(),z.disconnect(),qr=!1)}function Jn(){if(!$t){var n,t={w:R[xi.sW],h:R[xi.sH]};n=ui(t,_),_=t,n&&Xe({A:!0})}}function Qn(){Jr&&Ge(!0)}function Zn(){Jr&&!P.hasClass(En)&&Ge(!1)}function nt(){Gr&&(Ge(!0),clearTimeout(C),C=setTimeout(function(){Gr&&!Lt&&Ge(!1)},100))}function tt(n){return Si.prvD(n),!1}function rt(n){var r=Ci(n.target);yt(function(n,t){r.is(t)&&Xe({k:!0})})}function $e(n){n||$e(!0),Yn(Kt,B.split(xe)[0],nt,!Gr||n,!0),Yn(Kt,[X,Y],[Qn,Zn],!Jr||n,!0),Rt||n||Kt.one("mouseover",Qn)}function qe(){var n={};return Wt&&tr&&(n.w=ii(tr.css(ve+he)),n.h=ii(tr.css(ve+pe)),n.c=ui(n,$r),n.f=!0),!!($r=n).c}function et(n,t){var r,e,i=typeof t==mi?t.split(xe):[],o=function u(n,t){var r,e,i=[],o=[];for(r=0;r<n.length;r++)i[n[r]]=!0;for(r=0;r<t.length;r++)i[t[r]]?delete i[t[r]]:i[t[r]]=!0;for(e in i)o.push(e);return o}(typeof n==mi?n.split(xe):[],i),a=sn(Ie,o);if(-1<a&&o.splice(a,1),0<o[xi.l])for(e=lt(!0,!0),r=0;r<o.length;r++)if(!o[r].match(e))return!0;return!1}function it(n){d(n=n||Fn,function(n,t){if(-1<Si.inA(t,Fn)){var r=Yt.attr(t);cn(r)==mi?Zt.attr(t,r):Zt.removeAttr(t)}})}function Be(){if(!$t){var n,t,r,e,i=!jr,o=ee.w,a=ee.h,u={},f=br||i;return u[ve+he]=ye,u[ve+pe]=ye,u[he]=me,Yt.css(u),n=or[xi.oW],t=f?Oi.max(n,or[xi.sW]-1):1,u[he]=br?me:we,u[ve+he]=we,u[pe]=me,Yt.css(u),r=or[xi.oH],e=Oi.max(r,or[xi.sH]-1),u[he]=t,u[pe]=e,er.css(u),u[ve+he]=o,u[ve+pe]=a,Yt.css(u),{q:n,B:r,X:t,Y:e}}}function Xe(n){clearTimeout(Xt),n=n||{},je.A|=n.A,je.k|=n.k,je.H|=n.H;var t,r=Si.now(),e=!!je.A,i=!!je.k,o=!!je.H,a=n.C,u=0<Fe&&Rt&&!Lt&&!o&&!a&&r-Bt<Fe&&!yr&&!br;if(u&&(Xt=setTimeout(Xe,Fe)),!(Lt||u||$t&&!a||Rt&&!o&&(t=Kt.is(":hidden"))||"inline"===Kt.css("display"))){Bt=r,je={},!Ct||zt.x&&zt.y?Ht=fi({},xt.nativeScrollbarSize):(Ht.x=0,Ht.y=0),ie={x:3*(Ht.x+(zt.x?0:3)),y:3*(Ht.y+(zt.y?0:3))},a=a||{};var f=function(){return ui.apply(this,[].slice.call(arguments).concat([o]))},c={x:Zt[_e](),y:Zt[Se]()},s=qt.scrollbars,l=qt.textarea,v=s.visibility,d=f(v,Rr),h=s.autoHide,p=f(h,Lr),b=s.clickScrolling,y=f(b,Nr),m=s.dragScrolling,g=f(m,Wr),w=qt.className,x=f(w,Er),_=qt.resize,S=f(_,Dr)&&!Wt,z=qt.paddingAbsolute,T=f(z,Sr),O=qt.clipAlways,k=f(O,zr),C=qt.sizeAutoCapable&&!Wt,A=f(C,Hr),H=qt.nativeScrollbarsOverlaid.showNativeScrollbars,R=f(H,Cr),L=qt.autoUpdate,N=f(L,Ar),W=qt.overflowBehavior,D=f(W,Or,o),M=l.dynWidth,E=f(Vr,M),I=l.dynHeight,j=f(Ur,I);if(Yr="n"===h,Kr="s"===h,Gr="m"===h,Jr="l"===h,Xr=s.autoHideDelay,Ir=Er,Qr="n"===_,Zr="b"===_,ne="h"===_,te="v"===_,Mr=qt.normalizeRTL,H=H&&zt.x&&zt.y,Rr=v,Lr=h,Nr=b,Wr=m,Er=w,Dr=_,Sr=z,zr=O,Hr=C,Cr=H,Ar=L,Or=fi({},W),Vr=M,Ur=I,hr=hr||{x:!1,y:!1},x&&(si(Kt,Ir+xe+Ie),ci(Kt,w!==hi&&null!==w&&0<w.length?w:Ie)),N&&(!0===L||null===L&&kt?(Ve(),_t.add(St)):(_t.remove(St),Ue())),A)if(C)if(rr?rr.show():(rr=Ci(ai(Le)),Qt.before(rr)),Mt)Gt.show();else{Gt=Ci(ai(Ne)),ur=Gt[0],rr.before(Gt);var F={w:-1,h:-1};Pe(Gt,function(){var n={w:ur[xi.oW],h:ur[xi.oH]};ui(n,F)&&(Rt&&yr&&0<n.h||br&&0<n.w||Rt&&!yr&&0===n.h||!br&&0===n.w)&&Xe(),F=n}),Mt=!0,null!==At&&Gt.css(pe,At+"(100% + 1px)")}else Mt&&Gt.hide(),rr&&rr.hide();o&&(Jt.find("*").trigger(ge),Mt&&Gt.find("*").trigger(ge)),t=t===hi?Kt.is(":hidden"):t;var P,U=!!Nt&&"off"!==Yt.attr("wrap"),V=f(U,jr),$=Kt.css("direction"),q=f($,_r),B=Kt.css("box-sizing"),X=f(B,mr),Y=ei(ae);try{P=Mt?ur[xi.bCR]():null}catch(gt){return}Dt="border-box"===B;var K=(Vt="rtl"===$)?le:ce,G=Vt?ce:le,J=!1,Q=!(!Mt||"none"===Kt.css(be))&&(0===Oi.round(P.right-P.left)&&(!!z||0<ar[xi.cW]-Et));if(C&&!Q){var Z=ar[xi.oW],nn=rr.css(he);rr.css(he,me);var tn=ar[xi.oW];rr.css(he,nn),(J=Z!==tn)||(rr.css(he,Z+1),tn=ar[xi.oW],rr.css(he,nn),J=Z!==tn)}var rn=(Q||J)&&C&&!t,en=f(rn,br),on=!rn&&br,an=!(!Mt||!C||t)&&0===Oi.round(P.bottom-P.top),un=f(an,yr),fn=!an&&yr,cn=ei(ue,"-"+he,!(rn&&Dt||!Dt),!(an&&Dt||!Dt)),sn=ei(oe),ln={},vn={},dn=function(){return{w:ar[xi.cW],h:ar[xi.cH]}},hn=function(){return{w:fr[xi.oW]+Oi.max(0,sr[xi.cW]-sr[xi.sW]),h:fr[xi.oH]+Oi.max(0,sr[xi.cH]-sr[xi.sH])}},pn=Et=Y.l+Y.r,bn=It=Y.t+Y.b;if(pn*=z?1:0,bn*=z?1:0,Y.c=f(Y,gr),jt=cn.l+cn.r,Ft=cn.t+cn.b,cn.c=f(cn,wr),Pt=sn.l+sn.r,Ut=sn.t+sn.b,sn.c=f(sn,xr),jr=U,_r=$,mr=B,br=rn,yr=an,gr=Y,wr=cn,xr=sn,q&&Mt&&Gt.css(be,G),Y.c||q||T||en||un||X||A){var yn={},mn={},gn=[Y.t,Y.r,Y.b,Y.l];ri(vn,oe,[-Y.t,-Y.r,-Y.b,-Y.l]),z?(ri(yn,ye,gn),ri(Nt?mn:ln,ae)):(ri(yn,ye),ri(Nt?mn:ln,ae,gn)),Qt.css(yn),Yt.css(mn)}ee=hn();var wn=!!Nt&&Be(),xn=Nt&&f(wn,Pr),_n=Nt&&wn?{w:M?wn.X:wn.q,h:I?wn.Y:wn.B}:{};if(Pr=wn,an&&(un||T||X||Y.c||cn.c)?ln[pe]=me:(un||T)&&(ln[pe]=we),rn&&(en||T||X||Y.c||cn.c||q)?(ln[he]=me,vn[de+he]=we):(en||T)&&(ln[he]=we,ln[be]=ye,vn[de+he]=ye),rn?(vn[he]=me,ln[he]=_i.v(he,"max-content intrinsic")||me,ln[be]=G):vn[he]=ye,vn[pe]=an?_n.h||sr[xi.cH]:ye,C&&rr.css(vn),nr.css(ln),ln={},vn={},e||i||xn||q||X||T||en||rn||un||an||R||D||k||S||d||p||g||y||E||j||V){var Sn="overflow",zn=Sn+"-x",Tn=Sn+"-y";if(!Ct){var On={},kn=hr.y&&pr.ys&&!H?zt.y?Zt.css(K):-Ht.y:0,Cn=hr.x&&pr.xs&&!H?zt.x?Zt.css(se):-Ht.x:0;ri(On,ye),Zt.css(On)}var An=oi(),Hn={w:_n.w||An[xi.cW],h:_n.h||An[xi.cH]},Rn=An[xi.sW],Ln=An[xi.sH];Ct||(On[se]=fn?ye:Cn,On[K]=on?ye:kn,Zt.css(On)),ee=hn();var Nn=dn(),Wn={w:Nn.w-Pt-jt-(Dt?0:Et),h:Nn.h-Ut-Ft-(Dt?0:It)},Dn={w:Oi.max((rn?Hn.w:Rn)+pn,Wn.w),h:Oi.max((an?Hn.h:Ln)+bn,Wn.h)};if(Dn.c=f(Dn,Tr),Tr=Dn,C){(Dn.c||an||rn)&&(vn[he]=Dn.w,vn[pe]=Dn.h,Nt||(Hn={w:An[xi.cW],h:An[xi.cH]}));var Mn={},En=function(n){var t=ni(n),r=t.F,e=t.K,i=n?rn:an,o=n?jt:Ft,a=n?Et:It,u=n?Pt:Ut,f=ee[r]-o-u-(Dt?0:a);i&&(i||!cn.c)||(vn[e]=Wn[r]-1),!(i&&Hn[r]<f)||n&&Nt&&U||(Nt&&(Mn[e]=ii(er.css(e))-1),--vn[e]),0<Hn[r]&&(vn[e]=Oi.max(1,vn[e]))};En(!0),En(!1),Nt&&er.css(Mn),rr.css(vn)}rn&&(ln[he]=we),!rn||Dt||qr||(ln[be]="none"),nr.css(ln),ln={};var In={w:An[xi.sW],h:An[xi.sH]};In.c=i=f(In,vr),vr=In,ee=hn(),e=f(Nn=dn(),lr),lr=Nn;var jn=Nt&&(0===ee.w||0===ee.h),Fn=kr,Pn={},Un={},Vn={},$n={},qn={},Bn={},Xn={},Yn=fr[xi.bCR](),Kn=function(n){var t=ni(n),r=ni(!n).U,e=t.U,i=t.F,o=t.K,a=ge+t.G+"Max",u=Yn[o]?Oi.abs(Yn[o]-ee[i]):0,f=Fn&&0<Fn[e]&&0===cr[a];Pn[e]="v-s"===W[e],Un[e]="v-h"===W[e],Vn[e]="s"===W[e],$n[e]=Oi.max(0,Oi.round(100*(In[i]-ee[i]))/100),$n[e]*=jn||f&&0<u&&u<1?0:1,qn[e]=0<$n[e],Bn[e]=Pn[e]||Un[e]?qn[r]&&!Pn[r]&&!Un[r]:qn[e],Bn[e+"s"]=!!Bn[e]&&(Vn[e]||Pn[e]),Xn[e]=qn[e]&&Bn[e+"s"]};if(Kn(!0),Kn(!1),$n.c=f($n,kr),kr=$n,qn.c=f(qn,hr),hr=qn,Bn.c=f(Bn,pr),pr=Bn,zt.x||zt.y){var Gn,Jn={},Qn={},Zn=o;(qn.x||qn.y)&&(Qn.w=zt.y&&qn.y?In.w+Tt.y:ye,Qn.h=zt.x&&qn.x?In.h+Tt.x:ye,Zn=f(Qn,dr),dr=Qn),(qn.c||Bn.c||In.c||q||en||un||rn||an||R)&&(ln[oe+G]=ln[ue+G]=ye,Gn=function(n){var t=ni(n),r=ni(!n),e=t.U,i=n?se:K,o=n?an:rn;zt[e]&&qn[e]&&Bn[e+"s"]?(ln[oe+i]=!o||H?ye:Tt[e],ln[ue+i]=n&&o||H?ye:Tt[e]+"px solid transparent"):(Qn[r.F]=ln[oe+i]=ln[ue+i]=ye,Zn=!0)},Ct?li(Zt,He,!H):(Gn(!0),Gn(!1))),H&&(Qn.w=Qn.h=ye,Zn=!0),Zn&&!Ct&&(Jn[he]=Bn.y?Qn.w:ye,Jn[pe]=Bn.x?Qn.h:ye,tr||(tr=Ci(ai(Re)),Zt.prepend(tr)),tr.css(Jn)),nr.css(ln)}var nt,tt={};yn={};if((e||qn.c||Bn.c||In.c||D||X||R||q||k||un)&&(tt[G]=ye,(nt=function(n){var t=ni(n),r=ni(!n),e=t.U,i=t.J,o=n?se:K,a=function(){tt[o]=ye,re[r.F]=0};qn[e]&&Bn[e+"s"]?(tt[Sn+i]=ge,H||Ct?a():(tt[o]=-(zt[e]?Tt[e]:Ht[e]),re[r.F]=zt[e]?Tt[r.U]:0)):(tt[Sn+i]=ye,a())})(!0),nt(!1),!Ct&&(ee.h<ie.x||ee.w<ie.y)&&(qn.x&&Bn.x&&!zt.x||qn.y&&Bn.y&&!zt.y)?(tt[ae+fe]=ie.x,tt[oe+fe]=-ie.x,tt[ae+G]=ie.y,tt[oe+G]=-ie.y):tt[ae+fe]=tt[oe+fe]=tt[ae+G]=tt[oe+G]=ye,tt[ae+K]=tt[oe+K]=ye,qn.x&&Bn.x||qn.y&&Bn.y||jn?Nt&&jn&&(yn[zn]=yn[Tn]="hidden"):(!O||Un.x||Pn.x||Un.y||Pn.y)&&(Nt&&(yn[zn]=yn[Tn]=ye),tt[zn]=tt[Tn]="visible"),Qt.css(yn),Zt.css(tt),tt={},(qn.c||X||en||un)&&(!zt.x||!zt.y))){var rt=sr[xi.s];rt.webkitTransform="scale(1)",rt.display="run-in",sr[xi.oH],rt.display=ye,rt.webkitTransform=ye}if(ln={},q||en||un)if(Vt&&rn){var et=nr.css(be),it=Oi.round(nr.css(be,ye).css(le,ye).position().left);nr.css(be,et),it!==Oi.round(nr.position().left)&&(ln[le]=it)}else ln[le]=ye;if(nr.css(ln),Nt&&i){var ot=function wt(){var n=or.selectionStart;if(n===hi)return;var t,r,e=Yt.val(),i=e[xi.l],o=e.split("\n"),a=o[xi.l],u=e.substr(0,n).split("\n"),f=0,c=0,s=u[xi.l],l=u[u[xi.l]-1][xi.l];for(r=0;r<o[xi.l];r++)t=o[r][xi.l],c<t&&(f=r+1,c=t);return{Q:s,Z:l,nn:a,tn:c,rn:f,en:n,"in":i}}();if(ot){var at=Fr===hi||ot.nn!==Fr.nn,ut=ot.Q,ft=ot.Z,ct=ot.rn,st=ot.nn,lt=ot.tn,vt=ot.en,dt=ot["in"]<=vt&&Br,ht={x:U||ft!==lt||ut!==ct?-1:kr.x,y:(U?dt||at&&Fn&&c.y===Fn.y:(dt||at)&&ut===st)?kr.y:-1};c.x=-1<ht.x?Vt&&Mr&&Ot.i?0:ht.x:c.x,c.y=-1<ht.y?ht.y:c.y}Fr=ot}Vt&&Ot.i&&zt.y&&qn.x&&Mr&&(c.x+=re.w||0),rn&&Kt[_e](0),an&&Kt[Se](0),Zt[_e](c.x)[Se](c.y);var pt="v"===v,bt="h"===v,yt="a"===v,mt=function(n,t){t=t===hi?n:t,Ke(!0,n,Xn.x),Ke(!1,t,Xn.y)};li(Kt,ke,Bn.x||Bn.y),li(Kt,Ce,Bn.x),li(Kt,Ae,Bn.y),q&&!Wt&&li(Kt,ze,Vt),Wt&&ci(Kt,Te),S&&(li(Kt,Te,Qr),li(ir,We,!Qr),li(ir,De,Zr),li(ir,Me,ne),li(ir,Ee,te)),(d||D||Bn.c||qn.c||R)&&(H?R&&(si(Kt,Oe),H&&mt(!1)):yt?mt(Xn.x,Xn.y):pt?mt(!0):bt&&mt(!1)),(p||R)&&($e(!Jr&&!Gr),Ge(Yr,!Yr)),(e||$n.c||un||en||S||X||T||R||q)&&(Je(!0),Qe(!0),Je(!1),Qe(!1)),y&&Ze(!0,b),g&&Ze(!1,m),ti("onDirectionChanged",{isRTL:Vt,dir:$},q),ti("onHostSizeChanged",{width:lr.w,height:lr.h},e),ti("onContentSizeChanged",{width:vr.w,height:vr.h},i),ti("onOverflowChanged",{x:qn.x,y:qn.y,xScrollable:Bn.xs,yScrollable:Bn.ys,clipped:Bn.x||Bn.y},qn.c||Bn.c),ti("onOverflowAmountChanged",{x:$n.x,y:$n.y},$n.c)}Wt&&$r&&(hr.c||$r.c)&&($r.f||qe(),zt.y&&hr.x&&nr.css(ve+he,$r.w+Tt.y),zt.x&&hr.y&&nr.css(ve+pe,$r.h+Tt.x),$r.c=!1),Rt&&a.updateOnLoad&&Ye(),ti("onUpdated",{forced:o})}}function Ye(){Nt||yt(function(n,t){nr.find(t).each(function(n,t){Si.inA(t,Vn)<0&&(Vn.push(t),Ci(t).off(Un,rt).on(Un,rt))})})}function ot(n){var t=Ti._(n,Ti.g,!0,a);return a=fi({},a,t.S),qt=fi({},qt,t.z),t.z}function at(e){var n="parent",t=yn+xe+On,r=Nt?xe+On:ye,i=qt.textarea.inheritedAttrs,o={},a=function(){var r=e?Yt:Kt;d(o,function(n,t){cn(t)==mi&&(n==xi.c?r.addClass(t):r.attr(n,t))})},u=[rn,en,on,Te,ze,an,un,fn,Oe,ke,Ce,Ae,Ie,yn,On,Er].join(xe),f={};Kt=Kt||(Nt?p?Yt[n]()[n]()[n]()[n]():Ci(ai(on)):Yt),nr=nr||pt(_n+r),Zt=Zt||pt(wn+r),Qt=Qt||pt(gn+r),Jt=Jt||pt("os-resize-observer-host"),er=er||(Nt?pt(mn):hi),p&&ci(Kt,en),e&&si(Kt,u),i=cn(i)==mi?i.split(xe):i,Si.isA(i)&&Nt&&d(i,function(n,t){cn(t)==mi&&(o[t]=e?Kt.attr(t):Yt.attr(t))}),e?(p&&Rt?(Jt.children().remove(),d([Qt,Zt,nr,er],function(n,t){t&&si(t.removeAttr(xi.s),In)}),ci(Kt,Nt?on:rn)):(mt(Jt),nr.contents().unwrap().unwrap().unwrap(),Nt&&(Yt.unwrap(),mt(Kt),mt(er),a())),Nt&&Yt.removeAttr(xi.s),Wt&&si(c,tn)):(Nt&&(qt.sizeAutoCapable||(f[he]=Yt.css(he),f[pe]=Yt.css(pe)),p||Yt.addClass(On).wrap(Kt),Kt=Yt[n]().css(f)),p||(ci(Yt,Nt?t:rn),Kt.wrapInner(nr).wrapInner(Zt).wrapInner(Qt).prepend(Jt),nr=gt(Kt,W+_n),Zt=gt(Kt,W+wn),Qt=gt(Kt,W+gn),Nt&&(nr.prepend(er),a())),Ct&&ci(Zt,He),zt.x&&zt.y&&ci(Zt,xn),Wt&&ci(c,tn),R=Jt[0],ar=Kt[0],fr=Qt[0],cr=Zt[0],sr=nr[0],it())}function ut(){var r,t,e=[112,113,114,115,116,117,118,119,120,121,123,33,34,37,38,39,40,16,17,18,19,20,144],i=[],n="focus";function o(n){Be(),St.update(me),n&&kt&&clearInterval(r)}Nt?(9<I||!kt?Kn(Yt,"input",o):Kn(Yt,[K,G],[function a(n){var t=n.keyCode;sn(t,e)<0&&(i[xi.l]||(o(),r=setInterval(o,1e3/60)),sn(t,i)<0&&i.push(t))},function u(n){var t=n.keyCode,r=sn(t,i);sn(t,e)<0&&(-1<r&&i.splice(r,1),i[xi.l]||o(!0))}]),Kn(Yt,[ge,"drop",n,n+"out"],[function f(n){return Yt[_e](Ot.i&&Mr?9999999:0),Yt[Se](0),Si.prvD(n),Si.stpP(n),!1},function c(n){setTimeout(function(){Lt||o()},50)},function s(){Br=!0,ci(Kt,n)},function l(){Br=!1,i=[],si(Kt,n),o(!0)}])):Kn(nr,Q,function v(n){!0!==Ar&&function l(n){if(!Rt)return 1;var t="flex-grow",r="flex-shrink",e="flex-basis",i=[he,ve+he,de+he,oe+le,oe+ce,le,ce,"font-weight","word-spacing",t,r,e],o=[ae+le,ae+ce,ue+le+he,ue+ce+he],a=[pe,ve+pe,de+pe,oe+fe,oe+se,fe,se,"line-height",t,r,e],u=[ae+fe,ae+se,ue+fe+he,ue+se+he],f="s"===Or.x||"v-s"===Or.x,c=!1,s=function(n,t){for(var r=0;r<n[xi.l];r++)if(n[r]===t)return!0;return!1};return("s"===Or.y||"v-s"===Or.y)&&((c=s(a,n))||Dt||(c=s(u,n))),f&&!c&&((c=s(i,n))||Dt||(c=s(o,n))),c}((n=n.originalEvent||n).propertyName)&&St.update(me)}),Kn(Zt,ge,function d(n){$t||(t!==hi?clearTimeout(t):((Kr||Gr)&&Ge(!0),ht()||ci(Kt,Oe),ti("onScrollStart",n)),V||(Qe(!0),Qe(!1)),ti("onScroll",n),t=setTimeout(function(){Lt||(clearTimeout(t),t=hi,(Kr||Gr)&&Ge(!1),ht()||si(Kt,Oe),ti("onScrollStop",n))},175))},!0)}function ft(i){var n,t,o=function(n){var t=pt(kn+xe+(n?Dn:Mn),!0),r=pt(Cn,t),e=pt(Hn,t);return p||i||(t.append(r),r.append(e)),{an:t,un:r,cn:e}};function r(n){var t=ni(n),r=t.an,e=t.un,i=t.cn;p&&Rt?d([r,e,i],function(n,t){si(t.removeAttr(xi.s),In)}):mt(r||o(n).an)}i?(r(!0),r()):(n=o(!0),t=o(),f=n.an,s=n.un,l=n.cn,v=t.an,b=t.un,y=t.cn,p||(Qt.after(v),Qt.after(f)))}function ct(z){var T,i,O,k,e=ni(z),C=e.sn,t=x.top!==x,A=e.U,r=e.J,H=ge+e.G,o="active",a="snapHandle",u="click",R=1,f=[16,17];function c(n){return I&&t?n["screen"+r]:Si.page(n)[A]}function s(n){return qt.scrollbars[n]}function l(){R=.5}function v(){R=1}function d(n){Si.stpP(n)}function L(n){-1<sn(n.keyCode,f)&&l()}function N(n){-1<sn(n.keyCode,f)&&v()}function W(n){var t=(n.originalEvent||n).touches!==hi;return!($t||Lt||ht()||!Wr||t&&!s("touchSupport"))&&(1===Si.mBtn(n)||t)}function h(n){if(W(n)){var t=C.I,r=C.D,e=C.N*((c(n)-O)*k/(t-r));e=isFinite(e)?e:0,Vt&&z&&!Ot.i&&(e*=-1),Zt[H](Oi.round(i+e)),V&&Qe(z,i+e),g||Si.prvD(n)}else D(n)}function D(n){if(n=n||n.originalEvent,Yn(F,[B,q,K,G,J],[h,D,L,N,tt],!0),Si.rAF()(function(){Yn(F,u,d,!0,{$:!0})}),V&&Qe(z,!0),V=!1,si(P,En),si(e.cn,o),si(e.un,o),si(e.an,o),k=1,v(),T!==(O=i=hi)&&(St.scrollStop(),clearTimeout(T),T=hi),n){var t=ar[xi.bCR]();n.clientX>=t.left&&n.clientX<=t.right&&n.clientY>=t.top&&n.clientY<=t.bottom||Zn(),(Kr||Gr)&&Ge(!1)}}function M(n){i=Zt[H](),i=isNaN(i)?0:i,(Vt&&z&&!Ot.n||!Vt)&&(i=i<0?0:i),k=vt()[A],O=c(n),V=!s(a),ci(P,En),ci(e.cn,o),ci(e.an,o),Yn(F,[B,q,J],[h,D,tt]),Si.rAF()(function(){Yn(F,u,d,!1,{$:!0})}),!I&&w||Si.prvD(n),Si.stpP(n)}Kn(e.cn,$,function p(n){W(n)&&M(n)}),Kn(e.un,[$,X,Y],[function E(n){if(W(n)){var d,t=e.sn.D/Math.round(Oi.min(1,ee[e.F]/vr[e.F])*e.sn.I),h=Oi.round(ee[e.F]*t),p=270*t,b=400*t,y=e.un.offset()[e.P],r=n.ctrlKey,m=n.shiftKey,g=m&&r,w=!0,x=function(n){V&&Qe(z,n)},_=function(){x(),M(n)},S=function(){if(!Lt){var n=(O-y)*k,t=C.W,r=C.I,e=C.D,i=C.N,o=C.R,a=p*R,u=w?Oi.max(b,a):a,f=i*((n-e/2)/(r-e)),c=Vt&&z&&(!Ot.i&&!Ot.n||Mr),s=c?t<n:n<t,l={},v={easing:"linear",step:function(n){V&&(Zt[H](n),Qe(z,n))}};f=isFinite(f)?f:0,f=Vt&&z&&!Ot.i?i-f:f,m?(Zt[H](f),g?(f=Zt[H](),Zt[H](o),f=c&&Ot.i?i-f:f,f=c&&Ot.n?-f:f,l[A]=f,St.scroll(l,fi(v,{duration:130,complete:_}))):_()):(d=w?s:d,(c?d?n<=t+e:t<=n:d?t<=n:n<=t+e)?(clearTimeout(T),St.scrollStop(),T=hi,x(!0)):(T=setTimeout(S,u),l[A]=(d?"-=":"+=")+h,St.scroll(l,fi(v,{duration:a}))),w=!1)}};r&&l(),k=vt()[A],O=Si.page(n)[A],V=!s(a),ci(P,En),ci(e.un,o),ci(e.an,o),Yn(F,[q,K,G,J],[D,L,N,tt]),S(),Si.prvD(n),Si.stpP(n)}},function b(n){U=!0,(Kr||Gr)&&Ge(!0)},function y(n){U=!1,(Kr||Gr)&&Ge(!1)}]),Kn(e.an,$,function m(n){Si.stpP(n)}),j&&Kn(e.an,Q,function(n){n.target===e.an[0]&&(Je(z),Qe(z))})}function Ke(n,t,r){var e=n?f:v;li(Kt,n?an:un,!t),li(e,Ln,!r)}function Ge(n,t){if(clearTimeout(k),n)si(f,Nn),si(v,Nn);else{var r,e=function(){U||Lt||(!(r=l.hasClass("active")||y.hasClass("active"))&&(Kr||Gr||Jr)&&ci(f,Nn),!r&&(Kr||Gr||Jr)&&ci(v,Nn))};0<Xr&&!0!==t?k=setTimeout(e,Xr):e()}}function Je(n){var t={},r=ni(n),e=r.sn,i=Oi.min(1,ee[r.F]/vr[r.F]);t[r.K]=Oi.floor(100*i*1e6)/1e6+"%",ht()||r.cn.css(t),e.D=r.cn[0]["offset"+r.ln],e.M=i}function Qe(n,t){var r,e,i=cn(t)==gi,o=Vt&&n,a=ni(n),u=a.sn,f="translate(",c=_i.u("transform"),s=_i.u("transition"),l=n?Zt[_e]():Zt[Se](),v=t===hi||i?l:t,d=u.D,h=a.un[0]["offset"+a.ln],p=h-d,b={},y=(cr[ge+a.ln]-cr["client"+a.ln])*(Ot.n&&o?-1:1),m=function(n){return isNaN(n/y)?0:Oi.max(0,Oi.min(1,n/y))},g=function(n){var t=p*n;return t=isNaN(t)?0:t,t=o&&!Ot.i?h-d-t:t,t=Oi.max(0,t)},w=m(l),x=g(m(v)),_=g(w);u.N=y,u.R=l,u.L=w,ln?(r=o?-(h-d-x):x,e=n?f+r+"px, 0)":f+"0, "+r+"px)",b[c]=e,j&&(b[s]=i&&1<Oi.abs(x-u.W)?function S(n){var t=_i.u("transition"),r=n.css(t);if(r)return r;for(var e,i,o,a="\\s*(([^,(]+(\\(.+?\\))?)+)[\\s,]*",u=new RegExp(a),f=new RegExp("^("+a+")+$"),c="property duration timing-function delay".split(" "),s=[],l=0,v=function(n){if(e=[],!n.match(f))return n;for(;n.match(u);)e.push(RegExp.$1),n=n.replace(u,ye);return e};l<c[xi.l];l++)for(i=v(n.css(t+"-"+c[l])),o=0;o<i[xi.l];o++)s[o]=(s[o]?s[o]+xe:ye)+i[o];return s.join(", ")}(a.cn)+", "+(c+xe+250)+"ms":ye)):b[a.P]=x,ht()||(a.cn.css(b),ln&&j&&i&&a.cn.one(Q,function(){Lt||a.cn.css(s,ye)})),u.W=x,u.j=_,u.I=h}function Ze(n,t){var r=t?"removeClass":"addClass",e=n?b:y,i=n?An:Rn;(n?s:l)[r](i),e[r](i)}function ni(n){return{K:n?he:pe,ln:n?"Width":"Height",P:n?le:fe,G:n?"Left":"Top",U:n?pn:bn,J:n?"X":"Y",F:n?"w":"h",vn:n?"l":"t",un:n?s:b,cn:n?l:y,an:n?f:v,sn:n?vn:dn}}function st(n){ir=ir||pt(Wn,!0),n?p&&Rt?si(ir.removeAttr(xi.s),In):mt(ir):p||Kt.append(ir)}function ti(n,t,r){if(!1!==r)if(Rt){var e,i=qt.callbacks[n],o=n;"on"===o.substr(0,2)&&(o=o.substr(2,1).toLowerCase()+o.substr(3)),cn(i)==bi&&i.call(St,t),d(Pn,function(){cn((e=this).on)==bi&&e.on(o,t)})}else Lt||jn.push({n:n,a:t})}function ri(n,t,r){r=r||[ye,ye,ye,ye],n[(t=t||ye)+fe]=r[0],n[t+ce]=r[1],n[t+se]=r[2],n[t+le]=r[3]}function ei(n,t,r,e){return t=t||ye,n=n||ye,{t:e?0:ii(Kt.css(n+fe+t)),r:r?0:ii(Kt.css(n+ce+t)),b:e?0:ii(Kt.css(n+se+t)),l:r?0:ii(Kt.css(n+le+t))}}function lt(n,t){var r,e,i,o=function(n,t){if(i="",t&&typeof n==mi)for(e=n.split(xe),r=0;r<e[xi.l];r++)i+="|"+e[r]+"$";return i};return new RegExp("(^"+rn+"([-_].+|)$)"+o(Er,n)+o(Ir,t),"g")}function vt(){var n=fr[xi.bCR]();return{x:ln&&1/(Oi.round(n.width)/fr[xi.oW])||1,y:ln&&1/(Oi.round(n.height)/fr[xi.oH])||1}}function dt(n){var t="ownerDocument",r="HTMLElement",e=n&&n[t]&&n[t].parentWindow||vi;return typeof e[r]==pi?n instanceof e[r]:n&&typeof n==pi&&null!==n&&1===n.nodeType&&typeof n.nodeName==mi}function ii(n,t){var r=t?parseFloat(n):parseInt(n,10);return isNaN(r)?0:r}function ht(){return Cr&&zt.x&&zt.y}function oi(){return Nt?er[0]:sr}function ai(r,n){return"<div "+(r?cn(r)==mi?'class="'+r+'"':function(){var n,t=ye;if(Ci.isPlainObject(r))for(n in r)t+=("c"===n?"class":n)+'="'+r[n]+'" ';return t}():ye)+">"+(n||ye)+"</div>"}function pt(n,t){var r=cn(t)==gi,e=!r&&t||Kt;return p&&!e[xi.l]?null:p?e[r?"children":"find"](W+n.replace(/\s/g,W)).eq(0):Ci(ai(n))}function bt(n,t){for(var r,e=t.split(W),i=0;i<e.length;i++){if(!n[xi.hOP](e[i]))return;r=n[e[i]],i<e.length&&cn(r)==pi&&(n=r)}return r}function yt(n){var t=qt.updateOnLoad;t=cn(t)==mi?t.split(xe):t,Si.isA(t)&&!Lt&&d(t,n)}function ui(n,t,r){if(r)return r;if(cn(n)!=pi||cn(t)!=pi)return n!==t;for(var e in n)if("c"!==e){if(!n[xi.hOP](e)||!t[xi.hOP](e))return!0;if(ui(n[e],t[e]))return!0}return!1}function fi(){return Ci.extend.apply(this,[!0].concat([].slice.call(arguments)))}function ci(n,t){return e.addClass.call(n,t)}function si(n,t){return e.removeClass.call(n,t)}function li(n,t,r){return(r?ci:si)(n,t)}function mt(n){return e.remove.call(n)}function gt(n,t){return e.find.call(n,t).eq(0)}}return ki&&ki.fn&&(ki.fn.overlayScrollbars=function(n,t){return ki.isPlainObject(n)?(ki.each(this,function(){w(this,n,t)}),this):w(this,n)}),w});

/***/ }),

/***/ "./src/js/shiny-clipboard.js":
/*!***********************************!*\
  !*** ./src/js/shiny-clipboard.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerClipboardOutput": () => (/* binding */ registerClipboardOutput)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clipboard */ "./node_modules/clipboard/dist/clipboard.js");
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clipboard__WEBPACK_IMPORTED_MODULE_1__);



function registerClipboardOutput(Shiny, shidashi) {
  const clipboardOutputBinding = new Shiny.OutputBinding();
  const clsName = "shidashi-clipboard-output";
  clipboardOutputBinding.name = "shidashi.clipboardOutputBinding";

  jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(clipboardOutputBinding, {
    find: function(scope) {
      const $scope = jquery__WEBPACK_IMPORTED_MODULE_0___default()(scope);
      const re = [];

      $scope.each((i, el) => {
        const $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
        if( $el.hasClass( clsName ) ) {
          re.push(el);
        } else {
          $el.find( `.${ clsName }` ).each( re.push );
        }
      })

      return jquery__WEBPACK_IMPORTED_MODULE_0___default()(re);
    },
    renderValue: function(el, value) {
      let el_ = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
      if(!el_.hasClass("clipboard-btn")){
        el_ = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find(".clipboard-btn");
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(el_).attr("data-clipboard-text", value);
    },
    renderError: function(el, err) {
      let el_ = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
      if(!el_.hasClass("clipboard-btn")){
        el_ = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find(".clipboard-btn");
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(el_).attr("data-clipboard-text", "Error: " + err.message);
    }
  });

  Shiny.outputBindings.register(clipboardOutputBinding, "shidashi.clipboardOutputBinding");

  Shiny.bindAll(".shidashi-clipboard-output");

  // No need to re-register because they use delegation
  new (clipboard__WEBPACK_IMPORTED_MODULE_1___default())(".clipboard-btn").on('success', function(e) {
    shidashi.createNotification({
      title : "Copied to clipboard",
      delay: 1000,
      autohide: true,
      icon: "fa fas fa-copy",
      "class" : "bg-success"
    });
    e.clearSelection();
  });
}




/***/ }),

/***/ "./src/js/shiny-progress.js":
/*!**********************************!*\
  !*** ./src/js/shiny-progress.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerProgressOutput": () => (/* binding */ registerProgressOutput)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


function registerProgressOutput(Shiny) {
  const progressOutputBinding = new Shiny.OutputBinding();
  const clsName = "shidashi-progress-output";
  progressOutputBinding.name = "shidashi.progressOutputBinding";

  jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(progressOutputBinding, {
    find: function(scope) {
      const $scope = jquery__WEBPACK_IMPORTED_MODULE_0___default()(scope);
      const re = [];

      $scope.each((i, el) => {
        const $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
        if( $el.hasClass( clsName ) ) {
          re.push(el);
        } else {
          $el.find( `.${ clsName }` ).each( re.push );
        }
      })

      return jquery__WEBPACK_IMPORTED_MODULE_0___default()(re);
    },
    renderValue: function(el, value) {
      let v = parseInt(value.value);
      if(isNaN(v)){ return; }
      if(v < 0){ v = 0; }
      if(v > 100){ v = 100; }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find(".progress-bar").css("width", `${v}%`);
      if(typeof(value.description) === "string"){
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(el)
          .find(".progress-description.progress-message")
          .text(value.description);
      }
    },
    renderError: function(el, err) {
      if(err.message === "argument is of length zero"){
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).removeClass("shidashi-progress-error");
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find(".progress-bar").css("width", "0%");
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(el)
          .addClass("shidashi-progress-error")
          .find(".progress-description.progress-error")
          .text(err.message);
      }
    },
    clearError: function(el) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).removeClass("shidashi-progress-error");
    }
  });
  Shiny.outputBindings.register(
    progressOutputBinding,
    "shidashi.progressOutputBinding");

  // BindAll outputs since the outputs are registered after shiny connection
  Shiny.bindAll(".shidashi-progress-output");
}




/***/ }),

/***/ "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB3aWR0aD0iMTAiICAgaGVpZ2h0PSIxMCIgICB2ZXJzaW9uPSIxLjEiPiAgPGcgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwNDIuMzYyMikiICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eTowLjQ5NDExNzY1O2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDcuNDI0MjE4NywxMDQyLjM2MjIgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjYgLTEuMzEwMTU2MiwxLjMxMDIgMCwwLjI5OSAwLjEwNDM0MTksMC41NzEgMC4yNzI5NDkyLDAuNzkxNSAwLjIwOTEwMjQsMC4xNDEzIDAuNDY1NjIwNiwwLjIxODQgMC43MzY5NjI5LDAuMjE4NCAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NiAxLjMxMDE1NjMsLTEuMzEwMiAwLC0wLjI3MTMgLTAuMDc3MDkzLC0wLjUyNzggLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0MSwtMC4xNjg2IC0wLjQ5MjU0NDMsLTAuMjcyOSAtMC43OTE1NTI4LC0wLjI3MjkgeiBtIDAsMy4wODQzIGMgLTAuNzIzNTc5MiwwIC0xLjMxMDE1NjIsMC41ODY2IC0xLjMxMDE1NjIsMS4zMTAyIDAsMC4yOTkgMC4xMDQzNDE5LDAuNTcxIDAuMjcyOTQ5MiwwLjc5MTUgMC4yMDkxMDI0LDAuMTQxMyAwLjQ2NTYyMDYsMC4yMTg0IDAuNzM2OTYyOSwwLjIxODQgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjYgMS4zMTAxNTYzLC0xLjMxMDIgMCwtMC4yNzEzIC0wLjA3NzA5MywtMC41Mjc4IC0wLjIxODM1OTQsLTAuNzM2OSAtMC4yMjA0OTQxLC0wLjE2ODYgLTAuNDkyNTQ0MywtMC4yNzMgLTAuNzkxNTUyOCwtMC4yNzMgeiBtIC0zLjA4NDMyNjEsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NiAtMS4zMTAxNTYzLDEuMzEwMiAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MSAwLjI3Mjk0OTIsMC43OTE1IDAuMjA5MTAyNCwwLjE0MTMgMC40NjU2MjA3LDAuMjE4NCAwLjczNjk2MjksMC4yMTg0IDAuNzIzNTc5MywwIDEuMzEwMTU2MywtMC41ODY2IDEuMzEwMTU2MywtMS4zMTAyIDAsLTAuMjcxMyAtMC4wNzcwOTMsLTAuNTI3OCAtMC4yMTgzNTk0LC0wLjczNjkgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzMgLTAuNzkxNTUyNywtMC4yNzMgeiBtIC0zLjAyOTczNjQsMy4wMjk4IEMgMC41ODY1NzY5MywxMDQ4LjQ3NjMgMCwxMDQ5LjA2MjggMCwxMDQ5Ljc4NjQgYyAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyMiwwLjc5MTYgMC4yMDkxMDIyOSwwLjE0MTIgMC40NjU2MjA2NSwwLjIxODMgMC43MzY5NjI4OCwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHogbSAzLjAyOTczNjQsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NSAtMS4zMTAxNTYzLDEuMzEwMSAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyLDAuNzkxNiAwLjIwOTEwMjQsMC4xNDEyIDAuNDY1NjIwNywwLjIxODMgMC43MzY5NjI5LDAuMjE4MyAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NSAxLjMxMDE1NjMsLTEuMzEwMSAwLC0wLjI3MTQgLTAuMDc3MDkzLC0wLjUyNzkgLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzI5IC0wLjc5MTU1MjcsLTAuMjcyOSB6IG0gMy4wODQzMjYxLDAgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjUgLTEuMzEwMTU2MiwxLjMxMDEgMCwwLjI5OSAwLjEwNDM0MTksMC41NzExIDAuMjcyOTQ5MiwwLjc5MTYgMC4yMDkxMDI0LDAuMTQxMiAwLjQ2NTYyMDYsMC4yMTgzIDAuNzM2OTYyOSwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHoiLz4gIDwvZz4gIDxnICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDguMjE1NzcxNSwwLjI3Mjk0OTIyIGMgMC4xNDEyNjY3LDAuMjA5MTAyMjkgMC4yMTgzNTk0LDAuNDY1NjIwNjUgMC4yMTgzNTk0LDAuNzM2OTYyODggMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDc2IC0wLjIwNTUxNzYsLTAuNzk3Nzk2NTkgLTAuNTE4NjAzNSwtMS4wMzcyMDY5OCB6IG0gMCwzLjA4NDMyNjE4IGMgMC4xNDEyNjY3LDAuMjA5MTAyMyAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MiAtMS4zMTAxNTYzLDEuMzEwMTU2MiAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTkzIDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAtMy4wODQzMjYyLDAgYyAwLjE0MTI2NjcsMC4yMDkxMDIzIDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYyIC0xLjMxMDE1NjMsMS4zMTAxNTYyIC0wLjI3MTM0MjIsMCAtMC41Mjc4NjA1LC0wLjA3NzA5MyAtMC43MzY5NjI5LC0wLjIxODM1OTMgMC4yMzk0MTA0LDAuMzEzMDg1OSAwLjYxMjYzNjMsMC41MTg2MDM1IDEuMDM3MjA3MSwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYyLC0wLjU4NjU3NyAxLjMxMDE1NjIsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NSwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogTSAyLjEwMTcwOSw2LjM4NzAxMTcgYyAwLjE0MTI2NjcsMC4yMDkxMDI0IDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYzIC0xLjMxMDE1NjMsMS4zMTAxNTYzIC0wLjI3MTM0MjIzLDAgLTAuNTI3ODYwNTksLTAuMDc3MDkzIC0wLjczNjk2Mjg4LC0wLjIxODM1OTQgMC4yMzk0MTAzOSwwLjMxMzA4NTkgMC42MTI2MzYyMiwwLjUxODYwMzUgMS4wMzcyMDY5OCwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAzLjAyOTczNjMsMCBjIDAuMTQxMjY2NywwLjIwOTEwMjQgMC4yMTgzNTk0LDAuNDY1NjIwNiAwLjIxODM1OTQsMC43MzY5NjI5IDAsMC43MjM1NzkzIC0wLjU4NjU3NywxLjMxMDE1NjMgLTEuMzEwMTU2MywxLjMxMDE1NjMgLTAuMjcxMzQyMiwwIC0wLjUyNzg2MDUsLTAuMDc3MDkzIC0wLjczNjk2MjksLTAuMjE4MzU5NCAwLjIzOTQxMDQsMC4zMTMwODU5IDAuNjEyNjM2MywwLjUxODYwMzUgMS4wMzcyMDcxLDAuNTE4NjAzNSAwLjcyMzU3OTMsMCAxLjMxMDE1NjIsLTAuNTg2NTc3IDEuMzEwMTU2MiwtMS4zMTAxNTYzIDAsLTAuNDI0NTcwOCAtMC4yMDU1MTc1LC0wLjc5Nzc5NjYgLTAuNTE4NjAzNSwtMS4wMzcyMDcgeiBtIDMuMDg0MzI2MiwwIGMgMC4xNDEyNjY3LDAuMjA5MTAyNCAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHoiIC8+ICA8L2c+PC9zdmc+":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB3aWR0aD0iMTAiICAgaGVpZ2h0PSIxMCIgICB2ZXJzaW9uPSIxLjEiPiAgPGcgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwNDIuMzYyMikiICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eTowLjQ5NDExNzY1O2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDcuNDI0MjE4NywxMDQyLjM2MjIgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjYgLTEuMzEwMTU2MiwxLjMxMDIgMCwwLjI5OSAwLjEwNDM0MTksMC41NzEgMC4yNzI5NDkyLDAuNzkxNSAwLjIwOTEwMjQsMC4xNDEzIDAuNDY1NjIwNiwwLjIxODQgMC43MzY5NjI5LDAuMjE4NCAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NiAxLjMxMDE1NjMsLTEuMzEwMiAwLC0wLjI3MTMgLTAuMDc3MDkzLC0wLjUyNzggLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0MSwtMC4xNjg2IC0wLjQ5MjU0NDMsLTAuMjcyOSAtMC43OTE1NTI4LC0wLjI3MjkgeiBtIDAsMy4wODQzIGMgLTAuNzIzNTc5MiwwIC0xLjMxMDE1NjIsMC41ODY2IC0xLjMxMDE1NjIsMS4zMTAyIDAsMC4yOTkgMC4xMDQzNDE5LDAuNTcxIDAuMjcyOTQ5MiwwLjc5MTUgMC4yMDkxMDI0LDAuMTQxMyAwLjQ2NTYyMDYsMC4yMTg0IDAuNzM2OTYyOSwwLjIxODQgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjYgMS4zMTAxNTYzLC0xLjMxMDIgMCwtMC4yNzEzIC0wLjA3NzA5MywtMC41Mjc4IC0wLjIxODM1OTQsLTAuNzM2OSAtMC4yMjA0OTQxLC0wLjE2ODYgLTAuNDkyNTQ0MywtMC4yNzMgLTAuNzkxNTUyOCwtMC4yNzMgeiBtIC0zLjA4NDMyNjEsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NiAtMS4zMTAxNTYzLDEuMzEwMiAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MSAwLjI3Mjk0OTIsMC43OTE1IDAuMjA5MTAyNCwwLjE0MTMgMC40NjU2MjA3LDAuMjE4NCAwLjczNjk2MjksMC4yMTg0IDAuNzIzNTc5MywwIDEuMzEwMTU2MywtMC41ODY2IDEuMzEwMTU2MywtMS4zMTAyIDAsLTAuMjcxMyAtMC4wNzcwOTMsLTAuNTI3OCAtMC4yMTgzNTk0LC0wLjczNjkgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzMgLTAuNzkxNTUyNywtMC4yNzMgeiBtIC0zLjAyOTczNjQsMy4wMjk4IEMgMC41ODY1NzY5MywxMDQ4LjQ3NjMgMCwxMDQ5LjA2MjggMCwxMDQ5Ljc4NjQgYyAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyMiwwLjc5MTYgMC4yMDkxMDIyOSwwLjE0MTIgMC40NjU2MjA2NSwwLjIxODMgMC43MzY5NjI4OCwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHogbSAzLjAyOTczNjQsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NSAtMS4zMTAxNTYzLDEuMzEwMSAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyLDAuNzkxNiAwLjIwOTEwMjQsMC4xNDEyIDAuNDY1NjIwNywwLjIxODMgMC43MzY5NjI5LDAuMjE4MyAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NSAxLjMxMDE1NjMsLTEuMzEwMSAwLC0wLjI3MTQgLTAuMDc3MDkzLC0wLjUyNzkgLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzI5IC0wLjc5MTU1MjcsLTAuMjcyOSB6IG0gMy4wODQzMjYxLDAgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjUgLTEuMzEwMTU2MiwxLjMxMDEgMCwwLjI5OSAwLjEwNDM0MTksMC41NzExIDAuMjcyOTQ5MiwwLjc5MTYgMC4yMDkxMDI0LDAuMTQxMiAwLjQ2NTYyMDYsMC4yMTgzIDAuNzM2OTYyOSwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHoiLz4gIDwvZz4gIDxnICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDguMjE1NzcxNSwwLjI3Mjk0OTIyIGMgMC4xNDEyNjY3LDAuMjA5MTAyMjkgMC4yMTgzNTk0LDAuNDY1NjIwNjUgMC4yMTgzNTk0LDAuNzM2OTYyODggMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDc2IC0wLjIwNTUxNzYsLTAuNzk3Nzk2NTkgLTAuNTE4NjAzNSwtMS4wMzcyMDY5OCB6IG0gMCwzLjA4NDMyNjE4IGMgMC4xNDEyNjY3LDAuMjA5MTAyMyAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MiAtMS4zMTAxNTYzLDEuMzEwMTU2MiAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTkzIDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAtMy4wODQzMjYyLDAgYyAwLjE0MTI2NjcsMC4yMDkxMDIzIDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYyIC0xLjMxMDE1NjMsMS4zMTAxNTYyIC0wLjI3MTM0MjIsMCAtMC41Mjc4NjA1LC0wLjA3NzA5MyAtMC43MzY5NjI5LC0wLjIxODM1OTMgMC4yMzk0MTA0LDAuMzEzMDg1OSAwLjYxMjYzNjMsMC41MTg2MDM1IDEuMDM3MjA3MSwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYyLC0wLjU4NjU3NyAxLjMxMDE1NjIsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NSwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogTSAyLjEwMTcwOSw2LjM4NzAxMTcgYyAwLjE0MTI2NjcsMC4yMDkxMDI0IDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYzIC0xLjMxMDE1NjMsMS4zMTAxNTYzIC0wLjI3MTM0MjIzLDAgLTAuNTI3ODYwNTksLTAuMDc3MDkzIC0wLjczNjk2Mjg4LC0wLjIxODM1OTQgMC4yMzk0MTAzOSwwLjMxMzA4NTkgMC42MTI2MzYyMiwwLjUxODYwMzUgMS4wMzcyMDY5OCwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAzLjAyOTczNjMsMCBjIDAuMTQxMjY2NywwLjIwOTEwMjQgMC4yMTgzNTk0LDAuNDY1NjIwNiAwLjIxODM1OTQsMC43MzY5NjI5IDAsMC43MjM1NzkzIC0wLjU4NjU3NywxLjMxMDE1NjMgLTEuMzEwMTU2MywxLjMxMDE1NjMgLTAuMjcxMzQyMiwwIC0wLjUyNzg2MDUsLTAuMDc3MDkzIC0wLjczNjk2MjksLTAuMjE4MzU5NCAwLjIzOTQxMDQsMC4zMTMwODU5IDAuNjEyNjM2MywwLjUxODYwMzUgMS4wMzcyMDcxLDAuNTE4NjAzNSAwLjcyMzU3OTMsMCAxLjMxMDE1NjIsLTAuNTg2NTc3IDEuMzEwMTU2MiwtMS4zMTAxNTYzIDAsLTAuNDI0NTcwOCAtMC4yMDU1MTc1LC0wLjc5Nzc5NjYgLTAuNTE4NjAzNSwtMS4wMzcyMDcgeiBtIDMuMDg0MzI2MiwwIGMgMC4xNDEyNjY3LDAuMjA5MTAyNCAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHoiIC8+ICA8L2c+PC9zdmc+ ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB3aWR0aD0iMTAiICAgaGVpZ2h0PSIxMCIgICB2ZXJzaW9uPSIxLjEiPiAgPGcgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwNDIuMzYyMikiICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eTowLjQ5NDExNzY1O2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDcuNDI0MjE4NywxMDQyLjM2MjIgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjYgLTEuMzEwMTU2MiwxLjMxMDIgMCwwLjI5OSAwLjEwNDM0MTksMC41NzEgMC4yNzI5NDkyLDAuNzkxNSAwLjIwOTEwMjQsMC4xNDEzIDAuNDY1NjIwNiwwLjIxODQgMC43MzY5NjI5LDAuMjE4NCAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NiAxLjMxMDE1NjMsLTEuMzEwMiAwLC0wLjI3MTMgLTAuMDc3MDkzLC0wLjUyNzggLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0MSwtMC4xNjg2IC0wLjQ5MjU0NDMsLTAuMjcyOSAtMC43OTE1NTI4LC0wLjI3MjkgeiBtIDAsMy4wODQzIGMgLTAuNzIzNTc5MiwwIC0xLjMxMDE1NjIsMC41ODY2IC0xLjMxMDE1NjIsMS4zMTAyIDAsMC4yOTkgMC4xMDQzNDE5LDAuNTcxIDAuMjcyOTQ5MiwwLjc5MTUgMC4yMDkxMDI0LDAuMTQxMyAwLjQ2NTYyMDYsMC4yMTg0IDAuNzM2OTYyOSwwLjIxODQgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjYgMS4zMTAxNTYzLC0xLjMxMDIgMCwtMC4yNzEzIC0wLjA3NzA5MywtMC41Mjc4IC0wLjIxODM1OTQsLTAuNzM2OSAtMC4yMjA0OTQxLC0wLjE2ODYgLTAuNDkyNTQ0MywtMC4yNzMgLTAuNzkxNTUyOCwtMC4yNzMgeiBtIC0zLjA4NDMyNjEsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NiAtMS4zMTAxNTYzLDEuMzEwMiAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MSAwLjI3Mjk0OTIsMC43OTE1IDAuMjA5MTAyNCwwLjE0MTMgMC40NjU2MjA3LDAuMjE4NCAwLjczNjk2MjksMC4yMTg0IDAuNzIzNTc5MywwIDEuMzEwMTU2MywtMC41ODY2IDEuMzEwMTU2MywtMS4zMTAyIDAsLTAuMjcxMyAtMC4wNzcwOTMsLTAuNTI3OCAtMC4yMTgzNTk0LC0wLjczNjkgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzMgLTAuNzkxNTUyNywtMC4yNzMgeiBtIC0zLjAyOTczNjQsMy4wMjk4IEMgMC41ODY1NzY5MywxMDQ4LjQ3NjMgMCwxMDQ5LjA2MjggMCwxMDQ5Ljc4NjQgYyAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyMiwwLjc5MTYgMC4yMDkxMDIyOSwwLjE0MTIgMC40NjU2MjA2NSwwLjIxODMgMC43MzY5NjI4OCwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHogbSAzLjAyOTczNjQsMCBjIC0wLjcyMzU3OTMsMCAtMS4zMTAxNTYzLDAuNTg2NSAtMS4zMTAxNTYzLDEuMzEwMSAwLDAuMjk5IDAuMTA0MzQxOSwwLjU3MTEgMC4yNzI5NDkyLDAuNzkxNiAwLjIwOTEwMjQsMC4xNDEyIDAuNDY1NjIwNywwLjIxODMgMC43MzY5NjI5LDAuMjE4MyAwLjcyMzU3OTMsMCAxLjMxMDE1NjMsLTAuNTg2NSAxLjMxMDE1NjMsLTEuMzEwMSAwLC0wLjI3MTQgLTAuMDc3MDkzLC0wLjUyNzkgLTAuMjE4MzU5NCwtMC43MzcgLTAuMjIwNDk0LC0wLjE2ODYgLTAuNDkyNTQ0MiwtMC4yNzI5IC0wLjc5MTU1MjcsLTAuMjcyOSB6IG0gMy4wODQzMjYxLDAgYyAtMC43MjM1NzkyLDAgLTEuMzEwMTU2MiwwLjU4NjUgLTEuMzEwMTU2MiwxLjMxMDEgMCwwLjI5OSAwLjEwNDM0MTksMC41NzExIDAuMjcyOTQ5MiwwLjc5MTYgMC4yMDkxMDI0LDAuMTQxMiAwLjQ2NTYyMDYsMC4yMTgzIDAuNzM2OTYyOSwwLjIxODMgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjUgMS4zMTAxNTYzLC0xLjMxMDEgMCwtMC4yNzE0IC0wLjA3NzA5MywtMC41Mjc5IC0wLjIxODM1OTQsLTAuNzM3IC0wLjIyMDQ5NDEsLTAuMTY4NiAtMC40OTI1NDQzLC0wLjI3MjkgLTAuNzkxNTUyOCwtMC4yNzI5IHoiLz4gIDwvZz4gIDxnICAgICBzdHlsZT0iZGlzcGxheTppbmxpbmUiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lIiAgICAgICBkPSJtIDguMjE1NzcxNSwwLjI3Mjk0OTIyIGMgMC4xNDEyNjY3LDAuMjA5MTAyMjkgMC4yMTgzNTk0LDAuNDY1NjIwNjUgMC4yMTgzNTk0LDAuNzM2OTYyODggMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDc2IC0wLjIwNTUxNzYsLTAuNzk3Nzk2NTkgLTAuNTE4NjAzNSwtMS4wMzcyMDY5OCB6IG0gMCwzLjA4NDMyNjE4IGMgMC4xNDEyNjY3LDAuMjA5MTAyMyAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MiAtMS4zMTAxNTYzLDEuMzEwMTU2MiAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTkzIDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAtMy4wODQzMjYyLDAgYyAwLjE0MTI2NjcsMC4yMDkxMDIzIDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYyIC0xLjMxMDE1NjMsMS4zMTAxNTYyIC0wLjI3MTM0MjIsMCAtMC41Mjc4NjA1LC0wLjA3NzA5MyAtMC43MzY5NjI5LC0wLjIxODM1OTMgMC4yMzk0MTA0LDAuMzEzMDg1OSAwLjYxMjYzNjMsMC41MTg2MDM1IDEuMDM3MjA3MSwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYyLC0wLjU4NjU3NyAxLjMxMDE1NjIsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NSwtMC43OTc3OTY3IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogTSAyLjEwMTcwOSw2LjM4NzAxMTcgYyAwLjE0MTI2NjcsMC4yMDkxMDI0IDAuMjE4MzU5NCwwLjQ2NTYyMDYgMC4yMTgzNTk0LDAuNzM2OTYyOSAwLDAuNzIzNTc5MyAtMC41ODY1NzcsMS4zMTAxNTYzIC0xLjMxMDE1NjMsMS4zMTAxNTYzIC0wLjI3MTM0MjIzLDAgLTAuNTI3ODYwNTksLTAuMDc3MDkzIC0wLjczNjk2Mjg4LC0wLjIxODM1OTQgMC4yMzk0MTAzOSwwLjMxMzA4NTkgMC42MTI2MzYyMiwwLjUxODYwMzUgMS4wMzcyMDY5OCwwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHogbSAzLjAyOTczNjMsMCBjIDAuMTQxMjY2NywwLjIwOTEwMjQgMC4yMTgzNTk0LDAuNDY1NjIwNiAwLjIxODM1OTQsMC43MzY5NjI5IDAsMC43MjM1NzkzIC0wLjU4NjU3NywxLjMxMDE1NjMgLTEuMzEwMTU2MywxLjMxMDE1NjMgLTAuMjcxMzQyMiwwIC0wLjUyNzg2MDUsLTAuMDc3MDkzIC0wLjczNjk2MjksLTAuMjE4MzU5NCAwLjIzOTQxMDQsMC4zMTMwODU5IDAuNjEyNjM2MywwLjUxODYwMzUgMS4wMzcyMDcxLDAuNTE4NjAzNSAwLjcyMzU3OTMsMCAxLjMxMDE1NjIsLTAuNTg2NTc3IDEuMzEwMTU2MiwtMS4zMTAxNTYzIDAsLTAuNDI0NTcwOCAtMC4yMDU1MTc1LC0wLjc5Nzc5NjYgLTAuNTE4NjAzNSwtMS4wMzcyMDcgeiBtIDMuMDg0MzI2MiwwIGMgMC4xNDEyNjY3LDAuMjA5MTAyNCAwLjIxODM1OTQsMC40NjU2MjA2IDAuMjE4MzU5NCwwLjczNjk2MjkgMCwwLjcyMzU3OTMgLTAuNTg2NTc3LDEuMzEwMTU2MyAtMS4zMTAxNTYzLDEuMzEwMTU2MyAtMC4yNzEzNDIzLDAgLTAuNTI3ODYwNSwtMC4wNzcwOTMgLTAuNzM2OTYyOSwtMC4yMTgzNTk0IDAuMjM5NDEwNCwwLjMxMzA4NTkgMC42MTI2MzYyLDAuNTE4NjAzNSAxLjAzNzIwNywwLjUxODYwMzUgMC43MjM1NzkzLDAgMS4zMTAxNTYzLC0wLjU4NjU3NyAxLjMxMDE1NjMsLTEuMzEwMTU2MyAwLC0wLjQyNDU3MDggLTAuMjA1NTE3NiwtMC43OTc3OTY2IC0wLjUxODYwMzUsLTEuMDM3MjA3IHoiIC8+ICA8L2c+PC9zdmc+";

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = jQuery;

/***/ }),

/***/ "./node_modules/highlight.js/lib/core.js":
/*!***********************************************!*\
  !*** ./node_modules/highlight.js/lib/core.js ***!
  \***********************************************/
/***/ ((module) => {

var deepFreezeEs6 = {exports: {}};

function deepFreeze(obj) {
    if (obj instanceof Map) {
        obj.clear = obj.delete = obj.set = function () {
            throw new Error('map is read-only');
        };
    } else if (obj instanceof Set) {
        obj.add = obj.clear = obj.delete = function () {
            throw new Error('set is read-only');
        };
    }

    // Freeze self
    Object.freeze(obj);

    Object.getOwnPropertyNames(obj).forEach(function (name) {
        var prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop == 'object' && !Object.isFrozen(prop)) {
            deepFreeze(prop);
        }
    });

    return obj;
}

deepFreezeEs6.exports = deepFreeze;
deepFreezeEs6.exports.default = deepFreeze;

var deepFreeze$1 = deepFreezeEs6.exports;

/** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */
/** @typedef {import('highlight.js').CompiledMode} CompiledMode */
/** @implements CallbackResponse */

class Response {
  /**
   * @param {CompiledMode} mode
   */
  constructor(mode) {
    // eslint-disable-next-line no-undefined
    if (mode.data === undefined) mode.data = {};

    this.data = mode.data;
    this.isMatchIgnored = false;
  }

  ignoreMatch() {
    this.isMatchIgnored = true;
  }
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHTML(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * performs a shallow merge of multiple objects into one
 *
 * @template T
 * @param {T} original
 * @param {Record<string,any>[]} objects
 * @returns {T} a single new object
 */
function inherit$1(original, ...objects) {
  /** @type Record<string,any> */
  const result = Object.create(null);

  for (const key in original) {
    result[key] = original[key];
  }
  objects.forEach(function(obj) {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return /** @type {T} */ (result);
}

/**
 * @typedef {object} Renderer
 * @property {(text: string) => void} addText
 * @property {(node: Node) => void} openNode
 * @property {(node: Node) => void} closeNode
 * @property {() => string} value
 */

/** @typedef {{kind?: string, sublanguage?: boolean}} Node */
/** @typedef {{walk: (r: Renderer) => void}} Tree */
/** */

const SPAN_CLOSE = '</span>';

/**
 * Determines if a node needs to be wrapped in <span>
 *
 * @param {Node} node */
const emitsWrappingTags = (node) => {
  return !!node.kind;
};

/**
 *
 * @param {string} name
 * @param {{prefix:string}} options
 */
const expandScopeName = (name, { prefix }) => {
  if (name.includes(".")) {
    const pieces = name.split(".");
    return [
      `${prefix}${pieces.shift()}`,
      ...(pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`))
    ].join(" ");
  }
  return `${prefix}${name}`;
};

/** @type {Renderer} */
class HTMLRenderer {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(parseTree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }

  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(text) {
    this.buffer += escapeHTML(text);
  }

  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(node) {
    if (!emitsWrappingTags(node)) return;

    let scope = node.kind;
    if (node.sublanguage) {
      scope = `language-${scope}`;
    } else {
      scope = expandScopeName(scope, { prefix: this.classPrefix });
    }
    this.span(scope);
  }

  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(node) {
    if (!emitsWrappingTags(node)) return;

    this.buffer += SPAN_CLOSE;
  }

  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }

  // helpers

  /**
   * Builds a span element
   *
   * @param {string} className */
  span(className) {
    this.buffer += `<span class="${className}">`;
  }
}

/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} | string} Node */
/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} } DataNode */
/** @typedef {import('highlight.js').Emitter} Emitter */
/**  */

class TokenTree {
  constructor() {
    /** @type DataNode */
    this.rootNode = { children: [] };
    this.stack = [this.rootNode];
  }

  get top() {
    return this.stack[this.stack.length - 1];
  }

  get root() { return this.rootNode; }

  /** @param {Node} node */
  add(node) {
    this.top.children.push(node);
  }

  /** @param {string} kind */
  openNode(kind) {
    /** @type Node */
    const node = { kind, children: [] };
    this.add(node);
    this.stack.push(node);
  }

  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    }
    // eslint-disable-next-line no-undefined
    return undefined;
  }

  closeAllNodes() {
    while (this.closeNode());
  }

  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }

  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(builder) {
    // this does not
    return this.constructor._walk(builder, this.rootNode);
    // this works
    // return TokenTree._walk(builder, this.rootNode);
  }

  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child));
      builder.closeNode(node);
    }
    return builder;
  }

  /**
   * @param {Node} node
   */
  static _collapse(node) {
    if (typeof node === "string") return;
    if (!node.children) return;

    if (node.children.every(el => typeof el === "string")) {
      // node.text = node.children.join("");
      // delete node.children;
      node.children = [node.children.join("")];
    } else {
      node.children.forEach((child) => {
        TokenTree._collapse(child);
      });
    }
  }
}

/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addKeyword(text, kind)
  - addText(text)
  - addSublanguage(emitter, subLanguageName)
  - finalize()
  - openNode(kind)
  - closeNode()
  - closeAllNodes()
  - toHTML()

*/

/**
 * @implements {Emitter}
 */
class TokenTreeEmitter extends TokenTree {
  /**
   * @param {*} options
   */
  constructor(options) {
    super();
    this.options = options;
  }

  /**
   * @param {string} text
   * @param {string} kind
   */
  addKeyword(text, kind) {
    if (text === "") { return; }

    this.openNode(kind);
    this.addText(text);
    this.closeNode();
  }

  /**
   * @param {string} text
   */
  addText(text) {
    if (text === "") { return; }

    this.add(text);
  }

  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  addSublanguage(emitter, name) {
    /** @type DataNode */
    const node = emitter.root;
    node.kind = name;
    node.sublanguage = true;
    this.add(node);
  }

  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }

  finalize() {
    return true;
  }
}

/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;

  return re.source;
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function lookahead(re) {
  return concat('(?=', re, ')');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function anyNumberOfTimes(re) {
  return concat('(?:', re, ')*');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function optional(re) {
  return concat('(?:', re, ')?');
}

/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}

/**
 * @param { Array<string | RegExp | Object> } args
 * @returns {object}
 */
function stripOptionsFromArgs(args) {
  const opts = args[args.length - 1];

  if (typeof opts === 'object' && opts.constructor === Object) {
    args.splice(args.length - 1, 1);
    return opts;
  } else {
    return {};
  }
}

/** @typedef { {capture?: boolean} } RegexEitherOptions */

/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args
 * @returns {string}
 */
function either(...args) {
  /** @type { object & {capture?: boolean} }  */
  const opts = stripOptionsFromArgs(args);
  const joined = '('
    + (opts.capture ? "" : "?:")
    + args.map((x) => source(x)).join("|") + ")";
  return joined;
}

/**
 * @param {RegExp | string} re
 * @returns {number}
 */
function countMatchGroups(re) {
  return (new RegExp(re.toString() + '|')).exec('').length - 1;
}

/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */
function startsWith(re, lexeme) {
  const match = re && re.exec(lexeme);
  return match && match.index === 0;
}

// BACKREF_RE matches an open parenthesis or backreference. To avoid
// an incorrect parse, it additionally matches the following:
// - [...] elements, where the meaning of parentheses and escapes change
// - other escape sequences, so we do not misparse escape sequences as
//   interesting elements
// - non-matching or lookahead parentheses, which do not capture. These
//   follow the '(' with a '?'.
const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;

// **INTERNAL** Not intended for outside usage
// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)
/**
 * @param {(string | RegExp)[]} regexps
 * @param {{joinWith: string}} opts
 * @returns {string}
 */
function _rewriteBackreferences(regexps, { joinWith }) {
  let numCaptures = 0;

  return regexps.map((regex) => {
    numCaptures += 1;
    const offset = numCaptures;
    let re = source(regex);
    let out = '';

    while (re.length > 0) {
      const match = BACKREF_RE.exec(re);
      if (!match) {
        out += re;
        break;
      }
      out += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);
      if (match[0][0] === '\\' && match[1]) {
        // Adjust the backreference.
        out += '\\' + String(Number(match[1]) + offset);
      } else {
        out += match[0];
        if (match[0] === '(') {
          numCaptures++;
        }
      }
    }
    return out;
  }).map(re => `(${re})`).join(joinWith);
}

/** @typedef {import('highlight.js').Mode} Mode */
/** @typedef {import('highlight.js').ModeCallback} ModeCallback */

// Common regexps
const MATCH_NOTHING_RE = /\b\B/;
const IDENT_RE = '[a-zA-Z]\\w*';
const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

/**
* @param { Partial<Mode> & {binary?: string | RegExp} } opts
*/
const SHEBANG = (opts = {}) => {
  const beginShebang = /^#![ ]*\//;
  if (opts.binary) {
    opts.begin = concat(
      beginShebang,
      /.*\b/,
      opts.binary,
      /\b.*/);
  }
  return inherit$1({
    scope: 'meta',
    begin: beginShebang,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (m, resp) => {
      if (m.index !== 0) resp.ignoreMatch();
    }
  }, opts);
};

// Common modes
const BACKSLASH_ESCAPE = {
  begin: '\\\\[\\s\\S]', relevance: 0
};
const APOS_STRING_MODE = {
  scope: 'string',
  begin: '\'',
  end: '\'',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const QUOTE_STRING_MODE = {
  scope: 'string',
  begin: '"',
  end: '"',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
/**
 * Creates a comment mode
 *
 * @param {string | RegExp} begin
 * @param {string | RegExp} end
 * @param {Mode | {}} [modeOptions]
 * @returns {Partial<Mode>}
 */
const COMMENT = function(begin, end, modeOptions = {}) {
  const mode = inherit$1(
    {
      scope: 'comment',
      begin,
      end,
      contains: []
    },
    modeOptions
  );
  mode.contains.push({
    scope: 'doctag',
    // hack to avoid the space from being included. the space is necessary to
    // match here to prevent the plain text rule below from gobbling up doctags
    begin: '[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)',
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: true,
    relevance: 0
  });
  const ENGLISH_WORD = either(
    // list of common 1 and 2 letter words in English
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    // note: this is not an exhaustive list of contractions, just popular ones
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, // contractions - can't we'd they're let's, etc
    /[A-Za-z]+[-][a-z]+/, // `no-way`, etc.
    /[A-Za-z][a-z]{2,}/ // allow capitalized words at beginning of sentences
  );
  // looking like plain text, more likely to be a comment
  mode.contains.push(
    {
      // TODO: how to include ", (, ) without breaking grammars that use these for
      // comment delimiters?
      // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
      // ---

      // this tries to find sequences of 3 english words in a row (without any
      // "programming" type syntax) this gives us a strong signal that we've
      // TRULY found a comment - vs perhaps scanning with the wrong language.
      // It's possible to find something that LOOKS like the start of the
      // comment - but then if there is no readable text - good chance it is a
      // false match and not a comment.
      //
      // for a visual example please see:
      // https://github.com/highlightjs/highlight.js/issues/2827

      begin: concat(
        /[ ]+/, // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
        '(',
        ENGLISH_WORD,
        /[.]?[:]?([.][ ]|[ ])/,
        '){3}') // look for 3 words in a row
    }
  );
  return mode;
};
const C_LINE_COMMENT_MODE = COMMENT('//', '$');
const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
const HASH_COMMENT_MODE = COMMENT('#', '$');
const NUMBER_MODE = {
  scope: 'number',
  begin: NUMBER_RE,
  relevance: 0
};
const C_NUMBER_MODE = {
  scope: 'number',
  begin: C_NUMBER_RE,
  relevance: 0
};
const BINARY_NUMBER_MODE = {
  scope: 'number',
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
const REGEXP_MODE = {
  // this outer rule makes sure we actually have a WHOLE regex and not simply
  // an expression such as:
  //
  //     3 / something
  //
  // (which will then blow up when regex's `illegal` sees the newline)
  begin: /(?=\/[^/\n]*\/)/,
  contains: [{
    scope: 'regexp',
    begin: /\//,
    end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      BACKSLASH_ESCAPE,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [BACKSLASH_ESCAPE]
      }
    ]
  }]
};
const TITLE_MODE = {
  scope: 'title',
  begin: IDENT_RE,
  relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
  scope: 'title',
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
const METHOD_GUARD = {
  // excludes method names from keyword processing
  begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
  relevance: 0
};

/**
 * Adds end same as begin mechanics to a mode
 *
 * Your mode must include at least a single () match group as that first match
 * group is what is used for comparison
 * @param {Partial<Mode>} mode
 */
const END_SAME_AS_BEGIN = function(mode) {
  return Object.assign(mode,
    {
      /** @type {ModeCallback} */
      'on:begin': (m, resp) => { resp.data._beginMatch = m[1]; },
      /** @type {ModeCallback} */
      'on:end': (m, resp) => { if (resp.data._beginMatch !== m[1]) resp.ignoreMatch(); }
    });
};

var MODES = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MATCH_NOTHING_RE: MATCH_NOTHING_RE,
    IDENT_RE: IDENT_RE,
    UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
    NUMBER_RE: NUMBER_RE,
    C_NUMBER_RE: C_NUMBER_RE,
    BINARY_NUMBER_RE: BINARY_NUMBER_RE,
    RE_STARTERS_RE: RE_STARTERS_RE,
    SHEBANG: SHEBANG,
    BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
    APOS_STRING_MODE: APOS_STRING_MODE,
    QUOTE_STRING_MODE: QUOTE_STRING_MODE,
    PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
    COMMENT: COMMENT,
    C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
    C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
    HASH_COMMENT_MODE: HASH_COMMENT_MODE,
    NUMBER_MODE: NUMBER_MODE,
    C_NUMBER_MODE: C_NUMBER_MODE,
    BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
    REGEXP_MODE: REGEXP_MODE,
    TITLE_MODE: TITLE_MODE,
    UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE,
    METHOD_GUARD: METHOD_GUARD,
    END_SAME_AS_BEGIN: END_SAME_AS_BEGIN
});

/**
@typedef {import('highlight.js').CallbackResponse} CallbackResponse
@typedef {import('highlight.js').CompilerExt} CompilerExt
*/

// Grammar extensions / plugins
// See: https://github.com/highlightjs/highlight.js/issues/2833

// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
// without requiring any underlying changes to the compiler internals.

// `compileMatch` being the perfect small example of now allowing a grammar
// author to write `match` when they desire to match a single expression rather
// than being forced to use `begin`.  The extension then just moves `match` into
// `begin` when it runs.  Ie, no features have been added, but we've just made
// the experience of writing (and reading grammars) a little bit nicer.

// ------

// TODO: We need negative look-behind support to do this properly
/**
 * Skip a match if it has a preceding dot
 *
 * This is used for `beginKeywords` to prevent matching expressions such as
 * `bob.keyword.do()`. The mode compiler automatically wires this up as a
 * special _internal_ 'on:begin' callback for modes with `beginKeywords`
 * @param {RegExpMatchArray} match
 * @param {CallbackResponse} response
 */
function skipIfHasPrecedingDot(match, response) {
  const before = match.input[match.index - 1];
  if (before === ".") {
    response.ignoreMatch();
  }
}

/**
 *
 * @type {CompilerExt}
 */
function scopeClassName(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.className !== undefined) {
    mode.scope = mode.className;
    delete mode.className;
  }
}

/**
 * `beginKeywords` syntactic sugar
 * @type {CompilerExt}
 */
function beginKeywords(mode, parent) {
  if (!parent) return;
  if (!mode.beginKeywords) return;

  // for languages with keywords that include non-word characters checking for
  // a word boundary is not sufficient, so instead we check for a word boundary
  // or whitespace - this does no harm in any case since our keyword engine
  // doesn't allow spaces in keywords anyways and we still check for the boundary
  // first
  mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
  mode.__beforeBegin = skipIfHasPrecedingDot;
  mode.keywords = mode.keywords || mode.beginKeywords;
  delete mode.beginKeywords;

  // prevents double relevance, the keywords themselves provide
  // relevance, the mode doesn't need to double it
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 0;
}

/**
 * Allow `illegal` to contain an array of illegal values
 * @type {CompilerExt}
 */
function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal)) return;

  mode.illegal = either(...mode.illegal);
}

/**
 * `match` to match a single expression for readability
 * @type {CompilerExt}
 */
function compileMatch(mode, _parent) {
  if (!mode.match) return;
  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");

  mode.begin = mode.match;
  delete mode.match;
}

/**
 * provides the default 1 relevance to all modes
 * @type {CompilerExt}
 */
function compileRelevance(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 1;
}

// allow beforeMatch to act as a "qualifier" for the match
// the full match begin must be [beforeMatch][begin]
const beforeMatchExt = (mode, parent) => {
  if (!mode.beforeMatch) return;
  // starts conflicts with endsParent which we need to make sure the child
  // rule is not matched multiple times
  if (mode.starts) throw new Error("beforeMatch cannot be used with starts");

  const originalMode = Object.assign({}, mode);
  Object.keys(mode).forEach((key) => { delete mode[key]; });

  mode.keywords = originalMode.keywords;
  mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
  mode.starts = {
    relevance: 0,
    contains: [
      Object.assign(originalMode, { endsParent: true })
    ]
  };
  mode.relevance = 0;

  delete originalMode.beforeMatch;
};

// keywords that should have no default relevance value
const COMMON_KEYWORDS = [
  'of',
  'and',
  'for',
  'in',
  'not',
  'or',
  'if',
  'then',
  'parent', // common variable name
  'list', // common variable name
  'value' // common variable name
];

const DEFAULT_KEYWORD_SCOPE = "keyword";

/**
 * Given raw keywords from a language definition, compile them.
 *
 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
 * @param {boolean} caseInsensitive
 */
function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
  /** @type KeywordDict */
  const compiledKeywords = Object.create(null);

  // input can be a string of keywords, an array of keywords, or a object with
  // named keys representing scopeName (which can then point to a string or array)
  if (typeof rawKeywords === 'string') {
    compileList(scopeName, rawKeywords.split(" "));
  } else if (Array.isArray(rawKeywords)) {
    compileList(scopeName, rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function(scopeName) {
      // collapse all our objects back into the parent object
      Object.assign(
        compiledKeywords,
        compileKeywords(rawKeywords[scopeName], caseInsensitive, scopeName)
      );
    });
  }
  return compiledKeywords;

  // ---

  /**
   * Compiles an individual list of keywords
   *
   * Ex: "for if when while|5"
   *
   * @param {string} scopeName
   * @param {Array<string>} keywordList
   */
  function compileList(scopeName, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.map(x => x.toLowerCase());
    }
    keywordList.forEach(function(keyword) {
      const pair = keyword.split('|');
      compiledKeywords[pair[0]] = [scopeName, scoreForKeyword(pair[0], pair[1])];
    });
  }
}

/**
 * Returns the proper score for a given keyword
 *
 * Also takes into account comment keywords, which will be scored 0 UNLESS
 * another score has been manually assigned.
 * @param {string} keyword
 * @param {string} [providedScore]
 */
function scoreForKeyword(keyword, providedScore) {
  // manual scores always win over common keywords
  // so you can force a score of 1 if you really insist
  if (providedScore) {
    return Number(providedScore);
  }

  return commonKeyword(keyword) ? 0 : 1;
}

/**
 * Determines if a given keyword is common or not
 *
 * @param {string} keyword */
function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}

/*

For the reasoning behind this please see:
https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

*/

/**
 * @type {Record<string, boolean>}
 */
const seenDeprecations = {};

/**
 * @param {string} message
 */
const error = (message) => {
  console.error(message);
};

/**
 * @param {string} message
 * @param {any} args
 */
const warn = (message, ...args) => {
  console.log(`WARN: ${message}`, ...args);
};

/**
 * @param {string} version
 * @param {string} message
 */
const deprecated = (version, message) => {
  if (seenDeprecations[`${version}/${message}`]) return;

  console.log(`Deprecated as of ${version}. ${message}`);
  seenDeprecations[`${version}/${message}`] = true;
};

/* eslint-disable no-throw-literal */

/**
@typedef {import('highlight.js').CompiledMode} CompiledMode
*/

const MultiClassError = new Error();

/**
 * Renumbers labeled scope names to account for additional inner match
 * groups that otherwise would break everything.
 *
 * Lets say we 3 match scopes:
 *
 *   { 1 => ..., 2 => ..., 3 => ... }
 *
 * So what we need is a clean match like this:
 *
 *   (a)(b)(c) => [ "a", "b", "c" ]
 *
 * But this falls apart with inner match groups:
 *
 * (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
 *
 * Our scopes are now "out of alignment" and we're repeating `b` 3 times.
 * What needs to happen is the numbers are remapped:
 *
 *   { 1 => ..., 2 => ..., 5 => ... }
 *
 * We also need to know that the ONLY groups that should be output
 * are 1, 2, and 5.  This function handles this behavior.
 *
 * @param {CompiledMode} mode
 * @param {Array<RegExp | string>} regexes
 * @param {{key: "beginScope"|"endScope"}} opts
 */
function remapScopeNames(mode, regexes, { key }) {
  let offset = 0;
  const scopeNames = mode[key];
  /** @type Record<number,boolean> */
  const emit = {};
  /** @type Record<number,string> */
  const positions = {};

  for (let i = 1; i <= regexes.length; i++) {
    positions[i + offset] = scopeNames[i];
    emit[i + offset] = true;
    offset += countMatchGroups(regexes[i - 1]);
  }
  // we use _emit to keep track of which match groups are "top-level" to avoid double
  // output from inside match groups
  mode[key] = positions;
  mode[key]._emit = emit;
  mode[key]._multi = true;
}

/**
 * @param {CompiledMode} mode
 */
function beginMultiClass(mode) {
  if (!Array.isArray(mode.begin)) return;

  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
    error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
    throw MultiClassError;
  }

  if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
    error("beginScope must be object");
    throw MultiClassError;
  }

  remapScopeNames(mode, mode.begin, { key: "beginScope" });
  mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
}

/**
 * @param {CompiledMode} mode
 */
function endMultiClass(mode) {
  if (!Array.isArray(mode.end)) return;

  if (mode.skip || mode.excludeEnd || mode.returnEnd) {
    error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
    throw MultiClassError;
  }

  if (typeof mode.endScope !== "object" || mode.endScope === null) {
    error("endScope must be object");
    throw MultiClassError;
  }

  remapScopeNames(mode, mode.end, { key: "endScope" });
  mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
}

/**
 * this exists only to allow `scope: {}` to be used beside `match:`
 * Otherwise `beginScope` would necessary and that would look weird

  {
    match: [ /def/, /\w+/ ]
    scope: { 1: "keyword" , 2: "title" }
  }

 * @param {CompiledMode} mode
 */
function scopeSugar(mode) {
  if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
    mode.beginScope = mode.scope;
    delete mode.scope;
  }
}

/**
 * @param {CompiledMode} mode
 */
function MultiClass(mode) {
  scopeSugar(mode);

  if (typeof mode.beginScope === "string") {
    mode.beginScope = { _wrap: mode.beginScope };
  }
  if (typeof mode.endScope === "string") {
    mode.endScope = { _wrap: mode.endScope };
  }

  beginMultiClass(mode);
  endMultiClass(mode);
}

/**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').CompiledLanguage} CompiledLanguage
*/

// compilation

/**
 * Compiles a language definition result
 *
 * Given the raw result of a language definition (Language), compiles this so
 * that it is ready for highlighting code.
 * @param {Language} language
 * @returns {CompiledLanguage}
 */
function compileLanguage(language) {
  /**
   * Builds a regex with the case sensitivity of the current language
   *
   * @param {RegExp | string} value
   * @param {boolean} [global]
   */
  function langRe(value, global) {
    return new RegExp(
      source(value),
      'm'
      + (language.case_insensitive ? 'i' : '')
      + (language.unicodeRegex ? 'u' : '')
      + (global ? 'g' : '')
    );
  }

  /**
    Stores multiple regular expressions and allows you to quickly search for
    them all in a string simultaneously - returning the first match.  It does
    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
    and joined by `|` - using match groups to track position.  When a match is
    found checking which position in the array has content allows us to figure
    out which of the original regexes / match groups triggered the match.

    The match object itself (the result of `Regex.exec`) is returned but also
    enhanced by merging in any meta-data that was registered with the regex.
    This is how we keep track of which mode matched, and what type of rule
    (`illegal`, `begin`, end, etc).
  */
  class MultiRegex {
    constructor() {
      this.matchIndexes = {};
      // @ts-ignore
      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      opts.position = this.position++;
      // @ts-ignore
      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += countMatchGroups(re) + 1;
    }

    compile() {
      if (this.regexes.length === 0) {
        // avoids the need to check length every time exec is called
        // @ts-ignore
        this.exec = () => null;
      }
      const terminators = this.regexes.map(el => el[1]);
      this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: '|' }), true);
      this.lastIndex = 0;
    }

    /** @param {string} s */
    exec(s) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(s);
      if (!match) { return null; }

      // eslint-disable-next-line no-undefined
      const i = match.findIndex((el, i) => i > 0 && el !== undefined);
      // @ts-ignore
      const matchData = this.matchIndexes[i];
      // trim off any earlier non-relevant match groups (ie, the other regex
      // match groups that make up the multi-matcher)
      match.splice(0, i);

      return Object.assign(match, matchData);
    }
  }

  /*
    Created to solve the key deficiently with MultiRegex - there is no way to
    test for multiple matches at a single location.  Why would we need to do
    that?  In the future a more dynamic engine will allow certain matches to be
    ignored.  An example: if we matched say the 3rd regex in a large group but
    decided to ignore it - we'd need to started testing again at the 4th
    regex... but MultiRegex itself gives us no real way to do that.

    So what this class creates MultiRegexs on the fly for whatever search
    position they are needed.

    NOTE: These additional MultiRegex objects are created dynamically.  For most
    grammars most of the time we will never actually need anything more than the
    first MultiRegex - so this shouldn't have too much overhead.

    Say this is our search group, and we match regex3, but wish to ignore it.

      regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

    What we need is a new MultiRegex that only includes the remaining
    possibilities:

      regex4 | regex5                               ' ie, startAt = 3

    This class wraps all that complexity up in a simple API... `startAt` decides
    where in the array of expressions to start doing the matching. It
    auto-increments, so if a match is found at position 2, then startAt will be
    set to 3.  If the end is reached startAt will return to 0.

    MOST of the time the parser will be setting startAt manually to 0.
  */
  class ResumableMultiRegex {
    constructor() {
      // @ts-ignore
      this.rules = [];
      // @ts-ignore
      this.multiRegexes = [];
      this.count = 0;

      this.lastIndex = 0;
      this.regexIndex = 0;
    }

    // @ts-ignore
    getMatcher(index) {
      if (this.multiRegexes[index]) return this.multiRegexes[index];

      const matcher = new MultiRegex();
      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }

    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }

    considerAll() {
      this.regexIndex = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      this.rules.push([re, opts]);
      if (opts.type === "begin") this.count++;
    }

    /** @param {string} s */
    exec(s) {
      const m = this.getMatcher(this.regexIndex);
      m.lastIndex = this.lastIndex;
      let result = m.exec(s);

      // The following is because we have no easy way to say "resume scanning at the
      // existing position but also skip the current rule ONLY". What happens is
      // all prior rules are also skipped which can result in matching the wrong
      // thing. Example of matching "booger":

      // our matcher is [string, "booger", number]
      //
      // ....booger....

      // if "booger" is ignored then we'd really need a regex to scan from the
      // SAME position for only: [string, number] but ignoring "booger" (if it
      // was the first match), a simple resume would scan ahead who knows how
      // far looking only for "number", ignoring potential string matches (or
      // future "booger" matches that might be valid.)

      // So what we do: We execute two matchers, one resuming at the same
      // position, but the second full matcher starting at the position after:

      //     /--- resume first regex match here (for [number])
      //     |/---- full match here for [string, "booger", number]
      //     vv
      // ....booger....

      // Which ever results in a match first is then used. So this 3-4 step
      // process essentially allows us to say "match at this position, excluding
      // a prior rule that was ignored".
      //
      // 1. Match "booger" first, ignore. Also proves that [string] does non match.
      // 2. Resume matching for [number]
      // 3. Match at index + 1 for [string, "booger", number]
      // 4. If #2 and #3 result in matches, which came first?
      if (this.resumingScanAtSamePosition()) {
        if (result && result.index === this.lastIndex) ; else { // use the second matcher result
          const m2 = this.getMatcher(0);
          m2.lastIndex = this.lastIndex + 1;
          result = m2.exec(s);
        }
      }

      if (result) {
        this.regexIndex += result.position + 1;
        if (this.regexIndex === this.count) {
          // wrap-around to considering all matches again
          this.considerAll();
        }
      }

      return result;
    }
  }

  /**
   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
   * the content and find matches.
   *
   * @param {CompiledMode} mode
   * @returns {ResumableMultiRegex}
   */
  function buildModeRegex(mode) {
    const mm = new ResumableMultiRegex();

    mode.contains.forEach(term => mm.addRule(term.begin, { rule: term, type: "begin" }));

    if (mode.terminatorEnd) {
      mm.addRule(mode.terminatorEnd, { type: "end" });
    }
    if (mode.illegal) {
      mm.addRule(mode.illegal, { type: "illegal" });
    }

    return mm;
  }

  /** skip vs abort vs ignore
   *
   * @skip   - The mode is still entered and exited normally (and contains rules apply),
   *           but all content is held and added to the parent buffer rather than being
   *           output when the mode ends.  Mostly used with `sublanguage` to build up
   *           a single large buffer than can be parsed by sublanguage.
   *
   *             - The mode begin ands ends normally.
   *             - Content matched is added to the parent mode buffer.
   *             - The parser cursor is moved forward normally.
   *
   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
   *           never matched) but DOES NOT continue to match subsequent `contains`
   *           modes.  Abort is bad/suboptimal because it can result in modes
   *           farther down not getting applied because an earlier rule eats the
   *           content but then aborts.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is added to the mode buffer.
   *             - The parser cursor is moved forward accordingly.
   *
   * @ignore - Ignores the mode (as if it never matched) and continues to match any
   *           subsequent `contains` modes.  Ignore isn't technically possible with
   *           the current parser implementation.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is ignored.
   *             - The parser cursor is not moved forward.
   */

  /**
   * Compiles an individual mode
   *
   * This can raise an error if the mode contains certain detectable known logic
   * issues.
   * @param {Mode} mode
   * @param {CompiledMode | null} [parent]
   * @returns {CompiledMode | never}
   */
  function compileMode(mode, parent) {
    const cmode = /** @type CompiledMode */ (mode);
    if (mode.isCompiled) return cmode;

    [
      scopeClassName,
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      compileMatch,
      MultiClass,
      beforeMatchExt
    ].forEach(ext => ext(mode, parent));

    language.compilerExtensions.forEach(ext => ext(mode, parent));

    // __beforeBegin is considered private API, internal use only
    mode.__beforeBegin = null;

    [
      beginKeywords,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      compileIllegal,
      // default to 1 relevance if not specified
      compileRelevance
    ].forEach(ext => ext(mode, parent));

    mode.isCompiled = true;

    let keywordPattern = null;
    if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
      // we need a copy because keywords might be compiled multiple times
      // so we can't go deleting $pattern from the original on the first
      // pass
      mode.keywords = Object.assign({}, mode.keywords);
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }
    keywordPattern = keywordPattern || /\w+/;

    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    }

    cmode.keywordPatternRe = langRe(keywordPattern, true);

    if (parent) {
      if (!mode.begin) mode.begin = /\B|\b/;
      cmode.beginRe = langRe(cmode.begin);
      if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
      if (mode.end) cmode.endRe = langRe(cmode.end);
      cmode.terminatorEnd = source(cmode.end) || '';
      if (mode.endsWithParent && parent.terminatorEnd) {
        cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
      }
    }
    if (mode.illegal) cmode.illegalRe = langRe(/** @type {RegExp | string} */ (mode.illegal));
    if (!mode.contains) mode.contains = [];

    mode.contains = [].concat(...mode.contains.map(function(c) {
      return expandOrCloneMode(c === 'self' ? mode : c);
    }));
    mode.contains.forEach(function(c) { compileMode(/** @type Mode */ (c), cmode); });

    if (mode.starts) {
      compileMode(mode.starts, parent);
    }

    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }

  if (!language.compilerExtensions) language.compilerExtensions = [];

  // self is not valid at the top-level
  if (language.contains && language.contains.includes('self')) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  }

  // we need a null object, which inherit will guarantee
  language.classNameAliases = inherit$1(language.classNameAliases || {});

  return compileMode(/** @type Mode */ (language));
}

/**
 * Determines if a mode has a dependency on it's parent or not
 *
 * If a mode does have a parent dependency then often we need to clone it if
 * it's used in multiple places so that each copy points to the correct parent,
 * where-as modes without a parent can often safely be re-used at the bottom of
 * a mode chain.
 *
 * @param {Mode | null} mode
 * @returns {boolean} - is there a dependency on the parent?
 * */
function dependencyOnParent(mode) {
  if (!mode) return false;

  return mode.endsWithParent || dependencyOnParent(mode.starts);
}

/**
 * Expands a mode or clones it if necessary
 *
 * This is necessary for modes with parental dependenceis (see notes on
 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
 * exploded into their own individual modes at compile time.
 *
 * @param {Mode} mode
 * @returns {Mode | Mode[]}
 * */
function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cachedVariants) {
    mode.cachedVariants = mode.variants.map(function(variant) {
      return inherit$1(mode, { variants: null }, variant);
    });
  }

  // EXPAND
  // if we have variants then essentially "replace" the mode with the variants
  // this happens in compileMode, where this function is called from
  if (mode.cachedVariants) {
    return mode.cachedVariants;
  }

  // CLONE
  // if we have dependencies on parents then we need a unique
  // instance of ourselves, so we can be reused with many
  // different parents without issue
  if (dependencyOnParent(mode)) {
    return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
  }

  if (Object.isFrozen(mode)) {
    return inherit$1(mode);
  }

  // no special dependency issues, just return ourselves
  return mode;
}

var version = "11.5.1";

class HTMLInjectionError extends Error {
  constructor(reason, html) {
    super(reason);
    this.name = "HTMLInjectionError";
    this.html = html;
  }
}

/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

/**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').CompiledScope} CompiledScope
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSApi} HLJSApi
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').PluginEvent} PluginEvent
@typedef {import('highlight.js').HLJSOptions} HLJSOptions
@typedef {import('highlight.js').LanguageFn} LanguageFn
@typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement
@typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext
@typedef {import('highlight.js/private').MatchType} MatchType
@typedef {import('highlight.js/private').KeywordData} KeywordData
@typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch
@typedef {import('highlight.js/private').AnnotatedError} AnnotatedError
@typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult
@typedef {import('highlight.js').HighlightOptions} HighlightOptions
@typedef {import('highlight.js').HighlightResult} HighlightResult
*/


const escape = escapeHTML;
const inherit = inherit$1;
const NO_MATCH = Symbol("nomatch");
const MAX_KEYWORD_HITS = 7;

/**
 * @param {any} hljs - object that is extended (legacy)
 * @returns {HLJSApi}
 */
const HLJS = function(hljs) {
  // Global internal variables used within the highlight.js library.
  /** @type {Record<string, Language>} */
  const languages = Object.create(null);
  /** @type {Record<string, string>} */
  const aliases = Object.create(null);
  /** @type {HLJSPlugin[]} */
  const plugins = [];

  // safe/production mode - swallows more errors, tries to keep running
  // even if a single syntax or parse hits a fatal error
  let SAFE_MODE = true;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  /** @type {Language} */
  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] };

  // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.
  /** @type HLJSOptions */
  let options = {
    ignoreUnescapedHTML: false,
    throwUnescapedHTML: false,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: 'hljs-',
    cssSelector: 'pre code',
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: TokenTreeEmitter
  };

  /* Utility functions */

  /**
   * Tests a language name to see if highlighting should be skipped
   * @param {string} languageName
   */
  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }

  /**
   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
   */
  function blockLanguage(block) {
    let classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names.
    const match = options.languageDetectRe.exec(classes);
    if (match) {
      const language = getLanguage(match[1]);
      if (!language) {
        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : 'no-highlight';
    }

    return classes
      .split(/\s+/)
      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
  }

  /**
   * Core highlighting function.
   *
   * OLD API
   * highlight(lang, code, ignoreIllegals, continuation)
   *
   * NEW API
   * highlight(code, {lang, ignoreIllegals})
   *
   * @param {string} codeOrLanguageName - the language to use for highlighting
   * @param {string | HighlightOptions} optionsOrCode - the code to highlight
   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   *
   * @returns {HighlightResult} Result - an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {string} code - the original raw code
   * @property {CompiledMode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */
  function highlight(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
    let code = "";
    let languageName = "";
    if (typeof optionsOrCode === "object") {
      code = codeOrLanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language;
    } else {
      // old API
      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
      languageName = codeOrLanguageName;
      code = optionsOrCode;
    }

    // https://github.com/highlightjs/highlight.js/issues/3149
    // eslint-disable-next-line no-undefined
    if (ignoreIllegals === undefined) { ignoreIllegals = true; }

    /** @type {BeforeHighlightContext} */
    const context = {
      code,
      language: languageName
    };
    // the plugin can change the desired language or the code to be highlighted
    // just be changing the object it was passed
    fire("before:highlight", context);

    // a before plugin can usurp the result completely by providing it's own
    // in which case we don't even need to call highlight
    const result = context.result
      ? context.result
      : _highlight(context.language, context.code, ignoreIllegals);

    result.code = context.code;
    // the plugin can change anything in result to suite it
    fire("after:highlight", result);

    return result;
  }

  /**
   * private highlight that's used internally and does not fire callbacks
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} codeToHighlight - the code to highlight
   * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode?} [continuation] - current continuation mode, if any
   * @returns {HighlightResult} - result of the highlight operation
  */
  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    const keywordHits = Object.create(null);

    /**
     * Return keyword data if a match is a keyword
     * @param {CompiledMode} mode - current mode
     * @param {string} matchText - the textual match
     * @returns {KeywordData | false}
     */
    function keywordData(mode, matchText) {
      return mode.keywords[matchText];
    }

    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }

      let lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      let match = top.keywordPatternRe.exec(modeBuffer);
      let buf = "";

      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
        const data = keywordData(top, word);
        if (data) {
          const [kind, keywordRelevance] = data;
          emitter.addText(buf);
          buf = "";

          keywordHits[word] = (keywordHits[word] || 0) + 1;
          if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
          if (kind.startsWith("_")) {
            // _ implied for relevance only, do not highlight
            // by applying a class name
            buf += match[0];
          } else {
            const cssClass = language.classNameAliases[kind] || kind;
            emitter.addKeyword(match[0], cssClass);
          }
        } else {
          buf += match[0];
        }
        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }
      buf += modeBuffer.substr(lastIndex);
      emitter.addText(buf);
    }

    function processSubLanguage() {
      if (modeBuffer === "") return;
      /** @type HighlightResult */
      let result = null;

      if (typeof top.subLanguage === 'string') {
        if (!languages[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }
        result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] = /** @type {CompiledMode} */ (result._top);
      } else {
        result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      }

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Use case in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      emitter.addSublanguage(result._emitter, result.language);
    }

    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }
      modeBuffer = '';
    }

    /**
     * @param {CompiledScope} scope
     * @param {RegExpMatchArray} match
     */
    function emitMultiClass(scope, match) {
      let i = 1;
      const max = match.length - 1;
      while (i <= max) {
        if (!scope._emit[i]) { i++; continue; }
        const klass = language.classNameAliases[scope[i]] || scope[i];
        const text = match[i];
        if (klass) {
          emitter.addKeyword(text, klass);
        } else {
          modeBuffer = text;
          processKeywords();
          modeBuffer = "";
        }
        i++;
      }
    }

    /**
     * @param {CompiledMode} mode - new mode to start
     * @param {RegExpMatchArray} match
     */
    function startNewMode(mode, match) {
      if (mode.scope && typeof mode.scope === "string") {
        emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
      }
      if (mode.beginScope) {
        // beginScope just wraps the begin match itself in a scope
        if (mode.beginScope._wrap) {
          emitter.addKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
          modeBuffer = "";
        } else if (mode.beginScope._multi) {
          // at this point modeBuffer should just be the match
          emitMultiClass(mode.beginScope, match);
          modeBuffer = "";
        }
      }

      top = Object.create(mode, { parent: { value: top } });
      return top;
    }

    /**
     * @param {CompiledMode } mode - the mode to potentially end
     * @param {RegExpMatchArray} match - the latest match
     * @param {string} matchPlusRemainder - match plus remainder of content
     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
     */
    function endOfMode(mode, match, matchPlusRemainder) {
      let matched = startsWith(mode.endRe, matchPlusRemainder);

      if (matched) {
        if (mode["on:end"]) {
          const resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.isMatchIgnored) matched = false;
        }

        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }
          return mode;
        }
      }
      // even if on:end fires an `ignore` it's still possible
      // that we might trigger the end node because of a parent mode
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }

    /**
     * Handle matching but then ignoring a sequence of text
     *
     * @param {string} lexeme - string containing full match text
     */
    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        // no more regexes to potentially match here, so we move the cursor forward one
        // space
        modeBuffer += lexeme[0];
        return 1;
      } else {
        // no need to move the cursor, we still have additional regexes to try and
        // match at this very spot
        resumeScanAtSamePosition = true;
        return 0;
      }
    }

    /**
     * Handle the start of a new potential mode match
     *
     * @param {EnhancedMatch} match - the current match
     * @returns {number} how far to advance the parse cursor
     */
    function doBeginMatch(match) {
      const lexeme = match[0];
      const newMode = match.rule;

      const resp = new Response(newMode);
      // first internal before callbacks, then the public ones
      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
      for (const cb of beforeCallbacks) {
        if (!cb) continue;
        cb(match, resp);
        if (resp.isMatchIgnored) return doIgnore(lexeme);
      }

      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }
      startNewMode(newMode, match);
      return newMode.returnBegin ? 0 : lexeme.length;
    }

    /**
     * Handle the potential end of mode
     *
     * @param {RegExpMatchArray} match - the current match
     */
    function doEndMatch(match) {
      const lexeme = match[0];
      const matchPlusRemainder = codeToHighlight.substr(match.index);

      const endMode = endOfMode(top, match, matchPlusRemainder);
      if (!endMode) { return NO_MATCH; }

      const origin = top;
      if (top.endScope && top.endScope._wrap) {
        processBuffer();
        emitter.addKeyword(lexeme, top.endScope._wrap);
      } else if (top.endScope && top.endScope._multi) {
        processBuffer();
        emitMultiClass(top.endScope, match);
      } else if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }
      do {
        if (top.scope) {
          emitter.closeNode();
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== endMode.parent);
      if (endMode.starts) {
        startNewMode(endMode.starts, match);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }

    function processContinuations() {
      const list = [];
      for (let current = top; current !== language; current = current.parent) {
        if (current.scope) {
          list.unshift(current.scope);
        }
      }
      list.forEach(item => emitter.openNode(item));
    }

    /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */
    let lastMatch = {};

    /**
     *  Process an individual match
     *
     * @param {string} textBeforeMatch - text preceding the match (since the last match)
     * @param {EnhancedMatch} [match] - the match itself
     */
    function processLexeme(textBeforeMatch, match) {
      const lexeme = match && match[0];

      // add non-matched text to the current mode buffer
      modeBuffer += textBeforeMatch;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }

      // we've found a 0 width match and we're stuck, so we need to advance
      // this happens when we have badly behaved rules that have optional matchers to the degree that
      // sometimes they can end up matching nothing at all
      // Ref: https://github.com/highlightjs/highlight.js/issues/2140
      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        // spit the "skipped" character that our regex choked on back into the output sequence
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
        if (!SAFE_MODE) {
          /** @type {AnnotatedError} */
          const err = new Error(`0 width match regex (${languageName})`);
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }
        return 1;
      }
      lastMatch = match;

      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        // illegal match, we do not continue processing
        /** @type {AnnotatedError} */
        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || '<unnamed>') + '"');
        err.mode = top;
        throw err;
      } else if (match.type === "end") {
        const processed = doEndMatch(match);
        if (processed !== NO_MATCH) {
          return processed;
        }
      }

      // edge case for when illegal matches $ (end of line) which is technically
      // a 0 width match but not a begin/end match so it's not caught by the
      // first handler (when ignoreIllegals is true)
      if (match.type === "illegal" && lexeme === "") {
        // advance so we aren't stuck in an infinite loop
        return 1;
      }

      // infinite loops are BAD, this is a last ditch catch all. if we have a
      // decent number of iterations yet our index (cursor position in our
      // parsing) still 3x behind our index then something is very wrong
      // so we bail
      if (iterations > 100000 && iterations > match.index * 3) {
        const err = new Error('potential infinite loop, way more iterations than matches');
        throw err;
      }

      /*
      Why might be find ourselves here?  An potential end match that was
      triggered but could not be completed.  IE, `doEndMatch` returned NO_MATCH.
      (this could be because a callback requests the match be ignored, etc)

      This causes no real harm other than stopping a few times too many.
      */

      modeBuffer += lexeme;
      return lexeme.length;
    }

    const language = getLanguage(languageName);
    if (!language) {
      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }

    const md = compileLanguage(language);
    let result = '';
    /** @type {CompiledMode} */
    let top = continuation || md;
    /** @type Record<string,CompiledMode> */
    const continuations = {}; // keep continuations for sub-languages
    const emitter = new options.__emitter(options);
    processContinuations();
    let modeBuffer = '';
    let relevance = 0;
    let index = 0;
    let iterations = 0;
    let resumeScanAtSamePosition = false;

    try {
      top.matcher.considerAll();

      for (;;) {
        iterations++;
        if (resumeScanAtSamePosition) {
          // only regexes not matched previously will now be
          // considered for a potential match
          resumeScanAtSamePosition = false;
        } else {
          top.matcher.considerAll();
        }
        top.matcher.lastIndex = index;

        const match = top.matcher.exec(codeToHighlight);
        // console.log("match", match[0], match.rule && match.rule.begin)

        if (!match) break;

        const beforeMatch = codeToHighlight.substring(index, match.index);
        const processedCount = processLexeme(beforeMatch, match);
        index = match.index + processedCount;
      }
      processLexeme(codeToHighlight.substr(index));
      emitter.closeAllNodes();
      emitter.finalize();
      result = emitter.toHTML();

      return {
        language: languageName,
        value: result,
        relevance: relevance,
        illegal: false,
        _emitter: emitter,
        _top: top
      };
    } catch (err) {
      if (err.message && err.message.includes('Illegal')) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: true,
          relevance: 0,
          _illegalBy: {
            message: err.message,
            index: index,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode,
            resultSoFar: result
          },
          _emitter: emitter
        };
      } else if (SAFE_MODE) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: false,
          relevance: 0,
          errorRaised: err,
          _emitter: emitter,
          _top: top
        };
      } else {
        throw err;
      }
    }
  }

  /**
   * returns a valid highlight result, without actually doing any actual work,
   * auto highlight starts with this and it's possible for small snippets that
   * auto-detection may not find a better match
   * @param {string} code
   * @returns {HighlightResult}
   */
  function justTextHighlightResult(code) {
    const result = {
      value: escape(code),
      illegal: false,
      relevance: 0,
      _top: PLAINTEXT_LANGUAGE,
      _emitter: new options.__emitter(options)
    };
    result._emitter.addText(code);
    return result;
  }

  /**
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - secondBest (object with the same structure for second-best heuristically
    detected language, may be absent)

    @param {string} code
    @param {Array<string>} [languageSubset]
    @returns {AutoHighlightResult}
  */
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    const plaintext = justTextHighlightResult(code);

    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>
      _highlight(name, code, false)
    );
    results.unshift(plaintext); // plaintext is always an option

    const sorted = results.sort((a, b) => {
      // sort base on relevance
      if (a.relevance !== b.relevance) return b.relevance - a.relevance;

      // always award the tie to the base language
      // ie if C++ and Arduino are tied, it's more likely to be C++
      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      }

      // otherwise say they are equal, which has the effect of sorting on
      // relevance while preserving the original ordering - which is how ties
      // have historically been settled, ie the language that comes first always
      // wins in the case of a tie
      return 0;
    });

    const [best, secondBest] = sorted;

    /** @type {AutoHighlightResult} */
    const result = best;
    result.secondBest = secondBest;

    return result;
  }

  /**
   * Builds new class name for block given the language name
   *
   * @param {HTMLElement} element
   * @param {string} [currentLang]
   * @param {string} [resultLang]
   */
  function updateClassName(element, currentLang, resultLang) {
    const language = (currentLang && aliases[currentLang]) || resultLang;

    element.classList.add("hljs");
    element.classList.add(`language-${language}`);
  }

  /**
   * Applies highlighting to a DOM node containing code.
   *
   * @param {HighlightedHTMLElement} element - the HTML element to highlight
  */
  function highlightElement(element) {
    /** @type HTMLElement */
    let node = null;
    const language = blockLanguage(element);

    if (shouldNotHighlight(language)) return;

    fire("before:highlightElement",
      { el: element, language: language });

    // we should be all text, no child nodes (unescaped HTML) - this is possibly
    // an HTML injection attack - it's likely too late if this is already in
    // production (the code has likely already done its damage by the time
    // we're seeing it)... but we yell loudly about this so that hopefully it's
    // more likely to be caught in development before making it to production
    if (element.children.length > 0) {
      if (!options.ignoreUnescapedHTML) {
        console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
        console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
        console.warn("The element with unescaped HTML:");
        console.warn(element);
      }
      if (options.throwUnescapedHTML) {
        const err = new HTMLInjectionError(
          "One of your code blocks includes unescaped HTML.",
          element.innerHTML
        );
        throw err;
      }
    }

    node = element;
    const text = node.textContent;
    const result = language ? highlight(text, { language, ignoreIllegals: true }) : highlightAuto(text);

    element.innerHTML = result.value;
    updateClassName(element, language, result.language);
    element.result = {
      language: result.language,
      // TODO: remove with version 11.0
      re: result.relevance,
      relevance: result.relevance
    };
    if (result.secondBest) {
      element.secondBest = {
        language: result.secondBest.language,
        relevance: result.secondBest.relevance
      };
    }

    fire("after:highlightElement", { el: element, result, text });
  }

  /**
   * Updates highlight.js global options with the passed options
   *
   * @param {Partial<HLJSOptions>} userOptions
   */
  function configure(userOptions) {
    options = inherit(options, userOptions);
  }

  // TODO: remove v12, deprecated
  const initHighlighting = () => {
    highlightAll();
    deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };

  // TODO: remove v12, deprecated
  function initHighlightingOnLoad() {
    highlightAll();
    deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }

  let wantsHighlight = false;

  /**
   * auto-highlights all pre>code elements on the page
   */
  function highlightAll() {
    // if we are called too early in the loading process
    if (document.readyState === "loading") {
      wantsHighlight = true;
      return;
    }

    const blocks = document.querySelectorAll(options.cssSelector);
    blocks.forEach(highlightElement);
  }

  function boot() {
    // if a highlight was requested before DOM was loaded, do now
    if (wantsHighlight) highlightAll();
  }

  // make sure we are in the browser environment
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('DOMContentLoaded', boot, false);
  }

  /**
   * Register a language grammar module
   *
   * @param {string} languageName
   * @param {LanguageFn} languageDefinition
   */
  function registerLanguage(languageName, languageDefinition) {
    let lang = null;
    try {
      lang = languageDefinition(hljs);
    } catch (error$1) {
      error("Language definition for '{}' could not be registered.".replace("{}", languageName));
      // hard or soft error
      if (!SAFE_MODE) { throw error$1; } else { error(error$1); }
      // languages that have serious errors are replaced with essentially a
      // "plaintext" stand-in so that the code blocks will still get normal
      // css classes applied to them - and one bad language won't break the
      // entire highlighter
      lang = PLAINTEXT_LANGUAGE;
    }
    // give it a temporary name if it doesn't have one in the meta-data
    if (!lang.name) lang.name = languageName;
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);

    if (lang.aliases) {
      registerAliases(lang.aliases, { languageName });
    }
  }

  /**
   * Remove a language grammar module
   *
   * @param {string} languageName
   */
  function unregisterLanguage(languageName) {
    delete languages[languageName];
    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }

  /**
   * @returns {string[]} List of language internal names
   */
  function listLanguages() {
    return Object.keys(languages);
  }

  /**
   * @param {string} name - name of the language to retrieve
   * @returns {Language | undefined}
   */
  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  /**
   *
   * @param {string|string[]} aliasList - single alias or list of aliases
   * @param {{languageName: string}} opts
   */
  function registerAliases(aliasList, { languageName }) {
    if (typeof aliasList === 'string') {
      aliasList = [aliasList];
    }
    aliasList.forEach(alias => { aliases[alias.toLowerCase()] = languageName; });
  }

  /**
   * Determines if a given language has auto-detection enabled
   * @param {string} name - name of the language
   */
  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  /**
   * Upgrades the old highlightBlock plugins to the new
   * highlightElement API
   * @param {HLJSPlugin} plugin
   */
  function upgradePluginAPI(plugin) {
    // TODO: remove with v12
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = (data) => {
        plugin["before:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = (data) => {
        plugin["after:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
  }

  /**
   * @param {HLJSPlugin} plugin
   */
  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }

  /**
   *
   * @param {PluginEvent} event
   * @param {any} args
   */
  function fire(event, args) {
    const cb = event;
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }

  /**
   * DEPRECATED
   * @param {HighlightedHTMLElement} el
   */
  function deprecateHighlightBlock(el) {
    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    deprecated("10.7.0", "Please use highlightElement now.");

    return highlightElement(el);
  }

  /* Interface definition */
  Object.assign(hljs, {
    highlight,
    highlightAuto,
    highlightAll,
    highlightElement,
    // TODO: Remove with v12 API
    highlightBlock: deprecateHighlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    unregisterLanguage,
    listLanguages,
    getLanguage,
    registerAliases,
    autoDetection,
    inherit,
    addPlugin
  });

  hljs.debugMode = function() { SAFE_MODE = false; };
  hljs.safeMode = function() { SAFE_MODE = true; };
  hljs.versionString = version;

  hljs.regex = {
    concat: concat,
    lookahead: lookahead,
    either: either,
    optional: optional,
    anyNumberOfTimes: anyNumberOfTimes
  };

  for (const key in MODES) {
    // @ts-ignore
    if (typeof MODES[key] === "object") {
      // @ts-ignore
      deepFreeze$1(MODES[key]);
    }
  }

  // merge all the modes/regexes into our main object
  Object.assign(hljs, MODES);

  return hljs;
};

// export an "instance" of the highlighter
var highlight = HLJS({});

module.exports = highlight;
highlight.HighlightJS = highlight;
highlight.default = highlight;


/***/ }),

/***/ "./node_modules/highlight.js/es/core.js":
/*!**********************************************!*\
  !*** ./node_modules/highlight.js/es/core.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HighlightJS": () => (/* reexport default export from named module */ _lib_core_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/core.js */ "./node_modules/highlight.js/lib/core.js");
// https://nodejs.org/api/packages.html#packages_writing_dual_packages_while_avoiding_or_minimizing_hazards


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_core_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./node_modules/highlight.js/es/languages/markdown.js":
/*!************************************************************!*\
  !*** ./node_modules/highlight.js/es/languages/markdown.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ markdown)
/* harmony export */ });
/*
Language: Markdown
Requires: xml.js
Author: John Crepezzi <john.crepezzi@gmail.com>
Website: https://daringfireball.net/projects/markdown/
Category: common, markup
*/

function markdown(hljs) {
  const regex = hljs.regex;
  const INLINE_HTML = {
    begin: /<\/?[A-Za-z_]/,
    end: '>',
    subLanguage: 'xml',
    relevance: 0
  };
  const HORIZONTAL_RULE = {
    begin: '^[-\\*]{3,}',
    end: '$'
  };
  const CODE = {
    className: 'code',
    variants: [
      // TODO: fix to allow these to work with sublanguage also
      { begin: '(`{3,})[^`](.|\\n)*?\\1`*[ ]*' },
      { begin: '(~{3,})[^~](.|\\n)*?\\1~*[ ]*' },
      // needed to allow markdown as a sublanguage to work
      {
        begin: '```',
        end: '```+[ ]*$'
      },
      {
        begin: '~~~',
        end: '~~~+[ ]*$'
      },
      { begin: '`.+?`' },
      {
        begin: '(?=^( {4}|\\t))',
        // use contains to gobble up multiple lines to allow the block to be whatever size
        // but only have a single open/close tag vs one per line
        contains: [
          {
            begin: '^( {4}|\\t)',
            end: '(\\n)$'
          }
        ],
        relevance: 0
      }
    ]
  };
  const LIST = {
    className: 'bullet',
    begin: '^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)',
    end: '\\s+',
    excludeEnd: true
  };
  const LINK_REFERENCE = {
    begin: /^\[[^\n]+\]:/,
    returnBegin: true,
    contains: [
      {
        className: 'symbol',
        begin: /\[/,
        end: /\]/,
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: 'link',
        begin: /:\s*/,
        end: /$/,
        excludeBegin: true
      }
    ]
  };
  const URL_SCHEME = /[A-Za-z][A-Za-z0-9+.-]*/;
  const LINK = {
    variants: [
      // too much like nested array access in so many languages
      // to have any real relevance
      {
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      },
      // popular internet URLs
      {
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
        relevance: 2
      },
      {
        begin: regex.concat(/\[.+?\]\(/, URL_SCHEME, /:\/\/.*?\)/),
        relevance: 2
      },
      // relative urls
      {
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      },
      // whatever else, lower relevance (might not be a link at all)
      {
        begin: /\[.*?\]\(.*?\)/,
        relevance: 0
      }
    ],
    returnBegin: true,
    contains: [
      {
        // empty strings for alt or link text
        match: /\[(?=\])/ },
      {
        className: 'string',
        relevance: 0,
        begin: '\\[',
        end: '\\]',
        excludeBegin: true,
        returnEnd: true
      },
      {
        className: 'link',
        relevance: 0,
        begin: '\\]\\(',
        end: '\\)',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: 'symbol',
        relevance: 0,
        begin: '\\]\\[',
        end: '\\]',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
  const BOLD = {
    className: 'strong',
    contains: [], // defined later
    variants: [
      {
        begin: /_{2}/,
        end: /_{2}/
      },
      {
        begin: /\*{2}/,
        end: /\*{2}/
      }
    ]
  };
  const ITALIC = {
    className: 'emphasis',
    contains: [], // defined later
    variants: [
      {
        begin: /\*(?!\*)/,
        end: /\*/
      },
      {
        begin: /_(?!_)/,
        end: /_/,
        relevance: 0
      }
    ]
  };

  // 3 level deep nesting is not allowed because it would create confusion
  // in cases like `***testing***` because where we don't know if the last
  // `***` is starting a new bold/italic or finishing the last one
  const BOLD_WITHOUT_ITALIC = hljs.inherit(BOLD, { contains: [] });
  const ITALIC_WITHOUT_BOLD = hljs.inherit(ITALIC, { contains: [] });
  BOLD.contains.push(ITALIC_WITHOUT_BOLD);
  ITALIC.contains.push(BOLD_WITHOUT_ITALIC);

  let CONTAINABLE = [
    INLINE_HTML,
    LINK
  ];

  [
    BOLD,
    ITALIC,
    BOLD_WITHOUT_ITALIC,
    ITALIC_WITHOUT_BOLD
  ].forEach(m => {
    m.contains = m.contains.concat(CONTAINABLE);
  });

  CONTAINABLE = CONTAINABLE.concat(BOLD, ITALIC);

  const HEADER = {
    className: 'section',
    variants: [
      {
        begin: '^#{1,6}',
        end: '$',
        contains: CONTAINABLE
      },
      {
        begin: '(?=^.+?\\n[=-]{2,}$)',
        contains: [
          { begin: '^[=-]*$' },
          {
            begin: '^',
            end: "\\n",
            contains: CONTAINABLE
          }
        ]
      }
    ]
  };

  const BLOCKQUOTE = {
    className: 'quote',
    begin: '^>\\s+',
    contains: CONTAINABLE,
    end: '$'
  };

  return {
    name: 'Markdown',
    aliases: [
      'md',
      'mkdown',
      'mkd'
    ],
    contains: [
      HEADER,
      INLINE_HTML,
      LIST,
      BOLD,
      ITALIC,
      BLOCKQUOTE,
      CODE,
      HORIZONTAL_RULE,
      LINK,
      LINK_REFERENCE
    ]
  };
}




/***/ }),

/***/ "./node_modules/highlight.js/es/languages/matlab.js":
/*!**********************************************************!*\
  !*** ./node_modules/highlight.js/es/languages/matlab.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ matlab)
/* harmony export */ });
/*
Language: Matlab
Author: Denis Bardadym <bardadymchik@gmail.com>
Contributors: Eugene Nizhibitsky <nizhibitsky@ya.ru>, Egor Rogov <e.rogov@postgrespro.ru>
Website: https://www.mathworks.com/products/matlab.html
Category: scientific
*/

/*
  Formal syntax is not published, helpful link:
  https://github.com/kornilova-l/matlab-IntelliJ-plugin/blob/master/src/main/grammar/Matlab.bnf
*/
function matlab(hljs) {
  const TRANSPOSE_RE = '(\'|\\.\')+';
  const TRANSPOSE = {
    relevance: 0,
    contains: [ { begin: TRANSPOSE_RE } ]
  };

  return {
    name: 'Matlab',
    keywords: {
      keyword:
        'arguments break case catch classdef continue else elseif end enumeration events for function '
        + 'global if methods otherwise parfor persistent properties return spmd switch try while',
      built_in:
        'sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan '
        + 'atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot '
        + 'cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog '
        + 'realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal '
        + 'cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli '
        + 'besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma '
        + 'gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms '
        + 'nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones '
        + 'eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length '
        + 'ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril '
        + 'triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute '
        + 'shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i|0 inf nan '
        + 'isnan isinf isfinite j|0 why compan gallery hadamard hankel hilb invhilb magic pascal '
        + 'rosser toeplitz vander wilkinson max min nanmax nanmin mean nanmean type table '
        + 'readtable writetable sortrows sort figure plot plot3 scatter scatter3 cellfun '
        + 'legend intersect ismember procrustes hold num2cell '
    },
    illegal: '(//|"|#|/\\*|\\s+/\\w+)',
    contains: [
      {
        className: 'function',
        beginKeywords: 'function',
        end: '$',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'params',
            variants: [
              {
                begin: '\\(',
                end: '\\)'
              },
              {
                begin: '\\[',
                end: '\\]'
              }
            ]
          }
        ]
      },
      {
        className: 'built_in',
        begin: /true|false/,
        relevance: 0,
        starts: TRANSPOSE
      },
      {
        begin: '[a-zA-Z][a-zA-Z_0-9]*' + TRANSPOSE_RE,
        relevance: 0
      },
      {
        className: 'number',
        begin: hljs.C_NUMBER_RE,
        relevance: 0,
        starts: TRANSPOSE
      },
      {
        className: 'string',
        begin: '\'',
        end: '\'',
        contains: [ { begin: '\'\'' } ]
      },
      {
        begin: /\]|\}|\)/,
        relevance: 0,
        starts: TRANSPOSE
      },
      {
        className: 'string',
        begin: '"',
        end: '"',
        contains: [ { begin: '""' } ],
        starts: TRANSPOSE
      },
      hljs.COMMENT('^\\s*%\\{\\s*$', '^\\s*%\\}\\s*$'),
      hljs.COMMENT('%', '$')
    ]
  };
}




/***/ }),

/***/ "./node_modules/highlight.js/es/languages/python.js":
/*!**********************************************************!*\
  !*** ./node_modules/highlight.js/es/languages/python.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ python)
/* harmony export */ });
/*
Language: Python
Description: Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.
Website: https://www.python.org
Category: common
*/

function python(hljs) {
  const regex = hljs.regex;
  const IDENT_RE = /[\p{XID_Start}_]\p{XID_Continue}*/u;
  const RESERVED_WORDS = [
    'and',
    'as',
    'assert',
    'async',
    'await',
    'break',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'finally',
    'for',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'nonlocal|10',
    'not',
    'or',
    'pass',
    'raise',
    'return',
    'try',
    'while',
    'with',
    'yield'
  ];

  const BUILT_INS = [
    '__import__',
    'abs',
    'all',
    'any',
    'ascii',
    'bin',
    'bool',
    'breakpoint',
    'bytearray',
    'bytes',
    'callable',
    'chr',
    'classmethod',
    'compile',
    'complex',
    'delattr',
    'dict',
    'dir',
    'divmod',
    'enumerate',
    'eval',
    'exec',
    'filter',
    'float',
    'format',
    'frozenset',
    'getattr',
    'globals',
    'hasattr',
    'hash',
    'help',
    'hex',
    'id',
    'input',
    'int',
    'isinstance',
    'issubclass',
    'iter',
    'len',
    'list',
    'locals',
    'map',
    'max',
    'memoryview',
    'min',
    'next',
    'object',
    'oct',
    'open',
    'ord',
    'pow',
    'print',
    'property',
    'range',
    'repr',
    'reversed',
    'round',
    'set',
    'setattr',
    'slice',
    'sorted',
    'staticmethod',
    'str',
    'sum',
    'super',
    'tuple',
    'type',
    'vars',
    'zip'
  ];

  const LITERALS = [
    '__debug__',
    'Ellipsis',
    'False',
    'None',
    'NotImplemented',
    'True'
  ];

  // https://docs.python.org/3/library/typing.html
  // TODO: Could these be supplemented by a CamelCase matcher in certain
  // contexts, leaving these remaining only for relevance hinting?
  const TYPES = [
    "Any",
    "Callable",
    "Coroutine",
    "Dict",
    "List",
    "Literal",
    "Generic",
    "Optional",
    "Sequence",
    "Set",
    "Tuple",
    "Type",
    "Union"
  ];

  const KEYWORDS = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    literal: LITERALS,
    type: TYPES
  };

  const PROMPT = {
    className: 'meta',
    begin: /^(>>>|\.\.\.) /
  };

  const SUBST = {
    className: 'subst',
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    illegal: /#/
  };

  const LITERAL_BRACKET = {
    begin: /\{\{/,
    relevance: 0
  };

  const STRING = {
    className: 'string',
    contains: [ hljs.BACKSLASH_ESCAPE ],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  // https://docs.python.org/3.9/reference/lexical_analysis.html#numeric-literals
  const digitpart = '[0-9](_?[0-9])*';
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  // Whitespace after a number (or any lexical token) is needed only if its absence
  // would change the tokenization
  // https://docs.python.org/3.9/reference/lexical_analysis.html#whitespace-between-tokens
  // We deviate slightly, requiring a word boundary or a keyword
  // to avoid accidentally recognizing *prefixes* (e.g., `0` in `0x41` or `08` or `0__1`)
  const lookahead = `\\b|${RESERVED_WORDS.join('|')}`;
  const NUMBER = {
    className: 'number',
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?(?=${lookahead})`
      },
      {
        begin: `(${pointfloat})[jJ]?`
      },

      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${lookahead})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${lookahead})`
      },

      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${digitpart})[jJ](?=${lookahead})`
      }
    ]
  };
  const COMMENT_TYPE = {
    className: "comment",
    begin: regex.lookahead(/# type:/),
    end: /$/,
    keywords: KEYWORDS,
    contains: [
      { // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: true
      }
    ]
  };
  const PARAMS = {
    className: 'params',
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: true
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          'self',
          PROMPT,
          NUMBER,
          STRING,
          hljs.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  SUBST.contains = [
    STRING,
    NUMBER,
    PROMPT
  ];

  return {
    name: 'Python',
    aliases: [
      'py',
      'gyp',
      'ipython'
    ],
    unicodeRegex: true,
    keywords: KEYWORDS,
    illegal: /(<\/|->|\?)|=>/,
    contains: [
      PROMPT,
      NUMBER,
      {
        // very common convention
        begin: /\bself\b/
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: "if",
        relevance: 0
      },
      STRING,
      COMMENT_TYPE,
      hljs.HASH_COMMENT_MODE,
      {
        match: [
          /\bdef/, /\s+/,
          IDENT_RE,
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [ PARAMS ]
      },
      {
        variants: [
          {
            match: [
              /\bclass/, /\s+/,
              IDENT_RE, /\s*/,
              /\(\s*/, IDENT_RE,/\s*\)/
            ],
          },
          {
            match: [
              /\bclass/, /\s+/,
              IDENT_RE
            ],
          }
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited",
        }
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          NUMBER,
          PARAMS,
          STRING
        ]
      }
    ]
  };
}




/***/ }),

/***/ "./node_modules/highlight.js/es/languages/r.js":
/*!*****************************************************!*\
  !*** ./node_modules/highlight.js/es/languages/r.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ r)
/* harmony export */ });
/*
Language: R
Description: R is a free software environment for statistical computing and graphics.
Author: Joe Cheng <joe@rstudio.org>
Contributors: Konrad Rudolph <konrad.rudolph@gmail.com>
Website: https://www.r-project.org
Category: common,scientific
*/

/** @type LanguageFn */
function r(hljs) {
  const regex = hljs.regex;
  // Identifiers in R cannot start with `_`, but they can start with `.` if it
  // is not immediately followed by a digit.
  // R also supports quoted identifiers, which are near-arbitrary sequences
  // delimited by backticks (`…`), which may contain escape sequences. These are
  // handled in a separate mode. See `test/markup/r/names.txt` for examples.
  // FIXME: Support Unicode identifiers.
  const IDENT_RE = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/;
  const NUMBER_TYPES_RE = regex.either(
    // Special case: only hexadecimal binary powers can contain fractions
    /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/,
    // Hexadecimal numbers without fraction and optional binary power
    /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/,
    // Decimal numbers
    /(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/
  );
  const OPERATORS_RE = /[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/;
  const PUNCTUATION_RE = regex.either(
    /[()]/,
    /[{}]/,
    /\[\[/,
    /[[\]]/,
    /\\/,
    /,/
  );

  return {
    name: 'R',

    keywords: {
      $pattern: IDENT_RE,
      keyword:
        'function if in break next repeat else for while',
      literal:
        'NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 '
        + 'NA_character_|10 NA_complex_|10',
      built_in:
        // Builtin constants
        'LETTERS letters month.abb month.name pi T F '
        // Primitive functions
        // These are all the functions in `base` that are implemented as a
        // `.Primitive`, minus those functions that are also keywords.
        + 'abs acos acosh all any anyNA Arg as.call as.character '
        + 'as.complex as.double as.environment as.integer as.logical '
        + 'as.null.default as.numeric as.raw asin asinh atan atanh attr '
        + 'attributes baseenv browser c call ceiling class Conj cos cosh '
        + 'cospi cummax cummin cumprod cumsum digamma dim dimnames '
        + 'emptyenv exp expression floor forceAndCall gamma gc.time '
        + 'globalenv Im interactive invisible is.array is.atomic is.call '
        + 'is.character is.complex is.double is.environment is.expression '
        + 'is.finite is.function is.infinite is.integer is.language '
        + 'is.list is.logical is.matrix is.na is.name is.nan is.null '
        + 'is.numeric is.object is.pairlist is.raw is.recursive is.single '
        + 'is.symbol lazyLoadDBfetch length lgamma list log max min '
        + 'missing Mod names nargs nzchar oldClass on.exit pos.to.env '
        + 'proc.time prod quote range Re rep retracemem return round '
        + 'seq_along seq_len seq.int sign signif sin sinh sinpi sqrt '
        + 'standardGeneric substitute sum switch tan tanh tanpi tracemem '
        + 'trigamma trunc unclass untracemem UseMethod xtfrm',
    },

    contains: [
      // Roxygen comments
      hljs.COMMENT(
        /#'/,
        /$/,
        { contains: [
          {
            // Handle `@examples` separately to cause all subsequent code
            // until the next `@`-tag on its own line to be kept as-is,
            // preventing highlighting. This code is example R code, so nested
            // doctags shouldn’t be treated as such. See
            // `test/markup/r/roxygen.txt` for an example.
            scope: 'doctag',
            match: /@examples/,
            starts: {
              end: regex.lookahead(regex.either(
                // end if another doc comment
                /\n^#'\s*(?=@[a-zA-Z]+)/,
                // or a line with no comment
                /\n^(?!#')/
              )),
              endsParent: true
            }
          },
          {
            // Handle `@param` to highlight the parameter name following
            // after.
            scope: 'doctag',
            begin: '@param',
            end: /$/,
            contains: [
              {
                scope: 'variable',
                variants: [
                  { match: IDENT_RE },
                  { match: /`(?:\\.|[^`\\])+`/ }
                ],
                endsParent: true
              }
            ]
          },
          {
            scope: 'doctag',
            match: /@[a-zA-Z]+/
          },
          {
            scope: 'keyword',
            match: /\\[a-zA-Z]+/
          }
        ] }
      ),

      hljs.HASH_COMMENT_MODE,

      {
        scope: 'string',
        contains: [ hljs.BACKSLASH_ESCAPE ],
        variants: [
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\(/,
            end: /\)(-*)"/
          }),
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\{/,
            end: /\}(-*)"/
          }),
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\[/,
            end: /\](-*)"/
          }),
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\(/,
            end: /\)(-*)'/
          }),
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\{/,
            end: /\}(-*)'/
          }),
          hljs.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\[/,
            end: /\](-*)'/
          }),
          {
            begin: '"',
            end: '"',
            relevance: 0
          },
          {
            begin: "'",
            end: "'",
            relevance: 0
          }
        ],
      },

      // Matching numbers immediately following punctuation and operators is
      // tricky since we need to look at the character ahead of a number to
      // ensure the number is not part of an identifier, and we cannot use
      // negative look-behind assertions. So instead we explicitly handle all
      // possible combinations of (operator|punctuation), number.
      // TODO: replace with negative look-behind when available
      // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/ },
      // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[Li]?/ },
      // { begin: /(?<![a-zA-Z0-9._])(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[Li]?/ }
      {
        relevance: 0,
        variants: [
          {
            scope: {
              1: 'operator',
              2: 'number'
            },
            match: [
              OPERATORS_RE,
              NUMBER_TYPES_RE
            ]
          },
          {
            scope: {
              1: 'operator',
              2: 'number'
            },
            match: [
              /%[^%]*%/,
              NUMBER_TYPES_RE
            ]
          },
          {
            scope: {
              1: 'punctuation',
              2: 'number'
            },
            match: [
              PUNCTUATION_RE,
              NUMBER_TYPES_RE
            ]
          },
          {
            scope: { 2: 'number' },
            match: [
              /[^a-zA-Z0-9._]|^/, // not part of an identifier, or start of document
              NUMBER_TYPES_RE
            ]
          }
        ]
      },

      // Operators/punctuation when they're not directly followed by numbers
      {
        // Relevance boost for the most common assignment form.
        scope: { 3: 'operator' },
        match: [
          IDENT_RE,
          /\s+/,
          /<-/,
          /\s+/
        ]
      },

      {
        scope: 'operator',
        relevance: 0,
        variants: [
          { match: OPERATORS_RE },
          { match: /%[^%]*%/ }
        ]
      },

      {
        scope: 'punctuation',
        relevance: 0,
        match: PUNCTUATION_RE
      },

      {
        // Escaped identifier
        begin: '`',
        end: '`',
        contains: [ { begin: /\\./ } ]
      }
    ]
  };
}




/***/ }),

/***/ "./node_modules/highlight.js/es/languages/yaml.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/es/languages/yaml.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ yaml)
/* harmony export */ });
/*
Language: YAML
Description: Yet Another Markdown Language
Author: Stefan Wienert <stwienert@gmail.com>
Contributors: Carl Baxter <carl@cbax.tech>
Requires: ruby.js
Website: https://yaml.org
Category: common, config
*/
function yaml(hljs) {
  const LITERALS = 'true false yes no null';

  // YAML spec allows non-reserved URI characters in tags.
  const URI_CHARACTERS = '[\\w#;/?:@&=+$,.~*\'()[\\]]+';

  // Define keys as starting with a word character
  // ...containing word chars, spaces, colons, forward-slashes, hyphens and periods
  // ...and ending with a colon followed immediately by a space, tab or newline.
  // The YAML spec allows for much more than this, but this covers most use-cases.
  const KEY = {
    className: 'attr',
    variants: [
      { begin: '\\w[\\w :\\/.-]*:(?=[ \t]|$)' },
      { // double quoted keys
        begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)' },
      { // single quoted keys
        begin: '\'\\w[\\w :\\/.-]*\':(?=[ \t]|$)' }
    ]
  };

  const TEMPLATE_VARIABLES = {
    className: 'template-variable',
    variants: [
      { // jinja templates Ansible
        begin: /\{\{/,
        end: /\}\}/
      },
      { // Ruby i18n
        begin: /%\{/,
        end: /\}/
      }
    ]
  };
  const STRING = {
    className: 'string',
    relevance: 0,
    variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      },
      { begin: /\S+/ }
    ],
    contains: [
      hljs.BACKSLASH_ESCAPE,
      TEMPLATE_VARIABLES
    ]
  };

  // Strings inside of value containers (objects) can't contain braces,
  // brackets, or commas
  const CONTAINER_STRING = hljs.inherit(STRING, { variants: [
    {
      begin: /'/,
      end: /'/
    },
    {
      begin: /"/,
      end: /"/
    },
    { begin: /[^\s,{}[\]]+/ }
  ] });

  const DATE_RE = '[0-9]{4}(-[0-9][0-9]){0,2}';
  const TIME_RE = '([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?';
  const FRACTION_RE = '(\\.[0-9]*)?';
  const ZONE_RE = '([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?';
  const TIMESTAMP = {
    className: 'number',
    begin: '\\b' + DATE_RE + TIME_RE + FRACTION_RE + ZONE_RE + '\\b'
  };

  const VALUE_CONTAINER = {
    end: ',',
    endsWithParent: true,
    excludeEnd: true,
    keywords: LITERALS,
    relevance: 0
  };
  const OBJECT = {
    begin: /\{/,
    end: /\}/,
    contains: [ VALUE_CONTAINER ],
    illegal: '\\n',
    relevance: 0
  };
  const ARRAY = {
    begin: '\\[',
    end: '\\]',
    contains: [ VALUE_CONTAINER ],
    illegal: '\\n',
    relevance: 0
  };

  const MODES = [
    KEY,
    {
      className: 'meta',
      begin: '^---\\s*$',
      relevance: 10
    },
    { // multi line string
      // Blocks start with a | or > followed by a newline
      //
      // Indentation of subsequent lines must be the same to
      // be considered part of the block
      className: 'string',
      begin: '[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*'
    },
    { // Ruby/Rails erb
      begin: '<%[%=-]?',
      end: '[%-]?%>',
      subLanguage: 'ruby',
      excludeBegin: true,
      excludeEnd: true,
      relevance: 0
    },
    { // named tags
      className: 'type',
      begin: '!\\w+!' + URI_CHARACTERS
    },
    // https://yaml.org/spec/1.2/spec.html#id2784064
    { // verbatim tags
      className: 'type',
      begin: '!<' + URI_CHARACTERS + ">"
    },
    { // primary tags
      className: 'type',
      begin: '!' + URI_CHARACTERS
    },
    { // secondary tags
      className: 'type',
      begin: '!!' + URI_CHARACTERS
    },
    { // fragment id &ref
      className: 'meta',
      begin: '&' + hljs.UNDERSCORE_IDENT_RE + '$'
    },
    { // fragment reference *ref
      className: 'meta',
      begin: '\\*' + hljs.UNDERSCORE_IDENT_RE + '$'
    },
    { // array listing
      className: 'bullet',
      // TODO: remove |$ hack when we have proper look-ahead support
      begin: '-(?=[ ]|$)',
      relevance: 0
    },
    hljs.HASH_COMMENT_MODE,
    {
      beginKeywords: LITERALS,
      keywords: { literal: LITERALS }
    },
    TIMESTAMP,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: 'number',
      begin: hljs.C_NUMBER_RE + '\\b',
      relevance: 0
    },
    OBJECT,
    ARRAY,
    STRING
  ];

  const VALUE_MODES = [ ...MODES ];
  VALUE_MODES.pop();
  VALUE_MODES.push(CONTAINER_STRING);
  VALUE_CONTAINER.contains = VALUE_MODES;

  return {
    name: 'YAML',
    case_insensitive: true,
    aliases: [ 'yml' ],
    contains: MODES
  };
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initShidashi": () => (/* binding */ initShidashi),
/* harmony export */   "registerShidashi": () => (/* binding */ registerShidashi)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_AdminLTE_AdminLTE_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/AdminLTE/AdminLTE.js */ "./src/js/AdminLTE/AdminLTE.js");
/* harmony import */ var _css_OverlayScrollbars_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/OverlayScrollbars.css */ "./src/css/OverlayScrollbars.css");
/* harmony import */ var _scss_shidashi_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scss/shidashi.scss */ "./src/scss/shidashi.scss");
/* harmony import */ var _js_shiny_progress_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/shiny-progress.js */ "./src/js/shiny-progress.js");
/* harmony import */ var _js_shiny_clipboard_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/shiny-clipboard.js */ "./src/js/shiny-clipboard.js");
/* harmony import */ var _js_import_highlightjs_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/import-highlightjs.js */ "./src/js/import-highlightjs.js");
/* harmony import */ var _js_class_shidashi_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/class-shidashi.js */ "./src/js/class-shidashi.js");

// import 'bootstrap';
// import 'admin-lte/dist/js/adminlte.js';

// import "admin-lte/dist/css/adminlte.css";






// import "./scss/shidashi.scss";

let shidashi;

function ensureShidashi() {
  if(shidashi) { return(shidashi); }
  shidashi = new _js_class_shidashi_js__WEBPACK_IMPORTED_MODULE_7__.Shidashi();
  return(shidashi);
}

function getModuleId(item) {
  if(!item.length) {
    return;
  }
  const re = /^tab--module-(.*)-shared_id-[a-zA-Z0-9]+$/g;
  let module_id = re.exec(item[0].id);
  if(module_id && module_id.length > 0)  {
    module_id = module_id[1];
    return( module_id )
  } else {
    return;
  }
}

let initialized = false;
function initShidashi() {
  if(initialized) {
    return( shidashi );
  }
  ensureShidashi();
  const $iframeWrapper = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.content-wrapper');

  const onTabChanged = (item) => {

    const module_id = getModuleId(item);
    if(!module_id) { return(item); }

    shidashi._active_module = module_id;
    const data = {
      type: "active_module",
      id : module_id,
      label : item[0].innerText.trim()
    };
    shidashi.shinySetInput("@rave_action@", data, true, true);
    // shidashi.notifyIframes("shinySetInput", ["@rave_action@", data, true, true]);

    shidashi.removeClass("body", "scroller-not-top navbar-hidden");
    shidashi.notifyIframes("resumeStatus", [shidashi]);
    return item;
  }

  const adminLTEIframeHandler = $iframeWrapper.data('adminLTEIframeHandler');

  if( adminLTEIframeHandler ) {
    console.debug("AdminLTE: using existing IFrame handler");
    adminLTEIframeHandler._config.onTabChanged = onTabChanged;
  } else {
    console.debug("AdminLTE: creating new IFrame handler");
    $iframeWrapper.IFrame({
      onTabClick: (item) => {
        return item;
      },
      onTabChanged: onTabChanged,
      onTabCreated: (item) => {
        return item;
      },
      autoIframeMode: true,
      autoItemActive: true,
      autoShowNewTab: true,
      allowDuplicates: false,
      loadingScreen: false,
      useNavbarItems: false,
      scrollOffset: 0
    });
  }
  initialized = true;
  return( shidashi );
}



function registerShidashi(shiny) {
  ensureShidashi();
  initShidashi();
  shidashi._shiny = shiny;
  shidashi._register_shiny();
  shidashi._finalize_initialization();
  shidashi.shiny_connected = true;
  shidashi.ensureShiny();

  (0,_js_shiny_progress_js__WEBPACK_IMPORTED_MODULE_4__.registerProgressOutput)(shiny);
  (0,_js_shiny_clipboard_js__WEBPACK_IMPORTED_MODULE_5__.registerClipboardOutput)(shiny, shidashi);


  return( shidashi );
}







/*if (window.hljs) {
  hljs.configure({languages: []});
  hljs.initHighlightingOnLoad();
  if (document.readyState && document.readyState === "complete") {
    window.setTimeout(function() { hljs.initHighlighting(); }, 0);
  }
}*/

// $(document).ready

})();

RAVEPipeline = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=shidashi.js.map