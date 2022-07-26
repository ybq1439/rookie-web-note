/* 
思路：首先判断 总油量和总需要消耗油量 差值。如果大于等于0，那么一定存在一条路径。
两个关键点：
1- 如果从 1号加油站 到 3号加油站 失败了，那么可以从 3号加油站开始找路径。
因为 1号能够到 2号的话，那么这时候 的油量是 2号加油站能加的油以及 1号到 2号剩余的油，
这两加起来都不能到 3号，那肯定 从2号开始也不能够到。所以从 3号开始。
2-为什么循环只需要到 最后一个加油站，不需要到开始的那个加油站？
因为：第一：如果 i号无法完成全程，那么肯定是在 i号之后才能完成;
    第二：假设倒数第二个能够到达倒数第一个，却无法回到倒数第二个，而是需要倒数第一个才满足条件，
    那这两个假设互相矛盾，因为倒数第一个一开始的油量为 0，而从倒数第二个开始油量是大于等于 0 的。
    所以仅需要判断能够到达最后一个加油站，就可以走完一个环。
*/
// 注意 这个题目保证了只有一个解
var canCompleteCircuit = function (gas, cost) {
    let totalLength = gas.length
    let allGas = 0
    let allCost = 0
    const add = (a, b) => {
        return a + b
    }
    allGas = gas.reduce(add)
    allCost = cost.reduce(add)
    if (allCost > allGas) {
        return -1
    }
    let nowGas = 0
    let startIndex = 0
    for (let i = 0; i < totalLength; i++) {
        nowGas = gas[i] + nowGas - cost[i]
        if (nowGas < 0) {
            startIndex = i + 1
            nowGas = 0
        }

    }
    return startIndex
};
console.log('canCompleteCircuit()', canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))