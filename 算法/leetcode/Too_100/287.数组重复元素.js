/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-10-16 22:20:11
 * @LastEdiTime: 
 */
// 1-纪录法
var findDuplicate = function (nums) {
    const map = {};
    for (const item of nums) {
        if (!map[item]) {
            map[item] = true;
        } else {
            return item
        }
    }
};
// 2-数组抽象成链表
var findDuplicate_ = function (nums) {
    let fast = 0;
    let slow = 0;
    while (true) {
        slow = nums[slow];
        fast = nums[nums[fast]];
        if (slow === fast) {
            // 确定有环，还需要确定环入口
            fast = 0;
            while (true) {
                if (fast === slow) {
                    return slow;
                }
                // 两个指针速度都变为1
                slow = nums[slow];
                fast = nums[fast];
            }
        }
    }
};