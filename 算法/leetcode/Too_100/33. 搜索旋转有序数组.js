var search = function (nums, target) {
    // 二分法
    let start = 0;
    let end = nums.length - 1;

    while (start <= end) {
        // >> 1 相当于除以2向下取整
        let mid = start + Math.floor((end - start) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        // 如果中间数小于最右边数，则右半段是有序的
        // 如果中间数大于最右边数，则左半段是有序的
        if (nums[mid] < nums[end]) {
            // 判断target是否在(mid, end]之间
            if (nums[mid] < target && target <= nums[end]) {
                // 如果在，则中间数右移即start增大
                start = mid + 1;
            } else {
                // 如果不在，则中间数左移即end减小
                end = mid - 1;
            }
        } else {
            // [start, mid)
            if (nums[start] <= target && target < nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
    }
    return -1;
};