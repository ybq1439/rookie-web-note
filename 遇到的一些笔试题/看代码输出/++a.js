var a = 0;
switch (++a) {
    case (0): ++a;
    case (1): ++a;
    case (2): ++a;
}
console.log(a)
//因为没有使用Break，所有会执行到 case(1)、case(2)