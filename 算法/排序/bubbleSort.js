/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-27 09:29:02
 * @LastEdiTime: 
 */
// 返回升序数组
// 冒泡排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，是稳定排序。
// 元素两两之间进行比较，如果后一个小于前一个，就交换，那么一次循环下来，最大元素就到了末尾

// 优化方式：
// 1 一种是外层循环的优化，我们可以记录当前循环中是否发生了交换，如果没有发生交换，则说明该序列已经为有序序列了。 
// 因此我们不需要再执行之后的外层循环，此时可以直接结束。
// 2 一种是内层循环的优化，我们可以记录当前循环中最后一次元素交换的位置，该位置以后的序列都是已排好的序列，因此下 一轮循环中无需再去比较。
const BubbleSort = (arr) => {
    if (!Array.isArray(arr) || arr.length <= 1) {
        return
    }
    const totalLength = arr.length
    for (let i = 0; i < totalLength - 1; i++) {
        let flag = true //外循环优化，添加这一次是否交换标志
        for (let j = 0; j < totalLength - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                flag = false
            }
        }
        if (flag) {
            break
        }
    }
    return arr
}

const bubbleSort_ = (arr) => {
    let result = [...arr];
    const totalLength = result.length;
    if (totalLength <= 1) {
        return result
    }
    for (let i = 0; i < totalLength - 1; i++) {
        let ifSwap = false;
        for (let j = 0; j < totalLength - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                ifSwap = true;
            }
        }
        if (!ifSwap) {
            break
        }
    }
    return result
};

const testArray = [5, 9, 2, 4, 6, 2]
const result = BubbleSort(testArray)
console.log(result)

const testArray_ = [9, 8, 76, 5, 4, 3]
const result_ = bubbleSort_(testArray_)
console.log(result_)
