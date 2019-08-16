
### contentType
> 在Http协议消息头中，使用Content-Type来表示具体请求中的媒体类型信息。  

- application/json: 消息主体是序列化后的json字符串
- application/x-www-form-urlencoded:数据被编码为键值对，这是标准的编码格式
- multipart/form-data: 需要在表单中进行文件上传时，需要使用该格式，常见的媒体格式是上传文件之时使用的
- text/plain：数据以纯文本形式（text/json/xml/html)进行编码，其中不包含任何控件或格式字符

#### application/json 和application/x-www-form-urlencoded区别
application/json: 
- 告诉服务器请求的主题内容是json格式的字符串，服务器端会对json字符串进行解析
- 前端人员不需要关心数据结构的复杂度，只要是标准的json格式就能提交成功

application/x-www-form-urlencoded 
- 在请求发送过程中会对数据进行序列化处理，以键值对形式？key1=value1&key2=value2的方式发送到服务器，
- 所有浏览器都支持


#### application/x-www-form-urlencoded：信息数据被编码为名称/值对，这是标准且默认的编码格式
- 当action为get时候，客户端把form数据转换成一个字串append到url后面，用'?'分割。
- 当action为post时候，浏览器把form数据封装到http body中，然后发送到server。（可以取消post请求的预检请求）



https://blog.csdn.net/danielzhou888/article/details/72861097  
常见的媒体格式类型如下：

    text/html ： HTML格式
    text/plain ：纯文本格式      
    text/xml ：  XML格式
    image/gif ：gif图片格式    
    image/jpeg ：jpg图片格式 
    image/png：png图片格式
   以application开头的媒体格式类型：

   application/xhtml+xml ：XHTML格式
   application/xml     ： XML数据格式
   application/atom+xml  ：Atom XML聚合格式    
   application/json    ： JSON数据格式
   application/pdf       ：pdf格式  
   application/msword  ： Word文档格式
   application/octet-stream ： 二进制流数据（如常见的文件下载）
   application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
   另外一种常见的媒体格式是上传文件之时使用的：

    multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
    
    #### http状态码
    http://tools.dedecms.com/comparisons/http.html
