/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-10 14:29:00
 * @LastEdiTime: 
 */

/* 
给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。
设计一个算法来计算你所能获取的最大利润。
返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
*/
// 两个变量 min 用于记录遍历数组时，当前左边最小的值
var maxProfit = function (prices) {
    let max = 0
    let min = prices[0]
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < min) {
            // 这里可以直接赋值原因是：无法在后面时间买入，而前面时间卖出
            min = prices[i]
        } else {
            max = Math.max(max, prices[i] - min)
        }
    }
    return max
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]))