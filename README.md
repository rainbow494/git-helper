# Git-Helper



## 界面截图
-

## 功能
- 对多个git项目同时进行fetch-rebase
- 打开git项目对应的log查看窗口

## 部署依赖
- tortoiseGit
- nodejs
- chrome

## 开发依赖
- node-webkit

## 打包运行方法
- 在[官网](http://nwjs.io/)下载SDK
- 将gui.html,package.json压缩为zip文件，然后更名为app.nw
- 将app.nw复制到nw.exe所在安装目录下
- 在命令行中执行 ```copy /b nw.exe+app.nw app.exe```建立exe文件
- 修改bat下的config后，将bat文件夹和exe一起复制到目标目录，点击exe执行命令

## 调试方法
- 打开```package.json``` 设置 ```toolbar:true```
- 安装node-webkit ```npm install -g nw```
- 打开命令行，在```git-helper```下执行```nw src```
- 在弹出窗体点击菜单按钮打开调试界面

## 参考资料
- [node-webkit官方示例](https://github.com/nwjs/nw.js/wiki/Getting-Started-with-nw.js-for-simplified-Chinese%28%E5%BC%80%E5%A7%8Bnw.js%29)
- [使用node-webkit创建桌面应用](http://www.html-js.com/article/Research-on-Hybrid-application-development-to-create-a-desktop-application-using-nodewebkit)
