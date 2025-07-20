// Typeahead Search with LRU Cache

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    get(key) {
        if (!this.cache.has(key)) return undefined;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    set(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
    }
}

function typeaheadSearch(query, data, cache) {
    const cached = cache.get(query);
    if (cached) return cached;
    const result = data.filter(item => item.includes(query));
    cache.set(query, result);
    return result;
}

// Usage example:
// const cache = new LRUCache(3);
// typeaheadSearch('ap', ['apple','banana','apricot'], cache);

module.exports = { LRUCache, typeaheadSearch }; 