/* tslint:disable:ban-types */
/* tslint:disable:interface-name */
/* tslint:disable:trailing-comma */
declare let global: any;

interface Function {
    partial: Function;
}

/**
 * Allows  to  bind  *any* argument  using  their names  rather their
 * positions. This approach is more flexible if the initial arguments
 * are to be left unbound. For example, from the function `fn`
 * ```javascript
 * fn(arg{0}, arg{1}, .., arg{n-3}, arg{n-2}, arg{n-1})
 * ```
 * we can create a new function `gn` which requires all arguments but
 * the last and the *third last* parameter by applying the
 * ```javascript
 * gn = fn.partial({arg{n-3}: val{n-3}, arg{n-1}: val{n-1}})
 * ```
 * partial operation.  The invocation  of  `gn`  would be  like  `gn(
 * val{0}, val{1}, .., val{n-2})`. Notice that the relative positions
 * of the *unbound* arguments is left intact.
 *
 * @param args a map of named arguments
 * @returns a partially bound function
 */
Function.prototype.partial = function(
    this: any, args: any = {}
): Function {
    const fn = this;
    const fn_id = next();
    global[partials][fn_id] = fn;

    const fn_string = fn.toString();
    const lhs_index = fn_string.indexOf("(") + 1;
    const rhs_index = fn_string.indexOf(")");

    const all_names = fn_string
        .slice(lhs_index, rhs_index).match(/([^\s,]+)/g);
    const arg_names = all_names
        .filter((n: string) => n in args === false);

    return Function(...arg_names, `"use strict";
        const all_names = ${JSON.stringify(all_names)};
        const arg_names = ${JSON.stringify(arg_names)};
        let args = ${JSON.stringify(args)};
        for (const i in arguments) {
            if (arguments.hasOwnProperty(i)) {
                args[arg_names[i]] = arguments[i];
            }
        }
        return global["${partials}"]["${fn_id}"]
            .apply(this, all_names.map(n => args[n]));
    `);
};

const partials = `_partials:${next()}`;
if (global[partials] === undefined) {
    global[partials] = {};
}

function next() {
    const pow = Math.pow(36, 7);
    const mul = 36 * pow;

    return Math.floor(mul - pow * Math.random()).toString(36);
}
