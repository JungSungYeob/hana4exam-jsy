export const randTime = <T>(val: T): Promise<T> =>
    new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

export function promiseAllSettled<T>(
    promises: Promise<T>[]
): Promise<{ status: "fulfilled" | "rejected"; value?: T; reason?: string }[]> {
    return new Promise((resolve) => {
        const results: {
            status: "fulfilled" | "rejected";
            value?: T;
            reason?: string;
        }[] = [];
        let promiseCnt = promises.length;

        promises.forEach((promise, index) => {
            promise
                .then((value) => {
                    results[index] = { status: "fulfilled", value };
                })
                .catch((reason) => {
                    results[index] = { status: "rejected", reason };
                })
                .finally(() => {
                    if ((promiseCnt-=1) === 0) {
                        resolve(results);
                    }
                });
        });
    });
}
