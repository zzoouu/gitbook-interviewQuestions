/**
 * 计算两个数组的交集
 */
// Set
/* var intersection = function(nums1, nums2){
    let a = new Set(nums1)
    let b = new Set(nums2)
    // 交集 new Set([...a,...b])
    let intersect = [...a].filter(item => b.has(item))
    return intersect
} */
// map
var intersection = function(nums1, nums2){
    let map = {}
    let res = []
    nums1.map(num => {
        map[num] = num
    })
    res = [...new Set(nums2.filter(num => {
        return map[num] === 0 || !!map[num]
    }))
    ]
    return res
}
intersection([1,2,3,4,3,5],[3,4,6,7,2,4])
// console.log('intersection([1,2,3,4,3,5],[3,4,6,7,2,4]): ', intersection([4,9,5],[9,4,9,8,4]));