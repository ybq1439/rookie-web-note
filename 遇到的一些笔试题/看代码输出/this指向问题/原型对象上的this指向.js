function fruit() {
    this.color = 'red';
    this.say = function () {
        console.log(this)
        console.log(this.color)
    }
}
const apple = function () { };
apple.prototype = new fruit();
const apple1 = new apple();
apple1.color = 'green';
apple1.name = 'apple1';
apple1.say();// green .this 就是实例本身，如果说apple1上没有设置 color 结果就是red
