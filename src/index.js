const isPromise = x => x instanceof Promise;

const hasPromise = xs => xs.some(isPromise);

const handleValue = (value, ok, error) => {
    if (error) {
        try {
            return ok(value);
        } catch (err) {
            return error(err);
        }
    }

    return ok(value);
};

export const create = (value, ok, error) => {
    if (isPromise(value)) return value.then(ok).catch(error);
    return handleValue(value, ok, error);
};

export const all = (values, ok, error) => {
    if (hasPromise(values))
        return Promise.all(values)
            .then(ok)
            .catch(error);
    return handleValue(values, ok, error);
};

export const race = (values, ok, error) => {
    if (hasPromise(values))
        return Promise.race(values)
            .then(ok)
            .catch(error);
    return handleValue(values[0], ok, error);
};
