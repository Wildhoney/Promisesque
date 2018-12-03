import test from 'ava';
import { spy } from 'sinon';
import * as prq from './index.js';

const throwError = () => {
    throw new Error('bah...');
};

test('It should be able to handle a promise;', async t => {
    const ok = spy(value => {
        t.is(value, 'Adam');
        return value;
    });
    const a = prq.create('Adam', ok);
    const b = prq.create(Promise.resolve('Adam'), ok);
    t.false(a instanceof Promise);
    t.true(b instanceof Promise);
    t.is(a, 'Adam');
    t.is(await b, 'Adam');
    t.is(ok.callCount, 2);
});

test('It should be able to handle a Promise.all;', async t => {
    const ok = spy(values => {
        t.deepEqual(values, ['Adam', 'Maria']);
        return values;
    });
    const a = prq.all(['Adam', 'Maria'], ok);
    const b = prq.all([Promise.resolve('Adam'), Promise.resolve('Maria')], ok);
    t.false(a instanceof Promise);
    t.true(b instanceof Promise);
    t.deepEqual(a, ['Adam', 'Maria']);
    t.deepEqual(await b, ['Adam', 'Maria']);
    t.is(ok.callCount, 2);
});

test('It should be able to handle a Promise.race;', async t => {
    const ok = spy(value => {
        t.is(value, 'Adam');
        return value;
    });
    const a = prq.race(['Adam', 'Maria'], ok);
    const b = prq.race([Promise.resolve('Adam'), Promise.resolve('Maria')], ok);
    t.false(a instanceof Promise);
    t.true(b instanceof Promise);
    t.is(a, 'Adam');
    t.is(await b, 'Adam');
    t.is(ok.callCount, 2);
});

test('It should be able to catch errors;', async t => {
    const error = spy(err => {
        t.deepEqual(err, new Error('bah...'));
        return err;
    });
    const a = prq.create('Adam', throwError, error);
    const b = prq.create(Promise.resolve('Adam'), throwError, error);
    t.false(a instanceof Promise);
    t.true(b instanceof Promise);
    t.deepEqual(a, new Error('bah...'));
    t.deepEqual(await b, new Error('bah...'));
    t.is(error.callCount, 2);
});

test('It should be able to chain promises;', t => {
    let r = 'Adam';
    const ok = spy(value => {
        t.is(value, r);
        r = 'Maria'; // Second time around the "promise" will be resolved as "Maria".
        return r;
    });
    const a = prq.create(prq.create('Adam', ok), ok);
    t.false(a instanceof Promise);
    t.is(a, 'Maria');
    t.is(ok.callCount, 2);
});
