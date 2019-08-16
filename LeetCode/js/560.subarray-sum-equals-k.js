/**
 * Given an array of integers and an integer k, you need to find the total number of continuous subarrays whose sum equals to k.
 * 查找所有和为k的子数组
 */
var subArrSum = function(nums, k) {
    let count =0
    let acc = 0
    let map = {}
    nums.map(item => {
        acc += item
        if(acc === k) count++
        if(map[acc-k]){
            count += map[acc-k]
        }
        if(!map[acc]){
            map[acc] = 1
        }else {
            map[acc] += 1
        }
    })
    return count
}