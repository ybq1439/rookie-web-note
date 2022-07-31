/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-11 14:10:03
 * @LastEdiTime: 
 */
/* 
给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
在每一天，你可以决定是否购买和/或出售股票。
你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
返回 你能获得的 最大 利润 。
思路：与第一道相比，就是允许多次买卖了。那么我们需要记录每一次从最低点涨到最高点这中间的利润，
然后加起来就会是最大利润了。
*/
var maxProfit = function (prices) {
    if (prices.length === 0) {
        return 0
    }
    let profit = 0
    let lowest = prices[0]
    let hightest = prices[0]
    let i = 0
    // 循环条件注意是到倒数第二个元素，
    // 因为需要两个两个比较
    while (i < prices.length - 1) {
        // 一直在跌
        while (i < prices.length - 1 && prices[i] >= prices[i + 1]) {
            i++
        }
        // 这段时间最低点
        // 如果一开始就在涨的话，那一样的 i 就是 lowest 
        lowest = prices[i]
        while (i < prices.length - 1 && prices[i] <= prices[i + 1]) {
            i++
        }
        hightest = prices[i]
        profit += hightest - lowest
    }
    return profit
};