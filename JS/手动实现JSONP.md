### JSONP
#### 原理
- 利用script标签的src属性来跨域
- 将前端方法作为参数传递给服务器，然后服务器注入参数返回，实现通信
- 由于利用的是script标签的src属性，因此只支持get方法

#### 回调函数
- 前端在请求时在查询参数中传递一个callback参数，记录回调函数的参数名
- 后端只需要使用这个函数名并调用这个函数
- 将请求方请求的数据作为参数传递给回调函数
- 前端能在回调函数中拿到想要的数据
前端：
```
const cbFunc = (result) => {
    balanceText.textContent = `你还有${result}块钱`
}
const jsonpScript = document.createElement('script')
jsonpScript.src = 'http://demo.com/test?callback=cbFunc'
document.body.appendChild(jsonpScript)
```
后端：
```
if (pathNoQuery === '/test') {
    const rs = getResultFromDb()
    response.setHeader('Content-Type', 'application/javascript')
    response.write(`${queryObject.callback}(${rs.balance})`)
} else {
    response.statusCode = 404
}
response.end()
```
#### 实现
- 将传入的data数据转化为url字符串形式
- 处理url中的回调函数
- 创建一个script标签插入页面
- 挂载回调函数
```
function myjsonp(url, data, callback)
// 1. 将data转换成url字符串形式
// {name: 'xx', age: 21} -> name=xx&age=21
let dataStr = url.indexof('?') === -1 ? '?' : '&'
for(let key in data){
    dataSte += `${key}=${data[key]&}`
}
// 2. 处理回调函数
const callName = 'jsonp' + Math.random().toSteing().replace('.' ,'')
dataStr += 'callback' + '=' + callName

// 3. 创建script标签
const scriptEl = document.createElement('script')
scriptEl.src = url + dataStr

// 挂载回调函数
window[callName] = function(data){
    callback(data)
    documents.body.removeChild(scriptEl)
}
document.body.appendChild(scriptEl)
```
#### Promise
```
function makeid(){
    return Math.randome().toString().replace('.', '')
}
function jsonp(url, data, callback){
    return new Promise((resolve, reject) => {
        try{
            if(!url){
                reject({
                    err: new Error('url不能为空),
                    result: null
                })
            }
            if(!document || !global){
                reject({
                    err: new Error('环境有问题'),
                    result: null
                })
            }
            let dataStr = url.indexof('?')===-1 ? '?' : '&'
            for(let key in data){
                dataStr += `${key}=${data[key]}&`
            }
            const callName = 'jsonp' + makeid()
            dataStr += `callback=${callName}`
            const sciptEl = document.createElement('script')
            scriptEl.src = url + dataStr
            window[callName] = function(data){
                resolve({err: null, result: data})
                callBack(data)
                document.body.removeChild(scriptEl)
                delete window[callName]
            }
            document.body.appendChild(sciriptEl)
        }catch(error){
            reject({
                err: error,
                result: null
            })
        }
    })
}
```
*请求是script发送的，所以浏览器收到响应会立即执行请求到的结果*

总结
- 动态创建script标签发起请求，在src中写入目标路径，并传入查询参数callback也就是回调函数的函数名
- 服务端接收到请求，会根据查询参数callback返回执行回调函数的语句，并在参数传入请求方想要的数据
- 请求方接收到响应后会执行这个语句也就是执行回调函数，这样请求方就能在回调函数中获取想要的数据