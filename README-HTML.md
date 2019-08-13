## css面试问题
 
### html常见元素
- meta | title | style | link | script | base
- div | section | article | aside | header | footer
- p
- span | em | strong
- table | thead | tbody | tr | td
- ul | ol | li | dl | dt | dd
- a
- form | input | select | textarea | button

#### meta
1. <meta charset="uft-8">
charset 字符集
2. <meta name="viewport" content="width=devicde-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
viewport：视口，适配移动端第一步，页面宽度以多少来显示（此处为设备宽度）

#### base
<base href="/">
指定基础路径，所有链接路径以其为基础

### html重要属性
- a[href, target]
- img[src, alt]
- table td[colspan, rowspan]
- form[target, method, enctype]
- input[type, value]
- button[type]  submit | reset | button
- select > option[value]
- label[for] for和id为对应值的input关联

### 理解html
 - html“文档”
 - 描述文档的“结构”
 - 有区块和大纲
 语义化标签让html文档的结构更清晰，结构更明显

### html版本
- HTML4/4.01（SGML)
- XHTML(XML)
- HTML5

### HTML5新增内容
新区块标签
- section | article | nav | aside
表单增强
- 日期、时间、搜索
- 表单验证
- pplaceholder自动聚焦

### HTML新增语义
- header/footer 头尾
- section/article 区块
- nav 导航
- aside 不重要内容 侧边栏
- em/strong 强调
- i : icon

### HTML元素分类
1. 按默认样式分类
- 块级block
独占一行
- 行内/内联inline
- inline-block
不独占一行，对外表现的像inline一样，对内像block，有形状，有尺寸
2. 按内容分
Flow……

### HTML元素嵌套关系
- 块级元素可以包含行内元素
- 块级元素不一定能包含块级元素，比如p不能包含div 
- 行内元素一般不能包含块级元素
- a可以包含div

### HTML元素默认样式
- 默认样式的意义
- 默认样式带来的问题
- css reset样式重置

### doctype意义
- 让浏览器以标准模式渲染
- 让浏览器知道元素的合法性

### html xhtml html5 的关系
- html属于sgml
- xhtml属于xml,是html进行xml严格化的结果
- html5不属于sgml或xml，比xhtml宽松

### html5有什么变化
- 新的语义化元素
- 表单增强
- 新的API(离线、音视频、图形、实时通信、本地存储、设备能力)
- 分类和嵌套变更

### em和i有什么区别
- em是语义化的标签，表强调
- i是纯样式的标签，表斜体
- html5中i不推荐使用，一般用作图标

### 语义化的意义
- 开发者容易理解
- 机器容易理解结构（搜索、读屏、软件）
- 有助与seo
- semantic microdata

### 哪些元素可以自闭合
- 表单元素input
- 图片img
- br hr
- meta link

### html和DOM的关系
- html是死的，就是字符串
- DOM由html解析而来，是活的，DOM树
- js可以维护DOM

### property和attribute的区别
- attribute是死的 属性
- property是活的 特性

### form的作用有哪些
- 直接提交表单
- 使用submit/reset按钮
- 便于浏览器保存表单
- 第三方库可以整体提取值
- 第三方库可以进行表单验证
 
