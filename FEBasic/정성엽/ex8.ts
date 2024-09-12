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
const debo = debounce((a: number) => console.log("debounce: ",a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

/** throttle 호출 */
const thro = throttle((a: number) => console.log("throttle: ", a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력

export = { debounce, throttle };
