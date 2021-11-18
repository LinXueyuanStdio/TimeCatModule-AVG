/*!
 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*!
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var parser = __webpack_require__(1);
	var variable = __webpack_require__(88);

	var _require = __webpack_require__(89),
	    IfBlock = _require.IfBlock,
	    WhileBlock = _require.WhileBlock,
	    ForeachBlock = _require.ForeachBlock;

	var StoryScript = function () {
	  function StoryScript(onGlobalChanged) {
	    _classCallCheck(this, StoryScript);

	    this.BLOCKSTACK = [];
	    this.CURRENTBLOCK = null;

	    this.onGlobalChanged = onGlobalChanged;
	  }

	  _createClass(StoryScript, [{
	    key: 'load',
	    value: function load(string) {
	      var result = parser.parse(string);
	      var system = new IfBlock(result);
	      this.CURRENTBLOCK = system;
	      this.BLOCKSTACK = [];
	      // variable.reset();
	    }
	  }, {
	    key: 'getBlockData',
	    value: function getBlockData() {
	      var blocks = [];
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = [].concat(_toConsumableArray(this.BLOCKSTACK), [this.CURRENTBLOCK]).reverse().entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _step$value = _slicedToArray(_step.value, 2),
	              node = _step$value[0],
	              block = _step$value[1];

	          var blockData = block.getData();
	          blockData.scope = variable.getScope(node);
	          blocks.push(blockData);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return blocks.reverse();
	    }
	  }, {
	    key: 'getGlobalScope',
	    value: function getGlobalScope() {
	      return variable.getGlobalScope();
	    }
	  }, {
	    key: 'getSaveScope',
	    value: function getSaveScope() {
	      return variable.getSaveScope();
	    }
	    // @deprecated

	  }, {
	    key: 'getData',
	    value: function getData() {
	      console.warn('[Storyscript] getData() has been deprecated!');
	      return {
	        blocks: this.getBlockData(),
	        globalScope: this.getGlobalScope(),
	        saveScope: this.getSaveScope()
	      };
	    }
	  }, {
	    key: 'setGlobalScope',
	    value: function setGlobalScope(scope) {
	      variable.setGlobalScope(scope);
	    }
	  }, {
	    key: 'setSaveScope',
	    value: function setSaveScope(scope) {
	      variable.setSaveScope(scope);
	    }
	  }, {
	    key: 'setBlockData',
	    value: function setBlockData(blocks) {
	      var scopes = [blocks[0].scope];
	      variable.setScopes(scopes);
	      this.CURRENTBLOCK.setCurrentLine(blocks[0].currentLine);

	      if (blocks.length === 1) {
	        return true;
	      }

	      for (var i = 0; i < blocks.length; i++) {
	        var block = blocks[i];
	        var nextBlock = blocks[i + 1];
	        var lastLine = block.currentLine - 1;
	        var line = this.CURRENTBLOCK.getLine(lastLine);
	        if (line.name === nextBlock.type) {
	          switch (line.name) {
	            case 'if':
	              var ifBlock = new IfBlock(line.blocks[nextBlock.blockIndex], nextBlock.blockIndex);
	              ifBlock.setCurrentLine(nextBlock.currentLine);
	              variable.pushScope(nextBlock.scope);
	              // variable.popScope();
	              this.BLOCKSTACK.push(this.CURRENTBLOCK);
	              this.CURRENTBLOCK = ifBlock;
	              break;
	            case 'while':
	              var whileBlock = new WhileBlock(line.block, line.condition);
	              whileBlock.setCurrentLine(nextBlock.currentLine);
	              variable.pushScope(nextBlock.scope);
	              // variable.popScope();
	              this.BLOCKSTACK.push(this.CURRENTBLOCK);
	              this.CURRENTBLOCK = whileBlock;
	              break;
	            case 'foreach':
	              var foreachBlock = new ForeachBlock(line.block, line.child, line.children);
	              foreachBlock.setCurrentLine(nextBlock.currentLine);
	              variable.pushScope(nextBlock.scope);
	              // variable.popScope();
	              this.BLOCKSTACK.push(this.CURRENTBLOCK);
	              this.CURRENTBLOCK = foreachBlock;
	              break;
	            default:
	              throw 'Bad savedata';
	          }
	        } else {
	          throw 'Bad savedata';
	        }
	      }
	    }
	    // @deprecated

	  }, {
	    key: 'setData',
	    value: function setData(object) {
	      console.warn('[Storyscript] setData() has been deprecated!');
	      this.setGlobalScope(object.globalScope);
	      this.setSaveScope(object.saveScope);
	      this.setBlockData(object.blocks);
	    }
	  }, {
	    key: Symbol.iterator,
	    value: function value() {
	      return this;
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      var _CURRENTBLOCK$next = this.CURRENTBLOCK.next(),
	          value = _CURRENTBLOCK$next.value,
	          done = _CURRENTBLOCK$next.done;

	      if (done) {
	        var CURRENTBLOCK = this.BLOCKSTACK.pop();
	        if (CURRENTBLOCK) {
	          this.CURRENTBLOCK = CURRENTBLOCK;
	          variable.popScope();
	          return this.next();
	        } else {
	          return { done: true };
	        }
	      } else {
	        var retValue = this.handleScript(value);
	        if (retValue) {
	          return { value: retValue, done: false };
	        } else {
	          // handleLogic will return undefined, so should exec next line
	          return this.next();
	        }
	      }
	    }
	  }, {
	    key: 'handleScript',
	    value: function handleScript(argLine) {
	      // deep copy
	      var line = Object.assign({}, argLine);

	      if (line.type === 'content') {
	        return this.handleContent(line);
	      } else if (line.type === 'logic') {
	        return this.handleLogic(line);
	      } else if (line.type === 'comment') {
	        return null;
	      } else {
	        throw 'Unrecognized type ' + line.type;
	      }
	    }
	  }, {
	    key: 'handleContent',
	    value: function handleContent(line) {
	      var params = line.params;
	      var keys = Object.keys(params);
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var key = _step2.value;

	          params[key] = params[key].value;
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      return line;
	    }
	  }, {
	    key: 'handleLogic',
	    value: function handleLogic(line) {
	      switch (line.name) {
	        case 'if':
	          return this.handleLogic_IF(line);break;
	        case 'while':
	          return this.handleLogic_WHILE(line);break;
	        case 'foreach':
	          return this.handleLogic_FOREACH(line);break;
	        case 'let':
	          return this.handleLogic_LET(line);break;
	        default:
	          throw 'Unrecognized name ' + line.name;
	      }
	    }
	  }, {
	    key: 'handleLogic_IF',
	    value: function handleLogic_IF(line) {
	      var blockIndex = 0;
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = line.conditions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var condition = _step3.value;

	          if (variable.calc(condition)) {
	            break;
	          } else {
	            blockIndex++;
	          }
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }

	      this.BLOCKSTACK.push(this.CURRENTBLOCK);
	      var blockData = line.blocks[blockIndex];
	      var block = new IfBlock(blockData, blockIndex);
	      this.CURRENTBLOCK = block;
	      // variable.pushScope();
	    }
	  }, {
	    key: 'handleLogic_WHILE',
	    value: function handleLogic_WHILE(line) {
	      var result = variable.calc(line.condition);
	      if (result) {
	        this.BLOCKSTACK.push(this.CURRENTBLOCK);
	        var blockData = line.block;
	        var block = new WhileBlock(blockData, line.condition);
	        this.CURRENTBLOCK = block;
	      }
	      // variable.pushScope();
	    }
	  }, {
	    key: 'handleLogic_FOREACH',
	    value: function handleLogic_FOREACH(line) {
	      var children = variable.calc(line.children);
	      if (children instanceof Array) {
	        this.BLOCKSTACK.push(this.CURRENTBLOCK);
	        var blockData = line.block;
	        var block = new ForeachBlock(blockData, line.child, line.children);
	        this.CURRENTBLOCK = block;
	      } else {
	        throw '[Foreach] Children must be a array';
	      }
	      // variable.pushScope();
	    }
	  }, {
	    key: 'handleLogic_LET',
	    value: function handleLogic_LET(line) {
	      if (line.left.prefix === '$') {
	        this.onGlobalChanged && this.onGlobalChanged();
	      }
	      variable.assign(line.left.value, line.left.prefix, line.right, line.explicit);
	    }
	  }]);

	  return StoryScript;
	}();

	// module.exports = StoryScript;


	exports.default = StoryScript;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var ohm = __webpack_require__(2);
	// var fs = require('fs');
	var actions = __webpack_require__(78);
	var contents = __webpack_require__(87);

	var myGrammar = ohm.grammar(contents);
	var mySemantics = myGrammar.createSemantics();
	mySemantics.addOperation('parse', actions);

	exports.parse = function (string) {
	  var m = myGrammar.match(string);
	  if (m.succeeded()) {
	    return mySemantics(m).parse();
	  } else {
	    throw m.message;
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* global document, XMLHttpRequest */

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var Builder = __webpack_require__(3);
	var Grammar = __webpack_require__(5);
	var Namespace = __webpack_require__(15);
	var common = __webpack_require__(10);
	var errors = __webpack_require__(14);
	var pexprs = __webpack_require__(12);
	var util = __webpack_require__(24);

	var isBuffer = __webpack_require__(71);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	// The metagrammar, i.e. the grammar for Ohm grammars. Initialized at the
	// bottom of this file because loading the grammar requires Ohm itself.
	var ohmGrammar;

	// An object which makes it possible to stub out the document API for testing.
	var documentInterface = {
	  querySelector: function(sel) { return document.querySelector(sel); },
	  querySelectorAll: function(sel) { return document.querySelectorAll(sel); }
	};

	// Check if `obj` is a DOM element.
	function isElement(obj) {
	  return !!(obj && obj.nodeType === 1);
	}

	function isUndefined(obj) {
	  return obj === void 0;  // eslint-disable-line no-void
	}

	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

	function isArrayLike(obj) {
	  if (obj == null) {
	    return false;
	  }
	  var length = obj.length;
	  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	}

	// TODO: just use the jQuery thing
	function load(url) {
	  var req = new XMLHttpRequest();
	  req.open('GET', url, false);
	  try {
	    req.send();
	    if (req.status === 0 || req.status === 200) {
	      return req.responseText;
	    }
	  } catch (e) {}
	  throw new Error('unable to load url ' + url);
	}

	// Returns a Grammar instance (i.e., an object with a `match` method) for
	// `tree`, which is the concrete syntax tree of a user-written grammar.
	// The grammar will be assigned into `namespace` under the name of the grammar
	// as specified in the source.
	function buildGrammar(match, namespace, optOhmGrammarForTesting) {
	  var builder = new Builder();
	  var decl;
	  var currentRuleName;
	  var currentRuleFormals;
	  var overriding = false;
	  var metaGrammar = optOhmGrammarForTesting || ohmGrammar;

	  // A visitor that produces a Grammar instance from the CST.
	  var helpers = metaGrammar.createSemantics().addOperation('visit', {
	    Grammar: function(n, s, open, rs, close) {
	      var grammarName = n.visit();
	      decl = builder.newGrammar(grammarName, namespace);
	      s.visit();
	      rs.visit();
	      var g = decl.build();
	      g.source = this.source.trimmed();
	      if (grammarName in namespace) {
	        throw errors.duplicateGrammarDeclaration(g, namespace);
	      }
	      namespace[grammarName] = g;
	      return g;
	    },

	    SuperGrammar: function(_, n) {
	      var superGrammarName = n.visit();
	      if (superGrammarName === 'null') {
	        decl.withSuperGrammar(null);
	      } else {
	        if (!namespace || !(superGrammarName in namespace)) {
	          throw errors.undeclaredGrammar(superGrammarName, namespace, n.source);
	        }
	        decl.withSuperGrammar(namespace[superGrammarName]);
	      }
	    },

	    Rule_define: function(n, fs, d, _, b) {
	      currentRuleName = n.visit();
	      currentRuleFormals = fs.visit()[0] || [];
	      // If there is no default start rule yet, set it now. This must be done before visiting
	      // the body, because it might contain an inline rule definition.
	      if (!decl.defaultStartRule && decl.ensureSuperGrammar() !== Grammar.ProtoBuiltInRules) {
	        decl.withDefaultStartRule(currentRuleName);
	      }
	      var body = b.visit();
	      var description = d.visit()[0];
	      var source = this.source.trimmed();
	      return decl.define(currentRuleName, currentRuleFormals, body, description, source);
	    },
	    Rule_override: function(n, fs, _, b) {
	      currentRuleName = n.visit();
	      currentRuleFormals = fs.visit()[0] || [];
	      overriding = true;
	      var body = b.visit();
	      var source = this.source.trimmed();
	      var ans = decl.override(currentRuleName, currentRuleFormals, body, null, source);
	      overriding = false;
	      return ans;
	    },
	    Rule_extend: function(n, fs, _, b) {
	      currentRuleName = n.visit();
	      currentRuleFormals = fs.visit()[0] || [];
	      var body = b.visit();
	      var source = this.source.trimmed();
	      var ans = decl.extend(currentRuleName, currentRuleFormals, body, null, source);
	      return ans;
	    },
	    RuleBody: function(_, terms) {
	      var args = terms.visit();
	      return builder.alt.apply(builder, args).withSource(this.source);
	    },

	    Formals: function(opointy, fs, cpointy) {
	      return fs.visit();
	    },

	    Params: function(opointy, ps, cpointy) {
	      return ps.visit();
	    },

	    Alt: function(seqs) {
	      var args = seqs.visit();
	      return builder.alt.apply(builder, args).withSource(this.source);
	    },

	    TopLevelTerm_inline: function(b, n) {
	      var inlineRuleName = currentRuleName + '_' + n.visit();
	      var body = b.visit();
	      var source = this.source.trimmed();
	      var isNewRuleDeclaration =
	          !(decl.superGrammar && decl.superGrammar.rules[inlineRuleName]);
	      if (overriding && !isNewRuleDeclaration) {
	        decl.override(inlineRuleName, currentRuleFormals, body, null, source);
	      } else {
	        decl.define(inlineRuleName, currentRuleFormals, body, null, source);
	      }
	      var params = currentRuleFormals.map(function(formal) { return builder.app(formal); });
	      return builder.app(inlineRuleName, params).withSource(body.source);
	    },

	    Seq: function(expr) {
	      return builder.seq.apply(builder, expr.visit()).withSource(this.source);
	    },

	    Iter_star: function(x, _) {
	      return builder.star(x.visit()).withSource(this.source);
	    },
	    Iter_plus: function(x, _) {
	      return builder.plus(x.visit()).withSource(this.source);
	    },
	    Iter_opt: function(x, _) {
	      return builder.opt(x.visit()).withSource(this.source);
	    },

	    Pred_not: function(_, x) {
	      return builder.not(x.visit()).withSource(this.source);
	    },
	    Pred_lookahead: function(_, x) {
	      return builder.lookahead(x.visit()).withSource(this.source);
	    },

	    Lex_lex: function(_, x) {
	      return builder.lex(x.visit()).withSource(this.source);
	    },

	    Base_application: function(rule, ps) {
	      return builder.app(rule.visit(), ps.visit()[0] || []).withSource(this.source);
	    },
	    Base_range: function(from, _, to) {
	      return builder.range(from.visit(), to.visit()).withSource(this.source);
	    },
	    Base_terminal: function(expr) {
	      return builder.terminal(expr.visit()).withSource(this.source);
	    },
	    Base_paren: function(open, x, close) {
	      return x.visit();
	    },

	    ruleDescr: function(open, t, close) {
	      return t.visit();
	    },
	    ruleDescrText: function(_) {
	      return this.sourceString.trim();
	    },

	    caseName: function(_, space1, n, space2, end) {
	      return n.visit();
	    },

	    name: function(first, rest) {
	      return this.sourceString;
	    },
	    nameFirst: function(expr) {},
	    nameRest: function(expr) {},

	    terminal: function(open, cs, close) {
	      return cs.visit().map(function(c) { return common.unescapeChar(c); }).join('');
	    },

	    terminalChar: function(_) {
	      return this.sourceString;
	    },

	    escapeChar: function(_) {
	      return this.sourceString;
	    },

	    NonemptyListOf: function(x, _, xs) {
	      return [x.visit()].concat(xs.visit());
	    },
	    EmptyListOf: function() {
	      return [];
	    },

	    _terminal: function() {
	      return this.primitiveValue;
	    }
	  });
	  return helpers(match).visit();
	}

	function compileAndLoad(source, namespace) {
	  var m = ohmGrammar.match(source, 'Grammars');
	  if (m.failed()) {
	    throw errors.grammarSyntaxError(m);
	  }
	  return buildGrammar(m, namespace);
	}

	// Return the contents of a script element, fetching it via XHR if necessary.
	function getScriptElementContents(el) {
	  if (!isElement(el)) {
	    throw new TypeError('Expected a DOM Node, got ' + common.unexpectedObjToString(el));
	  }
	  if (el.type !== 'text/ohm-js') {
	    throw new Error('Expected a script tag with type="text/ohm-js", got ' + el);
	  }
	  return el.getAttribute('src') ? load(el.getAttribute('src')) : el.innerHTML;
	}

	function grammar(source, optNamespace) {
	  var ns = grammars(source, optNamespace);

	  // Ensure that the source contained no more than one grammar definition.
	  var grammarNames = Object.keys(ns);
	  if (grammarNames.length === 0) {
	    throw new Error('Missing grammar definition');
	  } else if (grammarNames.length > 1) {
	    var secondGrammar = ns[grammarNames[1]];
	    var interval = secondGrammar.source;
	    throw new Error(
	        util.getLineAndColumnMessage(interval.sourceString, interval.startIdx) +
	        'Found more than one grammar definition -- use ohm.grammars() instead.');
	  }
	  return ns[grammarNames[0]];  // Return the one and only grammar.
	}

	function grammars(source, optNamespace) {
	  var ns = Namespace.extend(Namespace.asNamespace(optNamespace));
	  if (typeof source !== 'string') {
	    // For convenience, detect Node.js Buffer objects and automatically call toString().
	    if (isBuffer(source)) {
	      source = source.toString();
	    } else {
	      throw new TypeError(
	          'Expected string as first argument, got ' + common.unexpectedObjToString(source));
	    }
	  }
	  compileAndLoad(source, ns);
	  return ns;
	}

	function grammarFromScriptElement(optNode) {
	  var node = optNode;
	  if (isUndefined(node)) {
	    var nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
	    if (nodeList.length !== 1) {
	      throw new Error(
	          'Expected exactly one script tag with type="text/ohm-js", found ' + nodeList.length);
	    }
	    node = nodeList[0];
	  }
	  return grammar(getScriptElementContents(node));
	}

	function grammarsFromScriptElements(optNodeOrNodeList) {
	  // Simple case: the argument is a DOM node.
	  if (isElement(optNodeOrNodeList)) {
	    return grammars(optNodeOrNodeList);
	  }
	  // Otherwise, it must be either undefined or a NodeList.
	  var nodeList = optNodeOrNodeList;
	  if (isUndefined(nodeList)) {
	    // Find all script elements with type="text/ohm-js".
	    nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
	  } else if (typeof nodeList === 'string' || (!isElement(nodeList) && !isArrayLike(nodeList))) {
	    throw new TypeError('Expected a Node, NodeList, or Array, but got ' + nodeList);
	  }
	  var ns = Namespace.createNamespace();
	  for (var i = 0; i < nodeList.length; ++i) {
	    // Copy the new grammars into `ns` to keep the namespace flat.
	    common.extend(ns, grammars(getScriptElementContents(nodeList[i]), ns));
	  }
	  return ns;
	}

	function makeRecipe(recipe) {
	  if (typeof recipe === 'function') {
	    return recipe.call(new Builder());
	  } else {
	    if (typeof recipe === 'string') {
	      // stringified JSON recipe
	      recipe = JSON.parse(recipe);
	    }
	    return (new Builder()).fromRecipe(recipe);
	  }
	}

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	// Stuff that users should know about
	module.exports = {
	  createNamespace: Namespace.createNamespace,
	  grammar: grammar,
	  grammars: grammars,
	  grammarFromScriptElement: grammarFromScriptElement,
	  grammarsFromScriptElements: grammarsFromScriptElements,
	  makeRecipe: makeRecipe,
	  ohmGrammar: null,  // Initialized below, after Grammar.BuiltInRules.
	  pexprs: pexprs,
	  util: util,
	  extras: __webpack_require__(72)
	};

	// Stuff for testing, etc.
	module.exports._buildGrammar = buildGrammar;
	module.exports._setDocumentInterfaceForTesting = function(doc) { documentInterface = doc; };

	// Late initialization for stuff that is bootstrapped.

	Grammar.BuiltInRules = __webpack_require__(75);

	var Semantics = __webpack_require__(40);
	var operationsAndAttributesGrammar = __webpack_require__(76);
	Semantics.initBuiltInSemantics(Grammar.BuiltInRules);
	Semantics.initPrototypeParser(operationsAndAttributesGrammar);  // requires BuiltInSemantics

	module.exports.ohmGrammar = ohmGrammar = __webpack_require__(77);
	Grammar.initApplicationParser(ohmGrammar, buildGrammar);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var GrammarDecl = __webpack_require__(4);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function Builder() {}

	Builder.prototype = {
	  currentDecl: null,

	  newGrammar: function(name) {
	    return new GrammarDecl(name);
	  },

	  grammar: function(metaInfo, name, superGrammar, defaultStartRule, rules) {
	    var gDecl = new GrammarDecl(name);
	    if (superGrammar) {
	      gDecl.withSuperGrammar(this.fromRecipe(superGrammar));
	    }
	    if (defaultStartRule) {
	      gDecl.withDefaultStartRule(defaultStartRule);
	    }
	    if (metaInfo && metaInfo.source) {
	      gDecl.withSource(metaInfo.source);
	    }

	    var self = this;
	    this.currentDecl = gDecl;
	    Object.keys(rules).forEach(function(ruleName) {
	      var ruleRecipe = rules[ruleName];

	      var action = ruleRecipe[0]; // define/extend/override
	      var metaInfo = ruleRecipe[1];
	      var description = ruleRecipe[2];
	      var formals = ruleRecipe[3];
	      var body = self.fromRecipe(ruleRecipe[4]);

	      var source;
	      if (gDecl.source && metaInfo && metaInfo.sourceInterval) {
	        source = gDecl.source.subInterval(
	            metaInfo.sourceInterval[0],
	            metaInfo.sourceInterval[1] - metaInfo.sourceInterval[0]);
	      }
	      gDecl[action](ruleName, formals, body, description, source);
	    });
	    this.currentDecl = null;
	    return gDecl.build();
	  },

	  terminal: function(x) {
	    return new pexprs.Terminal(x);
	  },

	  range: function(from, to) {
	    return new pexprs.Range(from, to);
	  },

	  param: function(index) {
	    return new pexprs.Param(index);
	  },

	  alt: function(/* term1, term1, ... */) {
	    var terms = [];
	    for (var idx = 0; idx < arguments.length; idx++) {
	      var arg = arguments[idx];
	      if (!(arg instanceof pexprs.PExpr)) {
	        arg = this.fromRecipe(arg);
	      }
	      if (arg instanceof pexprs.Alt) {
	        terms = terms.concat(arg.terms);
	      } else {
	        terms.push(arg);
	      }
	    }
	    return terms.length === 1 ? terms[0] : new pexprs.Alt(terms);
	  },

	  seq: function(/* factor1, factor2, ... */) {
	    var factors = [];
	    for (var idx = 0; idx < arguments.length; idx++) {
	      var arg = arguments[idx];
	      if (!(arg instanceof pexprs.PExpr)) {
	        arg = this.fromRecipe(arg);
	      }
	      if (arg instanceof pexprs.Seq) {
	        factors = factors.concat(arg.factors);
	      } else {
	        factors.push(arg);
	      }
	    }
	    return factors.length === 1 ? factors[0] : new pexprs.Seq(factors);
	  },

	  star: function(expr) {
	    if (!(expr instanceof pexprs.PExpr)) {
	      expr = this.fromRecipe(expr);
	    }
	    return new pexprs.Star(expr);
	  },

	  plus: function(expr) {
	    if (!(expr instanceof pexprs.PExpr)) {
	      expr = this.fromRecipe(expr);
	    }
	    return new pexprs.Plus(expr);
	  },

	  opt: function(expr) {
	    if (!(expr instanceof pexprs.PExpr)) {
	      expr = this.fromRecipe(expr);
	    }
	    return new pexprs.Opt(expr);
	  },

	  not: function(expr) {
	    if (!(expr instanceof pexprs.PExpr)) {
	      expr = this.fromRecipe(expr);
	    }
	    return new pexprs.Not(expr);
	  },

	  la: function(expr) {
	    // TODO: temporary to still be able to read old recipes
	    return this.lookahead(expr);
	  },

	  lookahead: function(expr) {
	    if (!(expr instanceof pexprs.PExpr)) {
	      expr = this.fromRecipe(expr);
	    }
	    return new pexprs.Lookahead(expr);
	  },

	  lex: function(expr) {
	    if (!(expr instanceof pexprs.PExpr)) {
	      expr = this.fromRecipe(expr);
	    }
	    return new pexprs.Lex(expr);
	  },

	  app: function(ruleName, optParams) {
	    if (optParams && optParams.length > 0) {
	      optParams = optParams.map(function(param) {
	        return param instanceof pexprs.PExpr ? param :
	          this.fromRecipe(param);
	      }, this);
	    }
	    return new pexprs.Apply(ruleName, optParams);
	  },

	  fromRecipe: function(recipe) {
	    // the meta-info of 'grammar' is proccessed in Builder.grammar
	    var result = this[recipe[0]].apply(this,
	      recipe[0] === 'grammar' ? recipe.slice(1) : recipe.slice(2));

	    var metaInfo = recipe[1];
	    if (metaInfo) {
	      if (metaInfo.sourceInterval && this.currentDecl) {
	        result.withSource(
	          this.currentDecl.sourceInterval.apply(this.currentDecl, metaInfo.sourceInterval)
	        );
	      }
	    }
	    return result;
	  }
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = Builder;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var Grammar = __webpack_require__(5);
	var InputStream = __webpack_require__(37);
	var common = __webpack_require__(10);
	var errors = __webpack_require__(14);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Private Stuff
	// --------------------------------------------------------------------

	// Constructors

	function GrammarDecl(name) {
	  this.name = name;
	}

	// Helpers

	GrammarDecl.prototype.sourceInterval = function(startIdx, endIdx) {
	  return this.source.subInterval(startIdx, endIdx - startIdx);
	};

	GrammarDecl.prototype.ensureSuperGrammar = function() {
	  if (!this.superGrammar) {
	    this.withSuperGrammar(
	        // TODO: The conditional expression below is an ugly hack. It's kind of ok because
	        // I doubt anyone will ever try to declare a grammar called `BuiltInRules`. Still,
	        // we should try to find a better way to do this.
	        this.name === 'BuiltInRules' ?
	            Grammar.ProtoBuiltInRules :
	            Grammar.BuiltInRules);
	  }
	  return this.superGrammar;
	};

	GrammarDecl.prototype.installOverriddenOrExtendedRule = function(name, formals, body, source) {
	  var duplicateParameterNames = common.getDuplicates(formals);
	  if (duplicateParameterNames.length > 0) {
	    throw errors.duplicateParameterNames(name, duplicateParameterNames, source);
	  }
	  var ruleInfo = this.ensureSuperGrammar().rules[name];
	  var expectedFormals = ruleInfo.formals;
	  var expectedNumFormals = expectedFormals ? expectedFormals.length : 0;
	  if (formals.length !== expectedNumFormals) {
	    throw errors.wrongNumberOfParameters(name, expectedNumFormals, formals.length, source);
	  }
	  return this.install(name, formals, body, ruleInfo.description, source);
	};

	GrammarDecl.prototype.install = function(name, formals, body, description, source) {
	  this.rules[name] = {
	    body: body.introduceParams(formals),
	    formals: formals,
	    description: description,
	    source: source
	  };
	  return this;
	};

	// Stuff that you should only do once

	GrammarDecl.prototype.withSuperGrammar = function(superGrammar) {
	  if (this.superGrammar) {
	    throw new Error('the super grammar of a GrammarDecl cannot be set more than once');
	  }
	  this.superGrammar = superGrammar;
	  this.rules = Object.create(superGrammar.rules);

	  // Grammars with an explicit supergrammar inherit a default start rule.
	  if (!superGrammar.isBuiltIn()) {
	    this.defaultStartRule = superGrammar.defaultStartRule;
	  }
	  return this;
	};

	GrammarDecl.prototype.withDefaultStartRule = function(ruleName) {
	  this.defaultStartRule = ruleName;
	  return this;
	};

	GrammarDecl.prototype.withSource = function(source) {
	  this.source = new InputStream(source).interval(0, source.length);
	  return this;
	};

	// Creates a Grammar instance, and if it passes the sanity checks, returns it.
	GrammarDecl.prototype.build = function() {
	  var grammar = new Grammar(
	      this.name,
	      this.ensureSuperGrammar(),
	      this.rules,
	      this.defaultStartRule);

	  // TODO: change the pexpr.prototype.assert... methods to make them add
	  // exceptions to an array that's provided as an arg. Then we'll be able to
	  // show more than one error of the same type at a time.
	  // TODO: include the offending pexpr in the errors, that way we can show
	  // the part of the source that caused it.
	  var grammarErrors = [];
	  var grammarHasInvalidApplications = false;
	  Object.keys(grammar.rules).forEach(function(ruleName) {
	    var body = grammar.rules[ruleName].body;
	    try {
	      body.assertChoicesHaveUniformArity(ruleName);
	    } catch (e) {
	      grammarErrors.push(e);
	    }
	    try {
	      body.assertAllApplicationsAreValid(ruleName, grammar);
	    } catch (e) {
	      grammarErrors.push(e);
	      grammarHasInvalidApplications = true;
	    }
	  });
	  if (!grammarHasInvalidApplications) {
	    // The following check can only be done if the grammar has no invalid applications.
	    Object.keys(grammar.rules).forEach(function(ruleName) {
	      var body = grammar.rules[ruleName].body;
	      try {
	        body.assertIteratedExprsAreNotNullable(grammar, ruleName);
	      } catch (e) {
	        grammarErrors.push(e);
	      }
	    });
	  }
	  if (grammarErrors.length > 0) {
	    errors.throwErrors(grammarErrors);
	  }
	  if (this.source) {
	    grammar.source = this.source;
	  }

	  return grammar;
	};

	// Rule declarations

	GrammarDecl.prototype.define = function(name, formals, body, description, source) {
	  this.ensureSuperGrammar();
	  if (this.superGrammar.rules[name]) {
	    throw errors.duplicateRuleDeclaration(name, this.name, this.superGrammar.name, source);
	  } else if (this.rules[name]) {
	    throw errors.duplicateRuleDeclaration(name, this.name, this.name, source);
	  }
	  var duplicateParameterNames = common.getDuplicates(formals);
	  if (duplicateParameterNames.length > 0) {
	    throw errors.duplicateParameterNames(name, duplicateParameterNames, source);
	  }
	  return this.install(name, formals, body, description, source);
	};

	GrammarDecl.prototype.override = function(name, formals, body, descIgnored, source) {
	  var ruleInfo = this.ensureSuperGrammar().rules[name];
	  if (!ruleInfo) {
	    throw errors.cannotOverrideUndeclaredRule(name, this.superGrammar.name, source);
	  }
	  this.installOverriddenOrExtendedRule(name, formals, body, source);
	  return this;
	};

	GrammarDecl.prototype.extend = function(name, formals, fragment, descIgnored, source) {
	  var ruleInfo = this.ensureSuperGrammar().rules[name];
	  if (!ruleInfo) {
	    throw errors.cannotExtendUndeclaredRule(name, this.superGrammar.name, source);
	  }
	  var body = new pexprs.Extend(this.superGrammar, name, fragment);
	  body.source = fragment.source;
	  this.installOverriddenOrExtendedRule(name, formals, body, source);
	  return this;
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = GrammarDecl;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var CaseInsensitiveTerminal = __webpack_require__(6);
	var Matcher = __webpack_require__(35);
	var Semantics = __webpack_require__(40);
	var common = __webpack_require__(10);
	var errors = __webpack_require__(14);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function getSortedRuleValues(grammar) {
	  return Object.keys(grammar.rules).sort().map(function(name) { return grammar.rules[name]; });
	}

	function Grammar(
	    name,
	    superGrammar,
	    rules,
	    optDefaultStartRule) {
	  this.name = name;
	  this.superGrammar = superGrammar;
	  this.rules = rules;
	  if (optDefaultStartRule) {
	    if (!(optDefaultStartRule in rules)) {
	      throw new Error("Invalid start rule: '" + optDefaultStartRule +
	                      "' is not a rule in grammar '" + name + "'");
	    }
	    this.defaultStartRule = optDefaultStartRule;
	  }
	}

	var ohmGrammar;
	var buildGrammar;

	// This method is called from main.js once Ohm has loaded.
	Grammar.initApplicationParser = function(grammar, builderFn) {
	  ohmGrammar = grammar;
	  buildGrammar = builderFn;
	};

	Grammar.prototype = {
	  matcher: function() {
	    return new Matcher(this);
	  },

	  // Return true if the grammar is a built-in grammar, otherwise false.
	  // NOTE: This might give an unexpected result if called before BuiltInRules is defined!
	  isBuiltIn: function() {
	    return this === Grammar.ProtoBuiltInRules || this === Grammar.BuiltInRules;
	  },

	  equals: function(g) {
	    if (this === g) {
	      return true;
	    }
	    // Do the cheapest comparisons first.
	    if (g == null ||
	        this.name !== g.name ||
	        this.defaultStartRule !== g.defaultStartRule ||
	        !(this.superGrammar === g.superGrammar || this.superGrammar.equals(g.superGrammar))) {
	      return false;
	    }
	    var myRules = getSortedRuleValues(this);
	    var otherRules = getSortedRuleValues(g);
	    return myRules.length === otherRules.length && myRules.every(function(rule, i) {
	      return rule.description === otherRules[i].description &&
	             rule.formals.join(',') === otherRules[i].formals.join(',') &&
	             rule.body.toString() === otherRules[i].body.toString();
	    });
	  },

	  match: function(input, optStartApplication) {
	    var m = this.matcher();
	    m.replaceInputRange(0, 0, input);
	    return m.match(optStartApplication);
	  },

	  trace: function(input, optStartApplication) {
	    var m = this.matcher();
	    m.replaceInputRange(0, 0, input);
	    return m.trace(optStartApplication);
	  },

	  semantics: function() {
	    // TODO: Remove this eventually! Deprecated in v0.12.
	    throw new Error('semantics() is deprecated -- use createSemantics() instead.');
	  },

	  createSemantics: function() {
	    return Semantics.createSemantics(this);
	  },

	  extendSemantics: function(superSemantics) {
	    return Semantics.createSemantics(this, superSemantics._getSemantics());
	  },

	  // Check that every key in `actionDict` corresponds to a semantic action, and that it maps to
	  // a function of the correct arity. If not, throw an exception.
	  _checkTopDownActionDict: function(what, name, actionDict) {
	    function isSpecialAction(a) {
	      return a === '_iter' || a === '_terminal' || a === '_nonterminal' || a === '_default';
	    }

	    var problems = [];
	    for (var k in actionDict) {
	      var v = actionDict[k];
	      if (!isSpecialAction(k) && !(k in this.rules)) {
	        problems.push("'" + k + "' is not a valid semantic action for '" + this.name + "'");
	      } else if (typeof v !== 'function') {
	        problems.push(
	            "'" + k + "' must be a function in an action dictionary for '" + this.name + "'");
	      } else {
	        var actual = v.length;
	        var expected = this._topDownActionArity(k);
	        if (actual !== expected) {
	          problems.push(
	              "Semantic action '" + k + "' has the wrong arity: " +
	              'expected ' + expected + ', got ' + actual);
	        }
	      }
	    }
	    if (problems.length > 0) {
	      var prettyProblems = problems.map(function(problem) { return '- ' + problem; });
	      var error = new Error(
	          "Found errors in the action dictionary of the '" + name + "' " + what + ':\n' +
	          prettyProblems.join('\n'));
	      error.problems = problems;
	      throw error;
	    }
	  },

	  // Return the expected arity for a semantic action named `actionName`, which
	  // is either a rule name or a special action name like '_nonterminal'.
	  _topDownActionArity: function(actionName) {
	    if (actionName === '_iter' || actionName === '_nonterminal' || actionName === '_default') {
	      return 1;
	    } else if (actionName === '_terminal') {
	      return 0;
	    }
	    return this.rules[actionName].body.getArity();
	  },

	  _inheritsFrom: function(grammar) {
	    var g = this.superGrammar;
	    while (g) {
	      if (g.equals(grammar, true)) {
	        return true;
	      }
	      g = g.superGrammar;
	    }
	    return false;
	  },

	  toRecipe: function(optVarName) {
	    var metaInfo = {};
	    // Include the grammar source if it is available.
	    if (this.source) {
	      metaInfo.source = this.source.contents;
	    }

	    var superGrammar = null;
	    if (this.superGrammar && !this.superGrammar.isBuiltIn()) {
	      superGrammar = JSON.parse(this.superGrammar.toRecipe());
	    }

	    var startRule = null;
	    if (this.defaultStartRule) {
	      startRule = this.defaultStartRule;
	    }

	    var rules = {};
	    var self = this;
	    Object.keys(this.rules).forEach(function(ruleName) {
	      var ruleInfo = self.rules[ruleName];
	      var body = ruleInfo.body;
	      var isDefinition = !self.superGrammar || !self.superGrammar.rules[ruleName];

	      var operation;
	      if (isDefinition) {
	        operation = 'define';
	      } else {
	        operation = body instanceof pexprs.Extend ? 'extend' : 'override';
	      }

	      var metaInfo = {};
	      if (ruleInfo.source && self.source) {
	        var adjusted = ruleInfo.source.relativeTo(self.source);
	        metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
	      }

	      var description = isDefinition ? ruleInfo.description : null;
	      var bodyRecipe = body.outputRecipe(ruleInfo.formals, self.source);

	      rules[ruleName] = [
	        operation, // "define"/"extend"/"override"
	        metaInfo,
	        description,
	        ruleInfo.formals,
	        bodyRecipe
	      ];
	    });

	    return JSON.stringify([
	      'grammar',
	      metaInfo,
	      this.name,
	      superGrammar,
	      startRule,
	      rules
	    ]);
	  },

	  // TODO: Come up with better names for these methods.
	  // TODO: Write the analog of these methods for inherited attributes.
	  toOperationActionDictionaryTemplate: function() {
	    return this._toOperationOrAttributeActionDictionaryTemplate();
	  },
	  toAttributeActionDictionaryTemplate: function() {
	    return this._toOperationOrAttributeActionDictionaryTemplate();
	  },

	  _toOperationOrAttributeActionDictionaryTemplate: function() {
	    // TODO: add the super-grammar's templates at the right place, e.g., a case for AddExpr_plus
	    // should appear next to other cases of AddExpr.

	    var sb = new common.StringBuffer();
	    sb.append('{');

	    var first = true;
	    for (var ruleName in this.rules) {
	      var body = this.rules[ruleName].body;
	      if (first) {
	        first = false;
	      } else {
	        sb.append(',');
	      }
	      sb.append('\n');
	      sb.append('  ');
	      this.addSemanticActionTemplate(ruleName, body, sb);
	    }

	    sb.append('\n}');
	    return sb.contents();
	  },

	  addSemanticActionTemplate: function(ruleName, body, sb) {
	    sb.append(ruleName);
	    sb.append(': function(');
	    var arity = this._topDownActionArity(ruleName);
	    sb.append(common.repeat('_', arity).join(', '));
	    sb.append(') {\n');
	    sb.append('  }');
	  },

	  // Parse a string which expresses a rule application in this grammar, and return the
	  // resulting Apply node.
	  parseApplication: function(str) {
	    var app;
	    if (str.indexOf('<') === -1) {
	      // simple application
	      app = new pexprs.Apply(str);
	    } else {
	      // parameterized application
	      var cst = ohmGrammar.match(str, 'Base_application');
	      app = buildGrammar(cst, {});
	    }

	    // Ensure that the application is valid.
	    if (!(app.ruleName in this.rules)) {
	      throw errors.undeclaredRule(app.ruleName, this.name);
	    }
	    var formals = this.rules[app.ruleName].formals;
	    if (formals.length !== app.args.length) {
	      var source = this.rules[app.ruleName].source;
	      throw errors.wrongNumberOfParameters(app.ruleName, formals.length, app.args.length, source);
	    }
	    return app;
	  }
	};

	// The following grammar contains a few rules that couldn't be written  in "userland".
	// At the bottom of src/main.js, we create a sub-grammar of this grammar that's called
	// `BuiltInRules`. That grammar contains several convenience rules, e.g., `letter` and
	// `digit`, and is implicitly the super-grammar of any grammar whose super-grammar
	// isn't specified.
	Grammar.ProtoBuiltInRules = new Grammar(
	  'ProtoBuiltInRules',  // name
	  undefined,  // supergrammar
	  {
	    any: {
	      body: pexprs.any,
	      formals: [],
	      description: 'any character',
	      primitive: true
	    },
	    end: {
	      body: pexprs.end,
	      formals: [],
	      description: 'end of input',
	      primitive: true
	    },

	    caseInsensitive: {
	      body: new CaseInsensitiveTerminal(new pexprs.Param(0)),
	      formals: ['str'],
	      primitive: true
	    },
	    lower: {
	      body: new pexprs.UnicodeChar('Ll'),
	      formals: [],
	      description: 'a lowercase letter',
	      primitive: true
	    },
	    upper: {
	      body: new pexprs.UnicodeChar('Lu'),
	      formals: [],
	      description: 'an uppercase letter',
	      primitive: true
	    },
	    // The union of Lt (titlecase), Lm (modifier), and Lo (other), i.e. any letter not in Ll or Lu.
	    unicodeLtmo: {
	      body: new pexprs.UnicodeChar('Ltmo'),
	      formals: [],
	      description: 'a Unicode character in Lt, Lm, or Lo',
	      primitive: true
	    },

	    // These rules are not truly primitive (they could be written in userland) but are defined
	    // here for bootstrapping purposes.
	    spaces: {
	      body: new pexprs.Star(new pexprs.Apply('space')),
	      formals: []
	    },
	    space: {
	      body: new pexprs.Range('\x00', ' '),
	      formals: [],
	      description: 'a space'
	    }
	  }
	);

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = Grammar;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var Failure = __webpack_require__(7);
	var TerminalNode = __webpack_require__(8).TerminalNode;
	var assert = __webpack_require__(10).assert;
	var inherits = __webpack_require__(9);
	var pexprs = __webpack_require__(12);

	function CaseInsensitiveTerminal(param) {
	  this.obj = param;
	}
	inherits(CaseInsensitiveTerminal, pexprs.PExpr);

	CaseInsensitiveTerminal.prototype = {
	  _getString: function(state) {
	    var terminal = state.currentApplication().args[this.obj.index];
	    assert(terminal instanceof pexprs.Terminal, 'expected a Terminal expression');
	    return terminal.obj;
	  },

	  // Implementation of the PExpr API

	  allowsSkippingPrecedingSpace: function() {
	    return true;
	  },

	  eval: function(state) {
	    var inputStream = state.inputStream;
	    var origPos = inputStream.pos;
	    var matchStr = this._getString(state);
	    if (!inputStream.matchString(matchStr, true)) {
	      state.processFailure(origPos, this);
	      return false;
	    } else {
	      state.pushBinding(new TerminalNode(state.grammar, matchStr), origPos);
	      return true;
	    }
	  },

	  generateExample: function(grammar, examples, inSyntacticContext, actuals) {
	    // Start with a example generated from the Terminal...
	    var str = this.obj.generateExample(grammar, examples, inSyntacticContext, actuals).value;

	    // ...and randomly switch characters to uppercase/lowercase.
	    var value = '';
	    for (var i = 0; i < str.length; ++i) {
	      value += Math.random() < 0.5 ? str[i].toLocaleLowerCase() : str[i].toLocaleUpperCase();
	    }
	    return {value: value};
	  },

	  getArity: function() {
	    return 1;
	  },

	  substituteParams: function(actuals) {
	    return new CaseInsensitiveTerminal(this.obj.substituteParams(actuals));
	  },

	  toDisplayString: function() {
	    return this.obj.toDisplayString() + ' (case-insensitive)';
	  },

	  toFailure: function() {
	    return new Failure(this, this.obj.toFailure() + ' (case-insensitive)', 'description');
	  },

	  _isNullable: function(grammar, memo) {
	    return this.obj._isNullable(grammar, memo);
	  }
	};

	module.exports = CaseInsensitiveTerminal;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	/*
	  `Failure`s represent expressions that weren't matched while parsing. They are used to generate
	  error messages automatically. The interface of `Failure`s includes the collowing methods:

	  - getText() : String
	  - getType() : String  (one of {"description", "string", "code"})
	  - isDescription() : bool
	  - isStringTerminal() : bool
	  - isCode() : bool
	  - isFluffy() : bool
	  - makeFluffy() : void
	  - subsumes(Failure) : bool
	*/

	function isValidType(type) {
	  return type === 'description' || type === 'string' || type === 'code';
	}

	function Failure(pexpr, text, type) {
	  if (!isValidType(type)) {
	    throw new Error('invalid Failure type: ' + type);
	  }
	  this.pexpr = pexpr;
	  this.text = text;
	  this.type = type;
	  this.fluffy = false;
	}

	Failure.prototype.getPExpr = function() {
	  return this.pexpr;
	};

	Failure.prototype.getText = function() {
	  return this.text;
	};

	Failure.prototype.getType = function() {
	  return this.type;
	};

	Failure.prototype.isDescription = function() {
	  return this.type === 'description';
	};

	Failure.prototype.isStringTerminal = function() {
	  return this.type === 'string';
	};

	Failure.prototype.isCode = function() {
	  return this.type === 'code';
	};

	Failure.prototype.isFluffy = function() {
	  return this.fluffy;
	};

	Failure.prototype.makeFluffy = function() {
	  this.fluffy = true;
	};

	Failure.prototype.clearFluffy = function() {
	  this.fluffy = false;
	};

	Failure.prototype.subsumes = function(that) {
	  return this.getText() === that.getText() &&
	      this.type === that.type &&
	      (!this.isFluffy() || this.isFluffy() && that.isFluffy());
	};

	Failure.prototype.toString = function() {
	  return this.type === 'string' ?
	    JSON.stringify(this.getText()) :
	    this.getText();
	};

	Failure.prototype.clone = function() {
	  var failure = new Failure(this.pexpr, this.text, this.type);
	  if (this.isFluffy()) {
	    failure.makeFluffy();
	  }
	  return failure;
	};

	Failure.prototype.toKey = function() {
	  return this.toString() + '#' + this.type;
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = Failure;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(9);

	var common = __webpack_require__(10);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function Node(grammar, ctorName, matchLength) {
	  this.grammar = grammar;
	  this.ctorName = ctorName;
	  this.matchLength = matchLength;
	}

	Node.prototype.numChildren = function() {
	  return this.children ? this.children.length : 0;
	};

	Node.prototype.childAt = function(idx) {
	  if (this.children) {
	    return this.children[idx];
	  }
	};

	Node.prototype.indexOfChild = function(arg) {
	  return this.children.indexOf(arg);
	};

	Node.prototype.hasChildren = function() {
	  return this.numChildren() > 1;
	};

	Node.prototype.hasNoChildren = function() {
	  return !this.hasChildren();
	};

	Node.prototype.onlyChild = function() {
	  if (this.numChildren() !== 1) {
	    throw new Error(
	        'cannot get only child of a node of type ' + this.ctorName +
	        ' (it has ' + this.numChildren() + ' children)');
	  } else {
	    return this.firstChild();
	  }
	};

	Node.prototype.firstChild = function() {
	  if (this.hasNoChildren()) {
	    throw new Error(
	        'cannot get first child of a ' + this.ctorName + ' node, which has no children');
	  } else {
	    return this.childAt(0);
	  }
	};

	Node.prototype.lastChild = function() {
	  if (this.hasNoChildren()) {
	    throw new Error(
	        'cannot get last child of a ' + this.ctorName + ' node, which has no children');
	  } else {
	    return this.childAt(this.numChildren() - 1);
	  }
	};

	Node.prototype.childBefore = function(child) {
	  var childIdx = this.indexOfChild(child);
	  if (childIdx < 0) {
	    throw new Error('Node.childBefore() called w/ an argument that is not a child');
	  } else if (childIdx === 0) {
	    throw new Error('cannot get child before first child');
	  } else {
	    return this.childAt(childIdx - 1);
	  }
	};

	Node.prototype.childAfter = function(child) {
	  var childIdx = this.indexOfChild(child);
	  if (childIdx < 0) {
	    throw new Error('Node.childAfter() called w/ an argument that is not a child');
	  } else if (childIdx === this.numChildren() - 1) {
	    throw new Error('cannot get child after last child');
	  } else {
	    return this.childAt(childIdx + 1);
	  }
	};

	Node.prototype.isTerminal = function() {
	  return false;
	};

	Node.prototype.isNonterminal = function() {
	  return false;
	};

	Node.prototype.isIteration = function() {
	  return false;
	};

	Node.prototype.isOptional = function() {
	  return false;
	};

	Node.prototype.toJSON = function() {
	  var r = {};
	  r[this.ctorName] = this.children;
	  return r;
	};

	// Terminals

	function TerminalNode(grammar, value) {
	  var matchLength = value ? value.length : 0;
	  Node.call(this, grammar, '_terminal', matchLength);
	  this.primitiveValue = value;
	}
	inherits(TerminalNode, Node);

	TerminalNode.prototype.isTerminal = function() {
	  return true;
	};

	TerminalNode.prototype.toJSON = function() {
	  var r = {};
	  r[this.ctorName] = this.primitiveValue;
	  return r;
	};

	// Nonterminals

	function NonterminalNode(grammar, ruleName, children, childOffsets, matchLength) {
	  Node.call(this, grammar, ruleName, matchLength);
	  this.children = children;
	  this.childOffsets = childOffsets;
	}
	inherits(NonterminalNode, Node);

	NonterminalNode.prototype.isNonterminal = function() {
	  return true;
	};

	NonterminalNode.prototype.isLexical = function() {
	  return common.isLexical(this.ctorName);
	};

	NonterminalNode.prototype.isSyntactic = function() {
	  return common.isSyntactic(this.ctorName);
	};

	// Iterations

	function IterationNode(grammar, children, childOffsets, matchLength, isOptional) {
	  Node.call(this, grammar, '_iter', matchLength);
	  this.children = children;
	  this.childOffsets = childOffsets;
	  this.optional = isOptional;
	}
	inherits(IterationNode, Node);

	IterationNode.prototype.isIteration = function() {
	  return true;
	};

	IterationNode.prototype.isOptional = function() {
	  return this.optional;
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = {
	  Node: Node,
	  TerminalNode: TerminalNode,
	  NonterminalNode: NonterminalNode,
	  IterationNode: IterationNode
	};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor
	      ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	          value: ctor,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        }
	      })
	    }
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor
	      var TempCtor = function () {}
	      TempCtor.prototype = superCtor.prototype
	      ctor.prototype = new TempCtor()
	      ctor.prototype.constructor = ctor
	    }
	  }
	}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var extend = __webpack_require__(11);

	// --------------------------------------------------------------------
	// Private Stuff
	// --------------------------------------------------------------------

	// Helpers

	var escapeStringFor = {};
	for (var c = 0; c < 128; c++) {
	  escapeStringFor[c] = String.fromCharCode(c);
	}
	escapeStringFor["'".charCodeAt(0)] = "\\'";
	escapeStringFor['"'.charCodeAt(0)] = '\\"';
	escapeStringFor['\\'.charCodeAt(0)] = '\\\\';
	escapeStringFor['\b'.charCodeAt(0)] = '\\b';
	escapeStringFor['\f'.charCodeAt(0)] = '\\f';
	escapeStringFor['\n'.charCodeAt(0)] = '\\n';
	escapeStringFor['\r'.charCodeAt(0)] = '\\r';
	escapeStringFor['\t'.charCodeAt(0)] = '\\t';
	escapeStringFor['\u000b'.charCodeAt(0)] = '\\v';

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	exports.abstract = function(optMethodName) {
	  var methodName = optMethodName || '';
	  return function() {
	    throw new Error(
	      'this method ' + methodName + ' is abstract! ' +
	      '(it has no implementation in class ' + this.constructor.name + ')');
	  };
	};

	exports.assert = function(cond, message) {
	  if (!cond) {
	    throw new Error(message);
	  }
	};

	// Define a lazily-computed, non-enumerable property named `propName`
	// on the object `obj`. `getterFn` will be called to compute the value the
	// first time the property is accessed.
	exports.defineLazyProperty = function(obj, propName, getterFn) {
	  var memo;
	  Object.defineProperty(obj, propName, {
	    get: function() {
	      if (!memo) {
	        memo = getterFn.call(this);
	      }
	      return memo;
	    }
	  });
	};

	exports.clone = function(obj) {
	  if (obj) {
	    return extend({}, obj);
	  }
	  return obj;
	};

	exports.extend = extend;

	exports.repeatFn = function(fn, n) {
	  var arr = [];
	  while (n-- > 0) {
	    arr.push(fn());
	  }
	  return arr;
	};

	exports.repeatStr = function(str, n) {
	  return new Array(n + 1).join(str);
	};

	exports.repeat = function(x, n) {
	  return exports.repeatFn(function() { return x; }, n);
	};

	exports.getDuplicates = function(array) {
	  var duplicates = [];
	  for (var idx = 0; idx < array.length; idx++) {
	    var x = array[idx];
	    if (array.lastIndexOf(x) !== idx && duplicates.indexOf(x) < 0) {
	      duplicates.push(x);
	    }
	  }
	  return duplicates;
	};

	exports.copyWithoutDuplicates = function(array) {
	  var noDuplicates = [];
	  array.forEach(function(entry) {
	    if (noDuplicates.indexOf(entry) < 0) {
	      noDuplicates.push(entry);
	    }
	  });
	  return noDuplicates;
	};

	exports.isSyntactic = function(ruleName) {
	  var firstChar = ruleName[0];
	  return firstChar === firstChar.toUpperCase();
	};

	exports.isLexical = function(ruleName) {
	  return !exports.isSyntactic(ruleName);
	};

	exports.padLeft = function(str, len, optChar) {
	  var ch = optChar || ' ';
	  if (str.length < len) {
	    return exports.repeatStr(ch, len - str.length) + str;
	  }
	  return str;
	};

	// StringBuffer

	exports.StringBuffer = function() {
	  this.strings = [];
	};

	exports.StringBuffer.prototype.append = function(str) {
	  this.strings.push(str);
	};

	exports.StringBuffer.prototype.contents = function() {
	  return this.strings.join('');
	};

	// Character escaping and unescaping

	exports.escapeChar = function(c, optDelim) {
	  var charCode = c.charCodeAt(0);
	  if ((c === '"' || c === "'") && optDelim && c !== optDelim) {
	    return c;
	  } else if (charCode < 128) {
	    return escapeStringFor[charCode];
	  } else if (128 <= charCode && charCode < 256) {
	    return '\\x' + exports.padLeft(charCode.toString(16), 2, '0');
	  } else {
	    return '\\u' + exports.padLeft(charCode.toString(16), 4, '0');
	  }
	};

	exports.unescapeChar = function(s) {
	  if (s.charAt(0) === '\\') {
	    switch (s.charAt(1)) {
	      case 'b': return '\b';
	      case 'f': return '\f';
	      case 'n': return '\n';
	      case 'r': return '\r';
	      case 't': return '\t';
	      case 'v': return '\v';
	      case 'x': return String.fromCharCode(parseInt(s.substring(2, 4), 16));
	      case 'u': return String.fromCharCode(parseInt(s.substring(2, 6), 16));
	      default: return s.charAt(1);
	    }
	  } else {
	    return s;
	  }
	};

	// Helper for producing a description of an unknown object in a safe way.
	// Especially useful for error messages where an unexpected type of object was encountered.
	exports.unexpectedObjToString = function(obj) {
	  if (obj == null) {
	    return String(obj);
	  }
	  var baseToString = Object.prototype.toString.call(obj);
	  try {
	    var typeName;
	    if (obj.constructor && obj.constructor.name) {
	      typeName = obj.constructor.name;
	    } else if (baseToString.indexOf('[object ') === 0) {
	      typeName = baseToString.slice(8, -1);  // Extract e.g. "Array" from "[object Array]".
	    } else {
	      typeName = typeof obj;
	    }
	    return typeName + ': ' + JSON.stringify(String(obj));
	  } catch (e) {
	    return baseToString;
	  }
	};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = extend;
	function extend(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || typeof add !== 'object') return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var UnicodeCategories = __webpack_require__(13);
	var common = __webpack_require__(10);
	var errors = __webpack_require__(14);
	var inherits = __webpack_require__(9);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	// General stuff

	function PExpr() {
	  throw new Error("PExpr cannot be instantiated -- it's abstract");
	}

	// Set the `source` property to the interval containing the source for this expression.
	PExpr.prototype.withSource = function(interval) {
	  if (interval) {
	    this.source = interval.trimmed();
	  }
	  return this;
	};

	// Any

	var any = Object.create(PExpr.prototype);

	// End

	var end = Object.create(PExpr.prototype);

	// Terminals

	function Terminal(obj) {
	  this.obj = obj;
	}
	inherits(Terminal, PExpr);

	// Ranges

	function Range(from, to) {
	  this.from = from;
	  this.to = to;
	}
	inherits(Range, PExpr);

	// Parameters

	function Param(index) {
	  this.index = index;
	}
	inherits(Param, PExpr);

	// Alternation

	function Alt(terms) {
	  this.terms = terms;
	}
	inherits(Alt, PExpr);

	// Extend is an implementation detail of rule extension

	function Extend(superGrammar, name, body) {
	  this.superGrammar = superGrammar;
	  this.name = name;
	  this.body = body;
	  var origBody = superGrammar.rules[name].body;
	  this.terms = [body, origBody];
	}
	inherits(Extend, Alt);

	// Sequences

	function Seq(factors) {
	  this.factors = factors;
	}
	inherits(Seq, PExpr);

	// Iterators and optionals

	function Iter(expr) {
	  this.expr = expr;
	}
	inherits(Iter, PExpr);

	function Star(expr) {
	  this.expr = expr;
	}
	inherits(Star, Iter);

	function Plus(expr) {
	  this.expr = expr;
	}
	inherits(Plus, Iter);

	function Opt(expr) {
	  this.expr = expr;
	}
	inherits(Opt, Iter);

	Star.prototype.operator = '*';
	Plus.prototype.operator = '+';
	Opt.prototype.operator = '?';

	Star.prototype.minNumMatches = 0;
	Plus.prototype.minNumMatches = 1;
	Opt.prototype.minNumMatches = 0;

	Star.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
	Plus.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
	Opt.prototype.maxNumMatches = 1;

	// Predicates

	function Not(expr) {
	  this.expr = expr;
	}
	inherits(Not, PExpr);

	function Lookahead(expr) {
	  this.expr = expr;
	}
	inherits(Lookahead, PExpr);

	// "Lexification"

	function Lex(expr) {
	  this.expr = expr;
	}
	inherits(Lex, PExpr);

	// Array decomposition

	function Arr(expr) {
	  this.expr = expr;
	}
	inherits(Arr, PExpr);

	// String decomposition

	function Str(expr) {
	  this.expr = expr;
	}
	inherits(Str, PExpr);

	// Object decomposition

	function Obj(properties, isLenient) {
	  var names = properties.map(function(property) { return property.name; });
	  var duplicates = common.getDuplicates(names);
	  if (duplicates.length > 0) {
	    throw errors.duplicatePropertyNames(duplicates);
	  } else {
	    this.properties = properties;
	    this.isLenient = isLenient;
	  }
	}
	inherits(Obj, PExpr);

	// Rule application

	function Apply(ruleName, optArgs) {
	  this.ruleName = ruleName;
	  this.args = optArgs || [];
	}
	inherits(Apply, PExpr);

	Apply.prototype.isSyntactic = function() {
	  return common.isSyntactic(this.ruleName);
	};

	// This method just caches the result of `this.toString()` in a non-enumerable property.
	Apply.prototype.toMemoKey = function() {
	  if (!this._memoKey) {
	    Object.defineProperty(this, '_memoKey', {value: this.toString()});
	  }
	  return this._memoKey;
	};

	// Unicode character

	function UnicodeChar(category) {
	  this.category = category;
	  this.pattern = UnicodeCategories[category];
	}
	inherits(UnicodeChar, PExpr);

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	exports.PExpr = PExpr;
	exports.any = any;
	exports.end = end;
	exports.Terminal = Terminal;
	exports.Range = Range;
	exports.Param = Param;
	exports.Alt = Alt;
	exports.Extend = Extend;
	exports.Seq = Seq;
	exports.Iter = Iter;
	exports.Star = Star;
	exports.Plus = Plus;
	exports.Opt = Opt;
	exports.Not = Not;
	exports.Lookahead = Lookahead;
	exports.Lex = Lex;
	exports.Arr = Arr;
	exports.Str = Str;
	exports.Obj = Obj;
	exports.Apply = Apply;
	exports.UnicodeChar = UnicodeChar;

	// --------------------------------------------------------------------
	// Extensions
	// --------------------------------------------------------------------

	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);
	__webpack_require__(34);


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	// Based on https://github.com/mathiasbynens/unicode-9.0.0.
	// These are just categories that are used in ES5/ES2015.
	// The full list of Unicode categories is here: http://www.fileformat.info/info/unicode/category/index.htm.
	module.exports = {
	  // Letters
	  Lu: /[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]/,
	  Ll: /[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]/,
	  Lt: /[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]/,
	  Lm: /[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]/,
	  Lo: /[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,

	  // Numbers
	  Nl: /[\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF]|\uD800[\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]|\uD809[\uDC00-\uDC6E]/,
	  Nd: /[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD801[\uDCA0-\uDCA9]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|[\uD805\uD807][\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDD50-\uDD59]/,

	  // Marks
	  Mn: /[\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDCA-\uDDCC\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]/,
	  Mc: /[\u0903-\u0903]|[\u093E-\u0940]|[\u0949-\u094C]|[\u0982-\u0983]|[\u09BE-\u09C0]|[\u09C7-\u09C8]|[\u09CB-\u09CC]|[\u09D7-\u09D7]|[\u0A3E-\u0A40]|[\u0A83-\u0A83]|[\u0ABE-\u0AC0]|[\u0AC9-\u0AC9]|[\u0ACB-\u0ACC]|[\u0B02-\u0B03]|[\u0B3E-\u0B3E]|[\u0B40-\u0B40]|[\u0B47-\u0B48]|[\u0B4B-\u0B4C]|[\u0B57-\u0B57]|[\u0B83-\u0B83]|[\u0BBE-\u0BBF]|[\u0BC1-\u0BC2]|[\u0BC6-\u0BC8]|[\u0BCA-\u0BCC]|[\u0BD7-\u0BD7]|[\u0C01-\u0C03]|[\u0C41-\u0C44]|[\u0C82-\u0C83]|[\u0CBE-\u0CBE]|[\u0CC0-\u0CC4]|[\u0CC7-\u0CC8]|[\u0CCA-\u0CCB]|[\u0CD5-\u0CD6]|[\u0D02-\u0D03]|[\u0D3E-\u0D40]|[\u0D46-\u0D48]|[\u0D4A-\u0D4C]|[\u0D57-\u0D57]|[\u0F3E-\u0F3F]|[\u0F7F-\u0F7F]/,

	  // Punctuation, Connector
	  Pc: /[_\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F]/,

	  // Separator, Space
	  Zs: /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,

	  // These two are not real Unicode categories, but our useful for Ohm.
	  // L is a combination of all the letter categories.
	  // Ltmo is a combination of Lt, Lm, and Lo.
	  L: /[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
	  Ltmo: /[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]|[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]|[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var Namespace = __webpack_require__(15);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function createError(message, optInterval) {
	  var e;
	  if (optInterval) {
	    e = new Error(optInterval.getLineAndColumnMessage() + message);
	    e.shortMessage = message;
	    e.interval = optInterval;
	  } else {
	    e = new Error(message);
	  }
	  return e;
	}

	// ----------------- errors about intervals -----------------

	function intervalSourcesDontMatch() {
	  return createError("Interval sources don't match");
	}

	// ----------------- errors about grammars -----------------

	// Grammar syntax error

	function grammarSyntaxError(matchFailure) {
	  var e = new Error();
	  Object.defineProperty(e, 'message', {get: function() { return matchFailure.message; }});
	  Object.defineProperty(e, 'shortMessage', {get: function() {
	    return 'Expected ' + matchFailure.getExpectedText();
	  }});
	  e.interval = matchFailure.getInterval();
	  return e;
	}

	// Undeclared grammar

	function undeclaredGrammar(grammarName, namespace, interval) {
	  var message = namespace ?
	      'Grammar ' + grammarName + ' is not declared in namespace ' + Namespace.toString(namespace) :
	      'Undeclared grammar ' + grammarName;
	  return createError(message, interval);
	}

	// Duplicate grammar declaration

	function duplicateGrammarDeclaration(grammar, namespace) {
	  return createError('Grammar ' + grammar.name + ' is already declared in this namespace');
	}

	// ----------------- rules -----------------

	// Undeclared rule

	function undeclaredRule(ruleName, grammarName, optInterval) {
	  return createError(
	      'Rule ' + ruleName + ' is not declared in grammar ' + grammarName,
	      optInterval);
	}

	// Cannot override undeclared rule

	function cannotOverrideUndeclaredRule(ruleName, grammarName, optSource) {
	  return createError(
	      'Cannot override rule ' + ruleName + ' because it is not declared in ' + grammarName,
	      optSource);
	}

	// Cannot extend undeclared rule

	function cannotExtendUndeclaredRule(ruleName, grammarName, optSource) {
	  return createError(
	      'Cannot extend rule ' + ruleName + ' because it is not declared in ' + grammarName,
	      optSource);
	}

	// Duplicate rule declaration

	function duplicateRuleDeclaration(ruleName, grammarName, declGrammarName, optSource) {
	  var message = "Duplicate declaration for rule '" + ruleName +
	      "' in grammar '" + grammarName + "'";
	  if (grammarName !== declGrammarName) {
	    message += " (originally declared in '" + declGrammarName + "')";
	  }
	  return createError(message, optSource);
	}

	// Wrong number of parameters

	function wrongNumberOfParameters(ruleName, expected, actual, source) {
	  return createError(
	      'Wrong number of parameters for rule ' + ruleName +
	          ' (expected ' + expected + ', got ' + actual + ')',
	      source);
	}

	// Wrong number of arguments

	function wrongNumberOfArguments(ruleName, expected, actual, expr) {
	  return createError(
	      'Wrong number of arguments for rule ' + ruleName +
	          ' (expected ' + expected + ', got ' + actual + ')',
	      expr.source);
	}

	// Duplicate parameter names

	function duplicateParameterNames(ruleName, duplicates, source) {
	  return createError(
	      'Duplicate parameter names in rule ' + ruleName + ': ' + duplicates.join(', '),
	      source);
	}

	// Invalid parameter expression

	function invalidParameter(ruleName, expr) {
	  return createError(
	      'Invalid parameter to rule ' + ruleName + ': ' + expr + ' has arity ' + expr.getArity() +
	         ', but parameter expressions must have arity 1',
	      expr.source);
	}

	// Application of syntactic rule from lexical rule

	function applicationOfSyntacticRuleFromLexicalContext(ruleName, applyExpr) {
	  return createError(
	      'Cannot apply syntactic rule ' + ruleName + ' from here (inside a lexical context)',
	      applyExpr.source);
	}

	// ----------------- Kleene operators -----------------

	function kleeneExprHasNullableOperand(kleeneExpr) {
	  return createError(
	      'Nullable expression ' + kleeneExpr.expr.source.contents + " is not allowed inside '" +
	          kleeneExpr.operator + "' (possible infinite loop)",
	      kleeneExpr.expr.source);
	}

	// ----------------- arity -----------------

	function inconsistentArity(ruleName, expected, actual, expr) {
	  return createError(
	      'Rule ' + ruleName + ' involves an alternation which has inconsistent arity ' +
	          '(expected ' + expected + ', got ' + actual + ')',
	      expr.source);
	}

	// ----------------- properties -----------------

	function duplicatePropertyNames(duplicates) {
	  return createError('Object pattern has duplicate property names: ' + duplicates.join(', '));
	}

	// ----------------- constructors -----------------

	function invalidConstructorCall(grammar, ctorName, children) {
	  return createError(
	      'Attempt to invoke constructor ' + ctorName + ' with invalid or unexpected arguments');
	}

	// ----------------- convenience -----------------

	function multipleErrors(errors) {
	  var messages = errors.map(function(e) { return e.message; });
	  return createError(
	      ['Errors:'].concat(messages).join('\n- '),
	      errors[0].interval);
	}

	// ----------------- semantic -----------------

	function missingSemanticAction(ctorName, name, type) {
	  var e = createError(
	      'Missing semantic action for ' + ctorName + ' in ' + name + ' ' + type);
	  e.name = 'missingSemanticAction';
	  return e;
	}

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = {
	  applicationOfSyntacticRuleFromLexicalContext: applicationOfSyntacticRuleFromLexicalContext,
	  cannotExtendUndeclaredRule: cannotExtendUndeclaredRule,
	  cannotOverrideUndeclaredRule: cannotOverrideUndeclaredRule,
	  duplicateGrammarDeclaration: duplicateGrammarDeclaration,
	  duplicateParameterNames: duplicateParameterNames,
	  duplicatePropertyNames: duplicatePropertyNames,
	  duplicateRuleDeclaration: duplicateRuleDeclaration,
	  inconsistentArity: inconsistentArity,
	  intervalSourcesDontMatch: intervalSourcesDontMatch,
	  invalidConstructorCall: invalidConstructorCall,
	  invalidParameter: invalidParameter,
	  grammarSyntaxError: grammarSyntaxError,
	  kleeneExprHasNullableOperand: kleeneExprHasNullableOperand,
	  missingSemanticAction: missingSemanticAction,
	  undeclaredGrammar: undeclaredGrammar,
	  undeclaredRule: undeclaredRule,
	  wrongNumberOfArguments: wrongNumberOfArguments,
	  wrongNumberOfParameters: wrongNumberOfParameters,

	  throwErrors: function(errors) {
	    if (errors.length === 1) {
	      throw errors[0];
	    }
	    if (errors.length > 1) {
	      throw multipleErrors(errors);
	    }
	  }
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var extend = __webpack_require__(11);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function Namespace() {
	}
	Namespace.prototype = Object.create(null);

	Namespace.asNamespace = function(objOrNamespace) {
	  if (objOrNamespace instanceof Namespace) {
	    return objOrNamespace;
	  }
	  return Namespace.createNamespace(objOrNamespace);
	};

	// Create a new namespace. If `optProps` is specified, all of its properties
	// will be copied to the new namespace.
	Namespace.createNamespace = function(optProps) {
	  return Namespace.extend(Namespace.prototype, optProps);
	};

	// Create a new namespace which extends another namespace. If `optProps` is
	// specified, all of its properties will be copied to the new namespace.
	Namespace.extend = function(namespace, optProps) {
	  if (namespace !== Namespace.prototype && !(namespace instanceof Namespace)) {
	    throw new TypeError('not a Namespace object: ' + namespace);
	  }
	  var ns = Object.create(namespace, {
	    constructor: {
	      value: Namespace,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  return extend(ns, optProps);
	};

	// TODO: Should this be a regular method?
	Namespace.toString = function(ns) {
	  return Object.prototype.toString.call(ns);
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = Namespace;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	/*
	  Return true if we should skip spaces preceding this expression in a syntactic context.
	*/
	pexprs.PExpr.prototype.allowsSkippingPrecedingSpace = common.abstract(
	  'allowsSkippingPrecedingSpace'
	);

	/*
	  Generally, these are all first-order expressions and (with the exception of Apply)
	  directly read from the input stream.
	*/
	pexprs.any.allowsSkippingPrecedingSpace =
	pexprs.end.allowsSkippingPrecedingSpace =
	pexprs.Apply.prototype.allowsSkippingPrecedingSpace =
	pexprs.Terminal.prototype.allowsSkippingPrecedingSpace =
	pexprs.Range.prototype.allowsSkippingPrecedingSpace =
	pexprs.UnicodeChar.prototype.allowsSkippingPrecedingSpace = function() {
	  return true;
	};

	/*
	  Higher-order expressions that don't directly consume input.
	*/
	pexprs.Alt.prototype.allowsSkippingPrecedingSpace =
	pexprs.Iter.prototype.allowsSkippingPrecedingSpace =
	pexprs.Lex.prototype.allowsSkippingPrecedingSpace =
	pexprs.Lookahead.prototype.allowsSkippingPrecedingSpace =
	pexprs.Not.prototype.allowsSkippingPrecedingSpace =
	pexprs.Param.prototype.allowsSkippingPrecedingSpace =
	pexprs.Seq.prototype.allowsSkippingPrecedingSpace = function() {
	  return false;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var errors = __webpack_require__(14);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	var lexifyCount;

	pexprs.PExpr.prototype.assertAllApplicationsAreValid = function(ruleName, grammar) {
	  lexifyCount = 0;
	  this._assertAllApplicationsAreValid(ruleName, grammar);
	};

	pexprs.PExpr.prototype._assertAllApplicationsAreValid = common.abstract(
	  '_assertAllApplicationsAreValid'
	);

	pexprs.any._assertAllApplicationsAreValid =
	pexprs.end._assertAllApplicationsAreValid =
	pexprs.Terminal.prototype._assertAllApplicationsAreValid =
	pexprs.Range.prototype._assertAllApplicationsAreValid =
	pexprs.Param.prototype._assertAllApplicationsAreValid =
	pexprs.UnicodeChar.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
	  // no-op
	};

	pexprs.Lex.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
	  lexifyCount++;
	  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
	  lexifyCount--;
	};

	pexprs.Alt.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
	  for (var idx = 0; idx < this.terms.length; idx++) {
	    this.terms[idx]._assertAllApplicationsAreValid(ruleName, grammar);
	  }
	};

	pexprs.Seq.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
	  for (var idx = 0; idx < this.factors.length; idx++) {
	    this.factors[idx]._assertAllApplicationsAreValid(ruleName, grammar);
	  }
	};

	pexprs.Iter.prototype._assertAllApplicationsAreValid =
	pexprs.Not.prototype._assertAllApplicationsAreValid =
	pexprs.Lookahead.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
	  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
	};

	pexprs.Apply.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
	  var ruleInfo = grammar.rules[this.ruleName];

	  // Make sure that the rule exists...
	  if (!ruleInfo) {
	    throw errors.undeclaredRule(this.ruleName, grammar.name, this.source);
	  }

	  // ...and that this application is allowed
	  if (common.isSyntactic(this.ruleName) && (!common.isSyntactic(ruleName) || lexifyCount > 0)) {
	    throw errors.applicationOfSyntacticRuleFromLexicalContext(this.ruleName, this);
	  }

	  // ...and that this application has the correct number of arguments
	  var actual = this.args.length;
	  var expected = ruleInfo.formals.length;
	  if (actual !== expected) {
	    throw errors.wrongNumberOfArguments(this.ruleName, expected, actual, this.source);
	  }

	  // ...and that all of the argument expressions only have valid applications and have arity 1.
	  var self = this;
	  this.args.forEach(function(arg) {
	    arg._assertAllApplicationsAreValid(ruleName, grammar);
	    if (arg.getArity() !== 1) {
	      throw errors.invalidParameter(self.ruleName, arg);
	    }
	  });
	};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var errors = __webpack_require__(14);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	pexprs.PExpr.prototype.assertChoicesHaveUniformArity = common.abstract(
	  'assertChoicesHaveUniformArity'
	);

	pexprs.any.assertChoicesHaveUniformArity =
	pexprs.end.assertChoicesHaveUniformArity =
	pexprs.Terminal.prototype.assertChoicesHaveUniformArity =
	pexprs.Range.prototype.assertChoicesHaveUniformArity =
	pexprs.Param.prototype.assertChoicesHaveUniformArity =
	pexprs.Lex.prototype.assertChoicesHaveUniformArity =
	pexprs.UnicodeChar.prototype.assertChoicesHaveUniformArity = function(ruleName) {
	  // no-op
	};

	pexprs.Alt.prototype.assertChoicesHaveUniformArity = function(ruleName) {
	  if (this.terms.length === 0) {
	    return;
	  }
	  var arity = this.terms[0].getArity();
	  for (var idx = 0; idx < this.terms.length; idx++) {
	    var term = this.terms[idx];
	    term.assertChoicesHaveUniformArity();
	    var otherArity = term.getArity();
	    if (arity !== otherArity) {
	      throw errors.inconsistentArity(ruleName, arity, otherArity, term);
	    }
	  }
	};

	pexprs.Extend.prototype.assertChoicesHaveUniformArity = function(ruleName) {
	  // Extend is a special case of Alt that's guaranteed to have exactly two
	  // cases: [extensions, origBody].
	  var actualArity = this.terms[0].getArity();
	  var expectedArity = this.terms[1].getArity();
	  if (actualArity !== expectedArity) {
	    throw errors.inconsistentArity(ruleName, expectedArity, actualArity, this.terms[0]);
	  }
	};

	pexprs.Seq.prototype.assertChoicesHaveUniformArity = function(ruleName) {
	  for (var idx = 0; idx < this.factors.length; idx++) {
	    this.factors[idx].assertChoicesHaveUniformArity(ruleName);
	  }
	};

	pexprs.Iter.prototype.assertChoicesHaveUniformArity = function(ruleName) {
	  this.expr.assertChoicesHaveUniformArity(ruleName);
	};

	pexprs.Not.prototype.assertChoicesHaveUniformArity = function(ruleName) {
	  // no-op (not required b/c the nested expr doesn't show up in the CST)
	};

	pexprs.Lookahead.prototype.assertChoicesHaveUniformArity = function(ruleName) {
	  this.expr.assertChoicesHaveUniformArity(ruleName);
	};

	pexprs.Apply.prototype.assertChoicesHaveUniformArity = function(ruleName) {
	  // The arities of the parameter expressions is required to be 1 by
	  // `assertAllApplicationsAreValid()`.
	};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var errors = __webpack_require__(14);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	pexprs.PExpr.prototype.assertIteratedExprsAreNotNullable = common.abstract(
	  'assertIteratedExprsAreNotNullable'
	);

	pexprs.any.assertIteratedExprsAreNotNullable =
	pexprs.end.assertIteratedExprsAreNotNullable =
	pexprs.Terminal.prototype.assertIteratedExprsAreNotNullable =
	pexprs.Range.prototype.assertIteratedExprsAreNotNullable =
	pexprs.Param.prototype.assertIteratedExprsAreNotNullable =
	pexprs.UnicodeChar.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
	  // no-op
	};

	pexprs.Alt.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
	  for (var idx = 0; idx < this.terms.length; idx++) {
	    this.terms[idx].assertIteratedExprsAreNotNullable(grammar, ruleName);
	  }
	};

	pexprs.Seq.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
	  for (var idx = 0; idx < this.factors.length; idx++) {
	    this.factors[idx].assertIteratedExprsAreNotNullable(grammar, ruleName);
	  }
	};

	pexprs.Iter.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
	  // Note: this is the implementation of this method for `Star` and `Plus` expressions.
	  // It is overridden for `Opt` below.
	  this.expr.assertIteratedExprsAreNotNullable(grammar, ruleName);
	  if (this.expr.isNullable(grammar)) {
	    throw errors.kleeneExprHasNullableOperand(this, ruleName);
	  }
	};

	pexprs.Opt.prototype.assertIteratedExprsAreNotNullable =
	pexprs.Not.prototype.assertIteratedExprsAreNotNullable =
	pexprs.Lookahead.prototype.assertIteratedExprsAreNotNullable =
	pexprs.Lex.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
	  this.expr.assertIteratedExprsAreNotNullable(grammar, ruleName);
	};

	pexprs.Apply.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
	  this.args.forEach(function(arg) {
	    arg.assertIteratedExprsAreNotNullable(grammar, ruleName);
	  });
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var nodes = __webpack_require__(8);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	pexprs.PExpr.prototype.check = common.abstract('check');

	pexprs.any.check = function(grammar, vals) {
	  return vals.length >= 1;
	};

	pexprs.end.check = function(grammar, vals) {
	  return vals[0] instanceof nodes.Node &&
	         vals[0].isTerminal() &&
	         vals[0].primitiveValue === undefined;
	};

	pexprs.Terminal.prototype.check = function(grammar, vals) {
	  return vals[0] instanceof nodes.Node &&
	         vals[0].isTerminal() &&
	         vals[0].primitiveValue === this.obj;
	};

	pexprs.Range.prototype.check = function(grammar, vals) {
	  return vals[0] instanceof nodes.Node &&
	         vals[0].isTerminal() &&
	         typeof vals[0].primitiveValue === typeof this.from;
	};

	pexprs.Param.prototype.check = function(grammar, vals) {
	  return vals.length >= 1;
	};

	pexprs.Alt.prototype.check = function(grammar, vals) {
	  for (var i = 0; i < this.terms.length; i++) {
	    var term = this.terms[i];
	    if (term.check(grammar, vals)) {
	      return true;
	    }
	  }
	  return false;
	};

	pexprs.Seq.prototype.check = function(grammar, vals) {
	  var pos = 0;
	  for (var i = 0; i < this.factors.length; i++) {
	    var factor = this.factors[i];
	    if (factor.check(grammar, vals.slice(pos))) {
	      pos += factor.getArity();
	    } else {
	      return false;
	    }
	  }
	  return true;
	};

	pexprs.Iter.prototype.check = function(grammar, vals) {
	  var arity = this.getArity();
	  var columns = vals.slice(0, arity);
	  if (columns.length !== arity) {
	    return false;
	  }
	  var rowCount = columns[0].length;
	  var i;
	  for (i = 1; i < arity; i++) {
	    if (columns[i].length !== rowCount) {
	      return false;
	    }
	  }

	  for (i = 0; i < rowCount; i++) {
	    var row = [];
	    for (var j = 0; j < arity; j++) {
	      row.push(columns[j][i]);
	    }
	    if (!this.expr.check(grammar, row)) {
	      return false;
	    }
	  }

	  return true;
	};

	pexprs.Not.prototype.check = function(grammar, vals) {
	  return true;
	};

	pexprs.Lookahead.prototype.check =
	pexprs.Lex.prototype.check = function(grammar, vals) {
	  return this.expr.check(grammar, vals);
	};

	pexprs.Apply.prototype.check = function(grammar, vals) {
	  if (!(vals[0] instanceof nodes.Node &&
	        vals[0].grammar === grammar &&
	        vals[0].ctorName === this.ruleName)) {
	    return false;
	  }

	  // TODO: think about *not* doing the following checks, i.e., trusting that the rule
	  // was correctly constructed.
	  var ruleNode = vals[0];
	  var body = grammar.rules[this.ruleName].body;
	  return body.check(grammar, ruleNode.children) && ruleNode.numChildren() === body.getArity();
	};

	pexprs.UnicodeChar.prototype.check = function(grammar, vals) {
	  return vals[0] instanceof nodes.Node &&
	         vals[0].isTerminal() &&
	         typeof vals[0].primitiveValue === 'string';
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var Trace = __webpack_require__(22);
	var common = __webpack_require__(10);
	var nodes = __webpack_require__(8);
	var pexprs = __webpack_require__(12);

	var TerminalNode = nodes.TerminalNode;
	var NonterminalNode = nodes.NonterminalNode;
	var IterationNode = nodes.IterationNode;

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	/*
	  Evaluate the expression and return `true` if it succeeds, `false` otherwise. This method should
	  only be called directly by `State.prototype.eval(expr)`, which also updates the data structures
	  that are used for tracing. (Making those updates in a method of `State` enables the trace-specific
	  data structures to be "secrets" of that class, which is good for modularity.)

	  The contract of this method is as follows:
	  * When the return value is `true`,
	    - the state object will have `expr.getArity()` more bindings than it did before the call.
	  * When the return value is `false`,
	    - the state object may have more bindings than it did before the call, and
	    - its input stream's position may be anywhere.

	  Note that `State.prototype.eval(expr)`, unlike this method, guarantees that neither the state
	  object's bindings nor its input stream's position will change if the expression fails to match.
	*/
	pexprs.PExpr.prototype.eval = common.abstract('eval');  // function(state) { ... }

	pexprs.any.eval = function(state) {
	  var inputStream = state.inputStream;
	  var origPos = inputStream.pos;
	  var ch = inputStream.next();
	  if (ch) {
	    state.pushBinding(new TerminalNode(state.grammar, ch), origPos);
	    return true;
	  } else {
	    state.processFailure(origPos, this);
	    return false;
	  }
	};

	pexprs.end.eval = function(state) {
	  var inputStream = state.inputStream;
	  var origPos = inputStream.pos;
	  if (inputStream.atEnd()) {
	    state.pushBinding(new TerminalNode(state.grammar, undefined), origPos);
	    return true;
	  } else {
	    state.processFailure(origPos, this);
	    return false;
	  }
	};

	pexprs.Terminal.prototype.eval = function(state) {
	  var inputStream = state.inputStream;
	  var origPos = inputStream.pos;
	  if (!inputStream.matchString(this.obj)) {
	    state.processFailure(origPos, this);
	    return false;
	  } else {
	    state.pushBinding(new TerminalNode(state.grammar, this.obj), origPos);
	    return true;
	  }
	};

	pexprs.Range.prototype.eval = function(state) {
	  var inputStream = state.inputStream;
	  var origPos = inputStream.pos;
	  var ch = inputStream.next();
	  if (ch && this.from <= ch && ch <= this.to) {
	    state.pushBinding(new TerminalNode(state.grammar, ch), origPos);
	    return true;
	  } else {
	    state.processFailure(origPos, this);
	    return false;
	  }
	};

	pexprs.Param.prototype.eval = function(state) {
	  return state.eval(state.currentApplication().args[this.index]);
	};

	pexprs.Lex.prototype.eval = function(state) {
	  state.enterLexifiedContext();
	  var ans = state.eval(this.expr);
	  state.exitLexifiedContext();
	  return ans;
	};

	pexprs.Alt.prototype.eval = function(state) {
	  for (var idx = 0; idx < this.terms.length; idx++) {
	    if (state.eval(this.terms[idx])) {
	      return true;
	    }
	  }
	  return false;
	};

	pexprs.Seq.prototype.eval = function(state) {
	  for (var idx = 0; idx < this.factors.length; idx++) {
	    var factor = this.factors[idx];
	    if (!state.eval(factor)) {
	      return false;
	    }
	  }
	  return true;
	};

	pexprs.Iter.prototype.eval = function(state) {
	  var inputStream = state.inputStream;
	  var origPos = inputStream.pos;
	  var arity = this.getArity();
	  var cols = [];
	  var colOffsets = [];
	  while (cols.length < arity) {
	    cols.push([]);
	    colOffsets.push([]);
	  }

	  var numMatches = 0;
	  var idx;
	  while (numMatches < this.maxNumMatches && state.eval(this.expr)) {
	    numMatches++;
	    var row = state._bindings.splice(state._bindings.length - arity, arity);
	    var rowOffsets = state._bindingOffsets.splice(state._bindingOffsets.length - arity, arity);
	    for (idx = 0; idx < row.length; idx++) {
	      cols[idx].push(row[idx]);
	      colOffsets[idx].push(rowOffsets[idx]);
	    }
	  }
	  if (numMatches < this.minNumMatches) {
	    return false;
	  }
	  var startIdx = origPos;
	  var matchLength = 0;
	  if (numMatches > 0) {
	    var lastCol = cols[arity - 1];
	    var lastColOffsets = colOffsets[arity - 1];

	    var endIdx =
	        lastColOffsets[lastColOffsets.length - 1] + lastCol[lastCol.length - 1].matchLength;
	    startIdx = colOffsets[0][0];
	    matchLength = endIdx - startIdx;
	  }
	  var isOptional = this instanceof pexprs.Opt;
	  for (idx = 0; idx < cols.length; idx++) {
	    state._bindings.push(
	        new IterationNode(state.grammar, cols[idx], colOffsets[idx], matchLength, isOptional));
	    state._bindingOffsets.push(state.posToOffset(startIdx));
	  }
	  return true;
	};

	pexprs.Not.prototype.eval = function(state) {
	  /*
	    TODO:
	    - Right now we're just throwing away all of the failures that happen inside a `not`, and
	      recording `this` as a failed expression.
	    - Double negation should be equivalent to lookahead, but that's not the case right now wrt
	      failures. E.g., ~~'foo' produces a failure for ~~'foo', but maybe it should produce
	      a failure for 'foo' instead.
	  */

	  var inputStream = state.inputStream;
	  var origPos = inputStream.pos;
	  state.pushFailuresInfo();

	  var ans = state.eval(this.expr);

	  state.popFailuresInfo();
	  if (ans) {
	    state.processFailure(origPos, this);
	    return false;
	  }

	  inputStream.pos = origPos;
	  return true;
	};

	pexprs.Lookahead.prototype.eval = function(state) {
	  var inputStream = state.inputStream;
	  var origPos = inputStream.pos;
	  if (state.eval(this.expr)) {
	    inputStream.pos = origPos;
	    return true;
	  } else {
	    return false;
	  }
	};

	pexprs.Apply.prototype.eval = function(state) {
	  var caller = state.currentApplication();
	  var actuals = caller ? caller.args : [];
	  var app = this.substituteParams(actuals);

	  var posInfo = state.getCurrentPosInfo();
	  if (posInfo.isActive(app)) {
	    // This rule is already active at this position, i.e., it is left-recursive.
	    return app.handleCycle(state);
	  }

	  var memoKey = app.toMemoKey();
	  var memoRec = posInfo.memo[memoKey];

	  if (memoRec && posInfo.shouldUseMemoizedResult(memoRec)) {
	    if (state.hasNecessaryInfo(memoRec)) {
	      return state.useMemoizedResult(state.inputStream.pos, memoRec);
	    }
	    delete posInfo.memo[memoKey];
	  }
	  return app.reallyEval(state);
	};

	pexprs.Apply.prototype.handleCycle = function(state) {
	  var posInfo = state.getCurrentPosInfo();
	  var currentLeftRecursion = posInfo.currentLeftRecursion;
	  var memoKey = this.toMemoKey();
	  var memoRec = posInfo.memo[memoKey];

	  if (currentLeftRecursion && currentLeftRecursion.headApplication.toMemoKey() === memoKey) {
	    // We already know about this left recursion, but it's possible there are "involved
	    // applications" that we don't already know about, so...
	    memoRec.updateInvolvedApplicationMemoKeys();
	  } else if (!memoRec) {
	    // New left recursion detected! Memoize a failure to try to get a seed parse.
	    memoRec = posInfo.memoize(
	        memoKey,
	        {matchLength: 0, examinedLength: 0, value: false, rightmostFailureOffset: -1});
	    posInfo.startLeftRecursion(this, memoRec);
	  }
	  return state.useMemoizedResult(state.inputStream.pos, memoRec);
	};

	pexprs.Apply.prototype.reallyEval = function(state) {
	  var inputStream = state.inputStream;
	  var origPos = inputStream.pos;
	  var origPosInfo = state.getCurrentPosInfo();
	  var ruleInfo = state.grammar.rules[this.ruleName];
	  var body = ruleInfo.body;
	  var description = ruleInfo.description;

	  state.enterApplication(origPosInfo, this);

	  if (description) {
	    state.pushFailuresInfo();
	  }

	  // Reset the input stream's examinedLength property so that we can track
	  // the examined length of this particular application.
	  var origInputStreamExaminedLength = inputStream.examinedLength;
	  inputStream.examinedLength = 0;

	  var value = this.evalOnce(body, state);
	  var currentLR = origPosInfo.currentLeftRecursion;
	  var memoKey = this.toMemoKey();
	  var isHeadOfLeftRecursion = currentLR && currentLR.headApplication.toMemoKey() === memoKey;
	  var memoRec;

	  if (isHeadOfLeftRecursion) {
	    value = this.growSeedResult(body, state, origPos, currentLR, value);
	    origPosInfo.endLeftRecursion();
	    memoRec = currentLR;
	    memoRec.examinedLength = inputStream.examinedLength - origPos;
	    memoRec.rightmostFailureOffset = state._getRightmostFailureOffset();
	    origPosInfo.memoize(memoKey, memoRec);  // updates origPosInfo's maxExaminedLength
	  } else if (!currentLR || !currentLR.isInvolved(memoKey)) {
	    // This application is not involved in left recursion, so it's ok to memoize it.
	    memoRec = origPosInfo.memoize(memoKey, {
	      matchLength: inputStream.pos - origPos,
	      examinedLength: inputStream.examinedLength - origPos,
	      value: value,
	      failuresAtRightmostPosition: state.cloneRecordedFailures(),
	      rightmostFailureOffset: state._getRightmostFailureOffset()
	    });
	  }
	  var succeeded = !!value;

	  if (description) {
	    state.popFailuresInfo();
	    if (!succeeded) {
	      state.processFailure(origPos, this);
	    }
	    if (memoRec) {
	      memoRec.failuresAtRightmostPosition = state.cloneRecordedFailures();
	    }
	  }

	  // Record trace information in the memo table, so that it is available if the memoized result
	  // is used later.
	  if (state.isTracing() && memoRec) {
	    var entry = state.getTraceEntry(origPos, this, succeeded, succeeded ? [value] : []);
	    if (isHeadOfLeftRecursion) {
	      common.assert(entry.terminatingLREntry != null || !succeeded);
	      entry.isHeadOfLeftRecursion = true;
	    }
	    memoRec.traceEntry = entry;
	  }

	  // Fix the input stream's examinedLength -- it should be the maximum examined length
	  // across all applications, not just this one.
	  inputStream.examinedLength = Math.max(inputStream.examinedLength, origInputStreamExaminedLength);

	  state.exitApplication(origPosInfo, value);

	  return succeeded;
	};

	pexprs.Apply.prototype.evalOnce = function(expr, state) {
	  var inputStream = state.inputStream;
	  var origPos = inputStream.pos;

	  if (state.eval(expr)) {
	    var arity = expr.getArity();
	    var bindings = state._bindings.splice(state._bindings.length - arity, arity);
	    var offsets = state._bindingOffsets.splice(state._bindingOffsets.length - arity, arity);
	    return new NonterminalNode(
	        state.grammar, this.ruleName, bindings, offsets, inputStream.pos - origPos);
	  } else {
	    return false;
	  }
	};

	pexprs.Apply.prototype.growSeedResult = function(body, state, origPos, lrMemoRec, newValue) {
	  if (!newValue) {
	    return false;
	  }

	  var inputStream = state.inputStream;

	  while (true) {
	    lrMemoRec.matchLength = inputStream.pos - origPos;
	    lrMemoRec.value = newValue;
	    lrMemoRec.failuresAtRightmostPosition = state.cloneRecordedFailures();

	    if (state.isTracing()) {
	      // Before evaluating the body again, add a trace node for this application to the memo entry.
	      // Its only child is a copy of the trace node from `newValue`, which will always be the last
	      // element in `state.trace`.
	      var seedTrace = state.trace[state.trace.length - 1];
	      lrMemoRec.traceEntry = new Trace(
	          state.input, origPos, inputStream.pos, this, true, [newValue], [seedTrace.clone()]);
	    }
	    inputStream.pos = origPos;
	    newValue = this.evalOnce(body, state);
	    if (inputStream.pos - origPos <= lrMemoRec.matchLength) {
	      break;
	    }
	    if (state.isTracing()) {
	      state.trace.splice(-2, 1);  // Drop the trace for the old seed.
	    }
	  }
	  if (state.isTracing()) {
	    // The last entry is for an unused result -- pop it and save it in the "real" entry.
	    lrMemoRec.traceEntry.recordLRTermination(state.trace.pop(), newValue);
	  }
	  inputStream.pos = origPos + lrMemoRec.matchLength;
	  return lrMemoRec.value;
	};

	pexprs.UnicodeChar.prototype.eval = function(state) {
	  var inputStream = state.inputStream;
	  var origPos = inputStream.pos;
	  var ch = inputStream.next();
	  if (ch && this.pattern.test(ch)) {
	    state.pushBinding(new TerminalNode(state.grammar, ch), origPos);
	    return true;
	  } else {
	    state.processFailure(origPos, this);
	    return false;
	  }
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var Interval = __webpack_require__(23);
	var common = __webpack_require__(10);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	// Unicode characters that are used in the `toString` output.
	var BALLOT_X = '\u2717';
	var CHECK_MARK = '\u2713';
	var DOT_OPERATOR = '\u22C5';
	var RIGHTWARDS_DOUBLE_ARROW = '\u21D2';
	var SYMBOL_FOR_HORIZONTAL_TABULATION = '\u2409';
	var SYMBOL_FOR_LINE_FEED = '\u240A';
	var SYMBOL_FOR_CARRIAGE_RETURN = '\u240D';

	function spaces(n) {
	  return common.repeat(' ', n).join('');
	}

	// Return a string representation of a portion of `input` at offset `pos`.
	// The result will contain exactly `len` characters.
	function getInputExcerpt(input, pos, len) {
	  var excerpt = asEscapedString(input.slice(pos, pos + len));

	  // Pad the output if necessary.
	  if (excerpt.length < len) {
	    return excerpt + common.repeat(' ', len - excerpt.length).join('');
	  }
	  return excerpt;
	}

	function asEscapedString(obj) {
	  if (typeof obj === 'string') {
	    // Replace non-printable characters with visible symbols.
	    return obj
	        .replace(/ /g, DOT_OPERATOR)
	        .replace(/\t/g, SYMBOL_FOR_HORIZONTAL_TABULATION)
	        .replace(/\n/g, SYMBOL_FOR_LINE_FEED)
	        .replace(/\r/g, SYMBOL_FOR_CARRIAGE_RETURN);
	  }
	  return String(obj);
	}

	// ----------------- Trace -----------------

	function Trace(input, pos1, pos2, expr, succeeded, bindings, optChildren) {
	  this.input = input;
	  this.pos = this.pos1 = pos1;
	  this.pos2 = pos2;
	  this.source = new Interval(input, pos1, pos2);
	  this.expr = expr;
	  this.succeeded = succeeded;
	  this.bindings = bindings;
	  this.children = optChildren || [];

	  this.isHeadOfLeftRecursion = false;  // Is this the outermost LR application?
	  this.isImplicitSpaces = false;
	  this.isMemoized = false;
	  this.isRootNode = false;
	  this.terminatesLR = false;
	  this.terminatingLREntry = null;
	}

	// A value that can be returned from visitor functions to indicate that a
	// node should not be recursed into.
	Trace.prototype.SKIP = {};

	Object.defineProperty(Trace.prototype, 'displayString', {
	  get: function() { return this.expr.toDisplayString(); }
	});

	Trace.prototype.clone = function() {
	  return this.cloneWithExpr(this.expr);
	};

	Trace.prototype.cloneWithExpr = function(expr) {
	  var ans = new Trace(
	      this.input, this.pos, this.pos2, expr, this.succeeded, this.bindings, this.children);

	  ans.isHeadOfLeftRecursion = this.isHeadOfLeftRecursion;
	  ans.isImplicitSpaces = this.isImplicitSpaces;
	  ans.isMemoized = this.isMemoized;
	  ans.isRootNode = this.isRootNode;
	  ans.terminatesLR = this.terminatesLR;
	  ans.terminatingLREntry = this.terminatingLREntry;
	  return ans;
	};

	// Record the trace information for the terminating condition of the LR loop.
	Trace.prototype.recordLRTermination = function(ruleBodyTrace, value) {
	  this.terminatingLREntry =
	      new Trace(this.input, this.pos, this.pos2, this.expr, false, [value], [ruleBodyTrace]);
	  this.terminatingLREntry.terminatesLR = true;
	};

	// Recursively traverse this trace node and all its descendents, calling a visitor function
	// for each node that is visited. If `vistorObjOrFn` is an object, then its 'enter' property
	// is a function to call before visiting the children of a node, and its 'exit' property is
	// a function to call afterwards. If `visitorObjOrFn` is a function, it represents the 'enter'
	// function.
	//
	// The functions are called with three arguments: the Trace node, its parent Trace, and a number
	// representing the depth of the node in the tree. (The root node has depth 0.) `optThisArg`, if
	// specified, is the value to use for `this` when executing the visitor functions.
	Trace.prototype.walk = function(visitorObjOrFn, optThisArg) {
	  var visitor = visitorObjOrFn;
	  if (typeof visitor === 'function') {
	    visitor = {enter: visitor};
	  }

	  function _walk(node, parent, depth) {
	    var recurse = true;
	    if (visitor.enter) {
	      if (visitor.enter.call(optThisArg, node, parent, depth) === Trace.prototype.SKIP) {
	        recurse = false;
	      }
	    }
	    if (recurse) {
	      node.children.forEach(function(child) {
	        _walk(child, node, depth + 1);
	      });
	      if (visitor.exit) {
	        visitor.exit.call(optThisArg, node, parent, depth);
	      }
	    }
	  }
	  if (this.isRootNode) {
	    // Don't visit the root node itself, only its children.
	    this.children.forEach(function(c) { _walk(c, null, 0); });
	  } else {
	    _walk(this, null, 0);
	  }
	};

	// Return a string representation of the trace.
	// Sample:
	//     12⋅+⋅2⋅*⋅3 ✓ exp ⇒  "12"
	//     12⋅+⋅2⋅*⋅3   ✓ addExp (LR) ⇒  "12"
	//     12⋅+⋅2⋅*⋅3       ✗ addExp_plus
	Trace.prototype.toString = function() {
	  var sb = new common.StringBuffer();
	  this.walk(function(node, parent, depth) {
	    if (!node) {
	      return this.SKIP;
	    }
	    var ctorName = node.expr.constructor.name;
	    // Don't print anything for Alt nodes.
	    if (ctorName === 'Alt') {
	      return;  // eslint-disable-line consistent-return
	    }
	    sb.append(getInputExcerpt(node.input, node.pos, 10) + spaces(depth * 2 + 1));
	    sb.append((node.succeeded ? CHECK_MARK : BALLOT_X) + ' ' + node.displayString);
	    if (node.isHeadOfLeftRecursion) {
	      sb.append(' (LR)');
	    }
	    if (node.succeeded) {
	      var contents = asEscapedString(node.source.contents);
	      sb.append(' ' + RIGHTWARDS_DOUBLE_ARROW + '  ');
	      sb.append(typeof contents === 'string' ? '"' + contents + '"' : contents);
	    }
	    sb.append('\n');
	  }.bind(this));
	  return sb.contents();
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = Trace;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var assert = __webpack_require__(10).assert;
	var errors = __webpack_require__(14);
	var util = __webpack_require__(24);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function Interval(sourceString, startIdx, endIdx) {
	  this.sourceString = sourceString;
	  this.startIdx = startIdx;
	  this.endIdx = endIdx;
	}

	Interval.coverage = function(/* interval1, interval2, ... */) {
	  var sourceString = arguments[0].sourceString;
	  var startIdx = arguments[0].startIdx;
	  var endIdx = arguments[0].endIdx;
	  for (var idx = 1; idx < arguments.length; idx++) {
	    var interval = arguments[idx];
	    if (interval.sourceString !== sourceString) {
	      throw errors.intervalSourcesDontMatch();
	    } else {
	      startIdx = Math.min(startIdx, arguments[idx].startIdx);
	      endIdx = Math.max(endIdx, arguments[idx].endIdx);
	    }
	  }
	  return new Interval(sourceString, startIdx, endIdx);
	};

	Interval.prototype = {
	  coverageWith: function(/* interval1, interval2, ... */) {
	    var intervals = Array.prototype.slice.call(arguments);
	    intervals.push(this);
	    return Interval.coverage.apply(undefined, intervals);
	  },

	  collapsedLeft: function() {
	    return new Interval(this.sourceString, this.startIdx, this.startIdx);
	  },

	  collapsedRight: function() {
	    return new Interval(this.sourceString, this.endIdx, this.endIdx);
	  },

	  getLineAndColumnMessage: function() {
	    var range = [this.startIdx, this.endIdx];
	    return util.getLineAndColumnMessage(this.sourceString, this.startIdx, range);
	  },

	  // Returns an array of 0, 1, or 2 intervals that represents the result of the
	  // interval difference operation.
	  minus: function(that) {
	    if (this.sourceString !== that.sourceString) {
	      throw errors.intervalSourcesDontMatch();
	    } else if (this.startIdx === that.startIdx && this.endIdx === that.endIdx) {
	      // `this` and `that` are the same interval!
	      return [
	      ];
	    } else if (this.startIdx < that.startIdx && that.endIdx < this.endIdx) {
	      // `that` splits `this` into two intervals
	      return [
	        new Interval(this.sourceString, this.startIdx, that.startIdx),
	        new Interval(this.sourceString, that.endIdx, this.endIdx)
	      ];
	    } else if (this.startIdx < that.endIdx && that.endIdx < this.endIdx) {
	      // `that` contains a prefix of `this`
	      return [
	        new Interval(this.sourceString, that.endIdx, this.endIdx)
	      ];
	    } else if (this.startIdx < that.startIdx && that.startIdx < this.endIdx) {
	      // `that` contains a suffix of `this`
	      return [
	        new Interval(this.sourceString, this.startIdx, that.startIdx)
	      ];
	    } else {
	      // `that` and `this` do not overlap
	      return [
	        this
	      ];
	    }
	  },

	  // Returns a new Interval that has the same extent as this one, but which is relative
	  // to `that`, an Interval that fully covers this one.
	  relativeTo: function(that) {
	    if (this.sourceString !== that.sourceString) {
	      throw errors.intervalSourcesDontMatch();
	    }
	    assert(this.startIdx >= that.startIdx && this.endIdx <= that.endIdx,
	           'other interval does not cover this one');
	    return new Interval(this.sourceString,
	                        this.startIdx - that.startIdx,
	                        this.endIdx - that.startIdx);
	  },

	  // Returns a new Interval which contains the same contents as this one,
	  // but with whitespace trimmed from both ends. (This only makes sense when
	  // the input stream is a string.)
	  trimmed: function() {
	    var contents = this.contents;
	    var startIdx = this.startIdx + contents.match(/^\s*/)[0].length;
	    var endIdx = this.endIdx - contents.match(/\s*$/)[0].length;
	    return new Interval(this.sourceString, startIdx, endIdx);
	  },

	  subInterval: function(offset, len) {
	    var newStartIdx = this.startIdx + offset;
	    return new Interval(this.sourceString, newStartIdx, newStartIdx + len);
	  }
	};

	Object.defineProperties(Interval.prototype, {
	  contents: {
	    get: function() {
	      if (this._contents === undefined) {
	        this._contents = this.sourceString.slice(this.startIdx, this.endIdx);
	      }
	      return this._contents;
	    },
	    enumerable: true
	  },
	  length: {
	    get: function() { return this.endIdx - this.startIdx; },
	    enumerable: true
	  }
	});

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = Interval;



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	// Given an array of numbers `arr`, return an array of the numbers as strings,
	// right-justified and padded to the same length.
	function padNumbersToEqualLength(arr) {
	  var maxLen = 0;
	  var strings = arr.map(function(n) {
	    var str = n.toString();
	    maxLen = Math.max(maxLen, str.length);
	    return str;
	  });
	  return strings.map(function(s) { return common.padLeft(s, maxLen); });
	}

	// Produce a new string that would be the result of copying the contents
	// of the string `src` onto `dest` at offset `offest`.
	function strcpy(dest, src, offset) {
	  var origDestLen = dest.length;
	  var start = dest.slice(0, offset);
	  var end = dest.slice(offset + src.length);
	  return (start + src + end).substr(0, origDestLen);
	}

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	// Return an object with the line and column information for the given
	// offset in `str`.
	exports.getLineAndColumn = function(str, offset) {
	  var lineNum = 1;
	  var colNum = 1;

	  var currOffset = 0;
	  var lineStartOffset = 0;

	  var nextLine = null;
	  var prevLine = null;
	  var prevLineStartOffset = -1;

	  while (currOffset < offset) {
	    var c = str.charAt(currOffset++);
	    if (c === '\n') {
	      lineNum++;
	      colNum = 1;
	      prevLineStartOffset = lineStartOffset;
	      lineStartOffset = currOffset;
	    } else if (c !== '\r') {
	      colNum++;
	    }
	  }

	  // Find the end of the target line.
	  var lineEndOffset = str.indexOf('\n', lineStartOffset);
	  if (lineEndOffset === -1) {
	    lineEndOffset = str.length;
	  } else {
	    // Get the next line.
	    var nextLineEndOffset = str.indexOf('\n', lineEndOffset + 1);
	    nextLine = nextLineEndOffset === -1 ? str.slice(lineEndOffset)
	                                        : str.slice(lineEndOffset, nextLineEndOffset);
	    // Strip leading and trailing EOL char(s).
	    nextLine = nextLine.replace(/^\r?\n/, '').replace(/\r$/, '');
	  }

	  // Get the previous line.
	  if (prevLineStartOffset >= 0) {
	    prevLine = str.slice(prevLineStartOffset, lineStartOffset)
	                  .replace(/\r?\n$/, '');  // Strip trailing EOL char(s).
	  }

	  // Get the target line, stripping a trailing carriage return if necessary.
	  var line = str.slice(lineStartOffset, lineEndOffset).replace(/\r$/, '');

	  return {
	    lineNum: lineNum,
	    colNum: colNum,
	    line: line,
	    prevLine: prevLine,
	    nextLine: nextLine
	  };
	};

	// Return a nicely-formatted string describing the line and column for the
	// given offset in `str`.
	exports.getLineAndColumnMessage = function(str, offset /* ...ranges */) {
	  var repeatStr = common.repeatStr;

	  var lineAndCol = exports.getLineAndColumn(str, offset);
	  var sb = new common.StringBuffer();
	  sb.append('Line ' + lineAndCol.lineNum + ', col ' + lineAndCol.colNum + ':\n');

	  // An array of the previous, current, and next line numbers as strings of equal length.
	  var lineNumbers = padNumbersToEqualLength([
	    lineAndCol.prevLine == null ? 0 : lineAndCol.lineNum - 1,
	    lineAndCol.lineNum,
	    lineAndCol.nextLine == null ? 0 : lineAndCol.lineNum + 1
	  ]);

	  // Helper for appending formatting input lines to the buffer.
	  function appendLine(num, content, prefix) {
	    sb.append(prefix + lineNumbers[num] + ' | ' + content + '\n');
	  }

	  // Include the previous line for context if possible.
	  if (lineAndCol.prevLine != null) {
	    appendLine(0, lineAndCol.prevLine, '  ');
	  }
	  // Line that the error occurred on.
	  appendLine(1, lineAndCol.line, '> ');

	  // Build up the line that points to the offset and possible indicates one or more ranges.
	  // Start with a blank line, and indicate each range by overlaying a string of `~` chars.
	  var lineLen = lineAndCol.line.length;
	  var indicationLine = repeatStr(' ', lineLen + 1);
	  var ranges = Array.prototype.slice.call(arguments, 2);
	  for (var i = 0; i < ranges.length; ++i) {
	    var startIdx = ranges[i][0];
	    var endIdx = ranges[i][1];
	    common.assert(startIdx >= 0 && startIdx <= endIdx, 'range start must be >= 0 and <= end');

	    var lineStartOffset = offset - lineAndCol.colNum + 1;
	    startIdx = Math.max(0, startIdx - lineStartOffset);
	    endIdx = Math.min(endIdx - lineStartOffset, lineLen);

	    indicationLine = strcpy(indicationLine, repeatStr('~', endIdx - startIdx), startIdx);
	  }
	  var gutterWidth = 2 + lineNumbers[1].length + 3;
	  sb.append(repeatStr(' ', gutterWidth));
	  indicationLine = strcpy(indicationLine, '^', lineAndCol.colNum - 1);
	  sb.append(indicationLine.replace(/ +$/, '') + '\n');

	  // Include the next line for context if possible.
	  if (lineAndCol.nextLine != null) {
	    appendLine(2, lineAndCol.nextLine, '  ');
	  }
	  return sb.contents();
	};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	pexprs.PExpr.prototype.getArity = common.abstract('getArity');

	pexprs.any.getArity =
	pexprs.end.getArity =
	pexprs.Terminal.prototype.getArity =
	pexprs.Range.prototype.getArity =
	pexprs.Param.prototype.getArity =
	pexprs.Apply.prototype.getArity =
	pexprs.UnicodeChar.prototype.getArity = function() {
	  return 1;
	};

	pexprs.Alt.prototype.getArity = function() {
	  // This is ok b/c all terms must have the same arity -- this property is
	  // checked by the Grammar constructor.
	  return this.terms.length === 0 ? 0 : this.terms[0].getArity();
	};

	pexprs.Seq.prototype.getArity = function() {
	  var arity = 0;
	  for (var idx = 0; idx < this.factors.length; idx++) {
	    arity += this.factors[idx].getArity();
	  }
	  return arity;
	};

	pexprs.Iter.prototype.getArity = function() {
	  return this.expr.getArity();
	};

	pexprs.Not.prototype.getArity = function() {
	  return 0;
	};

	pexprs.Lookahead.prototype.getArity =
	pexprs.Lex.prototype.getArity = function() {
	  return this.expr.getArity();
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Helpers
	// --------------------------------------------------------------------

	function flatten(listOfLists) {
	  return Array.prototype.concat.apply([], listOfLists);
	}

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	pexprs.PExpr.prototype.generateExample = common.abstract('generateExample');

	function categorizeExamples(examples) {
	  // A list of rules that the system needs examples of, in order to generate an example
	  //   for the current rule
	  var examplesNeeded = examples.filter(function(example) {
	    return example.hasOwnProperty('examplesNeeded');
	  })
	  .map(function(example) { return example.examplesNeeded; });

	  examplesNeeded = flatten(examplesNeeded);

	  var uniqueExamplesNeeded = {};
	  for (var i = 0; i < examplesNeeded.length; i++) {
	    var currentExampleNeeded = examplesNeeded[i];
	    uniqueExamplesNeeded[currentExampleNeeded] = true;
	  }
	  examplesNeeded = Object.keys(uniqueExamplesNeeded);

	  // A list of successfully generated examples
	  var successfulExamples = examples.filter(function(example) {
	    return example.hasOwnProperty('value');
	  })
	  .map(function(item) { return item.value; });

	  // This flag returns true if the system cannot generate the rule it is currently
	  //   attempting to generate, regardless of whether or not it has the examples it needs.
	  //   Currently, this is only used in overriding generators to prevent the system from
	  //   generating examples for certain rules (e.g. 'ident').
	  var needHelp = examples.some(function(item) { return item.needHelp; });

	  return {
	    examplesNeeded: examplesNeeded,
	    successfulExamples: successfulExamples,
	    needHelp: needHelp
	  };
	}

	pexprs.any.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
	  return {value: String.fromCharCode(Math.floor(Math.random() * 255))};
	};

	// Assumes that terminal's object is always a string
	pexprs.Terminal.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
	  return {value: this.obj};
	};

	pexprs.Range.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
	  var rangeSize = this.to.charCodeAt(0) - this.from.charCodeAt(0);
	  return {value: String.fromCharCode(
	    this.from.charCodeAt(0) + Math.floor(rangeSize * Math.random())
	  )};
	};

	pexprs.Param.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
	  return actuals[this.index].generateExample(grammar, examples, inSyntacticContext, actuals);
	};

	pexprs.Alt.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
	  // items -> termExamples
	  var termExamples = this.terms.map(function(term) {
	    return term.generateExample(grammar, examples, inSyntacticContext, actuals);
	  });

	  var categorizedExamples = categorizeExamples(termExamples);

	  var examplesNeeded = categorizedExamples.examplesNeeded;
	  var successfulExamples = categorizedExamples.successfulExamples;
	  var needHelp = categorizedExamples.needHelp;

	  var ans = {};

	  // Alt can contain both an example and a request for examples
	  if (successfulExamples.length > 0) {
	    var i = Math.floor(Math.random() * successfulExamples.length);
	    ans.value = successfulExamples[i];
	  }
	  if (examplesNeeded.length > 0) {
	    ans.examplesNeeded = examplesNeeded;
	  }
	  ans.needHelp = needHelp;

	  return ans;
	};

	pexprs.Seq.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
	  var factorExamples = this.factors.map(function(factor) {
	    return factor.generateExample(grammar, examples, inSyntacticContext, actuals);
	  });
	  var categorizedExamples = categorizeExamples(factorExamples);

	  var examplesNeeded = categorizedExamples.examplesNeeded;
	  var successfulExamples = categorizedExamples.successfulExamples;
	  var needHelp = categorizedExamples.needHelp;

	  var ans = {};

	  // In a Seq, all pieces must succeed in order to have a successful example.
	  if (examplesNeeded.length > 0 || needHelp) {
	    ans.examplesNeeded = examplesNeeded;
	    ans.needHelp = needHelp;
	  } else {
	    ans.value = successfulExamples.join(inSyntacticContext ? ' ' : '');
	  }

	  return ans;
	};

	pexprs.Iter.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
	  var rangeTimes = Math.min(this.maxNumMatches - this.minNumMatches, 3);
	  var numTimes = Math.floor(Math.random() * (rangeTimes + 1) + this.minNumMatches);
	  var items = [];

	  for (var i = 0; i < numTimes; i++) {
	    items.push(this.expr.generateExample(grammar, examples, inSyntacticContext, actuals));
	  }

	  var categorizedExamples = categorizeExamples(items);

	  var examplesNeeded = categorizedExamples.examplesNeeded;
	  var successfulExamples = categorizedExamples.successfulExamples;

	  var ans = {};

	  // It's always either one or the other.
	  // TODO: instead of ' ', call 'spaces.generateExample()'
	  ans.value = successfulExamples.join(inSyntacticContext ? ' ' : '');
	  if (examplesNeeded.length > 0) {
	    ans.examplesNeeded = examplesNeeded;
	  }

	  return ans;
	};

	// Right now, 'Not' and 'Lookahead' generate nothing and assume that whatever follows will
	//   work according to the encoded constraints.
	pexprs.Not.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
	  return {value: ''};
	};

	pexprs.Lookahead.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
	  return {value: ''};
	};

	pexprs.Lex.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
	  return this.expr.generateExample(grammar, examples, false, actuals);
	};

	pexprs.Apply.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
	  var ans = {};

	  var ruleName = this.substituteParams(actuals).toString();

	  if (!examples.hasOwnProperty(ruleName)) {
	    ans.examplesNeeded = [ruleName];
	  } else {
	    var relevantExamples = examples[ruleName];
	    var i = Math.floor(Math.random() * relevantExamples.length);
	    ans.value = relevantExamples[i];
	  }

	  return ans;
	};

	pexprs.UnicodeChar.prototype.generateExample = function(
	    grammar, examples, inSyntacticContext, actuals) {
	  var char;
	  switch (this.category) {
	    case 'Lu': char = 'Á'; break;
	    case 'Ll': char = 'ŏ'; break;
	    case 'Lt': char = 'ǅ'; break;
	    case 'Lm': char = 'ˮ'; break;
	    case 'Lo': char = 'ƻ'; break;

	    case 'Nl': char = 'ↂ'; break;
	    case 'Nd': char = '½'; break;

	    case 'Mn': char = '\u0487'; break;
	    case 'Mc': char = 'ि'; break;

	    case 'Pc': char = '⁀'; break;

	    case 'Zs': char = '\u2001'; break;

	    case 'L': char = 'Á'; break;
	    case 'Ltmo': char = 'ǅ'; break;
	  }
	  return {value: char}; // 💩
	};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function getMetaInfo(expr, grammarInterval) {
	  var metaInfo = {};
	  if (expr.source && grammarInterval) {
	    var adjusted = expr.source.relativeTo(grammarInterval);
	    metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
	  }
	  return metaInfo;
	}

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	pexprs.PExpr.prototype.outputRecipe = common.abstract('outputRecipe');

	pexprs.any.outputRecipe = function(formals, grammarInterval) {
	  return ['any', getMetaInfo(this, grammarInterval)];
	};

	pexprs.end.outputRecipe = function(formals, grammarInterval) {
	  return ['end', getMetaInfo(this, grammarInterval)];
	};

	pexprs.Terminal.prototype.outputRecipe = function(formals, grammarInterval) {
	  return [
	    'terminal',
	    getMetaInfo(this, grammarInterval),
	    this.obj
	  ];
	};

	pexprs.Range.prototype.outputRecipe = function(formals, grammarInterval) {
	  return [
	    'range',
	    getMetaInfo(this, grammarInterval),
	    this.from,
	    this.to
	  ];
	};

	pexprs.Param.prototype.outputRecipe = function(formals, grammarInterval) {
	  return [
	    'param',
	    getMetaInfo(this, grammarInterval),
	    this.index
	  ];
	};

	pexprs.Alt.prototype.outputRecipe = function(formals, grammarInterval) {
	  return [
	    'alt',
	    getMetaInfo(this, grammarInterval)
	  ].concat(this.terms.map(function(term) {
	    return term.outputRecipe(formals, grammarInterval);
	  }));
	};

	pexprs.Extend.prototype.outputRecipe = function(formals, grammarInterval) {
	  var extension = this.terms[0]; // [extension, orginal]
	  return extension.outputRecipe(formals, grammarInterval);
	};

	pexprs.Seq.prototype.outputRecipe = function(formals, grammarInterval) {
	  return [
	    'seq',
	    getMetaInfo(this, grammarInterval)
	  ].concat(this.factors.map(function(factor) {
	    return factor.outputRecipe(formals, grammarInterval);
	  }));
	};

	pexprs.Star.prototype.outputRecipe =
	pexprs.Plus.prototype.outputRecipe =
	pexprs.Opt.prototype.outputRecipe =
	pexprs.Not.prototype.outputRecipe =
	pexprs.Lookahead.prototype.outputRecipe =
	pexprs.Lex.prototype.outputRecipe = function(formals, grammarInterval) {
	  return [
	    this.constructor.name.toLowerCase(),
	    getMetaInfo(this, grammarInterval),
	    this.expr.outputRecipe(formals, grammarInterval)
	  ];
	};

	pexprs.Apply.prototype.outputRecipe = function(formals, grammarInterval) {
	  return [
	    'app',
	    getMetaInfo(this, grammarInterval),
	    this.ruleName,
	    this.args.map(function(arg) {
	      return arg.outputRecipe(formals, grammarInterval);
	    })
	  ];
	};

	pexprs.UnicodeChar.prototype.outputRecipe = function(formals, grammarInterval) {
	  return [
	    'unicodeChar',
	    getMetaInfo(this, grammarInterval),
	    this.category
	  ];
	};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	/*
	  Called at grammar creation time to rewrite a rule body, replacing each reference to a formal
	  parameter with a `Param` node. Returns a PExpr -- either a new one, or the original one if
	  it was modified in place.
	*/
	pexprs.PExpr.prototype.introduceParams = common.abstract('introduceParams');

	pexprs.any.introduceParams =
	pexprs.end.introduceParams =
	pexprs.Terminal.prototype.introduceParams =
	pexprs.Range.prototype.introduceParams =
	pexprs.Param.prototype.introduceParams =
	pexprs.UnicodeChar.prototype.introduceParams = function(formals) {
	  return this;
	};

	pexprs.Alt.prototype.introduceParams = function(formals) {
	  this.terms.forEach(function(term, idx, terms) {
	    terms[idx] = term.introduceParams(formals);
	  });
	  return this;
	};

	pexprs.Seq.prototype.introduceParams = function(formals) {
	  this.factors.forEach(function(factor, idx, factors) {
	    factors[idx] = factor.introduceParams(formals);
	  });
	  return this;
	};

	pexprs.Iter.prototype.introduceParams =
	pexprs.Not.prototype.introduceParams =
	pexprs.Lookahead.prototype.introduceParams =
	pexprs.Lex.prototype.introduceParams = function(formals) {
	  this.expr = this.expr.introduceParams(formals);
	  return this;
	};

	pexprs.Apply.prototype.introduceParams = function(formals) {
	  var index = formals.indexOf(this.ruleName);
	  if (index >= 0) {
	    if (this.args.length > 0) {
	      // TODO: Should this be supported? See issue #64.
	      throw new Error('Parameterized rules cannot be passed as arguments to another rule.');
	    }
	    return new pexprs.Param(index);
	  } else {
	    this.args.forEach(function(arg, idx, args) {
	      args[idx] = arg.introduceParams(formals);
	    });
	    return this;
	  }
	};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	// Returns `true` if this parsing expression may accept without consuming any input.
	pexprs.PExpr.prototype.isNullable = function(grammar) {
	  return this._isNullable(grammar, Object.create(null));
	};

	pexprs.PExpr.prototype._isNullable = common.abstract('_isNullable');

	pexprs.any._isNullable =
	pexprs.Range.prototype._isNullable =
	pexprs.Param.prototype._isNullable =
	pexprs.Plus.prototype._isNullable =
	pexprs.UnicodeChar.prototype._isNullable = function(grammar, memo) {
	  return false;
	};

	pexprs.end._isNullable = function(grammar, memo) {
	  return true;
	};

	pexprs.Terminal.prototype._isNullable = function(grammar, memo) {
	  if (typeof this.obj === 'string') {
	    // This is an over-simplification: it's only correct if the input is a string. If it's an array
	    // or an object, then the empty string parsing expression is not nullable.
	    return this.obj === '';
	  } else {
	    return false;
	  }
	};

	pexprs.Alt.prototype._isNullable = function(grammar, memo) {
	  return this.terms.length === 0 ||
	      this.terms.some(function(term) { return term._isNullable(grammar, memo); });
	};

	pexprs.Seq.prototype._isNullable = function(grammar, memo) {
	  return this.factors.every(function(factor) { return factor._isNullable(grammar, memo); });
	};

	pexprs.Star.prototype._isNullable =
	pexprs.Opt.prototype._isNullable =
	pexprs.Not.prototype._isNullable =
	pexprs.Lookahead.prototype._isNullable = function(grammar, memo) {
	  return true;
	};

	pexprs.Lex.prototype._isNullable = function(grammar, memo) {
	  return this.expr._isNullable(grammar, memo);
	};

	pexprs.Apply.prototype._isNullable = function(grammar, memo) {
	  var key = this.toMemoKey();
	  if (!Object.prototype.hasOwnProperty.call(memo, key)) {
	    var body = grammar.rules[this.ruleName].body;
	    var inlined = body.substituteParams(this.args);
	    memo[key] = false;  // Prevent infinite recursion for recursive rules.
	    memo[key] = inlined._isNullable(grammar, memo);
	  }
	  return memo[key];
	};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	/*
	  Returns a PExpr that results from recursively replacing every formal parameter (i.e., instance
	  of `Param`) inside this PExpr with its actual value from `actuals` (an Array).

	  The receiver must not be modified; a new PExpr must be returned if any replacement is necessary.
	*/
	// function(actuals) { ... }
	pexprs.PExpr.prototype.substituteParams = common.abstract('substituteParams');

	pexprs.any.substituteParams =
	pexprs.end.substituteParams =
	pexprs.Terminal.prototype.substituteParams =
	pexprs.Range.prototype.substituteParams =
	pexprs.UnicodeChar.prototype.substituteParams = function(actuals) {
	  return this;
	};

	pexprs.Param.prototype.substituteParams = function(actuals) {
	  return actuals[this.index];
	};

	pexprs.Alt.prototype.substituteParams = function(actuals) {
	  return new pexprs.Alt(
	      this.terms.map(function(term) { return term.substituteParams(actuals); }));
	};

	pexprs.Seq.prototype.substituteParams = function(actuals) {
	  return new pexprs.Seq(
	      this.factors.map(function(factor) { return factor.substituteParams(actuals); }));
	};

	pexprs.Iter.prototype.substituteParams =
	pexprs.Not.prototype.substituteParams =
	pexprs.Lookahead.prototype.substituteParams =
	pexprs.Lex.prototype.substituteParams = function(actuals) {
	  return new this.constructor(this.expr.substituteParams(actuals));
	};

	pexprs.Apply.prototype.substituteParams = function(actuals) {
	  if (this.args.length === 0) {
	    // Avoid making a copy of this application, as an optimization
	    return this;
	  } else {
	    var args = this.args.map(function(arg) { return arg.substituteParams(actuals); });
	    return new pexprs.Apply(this.ruleName, args);
	  }
	};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	// Returns a string representing the PExpr, for use as a UI label, etc.
	pexprs.PExpr.prototype.toDisplayString = common.abstract('toDisplayString');

	pexprs.Alt.prototype.toDisplayString =
	pexprs.Seq.prototype.toDisplayString = function() {
	  if (this.source) {
	    return this.source.trimmed().contents;
	  }
	  return '[' + this.constructor.name + ']';
	};

	pexprs.any.toDisplayString =
	pexprs.end.toDisplayString =
	pexprs.Iter.prototype.toDisplayString =
	pexprs.Not.prototype.toDisplayString =
	pexprs.Lookahead.prototype.toDisplayString =
	pexprs.Lex.prototype.toDisplayString =
	pexprs.Terminal.prototype.toDisplayString =
	pexprs.Range.prototype.toDisplayString =
	pexprs.Param.prototype.toDisplayString = function() {
	  return this.toString();
	};

	pexprs.Apply.prototype.toDisplayString = function() {
	  if (this.args.length > 0) {
	    var ps = this.args.map(function(arg) { return arg.toDisplayString(); });
	    return this.ruleName + '<' + ps.join(',') + '>';
	  } else {
	    return this.ruleName;
	  }
	};

	pexprs.UnicodeChar.prototype.toDisplayString = function() {
	  return 'Unicode [' + this.category + '] character';
	};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var pexprs = __webpack_require__(12);

	var copyWithoutDuplicates = common.copyWithoutDuplicates;

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function isRestrictedJSIdentifier(str) {
	  return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(str);
	}

	function resolveDuplicatedNames(argumentNameList) {
	  // `count` is used to record the number of times each argument name occurs in the list,
	  // this is useful for checking duplicated argument name. It maps argument names to ints.
	  var count = Object.create(null);
	  argumentNameList.forEach(function(argName) {
	    count[argName] = (count[argName] || 0) + 1;
	  });

	  // Append subscripts ('_1', '_2', ...) to duplicate argument names.
	  Object.keys(count).forEach(function(dupArgName) {
	    if (count[dupArgName] <= 1) {
	      return;
	    }

	    // This name shows up more than once, so add subscripts.
	    var subscript = 1;
	    argumentNameList.forEach(function(argName, idx) {
	      if (argName === dupArgName) {
	        argumentNameList[idx] = argName + '_' + subscript++;
	      }
	    });
	  });
	}

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	/*
	  Returns a list of strings that will be used as the default argument names for its receiver
	  (a pexpr) in a semantic action. This is used exclusively by the Semantics Editor.

	  `firstArgIndex` is the 1-based index of the first argument name that will be generated for this
	  pexpr. It enables us to name arguments positionally, e.g., if the second argument is a
	  non-alphanumeric terminal like "+", it will be named '$2'.

	  `noDupCheck` is true if the caller of `toArgumentNameList` is not a top level caller. It enables
	  us to avoid nested duplication subscripts appending, e.g., '_1_1', '_1_2', by only checking
	  duplicates at the top level.

	  Here is a more elaborate example that illustrates how this method works:
	  `(a "+" b).toArgumentNameList(1)` evaluates to `['a', '$2', 'b']` with the following recursive
	  calls:

	    (a).toArgumentNameList(1) -> ['a'],
	    ("+").toArgumentNameList(2) -> ['$2'],
	    (b).toArgumentNameList(3) -> ['b']

	  Notes:
	  * This method must only be called on well-formed expressions, e.g., the receiver must
	    not have any Alt sub-expressions with inconsistent arities.
	  * e.getArity() === e.toArgumentNameList(1).length
	*/
	// function(firstArgIndex, noDupCheck) { ... }
	pexprs.PExpr.prototype.toArgumentNameList = common.abstract('toArgumentNameList');

	pexprs.any.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  return ['any'];
	};

	pexprs.end.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  return ['end'];
	};

	pexprs.Terminal.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  if (typeof this.obj === 'string' && /^[_a-zA-Z0-9]+$/.test(this.obj)) {
	    // If this terminal is a valid suffix for a JS identifier, just prepend it with '_'
	    return ['_' + this.obj];
	  } else {
	    // Otherwise, name it positionally.
	    return ['$' + firstArgIndex];
	  }
	};

	pexprs.Range.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  var argName = this.from + '_to_' + this.to;
	  // If the `argName` is not valid then try to prepend a `_`.
	  if (!isRestrictedJSIdentifier(argName)) {
	    argName = '_' + argName;
	  }
	  // If the `argName` still not valid after prepending a `_`, then name it positionally.
	  if (!isRestrictedJSIdentifier(argName)) {
	    argName = '$' + firstArgIndex;
	  }
	  return [argName];
	};

	pexprs.Alt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  // `termArgNameLists` is an array of arrays where each row is the
	  // argument name list that corresponds to a term in this alternation.
	  var termArgNameLists = this.terms.map(function(term) {
	    return term.toArgumentNameList(firstArgIndex, true);
	  });

	  var argumentNameList = [];
	  var numArgs = termArgNameLists[0].length;
	  for (var colIdx = 0; colIdx < numArgs; colIdx++) {
	    var col = [];
	    for (var rowIdx = 0; rowIdx < this.terms.length; rowIdx++) {
	      col.push(termArgNameLists[rowIdx][colIdx]);
	    }
	    var uniqueNames = copyWithoutDuplicates(col);
	    argumentNameList.push(uniqueNames.join('_or_'));
	  }

	  if (!noDupCheck) {
	    resolveDuplicatedNames(argumentNameList);
	  }
	  return argumentNameList;
	};

	pexprs.Seq.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  // Generate the argument name list, without worrying about duplicates.
	  var argumentNameList = [];
	  this.factors.forEach(function(factor) {
	    var factorArgumentNameList = factor.toArgumentNameList(firstArgIndex, true);
	    argumentNameList = argumentNameList.concat(factorArgumentNameList);

	    // Shift the firstArgIndex to take this factor's argument names into account.
	    firstArgIndex += factorArgumentNameList.length;
	  });
	  if (!noDupCheck) {
	    resolveDuplicatedNames(argumentNameList);
	  }
	  return argumentNameList;
	};

	pexprs.Iter.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  var argumentNameList = this.expr.toArgumentNameList(firstArgIndex, noDupCheck)
	    .map(function(exprArgumentString) {
	      return exprArgumentString[exprArgumentString.length - 1] === 's' ?
	          exprArgumentString + 'es' :
	          exprArgumentString + 's';
	    });
	  if (!noDupCheck) {
	    resolveDuplicatedNames(argumentNameList);
	  }
	  return argumentNameList;
	};

	pexprs.Opt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck).map(function(argName) {
	    return 'opt' + argName[0].toUpperCase() + argName.slice(1);
	  });
	};

	pexprs.Not.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  return [];
	};

	pexprs.Lookahead.prototype.toArgumentNameList =
	pexprs.Lex.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck);
	};

	pexprs.Apply.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  return [this.ruleName];
	};

	pexprs.UnicodeChar.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  return ['$' + firstArgIndex];
	};

	pexprs.Param.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
	  return ['param' + this.index];
	};

	// "Value pexprs" (Value, Str, Arr, Obj) are going away soon, so we don't worry about them here.


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var Failure = __webpack_require__(7);
	var common = __webpack_require__(10);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	pexprs.PExpr.prototype.toFailure = common.abstract('toFailure');

	pexprs.any.toFailure = function(grammar) {
	  return new Failure(this, 'any object', 'description');
	};

	pexprs.end.toFailure = function(grammar) {
	  return new Failure(this, 'end of input', 'description');
	};

	pexprs.Terminal.prototype.toFailure = function(grammar) {
	  return new Failure(this, this.obj, 'string');
	};

	pexprs.Range.prototype.toFailure = function(grammar) {
	  // TODO: come up with something better
	  return new Failure(this, JSON.stringify(this.from) + '..' + JSON.stringify(this.to), 'code');
	};

	pexprs.Not.prototype.toFailure = function(grammar) {
	  var description = this.expr === pexprs.any ?
	      'nothing' :
	      'not ' + this.expr.toFailure(grammar);
	  return new Failure(this, description, 'description');
	};

	pexprs.Lookahead.prototype.toFailure = function(grammar) {
	  return this.expr.toFailure(grammar);
	};

	pexprs.Apply.prototype.toFailure = function(grammar) {
	  var description = grammar.rules[this.ruleName].description;
	  if (!description) {
	    var article = (/^[aeiouAEIOU]/.test(this.ruleName) ? 'an' : 'a');
	    description = article + ' ' + this.ruleName;
	  }
	  return new Failure(this, description, 'description');
	};

	pexprs.UnicodeChar.prototype.toFailure = function(grammar) {
	  return new Failure(this, 'a Unicode [' + this.category + '] character', 'description');
	};

	pexprs.Alt.prototype.toFailure = function(grammar) {
	  var fs = this.terms.map(function(t) { return t.toFailure(); });
	  var description = '(' + fs.join(' or ') + ')';
	  return new Failure(this, description, 'description');
	};

	pexprs.Seq.prototype.toFailure = function(grammar) {
	  var fs = this.factors.map(function(f) { return f.toFailure(); });
	  var description = '(' + fs.join(' ') + ')';
	  return new Failure(this, description, 'description');
	};

	pexprs.Iter.prototype.toFailure = function(grammar) {
	  var description = '(' + this.expr.toFailure() + this.operator + ')';
	  return new Failure(this, description, 'description');
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	/*
	  e1.toString() === e2.toString() ==> e1 and e2 are semantically equivalent.
	  Note that this is not an iff (<==>): e.g.,
	  (~"b" "a").toString() !== ("a").toString(), even though
	  ~"b" "a" and "a" are interchangeable in any grammar,
	  both in terms of the languages they accept and their arities.
	*/
	pexprs.PExpr.prototype.toString = common.abstract('toString');

	pexprs.any.toString = function() {
	  return 'any';
	};

	pexprs.end.toString = function() {
	  return 'end';
	};

	pexprs.Terminal.prototype.toString = function() {
	  return JSON.stringify(this.obj);
	};

	pexprs.Range.prototype.toString = function() {
	  return JSON.stringify(this.from) + '..' + JSON.stringify(this.to);
	};

	pexprs.Param.prototype.toString = function() {
	  return '$' + this.index;
	};

	pexprs.Lex.prototype.toString = function() {
	  return '#(' + this.expr.toString() + ')';
	};

	pexprs.Alt.prototype.toString = function() {
	  return this.terms.length === 1 ?
	    this.terms[0].toString() :
	    '(' + this.terms.map(function(term) { return term.toString(); }).join(' | ') + ')';
	};

	pexprs.Seq.prototype.toString = function() {
	  return this.factors.length === 1 ?
	    this.factors[0].toString() :
	    '(' + this.factors.map(function(factor) { return factor.toString(); }).join(' ') + ')';
	};

	pexprs.Iter.prototype.toString = function() {
	  return this.expr + this.operator;
	};

	pexprs.Not.prototype.toString = function() {
	  return '~' + this.expr;
	};

	pexprs.Lookahead.prototype.toString = function() {
	  return '&' + this.expr;
	};

	pexprs.Apply.prototype.toString = function() {
	  if (this.args.length > 0) {
	    var ps = this.args.map(function(arg) { return arg.toString(); });
	    return this.ruleName + '<' + ps.join(',') + '>';
	  } else {
	    return this.ruleName;
	  }
	};

	pexprs.UnicodeChar.prototype.toString = function() {
	  return '\\p{' + this.category + '}';
	};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var MatchState = __webpack_require__(36);

	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function Matcher(grammar) {
	  this.grammar = grammar;
	  this.memoTable = [];
	  this.input = '';
	}

	Matcher.prototype.getInput = function() {
	  return this.input;
	};

	Matcher.prototype.setInput = function(str) {
	  if (this.input !== str) {
	    this.replaceInputRange(0, this.input.length, str);
	  }
	  return this;
	};

	Matcher.prototype.replaceInputRange = function(startIdx, endIdx, str) {
	  var currentInput = this.input;
	  if (startIdx < 0 || startIdx > currentInput.length ||
	      endIdx < 0 || endIdx > currentInput.length ||
	      startIdx > endIdx) {
	    throw new Error('Invalid indices: ' + startIdx + ' and ' + endIdx);
	  }

	  // update input
	  this.input = currentInput.slice(0, startIdx) + str + currentInput.slice(endIdx);

	  // update memo table (similar to the above)
	  var restOfMemoTable = this.memoTable.slice(endIdx);
	  this.memoTable.length = startIdx;
	  for (var idx = 0; idx < str.length; idx++) {
	    this.memoTable.push(undefined);
	  }
	  restOfMemoTable.forEach(
	      function(posInfo) { this.memoTable.push(posInfo); },
	      this);

	  // Invalidate memoRecs
	  for (var pos = 0; pos < startIdx; pos++) {
	    var posInfo = this.memoTable[pos];
	    if (posInfo) {
	      posInfo.clearObsoleteEntries(pos, startIdx);
	    }
	  }

	  return this;
	};

	Matcher.prototype.match = function(optStartApplicationStr) {
	  return this._match(this._getStartExpr(optStartApplicationStr), false);
	};

	Matcher.prototype.trace = function(optStartApplicationStr) {
	  return this._match(this._getStartExpr(optStartApplicationStr), true);
	};

	Matcher.prototype._match = function(startExpr, tracing, optPositionToRecordFailures) {
	  var state = new MatchState(this, startExpr, optPositionToRecordFailures);
	  return tracing ? state.getTrace() : state.getMatchResult();
	};

	/*
	  Returns the starting expression for this Matcher's associated grammar. If `optStartApplicationStr`
	  is specified, it is a string expressing a rule application in the grammar. If not specified, the
	  grammar's default start rule will be used.
	*/
	Matcher.prototype._getStartExpr = function(optStartApplicationStr) {
	  var applicationStr = optStartApplicationStr || this.grammar.defaultStartRule;
	  if (!applicationStr) {
	    throw new Error('Missing start rule argument -- the grammar has no default start rule.');
	  }

	  var startApp = this.grammar.parseApplication(applicationStr);
	  return new pexprs.Seq([startApp, pexprs.end]);
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = Matcher;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var InputStream = __webpack_require__(37);
	var MatchResult = __webpack_require__(38);
	var PosInfo = __webpack_require__(39);
	var Trace = __webpack_require__(22);
	var pexprs = __webpack_require__(12);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	var applySpaces = new pexprs.Apply('spaces');

	function MatchState(matcher, startExpr, optPositionToRecordFailures) {
	  this.matcher = matcher;
	  this.startExpr = startExpr;

	  this.grammar = matcher.grammar;
	  this.input = matcher.input;
	  this.inputStream = new InputStream(matcher.input);
	  this.memoTable = matcher.memoTable;

	  this._bindings = [];
	  this._bindingOffsets = [];
	  this._applicationStack = [];
	  this._posStack = [0];
	  this.inLexifiedContextStack = [false];

	  this.rightmostFailurePosition = -1;
	  this._rightmostFailurePositionStack = [];
	  this._recordedFailuresStack = [];

	  if (optPositionToRecordFailures !== undefined) {
	    this.positionToRecordFailures = optPositionToRecordFailures;
	    this.recordedFailures = Object.create(null);
	  }
	}

	MatchState.prototype = {
	  posToOffset: function(pos) {
	    return pos - this._posStack[this._posStack.length - 1];
	  },

	  enterApplication: function(posInfo, app) {
	    this._posStack.push(this.inputStream.pos);
	    this._applicationStack.push(app);
	    this.inLexifiedContextStack.push(false);
	    posInfo.enter(app);
	    this._rightmostFailurePositionStack.push(this.rightmostFailurePosition);
	    this.rightmostFailurePosition = -1;
	  },

	  exitApplication: function(posInfo, optNode) {
	    var origPos = this._posStack.pop();
	    this._applicationStack.pop();
	    this.inLexifiedContextStack.pop();
	    posInfo.exit();

	    this.rightmostFailurePosition = Math.max(
	        this.rightmostFailurePosition,
	        this._rightmostFailurePositionStack.pop());

	    if (optNode) {
	      this.pushBinding(optNode, origPos);
	    }
	  },

	  enterLexifiedContext: function() {
	    this.inLexifiedContextStack.push(true);
	  },

	  exitLexifiedContext: function() {
	    this.inLexifiedContextStack.pop();
	  },

	  currentApplication: function() {
	    return this._applicationStack[this._applicationStack.length - 1];
	  },

	  inSyntacticContext: function() {
	    if (typeof this.inputStream.source !== 'string') {
	      return false;
	    }
	    var currentApplication = this.currentApplication();
	    if (currentApplication) {
	      return currentApplication.isSyntactic() && !this.inLexifiedContext();
	    } else {
	      // The top-level context is syntactic if the start application is.
	      return this.startExpr.factors[0].isSyntactic();
	    }
	  },

	  inLexifiedContext: function() {
	    return this.inLexifiedContextStack[this.inLexifiedContextStack.length - 1];
	  },

	  skipSpaces: function() {
	    this.pushFailuresInfo();
	    this.eval(applySpaces);
	    this.popBinding();
	    this.popFailuresInfo();
	    return this.inputStream.pos;
	  },

	  skipSpacesIfInSyntacticContext: function() {
	    return this.inSyntacticContext() ?
	        this.skipSpaces() :
	        this.inputStream.pos;
	  },

	  maybeSkipSpacesBefore: function(expr) {
	    if (expr instanceof pexprs.Apply && expr.isSyntactic()) {
	      return this.skipSpaces();
	    } else if (expr.allowsSkippingPrecedingSpace() && expr !== applySpaces) {
	      return this.skipSpacesIfInSyntacticContext();
	    } else {
	      return this.inputStream.pos;
	    }
	  },

	  pushBinding: function(node, origPos) {
	    this._bindings.push(node);
	    this._bindingOffsets.push(this.posToOffset(origPos));
	  },

	  popBinding: function() {
	    this._bindings.pop();
	    this._bindingOffsets.pop();
	  },

	  numBindings: function() {
	    return this._bindings.length;
	  },

	  truncateBindings: function(newLength) {
	    // Yes, this is this really faster than setting the `length` property (tested with
	    // bin/es5bench on Node v6.1.0).
	    while (this._bindings.length > newLength) {
	      this.popBinding();
	    }
	  },

	  getCurrentPosInfo: function() {
	    return this.getPosInfo(this.inputStream.pos);
	  },

	  getPosInfo: function(pos) {
	    var posInfo = this.memoTable[pos];
	    if (!posInfo) {
	      posInfo = this.memoTable[pos] = new PosInfo();
	    }
	    return posInfo;
	  },

	  processFailure: function(pos, expr) {
	    this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, pos);

	    if (this.recordedFailures && pos === this.positionToRecordFailures) {
	      var app = this.currentApplication();
	      if (app) {
	        // Substitute parameters with the actual pexprs that were passed to
	        // the current rule.
	        expr = expr.substituteParams(app.args);
	      } else {
	        // This branch is only reached for the "end-check" that is
	        // performed after the top-level application. In that case,
	        // expr === pexprs.end so there is no need to substitute
	        // parameters.
	      }

	      this.recordFailure(expr.toFailure(this.grammar), false);
	    }
	  },

	  recordFailure: function(failure, shouldCloneIfNew) {
	    var key = failure.toKey();
	    if (!this.recordedFailures[key]) {
	      this.recordedFailures[key] = shouldCloneIfNew ? failure.clone() : failure;
	    } else if (this.recordedFailures[key].isFluffy() && !failure.isFluffy()) {
	      this.recordedFailures[key].clearFluffy();
	    }
	  },

	  recordFailures: function(failures, shouldCloneIfNew) {
	    var self = this;
	    Object.keys(failures).forEach(function(key) {
	      self.recordFailure(failures[key], shouldCloneIfNew);
	    });
	  },

	  cloneRecordedFailures: function() {
	    if (!this.recordedFailures) {
	      return undefined;
	    }

	    var ans = Object.create(null);
	    var self = this;
	    Object.keys(this.recordedFailures).forEach(function(key) {
	      ans[key] = self.recordedFailures[key].clone();
	    });
	    return ans;
	  },

	  getRightmostFailurePosition: function() {
	    return this.rightmostFailurePosition;
	  },

	  _getRightmostFailureOffset: function() {
	    return this.rightmostFailurePosition >= 0 ?
	        this.posToOffset(this.rightmostFailurePosition) :
	        -1;
	  },

	  // Returns the memoized trace entry for `expr` at `pos`, if one exists, `null` otherwise.
	  getMemoizedTraceEntry: function(pos, expr) {
	    var posInfo = this.memoTable[pos];
	    if (posInfo && expr.ruleName) {
	      var memoRec = posInfo.memo[expr.toMemoKey()];
	      if (memoRec && memoRec.traceEntry) {
	        var entry = memoRec.traceEntry.cloneWithExpr(expr);
	        entry.isMemoized = true;
	        return entry;
	      }
	    }
	    return null;
	  },

	  // Returns a new trace entry, with the currently active trace array as its children.
	  getTraceEntry: function(pos, expr, succeeded, bindings) {
	    if (expr instanceof pexprs.Apply) {
	      var app = this.currentApplication();
	      var actuals = app ? app.args : [];
	      expr = expr.substituteParams(actuals);
	    }
	    return this.getMemoizedTraceEntry(pos, expr) ||
	           new Trace(this.input, pos, this.inputStream.pos, expr, succeeded, bindings, this.trace);
	  },

	  isTracing: function() {
	    return !!this.trace;
	  },

	  hasNecessaryInfo: function(memoRec) {
	    if (this.trace && !memoRec.traceEntry) {
	      return false;
	    }

	    if (this.recordedFailures &&
	        this.inputStream.pos + memoRec.rightmostFailureOffset === this.positionToRecordFailures) {
	      return !!memoRec.failuresAtRightmostPosition;
	    }

	    return true;
	  },


	  useMemoizedResult: function(origPos, memoRec) {
	    if (this.trace) {
	      this.trace.push(memoRec.traceEntry);
	    }

	    var memoRecRightmostFailurePosition = this.inputStream.pos + memoRec.rightmostFailureOffset;
	    this.rightmostFailurePosition =
	        Math.max(this.rightmostFailurePosition, memoRecRightmostFailurePosition);
	    if (this.recordedFailures &&
	        this.positionToRecordFailures === memoRecRightmostFailurePosition &&
	        memoRec.failuresAtRightmostPosition) {
	      this.recordFailures(memoRec.failuresAtRightmostPosition, true);
	    }

	    this.inputStream.examinedLength =
	        Math.max(this.inputStream.examinedLength, memoRec.examinedLength + origPos);

	    if (memoRec.value) {
	      this.inputStream.pos += memoRec.matchLength;
	      this.pushBinding(memoRec.value, origPos);
	      return true;
	    }
	    return false;
	  },

	  // Evaluate `expr` and return `true` if it succeeded, `false` otherwise. On success, `bindings`
	  // will have `expr.getArity()` more elements than before, and the input stream's position may
	  // have increased. On failure, `bindings` and position will be unchanged.
	  eval: function(expr) {
	    var inputStream = this.inputStream;
	    var origNumBindings = this._bindings.length;

	    var origRecordedFailures;
	    if (this.recordedFailures) {
	      origRecordedFailures = this.recordedFailures;
	      this.recordedFailures = Object.create(null);
	    }

	    var origPos = inputStream.pos;
	    var memoPos = this.maybeSkipSpacesBefore(expr);

	    var origTrace;
	    if (this.trace) {
	      origTrace = this.trace;
	      this.trace = [];
	    }

	    // Do the actual evaluation.
	    var ans = expr.eval(this);

	    if (this.trace) {
	      var bindings = this._bindings.slice(origNumBindings);
	      var traceEntry = this.getTraceEntry(memoPos, expr, ans, bindings);
	      traceEntry.isImplicitSpaces = expr === applySpaces;
	      traceEntry.isRootNode = expr === this.startExpr;
	      origTrace.push(traceEntry);
	      this.trace = origTrace;
	    }

	    if (ans) {
	      if (this.recordedFailures && inputStream.pos === this.positionToRecordFailures) {
	        var self = this;
	        Object.keys(this.recordedFailures).forEach(function(key) {
	          self.recordedFailures[key].makeFluffy();
	        });
	      }
	    } else {
	      // Reset the position and the bindings.
	      inputStream.pos = origPos;
	      this.truncateBindings(origNumBindings);
	    }

	    if (this.recordedFailures) {
	      this.recordFailures(origRecordedFailures, false);
	    }

	    return ans;
	  },

	  getMatchResult: function() {
	    this.eval(this.startExpr);
	    var rightmostFailures;
	    if (this.recordedFailures) {
	      var self = this;
	      rightmostFailures = Object.keys(this.recordedFailures).map(function(key) {
	        return self.recordedFailures[key];
	      });
	    }
	    return new MatchResult(
	        this.matcher,
	        this.input,
	        this.startExpr,
	        this._bindings[0],
	        this._bindingOffsets[0],
	        this.rightmostFailurePosition,
	        rightmostFailures);
	  },

	  getTrace: function() {
	    this.trace = [];
	    var matchResult = this.getMatchResult();

	    // The trace node for the start rule is always the last entry. If it is a syntactic rule,
	    // the first entry is for an application of 'spaces'.
	    // TODO(pdubroy): Clean this up by introducing a special `Match<startAppl>` rule, which will
	    // ensure that there is always a single root trace node.
	    var rootTrace = this.trace[this.trace.length - 1];
	    rootTrace.result = matchResult;
	    return rootTrace;
	  },

	  pushFailuresInfo: function() {
	    this._rightmostFailurePositionStack.push(this.rightmostFailurePosition);
	    this._recordedFailuresStack.push(this.recordedFailures);
	  },

	  popFailuresInfo: function() {
	    this.rightmostFailurePosition = this._rightmostFailurePositionStack.pop();
	    this.recordedFailures = this._recordedFailuresStack.pop();
	  }
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = MatchState;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var Interval = __webpack_require__(23);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function InputStream(source) {
	  this.source = source;
	  this.pos = 0;
	  this.examinedLength = 0;
	}

	InputStream.prototype = {
	  atEnd: function() {
	    var ans = this.pos === this.source.length;
	    this.examinedLength = Math.max(this.examinedLength, this.pos + 1);
	    return ans;
	  },

	  next: function() {
	    var ans = this.source[this.pos++];
	    this.examinedLength = Math.max(this.examinedLength, this.pos);
	    return ans;
	  },

	  matchString: function(s, optIgnoreCase) {
	    var idx;
	    if (optIgnoreCase) {
	      /*
	        Case-insensitive comparison is a tricky business. Some notable gotchas include the
	        "Turkish I" problem (http://www.i18nguy.com/unicode/turkish-i18n.html) and the fact
	        that the German Esszet (ß) turns into "SS" in upper case.

	        This is intended to be a locale-invariant comparison, which means it may not obey
	        locale-specific expectations (e.g. "i" => "İ").
	       */
	      for (idx = 0; idx < s.length; idx++) {
	        var actual = this.next();
	        var expected = s[idx];
	        if (actual == null || actual.toUpperCase() !== expected.toUpperCase()) {
	          return false;
	        }
	      }
	      return true;
	    }
	    // Default is case-sensitive comparison.
	    for (idx = 0; idx < s.length; idx++) {
	      if (this.next() !== s[idx]) { return false; }
	    }
	    return true;
	  },

	  sourceSlice: function(startIdx, endIdx) {
	    return this.source.slice(startIdx, endIdx);
	  },

	  interval: function(startIdx, optEndIdx) {
	    return new Interval(this.source, startIdx, optEndIdx ? optEndIdx : this.pos);
	  }
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = InputStream;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var common = __webpack_require__(10);
	var util = __webpack_require__(24);
	var Interval = __webpack_require__(23);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function MatchResult(
	    matcher,
	    input,
	    startExpr,
	    cst,
	    cstOffset,
	    rightmostFailurePosition,
	    optRecordedFailures) {

	  this.matcher = matcher;
	  this.input = input;
	  this.startExpr = startExpr;
	  this._cst = cst;
	  this._cstOffset = cstOffset;
	  this._rightmostFailurePosition = rightmostFailurePosition;
	  this._rightmostFailures = optRecordedFailures;

	  if (this.failed()) {
	    common.defineLazyProperty(this, 'message', function() {
	      var detail = 'Expected ' + this.getExpectedText();
	      return util.getLineAndColumnMessage(this.input, this.getRightmostFailurePosition()) + detail;
	    });
	    common.defineLazyProperty(this, 'shortMessage', function() {
	      var detail = 'expected ' + this.getExpectedText();
	      var errorInfo = util.getLineAndColumn(this.input, this.getRightmostFailurePosition());
	      return 'Line ' + errorInfo.lineNum + ', col ' + errorInfo.colNum + ': ' + detail;
	    });
	  }
	}

	MatchResult.prototype.succeeded = function() {
	  return !!this._cst;
	};

	MatchResult.prototype.failed = function() {
	  return !this.succeeded();
	};

	MatchResult.prototype.getRightmostFailurePosition = function() {
	  return this._rightmostFailurePosition;
	};

	MatchResult.prototype.getRightmostFailures = function() {
	  if (!this._rightmostFailures) {
	    this.matcher.setInput(this.input);
	    var matchResultWithFailures =
	        this.matcher._match(this.startExpr, false, this.getRightmostFailurePosition());
	    this._rightmostFailures = matchResultWithFailures.getRightmostFailures();
	  }
	  return this._rightmostFailures;
	};

	MatchResult.prototype.toString = function() {
	  return this.succeeded() ?
	      '[match succeeded]' :
	      '[match failed at position ' + this.getRightmostFailurePosition() + ']';
	};

	// Return a string summarizing the expected contents of the input stream when
	// the match failure occurred.
	MatchResult.prototype.getExpectedText = function() {
	  if (this.succeeded()) {
	    throw new Error('cannot get expected text of a successful MatchResult');
	  }

	  var sb = new common.StringBuffer();
	  var failures = this.getRightmostFailures();

	  // Filter out the fluffy failures to make the default error messages more useful
	  failures = failures.filter(function(failure) {
	    return !failure.isFluffy();
	  });

	  for (var idx = 0; idx < failures.length; idx++) {
	    if (idx > 0) {
	      if (idx === failures.length - 1) {
	        sb.append(failures.length > 2 ? ', or ' : ' or ');
	      } else {
	        sb.append(', ');
	      }
	    }
	    sb.append(failures[idx].toString());
	  }
	  return sb.contents();
	};

	MatchResult.prototype.getInterval = function() {
	  var pos = this.getRightmostFailurePosition();
	  return new Interval(this.input, pos, pos);
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = MatchResult;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	'use strict';

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	function PosInfo() {
	  this.applicationMemoKeyStack = [];  // active applications at this position
	  this.memo = {};
	  this.maxExaminedLength = 0;
	  this.maxRightmostFailureOffset = -1;
	  this.currentLeftRecursion = undefined;
	}

	PosInfo.prototype = {
	  isActive: function(application) {
	    return this.applicationMemoKeyStack.indexOf(application.toMemoKey()) >= 0;
	  },

	  enter: function(application) {
	    this.applicationMemoKeyStack.push(application.toMemoKey());
	  },

	  exit: function() {
	    this.applicationMemoKeyStack.pop();
	  },

	  startLeftRecursion: function(headApplication, memoRec) {
	    memoRec.isLeftRecursion = true;
	    memoRec.headApplication = headApplication;
	    memoRec.nextLeftRecursion = this.currentLeftRecursion;
	    this.currentLeftRecursion = memoRec;

	    var applicationMemoKeyStack = this.applicationMemoKeyStack;
	    var indexOfFirstInvolvedRule = applicationMemoKeyStack.indexOf(headApplication.toMemoKey()) + 1;
	    var involvedApplicationMemoKeys = applicationMemoKeyStack.slice(indexOfFirstInvolvedRule);

	    memoRec.isInvolved = function(applicationMemoKey) {
	      return involvedApplicationMemoKeys.indexOf(applicationMemoKey) >= 0;
	    };

	    memoRec.updateInvolvedApplicationMemoKeys = function() {
	      for (var idx = indexOfFirstInvolvedRule; idx < applicationMemoKeyStack.length; idx++) {
	        var applicationMemoKey = applicationMemoKeyStack[idx];
	        if (!this.isInvolved(applicationMemoKey)) {
	          involvedApplicationMemoKeys.push(applicationMemoKey);
	        }
	      }
	    };
	  },

	  endLeftRecursion: function() {
	    this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
	  },

	  // Note: this method doesn't get called for the "head" of a left recursion -- for LR heads,
	  // the memoized result (which starts out being a failure) is always used.
	  shouldUseMemoizedResult: function(memoRec) {
	    if (!memoRec.isLeftRecursion) {
	      return true;
	    }
	    var applicationMemoKeyStack = this.applicationMemoKeyStack;
	    for (var idx = 0; idx < applicationMemoKeyStack.length; idx++) {
	      var applicationMemoKey = applicationMemoKeyStack[idx];
	      if (memoRec.isInvolved(applicationMemoKey)) {
	        return false;
	      }
	    }
	    return true;
	  },

	  memoize: function(memoKey, memoRec) {
	    this.memo[memoKey] = memoRec;
	    this.maxExaminedLength = Math.max(this.maxExaminedLength, memoRec.examinedLength);
	    this.maxRightmostFailureOffset =
	        Math.max(this.maxRightmostFailureOffset, memoRec.rightmostFailureOffset);
	    return memoRec;
	  },

	  clearObsoleteEntries: function(pos, invalidatedIdx) {
	    if (pos + this.maxExaminedLength <= invalidatedIdx) {
	      // Optimization: none of the rule applications that were memoized here examined the
	      // interval of the input that changed, so nothing has to be invalidated.
	      return;
	    }

	    var memo = this.memo;
	    this.maxExaminedLength = 0;
	    this.maxRightmostFailureOffset = -1;
	    var self = this;
	    Object.keys(memo).forEach(function(k) {
	      var memoRec = memo[k];
	      if (pos + memoRec.examinedLength > invalidatedIdx) {
	        delete memo[k];
	      } else {
	        self.maxExaminedLength = Math.max(self.maxExaminedLength, memoRec.examinedLength);
	        self.maxRightmostFailureOffset =
	            Math.max(self.maxRightmostFailureOffset, memoRec.rightmostFailureOffset);
	      }
	    });
	  }
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = PosInfo;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var Symbol = __webpack_require__(41);  // eslint-disable-line no-undef
	var inherits = __webpack_require__(9);

	var InputStream = __webpack_require__(37);
	var IterationNode = __webpack_require__(8).IterationNode;
	var MatchResult = __webpack_require__(38);
	var common = __webpack_require__(10);
	var errors = __webpack_require__(14);

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	// JSON is not a valid subset of JavaScript because there are two possible line terminators,
	// U+2028 (line separator) and U+2029 (paragraph separator) that are allowed in JSON strings
	// but not in JavaScript strings.
	// jsonToJS() properly encodes those two characters in JSON so that it can seamlessly be
	// inserted into JavaScript code (plus the encoded version is still valid JSON)
	function jsonToJS(str) {
	  var output = str.replace(/[\u2028\u2029]/g, function(char, pos, str) {
	    var hex = char.codePointAt(0).toString(16);
	    return '\\u' + '0000'.slice(hex.length) + hex;
	  });
	  return output;
	}

	// ----------------- Wrappers -----------------

	// Wrappers decorate CST nodes with all of the functionality (i.e., operations and attributes)
	// provided by a Semantics (see below). `Wrapper` is the abstract superclass of all wrappers. A
	// `Wrapper` must have `_node` and `_semantics` instance variables, which refer to the CST node and
	// Semantics (resp.) for which it was created, and a `_childWrappers` instance variable which is
	// used to cache the wrapper instances that are created for its child nodes. Setting these instance
	// variables is the responsibility of the constructor of each Semantics-specific subclass of
	// `Wrapper`.
	function Wrapper() {}

	Wrapper.prototype.toString = function() {
	  return '[semantics wrapper for ' + this._node.grammar.name + ']';
	};

	// This is used by ohm editor to display a node wrapper appropriately.
	Wrapper.prototype.toJSON = function() {
	  return this.toString();
	};

	Wrapper.prototype._forgetMemoizedResultFor = function(attributeName) {
	  // Remove the memoized attribute from the cstNode and all its children.
	  delete this._node[this._semantics.attributeKeys[attributeName]];
	  this.children.forEach(function(child) {
	    child._forgetMemoizedResultFor(attributeName);
	  });
	};

	// Returns the wrapper of the specified child node. Child wrappers are created lazily and cached in
	// the parent wrapper's `_childWrappers` instance variable.
	Wrapper.prototype.child = function(idx) {
	  if (!(0 <= idx && idx < this._node.numChildren())) {
	    // TODO: Consider throwing an exception here.
	    return undefined;
	  }
	  var childWrapper = this._childWrappers[idx];
	  if (!childWrapper) {
	    var childNode = this._node.childAt(idx);
	    var offset = this._node.childOffsets[idx];

	    var source = this._baseInterval.subInterval(offset, childNode.matchLength);
	    var base = childNode.isNonterminal() ? source : this._baseInterval;
	    childWrapper = this._childWrappers[idx] = this._semantics.wrap(childNode, source, base);
	  }
	  return childWrapper;
	};

	// Returns an array containing the wrappers of all of the children of the node associated with this
	// wrapper.
	Wrapper.prototype._children = function() {
	  // Force the creation of all child wrappers
	  for (var idx = 0; idx < this._node.numChildren(); idx++) {
	    this.child(idx);
	  }
	  return this._childWrappers;
	};

	// Returns `true` if the CST node associated with this wrapper corresponds to an iteration
	// expression, i.e., a Kleene-*, Kleene-+, or an optional. Returns `false` otherwise.
	Wrapper.prototype.isIteration = function() {
	  return this._node.isIteration();
	};

	// Returns `true` if the CST node associated with this wrapper is a terminal node, `false`
	// otherwise.
	Wrapper.prototype.isTerminal = function() {
	  return this._node.isTerminal();
	};

	// Returns `true` if the CST node associated with this wrapper is a nonterminal node, `false`
	// otherwise.
	Wrapper.prototype.isNonterminal = function() {
	  return this._node.isNonterminal();
	};

	// Returns `true` if the CST node associated with this wrapper is a nonterminal node
	// corresponding to a syntactic rule, `false` otherwise.
	Wrapper.prototype.isSyntactic = function() {
	  return this.isNonterminal() && this._node.isSyntactic();
	};

	// Returns `true` if the CST node associated with this wrapper is a nonterminal node
	// corresponding to a lexical rule, `false` otherwise.
	Wrapper.prototype.isLexical = function() {
	  return this.isNonterminal() && this._node.isLexical();
	};

	// Returns `true` if the CST node associated with this wrapper is an iterator node
	// having either one or no child (? operator), `false` otherwise.
	// Otherwise, throws an exception.
	Wrapper.prototype.isOptional = function() {
	  return this._node.isOptional();
	};

	// Create a new _iter wrapper in the same semantics as this wrapper.
	Wrapper.prototype.iteration = function(optChildWrappers) {
	  var childWrappers = optChildWrappers || [];

	  var childNodes = childWrappers.map(function(c) { return c._node; });
	  var iter = new IterationNode(this._node.grammar, childNodes, [], -1, false);

	  var wrapper = this._semantics.wrap(iter, null, null);
	  wrapper._childWrappers = childWrappers;
	  return wrapper;
	};

	Object.defineProperties(Wrapper.prototype, {
	  // Returns an array containing the children of this CST node.
	  children: {get: function() { return this._children(); }},

	  // Returns the name of grammar rule that created this CST node.
	  ctorName: {get: function() { return this._node.ctorName; }},

	  // TODO: Remove this eventually (deprecated in v0.12).
	  interval: {get: function() {
	    throw new Error('The `interval` property is deprecated -- use `source` instead');
	  }},

	  // Returns the number of children of this CST node.
	  numChildren: {get: function() { return this._node.numChildren(); }},

	  // Returns the primitive value of this CST node, if it's a terminal node. Otherwise,
	  // throws an exception.
	  primitiveValue: {
	    get: function() {
	      if (this.isTerminal()) {
	        return this._node.primitiveValue;
	      }
	      throw new TypeError(
	          "tried to access the 'primitiveValue' attribute of a non-terminal CST node");
	    }
	  },

	  // Returns the contents of the input stream consumed by this CST node.
	  sourceString: {get: function() { return this.source.contents; }}
	});

	// ----------------- Semantics -----------------

	// A Semantics is a container for a family of Operations and Attributes for a given grammar.
	// Semantics enable modularity (different clients of a grammar can create their set of operations
	// and attributes in isolation) and extensibility even when operations and attributes are mutually-
	// recursive. This constructor should not be called directly except from
	// `Semantics.createSemantics`. The normal ways to create a Semantics, given a grammar 'g', are
	// `g.createSemantics()` and `g.extendSemantics(parentSemantics)`.
	function Semantics(grammar, superSemantics) {
	  var self = this;
	  this.grammar = grammar;
	  this.checkedActionDicts = false;

	  // Constructor for wrapper instances, which are passed as the arguments to the semantic actions
	  // of an operation or attribute. Operations and attributes require double dispatch: the semantic
	  // action is chosen based on both the node's type and the semantics. Wrappers ensure that
	  // the `execute` method is called with the correct (most specific) semantics object as an
	  // argument.
	  this.Wrapper = function(node, sourceInterval, baseInterval) {
	    self.checkActionDictsIfHaventAlready();
	    this._semantics = self;
	    this._node = node;
	    this.source = sourceInterval;

	    // The interval that the childOffsets of `node` are relative to. It should be the source
	    // of the closest Nonterminal node.
	    this._baseInterval = baseInterval;

	    if (node.isNonterminal()) {
	      common.assert(sourceInterval === baseInterval);
	    }

	    this._childWrappers = [];
	  };

	  this.super = superSemantics;
	  if (superSemantics) {
	    if (!(grammar.equals(this.super.grammar) || grammar._inheritsFrom(this.super.grammar))) {
	      throw new Error(
	          "Cannot extend a semantics for grammar '" + this.super.grammar.name +
	          "' for use with grammar '" + grammar.name + "' (not a sub-grammar)");
	    }
	    inherits(this.Wrapper, this.super.Wrapper);
	    this.operations = Object.create(this.super.operations);
	    this.attributes = Object.create(this.super.attributes);
	    this.attributeKeys = Object.create(null);

	    // Assign unique symbols for each of the attributes inherited from the super-semantics so that
	    // they are memoized independently.
	    for (var attributeName in this.attributes) {
	      this.attributeKeys[attributeName] = Symbol();
	    }
	  } else {
	    inherits(this.Wrapper, Wrapper);
	    this.operations = Object.create(null);
	    this.attributes = Object.create(null);
	    this.attributeKeys = Object.create(null);
	  }
	}

	Semantics.prototype.toString = function() {
	  return '[semantics for ' + this.grammar.name + ']';
	};

	Semantics.prototype.checkActionDictsIfHaventAlready = function() {
	  if (!this.checkedActionDicts) {
	    this.checkActionDicts();
	    this.checkedActionDicts = true;
	  }
	};

	// Checks that the action dictionaries for all operations and attributes in this semantics,
	// including the ones that were inherited from the super-semantics, agree with the grammar.
	// Throws an exception if one or more of them doesn't.
	Semantics.prototype.checkActionDicts = function() {
	  var name;
	  for (name in this.operations) {
	    this.operations[name].checkActionDict(this.grammar);
	  }
	  for (name in this.attributes) {
	    this.attributes[name].checkActionDict(this.grammar);
	  }
	};

	Semantics.prototype.toRecipe = function(semanticsOnly) {
	  function hasSuperSemantics(s) {
	    return s.super !== Semantics.BuiltInSemantics._getSemantics();
	  }

	  var str = '(function(g) {\n';
	  if (hasSuperSemantics(this)) {
	    str += '  var semantics = ' + this.super.toRecipe(true) + '(g';

	    var superSemanticsGrammar = this.super.grammar;
	    var relatedGrammar = this.grammar;
	    while (relatedGrammar !== superSemanticsGrammar) {
	      str += '.superGrammar';
	      relatedGrammar = relatedGrammar.superGrammar;
	    }

	    str += ');\n';
	    str += '  return g.extendSemantics(semantics)';
	  } else {
	    str += '  return g.createSemantics()';
	  }
	  ['Operation', 'Attribute'].forEach(function(type) {
	    var semanticOperations = this[type.toLowerCase() + 's'];
	    Object.keys(semanticOperations).forEach(function(name) {
	      var signature = name;
	      if (semanticOperations[name].formals.length > 0) {
	        signature += '(' + semanticOperations[name].formals.join(', ') + ')';
	      }

	      var method;
	      if (hasSuperSemantics(this) && this.super[type.toLowerCase() + 's'][name]) {
	        method = 'extend' + type;
	      } else {
	        method = 'add' + type;
	      }
	      str += '\n    .' + method + '(' + JSON.stringify(signature) + ', {';

	      var actions = semanticOperations[name].actionDict;
	      var srcArray = [];
	      Object.keys(actions).forEach(function(actionName) {
	        if (semanticOperations[name].builtInDefault !== actions[actionName]) {
	          srcArray.push('\n      ' + JSON.stringify(actionName) + ': ' +
	            actions[actionName].toString());
	        }
	      });
	      str += srcArray.join(',');

	      str += '\n    })';
	    }, this);
	  }, this);
	  str += ';\n  })';

	  if (!semanticsOnly) {
	    str =
	      '(function() {\n' +
	      '  var grammar = this.fromRecipe(' + jsonToJS(this.grammar.toRecipe()) + ');\n' +
	      '  var semantics = ' + str + '(grammar);\n' +
	      '  return semantics;\n' +
	      '});\n';
	  }

	  return str;
	};

	var prototypeGrammar;
	var prototypeGrammarSemantics;

	// This method is called from main.js once Ohm has loaded.
	Semantics.initPrototypeParser = function(grammar) {
	  prototypeGrammarSemantics = grammar.createSemantics().addOperation('parse', {
	    AttributeSignature: function(name) {
	      return {
	        name: name.parse(),
	        formals: []
	      };
	    },
	    OperationSignature: function(name, optFormals) {
	      return {
	        name: name.parse(),
	        formals: optFormals.parse()[0] || []
	      };
	    },
	    Formals: function(oparen, fs, cparen) {
	      return fs.asIteration().parse();
	    },
	    name: function(first, rest) {
	      return this.sourceString;
	    }
	  });
	  prototypeGrammar = grammar;
	};

	function parseSignature(signature, type) {
	  if (!prototypeGrammar) {
	    // The Operations and Attributes grammar won't be available while Ohm is loading,
	    // but we can get away the following simplification b/c none of the operations
	    // that are used while loading take arguments.
	    common.assert(signature.indexOf('(') === -1);
	    return {
	      name: signature,
	      formals: []
	    };
	  }

	  var r = prototypeGrammar.match(
	      signature,
	      type === 'operation' ? 'OperationSignature' : 'AttributeSignature');
	  if (r.failed()) {
	    throw new Error(r.message);
	  }

	  return prototypeGrammarSemantics(r).parse();
	}

	function newDefaultAction(type, name, doIt) {
	  return function(children) {
	    var self = this;
	    var thisThing = this._semantics.operations[name] || this._semantics.attributes[name];
	    var args = thisThing.formals.map(function(formal) {
	      return self.args[formal];
	    });

	    if (this.isIteration()) {
	      // This CST node corresponds to an iteration expression in the grammar (*, +, or ?). The
	      // default behavior is to map this operation or attribute over all of its child nodes.
	      return children.map(function(child) { return doIt.apply(child, args); });
	    }

	    // This CST node corresponds to a non-terminal in the grammar (e.g., AddExpr). The fact that
	    // we got here means that this action dictionary doesn't have an action for this particular
	    // non-terminal or a generic `_nonterminal` action.
	    if (children.length === 1) {
	      // As a convenience, if this node only has one child, we just return the result of
	      // applying this operation / attribute to the child node.
	      return doIt.apply(children[0], args);
	    } else {
	      // Otherwise, we throw an exception to let the programmer know that we don't know what
	      // to do with this node.
	      throw errors.missingSemanticAction(
	          this.ctorName, name, type);
	    }
	  };
	}

	Semantics.prototype.addOperationOrAttribute = function(type, signature, actionDict) {
	  var typePlural = type + 's';

	  var parsedNameAndFormalArgs = parseSignature(signature, type);
	  var name = parsedNameAndFormalArgs.name;
	  var formals = parsedNameAndFormalArgs.formals;

	  // TODO: check that there are no duplicate formal arguments

	  this.assertNewName(name, type);

	  // Create the action dictionary for this operation / attribute that contains a `_default` action
	  // which defines the default behavior of iteration, terminal, and non-terminal nodes...
	  var builtInDefault = newDefaultAction(type, name, doIt);
	  var realActionDict = {_default: builtInDefault};
	  // ... and add in the actions supplied by the programmer, which may override some or all of the
	  // default ones.
	  Object.keys(actionDict).forEach(function(name) {
	    realActionDict[name] = actionDict[name];
	  });

	  var entry = type === 'operation' ?
	      new Operation(name, formals, realActionDict, builtInDefault) :
	      new Attribute(name, realActionDict, builtInDefault);

	  // The following check is not strictly necessary (it will happen later anyway) but it's better to
	  // catch errors early.
	  entry.checkActionDict(this.grammar);

	  this[typePlural][name] = entry;

	  function doIt() {
	    // Dispatch to most specific version of this operation / attribute -- it may have been
	    // overridden by a sub-semantics.
	    var thisThing = this._semantics[typePlural][name];

	    // Check that the caller passed the correct number of arguments.
	    if (arguments.length !== thisThing.formals.length) {
	      throw new Error(
	          'Invalid number of arguments passed to ' + name + ' ' + type + ' (expected ' +
	          thisThing.formals.length + ', got ' + arguments.length + ')');
	    }

	    // Create an "arguments object" from the arguments that were passed to this
	    // operation / attribute.
	    var args = Object.create(null);
	    for (var idx = 0; idx < arguments.length; idx++) {
	      var formal = thisThing.formals[idx];
	      args[formal] = arguments[idx];
	    }

	    var oldArgs = this.args;
	    this.args = args;
	    try {
	      var ans = thisThing.execute(this._semantics, this);

	      this.args = oldArgs;
	      return ans;
	    } catch (e) {
	      if (e.name === 'missingSemanticAction') {
	        e.message += '\n' + this.ctorName;
	      }
	      throw e;
	    }
	  }

	  if (type === 'operation') {
	    this.Wrapper.prototype[name] = doIt;
	    this.Wrapper.prototype[name].toString = function() {
	      return '[' + name + ' operation]';
	    };
	  } else {
	    Object.defineProperty(this.Wrapper.prototype, name, {
	      get: doIt,
	      configurable: true  // So the property can be deleted.
	    });
	    this.attributeKeys[name] = Symbol();
	  }
	};

	Semantics.prototype.extendOperationOrAttribute = function(type, name, actionDict) {
	  var typePlural = type + 's';

	  // Make sure that `name` really is just a name, i.e., that it doesn't also contain formals.
	  parseSignature(name, 'attribute');

	  if (!(this.super && name in this.super[typePlural])) {
	    throw new Error('Cannot extend ' + type + " '" + name +
	        "': did not inherit an " + type + ' with that name');
	  }
	  if (Object.prototype.hasOwnProperty.call(this[typePlural], name)) {
	    throw new Error('Cannot extend ' + type + " '" + name + "' again");
	  }

	  // Create a new operation / attribute whose actionDict delegates to the super operation /
	  // attribute's actionDict, and which has all the keys from `inheritedActionDict`.
	  var inheritedFormals = this[typePlural][name].formals;
	  var inheritedActionDict = this[typePlural][name].actionDict;
	  var newActionDict = Object.create(inheritedActionDict);
	  Object.keys(actionDict).forEach(function(name) {
	    newActionDict[name] = actionDict[name];
	  });

	  this[typePlural][name] = type === 'operation' ?
	      new Operation(name, inheritedFormals, newActionDict) :
	      new Attribute(name, newActionDict);

	  // The following check is not strictly necessary (it will happen later anyway) but it's better to
	  // catch errors early.
	  this[typePlural][name].checkActionDict(this.grammar);
	};

	Semantics.prototype.assertNewName = function(name, type) {
	  if (Wrapper.prototype.hasOwnProperty(name)) {
	    throw new Error(
	        'Cannot add ' + type + " '" + name + "': that's a reserved name");
	  }
	  if (name in this.operations) {
	    throw new Error(
	        'Cannot add ' + type + " '" + name + "': an operation with that name already exists");
	  }
	  if (name in this.attributes) {
	    throw new Error(
	        'Cannot add ' + type + " '" + name + "': an attribute with that name already exists");
	  }
	};

	// Returns a wrapper for the given CST `node` in this semantics.
	// If `node` is already a wrapper, returns `node` itself.  // TODO: why is this needed?
	Semantics.prototype.wrap = function(node, source, optBaseInterval) {
	  var baseInterval = optBaseInterval || source;
	  return node instanceof this.Wrapper ? node : new this.Wrapper(node, source, baseInterval);
	};

	// Creates a new Semantics instance for `grammar`, inheriting operations and attributes from
	// `optSuperSemantics`, if it is specified. Returns a function that acts as a proxy for the new
	// Semantics instance. When that function is invoked with a CST node as an argument, it returns
	// a wrapper for that node which gives access to the operations and attributes provided by this
	// semantics.
	Semantics.createSemantics = function(grammar, optSuperSemantics) {
	  var s = new Semantics(
	      grammar,
	      optSuperSemantics !== undefined ?
	          optSuperSemantics :
	          Semantics.BuiltInSemantics._getSemantics());

	  // To enable clients to invoke a semantics like a function, return a function that acts as a proxy
	  // for `s`, which is the real `Semantics` instance.
	  var proxy = function ASemantics(matchResult) {
	    if (!(matchResult instanceof MatchResult)) {
	      throw new TypeError(
	          'Semantics expected a MatchResult, but got ' + common.unexpectedObjToString(matchResult));
	    }
	    if (matchResult.failed()) {
	      throw new TypeError('cannot apply Semantics to ' + matchResult.toString());
	    }

	    var cst = matchResult._cst;
	    if (cst.grammar !== grammar) {
	      throw new Error(
	          "Cannot use a MatchResult from grammar '" + cst.grammar.name +
	          "' with a semantics for '" + grammar.name + "'");
	    }
	    var inputStream = new InputStream(matchResult.input);
	    return s.wrap(cst, inputStream.interval(matchResult._cstOffset, matchResult.input.length));
	  };

	  // Forward public methods from the proxy to the semantics instance.
	  proxy.addOperation = function(signature, actionDict) {
	    s.addOperationOrAttribute('operation', signature, actionDict);
	    return proxy;
	  };
	  proxy.extendOperation = function(name, actionDict) {
	    s.extendOperationOrAttribute('operation', name, actionDict);
	    return proxy;
	  };
	  proxy.addAttribute = function(name, actionDict) {
	    s.addOperationOrAttribute('attribute', name, actionDict);
	    return proxy;
	  };
	  proxy.extendAttribute = function(name, actionDict) {
	    s.extendOperationOrAttribute('attribute', name, actionDict);
	    return proxy;
	  };
	  proxy._getActionDict = function(operationOrAttributeName) {
	    var action = s.operations[operationOrAttributeName] || s.attributes[operationOrAttributeName];
	    if (!action) {
	      throw new Error('"' + operationOrAttributeName + '" is not a valid operation or attribute ' +
	        'name in this semantics for "' + grammar.name + '"');
	    }
	    return action.actionDict;
	  };
	  proxy._remove = function(operationOrAttributeName) {
	    var semantic;
	    if (operationOrAttributeName in s.operations) {
	      semantic = s.operations[operationOrAttributeName];
	      delete s.operations[operationOrAttributeName];
	    } else if (operationOrAttributeName in s.attributes) {
	      semantic = s.attributes[operationOrAttributeName];
	      delete s.attributes[operationOrAttributeName];
	    }
	    delete s.Wrapper.prototype[operationOrAttributeName];
	    return semantic;
	  };
	  proxy.getOperationNames = function() {
	    return Object.keys(s.operations);
	  };
	  proxy.getAttributeNames = function() {
	    return Object.keys(s.attributes);
	  };
	  proxy.getGrammar = function() {
	    return s.grammar;
	  };
	  proxy.toRecipe = function(semanticsOnly) {
	    return s.toRecipe(semanticsOnly);
	  };

	  // Make the proxy's toString() work.
	  proxy.toString = s.toString.bind(s);

	  // Returns the semantics for the proxy.
	  proxy._getSemantics = function() {
	    return s;
	  };

	  return proxy;
	};

	Semantics.initBuiltInSemantics = function(builtInRules) {
	  var actions = {
	    empty: function() {
	      return this.iteration();
	    },
	    nonEmpty: function(first, _, rest) {
	      return this.iteration([first].concat(rest.children));
	    }
	  };

	  Semantics.BuiltInSemantics = Semantics
	      .createSemantics(builtInRules, null)
	      .addOperation('asIteration', {
	        emptyListOf: actions.empty,
	        nonemptyListOf: actions.nonEmpty,
	        EmptyListOf: actions.empty,
	        NonemptyListOf: actions.nonEmpty
	      });
	};

	// ----------------- Operation -----------------

	// An Operation represents a function to be applied to a concrete syntax tree (CST) -- it's very
	// similar to a Visitor (http://en.wikipedia.org/wiki/Visitor_pattern). An operation is executed by
	// recursively walking the CST, and at each node, invoking the matching semantic action from
	// `actionDict`. See `Operation.prototype.execute` for details of how a CST node's matching semantic
	// action is found.
	function Operation(name, formals, actionDict, builtInDefault) {
	  this.name = name;
	  this.formals = formals;
	  this.actionDict = actionDict;
	  this.builtInDefault = builtInDefault;
	}

	Operation.prototype.typeName = 'operation';

	Operation.prototype.checkActionDict = function(grammar) {
	  grammar._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
	};

	// Execute this operation on the CST node associated with `nodeWrapper` in the context of the given
	// Semantics instance.
	Operation.prototype.execute = function(semantics, nodeWrapper) {
	  // Look for a semantic action whose name matches the node's constructor name, which is either the
	  // name of a rule in the grammar, or '_terminal' (for a terminal node), or '_iter' (for an
	  // iteration node). In the latter case, the action function receives a single argument, which is
	  // an array containing all of the children of the CST node.
	  var actionFn = this.actionDict[nodeWrapper._node.ctorName];
	  if (actionFn) {
	    return this.doAction(semantics, nodeWrapper, actionFn, nodeWrapper.isIteration());
	  }

	  // The action dictionary does not contain a semantic action for this specific type of node.
	  // If this is a nonterminal node and the programmer has provided a `_nonterminal` semantic
	  // action, we invoke it:
	  if (nodeWrapper.isNonterminal()) {
	    actionFn = this.actionDict._nonterminal;
	    if (actionFn) {
	      return this.doAction(semantics, nodeWrapper, actionFn, true);
	    }
	  }

	  // Otherwise, we invoke the '_default' semantic action.
	  return this.doAction(semantics, nodeWrapper, this.actionDict._default, true);
	};

	// Invoke `actionFn` on the CST node that corresponds to `nodeWrapper`, in the context of
	// `semantics`. If `optPassChildrenAsArray` is truthy, `actionFn` will be called with a single
	// argument, which is an array of wrappers. Otherwise, the number of arguments to `actionFn` will
	// be equal to the number of children in the CST node.
	Operation.prototype.doAction = function(semantics, nodeWrapper, actionFn, optPassChildrenAsArray) {
	  return optPassChildrenAsArray ?
	      actionFn.call(nodeWrapper, nodeWrapper._children()) :
	      actionFn.apply(nodeWrapper, nodeWrapper._children());
	};

	// ----------------- Attribute -----------------

	// Attributes are Operations whose results are memoized. This means that, for any given semantics,
	// the semantic action for a CST node will be invoked no more than once.
	function Attribute(name, actionDict, builtInDefault) {
	  this.name = name;
	  this.formals = [];
	  this.actionDict = actionDict;
	  this.builtInDefault = builtInDefault;
	}
	inherits(Attribute, Operation);

	Attribute.prototype.typeName = 'attribute';

	Attribute.prototype.execute = function(semantics, nodeWrapper) {
	  var node = nodeWrapper._node;
	  var key = semantics.attributeKeys[this.name];
	  if (!node.hasOwnProperty(key)) {
	    // The following is a super-send -- isn't JS beautiful? :/
	    node[key] = Operation.prototype.execute.call(this, semantics, nodeWrapper);
	  }
	  return node[key];
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = Semantics;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(42)()
		? __webpack_require__(43).Symbol
		: __webpack_require__(46);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var global     = __webpack_require__(43)
	  , validTypes = { object: true, symbol: true };

	module.exports = function () {
		var Symbol = global.Symbol;
		var symbol;
		if (typeof Symbol !== "function") return false;
		symbol = Symbol("test symbol");
		try { String(symbol); }
		catch (e) { return false; }

		// Return 'true' also for polyfills
		if (!validTypes[typeof Symbol.iterator]) return false;
		if (!validTypes[typeof Symbol.toPrimitive]) return false;
		if (!validTypes[typeof Symbol.toStringTag]) return false;

		return true;
	};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(44)() ? globalThis : __webpack_require__(45);


/***/ }),
/* 44 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function () {
		if (typeof globalThis !== "object") return false;
		if (!globalThis) return false;
		return globalThis.Array === Array;
	};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

	var naiveFallback = function () {
		if (typeof self === "object" && self) return self;
		if (typeof window === "object" && window) return window;
		throw new Error("Unable to resolve global `this`");
	};

	module.exports = (function () {
		if (this) return this;

		// Unexpected strict mode (may happen if e.g. bundled into ESM module)

		// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
		// In all ES5+ engines global object inherits from Object.prototype
		// (if you approached one that doesn't please report)
		try {
			Object.defineProperty(Object.prototype, "__global__", {
				get: function () { return this; },
				configurable: true
			});
		} catch (error) {
			// Unfortunate case of Object.prototype being sealed (via preventExtensions, seal or freeze)
			return naiveFallback();
		}
		try {
			// Safari case (window.__global__ is resolved with global context, but __global__ does not)
			if (!__global__) return naiveFallback();
			return __global__;
		} finally {
			delete Object.prototype.__global__;
		}
	})();


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	// ES2015 Symbol polyfill for environments that do not (or partially) support it

	"use strict";

	var d                    = __webpack_require__(47)
	  , validateSymbol       = __webpack_require__(66)
	  , NativeSymbol         = __webpack_require__(43).Symbol
	  , generateName         = __webpack_require__(68)
	  , setupStandardSymbols = __webpack_require__(69)
	  , setupSymbolRegistry  = __webpack_require__(70);

	var create = Object.create
	  , defineProperties = Object.defineProperties
	  , defineProperty = Object.defineProperty;

	var SymbolPolyfill, HiddenSymbol, isNativeSafe;

	if (typeof NativeSymbol === "function") {
		try {
			String(NativeSymbol());
			isNativeSafe = true;
		} catch (ignore) {}
	} else {
		NativeSymbol = null;
	}

	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");
		return SymbolPolyfill(description);
	};

	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	module.exports = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");
		if (isNativeSafe) return NativeSymbol(description);
		symbol = create(HiddenSymbol.prototype);
		description = description === undefined ? "" : String(description);
		return defineProperties(symbol, {
			__description__: d("", description),
			__name__: d("", generateName(description))
		});
	};

	setupStandardSymbols(SymbolPolyfill);
	setupSymbolRegistry(SymbolPolyfill);

	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d("", function () { return this.__name__; })
	});

	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () { return "Symbol (" + validateSymbol(this).__description__ + ")"; }),
		valueOf: d(function () { return validateSymbol(this); })
	});
	defineProperty(
		SymbolPolyfill.prototype,
		SymbolPolyfill.toPrimitive,
		d("", function () {
			var symbol = validateSymbol(this);
			if (typeof symbol === "symbol") return symbol;
			return symbol.toString();
		})
	);
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));

	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(
		HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
	);

	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(
		HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
	);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isValue         = __webpack_require__(48)
	  , isPlainFunction = __webpack_require__(49)
	  , assign          = __webpack_require__(53)
	  , normalizeOpts   = __webpack_require__(62)
	  , contains        = __webpack_require__(63);

	var d = (module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if (arguments.length < 2 || typeof dscr !== "string") {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (isValue(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
			w = contains.call(dscr, "w");
		} else {
			c = w = true;
			e = false;
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	});

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== "string") {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (!isValue(get)) {
			get = undefined;
		} else if (!isPlainFunction(get)) {
			options = get;
			get = set = undefined;
		} else if (!isValue(set)) {
			set = undefined;
		} else if (!isPlainFunction(set)) {
			options = set;
			set = undefined;
		}
		if (isValue(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
		} else {
			c = true;
			e = false;
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

	"use strict";

	// ES3 safe
	var _undefined = void 0;

	module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isFunction = __webpack_require__(50);

	var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

	module.exports = function (value) {
		if (!isFunction(value)) return false;
		if (classRe.test(functionToString.call(value))) return false;
		return true;
	};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isPrototype = __webpack_require__(51);

	module.exports = function (value) {
		if (typeof value !== "function") return false;

		if (!hasOwnProperty.call(value, "length")) return false;

		try {
			if (typeof value.length !== "number") return false;
			if (typeof value.call !== "function") return false;
			if (typeof value.apply !== "function") return false;
		} catch (error) {
			return false;
		}

		return !isPrototype(value);
	};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isObject = __webpack_require__(52);

	module.exports = function (value) {
		if (!isObject(value)) return false;
		try {
			if (!value.constructor) return false;
			return value.constructor.prototype === value;
		} catch (error) {
			return false;
		}
	};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isValue = __webpack_require__(48);

	// prettier-ignore
	var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

	module.exports = function (value) {
		if (!isValue(value)) return false;
		return hasOwnProperty.call(possibleTypes, typeof value);
	};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(54)() ? Object.assign : __webpack_require__(55);


/***/ }),
/* 54 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== "function") return false;
		obj = { foo: "raz" };
		assign(obj, { bar: "dwa" }, { trzy: "trzy" });
		return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
	};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var keys  = __webpack_require__(56)
	  , value = __webpack_require__(61)
	  , max   = Math.max;

	module.exports = function (dest, src/*, …srcn*/) {
		var error, i, length = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < length; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(57)() ? Object.keys : __webpack_require__(58);


/***/ }),
/* 57 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function () {
		try {
			Object.keys("primitive");
			return true;
		} catch (e) {
			return false;
		}
	};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isValue = __webpack_require__(59);

	var keys = Object.keys;

	module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _undefined = __webpack_require__(60)(); // Support ES3 engines

	module.exports = function (val) { return val !== _undefined && val !== null; };


/***/ }),
/* 60 */
/***/ (function(module, exports) {

	"use strict";

	// eslint-disable-next-line no-empty-function
	module.exports = function () {};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isValue = __webpack_require__(59);

	module.exports = function (value) {
		if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isValue = __webpack_require__(59);

	var forEach = Array.prototype.forEach, create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	// eslint-disable-next-line no-unused-vars
	module.exports = function (opts1/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (!isValue(options)) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(64)() ? String.prototype.contains : __webpack_require__(65);


/***/ }),
/* 64 */
/***/ (function(module, exports) {

	"use strict";

	var str = "razdwatrzy";

	module.exports = function () {
		if (typeof str.contains !== "function") return false;
		return str.contains("dwa") === true && str.contains("foo") === false;
	};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

	"use strict";

	var indexOf = String.prototype.indexOf;

	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isSymbol = __webpack_require__(67);

	module.exports = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function (value) {
		if (!value) return false;
		if (typeof value === "symbol") return true;
		if (!value.constructor) return false;
		if (value.constructor.name !== "Symbol") return false;
		return value[value.constructor.toStringTag] === "Symbol";
	};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var d = __webpack_require__(47);

	var create = Object.create, defineProperty = Object.defineProperty, objPrototype = Object.prototype;

	var created = create(null);
	module.exports = function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || "")]) ++postfix;
		desc += postfix || "";
		created[desc] = true;
		name = "@@" + desc;
		defineProperty(
			objPrototype,
			name,
			d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			})
		);
		return name;
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var d            = __webpack_require__(47)
	  , NativeSymbol = __webpack_require__(43).Symbol;

	module.exports = function (SymbolPolyfill) {
		return Object.defineProperties(SymbolPolyfill, {
			// To ensure proper interoperability with other native functions (e.g. Array.from)
			// fallback to eventual native implementation of given symbol
			hasInstance: d(
				"", (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill("hasInstance")
			),
			isConcatSpreadable: d(
				"",
				(NativeSymbol && NativeSymbol.isConcatSpreadable) ||
					SymbolPolyfill("isConcatSpreadable")
			),
			iterator: d("", (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill("iterator")),
			match: d("", (NativeSymbol && NativeSymbol.match) || SymbolPolyfill("match")),
			replace: d("", (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill("replace")),
			search: d("", (NativeSymbol && NativeSymbol.search) || SymbolPolyfill("search")),
			species: d("", (NativeSymbol && NativeSymbol.species) || SymbolPolyfill("species")),
			split: d("", (NativeSymbol && NativeSymbol.split) || SymbolPolyfill("split")),
			toPrimitive: d(
				"", (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill("toPrimitive")
			),
			toStringTag: d(
				"", (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill("toStringTag")
			),
			unscopables: d(
				"", (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill("unscopables")
			)
		});
	};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var d              = __webpack_require__(47)
	  , validateSymbol = __webpack_require__(66);

	var registry = Object.create(null);

	module.exports = function (SymbolPolyfill) {
		return Object.defineProperties(SymbolPolyfill, {
			for: d(function (key) {
				if (registry[key]) return registry[key];
				return (registry[key] = SymbolPolyfill(String(key)));
			}),
			keyFor: d(function (symbol) {
				var key;
				validateSymbol(symbol);
				for (key in registry) {
					if (registry[key] === symbol) return key;
				}
				return undefined;
			})
		});
	};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  VisitorFamily: __webpack_require__(73),
	  semanticsForToAST: __webpack_require__(74).semantics,
	  toAST: __webpack_require__(74).helper
	};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var assert = __webpack_require__(10).assert;

	// --------------------------------------------------------------------
	// Private stuff
	// --------------------------------------------------------------------

	// Helpers

	function getProp(name, thing, fn) {
	  return fn(thing[name]);
	}

	function mapProp(name, thing, fn) {
	  return thing[name].map(fn);
	}

	// Returns a function that will walk a single property of a node.
	// `descriptor` is a string indicating the property name, optionally ending
	// with '[]' (e.g., 'children[]').
	function getPropWalkFn(descriptor) {
	  var parts = descriptor.split(/ ?\[\]/);
	  if (parts.length === 2) {
	    return mapProp.bind(null, parts[0]);
	  }
	  return getProp.bind(null, descriptor);
	}

	function getProps(walkFns, thing, fn) {
	  return walkFns.map(function(walkFn) {
	    return walkFn(thing, fn);
	  });
	}

	function getWalkFn(shape) {
	  if (typeof shape === 'string') {
	    return getProps.bind(null, [getPropWalkFn(shape)]);
	  } else if (Array.isArray(shape)) {
	    return getProps.bind(null, shape.map(getPropWalkFn));
	  } else {
	    assert(typeof shape === 'function', 'Expected a string, Array, or function');
	    assert(shape.length === 2, 'Expected a function of arity 2, got ' + shape.length);
	    return shape;
	  }
	}

	function isRestrictedIdentifier(str) {
	  return /^[a-zA-Z_][0-9a-zA-Z_]*$/.test(str);
	}

	function trim(s) {
	  return s.trim();
	}

	function parseSignature(sig) {
	  var parts = sig.split(/[()]/).map(trim);
	  if (parts.length === 3 && parts[2] === '') {
	    var name = parts[0];
	    var params = [];
	    if (parts[1].length > 0) {
	      params = parts[1].split(',').map(trim);
	    }
	    if (isRestrictedIdentifier(name) && params.every(isRestrictedIdentifier)) {
	      return {name: name, formals: params};
	    }
	  }
	  throw new Error('Invalid operation signature: ' + sig);
	}

	/*
	  A VisitorFamily contains a set of recursive operations that are defined over some kind of
	  tree structure. The `config` parameter specifies how to walk the tree:
	  - 'getTag' is function which, given a node in the tree, returns the node's 'tag' (type)
	  - 'shapes' an object that maps from a tag to a value that describes how to recursively
	    evaluate the operation for nodes of that type. The value can be:
	    * a string indicating the property name that holds that node's only child
	    * an Array of property names (or an empty array indicating a leaf type), or
	    * a function taking two arguments (node, fn), and returning an Array which is the result
	      of apply `fn` to each of the node's children.
	 */
	function VisitorFamily(config) {
	  this._shapes = config.shapes;
	  this._getTag = config.getTag;

	  this.Adapter = function(thing, family) {
	    this._adaptee = thing;
	    this._family = family;
	  };
	  this.Adapter.prototype.valueOf = function() {
	    throw new Error('heeey!');
	  };
	  this.operations = {};

	  this._arities = Object.create(null);
	  this._getChildren = Object.create(null);

	  var self = this;
	  Object.keys(this._shapes).forEach(function(k) {
	    var shape = self._shapes[k];
	    self._getChildren[k] = getWalkFn(shape);

	    // A function means the arity isn't fixed, so don't put an entry in the arity map.
	    if (typeof shape !== 'function') {
	      self._arities[k] = Array.isArray(shape) ? shape.length : 1;
	    }
	  });
	  this._wrap = function(thing) { return new self.Adapter(thing, self); };
	}

	VisitorFamily.prototype.wrap = function(thing) {
	  return this._wrap(thing);
	};

	VisitorFamily.prototype._checkActionDict = function(dict) {
	  var self = this;
	  Object.keys(dict).forEach(function(k) {
	    assert(k in self._getChildren, "Unrecognized action name '" + k + "'");
	    var action = dict[k];
	    assert(typeof action === 'function', "Key '" + k + "': expected function, got " + action);
	    if (k in self._arities) {
	      var expected = self._arities[k];
	      var actual = dict[k].length;
	      assert(actual === expected,
	             "Action '" + k + "' has the wrong arity: expected " + expected + ', got ' + actual);
	    }
	  });
	};

	VisitorFamily.prototype.addOperation = function(signature, actions) {
	  var sig = parseSignature(signature);
	  var name = sig.name;
	  this._checkActionDict(actions);
	  this.operations[name] = {
	    name: name,
	    formals: sig.formals,
	    actions: actions
	  };

	  var family = this;
	  this.Adapter.prototype[name] = function() {
	    var tag = family._getTag(this._adaptee);
	    assert(tag in family._getChildren, "getTag returned unrecognized tag '" + tag + "'");
	    assert(tag in actions, "No action for '" + tag + "' in operation '" + name + "'");

	    // Create an "arguments object" from the arguments that were passed to this
	    // operation / attribute.
	    var args = Object.create(null);
	    for (var i = 0; i < arguments.length; i++) {
	      args[sig.formals[i]] = arguments[i];
	    }

	    var oldArgs = this.args;
	    this.args = args;
	    var ans = actions[tag].apply(this, family._getChildren[tag](this._adaptee, family._wrap));
	    this.args = oldArgs;
	    return ans;
	  };
	  return this;
	};

	// --------------------------------------------------------------------
	// Exports
	// --------------------------------------------------------------------

	module.exports = VisitorFamily;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// --------------------------------------------------------------------
	// Imports
	// --------------------------------------------------------------------

	var pexprs = __webpack_require__(12);
	var MatchResult = __webpack_require__(38);
	var Grammar = __webpack_require__(5);
	var extend = __webpack_require__(11);

	// --------------------------------------------------------------------
	// Operations
	// --------------------------------------------------------------------

	var defaultOperation = {
	  _terminal: function() {
	    return this.primitiveValue;
	  },

	  _nonterminal: function(children) {
	    var ctorName = this._node.ctorName;
	    var mapping = this.args.mapping;

	    // without customization
	    if (!mapping.hasOwnProperty(ctorName)) {
	      // intermediate node
	      if (this._node instanceof pexprs.Alt || this._node instanceof pexprs.Apply) {
	        return children[0].toAST(mapping);
	      }

	      // lexical rule
	      if (this.isLexical()) {
	        return this.sourceString;
	      }

	      // singular node (e.g. only surrounded by literals or lookaheads)
	      var realChildren = children.filter(function(child) {
	        return !child.isTerminal();
	      });
	      if (realChildren.length === 1) {
	        return realChildren[0].toAST(mapping);
	      }

	      // rest: terms with multiple children
	    }

	    // direct forward
	    if (typeof mapping[ctorName] === 'number') {
	      return children[mapping[ctorName]].toAST(mapping);
	    }

	    // named/mapped children or unnamed children ('0', '1', '2', ...)
	    var propMap = mapping[ctorName] || children;
	    var node = {
	      type: ctorName
	    };
	    for (var prop in propMap) {
	      var mappedProp = mapping[ctorName] && mapping[ctorName][prop];
	      if (typeof mappedProp === 'number') {
	        // direct forward
	        node[prop] = children[mappedProp].toAST(mapping);
	      } else if ((typeof mappedProp === 'string') || (typeof mappedProp === 'boolean') ||
	          (mappedProp === null)) {
	        // primitive value
	        node[prop] = mappedProp;
	      } else if ((typeof mappedProp === 'object') && (mappedProp instanceof Number)) {
	        // primitive number (must be unboxed)
	        node[prop] = Number(mappedProp);
	      } else if (typeof mappedProp === 'function') {
	        // computed value
	        node[prop] = mappedProp.call(this, children);
	      } else if (mappedProp === undefined) {
	        if (children[prop] && !children[prop].isTerminal()) {
	          node[prop] = children[prop].toAST(mapping);
	        } else {
	          // delete predefined 'type' properties, like 'type', if explicitely removed
	          delete node[prop];
	        }
	      }
	    }
	    return node;
	  },

	  _iter: function(children) {
	    if (this._node.isOptional()) {
	      if (this.numChildren === 0) {
	        return null;
	      } else {
	        return children[0].toAST(this.args.mapping);
	      }
	    }

	    return children.map(function(child) {
	      return child.toAST(this.args.mapping);
	    }, this);
	  },

	  NonemptyListOf: function(first, sep, rest) {
	    return [first.toAST(this.args.mapping)].concat(rest.toAST(this.args.mapping));
	  },

	  EmptyListOf: function() {
	    return [];
	  }
	};

	// Returns a plain JavaScript object that includes an abstract syntax tree (AST)
	// for the given match result `res` containg a concrete syntax tree (CST) and grammar.
	// The optional `mapping` parameter can be used to customize how the nodes of the CST
	// are mapped to the AST (see /doc/extras.md#toastmatchresult-mapping).
	function toAST(res, mapping) {
	  if (!(res instanceof MatchResult) || res.failed()) {
	    throw new Error('toAST() expects a succesfull MatchResult as first parameter');
	  }

	  mapping = extend({}, mapping);
	  var operation = extend({}, defaultOperation);
	  for (var termName in mapping) {
	    if (typeof mapping[termName] === 'function') {
	      operation[termName] = mapping[termName];
	      delete mapping[termName];
	    }
	  }
	  var g = res._cst.grammar;
	  var s = g.createSemantics().addOperation('toAST(mapping)', operation);
	  return s(res).toAST(mapping);
	}

	// Returns a semantics containg the toAST(mapping) operation for the given grammar g.
	function semanticsForToAST(g) {
	  if (!(g instanceof Grammar)) {
	    throw new Error('semanticsToAST() expects a Grammar as parameter');
	  }

	  return g.createSemantics().addOperation('toAST(mapping)', defaultOperation);
	}

	module.exports = {
	  helper: toAST,
	  semantics: semanticsForToAST
	};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	var ohm = __webpack_require__(2);
	module.exports = ohm.makeRecipe(["grammar",{"source":"BuiltInRules {\n\n  alnum  (an alpha-numeric character)\n    = letter\n    | digit\n\n  letter  (a letter)\n    = lower\n    | upper\n    | unicodeLtmo\n\n  digit  (a digit)\n    = \"0\"..\"9\"\n\n  hexDigit  (a hexadecimal digit)\n    = digit\n    | \"a\"..\"f\"\n    | \"A\"..\"F\"\n\n  ListOf<elem, sep>\n    = NonemptyListOf<elem, sep>\n    | EmptyListOf<elem, sep>\n\n  NonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  EmptyListOf<elem, sep>\n    = /* nothing */\n\n  listOf<elem, sep>\n    = nonemptyListOf<elem, sep>\n    | emptyListOf<elem, sep>\n\n  nonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  emptyListOf<elem, sep>\n    = /* nothing */\n\n}"},"BuiltInRules",null,null,{"alnum":["define",{"sourceInterval":[18,78]},"an alpha-numeric character",[],["alt",{"sourceInterval":[60,78]},["app",{"sourceInterval":[60,66]},"letter",[]],["app",{"sourceInterval":[73,78]},"digit",[]]]],"letter":["define",{"sourceInterval":[82,142]},"a letter",[],["alt",{"sourceInterval":[107,142]},["app",{"sourceInterval":[107,112]},"lower",[]],["app",{"sourceInterval":[119,124]},"upper",[]],["app",{"sourceInterval":[131,142]},"unicodeLtmo",[]]]],"digit":["define",{"sourceInterval":[146,177]},"a digit",[],["range",{"sourceInterval":[169,177]},"0","9"]],"hexDigit":["define",{"sourceInterval":[181,254]},"a hexadecimal digit",[],["alt",{"sourceInterval":[219,254]},["app",{"sourceInterval":[219,224]},"digit",[]],["range",{"sourceInterval":[231,239]},"a","f"],["range",{"sourceInterval":[246,254]},"A","F"]]],"ListOf":["define",{"sourceInterval":[258,336]},null,["elem","sep"],["alt",{"sourceInterval":[282,336]},["app",{"sourceInterval":[282,307]},"NonemptyListOf",[["param",{},0],["param",{},1]]],["app",{"sourceInterval":[314,336]},"EmptyListOf",[["param",{},0],["param",{},1]]]]],"NonemptyListOf":["define",{"sourceInterval":[340,388]},null,["elem","sep"],["seq",{"sourceInterval":[372,388]},["param",{},0],["star",{"sourceInterval":[377,388]},["seq",{"sourceInterval":[378,386]},["param",{},1],["param",{},0]]]]],"EmptyListOf":["define",{"sourceInterval":[392,434]},null,["elem","sep"],["seq",{"sourceInterval":[438,438]}]],"listOf":["define",{"sourceInterval":[438,516]},null,["elem","sep"],["alt",{"sourceInterval":[462,516]},["app",{"sourceInterval":[462,487]},"nonemptyListOf",[["param",{},0],["param",{},1]]],["app",{"sourceInterval":[494,516]},"emptyListOf",[["param",{},0],["param",{},1]]]]],"nonemptyListOf":["define",{"sourceInterval":[520,568]},null,["elem","sep"],["seq",{"sourceInterval":[552,568]},["param",{},0],["star",{"sourceInterval":[557,568]},["seq",{"sourceInterval":[558,566]},["param",{},1],["param",{},0]]]]],"emptyListOf":["define",{"sourceInterval":[572,614]},null,["elem","sep"],["seq",{"sourceInterval":[616,616]}]]}]);


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var ohm = __webpack_require__(2);
	module.exports = ohm.makeRecipe(["grammar",{"source":"OperationsAndAttributes {\n\n  AttributeSignature =\n    name\n\n  OperationSignature =\n    name Formals?\n\n  Formals\n    = \"(\" ListOf<name, \",\"> \")\"\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n}"},"OperationsAndAttributes",null,"AttributeSignature",{"AttributeSignature":["define",{"sourceInterval":[29,58]},null,[],["app",{"sourceInterval":[54,58]},"name",[]]],"OperationSignature":["define",{"sourceInterval":[62,100]},null,[],["seq",{"sourceInterval":[87,100]},["app",{"sourceInterval":[87,91]},"name",[]],["opt",{"sourceInterval":[92,100]},["app",{"sourceInterval":[92,99]},"Formals",[]]]]],"Formals":["define",{"sourceInterval":[104,143]},null,[],["seq",{"sourceInterval":[118,143]},["terminal",{"sourceInterval":[118,121]},"("],["app",{"sourceInterval":[122,139]},"ListOf",[["app",{"sourceInterval":[129,133]},"name",[]],["terminal",{"sourceInterval":[135,138]},","]]],["terminal",{"sourceInterval":[140,143]},")"]]],"name":["define",{"sourceInterval":[147,187]},"a name",[],["seq",{"sourceInterval":[168,187]},["app",{"sourceInterval":[168,177]},"nameFirst",[]],["star",{"sourceInterval":[178,187]},["app",{"sourceInterval":[178,186]},"nameRest",[]]]]],"nameFirst":["define",{"sourceInterval":[191,223]},null,[],["alt",{"sourceInterval":[207,223]},["terminal",{"sourceInterval":[207,210]},"_"],["app",{"sourceInterval":[217,223]},"letter",[]]]],"nameRest":["define",{"sourceInterval":[227,257]},null,[],["alt",{"sourceInterval":[242,257]},["terminal",{"sourceInterval":[242,245]},"_"],["app",{"sourceInterval":[252,257]},"alnum",[]]]]}]);


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	var ohm = __webpack_require__(2);
	module.exports = ohm.makeRecipe(["grammar",{"source":"Ohm {\n\n  Grammars\n    = Grammar*\n\n  Grammar\n    = ident SuperGrammar? \"{\" Rule* \"}\"\n\n  SuperGrammar\n    = \"<:\" ident\n\n  Rule\n    = ident Formals? ruleDescr? \"=\"  RuleBody  -- define\n    | ident Formals?            \":=\" RuleBody  -- override\n    | ident Formals?            \"+=\" RuleBody  -- extend\n\n  RuleBody\n    = \"|\"? NonemptyListOf<TopLevelTerm, \"|\">\n\n  TopLevelTerm\n    = Seq caseName  -- inline\n    | Seq\n\n  Formals\n    = \"<\" ListOf<ident, \",\"> \">\"\n\n  Params\n    = \"<\" ListOf<Seq, \",\"> \">\"\n\n  Alt\n    = NonemptyListOf<Seq, \"|\">\n\n  Seq\n    = Iter*\n\n  Iter\n    = Pred \"*\"  -- star\n    | Pred \"+\"  -- plus\n    | Pred \"?\"  -- opt\n    | Pred\n\n  Pred\n    = \"~\" Lex  -- not\n    | \"&\" Lex  -- lookahead\n    | Lex\n\n  Lex\n    = \"#\" Base  -- lex\n    | Base\n\n  Base\n    = ident Params? ~(ruleDescr? \"=\" | \":=\" | \"+=\")  -- application\n    | terminal \"..\" terminal                         -- range\n    | terminal                                       -- terminal\n    | \"(\" Alt \")\"                                    -- paren\n\n  ruleDescr  (a rule description)\n    = \"(\" ruleDescrText \")\"\n\n  ruleDescrText\n    = (~\")\" any)*\n\n  caseName\n    = \"--\" (~\"\\n\" space)* name (~\"\\n\" space)* (\"\\n\" | &\"}\")\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n  ident  (an identifier)\n    = name\n\n  terminal\n    = \"\\\"\" terminalChar* \"\\\"\"\n\n  terminalChar\n    = escapeChar\n    | ~\"\\\\\" ~\"\\\"\" ~\"\\n\" any\n\n  escapeChar  (an escape sequence)\n    = \"\\\\\\\\\"                                     -- backslash\n    | \"\\\\\\\"\"                                     -- doubleQuote\n    | \"\\\\\\'\"                                     -- singleQuote\n    | \"\\\\b\"                                      -- backspace\n    | \"\\\\n\"                                      -- lineFeed\n    | \"\\\\r\"                                      -- carriageReturn\n    | \"\\\\t\"                                      -- tab\n    | \"\\\\u\" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape\n    | \"\\\\x\" hexDigit hexDigit                    -- hexEscape\n\n  space\n   += comment\n\n  comment\n    = \"//\" (~\"\\n\" any)* \"\\n\"  -- singleLine\n    | \"/*\" (~\"*/\" any)* \"*/\"  -- multiLine\n\n  tokens = token*\n\n  token = caseName | comment | ident | operator | punctuation | terminal | any\n\n  operator = \"<:\" | \"=\" | \":=\" | \"+=\" | \"*\" | \"+\" | \"?\" | \"~\" | \"&\"\n\n  punctuation = \"<\" | \">\" | \",\" | \"--\"\n}"},"Ohm",null,"Grammars",{"Grammars":["define",{"sourceInterval":[9,32]},null,[],["star",{"sourceInterval":[24,32]},["app",{"sourceInterval":[24,31]},"Grammar",[]]]],"Grammar":["define",{"sourceInterval":[36,83]},null,[],["seq",{"sourceInterval":[50,83]},["app",{"sourceInterval":[50,55]},"ident",[]],["opt",{"sourceInterval":[56,69]},["app",{"sourceInterval":[56,68]},"SuperGrammar",[]]],["terminal",{"sourceInterval":[70,73]},"{"],["star",{"sourceInterval":[74,79]},["app",{"sourceInterval":[74,78]},"Rule",[]]],["terminal",{"sourceInterval":[80,83]},"}"]]],"SuperGrammar":["define",{"sourceInterval":[87,116]},null,[],["seq",{"sourceInterval":[106,116]},["terminal",{"sourceInterval":[106,110]},"<:"],["app",{"sourceInterval":[111,116]},"ident",[]]]],"Rule_define":["define",{"sourceInterval":[131,181]},null,[],["seq",{"sourceInterval":[131,170]},["app",{"sourceInterval":[131,136]},"ident",[]],["opt",{"sourceInterval":[137,145]},["app",{"sourceInterval":[137,144]},"Formals",[]]],["opt",{"sourceInterval":[146,156]},["app",{"sourceInterval":[146,155]},"ruleDescr",[]]],["terminal",{"sourceInterval":[157,160]},"="],["app",{"sourceInterval":[162,170]},"RuleBody",[]]]],"Rule_override":["define",{"sourceInterval":[188,240]},null,[],["seq",{"sourceInterval":[188,227]},["app",{"sourceInterval":[188,193]},"ident",[]],["opt",{"sourceInterval":[194,202]},["app",{"sourceInterval":[194,201]},"Formals",[]]],["terminal",{"sourceInterval":[214,218]},":="],["app",{"sourceInterval":[219,227]},"RuleBody",[]]]],"Rule_extend":["define",{"sourceInterval":[247,297]},null,[],["seq",{"sourceInterval":[247,286]},["app",{"sourceInterval":[247,252]},"ident",[]],["opt",{"sourceInterval":[253,261]},["app",{"sourceInterval":[253,260]},"Formals",[]]],["terminal",{"sourceInterval":[273,277]},"+="],["app",{"sourceInterval":[278,286]},"RuleBody",[]]]],"Rule":["define",{"sourceInterval":[120,297]},null,[],["alt",{"sourceInterval":[131,297]},["app",{"sourceInterval":[131,170]},"Rule_define",[]],["app",{"sourceInterval":[188,227]},"Rule_override",[]],["app",{"sourceInterval":[247,286]},"Rule_extend",[]]]],"RuleBody":["define",{"sourceInterval":[301,354]},null,[],["seq",{"sourceInterval":[316,354]},["opt",{"sourceInterval":[316,320]},["terminal",{"sourceInterval":[316,319]},"|"]],["app",{"sourceInterval":[321,354]},"NonemptyListOf",[["app",{"sourceInterval":[336,348]},"TopLevelTerm",[]],["terminal",{"sourceInterval":[350,353]},"|"]]]]],"TopLevelTerm_inline":["define",{"sourceInterval":[377,400]},null,[],["seq",{"sourceInterval":[377,389]},["app",{"sourceInterval":[377,380]},"Seq",[]],["app",{"sourceInterval":[381,389]},"caseName",[]]]],"TopLevelTerm":["define",{"sourceInterval":[358,410]},null,[],["alt",{"sourceInterval":[377,410]},["app",{"sourceInterval":[377,389]},"TopLevelTerm_inline",[]],["app",{"sourceInterval":[407,410]},"Seq",[]]]],"Formals":["define",{"sourceInterval":[414,454]},null,[],["seq",{"sourceInterval":[428,454]},["terminal",{"sourceInterval":[428,431]},"<"],["app",{"sourceInterval":[432,450]},"ListOf",[["app",{"sourceInterval":[439,444]},"ident",[]],["terminal",{"sourceInterval":[446,449]},","]]],["terminal",{"sourceInterval":[451,454]},">"]]],"Params":["define",{"sourceInterval":[458,495]},null,[],["seq",{"sourceInterval":[471,495]},["terminal",{"sourceInterval":[471,474]},"<"],["app",{"sourceInterval":[475,491]},"ListOf",[["app",{"sourceInterval":[482,485]},"Seq",[]],["terminal",{"sourceInterval":[487,490]},","]]],["terminal",{"sourceInterval":[492,495]},">"]]],"Alt":["define",{"sourceInterval":[499,533]},null,[],["app",{"sourceInterval":[509,533]},"NonemptyListOf",[["app",{"sourceInterval":[524,527]},"Seq",[]],["terminal",{"sourceInterval":[529,532]},"|"]]]],"Seq":["define",{"sourceInterval":[537,552]},null,[],["star",{"sourceInterval":[547,552]},["app",{"sourceInterval":[547,551]},"Iter",[]]]],"Iter_star":["define",{"sourceInterval":[567,584]},null,[],["seq",{"sourceInterval":[567,575]},["app",{"sourceInterval":[567,571]},"Pred",[]],["terminal",{"sourceInterval":[572,575]},"*"]]],"Iter_plus":["define",{"sourceInterval":[591,608]},null,[],["seq",{"sourceInterval":[591,599]},["app",{"sourceInterval":[591,595]},"Pred",[]],["terminal",{"sourceInterval":[596,599]},"+"]]],"Iter_opt":["define",{"sourceInterval":[615,631]},null,[],["seq",{"sourceInterval":[615,623]},["app",{"sourceInterval":[615,619]},"Pred",[]],["terminal",{"sourceInterval":[620,623]},"?"]]],"Iter":["define",{"sourceInterval":[556,642]},null,[],["alt",{"sourceInterval":[567,642]},["app",{"sourceInterval":[567,575]},"Iter_star",[]],["app",{"sourceInterval":[591,599]},"Iter_plus",[]],["app",{"sourceInterval":[615,623]},"Iter_opt",[]],["app",{"sourceInterval":[638,642]},"Pred",[]]]],"Pred_not":["define",{"sourceInterval":[657,672]},null,[],["seq",{"sourceInterval":[657,664]},["terminal",{"sourceInterval":[657,660]},"~"],["app",{"sourceInterval":[661,664]},"Lex",[]]]],"Pred_lookahead":["define",{"sourceInterval":[679,700]},null,[],["seq",{"sourceInterval":[679,686]},["terminal",{"sourceInterval":[679,682]},"&"],["app",{"sourceInterval":[683,686]},"Lex",[]]]],"Pred":["define",{"sourceInterval":[646,710]},null,[],["alt",{"sourceInterval":[657,710]},["app",{"sourceInterval":[657,664]},"Pred_not",[]],["app",{"sourceInterval":[679,686]},"Pred_lookahead",[]],["app",{"sourceInterval":[707,710]},"Lex",[]]]],"Lex_lex":["define",{"sourceInterval":[724,740]},null,[],["seq",{"sourceInterval":[724,732]},["terminal",{"sourceInterval":[724,727]},"#"],["app",{"sourceInterval":[728,732]},"Base",[]]]],"Lex":["define",{"sourceInterval":[714,751]},null,[],["alt",{"sourceInterval":[724,751]},["app",{"sourceInterval":[724,732]},"Lex_lex",[]],["app",{"sourceInterval":[747,751]},"Base",[]]]],"Base_application":["define",{"sourceInterval":[766,827]},null,[],["seq",{"sourceInterval":[766,811]},["app",{"sourceInterval":[766,771]},"ident",[]],["opt",{"sourceInterval":[772,779]},["app",{"sourceInterval":[772,778]},"Params",[]]],["not",{"sourceInterval":[780,811]},["alt",{"sourceInterval":[782,810]},["seq",{"sourceInterval":[782,796]},["opt",{"sourceInterval":[782,792]},["app",{"sourceInterval":[782,791]},"ruleDescr",[]]],["terminal",{"sourceInterval":[793,796]},"="]],["terminal",{"sourceInterval":[799,803]},":="],["terminal",{"sourceInterval":[806,810]},"+="]]]]],"Base_range":["define",{"sourceInterval":[834,889]},null,[],["seq",{"sourceInterval":[834,856]},["app",{"sourceInterval":[834,842]},"terminal",[]],["terminal",{"sourceInterval":[843,847]},".."],["app",{"sourceInterval":[848,856]},"terminal",[]]]],"Base_terminal":["define",{"sourceInterval":[896,954]},null,[],["app",{"sourceInterval":[896,904]},"terminal",[]]],"Base_paren":["define",{"sourceInterval":[961,1016]},null,[],["seq",{"sourceInterval":[961,972]},["terminal",{"sourceInterval":[961,964]},"("],["app",{"sourceInterval":[965,968]},"Alt",[]],["terminal",{"sourceInterval":[969,972]},")"]]],"Base":["define",{"sourceInterval":[755,1016]},null,[],["alt",{"sourceInterval":[766,1016]},["app",{"sourceInterval":[766,811]},"Base_application",[]],["app",{"sourceInterval":[834,856]},"Base_range",[]],["app",{"sourceInterval":[896,904]},"Base_terminal",[]],["app",{"sourceInterval":[961,972]},"Base_paren",[]]]],"ruleDescr":["define",{"sourceInterval":[1020,1079]},"a rule description",[],["seq",{"sourceInterval":[1058,1079]},["terminal",{"sourceInterval":[1058,1061]},"("],["app",{"sourceInterval":[1062,1075]},"ruleDescrText",[]],["terminal",{"sourceInterval":[1076,1079]},")"]]],"ruleDescrText":["define",{"sourceInterval":[1083,1114]},null,[],["star",{"sourceInterval":[1103,1114]},["seq",{"sourceInterval":[1104,1112]},["not",{"sourceInterval":[1104,1108]},["terminal",{"sourceInterval":[1105,1108]},")"]],["app",{"sourceInterval":[1109,1112]},"any",[]]]]],"caseName":["define",{"sourceInterval":[1118,1186]},null,[],["seq",{"sourceInterval":[1133,1186]},["terminal",{"sourceInterval":[1133,1137]},"--"],["star",{"sourceInterval":[1138,1152]},["seq",{"sourceInterval":[1139,1150]},["not",{"sourceInterval":[1139,1144]},["terminal",{"sourceInterval":[1140,1144]},"\n"]],["app",{"sourceInterval":[1145,1150]},"space",[]]]],["app",{"sourceInterval":[1153,1157]},"name",[]],["star",{"sourceInterval":[1158,1172]},["seq",{"sourceInterval":[1159,1170]},["not",{"sourceInterval":[1159,1164]},["terminal",{"sourceInterval":[1160,1164]},"\n"]],["app",{"sourceInterval":[1165,1170]},"space",[]]]],["alt",{"sourceInterval":[1174,1185]},["terminal",{"sourceInterval":[1174,1178]},"\n"],["lookahead",{"sourceInterval":[1181,1185]},["terminal",{"sourceInterval":[1182,1185]},"}"]]]]],"name":["define",{"sourceInterval":[1190,1230]},"a name",[],["seq",{"sourceInterval":[1211,1230]},["app",{"sourceInterval":[1211,1220]},"nameFirst",[]],["star",{"sourceInterval":[1221,1230]},["app",{"sourceInterval":[1221,1229]},"nameRest",[]]]]],"nameFirst":["define",{"sourceInterval":[1234,1266]},null,[],["alt",{"sourceInterval":[1250,1266]},["terminal",{"sourceInterval":[1250,1253]},"_"],["app",{"sourceInterval":[1260,1266]},"letter",[]]]],"nameRest":["define",{"sourceInterval":[1270,1300]},null,[],["alt",{"sourceInterval":[1285,1300]},["terminal",{"sourceInterval":[1285,1288]},"_"],["app",{"sourceInterval":[1295,1300]},"alnum",[]]]],"ident":["define",{"sourceInterval":[1304,1337]},"an identifier",[],["app",{"sourceInterval":[1333,1337]},"name",[]]],"terminal":["define",{"sourceInterval":[1341,1379]},null,[],["seq",{"sourceInterval":[1356,1379]},["terminal",{"sourceInterval":[1356,1360]},"\""],["star",{"sourceInterval":[1361,1374]},["app",{"sourceInterval":[1361,1373]},"terminalChar",[]]],["terminal",{"sourceInterval":[1375,1379]},"\""]]],"terminalChar":["define",{"sourceInterval":[1383,1440]},null,[],["alt",{"sourceInterval":[1402,1440]},["app",{"sourceInterval":[1402,1412]},"escapeChar",[]],["seq",{"sourceInterval":[1419,1440]},["not",{"sourceInterval":[1419,1424]},["terminal",{"sourceInterval":[1420,1424]},"\\"]],["not",{"sourceInterval":[1425,1430]},["terminal",{"sourceInterval":[1426,1430]},"\""]],["not",{"sourceInterval":[1431,1436]},["terminal",{"sourceInterval":[1432,1436]},"\n"]],["app",{"sourceInterval":[1437,1440]},"any",[]]]]],"escapeChar_backslash":["define",{"sourceInterval":[1483,1538]},null,[],["terminal",{"sourceInterval":[1483,1489]},"\\\\"]],"escapeChar_doubleQuote":["define",{"sourceInterval":[1545,1602]},null,[],["terminal",{"sourceInterval":[1545,1551]},"\\\""]],"escapeChar_singleQuote":["define",{"sourceInterval":[1609,1666]},null,[],["terminal",{"sourceInterval":[1609,1615]},"\\'"]],"escapeChar_backspace":["define",{"sourceInterval":[1673,1728]},null,[],["terminal",{"sourceInterval":[1673,1678]},"\\b"]],"escapeChar_lineFeed":["define",{"sourceInterval":[1735,1789]},null,[],["terminal",{"sourceInterval":[1735,1740]},"\\n"]],"escapeChar_carriageReturn":["define",{"sourceInterval":[1796,1856]},null,[],["terminal",{"sourceInterval":[1796,1801]},"\\r"]],"escapeChar_tab":["define",{"sourceInterval":[1863,1912]},null,[],["terminal",{"sourceInterval":[1863,1868]},"\\t"]],"escapeChar_unicodeEscape":["define",{"sourceInterval":[1919,1978]},null,[],["seq",{"sourceInterval":[1919,1960]},["terminal",{"sourceInterval":[1919,1924]},"\\u"],["app",{"sourceInterval":[1925,1933]},"hexDigit",[]],["app",{"sourceInterval":[1934,1942]},"hexDigit",[]],["app",{"sourceInterval":[1943,1951]},"hexDigit",[]],["app",{"sourceInterval":[1952,1960]},"hexDigit",[]]]],"escapeChar_hexEscape":["define",{"sourceInterval":[1985,2040]},null,[],["seq",{"sourceInterval":[1985,2008]},["terminal",{"sourceInterval":[1985,1990]},"\\x"],["app",{"sourceInterval":[1991,1999]},"hexDigit",[]],["app",{"sourceInterval":[2000,2008]},"hexDigit",[]]]],"escapeChar":["define",{"sourceInterval":[1444,2040]},"an escape sequence",[],["alt",{"sourceInterval":[1483,2040]},["app",{"sourceInterval":[1483,1489]},"escapeChar_backslash",[]],["app",{"sourceInterval":[1545,1551]},"escapeChar_doubleQuote",[]],["app",{"sourceInterval":[1609,1615]},"escapeChar_singleQuote",[]],["app",{"sourceInterval":[1673,1678]},"escapeChar_backspace",[]],["app",{"sourceInterval":[1735,1740]},"escapeChar_lineFeed",[]],["app",{"sourceInterval":[1796,1801]},"escapeChar_carriageReturn",[]],["app",{"sourceInterval":[1863,1868]},"escapeChar_tab",[]],["app",{"sourceInterval":[1919,1960]},"escapeChar_unicodeEscape",[]],["app",{"sourceInterval":[1985,2008]},"escapeChar_hexEscape",[]]]],"space":["extend",{"sourceInterval":[2044,2063]},null,[],["app",{"sourceInterval":[2056,2063]},"comment",[]]],"comment_singleLine":["define",{"sourceInterval":[2081,2118]},null,[],["seq",{"sourceInterval":[2081,2103]},["terminal",{"sourceInterval":[2081,2085]},"//"],["star",{"sourceInterval":[2086,2098]},["seq",{"sourceInterval":[2087,2096]},["not",{"sourceInterval":[2087,2092]},["terminal",{"sourceInterval":[2088,2092]},"\n"]],["app",{"sourceInterval":[2093,2096]},"any",[]]]],["terminal",{"sourceInterval":[2099,2103]},"\n"]]],"comment_multiLine":["define",{"sourceInterval":[2125,2161]},null,[],["seq",{"sourceInterval":[2125,2147]},["terminal",{"sourceInterval":[2125,2129]},"/*"],["star",{"sourceInterval":[2130,2142]},["seq",{"sourceInterval":[2131,2140]},["not",{"sourceInterval":[2131,2136]},["terminal",{"sourceInterval":[2132,2136]},"*/"]],["app",{"sourceInterval":[2137,2140]},"any",[]]]],["terminal",{"sourceInterval":[2143,2147]},"*/"]]],"comment":["define",{"sourceInterval":[2067,2161]},null,[],["alt",{"sourceInterval":[2081,2161]},["app",{"sourceInterval":[2081,2103]},"comment_singleLine",[]],["app",{"sourceInterval":[2125,2147]},"comment_multiLine",[]]]],"tokens":["define",{"sourceInterval":[2165,2180]},null,[],["star",{"sourceInterval":[2174,2180]},["app",{"sourceInterval":[2174,2179]},"token",[]]]],"token":["define",{"sourceInterval":[2184,2260]},null,[],["alt",{"sourceInterval":[2192,2260]},["app",{"sourceInterval":[2192,2200]},"caseName",[]],["app",{"sourceInterval":[2203,2210]},"comment",[]],["app",{"sourceInterval":[2213,2218]},"ident",[]],["app",{"sourceInterval":[2221,2229]},"operator",[]],["app",{"sourceInterval":[2232,2243]},"punctuation",[]],["app",{"sourceInterval":[2246,2254]},"terminal",[]],["app",{"sourceInterval":[2257,2260]},"any",[]]]],"operator":["define",{"sourceInterval":[2264,2329]},null,[],["alt",{"sourceInterval":[2275,2329]},["terminal",{"sourceInterval":[2275,2279]},"<:"],["terminal",{"sourceInterval":[2282,2285]},"="],["terminal",{"sourceInterval":[2288,2292]},":="],["terminal",{"sourceInterval":[2295,2299]},"+="],["terminal",{"sourceInterval":[2302,2305]},"*"],["terminal",{"sourceInterval":[2308,2311]},"+"],["terminal",{"sourceInterval":[2314,2317]},"?"],["terminal",{"sourceInterval":[2320,2323]},"~"],["terminal",{"sourceInterval":[2326,2329]},"&"]]],"punctuation":["define",{"sourceInterval":[2333,2369]},null,[],["alt",{"sourceInterval":[2347,2369]},["terminal",{"sourceInterval":[2347,2350]},"<"],["terminal",{"sourceInterval":[2353,2356]},">"],["terminal",{"sourceInterval":[2359,2362]},","],["terminal",{"sourceInterval":[2365,2369]},"--"]]]}]);


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var base = __webpack_require__(79);
	var arithmetic = __webpack_require__(80);
	var keyvalue = __webpack_require__(81);
	var story = __webpack_require__(82);
	var Expression = __webpack_require__(83);
	var Comment = __webpack_require__(84);
	var LogicBlock = __webpack_require__(85);
	var Exp = __webpack_require__(86);

	module.exports = Object.assign({}, base, arithmetic, keyvalue, story, Expression, Comment, LogicBlock, Exp);

/***/ }),
/* 79 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	function parseSignedHexNumber(string) {
	  var char = string[0];
	  if (char === '-') {
	    return -Number(string.substr(1));
	  } else {
	    return Number(string.substr(1));
	  }
	}

	module.exports = {
	  value: function value(n) {
	    var value;
	    switch (n.ctorName) {
	      case 'string':
	        value = n.parse();break;
	      case 'number':
	        value = Number(n.parse()) || parseSignedHexNumber(n.parse());break;
	      case 'boolean':
	        value = n.parse().toLowerCase() === 'true';break;
	      case 'array':
	        value = n.parse();break;
	      default:
	        value = null;
	    }
	    return {
	      type: 'value',
	      value: value
	    };
	  },
	  number_sign: function number_sign(sign, number) {
	    return sign.parse() + number.parse();
	  },
	  number_fract: function number_fract(number, dot, decimal) {
	    return number.parse() + '.' + decimal.parse();
	  },
	  number_hex: function number_hex(head, octdigit) {
	    return '0x' + octdigit.parse();
	  },
	  array: function array(head, list, foot) {
	    return list.parse().map(function (item) {
	      return item.value;
	    });
	  },
	  nonemptyListOf: function nonemptyListOf(a, b, c) {
	    return [a.parse()].concat(_toConsumableArray(c.parse()));
	  },
	  string_doubleQuote: function string_doubleQuote(quoteA, stringContent, quoteB) {
	    return stringContent.parse();
	  },
	  string_singleQuote: function string_singleQuote(quoteA, stringContent, quoteB) {
	    return stringContent.parse();
	  },
	  _iter: function _iter(children) {
	    var ret = [];
	    var hasObject = false;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var child = _step.value;

	        var value = child.parse();
	        hasObject = hasObject || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
	        ret.push(value);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return hasObject ? ret : ret.join('');
	  },
	  _terminal: function _terminal() {
	    return this.primitiveValue;
	  }
	};

/***/ }),
/* 80 */
/***/ (function(module, exports) {

	'use strict';

	function mathExp(left, operator, right) {
	  return {
	    type: 'expression',
	    value: {
	      left: left.parse(),
	      operator: operator.parse(),
	      right: right.parse()
	    }
	  };
	}

	module.exports = {
	  variable: function variable(prefix, n) {
	    return {
	      type: 'variable',
	      prefix: prefix.parse() || null,
	      value: n.parse()
	    };
	  },

	  AddExp_add: mathExp,
	  MulExp_mul: mathExp,
	  ExpExp_power: mathExp,
	  PriExp_paren: function PriExp_paren(head, MathExp, foot) {
	    return MathExp.parse();
	  },
	  PriExp_neg: function PriExp_neg(neg, PriExp) {
	    return {
	      type: 'expression',
	      value: {
	        left: {
	          type: 'value',
	          value: 0
	        },
	        operator: '-',
	        right: PriExp.parse()
	      }
	    };
	  },
	  PriExp_pos: function PriExp_pos(pos, PriExp) {
	    return {
	      type: 'expression',
	      value: {
	        left: {
	          type: 'value',
	          value: 0
	        },
	        operator: '+',
	        right: PriExp.parse()
	      }
	    };
	  }
	};

/***/ }),
/* 81 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	module.exports = {
	  content_mul: function content_mul(kv, space, content) {
	    var ret = {
	      flags: [],
	      params: {}
	    };
	    var result = kv.parse();
	    if (result.length === 1) {
	      ret.flags.push(result[0]);
	    } else {
	      ret.params[result[0]] = result[1];
	    }
	    var ret2 = content.parse();
	    ret.flags = ret.flags.concat(ret2.flags);
	    Object.assign(ret.params, ret2.params);
	    return ret;
	  },
	  content_base: function content_base(kv) {
	    var ret = {
	      flags: [],
	      params: {}
	    };
	    var result = kv.parse();
	    if (result.length === 1) {
	      ret.flags.push(result[0]);
	    } else {
	      ret.params[result[0]] = result[1];
	    }
	    return ret;
	  },
	  keyValue_param: function keyValue_param(key, syntex, value) {
	    return [key.parse(), value.parse()];
	  },
	  keyValue_flag: function keyValue_flag(key) {
	    return [key.parse()];
	  }
	};

/***/ }),
/* 82 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	module.exports = {
	  StoryLine_formatA: function StoryLine_formatA(head, command, content, foot) {
	    console.warn('[Deprecated] Command beginning with `@` will no longer be supported.');
	    var content = content.parse();
	    return {
	      type: 'content',
	      command: command.parse(),
	      flags: content.flags,
	      params: content.params
	    };
	  },
	  StoryLine_formatB: function StoryLine_formatB(head, command, content, foot) {
	    var content = content.parse();
	    return {
	      type: 'content',
	      command: command.parse(),
	      flags: content.flags,
	      params: content.params
	    };
	  },
	  StoryLine_formatC: function StoryLine_formatC(head, command, foot) {
	    console.warn('[Deprecated] Command beginning with `@` will no longer be supported.');
	    return {
	      type: 'content',
	      command: command.parse(),
	      flags: [],
	      params: {}
	    };
	  },
	  StoryLine_formatD: function StoryLine_formatD(head, command, foot) {
	    return {
	      type: 'content',
	      command: command.parse(),
	      flags: [],
	      params: {}
	    };
	  },
	  StoryLine_formatE: function StoryLine_formatE(text) {
	    var textContent = text.parse();
	    return {
	      type: 'content',
	      command: '*',
	      flags: [],
	      params: { raw: { type: 'value', value: textContent } }
	    };
	  },
	  command: function command(key) {
	    return key.parse();
	  }
	};

/***/ }),
/* 83 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	module.exports = {
	  Exp_bool: function Exp_bool(JudgeExp, booleanOperator, Exp) {
	    return {
	      type: 'expression',
	      value: {
	        left: JudgeExp.parse(),
	        operator: booleanOperator.parse(),
	        right: Exp.parse()
	      }
	    };
	  },
	  JudgeExp_judge: function JudgeExp_judge(left, operator, right) {
	    return {
	      type: 'expression',
	      value: {
	        left: left.parse(),
	        operator: operator.parse(),
	        right: right.parse()
	      }
	    };
	  }
	};

/***/ }),
/* 84 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	module.exports = {
	  Comment_single: function Comment_single(head, text) {
	    return {
	      type: 'comment',
	      value: text.parse()
	    };
	  },
	  Comment_multi: function Comment_multi(head, text, foot) {
	    return {
	      type: 'comment',
	      value: text.parse()
	    };
	  }
	};

/***/ }),
/* 85 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	module.exports = {
	  LogicBlock_IF: function LogicBlock_IF(IF, LogicBlock1, ELSEIFs, LogicBlock2s, ELSE, LogicBlock3, END) {
	    // get conditions
	    var conditions = [IF.parse()];
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = ELSEIFs.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var ELSEIF = _step.value;

	        conditions.push(ELSEIF.parse());
	      }

	      // get stroy block
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    var blocks = [];
	    var block1 = [];
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = LogicBlock1.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var LogicBlock = _step2.value;

	        block1.push(LogicBlock.parse());
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }

	    blocks.push(block1);
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;

	    try {
	      for (var _iterator3 = LogicBlock2s.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	        var LogicBlock2 = _step3.value;

	        var block2 = [];
	        var _iteratorNormalCompletion5 = true;
	        var _didIteratorError5 = false;
	        var _iteratorError5 = undefined;

	        try {
	          for (var _iterator5 = LogicBlock2.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	            var LogicBlock = _step5.value;

	            block2.push(LogicBlock.parse());
	          }
	        } catch (err) {
	          _didIteratorError5 = true;
	          _iteratorError5 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	              _iterator5.return();
	            }
	          } finally {
	            if (_didIteratorError5) {
	              throw _iteratorError5;
	            }
	          }
	        }

	        blocks.push(block2);
	      }
	    } catch (err) {
	      _didIteratorError3 = true;
	      _iteratorError3 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	          _iterator3.return();
	        }
	      } finally {
	        if (_didIteratorError3) {
	          throw _iteratorError3;
	        }
	      }
	    }

	    var block3 = [];
	    if (LogicBlock3.child(0)) {
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = LogicBlock3.child(0).children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var LogicBlock = _step4.value;

	          block3.push(LogicBlock.parse());
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }
	    }
	    blocks.push(block3);

	    return {
	      type: 'logic',
	      name: 'if',
	      conditions: conditions,
	      blocks: blocks
	    };
	  },
	  LogicBlock_WHILE: function LogicBlock_WHILE(WHILE, LogicBlocks, END) {
	    var condition = WHILE.parse();
	    var block = [];
	    var _iteratorNormalCompletion6 = true;
	    var _didIteratorError6 = false;
	    var _iteratorError6 = undefined;

	    try {
	      for (var _iterator6 = LogicBlocks.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	        var LogicBlock = _step6.value;

	        block.push(LogicBlock.parse());
	      }
	    } catch (err) {
	      _didIteratorError6 = true;
	      _iteratorError6 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion6 && _iterator6.return) {
	          _iterator6.return();
	        }
	      } finally {
	        if (_didIteratorError6) {
	          throw _iteratorError6;
	        }
	      }
	    }

	    return {
	      type: 'logic',
	      name: 'while',
	      condition: condition,
	      block: block
	    };
	  },
	  LogicBlock_FOREACH: function LogicBlock_FOREACH(FOREACH, LogicBlocks, END) {
	    var condition = FOREACH.parse();
	    var block = [];
	    var _iteratorNormalCompletion7 = true;
	    var _didIteratorError7 = false;
	    var _iteratorError7 = undefined;

	    try {
	      for (var _iterator7 = LogicBlocks.children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	        var LogicBlock = _step7.value;

	        block.push(LogicBlock.parse());
	      }
	    } catch (err) {
	      _didIteratorError7 = true;
	      _iteratorError7 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion7 && _iterator7.return) {
	          _iterator7.return();
	        }
	      } finally {
	        if (_didIteratorError7) {
	          throw _iteratorError7;
	        }
	      }
	    }

	    return {
	      type: 'logic',
	      name: 'foreach',
	      child: condition.child,
	      children: condition.children,
	      block: block
	    };
	  },
	  IF: function IF(head, Expression) {
	    // condtion Object
	    return Expression.parse();
	  },
	  ELSEIF: function ELSEIF(head, Expression) {
	    // condtion Object
	    return Expression.parse();
	  },
	  WHILE: function WHILE(head, Expression) {
	    // condtion Object
	    return Expression.parse();
	  },
	  FOREACH: function FOREACH(head, childVar, _in, childrenVar) {
	    return {
	      child: childVar.parse(),
	      children: childrenVar.parse()
	    };
	  },
	  LET_assign: function LET_assign(head, variable, operator, Exp) {
	    var explicit = head.parse().length > 1;
	    return {
	      type: 'logic',
	      name: 'let',
	      explicit: explicit,
	      left: variable.parse(),
	      right: Exp.parse()
	    };
	  },
	  LET_nonAssign: function LET_nonAssign(head, variable) {
	    return {
	      type: 'logic',
	      name: 'let',
	      explicit: true,
	      left: variable.parse(),
	      right: { type: 'value', value: null }
	    };
	  }
	};

/***/ }),
/* 86 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	module.exports = {
	  Scripts: function Scripts(n) {
	    var ret = [];
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = n.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var child = _step.value;

	        ret.push(child.parse());
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return ret;
	  }
	};

/***/ }),
/* 87 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	module.exports = "\nBKS {\n  Scripts\n    = LogicBlock*\n\n  LogicBlock\n    = Comment\n    | IF LogicBlock* (ELSEIF LogicBlock*)* (ELSE LogicBlock*)? END  -- IF\n    | WHILE LogicBlock* END  -- WHILE\n    | FOREACH LogicBlock* END  -- FOREACH\n    | LET                      -- LET\n    | StoryLine                       -- Story\n\n  Comment = \"//\" comment_single     -- single\n          | \"/*\" comment_multi \"*/\"       -- multi\n\n  comment_single = (~(\"\\n\" | \"\\r\") any)+\n  comment_multi = (~(\"*/\") any)+\n\n  StoryLine\n    = \"[\" command content \"]\"    -- formatB\n      | \"@\" command content (\"\\r\"|\"\\n\"|end)  -- formatA\n      | \"@\" command (\"\\r\"|\"\\n\"|end)  -- formatC\n      | \"[\" command \"]\"    -- formatD\n      | text -- formatE\n\n  text = (~(\"[\" | \"@\" | \"#\" | \"\\n\" | \"\\r\" | \"//\" | \"/*\") any)+\n\n  command = key\n\n  content = keyValue \" \" content -- mul\n  | keyValue                -- base\n\n  keyValue = key \"=\" value  -- param\n    | key        -- flag\n\n  key = (letter | number | \"_\")+\n\n  value = string | number | boolean | \"null\" | array\n\n  array = \"[\" listOf<value, \",\"> \"]\"\n\n  string = \"\\\"\" doubleQuoteStringContent* \"\\\"\" -- doubleQuote\n      | \"\\'\" singleQuoteStringContent* \"\\'\" -- singleQuote\n\n// ~(\"\\'\" | \"\\\\\" ) any  -- nonEscaped\n\n  singleQuoteStringContent = ~(\"\\'\") any  -- nonEscaped\n      | \"\\\\\" escapeCharacter                 -- escaped\n\n  doubleQuoteStringContent = ~(\"\\\"\") any  -- nonEscaped\n      | \"\\\\\" escapeCharacter                 -- escaped\n\n  singleEscapeCharacter = \"'\"|\"\\\"\"|\"\\\\\"|\"b\"|\"f\"|\"n\"|\"r\"|\"t\"|\"v\"\n  escapeCharacter = singleEscapeCharacter | \"x\" | \"u\"\n\n  quote = \"\\\"\" | \"\\'\"\n\n  boolean = (\"true\" | \"false\") ~variable\n\n  number  (a number)\n    = (\"-\"|\"+\") number   -- sign\n    | digit* \".\" digit+  --  fract\n    | \"0x\" hexdigit+        --  hex\n    | digit+             --  whole\n\n  hexdigit\n    = \"a\"..\"f\" | \"A\"..\"F\" | digit\n\n  variable = ~number (\"$\" | \"%\")? (letter | number | \"_\")+\n\n  IF\n    = \"#if\" Exp\n\n  LET\n    = (\"#let\" | \"#\") variable \"=\" Exp  -- assign\n    | \"#let\" variable              -- nonAssign\n\n  END\n    = \"#end\"\n\n  ELSE\n    = \"#else\"\n\n  ELSEIF\n    = \"#elseif\" Exp\n\n  WHILE\n    = \"#while\" Exp\n\n  FOREACH\n    = \"#foreach\" variable \"in\" variable\n\n  Exp\n    = JudgeExp booleanOperator Exp  -- bool\n    | JudgeExp\n\n  booleanOperator = \"&&\" | \"||\"\n\n  JudgeExp\n    = AddExp judgeOperator AddExp     -- judge\n    | AddExp\n\n  judgeOperator = \"==\" | \">=\" | \"<=\" | \">\" | \"<\"\n\n  // MathExp\n  // = MathExp mathOperator MathExp  -- math\n  // | PriExp\n\n  // mathOperator = \"+\" | \"-\" | \"*\" | \"/\" | \"^\" | \"%\"\n\n  AddExp\n  = AddExp (\"+\" | \"-\") MulExp  -- add\n  // | AddExp \"-\" MulExp  -- minus\n  | MulExp\n\n  MulExp\n    = MulExp (\"*\" | \"/\" | \"%\") ExpExp  -- mul\n    // | MulExp \"/\" ExpExp  -- divide\n    // | MulExp \"%\" ExpExp  -- mod\n    | ExpExp\n\n  ExpExp\n    = PriExp \"^\" ExpExp  -- power\n    | PriExp\n\n  PriExp\n  = \"(\" Exp \")\"  -- paren\n  | \"+\" PriExp   -- pos\n  | \"-\" PriExp   -- neg\n  | value\n  | variable\n\n}\n";

/***/ }),
/* 88 */
/***/ (function(module, exports) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var GLOBAL = {},
	    SAVE = {},
	    SCOPES = [];
	var CURRENTSCOPE = {};

	function calculate(exp) {
	  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	  switch (exp.type) {
	    case 'expression':
	      var value = exp.value;
	      return calc_expression(calculate(value.left), value.operator, calculate(value.right));
	    case 'variable':
	      return calc_variable(exp.value, exp.prefix, node);
	    case 'value':
	      return exp.value;
	    default:
	      throw 'Unrecognized type ' + type;
	  }
	}

	function calc_expression(left, operator, right) {
	  switch (operator) {
	    case '&&':
	      return left && right;break;
	    case '||':
	      return left || right;break;
	    case '==':
	      return left == right;break;
	    case '>=':
	      return left >= right;break;
	    case '<=':
	      return left <= right;break;
	    case '>':
	      return left > right;break;
	    case '<':
	      return left < right;break;
	    case '+':
	      return left + right;break;
	    case '-':
	      return left - right;break;
	    case '*':
	      return left * right;break;
	    case '/':
	      return left / right;break;
	    case '^':
	      return Math.pow(left, right);break;
	    case '%':
	      return left % right;break;
	    default:
	      throw 'Unrecognized operator ' + operator;
	  }
	}

	function calc_variable(name, prefix, node) {
	  switch (prefix) {
	    case null:
	      return findVariableValue(name, node);break;
	    case '$':
	      return GLOBAL[name];break;
	    case '%':
	      return SAVE[name];break;
	    default:
	      throw 'Unrecognized prefix ' + prefix;
	  }
	}

	function findVariableValue(name) {
	  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	  var ret = null;
	  var _SCOPES = [].concat(_toConsumableArray(SCOPES), [CURRENTSCOPE]);
	  for (var i = _SCOPES.length - 1 - node; i > -1; i--) {
	    var scope = _SCOPES[i];
	    ret = scope[name] || null;
	    if (ret) {
	      break;
	    }
	  }
	  return ret;
	}

	function _assign(name, prefix, value, explicit) {
	  if (prefix) {
	    if (prefix === '$') {
	      GLOBAL[name] = value;
	    } else if (prefix === '%') {
	      SAVE[name] = value;
	    }
	  } else if (explicit) {
	    var scope = CURRENTSCOPE;
	    if (scope[name]) {
	      throw 'Identifier \'' + name + '\' has already been declared';
	    } else {
	      scope[name] = value;
	    }
	  } else {
	    var defined = false;
	    var _scope = null;
	    var _SCOPES = [].concat(_toConsumableArray(SCOPES), [CURRENTSCOPE]);
	    for (var i = _SCOPES.length - 1; i > -1; i--) {
	      _scope = _SCOPES[i];
	      if (_scope.hasOwnProperty(name)) {
	        defined = true;
	        break;
	      }
	    }
	    if (defined) {
	      _scope[name] = value;
	    } else {
	      throw name + ' is not defined';
	    }
	  }
	}

	module.exports = {
	  load: function load() {
	    GLOBAL = {};
	    SAVE = {};
	    SCOPES = [];
	    CURRENTSCOPE = {};
	  },
	  dump: function dump() {
	    return {
	      GLOBAL: GLOBAL,
	      SAVE: SAVE,
	      SCOPES: SCOPES,
	      CURRENTSCOPE: CURRENTSCOPE
	    };
	  },
	  getGlobalScope: function getGlobalScope() {
	    return GLOBAL;
	  },
	  getSaveScope: function getSaveScope() {
	    return SAVE;
	  },
	  getScope: function getScope(node) {
	    return [].concat(_toConsumableArray(SCOPES), [CURRENTSCOPE])[SCOPES.length - node];
	  },
	  setGlobalScope: function setGlobalScope(scope) {
	    GLOBAL = scope;
	  },
	  setSaveScope: function setSaveScope(scope) {
	    SAVE = scope;
	  },
	  setScopes: function setScopes(scopes) {
	    SCOPES = SCOPES;
	    this.popScope();
	  },
	  pushScope: function pushScope() {
	    var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    SCOPES.push(CURRENTSCOPE);
	    CURRENTSCOPE = scope;
	  },
	  popScope: function popScope() {
	    CURRENTSCOPE = SCOPES.pop();
	  },
	  calc: function calc(exp, node) {
	    return calculate(exp);
	  },
	  assign: function assign(name, prefix, right, explicit) {
	    return _assign(name, prefix, calculate(right), explicit);
	  }
	};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var variable = __webpack_require__(88);

	var IfBlock = function () {
	  function IfBlock(data, blockIndex) {
	    _classCallCheck(this, IfBlock);

	    this.reset();
	    this.data = data;
	    this.blockIndex = blockIndex;
	    variable.pushScope();
	  }

	  _createClass(IfBlock, [{
	    key: 'reset',
	    value: function reset() {
	      this.data = [];
	      this.currentLine = 0;
	      this.done = false;
	    }
	  }, {
	    key: 'getData',
	    value: function getData() {
	      return {
	        type: 'if',
	        currentLine: this.currentLine,
	        blockIndex: this.blockIndex
	      };
	    }
	  }, {
	    key: 'setCurrentLine',
	    value: function setCurrentLine(no) {
	      this.currentLine = no;
	    }
	  }, {
	    key: 'getLine',
	    value: function getLine(no) {
	      return this.data[no];
	    }
	  }, {
	    key: Symbol.iterator,
	    value: function value() {
	      return this;
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      if (this.currentLine < this.data.length) {
	        var line = this.data[this.currentLine++];
	        return { value: line, done: false };
	      } else {
	        // !this.done && variable.popScope();
	        // this.done = true;
	        return { done: true };
	      }
	    }
	  }]);

	  return IfBlock;
	}();

	var WhileBlock = function () {
	  function WhileBlock(data, condition) {
	    _classCallCheck(this, WhileBlock);

	    this.reset();
	    this.data = data;
	    this.condition = condition;
	    variable.pushScope();
	  }

	  _createClass(WhileBlock, [{
	    key: 'reset',
	    value: function reset() {
	      this.data = [];
	      this.currentLine = 0;
	      this.done = false;
	    }
	  }, {
	    key: 'getData',
	    value: function getData() {
	      return {
	        type: 'while',
	        currentLine: this.currentLine
	      };
	    }
	  }, {
	    key: 'setCurrentLine',
	    value: function setCurrentLine(no) {
	      this.currentLine = no;
	    }
	  }, {
	    key: 'getLine',
	    value: function getLine(no) {
	      return this.data[no];
	    }
	  }, {
	    key: Symbol.iterator,
	    value: function value() {
	      return this;
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      if (this.currentLine < this.data.length) {
	        var line = this.data[this.currentLine++];
	        return { value: line, done: false };
	      } else {
	        if (variable.calc(this.condition)) {
	          this.currentLine = 0;
	          variable.popScope();
	          variable.pushScope();
	          return this.next();
	        } else {
	          // !this.done && variable.popScope();
	          // this.done = true;
	          return { done: true };
	        }
	      }
	    }
	  }]);

	  return WhileBlock;
	}();

	var ForeachBlock = function () {
	  function ForeachBlock(data, child, children) {
	    _classCallCheck(this, ForeachBlock);

	    this.reset();
	    this.data = data;
	    this.child = child;
	    this.children = variable.calc(children);
	    this.index = 0;
	    variable.pushScope();
	    variable.assign(this.child.value, this.child.prefix, { type: 'value', value: this.children[this.index] }, true);
	  }

	  _createClass(ForeachBlock, [{
	    key: 'reset',
	    value: function reset() {
	      this.data = [];
	      this.currentLine = 0;
	      this.done = false;
	    }
	  }, {
	    key: 'getData',
	    value: function getData() {
	      return {
	        type: 'foreach',
	        currentLine: this.currentLine
	      };
	    }
	  }, {
	    key: 'setCurrentLine',
	    value: function setCurrentLine(no) {
	      this.currentLine = no;
	    }
	  }, {
	    key: 'getLine',
	    value: function getLine(no) {
	      return this.data[no];
	    }
	  }, {
	    key: Symbol.iterator,
	    value: function value() {
	      return this;
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      if (this.currentLine < this.data.length) {
	        var line = this.data[this.currentLine++];
	        return { value: line, done: false };
	      } else {
	        if (this.index < this.children.length - 1) {
	          this.currentLine = 0;
	          this.index++;
	          variable.popScope();
	          variable.pushScope();
	          variable.assign(this.child.value, this.child.prefix, { type: 'value', value: this.children[this.index] }, true);
	          return this.next();
	        } else {
	          // !this.done && variable.popScope();
	          // this.done = true;
	          return { done: true };
	        }
	      }
	    }
	  }]);

	  return ForeachBlock;
	}();

	module.exports = { IfBlock: IfBlock, WhileBlock: WhileBlock, ForeachBlock: ForeachBlock };

/***/ })
/******/ ])
});
;