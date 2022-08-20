// 数组中允许存在重复元素
const findMinArray = (numbers) => {
    const totalLength = numbers.length;
    if (totalLength < 2) {
        return numbers
    }
    let left = 0;
    let right = totalLength - 1;
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (numbers[mid] < numbers[right]) {
            right = mid;
        } else if (numbers[mid] > numbers[right]) {
            left = mid + 1;
        } else {
            right--;
        }
    }
    return numbers[left]
}