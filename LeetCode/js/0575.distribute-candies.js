/*
给定一个偶数长度的数组，其中不同的数字代表着不同种类的糖果，每一个数字代表一个糖果。你需要把这些糖果平均分给一个弟弟和一个妹妹。返回妹妹可以获得的最大糖果的种类数。
输入: candies = [1,1,2,3]
输出: 2
解析: 妹妹获得糖果[2,3],弟弟获得糖果[1,1]，妹妹有两种不同的糖果，弟弟只有一种。这样使得妹妹可以获得的糖果种类数最多。
*/
/*
数据长度为n ,
若糖果种类>n/2,则妹妹可以分到n/2个糖果（种类）
若糖果种类<n/2,则妹妹可以分到糖果种类为糖果种类的数量
*/
var distributeCandies = function(candies) {
    const size = new Set(candies).size
    // candies.length >> 1
    const length = candies.length / 2
    return Math.min(size, length)
};
distributeCandies([1,1,2,2,3,3])
