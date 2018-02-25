function serializeArguments(args: IArguments) {
    return [...args].map(x => {
        if (typeof x == 'object') {
            return JSON.stringify(x)
        } else {
            //可以处理null等情况
            return x + ''
        }
    }).join(':')
}

class Cache<T> {
    cacheMap: Map<string, { item: T, ts: number, isPromise: boolean, tts: number }> = new Map();

    constructor(private ttl: number, private maxCount: number) {
        this.ttl = ttl * 1000;
    }

    checkExpire() {
        let current = Date.now();
        let expKeys = [];
        this.cacheMap.forEach((v, k) => {
            if (v.ts + this.ttl < current) {
                expKeys.push(k)
            }
        });
        expKeys.forEach(k => {
            this.cacheMap.delete(k);
        })
    }

    checkOldest() {
        let mints = Number.MAX_SAFE_INTEGER;
        let minkey = null;
        this.cacheMap.forEach((v, k) => {
            if (v.tts < mints) {
                mints = v.tts;
                minkey = k;
            }
        });
        this.cacheMap.delete(minkey);
    }

    setCache(key: string, value: T, isPromise: boolean) {
        this.checkExpire();
        if (this.cacheMap.size == this.maxCount) {
            this.checkOldest();
        }
        this.cacheMap.set(key, {item: value, ts: Date.now(), isPromise, tts: Date.now()});
        return value;
    }

    getCache(key: string) {
        let item = this.cacheMap.get(key);
        let now = Date.now();
        if (item) {
            if (item.ts + this.ttl > now) {
                item.tts = Date.now();
                if (item.isPromise) {
                    return [true, Promise.resolve(item.item)];
                } else {
                    return [true, item.item];
                }
            } else {
                this.cacheMap.delete(key);
            }
        }
        return [false, null]
    }
}

export function lruCache(ttl = 120, maxCount = 50, log = false) {
    return function (target, name, descriptor) {
        // target.__cache=target.__cache||new Map();
        // target.__cache.set(name,new Cache(ttl,maxCount));
        let cache = new Cache(ttl, maxCount);
        let cacheIdMap = new WeakMap();
        let func = descriptor.value;
        descriptor.value = function () {
            let cachedId = cacheIdMap.get(this);
            if (!cachedId) {
                do {
                    cachedId = '' + Math.random()
                } while (cacheIdMap.has(cachedId));
                cacheIdMap.set(this, cachedId);
            }
            let keys = cachedId + serializeArguments(arguments);
            let [flag, result] = cache.getCache(keys);
            if (flag) {
                if (log) {
                    console.log('cache hit');
                }
                return result
            }
            if (log) {
                console.log('cache miss');
            }
            let funcResult = func.apply(this, arguments);
            if (funcResult && funcResult.then) {
                return funcResult.then(r => cache.setCache(keys, r, true))
            }
            return cache.setCache(keys, funcResult, false)
        }
    }
}


class Test {

    constructor(private name) {
    }

    @lruCache(10, 10)
    async foo(t) {
        return await Promise.resolve(this.name + t)
    }
}

