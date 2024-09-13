/** 공통적으로 사용하는 Timer를 mode에 따라 다르게 */
const createTimer = <T extends (...args: Parameters<T>) => ReturnType<T>>(
    cb: T,
    delay: number,
    mode: "debounce" | "throttle"
): ((...args: Parameters<T>) => void) => {
    let timer: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>): void => {
        if (mode === "throttle" && timer) return;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            cb(...args);
            timer = null;
        }, delay);
    };
};
/** debounce 함수 */
const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
    cb: T,
    delay: number
) => createTimer(cb, delay, "debounce");

/** throttle 함수 */
const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(
    cb: T,
    delay: number
) => createTimer(cb, delay, "throttle");

/** debounce 호출 */
const debo1 = debounce((a: number) => console.log("debounce1: ", a + 1), 500);
for (let i = 10; i < 15; i++) debo1(i); // 15 출력

const debo2 = debounce((a: number) => console.log("debounce2: ", a + 1), 500);
for (let i = 10; i < 15; i++) debo2(i); // 생략(뒤에서 바로 실행되어서)
for (let i = 10; i < 10000; i++) debo2(i); // 10000 출력

const debo3 = debounce((a: number) => console.log("debounce3: ", a + 1), 500);
for (let i = 10; i < 15; i++) {
    setTimeout(() => {
        debo3(i);
    }, (i - 10) * 600 + 600);
}//11 12 13 14 15

/** throttle 호출 */
const thro1 = throttle((a: number) => console.log("throttle1: ", a + 1), 500);
for (let i = 10; i < 15; i++) thro1(i); // 11 출력

const thro2 = throttle((a: number) => console.log("throttle2: ", a + 1), 500);
for (let i = 10; i < 15; i++) thro2(i);
for (let i = 10; i < 10000; i++) thro2(i); // 11 출력

const thro3 = throttle((a: number) => console.log("throttle3: ", a + 1), 500);
for (let i = 10; i < 15; i++) {
    setTimeout(() => {
        thro3(i);
    }, (i - 10) * 600 + 600);
}//11 12 13 14 15

export = { debounce, throttle };
