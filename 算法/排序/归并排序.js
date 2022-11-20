/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-11-20 22:07:45
 * @LastEdiTime: 
 */
function mergeSort(array) {
    const totalLength = array.length;
    if (totalLength === 1) {
        return array;
    }
    function merge(leftArr, rightArr) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
            if (leftArr[leftIndex] < rightArr[rightIndex]) {
                result.push(leftArr[leftIndex]);
                leftIndex++;
            } else {
                result.push(rightArr[rightIndex]);
                rightIndex++;
            }
        }
        if (leftIndex !== leftArr.length) {
            result.push(...leftArr.slice(leftIndex))
        }
        if (rightIndex !== rightArr.length) {
            result.push(...rightArr.slice(rightIndex))
        }
        return result;
    }
    const mid = totalLength / 2;
    let left = array.slice(0, mid);
    let right = array.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}
const testArr = [9, 7, 5, 8, 2];
console.log(mergeSort(testArr))
