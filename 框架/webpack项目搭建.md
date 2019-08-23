### 环境
- node环境
- npm,设置淘宝镜像

```
npm config set registry http://registry.npm.
```


### 搭建项目基本目录
- 新建项目文件夹 mkdir webpack-demo
- 初始化npm,得到配置文件package.json  
  
```
cd webpack-demo
npm init -y
// ++pacakge.json 描述项目的一些基本信息，以及依赖的配置
```
- 安装webpack npm install webpack webpack-cli -D
- 新建webpack配置文件 touch webpack.config.js(配置webpack)
- 创建入口文件index.js touch index.js

### 配置webpack.config.js
- 配置入口出口

```
// webpack.config.js
const path = require('path')
module.exports = {
    // webpack打包入口
    entry: './index.js',
    // webpack输出配置
    output: {
        // 文件输出的目标路径
        path: path.resolve(__dirname, "bundle"),
        // 输出文件名
        filename: "bundle.js"
    }
}
```
- 配置package.json命令
```
{
    "scripts": {
        "build": "webpack"
    }
}
```
终端执行命令：webpack/npm run build  
根据配置文件 webpack.config.js的入口配置和出口配置，找到文件进行打包，并输出到相应指定的目录
```
Hash: c5ad267c0f89a3556607
Version: webpack 4.35.3
Time: 59ms
Built at: 2019-07-15 12:07:59
    Asset       Size  Chunks             Chunk Names
bundle.js  946 bytes       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./index.js 16 bytes {0} [built]

.
├── README.md
├── bundle // 打包后的bundle文件夹
│   └── bundle.js // 打包后的bundle.js文件
├── index.js
├── package-lock.json
├── package.json
└── webpack.config.js
```

### 本地服务器搭建,启用HMR
- 选择webpack-dev-server,不在webpack.config.js中配置，通过node配置
- 新建server.js： touch server.js
- 下载webpack-dev-server:
    npm install webpack-dev-server -D
- srever.js使用webpack-dev-server搭建服务器，并启用HMR
```
// server.js
const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.config.js')
const options = {
    contentBase: './bundle',
    host: localhost,
    hot:true
}
webpackDevServer.addDevServerEntrypoints(config,options)

const compiler = webpack(config)
const server = new webpackDevServer(compiler,options)

server.listen(3000,'localhost', () => {
console.log(server is listening on port 3000)
})
```
- package.json 配置命令
```
{
    "scripts": {
        "build": "webpack",
        "start": "node server.js"
    }
}
```
- npm run start ，启动服务器
```
Project is running at http://localhost:3000/
ℹ ｢wds｣: webpack output is served from undefined
ℹ ｢wds｣: Content not from webpack is served from ./bundle
listen is running on port 3000
ℹ ｢wdm｣: Hash: 83021779e7dbfa6b050d
Version: webpack 4.35.3
Time: 273ms
Built at: 2019-07-15 12:45:08
    Asset     Size  Chunks             Chunk Names
bundle.js  389 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[0] multi (webpack)-dev-server/client?http://localhost (webpack)/hot/dev-server.js ./index.js 52 bytes {main} [built]
```
打开http://localhost:3000/,无内容

### HtmlWebpackPlugin配置
> 该插件将生成一个 HTML5 文件
- 创建模版html文件：touch index.html
```
<p>webpack项目搭建</p>
```

- 下载html-webpack-plugin: npm install html-webpack-plugin -D
- webpack.config.js中配置plugins
```
const HtmlWebpackPlugin = require('html-webpack-plugin)
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}
```
- 启动服务器，npm run start，本地模版文件中的内容显示在浏览器中

### 资源管理
- 加载css
- 加载图片
- 加载字体

### ES6环境搭建
