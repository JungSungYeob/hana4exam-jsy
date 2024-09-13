class Collection<T> {

    protected readonly arr = Array<T>();

    /** 생성자: ...args를 받아서 this.arr 배열에 추가(push) */
    constructor(...args: T[]) {
        this.arr.push(...args);
    }

    /** _arr를 이용해 arr 배열을 외부에서 읽을 수 있음 */
    get _arr() {
        return this.arr;
    }

    /** 배열에 추가하고 수정된 배열 반환 */
    push(...args: T[]) {
        this.arr.push(...args);
        return this.arr;
    }

    /** peek를 이용해 Queue인 경우 첫번째값 반환, 아니면 마지막값 반환*/
    get peek(): T | undefined {
        return this.isQueue() ? this.arr[0] : this.arr.at(-1);
    }

    /** poll을 이용해 Queue인 경우 첫번째 값 제거(shift), 아니면 마지막값 제거(pop) => 제거된 값 반환  */
    get poll(): T | undefined {
        return this.isQueue() ? this.arr.shift() : this.arr.pop();
    }

    /** 배열의 길이 반환 */
    get length() {
        return this.arr.length;
    }

    /** 배열이 비었는지 확인, 비었으면 true */
    get isEmpty() {
        return !this.arr.length;
    }

    /** 배열 초기화 */
    clear() {
        this.arr.length = 0;
    }

    /** symbol.iterator 반환  */
    iterator() {
        return this[Symbol.iterator]();
    }
    //[1, 2, 3]
    /** 배열의 마지막 요소부터 순차적으로 값 반환 */
    *[Symbol.iterator]() {
        for (let i = this.length - 1; i >= 0; i -= 1) {
            yield this.toArray()[i];
        }
    }

    /** Queue면 역순 반환, 아니면 그대로 반환 */
    toArray() {
        return this.isQueue() ? this.arr.toReversed() : this.arr;
    }

    /** 클래스의 이름과 배열의 내용 출력 */
    print() {
        console.log(`<${this.constructor.name}: [${this.toArray()}]>`);
    }

    /** Queue가 Queue 클래스의 인스턴스인지 확인하는 함수 */
    private isQueue() {
        return this instanceof Queue;
    }
}

class Stack<T> extends Collection<T> {}
class Queue<T> extends Collection<T> {}

type ListNode<T> = {
    value: T;
    rest?: ListNode<T>;
};

// ArrayList 클래스를 작성하세요.
class ArrayList<T> extends Collection<T> {
    //생성자
    constructor(args: T[] = []) {
        super(...args);
    }

    //listToArray 구현,
    static listToArray<U>(list: {
        value: U;
        rest?: { value: U; rest?: any };
    }): U[] {
        const result: U[] = [list.value];
        if (list.rest) {
            result.push(...this.listToArray(list.rest));
        }
        return result;
    }

    //arrayToList 구현, toString과 유사
    static arrayToList<U>(arr: U[]): ListNode<U> | undefined {
        // 마지막 요소에서 rest : undefined
        if (arr.length === 0) {
            return undefined;
        }
        const [value, ...rest] = arr;
        const restStructure = this.arrayToList(rest);
        //마지막 rest가 undefined라면 생략
        return restStructure !== undefined
            ? { value, rest: restStructure }
            : { value };
    }

    add(value: T, index?: number) {
        //index가 있는 경우 index위치에 추가
        if (index !== undefined && index >= 0 && index < this.length) {
            this._arr.splice(index, 0, value);
        } else {
            this.push(value);
        }
    }

    toString() {
        return this.listToStructure(this.toArray());
    }

    /** 주어진 양식으로 전환하기 위한 재귀함수*/
    private listToStructure(arr: T[]): ListNode<T> | undefined {
        if (arr.length === 0) {
            return undefined;
        }
        const [value, ...rest] = arr;
        const restStructure = this.listToStructure(rest);
        //마지막 rest가 undefined라면 생략
        return restStructure !== undefined
            ? { value, rest: restStructure }
            : { value };
    }

    remove(value: T) {
        const index = this._arr.indexOf(value); // 배열에서 값의 인덱스를 찾기
        //index가 유효하다면(있다면)
        if (index !== -1) {
            this._arr.splice(index, 1); //제거
        }
    }
    removeByIndex(index: number): void {
        if (index < 0 || index >= this._arr.length) {
            throw new Error("Invalid index");
        }
        this._arr.splice(index, 1); // index 위치의 요소 1개를 삭제
    }

    set(index: number, value: T) {
        //index 유효 검사
        if (index >= 0 && index < this.length) {
            this._arr[index] = value;
        }
    }

    get(index: number): T | undefined {
        //index 유효 검사
        if (index >= 0 && index < this.length) {
            return this._arr[index];
        }
        return undefined;
    }

    size(): number {
        return this.length;
    }

    indexOf(value: T): number {
        return this._arr.indexOf(value); // 배열에서 값의 인덱스를 반환
    }
    contains(value: T): boolean {
        return this._arr.indexOf(value) !== -1; // 값이 있으면 true, 없으면 false 반환
    }
    iterator() {
        return this[Symbol.iterator](); // Symbol.iterator()를 사용
    }

    // Collection의 Symbol.iterator를 오버라이드(정방향을 위함)
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i += 1) {
            yield this._arr[i];
        }
    }
    print() {
        return this.toString();
    }
}

export { Stack, Queue, ArrayList };
