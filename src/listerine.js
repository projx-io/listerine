function mapFilter(map, filter) {
    return this.filter(function (value, key) {
        return filter(map(value, key), key);
    });
}

function mapSort(map, sort) {
    return this.sort(function (a, b) {
        return sort(map(a), map(b));
    });
}

function rename(callback) {
    var object = {};
    var keys = [];
    this.forEach(function (value, key) {
        key = callback(value, key);
        object[key] = value;
        keys.push(key);
    });
    return Object.with(object, keys);
}

function group(callback) {
    var groups = Object.with();
    this.forEach(function (value, key) {
        var group = callback(value, key);
        if (!groups.has(group)) {
            groups.set(group, Object.with());
        }
        groups.get(group).set(key, value);
    });
    return groups;
}

Array.prototype.has = function (key) {
    return key <= this.length;
};

Array.prototype.get = function (key) {
    return this[key];
};

Array.prototype.set = function (key, value) {
    return this[key] = value;
};

Array.prototype.delete = function (key) {
    this.splice(key, 1);
};

Array.prototype.mapFilter = mapFilter;
Array.prototype.mapSort = mapSort;
Array.prototype.group = group;
Array.prototype.rename = rename;

function Map(object, keys) {
    this.object = object || {};
    this.keys = keys || Object.keys(object);
}
Map.prototype = {
    keys: [],
    object: {},
    get values() {
        return this.keys.map(function (key) {
            return this.get(key);
        }.bind(this));
    },
    has: function (key) {
        return this.object.hasOwnProperty(key);
    },
    get: function (key) {
        return this.object[key];
    },
    set: function (key, value) {
        return this.object[key] = value;
    },
    delete: function (key) {
        delete this.object[key];
    },
    forEach: function (callback) {
        this.keys.forEach(function (key) {
            callback(this.get(key), key);
        }.bind(this));
        return this;
    },
    map: function (callback) {
        var object = {};
        this.forEach(function (value, key) {
            object[key] = callback(value, key);
        });
        return Object.with(object, this.keys);
    },
    filter: function () {
        var object = {};
        this.forEach(function (value, key) {
            if (callback(value, key)) {
                object[key] = value;
            }
        });
        return Object.with(object, this.keys);
    },
    reduce: function (callback, initial) {
        this.forEach(function (value, key) {
            initial = callback(initial, value, key);
        });
        return initial;
    },
    sort: function (callback) {
        var keys = this.keys.sort(function (a, b) {
            return callback(a, b);
        });
        return Object.with(this.object, keys);
    },
    mapFilter: mapFilter,
    mapSort: mapSort,
    rename: rename,
    group: group
};

Object.with = function (object, keys) {
    object = object || {};
    return new Map(object, keys || Object.keys(object));
};

module.exports = {
    Map: Map
};
