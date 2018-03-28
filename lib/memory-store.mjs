class MemoryStore {
    constructor() {
        this.store = {}
    }
    set(key, value) {
        this.store[key] = value
    }
    get(key) {
        this.store[key]
    }
}

export default function () {
    console.log('in memory-store')
    return new MemoryStore()
}