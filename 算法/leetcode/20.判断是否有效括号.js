var isValid = function (s) {
    if (s.length < 2) {
        return false
    }
    const arr = []
    const map = new Map()
    map.set('{', '}')
    map.set('(', ')')
    map.set('[', ']')
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            // 为左括号 那就在栈中插入一个 对应右括号
            arr.push(map.get(s[i]))
        } else {
            // 为右括号 就直接 pop
            let temp = arr.pop()
            if (temp !== s[i]) {
                return false
            }
        }
    }
    if (arr.length !== 0) {
        return false
    }
    return true
};