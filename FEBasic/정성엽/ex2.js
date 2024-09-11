// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
    //step이 0이거나 start와 end가 같다면 start 반환
    if (step === 0 || start === end) {
        return [start];
    }
    //무한 루프 방지, 빈 배열 반환
    if ((start > end && step > 0) || (start < end && step < 0)) {
        return [];
    }

    let tmp = start;
    // end가 없고 start가 양수라면 start = 1 end = tmp, end가 없고 start가 음수라면 end = -1, end가 없고 start가 0이라면 end = 0;
    end = end ?? (start > 0 ? ((start = 1), tmp) : Math.sign(start));

    /**결과 반환을 위한 results 배열 */
    const results = [];

    //step이 양수인지 음수

    for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
        results.push(+i.toFixed(1));
        i = +i.toFixed(1);
    }
    return results;
};

module.exports = { range };
