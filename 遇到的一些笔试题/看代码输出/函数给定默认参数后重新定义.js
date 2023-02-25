// 直接报错了 a,b已经被定义了
function test(a = 1, b = 2) {
    let a = 10;
    const b = 20;
    console.log(a, b)
}
test();