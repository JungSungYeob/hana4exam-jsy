export const randTime = <T>(val: T): Promise<T> =>
    new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

//promise.all을 구현한 promiseAll
function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
    return new Promise((resolve, rejects) => {
        const results: T[] = [];
        let promiseCnt = promises.length;
        if (!promiseCnt) {
            resolve(results);
            return;
        }
        promises.forEach((promise, index) => {
            promise
                .then((value) => {
                    results[index] = value;
                    if ((promiseCnt -= 1) === 0) {
                        resolve(results);
                    }
                })
                .catch((reason) => {
                    rejects(reason);
                });
        });
    });
}

//중복 사용하는 타입 정의
type Fulfilled<T> = { status: "fulfilled"; value: T };
type Rejected = { status: "rejected"; reason: unknown };
type SettledResult<T> = Fulfilled<T> | Rejected;

/** promiseAll을 사용하여 더욱 간결하게 promiseAllSettled 구현 */
export function promiseAllSettled<T extends unknown[]>(promises: {
    [K in keyof T]: Promise<T[K]>;
}): Promise<{
    [K in keyof T]: SettledResult<T[K]>;
}> {
    return promiseAll(
        promises.map((promise) =>
            promise
                .then(
                    (value): { status: "fulfilled"; value: typeof value } => ({
                        status: "fulfilled",
                        value,
                    })
                )
                .catch((reason): { status: "rejected"; reason: unknown } => ({
                    status: "rejected",
                    reason,
                }))
        )
    ) as Promise<{
        [K in keyof T]: SettledResult<T[K]>
    }>;
}