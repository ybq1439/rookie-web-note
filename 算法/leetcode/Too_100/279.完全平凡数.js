/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-10-13 23:52:33
 * @LastEdiTime: 
 */
const numSquares = (n) => {
    const arr = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        arr[i] = i;
        for (let j = 1; i - j * j >= 0; j++) {
            // 这里其实就是在找一个完全平方数加上另一个完全平方数是不是最小。
            // 同时加1是因为里面的 j * j 已经 j就是一个完全平方数了
            arr[i] = Math.min(arr[i], arr[i - j * j] + 1)
        }
    }

    return arr[n]
};