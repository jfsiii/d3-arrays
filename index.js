(function() {
    !function() {
        var d3 = {
            version: "3.4.4"
        };
        d3.ascending = d3_ascending;
        function d3_ascending(a, b) {
            return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
        }
        d3.descending = function(a, b) {
            return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
        };
        d3.min = function(array, f) {
            var i = -1, n = array.length, a, b;
            if (arguments.length === 1) {
                while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
                while (++i < n) if ((b = array[i]) != null && a > b) a = b;
            } else {
                while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
                while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
            }
            return a;
        };
        d3.max = function(array, f) {
            var i = -1, n = array.length, a, b;
            if (arguments.length === 1) {
                while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
                while (++i < n) if ((b = array[i]) != null && b > a) a = b;
            } else {
                while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
                while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
            }
            return a;
        };
        d3.extent = function(array, f) {
            var i = -1, n = array.length, a, b, c;
            if (arguments.length === 1) {
                while (++i < n && !((a = c = array[i]) != null && a <= a)) a = c = undefined;
                while (++i < n) if ((b = array[i]) != null) {
                    if (a > b) a = b;
                    if (c < b) c = b;
                }
            } else {
                while (++i < n && !((a = c = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
                while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
                    if (a > b) a = b;
                    if (c < b) c = b;
                }
            }
            return [ a, c ];
        };
        d3.sum = function(array, f) {
            var s = 0, n = array.length, a, i = -1;
            if (arguments.length === 1) {
                while (++i < n) if (!isNaN(a = +array[i])) s += a;
            } else {
                while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
            }
            return s;
        };
        function d3_number(x) {
            return x != null && !isNaN(x);
        }
        d3.mean = function(array, f) {
            var n = array.length, a, m = 0, i = -1, j = 0;
            if (arguments.length === 1) {
                while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
            } else {
                while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
            }
            return j ? m : undefined;
        };
        d3.quantile = function(values, p) {
            var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
            return e ? v + e * (values[h] - v) : v;
        };
        d3.median = function(array, f) {
            if (arguments.length > 1) array = array.map(f);
            array = array.filter(d3_number);
            return array.length ? d3.quantile(array.sort(d3_ascending), .5) : undefined;
        };
        function d3_bisector(compare) {
            return {
                left: function(a, x, lo, hi) {
                    if (arguments.length < 3) lo = 0;
                    if (arguments.length < 4) hi = a.length;
                    while (lo < hi) {
                        var mid = lo + hi >>> 1;
                        if (compare(a[mid], x) < 0) lo = mid + 1; else hi = mid;
                    }
                    return lo;
                },
                right: function(a, x, lo, hi) {
                    if (arguments.length < 3) lo = 0;
                    if (arguments.length < 4) hi = a.length;
                    while (lo < hi) {
                        var mid = lo + hi >>> 1;
                        if (compare(a[mid], x) > 0) hi = mid; else lo = mid + 1;
                    }
                    return lo;
                }
            };
        }
        var d3_bisect = d3_bisector(d3_ascending);
        d3.bisectLeft = d3_bisect.left;
        d3.bisect = d3.bisectRight = d3_bisect.right;
        d3.bisector = function(f) {
            return d3_bisector(f.length === 1 ? function(d, x) {
                return d3_ascending(f(d), x);
            } : f);
        };
        d3.shuffle = function(array) {
            var m = array.length, t, i;
            while (m) {
                i = Math.random() * m-- | 0;
                t = array[m], array[m] = array[i], array[i] = t;
            }
            return array;
        };
        d3.permute = function(array, indexes) {
            var i = indexes.length, permutes = new Array(i);
            while (i--) permutes[i] = array[indexes[i]];
            return permutes;
        };
        d3.pairs = function(array) {
            var i = 0, n = array.length - 1, p0, p1 = array[0], pairs = new Array(n < 0 ? 0 : n);
            while (i < n) pairs[i] = [ p0 = p1, p1 = array[++i] ];
            return pairs;
        };
        d3.zip = function() {
            if (!(n = arguments.length)) return [];
            for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m; ) {
                for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n; ) {
                    zip[j] = arguments[j][i];
                }
            }
            return zips;
        };
        function d3_zipLength(d) {
            return d.length;
        }
        d3.transpose = function(matrix) {
            return d3.zip.apply(d3, matrix);
        };
        d3.keys = function(map) {
            var keys = [];
            for (var key in map) keys.push(key);
            return keys;
        };
        d3.values = function(map) {
            var values = [];
            for (var key in map) values.push(map[key]);
            return values;
        };
        d3.entries = function(map) {
            var entries = [];
            for (var key in map) entries.push({
                key: key,
                value: map[key]
            });
            return entries;
        };
        d3.merge = function(arrays) {
            var n = arrays.length, m, i = -1, j = 0, merged, array;
            while (++i < n) j += arrays[i].length;
            merged = new Array(j);
            while (--n >= 0) {
                array = arrays[n];
                m = array.length;
                while (--m >= 0) {
                    merged[--j] = array[m];
                }
            }
            return merged;
        };
        var abs = Math.abs;
        d3.range = function(start, stop, step) {
            if (arguments.length < 3) {
                step = 1;
                if (arguments.length < 2) {
                    stop = start;
                    start = 0;
                }
            }
            if ((stop - start) / step === Infinity) throw new Error("infinite range");
            var range = [], k = d3_range_integerScale(abs(step)), i = -1, j;
            start *= k, stop *= k, step *= k;
            if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k); else while ((j = start + step * ++i) < stop) range.push(j / k);
            return range;
        };
        function d3_range_integerScale(x) {
            var k = 1;
            while (x * k % 1) k *= 10;
            return k;
        }
        function d3_class(ctor, properties) {
            try {
                for (var key in properties) {
                    Object.defineProperty(ctor.prototype, key, {
                        value: properties[key],
                        enumerable: false
                    });
                }
            } catch (e) {
                ctor.prototype = properties;
            }
        }
        d3.map = function(object) {
            var map = new d3_Map();
            if (object instanceof d3_Map) object.forEach(function(key, value) {
                map.set(key, value);
            }); else for (var key in object) map.set(key, object[key]);
            return map;
        };
        function d3_Map() {}
        d3_class(d3_Map, {
            has: d3_map_has,
            get: function(key) {
                return this[d3_map_prefix + key];
            },
            set: function(key, value) {
                return this[d3_map_prefix + key] = value;
            },
            remove: d3_map_remove,
            keys: d3_map_keys,
            values: function() {
                var values = [];
                this.forEach(function(key, value) {
                    values.push(value);
                });
                return values;
            },
            entries: function() {
                var entries = [];
                this.forEach(function(key, value) {
                    entries.push({
                        key: key,
                        value: value
                    });
                });
                return entries;
            },
            size: d3_map_size,
            empty: d3_map_empty,
            forEach: function(f) {
                for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) f.call(this, key.substring(1), this[key]);
            }
        });
        var d3_map_prefix = "\x00", d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
        function d3_map_has(key) {
            return d3_map_prefix + key in this;
        }
        function d3_map_remove(key) {
            key = d3_map_prefix + key;
            return key in this && delete this[key];
        }
        function d3_map_keys() {
            var keys = [];
            this.forEach(function(key) {
                keys.push(key);
            });
            return keys;
        }
        function d3_map_size() {
            var size = 0;
            for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) ++size;
            return size;
        }
        function d3_map_empty() {
            for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) return false;
            return true;
        }
        d3.nest = function() {
            var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
            function map(mapType, array, depth) {
                if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
                var i = -1, n = array.length, key = keys[depth++], keyValue, object, setter, valuesByKey = new d3_Map(), values;
                while (++i < n) {
                    if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
                        values.push(object);
                    } else {
                        valuesByKey.set(keyValue, [ object ]);
                    }
                }
                if (mapType) {
                    object = mapType();
                    setter = function(keyValue, values) {
                        object.set(keyValue, map(mapType, values, depth));
                    };
                } else {
                    object = {};
                    setter = function(keyValue, values) {
                        object[keyValue] = map(mapType, values, depth);
                    };
                }
                valuesByKey.forEach(setter);
                return object;
            }
            function entries(map, depth) {
                if (depth >= keys.length) return map;
                var array = [], sortKey = sortKeys[depth++];
                map.forEach(function(key, keyMap) {
                    array.push({
                        key: key,
                        values: entries(keyMap, depth)
                    });
                });
                return sortKey ? array.sort(function(a, b) {
                    return sortKey(a.key, b.key);
                }) : array;
            }
            nest.map = function(array, mapType) {
                return map(mapType, array, 0);
            };
            nest.entries = function(array) {
                return entries(map(d3.map, array, 0), 0);
            };
            nest.key = function(d) {
                keys.push(d);
                return nest;
            };
            nest.sortKeys = function(order) {
                sortKeys[keys.length - 1] = order;
                return nest;
            };
            nest.sortValues = function(order) {
                sortValues = order;
                return nest;
            };
            nest.rollup = function(f) {
                rollup = f;
                return nest;
            };
            return nest;
        };
        d3.set = function(array) {
            var set = new d3_Set();
            if (array) for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
            return set;
        };
        function d3_Set() {}
        d3_class(d3_Set, {
            has: d3_map_has,
            add: function(value) {
                this[d3_map_prefix + value] = true;
                return value;
            },
            remove: function(value) {
                value = d3_map_prefix + value;
                return value in this && delete this[value];
            },
            values: d3_map_keys,
            size: d3_map_size,
            empty: d3_map_empty,
            forEach: function(f) {
                for (var value in this) if (value.charCodeAt(0) === d3_map_prefixCode) f.call(this, value.substring(1));
            }
        });
        if (typeof define === "function" && define.amd) {
            define(d3);
        } else if (typeof module === "object" && module.exports) {
            module.exports = d3;
        } else {
            this.d3 = d3;
        }
    }();
})();