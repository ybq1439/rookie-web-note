/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-27 09:41:26
 * @LastEdiTime: 
 */
// 选择排序的基本思想为每一趟从待排序的数据元素中选择最小（或最大）的一个元素作为首元素，直到所有元素排完为止。
// 选择排序不管初始序列是否有序，时间复杂度都为 O(n²)。不稳定排序
const selectionSort = (arr) => {
    const totalLength = arr.length
    for (let i = 0; i < totalLength - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < totalLength; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr
}
const testArray = [5, 9, 2, 4, 6, 2]
const result = selection(testArray)
console.log(result)