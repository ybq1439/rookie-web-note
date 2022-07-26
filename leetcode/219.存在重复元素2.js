/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-26 21:58:18
 * @LastEdiTime: 
 */
var containsNearbyDuplicate = function (nums, k) {
    const totalLength = nums.length
    for (let i = 0; i < totalLength; i++) {
        let j = i + 1
        while (j < i + k && j < totalLength) {
            if (nums[i] === nums[j] && j - i <= k) {
                return true
            }
            j++
        }
    }
    return false
};

const containsNearbyDuplicate_ = (nums, k) => {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            let dis = i - map.get(nums[i])
            if (dis <= k) {
                return true
            }
            map.set(nums[i], i)
        } else {
            map.set(nums[i], i)
        }
    }
    return false
}