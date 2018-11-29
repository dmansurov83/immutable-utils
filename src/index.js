import Immutable from 'immutable';

const types = ['Map', 'List', 'Set', 'Stack', 'OrderedMap', 'OrderedSet'];
const isImmutable = data => types.some(type => Immutable[type][`is${type}`](data));

const getIn = (obj, ...path) => {
    if (!obj) return obj;
    if (Array.isArray(path[0])) path = [...path[0]];
    if (!!obj.getIn) return obj.getIn(path);
    if (!path.length) return obj;
    const key = path.shift();
    return path.length ? getIn(obj[key], ...path) : obj[key];
};

const wrap = (data) => {
    if (data === undefined || data === null) return data;
    if (isImmutable(data)) {
        return data;
    }
    return Immutable.fromJS(data.toJS ? data.toJS() : data);
};

const unwrap = (data) => {
    if (data === undefined || data === null) return data;
    if (isImmutable(data)) return data.toJS();
    return data;
};

const getImmProperties = (imm, ...props) => {
    if (!imm) return {};
    return props.reduce((map, p) => {
        map[p] = imm.get(p);
        return map;
    }, {});
};

const insertBefore = (map, beforeKey, key, val) => {
    return Immutable.OrderedMap().withMutations((r) => {
        map.keySeq().forEach((k) => {
            if (beforeKey === k) {
                r.set(key, val);
            }
            r.set(k, map.get(k));
        });
    });
};

const insertAfter = (map, afterKey, key, val) => {
    return Immutable.OrderedMap().withMutations((r) => {
        map.keySeq().forEach((k) => {
            r.set(k, map.get(k));
            if (afterKey === k) {
                r.set(key, val);
            }
        });
    });
};

const reorder = (map, keys) => {
    return Immutable.OrderedMap().withMutations((r) => {
        keys.forEach((k) => {
            map.get(k) && r.set(k, map.get(k));
        });
    });
};

function isNull(value) {
    return value === undefined || value === null
}

const createImmutableComparator = (field, { desc = false, nullsLast = true } = {}) => (a, b) => {
    const fa = a.get(field);
    const fb = b.get(field);

    return (nullsLast ? (isNull(fa)) - (isNull(fb)) : (isNull(fb)) - (isNull(fa)))
        || (desc ? +(fb > fa) : +(fa > fb))
        || (desc ? -(fb > fa) : -(fa > fb));
};


export { getIn, wrap, unwrap, isImmutable, getImmProperties, insertAfter, insertBefore, reorder, createImmutableComparator };
