Array.prototype.mapFilter = function (map, filter) {
    return this.filter(function (value, key) {
        return filter(map(value, key), key);
    });
};

Array.prototype.mapSort = function (map, sort) {
    return this.sort(function (a, b) {
        return sort(map(a), map(b));
    });
};

function List(keys, values) {
    this.keys = keys;
    this.values = values;
}
List.prototype = {
    /**
     *
     * @param callback
     * @returns {List}
     */
    forEach: function (callback) {
        this.keys.map(function (key) {
            if (this.values.hasOwnProperty(key)) {
                callback(this.values[key], key);
            }
        }.bind(this));
        return this;
    },

    /**
     *
     * @param callback
     * @returns {List}
     */
    map: function (callback) {
        var values = {};
        this.forEach(function (value, key) {
            values[key] = callback(value, key);
        });
        return new List(this.keys, values);
    },

    /**
     *
     * @param callback
     * @param initial
     * @returns {*}
     */
    reduce: function (callback, initial) {
        return this.keys.reduce(function (a, b) {
            return callback(a, this.values[b]);
        }.bind(this), initial);
    },

    /**
     *
     * @param map
     * @param filter
     * @returns {List}
     */
    mapFilter: function (map, filter) {
        var values = {};
        var keys = [];

        this.keys
            .mapFilter(function (key) {
                return map(this.values[key], key);
            }.bind(this), filter)
            .forEach(function (key) {
                keys.push(key);
                values[key] = this.values[key];
            }.bind(this));

        return new List(keys, values);
    },

    /**
     *
     * @param map
     * @param sort
     * @returns {List}
     */
    mapSort: function (map, sort) {
        var keys = this.keys.mapSort(function (key) {
            return map(this.values[key], key);
        }.bind(this), sort);
        return new List(this.keys, this.values);
    }
};

/**
 *
 * @param object
 * @returns {List}
 */
Object.with = function (object) {
    return new List(Object.keys(object), object);
};

/**
 *
 * @param keys
 * @param values
 * @returns {List}
 */
Object.combine = function (keys, values) {
    var object = {};
    for (var i = 0; i < keys.length; i++) {
        object[keys[i]] = values[i];
    }
    return new List(keys, object);
};

module.exports = {
    List: List
};
