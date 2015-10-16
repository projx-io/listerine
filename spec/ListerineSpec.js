var Map = require('../src/listerine.js').Map;

describe('Listerine', function () {
    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    function subtractFrom(a, b) {
        return b - a;
    }

    function multiply(a, b) {
        return a * b;
    }

    function scale(scalar) {
        return function (value) {
            return scalar * value;
        };
    }

    function atLeast(target) {
        return function (value) {
            return value >= target;
        };
    }

    function atMost(target) {
        return function (value) {
            return value <= target;
        };
    }

    var asc = subtract;
    var desc = subtractFrom;
    var abs = Math.abs;

    var array = [-5, 6, -7, 8, -1, 2, -3, 4];
    var absolute = [5, 6, 7, 8, 1, 2, 3, 4];
    var doubled = [-10, 12, -14, 16, -2, 4, -6, 8];
    var sorted_asc = [-7, -5, -3, -1, 2, 4, 6, 8];
    var sorted_desc = sorted_asc.slice().reverse();
    var absolute_sorted_asc = [-1, 2, -3, 4, -5, 6, -7, 8];
    var absolute_sorted_desc = absolute_sorted_asc.slice().reverse();
    var filtered_atLeast_3 = [6, 8, 4];
    var filtered_atMost_3 = [-5, -7, -3];
    var absolute_filtered_atLeast_3 = [-5, 6, -7, 8, -3, 4];
    var absolute_filtered_atMost_3 = [-1, 2, -3];
    var reduced_sum = 4;
    var reduced_product = 40320;

    describe('Array', function () {
        describe('map', function () {
            it('should map values using scale(2)', function () {
                expect(JSON.stringify(array.slice().map(scale(2)))).toBe(JSON.stringify(doubled));
            });

            it('should map values using abs', function () {
                expect(JSON.stringify(array.slice().map(abs))).toBe(JSON.stringify(absolute));
            });
        });

        describe('sort', function () {
            it('should sort asc', function () {
                expect(JSON.stringify(array.slice().sort(asc))).toBe(JSON.stringify(sorted_asc));
            });

            it('should sort desc', function () {
                expect(JSON.stringify(array.slice().sort(desc))).toBe(JSON.stringify(sorted_desc));
            });
        });

        describe('mapSort', function () {
            it('should sort mapped absolute values asc', function () {
                expect(JSON.stringify(array.slice().mapSort(abs, asc))).toBe(JSON.stringify(absolute_sorted_asc));
            });

            it('should sort mapped absolute values desc', function () {
                expect(JSON.stringify(array.slice().mapSort(abs, desc))).toBe(JSON.stringify(absolute_sorted_desc));
            });
        });

        describe('filter', function () {
            it('should filter by atLeast(3)', function () {
                expect(JSON.stringify(array.slice().filter(atLeast(3)))).toBe(JSON.stringify(filtered_atLeast_3));
            });

            it('should filter by atMost(-3)', function () {
                expect(JSON.stringify(array.slice().filter(atMost(-3)))).toBe(JSON.stringify(filtered_atMost_3));
            });
        });

        describe('mapFilter', function () {
            it('should filter mapped absolute values atLeast(3)', function () {
                expect(JSON.stringify(array.slice().mapFilter(abs, atLeast(3)))).toBe(JSON.stringify(absolute_filtered_atLeast_3));
            });

            it('should filter mapped absolute values atMost(3)', function () {
                expect(JSON.stringify(array.slice().mapFilter(abs, atMost(3)))).toBe(JSON.stringify(absolute_filtered_atMost_3));
            });
        });

        describe('reduce', function () {
            it('should reduce by atLeast(3)', function () {
                expect(JSON.stringify(array.slice().reduce(add, 0))).toBe(JSON.stringify(reduced_sum));
            });

            it('should filter by atMost(-3)', function () {
                expect(JSON.stringify(array.slice().reduce(multiply, 1))).toBe(JSON.stringify(reduced_product));
            });
        });


    });
});
