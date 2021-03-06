(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (process,global){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JSRuntime;
    (function (JSRuntime) {
        JSRuntime[JSRuntime["Unknown"] = 0] = "Unknown";
        JSRuntime[JSRuntime["DOM"] = 1] = "DOM";
        JSRuntime[JSRuntime["NodeJS"] = 2] = "NodeJS";
    })(JSRuntime = exports.JSRuntime || (exports.JSRuntime = {}));
    var JSEnvironment = (function () {
        function JSEnvironment() {
        }
        Object.defineProperty(JSEnvironment, "isDOM", {
            get: function () {
                return JSEnvironment.runtime == JSRuntime.DOM;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JSEnvironment, "isNodeJS", {
            get: function () {
                return JSEnvironment.runtime == JSRuntime.NodeJS;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JSEnvironment, "runtime", {
            get: function () {
                if (JSEnvironment._r != null)
                    return JSEnvironment._r;
                try {
                    if (typeof window != "undefined" && typeof window.setTimeout === "function")
                        JSEnvironment._r = JSRuntime.DOM;
                    else if (typeof global != "undefined" && typeof global.setTimeout === "function")
                        JSEnvironment._r = JSRuntime.NodeJS;
                }
                catch (e) { }
                return JSEnvironment._r != null ? JSEnvironment._r : JSRuntime.Unknown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JSEnvironment, "runtimeName", {
            get: function () {
                switch (JSEnvironment.runtime) {
                    case JSRuntime.DOM:
                        return "DOM";
                    case JSRuntime.NodeJS:
                        return "NodeJS";
                    default:
                        return "";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JSEnvironment, "platform", {
            get: function () {
                switch (JSEnvironment.runtime) {
                    case JSRuntime.DOM:
                        return window.navigator.platform;
                    case JSRuntime.NodeJS:
                        return process.platform;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JSEnvironment, "product", {
            get: function () {
                switch (JSEnvironment.runtime) {
                    case JSRuntime.DOM:
                        return window.navigator.appName;
                    case JSRuntime.NodeJS:
                        return "Node.js";
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JSEnvironment, "productVersion", {
            get: function () {
                switch (JSEnvironment.runtime) {
                    case JSRuntime.DOM:
                        return window.navigator.appVersion;
                    case JSRuntime.NodeJS:
                        return process.version;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        JSEnvironment._r = null;
        return JSEnvironment;
    }());
    exports.JSEnvironment = JSEnvironment;
});

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":1}],3:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./unit-tests", "./package-src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var unit_tests_1 = require("./unit-tests");
    var index_1 = require("./package-src/index");
    window.onload = function () {
        var unitTests = unit_tests_1.UnitTests.createTests(index_1.JSRuntime.DOM);
        for (var _i = 0, unitTests_1 = unitTests; _i < unitTests_1.length; _i++) {
            var test = unitTests_1[_i];
            test.execute();
        }
    };
});

},{"./package-src/index":2,"./unit-tests":4}],4:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./package-src/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require("./package-src/index");
    var UnitTest = (function () {
        function UnitTest(name, fn) {
            this.fn = fn;
            this._name = name;
        }
        Object.defineProperty(UnitTest.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnitTest.prototype, "executed", {
            get: function () {
                return this._executed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnitTest.prototype, "passed", {
            get: function () {
                return this._passed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnitTest.prototype, "error", {
            get: function () {
                return this._error;
            },
            enumerable: true,
            configurable: true
        });
        UnitTest.prototype.execute = function () {
            console.log("Running test \"" + this.name + "\"");
            try {
                this.fn();
                this._passed = true;
            }
            catch (e) {
                this._passed = false;
                this._error = e;
            }
            ;
            console.log("Passed: " + this._passed);
            this._executed = true;
        };
        return UnitTest;
    }());
    exports.UnitTest = UnitTest;
    var assert = function (condition, message) {
        if (!condition) {
            throw new Error(message || "Assertion failed");
        }
    };
    var UnitTests = (function () {
        function UnitTests() {
        }
        UnitTests.createTests = function (expected) {
            console.log("Creating tests");
            console.log("Runtime: " + index_1.JSEnvironment.runtimeName);
            console.log("Platform: " + index_1.JSEnvironment.platform);
            console.log("Product: " + index_1.JSEnvironment.product);
            console.log("Product Version: " + index_1.JSEnvironment.productVersion);
            return [
                new UnitTest("Eval isDOM", function () {
                    assert(index_1.JSEnvironment.isDOM == (expected == index_1.JSRuntime.DOM));
                }),
                new UnitTest("Eval isNodeJS", function () {
                    assert(index_1.JSEnvironment.isNodeJS == (expected == index_1.JSRuntime.NodeJS));
                }),
                new UnitTest("Eval runtime", function () {
                    assert(index_1.JSEnvironment.runtime == expected);
                }),
                new UnitTest("Eval runtimeName", function () {
                    var n;
                    switch (expected) {
                        case index_1.JSRuntime.DOM:
                            n = "DOM";
                            break;
                        case index_1.JSRuntime.NodeJS:
                            n = "NodeJS";
                            break;
                    }
                    assert(index_1.JSEnvironment.runtimeName == n);
                })
            ];
        };
        return UnitTests;
    }());
    exports.UnitTests = UnitTests;
});

},{"./package-src/index":2}]},{},[3]);
