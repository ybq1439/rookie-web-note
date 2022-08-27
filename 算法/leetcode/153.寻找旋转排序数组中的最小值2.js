// 数组中允许存在重复元素
// 注意：只需要比较 mid 和 右边的值就可以，移动指针；

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
            // 这里需要注意是 right = mid 而不是 mid -1 因为 mid 也可能是最小值
            right = mid;
        } else if (numbers[mid] > numbers[right]) {
            left = mid + 1;
        } else {
            right--;
        }
    }
    return numbers[left]
}