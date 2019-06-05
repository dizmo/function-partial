"use strict";
/* tslint:disable:ban-types */

/* tslint:disable:interface-name */

/* tslint:disable:trailing-comma */

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  /**
   * Allows  to  bind  *any* argument  using  their names  rather their
   * positions. This approach is more flexible if the initial arguments
   * are to be left unbound. For example, from the function `fn`
   * ```javascript
   * fn(arg_0, arg_1, .., arg_[n-3], arg_[n-2], arg_[n-1])
   * ```
   * we can create a new function `gn` which requires all arguments but
   * the last and the *third last* parameter by applying the
   * ```javascript
   * gn = fn.partial({arg_[n-3]: val_[n-3], arg_[n-1]: val_[n-1]})
   * ```
   * partial operation.  The invocation  of  `gn`  would be  like  `gn(
   * val_0, val_1, .., val_[n-2])`.  Notice that the relative positions
   * of the *unbound* arguments is left intact.
   *
   * @param args a map of named arguments
   * @returns a partially bound function
   */
  Function.prototype.partial = function () {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var id = random();
    var fn = global(id, this);
    var fn_string = fn.toString();
    var lhs_index = fn_string.indexOf("(") + 1;
    var rhs_index = fn_string.indexOf(")");
    var all_names = fn_string.slice(lhs_index, rhs_index).match(/([^\s,]+)/g);
    var arg_names = all_names.filter(function (n) {
      return n in args === false;
    });
    return Function.apply(void 0, _toConsumableArray(arg_names).concat(["\"use strict\";\n        const all_names = ".concat(JSON.stringify(all_names), ";\n        const arg_names = ").concat(JSON.stringify(arg_names), ";\n        let args = ").concat(JSON.stringify(args), ";\n        for (const i in arguments) {\n            if (arguments.hasOwnProperty(i)) {\n                args[arg_names[i]] = arguments[i];\n            }\n        }\n        return global[\":partials-").concat(gid, "\"][\"").concat(id, "\"]\n            .apply(this, all_names.map(n => args[n]));\n    ")]));
  };

  var random = function random() {
    return Math.floor(101559956668416 - 2821109907456 * Math.random()).toString(36).slice(1);
  };

  var global = function global(key, value) {
    var g = Function("return global")();

    if (g[":partials-".concat(gid)] === undefined) {
      g[":partials-".concat(gid)] = {};
    }

    if (value !== undefined) {
      g[":partials-".concat(gid)][key] = value;
    }

    return g[":partials-".concat(gid)][key];
  };

  var gid = random();
})();
//# sourceMappingURL=Function.js.map