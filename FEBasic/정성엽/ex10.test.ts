import { ArrayList } from "./ex10";

import assert from "assert";

// 여기에 테스트코드를 작성하세요.

//listToArray 확인
assert.deepStrictEqual(
    ArrayList.listToArray({ value: 1, rest: { value: 2 } }),
    [1, 2]
);
assert.deepStrictEqual(
    ArrayList.listToArray({ value: 1, rest: { value: 2, rest: { value: 3 } } }),
    [1, 2, 3]
);
assert.deepStrictEqual(
    ArrayList.listToArray({
        value: 1,
        rest: { value: 2, rest: { value: 3, rest: { value: 4 } } },
    }),
    [1, 2, 3, 4]
);
//arrayToList 확인
assert.deepStrictEqual(ArrayList.arrayToList([1, 2]), {
    value: 1,
    rest: { value: 2 },
});
assert.deepStrictEqual(ArrayList.arrayToList([1, 2, 3]), {
    value: 1,
    rest: { value: 2, rest: { value: 3 } },
});
assert.deepStrictEqual(ArrayList.arrayToList([1, 2, 3, 4]), {
    value: 1,
    rest: { value: 2, rest: { value: 3, rest: { value: 4 } } },
});
//빈 배열인 경우 따지기
const alist = new ArrayList([1, 2]);
assert.deepStrictEqual(alist.toArray(), [1, 2]);
const blist = new ArrayList();
assert.deepStrictEqual(blist.toArray(), []);

//add에 value만 있는 경우
alist.add(3);
assert.deepStrictEqual(alist.toString(), {
    value: 1,
    rest: { value: 2, rest: { value: 3 } },
});
blist.add(100);
assert.deepStrictEqual(blist.toString(), {
    value: 100,
});

//add에 value index 모두 있는 경우
alist.add(5, 1);
assert.deepStrictEqual(alist.toString(), {
    value: 1,
    rest: { value: 5, rest: { value: 2, rest: { value: 3 } } },
});
blist.add(200, 1);
assert.deepStrictEqual(blist.toString(), {
    value: 100,
    rest: { value: 200 },
});
//index가 배열 길이를 넘어간 경우 마지막에 그냥 push
blist.add(300, 10);
assert.deepStrictEqual(blist.toString(), {
    value: 100,
    rest: { value: 200, rest: { value: 300 } },
});

//remove 확인
alist.remove(2);
assert.deepStrictEqual(alist.toString(), {
    value: 1,
    rest: { value: 5, rest: { value: 3 } },
});
blist.removeByIndex(2);
assert.deepStrictEqual(blist.toString(), {
    value: 100,
    rest: { value: 200 },
});

//add 추가 확인
alist.add(22, 1);
assert.deepStrictEqual(alist.toString(), {
    value: 1,
    rest: { value: 22, rest: { value: 5, rest: { value: 3 } } },
});
alist.add(33, 1);
assert.deepStrictEqual(alist.toString(), {
    value: 1,
    rest: {
        value: 33,
        rest: { value: 22, rest: { value: 5, rest: { value: 3 } } },
    },
});
//set index 위치에 값 바꾸기
alist.set(1, 300);
assert.deepStrictEqual(alist.toString(), {
    value: 1,
    rest: {
        value: 300,
        rest: { value: 22, rest: { value: 5, rest: { value: 3 } } },
    },
});
//set index가 배열보다 큰 경우: undefined
blist.set(10, 400);
assert.deepStrictEqual(blist.toString(), {
    value: 100,
    rest: { value: 200 },
});
//index 위치의 값 get
assert.deepStrictEqual(alist.get(2), 22);
//index가 배열보다 큰 경우: 무시
assert.deepStrictEqual(blist.get(10), undefined);

//배열 사이즈
assert.deepStrictEqual(alist.size(), 5);
assert.deepStrictEqual(blist.size(), 2);

//value가 있는 index 반환
assert.deepStrictEqual(alist.indexOf(300), 1);
//값이 없다면? : -1
assert.deepStrictEqual(blist.indexOf(1000), -1);

//value값을 가지고 있으면 true,아니면 false
assert.deepStrictEqual(alist.contains(300), true);
assert.deepStrictEqual(alist.contains(301), false);

//배열이 비었는지 확인
assert.deepStrictEqual(alist.isEmpty, false);

//Collection에 있는 peek 동작
assert.deepStrictEqual(alist.peek, 3);
assert.deepStrictEqual(blist.peek, 200);

//toArray 동작 재 확인
assert.deepStrictEqual(alist.toArray(), [1, 300, 22, 5, 3]);

//iterator 정방향 확인
assert.deepStrictEqual(alist.iterator().next(), { value: 1, done: false });
//선언하지 않고 새롭게 호출하면 달라지지 않음
assert.deepStrictEqual(alist.iterator().next(), { value: 1, done: false });

//선언 후 사용
const iterTest = alist.iterator();
assert.deepStrictEqual(iterTest.next(), { value: 1, done: false });
assert.deepStrictEqual(iterTest.next(), { value: 300, done: false });
assert.deepStrictEqual(iterTest.next(), { value: 22, done: false });
assert.deepStrictEqual(iterTest.next(), { value: 5, done: false });
assert.deepStrictEqual(iterTest.next(), { value: 3, done: false });
assert.deepStrictEqual(iterTest.next(), {
    value: undefined,
    done: true,
});

//배열 삭제
alist.clear();
//삭제 확인 by isEmpty
assert.deepStrictEqual(alist.isEmpty, true);

assert.deepStrictEqual(blist.print(), {
    value: 100,
    rest: { value: 200 },
});
