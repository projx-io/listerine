var List = require('../src/listerine.js').List;

describe('Listerine', function () {
    function sum(a, b) {
        return a + b;
    }

    function asc(a, b) {
        return a - b;
    }

    function desc(a, b) {
        return b - a;
    }

    function atLeast(expect) {
        return function (actual) {
            return actual >= expect;
        };
    }

    describe('Array', function () {
        describe('mapFilter', function () {
            it('should be defined', function () {
                expect([].mapFilter).toBeDefined();
            });

            it('should return an array', function () {
                var expected = [];
                var actual = [].mapFilter();
                expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
            });

            it('should filter by a mapped value', function () {
                var expected = [-6, -4, -2, 3, 5];
                var actual = [-6, -4, -2, 0, 1, 3, 5].mapFilter(Math.abs, atLeast(2));
                expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
            });
        });

        describe('mapSort', function () {
            it('should be defined', function () {
                expect([].mapSort).toBeDefined();
            });

            it('should return an array', function () {
                var expected = [];
                var actual = [].mapSort();
                expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
            });

            it('should sort asc by a mapped value', function () {
                var expected = [0, 1, -2, 3, -4, 5, -6];
                var actual = [-6, -4, -2, 0, 1, 3, 5].mapSort(Math.abs, asc);
                expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
            });

            it('should sort desc by a mapped value', function () {
                var expected = [0, 1, -2, 3, -4, 5, -6].reverse();
                var actual = [-6, -4, -2, 0, 1, 3, 5].mapSort(Math.abs, desc);
                expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
            });
        });
    });

    describe('Object', function () {
        describe('with', function () {
            it('should be defined', function () {
                expect(Object.with).toBeDefined();
            });

            it('should return a List.', function () {
                expect(Object.with({}) instanceof List).toBeTruthy();
            });

            it('should return keys', function () {
                var object = {a: -6, b: -4, c: -2, d: 0, e: 1, f: 3, g: 5};
                var keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
                expect(JSON.stringify(Object.with(object).keys)).toBe(JSON.stringify(keys));
            });

            it('should return values', function () {
                var object = {a: -6, b: -4, c: -2, d: 0, e: 1, f: 3, g: 5};
                expect(JSON.stringify(Object.with(object).values)).toBe(JSON.stringify(object));
            });
        });

        describe('combine', function () {
            it('should be defined', function () {
                expect(Object.combine).toBeDefined();
            });

            it('should return a List.', function () {
                expect(Object.combine([], []) instanceof List).toBeTruthy();
            });

            it('should return keys', function () {
                var object = {a: -6, b: -4, c: -2, d: 0, e: 1, f: 3, g: 5};
                var keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
                var values = [-6, -4, -2, 0, 1, 3, 5];
                expect(JSON.stringify(Object.combine(keys, values).values)).toBe(JSON.stringify(object));
            });
        });
    });

    describe('List', function () {
        var keys = [];
        var values = [];

        describe('map', function () {
            it('should map an object.', function () {
                var expected = {a: 6, b: 4, c: 2, d: 0, e: 1, f: 3, g: 5};
                var actual = Object.with({a: -6, b: -4, c: -2, d: 0, e: 1, f: 3, g: 5}).map(Math.abs).values;
                expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
            });
        });

        describe('reduce', function () {
            it('should reduce an object.', function () {
                var expected = -3;
                var actual = Object.with({a: -6, b: -4, c: -2, d: 0, e: 1, f: 3, g: 5}).reduce(sum, 0);
                expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
            });
        });

        describe('mapFilter', function () {
            it('should mapFilter an object.', function () {
                var expected = {a: -6, b: -4, c: -2, f: 3, g: 5};
                var actual = Object
                    .with({a: -6, b: -4, c: -2, d: 0, e: 1, f: 3, g: 5})
                    .mapFilter(Math.abs, atLeast(2)).values;
                expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
            });
        });

        describe('mapSort', function () {
            it('should sort asc mapped values.', function () {
                var expected = ['d', 'e', 'c', 'f', 'b', 'g', 'a'];
                var actual = Object.with({a: -6, b: -4, c: -2, d: 0, e: 1, f: 3, g: 5}).mapSort(Math.abs, asc).keys;
                expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
            });

            it('should sort desc mapped values.', function () {
                var expected = ['d', 'e', 'c', 'f', 'b', 'g', 'a'].reverse();
                var actual = Object.with({a: -6, b: -4, c: -2, d: 0, e: 1, f: 3, g: 5}).mapSort(Math.abs, desc).keys;
                expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
            });
        });
    });
});
