/**
 * You are given a binary tree in which each node contains an integer value.

Find the number of paths that sum to a given value.

The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).

The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000
 */
/**
 * 这道题目是要我们求解出任何一个节点出发到子孙节点的路径中和为指定值。 注意这里，不一定是从根节点出发，也不一定在叶子节点结束。
 */
// 还未懂
function helper(root,acc, target, map){
    if(root === null) return 0
    let count = 0
    acc += root.val
    if(acc === target) count++
    if(map[acc - target]) count += map[acc-target]
    if(!map[acc]){
        map[acc] = 1
    }else{
        map[acc] += 1
    }
    const res = count + 
    helper(root.left, acc, target, map) +
    helper(root.right, acc, target, map)
    map[acc] =map[acc] - 1
    return res
}
const pathSum = function(root, sum){
    const map ={}
    return helper(root, 0, sum, map)
}