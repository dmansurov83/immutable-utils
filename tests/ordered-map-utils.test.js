import {OrderedMap} from 'immutable';
import {insertBefore, insertAfter, reorder} from '../src';

test('insertBefore', () => {
    const map = (new OrderedMap()).set('a', 1).set('c', 2).set('b', 3);
    expect(insertBefore(map, 'a', 'z', 0).keySeq().get(0)).toEqual('z')
});

test('insertAfter', () => {
    const map = (new OrderedMap()).set('a', 1).set('c', 2).set('b', 3);
    expect(insertAfter(map, 'a', 'z', 0).keySeq().get(1)).toEqual('z')
});

test('reorder', () => {
    const map = (new OrderedMap()).set('a', 1).set('c', 2).set('b', 3);
    expect(map.keySeq().toArray()).toEqual(['a', 'c', 'b']);
    const reordered = reorder(map, ['a', 'b', 'c']);
    expect(reordered.keySeq().toArray()).toEqual(['a', 'b', 'c'])
});
