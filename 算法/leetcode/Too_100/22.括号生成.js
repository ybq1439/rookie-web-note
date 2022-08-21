// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]
// 要点：1-优先添加左括号；
//      2-当右括号数量大于左括号时才可以添加右括号；
//      3-就是不停的选括号；
var generateParenthesis = function (n) {
    const result = [];
    const back = (leftNum, rightNum, str) => {
        if (str.length === 2 * n) {
            result.push(str)
            return
        }
        if (leftNum > 0) {
            back(leftNum - 1, rightNum, str + '(')
        }
        if (rightNum > leftNum) {
            back(leftNum, rightNum - 1, str + ')')
        }
    };
    back(n, n, '')
    return result
};