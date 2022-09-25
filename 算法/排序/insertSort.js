/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-08-01 22:35:58
 * @LastEdiTime: 
 */
//插入排序是一种最简单直观的排序算法，它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
// 插入排序核心--扑克牌思想： 就想着自己在打扑克牌，接起来一张，放哪里无所谓，再接起来一张，比第一张小，放左边， 继续接，可能是中间数，就插在中间....依次
// 插入排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，是稳定排序。
const insertSort = (arr) => {
    const totalLength = arr.length
    if (!Array.isArray(arr) || arr.length <= 1) {
        return
    }
    // 从 1 开始，0 默认排好序了
    for (let i = 1; i < totalLength; i++) {
        // 保存当前位置元素
        let temp = arr[i]
        let j = i
        while (j - 1 >= 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1]
            j--
        }
        // 找到位置插入元素
        arr[j] = temp
    }
    return arr
}
const insertSort_ = (arr) => {
    const totalLength = arr.length;
    for (let i = 1; i < totalLength; i++) {
        const temp = arr[i];
        let j = i;
        while (j - 1 >= 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
    return arr
};
// const testArray = [5, 9, 2, 4, 6, 2]
// const result = insertSort(testArray)
// console.log(result)
const restArray_ = [9, 5, 2, 1]
const result_ = insertSort_(restArray_)
console.log(result_)