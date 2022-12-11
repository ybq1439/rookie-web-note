/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-12-11 21:47:19
 * @LastEdiTime: 
 */
// 1-`map` 可以使用`map[key]`访问吗？
const map = new Map();
map[1] = 'ybq';//这里可以理解就是对象用法一样，key 是 string类型
map.set(1, 'ljj');
map.set(2, 'zjl');//这里key是number类型
console.log(map[1])//和对象用法一样，获取的是字符'1'对应的value
console.log(map.get(1))//结果是undefined，因为这里是获取 number 1
console.log(map.get(2))
console.log(map.has('1'))//false
console.log(map.has(1))//true
console.log(map)