### 和为sum的n个数
给定无序、不重复的数组data，取出 n 个数，使其相加和为sum  
```
function getAllCombin(arr, n, sum, tmp){
    if(tmp.length === n){
        if(tmp.reduce((prev,cur) => prev + cur) === sum){
            return tmp
        }
        return
    }
    for(let i = 0; i < arr.length; i++){
        const current = arr.shift()
        tmp.push(current)
        const retulst = getAllCombin(arr, n, sum, tmp)
        if(result){
            return result
        }
        tmp.pop()
        arr.push(current)
    }
}
```