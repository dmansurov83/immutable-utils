import { wrap, createImmutableComparator } from '../src';

test('immutable comparator asc', () => {
    const list = wrap([{a: 2}, {a: 1}, {b: 2}]);
    expect(list.sort(createImmutableComparator('a', {nullsLast: true})).toJS()).toEqual([{a: 1}, {a: 2}, {b: 2}]);
    expect(list.sort(createImmutableComparator('a', {nullsLast: false})).toJS()).toEqual([{b: 2}, {a: 1}, {a: 2}]);
});

test('immutable comparator desc', () => {
    const list = wrap([{a: 1}, {a: 2}, {b: 2}]);
    expect(list.sort(createImmutableComparator('a', {nullsLast: true, desc: true})).toJS()).toEqual([{a: 2}, {a: 1}, {b: 2}]);
    expect(list.sort(createImmutableComparator('a', {nullsLast: false, desc: true})).toJS()).toEqual([{b: 2}, {a: 2}, {a: 1}]);
});