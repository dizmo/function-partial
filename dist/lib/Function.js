"use strict";
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

Function.prototype.partial = function () {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var fn = this;
    var fn_id = next();
    global[partials][fn_id] = fn;
    var fn_string = fn.toString();
    var lhs_index = fn_string.indexOf("(") + 1;
    var rhs_index = fn_string.indexOf(")");
    var all_names = fn_string.slice(lhs_index, rhs_index).match(/([^\s,]+)/g);
    var arg_names = all_names.filter(function (n) {
        return n in args === false;
    });
    return Function.apply(undefined, _toConsumableArray(arg_names).concat(["\"use strict\";\n        const all_names = " + JSON.stringify(all_names) + ";\n        const arg_names = " + JSON.stringify(arg_names) + ";\n        let args = " + JSON.stringify(args) + ";\n        for (const i in arguments) {\n            if (arguments.hasOwnProperty(i)) {\n                args[arg_names[i]] = arguments[i];\n            }\n        }\n        return global[\"" + partials + "\"][\"" + fn_id + "\"]\n            .apply(this, all_names.map(n => args[n]));\n    "]));
};
var partials = "_partials:" + next();
if (global[partials] === undefined) {
    global[partials] = {};
}
function next() {
    var pow = Math.pow(36, 7);
    var mul = 36 * pow;
    return Math.floor(mul - pow * Math.random()).toString(36);
}
//# sourceMappingURL=Function.js.map