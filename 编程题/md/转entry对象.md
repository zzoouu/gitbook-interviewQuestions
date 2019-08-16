### 把 entry 转换成如下对象
```
var entry = {
a: {
 b: {
   c: {
     dd: 'abcdd'
   }
 },
 d: {
   xx: 'adxx'
 },
 e: 'ae'
}
}

// 要求转换成如下对象
var output = {
'a.b.c.dd': 'abcdd',
'a.d.xx': 'adxx',
'a.e': 'ae'
}
```
```
function transform(obj, parentKey="", ret = {}){
    for (let key in obj){
        let keyName = `${parentKey}${key}`
        if(typeof obj[key]!== 'null' && typeof obj[key] === 'object'){
            transform(obj[key], keyName+'.', ret)
        }else{
            ret[keyName] = obj[key]
        }
    }
    return ret
}
```
