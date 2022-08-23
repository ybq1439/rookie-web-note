// 如何找到下一个更大的：搜索两遍
// 什么情况是最大的：做高位到低位时递减的，那么这个数就是最大了，例如:[3,2,1] ===>下一个序列 直接翻转 [1,2,3] 
// 1-从右边（低位）向左边开始寻找，找到第一个 他的右边比他大的数；
// 2-从右边向左边开始寻找，找到第一个 比上一步寻找的数更小的数；
// 3-交换上两部找到的数，
var nextPermutation = function (nums) {
    const totalLength = nums.length;
    let index = totalLength - 2;
    // 找到第一个右边比左边大的位置
    while (index >= 0 && nums[index + 1] <= nums[index]) {
        index--;
    }
    // index > 0 表示找到了
    if (index > -1) {
        // 现在找到第一个比 nums[index] 大的数，因为要尽量变幅小的 增大
        let j = totalLength - 1;
        while (nums[j] <= nums[index] && j >= 0) {
            j--;
        }
        // 进行交换
        [nums[index], nums[j]] = [nums[j], nums[index]];
    }
    // index == -1 那么现在高位到低位已经是递减的了，直接翻转就可以
    let left = index + 1;
    let right = totalLength - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
    return nums
};