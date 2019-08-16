/**
 * 给定一个整数（带符号的32位），写一个函数来检查它是否为4的幂
 */
/**
 * Input: 16
 * Output: true
 * 
 * Input: 5
 * Output: false
 */
// 普通
/* while(num && num%4 !== 0){
    num /= 4
}
return num === 1 */

/**
 * 2: 10; 4:100; 8: 1000
 * 4: 100; 16: 10000; 64: 1000000
 * 4的幂次方1在奇数位上，其他为0；
 * 依题意，若为4的幂次方：1、首先为2的幂次方，2、这个1在奇数位
 * 
 * n & (n-1) === 0 => 2的幂次方
 * 若a为2的幂次方，将a与一个特殊数值数相与，该数值奇数位置全为1，偶数位置全为0，若a为4的幂次方，相与结果为本身，若特殊值偶数位置为1，则结果为0
 */
var isPowerOfFour = function(num) {
    if(num === 1) return true
    if(num < 4) return false
    if((num & (num -1)) !== 0) return false
    return (num & 0x55555555) === num
}
isPowerOfFour(32)
console.log('isPowerOfFour: ', isPowerOfFour(64));
