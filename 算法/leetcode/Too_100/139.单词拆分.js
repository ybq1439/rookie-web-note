var wordBreak = function (s, wordDict) {
    const totalLength = s.length;
    const set = new Set(wordDict);
    const memo = new Array(totalLength + 1).fill(false);
    memo[0] = true;
    for (let i = 1; i <= totalLength; i++) {
        for (let j = 0; j < i; j++) {
            if (memo[j] && set.has(s.slice(j, i))) {
                memo[i] = true;
                break;
            }
        }
    }
    return memo[totalLength]
};