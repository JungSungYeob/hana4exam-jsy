const assert = require("assert");
const { range } = require("./ex2");
//정방향 테스트
assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
//step이 없는 경우
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//역방향이면서 step이 없는 경우
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

//step이 0인경우
assert.deepStrictEqual(range(5, 5, 0), [5]);
assert.deepStrictEqual(range(1, 5, 0), [1]);
//start와 end가 같은경우
assert.deepStrictEqual(range(5, 5, -1), [5]);
assert.deepStrictEqual(range(5, 5), [5]);
assert.deepStrictEqual(range(0, 0, 5), [0]);
//정방향 step이 알맞지 않은 경우
assert.deepStrictEqual(range(1, 5, -1), []);
//정방향 테스트
assert.deepStrictEqual(range(1, 5, 6), [1]);
assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);

//역방향 step이 알맞지 않은 경우
assert.deepStrictEqual(range(5, 1, 1), []);
//역방향 테스트
assert.deepStrictEqual(range(0, -1), [0, -1]);
assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);
//start만 주어진경우
assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
//start가 0이면
assert.deepStrictEqual(range(0), [0]);
//0부터0까지
assert.deepStrictEqual(range(0, 0), [0]);
//step이 매운 큰 경우 1
assert.deepStrictEqual(range(2, 1, -5), [2]);
//step이 매운 큰 경우 2
assert.deepStrictEqual(range(0, -1, -5), [0]);
//음수만 주어진 경우
assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
//배열 생성 함수를 통한 비교1
assert.deepStrictEqual(
    range(50),
    Array.from({ length: 50 }, (_, i) => i + 1)
);
//배열 생성 함수를 통한 비교2
assert.deepStrictEqual(
    range(1, 150, 3),
    Array.from({ length: 50 }, (_, i) => i * 3 + 1)
);

//정방향 소수
assert.deepStrictEqual(
    range(1, 2, 0.1),
    [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]
);

/* ------------ 추가 테스트 케이스 ---------------- */

//역방향 소수
assert.deepStrictEqual(
    range(2, 1, -0.1),
    [2, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1]
);

// 매우 큰 양의 범위
assert.deepStrictEqual(range(1, 1000000, 999999), [1, 1000000]);

// 매우 큰 음의 범위
assert.deepStrictEqual(range(-1000000, -1, 999999), [-1000000, -1]);

// 매우 작은 양수 범위 (소수점 간격)
assert.deepStrictEqual(
    range(1, 2, 0.0001).slice(0, 5),
    [1, 1.0001, 1.0002, 1.0003, 1.0004]
);

// 매우 작은 음수 범위 (소수점 간격)
assert.deepStrictEqual(
    range(-1, -2, -0.0001).slice(0, 5),
    [-1, -1.0001, -1.0002, -1.0003, -1.0004]
);

// 큰 간격을 가진 양의 범위
assert.deepStrictEqual(range(0, 100, 100), [0, 100]);

// 큰 간격을 가진 음의 범위
assert.deepStrictEqual(range(-100, 0, 100), [-100, 0]);

// 시작 값과 끝 값이 같음 (양수)
assert.deepStrictEqual(range(1000000, 1000000), [1000000]);

// 시작 값과 끝 값이 같음 (음수)
assert.deepStrictEqual(range(-1000000, -1000000), [-1000000]);

// 소수 간격의 역방향 범위
assert.deepStrictEqual(
    range(0.1, 0, -0.01),
    [0.1, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01, 0]
);

// 0과 0 사이의 범위
assert.deepStrictEqual(range(0, 0), [0]);

// 작은 수를 음수로 내려가는 범위
assert.deepStrictEqual(
    range(0.0001, 0, -0.00001),
    [
        0.0001, 0.00009, 0.00008, 0.00007, 0.00006, 0.00005, 0.00004, 0.00003,
        0.00002, 0.00001, 0,
    ]
);

// 큰 범위를 가진 경우
assert.deepStrictEqual(range(1, 1000000, 1).length, 1000000);
assert.deepStrictEqual(
    range(1, 1000000, 1),
    Array.from({ length: 1000000 }, (_, i) => i + 1)
);

console.log("테스트 통과");
