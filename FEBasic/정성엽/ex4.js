/** Object인지 확인 */
function isObject(obj) {
    return obj && typeof obj === "object";
}
/** deep copy Map*/
function deepCopyMap(obj) {
    const newMap = new Map();
    obj.forEach((value, key) => {
        newMap.set(deepCopy(key), deepCopy(value));
    });
    return newMap;
}
/** deep copy Set */
function deepCopySet(obj) {
    const newSet = new Set();
    obj.forEach((value) => newSet.add(deepCopy(value)));
    return newSet;
}
/** deep copy object(value & symbol) */
function deepCopyObject(obj) {
    const newObj = {};
    Reflect.ownKeys(obj).forEach((key) => {
        newObj[key] = deepCopy(obj[key]);
    });
    return newObj;
}

function deepCopy(obj) {
    if (!isObject(obj) || obj instanceof WeakSet || obj instanceof WeakMap) {
        return obj;
    }

    /** 배열인 경우 */
    if (Array.isArray(obj)) {
        return obj.map((item) => deepCopy(item));
    }

    /** set인 경우 */
    if (obj instanceof Set) {
        return deepCopySet(obj);
    }
    /** map인 경우 */
    if (obj instanceof Map) {
        return deepCopyMap(obj);
    }
    /** Deep Copy (value & symbol) */
    return deepCopyObject(obj);
}

module.exports = { deepCopy };
