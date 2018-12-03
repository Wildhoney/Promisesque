# Promisesque
> Lazily create a promise only when async values are used, otherwise sync all the way down.

Although [generally a bad idea](https://medium.com/@bluepnume/intentionally-unleashing-zalgo-with-promises-ab3f63ead2fd), there are a handful of legitimate cases where you don't want asynchronous promises if the values you're dealing with are not asynchronous themselves. In those few cases, we can happily rely on *synchronous* promises that essentially behave like `map`.

```javascript
import * as prq from 'promisesque';

prq.create(value, ok, error);
prq.all(value, ok, error);
prq.race(value, ok, error);
```
