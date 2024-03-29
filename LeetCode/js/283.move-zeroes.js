/**
 * 将数组的所有0移到数组尾部，同时注意非0元素的相对顺序不变
 * Input: [0,1,0,3,12]
 * Output: [1,3,12,0,0]
*/
// 不能拷贝数组，只能在愿数组上操作，指定一个游标
var moveZeroes = function(nums) {
    let index = 0
    nums.forEach((item, i) => {
        if(item !== 0){
            nums[index++] = item
        }
    })
    const len = nums.length
    for(var i = index;i < len;i++){
        nums[i] = 0
    }
    return nums
}