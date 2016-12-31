'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var assert = _interopDefault(require('assert'));
var domain = _interopDefault(require('domain'));

/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var index$3 = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};

var isObject = index$3;

var index$2 = function extend(o/*, objects*/) {
  if (!isObject(o)) { o = {}; }

  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    var obj = arguments[i];

    if (isObject(obj)) {
      assign(o, obj);
    }
  }
  return o;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}



function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var domain$1; // The domain module is executed on demand
var hasSetImmediate = typeof setImmediate === "function";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including network IO events in Node.js.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
var raw = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Avoids a function call
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index$10 = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory excaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index$10 < queue.length) {
        var currentIndex = index$10;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index$10 = index$10 + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index$10 > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index$10; scan < newLength; scan++) {
                queue[scan] = queue[scan + index$10];
            }
            queue.length -= index$10;
            index$10 = 0;
        }
    }
    queue.length = 0;
    index$10 = 0;
    flushing = false;
}

rawAsap.requestFlush = requestFlush;
function requestFlush() {
    // Ensure flushing is not bound to any domain.
    // It is not sufficient to exit the domain, because domains exist on a stack.
    // To execute code outside of any domain, the following dance is necessary.
    var parentDomain = process.domain;
    if (parentDomain) {
        if (!domain$1) {
            // Lazy execute the domain module.
            // Only employed if the user elects to use domains.
            domain$1 = domain;
        }
        domain$1.active = process.domain = null;
    }

    // `setImmediate` is slower that `process.nextTick`, but `process.nextTick`
    // cannot handle recursion.
    // `requestFlush` will only be called recursively from `asap.js`, to resume
    // flushing after an error is thrown into a domain.
    // Conveniently, `setImmediate` was introduced in the same version
    // `process.nextTick` started throwing recursion errors.
    if (flushing && hasSetImmediate) {
        setImmediate(flush);
    } else {
        process.nextTick(flush);
    }

    if (parentDomain) {
        domain$1.active = process.domain = parentDomain;
    }
}

var asap = raw;

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

var core = Promise$1;

function Promise$1(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('not a function');
  }
  this._45 = 0;
  this._81 = 0;
  this._65 = null;
  this._54 = null;
  if (fn === noop) { return; }
  doResolve(fn, this);
}
Promise$1._10 = null;
Promise$1._97 = null;
Promise$1._61 = noop;

Promise$1.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise$1) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise$1(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise$1(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
}
function handle(self, deferred) {
  while (self._81 === 3) {
    self = self._65;
  }
  if (Promise$1._10) {
    Promise$1._10(self);
  }
  if (self._81 === 0) {
    if (self._45 === 0) {
      self._45 = 1;
      self._54 = deferred;
      return;
    }
    if (self._45 === 1) {
      self._45 = 2;
      self._54 = [self._54, deferred];
      return;
    }
    self._54.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  asap(function() {
    var cb = self._81 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._81 === 1) {
        resolve(deferred.promise, self._65);
      } else {
        reject(deferred.promise, self._65);
      }
      return;
    }
    var ret = tryCallOne(cb, self._65);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise$1
    ) {
      self._81 = 3;
      self._65 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._81 = 1;
  self._65 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._81 = 2;
  self._65 = newValue;
  if (Promise$1._97) {
    Promise$1._97(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._45 === 1) {
    handle(self, self._54);
    self._54 = null;
  }
  if (self._45 === 2) {
    for (var i = 0; i < self._54.length; i++) {
      handle(self, self._54[i]);
    }
    self._54 = null;
  }
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) { return; }
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) { return; }
    done = true;
    reject(promise, reason);
  });
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}

var Promise$2 = core;

Promise$2.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};

var Promise$3 = core;

Promise$3.prototype['finally'] = function (f) {
  return this.then(function (value) {
    return Promise$3.resolve(f()).then(function () {
      return value;
    });
  }, function (err) {
    return Promise$3.resolve(f()).then(function () {
      throw err;
    });
  });
};

//This file contains the ES6 extensions to the core Promises/A+ API

var Promise$4 = core;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise$4(Promise$4._61);
  p._81 = 1;
  p._65 = value;
  return p;
}
Promise$4.resolve = function (value) {
  if (value instanceof Promise$4) { return value; }

  if (value === null) { return NULL; }
  if (value === undefined) { return UNDEFINED; }
  if (value === true) { return TRUE; }
  if (value === false) { return FALSE; }
  if (value === 0) { return ZERO; }
  if (value === '') { return EMPTYSTRING; }

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise$4(then.bind(value));
      }
    } catch (ex) {
      return new Promise$4(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise$4.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise$4(function (resolve, reject) {
    if (args.length === 0) { return resolve([]); }
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise$4 && val.then === Promise$4.prototype.then) {
          while (val._81 === 3) {
            val = val._65;
          }
          if (val._81 === 1) { return res(i, val._65); }
          if (val._81 === 2) { reject(val._65); }
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise$4(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise$4.reject = function (value) {
  return new Promise$4(function (resolve, reject) {
    reject(value);
  });
};

Promise$4.race = function (values) {
  return new Promise$4(function (resolve, reject) {
    values.forEach(function(value){
      Promise$4.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise$4.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

var rawAsap$1 = raw;
var freeTasks = [];

/**
 * Calls a task as soon as possible after returning, in its own event, with
 * priority over IO events. An exception thrown in a task can be handled by
 * `process.on("uncaughtException") or `domain.on("error")`, but will otherwise
 * crash the process. If the error is handled, all subsequent tasks will
 * resume.
 *
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
var asap_1 = asap$2;
function asap$2(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawTask.domain = process.domain;
    rawAsap$1(rawTask);
}

function RawTask() {
    this.task = null;
    this.domain = null;
}

RawTask.prototype.call = function () {
    if (this.domain) {
        this.domain.enter();
    }
    var threw = true;
    try {
        this.task.call();
        threw = false;
        // If the task throws an exception (presumably) Node.js restores the
        // domain stack for the next event.
        if (this.domain) {
            this.domain.exit();
        }
    } finally {
        // We use try/finally and a threw flag to avoid messing up stack traces
        // when we catch and release errors.
        if (threw) {
            // In Node.js, uncaught exceptions are considered fatal errors.
            // Re-throw them to interrupt flushing!
            // Ensure that flushing continues if an uncaught exception is
            // suppressed listening process.on("uncaughtException") or
            // domain.on("error").
            rawAsap$1.requestFlush();
        }
        // If the task threw an error, we do not want to exit the domain here.
        // Exiting the domain would prevent the domain from catching the error.
        this.task = null;
        this.domain = null;
        freeTasks.push(this);
    }
};

// This file contains then/promise specific extensions that are only useful
// for node.js interop

var Promise$5 = core;
var asap$1 = asap_1;

/* Static Functions */

Promise$5.denodeify = function (fn, argumentCount) {
  if (
    typeof argumentCount === 'number' && argumentCount !== Infinity
  ) {
    return denodeifyWithCount(fn, argumentCount);
  } else {
    return denodeifyWithoutCount(fn);
  }
};

var callbackFn = (
  'function (err, res) {' +
  'if (err) { rj(err); } else { rs(res); }' +
  '}'
);
function denodeifyWithCount(fn, argumentCount) {
  var args = [];
  for (var i = 0; i < argumentCount; i++) {
    args.push('a' + i);
  }
  var body = [
    'return function (' + args.join(',') + ') {',
    'var self = this;',
    'return new Promise(function (rs, rj) {',
    'var res = fn.call(',
    ['self'].concat(args).concat([callbackFn]).join(','),
    ');',
    'if (res &&',
    '(typeof res === "object" || typeof res === "function") &&',
    'typeof res.then === "function"',
    ') {rs(res);}',
    '});',
    '};'
  ].join('');
  return Function(['Promise', 'fn'], body)(Promise$5, fn);
}
function denodeifyWithoutCount(fn) {
  var fnLength = Math.max(fn.length - 1, 3);
  var args = [];
  for (var i = 0; i < fnLength; i++) {
    args.push('a' + i);
  }
  var body = [
    'return function (' + args.join(',') + ') {',
    'var self = this;',
    'var args;',
    'var argLength = arguments.length;',
    'if (arguments.length > ' + fnLength + ') {',
    'args = new Array(arguments.length + 1);',
    'for (var i = 0; i < arguments.length; i++) {',
    'args[i] = arguments[i];',
    '}',
    '}',
    'return new Promise(function (rs, rj) {',
    'var cb = ' + callbackFn + ';',
    'var res;',
    'switch (argLength) {',
    args.concat(['extra']).map(function (_, index) {
      return (
        'case ' + (index) + ':' +
        'res = fn.call(' + ['self'].concat(args.slice(0, index)).concat('cb').join(',') + ');' +
        'break;'
      );
    }).join(''),
    'default:',
    'args[argLength] = cb;',
    'res = fn.apply(self, args);',
    '}',
    
    'if (res &&',
    '(typeof res === "object" || typeof res === "function") &&',
    'typeof res.then === "function"',
    ') {rs(res);}',
    '});',
    '};'
  ].join('');

  return Function(
    ['Promise', 'fn'],
    body
  )(Promise$5, fn);
}

Promise$5.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var callback =
      typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var ctx = this;
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx);
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise$5(function (resolve, reject) {
          reject(ex);
        });
      } else {
        asap$1(function () {
          callback.call(ctx, ex);
        });
      }
    }
  }
};

Promise$5.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') { return this; }

  this.then(function (value) {
    asap$1(function () {
      callback.call(ctx, null, value);
    });
  }, function (err) {
    asap$1(function () {
      callback.call(ctx, err);
    });
  });
};

var Promise$6 = core;

Promise$6.enableSynchronous = function () {
  Promise$6.prototype.isPending = function() {
    return this.getState() == 0;
  };

  Promise$6.prototype.isFulfilled = function() {
    return this.getState() == 1;
  };

  Promise$6.prototype.isRejected = function() {
    return this.getState() == 2;
  };

  Promise$6.prototype.getValue = function () {
    if (this._81 === 3) {
      return this._65.getValue();
    }

    if (!this.isFulfilled()) {
      throw new Error('Cannot get a value of an unfulfilled promise.');
    }

    return this._65;
  };

  Promise$6.prototype.getReason = function () {
    if (this._81 === 3) {
      return this._65.getReason();
    }

    if (!this.isRejected()) {
      throw new Error('Cannot get a rejection reason of a non-rejected promise.');
    }

    return this._65;
  };

  Promise$6.prototype.getState = function () {
    if (this._81 === 3) {
      return this._65.getState();
    }
    if (this._81 === -1 || this._81 === -2) {
      return 0;
    }

    return this._81;
  };
};

Promise$6.disableSynchronous = function() {
  Promise$6.prototype.isPending = undefined;
  Promise$6.prototype.isFulfilled = undefined;
  Promise$6.prototype.isRejected = undefined;
  Promise$6.prototype.getValue = undefined;
  Promise$6.prototype.getReason = undefined;
  Promise$6.prototype.getState = undefined;
};

var index$8 = core;

var index$6 = index$8;

var index$11 = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

var index$5 = createCommonjsModule(function (module) {
'use strict';

var fs$$1 = fs;
var assert$$1 = assert;
var Promise = index$6;
var isPromise = index$11;

var tr = (module.exports = function (transformer) {
  return new Transformer(transformer);
});
tr.Transformer = Transformer;
tr.normalizeFn = normalizeFn;
tr.normalizeFnAsync = normalizeFnAsync;
tr.normalize = normalize;
tr.normalizeAsync = normalizeAsync;
if (fs$$1.readFile) {
  tr.readFile = Promise.denodeify(fs$$1.readFile);
  tr.readFileSync = fs$$1.readFileSync;
} else {
  tr.readFile = function () { throw new Error('fs.readFile unsupported'); };
  tr.readFileSync = function () { throw new Error('fs.readFileSync unsupported'); };
}

function normalizeFn(result) {
  if (typeof result === 'function') {
    return {fn: result, dependencies: []};
  } else if (result && typeof result === 'object' && typeof result.fn === 'function') {
    if ('dependencies' in result) {
      if (!Array.isArray(result.dependencies)) {
        throw new Error('Result should have a dependencies property that is an array');
      }
    } else {
      result.dependencies = [];
    }
    return result;
  } else {
    throw new Error('Invalid result object from transform.');
  }
}
function normalizeFnAsync(result, cb) {
  return Promise.resolve(result).then(function (result) {
    if (result && isPromise(result.fn)) {
      return result.fn.then(function (fn) {
        result.fn = fn;
        return result;
      });
    }
    return result;
  }).then(tr.normalizeFn).nodeify(cb);
}
function normalize(result) {
  if (typeof result === 'string') {
    return {body: result, dependencies: []};
  } else if (result && typeof result === 'object' && typeof result.body === 'string') {
    if ('dependencies' in result) {
      if (!Array.isArray(result.dependencies)) {
        throw new Error('Result should have a dependencies property that is an array');
      }
    } else {
      result.dependencies = [];
    }
    return result;
  } else {
    throw new Error('Invalid result object from transform.');
  }
}
function normalizeAsync(result, cb) {
  return Promise.resolve(result).then(function (result) {
    if (result && isPromise(result.body)) {
      return result.body.then(function (body) {
        result.body = body;
        return result;
      });
    }
    return result;
  }).then(tr.normalize).nodeify(cb);
}

function Transformer(tr) {
  assert$$1(tr, 'Transformer must be an object');
  assert$$1(typeof tr.name === 'string', 'Transformer must have a name');
  assert$$1(typeof tr.outputFormat === 'string', 'Transformer must have an output format');
  assert$$1([
    'compile',
    'compileAsync',
    'compileFile',
    'compileFileAsync',
    'compileClient',
    'compileClientAsync',
    'compileFileClient',
    'compileFileClientAsync',
    'render',
    'renderAsync',
    'renderFile',
    'renderFileAsync'
  ].some(function (method) {
    return typeof tr[method] === 'function';
  }), 'Transformer must implement at least one of the potential methods.');
  this._tr = tr;
  this.name = this._tr.name;
  this.outputFormat = this._tr.outputFormat;
  this.inputFormats = this._tr.inputFormats || [this.name];
}

var fallbacks = {
  compile: ['compile', 'render'],
  compileAsync: ['compileAsync', 'compile', 'render'],
  compileFile: ['compileFile', 'compile', 'renderFile', 'render'],
  compileFileAsync: [
    'compileFileAsync', 'compileFile', 'compileAsync', 'compile',
    'renderFile', 'render'
  ],
  compileClient: ['compileClient'],
  compileClientAsync: ['compileClientAsync', 'compileClient'],
  compileFileClient: ['compileFileClient', 'compileClient'],
  compileFileClientAsync: [
    'compileFileClientAsync', 'compileFileClient', 'compileClientAsync', 'compileClient'
  ],
  render: ['render', 'compile'],
  renderAsync: ['renderAsync', 'render', 'compileAsync', 'compile'],
  renderFile: ['renderFile', 'render', 'compileFile', 'compile'],
  renderFileAsync: [
    'renderFileAsync', 'renderFile', 'renderAsync', 'render',
    'compileFileAsync', 'compileFile', 'compileAsync', 'compile'
  ]
};

Transformer.prototype._hasMethod = function (method) {
  return typeof this._tr[method] === 'function';
};
Transformer.prototype.can = function (method) {
  return fallbacks[method].some(function (method) {
    return this._hasMethod(method);
  }.bind(this));
};

/* COMPILE */

Transformer.prototype.compile = function (str, options) {
  if (!this._hasMethod('compile')) {
    if (this.can('render')) {
      var _this = this;
      return {
        fn: function (locals) {
          return tr.normalize(_this._tr.render(str, options, locals)).body;
        },
        dependencies: []
      };
    }
    if (this.can('compileAsync')) {
      throw new Error('The Transform "' + this.name + '" does not support synchronous compilation');
    } else if (this.can('compileFileAsync')) {
      throw new Error('The Transform "' + this.name + '" does not support compiling plain strings');
    } else {
      throw new Error('The Transform "' + this.name + '" does not support compilation');
    }
  }
  return tr.normalizeFn(this._tr.compile(str, options));
};
Transformer.prototype.compileAsync = function (str, options, cb) {
  if (!this.can('compileAsync')) { // compileFile* || renderFile* || renderAsync || compile*Client*
    return Promise.reject(new Error('The Transform "' + this.name + '" does not support compiling plain strings')).nodeify(cb);
  }
  if (this._hasMethod('compileAsync')) {
    return tr.normalizeFnAsync(this._tr.compileAsync(str, options), cb);
  } else { // render || compile
    return tr.normalizeFnAsync(this.compile(str, options), cb);
  }
};
Transformer.prototype.compileFile = function (filename, options) {
  if (!this.can('compileFile')) { // compile*Client* || compile*Async || render*Async
    throw new Error('The Transform "' + this.name + '" does not support synchronous compilation');
  }
  if (this._hasMethod('compileFile')) {
    return tr.normalizeFn(this._tr.compileFile(filename, options));
  } else if (this._hasMethod('renderFile')) {
    return tr.normalizeFn(function (locals) {
      return tr.normalize(this._tr.renderFile(filename, options, locals)).body;
    }.bind(this));
  } else { // render || compile
    if (!options) { options = {}; }
    if (options.filename === undefined) { options.filename = filename; }
    return this.compile(tr.readFileSync(filename, 'utf8'), options);
  }
};
Transformer.prototype.compileFileAsync = function (filename, options, cb) {
  if (!this.can('compileFileAsync')) {
    return Promise.reject(new Error('The Transform "' + this.name + '" does not support compilation'));
  }
  if (this._hasMethod('compileFileAsync')) {
    return tr.normalizeFnAsync(this._tr.compileFileAsync(filename, options), cb);
  } else if (this._hasMethod('compileFile') || this._hasMethod('renderFile')) {
    return tr.normalizeFnAsync(this.compileFile(filename, options), cb);
  } else { // compileAsync || compile || render
    if (!options) { options = {}; }
    if (options.filename === undefined) { options.filename = filename; }
    return tr.normalizeFnAsync(tr.readFile(filename, 'utf8').then(function (str) {
      if (this._hasMethod('compileAsync')) {
        return this._tr.compileAsync(str, options);
      } else { // compile || render
        return this.compile(str, options);
      }
    }.bind(this)), cb);
  }
};

/* COMPILE CLIENT */


Transformer.prototype.compileClient = function (str, options) {
  if (!this.can('compileClient')) {
    if (this.can('compileClientAsync')) {
      throw new Error('The Transform "' + this.name + '" does not support compiling for the client synchronously.');
    } else if (this.can('compileFileClientAsync')) {
      throw new Error('The Transform "' + this.name + '" does not support compiling for the client from a string.');
    } else {
      throw new Error('The Transform "' + this.name + '" does not support compiling for the client');
    }
  }
  return tr.normalize(this._tr.compileClient(str, options));
};
Transformer.prototype.compileClientAsync = function (str, options, cb) {
  if (!this.can('compileClientAsync')) {
    if (this.can('compileFileClientAsync')) {
      return Promise.reject(new Error('The Transform "' + this.name + '" does not support compiling for the client from a string.')).nodeify(cb);
    } else {
      return Promise.reject(new Error('The Transform "' + this.name + '" does not support compiling for the client')).nodeify(cb);
    }
  }
  if (this._hasMethod('compileClientAsync')) {
    return tr.normalizeAsync(this._tr.compileClientAsync(str, options), cb);
  } else {
    return tr.normalizeAsync(this._tr.compileClient(str, options), cb);
  }
};
Transformer.prototype.compileFileClient = function (filename, options) {
  if (!this.can('compileFileClient')) {
    if (this.can('compileFileClientAsync')) {
      throw new Error('The Transform "' + this.name + '" does not support compiling for the client synchronously.');
    } else {
      throw new Error('The Transform "' + this.name + '" does not support compiling for the client');
    }
  }
  if (this._hasMethod('compileFileClient')) {
    return tr.normalize(this._tr.compileFileClient(filename, options));
  } else {
    if (!options) { options = {}; }
    if (options.filename === undefined) { options.filename = filename; }
    return tr.normalize(this._tr.compileClient(tr.readFileSync(filename, 'utf8'), options));
  }
};
Transformer.prototype.compileFileClientAsync = function (filename, options, cb) {
  if (!this.can('compileFileClientAsync')) {
    return Promise.reject(new Error('The Transform "' + this.name + '" does not support compiling for the client')).nodeify(cb)
  }
  if (this._hasMethod('compileFileClientAsync')) {
    return tr.normalizeAsync(this._tr.compileFileClientAsync(filename, options), cb);
  } else if (this._hasMethod('compileFileClient')) {
    return tr.normalizeAsync(this._tr.compileFileClient(filename, options), cb);
  } else {
    if (!options) { options = {}; }
    if (options.filename === undefined) { options.filename = filename; }
    return tr.normalizeAsync(tr.readFile(filename, 'utf8').then(function (str) {
      if (this._hasMethod('compileClientAsync')) {
        return this._tr.compileClientAsync(str, options);
      } else {
        return this._tr.compileClient(str, options);
      }
    }.bind(this)), cb);
  }
};

/* RENDER */

Transformer.prototype.render = function (str, options, locals) {
  if (!this.can('render')) {
    if (this.can('renderAsync')) {
      throw new Error('The Transform "' + this.name + '" does not support rendering synchronously.');
    } else if (this.can('renderFileAsync')) {
      throw new Error('The Transform "' + this.name + '" does not support rendering from a string.');
    } else {
      throw new Error('The Transform "' + this.name + '" does not support rendering');
    }
  }
  if (this._hasMethod('render')) {
    return tr.normalize(this._tr.render(str, options, locals));
  } else {
    var compiled = tr.normalizeFn(this._tr.compile(str, options));
    var body = compiled.fn(locals || options);
    if (typeof body !== 'string') {
      throw new Error('The Transform "' + this.name + '" does not support rendering synchronously.');
    }
    return tr.normalize({body: body, dependencies: compiled.dependencies});
  }
};
Transformer.prototype.renderAsync = function (str, options, locals, cb) {
  if (typeof locals === 'function') {
    cb = locals;
    locals = options;
  }
  if (!this.can('renderAsync')) {
    if (this.can('renderFileAsync')) {
      return Promise.reject(new Error('The Transform "' + this.name + '" does not support rendering from a string.')).nodeify(cb);
    } else {
      return Promise.reject(new Error('The Transform "' + this.name + '" does not support rendering')).nodeify(cb);
    }
  }
  if (this._hasMethod('renderAsync')) {
    return tr.normalizeAsync(this._tr.renderAsync(str, options, locals), cb);
  } else if (this._hasMethod('render')) {
    return tr.normalizeAsync(this._tr.render(str, options, locals), cb);
  } else {
    return tr.normalizeAsync(this.compileAsync(str, options).then(function (compiled) {
      return {body: compiled.fn(locals || options), dependencies: compiled.dependencies};
    }), cb);
  }
};
Transformer.prototype.renderFile = function (filename, options, locals) {
  if (!this.can('renderFile')) { // *Async, *Client
    throw new Error('The Transform "' + this.name + '" does not support rendering synchronously.');
  }

  if (this._hasMethod('renderFile')) {
    return tr.normalize(this._tr.renderFile(filename, options, locals));
  } else if (this._hasMethod('render')) {
    if (!options) { options = {}; }
    if (options.filename === undefined) { options.filename = filename; }
    return tr.normalize(this._tr.render(tr.readFileSync(filename, 'utf8'), options, locals));
  } else { // compile || compileFile
    var compiled = this.compileFile(filename, options);
    return tr.normalize({body: compiled.fn(locals || options), dependencies: compiled.dependencies});
  }
};
Transformer.prototype.renderFileAsync = function (filename, options, locals, cb) {
  if (!this.can('renderFileAsync')) { // *Client
    throw new Error('The Transform "' + this.name + '" does not support rendering.');
  }

  if (typeof locals === 'function') {
    cb = locals;
    locals = options;
  }
  if (this._hasMethod('renderFileAsync')) {
    return tr.normalizeAsync(this._tr.renderFileAsync(filename, options, locals), cb);
  } else if (this._hasMethod('renderFile')) {
    return tr.normalizeAsync(this._tr.renderFile(filename, options, locals), cb);
  } else if (this._hasMethod('compile') || this._hasMethod('compileAsync')
             || this._hasMethod('compileFile') || this._hasMethod('compileFileAsync')) {
    return tr.normalizeAsync(this.compileFileAsync(filename, options).then(function (compiled) {
      return {body: compiled.fn(locals || options), dependencies: compiled.dependencies};
    }), cb);
  } else { // render || renderAsync
    if (!options) { options = {}; }
    if (options.filename === undefined) { options.filename = filename; }
    return tr.normalizeAsync(tr.readFile(filename, 'utf8').then(function (str) {
      return this.renderAsync(str, options, locals);
    }.bind(this)), cb);
  }
};
});

var jstransformer = index$5;

var name = 'jstransformer';
var outputFormat = 'html';

/**
 * Returns the name of the transformer from the given options.
 */
function getTransform(options) {
  if (typeof options === 'string' || options instanceof String) {
    return options
  } else if (typeof options === 'object' && options.engine) {
    return options.engine
  }
  throw new Error('options.engine not found.')
}

/**
 * Constructs a new JSTransformer from the given options.
 */
function constructTransformer(options) {
  var transform = getTransform(options);
  if (transform && typeof transform === 'object') {
    return jstransformer(transform)
  }
  return jstransformer(commonjsRequire('jstransformer-' + transform)) // eslint-disable-line import/no-dynamic-require
}

var render = function (str, options, locals) {
  return constructTransformer(options).render(str, options, locals || {})
};

var renderFile = function (file, options, locals) {
  return constructTransformer(options).renderFile(file, options, locals || {})
};

var renderAsync = function (str, options, locals, callback) {
  return constructTransformer(options).renderAsync(str, options, locals || {}, callback)
};

var renderFileAsync = function (file, options, locals, callback) {
  return constructTransformer(options).renderFileAsync(file, options, locals || {}, callback)
};

var compile = function (str, options) {
  return constructTransformer(options).compile(str, options)
};

var compileAsync = function (str, options, callback) {
  return constructTransformer(options).compileAsync(str, options, callback)
};

var compileFile = function (str, options) {
  return constructTransformer(options).compileFile(str, options)
};

var compileFileAsync = function (str, options, callback) {
  return constructTransformer(options).compileFileAsync(str, options, callback)
};

var index$13 = {
	name: name,
	outputFormat: outputFormat,
	render: render,
	renderFile: renderFile,
	renderAsync: renderAsync,
	renderFileAsync: renderFileAsync,
	compile: compile,
	compileAsync: compileAsync,
	compileFile: compileFile,
	compileFileAsync: compileFileAsync
};

/*!
 * start-jstransformer <https://github.com/tunnckoCore/start-jstransformer>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

const transform = index$5(index$13);

var index$1 = (config) => (input) => {
  return function jstransformer (log) {
    return Promise.all(input.map((file) => {
      return new Promise((resolve, reject) => {
        config = index$2({}, config);
        if (typeof file === 'string') {
          transform.renderFileAsync(file, config, config.locals)
            .then((result) => {
              resolve({
                path: file,
                data: result.body
              });
            })
            .catch(reject);
          return
        }
        transform.renderAsync(file.data, config, config.locals)
          .then((result) => {
            file.data = result.body;
            resolve(file);
          })
          .catch(reject);
      })
    }))
  }
};

module.exports = index$1;
