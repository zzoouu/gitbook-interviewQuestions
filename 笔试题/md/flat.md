### 实现flat
```
function trans(str){
    let arr = str.split(',').map(item => +item)
    let lastItem = ''
    let i = 0
    return arr.reduce((cal, cur) => {
        if(cal.length){
            lastItem = cal.pop()
            if(lastItem + 1 === cur){
                if(cal[cal.length - 1] === '~'){
                    cal.push(cur)
                }else{
                    cal.push(lastItem, '~', cur)
                }
            }else{
                cal.push(lastItem, ',', cur)
            }
        }else{
            cal.push(cur)
        }
        return cal
    }, []).join('')
}

console.log(trans('2,3,4,3,2,4,5,6'))
console.log(trans('1,2,3,5,7,8,10'))
// 1,2,3,5,7,8,10
// 1~3,5,7~10

/**
 * str.substring(start,end) 不包括end
 * str.substr(start, number)
 */
 ```