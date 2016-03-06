# Git-Helper



## 界面截图
![](https://github.com/rainbow494/git-helper/blob/master/screen-shot.png)

## 功能
- 对多项目fetch
- 打开多项目rebase gui (tortoiseGit)
- 打开多项目log gui (tortoiseGit)

## 部署依赖
- tortoiseGit
- nodejs
- chrome

## 开发依赖
- node-webkit

## 打包运行方法
- 在[官网](http://nwjs.io/)下载SDK
- 将src下project.config外所有文件, 压缩为zip文件后更名为git-helper.nw
- 将git-helper.nw复制到nw.exe所在目录
- 在命令行中执行 ```copy /b nw.exe+git-helper.nw git-helper.exe```建立exe文件
- project.config修改后和exe一起复制到git所在盘符，点击exe执行命令

## 调试方法
- 打开```package.json``` 设置 ```toolbar:true```
- 打开```main.js``` 设置 ```debug = true ```
- 安装node-webkit ```npm install -g nw```
- 打开命令行，进入```git-helper```目录，执行```nw src```
- 在弹出窗体点击菜单按钮打开调试界面

## 参考资料
- [node-webkit官方示例](https://github.com/nwjs/nw.js/wiki/Getting-Started-with-nw.js-for-simplified-Chinese%28%E5%BC%80%E5%A7%8Bnw.js%29)
- [使用node-webkit创建桌面应用](http://www.html-js.com/article/Research-on-Hybrid-application-development-to-create-a-desktop-application-using-nodewebkit)
