'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reorder = exports.insertBefore = exports.insertAfter = exports.getImmProperties = exports.isImmutable = exports.unwrap = exports.wrap = exports.getIn = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var types = ['Map', 'List', 'Set', 'Stack', 'OrderedMap', 'OrderedSet'];
var isImmutable = function isImmutable(data) {
    return types.some(function (type) {
        return _immutable2.default[type]['is' + type](data);
    });
};

var getIn = function getIn(obj) {
    for (var _len = arguments.length, path = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        path[_key - 1] = arguments[_key];
    }

    if (!obj) return obj;
    if (Array.isArray(path[0])) path = [].concat(_toConsumableArray(path[0]));
    if (!!obj.getIn) return obj.getIn(path);
    if (!path.length) return obj;
    var key = path.shift();
    return path.length ? getIn.apply(undefined, [obj[key]].concat(_toConsumableArray(path))) : obj[key];
};

var wrap = function wrap(data) {
    if (data === undefined || data === null) return data;
    if (isImmutable(data)) {
        return data;
    }
    return _immutable2.default.fromJS(data.toJS ? data.toJS() : data);
};

var unwrap = function unwrap(data) {
    if (data === undefined || data === null) return data;
    if (isImmutable(data)) return data.toJS();
    return data;
};

var getImmProperties = function getImmProperties(imm) {
    for (var _len2 = arguments.length, props = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        props[_key2 - 1] = arguments[_key2];
    }

    if (!imm) return {};
    return props.reduce(function (map, p) {
        map[p] = imm.get(p);
        return map;
    }, {});
};

var insertBefore = function insertBefore(map, beforeKey, key, val) {
    return _immutable2.default.OrderedMap().withMutations(function (r) {
        map.keySeq().forEach(function (k) {
            if (beforeKey === k) {
                r.set(key, val);
            }
            r.set(k, map.get(k));
        });
    });
};

var insertAfter = function insertAfter(map, afterKey, key, val) {
    return _immutable2.default.OrderedMap().withMutations(function (r) {
        map.keySeq().forEach(function (k) {
            r.set(k, map.get(k));
            if (afterKey === k) {
                r.set(key, val);
            }
        });
    });
};

var reorder = function reorder(map, keys) {
    return _immutable2.default.OrderedMap().withMutations(function (r) {
        keys.forEach(function (k) {
            map.get(k) && r.set(k, map.get(k));
        });
    });
};

exports.getIn = getIn;
exports.wrap = wrap;
exports.unwrap = unwrap;
exports.isImmutable = isImmutable;
exports.getImmProperties = getImmProperties;
exports.insertAfter = insertAfter;
exports.insertBefore = insertBefore;
exports.reorder = reorder;