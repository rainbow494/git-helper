# Git-Helper

## 功能
- 对多个git项目同时进行fetch-rebase
- 打开git项目对应的log查看窗口

## 部署依赖
- tortoiseGit
- nodejs
- chrome

## 开发依赖
- node-webkit

## 源码编译方法
- 将src/gui下文件压缩为zip文件然后更名为app.nw
- 将app.nw复制到nw.exe所在安装目录下
- 在命令行中执行 __```copy /b nw.exe+app.nw app.exe```__

## 参考资料
- [node-webkit官方示例](https://github.com/nwjs/nw.js/wiki/Getting-Started-with-nw.js-for-simplified-Chinese%28%E5%BC%80%E5%A7%8Bnw.js%29)
