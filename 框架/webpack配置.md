### webpack
> webpack是一个模版打包工具

```
import Header from './header.js'
```
未进行设置时，浏览器无法识别，会报错  
webpack基于node，node版本尽量要新，速度更快
*node官网中：LTS；long time supported 更稳定*

#### 模块（modules）

```
// ES module
import Header from './header.js'
export default Header

// CommonJS(node)
const path = require('path') // 异步
const path = require.resolve('path') // 同步

// 
const path = require.ensure('path')
module.exports = Header

// AMD
define require


// CMD

// css/sass/less
@import

// url(...)或<img src="..." />
```
##### ES Module
- import module from './module.js'  
- import { module } from './module.js'

- export default module
- export const module = {}

- import():  
动态加载模块，调用的地方，作为分离的模块起点
import('path/to/module') -> Promise

##### CommonJS
- require(dependency:String)  

- require('path')  异步  

- require.resolve('path')  同步方式获取模块id  

- require.ensure() 可被import()取代  
require.ensure(dependencies: String[],callback:function(require), erroeCallback:function(error),chunkName:String)  
将dependencies参数其对应的文件拆分到一个单独的 bundle 中，被异步加载。当使用 这是动态加载依赖。在模块执行时才运行代码，只有在满足某些条件时才加载依赖项

##### AMD
define require

```
mkdir webpack
npm init --yes

// 全局安装webpack，可能会遇到不同项目运用的webpack版本不一样
npm install webpack webpack-cli -g
(npm uninstall webpack webpacl-cli -g)

cd 项目目录

// 项目本地安装webpack
npm install webpack webpack-cli -D

// npx：在当前项目目录中的node_modules中查找webpack
npx webpack -v

// 全局查找web webpack
npm webpack -v

// 安装前查看webpack信息，可以看到版本号
npm info webpack
npm install webpack@版本号

// 打包index.js文件
npx webpack index.js

```
#### 配置文件
> webpack默认的配置文件为webpack.config.js

```
const path require('path')

module.exports = {
    // 项目打包的入口文件
    entry: './index.js'
    
    // 项目打包的出口文件
    output: {
        // 打包后的文件名
        filename: 'bundle.js',
        // 项目打包后的目录名
        path: path.resolve(_dirname,'bundle')
        // 打包到了 bundle/bundle.js,无path，则默认打包到dist
        // _dirname为webpack.config.js所在目录再将dirname与bundle 结合得到新目录
    }
}
```
> npx webpack 未接要打包的文件名，会主动去找默认配置文件(webpack.config.js)，找到其入口文件   

> npx webpack --config webpackconfig.js  指定webpack.config.js为默认配置文件

 #### webpack运行
 - global：webpack index.js
 - local: npx webpack index.js
 - npm scripts: npm run srcipt(package.json)
 
#### webpack打包输出内容

```
Hash: 打包的唯一hash值
Version: 打包用到的webpack版本
Time: 打包的整体耗时
Asset: bundle.js 打包后的文件名
Size: 文件的大小
Chunks: 每个js对应的id
ChunkName:  每个js对应的名字（main）

entry: {
    main: 'index.js'
}

```

#### mode:production/development
production: 打包出的文件被压缩为一行
development: 打包出的文件不被压缩

```
module.exports = {
    ...
    mode: 'production'
    ...
}
```

### module loader
js css image...都是模块（module）
file-loader 指明如何处理图片
先将图片打包到dist中，改变了名字，将其相对于dist的名字地址返回给饮用处
loader：如何打包处理模块


```
module.exports = {
    ...
    // 如何处理模块
    module: {
        rules: [
            {
                test: /\.jpg$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    }
    ...
}
```


看： 官网modules几种模块引入方法和getstarted

> loader 从上到下，从右到左
```
modules.exports = {
    rules: [
        {
            test: /\.css$/,
            use: [
            {
                loader: 'css-loader',
                options: {
                // 保证多层导入文件时，每次都可以按顺序用到所有loader
                    imoprtLoaders: 2
                    //开启css模块化
                    modules: true
                }
            },
            {
                loader: 'sass-loader'
            }
            ]
            
        }
    ]
}
```

### clean-webpack-plugin
每次重新打包清理dist目录
new CleanWebpackPlugin(['dist'])


### publicPath
 相对于服务的 URL(Server-relative URL)，相对于协议的 URL(protocol-relative URL) 或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时。
 ```
 path: path.resolve(__dirname, "public/assets"),
publicPath: "https://cdn.example.com/assets/"
 ```
### souceMap
 devtool: 'souce-map' 映射关系在一个新的文件里面
 devtool: 'inline-source-map' 映射关系以base64 放在main.js末尾
 devtool:'cheap-inline-source-map'  只要告诉行就好了，不需要到列，更快，性能更好一点，只管理业务代码，不管理第三方模块
 
 
 mode: 'development'
 cheap-module-eval-source-map
 
 线上代码一般不需要sore-map
 mode: 'production'
 线上一般为：  cheap-module-source-map
一个映射关系，可以说明错误代码在源代码的位置


