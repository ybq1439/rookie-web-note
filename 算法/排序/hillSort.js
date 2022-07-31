// 希尔排序
// 可以说是 插入排序 的更高效的改进版本。非稳定排序。
// 希尔排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n^s) ，空间复杂度为 O(1) ，不是稳定排序。
// 按照 gap 对数组进行分组，对每一组都进行 插入排序，直到 gap === 1 那就是已经只有一组了。
const hillSort = (arr) => {
    if (!Array.isArray(arr)) {
        throw new Error('type error')
    }
    if (arr.length === 1) {
        return arr
    }
    const totalLength = arr.length
    for (let gap = Math.floor(totalLength / 2); gap >= 1; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < totalLength; i++) {
            let temp = arr[i]
            let j = i
            while (j - gap >= 0 && arr[j - gap] > temp) {
                arr[j] = arr[j - gap]
                j -= gap
            }
            arr[j] = temp
        }
    }
    return arr
}

const testArr = [5, 4, 3, 2, 1]
const result = hillSort(testArr)
console.log(result)