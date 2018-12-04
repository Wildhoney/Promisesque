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

Although [generally a bad idea](https://medium.com/@bluepnume/intentionally-unleashing-zalgo-with-promises-ab3f63ead2fd), there are a handful of legitimate cases where you don't want asynchronous promises if the values you're dealing with are not asynchronous themselves. In those few cases, we can happily rely on *synchronous* promises that essentially behave like `map`.

```javascript
import * as prq from 'promisesque';

prq.get(value, ok, error);
prq.all(value, ok, error);
prq.race(value, ok, error);
```
