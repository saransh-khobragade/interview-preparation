/*
Typeahead LRU Cache
--------------------
Implements a Least Recently Used (LRU) cache for typeahead/autocomplete suggestions.

Approach: Use a Map to maintain order and size.
*/

class LRUCache {
    constructor(limit = 5) {
        this.cache = new Map();
        this.limit = limit;
    }
    get(key) {
        if (!this.cache.has(key)) return undefined;
        const val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }
    set(key, val) {
        if (this.cache.has(key)) this.cache.delete(key);
        else if (this.cache.size === this.limit) this.cache.delete(this.cache.keys().next().value);
        this.cache.set(key, val);
    }
}

module.exports = LRUCache; 