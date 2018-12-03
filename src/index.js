const isPromise = x => x instanceof Promise;

const hasPromise = xs => xs.some(isPromise);

const identity = x => x;

export const create = (value, ok = identity, error = identity) => {
    if (isPromise(value)) return value.then(ok).catch(error);

    try {
        return ok(value);
    } catch (err) {
        return error(err);
    }
};

export const all = (values, ok = identity, error = identity) => {
    if (hasPromise(values))
        return Promise.all(values)
            .then(ok)
            .catch(error);

    try {
        return ok(values);
    } catch (err) {
        return error(err);
    }
};

export const race = (values, ok = identity, error = identity) => {
    if (hasPromise(values))
        return Promise.race(values)
            .then(ok)
            .catch(error);

    try {
        return ok(values[0]);
    } catch (err) {
        return error(err);
    }
};
