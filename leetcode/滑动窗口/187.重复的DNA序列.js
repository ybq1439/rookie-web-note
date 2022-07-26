/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-24 22:40:50
 * @LastEdiTime: 
 */
var findRepeatedDnaSequences = function (s) {
    let map = new Map()
    const result = []
    let i = 0
    while (i + 10 <= s.length) {
        const dna = s.substring(i, i + 10)
        if (map.get(dna) === 1) {
            map.set(dna, 2)
            result.push(dna)
        } else if (!map.has(dna)) {
            map.set(dna, 1)
        }
        i++
    }
    return result
};