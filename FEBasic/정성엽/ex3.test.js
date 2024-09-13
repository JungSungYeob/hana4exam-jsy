const assert = require("assert");
require("./ex3");

const hong = { id: 1, name: "Hong", city: "Busan", dept: 1 };
const kim = { id: 2, name: "Kim", city: "Seoul", dept: 2 };
const lee = { id: 3, name: "Lee", city: "Daegu", dept: 2 };
const park = { id: 4, name: "Park", city: "Incheon", dept: 3 };
const choi = { id: 5, name: "Choi", city: "Busan", dept: 1 };
const users = [lee, hong, kim, park, choi];

// 기본적인 오름차순, 내림차순 정렬
assert.deepStrictEqual(users.sortBy("id"), [hong, kim, lee, park, choi]);
assert.deepStrictEqual(users.sortBy("id:desc"), [choi, park, lee, kim, hong]);

// name으로 오름차순, 내림차순 정렬
assert.deepStrictEqual(users.sortBy("name"), [choi, hong, kim, lee, park]);
assert.deepStrictEqual(users.sortBy("name:desc"), [park, lee, kim, hong, choi]);

// dept로 오름차순, 내림차순 정렬
assert.deepStrictEqual(users.sortBy("dept"), [hong, choi, kim, lee, park]);
assert.deepStrictEqual(users.sortBy("dept:desc"), [park, kim, lee, hong, choi]);

// 복합 기준 정렬 (dept 내림차순, city 오름차순)
assert.deepStrictEqual(users.sortBy("dept:desc,city:asc"), [
    park,
    lee,
    kim,
    hong,
    choi,
]);

// 복합 기준 정렬 (dept 내림차순, city 내림차순)
assert.deepStrictEqual(users.sortBy("dept:desc,city:desc"), [
    park,
    kim,
    lee,
    hong,
    choi,
]);

// 빈 값 전달 테스트 (원래 배열 반환)
assert.deepStrictEqual(users.sortBy(""), users);
assert.deepStrictEqual(users.sortBy(""), [park, kim, lee, hong, choi]);

// 복합 기준 테스트 (여러 필드 조합)
assert.deepStrictEqual(users.sortBy("name:desc,id:asc,dept:asc"), [
    park,
    lee,
    kim,
    hong,
    choi,
]);

assert.deepStrictEqual(users.sortBy("dept:asc,city:desc"), [
    hong,
    choi,
    kim,
    lee,
    park,
]);

// // 속성이 없는 객체 추가 테스트
const emptyUser = { id: 6 };
const mixedUsers = [...users, emptyUser];
assert.deepStrictEqual(mixedUsers.sortBy("name:desc"), [
    park,
    lee,
    kim,
    hong,
    choi,
    emptyUser,
]);

assert.deepStrictEqual(mixedUsers.sortBy("city:asc"), [
    hong,
    choi,
    lee,
    park,
    kim,
    emptyUser,
]);

console.log("테스트 통과");
