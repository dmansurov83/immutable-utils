import { wrap, getIn } from '../lib';

function getPrimitives() {
    return {
        string: 'string',
        number: 10,
        bool: false,
    };
}

const bigObj = {
    ...getPrimitives(),
    arr: [
        { ...getPrimitives() },
        { ...getPrimitives() },
        { ...getPrimitives() },
    ],
    obj: {
        field: { ...getPrimitives() },
        fieldSecond: { ...getPrimitives() },
    },
};

const immuBigObj = wrap(bigObj);

test('primitives', () => {
    expect(getIn(bigObj, 'string')).toBe('string');
    expect(getIn(bigObj, 'number')).toBe(10);
    expect(getIn(bigObj, 'bool')).toBe(false);

    expect(getIn(immuBigObj, 'string')).toBe('string');
    expect(getIn(immuBigObj, 'number')).toBe(10);
    expect(getIn(immuBigObj, 'bool')).toBe(false);
});

test('arrays', () => {
    expect(getIn(bigObj, ['string'])).toBe('string');
    expect(getIn(immuBigObj, ['string'])).toBe('string');

    expect(getIn(bigObj, ['obj', 'field', 'string'])).toBe('string');
    expect(getIn(immuBigObj, ['obj', 'field', 'string'])).toBe('string');
});

test('args', () => {
    expect(getIn(bigObj, 'string')).toBe('string');
    expect(getIn(immuBigObj, 'string')).toBe('string');

    expect(getIn(bigObj, 'obj', 'field', 'string')).toBe('string');
    expect(getIn(immuBigObj, 'obj', 'field', 'string')).toBe('string');
});

test('array pos', () => {
    expect(getIn(bigObj, 'arr', 1, 'string')).toBe('string');
    expect(getIn(immuBigObj, 'arr', 1, 'string')).toBe('string');
});
