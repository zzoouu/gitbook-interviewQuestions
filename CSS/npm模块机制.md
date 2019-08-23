### npm模块安装机制
1. 发出npm install命令
2. 查询node_module中是否存在指定的模块
 - 若存在指定模块，不再重新安装
 - 否则，若不存在，npm向registry查询指定模块压缩包的网址——下载压缩包，存放到根目录下的.npm目录下——解压压缩包到当前项目的node_modules中

默认会找到当前路径下的package.json。然后安装其中的依赖
 http://www.ruanyifeng.com/blog/2016/01/npm-install.html