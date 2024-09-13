/** 정규식 범위 가져오기 */
const getRange = (char) => {
    const jaeumMap = {
        ㄱ: 0,
        ㄲ: 1,
        ㄴ: 2,
        ㄷ: 3,
        ㄸ: 4,
        ㄹ: 5,
        ㅁ: 6,
        ㅂ: 7,
        ㅃ: 8,
        ㅅ: 9,
        ㅆ: 10,
        ㅇ: 11,
        ㅈ: 12,
        ㅉ: 13,
        ㅊ: 14,
        ㅋ: 15,
        ㅌ: 16,
        ㅍ: 17,
        ㅎ: 18,
    };

    if (jaeumMap.hasOwnProperty(char)) {
        const index = jaeumMap[char];
        const start = "가".charCodeAt() + index * 588;
        const end = start + 587;
        return `${char}${String.fromCharCode(start)}-${String.fromCharCode(
            end
        )}`;
    } else {
        return char;
    }
}; 

/** regex 생성 함수 */
const createRegex = (firstSounds) => {
    let regex = "";
    for (let fisrtSound of firstSounds) {
        const range = getRange(fisrtSound);
        regex += `[${range}]`;
    }
    return new RegExp(regex, "");
};


module.exports = {
    searchByKoreanInitialSound: (data, firstSounds) => {
        const regex = createRegex(firstSounds);
        return data.filter((word) => regex.test(word));
    },
};
