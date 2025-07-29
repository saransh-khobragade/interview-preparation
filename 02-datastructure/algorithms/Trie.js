// Trie (Prefix Tree) implementation in JavaScript
// Supports insert, search, startsWith, and delete methods

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word) {
        let current = this.root;
        for (let char of word) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
    }
    search(word) {
        let current = this.root;
        for (let char of word) {
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        return current.isEndOfWord;
    }
    startsWith(prefix) {
        let current = this.root;
        for (let char of prefix) {
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        return true;
    }
    delete(word) {
        this.deleteRecursive(this.root, word, 0);
    }
    deleteRecursive(node, word, index) {
        if (!node) return false;
        if (index === word.length) {
            if (!node.isEndOfWord) return false;
            node.isEndOfWord = false;
            return Object.keys(node.children).length === 0;
        }
        const char = word[index];
        const shouldDelete = this.deleteRecursive(node.children[char], word, index + 1);
        if (shouldDelete) {
            delete node.children[char];
            return Object.keys(node.children).length === 0;
        }
        return false;
    }
}

module.exports = { TrieNode, Trie }; 