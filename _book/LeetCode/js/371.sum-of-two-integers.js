/**
 * Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -.
 */
/**
 * 异或 与
 * 1、异或得到的值看作进位(相同为0)
 * 2、与（都为1为1，否则为0）得到值左移一位 为
 */
var getSum = function(a, b) {
    if(a === 0) return b
    if(b === 0) return a
    return getSum(a ^ b, (a & b) << 1)
};
/**
 * a = 81(0b1010001),b=53(0b0110101)
 * a ^ b = 1100100(100); (a & b) << 1 = 0100010(34)
 * a + b = 134
 */