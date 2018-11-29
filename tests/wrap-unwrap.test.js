import {List, Map} from 'immutable';
import {wrap, unwrap} from '../src';

class TestClass {

    toJS() {
        return JSON.parse(JSON.stringify(this));
    }
}

test('wrap', () => {
    expect(wrap(null)).toBe(null);
    expect(wrap(undefined)).toBe(undefined);
    expect(wrap([]) instanceof List).toBeTruthy();
    expect(wrap({}) instanceof Map).toBeTruthy();
    const imm = new Map();
    expect(wrap(imm)).toBe(imm);
});

test('unwrap', () => {
    expect(unwrap(null)).toBe(null);
    expect(unwrap(undefined)).toBe(undefined);
    const arr = [];
    expect(unwrap(arr)).toBe(arr);
    const obj = {};
    expect(unwrap(obj)).toBe(obj);
    const imm = new Map();
    expect(unwrap(imm)).toEqual({});
})