import {getImmProperties, wrap} from '../src';

test('getImmProperties', () => {
    const map = wrap({a: 1, b: 2, c: 3});
    const {a, b} = getImmProperties(map, 'a', 'b');
    expect(a).toBe(1);
    expect(b).toBe(2);

    expect(getImmProperties(null, 'a', 'b')).toEqual({})
});