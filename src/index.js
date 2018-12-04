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

export const get = (value, ok, error) => {
    if (isPromise(value)) return error ? value.then(ok).catch(error) : value.then(ok);
    return handleValue(value, ok, error);
};

export const all = (values, ok, error) => {
    if (hasPromise(values))
        return error
            ? Promise.all(values)
                  .then(ok)
                  .catch(error)
            : Promise.all(values).then(ok);
    return handleValue(values, ok, error);
};

export const race = (values, ok, error) => {
    if (hasPromise(values))
        return error
            ? Promise.race(values)
                  .then(ok)
                  .catch(error)
            : Promise.race(values).then(ok);
    return handleValue(values[0], ok, error);
};
