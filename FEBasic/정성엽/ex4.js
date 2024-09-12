/** Object인지 확인 */
function isObject(obj) {
    return obj && typeof obj === "object";
}

function deepCopy(obj) {
    if (!isObject(obj) || obj instanceof WeakSet || obj instanceof WeakMap) {
        return obj;
    }

    /** 배열인 경우 */
    if (Array.isArray(obj)) {
        //재귀적으로 객체 복사 => deepCopy
        return obj.map((item) => deepCopy(item));
    }

    /** set인 경우 */
    if (obj instanceof Set) {
        const newSet = new Set();
        obj.forEach((value) => {
            newSet.add(deepCopy(value));
        });
        return newSet;
    }
    /** map인 경우 */
    if (obj instanceof Map) {
        const newMap = new Map();
        obj.forEach((value, key) => {
            newMap.set(deepCopy(key), deepCopy(value));
        });
        return newMap;
    }

    const newer = {};

    /** Deep Copy (value & symbol) */
    for (const k of Reflect.ownKeys(obj)) {
        //재귀적으로 객체 복사 => DeepCopy
        newer[k] = deepCopy(obj[k]);
    }

    return newer;
}

module.exports = { deepCopy };
