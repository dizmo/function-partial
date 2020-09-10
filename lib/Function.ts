interface Function {
    partial: Function;
}
(() => {
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
Function.prototype.partial = function(
    this: any, args: any = {}
): Function {
    const id = random();
    const fn = global(id, this);
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
        return global[":partials-${gid}"]["${id}"]
            .apply(this, all_names.map(n => args[n]));
    `);
};
const random = (): string => {
    return Math.floor(
        101559956668416 - 2821109907456 * Math.random()
    ).toString(36).slice(1);
};
const global = (key: string, value?: any): any => {
    const g = Function("return global")();
    if (g[`:partials-${gid}`] === undefined) {
        g[`:partials-${gid}`] = {};
    }
    if (value !== undefined) {
        g[`:partials-${gid}`][key] = value;
    }
    return g[`:partials-${gid}`][key];
};
const gid = random();
})();
