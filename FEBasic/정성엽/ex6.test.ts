import assert from "assert";
import { promiseAllSettled, randTime } from "./ex6";

(async function testNormal() {
    assert.deepStrictEqual(
        await promiseAllSettled([randTime(1), randTime(2), randTime(3)]),
        await Promise.allSettled([randTime(1), randTime(2), randTime(3)])
    );
})();

(async function testWithReject() {
    assert.deepStrictEqual(
        await promiseAllSettled([
            randTime(11),
            Promise.reject("REJECT"),
            randTime(33),
        ]),
        await Promise.allSettled([
            randTime(11),
            Promise.reject("REJECT"),
            randTime(33),
        ])
    );
})();

/** ----------- 추가 테스트 케이스 ------------- */
//문자로만 이루어진 경우
(async function testString() {
    assert.deepStrictEqual(
        await promiseAllSettled([
            randTime("hello"),
            randTime("bye"),
            randTime("good"),
        ]),
        await Promise.allSettled([
            randTime("hello"),
            randTime("bye"),
            randTime("good"),
        ])
    );
})();
//문자, 숫자 섞인 경우
(async function testMixed() {
    assert.deepStrictEqual(
        await promiseAllSettled([
            randTime("hello"),
            randTime(1),
            randTime("good"),
        ]),
        await Promise.allSettled([
            randTime("hello"),
            randTime(1),
            randTime("good"),
        ])
    );
})();
//object가 들어간다면?
(async function testMixed() {
    assert.deepStrictEqual(
        await promiseAllSettled([
            randTime("hello"),
            randTime(1),
            randTime({ name: "hong" }),
        ]),
        await Promise.allSettled([
            randTime("hello"),
            randTime(1),
            randTime({ name: "hong" }),
        ])
    );
})();
//null이라면
(async function testMixed() {
    assert.deepStrictEqual(
        await promiseAllSettled([
            randTime(null),
            randTime(null),
            randTime(null),
        ]),
        await Promise.allSettled([
            randTime(null),
            randTime(null),
            randTime(null),
        ])
    );
})();

// reject의 reason에는 어떠한 타입이 들어가도 오류가 생기지 않는다.
// 컴파일에는 이상이 없었고 해당 타입이 들어가는 런타임에서 실행되므로 오류가 생기지 않는다.

(async function testWithAllReject() {
    assert.deepStrictEqual(
        await promiseAllSettled([
            Promise.reject("REJECT: 1"),
            Promise.reject("REJECT: 2"),
            Promise.reject("REJECT: 3"),
        ]),
        await Promise.allSettled([
            Promise.reject("REJECT: 1"),
            Promise.reject("REJECT: 2"),
            Promise.reject("REJECT: 3"),
        ])
    );
})();

//숫자
(async function testWithRejectNum() {
    assert.deepStrictEqual(
        await promiseAllSettled([
            Promise.reject(404),
            Promise.reject(500),
            Promise.reject(401),
        ]),
        await Promise.allSettled([
            Promise.reject(404),
            Promise.reject(500),
            Promise.reject(401),
        ])
    );
})();

//비어있다면? undefined
(async function testWithRejectUndefined() {
    assert.deepStrictEqual(
        await promiseAllSettled([
            Promise.reject(),
            Promise.reject(),
            Promise.reject(),
        ]),
        await Promise.allSettled([
            Promise.reject(),
            Promise.reject(),
            Promise.reject(),
        ])
    );
})();

//null이라면?
(async function testWithRejectNull() {
    assert.deepStrictEqual(
        await promiseAllSettled([
            Promise.reject(null),
            Promise.reject(null),
            Promise.reject(null),
        ]),
        await Promise.allSettled([
            Promise.reject(null),
            Promise.reject(null),
            Promise.reject(null),
        ])
    );
})();

//Reject에 객체를 넣는다면?
(async function testWithRejectObject() {
    assert.deepStrictEqual(
        await promiseAllSettled([
            Promise.reject({ error: "Not allowed 1" }),
            Promise.reject({ error: "Not allowed 2" }),
            Promise.reject({ error: "Not allowed 3" }),
        ]),
        await Promise.allSettled([
            Promise.reject({ error: "Not allowed 1" }),
            Promise.reject({ error: "Not allowed 2" }),
            Promise.reject({ error: "Not allowed 3" }),
        ])
    );
})();

//혼합
(async function testWithRejectNum() {
    assert.deepStrictEqual(
        await promiseAllSettled([
            Promise.reject(404),
            Promise.reject("error"),
            Promise.reject({ error: "Not allowed 3" }),
        ]),
        await Promise.allSettled([
            Promise.reject(404),
            Promise.reject("error"),
            Promise.reject({ error: "Not allowed 3" }),
        ])
    );
})();
