/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-10-18 21:25:37
 * @LastEdiTime: 
 */
// for in 循环遍历数组
//输出数组下标
const arr = ['a', 'b', 'c', 'd'];
for (const [item, value] in arr) {
    console.log(item, value)
}
//for in 循环遍历对象
const obj = {
    name: 'jay',
    level: 'top'
};
for (const key in obj) {
    console.log(key)
}
