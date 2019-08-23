### HTTP报文
HTTP的报文有两种类型:请求报文和响应报文  
报文首部 + 空行 + 报文主体
#### 请求报文
请求方法 URL HTTP/版本号 ——请求行  
请求首部字段 ——首部行  
空行  
body(只对POST请求有效) ——实体主体  
```
GET http://m.baidu.com/ HTTP/1.1
Host m.baidu.com
Connection Keep-Alive
...// 其他header

key=iOS
```
#### 响应报文
HTTP/版本号 状态码 状态码描述 ——状态行  
应答首部字段 ——首部行  
空行  
body  ——实体主体
```
HTTP/1.1 200 OK
Content-Type text/html;charset=UTF-8
...// 其他header

<html>...
```

#### 首部字段
- 通用首部字段:请求报文和响应报文都使用
- 请求首部字段 请求报文
- 响应首部字段 响应报文
- 实体首部字段 请求报文和响应报文实体部分
https://juejin.im/post/5c17d3cd5188250d9e604628
##### 通用首部字段
Cache-Control 缓存  
Connection 连接
Date 创建报文的日期的时间  
Pragma: no-cache 报文指令  
Trailer 报文末端的首部一览  
Transfer-Encoding  指定报文主体的传输编码方式  
Upgrade 升级为其他协议  
Via 代理服务器相关信息  
Warning 错误通知  


- Progma:历史遗留字段，不返回缓存的资源，通常Progma和Cache-Control都会发送
##### 请求首部字段
- Accept: text/html, application/xhtml+xml, application/xml; q=0.5

##### 响应首部字段

##### 实体首部字段


