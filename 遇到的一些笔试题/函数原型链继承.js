/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2023-02-27 21:37:31
 * @LastEdiTime: 
 */
Object.prototype.foo = 1;
Function.bar = 2;
function Person(name) {
    this.name = name;
}
Person.prototype.sayName = function () {
    console.log(this.name);
}
const fn1 = new Person();
console.log(fn1.foo);