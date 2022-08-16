// 使用二分法 查找
function GetNumberOfK(data, k) {
    // write code here
    let mid = Math.floor(data.length / 2)
    let result = 0

    if (data[mid] == k || data.length < 2) {
        let left = mid - 1
        while (left >= 0 && data[left] == k) {
            left--
            result++
        }
        let right = mid
        while (right < data.length && data[right] == k) {
            right++
            result++
        }
    } else if (data[mid] > k) {
        // 注意一定要 return 
        return GetNumberOfK(data.slice(0, mid), k)
    } else if (data[mid] < k) {
        return GetNumberOfK(data.slice(mid + 1), k)
    }
    return result
}
const getNumberOfK = (data, k) => {
    let mid = Math.floor(data.length / 2);
    let result = 0;

    if (data.length < 2 || data[mid] === k) {
        let left = mid - 1;
        while (left >= 0 && data[left] === k) {
            result++
            left--
        }
        let right = mid;
        while (right < data.length && data[right] === k) {
            right++
            result++
        }
    } else if (data[mid] < k) {
        return getNumberOfK(data.slice(mid + 1), k)
    } else if (data[mid] > k) {
        return getNumberOfK(data.slice(0, mid), k)
    }
    return result
}