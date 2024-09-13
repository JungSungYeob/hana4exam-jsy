const assert = require("assert");
const { searchByKoreanInitialSound } = require("./ex5");

const s = [
    "강원도 고성군",
    "고성군 토성면",
    "토성면 북면",
    "북면",
    "김1수",
    "ㅈ2ㅇ",
    "장bd수막리",
    "파%호"
];

assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱㅇ"), [
    "강원도 고성군",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱㅅㄱ"), [
    "강원도 고성군",
    "고성군 토성면",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅌㅅㅁ"), [
    "고성군 토성면",
    "토성면 북면",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅂㅁ"), [
    "토성면 북면",
    "북면",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅍㅁ"), []);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱ1ㅅ"), ["김1수"]);

/** ---------- 추가 테스트 케이스 ------------- */

// 추가 테스트 케이스

assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅈ2ㅇ"), ["ㅈ2ㅇ"]);

assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱ"), [
    "강원도 고성군",
    "고성군 토성면",
    "김1수",
]);

assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱ2ㅇ"), []); // 정확히 일치하지 않음
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅁㅁㅁ"), []);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅇㅇ"), []);

assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅌ"), [
    "고성군 토성면",
    "토성면 북면",
]);

// 공백
assert.deepStrictEqual(searchByKoreanInitialSound(s, " "), [
    "강원도 고성군",
    "고성군 토성면",
    "토성면 북면"
]);
//영어
assert.deepStrictEqual(searchByKoreanInitialSound(s, "bd"), ["장bd수막리"]);

//특수문자
assert.deepStrictEqual(searchByKoreanInitialSound(s, "%"), ["파%호"]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "% "), []);

console.log("테스트 통과");
