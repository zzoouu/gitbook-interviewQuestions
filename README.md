# 简介
本人前端菜鸟工程师一枚~

为记录平时关注问题的总结答案，备案在此处，方便查找观看

结构比较凌乱，展示最近复习的内容

#### 目前所有结构
- 掘金上一位大神的100道题
- 面经中的笔试题
- LeetCode
- HTML
- CSS

后期应该会更新JavaScript、Vue、React……

希望从此能改变丢三落四的坏习惯~~~
ls -al
shift cmd .

### gitbook初次使用
#### 环境
node

#### 安装GitBook
npm install gitbook-cli -g

gitbook init

gitbook serve

#### 发布gitbook项目
git init
git config user.name/user.email
git remote add origin url
git add .
git commit -m "" --no-verify
git push origin master

git branch
master ——gitbook build后生成的静态网站文件
edit-branch ——原始代码
backup ——备份原始代码

git checkout edit-branch
gitbook build ./ ./docs  指定目录生成指定名称文件夹(gitbook build默认在根目录下生成_book文件夹)
git checkout master
git checkout edit-branch -- docs(_book)
mv docs/* ./ 将docs文件夹中的内容移动到根目录
rm -rf docs  深处docs文件夹


> gitbook登录超时，不再使用此方法，github上直接生成git pages
登录gitbook(github)
新建organization -> space
连接github和gitbook(已创建的space)


