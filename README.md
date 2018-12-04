# Promisesque

> Lazily create a promise only when async values are used, otherwise sync all the way down.

![Travis](http://img.shields.io/travis/Wildhoney/Promisesque.svg?style=for-the-badge)
&nbsp;
![npm](http://img.shields.io/npm/v/promisesque.svg?style=for-the-badge)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-lightgrey.svg?style=for-the-badge)
&nbsp;
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

**npm**: `npm install promisesque --save`
<br />
**cdn**: [`https://cdn.jsdelivr.net/npm/promisesque@latest/src/index.js`](https://cdn.jsdelivr.net/npm/promisesque@latest/src/index.js)

Although [typically a bad idea](https://medium.com/@bluepnume/intentionally-unleashing-zalgo-with-promises-ab3f63ead2fd), there exists a handful of legitimate cases where outputting a promise should be dependent on whether the inputs are promise values, yet still being able to handle both with the same interface.

```javascript
import * as prq from 'promisesque';

const value = 'foo';
const values = [value, 'bar'];

prq.get(value, ok, error); // foo
prq.all(values, ok, error); // [foo, bar]
prq.race(values, ok, error); // foo

const valueP = Promise.resolve(value);
const valuesP = [valueP, Promise.resolve('bar')];

await prq.get(valueP, ok, error); // foo
await prq.all(valuesP, ok, error); // [foo, bar]
await prq.race(valuesP, ok, error); // foo
```

Note that the sync version of `prq.race` is somewhat pointless, as the first value in the array will always win. Nevertheless it is included for compatibility reasons. Also note that currently the `finally` clause is not supported.

Errors are only caught when passing an `error` function as the third argument. Each error function receives the error that was thrown in the `ok` function.
