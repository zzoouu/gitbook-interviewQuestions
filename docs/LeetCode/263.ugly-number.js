/**
 * 丑数质因子只包括2，3，5
 */
// 普通递归
/* while(num % 2 === 0) num /= 2
while(num % 3 === 0) num /= 3
while(num % 5 === 0) num /= 5
return num === 1 */
var isUgly = function(num) {
    const list = [2, 3, 5]
    if (num <= 0) return false
    if (num === 1) return true
    if (list.includes(num)) return true
    for (let i of list) {
        if (num % i === 0) return isUgly(Math.floor(num / i));
    }
    return false
}