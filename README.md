[![NPM version](https://badge.fury.io/js/%40dizmo%2Ffunctions-partial.svg)](https://npmjs.org/package/@dizmo/functions-partial)
[![Build Status](https://travis-ci.org/dizmo/functions-partial.svg?branch=master)](https://travis-ci.org/dizmo/functions-partial)
[![Coverage Status](https://coveralls.io/repos/github/dizmo/functions-partial/badge.svg?branch=master)](https://coveralls.io/github/dizmo/functions-partial?branch=master)

# @dizmo/functions-partial

Allows to bind *any* argument of a function using their names rather than their positions. This approach is more flexible if the initial arguments are to be left unbound. For example, from a function `fn`

```javascript
fn(arg_0, arg_1, .., arg_[n-3], arg_[n-2], arg_[n-1])
```

we can create a new function `gn`, which requires all arguments but the last and the *third last* parameter by applying the

```javascript
gn = fn.partial({arg_[n-3]: val_[n-3}, arg_[n-1]: val_[n-1]})
```

partial operation. The invocation of `gn` would look like `gn(val_0, val_1, .., val_[n-2])`. Notice that the relative position of the *unbound* arguments is left intact.

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

### Clean

```sh
npm run clean
```

### Build

```sh
npm run build
```

#### without linting and cleaning:

```sh
npm run -- build --no-lint --no-clean
```

#### with UMD bundling (incl. minimization):

```sh
npm run -- build --prepack
```

#### with UMD bundling (excl. minimization):

```sh
npm run -- build --prepack --no-minify
```

### Lint

```sh
npm run lint
```

#### with auto-fixing:

```sh
npm run -- lint --fix
```

### Test

```sh
npm run test
```

#### without linting, cleaning and (re-)building:

```sh
npm run -- test --no-lint --no-clean --no-build
```

### Cover

```sh
npm run cover
```

#### without linting, cleaning and (re-)building:

```sh
npm run -- cover --no-lint --no-clean --no-build
```

## Publish

```sh
npm publish
```

#### initially (if public):

```sh
npm publish --access=public
```

## Copyright

 © 2019 [dizmo AG](http://dizmo.com/), Switzerland
