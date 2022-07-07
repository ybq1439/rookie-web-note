/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-04 23:36:43
 * @LastEdiTime: 
 */
// 使用 object 上的方法遍历数组会发生什么
const array = ['晴天', '花海', '半岛铁盒', '倒带']
const result = Object.entries(array)
const key = Object.keys(array)
const values = Object.values(array)
console.log(result)
console.log('key', key)
console.log('value', values)

const obj = {
    name: '周杰伦',
    level: 'top'
}
const keyValue = Object.entries(obj)
console.log(keyValue)