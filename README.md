[![NPM version](https://badge.fury.io/js/%40dizmo%2Ffunctions-partial.svg)](https://npmjs.org/package/@dizmo/functions-partial)
[![Build Status](https://travis-ci.org/dizmo/functions-partial.svg?branch=master)](https://travis-ci.org/dizmo/functions-partial)
[![Coverage Status](https://coveralls.io/repos/github/dizmo/functions-partial/badge.svg?branch=master)](https://coveralls.io/github/dizmo/functions-partial?branch=master)

# @dizmo/functions-partial
Allows to bind *any* argument using their names rather their positions. This approach is more flexible if the initial arguments are to be left unbound. For example, from a function `fn`
```javascript
fn(arg{0}, arg{1}, .., arg{n-3}, arg{n-2}, arg{n-1})
```
we can create a new function `gn` which requires all arguments but the last and the *third last* parameter by applying the
```javascript
gn = fn.partial({arg{n-3}:val{n-3}, arg{n-1}:val{n-1}})
```
partial operation. The invocation of `gn` would be like `gn(val{0}, val{1}, .., val{n-2})`. Notice that the relative position of the *unbound* arguments is left intact.

## Usage
### Install
```sh
npm install @dizmo/functions-partial --save
```
### Require
```javascript
let lib = require('@dizmo/functions-partial');
```
### Examples
```typescript
import { partial } from "@dizmo/functions-partial";
```
```typescript
const add = (lhs: number, rhs: number): number => {
    return lhs + rhs;
};
const expect_inc = partial(add, {lhs: +1})(0) === +1;
const expect_dec = partial(add, {rhs: -1})(0) === -1;
```
```typescript
const add = (lhs: number, rhs: number): number => {
    return lhs + rhs;
};
const inc = add.partial({lhs: +1});
const expect_inc = inc(0) === 1;
const nil = inc.partial({rhs: -1});
const expect_nil = nil( ) === 0;
```
## Development
### Build
```sh
npm run build
```
#### without linting:
```sh
npm run -- build --no-lint
```
### Lint
```sh
npm run lint
```
#### with auto-fixing (for JavaScript and TypeScript):
```sh
npm run -- lint --fix
```
### Test
```sh
npm run test
```
#### without (re-)building:
```sh
npm run -- test --no-build
```
### Cover
```sh
npm run cover
```
#### without (re-)building:
```sh
npm run -- cover --no-build
```

## Copyright

 © 2018 [dizmo AG](http://dizmo.com/), Switzerland
