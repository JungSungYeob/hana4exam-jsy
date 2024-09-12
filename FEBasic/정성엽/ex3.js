Array.prototype.sortBy = function (sortProp = "") {
    //sortProp가 빈 값이라면 그대로 반환
    if (!sortProp) {
        return this;
    }
    //"," 기준으로 rule을 만들고 ":"기준으로 direction이 오름차순인지 내림차순인지 구별
    const rules = sortProp.split(",").map((rule) => {
        const [key, direction = "asc"] = rule?.split(":");

        const dir = direction.toLowerCase() === "desc" ? -1 : 1;

        return { key, dir };
    });
    //TODO: ,로 끝나는 오류 처리

    return this.sort((a, b) => {
        for (let { key, dir } of rules) {
            if (a[key] > b[key]) return dir;
            if (a[key] < b[key]) return -dir;
        }
        return 0;
    });
};
