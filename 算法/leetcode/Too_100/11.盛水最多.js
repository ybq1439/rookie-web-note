var maxArea = function (height) {
    const totalLength = height.length;
    let max = 0;
    let left = 0;
    let right = totalLength - 1;
    while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        max = Math.max(max, area);
        // 这里移动的依据是：需要找面积最大，那么就要尝试去增大 Math.min 中的最小值
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return max
};