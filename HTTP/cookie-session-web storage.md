### session与Cookie
#### 区别
 1. session存储在客户端、cookie存储在服务器上
 2. session存储的是对象，cookie存储的是字符串
 3. session保存在服务器，客户端不知道其中信息，cookie保存在客户端，服务器能了解其中信息
 4. session更安全，cookie在客户端，别人可以分析本地存放的cookie
 5. session会在一定时间内保存在服务器上，若访问增多，会占用服务器的性能，考虑到服务器性能，可以使用cookie
 6. session不能区分路径，cookie可以设置路径，一个网站下的不同路径下的cookie就不能访问到，而session在任何一个地方都可以访问到
 
#### 联系
> session保存在服务端，追踪用户状态，可以保存在集群、数据库、文件中  

> cookie保存在客户端，记录用户的一些信息，也是实现session的一种方式
1. 由于http是无状态的协议，所以需要服务端需要记录用户的状态时，需要识别具体的用户，就是session，session保存在服务端，有唯一的标识，比如购物车：需要知道是哪个用户，才知道买了什么东西
2. 服务端如何识别特定的用户。每次http请求时，客户端都会发送相应的cookie到服务端，用cookie来实现session追踪。第一次创建session时，服务端会将cookie传给客户端，里面包含了Session ID,以后每次请求id都会伴随着cookie传到服务端，服务端就知道是谁了
3. 若浏览器禁用cookie了，会用一种URL重写的技术来进行会话跟踪，URL中传递sessionID，服务端根据URL中的参数来识别用户
4. cookie常用的就是自动填充用户名和密码

*session的运行依赖于sessionID，而sessionID存在于cookie中，但并不一定必须依赖cookie实现*

### localStorage和sessionStorage和cookie
#### 区别与联系
> 都是同源的，在浏览器端
- cookie每次请求时都会被传到后端，会在浏览器和服务端两边来回传递;localStorage和sessionStorage则不会主动传到服务器，保存在本地
- cookie传递的数据大小不能超过4k，因为被携带在http中，所以cookie不宜过大，localStorage和sessionStorage也有大小限制，但比cookie大，可以达到5M或者更大
- sessionStorage作用于会话期间，即在窗口关闭之前有效；localStorage可以一直存在，即使窗口关闭，本地存储；cookie在设置的时间之内有效
- sessionStorage在不同的浏览器窗口中不能共享，localStorage和cookie在同源窗口中都是共享的

> web storage有setItem,getItem,removeItem,clear等方法，而cookie需要自己封装方法
```
sessionStorage.setItem(keyName,value);   // 将value存储到key字段中
//或者
sessionStorage.keyName='value';
eg：sessionStorage.setItem("name","thomas");

localStorage.getItem(keyName);          //获取指定key的本地存储的值
//或者
var keyName=localStorage.key;
eg:sessionStorage.getItem("name");

sessionStorage.getItem(keyName);          //获取指定key的本地存储的值
//或者
var keyName=sessionStorage.key;
eg: sessionStorage.getItem("name")

sessionStorage.removeItem(keyName);     // 删除指定ke的本地存储的值
eg: sesisonStorage.removeItem("name")

sessionStorage.clear()
localStorage.length // 键值对的数量
localStorage.key(index) // 获取指定索引的键名称
```

### cookie
#### cookie大小和数量的限制
每个浏览器对cookie的大小和数量的限制不一样，
单个域名设置的cookie不应该超过30个，且每个cookie不应该超过4k，超过以后，cookie会被忽略，不会被设置
#### 共享cookie
只要浏览器同源，域名端口相同，就可以共享cookie
#### cookie的属性
1. Expires :具体到期时间，UTC格式，默认为null，若不设置，则浏览器关闭该Cookie就会被删除
2. Max-Age属性指定从现在开始 Cookie 存在的秒数，比如60 * 60 * 24 * 365（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie
3. 如果同时指定了Expires和Max-Age，那么Max-Age的值将优先生效
4. Path指定浏览器发出http请求之后，哪些路径要带上这个Cookie
5. Secure属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。另一方面，如果当前协议是HTTP，浏览器会自动忽略服务器发来的Secure属性。该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开
6. HttpOnly属性指定该 Cookie 无法通过 JavaScript 脚本拿到，
主要是Document.cookie属性、XMLHttpRequest对象和 Request API 都拿不到该属性。这样就防止了该 Cookie被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 Cookie。
```
读写当前网页的cookie
document.cookie = 'myname=laihuamin;path=/;domain=.baidu.com';
```